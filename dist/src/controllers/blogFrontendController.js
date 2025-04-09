"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeBlogFrontend = initializeBlogFrontend;
/**
 * Blog Frontend Controller
 * Client-side controller that handles all frontend functionality for the blog homepage.
 * Manages UI initialization, post rendering, filtering, and user interactions.
 */
const api_1 = require("../services/api"); // Uses static fetch now
const blogCards_1 = require("../components/blogCards");
const contact_1 = require("../components/contact");
const pagination_1 = require("../components/pagination");
const search_1 = require("../components/search");
const about_1 = require("../components/about");
const navigation_1 = require("../components/navigation");
/**
 * Initialize the blog frontend functionality (homepage)
 */
function initializeBlogFrontend() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Initializing Blog Frontend Controller...');
        // Initialize navigation first to ensure active states are set
        (0, navigation_1.initializeNavigation)();
        // Initialize interactive components specific to the main page
        (0, contact_1.initializeContactForm)(); // Assumes #contact-btn and #contact-popup exist
        (0, about_1.initializeAbout)(); // Assumes #about-btn and #about-popup exist
        (0, search_1.initializeSearch)(); // Assumes .search-bar exists
        // Initialize the blog posts display, including filtering
        yield initializePosts();
        // Initialize pagination after initial posts (possibly filtered) are loaded
        (0, pagination_1.initializePagination)();
        // Set up event delegation for navigating when clicking blog cards
        setupBlogCardsDelegation();
        // Listen for custom event to reload posts (e.g., after search or filter change)
        document.addEventListener('reloadPosts', handleReloadPosts);
        console.log('Blog Frontend Controller Initialized.');
    });
}
/**
 * Handles the custom 'reloadPosts' event. Refetches and re-renders posts.
 */
function handleReloadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Reloading posts due to reloadPosts event...');
        // Re-initialize posts, which will pick up any new URL parameters (like search query OR tag)
        yield initializePosts();
        (0, pagination_1.initializePagination)();
        // Re-setup delegation in case DOM elements were replaced
        setupBlogCardsDelegation();
    });
}
/**
 * Set up event delegation for blog cards container
 * Handles clicks for navigation, preventing clicks on interactive elements.
 */
function setupBlogCardsDelegation() {
    // Target the main container for blog cards
    const blogCardsContainer = document.querySelector('#blog.blog-cards');
    if (blogCardsContainer) {
        // Remove listener first to prevent duplicates if initializeBlogFrontend is called again
        blogCardsContainer.removeEventListener('click', handleBlogCardClick);
        blogCardsContainer.addEventListener('click', handleBlogCardClick);
        console.log('Event delegation set up for #blog.blog-cards');
    }
    else {
        console.warn('Could not find #blog.blog-cards container for delegation.');
    }
}
/**
 * Handle click events on blog cards using event delegation
 */
function handleBlogCardClick(event) {
    const target = event.target;
    // Find the closest ancestor which is a blog card
    const card = target.closest('.blog-card');
    if (card) {
        // Prevent navigation if the click originated on an interactive element within the card
        if (target.closest('button, a, i')) {
            // Allow navigation specifically for tag links within the card
            if (target.closest('a.tag-badge')) {
                console.log('Clicked tag link, allowing default navigation.');
                return;
            }
            console.log('Clicked interactive element inside card, preventing navigation.');
            return;
        }
        // Get post ID and navigate if the card itself (not an interactive element) was clicked
        const postId = card.dataset.postId;
        if (postId) {
            console.log(`Navigating to post ${postId}`);
            // Use relative path for navigation to post detail page
            window.location.href = `post.html?id=${postId}`;
        }
    }
}
/**
 * Initialize blog posts: Fetch, filter (based on URL param), and render.
 */
function initializePosts() {
    return __awaiter(this, void 0, void 0, function* () {
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
        // --- End Base Path Logic ---
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
            // Insert filter indicator before the blog cards container
            const blogSection = document.getElementById('blog'); // Target the section itself
            if (blogSection === null || blogSection === void 0 ? void 0 : blogSection.parentNode) { // Ensure parent exists
                blogSection.parentNode.insertBefore(filterContainer, blogSection);
            }
            // Also update separate filter display element if it exists
            if (filterDisplay) {
                filterDisplay.textContent = `Showing posts tagged with: "${tagFilter}"`;
                filterDisplay.style.display = 'block';
            }
        }
        else if (filterDisplay) {
            filterDisplay.style.display = 'none'; // Hide if no filter
        }
        // --- End Check for Tag Filter ---
        try {
            blogCardsContainer.innerHTML = '<div class="loading-spinner"></div><p>Loading posts...</p>';
            // Fetch ALL posts from static JSON
            let allPosts = yield (0, api_1.fetchBlogPosts)();
            console.log(`Fetched ${allPosts.length} total posts.`);
            // --- Apply Tag Filter ---
            let postsToDisplay = allPosts; // Start with all posts
            if (tagFilter) {
                // Ensure tags array exists and perform case-insensitive comparison
                postsToDisplay = allPosts.filter(post => post.tags && post.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase()));
                console.log(`Filtered down to ${postsToDisplay.length} posts for tag: "${tagFilter}"`);
            }
            // --- End Apply Tag Filter ---
            blogCardsContainer.innerHTML = ''; // Clear loading state
            if (postsToDisplay.length === 0) {
                // Pass the tag filter to empty state message function
                showEmptyState(blogCardsContainer, tagFilter !== null && tagFilter !== void 0 ? tagFilter : undefined); // Use nullish coalescing for undefined
                const loadMoreBtn = document.getElementById('load-more-btn');
                if (loadMoreBtn)
                    loadMoreBtn.style.display = 'none';
                return;
            }
            // Pagination logic
            const initialPostCount = 6; // Number of posts to show initially
            const displayPosts = postsToDisplay.slice(0, initialPostCount);
            const hiddenPosts = postsToDisplay.slice(initialPostCount);
            // Render initially visible posts
            displayPosts.forEach(post => {
                const blogCard = (0, blogCards_1.createBlogCardElement)(post);
                blogCardsContainer.appendChild(blogCard);
            });
            // Prepare hidden posts container for pagination
            const hiddenPostsContainer = document.getElementById('hidden-posts');
            if (hiddenPostsContainer) {
                hiddenPostsContainer.innerHTML = ''; // Clear previous hidden posts
                hiddenPosts.forEach(post => {
                    const blogCard = (0, blogCards_1.createBlogCardElement)(post);
                    hiddenPostsContainer.appendChild(blogCard);
                });
            }
            // Update load more button visibility
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = hiddenPosts.length > 0 ? 'block' : 'none';
            }
        }
        catch (error) {
            console.error('Error initializing posts:', error);
            showErrorState(blogCardsContainer); // Show error state in the container
        }
    });
}
/**
 * Show empty state when no posts are available
 * @param container - The container element
 * @param tagFilter - Optional tag filter that was used
 */
function showEmptyState(container, tagFilter) {
    container.innerHTML = '';
    const emptyStateDiv = document.createElement('div');
    emptyStateDiv.className = 'empty-state';
    // Determine the correct base path for the "View all posts" link
    const currentHostname = window.location.hostname;
    const isProduction = currentHostname === 'noelugwoke.com' || currentHostname.endsWith('.github.io');
    const basePath = isProduction ? '/blog/' : '/';
    const message = tagFilter
        ? `No posts found tagged with "${tagFilter}".`
        : 'No posts yet!'; // Changed default message slightly
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
function showErrorState(container) {
    container.innerHTML = '';
    const errorStateDiv = document.createElement('div');
    errorStateDiv.className = 'error-state';
    errorStateDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle fa-3x"></i>
        <h3>Something went wrong</h3>
        <p>Failed to load blog posts. Please try refreshing the page.</p>
    `;
    container.appendChild(errorStateDiv);
    console.log('Displayed error state for posts.');
}
