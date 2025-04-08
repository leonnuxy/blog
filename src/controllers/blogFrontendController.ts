/**
 * Blog Frontend Controller
 * Client-side controller that handles all frontend functionality for the blog.
 * Manages UI initialization, post rendering, and user interactions.
 */
import { fetchBlogPosts } from '../services/api';
import { createBlogCardElement } from '../components/blogCards';
import { initializeComments, initializeCommentsFunctionality } from '../components/comments';
import { initializeDarkMode, checkSystemDarkModePreference } from '../components/darkMode';
import { initializeContactForm } from '../components/contact';
import { initializePagination } from '../components/pagination';
import { initializeSearch } from '../components/search';
import { initializeAbout } from '../components/about';
import { initializeNavigation } from '../components/navigation';

/**
 * Initialize the blog functionality
 * Sets up all UI components and initializes the blog posts display
 */
export async function initializeBlogFrontend(): Promise<void> {
    // Check for system dark mode preference first
    checkSystemDarkModePreference();

    // Initialize navigation first to ensure active states are set
    initializeNavigation();

    // Initialize all UI components
    initializeDarkMode();
    initializeContactForm();
    initializeAbout(); // Initialize About popup
    initializeSearch();
    
    // Initialize the blog posts
    await initializePosts();
    
    // Initialize pagination after posts are loaded
    initializePagination();
    
    // Initialize comments functionality
    initializeComments();

    // Set up event delegation for blog cards
    setupBlogCardsDelegation();

    // Add event listener for reloading posts (used by search)
    document.addEventListener('reloadPosts', async () => {
        await initializePosts();
        initializePagination();
        // Make sure event delegation is set up again after reloading posts
        setupBlogCardsDelegation();
    });
}

/**
 * Set up event delegation for blog cards container
 * More efficient than attaching event listeners to each card
 */
function setupBlogCardsDelegation(): void {
    // Get both primary and hidden blog containers
    const blogContainers = [
        document.querySelector('.blog-cards'),
        document.getElementById('hidden-posts')
    ];

    // Apply delegation to each container
    blogContainers.forEach(container => {
        if (!container) return;

        // Remove existing event listener if it exists (to prevent duplicates)
        container.removeEventListener('click', handleBlogCardClick);
        
        // Add the new event listener
        container.addEventListener('click', handleBlogCardClick);
    });
}

/**
 * Handle click events on blog cards using event delegation
 */
function handleBlogCardClick(event: Event): void {
    const target = event.target as Element;
    
    // Find the closest blog card to the clicked element
    const card = target.closest('.blog-card');
    
    if (card) {
        // Don't navigate if clicking on buttons, links, or icons
        if (
            target.closest('button') ||
            target.closest('a') ||
            target.tagName.toLowerCase() === 'i'
        ) {
            return;
        }
        
        // Get the post ID from the card's data attribute
        const postId = card.getAttribute('data-post-id');
        
        if (postId) {
            window.location.href = `/post.html?id=${postId}`; // NOT /public/post.html

        }
    }
}

/**
 * Initialize blog posts from API
 * Fetches posts from the API and renders them in the UI
 */
async function initializePosts(): Promise<void> {
    const blogCardsContainer = document.querySelector('.blog-cards');
    if (!blogCardsContainer) {
        console.warn('Blog cards container not found in the DOM');
        return;
    }
    try {
        // Clear loading placeholder or existing content
        blogCardsContainer.innerHTML = '<div class="loading-spinner"></div>';

        // Fetch posts from API
        const posts = await fetchBlogPosts();

        if (posts.length === 0) {
            // Show empty state
            showEmptyState(blogCardsContainer);
            return;
        }
        // Clear container
        blogCardsContainer.innerHTML = '';

        // Display first 3 posts
        const displayPosts = posts.slice(0, 3);
        const hiddenPosts = posts.slice(3);

        // Add visible posts to main container
        displayPosts.forEach(post => {
            const blogCard = createBlogCardElement(post);
            blogCardsContainer.appendChild(blogCard);
        });

        // Add hidden posts to hidden container
        const hiddenPostsContainer = document.getElementById('hidden-posts');
        if (hiddenPostsContainer) {
            hiddenPostsContainer.innerHTML = '';
            hiddenPosts.forEach(post => {
                const blogCard = createBlogCardElement(post);
                hiddenPostsContainer.appendChild(blogCard);
            });
        }

        // Update load more button visibility
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
 * Creates and appends DOM elements instead of using innerHTML for better maintainability
 */
function showEmptyState(container: Element): void {
    // Clear the container first
    container.innerHTML = '';

    // Create the empty state container
    const emptyStateDiv = document.createElement('div');
    emptyStateDiv.className = 'empty-state';

    // Create and add the icon
    const icon = document.createElement('i');
    icon.className = 'fas fa-file-alt fa-3x';
    emptyStateDiv.appendChild(icon);

    // Create and add the heading
    const heading = document.createElement('h3');
    heading.textContent = 'No posts found';
    emptyStateDiv.appendChild(heading);

    // Create and add the paragraph
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Be the first to create a blog post!';
    emptyStateDiv.appendChild(paragraph);

    // Append the empty state to the container
    container.appendChild(emptyStateDiv);
}

/**
 * Show error state when posts couldn't be loaded
 * Creates and appends DOM elements instead of using innerHTML for better maintainability
 */
function showErrorState(container: Element): void {
    // Clear the container first
    container.innerHTML = '';

    // Create the error state container
    const errorStateDiv = document.createElement('div');
    errorStateDiv.className = 'error-state';

    // Create and add the icon
    const icon = document.createElement('i');
    icon.className = 'fas fa-exclamation-triangle fa-3x';
    errorStateDiv.appendChild(icon);

    // Create and add the heading
    const heading = document.createElement('h3');
    heading.textContent = 'Something went wrong';
    errorStateDiv.appendChild(heading);

    // Create and add the paragraph
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Failed to load blog posts. Please try again later.';
    errorStateDiv.appendChild(paragraph);

    // Append the error state to the container
    container.appendChild(errorStateDiv);
}
