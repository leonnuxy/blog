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
            <div class="header-right">
                <input type="search" placeholder="Search for articles..." class="search-bar">
                <button id="hamburger-btn" class="mobile-nav-toggle" aria-label="Open Navigation Menu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </header>
    `;
    // Event listeners should be called *after* renderHeader is executed.
}


/***/ }),

/***/ "./src/components/mobileNav.ts":
/*!*************************************!*\
  !*** ./src/components/mobileNav.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeMobileNav = initializeMobileNav;
function initializeMobileNav() {
    const hamburgerBtn = document.getElementById('hamburger-btn'); // Ensure this ID matches the button in header.js
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const mobileNavContainer = drawer === null || drawer === void 0 ? void 0 : drawer.querySelector('.mobile-nav');
    const desktopNav = document.querySelector('.site-header nav ul'); // Get the desktop nav list
    if (!hamburgerBtn || !closeDrawerBtn || !drawer || !overlay || !mobileNavContainer || !desktopNav) {
        console.warn('Mobile navigation elements not found. Skipping initialization.');
        return;
    }
    // --- Clone Desktop Nav Links to Mobile Drawer ---
    const cloneNavLinks = () => {
        mobileNavContainer.innerHTML = ''; // Clear existing links
        const desktopLinks = desktopNav.querySelectorAll('li a');
        desktopLinks.forEach(link => {
            const clonedLink = link.cloneNode(true);
            // Optional: Add specific classes or modify attributes for mobile if needed
            mobileNavContainer.appendChild(clonedLink);
        });
    };
    // --- Event Listeners ---
    const openDrawer = () => {
        drawer.classList.add('open');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };
    const closeDrawer = () => {
        drawer.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.style.overflow = ''; // Restore scrolling
    };
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering overlay click
        openDrawer();
    });
    closeDrawerBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
    // Close drawer when a link inside it is clicked
    mobileNavContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            closeDrawer();
        }
    });
    // --- Initialization ---
    cloneNavLinks(); // Initial population
    // Optional: Re-clone if desktop nav might change dynamically (e.g., login/logout)
    // You might need a more robust way to handle dynamic updates if required.
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
const about_1 = __webpack_require__(/*! ../components/about */ "./src/components/about.ts");
const navigation_1 = __webpack_require__(/*! ../components/navigation */ "./src/components/navigation.ts");
/**
 * Initialize the blog frontend functionality (homepage)
 */
function initializeBlogFrontend() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, navigation_1.initializeNavigation)();
        (0, about_1.initializeAbout)();
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
// --- Imports ---
// Page Specific Logic
const blogFrontendController_1 = __webpack_require__(/*! ../controllers/blogFrontendController */ "./src/controllers/blogFrontendController.ts");
const postDetail_1 = __webpack_require__(/*! ../modules/postDetail */ "./src/modules/postDetail.ts");
// Common Components & Utilities
const header_1 = __webpack_require__(/*! ../components/header */ "./src/components/header.ts");
const darkMode_1 = __webpack_require__(/*! ../components/darkMode */ "./src/components/darkMode.ts");
const mobileNav_1 = __webpack_require__(/*! ../components/mobileNav */ "./src/components/mobileNav.ts"); // Assuming path is correct
const search_1 = __webpack_require__(/*! ../components/search */ "./src/components/search.ts"); // Assuming path is correct
const navigation_1 = __webpack_require__(/*! ../components/navigation */ "./src/components/navigation.ts"); // Assuming path is correct
const about_1 = __webpack_require__(/*! ../components/about */ "./src/components/about.ts"); // Assuming path is correct
// Import tag filtering if it sets up global listeners or needs to run early
// import { initializeTagFiltering } from '../components/tagFilter'; // Assuming path is correct
/**
 * Client-side entry point initializer.
 * Initializes common components and page-specific logic.
 */
function initializeClient() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Client initializing...');
        // --- Initialize Common Elements & Functionality ---
        // These run on every page that loads client.bundle.js
        try {
            // Theme and Header first
            (0, darkMode_1.checkSystemDarkModePreference)();
            (0, darkMode_1.initializeDarkMode)();
            console.log('Dark mode initialized globally.');
            // Render Header only if placeholder exists
            if (document.getElementById('header-placeholder')) {
                (0, header_1.renderHeader)();
                console.log('Header rendered globally.');
                // Initialize components dependent on header *after* rendering
                (0, mobileNav_1.initializeMobileNav)(); // Initialize mobile nav using header elements
                (0, search_1.initializeSearch)(); // Initialize search bar in header
                (0, navigation_1.initializeNavigation)(); // Initialize nav link active states
            }
            else {
                console.warn('Header placeholder not found on this page. Skipping header-dependent initializations.');
            }
            // Initialize other common UI elements like popups
            (0, about_1.initializeAbout)(); // Assumes #about-btn and #about-popup might exist globally or are handled safely inside
            // Initialize tag filtering listeners if needed globally (e.g., if tags appear in header/footer)
            // initializeTagFiltering(); 
        }
        catch (error) {
            console.error("Error initializing common elements:", error);
        }
        // --- End Common Elements ---
        // --- Page-Specific Logic ---
        const pageType = document.body.dataset.page;
        const currentPage = window.location.pathname;
        const isRootOrIndex = currentPage.endsWith('/') || currentPage.endsWith('/index.html');
        try {
            console.log(`Detected pageType: ${pageType}, currentPage: ${currentPage}, isRootOrIndex: ${isRootOrIndex}`);
            // Check for Main Page 
            if (pageType === 'main' || (!pageType && isRootOrIndex)) {
                console.log('Initializing main blog page logic...');
                yield (0, blogFrontendController_1.initializeBlogFrontend)(); // Handles posts, pagination, card delegation etc.
                console.log('Main blog page logic initialized.');
                // Check for Post Detail Page
            }
            else if (pageType === 'post' || (!pageType && currentPage.endsWith('/post.html'))) {
                console.log('Initializing post detail page logic (from module)...');
                yield (0, postDetail_1.initializePostDetailPageLogic)(); // Handles single post display, like, comments etc.
                console.log('Post detail page logic initialized.');
                // Check for Admin Page
            }
            else if (pageType === 'admin' || (!pageType && currentPage.endsWith('/admin.html'))) {
                console.log('Admin page detected by client.ts - no action taken.'); // Admin logic is in admin.bundle.js
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
// --- Global Execution ---
// Run initialization logic when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClient);
}
else {
    // DOMContentLoaded has already fired
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7QUMvSGE7QUFDYjtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxvQkFBb0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsY0FBYyxTQUFTLEdBQUcsa0JBQWtCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDMUJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvYWJvdXQudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2Jsb2dDYXJkcy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvY29tbWVudHMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2RhcmtNb2RlLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL21vYmlsZU5hdi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvbmF2aWdhdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvcGFnaW5hdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29udHJvbGxlcnMvYmxvZ0Zyb250ZW5kQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2VudHJpZXMvY2xpZW50LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvbW9kdWxlcy9wb3N0RGV0YWlsLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvc2VydmljZXMvYXBpLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvdXRpbHMvdXJsVHJhbnNmb3JtZXIudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBBYm91dCBwb3B1cCBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVBYm91dCA9IGluaXRpYWxpemVBYm91dDtcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgQWJvdXQgc2VjdGlvbiBwb3B1cFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQWJvdXQoKSB7XG4gICAgY29uc3QgYWJvdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtYnRuJyk7XG4gICAgY29uc3QgYWJvdXRQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1wb3B1cCcpO1xuICAgIGNvbnN0IGNsb3NlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQtcG9wdXAgLmNsb3NlLXBvcHVwJyk7XG4gICAgaWYgKCFhYm91dEJ0biB8fCAhYWJvdXRQb3B1cCB8fCAhY2xvc2VQb3B1cCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0Fib3V0IHBvcHVwIGVsZW1lbnRzIG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gT3BlbiBwb3B1cCB3aGVuIGFib3V0IGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgYWJvdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgZGVmYXVsdCBhbmNob3IgYmVoYXZpb3JcbiAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJzsgLy8gUHJldmVudCBzY3JvbGxpbmcgd2hpbGUgcG9wdXAgaXMgb3BlblxuICAgICAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGFib3V0IGxpbmtcbiAgICAgICAgYWJvdXRCdG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2UgcG9wdXAgd2hlbiBjbG9zZSBidXR0b24gaXMgY2xpY2tlZFxuICAgIGNsb3NlUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSB3aGVuIGNsaWNraW5nIG91dHNpZGUgdGhlIHBvcHVwIGNvbnRlbnRcbiAgICBhYm91dFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBhYm91dFBvcHVwKSB7XG4gICAgICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBDbG9zZSBvbiBlc2NhcGUga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgYWJvdXRQb3B1cC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgdGhlIGRlZmF1bHQgYWN0aXZlIGxpbmsgc3RhdGVcbiAqL1xuZnVuY3Rpb24gc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKSB7XG4gICAgLy8gR2V0IGN1cnJlbnQgaGFzaCBvciBkZWZhdWx0IHRvIGhvbWVcbiAgICBjb25zdCBjdXJyZW50SGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8ICcjaG9tZSc7XG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBuYXYgbGlua3NcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgaGFzaCBsaW5rXG4gICAgY29uc3QgY3VycmVudExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXIgbmF2IHVsIGxpIGFbaHJlZj1cIiR7Y3VycmVudEhhc2h9XCJdYCk7XG4gICAgaWYgKGN1cnJlbnRMaW5rKSB7XG4gICAgICAgIGN1cnJlbnRMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQgPSBjcmVhdGVCbG9nQ2FyZEVsZW1lbnQ7XG5jb25zdCB1cmxUcmFuc2Zvcm1lcl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3VybFRyYW5zZm9ybWVyXCIpOyAvLyBJbXBvcnQgdGhlIFVSTCBnZW5lcmF0b3Jcbi8qKlxuICogQ3JlYXRlcyBhIERPTSBlbGVtZW50IGZvciBhIGJsb2cgY2FyZCBmcm9tIHBvc3QgZGF0YSAoZGlzcGxheSBvbmx5IGZvciBhY3Rpb25zKVxuICovXG5mdW5jdGlvbiBjcmVhdGVCbG9nQ2FyZEVsZW1lbnQocG9zdCkge1xuICAgIGNvbnN0IGJsb2dDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmxvZ0NhcmQuY2xhc3NOYW1lID0gJ2Jsb2ctY2FyZCc7XG4gICAgYmxvZ0NhcmQuZGF0YXNldC5wb3N0SWQgPSBTdHJpbmcocG9zdC5pZCk7XG4gICAgYmxvZ0NhcmQuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgIGNvbnN0IGNvbW1lbnRDb3VudCA9IHBvc3QuY29tbWVudHMgPyBwb3N0LmNvbW1lbnRzLmxlbmd0aCA6IDA7XG4gICAgY29uc3QgY3JlYXRlZERhdGUgPSBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IGNyZWF0ZWREYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYydcbiAgICB9KTtcbiAgICAvLyAtLS0gRHluYW1pYyBVUkwgYW5kIFRleHQgR2VuZXJhdGlvbiBmb3IgU2hhcmluZyAtLS1cbiAgICBjb25zdCBwb3N0VXJsID0gYHBvc3QuaHRtbD9pZD0ke1N0cmluZyhwb3N0LmlkKX1gO1xuICAgIGNvbnN0IGVuY29kZWRVcmwgPSBlbmNvZGVVUklDb21wb25lbnQocG9zdFVybCk7XG4gICAgY29uc3Qgc2hhcmVUZXh0ID0gYENoZWNrIG91dCB0aGlzIGFydGljbGU6ICR7cG9zdC50aXRsZX1gO1xuICAgIGNvbnN0IGVuY29kZWRTaGFyZVRleHQgPSBlbmNvZGVVUklDb21wb25lbnQoc2hhcmVUZXh0KTtcbiAgICAvLyAtLS0gRW5kIER5bmFtaWMgVVJMIEdlbmVyYXRpb24gLS0tXG4gICAgLy8gR2VuZXJhdGUgSFRNTCBmb3IgdGFnIGJhZGdlcy9saW5rcyB1c2luZyB0aGUgdXRpbGl0eSBmdW5jdGlvblxuICAgIGxldCB0YWdzSFRNTCA9ICcnO1xuICAgIGlmIChwb3N0LnRhZ3MgJiYgcG9zdC50YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGFnc0hUTUwgPSAnPGRpdiBjbGFzcz1cInBvc3QtdGFnc1wiPicgK1xuICAgICAgICAgICAgcG9zdC50YWdzLm1hcCh0YWcgPT4gXG4gICAgICAgICAgICAvLyBVc2UgZ2VuZXJhdGVUYWdGaWx0ZXJVcmwgZm9yIGhyZWYgaW4gYW4gPGE+IHRhZ1xuICAgICAgICAgICAgYDxhIGhyZWY9XCIkeygwLCB1cmxUcmFuc2Zvcm1lcl8xLmdlbmVyYXRlVGFnRmlsdGVyVXJsKSh0YWcpfVwiIGNsYXNzPVwidGFnLWJhZGdlXCI+JHt0YWd9PC9hPmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgIH1cbiAgICBjb25zdCBmYWxsYmFja0ltYWdlVXJsID0gJ2ltYWdlcy9ibG9nX2ltYWdlXzMuanBlZyc7IC8vIFJlbGF0aXZlIHBhdGhcbiAgICAvLyBDcmVhdGUgSFRNTCBmb3IgYmxvZyBjYXJkXG4gICAgYmxvZ0NhcmQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aW1nIHNyYz1cIiR7cG9zdC5pbWFnZVVybCB8fCBmYWxsYmFja0ltYWdlVXJsfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIj4gXG4gICAgICAgIDxkaXYgY2xhc3M9XCJibG9nLWNhcmQtY29udGVudFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJibG9nLWNhcmQtZGF0ZS1hdXRob3JcIj4ke2RhdGVTdHJ9PC9wPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiYmxvZy1jYXJkLXRpdGxlXCI+JHtwb3N0LnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAke3RhZ3NIVE1MfVxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWwtc2hhcmluZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIHR3aXR0ZXJcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gVHdpdHRlclwiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiIGRhdGEtdGV4dD1cIiR7ZW5jb2RlZFNoYXJlVGV4dH1cIj48aSBjbGFzcz1cImZhYiBmYS10d2l0dGVyXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGZhY2Vib29rXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIEZhY2Vib29rXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2stZlwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBsaW5rZWRpblwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBMaW5rZWRJblwiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiPjxpIGNsYXNzPVwiZmFiIGZhLWxpbmtlZGluLWluXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgLy8gU2V0dXAgc29jaWFsIHNoYXJpbmcgbGlzdGVuZXJzIChhcyBiZWZvcmUpXG4gICAgY29uc3Qgc29jaWFsU2hhcmluZ0RpdiA9IGJsb2dDYXJkLnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWwtc2hhcmluZycpO1xuICAgIGlmIChzb2NpYWxTaGFyaW5nRGl2KSB7XG4gICAgICAgIHNvY2lhbFNoYXJpbmdEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIC4uLiBleGlzdGluZyBzb2NpYWwgc2hhcmluZyBjbGljayBsb2dpYyAuLi5cbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hhcmUtYnV0dG9uJyk7XG4gICAgICAgICAgICBpZiAoIWJ1dHRvbilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnN1YnN0cmluZygwLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVVcmwgPSBidXR0b24uZGF0YXNldC51cmwgPyBkZWNvZGVVUklDb21wb25lbnQoYnV0dG9uLmRhdGFzZXQudXJsKSA6IGBwb3N0Lmh0bWw/aWQ9JHtwb3N0LmlkfWA7XG4gICAgICAgICAgICBjb25zdCBmdWxsVXJsID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0ke2Jhc2VQYXRofSR7cmVsYXRpdmVVcmx9YDtcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRGdWxsVXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KGZ1bGxVcmwpO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGJ1dHRvbi5kYXRhc2V0LnRleHQgPyBkZWNvZGVVUklDb21wb25lbnQoYnV0dG9uLmRhdGFzZXQudGV4dCkgOiBkb2N1bWVudC50aXRsZTtcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpO1xuICAgICAgICAgICAgbGV0IHNoYXJlV2luZG93VXJsID0gJyc7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygndHdpdHRlcicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2VuY29kZWRUZXh0fSZ1cmw9JHtlbmNvZGVkRnVsbFVybH1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAndHdpdHRlci1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTIzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFjZWJvb2snKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7ZW5jb2RlZEZ1bGxVcmx9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2ZhY2Vib29rLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rZWRpbicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZS8/dXJsPSR7ZW5jb2RlZEZ1bGxVcmx9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2xpbmtlZGluLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBSRU1PVkVEOiBTZXBhcmF0ZSBldmVudCBsaXN0ZW5lciBsb29wIGZvciB0YWcgYmFkZ2VzIChub3cgaGFuZGxlZCBieSBzdGFuZGFyZCA8YT4gdGFncylcbiAgICByZXR1cm4gYmxvZ0NhcmQ7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbW1lbnRzID0gaW5pdGlhbGl6ZUNvbW1lbnRzO1xuZXhwb3J0cy5pbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5ID0gaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eTtcbi8qKlxuICogSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciBibG9nIHBvc3RzXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDb21tZW50cygpIHtcbiAgICBzZXR1cENvbW1lbnRUb2dnbGVzKCk7XG4gICAgc2V0dXBDb21tZW50Rm9ybXMoKTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciBhIHNwZWNpZmljIGJsb2cgcG9zdCBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkocG9zdEVsZW1lbnQpIHtcbiAgICBjb25zdCB0b2dnbGUgPSBwb3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtdG9nZ2xlJyk7XG4gICAgY29uc3QgZm9ybSA9IHBvc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWZvcm0nKTtcbiAgICBpZiAodG9nZ2xlKSB7XG4gICAgICAgIHNldHVwQ29tbWVudFRvZ2dsZSh0b2dnbGUpO1xuICAgIH1cbiAgICBpZiAoZm9ybSkge1xuICAgICAgICBzZXR1cENvbW1lbnRGb3JtKGZvcm0pO1xuICAgIH1cbn1cbi8qKlxuICogU2V0IHVwIGNvbW1lbnQgdG9nZ2xlIGJ1dHRvbnNcbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50VG9nZ2xlcygpIHtcbiAgICBjb25zdCBjb21tZW50VG9nZ2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50cy10b2dnbGUnKTtcbiAgICBjb21tZW50VG9nZ2xlcy5mb3JFYWNoKHRvZ2dsZSA9PiB7XG4gICAgICAgIHNldHVwQ29tbWVudFRvZ2dsZSh0b2dnbGUpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgYSBzaW5nbGUgY29tbWVudCB0b2dnbGUgYnV0dG9uXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudFRvZ2dsZSh0b2dnbGUpIHtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IHRvZ2dsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zdC1pZCcpO1xuICAgICAgICBjb25zdCBjb21tZW50c1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY29tbWVudHMtJHtwb3N0SWR9YCk7XG4gICAgICAgIGlmIChjb21tZW50c1NlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbW1lbnRzU2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIC8vIENoYW5nZSBidXR0b24gdGV4dCBiYXNlZCBvbiBzdGF0ZVxuICAgICAgICAgICAgaWYgKGNvbW1lbnRzU2VjdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT4gSGlkZSBDb21tZW50cyA8c3BhbiBjbGFzcz1cImNvbW1lbnRzLWNvdW50XCI+JHsoX2EgPSB0b2dnbGUucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvdW50JykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50ZXh0Q29udGVudH08L3NwYW4+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtY29tbWVudFwiPjwvaT4gQ29tbWVudHMgPHNwYW4gY2xhc3M9XCJjb21tZW50cy1jb3VudFwiPiR7KF9iID0gdG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb3VudCcpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudGV4dENvbnRlbnR9PC9zcGFuPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGNvbW1lbnQgZm9ybXNcbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50Rm9ybXMoKSB7XG4gICAgY29uc3QgY29tbWVudEZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnQtZm9ybScpO1xuICAgIGNvbW1lbnRGb3Jtcy5mb3JFYWNoKGZvcm0gPT4ge1xuICAgICAgICBzZXR1cENvbW1lbnRGb3JtKGZvcm0pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgYSBzaW5nbGUgY29tbWVudCBmb3JtXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudEZvcm0oZm9ybSkge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3N0LWlkJyk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbW1lbnRzLSR7cG9zdElkfSAuY29tbWVudHMtbGlzdGApO1xuICAgICAgICBpZiAoIWNvbW1lbnRzQ29udGFpbmVyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcigndGV4dGFyZWFbbmFtZT1cImNvbW1lbnRcIl0nKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgaW5wdXRzIGFyZSBub3QgZW1wdHlcbiAgICAgICAgaWYgKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgPT09ICcnIHx8IGNvbW1lbnRJbnB1dC52YWx1ZS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYWRkTmV3Q29tbWVudChwb3N0SWQsIGNvbW1lbnRzQ29udGFpbmVyLCBuYW1lSW5wdXQudmFsdWUsIGNvbW1lbnRJbnB1dC52YWx1ZSk7XG4gICAgICAgIC8vIFJlc2V0IGZvcm1cbiAgICAgICAgZm9ybS5yZXNldCgpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBBZGQgYSBuZXcgY29tbWVudCB0byB0aGUgY29tbWVudHMgbGlzdFxuICovXG5mdW5jdGlvbiBhZGROZXdDb21tZW50KHBvc3RJZCwgY29tbWVudHNDb250YWluZXIsIG5hbWUsIGNvbW1lbnRUZXh0KSB7XG4gICAgLy8gQ3JlYXRlIG5ldyBjb21tZW50XG4gICAgY29uc3QgbmV3Q29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5ld0NvbW1lbnQuY2xhc3NOYW1lID0gJ2NvbW1lbnQnO1xuICAgIC8vIEdldCBjdXJyZW50IGRhdGVcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBub3cudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICBtb250aDogJ2xvbmcnLFxuICAgICAgICBkYXk6ICdudW1lcmljJ1xuICAgIH0pO1xuICAgIC8vIENvbW1lbnQgSFRNTCBzdHJ1Y3R1cmVcbiAgICBuZXdDb21tZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtYXZhdGFyXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS11c2VyLWNpcmNsZVwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1hdXRob3JcIj4ke25hbWV9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LXRleHRcIj4ke2NvbW1lbnRUZXh0fTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1kYXRlXCI+JHtkYXRlU3RyfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICAvLyBSZW1vdmUgXCJubyBjb21tZW50cyB5ZXRcIiBtZXNzYWdlIGlmIGl0IGV4aXN0c1xuICAgIGNvbnN0IG5vQ29tbWVudHMgPSBjb21tZW50c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubm8tY29tbWVudHMnKTtcbiAgICBpZiAobm9Db21tZW50cykge1xuICAgICAgICBjb21tZW50c0NvbnRhaW5lci5yZW1vdmVDaGlsZChub0NvbW1lbnRzKTtcbiAgICB9XG4gICAgLy8gQWRkIHRoZSBuZXcgY29tbWVudCB0byB0aGUgdG9wIG9mIHRoZSBsaXN0XG4gICAgY29tbWVudHNDb250YWluZXIuaW5zZXJ0QmVmb3JlKG5ld0NvbW1lbnQsIGNvbW1lbnRzQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIC8vIFVwZGF0ZSBjb21tZW50IGNvdW50XG4gICAgdXBkYXRlQ29tbWVudENvdW50KHBvc3RJZCk7XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgY29tbWVudCBjb3VudCBmb3IgYSBwb3N0XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUNvbW1lbnRDb3VudChwb3N0SWQpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgY291bnRTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgYnV0dG9uW2RhdGEtcG9zdC1pZD1cIiR7cG9zdElkfVwiXSAuY29tbWVudHMtY291bnRgKTtcbiAgICBpZiAoY291bnRTcGFuKSB7XG4gICAgICAgIGxldCBjb3VudCA9IHBhcnNlSW50KCgoX2EgPSBjb3VudFNwYW4udGV4dENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXBsYWNlKC9bKCldL2csICcnKSkgfHwgJzAnKSArIDE7XG4gICAgICAgIGNvdW50U3Bhbi50ZXh0Q29udGVudCA9IGAoJHtjb3VudH0pYDtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIERhcmsgbW9kZSBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVEYXJrTW9kZSA9IGluaXRpYWxpemVEYXJrTW9kZTtcbmV4cG9ydHMuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UgPSBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZTtcbi8qKlxuICogSW5pdGlhbGl6ZSBkYXJrIG1vZGUgdG9nZ2xlXG4gKiBUaGlzIGNyZWF0ZXMgYSBmbG9hdGluZyBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvbiBhbmQgYWRkcyBpdCB0byB0aGUgRE9NXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVEYXJrTW9kZSgpIHtcbiAgICAvLyBDcmVhdGUgZGFyayBtb2RlIHRvZ2dsZSBidXR0b25cbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmNsYXNzTmFtZSA9ICdkYXJrLW1vZGUtdG9nZ2xlJztcbiAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nOyAvLyBNb29uIGljb25cbiAgICBkYXJrTW9kZVRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVG9nZ2xlIERhcmsgTW9kZScpO1xuICAgIC8vIENoZWNrIGlmIGRhcmsgbW9kZSBwcmVmZXJlbmNlIGlzIGFscmVhZHkgc2V0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09ICd0cnVlJztcbiAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uIGZvciBsaWdodCBtb2RlXG4gICAgfVxuICAgIC8vIEFkZCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgIGRhcmtNb2RlVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRGFya01vZGUpO1xuICAgIC8vIEFkZCBidXR0b24gdG8gdGhlIERPTVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGFya01vZGVUb2dnbGUpO1xufVxuLyoqXG4gKiBUb2dnbGUgZGFyayBtb2RlIG9uIGFuZCBvZmZcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlRGFya01vZGUoKSB7XG4gICAgY29uc3QgaXNEYXJrTW9kZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyay1tb2RlJyk7XG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1tb2RlLXRvZ2dsZScpO1xuICAgIC8vIFVwZGF0ZSBpY29uIGJhc2VkIG9uIG1vZGVcbiAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgaWYgKGlzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvbiBmb3IgZGFyayBtb2RlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU2F2ZSBwcmVmZXJlbmNlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCBpc0RhcmtNb2RlLnRvU3RyaW5nKCkpO1xufVxuLyoqXG4gKiBDaGVjayBpZiB1c2VyIGhhcyBzeXN0ZW0gZGFyayBtb2RlIHByZWZlcmVuY2VcbiAqIElmIHRoZXkgZG8gYW5kIHdlIGhhdmVuJ3Qgc2V0IGEgcHJlZmVyZW5jZSB5ZXQsIGFwcGx5IGRhcmsgbW9kZVxuICovXG5mdW5jdGlvbiBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSgpIHtcbiAgICAvLyBPbmx5IGNoZWNrIGlmIHVzZXIgaGFzbid0IGV4cGxpY2l0bHkgc2V0IGEgcHJlZmVyZW5jZVxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwcmVmZXJzRGFya01vZGUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgICAgIGlmIChwcmVmZXJzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgICAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgICAgICAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvY29tcG9uZW50cy9oZWFkZXIudHNcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVuZGVySGVhZGVyID0gcmVuZGVySGVhZGVyO1xuLyoqXG4gKiBIZWFkZXIgQ29tcG9uZW50XG4gKiBSZW5kZXJzIHRoZSBoZWFkZXIgc2VjdGlvbiBpbnRvIGEgdGFyZ2V0IGNvbnRhaW5lci5cbiAqIEV2ZW50IGxpc3RlbmVycyBzaG91bGQgYmUgYXR0YWNoZWQgc2VwYXJhdGVseSBhZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24uXG4gKiBAcGFyYW0gY29udGFpbmVySWQgLSBUaGUgSUQgb2YgdGhlIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBoZWFkZXIgaW50by4gRGVmYXVsdHMgdG8gJ2hlYWRlci1wbGFjZWhvbGRlcicuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckhlYWRlcihjb250YWluZXJJZCA9ICdoZWFkZXItcGxhY2Vob2xkZXInKSB7XG4gICAgLy8gRW5zdXJlIHJ1bm5pbmcgaW4gYSBicm93c2VyIGVudmlyb25tZW50XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXJJZCk7XG4gICAgaWYgKCFoZWFkZXJDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyAtLS0gRGV0ZXJtaW5lIEJhc2UgUGF0aCBiYXNlZCBvbiBFbnZpcm9ubWVudCAtLS1cbiAgICAvLyBDaGVja3MgaWYgcnVubmluZyBvbiB0aGUgcHJvZHVjdGlvbiBjdXN0b20gZG9tYWluIHJvb3Qgb3IgZ2l0aHViLmlvXG4gICAgLy8gQWRqdXN0ICdub2VsdWd3b2tlLmNvbScgaWYgeW91ciBhY3R1YWwgcHJvZHVjdGlvbiBob3N0bmFtZSBkaWZmZXJzXG4gICAgY29uc3QgaXNQcm9kdWN0aW9uID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbm9lbHVnd29rZS5jb20nIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5lbmRzV2l0aCgnLmdpdGh1Yi5pbycpO1xuICAgIC8vIERlZmluZSB0aGUgYmFzZSBwYXRoIGZvciBsaW5rcy4gQXNzdW1lcyBkZXBsb3ltZW50IGlzIHVuZGVyIC9ibG9nLyBvbiBwcm9kdWN0aW9uLlxuICAgIC8vICoqKiBJTVBPUlRBTlQ6IENoYW5nZSAnL2Jsb2cvJyBpZiB5b3VyIEdpdEh1YiByZXBvIG5hbWUgKGFuZCB0aHVzIHN1YmRpcmVjdG9yeSkgaXMgZGlmZmVyZW50ICoqKlxuICAgIGNvbnN0IGJhc2VQYXRoID0gaXNQcm9kdWN0aW9uID8gJy9ibG9nLycgOiAnLyc7XG4gICAgLy8gLS0tIEVuZCBCYXNlIFBhdGggTG9naWMgLS0tXG4gICAgLy8gRGVmaW5lIHRoZSBoZWFkZXIgSFRNTCBzdHJ1Y3R1cmUgdXNpbmcgdGhlIGJhc2VQYXRoIGZvciBsaW5rc1xuICAgIGhlYWRlckNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJzaXRlLWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPjxhIGhyZWY9XCIke2Jhc2VQYXRofVwiPkJsb2c8L2E+PC9oMT4gXG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIke2Jhc2VQYXRofVwiPkhvbWU8L2E+PC9saT4gXG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiJHtiYXNlUGF0aH0jYWJvdXRcIiBpZD1cImFib3V0LWJ0blwiPkFib3V0PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiaHR0cHM6Ly9ub2VsdWd3b2tlLmNvbS9cIj5Qb3J0Zm9saW88L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3IgYXJ0aWNsZXMuLi5cIiBjbGFzcz1cInNlYXJjaC1iYXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiaGFtYnVyZ2VyLWJ0blwiIGNsYXNzPVwibW9iaWxlLW5hdi10b2dnbGVcIiBhcmlhLWxhYmVsPVwiT3BlbiBOYXZpZ2F0aW9uIE1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtYmFyc1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICBgO1xuICAgIC8vIEV2ZW50IGxpc3RlbmVycyBzaG91bGQgYmUgY2FsbGVkICphZnRlciogcmVuZGVySGVhZGVyIGlzIGV4ZWN1dGVkLlxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVNb2JpbGVOYXYgPSBpbml0aWFsaXplTW9iaWxlTmF2O1xuZnVuY3Rpb24gaW5pdGlhbGl6ZU1vYmlsZU5hdigpIHtcbiAgICBjb25zdCBoYW1idXJnZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGFtYnVyZ2VyLWJ0bicpOyAvLyBFbnN1cmUgdGhpcyBJRCBtYXRjaGVzIHRoZSBidXR0b24gaW4gaGVhZGVyLmpzXG4gICAgY29uc3QgY2xvc2VEcmF3ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtZHJhd2VyLWJ0bicpO1xuICAgIGNvbnN0IGRyYXdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2JpbGUtbmF2LWRyYXdlcicpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJhd2VyLW92ZXJsYXknKTtcbiAgICBjb25zdCBtb2JpbGVOYXZDb250YWluZXIgPSBkcmF3ZXIgPT09IG51bGwgfHwgZHJhd2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkcmF3ZXIucXVlcnlTZWxlY3RvcignLm1vYmlsZS1uYXYnKTtcbiAgICBjb25zdCBkZXNrdG9wTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtaGVhZGVyIG5hdiB1bCcpOyAvLyBHZXQgdGhlIGRlc2t0b3AgbmF2IGxpc3RcbiAgICBpZiAoIWhhbWJ1cmdlckJ0biB8fCAhY2xvc2VEcmF3ZXJCdG4gfHwgIWRyYXdlciB8fCAhb3ZlcmxheSB8fCAhbW9iaWxlTmF2Q29udGFpbmVyIHx8ICFkZXNrdG9wTmF2KSB7XG4gICAgICAgIGNvbnNvbGUud2FybignTW9iaWxlIG5hdmlnYXRpb24gZWxlbWVudHMgbm90IGZvdW5kLiBTa2lwcGluZyBpbml0aWFsaXphdGlvbi4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyAtLS0gQ2xvbmUgRGVza3RvcCBOYXYgTGlua3MgdG8gTW9iaWxlIERyYXdlciAtLS1cbiAgICBjb25zdCBjbG9uZU5hdkxpbmtzID0gKCkgPT4ge1xuICAgICAgICBtb2JpbGVOYXZDb250YWluZXIuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIGV4aXN0aW5nIGxpbmtzXG4gICAgICAgIGNvbnN0IGRlc2t0b3BMaW5rcyA9IGRlc2t0b3BOYXYucXVlcnlTZWxlY3RvckFsbCgnbGkgYScpO1xuICAgICAgICBkZXNrdG9wTGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZExpbmsgPSBsaW5rLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsOiBBZGQgc3BlY2lmaWMgY2xhc3NlcyBvciBtb2RpZnkgYXR0cmlidXRlcyBmb3IgbW9iaWxlIGlmIG5lZWRlZFxuICAgICAgICAgICAgbW9iaWxlTmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZExpbmspO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIC0tLSBFdmVudCBMaXN0ZW5lcnMgLS0tXG4gICAgY29uc3Qgb3BlbkRyYXdlciA9ICgpID0+IHtcbiAgICAgICAgZHJhd2VyLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJzsgLy8gUHJldmVudCBiYWNrZ3JvdW5kIHNjcm9sbGluZ1xuICAgIH07XG4gICAgY29uc3QgY2xvc2VEcmF3ZXIgPSAoKSA9PiB7XG4gICAgICAgIGRyYXdlci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7IC8vIFJlc3RvcmUgc2Nyb2xsaW5nXG4gICAgfTtcbiAgICBoYW1idXJnZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50IHRyaWdnZXJpbmcgb3ZlcmxheSBjbGlja1xuICAgICAgICBvcGVuRHJhd2VyKCk7XG4gICAgfSk7XG4gICAgY2xvc2VEcmF3ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZURyYXdlcik7XG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlRHJhd2VyKTtcbiAgICAvLyBDbG9zZSBkcmF3ZXIgd2hlbiBhIGxpbmsgaW5zaWRlIGl0IGlzIGNsaWNrZWRcbiAgICBtb2JpbGVOYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgICAgICBjbG9zZURyYXdlcigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gLS0tIEluaXRpYWxpemF0aW9uIC0tLVxuICAgIGNsb25lTmF2TGlua3MoKTsgLy8gSW5pdGlhbCBwb3B1bGF0aW9uXG4gICAgLy8gT3B0aW9uYWw6IFJlLWNsb25lIGlmIGRlc2t0b3AgbmF2IG1pZ2h0IGNoYW5nZSBkeW5hbWljYWxseSAoZS5nLiwgbG9naW4vbG9nb3V0KVxuICAgIC8vIFlvdSBtaWdodCBuZWVkIGEgbW9yZSByb2J1c3Qgd2F5IHRvIGhhbmRsZSBkeW5hbWljIHVwZGF0ZXMgaWYgcmVxdWlyZWQuXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogTmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZU5hdmlnYXRpb24gPSBpbml0aWFsaXplTmF2aWdhdGlvbjtcbi8qKlxuICogSW5pdGlhbGl6ZSBuYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZU5hdmlnYXRpb24oKSB7XG4gICAgc2V0QWN0aXZlTmF2TGluaygpO1xuICAgIHNldHVwTmF2TGlua3MoKTtcbn1cbi8qKlxuICogU2V0IGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmsgYmFzZWQgb24gY3VycmVudCBVUkwgb3IgcGFnZSBzZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIHNldEFjdGl2ZU5hdkxpbmsoKSB7XG4gICAgY29uc3QgY3VycmVudFBhdGggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoY3VycmVudFBhdGgpO1xufVxuLyoqXG4gKiBTZXR1cCBjbGljayBoYW5kbGVycyBmb3IgbmF2aWdhdGlvbiBsaW5rc1xuICovXG5mdW5jdGlvbiBzZXR1cE5hdkxpbmtzKCkge1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgaWYgKGhyZWYpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKGhyZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBIYW5kbGUgc3BlY2lhbCBjYXNlcyBmb3IgcG9wdXAgbGlua3NcbiAgICBjb25zdCBhYm91dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1idG4nKTtcbiAgICBpZiAoYWJvdXRCdG4pIHtcbiAgICAgICAgYWJvdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKCcjYWJvdXQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBVcGRhdGUgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmtcbiAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIG9yIHNlY3Rpb24gSUQgdG8gYWN0aXZhdGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQWN0aXZlTmF2TGluayhwYXRoKSB7XG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gbWF0Y2hpbmcgbGlua1xuICAgIGNvbnN0IGFjdGl2ZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXIgbmF2IHVsIGxpIGFbaHJlZj1cIiR7cGF0aH1cIl1gKTtcbiAgICBpZiAoYWN0aXZlTGluaykge1xuICAgICAgICBhY3RpdmVMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplUGFnaW5hdGlvbiA9IGluaXRpYWxpemVQYWdpbmF0aW9uO1xuLy8gUGFnaW5hdGlvbiBmdW5jdGlvbmFsaXR5XG5jb25zdCBjb21tZW50c18xID0gcmVxdWlyZShcIi4vY29tbWVudHNcIik7XG4vKipcbiAqIEluaXRpYWxpemUgcGFnaW5hdGlvbiBmdW5jdGlvbmFsaXR5IHdpdGggTG9hZCBNb3JlIGJ1dHRvblxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUGFnaW5hdGlvbigpIHtcbiAgICBjb25zdCBsb2FkTW9yZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLW1vcmUtYnRuJyk7XG4gICAgY29uc3QgaGlkZGVuUG9zdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLXBvc3RzJyk7XG4gICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZHMnKTtcbiAgICBpZiAoIWxvYWRNb3JlQnRuIHx8ICFoaWRkZW5Qb3N0cyB8fCAhYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUGFnaW5hdGlvbiBlbGVtZW50cyBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBjdXJyZW50UGFnZSA9IDE7XG4gICAgY29uc3QgcG9zdHNQZXJQYWdlID0gMztcbiAgICBjb25zdCB0b3RhbEhpZGRlblBvc3RzID0gaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIC8vIEhpZGUgbG9hZCBtb3JlIGJ1dHRvbiBpZiBubyBoaWRkZW4gcG9zdHNcbiAgICBpZiAodG90YWxIaWRkZW5Qb3N0cyA9PT0gMCkge1xuICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgICAvLyBTZXQgdXAgbG9hZCBtb3JlIGJ1dHRvbiBjbGljayBoYW5kbGVyXG4gICAgbG9hZE1vcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxvYWRNb3JlUG9zdHMobG9hZE1vcmVCdG4sIGhpZGRlblBvc3RzLCBibG9nQ2FyZHNDb250YWluZXIsIGN1cnJlbnRQYWdlLCBwb3N0c1BlclBhZ2UpO1xuICAgICAgICBjdXJyZW50UGFnZSsrO1xuICAgIH0pO1xuICAgIC8vIEluaXRpYWxpemUgc2Nyb2xsLWJhc2VkIGxvYWRpbmcgKGluZmluaXRlIHNjcm9sbClcbiAgICBpbml0aWFsaXplSW5maW5pdGVTY3JvbGwobG9hZE1vcmVCdG4pO1xufVxuLyoqXG4gKiBMb2FkIG1vcmUgcG9zdHMgd2hlbiB0aGUgbG9hZCBtb3JlIGJ1dHRvbiBpcyBjbGlja2VkXG4gKi9cbmZ1bmN0aW9uIGxvYWRNb3JlUG9zdHMobG9hZE1vcmVCdG4sIGhpZGRlblBvc3RzLCBibG9nQ2FyZHNDb250YWluZXIsIGN1cnJlbnRQYWdlLCBwb3N0c1BlclBhZ2UpIHtcbiAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJyk7XG4gICAgbG9hZE1vcmVCdG4uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic3Bpbm5lclwiPjwvc3Bhbj4gTG9hZGluZy4uLic7XG4gICAgLy8gU2ltdWxhdGUgbG9hZGluZyBkZWxheSBmb3IgYmV0dGVyIFVYXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBwb3N0cyB0byBsb2FkXG4gICAgICAgIGNvbnN0IHN0YXJ0SWR4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiBwb3N0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IGVuZElkeCA9IE1hdGgubWluKHN0YXJ0SWR4ICsgcG9zdHNQZXJQYWdlLCBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGgpO1xuICAgICAgICBsZXQgcG9zdHNMb2FkZWQgPSAwO1xuICAgICAgICAvLyBDbG9uZSBhbmQgbW92ZSBwb3N0cyBmcm9tIGhpZGRlbiBjb250YWluZXIgdG8gdmlzaWJsZSBibG9nIGNhcmRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zdHNQZXJQYWdlICYmIGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCA+IDA7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zdFRvQWRkID0gaGlkZGVuUG9zdHMuY2hpbGRyZW5bMF07IC8vIEFsd2F5cyB0YWtlIHRoZSBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgICBpZiAocG9zdFRvQWRkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmVkUG9zdCA9IHBvc3RUb0FkZC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgY2xvbmVkUG9zdC5jbGFzc0xpc3QuYWRkKCduZXcnKTsgLy8gQWRkIGNsYXNzIGZvciBhbmltYXRpb25cbiAgICAgICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkUG9zdCk7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHMucmVtb3ZlQ2hpbGQocG9zdFRvQWRkKTtcbiAgICAgICAgICAgICAgICBwb3N0c0xvYWRlZCsrO1xuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIG5ldyBwb3N0c1xuICAgICAgICAgICAgICAgICgwLCBjb21tZW50c18xLmluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkpKGNsb25lZFBvc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIGlmIHdlJ3ZlIGxvYWRlZCBhbGwgcG9zdHNcbiAgICAgICAgaWYgKGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXNldCBidXR0b24gc3RhdGVcbiAgICAgICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAgICAgICBsb2FkTW9yZUJ0bi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT4gTG9hZCBNb3JlIFBvc3RzJztcbiAgICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50IHdoZW4gcG9zdHMgYXJlIGxvYWRlZFxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgncG9zdHNMb2FkZWQnLCB7IGRldGFpbDogeyBjb3VudDogcG9zdHNMb2FkZWQgfSB9KTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSwgODAwKTsgLy8gU2ltdWxhdGUgbmV0d29yayBkZWxheVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGluZmluaXRlIHNjcm9sbCBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVJbmZpbml0ZVNjcm9sbChsb2FkTW9yZUJ0bikge1xuICAgIGxldCBzY3JvbGxUaW1lb3V0O1xuICAgIGxldCBpc0xvYWRpbmdNb3JlUG9zdHMgPSBmYWxzZTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAvLyBJZiB0aGUgYnV0dG9uIGlzIGhpZGRlbiAoYWxsIHBvc3RzIGxvYWRlZCkgb3IgYWxyZWFkeSBpbiBsb2FkaW5nIHN0YXRlLCBkbyBub3RoaW5nXG4gICAgICAgIGlmIChsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHxcbiAgICAgICAgICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5jb250YWlucygnbG9hZGluZycpIHx8XG4gICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVvdXQoc2Nyb2xsVGltZW91dCk7XG4gICAgICAgIHNjcm9sbFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0LCBjbGllbnRIZWlnaHQgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIC8vIFdoZW4gdXNlciBzY3JvbGxzIHRvIGJvdHRvbSAod2l0aCBzb21lIGJ1ZmZlcilcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gMjAwKSB7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nTW9yZVBvc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJ0bi5jbGljaygpO1xuICAgICAgICAgICAgICAgIC8vIFJlc2V0IGZsYWcgYWZ0ZXIgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2NvbXBvbmVudHMvc2VhcmNoLnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVTZWFyY2ggPSBpbml0aWFsaXplU2VhcmNoO1xuLy8gTm90ZTogZmV0Y2hCbG9nUG9zdHMgYW5kIGNyZWF0ZUJsb2dDYXJkRWxlbWVudCBpbXBvcnRzIG1pZ2h0IG5vdCBiZSBuZWVkZWQgXG4vLyBpZiB0aGlzIHNjcmlwdCBvbmx5IGZpbHRlcnMgYWxyZWFkeSByZW5kZXJlZCBjYXJkcy4gUmVtb3ZlZCB0aGVtIGZvciBub3cuXG4vLyBpbXBvcnQgeyBmZXRjaEJsb2dQb3N0cyB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaSc7IFxuLy8gaW1wb3J0IHsgY3JlYXRlQmxvZ0NhcmRFbGVtZW50IH0gZnJvbSAnLi9ibG9nQ2FyZHMnO1xuLyoqXG4gKiBJbml0aWFsaXplcyBhIHNpbXBsZSwgY2xpZW50LXNpZGUgc2VhcmNoIGZ1bmN0aW9uYWxpdHkgZm9yIGJsb2cgcG9zdHMuXG4gKiBGaWx0ZXJzIGN1cnJlbnRseSB2aXNpYmxlIGJsb2cgY2FyZHMgb24gdGhlIHBhZ2UgYXMgdGhlIHVzZXIgdHlwZXMuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVTZWFyY2goKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmFyJyk7XG4gICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cuYmxvZy1jYXJkcycpOyAvLyBUYXJnZXQgdGhlIG1haW4gY29udGFpbmVyXG4gICAgaWYgKCFzZWFyY2hCYXIgfHwgIWJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1NlYXJjaCBiYXIgKC5zZWFyY2gtYmFyKSBvciBibG9nIGNhcmRzIGNvbnRhaW5lciAoI2Jsb2cuYmxvZy1jYXJkcykgbm90IGZvdW5kLiBTZWFyY2ggbm90IGluaXRpYWxpemVkLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENyZWF0ZSBhIHNlYXJjaCBpbmRpY2F0b3IgZWxlbWVudCAob3B0aW9uYWwpXG4gICAgY29uc3Qgc2VhcmNoSW5kaWNhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VhcmNoSW5kaWNhdG9yLmNsYXNzTmFtZSA9ICdzZWFyY2gtaW5kaWNhdG9yJzsgLy8gQWRkIGNsYXNzIGZvciBzdHlsaW5nXG4gICAgc2VhcmNoSW5kaWNhdG9yLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpOyAvLyBBbm5vdW5jZSBjaGFuZ2VzIHRvIHNjcmVlbiByZWFkZXJzXG4gICAgc2VhcmNoSW5kaWNhdG9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IC8vIFN0YXJ0IGhpZGRlblxuICAgIC8vIEluc2VydCB0aGUgaW5kaWNhdG9yIGJlZm9yZSB0aGUgYmxvZyBjYXJkcyBjb250YWluZXJcbiAgICAoX2EgPSBibG9nQ2FyZHNDb250YWluZXIucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmluc2VydEJlZm9yZShzZWFyY2hJbmRpY2F0b3IsIGJsb2dDYXJkc0NvbnRhaW5lcik7XG4gICAgLy8gT3B0aW9uYWw6IFdyYXAgc2VhcmNoIGJhciBmb3Igc3R5bGluZyBvciBhZGRpbmcgY2xlYXIgYnV0dG9uIChpZiBub3QgYWxyZWFkeSBkb25lKVxuICAgIC8vIFRoaXMgZXhhbXBsZSBhc3N1bWVzIHRoZSBzZWFyY2ggYmFyIGlzIGFscmVhZHkgcGxhY2VkIGNvcnJlY3RseSBpbiB0aGUgaGVhZGVyIEhUTUxcbiAgICAvLyBLZWVwIHRyYWNrIG9mIGFsbCBibG9nIGNhcmRzIC0gd2lsbCBiZSBwb3B1bGF0ZWQgb24gZmlyc3QgZmlsdGVyXG4gICAgbGV0IGFsbENhcmRzID0gW107XG4gICAgLy8gSGFuZGxlIHNlYXJjaCBpbnB1dCB3aXRoIGRlYm91bmNlXG4gICAgbGV0IGRlYm91bmNlVGltZXI7XG4gICAgc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gc2VhcmNoQmFyLnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAvLyBEZWJvdW5jZSB0aGUgZmlsdGVyaW5nXG4gICAgICAgIGNsZWFyVGltZW91dChkZWJvdW5jZVRpbWVyKTtcbiAgICAgICAgZGVib3VuY2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZmlsdGVyQmxvZ0NhcmRzKHNlYXJjaFRlcm0pO1xuICAgICAgICB9LCAzMDApOyAvLyAzMDBtcyBkZWxheVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEZpbHRlcnMgYmxvZyBjYXJkcyBiYXNlZCBvbiBzZWFyY2ggdGVybSBieSBhZGRpbmcvcmVtb3ZpbmcgYSBDU1MgY2xhc3MuXG4gICAgICogQHBhcmFtIHRlcm0gLSBUaGUgc2VhcmNoIHRlcm0gKGxvd2VyY2FzZSkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmlsdGVyQmxvZ0NhcmRzKHRlcm0pIHtcbiAgICAgICAgLy8gR2V0IGFsbCBjYXJkcyBjdXJyZW50bHkgaW4gdGhlIG1haW4gY29udGFpbmVyIE9SIGhpZGRlbiBjb250YWluZXIgaWYgdGhleSBleGlzdFxuICAgICAgICAvLyBUaGlzIGVuc3VyZXMgd2UgZmlsdGVyIGV2ZXJ5dGhpbmcsIGV2ZW4gcGFnaW5hdGVkIGl0ZW1zIGlmIHRoZXkgYXJlIGluIHRoZSBET01cbiAgICAgICAgLy8gSWYgcGFnaW5hdGlvbiByZW1vdmVzIGl0ZW1zIGZyb20gRE9NLCB0aGlzIG5lZWRzIGFkanVzdG1lbnQuXG4gICAgICAgIGlmIChhbGxDYXJkcy5sZW5ndGggPT09IDApIHsgLy8gUG9wdWxhdGUgb24gZmlyc3QgcnVuIG9yIGlmIGNsZWFyZWRcbiAgICAgICAgICAgIGFsbENhcmRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYmxvZy5ibG9nLWNhcmRzIC5ibG9nLWNhcmQsICNoaWRkZW4tcG9zdHMgLmJsb2ctY2FyZCcpKTtcbiAgICAgICAgICAgIGlmIChhbGxDYXJkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGJsb2cgY2FyZHMgZm91bmQgdG8gZmlsdGVyLlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIE5vIGNhcmRzIHJlbmRlcmVkIHlldFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coYFNlYXJjaCBmaWx0ZXJpbmcgaW5pdGlhbGl6ZWQgd2l0aCAke2FsbENhcmRzLmxlbmd0aH0gY2FyZHMuYCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZpc2libGVDb3VudCA9IDA7XG4gICAgICAgIGFsbENhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgbGV0IG1hdGNoZXNTZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICghdGVybSkge1xuICAgICAgICAgICAgICAgIC8vIElmIG5vIHNlYXJjaCB0ZXJtLCBzaG93IGFsbCBjYXJkc1xuICAgICAgICAgICAgICAgIG1hdGNoZXNTZWFyY2ggPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRleHQgY29udGVudCBmcm9tIGltcG9ydGFudCBlbGVtZW50cyB3aXRoaW4gdGhlIGNhcmRcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9ICgoX2IgPSAoX2EgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ2gzJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCkpIHx8ICcnO1xuICAgICAgICAgICAgICAgIC8vIEFkZCBvdGhlciBzZWFyY2hhYmxlIGZpZWxkcyBpZiBuZWVkZWQgKGUuZy4sIGV4Y2VycHQsIGF1dGhvcilcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBleGNlcnB0ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkLWV4Y2VycHQnKT8udGV4dENvbnRlbnQ/LnRvTG93ZXJDYXNlKCkgfHwgJyc7IFxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBBcnJheS5mcm9tKGNhcmQucXVlcnlTZWxlY3RvckFsbCgnLnRhZy1iYWRnZScpKSAvLyBBc3N1bWVzIHRhZ3MgYXJlIHJlbmRlcmVkXG4gICAgICAgICAgICAgICAgICAgIC5tYXAodGFnID0+IHsgdmFyIF9hOyByZXR1cm4gKChfYSA9IHRhZy50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvTG93ZXJDYXNlKCkpIHx8ICcnOyB9KTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgY2FyZCBtYXRjaGVzIHRoZSBzZWFyY2ggdGVybVxuICAgICAgICAgICAgICAgIG1hdGNoZXNTZWFyY2ggPVxuICAgICAgICAgICAgICAgICAgICB0aXRsZS5pbmNsdWRlcyh0ZXJtKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhjZXJwdC5pbmNsdWRlcyh0ZXJtKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3Muc29tZSh0YWcgPT4gdGFnLmluY2x1ZGVzKHRlcm0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNob3cgb3IgaGlkZSB0aGUgY2FyZCB1c2luZyBDU1MgY2xhc3NcbiAgICAgICAgICAgIGlmIChtYXRjaGVzU2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4tYnktc2VhcmNoJyk7XG4gICAgICAgICAgICAgICAgdmlzaWJsZUNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi1ieS1zZWFyY2gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFNob3cvSGlkZS9VcGRhdGUgdGhlIHNlYXJjaCBpbmRpY2F0b3IgdGV4dFxuICAgICAgICBpZiAodGVybSkge1xuICAgICAgICAgICAgc2VhcmNoSW5kaWNhdG9yLnRleHRDb250ZW50ID0gdmlzaWJsZUNvdW50ID4gMFxuICAgICAgICAgICAgICAgID8gYFNob3dpbmcgJHt2aXNpYmxlQ291bnR9IHJlc3VsdCR7dmlzaWJsZUNvdW50ID4gMSA/ICdzJyA6ICcnfSBmb3IgXCIke3Rlcm19XCJgXG4gICAgICAgICAgICAgICAgOiBgTm8gcmVzdWx0cyBmb3VuZCBmb3IgXCIke3Rlcm19XCJgO1xuICAgICAgICAgICAgc2VhcmNoSW5kaWNhdG9yLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VhcmNoSW5kaWNhdG9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IC8vIEhpZGUgaW5kaWNhdG9yIGlmIHNlYXJjaCBpcyBjbGVhcmVkXG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIFwiTm8gcmVzdWx0c1wiIG1lc3NhZ2Ugc3BlY2lmaWNhbGx5IHdpdGhpbiB0aGUgY29udGFpbmVyXG4gICAgICAgIGNvbnN0IG5vUmVzdWx0c01lc3NhZ2UgPSBibG9nQ2FyZHNDb250YWluZXIgPT09IG51bGwgfHwgYmxvZ0NhcmRzQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBibG9nQ2FyZHNDb250YWluZXIucXVlcnlTZWxlY3RvcignLm5vLXNlYXJjaC1yZXN1bHRzLW1lc3NhZ2UnKTtcbiAgICAgICAgaWYgKHZpc2libGVDb3VudCA9PT0gMCAmJiB0ZXJtKSB7XG4gICAgICAgICAgICBpZiAoIW5vUmVzdWx0c01lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5jbGFzc05hbWUgPSAnZW1wdHktc3RhdGUgbm8tc2VhcmNoLXJlc3VsdHMtbWVzc2FnZSc7IC8vIFVzZSBleGlzdGluZyBlbXB0eS1zdGF0ZSBzdHlsaW5nXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXNlYXJjaCBmYS0zeFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPGgzPk5vIG1hdGNoaW5nIHBvc3RzIGZvdW5kPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHA+VHJ5IGRpZmZlcmVudCBrZXl3b3Jkcy48L3A+IFxuICAgICAgICAgICAgICAgIGA7IC8vIFJlbW92ZWQgY2xlYXIgYnV0dG9uIGhlcmUsIEVzY2FwZSBrZXkgd29ya3NcbiAgICAgICAgICAgICAgICAvLyBpZiAoYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9SZXN1bHRzTWVzc2FnZSkge1xuICAgICAgICAgICAgbm9SZXN1bHRzTWVzc2FnZS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPcHRpb25hbDogRGlzcGF0Y2ggZXZlbnQgZm9yIHBhZ2luYXRpb24gdG8gcG90ZW50aWFsbHkgcmVzZXQvdXBkYXRlXG4gICAgICAgIC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZWFyY2hBcHBsaWVkJywgeyBkZXRhaWw6IHsgdmlzaWJsZUNvdW50IH0gfSkpO1xuICAgIH1cbiAgICAvLyBBZGQga2V5Ym9hcmQgbmF2aWdhdGlvbiAoRXNjYXBlIGtleSB0byBjbGVhcilcbiAgICBzZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgc2VhcmNoQmFyLnZhbHVlID0gJyc7IC8vIENsZWFyIGlucHV0XG4gICAgICAgICAgICBmaWx0ZXJCbG9nQ2FyZHMoJycpOyAvLyBSZS1maWx0ZXIgd2l0aCBlbXB0eSB0ZXJtXG4gICAgICAgICAgICBzZWFyY2hCYXIuYmx1cigpOyAvLyBSZW1vdmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCA9IGluaXRpYWxpemVCbG9nRnJvbnRlbmQ7XG4vKipcbiAqIEJsb2cgRnJvbnRlbmQgQ29udHJvbGxlclxuICogQ2xpZW50LXNpZGUgY29udHJvbGxlciB0aGF0IGhhbmRsZXMgYWxsIGZyb250ZW5kIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBibG9nIGhvbWVwYWdlLlxuICogTWFuYWdlcyBVSSBpbml0aWFsaXphdGlvbiwgcG9zdCByZW5kZXJpbmcsIGZpbHRlcmluZywgYW5kIHVzZXIgaW50ZXJhY3Rpb25zLlxuICovXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7IC8vIFVzZXMgc3RhdGljIGZldGNoIG5vd1xuY29uc3QgYmxvZ0NhcmRzXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9ibG9nQ2FyZHNcIik7XG5jb25zdCBwYWdpbmF0aW9uXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9wYWdpbmF0aW9uXCIpO1xuY29uc3QgYWJvdXRfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Fib3V0XCIpO1xuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2aWdhdGlvblwiKTtcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgYmxvZyBmcm9udGVuZCBmdW5jdGlvbmFsaXR5IChob21lcGFnZSlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAoMCwgbmF2aWdhdGlvbl8xLmluaXRpYWxpemVOYXZpZ2F0aW9uKSgpO1xuICAgICAgICAoMCwgYWJvdXRfMS5pbml0aWFsaXplQWJvdXQpKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgcG9zdHMsIHdoaWNoIG5vdyBpbmNsdWRlcyBmaWx0ZXJpbmcgYmFzZWQgb24gVVJMIHBhcmFtc1xuICAgICAgICB5aWVsZCBpbml0aWFsaXplUG9zdHMoKTtcbiAgICAgICAgKDAsIHBhZ2luYXRpb25fMS5pbml0aWFsaXplUGFnaW5hdGlvbikoKTsgLy8gSW5pdGlhbGl6ZSBwYWdpbmF0aW9uIGFmdGVyIGluaXRpYWwgcG9zdHMgKHBvc3NpYmx5IGZpbHRlcmVkKSBhcmUgbG9hZGVkXG4gICAgICAgIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpO1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIGN1c3RvbSBldmVudCB0byByZWxvYWQgcG9zdHMgKGUuZy4sIGFmdGVyIHNlYXJjaCBvciBmaWx0ZXIgY2hhbmdlKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZWxvYWRQb3N0cycsIGhhbmRsZVJlbG9hZFBvc3RzKTtcbiAgICB9KTtcbn1cbi8qKlxuICogSGFuZGxlcyB0aGUgY3VzdG9tICdyZWxvYWRQb3N0cycgZXZlbnQuIFJlZmV0Y2hlcyBhbmQgcmUtcmVuZGVycyBwb3N0cy5cbiAqL1xuZnVuY3Rpb24gaGFuZGxlUmVsb2FkUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gUmUtaW5pdGlhbGl6ZSBwb3N0cywgd2hpY2ggd2lsbCBwaWNrIHVwIGFueSBuZXcgVVJMIHBhcmFtZXRlcnMgKGxpa2Ugc2VhcmNoIHF1ZXJ5IE9SIHRhZylcbiAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgICgwLCBwYWdpbmF0aW9uXzEuaW5pdGlhbGl6ZVBhZ2luYXRpb24pKCk7XG4gICAgICAgIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgZXZlbnQgZGVsZWdhdGlvbiBmb3IgYmxvZyBjYXJkcyBjb250YWluZXJcbiAqL1xuZnVuY3Rpb24gc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCkge1xuICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nLmJsb2ctY2FyZHMnKTtcbiAgICBpZiAoYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spOyAvLyBQcmV2ZW50IGR1cGxpY2F0ZXNcbiAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQmxvZ0NhcmRDbGljayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBmaW5kICNibG9nLmJsb2ctY2FyZHMgY29udGFpbmVyIGZvciBkZWxlZ2F0aW9uLicpO1xuICAgIH1cbn1cbi8qKlxuICogSGFuZGxlIGNsaWNrIGV2ZW50cyBvbiBibG9nIGNhcmRzIGZvciBuYXZpZ2F0aW9uXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUJsb2dDYXJkQ2xpY2soZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgY2FyZCA9IHRhcmdldC5jbG9zZXN0KCcuYmxvZy1jYXJkJyk7XG4gICAgaWYgKGNhcmQpIHtcbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCdidXR0b24sIGEsIGknKSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCdhLnRhZy1iYWRnZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IGNhcmQuZGF0YXNldC5wb3N0SWQ7XG4gICAgICAgIGlmIChwb3N0SWQpIHtcbiAgICAgICAgICAgIC8vIFVzZSByZWxhdGl2ZSBwYXRoIGZvciBuYXZpZ2F0aW9uXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBwb3N0Lmh0bWw/aWQ9JHtwb3N0SWR9YDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBibG9nIHBvc3RzOiBGZXRjaCwgZmlsdGVyIChiYXNlZCBvbiBVUkwgcGFyYW0pLCBhbmQgcmVuZGVyLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cuYmxvZy1jYXJkcycpO1xuICAgICAgICBpZiAoIWJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQmxvZyBjYXJkcyBjb250YWluZXIgKCNibG9nLmJsb2ctY2FyZHMpIG5vdCBmb3VuZCBpbiB0aGUgRE9NLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIC0tLSBDaGVjayBmb3IgVGFnIEZpbHRlciAtLS1cbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgY29uc3QgdGFnRmlsdGVyID0gdXJsUGFyYW1zLmdldCgndGFnJyk7XG4gICAgICAgIGNvbnN0IGZpbHRlckRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLWRpc3BsYXknKTsgLy8gT3B0aW9uYWwgZWxlbWVudCB0byBzaG93IGZpbHRlclxuICAgICAgICAvLyAtLS0gRGV0ZXJtaW5lIEJhc2UgUGF0aCAobmVlZGVkIGZvciBDbGVhciBGaWx0ZXIgbGluaykgLS0tXG4gICAgICAgIGNvbnN0IGN1cnJlbnRIb3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICAgICAgY29uc3QgaXNQcm9kdWN0aW9uID0gY3VycmVudEhvc3RuYW1lID09PSAnbm9lbHVnd29rZS5jb20nIHx8IGN1cnJlbnRIb3N0bmFtZS5lbmRzV2l0aCgnLmdpdGh1Yi5pbycpO1xuICAgICAgICAvLyAqKiogSU1QT1JUQU5UOiBDaGFuZ2UgJy9ibG9nLycgaWYgeW91ciBHaXRIdWIgcmVwbyBuYW1lL3BhdGggaXMgZGlmZmVyZW50ICoqKlxuICAgICAgICBjb25zdCBiYXNlUGF0aCA9IGlzUHJvZHVjdGlvbiA/ICcvYmxvZy8nIDogJy8nO1xuICAgICAgICAvLyBSZW1vdmUgYW55IGV4aXN0aW5nIGZpbHRlciBpbmRpY2F0b3IgYmVmb3JlIHBvdGVudGlhbGx5IGFkZGluZyBhIG5ldyBvbmVcbiAgICAgICAgY29uc3QgZXhpc3RpbmdGaWx0ZXJJbmRpY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFnLWZpbHRlci1pbmRpY2F0b3InKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nRmlsdGVySW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBleGlzdGluZ0ZpbHRlckluZGljYXRvci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgZmlsdGVyIGluZGljYXRvciBpZiB0YWdGaWx0ZXIgZXhpc3RzXG4gICAgICAgIGlmICh0YWdGaWx0ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZmlsdGVyQ29udGFpbmVyLmNsYXNzTmFtZSA9ICd0YWctZmlsdGVyLWluZGljYXRvcic7XG4gICAgICAgICAgICAvLyBVc2UgYmFzZVBhdGggZm9yIHRoZSBDbGVhciBmaWx0ZXIgbGluaydzIGhyZWZcbiAgICAgICAgICAgIGZpbHRlckNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8cD5TaG93aW5nIHBvc3RzIHRhZ2dlZCB3aXRoOiA8c3BhbiBjbGFzcz1cImZpbHRlcmVkLXRhZ1wiPiR7dGFnRmlsdGVyfTwvc3Bhbj48L3A+XG4gICAgICAgICAgICA8YSBocmVmPVwiJHtiYXNlUGF0aH1cIiBjbGFzcz1cImNsZWFyLWZpbHRlclwiPkNsZWFyIGZpbHRlcjwvYT4gXG4gICAgICAgIGA7XG4gICAgICAgICAgICBjb25zdCBibG9nU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdibG9nJyk7XG4gICAgICAgICAgICBpZiAoYmxvZ1NlY3Rpb24gPT09IG51bGwgfHwgYmxvZ1NlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJsb2dTZWN0aW9uLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBibG9nU2VjdGlvbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmaWx0ZXJDb250YWluZXIsIGJsb2dTZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWx0ZXJEaXNwbGF5KSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyRGlzcGxheS50ZXh0Q29udGVudCA9IGBTaG93aW5nIHBvc3RzIHRhZ2dlZCB3aXRoOiBcIiR7dGFnRmlsdGVyfVwiYDtcbiAgICAgICAgICAgICAgICBmaWx0ZXJEaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpbHRlckRpc3BsYXkpIHtcbiAgICAgICAgICAgIGZpbHRlckRpc3BsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICAvLyAtLS0gRW5kIENoZWNrIGZvciBUYWcgRmlsdGVyIC0tLVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+PHA+TG9hZGluZyBwb3N0cy4uLjwvcD4nO1xuICAgICAgICAgICAgbGV0IGFsbFBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgLy8gLS0tIEFwcGx5IFRhZyBGaWx0ZXIgLS0tXG4gICAgICAgICAgICBsZXQgcG9zdHNUb0Rpc3BsYXkgPSBhbGxQb3N0cztcbiAgICAgICAgICAgIGlmICh0YWdGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBwb3N0c1RvRGlzcGxheSA9IGFsbFBvc3RzLmZpbHRlcihwb3N0ID0+IHBvc3QudGFncyAmJiBwb3N0LnRhZ3Muc29tZSh0YWcgPT4gdGFnLnRvTG93ZXJDYXNlKCkgPT09IHRhZ0ZpbHRlci50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAtLS0gRW5kIEFwcGx5IFRhZyBGaWx0ZXIgLS0tXG4gICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBpZiAocG9zdHNUb0Rpc3BsYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2hvd0VtcHR5U3RhdGUoYmxvZ0NhcmRzQ29udGFpbmVyLCB0YWdGaWx0ZXIgIT09IG51bGwgJiYgdGFnRmlsdGVyICE9PSB2b2lkIDAgPyB0YWdGaWx0ZXIgOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICAgICAgICAgICAgICBpZiAobG9hZE1vcmVCdG4pXG4gICAgICAgICAgICAgICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUGFnaW5hdGlvbiBsb2dpY1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFBvc3RDb3VudCA9IDY7XG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5UG9zdHMgPSBwb3N0c1RvRGlzcGxheS5zbGljZSgwLCBpbml0aWFsUG9zdENvdW50KTtcbiAgICAgICAgICAgIGNvbnN0IGhpZGRlblBvc3RzID0gcG9zdHNUb0Rpc3BsYXkuc2xpY2UoaW5pdGlhbFBvc3RDb3VudCk7XG4gICAgICAgICAgICBkaXNwbGF5UG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9nQ2FyZCA9ICgwLCBibG9nQ2FyZHNfMS5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQpKHBvc3QpO1xuICAgICAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChibG9nQ2FyZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGhpZGRlblBvc3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbi1wb3N0cycpO1xuICAgICAgICAgICAgaWYgKGhpZGRlblBvc3RzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuUG9zdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvZ0NhcmQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgICAgICAgICAgaWYgKGxvYWRNb3JlQnRuKSB7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9IGhpZGRlblBvc3RzLmxlbmd0aCA+IDAgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW5pdGlhbGl6aW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvclN0YXRlKGJsb2dDYXJkc0NvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogU2hvdyBlbXB0eSBzdGF0ZSB3aGVuIG5vIHBvc3RzIGFyZSBhdmFpbGFibGVcbiAqL1xuZnVuY3Rpb24gc2hvd0VtcHR5U3RhdGUoY29udGFpbmVyLCB0YWdGaWx0ZXIpIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgY29uc3QgZW1wdHlTdGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVtcHR5U3RhdGVEaXYuY2xhc3NOYW1lID0gJ2VtcHR5LXN0YXRlJztcbiAgICAvLyAtLS0gRGV0ZXJtaW5lIEJhc2UgUGF0aCAobmVlZGVkIGZvciBWaWV3IEFsbCBsaW5rKSAtLS1cbiAgICBjb25zdCBjdXJyZW50SG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgY29uc3QgaXNQcm9kdWN0aW9uID0gY3VycmVudEhvc3RuYW1lID09PSAnbm9lbHVnd29rZS5jb20nIHx8IGN1cnJlbnRIb3N0bmFtZS5lbmRzV2l0aCgnLmdpdGh1Yi5pbycpO1xuICAgIC8vICoqKiBJTVBPUlRBTlQ6IENoYW5nZSAnL2Jsb2cvJyBpZiB5b3VyIEdpdEh1YiByZXBvIG5hbWUvcGF0aCBpcyBkaWZmZXJlbnQgKioqXG4gICAgY29uc3QgYmFzZVBhdGggPSBpc1Byb2R1Y3Rpb24gPyAnL2Jsb2cvJyA6ICcvJztcbiAgICBjb25zdCBtZXNzYWdlID0gdGFnRmlsdGVyXG4gICAgICAgID8gYE5vIHBvc3RzIGZvdW5kIHRhZ2dlZCB3aXRoIFwiJHt0YWdGaWx0ZXJ9XCIuYFxuICAgICAgICA6ICdObyBwb3N0cyB5ZXQhJztcbiAgICBlbXB0eVN0YXRlRGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZmlsZS1hbHQgZmEtM3hcIj48L2k+XG4gICAgICAgIDxoMz4ke21lc3NhZ2V9PC9oMz5cbiAgICAgICAgJHt0YWdGaWx0ZXIgPyBgPHA+PGEgaHJlZj1cIiR7YmFzZVBhdGh9XCI+VmlldyBhbGwgcG9zdHM8L2E+PC9wPmAgOiAnPHA+Q2hlY2sgYmFjayBsYXRlciBmb3IgbmV3IGNvbnRlbnQhPC9wPid9XG4gICAgYDtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wdHlTdGF0ZURpdik7XG59XG4vKipcbiAqIFNob3cgZXJyb3Igc3RhdGUgd2hlbiBwb3N0cyBjb3VsZG4ndCBiZSBsb2FkZWRcbiAqL1xuZnVuY3Rpb24gc2hvd0Vycm9yU3RhdGUoY29udGFpbmVyKSB7XG4gICAgLy8gLi4uIChpbXBsZW1lbnRhdGlvbiByZW1haW5zIHRoZSBzYW1lKSAuLi5cbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgY29uc3QgZXJyb3JTdGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVycm9yU3RhdGVEaXYuY2xhc3NOYW1lID0gJ2Vycm9yLXN0YXRlJztcbiAgICBlcnJvclN0YXRlRGl2LmlubmVySFRNTCA9IGAuLi5gOyAvLyBLZWVwIGVycm9yIG1lc3NhZ2UgSFRNTFxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlcnJvclN0YXRlRGl2KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2VudHJpZXMvY2xpZW50LnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIC0tLSBJbXBvcnRzIC0tLVxuLy8gUGFnZSBTcGVjaWZpYyBMb2dpY1xuY29uc3QgYmxvZ0Zyb250ZW5kQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2Jsb2dGcm9udGVuZENvbnRyb2xsZXJcIik7XG5jb25zdCBwb3N0RGV0YWlsXzEgPSByZXF1aXJlKFwiLi4vbW9kdWxlcy9wb3N0RGV0YWlsXCIpO1xuLy8gQ29tbW9uIENvbXBvbmVudHMgJiBVdGlsaXRpZXNcbmNvbnN0IGhlYWRlcl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaGVhZGVyXCIpO1xuY29uc3QgZGFya01vZGVfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2RhcmtNb2RlXCIpO1xuY29uc3QgbW9iaWxlTmF2XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9tb2JpbGVOYXZcIik7IC8vIEFzc3VtaW5nIHBhdGggaXMgY29ycmVjdFxuY29uc3Qgc2VhcmNoXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9zZWFyY2hcIik7IC8vIEFzc3VtaW5nIHBhdGggaXMgY29ycmVjdFxuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2aWdhdGlvblwiKTsgLy8gQXNzdW1pbmcgcGF0aCBpcyBjb3JyZWN0XG5jb25zdCBhYm91dF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYWJvdXRcIik7IC8vIEFzc3VtaW5nIHBhdGggaXMgY29ycmVjdFxuLy8gSW1wb3J0IHRhZyBmaWx0ZXJpbmcgaWYgaXQgc2V0cyB1cCBnbG9iYWwgbGlzdGVuZXJzIG9yIG5lZWRzIHRvIHJ1biBlYXJseVxuLy8gaW1wb3J0IHsgaW5pdGlhbGl6ZVRhZ0ZpbHRlcmluZyB9IGZyb20gJy4uL2NvbXBvbmVudHMvdGFnRmlsdGVyJzsgLy8gQXNzdW1pbmcgcGF0aCBpcyBjb3JyZWN0XG4vKipcbiAqIENsaWVudC1zaWRlIGVudHJ5IHBvaW50IGluaXRpYWxpemVyLlxuICogSW5pdGlhbGl6ZXMgY29tbW9uIGNvbXBvbmVudHMgYW5kIHBhZ2Utc3BlY2lmaWMgbG9naWMuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDbGllbnQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWVudCBpbml0aWFsaXppbmcuLi4nKTtcbiAgICAgICAgLy8gLS0tIEluaXRpYWxpemUgQ29tbW9uIEVsZW1lbnRzICYgRnVuY3Rpb25hbGl0eSAtLS1cbiAgICAgICAgLy8gVGhlc2UgcnVuIG9uIGV2ZXJ5IHBhZ2UgdGhhdCBsb2FkcyBjbGllbnQuYnVuZGxlLmpzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBUaGVtZSBhbmQgSGVhZGVyIGZpcnN0XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEYXJrIG1vZGUgaW5pdGlhbGl6ZWQgZ2xvYmFsbHkuJyk7XG4gICAgICAgICAgICAvLyBSZW5kZXIgSGVhZGVyIG9ubHkgaWYgcGxhY2Vob2xkZXIgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlci1wbGFjZWhvbGRlcicpKSB7XG4gICAgICAgICAgICAgICAgKDAsIGhlYWRlcl8xLnJlbmRlckhlYWRlcikoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGVyIHJlbmRlcmVkIGdsb2JhbGx5LicpO1xuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgY29tcG9uZW50cyBkZXBlbmRlbnQgb24gaGVhZGVyICphZnRlciogcmVuZGVyaW5nXG4gICAgICAgICAgICAgICAgKDAsIG1vYmlsZU5hdl8xLmluaXRpYWxpemVNb2JpbGVOYXYpKCk7IC8vIEluaXRpYWxpemUgbW9iaWxlIG5hdiB1c2luZyBoZWFkZXIgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAoMCwgc2VhcmNoXzEuaW5pdGlhbGl6ZVNlYXJjaCkoKTsgLy8gSW5pdGlhbGl6ZSBzZWFyY2ggYmFyIGluIGhlYWRlclxuICAgICAgICAgICAgICAgICgwLCBuYXZpZ2F0aW9uXzEuaW5pdGlhbGl6ZU5hdmlnYXRpb24pKCk7IC8vIEluaXRpYWxpemUgbmF2IGxpbmsgYWN0aXZlIHN0YXRlc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdIZWFkZXIgcGxhY2Vob2xkZXIgbm90IGZvdW5kIG9uIHRoaXMgcGFnZS4gU2tpcHBpbmcgaGVhZGVyLWRlcGVuZGVudCBpbml0aWFsaXphdGlvbnMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIG90aGVyIGNvbW1vbiBVSSBlbGVtZW50cyBsaWtlIHBvcHVwc1xuICAgICAgICAgICAgKDAsIGFib3V0XzEuaW5pdGlhbGl6ZUFib3V0KSgpOyAvLyBBc3N1bWVzICNhYm91dC1idG4gYW5kICNhYm91dC1wb3B1cCBtaWdodCBleGlzdCBnbG9iYWxseSBvciBhcmUgaGFuZGxlZCBzYWZlbHkgaW5zaWRlXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHRhZyBmaWx0ZXJpbmcgbGlzdGVuZXJzIGlmIG5lZWRlZCBnbG9iYWxseSAoZS5nLiwgaWYgdGFncyBhcHBlYXIgaW4gaGVhZGVyL2Zvb3RlcilcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemVUYWdGaWx0ZXJpbmcoKTsgXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGNvbW1vbiBlbGVtZW50czpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIC0tLSBFbmQgQ29tbW9uIEVsZW1lbnRzIC0tLVxuICAgICAgICAvLyAtLS0gUGFnZS1TcGVjaWZpYyBMb2dpYyAtLS1cbiAgICAgICAgY29uc3QgcGFnZVR5cGUgPSBkb2N1bWVudC5ib2R5LmRhdGFzZXQucGFnZTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIGNvbnN0IGlzUm9vdE9ySW5kZXggPSBjdXJyZW50UGFnZS5lbmRzV2l0aCgnLycpIHx8IGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvaW5kZXguaHRtbCcpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERldGVjdGVkIHBhZ2VUeXBlOiAke3BhZ2VUeXBlfSwgY3VycmVudFBhZ2U6ICR7Y3VycmVudFBhZ2V9LCBpc1Jvb3RPckluZGV4OiAke2lzUm9vdE9ySW5kZXh9YCk7XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgTWFpbiBQYWdlIFxuICAgICAgICAgICAgaWYgKHBhZ2VUeXBlID09PSAnbWFpbicgfHwgKCFwYWdlVHlwZSAmJiBpc1Jvb3RPckluZGV4KSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgbWFpbiBibG9nIHBhZ2UgbG9naWMuLi4nKTtcbiAgICAgICAgICAgICAgICB5aWVsZCAoMCwgYmxvZ0Zyb250ZW5kQ29udHJvbGxlcl8xLmluaXRpYWxpemVCbG9nRnJvbnRlbmQpKCk7IC8vIEhhbmRsZXMgcG9zdHMsIHBhZ2luYXRpb24sIGNhcmQgZGVsZWdhdGlvbiBldGMuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01haW4gYmxvZyBwYWdlIGxvZ2ljIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBQb3N0IERldGFpbCBQYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ3Bvc3QnIHx8ICghcGFnZVR5cGUgJiYgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9wb3N0Lmh0bWwnKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIHBvc3QgZGV0YWlsIHBhZ2UgbG9naWMgKGZyb20gbW9kdWxlKS4uLicpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBwb3N0RGV0YWlsXzEuaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMpKCk7IC8vIEhhbmRsZXMgc2luZ2xlIHBvc3QgZGlzcGxheSwgbGlrZSwgY29tbWVudHMgZXRjLlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRldGFpbCBwYWdlIGxvZ2ljIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBBZG1pbiBQYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ2FkbWluJyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvYWRtaW4uaHRtbCcpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZG1pbiBwYWdlIGRldGVjdGVkIGJ5IGNsaWVudC50cyAtIG5vIGFjdGlvbiB0YWtlbi4nKTsgLy8gQWRtaW4gbG9naWMgaXMgaW4gYWRtaW4uYnVuZGxlLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVW5rbm93biBwYWdlIHR5cGUgKCcke3BhZ2VUeXBlfScpIG9yIHBhdGggKCcke2N1cnJlbnRQYWdlfScpLiBObyBzcGVjaWZpYyBpbml0aWFsaXphdGlvbiBuZWVkZWQgZnJvbSBjbGllbnQudHMuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgcGFnZS1zcGVjaWZpYyBjbGllbnQgaW5pdGlhbGl6YXRpb246JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyAtLS0gR2xvYmFsIEV4ZWN1dGlvbiAtLS1cbi8vIFJ1biBpbml0aWFsaXphdGlvbiBsb2dpYyB3aGVuIHRoZSBET00gaXMgcmVhZHlcbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGl6ZUNsaWVudCk7XG59XG5lbHNlIHtcbiAgICAvLyBET01Db250ZW50TG9hZGVkIGhhcyBhbHJlYWR5IGZpcmVkXG4gICAgaW5pdGlhbGl6ZUNsaWVudCgpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvbW9kdWxlcy9wb3N0RGV0YWlsLnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMgPSBpbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYztcbmV4cG9ydHMubG9hZFBvc3RDb250ZW50ID0gbG9hZFBvc3RDb250ZW50O1xuZXhwb3J0cy51cGRhdGVQb3N0VUkgPSB1cGRhdGVQb3N0VUk7XG5leHBvcnRzLnVwZGF0ZVBhZ2VNZXRhZGF0YSA9IHVwZGF0ZVBhZ2VNZXRhZGF0YTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcgPSBpbml0aWFsaXplU29jaWFsU2hhcmluZztcbmV4cG9ydHMuc2hvd0Vycm9yTWVzc2FnZSA9IHNob3dFcnJvck1lc3NhZ2U7XG4vLyAtLS0gSW1wb3J0cyAtLS1cbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTtcbmNvbnN0IHVybFRyYW5zZm9ybWVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdXJsVHJhbnNmb3JtZXJcIik7XG5jb25zdCBoZWFkZXJfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2hlYWRlclwiKTtcbmNvbnN0IGRhcmtNb2RlXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXJrTW9kZVwiKTtcbi8vIC0tLSBDb3JlIEluaXRpYWxpemF0aW9uIEZ1bmN0aW9uIC0tLVxuLyoqXG4gKiBJbml0aWFsaXplcyBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHBvc3QgZGV0YWlsIHBhZ2UuXG4gKiBUaGlzIGlzIHRoZSBtYWluIGV4cG9ydGVkIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCBieSB0aGUgZW50cnkgcG9pbnQuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGhlYWRlcl8xLnJlbmRlckhlYWRlcikoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSB1cmxQYXJhbXMuZ2V0KCdpZCcpO1xuICAgICAgICBpZiAocG9zdElkKSB7XG4gICAgICAgICAgICB5aWVsZCBsb2FkUG9zdENvbnRlbnQocG9zdElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHBvc3QgSUQgcHJvdmlkZWQgaW4gdGhlIFVSTCcpO1xuICAgICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZSgnTm8gcG9zdCBzcGVjaWZpZWQuIFBsZWFzZSBjaGVjayB0aGUgVVJMLicpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIExvYWQgYW5kIGRpc3BsYXkgcG9zdCBjb250ZW50IGJhc2VkIG9uIHBvc3QgSURcbiAqL1xuZnVuY3Rpb24gbG9hZFBvc3RDb250ZW50KHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0geWllbGQgKDAsIGFwaV8xLmZldGNoUG9zdEJ5SWQpKHBvc3RJZCk7XG4gICAgICAgICAgICBpZiAoIXBvc3QpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQb3N0IHdpdGggSUQgJHtwb3N0SWR9IG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgdXBkYXRlUG9zdFVJKHBvc3QpO1xuICAgICAgICAgICAgdXBkYXRlUGFnZU1ldGFkYXRhKHBvc3QpO1xuICAgICAgICAgICAgaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcocG9zdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHBvc3QgY29udGVudDonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93RXJyb3JNZXNzYWdlKGBGYWlsZWQgdG8gbG9hZCB0aGUgYmxvZyBwb3N0LiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1BsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJ31gKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBVcGRhdGUgdGhlIHBvc3QgVUkgd2l0aCBjb250ZW50IGZyb20gdGhlIGxvYWRlZCBwb3N0XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBvc3RVSShwb3N0KSB7XG4gICAgY29uc3QgcG9zdEFydGljbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGlmICghcG9zdEFydGljbGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCB1cGRhdGUgVUk6ICNwb3N0LWNvbnRlbnQgZWxlbWVudCBub3QgZm91bmQuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQ29uc3RydWN0IHRoZSBpbm5lciBIVE1MIGR5bmFtaWNhbGx5XG4gICAgcG9zdEFydGljbGVFbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtaGVhZGVyXCI+XG4gICAgICAgICAgICA8aDE+JHtwb3N0LnRpdGxlfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1tZXRhXCI+XG4gICAgICAgICAgICAgICAgPHRpbWUgZGF0ZXRpbWU9XCIke3Bvc3QuY3JlYXRlZEF0ID8gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA6ICcnfVwiPlxuICAgICAgICAgICAgICAgICAgICAke3Bvc3QuY3JlYXRlZEF0ID8gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycgfSkgOiAnRGF0ZSB1bmtub3duJ31cbiAgICAgICAgICAgICAgICA8L3RpbWU+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JcIj5ieSAke3Bvc3QuYXV0aG9yIHx8ICdBbm9ueW1vdXMnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgICR7cG9zdC5pbWFnZVVybCA/IGA8aW1nIHNyYz1cIiR7cG9zdC5pbWFnZVVybH1cIiBhbHQ9XCIke3Bvc3QudGl0bGV9XCIgY2xhc3M9XCJmZWF0dXJlZC1pbWFnZVwiPmAgOiAnJ31cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1jb250ZW50LWJvZHlcIj5cbiAgICAgICAgICAgICR7cG9zdC5jb250ZW50fVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1mb290ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzXCI+XG4gICAgICAgICAgICAgICAgJHtwb3N0LnRhZ3MgJiYgcG9zdC50YWdzLmxlbmd0aCA+IDAgPyBgPHNwYW4+VGFnczo8L3NwYW4+ICR7cG9zdC50YWdzLm1hcCh0YWcgPT4gYDxhIGhyZWY9XCIkeygwLCB1cmxUcmFuc2Zvcm1lcl8xLmdlbmVyYXRlVGFnRmlsdGVyVXJsKSh0YWcpfVwiPiR7dGFnfTwvYT5gKS5qb2luKCcnKX1gIDogJyd9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWwtc2hhcmluZ1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlNoYXJlOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIHR3aXR0ZXJcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gVHdpdHRlclwiPjxpIGNsYXNzPVwiZmFiIGZhLXR3aXR0ZXJcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBmYWNlYm9va1wiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBGYWNlYm9va1wiPjxpIGNsYXNzPVwiZmFiIGZhLWZhY2Vib29rLWZcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBsaW5rZWRpblwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBMaW5rZWRJblwiPjxpIGNsYXNzPVwiZmFiIGZhLWxpbmtlZGluLWluXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4vKipcbiAqIFVwZGF0ZSBwYWdlIG1ldGFkYXRhIGxpa2UgdGl0bGUgYW5kIFVSTFxuICovXG5mdW5jdGlvbiB1cGRhdGVQYWdlTWV0YWRhdGEocG9zdCkge1xuICAgIGRvY3VtZW50LnRpdGxlID0gYCR7cG9zdC50aXRsZX0gfCBOb2VsJ3MgQmxvZ2A7XG59XG4vKipcbiAqIEluaXRpYWxpemUgc29jaWFsIHNoYXJpbmcgZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplU29jaWFsU2hhcmluZyhwb3N0KSB7XG4gICAgY29uc3QgcG9zdEFydGljbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGlmICghcG9zdEFydGljbGVFbGVtZW50KVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3Qgc29jaWFsU2hhcmluZ0RpdiA9IHBvc3RBcnRpY2xlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsLXNoYXJpbmcnKTtcbiAgICBpZiAoc29jaWFsU2hhcmluZ0Rpdikge1xuICAgICAgICBzb2NpYWxTaGFyaW5nRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNoYXJlLWJ1dHRvbicpO1xuICAgICAgICAgICAgaWYgKCFidXR0b24pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGBDaGVjayBvdXQgdGhpcyBhcnRpY2xlOiAke3Bvc3QudGl0bGV9YDtcbiAgICAgICAgICAgIGxldCBzaGFyZVdpbmRvd1VybCA9ICcnO1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3R3aXR0ZXInKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfSZ0ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICd0d2l0dGVyLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9MjM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWNlYm9vaycpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnZmFjZWJvb2stc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmtlZGluJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmluZy9zaGFyZS1vZmZzaXRlLz91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnbGlua2VkaW4tc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBEaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIHVzZXIgd2l0aGluIHRoZSBwb3N0IGNvbnRlbnQgYXJlYVxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoY29udGVudEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXNlY3Rpb24nKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGNvbW1lbnRzU2VjdGlvbiA/IGNvbW1lbnRzU2VjdGlvbiA6IGNvbnRlbnRFbGVtZW50O1xuICAgICAgICB0YXJnZXRFbGVtZW50LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPiR7bWVzc2FnZX08L2Rpdj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7IC8vIEZhbGxiYWNrXG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubGlrZVBvc3QgPSBsaWtlUG9zdDtcbmV4cG9ydHMudW5saWtlUG9zdCA9IHVubGlrZVBvc3Q7XG5leHBvcnRzLmRlbGV0ZUJsb2dQb3N0ID0gZGVsZXRlQmxvZ1Bvc3Q7XG5leHBvcnRzLmNyZWF0ZVBvc3QgPSBjcmVhdGVQb3N0O1xuZXhwb3J0cy51cGRhdGVQb3N0ID0gdXBkYXRlUG9zdDtcbmV4cG9ydHMuYWRkVGFnVG9Qb3N0ID0gYWRkVGFnVG9Qb3N0O1xuZXhwb3J0cy5mZXRjaEJsb2dQb3N0cyA9IGZldGNoQmxvZ1Bvc3RzO1xuZXhwb3J0cy5mZXRjaFBvc3RCeUlkID0gZmV0Y2hQb3N0QnlJZDtcbmV4cG9ydHMuZmV0Y2hDb21tZW50c0FwaSA9IGZldGNoQ29tbWVudHNBcGk7XG5leHBvcnRzLnN1Ym1pdENvbW1lbnRBcGkgPSBzdWJtaXRDb21tZW50QXBpO1xuLy8gQVBJX1VSTCBjb25zdGFudCBpcyBub3QgbmVlZGVkIHdoZW4gZmV0Y2hpbmcgc3RhdGljIGZpbGUgZGlyZWN0bHlcbi8vIGNvbnN0IEFQSV9VUkwgPSAnL2FwaSc7IFxuLy8gLS0tIEZ1bmN0aW9ucyByZWx5aW5nIG9uIGJhY2tlbmQgQVBJIChXaWxsIE5PVCB3b3JrIG9uIEdpdEh1YiBQYWdlcykgLS0tXG4vLyBUaGVzZSBmdW5jdGlvbnMgd2lsbCBmYWlsIHNpbGVudGx5IG9yIGxvZyBlcnJvcnMgaW4gdGhlIGNvbnNvbGUgb24gdGhlIHN0YXRpYyBzaXRlLlxuZnVuY3Rpb24gbGlrZVBvc3QoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBMaWtlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZXMgYSBiYWNrZW5kLiBDYW5ub3QgTElLRSBwb3N0ICR7aWR9IG9uIHN0YXRpYyBzaXRlLmApO1xuICAgICAgICAvLyBSZXR1cm4gbnVsbCBvciBhIGRlZmF1bHQgc3RydWN0dXJlIGlmIHlvdXIgY2FsbGluZyBjb2RlIGV4cGVjdHMgaXRcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB1bmxpa2VQb3N0KGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgVW5saWtlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZXMgYSBiYWNrZW5kLiBDYW5ub3QgVU5MSUtFIHBvc3QgJHtpZH0gb24gc3RhdGljIHNpdGUuYCk7XG4gICAgICAgIC8vIFJldHVybiBudWxsIG9yIGEgZGVmYXVsdCBzdHJ1Y3R1cmVcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkZWxldGVCbG9nUG9zdChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGRlbGV0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBvc3QocG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGNyZWF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlUG9zdChpZCwgcG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHVwZGF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gYWRkVGFnVG9Qb3N0KGlkLCB0YWcpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGFkZCB0YWcgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG4vLyAtLS0gRnVuY3Rpb25zIG1vZGlmaWVkIGZvciBzdGF0aWMgZGF0YSAtLS1cbmNvbnN0IFNUQVRJQ19EQVRBX1VSTCA9ICdkYXRhL3Bvc3RzLmpzb24nOyAvLyBEZWZpbmUgcmVsYXRpdmUgcGF0aCBvbmNlXG4vKipcbiAqIEZldGNoIGFsbCBibG9nIHBvc3RzIGRpcmVjdGx5IGZyb20gdGhlIHN0YXRpYyBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGZldGNoQmxvZ1Bvc3RzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGZXRjaCB0aGUgSlNPTiBmaWxlIHVzaW5nIHRoZSByZWxhdGl2ZSBwYXRoXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKFNUQVRJQ19EQVRBX1VSTCk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggJHtTVEFUSUNfREFUQV9VUkx9OiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIC8vIEFzc3VtaW5nIHRoZSBKU09OIHN0cnVjdHVyZSBpcyB7IHBvc3RzOiBbLi4uXSB9IFxuICAgICAgICAgICAgcmV0dXJuIGRhdGEucG9zdHMgfHwgW107XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBzdGF0aWMgJHtTVEFUSUNfREFUQV9VUkx9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IG9uIGVycm9yXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGEgc2luZ2xlIHBvc3QgYnkgSUQgYnkgZmlsdGVyaW5nIHRoZSBzdGF0aWMgSlNPTiBkYXRhLlxuICogQHBhcmFtIGlkIC0gVGhlIHBvc3QgSUQgKHN0cmluZyBvciBudW1iZXIpXG4gKi9cbmZ1bmN0aW9uIGZldGNoUG9zdEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRmV0Y2ggYWxsIHBvc3RzIGZpcnN0XG4gICAgICAgICAgICBjb25zdCBhbGxQb3N0cyA9IHlpZWxkIGZldGNoQmxvZ1Bvc3RzKCk7XG4gICAgICAgICAgICBjb25zdCBwb3N0SWROdW1iZXIgPSB0eXBlb2YgaWQgPT09ICdzdHJpbmcnID8gcGFyc2VJbnQoaWQsIDEwKSA6IGlkO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHBvc3RJZE51bWJlcikpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIHBvc3QgSUQgcHJvdmlkZWQ6ICR7aWR9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBzcGVjaWZpYyBwb3N0XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0gYWxsUG9zdHMuZmluZChwID0+IE51bWJlcihwLmlkKSA9PT0gcG9zdElkTnVtYmVyKTtcbiAgICAgICAgICAgIGlmICghcG9zdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgUG9zdCB3aXRoIElEICR7aWR9IG5vdCBmb3VuZCBpbiBzdGF0aWMgZGF0YS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGb3VuZCBwb3N0ICR7aWR9IGluIHN0YXRpYyBkYXRhLmApO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBzdGF0aWMgcG9zdCAke2lkfTpgLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gLS0tIENvbW1lbnQgQVBJIFBsYWNlaG9sZGVycyAtLS1cbmZ1bmN0aW9uIGZldGNoQ29tbWVudHNBcGkocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ29tbWVudHMgY2Fubm90IGJlIGZldGNoZWQgb24gc3RhdGljIHNpdGUgd2l0aG91dCBleHRlcm5hbCBzZXJ2aWNlL2JhY2tlbmQuXCIpO1xuICAgICAgICByZXR1cm4gW107XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzdWJtaXRDb21tZW50QXBpKHBvc3RJZCwgbmFtZSwgY29tbWVudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3Qgc3VibWl0IGNvbW1lbnQgb24gc3RhdGljIHNpdGUgd2l0aG91dCBleHRlcm5hbCBzZXJ2aWNlL2JhY2tlbmQuXCIpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb21tZW50IHN1Ym1pc3Npb24gbm90IGF2YWlsYWJsZS5cIik7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy91dGlscy91cmxUcmFuc2Zvcm1lci50cyAoRXhhbXBsZSBMb2NhdGlvbilcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2VuZXJhdGVUYWdGaWx0ZXJVcmwgPSBnZW5lcmF0ZVRhZ0ZpbHRlclVybDtcbi8qKlxuICogR2VuZXJhdGVzIGEgVVJMIHBhdGggZm9yIGZpbHRlcmluZyBieSB0YWcgb24gdGhlIG1haW4gYmxvZyBwYWdlLlxuICogQ3JlYXRlcyBhIFVSTCBsaWtlIFwiL2Jsb2cvP3RhZz15b3VyLXRhZy1uYW1lXCIgb3IgXCIvP3RhZz15b3VyLXRhZy1uYW1lXCIgYmFzZWQgb24gZW52aXJvbm1lbnQuXG4gKlxuICogQHBhcmFtIHRhZyAtIFRoZSB0YWcgc3RyaW5nIHRvIGZpbHRlciBieS5cbiAqIEByZXR1cm5zIFRoZSBVUkwgcGF0aCB3aXRoIHRoZSB0YWcgcXVlcnkgcGFyYW1ldGVyLlxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRhZ0ZpbHRlclVybCh0YWcpIHtcbiAgICAvLyBPcHRpb25hbDogQ29udmVydCB0YWcgdG8gbG93ZXJjYXNlIGZvciBjb25zaXN0ZW5jeSBpbiBmaWx0ZXJpbmdcbiAgICBjb25zdCBjb25zaXN0ZW50VGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gVVJMU2VhcmNoUGFyYW1zIGhhbmRsZXMgbmVjZXNzYXJ5IGVuY29kaW5nIGZvciBxdWVyeSBwYXJhbWV0ZXIgdmFsdWVzXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7IHRhZzogY29uc2lzdGVudFRhZyB9KTtcbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBvbiB0aGUgcHJvZHVjdGlvbiBzaXRlIGJ5IGxvb2tpbmcgYXQgdGhlIGhvc3RuYW1lXG4gICAgY29uc3QgaXNQcm9kdWN0aW9uID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbm9lbHVnd29rZS5jb20nO1xuICAgIGNvbnN0IGJhc2VQYXRoID0gaXNQcm9kdWN0aW9uID8gJy9ibG9nLycgOiAnLyc7XG4gICAgcmV0dXJuIGAke2Jhc2VQYXRofT8ke3BhcmFtcy50b1N0cmluZygpfWA7XG59XG4vKlxuLy8gT3JpZ2luYWwgZnVuY3Rpb24gLSBrZXB0IGZvciByZWZlcmVuY2Ugb3IgaWYgbmVlZGVkIGZvciBkaWZmZXJlbnQgVVJMIHR5cGVzXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtVGFnVG9VcmxGb3JtYXQodGFnOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0YWcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICctJyk7XG59XG4qL1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2VudHJpZXMvY2xpZW50LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9