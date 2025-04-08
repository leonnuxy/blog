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
 * Client-side controller that handles all frontend functionality for the blog.
 * Manages UI initialization, post rendering, and user interactions.
 */
const api_1 = require("../services/api");
const blogCards_1 = require("../components/blogCards");
const comments_1 = require("../components/comments");
const darkMode_1 = require("../components/darkMode");
const contact_1 = require("../components/contact");
const pagination_1 = require("../components/pagination");
const search_1 = require("../components/search");
const about_1 = require("../components/about");
const navigation_1 = require("../components/navigation");
/**
 * Initialize the blog functionality
 * Sets up all UI components and initializes the blog posts display
 */
function initializeBlogFrontend() {
    return __awaiter(this, void 0, void 0, function* () {
        // Check for system dark mode preference first
        (0, darkMode_1.checkSystemDarkModePreference)();
        // Initialize navigation first to ensure active states are set
        (0, navigation_1.initializeNavigation)();
        // Initialize all UI components
        (0, darkMode_1.initializeDarkMode)();
        (0, contact_1.initializeContactForm)();
        (0, about_1.initializeAbout)(); // Initialize About popup
        (0, search_1.initializeSearch)();
        // Initialize the blog posts
        yield initializePosts();
        // Initialize pagination after posts are loaded
        (0, pagination_1.initializePagination)();
        // Initialize comments functionality
        (0, comments_1.initializeComments)();
        // Set up event delegation for blog cards
        setupBlogCardsDelegation();
        // Add event listener for reloading posts (used by search)
        document.addEventListener('reloadPosts', () => __awaiter(this, void 0, void 0, function* () {
            yield initializePosts();
            (0, pagination_1.initializePagination)();
            // Make sure event delegation is set up again after reloading posts
            setupBlogCardsDelegation();
        }));
    });
}
/**
 * Set up event delegation for blog cards container
 * More efficient than attaching event listeners to each card
 */
function setupBlogCardsDelegation() {
    // Get both primary and hidden blog containers
    const blogContainers = [
        document.querySelector('.blog-cards'),
        document.getElementById('hidden-posts')
    ];
    // Apply delegation to each container
    blogContainers.forEach(container => {
        if (!container)
            return;
        // Remove existing event listener if it exists (to prevent duplicates)
        container.removeEventListener('click', handleBlogCardClick);
        // Add the new event listener
        container.addEventListener('click', handleBlogCardClick);
    });
}
/**
 * Handle click events on blog cards using event delegation
 */
function handleBlogCardClick(event) {
    const target = event.target;
    // Find the closest blog card to the clicked element
    const card = target.closest('.blog-card');
    if (card) {
        // Don't navigate if clicking on buttons, links, or icons
        if (target.closest('button') ||
            target.closest('a') ||
            target.tagName.toLowerCase() === 'i') {
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
function initializePosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const blogCardsContainer = document.querySelector('.blog-cards');
        if (!blogCardsContainer) {
            console.warn('Blog cards container not found in the DOM');
            return;
        }
        try {
            // Clear loading placeholder or existing content
            blogCardsContainer.innerHTML = '<div class="loading-spinner"></div>';
            // Fetch posts from API
            const posts = yield (0, api_1.fetchBlogPosts)();
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
                const blogCard = (0, blogCards_1.createBlogCardElement)(post);
                blogCardsContainer.appendChild(blogCard);
            });
            // Add hidden posts to hidden container
            const hiddenPostsContainer = document.getElementById('hidden-posts');
            if (hiddenPostsContainer) {
                hiddenPostsContainer.innerHTML = '';
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
            showErrorState(blogCardsContainer);
        }
    });
}
/**
 * Show empty state when no posts are available
 * Creates and appends DOM elements instead of using innerHTML for better maintainability
 */
function showEmptyState(container) {
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
function showErrorState(container) {
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
