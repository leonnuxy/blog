// blogFrontendController.ts
/**
 * Blog Frontend Controller
 * Client-side controller that handles all frontend functionality for the blog homepage.
 * Manages UI initialization, post rendering, filtering, pagination, and user interactions.
 */
import { BlogPostData } from '../../shared/types';
import { fetchBlogPosts } from '../services/api';
import { createBlogCardElement } from '../components/blogCards';
import { initializeNavigation } from '../components/navigation/navigation';
import { frontendState, dispatchStateChange } from './state';

/**
 * Initialize the blog frontend functionality (homepage)
 */
export async function initializeBlogFrontend(): Promise<void> {
    initializeNavigation();

    // Fetch all posts first
    const allPosts: BlogPostData[] = await fetchBlogPosts();
    if (!allPosts || allPosts.length === 0) return;

    // 1) Hero
    renderLatestHero(allPosts);

    // 2) Initialize posts (excluding the hero posts)
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search') ?? undefined;
    await initializePosts(searchTerm, allPosts.slice(3));

    initializePagination();
    setupBlogCardsDelegation();

    document.addEventListener('reloadPosts', handleReloadPosts);
}

/**
 * Handles the custom 'reloadPosts' event. Refetches and re-renders posts and hero.
 */
async function handleReloadPosts(): Promise<void> {
    // Fetch all posts again
    const allPosts = await fetchBlogPosts();
    if (!allPosts || allPosts.length === 0) return;

    // Update hero
    renderLatestHero(allPosts);

    // Remove hero posts from grid
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search') ?? undefined;
    await initializePosts(searchTerm, allPosts.slice(3));
    initializePagination();
    setupBlogCardsDelegation();
}

/**
 * Set up event delegation for blog cards container
 */
function setupBlogCardsDelegation(): void {
    // Replace blog container selector to match new HTML
    const blogCardsContainer = document.querySelector('.posts-grid');
    if (blogCardsContainer) {
        blogCardsContainer.removeEventListener('click', handleBlogCardClick); // Prevent duplicates
        blogCardsContainer.addEventListener('click', handleBlogCardClick);
    } else {
        console.warn('Could not find .posts-grid container for delegation.');
    }
}

/**
 * Handle click events on blog cards for navigation
 */
function handleBlogCardClick(event: Event): void {
    const target = event.target as Element;
    const card = target.closest('.blog-card') as HTMLElement | null;

    if (card) {
        if (target.closest('button, a, i')) {
            if (target.closest('a.tag-badge')) {
                return;
            }
            return;
        }

        const postId = card.dataset.postId;
        if (postId) {
            // Use relative path for navigation
            window.location.href = `post.html?id=${postId}`;
        }
    }
}

/**
 * Initialize blog posts: Fetch, filter (based on URL param), and render.
 */
async function initializePosts(
    searchTerm?: string,
    allPostsParam?: BlogPostData[]
): Promise<void> {
    const blogCardsContainer = document.querySelector('.posts-grid');
    if (!blogCardsContainer) {
        console.error(
            'Posts grid (.posts-grid) container not found. Skipping post initialization.'
        );
        return;
    }

    // --- Check for Tag Filter & SearchTerm ---
    const urlParams = new URLSearchParams(window.location.search);
    const tagFilter = urlParams.get('tag') ?? undefined;

    // Hide the hero section if filtering or searching
    const heroSection = document.getElementById('latest-hero');
    if (tagFilter || searchTerm) {
        heroSection?.classList.add('hidden-by-search');
    } else {
        heroSection?.classList.remove('hidden-by-search');
    }

    // Optional UI indicator for tag filter
    const filterDisplay = document.getElementById('filter-display');
    const currentHostname = window.location.hostname;
    const isProduction =
        currentHostname === 'noelugwoke.com' ||
        currentHostname.endsWith('.github.io');
    const basePath = isProduction ? '/blog/' : '/';

    // Remove any old indicator
    document.querySelector('.tag-filter-indicator')?.remove();

    if (tagFilter) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'tag-filter-indicator';
        filterContainer.innerHTML = `
      <p>Showing posts tagged with: <span class="filtered-tag">${tagFilter}</span></p>
      <a href="${basePath}" class="clear-filter">Clear filter</a>
    `;
        const blogSection = document.getElementById('blog');
        if (blogSection?.parentNode) {
            blogSection.parentNode.insertBefore(filterContainer, blogSection);
        }
        if (filterDisplay) {
            filterDisplay.textContent = `Showing posts tagged with: "${tagFilter}"`;
            filterDisplay.style.display = 'block';
        }
    } else if (filterDisplay) {
        filterDisplay.style.display = 'none';
    }
    // --- End Filter UI ---

    try {
        blogCardsContainer.innerHTML =
            '<div class="loading-spinner"></div><p>Loading posts...</p>';

        let allPosts = allPostsParam || (await fetchBlogPosts());

        // --- Apply Tag Filter ---
        let postsToDisplay = allPosts;
        if (tagFilter) {
            postsToDisplay = allPosts.filter((post) =>
                post.tags?.some((t) => t.toLowerCase() === tagFilter.toLowerCase())
            );
            frontendState.filteredTag = tagFilter;
        } else {
            frontendState.filteredTag = undefined;
        }

        // --- Apply Search Filter ---
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            postsToDisplay = postsToDisplay.filter(
                (post) =>
                    post.title.toLowerCase().includes(term) ||
                    post.content.toLowerCase().includes(term) ||
                    post.tags.some((t) => t.toLowerCase().includes(term))
            );
        }

        blogCardsContainer.innerHTML = '';

        if (postsToDisplay.length === 0) {
            showEmptyState(blogCardsContainer, tagFilter);
            document.getElementById('load-more-btn')?.setAttribute('style', 'display:none;');
            return;
        }

        // --- Pagination / Load More ---
        const initialCount = frontendState.postsPerPage;
        const displayPosts = postsToDisplay.slice(0, initialCount);
        const hiddenPosts = postsToDisplay.slice(initialCount);

        displayPosts.forEach((post) => {
            blogCardsContainer.appendChild(createBlogCardElement(post));
        });

        const hiddenContainer = document.getElementById('hidden-posts');
        if (hiddenContainer) {
            hiddenContainer.innerHTML = '';
            hiddenPosts.forEach((post) =>
                hiddenContainer.appendChild(createBlogCardElement(post))
            );
        }

        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = hiddenPosts.length > 0 ? 'block' : 'none';
        }
    } catch (error) {
        console.error('Error initializing posts:', error);
        showErrorState(blogCardsContainer);
    }
}


/**
 * Show empty state when no posts are available
 */
function showEmptyState(container: Element, tagFilter?: string): void {
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-newspaper fa-3x"></i>
            <h3>${tagFilter ? `No posts found with tag "${tagFilter}"` : 'No posts available'}</h3>
            <p>${tagFilter ? 'Try selecting a different tag or check back later.' : 'Check back later for new content.'}</p>
            ${tagFilter ? `<a href="/" class="btn">View All Posts</a>` : ''}
        </div>
    `;
}

/**
 * Show error state when posts couldn't be loaded
 */
function showErrorState(container: Element): void {
    container.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-circle fa-3x"></i>
            <h3>Failed to load posts</h3>
            <p>There was an error loading the blog posts. Please try again later.</p>
            <button onclick="window.location.reload()" class="btn">Retry</button>
        </div>
    `;
}

/**
 * Initialize pagination controls
 * This replaces the external component initialization with integrated functionality
 */
function initializePagination(): void {
    setupLoadMoreButton();
    updatePaginationControls();
}

/**
 * Set up the "Load More" button functionality
 */
function setupLoadMoreButton(): void {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenPostsContainer = document.getElementById('hidden-posts');
    const visibleContainer = document.querySelector('.posts-grid');

    if (!loadMoreBtn || !hiddenPostsContainer || !visibleContainer) return;

    // Remove existing event listener to prevent duplicates
    loadMoreBtn.removeEventListener('click', handleLoadMore);

    // Add event listener
    loadMoreBtn.addEventListener('click', handleLoadMore);
}

/**
 * Handle the "Load More" button click
 */
function handleLoadMore(): void {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenPostsContainer = document.getElementById('hidden-posts');
    const visibleContainer = document.querySelector('.posts-grid');

    if (!loadMoreBtn || !hiddenPostsContainer || !visibleContainer) return;

    // Get posts to show (use a reasonable batch size)
    const postsToShow = Array.from(hiddenPostsContainer.children).slice(0, frontendState.postsPerPage);

    // Move posts from hidden to visible container
    postsToShow.forEach(post => {
        visibleContainer.appendChild(post);
    });

    // Hide button if no more hidden posts
    if (hiddenPostsContainer.children.length === 0) {
        loadMoreBtn.style.display = 'none';
    }

    // Dispatch state change for analytics or other components
    dispatchStateChange('frontend', 'loadedMorePosts');
}

/**
 * Update pagination controls visibility based on current state
 */
function updatePaginationControls(): void {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenPostsContainer = document.getElementById('hidden-posts');

    if (loadMoreBtn && hiddenPostsContainer) {
        loadMoreBtn.style.display = hiddenPostsContainer.children.length > 0 ? 'block' : 'none';
    }
}

/**
 * Picks the newest post and renders it as a big hero at the top.
 */
function renderLatestHero(posts: BlogPostData[]) {
    const hero = document.getElementById('latest-hero')!;
    const [main, second, third] = posts;

    const fmt = (d: string) => new Date(d)
        .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    hero.innerHTML = `
    <a href="post.html?id=${main.id}" class="hero-large">
      <img src="${main.imageUrl}" alt="${main.title}" class="hero-large-image" />
      <div class="hero-overlay">
        <p class="hero-category">${main.tags.join(', ')}</p>
        <time class="hero-date">${fmt(main.createdAt)}</time>
        <h2 class="hero-title">${main.title}</h2>
      </div>
    </a>
    <a href="post.html?id=${second.id}" class="hero-small small-1">
      <img src="${second.imageUrl}" alt="${second.title}" />
      <div class="hero-small-info">
        <time class="hero-date">${fmt(second.createdAt)}</time>
        <h3 class="hero-title-small">${second.title}</h3>
      </div>
    </a>
    <a href="post.html?id=${third.id}" class="hero-small small-2">
      <img src="${third.imageUrl}" alt="${third.title}" />
      <div class="hero-small-info">
        <time class="hero-date">${fmt(third.createdAt)}</time>
        <h3 class="hero-title-small">${third.title}</h3>
      </div>
    </a>
  `;
}



// Utility to strip HTML tags for an excerpt
function stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || '';
}