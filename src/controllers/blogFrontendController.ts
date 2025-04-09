/**
 * Blog Frontend Controller
 * Client-side controller that handles all frontend functionality for the blog homepage.
 * Manages UI initialization, post rendering, filtering, and user interactions.
 */
import { fetchBlogPosts } from '../services/api'; // Uses static fetch now
import { createBlogCardElement } from '../components/blogCards';
import { initializeContactForm } from '../components/contact'; 
import { initializePagination } from '../components/pagination'; 
import { initializeSearch } from '../components/search'; 
import { initializeAbout } from '../components/about'; 
import { initializeNavigation } from '../components/navigation'; 

/**
 * Initialize the blog frontend functionality (homepage)
 */
export async function initializeBlogFrontend(): Promise<void> {
    console.log('Initializing Blog Frontend Controller...');

    initializeNavigation();
    initializeContactForm(); 
    initializeAbout();     
    initializeSearch();    

    // Initialize posts, which now includes filtering based on URL params
    await initializePosts(); 
    
    initializePagination(); // Initialize pagination after initial posts (possibly filtered) are loaded
    
    setupBlogCardsDelegation();

    // Listen for custom event to reload posts (e.g., after search or filter change)
    document.addEventListener('reloadPosts', handleReloadPosts);

    console.log('Blog Frontend Controller Initialized.');
}

/**
 * Handles the custom 'reloadPosts' event. Refetches and re-renders posts.
 */
async function handleReloadPosts(): Promise<void> {
    console.log('Reloading posts due to reloadPosts event...');
    // Re-initialize posts, which will pick up any new URL parameters (like search query OR tag)
    await initializePosts(); 
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
        console.log('Event delegation set up for .blog-cards');
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
                 console.log('Clicked tag link, allowing default navigation.');
                 return; 
            }
            console.log('Clicked interactive element inside card, preventing navigation.');
            return; 
        }
        
        const postId = card.dataset.postId; 
        if (postId) {
            console.log(`Navigating to post ${postId}`);
            // Use relative path for navigation
            window.location.href = `post.html?id=${postId}`; 
        }
    }
}

/**
 * Initialize blog posts: Fetch, filter (based on URL param), and render.
 */
async function initializePosts(): Promise<void> {
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
    // --- Add Logging ---
    console.log(`[initializePosts] Hostname: ${currentHostname}, isProduction: ${isProduction}, basePath: ${basePath}`);
    // --- End Logging ---

    // Remove any existing filter indicator before potentially adding a new one
    const existingFilterIndicator = document.querySelector('.tag-filter-indicator');
    if (existingFilterIndicator) {
        existingFilterIndicator.remove();
    }

    // Add filter indicator if tagFilter exists
    if (tagFilter) { 
        console.log(`Applying filter for tag: "${tagFilter}"`);
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
        console.log(`Fetched ${allPosts.length} total posts.`);

        // --- Apply Tag Filter ---
        let postsToDisplay = allPosts; 
        if (tagFilter) {
            postsToDisplay = allPosts.filter(post => 
                post.tags && post.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase())
            );
            console.log(`Filtered down to ${postsToDisplay.length} posts for tag: "${tagFilter}"`);
        }
        // --- End Apply Tag Filter ---

        blogCardsContainer.innerHTML = ''; 

        if (postsToDisplay.length === 0) {
            showEmptyState(blogCardsContainer, tagFilter ?? undefined); 
            const loadMoreBtn = document.getElementById('load-more-btn');
            if(loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        // Pagination logic
        const initialPostCount = 6; 
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
    container.innerHTML = ''; 
    const emptyStateDiv = document.createElement('div');
    emptyStateDiv.className = 'empty-state'; 
    
    // --- Determine Base Path (needed for View All link) ---
    const currentHostname = window.location.hostname;
    const isProduction = currentHostname === 'noelugwoke.com' || currentHostname.endsWith('.github.io'); 
    // *** IMPORTANT: Change '/blog/' if your GitHub repo name/path is different ***
    const basePath = isProduction ? '/blog/' : '/'; 
    // --- Add Logging ---
    console.log(`[showEmptyState] Hostname: ${currentHostname}, isProduction: ${isProduction}, basePath: ${basePath}`);
    // --- End Logging ---

    const message = tagFilter 
        ? `No posts found tagged with "${tagFilter}".`
        : 'No posts yet!'; 
        
    emptyStateDiv.innerHTML = `
        <i class="fas fa-file-alt fa-3x"></i>
        <h3>${message}</h3>
        ${tagFilter ? `<p><a href="${basePath}">View all posts</a></p>` : '<p>Check back later for new content!</p>'}
    `; 
    
    container.appendChild(emptyStateDiv);
    console.log('Displayed empty state for posts.');
}

/**
 * Show error state when posts couldn't be loaded
 */
function showErrorState(container: Element): void {
    // ... (implementation remains the same) ...
    container.innerHTML = ''; 
    const errorStateDiv = document.createElement('div');
    errorStateDiv.className = 'error-state'; 
    errorStateDiv.innerHTML = `...`; // Keep error message HTML
    container.appendChild(errorStateDiv);
    console.log('Displayed error state for posts.');
}

