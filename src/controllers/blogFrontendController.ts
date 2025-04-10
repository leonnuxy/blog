// blogFrontendController.ts
/**
 * Blog Frontend Controller
 * Client-side controller that handles all frontend functionality for the blog homepage.
 * Manages UI initialization, post rendering, filtering, pagination, and user interactions.
 */
import { fetchBlogPosts } from '../services/api'; // Uses static fetch now
import { createBlogCardElement } from '../components/blogCards';
import { initializeNavigation } from '../components/navigation';
import { frontendState, dispatchStateChange } from './state';

/**
 * Initialize the blog frontend functionality (homepage)
 */
export async function initializeBlogFrontend(): Promise<void> {
    initializeNavigation();

    // Initialize posts, which now includes filtering based on URL params
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search') ?? undefined;
    await initializePosts(searchTerm);
    initializePagination(); // Now calls our local function, not the component

    setupBlogCardsDelegation();

    // Listen for custom event to reload posts (e.g., after search or filter change)
    document.addEventListener('reloadPosts', handleReloadPosts);
}

/**
 * Handles the custom 'reloadPosts' event. Refetches and re-renders posts.
 */
async function handleReloadPosts(): Promise<void> {
    // Re-initialize posts, which will pick up any new URL parameters (like search query OR tag)
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search') ?? undefined;
    await initializePosts(searchTerm);
    initializePagination();
    setupBlogCardsDelegation();
}

/**
 * Set up event delegation for blog cards container
 */
function setupBlogCardsDelegation(): void {
    const blogCardsContainer = document.querySelector('#blog.blog-cards');
    if (blogCardsContainer) {
        blogCardsContainer.removeEventListener('click', handleBlogCardClick); // Prevent duplicates
        blogCardsContainer.addEventListener('click', handleBlogCardClick);
    } else {
        console.warn('Could not find #blog.blog-cards container for delegation.');
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
async function initializePosts(searchTerm?: string): Promise<void> {
    const blogCardsContainer = document.querySelector('#blog.blog-cards');
    if (!blogCardsContainer) {
        console.error('Blog cards container (#blog.blog-cards) not found in the DOM.');
        return;
    }

    // --- Check for Tag Filter ---
    const urlParams = new URLSearchParams(window.location.search);
    const tagFilter = urlParams.get('tag');
    const filterDisplay = document.getElementById('filter-display'); // Optional element to show filter

    // --- Determine Base Path (needed for Clear Filter link) ---
    const currentHostname = window.location.hostname;
    const isProduction = currentHostname === 'noelugwoke.com' || currentHostname.endsWith('.github.io');
    // *** IMPORTANT: Change '/blog/' if your GitHub repo name/path is different ***
    const basePath = isProduction ? '/blog/' : '/';

    // Remove any existing filter indicator before potentially adding a new one
    const existingFilterIndicator = document.querySelector('.tag-filter-indicator');
    if (existingFilterIndicator) {
        existingFilterIndicator.remove();
    }

    // Add filter indicator if tagFilter exists
    if (tagFilter) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'tag-filter-indicator';
        // Use basePath for the Clear filter link's href
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
    // --- End Check for Tag Filter ---

    try {
        blogCardsContainer.innerHTML = '<div class="loading-spinner"></div><p>Loading posts...</p>';

        let allPosts = await fetchBlogPosts();

        // --- Apply Tag Filter ---
        let postsToDisplay = allPosts;
        if (tagFilter) {
            postsToDisplay = allPosts.filter(post =>
                post.tags && post.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase())
            );
            // Store the filtered tag in frontend state
            frontendState.filteredTag = tagFilter;
        } else {
            frontendState.filteredTag = undefined;
        }
        // --- End Apply Tag Filter ---

        // --- Apply Search Filter ---
        if (searchTerm) {
            postsToDisplay = postsToDisplay.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        // --- End Apply Search Filter ---

        blogCardsContainer.innerHTML = '';

        if (postsToDisplay.length === 0) {
            showEmptyState(blogCardsContainer, tagFilter ?? undefined);
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        // Pagination logic
        const initialPostCount = frontendState.postsPerPage;
        const displayPosts = postsToDisplay.slice(0, initialPostCount);
        const hiddenPosts = postsToDisplay.slice(initialPostCount);

        displayPosts.forEach(post => {
            const blogCard = createBlogCardElement(post);
            blogCardsContainer.appendChild(blogCard);
        });

        const hiddenPostsContainer = document.getElementById('hidden-posts');
        if (hiddenPostsContainer) {
            hiddenPostsContainer.innerHTML = '';
            hiddenPosts.forEach(post => {
                const blogCard = createBlogCardElement(post);
                hiddenPostsContainer.appendChild(blogCard);
            });
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
    const visibleContainer = document.querySelector('#blog.blog-cards');

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
    const visibleContainer = document.querySelector('#blog.blog-cards');

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