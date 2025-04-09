/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/about.ts":
/*!*********************************!*\
  !*** ./src/components/about.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


// About popup functionality
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeAbout = initializeAbout;
/**
 * Initialize the About section popup
 */
function initializeAbout() {
    const aboutBtn = document.getElementById('about-btn');
    const aboutPopup = document.getElementById('about-popup');
    const closePopup = document.querySelector('#about-popup .close-popup');
    if (!aboutBtn || !aboutPopup || !closePopup) {
        console.warn('About popup elements not found in the DOM');
        return;
    }
    // Open popup when about button is clicked
    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        aboutPopup.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while popup is open
        // Add active class to about link
        aboutBtn.classList.add('active');
    });
    // Close popup when close button is clicked
    closePopup.addEventListener('click', () => {
        aboutPopup.classList.remove('open');
        document.body.style.overflow = '';
        // Revert to home active state when closing popup
        setDefaultActiveLink();
    });
    // Close when clicking outside the popup content
    aboutPopup.addEventListener('click', (e) => {
        if (e.target === aboutPopup) {
            aboutPopup.classList.remove('open');
            document.body.style.overflow = '';
            // Revert to home active state when closing popup
            setDefaultActiveLink();
        }
    });
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutPopup.classList.contains('open')) {
            aboutPopup.classList.remove('open');
            document.body.style.overflow = '';
            // Revert to home active state when closing popup
            setDefaultActiveLink();
        }
    });
}
/**
 * Helper function to set the default active link state
 */
function setDefaultActiveLink() {
    // Get current hash or default to home
    const currentHash = window.location.hash || '#home';
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    // Add active class to current hash link
    const currentLink = document.querySelector(`header nav ul li a[href="${currentHash}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
}


/***/ }),

/***/ "./src/components/blogCards.ts":
/*!*************************************!*\
  !*** ./src/components/blogCards.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createBlogCardElement = createBlogCardElement;
const urlTransformer_1 = __webpack_require__(/*! ../utils/urlTransformer */ "./src/utils/urlTransformer.ts"); // Import the URL generator
/**
 * Creates a DOM element for a blog card from post data (display only for actions)
 */
function createBlogCardElement(post) {
    const blogCard = document.createElement('div');
    blogCard.className = 'blog-card';
    blogCard.dataset.postId = String(post.id);
    blogCard.style.cursor = 'pointer';
    const commentCount = post.comments ? post.comments.length : 0;
    const createdDate = new Date(post.createdAt);
    const dateStr = createdDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    // --- Dynamic URL and Text Generation for Sharing ---
    const postUrl = `post.html?id=${String(post.id)}`;
    const encodedUrl = encodeURIComponent(postUrl);
    const shareText = `Check out this article: ${post.title}`;
    const encodedShareText = encodeURIComponent(shareText);
    // --- End Dynamic URL Generation ---
    // Generate HTML for tag badges/links using the utility function
    let tagsHTML = '';
    if (post.tags && post.tags.length > 0) {
        tagsHTML = '<div class="post-tags">' +
            post.tags.map(tag => 
            // Use generateTagFilterUrl for href in an <a> tag
            `<a href="${(0, urlTransformer_1.generateTagFilterUrl)(tag)}" class="tag-badge">${tag}</a>`).join('') +
            '</div>';
    }
    const fallbackImageUrl = 'images/blog_image_3.jpeg'; // Relative path
    // Create HTML for blog card
    blogCard.innerHTML = `
        <img src="${post.imageUrl || fallbackImageUrl}" alt="${post.title}"> 
        <div class="blog-card-content">
            <p class="blog-card-date-author">${dateStr}</p>
            <h3 class="blog-card-title">${post.title}</h3>
            ${tagsHTML}
            <div class="post-actions">
                <div class="social-sharing">
                    <button class="share-button twitter" aria-label="Share on Twitter" data-url="${encodedUrl}" data-text="${encodedShareText}"><i class="fab fa-twitter"></i></button>
                    <button class="share-button facebook" aria-label="Share on Facebook" data-url="${encodedUrl}"><i class="fab fa-facebook-f"></i></button>
                    <button class="share-button linkedin" aria-label="Share on LinkedIn" data-url="${encodedUrl}"><i class="fab fa-linkedin-in"></i></button>
                </div>
            </div>
        </div>
    `;
    // Setup social sharing listeners (as before)
    const socialSharingDiv = blogCard.querySelector('.social-sharing');
    if (socialSharingDiv) {
        socialSharingDiv.addEventListener('click', (event) => {
            // ... existing social sharing click logic ...
            const button = event.target.closest('.share-button');
            if (!button)
                return;
            event.stopPropagation();
            const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
            const relativeUrl = button.dataset.url ? decodeURIComponent(button.dataset.url) : `post.html?id=${post.id}`;
            const fullUrl = `${window.location.origin}${basePath}${relativeUrl}`;
            const encodedFullUrl = encodeURIComponent(fullUrl);
            const text = button.dataset.text ? decodeURIComponent(button.dataset.text) : document.title;
            const encodedText = encodeURIComponent(text);
            let shareWindowUrl = '';
            if (button.classList.contains('twitter')) {
                shareWindowUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedFullUrl}`;
                window.open(shareWindowUrl, 'twitter-share', 'width=550,height=235');
            }
            else if (button.classList.contains('facebook')) {
                shareWindowUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedFullUrl}`;
                window.open(shareWindowUrl, 'facebook-share', 'width=550,height=435');
            }
            else if (button.classList.contains('linkedin')) {
                shareWindowUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedFullUrl}`;
                window.open(shareWindowUrl, 'linkedin-share', 'width=550,height=435');
            }
        });
    }
    // REMOVED: Separate event listener loop for tag badges (now handled by standard <a> tags)
    return blogCard;
}


/***/ }),

/***/ "./src/components/comments.ts":
/*!************************************!*\
  !*** ./src/components/comments.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeComments = initializeComments;
exports.initializeCommentsFunctionality = initializeCommentsFunctionality;
/**
 * Initialize comments functionality for blog posts
 */
function initializeComments() {
    setupCommentToggles();
    setupCommentForms();
}
/**
 * Initialize comments functionality for a specific blog post element
 */
function initializeCommentsFunctionality(postElement) {
    const toggle = postElement.querySelector('.comments-toggle');
    const form = postElement.querySelector('.comment-form');
    if (toggle) {
        setupCommentToggle(toggle);
    }
    if (form) {
        setupCommentForm(form);
    }
}
/**
 * Set up comment toggle buttons
 */
function setupCommentToggles() {
    const commentToggles = document.querySelectorAll('.comments-toggle');
    commentToggles.forEach(toggle => {
        setupCommentToggle(toggle);
    });
}
/**
 * Set up a single comment toggle button
 */
function setupCommentToggle(toggle) {
    toggle.addEventListener('click', () => {
        var _a, _b;
        const postId = toggle.getAttribute('data-post-id');
        const commentsSection = document.getElementById(`comments-${postId}`);
        if (commentsSection) {
            commentsSection.classList.toggle('active');
            // Change button text based on state
            if (commentsSection.classList.contains('active')) {
                toggle.innerHTML = `<i class="fas fa-times"></i> Hide Comments <span class="comments-count">${(_a = toggle.querySelector('.comments-count')) === null || _a === void 0 ? void 0 : _a.textContent}</span>`;
            }
            else {
                toggle.innerHTML = `<i class="fas fa-comment"></i> Comments <span class="comments-count">${(_b = toggle.querySelector('.comments-count')) === null || _b === void 0 ? void 0 : _b.textContent}</span>`;
            }
        }
    });
}
/**
 * Set up comment forms
 */
function setupCommentForms() {
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
        setupCommentForm(form);
    });
}
/**
 * Set up a single comment form
 */
function setupCommentForm(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const postId = form.getAttribute('data-post-id');
        const commentsContainer = document.querySelector(`#comments-${postId} .comments-list`);
        if (!commentsContainer)
            return;
        const nameInput = form.querySelector('input[name="name"]');
        const commentInput = form.querySelector('textarea[name="comment"]');
        // Check if inputs are not empty
        if (nameInput.value.trim() === '' || commentInput.value.trim() === '') {
            return;
        }
        addNewComment(postId, commentsContainer, nameInput.value, commentInput.value);
        // Reset form
        form.reset();
    });
}
/**
 * Add a new comment to the comments list
 */
function addNewComment(postId, commentsContainer, name, commentText) {
    // Create new comment
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    // Get current date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    // Comment HTML structure
    newComment.innerHTML = `
        <div class="comment-avatar">
            <i class="fas fa-user-circle"></i>
        </div>
        <div class="comment-content">
            <p class="comment-author">${name}</p>
            <p class="comment-text">${commentText}</p>
            <p class="comment-date">${dateStr}</p>
        </div>
    `;
    // Remove "no comments yet" message if it exists
    const noComments = commentsContainer.querySelector('.no-comments');
    if (noComments) {
        commentsContainer.removeChild(noComments);
    }
    // Add the new comment to the top of the list
    commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
    // Update comment count
    updateCommentCount(postId);
}
/**
 * Update the comment count for a post
 */
function updateCommentCount(postId) {
    var _a;
    const countSpan = document.querySelector(`button[data-post-id="${postId}"] .comments-count`);
    if (countSpan) {
        let count = parseInt(((_a = countSpan.textContent) === null || _a === void 0 ? void 0 : _a.replace(/[()]/g, '')) || '0') + 1;
        countSpan.textContent = `(${count})`;
    }
}


/***/ }),

/***/ "./src/components/darkMode.ts":
/*!************************************!*\
  !*** ./src/components/darkMode.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


// Dark mode functionality
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeDarkMode = initializeDarkMode;
exports.checkSystemDarkModePreference = checkSystemDarkModePreference;
/**
 * Initialize dark mode toggle
 * This creates a floating dark mode toggle button and adds it to the DOM
 */
function initializeDarkMode() {
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon
    darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    // Check if dark mode preference is already set in local storage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
    }
    // Add click event listener
    darkModeToggle.addEventListener('click', toggleDarkMode);
    // Add button to the DOM
    document.body.appendChild(darkModeToggle);
}
/**
 * Toggle dark mode on and off
 */
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    // Update icon based on mode
    if (darkModeToggle) {
        if (isDarkMode) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
        }
        else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
        }
    }
    // Save preference to local storage
    localStorage.setItem('darkMode', isDarkMode.toString());
}
/**
 * Check if user has system dark mode preference
 * If they do and we haven't set a preference yet, apply dark mode
 */
function checkSystemDarkModePreference() {
    // Only check if user hasn't explicitly set a preference
    if (localStorage.getItem('darkMode') === null) {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            document.body.classList.add('dark-mode');
            const darkModeToggle = document.querySelector('.dark-mode-toggle');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon
            }
            localStorage.setItem('darkMode', 'true');
        }
    }
}


/***/ }),

/***/ "./src/components/header.ts":
/*!**********************************!*\
  !*** ./src/components/header.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


// src/components/header.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderHeader = renderHeader;
/**
 * Header Component
 * Renders the header section into a target container.
 * Event listeners should be attached separately after calling this function.
 * @param containerId - The ID of the element to render the header into. Defaults to 'header-placeholder'.
 */
function renderHeader(containerId = 'header-placeholder') {
    // Ensure running in a browser environment
    if (typeof document === 'undefined') {
        return;
    }
    const headerContainer = document.getElementById(containerId);
    if (!headerContainer) {
        return;
    }
    // --- Determine Base Path based on Environment ---
    // Checks if running on the production custom domain root or github.io
    // Adjust 'noelugwoke.com' if your actual production hostname differs
    const isProduction = window.location.hostname === 'noelugwoke.com' || window.location.hostname.endsWith('.github.io');
    // Define the base path for links. Assumes deployment is under /blog/ on production.
    // *** IMPORTANT: Change '/blog/' if your GitHub repo name (and thus subdirectory) is different ***
    const basePath = isProduction ? '/blog/' : '/';
    // --- End Base Path Logic ---
    // Define the header HTML structure using the basePath for links
    headerContainer.innerHTML = `
        <header class="site-header">
            <h1><a href="${basePath}">Blog</a></h1> 
            <nav>
                <ul>
                    <li><a href="${basePath}">Home</a></li> 
                    <li><a href="${basePath}#about" id="about-btn">About</a></li>
                    <li><a href="https://noelugwoke.com/">Portfolio</a></li>
                </ul>
            </nav>
            <input type="search" placeholder="Search for articles..." class="search-bar"> 
        </header>
    `;
    // Event listeners should be called *after* renderHeader is executed.
}


/***/ }),

/***/ "./src/components/navigation.ts":
/*!**************************************!*\
  !*** ./src/components/navigation.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


/**
 * Navigation functionality
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeNavigation = initializeNavigation;
/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    setActiveNavLink();
    setupNavLinks();
}
/**
 * Set active navigation link based on current URL or page section
 */
function setActiveNavLink() {
    const currentPath = window.location.hash || '#home';
    updateActiveNavLink(currentPath);
}
/**
 * Setup click handlers for navigation links
 */
function setupNavLinks() {
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            if (href) {
                updateActiveNavLink(href);
            }
        });
    });
    // Handle special cases for popup links
    const aboutBtn = document.getElementById('about-btn');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', () => {
            updateActiveNavLink('#about');
        });
    }
}
/**
 * Update the active navigation link
 * @param path The path or section ID to activate
 */
function updateActiveNavLink(path) {
    // Remove active class from all links
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    // Add active class to matching link
    const activeLink = document.querySelector(`header nav ul li a[href="${path}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}


/***/ }),

/***/ "./src/components/pagination.ts":
/*!**************************************!*\
  !*** ./src/components/pagination.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializePagination = initializePagination;
// Pagination functionality
const comments_1 = __webpack_require__(/*! ./comments */ "./src/components/comments.ts");
/**
 * Initialize pagination functionality with Load More button
 */
function initializePagination() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenPosts = document.getElementById('hidden-posts');
    const blogCardsContainer = document.querySelector('.blog-cards');
    if (!loadMoreBtn || !hiddenPosts || !blogCardsContainer) {
        console.warn('Pagination elements not found in the DOM');
        return;
    }
    let currentPage = 1;
    const postsPerPage = 3;
    const totalHiddenPosts = hiddenPosts.children.length;
    // Hide load more button if no hidden posts
    if (totalHiddenPosts === 0) {
        loadMoreBtn.style.display = 'none';
    }
    // Set up load more button click handler
    loadMoreBtn.addEventListener('click', () => {
        loadMorePosts(loadMoreBtn, hiddenPosts, blogCardsContainer, currentPage, postsPerPage);
        currentPage++;
    });
    // Initialize scroll-based loading (infinite scroll)
    initializeInfiniteScroll(loadMoreBtn);
}
/**
 * Load more posts when the load more button is clicked
 */
function loadMorePosts(loadMoreBtn, hiddenPosts, blogCardsContainer, currentPage, postsPerPage) {
    // Show loading state
    loadMoreBtn.classList.add('loading');
    loadMoreBtn.innerHTML = '<span class="spinner"></span> Loading...';
    // Simulate loading delay for better UX
    setTimeout(() => {
        // Calculate which posts to load
        const startIdx = (currentPage - 1) * postsPerPage;
        const endIdx = Math.min(startIdx + postsPerPage, hiddenPosts.children.length);
        let postsLoaded = 0;
        // Clone and move posts from hidden container to visible blog cards
        for (let i = 0; i < postsPerPage && hiddenPosts.children.length > 0; i++) {
            const postToAdd = hiddenPosts.children[0]; // Always take the first element
            if (postToAdd) {
                const clonedPost = postToAdd.cloneNode(true);
                clonedPost.classList.add('new'); // Add class for animation
                blogCardsContainer.appendChild(clonedPost);
                hiddenPosts.removeChild(postToAdd);
                postsLoaded++;
                // Initialize comments functionality for the new posts
                (0, comments_1.initializeCommentsFunctionality)(clonedPost);
            }
        }
        // Check if we've loaded all posts
        if (hiddenPosts.children.length === 0) {
            loadMoreBtn.style.display = 'none';
        }
        // Reset button state
        loadMoreBtn.classList.remove('loading');
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Posts';
        // Dispatch custom event when posts are loaded
        const event = new CustomEvent('postsLoaded', { detail: { count: postsLoaded } });
        document.dispatchEvent(event);
    }, 800); // Simulate network delay
}
/**
 * Initialize infinite scroll functionality
 */
function initializeInfiniteScroll(loadMoreBtn) {
    let scrollTimeout;
    let isLoadingMorePosts = false;
    window.addEventListener('scroll', () => {
        // If the button is hidden (all posts loaded) or already in loading state, do nothing
        if (loadMoreBtn.style.display === 'none' ||
            loadMoreBtn.classList.contains('loading') ||
            isLoadingMorePosts) {
            return;
        }
        clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(() => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            // When user scrolls to bottom (with some buffer)
            if (scrollTop + clientHeight >= scrollHeight - 200) {
                isLoadingMorePosts = true;
                loadMoreBtn.click();
                // Reset flag after animation completes
                setTimeout(() => {
                    isLoadingMorePosts = false;
                }, 1000);
            }
        }, 200);
    });
}


/***/ }),

/***/ "./src/components/search.ts":
/*!**********************************!*\
  !*** ./src/components/search.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


// src/components/search.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeSearch = initializeSearch;
// Note: fetchBlogPosts and createBlogCardElement imports might not be needed 
// if this script only filters already rendered cards. Removed them for now.
// import { fetchBlogPosts } from '../services/api'; 
// import { createBlogCardElement } from './blogCards';
/**
 * Initializes a simple, client-side search functionality for blog posts.
 * Filters currently visible blog cards on the page as the user types.
 */
function initializeSearch() {
    var _a;
    const searchBar = document.querySelector('.search-bar');
    const blogCardsContainer = document.querySelector('#blog.blog-cards'); // Target the main container
    if (!searchBar || !blogCardsContainer) {
        console.warn('Search bar (.search-bar) or blog cards container (#blog.blog-cards) not found. Search not initialized.');
        return;
    }
    // Create a search indicator element (optional)
    const searchIndicator = document.createElement('div');
    searchIndicator.className = 'search-indicator'; // Add class for styling
    searchIndicator.setAttribute('aria-live', 'polite'); // Announce changes to screen readers
    searchIndicator.style.display = 'none'; // Start hidden
    // Insert the indicator before the blog cards container
    (_a = blogCardsContainer.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(searchIndicator, blogCardsContainer);
    // Optional: Wrap search bar for styling or adding clear button (if not already done)
    // This example assumes the search bar is already placed correctly in the header HTML
    // Keep track of all blog cards - will be populated on first filter
    let allCards = [];
    // Handle search input with debounce
    let debounceTimer;
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.trim().toLowerCase();
        // Debounce the filtering
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterBlogCards(searchTerm);
        }, 300); // 300ms delay
    });
    /**
     * Filters blog cards based on search term by adding/removing a CSS class.
     * @param term - The search term (lowercase).
     */
    function filterBlogCards(term) {
        // Get all cards currently in the main container OR hidden container if they exist
        // This ensures we filter everything, even paginated items if they are in the DOM
        // If pagination removes items from DOM, this needs adjustment.
        if (allCards.length === 0) { // Populate on first run or if cleared
            allCards = Array.from(document.querySelectorAll('#blog.blog-cards .blog-card, #hidden-posts .blog-card'));
            if (allCards.length === 0) {
                console.log("No blog cards found to filter.");
                return; // No cards rendered yet
            }
            console.log(`Search filtering initialized with ${allCards.length} cards.`);
        }
        let visibleCount = 0;
        allCards.forEach(card => {
            var _a, _b;
            let matchesSearch = false;
            if (!term) {
                // If no search term, show all cards
                matchesSearch = true;
            }
            else {
                // Get text content from important elements within the card
                const title = ((_b = (_a = card.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
                // Add other searchable fields if needed (e.g., excerpt, author)
                // const excerpt = card.querySelector('.blog-card-excerpt')?.textContent?.toLowerCase() || ''; 
                const tags = Array.from(card.querySelectorAll('.tag-badge')) // Assumes tags are rendered
                    .map(tag => { var _a; return ((_a = tag.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || ''; });
                // Check if the card matches the search term
                matchesSearch =
                    title.includes(term) ||
                        // excerpt.includes(term) || 
                        tags.some(tag => tag.includes(term));
            }
            // Show or hide the card using CSS class
            if (matchesSearch) {
                card.classList.remove('hidden-by-search');
                visibleCount++;
            }
            else {
                card.classList.add('hidden-by-search');
            }
        });
        // Show/Hide/Update the search indicator text
        if (term) {
            searchIndicator.textContent = visibleCount > 0
                ? `Showing ${visibleCount} result${visibleCount > 1 ? 's' : ''} for "${term}"`
                : `No results found for "${term}"`;
            searchIndicator.style.display = 'block';
        }
        else {
            searchIndicator.style.display = 'none'; // Hide indicator if search is cleared
        }
        // Handle "No results" message specifically within the container
        const noResultsMessage = blogCardsContainer === null || blogCardsContainer === void 0 ? void 0 : blogCardsContainer.querySelector('.no-search-results-message');
        if (visibleCount === 0 && term) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'empty-state no-search-results-message'; // Use existing empty-state styling
                message.innerHTML = `
                    <i class="fas fa-search fa-3x"></i>
                    <h3>No matching posts found</h3>
                    <p>Try different keywords.</p> 
                `; // Removed clear button here, Escape key works
                // if (blogCardsContainer) {
                //     blogCardsContainer.appendChild(message);
                // }
            }
        }
        else if (noResultsMessage) {
            noResultsMessage.remove();
        }
        // Optional: Dispatch event for pagination to potentially reset/update
        // document.dispatchEvent(new CustomEvent('searchApplied', { detail: { visibleCount } }));
    }
    // Add keyboard navigation (Escape key to clear)
    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchBar.value = ''; // Clear input
            filterBlogCards(''); // Re-filter with empty term
            searchBar.blur(); // Remove focus
        }
    });
}


/***/ }),

/***/ "./src/controllers/blogFrontendController.ts":
/*!***************************************************!*\
  !*** ./src/controllers/blogFrontendController.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeBlogFrontend = initializeBlogFrontend;
/**
 * Blog Frontend Controller
 * Client-side controller that handles all frontend functionality for the blog homepage.
 * Manages UI initialization, post rendering, filtering, and user interactions.
 */
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts"); // Uses static fetch now
const blogCards_1 = __webpack_require__(/*! ../components/blogCards */ "./src/components/blogCards.ts");
const pagination_1 = __webpack_require__(/*! ../components/pagination */ "./src/components/pagination.ts");
const search_1 = __webpack_require__(/*! ../components/search */ "./src/components/search.ts");
const about_1 = __webpack_require__(/*! ../components/about */ "./src/components/about.ts");
const navigation_1 = __webpack_require__(/*! ../components/navigation */ "./src/components/navigation.ts");
/**
 * Initialize the blog frontend functionality (homepage)
 */
function initializeBlogFrontend() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, navigation_1.initializeNavigation)();
        (0, about_1.initializeAbout)();
        (0, search_1.initializeSearch)();
        // Initialize posts, which now includes filtering based on URL params
        yield initializePosts();
        (0, pagination_1.initializePagination)(); // Initialize pagination after initial posts (possibly filtered) are loaded
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
        // Re-initialize posts, which will pick up any new URL parameters (like search query OR tag)
        yield initializePosts();
        (0, pagination_1.initializePagination)();
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
            }
            // --- End Apply Tag Filter ---
            blogCardsContainer.innerHTML = '';
            if (postsToDisplay.length === 0) {
                showEmptyState(blogCardsContainer, tagFilter !== null && tagFilter !== void 0 ? tagFilter : undefined);
                const loadMoreBtn = document.getElementById('load-more-btn');
                if (loadMoreBtn)
                    loadMoreBtn.style.display = 'none';
                return;
            }
            // Pagination logic
            const initialPostCount = 6;
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
    container.innerHTML = '';
    const emptyStateDiv = document.createElement('div');
    emptyStateDiv.className = 'empty-state';
    // --- Determine Base Path (needed for View All link) ---
    const currentHostname = window.location.hostname;
    const isProduction = currentHostname === 'noelugwoke.com' || currentHostname.endsWith('.github.io');
    // *** IMPORTANT: Change '/blog/' if your GitHub repo name/path is different ***
    const basePath = isProduction ? '/blog/' : '/';
    const message = tagFilter
        ? `No posts found tagged with "${tagFilter}".`
        : 'No posts yet!';
    emptyStateDiv.innerHTML = `
        <i class="fas fa-file-alt fa-3x"></i>
        <h3>${message}</h3>
        ${tagFilter ? `<p><a href="${basePath}">View all posts</a></p>` : '<p>Check back later for new content!</p>'}
    `;
    container.appendChild(emptyStateDiv);
}
/**
 * Show error state when posts couldn't be loaded
 */
function showErrorState(container) {
    // ... (implementation remains the same) ...
    container.innerHTML = '';
    const errorStateDiv = document.createElement('div');
    errorStateDiv.className = 'error-state';
    errorStateDiv.innerHTML = `...`; // Keep error message HTML
    container.appendChild(errorStateDiv);
}


/***/ }),

/***/ "./src/entries/client.ts":
/*!*******************************!*\
  !*** ./src/entries/client.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// src/entries/client.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// Imports remain the same...
const blogFrontendController_1 = __webpack_require__(/*! ../controllers/blogFrontendController */ "./src/controllers/blogFrontendController.ts");
const postDetail_1 = __webpack_require__(/*! ../modules/postDetail */ "./src/modules/postDetail.ts");
const header_1 = __webpack_require__(/*! ../components/header */ "./src/components/header.ts");
const darkMode_1 = __webpack_require__(/*! ../components/darkMode */ "./src/components/darkMode.ts");
/**
 * Client-side entry point initializer.
 */
function initializeClient() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Client initializing...');
        // Initialize common elements first
        try {
            (0, darkMode_1.checkSystemDarkModePreference)();
            (0, darkMode_1.initializeDarkMode)();
            console.log('Dark mode initialized globally.');
            // Render Header only if placeholder exists
            if (document.getElementById('header-placeholder')) {
                (0, header_1.renderHeader)();
                console.log('Header rendered globally.');
            }
            else {
                console.warn('Header placeholder not found on this page.');
            }
        }
        catch (error) {
            console.error("Error initializing common elements:", error);
        }
        // Page-specific logic
        const pageType = document.body.dataset.page;
        const currentPage = window.location.pathname;
        // Get the base name of the file/path, removing trailing slash if present
        const pathEnd = currentPage.endsWith('/') ? currentPage.slice(0, -1).split('/').pop() : currentPage.split('/').pop();
        const isRootOrIndex = currentPage.endsWith('/') || currentPage.endsWith('/index.html'); // Check if it's the root of the deployment
        try {
            console.log(`Detected pageType: ${pageType}, currentPage: ${currentPage}, pathEnd: ${pathEnd}, isRootOrIndex: ${isRootOrIndex}`);
            // Check for Main Page (using data-page or path ending in / or /index.html)
            if (pageType === 'main' || (!pageType && isRootOrIndex)) {
                yield (0, blogFrontendController_1.initializeBlogFrontend)();
                // Check for Post Detail Page (using data-page or path ending in /post.html)
            }
            else if (pageType === 'post' || (!pageType && currentPage.endsWith('/post.html'))) {
                yield (0, postDetail_1.initializePostDetailPageLogic)();
                // Check for Admin Page (using data-page or path ending in /admin.html)
            }
            else if (pageType === 'admin' || (!pageType && currentPage.endsWith('/admin.html'))) {
                console.log('Admin page detected by client.ts - no action taken.');
            }
            else {
                console.log(`Unknown page type ('${pageType}') or path ('${currentPage}'). No specific initialization needed from client.ts.`);
            }
        }
        catch (error) {
            console.error('Error during page-specific client initialization:', error);
        }
    });
}
// DOMContentLoaded listener remains the same...
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClient);
}
else {
    initializeClient();
}


/***/ }),

/***/ "./src/modules/postDetail.ts":
/*!***********************************!*\
  !*** ./src/modules/postDetail.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// src/modules/postDetail.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializePostDetailPageLogic = initializePostDetailPageLogic;
exports.loadPostContent = loadPostContent;
exports.updatePostUI = updatePostUI;
exports.updatePageMetadata = updatePageMetadata;
exports.initializeSocialSharing = initializeSocialSharing;
exports.showErrorMessage = showErrorMessage;
// --- Imports ---
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
const urlTransformer_1 = __webpack_require__(/*! ../utils/urlTransformer */ "./src/utils/urlTransformer.ts");
const header_1 = __webpack_require__(/*! ../components/header */ "./src/components/header.ts");
const darkMode_1 = __webpack_require__(/*! ../components/darkMode */ "./src/components/darkMode.ts");
// --- Core Initialization Function ---
/**
 * Initializes all functionality for the post detail page.
 * This is the main exported function that should be called by the entry point.
 */
function initializePostDetailPageLogic() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, darkMode_1.checkSystemDarkModePreference)();
            (0, darkMode_1.initializeDarkMode)();
        }
        catch (e) {
            console.error(e);
        }
        try {
            (0, header_1.renderHeader)();
        }
        catch (e) {
            console.error(e);
        }
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        if (postId) {
            yield loadPostContent(postId);
        }
        else {
            console.error('No post ID provided in the URL');
            showErrorMessage('No post specified. Please check the URL.');
        }
    });
}
/**
 * Load and display post content based on post ID
 */
function loadPostContent(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, api_1.fetchPostById)(postId);
            if (!post)
                throw new Error(`Post with ID ${postId} not found`);
            updatePostUI(post);
            updatePageMetadata(post);
            initializeSocialSharing(post);
        }
        catch (error) {
            console.error('Error loading post content:', error);
            showErrorMessage(`Failed to load the blog post. ${error instanceof Error ? error.message : 'Please try again later.'}`);
        }
    });
}
/**
 * Update the post UI with content from the loaded post
 */
function updatePostUI(post) {
    const postArticleElement = document.getElementById('post-content');
    if (!postArticleElement) {
        console.error('Cannot update UI: #post-content element not found.');
        return;
    }
    // Construct the inner HTML dynamically
    postArticleElement.innerHTML = `
        <div class="post-header">
            <h1>${post.title}</h1>
            <div class="post-meta">
                <time datetime="${post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : ''}">
                    ${post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date unknown'}
                </time>
                <span class="author">by ${post.author || 'Anonymous'}</span>
            </div>
        </div>
        
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" class="featured-image">` : ''}

        <div class="post-content-body">
            ${post.content}
        </div>

        <div class="post-footer">
            <div class="tags">
                ${post.tags && post.tags.length > 0 ? `<span>Tags:</span> ${post.tags.map(tag => `<a href="${(0, urlTransformer_1.generateTagFilterUrl)(tag)}">${tag}</a>`).join('')}` : ''}
            </div>
            <div class="social-sharing">
                <span>Share:</span>
                <button class="share-button twitter" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></button>
                <button class="share-button facebook" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></button>
                <button class="share-button linkedin" aria-label="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></button>
            </div>
        </div>
    `;
}
/**
 * Update page metadata like title and URL
 */
function updatePageMetadata(post) {
    document.title = `${post.title} | Noel's Blog`;
}
/**
 * Initialize social sharing functionality
 */
function initializeSocialSharing(post) {
    const postArticleElement = document.getElementById('post-content');
    if (!postArticleElement)
        return;
    const socialSharingDiv = postArticleElement.querySelector('.social-sharing');
    if (socialSharingDiv) {
        socialSharingDiv.addEventListener('click', (event) => {
            const button = event.target.closest('.share-button');
            if (!button)
                return;
            event.preventDefault();
            const url = window.location.href;
            const text = `Check out this article: ${post.title}`;
            let shareWindowUrl = '';
            if (button.classList.contains('twitter')) {
                shareWindowUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                window.open(shareWindowUrl, 'twitter-share', 'width=550,height=235');
            }
            else if (button.classList.contains('facebook')) {
                shareWindowUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                window.open(shareWindowUrl, 'facebook-share', 'width=550,height=435');
            }
            else if (button.classList.contains('linkedin')) {
                shareWindowUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                window.open(shareWindowUrl, 'linkedin-share', 'width=550,height=435');
            }
        });
    }
}
/**
 * Display an error message to the user within the post content area
 */
function showErrorMessage(message) {
    const contentElement = document.getElementById('post-content');
    if (contentElement) {
        const commentsSection = document.getElementById('comments-section');
        const targetElement = commentsSection ? commentsSection : contentElement;
        targetElement.innerHTML = `<div class="error-message">${message}</div>`;
    }
    else {
        alert(message); // Fallback
    }
}


/***/ }),

/***/ "./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.likePost = likePost;
exports.unlikePost = unlikePost;
exports.deleteBlogPost = deleteBlogPost;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.addTagToPost = addTagToPost;
exports.fetchBlogPosts = fetchBlogPosts;
exports.fetchPostById = fetchPostById;
exports.fetchCommentsApi = fetchCommentsApi;
exports.submitCommentApi = submitCommentApi;
// API_URL constant is not needed when fetching static file directly
// const API_URL = '/api'; 
// --- Functions relying on backend API (Will NOT work on GitHub Pages) ---
// These functions will fail silently or log errors in the console on the static site.
function likePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error(`Like functionality requires a backend. Cannot LIKE post ${id} on static site.`);
        // Return null or a default structure if your calling code expects it
        return null;
    });
}
function unlikePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error(`Unlike functionality requires a backend. Cannot UNLIKE post ${id} on static site.`);
        // Return null or a default structure
        return null;
    });
}
function deleteBlogPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error("Cannot delete post on static site. Backend API required.");
        return false;
    });
}
function createPost(postData) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error("Cannot create post on static site. Backend API required.");
        return null;
    });
}
function updatePost(id, postData) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error("Cannot update post on static site. Backend API required.");
        return null;
    });
}
function addTagToPost(id, tag) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error("Cannot add tag on static site. Backend API required.");
        return null;
    });
}
// --- Functions modified for static data ---
const STATIC_DATA_URL = 'data/posts.json'; // Define relative path once
/**
 * Fetch all blog posts directly from the static JSON file.
 */
function fetchBlogPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch the JSON file using the relative path
            const response = yield fetch(STATIC_DATA_URL);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${STATIC_DATA_URL}: ${response.status} ${response.statusText}`);
            }
            const data = yield response.json();
            // Assuming the JSON structure is { posts: [...] } 
            return data.posts || [];
        }
        catch (error) {
            console.error(`Error fetching static ${STATIC_DATA_URL}:`, error);
            return []; // Return empty array on error
        }
    });
}
/**
 * Get a single post by ID by filtering the static JSON data.
 * @param id - The post ID (string or number)
 */
function fetchPostById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch all posts first
            const allPosts = yield fetchBlogPosts();
            const postIdNumber = typeof id === 'string' ? parseInt(id, 10) : id;
            if (isNaN(postIdNumber)) {
                console.error(`Invalid post ID provided: ${id}`);
                return null;
            }
            // Find the specific post
            const post = allPosts.find(p => Number(p.id) === postIdNumber);
            if (!post) {
                console.warn(`Post with ID ${id} not found in static data.`);
                return null;
            }
            console.log(`Found post ${id} in static data.`);
            return post;
        }
        catch (error) {
            console.error(`Error fetching static post ${id}:`, error);
            return null;
        }
    });
}
// --- Comment API Placeholders ---
function fetchCommentsApi(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.warn("Comments cannot be fetched on static site without external service/backend.");
        return [];
    });
}
function submitCommentApi(postId, name, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error("Cannot submit comment on static site without external service/backend.");
        throw new Error("Comment submission not available.");
    });
}


/***/ }),

/***/ "./src/utils/urlTransformer.ts":
/*!*************************************!*\
  !*** ./src/utils/urlTransformer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


// src/utils/urlTransformer.ts (Example Location)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateTagFilterUrl = generateTagFilterUrl;
/**
 * Generates a URL path for filtering by tag on the main blog page.
 * Creates a URL like "/blog/?tag=your-tag-name" or "/?tag=your-tag-name" based on environment.
 *
 * @param tag - The tag string to filter by.
 * @returns The URL path with the tag query parameter.
 */
function generateTagFilterUrl(tag) {
    // Optional: Convert tag to lowercase for consistency in filtering
    const consistentTag = tag.toLowerCase();
    // URLSearchParams handles necessary encoding for query parameter values
    const params = new URLSearchParams({ tag: consistentTag });
    // Check if we're on the production site by looking at the hostname
    const isProduction = window.location.hostname === 'noelugwoke.com';
    const basePath = isProduction ? '/blog/' : '/';
    return `${basePath}?${params.toString()}`;
}
/*
// Original function - kept for reference or if needed for different URL types
export function transformTagToUrlFormat(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-');
}
*/


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/entries/client.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELEdBQUc7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxJQUFJO0FBQ2pEO0FBQ0E7QUFDQSxzQ0FBc0MsSUFBSTtBQUMxQztBQUNBO0FBQ0E7QUFDQSx3REFBd0QsR0FBRztBQUMzRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7OztBQy9IYTtBQUNiO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLG9CQUFvQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVMsR0FBRyxrQkFBa0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMxQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9hYm91dC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvYmxvZ0NhcmRzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9jb21tZW50cy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvZGFya01vZGUudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2hlYWRlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvbmF2aWdhdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvcGFnaW5hdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29udHJvbGxlcnMvYmxvZ0Zyb250ZW5kQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2VudHJpZXMvY2xpZW50LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvbW9kdWxlcy9wb3N0RGV0YWlsLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvc2VydmljZXMvYXBpLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvdXRpbHMvdXJsVHJhbnNmb3JtZXIudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBBYm91dCBwb3B1cCBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVBYm91dCA9IGluaXRpYWxpemVBYm91dDtcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgQWJvdXQgc2VjdGlvbiBwb3B1cFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQWJvdXQoKSB7XG4gICAgY29uc3QgYWJvdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtYnRuJyk7XG4gICAgY29uc3QgYWJvdXRQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1wb3B1cCcpO1xuICAgIGNvbnN0IGNsb3NlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQtcG9wdXAgLmNsb3NlLXBvcHVwJyk7XG4gICAgaWYgKCFhYm91dEJ0biB8fCAhYWJvdXRQb3B1cCB8fCAhY2xvc2VQb3B1cCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0Fib3V0IHBvcHVwIGVsZW1lbnRzIG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gT3BlbiBwb3B1cCB3aGVuIGFib3V0IGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgYWJvdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgZGVmYXVsdCBhbmNob3IgYmVoYXZpb3JcbiAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJzsgLy8gUHJldmVudCBzY3JvbGxpbmcgd2hpbGUgcG9wdXAgaXMgb3BlblxuICAgICAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGFib3V0IGxpbmtcbiAgICAgICAgYWJvdXRCdG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2UgcG9wdXAgd2hlbiBjbG9zZSBidXR0b24gaXMgY2xpY2tlZFxuICAgIGNsb3NlUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSB3aGVuIGNsaWNraW5nIG91dHNpZGUgdGhlIHBvcHVwIGNvbnRlbnRcbiAgICBhYm91dFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBhYm91dFBvcHVwKSB7XG4gICAgICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBDbG9zZSBvbiBlc2NhcGUga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgYWJvdXRQb3B1cC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgdGhlIGRlZmF1bHQgYWN0aXZlIGxpbmsgc3RhdGVcbiAqL1xuZnVuY3Rpb24gc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKSB7XG4gICAgLy8gR2V0IGN1cnJlbnQgaGFzaCBvciBkZWZhdWx0IHRvIGhvbWVcbiAgICBjb25zdCBjdXJyZW50SGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8ICcjaG9tZSc7XG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBuYXYgbGlua3NcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgaGFzaCBsaW5rXG4gICAgY29uc3QgY3VycmVudExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXIgbmF2IHVsIGxpIGFbaHJlZj1cIiR7Y3VycmVudEhhc2h9XCJdYCk7XG4gICAgaWYgKGN1cnJlbnRMaW5rKSB7XG4gICAgICAgIGN1cnJlbnRMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQgPSBjcmVhdGVCbG9nQ2FyZEVsZW1lbnQ7XG5jb25zdCB1cmxUcmFuc2Zvcm1lcl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3VybFRyYW5zZm9ybWVyXCIpOyAvLyBJbXBvcnQgdGhlIFVSTCBnZW5lcmF0b3Jcbi8qKlxuICogQ3JlYXRlcyBhIERPTSBlbGVtZW50IGZvciBhIGJsb2cgY2FyZCBmcm9tIHBvc3QgZGF0YSAoZGlzcGxheSBvbmx5IGZvciBhY3Rpb25zKVxuICovXG5mdW5jdGlvbiBjcmVhdGVCbG9nQ2FyZEVsZW1lbnQocG9zdCkge1xuICAgIGNvbnN0IGJsb2dDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmxvZ0NhcmQuY2xhc3NOYW1lID0gJ2Jsb2ctY2FyZCc7XG4gICAgYmxvZ0NhcmQuZGF0YXNldC5wb3N0SWQgPSBTdHJpbmcocG9zdC5pZCk7XG4gICAgYmxvZ0NhcmQuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgIGNvbnN0IGNvbW1lbnRDb3VudCA9IHBvc3QuY29tbWVudHMgPyBwb3N0LmNvbW1lbnRzLmxlbmd0aCA6IDA7XG4gICAgY29uc3QgY3JlYXRlZERhdGUgPSBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IGNyZWF0ZWREYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYydcbiAgICB9KTtcbiAgICAvLyAtLS0gRHluYW1pYyBVUkwgYW5kIFRleHQgR2VuZXJhdGlvbiBmb3IgU2hhcmluZyAtLS1cbiAgICBjb25zdCBwb3N0VXJsID0gYHBvc3QuaHRtbD9pZD0ke1N0cmluZyhwb3N0LmlkKX1gO1xuICAgIGNvbnN0IGVuY29kZWRVcmwgPSBlbmNvZGVVUklDb21wb25lbnQocG9zdFVybCk7XG4gICAgY29uc3Qgc2hhcmVUZXh0ID0gYENoZWNrIG91dCB0aGlzIGFydGljbGU6ICR7cG9zdC50aXRsZX1gO1xuICAgIGNvbnN0IGVuY29kZWRTaGFyZVRleHQgPSBlbmNvZGVVUklDb21wb25lbnQoc2hhcmVUZXh0KTtcbiAgICAvLyAtLS0gRW5kIER5bmFtaWMgVVJMIEdlbmVyYXRpb24gLS0tXG4gICAgLy8gR2VuZXJhdGUgSFRNTCBmb3IgdGFnIGJhZGdlcy9saW5rcyB1c2luZyB0aGUgdXRpbGl0eSBmdW5jdGlvblxuICAgIGxldCB0YWdzSFRNTCA9ICcnO1xuICAgIGlmIChwb3N0LnRhZ3MgJiYgcG9zdC50YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGFnc0hUTUwgPSAnPGRpdiBjbGFzcz1cInBvc3QtdGFnc1wiPicgK1xuICAgICAgICAgICAgcG9zdC50YWdzLm1hcCh0YWcgPT4gXG4gICAgICAgICAgICAvLyBVc2UgZ2VuZXJhdGVUYWdGaWx0ZXJVcmwgZm9yIGhyZWYgaW4gYW4gPGE+IHRhZ1xuICAgICAgICAgICAgYDxhIGhyZWY9XCIkeygwLCB1cmxUcmFuc2Zvcm1lcl8xLmdlbmVyYXRlVGFnRmlsdGVyVXJsKSh0YWcpfVwiIGNsYXNzPVwidGFnLWJhZGdlXCI+JHt0YWd9PC9hPmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgIH1cbiAgICBjb25zdCBmYWxsYmFja0ltYWdlVXJsID0gJ2ltYWdlcy9ibG9nX2ltYWdlXzMuanBlZyc7IC8vIFJlbGF0aXZlIHBhdGhcbiAgICAvLyBDcmVhdGUgSFRNTCBmb3IgYmxvZyBjYXJkXG4gICAgYmxvZ0NhcmQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aW1nIHNyYz1cIiR7cG9zdC5pbWFnZVVybCB8fCBmYWxsYmFja0ltYWdlVXJsfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIj4gXG4gICAgICAgIDxkaXYgY2xhc3M9XCJibG9nLWNhcmQtY29udGVudFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJibG9nLWNhcmQtZGF0ZS1hdXRob3JcIj4ke2RhdGVTdHJ9PC9wPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiYmxvZy1jYXJkLXRpdGxlXCI+JHtwb3N0LnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAke3RhZ3NIVE1MfVxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWwtc2hhcmluZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIHR3aXR0ZXJcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gVHdpdHRlclwiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiIGRhdGEtdGV4dD1cIiR7ZW5jb2RlZFNoYXJlVGV4dH1cIj48aSBjbGFzcz1cImZhYiBmYS10d2l0dGVyXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGZhY2Vib29rXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIEZhY2Vib29rXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2stZlwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBsaW5rZWRpblwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBMaW5rZWRJblwiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiPjxpIGNsYXNzPVwiZmFiIGZhLWxpbmtlZGluLWluXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgLy8gU2V0dXAgc29jaWFsIHNoYXJpbmcgbGlzdGVuZXJzIChhcyBiZWZvcmUpXG4gICAgY29uc3Qgc29jaWFsU2hhcmluZ0RpdiA9IGJsb2dDYXJkLnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWwtc2hhcmluZycpO1xuICAgIGlmIChzb2NpYWxTaGFyaW5nRGl2KSB7XG4gICAgICAgIHNvY2lhbFNoYXJpbmdEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIC4uLiBleGlzdGluZyBzb2NpYWwgc2hhcmluZyBjbGljayBsb2dpYyAuLi5cbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hhcmUtYnV0dG9uJyk7XG4gICAgICAgICAgICBpZiAoIWJ1dHRvbilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnN1YnN0cmluZygwLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVVcmwgPSBidXR0b24uZGF0YXNldC51cmwgPyBkZWNvZGVVUklDb21wb25lbnQoYnV0dG9uLmRhdGFzZXQudXJsKSA6IGBwb3N0Lmh0bWw/aWQ9JHtwb3N0LmlkfWA7XG4gICAgICAgICAgICBjb25zdCBmdWxsVXJsID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0ke2Jhc2VQYXRofSR7cmVsYXRpdmVVcmx9YDtcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRGdWxsVXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KGZ1bGxVcmwpO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGJ1dHRvbi5kYXRhc2V0LnRleHQgPyBkZWNvZGVVUklDb21wb25lbnQoYnV0dG9uLmRhdGFzZXQudGV4dCkgOiBkb2N1bWVudC50aXRsZTtcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpO1xuICAgICAgICAgICAgbGV0IHNoYXJlV2luZG93VXJsID0gJyc7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygndHdpdHRlcicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2VuY29kZWRUZXh0fSZ1cmw9JHtlbmNvZGVkRnVsbFVybH1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAndHdpdHRlci1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTIzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFjZWJvb2snKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7ZW5jb2RlZEZ1bGxVcmx9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2ZhY2Vib29rLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rZWRpbicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZS8/dXJsPSR7ZW5jb2RlZEZ1bGxVcmx9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2xpbmtlZGluLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBSRU1PVkVEOiBTZXBhcmF0ZSBldmVudCBsaXN0ZW5lciBsb29wIGZvciB0YWcgYmFkZ2VzIChub3cgaGFuZGxlZCBieSBzdGFuZGFyZCA8YT4gdGFncylcbiAgICByZXR1cm4gYmxvZ0NhcmQ7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbW1lbnRzID0gaW5pdGlhbGl6ZUNvbW1lbnRzO1xuZXhwb3J0cy5pbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5ID0gaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eTtcbi8qKlxuICogSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciBibG9nIHBvc3RzXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDb21tZW50cygpIHtcbiAgICBzZXR1cENvbW1lbnRUb2dnbGVzKCk7XG4gICAgc2V0dXBDb21tZW50Rm9ybXMoKTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciBhIHNwZWNpZmljIGJsb2cgcG9zdCBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkocG9zdEVsZW1lbnQpIHtcbiAgICBjb25zdCB0b2dnbGUgPSBwb3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtdG9nZ2xlJyk7XG4gICAgY29uc3QgZm9ybSA9IHBvc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWZvcm0nKTtcbiAgICBpZiAodG9nZ2xlKSB7XG4gICAgICAgIHNldHVwQ29tbWVudFRvZ2dsZSh0b2dnbGUpO1xuICAgIH1cbiAgICBpZiAoZm9ybSkge1xuICAgICAgICBzZXR1cENvbW1lbnRGb3JtKGZvcm0pO1xuICAgIH1cbn1cbi8qKlxuICogU2V0IHVwIGNvbW1lbnQgdG9nZ2xlIGJ1dHRvbnNcbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50VG9nZ2xlcygpIHtcbiAgICBjb25zdCBjb21tZW50VG9nZ2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50cy10b2dnbGUnKTtcbiAgICBjb21tZW50VG9nZ2xlcy5mb3JFYWNoKHRvZ2dsZSA9PiB7XG4gICAgICAgIHNldHVwQ29tbWVudFRvZ2dsZSh0b2dnbGUpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgYSBzaW5nbGUgY29tbWVudCB0b2dnbGUgYnV0dG9uXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudFRvZ2dsZSh0b2dnbGUpIHtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IHRvZ2dsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zdC1pZCcpO1xuICAgICAgICBjb25zdCBjb21tZW50c1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY29tbWVudHMtJHtwb3N0SWR9YCk7XG4gICAgICAgIGlmIChjb21tZW50c1NlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbW1lbnRzU2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIC8vIENoYW5nZSBidXR0b24gdGV4dCBiYXNlZCBvbiBzdGF0ZVxuICAgICAgICAgICAgaWYgKGNvbW1lbnRzU2VjdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT4gSGlkZSBDb21tZW50cyA8c3BhbiBjbGFzcz1cImNvbW1lbnRzLWNvdW50XCI+JHsoX2EgPSB0b2dnbGUucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvdW50JykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50ZXh0Q29udGVudH08L3NwYW4+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtY29tbWVudFwiPjwvaT4gQ29tbWVudHMgPHNwYW4gY2xhc3M9XCJjb21tZW50cy1jb3VudFwiPiR7KF9iID0gdG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb3VudCcpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudGV4dENvbnRlbnR9PC9zcGFuPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGNvbW1lbnQgZm9ybXNcbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50Rm9ybXMoKSB7XG4gICAgY29uc3QgY29tbWVudEZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnQtZm9ybScpO1xuICAgIGNvbW1lbnRGb3Jtcy5mb3JFYWNoKGZvcm0gPT4ge1xuICAgICAgICBzZXR1cENvbW1lbnRGb3JtKGZvcm0pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgYSBzaW5nbGUgY29tbWVudCBmb3JtXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudEZvcm0oZm9ybSkge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3N0LWlkJyk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbW1lbnRzLSR7cG9zdElkfSAuY29tbWVudHMtbGlzdGApO1xuICAgICAgICBpZiAoIWNvbW1lbnRzQ29udGFpbmVyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcigndGV4dGFyZWFbbmFtZT1cImNvbW1lbnRcIl0nKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgaW5wdXRzIGFyZSBub3QgZW1wdHlcbiAgICAgICAgaWYgKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgPT09ICcnIHx8IGNvbW1lbnRJbnB1dC52YWx1ZS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYWRkTmV3Q29tbWVudChwb3N0SWQsIGNvbW1lbnRzQ29udGFpbmVyLCBuYW1lSW5wdXQudmFsdWUsIGNvbW1lbnRJbnB1dC52YWx1ZSk7XG4gICAgICAgIC8vIFJlc2V0IGZvcm1cbiAgICAgICAgZm9ybS5yZXNldCgpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBBZGQgYSBuZXcgY29tbWVudCB0byB0aGUgY29tbWVudHMgbGlzdFxuICovXG5mdW5jdGlvbiBhZGROZXdDb21tZW50KHBvc3RJZCwgY29tbWVudHNDb250YWluZXIsIG5hbWUsIGNvbW1lbnRUZXh0KSB7XG4gICAgLy8gQ3JlYXRlIG5ldyBjb21tZW50XG4gICAgY29uc3QgbmV3Q29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5ld0NvbW1lbnQuY2xhc3NOYW1lID0gJ2NvbW1lbnQnO1xuICAgIC8vIEdldCBjdXJyZW50IGRhdGVcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBub3cudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICBtb250aDogJ2xvbmcnLFxuICAgICAgICBkYXk6ICdudW1lcmljJ1xuICAgIH0pO1xuICAgIC8vIENvbW1lbnQgSFRNTCBzdHJ1Y3R1cmVcbiAgICBuZXdDb21tZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtYXZhdGFyXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS11c2VyLWNpcmNsZVwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1hdXRob3JcIj4ke25hbWV9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LXRleHRcIj4ke2NvbW1lbnRUZXh0fTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1kYXRlXCI+JHtkYXRlU3RyfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICAvLyBSZW1vdmUgXCJubyBjb21tZW50cyB5ZXRcIiBtZXNzYWdlIGlmIGl0IGV4aXN0c1xuICAgIGNvbnN0IG5vQ29tbWVudHMgPSBjb21tZW50c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubm8tY29tbWVudHMnKTtcbiAgICBpZiAobm9Db21tZW50cykge1xuICAgICAgICBjb21tZW50c0NvbnRhaW5lci5yZW1vdmVDaGlsZChub0NvbW1lbnRzKTtcbiAgICB9XG4gICAgLy8gQWRkIHRoZSBuZXcgY29tbWVudCB0byB0aGUgdG9wIG9mIHRoZSBsaXN0XG4gICAgY29tbWVudHNDb250YWluZXIuaW5zZXJ0QmVmb3JlKG5ld0NvbW1lbnQsIGNvbW1lbnRzQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIC8vIFVwZGF0ZSBjb21tZW50IGNvdW50XG4gICAgdXBkYXRlQ29tbWVudENvdW50KHBvc3RJZCk7XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgY29tbWVudCBjb3VudCBmb3IgYSBwb3N0XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUNvbW1lbnRDb3VudChwb3N0SWQpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgY291bnRTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgYnV0dG9uW2RhdGEtcG9zdC1pZD1cIiR7cG9zdElkfVwiXSAuY29tbWVudHMtY291bnRgKTtcbiAgICBpZiAoY291bnRTcGFuKSB7XG4gICAgICAgIGxldCBjb3VudCA9IHBhcnNlSW50KCgoX2EgPSBjb3VudFNwYW4udGV4dENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXBsYWNlKC9bKCldL2csICcnKSkgfHwgJzAnKSArIDE7XG4gICAgICAgIGNvdW50U3Bhbi50ZXh0Q29udGVudCA9IGAoJHtjb3VudH0pYDtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIERhcmsgbW9kZSBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVEYXJrTW9kZSA9IGluaXRpYWxpemVEYXJrTW9kZTtcbmV4cG9ydHMuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UgPSBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZTtcbi8qKlxuICogSW5pdGlhbGl6ZSBkYXJrIG1vZGUgdG9nZ2xlXG4gKiBUaGlzIGNyZWF0ZXMgYSBmbG9hdGluZyBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvbiBhbmQgYWRkcyBpdCB0byB0aGUgRE9NXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVEYXJrTW9kZSgpIHtcbiAgICAvLyBDcmVhdGUgZGFyayBtb2RlIHRvZ2dsZSBidXR0b25cbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmNsYXNzTmFtZSA9ICdkYXJrLW1vZGUtdG9nZ2xlJztcbiAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nOyAvLyBNb29uIGljb25cbiAgICBkYXJrTW9kZVRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVG9nZ2xlIERhcmsgTW9kZScpO1xuICAgIC8vIENoZWNrIGlmIGRhcmsgbW9kZSBwcmVmZXJlbmNlIGlzIGFscmVhZHkgc2V0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09ICd0cnVlJztcbiAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uIGZvciBsaWdodCBtb2RlXG4gICAgfVxuICAgIC8vIEFkZCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgIGRhcmtNb2RlVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRGFya01vZGUpO1xuICAgIC8vIEFkZCBidXR0b24gdG8gdGhlIERPTVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGFya01vZGVUb2dnbGUpO1xufVxuLyoqXG4gKiBUb2dnbGUgZGFyayBtb2RlIG9uIGFuZCBvZmZcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlRGFya01vZGUoKSB7XG4gICAgY29uc3QgaXNEYXJrTW9kZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyay1tb2RlJyk7XG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1tb2RlLXRvZ2dsZScpO1xuICAgIC8vIFVwZGF0ZSBpY29uIGJhc2VkIG9uIG1vZGVcbiAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgaWYgKGlzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvbiBmb3IgZGFyayBtb2RlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU2F2ZSBwcmVmZXJlbmNlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCBpc0RhcmtNb2RlLnRvU3RyaW5nKCkpO1xufVxuLyoqXG4gKiBDaGVjayBpZiB1c2VyIGhhcyBzeXN0ZW0gZGFyayBtb2RlIHByZWZlcmVuY2VcbiAqIElmIHRoZXkgZG8gYW5kIHdlIGhhdmVuJ3Qgc2V0IGEgcHJlZmVyZW5jZSB5ZXQsIGFwcGx5IGRhcmsgbW9kZVxuICovXG5mdW5jdGlvbiBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSgpIHtcbiAgICAvLyBPbmx5IGNoZWNrIGlmIHVzZXIgaGFzbid0IGV4cGxpY2l0bHkgc2V0IGEgcHJlZmVyZW5jZVxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwcmVmZXJzRGFya01vZGUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgICAgIGlmIChwcmVmZXJzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgICAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgICAgICAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvY29tcG9uZW50cy9oZWFkZXIudHNcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVuZGVySGVhZGVyID0gcmVuZGVySGVhZGVyO1xuLyoqXG4gKiBIZWFkZXIgQ29tcG9uZW50XG4gKiBSZW5kZXJzIHRoZSBoZWFkZXIgc2VjdGlvbiBpbnRvIGEgdGFyZ2V0IGNvbnRhaW5lci5cbiAqIEV2ZW50IGxpc3RlbmVycyBzaG91bGQgYmUgYXR0YWNoZWQgc2VwYXJhdGVseSBhZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24uXG4gKiBAcGFyYW0gY29udGFpbmVySWQgLSBUaGUgSUQgb2YgdGhlIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBoZWFkZXIgaW50by4gRGVmYXVsdHMgdG8gJ2hlYWRlci1wbGFjZWhvbGRlcicuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckhlYWRlcihjb250YWluZXJJZCA9ICdoZWFkZXItcGxhY2Vob2xkZXInKSB7XG4gICAgLy8gRW5zdXJlIHJ1bm5pbmcgaW4gYSBicm93c2VyIGVudmlyb25tZW50XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXJJZCk7XG4gICAgaWYgKCFoZWFkZXJDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyAtLS0gRGV0ZXJtaW5lIEJhc2UgUGF0aCBiYXNlZCBvbiBFbnZpcm9ubWVudCAtLS1cbiAgICAvLyBDaGVja3MgaWYgcnVubmluZyBvbiB0aGUgcHJvZHVjdGlvbiBjdXN0b20gZG9tYWluIHJvb3Qgb3IgZ2l0aHViLmlvXG4gICAgLy8gQWRqdXN0ICdub2VsdWd3b2tlLmNvbScgaWYgeW91ciBhY3R1YWwgcHJvZHVjdGlvbiBob3N0bmFtZSBkaWZmZXJzXG4gICAgY29uc3QgaXNQcm9kdWN0aW9uID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbm9lbHVnd29rZS5jb20nIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5lbmRzV2l0aCgnLmdpdGh1Yi5pbycpO1xuICAgIC8vIERlZmluZSB0aGUgYmFzZSBwYXRoIGZvciBsaW5rcy4gQXNzdW1lcyBkZXBsb3ltZW50IGlzIHVuZGVyIC9ibG9nLyBvbiBwcm9kdWN0aW9uLlxuICAgIC8vICoqKiBJTVBPUlRBTlQ6IENoYW5nZSAnL2Jsb2cvJyBpZiB5b3VyIEdpdEh1YiByZXBvIG5hbWUgKGFuZCB0aHVzIHN1YmRpcmVjdG9yeSkgaXMgZGlmZmVyZW50ICoqKlxuICAgIGNvbnN0IGJhc2VQYXRoID0gaXNQcm9kdWN0aW9uID8gJy9ibG9nLycgOiAnLyc7XG4gICAgLy8gLS0tIEVuZCBCYXNlIFBhdGggTG9naWMgLS0tXG4gICAgLy8gRGVmaW5lIHRoZSBoZWFkZXIgSFRNTCBzdHJ1Y3R1cmUgdXNpbmcgdGhlIGJhc2VQYXRoIGZvciBsaW5rc1xuICAgIGhlYWRlckNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJzaXRlLWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPjxhIGhyZWY9XCIke2Jhc2VQYXRofVwiPkJsb2c8L2E+PC9oMT4gXG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIke2Jhc2VQYXRofVwiPkhvbWU8L2E+PC9saT4gXG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiJHtiYXNlUGF0aH0jYWJvdXRcIiBpZD1cImFib3V0LWJ0blwiPkFib3V0PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiaHR0cHM6Ly9ub2VsdWd3b2tlLmNvbS9cIj5Qb3J0Zm9saW88L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZvciBhcnRpY2xlcy4uLlwiIGNsYXNzPVwic2VhcmNoLWJhclwiPiBcbiAgICAgICAgPC9oZWFkZXI+XG4gICAgYDtcbiAgICAvLyBFdmVudCBsaXN0ZW5lcnMgc2hvdWxkIGJlIGNhbGxlZCAqYWZ0ZXIqIHJlbmRlckhlYWRlciBpcyBleGVjdXRlZC5cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBOYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplTmF2aWdhdGlvbiA9IGluaXRpYWxpemVOYXZpZ2F0aW9uO1xuLyoqXG4gKiBJbml0aWFsaXplIG5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplTmF2aWdhdGlvbigpIHtcbiAgICBzZXRBY3RpdmVOYXZMaW5rKCk7XG4gICAgc2V0dXBOYXZMaW5rcygpO1xufVxuLyoqXG4gKiBTZXQgYWN0aXZlIG5hdmlnYXRpb24gbGluayBiYXNlZCBvbiBjdXJyZW50IFVSTCBvciBwYWdlIHNlY3Rpb25cbiAqL1xuZnVuY3Rpb24gc2V0QWN0aXZlTmF2TGluaygpIHtcbiAgICBjb25zdCBjdXJyZW50UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8ICcjaG9tZSc7XG4gICAgdXBkYXRlQWN0aXZlTmF2TGluayhjdXJyZW50UGF0aCk7XG59XG4vKipcbiAqIFNldHVwIGNsaWNrIGhhbmRsZXJzIGZvciBuYXZpZ2F0aW9uIGxpbmtzXG4gKi9cbmZ1bmN0aW9uIHNldHVwTmF2TGlua3MoKSB7XG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICBpZiAoaHJlZikge1xuICAgICAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoaHJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIEhhbmRsZSBzcGVjaWFsIGNhc2VzIGZvciBwb3B1cCBsaW5rc1xuICAgIGNvbnN0IGFib3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWJ0bicpO1xuICAgIGlmIChhYm91dEJ0bikge1xuICAgICAgICBhYm91dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoJyNhYm91dCcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgYWN0aXZlIG5hdmlnYXRpb24gbGlua1xuICogQHBhcmFtIHBhdGggVGhlIHBhdGggb3Igc2VjdGlvbiBJRCB0byBhY3RpdmF0ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVBY3RpdmVOYXZMaW5rKHBhdGgpIHtcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIGxpbmtzXG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBtYXRjaGluZyBsaW5rXG4gICAgY29uc3QgYWN0aXZlTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlciBuYXYgdWwgbGkgYVtocmVmPVwiJHtwYXRofVwiXWApO1xuICAgIGlmIChhY3RpdmVMaW5rKSB7XG4gICAgICAgIGFjdGl2ZUxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVQYWdpbmF0aW9uID0gaW5pdGlhbGl6ZVBhZ2luYXRpb247XG4vLyBQYWdpbmF0aW9uIGZ1bmN0aW9uYWxpdHlcbmNvbnN0IGNvbW1lbnRzXzEgPSByZXF1aXJlKFwiLi9jb21tZW50c1wiKTtcbi8qKlxuICogSW5pdGlhbGl6ZSBwYWdpbmF0aW9uIGZ1bmN0aW9uYWxpdHkgd2l0aCBMb2FkIE1vcmUgYnV0dG9uXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQYWdpbmF0aW9uKCkge1xuICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICBjb25zdCBoaWRkZW5Qb3N0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkcycpO1xuICAgIGlmICghbG9hZE1vcmVCdG4gfHwgIWhpZGRlblBvc3RzIHx8ICFibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdQYWdpbmF0aW9uIGVsZW1lbnRzIG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGN1cnJlbnRQYWdlID0gMTtcbiAgICBjb25zdCBwb3N0c1BlclBhZ2UgPSAzO1xuICAgIGNvbnN0IHRvdGFsSGlkZGVuUG9zdHMgPSBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgLy8gSGlkZSBsb2FkIG1vcmUgYnV0dG9uIGlmIG5vIGhpZGRlbiBwb3N0c1xuICAgIGlmICh0b3RhbEhpZGRlblBvc3RzID09PSAwKSB7XG4gICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICAgIC8vIFNldCB1cCBsb2FkIG1vcmUgYnV0dG9uIGNsaWNrIGhhbmRsZXJcbiAgICBsb2FkTW9yZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbG9hZE1vcmVQb3N0cyhsb2FkTW9yZUJ0biwgaGlkZGVuUG9zdHMsIGJsb2dDYXJkc0NvbnRhaW5lciwgY3VycmVudFBhZ2UsIHBvc3RzUGVyUGFnZSk7XG4gICAgICAgIGN1cnJlbnRQYWdlKys7XG4gICAgfSk7XG4gICAgLy8gSW5pdGlhbGl6ZSBzY3JvbGwtYmFzZWQgbG9hZGluZyAoaW5maW5pdGUgc2Nyb2xsKVxuICAgIGluaXRpYWxpemVJbmZpbml0ZVNjcm9sbChsb2FkTW9yZUJ0bik7XG59XG4vKipcbiAqIExvYWQgbW9yZSBwb3N0cyB3aGVuIHRoZSBsb2FkIG1vcmUgYnV0dG9uIGlzIGNsaWNrZWRcbiAqL1xuZnVuY3Rpb24gbG9hZE1vcmVQb3N0cyhsb2FkTW9yZUJ0biwgaGlkZGVuUG9zdHMsIGJsb2dDYXJkc0NvbnRhaW5lciwgY3VycmVudFBhZ2UsIHBvc3RzUGVyUGFnZSkge1xuICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKTtcbiAgICBsb2FkTW9yZUJ0bi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzcGlubmVyXCI+PC9zcGFuPiBMb2FkaW5nLi4uJztcbiAgICAvLyBTaW11bGF0ZSBsb2FkaW5nIGRlbGF5IGZvciBiZXR0ZXIgVVhcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHdoaWNoIHBvc3RzIHRvIGxvYWRcbiAgICAgICAgY29uc3Qgc3RhcnRJZHggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHBvc3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgZW5kSWR4ID0gTWF0aC5taW4oc3RhcnRJZHggKyBwb3N0c1BlclBhZ2UsIGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgIGxldCBwb3N0c0xvYWRlZCA9IDA7XG4gICAgICAgIC8vIENsb25lIGFuZCBtb3ZlIHBvc3RzIGZyb20gaGlkZGVuIGNvbnRhaW5lciB0byB2aXNpYmxlIGJsb2cgY2FyZHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3N0c1BlclBhZ2UgJiYgaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoID4gMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwb3N0VG9BZGQgPSBoaWRkZW5Qb3N0cy5jaGlsZHJlblswXTsgLy8gQWx3YXlzIHRha2UgdGhlIGZpcnN0IGVsZW1lbnRcbiAgICAgICAgICAgIGlmIChwb3N0VG9BZGQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZWRQb3N0ID0gcG9zdFRvQWRkLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBjbG9uZWRQb3N0LmNsYXNzTGlzdC5hZGQoJ25ldycpOyAvLyBBZGQgY2xhc3MgZm9yIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZWRQb3N0KTtcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0cy5yZW1vdmVDaGlsZChwb3N0VG9BZGQpO1xuICAgICAgICAgICAgICAgIHBvc3RzTG9hZGVkKys7XG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgbmV3IHBvc3RzXG4gICAgICAgICAgICAgICAgKDAsIGNvbW1lbnRzXzEuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSkoY2xvbmVkUG9zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UndmUgbG9hZGVkIGFsbCBwb3N0c1xuICAgICAgICBpZiAoaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc2V0IGJ1dHRvbiBzdGF0ZVxuICAgICAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gICAgICAgIGxvYWRNb3JlQnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPiBMb2FkIE1vcmUgUG9zdHMnO1xuICAgICAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnQgd2hlbiBwb3N0cyBhcmUgbG9hZGVkXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdwb3N0c0xvYWRlZCcsIHsgZGV0YWlsOiB7IGNvdW50OiBwb3N0c0xvYWRlZCB9IH0pO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9LCA4MDApOyAvLyBTaW11bGF0ZSBuZXR3b3JrIGRlbGF5XG59XG4vKipcbiAqIEluaXRpYWxpemUgaW5maW5pdGUgc2Nyb2xsIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUluZmluaXRlU2Nyb2xsKGxvYWRNb3JlQnRuKSB7XG4gICAgbGV0IHNjcm9sbFRpbWVvdXQ7XG4gICAgbGV0IGlzTG9hZGluZ01vcmVQb3N0cyA9IGZhbHNlO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgIC8vIElmIHRoZSBidXR0b24gaXMgaGlkZGVuIChhbGwgcG9zdHMgbG9hZGVkKSBvciBhbHJlYWR5IGluIGxvYWRpbmcgc3RhdGUsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyB8fFxuICAgICAgICAgICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2FkaW5nJykgfHxcbiAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyVGltZW91dChzY3JvbGxUaW1lb3V0KTtcbiAgICAgICAgc2Nyb2xsVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgc2Nyb2xsVG9wLCBzY3JvbGxIZWlnaHQsIGNsaWVudEhlaWdodCB9ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgLy8gV2hlbiB1c2VyIHNjcm9sbHMgdG8gYm90dG9tICh3aXRoIHNvbWUgYnVmZmVyKVxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCA+PSBzY3JvbGxIZWlnaHQgLSAyMDApIHtcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxvYWRNb3JlQnRuLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgZmxhZyBhZnRlciBhbmltYXRpb24gY29tcGxldGVzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDApO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvY29tcG9uZW50cy9zZWFyY2gudHNcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVNlYXJjaCA9IGluaXRpYWxpemVTZWFyY2g7XG4vLyBOb3RlOiBmZXRjaEJsb2dQb3N0cyBhbmQgY3JlYXRlQmxvZ0NhcmRFbGVtZW50IGltcG9ydHMgbWlnaHQgbm90IGJlIG5lZWRlZCBcbi8vIGlmIHRoaXMgc2NyaXB0IG9ubHkgZmlsdGVycyBhbHJlYWR5IHJlbmRlcmVkIGNhcmRzLiBSZW1vdmVkIHRoZW0gZm9yIG5vdy5cbi8vIGltcG9ydCB7IGZldGNoQmxvZ1Bvc3RzIH0gZnJvbSAnLi4vc2VydmljZXMvYXBpJzsgXG4vLyBpbXBvcnQgeyBjcmVhdGVCbG9nQ2FyZEVsZW1lbnQgfSBmcm9tICcuL2Jsb2dDYXJkcyc7XG4vKipcbiAqIEluaXRpYWxpemVzIGEgc2ltcGxlLCBjbGllbnQtc2lkZSBzZWFyY2ggZnVuY3Rpb25hbGl0eSBmb3IgYmxvZyBwb3N0cy5cbiAqIEZpbHRlcnMgY3VycmVudGx5IHZpc2libGUgYmxvZyBjYXJkcyBvbiB0aGUgcGFnZSBhcyB0aGUgdXNlciB0eXBlcy5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNlYXJjaCgpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1iYXInKTtcbiAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZy5ibG9nLWNhcmRzJyk7IC8vIFRhcmdldCB0aGUgbWFpbiBjb250YWluZXJcbiAgICBpZiAoIXNlYXJjaEJhciB8fCAhYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignU2VhcmNoIGJhciAoLnNlYXJjaC1iYXIpIG9yIGJsb2cgY2FyZHMgY29udGFpbmVyICgjYmxvZy5ibG9nLWNhcmRzKSBub3QgZm91bmQuIFNlYXJjaCBub3QgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIGEgc2VhcmNoIGluZGljYXRvciBlbGVtZW50IChvcHRpb25hbClcbiAgICBjb25zdCBzZWFyY2hJbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWFyY2hJbmRpY2F0b3IuY2xhc3NOYW1lID0gJ3NlYXJjaC1pbmRpY2F0b3InOyAvLyBBZGQgY2xhc3MgZm9yIHN0eWxpbmdcbiAgICBzZWFyY2hJbmRpY2F0b3Iuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7IC8vIEFubm91bmNlIGNoYW5nZXMgdG8gc2NyZWVuIHJlYWRlcnNcbiAgICBzZWFyY2hJbmRpY2F0b3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgLy8gU3RhcnQgaGlkZGVuXG4gICAgLy8gSW5zZXJ0IHRoZSBpbmRpY2F0b3IgYmVmb3JlIHRoZSBibG9nIGNhcmRzIGNvbnRhaW5lclxuICAgIChfYSA9IGJsb2dDYXJkc0NvbnRhaW5lci5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5zZXJ0QmVmb3JlKHNlYXJjaEluZGljYXRvciwgYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAvLyBPcHRpb25hbDogV3JhcCBzZWFyY2ggYmFyIGZvciBzdHlsaW5nIG9yIGFkZGluZyBjbGVhciBidXR0b24gKGlmIG5vdCBhbHJlYWR5IGRvbmUpXG4gICAgLy8gVGhpcyBleGFtcGxlIGFzc3VtZXMgdGhlIHNlYXJjaCBiYXIgaXMgYWxyZWFkeSBwbGFjZWQgY29ycmVjdGx5IGluIHRoZSBoZWFkZXIgSFRNTFxuICAgIC8vIEtlZXAgdHJhY2sgb2YgYWxsIGJsb2cgY2FyZHMgLSB3aWxsIGJlIHBvcHVsYXRlZCBvbiBmaXJzdCBmaWx0ZXJcbiAgICBsZXQgYWxsQ2FyZHMgPSBbXTtcbiAgICAvLyBIYW5kbGUgc2VhcmNoIGlucHV0IHdpdGggZGVib3VuY2VcbiAgICBsZXQgZGVib3VuY2VUaW1lcjtcbiAgICBzZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSBzZWFyY2hCYXIudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIC8vIERlYm91bmNlIHRoZSBmaWx0ZXJpbmdcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRlYm91bmNlVGltZXIpO1xuICAgICAgICBkZWJvdW5jZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmaWx0ZXJCbG9nQ2FyZHMoc2VhcmNoVGVybSk7XG4gICAgICAgIH0sIDMwMCk7IC8vIDMwMG1zIGRlbGF5XG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogRmlsdGVycyBibG9nIGNhcmRzIGJhc2VkIG9uIHNlYXJjaCB0ZXJtIGJ5IGFkZGluZy9yZW1vdmluZyBhIENTUyBjbGFzcy5cbiAgICAgKiBAcGFyYW0gdGVybSAtIFRoZSBzZWFyY2ggdGVybSAobG93ZXJjYXNlKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaWx0ZXJCbG9nQ2FyZHModGVybSkge1xuICAgICAgICAvLyBHZXQgYWxsIGNhcmRzIGN1cnJlbnRseSBpbiB0aGUgbWFpbiBjb250YWluZXIgT1IgaGlkZGVuIGNvbnRhaW5lciBpZiB0aGV5IGV4aXN0XG4gICAgICAgIC8vIFRoaXMgZW5zdXJlcyB3ZSBmaWx0ZXIgZXZlcnl0aGluZywgZXZlbiBwYWdpbmF0ZWQgaXRlbXMgaWYgdGhleSBhcmUgaW4gdGhlIERPTVxuICAgICAgICAvLyBJZiBwYWdpbmF0aW9uIHJlbW92ZXMgaXRlbXMgZnJvbSBET00sIHRoaXMgbmVlZHMgYWRqdXN0bWVudC5cbiAgICAgICAgaWYgKGFsbENhcmRzLmxlbmd0aCA9PT0gMCkgeyAvLyBQb3B1bGF0ZSBvbiBmaXJzdCBydW4gb3IgaWYgY2xlYXJlZFxuICAgICAgICAgICAgYWxsQ2FyZHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNibG9nLmJsb2ctY2FyZHMgLmJsb2ctY2FyZCwgI2hpZGRlbi1wb3N0cyAuYmxvZy1jYXJkJykpO1xuICAgICAgICAgICAgaWYgKGFsbENhcmRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gYmxvZyBjYXJkcyBmb3VuZCB0byBmaWx0ZXIuXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gTm8gY2FyZHMgcmVuZGVyZWQgeWV0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgU2VhcmNoIGZpbHRlcmluZyBpbml0aWFsaXplZCB3aXRoICR7YWxsQ2FyZHMubGVuZ3RofSBjYXJkcy5gKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmlzaWJsZUNvdW50ID0gMDtcbiAgICAgICAgYWxsQ2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlc1NlYXJjaCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCF0ZXJtKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgbm8gc2VhcmNoIHRlcm0sIHNob3cgYWxsIGNhcmRzXG4gICAgICAgICAgICAgICAgbWF0Y2hlc1NlYXJjaCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGV4dCBjb250ZW50IGZyb20gaW1wb3J0YW50IGVsZW1lbnRzIHdpdGhpbiB0aGUgY2FyZFxuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gKChfYiA9IChfYSA9IGNhcmQucXVlcnlTZWxlY3RvcignaDMnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRleHRDb250ZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9Mb3dlckNhc2UoKSkgfHwgJyc7XG4gICAgICAgICAgICAgICAgLy8gQWRkIG90aGVyIHNlYXJjaGFibGUgZmllbGRzIGlmIG5lZWRlZCAoZS5nLiwgZXhjZXJwdCwgYXV0aG9yKVxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGV4Y2VycHQgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNhcmQtZXhjZXJwdCcpPy50ZXh0Q29udGVudD8udG9Mb3dlckNhc2UoKSB8fCAnJzsgXG4gICAgICAgICAgICAgICAgY29uc3QgdGFncyA9IEFycmF5LmZyb20oY2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcudGFnLWJhZGdlJykpIC8vIEFzc3VtZXMgdGFncyBhcmUgcmVuZGVyZWRcbiAgICAgICAgICAgICAgICAgICAgLm1hcCh0YWcgPT4geyB2YXIgX2E7IHJldHVybiAoKF9hID0gdGFnLnRleHRDb250ZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb3dlckNhc2UoKSkgfHwgJyc7IH0pO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBjYXJkIG1hdGNoZXMgdGhlIHNlYXJjaCB0ZXJtXG4gICAgICAgICAgICAgICAgbWF0Y2hlc1NlYXJjaCA9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLmluY2x1ZGVzKHRlcm0pIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBleGNlcnB0LmluY2x1ZGVzKHRlcm0pIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFncy5zb21lKHRhZyA9PiB0YWcuaW5jbHVkZXModGVybSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2hvdyBvciBoaWRlIHRoZSBjYXJkIHVzaW5nIENTUyBjbGFzc1xuICAgICAgICAgICAgaWYgKG1hdGNoZXNTZWFyY2gpIHtcbiAgICAgICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbi1ieS1zZWFyY2gnKTtcbiAgICAgICAgICAgICAgICB2aXNpYmxlQ291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLWJ5LXNlYXJjaCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gU2hvdy9IaWRlL1VwZGF0ZSB0aGUgc2VhcmNoIGluZGljYXRvciB0ZXh0XG4gICAgICAgIGlmICh0ZXJtKSB7XG4gICAgICAgICAgICBzZWFyY2hJbmRpY2F0b3IudGV4dENvbnRlbnQgPSB2aXNpYmxlQ291bnQgPiAwXG4gICAgICAgICAgICAgICAgPyBgU2hvd2luZyAke3Zpc2libGVDb3VudH0gcmVzdWx0JHt2aXNpYmxlQ291bnQgPiAxID8gJ3MnIDogJyd9IGZvciBcIiR7dGVybX1cImBcbiAgICAgICAgICAgICAgICA6IGBObyByZXN1bHRzIGZvdW5kIGZvciBcIiR7dGVybX1cImA7XG4gICAgICAgICAgICBzZWFyY2hJbmRpY2F0b3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWFyY2hJbmRpY2F0b3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgLy8gSGlkZSBpbmRpY2F0b3IgaWYgc2VhcmNoIGlzIGNsZWFyZWRcbiAgICAgICAgfVxuICAgICAgICAvLyBIYW5kbGUgXCJObyByZXN1bHRzXCIgbWVzc2FnZSBzcGVjaWZpY2FsbHkgd2l0aGluIHRoZSBjb250YWluZXJcbiAgICAgICAgY29uc3Qgbm9SZXN1bHRzTWVzc2FnZSA9IGJsb2dDYXJkc0NvbnRhaW5lciA9PT0gbnVsbCB8fCBibG9nQ2FyZHNDb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJsb2dDYXJkc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubm8tc2VhcmNoLXJlc3VsdHMtbWVzc2FnZScpO1xuICAgICAgICBpZiAodmlzaWJsZUNvdW50ID09PSAwICYmIHRlcm0pIHtcbiAgICAgICAgICAgIGlmICghbm9SZXN1bHRzTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmNsYXNzTmFtZSA9ICdlbXB0eS1zdGF0ZSBuby1zZWFyY2gtcmVzdWx0cy1tZXNzYWdlJzsgLy8gVXNlIGV4aXN0aW5nIGVtcHR5LXN0YXRlIHN0eWxpbmdcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2VhcmNoIGZhLTN4XCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8aDM+Tm8gbWF0Y2hpbmcgcG9zdHMgZm91bmQ8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8cD5UcnkgZGlmZmVyZW50IGtleXdvcmRzLjwvcD4gXG4gICAgICAgICAgICAgICAgYDsgLy8gUmVtb3ZlZCBjbGVhciBidXR0b24gaGVyZSwgRXNjYXBlIGtleSB3b3Jrc1xuICAgICAgICAgICAgICAgIC8vIGlmIChibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub1Jlc3VsdHNNZXNzYWdlKSB7XG4gICAgICAgICAgICBub1Jlc3VsdHNNZXNzYWdlLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE9wdGlvbmFsOiBEaXNwYXRjaCBldmVudCBmb3IgcGFnaW5hdGlvbiB0byBwb3RlbnRpYWxseSByZXNldC91cGRhdGVcbiAgICAgICAgLy8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NlYXJjaEFwcGxpZWQnLCB7IGRldGFpbDogeyB2aXNpYmxlQ291bnQgfSB9KSk7XG4gICAgfVxuICAgIC8vIEFkZCBrZXlib2FyZCBuYXZpZ2F0aW9uIChFc2NhcGUga2V5IHRvIGNsZWFyKVxuICAgIHNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICBzZWFyY2hCYXIudmFsdWUgPSAnJzsgLy8gQ2xlYXIgaW5wdXRcbiAgICAgICAgICAgIGZpbHRlckJsb2dDYXJkcygnJyk7IC8vIFJlLWZpbHRlciB3aXRoIGVtcHR5IHRlcm1cbiAgICAgICAgICAgIHNlYXJjaEJhci5ibHVyKCk7IC8vIFJlbW92ZSBmb2N1c1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQmxvZ0Zyb250ZW5kID0gaW5pdGlhbGl6ZUJsb2dGcm9udGVuZDtcbi8qKlxuICogQmxvZyBGcm9udGVuZCBDb250cm9sbGVyXG4gKiBDbGllbnQtc2lkZSBjb250cm9sbGVyIHRoYXQgaGFuZGxlcyBhbGwgZnJvbnRlbmQgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGJsb2cgaG9tZXBhZ2UuXG4gKiBNYW5hZ2VzIFVJIGluaXRpYWxpemF0aW9uLCBwb3N0IHJlbmRlcmluZywgZmlsdGVyaW5nLCBhbmQgdXNlciBpbnRlcmFjdGlvbnMuXG4gKi9cbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTsgLy8gVXNlcyBzdGF0aWMgZmV0Y2ggbm93XG5jb25zdCBibG9nQ2FyZHNfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Jsb2dDYXJkc1wiKTtcbmNvbnN0IHBhZ2luYXRpb25fMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3BhZ2luYXRpb25cIik7XG5jb25zdCBzZWFyY2hfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3NlYXJjaFwiKTtcbmNvbnN0IGFib3V0XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9hYm91dFwiKTtcbmNvbnN0IG5hdmlnYXRpb25fMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL25hdmlnYXRpb25cIik7XG4vKipcbiAqIEluaXRpYWxpemUgdGhlIGJsb2cgZnJvbnRlbmQgZnVuY3Rpb25hbGl0eSAoaG9tZXBhZ2UpXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVCbG9nRnJvbnRlbmQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgKDAsIG5hdmlnYXRpb25fMS5pbml0aWFsaXplTmF2aWdhdGlvbikoKTtcbiAgICAgICAgKDAsIGFib3V0XzEuaW5pdGlhbGl6ZUFib3V0KSgpO1xuICAgICAgICAoMCwgc2VhcmNoXzEuaW5pdGlhbGl6ZVNlYXJjaCkoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBwb3N0cywgd2hpY2ggbm93IGluY2x1ZGVzIGZpbHRlcmluZyBiYXNlZCBvbiBVUkwgcGFyYW1zXG4gICAgICAgIHlpZWxkIGluaXRpYWxpemVQb3N0cygpO1xuICAgICAgICAoMCwgcGFnaW5hdGlvbl8xLmluaXRpYWxpemVQYWdpbmF0aW9uKSgpOyAvLyBJbml0aWFsaXplIHBhZ2luYXRpb24gYWZ0ZXIgaW5pdGlhbCBwb3N0cyAocG9zc2libHkgZmlsdGVyZWQpIGFyZSBsb2FkZWRcbiAgICAgICAgc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCk7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgY3VzdG9tIGV2ZW50IHRvIHJlbG9hZCBwb3N0cyAoZS5nLiwgYWZ0ZXIgc2VhcmNoIG9yIGZpbHRlciBjaGFuZ2UpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlbG9hZFBvc3RzJywgaGFuZGxlUmVsb2FkUG9zdHMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBIYW5kbGVzIHRoZSBjdXN0b20gJ3JlbG9hZFBvc3RzJyBldmVudC4gUmVmZXRjaGVzIGFuZCByZS1yZW5kZXJzIHBvc3RzLlxuICovXG5mdW5jdGlvbiBoYW5kbGVSZWxvYWRQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBSZS1pbml0aWFsaXplIHBvc3RzLCB3aGljaCB3aWxsIHBpY2sgdXAgYW55IG5ldyBVUkwgcGFyYW1ldGVycyAobGlrZSBzZWFyY2ggcXVlcnkgT1IgdGFnKVxuICAgICAgICB5aWVsZCBpbml0aWFsaXplUG9zdHMoKTtcbiAgICAgICAgKDAsIHBhZ2luYXRpb25fMS5pbml0aWFsaXplUGFnaW5hdGlvbikoKTtcbiAgICAgICAgc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCk7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBldmVudCBkZWxlZ2F0aW9uIGZvciBibG9nIGNhcmRzIGNvbnRhaW5lclxuICovXG5mdW5jdGlvbiBzZXR1cEJsb2dDYXJkc0RlbGVnYXRpb24oKSB7XG4gICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cuYmxvZy1jYXJkcycpO1xuICAgIGlmIChibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQmxvZ0NhcmRDbGljayk7IC8vIFByZXZlbnQgZHVwbGljYXRlc1xuICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVCbG9nQ2FyZENsaWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IGZpbmQgI2Jsb2cuYmxvZy1jYXJkcyBjb250YWluZXIgZm9yIGRlbGVnYXRpb24uJyk7XG4gICAgfVxufVxuLyoqXG4gKiBIYW5kbGUgY2xpY2sgZXZlbnRzIG9uIGJsb2cgY2FyZHMgZm9yIG5hdmlnYXRpb25cbiAqL1xuZnVuY3Rpb24gaGFuZGxlQmxvZ0NhcmRDbGljayhldmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBjYXJkID0gdGFyZ2V0LmNsb3Nlc3QoJy5ibG9nLWNhcmQnKTtcbiAgICBpZiAoY2FyZCkge1xuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbiwgYSwgaScpKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoJ2EudGFnLWJhZGdlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zdElkID0gY2FyZC5kYXRhc2V0LnBvc3RJZDtcbiAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgLy8gVXNlIHJlbGF0aXZlIHBhdGggZm9yIG5hdmlnYXRpb25cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHBvc3QuaHRtbD9pZD0ke3Bvc3RJZH1gO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGJsb2cgcG9zdHM6IEZldGNoLCBmaWx0ZXIgKGJhc2VkIG9uIFVSTCBwYXJhbSksIGFuZCByZW5kZXIuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZy5ibG9nLWNhcmRzJyk7XG4gICAgICAgIGlmICghYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdCbG9nIGNhcmRzIGNvbnRhaW5lciAoI2Jsb2cuYmxvZy1jYXJkcykgbm90IGZvdW5kIGluIHRoZSBET00uJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gLS0tIENoZWNrIGZvciBUYWcgRmlsdGVyIC0tLVxuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICBjb25zdCB0YWdGaWx0ZXIgPSB1cmxQYXJhbXMuZ2V0KCd0YWcnKTtcbiAgICAgICAgY29uc3QgZmlsdGVyRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXItZGlzcGxheScpOyAvLyBPcHRpb25hbCBlbGVtZW50IHRvIHNob3cgZmlsdGVyXG4gICAgICAgIC8vIC0tLSBEZXRlcm1pbmUgQmFzZSBQYXRoIChuZWVkZWQgZm9yIENsZWFyIEZpbHRlciBsaW5rKSAtLS1cbiAgICAgICAgY29uc3QgY3VycmVudEhvc3RuYW1lID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgICAgICBjb25zdCBpc1Byb2R1Y3Rpb24gPSBjdXJyZW50SG9zdG5hbWUgPT09ICdub2VsdWd3b2tlLmNvbScgfHwgY3VycmVudEhvc3RuYW1lLmVuZHNXaXRoKCcuZ2l0aHViLmlvJyk7XG4gICAgICAgIC8vICoqKiBJTVBPUlRBTlQ6IENoYW5nZSAnL2Jsb2cvJyBpZiB5b3VyIEdpdEh1YiByZXBvIG5hbWUvcGF0aCBpcyBkaWZmZXJlbnQgKioqXG4gICAgICAgIGNvbnN0IGJhc2VQYXRoID0gaXNQcm9kdWN0aW9uID8gJy9ibG9nLycgOiAnLyc7XG4gICAgICAgIC8vIFJlbW92ZSBhbnkgZXhpc3RpbmcgZmlsdGVyIGluZGljYXRvciBiZWZvcmUgcG90ZW50aWFsbHkgYWRkaW5nIGEgbmV3IG9uZVxuICAgICAgICBjb25zdCBleGlzdGluZ0ZpbHRlckluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWctZmlsdGVyLWluZGljYXRvcicpO1xuICAgICAgICBpZiAoZXhpc3RpbmdGaWx0ZXJJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGV4aXN0aW5nRmlsdGVySW5kaWNhdG9yLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBmaWx0ZXIgaW5kaWNhdG9yIGlmIHRhZ0ZpbHRlciBleGlzdHNcbiAgICAgICAgaWYgKHRhZ0ZpbHRlcikge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmaWx0ZXJDb250YWluZXIuY2xhc3NOYW1lID0gJ3RhZy1maWx0ZXItaW5kaWNhdG9yJztcbiAgICAgICAgICAgIC8vIFVzZSBiYXNlUGF0aCBmb3IgdGhlIENsZWFyIGZpbHRlciBsaW5rJ3MgaHJlZlxuICAgICAgICAgICAgZmlsdGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxwPlNob3dpbmcgcG9zdHMgdGFnZ2VkIHdpdGg6IDxzcGFuIGNsYXNzPVwiZmlsdGVyZWQtdGFnXCI+JHt0YWdGaWx0ZXJ9PC9zcGFuPjwvcD5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIke2Jhc2VQYXRofVwiIGNsYXNzPVwiY2xlYXItZmlsdGVyXCI+Q2xlYXIgZmlsdGVyPC9hPiBcbiAgICAgICAgYDtcbiAgICAgICAgICAgIGNvbnN0IGJsb2dTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jsb2cnKTtcbiAgICAgICAgICAgIGlmIChibG9nU2VjdGlvbiA9PT0gbnVsbCB8fCBibG9nU2VjdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmxvZ1NlY3Rpb24ucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIGJsb2dTZWN0aW9uLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGZpbHRlckNvbnRhaW5lciwgYmxvZ1NlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbHRlckRpc3BsYXkpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJEaXNwbGF5LnRleHRDb250ZW50ID0gYFNob3dpbmcgcG9zdHMgdGFnZ2VkIHdpdGg6IFwiJHt0YWdGaWx0ZXJ9XCJgO1xuICAgICAgICAgICAgICAgIGZpbHRlckRpc3BsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmlsdGVyRGlzcGxheSkge1xuICAgICAgICAgICAgZmlsdGVyRGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIC8vIC0tLSBFbmQgQ2hlY2sgZm9yIFRhZyBGaWx0ZXIgLS0tXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj48L2Rpdj48cD5Mb2FkaW5nIHBvc3RzLi4uPC9wPic7XG4gICAgICAgICAgICBsZXQgYWxsUG9zdHMgPSB5aWVsZCAoMCwgYXBpXzEuZmV0Y2hCbG9nUG9zdHMpKCk7XG4gICAgICAgICAgICAvLyAtLS0gQXBwbHkgVGFnIEZpbHRlciAtLS1cbiAgICAgICAgICAgIGxldCBwb3N0c1RvRGlzcGxheSA9IGFsbFBvc3RzO1xuICAgICAgICAgICAgaWYgKHRhZ0ZpbHRlcikge1xuICAgICAgICAgICAgICAgIHBvc3RzVG9EaXNwbGF5ID0gYWxsUG9zdHMuZmlsdGVyKHBvc3QgPT4gcG9zdC50YWdzICYmIHBvc3QudGFncy5zb21lKHRhZyA9PiB0YWcudG9Mb3dlckNhc2UoKSA9PT0gdGFnRmlsdGVyLnRvTG93ZXJDYXNlKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0tLSBFbmQgQXBwbHkgVGFnIEZpbHRlciAtLS1cbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGlmIChwb3N0c1RvRGlzcGxheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTdGF0ZShibG9nQ2FyZHNDb250YWluZXIsIHRhZ0ZpbHRlciAhPT0gbnVsbCAmJiB0YWdGaWx0ZXIgIT09IHZvaWQgMCA/IHRhZ0ZpbHRlciA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgICAgICAgICAgICAgIGlmIChsb2FkTW9yZUJ0bilcbiAgICAgICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQYWdpbmF0aW9uIGxvZ2ljXG4gICAgICAgICAgICBjb25zdCBpbml0aWFsUG9zdENvdW50ID0gNjtcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlQb3N0cyA9IHBvc3RzVG9EaXNwbGF5LnNsaWNlKDAsIGluaXRpYWxQb3N0Q291bnQpO1xuICAgICAgICAgICAgY29uc3QgaGlkZGVuUG9zdHMgPSBwb3N0c1RvRGlzcGxheS5zbGljZShpbml0aWFsUG9zdENvdW50KTtcbiAgICAgICAgICAgIGRpc3BsYXlQb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2dDYXJkID0gKDAsIGJsb2dDYXJkc18xLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCkocG9zdCk7XG4gICAgICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgaGlkZGVuUG9zdHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLXBvc3RzJyk7XG4gICAgICAgICAgICBpZiAoaGlkZGVuUG9zdHNDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9nQ2FyZCA9ICgwLCBibG9nQ2FyZHNfMS5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQpKHBvc3QpO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChibG9nQ2FyZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBsb2FkTW9yZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLW1vcmUtYnRuJyk7XG4gICAgICAgICAgICBpZiAobG9hZE1vcmVCdG4pIHtcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gaGlkZGVuUG9zdHMubGVuZ3RoID4gMCA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgcG9zdHM6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd0Vycm9yU3RhdGUoYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBTaG93IGVtcHR5IHN0YXRlIHdoZW4gbm8gcG9zdHMgYXJlIGF2YWlsYWJsZVxuICovXG5mdW5jdGlvbiBzaG93RW1wdHlTdGF0ZShjb250YWluZXIsIHRhZ0ZpbHRlcikge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBjb25zdCBlbXB0eVN0YXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW1wdHlTdGF0ZURpdi5jbGFzc05hbWUgPSAnZW1wdHktc3RhdGUnO1xuICAgIC8vIC0tLSBEZXRlcm1pbmUgQmFzZSBQYXRoIChuZWVkZWQgZm9yIFZpZXcgQWxsIGxpbmspIC0tLVxuICAgIGNvbnN0IGN1cnJlbnRIb3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBjb25zdCBpc1Byb2R1Y3Rpb24gPSBjdXJyZW50SG9zdG5hbWUgPT09ICdub2VsdWd3b2tlLmNvbScgfHwgY3VycmVudEhvc3RuYW1lLmVuZHNXaXRoKCcuZ2l0aHViLmlvJyk7XG4gICAgLy8gKioqIElNUE9SVEFOVDogQ2hhbmdlICcvYmxvZy8nIGlmIHlvdXIgR2l0SHViIHJlcG8gbmFtZS9wYXRoIGlzIGRpZmZlcmVudCAqKipcbiAgICBjb25zdCBiYXNlUGF0aCA9IGlzUHJvZHVjdGlvbiA/ICcvYmxvZy8nIDogJy8nO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0YWdGaWx0ZXJcbiAgICAgICAgPyBgTm8gcG9zdHMgZm91bmQgdGFnZ2VkIHdpdGggXCIke3RhZ0ZpbHRlcn1cIi5gXG4gICAgICAgIDogJ05vIHBvc3RzIHlldCEnO1xuICAgIGVtcHR5U3RhdGVEaXYuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1maWxlLWFsdCBmYS0zeFwiPjwvaT5cbiAgICAgICAgPGgzPiR7bWVzc2FnZX08L2gzPlxuICAgICAgICAke3RhZ0ZpbHRlciA/IGA8cD48YSBocmVmPVwiJHtiYXNlUGF0aH1cIj5WaWV3IGFsbCBwb3N0czwvYT48L3A+YCA6ICc8cD5DaGVjayBiYWNrIGxhdGVyIGZvciBuZXcgY29udGVudCE8L3A+J31cbiAgICBgO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbXB0eVN0YXRlRGl2KTtcbn1cbi8qKlxuICogU2hvdyBlcnJvciBzdGF0ZSB3aGVuIHBvc3RzIGNvdWxkbid0IGJlIGxvYWRlZFxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JTdGF0ZShjb250YWluZXIpIHtcbiAgICAvLyAuLi4gKGltcGxlbWVudGF0aW9uIHJlbWFpbnMgdGhlIHNhbWUpIC4uLlxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBjb25zdCBlcnJvclN0YXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZXJyb3JTdGF0ZURpdi5jbGFzc05hbWUgPSAnZXJyb3Itc3RhdGUnO1xuICAgIGVycm9yU3RhdGVEaXYuaW5uZXJIVE1MID0gYC4uLmA7IC8vIEtlZXAgZXJyb3IgbWVzc2FnZSBIVE1MXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVycm9yU3RhdGVEaXYpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvZW50cmllcy9jbGllbnQudHNcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gSW1wb3J0cyByZW1haW4gdGhlIHNhbWUuLi5cbmNvbnN0IGJsb2dGcm9udGVuZENvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9ibG9nRnJvbnRlbmRDb250cm9sbGVyXCIpO1xuY29uc3QgcG9zdERldGFpbF8xID0gcmVxdWlyZShcIi4uL21vZHVsZXMvcG9zdERldGFpbFwiKTtcbmNvbnN0IGhlYWRlcl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaGVhZGVyXCIpO1xuY29uc3QgZGFya01vZGVfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2RhcmtNb2RlXCIpO1xuLyoqXG4gKiBDbGllbnQtc2lkZSBlbnRyeSBwb2ludCBpbml0aWFsaXplci5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNsaWVudCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpZW50IGluaXRpYWxpemluZy4uLicpO1xuICAgICAgICAvLyBJbml0aWFsaXplIGNvbW1vbiBlbGVtZW50cyBmaXJzdFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UpKCk7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGFyayBtb2RlIGluaXRpYWxpemVkIGdsb2JhbGx5LicpO1xuICAgICAgICAgICAgLy8gUmVuZGVyIEhlYWRlciBvbmx5IGlmIHBsYWNlaG9sZGVyIGV4aXN0c1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXItcGxhY2Vob2xkZXInKSkge1xuICAgICAgICAgICAgICAgICgwLCBoZWFkZXJfMS5yZW5kZXJIZWFkZXIpKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0hlYWRlciByZW5kZXJlZCBnbG9iYWxseS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignSGVhZGVyIHBsYWNlaG9sZGVyIG5vdCBmb3VuZCBvbiB0aGlzIHBhZ2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGNvbW1vbiBlbGVtZW50czpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhZ2Utc3BlY2lmaWMgbG9naWNcbiAgICAgICAgY29uc3QgcGFnZVR5cGUgPSBkb2N1bWVudC5ib2R5LmRhdGFzZXQucGFnZTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIC8vIEdldCB0aGUgYmFzZSBuYW1lIG9mIHRoZSBmaWxlL3BhdGgsIHJlbW92aW5nIHRyYWlsaW5nIHNsYXNoIGlmIHByZXNlbnRcbiAgICAgICAgY29uc3QgcGF0aEVuZCA9IGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvJykgPyBjdXJyZW50UGFnZS5zbGljZSgwLCAtMSkuc3BsaXQoJy8nKS5wb3AoKSA6IGN1cnJlbnRQYWdlLnNwbGl0KCcvJykucG9wKCk7XG4gICAgICAgIGNvbnN0IGlzUm9vdE9ySW5kZXggPSBjdXJyZW50UGFnZS5lbmRzV2l0aCgnLycpIHx8IGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvaW5kZXguaHRtbCcpOyAvLyBDaGVjayBpZiBpdCdzIHRoZSByb290IG9mIHRoZSBkZXBsb3ltZW50XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGV0ZWN0ZWQgcGFnZVR5cGU6ICR7cGFnZVR5cGV9LCBjdXJyZW50UGFnZTogJHtjdXJyZW50UGFnZX0sIHBhdGhFbmQ6ICR7cGF0aEVuZH0sIGlzUm9vdE9ySW5kZXg6ICR7aXNSb290T3JJbmRleH1gKTtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBNYWluIFBhZ2UgKHVzaW5nIGRhdGEtcGFnZSBvciBwYXRoIGVuZGluZyBpbiAvIG9yIC9pbmRleC5odG1sKVxuICAgICAgICAgICAgaWYgKHBhZ2VUeXBlID09PSAnbWFpbicgfHwgKCFwYWdlVHlwZSAmJiBpc1Jvb3RPckluZGV4KSkge1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBibG9nRnJvbnRlbmRDb250cm9sbGVyXzEuaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCkoKTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgUG9zdCBEZXRhaWwgUGFnZSAodXNpbmcgZGF0YS1wYWdlIG9yIHBhdGggZW5kaW5nIGluIC9wb3N0Lmh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ3Bvc3QnIHx8ICghcGFnZVR5cGUgJiYgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9wb3N0Lmh0bWwnKSkpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCAoMCwgcG9zdERldGFpbF8xLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljKSgpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBBZG1pbiBQYWdlICh1c2luZyBkYXRhLXBhZ2Ugb3IgcGF0aCBlbmRpbmcgaW4gL2FkbWluLmh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ2FkbWluJyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvYWRtaW4uaHRtbCcpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZG1pbiBwYWdlIGRldGVjdGVkIGJ5IGNsaWVudC50cyAtIG5vIGFjdGlvbiB0YWtlbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmtub3duIHBhZ2UgdHlwZSAoJyR7cGFnZVR5cGV9Jykgb3IgcGF0aCAoJyR7Y3VycmVudFBhZ2V9JykuIE5vIHNwZWNpZmljIGluaXRpYWxpemF0aW9uIG5lZWRlZCBmcm9tIGNsaWVudC50cy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBwYWdlLXNwZWNpZmljIGNsaWVudCBpbml0aWFsaXphdGlvbjonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIERPTUNvbnRlbnRMb2FkZWQgbGlzdGVuZXIgcmVtYWlucyB0aGUgc2FtZS4uLlxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0aWFsaXplQ2xpZW50KTtcbn1cbmVsc2Uge1xuICAgIGluaXRpYWxpemVDbGllbnQoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL21vZHVsZXMvcG9zdERldGFpbC50c1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljID0gaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWM7XG5leHBvcnRzLmxvYWRQb3N0Q29udGVudCA9IGxvYWRQb3N0Q29udGVudDtcbmV4cG9ydHMudXBkYXRlUG9zdFVJID0gdXBkYXRlUG9zdFVJO1xuZXhwb3J0cy51cGRhdGVQYWdlTWV0YWRhdGEgPSB1cGRhdGVQYWdlTWV0YWRhdGE7XG5leHBvcnRzLmluaXRpYWxpemVTb2NpYWxTaGFyaW5nID0gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmc7XG5leHBvcnRzLnNob3dFcnJvck1lc3NhZ2UgPSBzaG93RXJyb3JNZXNzYWdlO1xuLy8gLS0tIEltcG9ydHMgLS0tXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCB1cmxUcmFuc2Zvcm1lcl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3VybFRyYW5zZm9ybWVyXCIpO1xuY29uc3QgaGVhZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vLyAtLS0gQ29yZSBJbml0aWFsaXphdGlvbiBGdW5jdGlvbiAtLS1cbi8qKlxuICogSW5pdGlhbGl6ZXMgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBwb3N0IGRldGFpbCBwYWdlLlxuICogVGhpcyBpcyB0aGUgbWFpbiBleHBvcnRlZCBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBjYWxsZWQgYnkgdGhlIGVudHJ5IHBvaW50LlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UpKCk7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICgwLCBoZWFkZXJfMS5yZW5kZXJIZWFkZXIpKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgY29uc3QgcG9zdElkID0gdXJsUGFyYW1zLmdldCgnaWQnKTtcbiAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgeWllbGQgbG9hZFBvc3RDb250ZW50KHBvc3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBwb3N0IElEIHByb3ZpZGVkIGluIHRoZSBVUkwnKTtcbiAgICAgICAgICAgIHNob3dFcnJvck1lc3NhZ2UoJ05vIHBvc3Qgc3BlY2lmaWVkLiBQbGVhc2UgY2hlY2sgdGhlIFVSTC4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBMb2FkIGFuZCBkaXNwbGF5IHBvc3QgY29udGVudCBiYXNlZCBvbiBwb3N0IElEXG4gKi9cbmZ1bmN0aW9uIGxvYWRQb3N0Q29udGVudChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcG9zdCA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaFBvc3RCeUlkKShwb3N0SWQpO1xuICAgICAgICAgICAgaWYgKCFwb3N0KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUG9zdCB3aXRoIElEICR7cG9zdElkfSBub3QgZm91bmRgKTtcbiAgICAgICAgICAgIHVwZGF0ZVBvc3RVSShwb3N0KTtcbiAgICAgICAgICAgIHVwZGF0ZVBhZ2VNZXRhZGF0YShwb3N0KTtcbiAgICAgICAgICAgIGluaXRpYWxpemVTb2NpYWxTaGFyaW5nKHBvc3QpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBwb3N0IGNvbnRlbnQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZShgRmFpbGVkIHRvIGxvYWQgdGhlIGJsb2cgcG9zdC4gJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLid9YCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogVXBkYXRlIHRoZSBwb3N0IFVJIHdpdGggY29udGVudCBmcm9tIHRoZSBsb2FkZWQgcG9zdFxuICovXG5mdW5jdGlvbiB1cGRhdGVQb3N0VUkocG9zdCkge1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDYW5ub3QgdXBkYXRlIFVJOiAjcG9zdC1jb250ZW50IGVsZW1lbnQgbm90IGZvdW5kLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENvbnN0cnVjdCB0aGUgaW5uZXIgSFRNTCBkeW5hbWljYWxseVxuICAgIHBvc3RBcnRpY2xlRWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPiR7cG9zdC50aXRsZX08L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtbWV0YVwiPlxuICAgICAgICAgICAgICAgIDx0aW1lIGRhdGV0aW1lPVwiJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gOiAnJ31cIj5cbiAgICAgICAgICAgICAgICAgICAgJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnIH0pIDogJ0RhdGUgdW5rbm93bid9XG4gICAgICAgICAgICAgICAgPC90aW1lPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yXCI+YnkgJHtwb3N0LmF1dGhvciB8fCAnQW5vbnltb3VzJ308L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAke3Bvc3QuaW1hZ2VVcmwgPyBgPGltZyBzcmM9XCIke3Bvc3QuaW1hZ2VVcmx9XCIgYWx0PVwiJHtwb3N0LnRpdGxlfVwiIGNsYXNzPVwiZmVhdHVyZWQtaW1hZ2VcIj5gIDogJyd9XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtY29udGVudC1ib2R5XCI+XG4gICAgICAgICAgICAke3Bvc3QuY29udGVudH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtZm9vdGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICR7cG9zdC50YWdzICYmIHBvc3QudGFncy5sZW5ndGggPiAwID8gYDxzcGFuPlRhZ3M6PC9zcGFuPiAke3Bvc3QudGFncy5tYXAodGFnID0+IGA8YSBocmVmPVwiJHsoMCwgdXJsVHJhbnNmb3JtZXJfMS5nZW5lcmF0ZVRhZ0ZpbHRlclVybCkodGFnKX1cIj4ke3RhZ308L2E+YCkuam9pbignJyl9YCA6ICcnfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLXNoYXJpbmdcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TaGFyZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiB0d2l0dGVyXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIFR3aXR0ZXJcIj48aSBjbGFzcz1cImZhYiBmYS10d2l0dGVyXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gZmFjZWJvb2tcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gRmFjZWJvb2tcIj48aSBjbGFzcz1cImZhYiBmYS1mYWNlYm9vay1mXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gbGlua2VkaW5cIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gTGlua2VkSW5cIj48aSBjbGFzcz1cImZhYiBmYS1saW5rZWRpbi1pblwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuLyoqXG4gKiBVcGRhdGUgcGFnZSBtZXRhZGF0YSBsaWtlIHRpdGxlIGFuZCBVUkxcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUGFnZU1ldGFkYXRhKHBvc3QpIHtcbiAgICBkb2N1bWVudC50aXRsZSA9IGAke3Bvc3QudGl0bGV9IHwgTm9lbCdzIEJsb2dgO1xufVxuLyoqXG4gKiBJbml0aWFsaXplIHNvY2lhbCBzaGFyaW5nIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcocG9zdCkge1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHNvY2lhbFNoYXJpbmdEaXYgPSBwb3N0QXJ0aWNsZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbC1zaGFyaW5nJyk7XG4gICAgaWYgKHNvY2lhbFNoYXJpbmdEaXYpIHtcbiAgICAgICAgc29jaWFsU2hhcmluZ0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaGFyZS1idXR0b24nKTtcbiAgICAgICAgICAgIGlmICghYnV0dG9uKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBgQ2hlY2sgb3V0IHRoaXMgYXJ0aWNsZTogJHtwb3N0LnRpdGxlfWA7XG4gICAgICAgICAgICBsZXQgc2hhcmVXaW5kb3dVcmwgPSAnJztcbiAgICAgICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd0d2l0dGVyJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX0mdGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAndHdpdHRlci1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTIzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFjZWJvb2snKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2ZhY2Vib29rLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rZWRpbicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZS8/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2xpbmtlZGluLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogRGlzcGxheSBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSB1c2VyIHdpdGhpbiB0aGUgcG9zdCBjb250ZW50IGFyZWFcbiAqL1xuZnVuY3Rpb24gc2hvd0Vycm9yTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgY29uc3QgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgaWYgKGNvbnRlbnRFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy1zZWN0aW9uJyk7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBjb21tZW50c1NlY3Rpb24gPyBjb21tZW50c1NlY3Rpb24gOiBjb250ZW50RWxlbWVudDtcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj4ke21lc3NhZ2V9PC9kaXY+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFsZXJ0KG1lc3NhZ2UpOyAvLyBGYWxsYmFja1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmxpa2VQb3N0ID0gbGlrZVBvc3Q7XG5leHBvcnRzLnVubGlrZVBvc3QgPSB1bmxpa2VQb3N0O1xuZXhwb3J0cy5kZWxldGVCbG9nUG9zdCA9IGRlbGV0ZUJsb2dQb3N0O1xuZXhwb3J0cy5jcmVhdGVQb3N0ID0gY3JlYXRlUG9zdDtcbmV4cG9ydHMudXBkYXRlUG9zdCA9IHVwZGF0ZVBvc3Q7XG5leHBvcnRzLmFkZFRhZ1RvUG9zdCA9IGFkZFRhZ1RvUG9zdDtcbmV4cG9ydHMuZmV0Y2hCbG9nUG9zdHMgPSBmZXRjaEJsb2dQb3N0cztcbmV4cG9ydHMuZmV0Y2hQb3N0QnlJZCA9IGZldGNoUG9zdEJ5SWQ7XG5leHBvcnRzLmZldGNoQ29tbWVudHNBcGkgPSBmZXRjaENvbW1lbnRzQXBpO1xuZXhwb3J0cy5zdWJtaXRDb21tZW50QXBpID0gc3VibWl0Q29tbWVudEFwaTtcbi8vIEFQSV9VUkwgY29uc3RhbnQgaXMgbm90IG5lZWRlZCB3aGVuIGZldGNoaW5nIHN0YXRpYyBmaWxlIGRpcmVjdGx5XG4vLyBjb25zdCBBUElfVVJMID0gJy9hcGknOyBcbi8vIC0tLSBGdW5jdGlvbnMgcmVseWluZyBvbiBiYWNrZW5kIEFQSSAoV2lsbCBOT1Qgd29yayBvbiBHaXRIdWIgUGFnZXMpIC0tLVxuLy8gVGhlc2UgZnVuY3Rpb25zIHdpbGwgZmFpbCBzaWxlbnRseSBvciBsb2cgZXJyb3JzIGluIHRoZSBjb25zb2xlIG9uIHRoZSBzdGF0aWMgc2l0ZS5cbmZ1bmN0aW9uIGxpa2VQb3N0KGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgTGlrZSBmdW5jdGlvbmFsaXR5IHJlcXVpcmVzIGEgYmFja2VuZC4gQ2Fubm90IExJS0UgcG9zdCAke2lkfSBvbiBzdGF0aWMgc2l0ZS5gKTtcbiAgICAgICAgLy8gUmV0dXJuIG51bGwgb3IgYSBkZWZhdWx0IHN0cnVjdHVyZSBpZiB5b3VyIGNhbGxpbmcgY29kZSBleHBlY3RzIGl0XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdW5saWtlUG9zdChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFVubGlrZSBmdW5jdGlvbmFsaXR5IHJlcXVpcmVzIGEgYmFja2VuZC4gQ2Fubm90IFVOTElLRSBwb3N0ICR7aWR9IG9uIHN0YXRpYyBzaXRlLmApO1xuICAgICAgICAvLyBSZXR1cm4gbnVsbCBvciBhIGRlZmF1bHQgc3RydWN0dXJlXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGVsZXRlQmxvZ1Bvc3QocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBkZWxldGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVQb3N0KHBvc3REYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBjcmVhdGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVBvc3QoaWQsIHBvc3REYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCB1cGRhdGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGFkZFRhZ1RvUG9zdChpZCwgdGFnKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBhZGQgdGFnIG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuLy8gLS0tIEZ1bmN0aW9ucyBtb2RpZmllZCBmb3Igc3RhdGljIGRhdGEgLS0tXG5jb25zdCBTVEFUSUNfREFUQV9VUkwgPSAnZGF0YS9wb3N0cy5qc29uJzsgLy8gRGVmaW5lIHJlbGF0aXZlIHBhdGggb25jZVxuLyoqXG4gKiBGZXRjaCBhbGwgYmxvZyBwb3N0cyBkaXJlY3RseSBmcm9tIHRoZSBzdGF0aWMgSlNPTiBmaWxlLlxuICovXG5mdW5jdGlvbiBmZXRjaEJsb2dQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIEpTT04gZmlsZSB1c2luZyB0aGUgcmVsYXRpdmUgcGF0aFxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChTVEFUSUNfREFUQV9VUkwpO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoICR7U1RBVElDX0RBVEFfVVJMfTogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAvLyBBc3N1bWluZyB0aGUgSlNPTiBzdHJ1Y3R1cmUgaXMgeyBwb3N0czogWy4uLl0gfSBcbiAgICAgICAgICAgIHJldHVybiBkYXRhLnBvc3RzIHx8IFtdO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RhdGljICR7U1RBVElDX0RBVEFfVVJMfTpgLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSBvbiBlcnJvclxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhIHNpbmdsZSBwb3N0IGJ5IElEIGJ5IGZpbHRlcmluZyB0aGUgc3RhdGljIEpTT04gZGF0YS5cbiAqIEBwYXJhbSBpZCAtIFRoZSBwb3N0IElEIChzdHJpbmcgb3IgbnVtYmVyKVxuICovXG5mdW5jdGlvbiBmZXRjaFBvc3RCeUlkKGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZldGNoIGFsbCBwb3N0cyBmaXJzdFxuICAgICAgICAgICAgY29uc3QgYWxsUG9zdHMgPSB5aWVsZCBmZXRjaEJsb2dQb3N0cygpO1xuICAgICAgICAgICAgY29uc3QgcG9zdElkTnVtYmVyID0gdHlwZW9mIGlkID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KGlkLCAxMCkgOiBpZDtcbiAgICAgICAgICAgIGlmIChpc05hTihwb3N0SWROdW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgSW52YWxpZCBwb3N0IElEIHByb3ZpZGVkOiAke2lkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRmluZCB0aGUgc3BlY2lmaWMgcG9zdFxuICAgICAgICAgICAgY29uc3QgcG9zdCA9IGFsbFBvc3RzLmZpbmQocCA9PiBOdW1iZXIocC5pZCkgPT09IHBvc3RJZE51bWJlcik7XG4gICAgICAgICAgICBpZiAoIXBvc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFBvc3Qgd2l0aCBJRCAke2lkfSBub3QgZm91bmQgaW4gc3RhdGljIGRhdGEuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgcG9zdCAke2lkfSBpbiBzdGF0aWMgZGF0YS5gKTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RhdGljIHBvc3QgJHtpZH06YCwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIC0tLSBDb21tZW50IEFQSSBQbGFjZWhvbGRlcnMgLS0tXG5mdW5jdGlvbiBmZXRjaENvbW1lbnRzQXBpKHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkNvbW1lbnRzIGNhbm5vdCBiZSBmZXRjaGVkIG9uIHN0YXRpYyBzaXRlIHdpdGhvdXQgZXh0ZXJuYWwgc2VydmljZS9iYWNrZW5kLlwiKTtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gc3VibWl0Q29tbWVudEFwaShwb3N0SWQsIG5hbWUsIGNvbW1lbnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHN1Ym1pdCBjb21tZW50IG9uIHN0YXRpYyBzaXRlIHdpdGhvdXQgZXh0ZXJuYWwgc2VydmljZS9iYWNrZW5kLlwiKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29tbWVudCBzdWJtaXNzaW9uIG5vdCBhdmFpbGFibGUuXCIpO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvdXRpbHMvdXJsVHJhbnNmb3JtZXIudHMgKEV4YW1wbGUgTG9jYXRpb24pXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdlbmVyYXRlVGFnRmlsdGVyVXJsID0gZ2VuZXJhdGVUYWdGaWx0ZXJVcmw7XG4vKipcbiAqIEdlbmVyYXRlcyBhIFVSTCBwYXRoIGZvciBmaWx0ZXJpbmcgYnkgdGFnIG9uIHRoZSBtYWluIGJsb2cgcGFnZS5cbiAqIENyZWF0ZXMgYSBVUkwgbGlrZSBcIi9ibG9nLz90YWc9eW91ci10YWctbmFtZVwiIG9yIFwiLz90YWc9eW91ci10YWctbmFtZVwiIGJhc2VkIG9uIGVudmlyb25tZW50LlxuICpcbiAqIEBwYXJhbSB0YWcgLSBUaGUgdGFnIHN0cmluZyB0byBmaWx0ZXIgYnkuXG4gKiBAcmV0dXJucyBUaGUgVVJMIHBhdGggd2l0aCB0aGUgdGFnIHF1ZXJ5IHBhcmFtZXRlci5cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUYWdGaWx0ZXJVcmwodGFnKSB7XG4gICAgLy8gT3B0aW9uYWw6IENvbnZlcnQgdGFnIHRvIGxvd2VyY2FzZSBmb3IgY29uc2lzdGVuY3kgaW4gZmlsdGVyaW5nXG4gICAgY29uc3QgY29uc2lzdGVudFRhZyA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIFVSTFNlYXJjaFBhcmFtcyBoYW5kbGVzIG5lY2Vzc2FyeSBlbmNvZGluZyBmb3IgcXVlcnkgcGFyYW1ldGVyIHZhbHVlc1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoeyB0YWc6IGNvbnNpc3RlbnRUYWcgfSk7XG4gICAgLy8gQ2hlY2sgaWYgd2UncmUgb24gdGhlIHByb2R1Y3Rpb24gc2l0ZSBieSBsb29raW5nIGF0IHRoZSBob3N0bmFtZVxuICAgIGNvbnN0IGlzUHJvZHVjdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ25vZWx1Z3dva2UuY29tJztcbiAgICBjb25zdCBiYXNlUGF0aCA9IGlzUHJvZHVjdGlvbiA/ICcvYmxvZy8nIDogJy8nO1xuICAgIHJldHVybiBgJHtiYXNlUGF0aH0/JHtwYXJhbXMudG9TdHJpbmcoKX1gO1xufVxuLypcbi8vIE9yaWdpbmFsIGZ1bmN0aW9uIC0ga2VwdCBmb3IgcmVmZXJlbmNlIG9yIGlmIG5lZWRlZCBmb3IgZGlmZmVyZW50IFVSTCB0eXBlc1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVRhZ1RvVXJsRm9ybWF0KHRhZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGFnLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCAnLScpO1xufVxuKi9cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9lbnRyaWVzL2NsaWVudC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==