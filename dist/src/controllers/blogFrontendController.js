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
const api_1 = require("../services/api");
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
        // Fetch all posts first
        const allPosts = yield (0, api_1.fetchBlogPosts)();
        if (!allPosts || allPosts.length === 0)
            return;
        // 1) Hero
        renderLatestHero(allPosts);
        // 2) Initialize posts (excluding the hero posts)
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = (_a = urlParams.get('search')) !== null && _a !== void 0 ? _a : undefined;
        yield initializePosts(searchTerm, allPosts.slice(3));
        initializePagination();
        setupBlogCardsDelegation();
        document.addEventListener('reloadPosts', handleReloadPosts);
    });
}
/**
 * Handles the custom 'reloadPosts' event. Refetches and re-renders posts and hero.
 */
function handleReloadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Fetch all posts again
        const allPosts = yield (0, api_1.fetchBlogPosts)();
        if (!allPosts || allPosts.length === 0)
            return;
        // Update hero
        renderLatestHero(allPosts);
        // Remove hero posts from grid
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = (_a = urlParams.get('search')) !== null && _a !== void 0 ? _a : undefined;
        yield initializePosts(searchTerm, allPosts.slice(3));
        initializePagination();
        setupBlogCardsDelegation();
    });
}
/**
 * Set up event delegation for blog cards container
 */
function setupBlogCardsDelegation() {
    // Replace blog container selector to match new HTML
    const blogCardsContainer = document.querySelector('.posts-grid');
    if (blogCardsContainer) {
        blogCardsContainer.removeEventListener('click', handleBlogCardClick); // Prevent duplicates
        blogCardsContainer.addEventListener('click', handleBlogCardClick);
    }
    else {
        console.warn('Could not find .posts-grid container for delegation.');
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
function initializePosts(searchTerm, allPostsParam) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const blogCardsContainer = document.querySelector('.posts-grid');
        if (!blogCardsContainer) {
            console.error('Posts grid (.posts-grid) container not found. Skipping post initialization.');
            return;
        }
        // --- Check for Tag Filter & SearchTerm ---
        const urlParams = new URLSearchParams(window.location.search);
        const tagFilter = (_a = urlParams.get('tag')) !== null && _a !== void 0 ? _a : undefined;
        // Hide the hero section if filtering or searching
        const heroSection = document.getElementById('latest-hero');
        if (tagFilter || searchTerm) {
            heroSection === null || heroSection === void 0 ? void 0 : heroSection.classList.add('hidden-by-search');
        }
        else {
            heroSection === null || heroSection === void 0 ? void 0 : heroSection.classList.remove('hidden-by-search');
        }
        // Optional UI indicator for tag filter
        const filterDisplay = document.getElementById('filter-display');
        const currentHostname = window.location.hostname;
        const isProduction = currentHostname === 'noelugwoke.com' ||
            currentHostname.endsWith('.github.io');
        const basePath = isProduction ? '/blog/' : '/';
        // Remove any old indicator
        (_b = document.querySelector('.tag-filter-indicator')) === null || _b === void 0 ? void 0 : _b.remove();
        if (tagFilter) {
            const filterContainer = document.createElement('div');
            filterContainer.className = 'tag-filter-indicator';
            filterContainer.innerHTML = `
      <p>Showing posts tagged with: <span class="filtered-tag">${tagFilter}</span></p>
      <a href="${basePath}" class="clear-filter"></a>
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
        // --- End Filter UI ---
        try {
            blogCardsContainer.innerHTML =
                '<div class="loading-spinner"></div><p>Loading posts...</p>';
            let allPosts = allPostsParam || (yield (0, api_1.fetchBlogPosts)());
            // --- Apply Tag Filter ---
            let postsToDisplay = allPosts;
            if (tagFilter) {
                postsToDisplay = allPosts.filter((post) => { var _a; return (_a = post.tags) === null || _a === void 0 ? void 0 : _a.some((t) => t.toLowerCase() === tagFilter.toLowerCase()); });
                state_1.frontendState.filteredTag = tagFilter;
            }
            else {
                state_1.frontendState.filteredTag = undefined;
            }
            // --- Apply Search Filter ---
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                postsToDisplay = postsToDisplay.filter((post) => post.title.toLowerCase().includes(term) ||
                    post.content.toLowerCase().includes(term) ||
                    post.tags.some((t) => t.toLowerCase().includes(term)));
            }
            blogCardsContainer.innerHTML = '';
            if (postsToDisplay.length === 0) {
                showEmptyState(blogCardsContainer, tagFilter);
                (_c = document.getElementById('load-more-btn')) === null || _c === void 0 ? void 0 : _c.setAttribute('style', 'display:none;');
                return;
            }
            // --- Pagination / Load More ---
            const initialCount = state_1.frontendState.postsPerPage;
            const displayPosts = postsToDisplay.slice(0, initialCount);
            const hiddenPosts = postsToDisplay.slice(initialCount);
            displayPosts.forEach((post) => {
                blogCardsContainer.appendChild((0, blogCards_1.createBlogCardElement)(post));
            });
            const hiddenContainer = document.getElementById('hidden-posts');
            if (hiddenContainer) {
                hiddenContainer.innerHTML = '';
                hiddenPosts.forEach((post) => hiddenContainer.appendChild((0, blogCards_1.createBlogCardElement)(post)));
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
    const visibleContainer = document.querySelector('.posts-grid');
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
    const visibleContainer = document.querySelector('.posts-grid');
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
/**
 * Picks the newest post and renders it as a big hero at the top.
 */
function renderLatestHero(posts) {
    const hero = document.getElementById('latest-hero');
    const [main, second, third] = posts;
    const fmt = (d) => new Date(d)
        .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    hero.innerHTML = `
    <a href="post.html?id=${main.id}" class="hero-large">
      <img src="${main.imageUrl}" alt="${main.title}" class="hero-large-image" />
      <div class="hero-overlay">
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
function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || '';
}
