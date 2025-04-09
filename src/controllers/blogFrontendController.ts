/**
 * Blog Frontend Controller
 * Client-side controller that handles all frontend functionality for the blog homepage.
 * Manages UI initialization, post rendering, and user interactions.
 */
import { fetchBlogPosts } from '../services/api';
import { createBlogCardElement } from '../components/blogCards';
// Assuming initializeComments is meant for the post detail page, 
// it might not be needed here unless cards have comment previews/interactions.
// import { initializeComments } from '../components/comments'; 
import { initializeContactForm } from '../components/contact'; // Handles contact popup logic
import { initializePagination } from '../components/pagination'; // Handles load more logic
import { initializeSearch } from '../components/search'; // Handles search bar logic
import { initializeAbout } from '../components/about'; // Handles about popup logic
import { initializeNavigation } from '../components/navigation'; // Handles nav link active states

// Note: Dark mode is initialized globally in client.ts, no need to import/call here typically

/**
 * Initialize the blog frontend functionality (homepage)
 * Sets up all UI components and initializes the blog posts display.
 * Assumes header and dark mode are initialized globally before this runs.
 */
export async function initializeBlogFrontend(): Promise<void> {
    console.log('Initializing Blog Frontend Controller...');

    // Initialize navigation active states
    initializeNavigation();

    // Initialize interactive components specific to the main page
    initializeContactForm(); // Assumes #contact-btn and #contact-popup exist
    initializeAbout();     // Assumes #about-btn and #about-popup exist
    initializeSearch();    // Assumes .search-bar exists

    // Initialize the blog posts display
    await initializePosts();
    
    // Initialize pagination after posts are loaded and containers exist
    initializePagination();
    
    // If comments preview/interaction needed on cards, initialize here
    // initializeComments(); 

    // Set up event delegation for navigating when clicking blog cards
    setupBlogCardsDelegation();

    // Add event listener for reloading posts (used by search)
    // Consider adding an option to remove listener if controller is ever "destroyed"
    document.addEventListener('reloadPosts', handleReloadPosts);

    console.log('Blog Frontend Controller Initialized.');
}

/**
 * Handles the custom 'reloadPosts' event, typically triggered by search.
 */
async function handleReloadPosts(): Promise<void> {
    console.log('Reloading posts due to reloadPosts event...');
    await initializePosts();
    initializePagination();
    // Re-setup delegation in case DOM elements were replaced
    setupBlogCardsDelegation();
}


/**
 * Set up event delegation for blog cards container
 * Handles clicks for navigation, preventing clicks on interactive elements.
 */
function setupBlogCardsDelegation(): void {
    const blogCardsContainer = document.querySelector('.blog-cards');
    // Note: Delegation on hidden-posts might be unnecessary if cards are moved on load more
    // const hiddenPostsContainer = document.getElementById('hidden-posts');

    if (blogCardsContainer) {
         // Remove listener first to prevent duplicates if called multiple times
        blogCardsContainer.removeEventListener('click', handleBlogCardClick);
        blogCardsContainer.addEventListener('click', handleBlogCardClick);
        console.log('Event delegation set up for .blog-cards');
    } else {
        console.warn('Could not find .blog-cards container for delegation.');
    }

    // if (hiddenPostsContainer) {
    //     hiddenPostsContainer.removeEventListener('click', handleBlogCardClick);
    //     hiddenPostsContainer.addEventListener('click', handleBlogCardClick);
    // }
}

/**
 * Handle click events on blog cards using event delegation
 */
function handleBlogCardClick(event: Event): void {
    const target = event.target as Element;
    const card = target.closest('.blog-card') as HTMLElement | null; // Type assertion
    
    if (card) {
        // Prevent navigation if the click originated on a button, link, or icon within the card
        if (target.closest('button, a, i')) {
            console.log('Clicked interactive element inside card, preventing navigation.');
            return;
        }
        
        const postId = card.dataset.postId; // Use dataset property
        
        if (postId) {
            console.log(`Navigating to post ${postId}`);
            // Use relative path for navigation
            window.location.href = `post.html?id=${postId}`; 
        }
    }
}

/**
 * Initialize blog posts from API
 * Fetches posts from the API and renders them in the UI
 */
async function initializePosts(): Promise<void> {
    // Use more specific selector if possible, e.g., #blog
    const blogCardsContainer = document.querySelector('#blog.blog-cards'); 
    if (!blogCardsContainer) {
        console.error('Blog cards container (#blog.blog-cards) not found in the DOM.');
        return;
    }
    try {
        // Show loading state
        blogCardsContainer.innerHTML = '<div class="loading-spinner"></div><p>Loading posts...</p>';

        // Check for ?tag=... query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const tagFilter = urlParams.get('tag');

        // Fetch posts using the function from api.ts (which fetches static json)
        let posts = await fetchBlogPosts();
        console.log(`Fetched ${posts.length} posts.`);

        // Filter posts by tag if the query parameter is present
        if (tagFilter) {
            posts = posts.filter(post => post.tags.includes(tagFilter));
            console.log(`Filtered posts by tag '${tagFilter}': ${posts.length} posts.`);
        }

        // Clear loading state
        blogCardsContainer.innerHTML = ''; 

        if (posts.length === 0) {
            showEmptyState(blogCardsContainer);
            return;
        }

        // Display initial posts (e.g., first 3 or 6)
        const initialPostCount = 6; // Or adjust as needed
        const displayPosts = posts.slice(0, initialPostCount);
        const hiddenPosts = posts.slice(initialPostCount);

        // Add visible posts to main container
        displayPosts.forEach(post => {
            const blogCard = createBlogCardElement(post);
            blogCardsContainer.appendChild(blogCard);
        });

        // Add remaining posts to hidden container for pagination
        const hiddenPostsContainer = document.getElementById('hidden-posts');
        if (hiddenPostsContainer) {
            hiddenPostsContainer.innerHTML = ''; // Clear previous hidden posts
            hiddenPosts.forEach(post => {
                const blogCard = createBlogCardElement(post);
                hiddenPostsContainer.appendChild(blogCard);
            });
            console.log(`${hiddenPosts.length} posts added to hidden container.`);
        }

        // Update load more button visibility
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = hiddenPosts.length > 0 ? 'block' : 'none';
        }
    } catch (error) {
        console.error('Error initializing posts:', error);
        showErrorState(blogCardsContainer); // Show error state in the container
    }
}

/**
 * Show empty state when no posts are available
 */
function showEmptyState(container: Element): void {
    container.innerHTML = ''; // Clear container
    const emptyStateDiv = document.createElement('div');
    emptyStateDiv.className = 'empty-state'; // Add class for styling
    emptyStateDiv.innerHTML = `
        <i class="fas fa-file-alt fa-3x"></i>
        <h3>No posts found</h3>
        <p>Check back later for new content!</p> 
    `; // Example content
    container.appendChild(emptyStateDiv);
    console.log('Displayed empty state for posts.');
}

/**
 * Show error state when posts couldn't be loaded
 */
function showErrorState(container: Element): void {
    container.innerHTML = ''; // Clear container
    const errorStateDiv = document.createElement('div');
    errorStateDiv.className = 'error-state'; // Add class for styling
    errorStateDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle fa-3x"></i>
        <h3>Something went wrong</h3>
        <p>Failed to load blog posts. Please try refreshing the page.</p>
    `; // Example content
    container.appendChild(errorStateDiv);
    console.log('Displayed error state for posts.');
}

// REMOVED: Local definitions and calls for setupSearch and setupPopupButtons
// Functionality is now handled by the imported initializeSearch, initializeAbout, initializeContactForm

