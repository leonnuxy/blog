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
// blogFrontendController.ts
/**
 * Blog Frontend Controller
 * Client-side controller that handles all frontend functionality for the blog homepage.
 * Manages UI initialization, post rendering, filtering, pagination, and user interactions.
 */
const api_1 = require("../services/api"); // Uses static fetch now
const blogCards_1 = require("../components/blogCards");
const navigation_1 = require("../components/navigation/navigation");
const state_1 = require("./state");
/**
 * Initialize the blog frontend functionality (homepage)
 */
function initializeBlogFrontend() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        (0, navigation_1.initializeNavigation)();
        // Initialize posts, which now includes filtering based on URL params
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = (_a = urlParams.get('search')) !== null && _a !== void 0 ? _a : undefined;
        yield initializePosts(searchTerm);
        initializePagination(); // Now calls our local function, not the component
        setupBlogCardsDelegation();
        // Listen for custom event to reload posts (e.g., after search or filter change)
        document.addEventListener('reloadPosts', handleReloadPosts);
    });
}
/**
 * Handles the custom 'reloadPosts' event. Refetches and re-renders posts.
 */
function handleReloadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Re-initialize posts, which will pick up any new URL parameters (like search query OR tag)
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = (_a = urlParams.get('search')) !== null && _a !== void 0 ? _a : undefined;
        yield initializePosts(searchTerm);
        initializePagination();
        setupBlogCardsDelegation();
    });
}
/**
 * Set up event delegation for blog cards container
 */
function setupBlogCardsDelegation() {
    const blogCardsContainer = document.querySelector('#blog.blog-cards');
    if (blogCardsContainer) {
        blogCardsContainer.removeEventListener('click', handleBlogCardClick); // Prevent duplicates
        blogCardsContainer.addEventListener('click', handleBlogCardClick);
    }
    else {
        console.warn('Could not find #blog.blog-cards container for delegation.');
    }
}
/**
 * Handle click events on blog cards for navigation
 */
function handleBlogCardClick(event) {
    const target = event.target;
    const card = target.closest('.blog-card');
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
function initializePosts(searchTerm) {
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
            if (blogSection === null || blogSection === void 0 ? void 0 : blogSection.parentNode) {
                blogSection.parentNode.insertBefore(filterContainer, blogSection);
            }
            if (filterDisplay) {
                filterDisplay.textContent = `Showing posts tagged with: "${tagFilter}"`;
                filterDisplay.style.display = 'block';
            }
        }
        else if (filterDisplay) {
            filterDisplay.style.display = 'none';
        }
        // --- End Check for Tag Filter ---
        try {
            blogCardsContainer.innerHTML = '<div class="loading-spinner"></div><p>Loading posts...</p>';
            let allPosts = yield (0, api_1.fetchBlogPosts)();
            // --- Apply Tag Filter ---
            let postsToDisplay = allPosts;
            if (tagFilter) {
                postsToDisplay = allPosts.filter(post => post.tags && post.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase()));
                // Store the filtered tag in frontend state
                state_1.frontendState.filteredTag = tagFilter;
            }
            else {
                state_1.frontendState.filteredTag = undefined;
            }
            // --- End Apply Tag Filter ---
            // --- Apply Search Filter ---
            if (searchTerm) {
                postsToDisplay = postsToDisplay.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
            }
            // --- End Apply Search Filter ---
            blogCardsContainer.innerHTML = '';
            if (postsToDisplay.length === 0) {
                showEmptyState(blogCardsContainer, tagFilter !== null && tagFilter !== void 0 ? tagFilter : undefined);
                const loadMoreBtn = document.getElementById('load-more-btn');
                if (loadMoreBtn)
                    loadMoreBtn.style.display = 'none';
                return;
            }
            // Pagination logic
            const initialPostCount = state_1.frontendState.postsPerPage;
            const displayPosts = postsToDisplay.slice(0, initialPostCount);
            const hiddenPosts = postsToDisplay.slice(initialPostCount);
            displayPosts.forEach(post => {
                const blogCard = (0, blogCards_1.createBlogCardElement)(post);
                blogCardsContainer.appendChild(blogCard);
            });
            const hiddenPostsContainer = document.getElementById('hidden-posts');
            if (hiddenPostsContainer) {
                hiddenPostsContainer.innerHTML = '';
                hiddenPosts.forEach(post => {
                    const blogCard = (0, blogCards_1.createBlogCardElement)(post);
                    hiddenPostsContainer.appendChild(blogCard);
                });
            }
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
 */
function showEmptyState(container, tagFilter) {
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
function showErrorState(container) {
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
function initializePagination() {
    setupLoadMoreButton();
    updatePaginationControls();
}
/**
 * Set up the "Load More" button functionality
 */
function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenPostsContainer = document.getElementById('hidden-posts');
    const visibleContainer = document.querySelector('#blog.blog-cards');
    if (!loadMoreBtn || !hiddenPostsContainer || !visibleContainer)
        return;
    // Remove existing event listener to prevent duplicates
    loadMoreBtn.removeEventListener('click', handleLoadMore);
    // Add event listener
    loadMoreBtn.addEventListener('click', handleLoadMore);
}
/**
 * Handle the "Load More" button click
 */
function handleLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenPostsContainer = document.getElementById('hidden-posts');
    const visibleContainer = document.querySelector('#blog.blog-cards');
    if (!loadMoreBtn || !hiddenPostsContainer || !visibleContainer)
        return;
    // Get posts to show (use a reasonable batch size)
    const postsToShow = Array.from(hiddenPostsContainer.children).slice(0, state_1.frontendState.postsPerPage);
    // Move posts from hidden to visible container
    postsToShow.forEach(post => {
        visibleContainer.appendChild(post);
    });
    // Hide button if no more hidden posts
    if (hiddenPostsContainer.children.length === 0) {
        loadMoreBtn.style.display = 'none';
    }
    // Dispatch state change for analytics or other components
    (0, state_1.dispatchStateChange)('frontend', 'loadedMorePosts');
}
/**
 * Update pagination controls visibility based on current state
 */
function updatePaginationControls() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenPostsContainer = document.getElementById('hidden-posts');
    if (loadMoreBtn && hiddenPostsContainer) {
        loadMoreBtn.style.display = hiddenPostsContainer.children.length > 0 ? 'block' : 'none';
    }
}
