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

/***/ "./src/components/contact.ts":
/*!***********************************!*\
  !*** ./src/components/contact.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


// src/components/contact.ts (Example)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeContactForm = initializeContactForm;
/**
 * Initializes the contact form popup functionality.
 */
function initializeContactForm() {
    const contactButton = document.getElementById('contact-btn');
    const contactPopup = document.getElementById('contact-popup');
    const closeButton = contactPopup === null || contactPopup === void 0 ? void 0 : contactPopup.querySelector('.close-popup');
    const contactForm = document.getElementById('contact-form');
    if (!contactButton || !contactPopup) {
        console.warn('Contact button or popup element not found. Cannot initialize contact form.');
        return;
    }
    // --- Open Popup ---
    contactButton.addEventListener('click', (event) => {
        event.preventDefault(); // <-- CRUCIAL: Prevent default link navigation
        console.log('Contact button clicked, opening popup.');
        contactPopup.classList.add('open'); // Changed from 'visible' to 'open'
    });
    // --- Close Popup ---
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            contactPopup.classList.remove('open'); // Changed from 'visible' to 'open'
        });
    }
    // Close popup if clicking outside the content area
    contactPopup.addEventListener('click', (event) => {
        if (event.target === contactPopup) {
            contactPopup.classList.remove('open'); // Changed from 'visible' to 'open'
        }
    });
    // --- Form Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            console.log('Contact form submitted (placeholder).');
            // Add your form submission logic here (e.g., using fetch to send data)
            // Optionally close popup after submission
            // contactPopup.classList.remove('open'); 
            alert('Contact form submission not implemented yet.'); // Placeholder feedback
        });
    }
    console.log('Contact form initialized.');
}
// Ensure your CSS handles the .open class for the #contact-popup
// e.g.,
// .popup { display: none; /* Hidden by default */ }
// .popup.open { display: block; /* Or flex, grid, etc. */ }


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
        console.error(`Header container with ID '${containerId}' not found in the DOM.`);
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
                    <li><a href="${basePath}#portfolio">Portfolio</a></li>
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
    const contactBtn = document.getElementById('contact-btn');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', () => {
            updateActiveNavLink('#about');
        });
    }
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            updateActiveNavLink('#contact');
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
    console.log('Search functionality initialized.');
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
const contact_1 = __webpack_require__(/*! ../components/contact */ "./src/components/contact.ts");
const pagination_1 = __webpack_require__(/*! ../components/pagination */ "./src/components/pagination.ts");
const search_1 = __webpack_require__(/*! ../components/search */ "./src/components/search.ts");
const about_1 = __webpack_require__(/*! ../components/about */ "./src/components/about.ts");
const navigation_1 = __webpack_require__(/*! ../components/navigation */ "./src/components/navigation.ts");
/**
 * Initialize the blog frontend functionality (homepage)
 */
function initializeBlogFrontend() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Initializing Blog Frontend Controller...');
        (0, navigation_1.initializeNavigation)();
        (0, contact_1.initializeContactForm)();
        (0, about_1.initializeAbout)();
        (0, search_1.initializeSearch)();
        // Initialize posts, which now includes filtering based on URL params
        yield initializePosts();
        (0, pagination_1.initializePagination)(); // Initialize pagination after initial posts (possibly filtered) are loaded
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
        console.log('Event delegation set up for .blog-cards');
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
            console.log(`Fetched ${allPosts.length} total posts.`);
            // --- Apply Tag Filter ---
            let postsToDisplay = allPosts;
            if (tagFilter) {
                postsToDisplay = allPosts.filter(post => post.tags && post.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase()));
                console.log(`Filtered down to ${postsToDisplay.length} posts for tag: "${tagFilter}"`);
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
function showErrorState(container) {
    // ... (implementation remains the same) ...
    container.innerHTML = '';
    const errorStateDiv = document.createElement('div');
    errorStateDiv.className = 'error-state';
    errorStateDiv.innerHTML = `...`; // Keep error message HTML
    container.appendChild(errorStateDiv);
    console.log('Displayed error state for posts.');
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
                console.log('Initializing main blog page logic...');
                yield (0, blogFrontendController_1.initializeBlogFrontend)();
                console.log('Main blog page logic initialized.');
                // Check for Post Detail Page (using data-page or path ending in /post.html)
            }
            else if (pageType === 'post' || (!pageType && currentPage.endsWith('/post.html'))) {
                console.log('Initializing post detail page logic (from module)...');
                yield (0, postDetail_1.initializePostDetailPageLogic)();
                console.log('Post detail page logic initialized.');
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
        console.log('Initializing post detail page...');
        try {
            (0, darkMode_1.checkSystemDarkModePreference)();
            (0, darkMode_1.initializeDarkMode)();
            console.log('Dark mode initialized.');
        }
        catch (e) {
            console.error(e);
        }
        try {
            (0, header_1.renderHeader)();
            console.log('Header rendered.');
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
        console.log('Post detail page initialization complete.');
    });
}
/**
 * Load and display post content based on post ID
 */
function loadPostContent(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`Fetching post with ID: ${postId}`);
            const post = yield (0, api_1.fetchPostById)(postId);
            if (!post)
                throw new Error(`Post with ID ${postId} not found`);
            console.log('Post data fetched:', post);
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
    console.log('Updating Post UI for:', post.title);
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
    console.log('Post UI updated with like button and comments section structure.');
}
/**
 * Update page metadata like title and URL
 */
function updatePageMetadata(post) {
    document.title = `${post.title} | Noel's Blog`;
    console.log('Page metadata updated.');
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
    console.log('Social sharing initialized.');
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
        console.log(`Fetching static data from: ${STATIC_DATA_URL}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLElBQUk7QUFDakQ7QUFDQTtBQUNBLHNDQUFzQyxJQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxHQUFHO0FBQzNEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDaElhO0FBQ2I7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsb0JBQW9CO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUyxHQUFHLGtCQUFrQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzFCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2Fib3V0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9ibG9nQ2FyZHMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2NvbW1lbnRzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9jb250YWN0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9kYXJrTW9kZS50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9wYWdpbmF0aW9uLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9zZWFyY2gudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9ibG9nRnJvbnRlbmRDb250cm9sbGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvZW50cmllcy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9tb2R1bGVzL3Bvc3REZXRhaWwudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9zZXJ2aWNlcy9hcGkudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy91dGlscy91cmxUcmFuc2Zvcm1lci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIEFib3V0IHBvcHVwIGZ1bmN0aW9uYWxpdHlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUFib3V0ID0gaW5pdGlhbGl6ZUFib3V0O1xuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBBYm91dCBzZWN0aW9uIHBvcHVwXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVBYm91dCgpIHtcbiAgICBjb25zdCBhYm91dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1idG4nKTtcbiAgICBjb25zdCBhYm91dFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LXBvcHVwJyk7XG4gICAgY29uc3QgY2xvc2VQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dC1wb3B1cCAuY2xvc2UtcG9wdXAnKTtcbiAgICBpZiAoIWFib3V0QnRuIHx8ICFhYm91dFBvcHVwIHx8ICFjbG9zZVBvcHVwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQWJvdXQgcG9wdXAgZWxlbWVudHMgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBPcGVuIHBvcHVwIHdoZW4gYWJvdXQgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBhYm91dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGFuY2hvciBiZWhhdmlvclxuICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nOyAvLyBQcmV2ZW50IHNjcm9sbGluZyB3aGlsZSBwb3B1cCBpcyBvcGVuXG4gICAgICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gYWJvdXQgbGlua1xuICAgICAgICBhYm91dEJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSBwb3B1cCB3aGVuIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgY2xvc2VQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgIH0pO1xuICAgIC8vIENsb3NlIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSB0aGUgcG9wdXAgY29udGVudFxuICAgIGFib3V0UG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IGFib3V0UG9wdXApIHtcbiAgICAgICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIENsb3NlIG9uIGVzY2FwZSBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBhYm91dFBvcHVwLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XG4gICAgICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNldCB0aGUgZGVmYXVsdCBhY3RpdmUgbGluayBzdGF0ZVxuICovXG5mdW5jdGlvbiBzZXREZWZhdWx0QWN0aXZlTGluaygpIHtcbiAgICAvLyBHZXQgY3VycmVudCBoYXNoIG9yIGRlZmF1bHQgdG8gaG9tZVxuICAgIGNvbnN0IGN1cnJlbnRIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgJyNob21lJztcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIG5hdiBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBoYXNoIGxpbmtcbiAgICBjb25zdCBjdXJyZW50TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlciBuYXYgdWwgbGkgYVtocmVmPVwiJHtjdXJyZW50SGFzaH1cIl1gKTtcbiAgICBpZiAoY3VycmVudExpbmspIHtcbiAgICAgICAgY3VycmVudExpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCA9IGNyZWF0ZUJsb2dDYXJkRWxlbWVudDtcbmNvbnN0IHVybFRyYW5zZm9ybWVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdXJsVHJhbnNmb3JtZXJcIik7IC8vIEltcG9ydCB0aGUgVVJMIGdlbmVyYXRvclxuLyoqXG4gKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnQgZm9yIGEgYmxvZyBjYXJkIGZyb20gcG9zdCBkYXRhIChkaXNwbGF5IG9ubHkgZm9yIGFjdGlvbnMpXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJsb2dDYXJkRWxlbWVudChwb3N0KSB7XG4gICAgY29uc3QgYmxvZ0NhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBibG9nQ2FyZC5jbGFzc05hbWUgPSAnYmxvZy1jYXJkJztcbiAgICBibG9nQ2FyZC5kYXRhc2V0LnBvc3RJZCA9IFN0cmluZyhwb3N0LmlkKTtcbiAgICBibG9nQ2FyZC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgY29uc3QgY29tbWVudENvdW50ID0gcG9zdC5jb21tZW50cyA/IHBvc3QuY29tbWVudHMubGVuZ3RoIDogMDtcbiAgICBjb25zdCBjcmVhdGVkRGF0ZSA9IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KTtcbiAgICBjb25zdCBkYXRlU3RyID0gY3JlYXRlZERhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJ1xuICAgIH0pO1xuICAgIC8vIC0tLSBEeW5hbWljIFVSTCBhbmQgVGV4dCBHZW5lcmF0aW9uIGZvciBTaGFyaW5nIC0tLVxuICAgIGNvbnN0IHBvc3RVcmwgPSBgcG9zdC5odG1sP2lkPSR7U3RyaW5nKHBvc3QuaWQpfWA7XG4gICAgY29uc3QgZW5jb2RlZFVybCA9IGVuY29kZVVSSUNvbXBvbmVudChwb3N0VXJsKTtcbiAgICBjb25zdCBzaGFyZVRleHQgPSBgQ2hlY2sgb3V0IHRoaXMgYXJ0aWNsZTogJHtwb3N0LnRpdGxlfWA7XG4gICAgY29uc3QgZW5jb2RlZFNoYXJlVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudChzaGFyZVRleHQpO1xuICAgIC8vIC0tLSBFbmQgRHluYW1pYyBVUkwgR2VuZXJhdGlvbiAtLS1cbiAgICAvLyBHZW5lcmF0ZSBIVE1MIGZvciB0YWcgYmFkZ2VzL2xpbmtzIHVzaW5nIHRoZSB1dGlsaXR5IGZ1bmN0aW9uXG4gICAgbGV0IHRhZ3NIVE1MID0gJyc7XG4gICAgaWYgKHBvc3QudGFncyAmJiBwb3N0LnRhZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICB0YWdzSFRNTCA9ICc8ZGl2IGNsYXNzPVwicG9zdC10YWdzXCI+JyArXG4gICAgICAgICAgICBwb3N0LnRhZ3MubWFwKHRhZyA9PiBcbiAgICAgICAgICAgIC8vIFVzZSBnZW5lcmF0ZVRhZ0ZpbHRlclVybCBmb3IgaHJlZiBpbiBhbiA8YT4gdGFnXG4gICAgICAgICAgICBgPGEgaHJlZj1cIiR7KDAsIHVybFRyYW5zZm9ybWVyXzEuZ2VuZXJhdGVUYWdGaWx0ZXJVcmwpKHRhZyl9XCIgY2xhc3M9XCJ0YWctYmFkZ2VcIj4ke3RhZ308L2E+YCkuam9pbignJykgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgfVxuICAgIGNvbnN0IGZhbGxiYWNrSW1hZ2VVcmwgPSAnaW1hZ2VzL2Jsb2dfaW1hZ2VfMy5qcGVnJzsgLy8gUmVsYXRpdmUgcGF0aFxuICAgIC8vIENyZWF0ZSBIVE1MIGZvciBibG9nIGNhcmRcbiAgICBibG9nQ2FyZC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxpbWcgc3JjPVwiJHtwb3N0LmltYWdlVXJsIHx8IGZhbGxiYWNrSW1hZ2VVcmx9XCIgYWx0PVwiJHtwb3N0LnRpdGxlfVwiPiBcbiAgICAgICAgPGRpdiBjbGFzcz1cImJsb2ctY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImJsb2ctY2FyZC1kYXRlLWF1dGhvclwiPiR7ZGF0ZVN0cn08L3A+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJibG9nLWNhcmQtdGl0bGVcIj4ke3Bvc3QudGl0bGV9PC9oMz5cbiAgICAgICAgICAgICR7dGFnc0hUTUx9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvY2lhbC1zaGFyaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gdHdpdHRlclwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBUd2l0dGVyXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCIgZGF0YS10ZXh0PVwiJHtlbmNvZGVkU2hhcmVUZXh0fVwiPjxpIGNsYXNzPVwiZmFiIGZhLXR3aXR0ZXJcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gZmFjZWJvb2tcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gRmFjZWJvb2tcIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIj48aSBjbGFzcz1cImZhYiBmYS1mYWNlYm9vay1mXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGxpbmtlZGluXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIExpbmtlZEluXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCI+PGkgY2xhc3M9XCJmYWIgZmEtbGlua2VkaW4taW5cIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICAvLyBTZXR1cCBzb2NpYWwgc2hhcmluZyBsaXN0ZW5lcnMgKGFzIGJlZm9yZSlcbiAgICBjb25zdCBzb2NpYWxTaGFyaW5nRGl2ID0gYmxvZ0NhcmQucXVlcnlTZWxlY3RvcignLnNvY2lhbC1zaGFyaW5nJyk7XG4gICAgaWYgKHNvY2lhbFNoYXJpbmdEaXYpIHtcbiAgICAgICAgc29jaWFsU2hhcmluZ0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gLi4uIGV4aXN0aW5nIHNvY2lhbCBzaGFyaW5nIGNsaWNrIGxvZ2ljIC4uLlxuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaGFyZS1idXR0b24nKTtcbiAgICAgICAgICAgIGlmICghYnV0dG9uKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgYmFzZVBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyaW5nKDAsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5sYXN0SW5kZXhPZignLycpICsgMSk7XG4gICAgICAgICAgICBjb25zdCByZWxhdGl2ZVVybCA9IGJ1dHRvbi5kYXRhc2V0LnVybCA/IGRlY29kZVVSSUNvbXBvbmVudChidXR0b24uZGF0YXNldC51cmwpIDogYHBvc3QuaHRtbD9pZD0ke3Bvc3QuaWR9YDtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxVcmwgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7YmFzZVBhdGh9JHtyZWxhdGl2ZVVybH1gO1xuICAgICAgICAgICAgY29uc3QgZW5jb2RlZEZ1bGxVcmwgPSBlbmNvZGVVUklDb21wb25lbnQoZnVsbFVybCk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYnV0dG9uLmRhdGFzZXQudGV4dCA/IGRlY29kZVVSSUNvbXBvbmVudChidXR0b24uZGF0YXNldC50ZXh0KSA6IGRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgY29uc3QgZW5jb2RlZFRleHQgPSBlbmNvZGVVUklDb21wb25lbnQodGV4dCk7XG4gICAgICAgICAgICBsZXQgc2hhcmVXaW5kb3dVcmwgPSAnJztcbiAgICAgICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd0d2l0dGVyJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7ZW5jb2RlZFRleHR9JnVybD0ke2VuY29kZWRGdWxsVXJsfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICd0d2l0dGVyLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9MjM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWNlYm9vaycpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtlbmNvZGVkRnVsbFVybH1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnZmFjZWJvb2stc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmtlZGluJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmluZy9zaGFyZS1vZmZzaXRlLz91cmw9JHtlbmNvZGVkRnVsbFVybH1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnbGlua2VkaW4tc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFJFTU9WRUQ6IFNlcGFyYXRlIGV2ZW50IGxpc3RlbmVyIGxvb3AgZm9yIHRhZyBiYWRnZXMgKG5vdyBoYW5kbGVkIGJ5IHN0YW5kYXJkIDxhPiB0YWdzKVxuICAgIHJldHVybiBibG9nQ2FyZDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQ29tbWVudHMgPSBpbml0aWFsaXplQ29tbWVudHM7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkgPSBpbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5O1xuLyoqXG4gKiBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIGJsb2cgcG9zdHNcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRzKCkge1xuICAgIHNldHVwQ29tbWVudFRvZ2dsZXMoKTtcbiAgICBzZXR1cENvbW1lbnRGb3JtcygpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIGEgc3BlY2lmaWMgYmxvZyBwb3N0IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eShwb3N0RWxlbWVudCkge1xuICAgIGNvbnN0IHRvZ2dsZSA9IHBvc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy10b2dnbGUnKTtcbiAgICBjb25zdCBmb3JtID0gcG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtZm9ybScpO1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgICAgc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSk7XG4gICAgfVxuICAgIGlmIChmb3JtKSB7XG4gICAgICAgIHNldHVwQ29tbWVudEZvcm0oZm9ybSk7XG4gICAgfVxufVxuLyoqXG4gKiBTZXQgdXAgY29tbWVudCB0b2dnbGUgYnV0dG9uc1xuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRUb2dnbGVzKCkge1xuICAgIGNvbnN0IGNvbW1lbnRUb2dnbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnRzLXRvZ2dsZScpO1xuICAgIGNvbW1lbnRUb2dnbGVzLmZvckVhY2godG9nZ2xlID0+IHtcbiAgICAgICAgc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSk7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBhIHNpbmdsZSBjb21tZW50IHRvZ2dsZSBidXR0b25cbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSkge1xuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgcG9zdElkID0gdG9nZ2xlLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3N0LWlkJyk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjb21tZW50cy0ke3Bvc3RJZH1gKTtcbiAgICAgICAgaWYgKGNvbW1lbnRzU2VjdGlvbikge1xuICAgICAgICAgICAgY29tbWVudHNTZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgLy8gQ2hhbmdlIGJ1dHRvbiB0ZXh0IGJhc2VkIG9uIHN0YXRlXG4gICAgICAgICAgICBpZiAoY29tbWVudHNTZWN0aW9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPiBIaWRlIENvbW1lbnRzIDxzcGFuIGNsYXNzPVwiY29tbWVudHMtY291bnRcIj4keyhfYSA9IHRvZ2dsZS5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY291bnQnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRleHRDb250ZW50fTwvc3Bhbj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS1jb21tZW50XCI+PC9pPiBDb21tZW50cyA8c3BhbiBjbGFzcz1cImNvbW1lbnRzLWNvdW50XCI+JHsoX2IgPSB0b2dnbGUucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvdW50JykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50ZXh0Q29udGVudH08L3NwYW4+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgY29tbWVudCBmb3Jtc1xuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRGb3JtcygpIHtcbiAgICBjb25zdCBjb21tZW50Rm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudC1mb3JtJyk7XG4gICAgY29tbWVudEZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICAgIHNldHVwQ29tbWVudEZvcm0oZm9ybSk7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBhIHNpbmdsZSBjb21tZW50IGZvcm1cbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50Rm9ybShmb3JtKSB7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAgICAgY29uc3QgY29tbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29tbWVudHMtJHtwb3N0SWR9IC5jb21tZW50cy1saXN0YCk7XG4gICAgICAgIGlmICghY29tbWVudHNDb250YWluZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgY29uc3QgY29tbWVudElucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwiY29tbWVudFwiXScpO1xuICAgICAgICAvLyBDaGVjayBpZiBpbnB1dHMgYXJlIG5vdCBlbXB0eVxuICAgICAgICBpZiAobmFtZUlucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycgfHwgY29tbWVudElucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhZGROZXdDb21tZW50KHBvc3RJZCwgY29tbWVudHNDb250YWluZXIsIG5hbWVJbnB1dC52YWx1ZSwgY29tbWVudElucHV0LnZhbHVlKTtcbiAgICAgICAgLy8gUmVzZXQgZm9ybVxuICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgfSk7XG59XG4vKipcbiAqIEFkZCBhIG5ldyBjb21tZW50IHRvIHRoZSBjb21tZW50cyBsaXN0XG4gKi9cbmZ1bmN0aW9uIGFkZE5ld0NvbW1lbnQocG9zdElkLCBjb21tZW50c0NvbnRhaW5lciwgbmFtZSwgY29tbWVudFRleHQpIHtcbiAgICAvLyBDcmVhdGUgbmV3IGNvbW1lbnRcbiAgICBjb25zdCBuZXdDb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3Q29tbWVudC5jbGFzc05hbWUgPSAnY29tbWVudCc7XG4gICAgLy8gR2V0IGN1cnJlbnQgZGF0ZVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IG5vdy50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgIGRheTogJ251bWVyaWMnXG4gICAgfSk7XG4gICAgLy8gQ29tbWVudCBIVE1MIHN0cnVjdHVyZVxuICAgIG5ld0NvbW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1hdmF0YXJcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtY29udGVudFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LWF1dGhvclwiPiR7bmFtZX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtdGV4dFwiPiR7Y29tbWVudFRleHR9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LWRhdGVcIj4ke2RhdGVTdHJ9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIC8vIFJlbW92ZSBcIm5vIGNvbW1lbnRzIHlldFwiIG1lc3NhZ2UgaWYgaXQgZXhpc3RzXG4gICAgY29uc3Qgbm9Db21tZW50cyA9IGNvbW1lbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5uby1jb21tZW50cycpO1xuICAgIGlmIChub0NvbW1lbnRzKSB7XG4gICAgICAgIGNvbW1lbnRzQ29udGFpbmVyLnJlbW92ZUNoaWxkKG5vQ29tbWVudHMpO1xuICAgIH1cbiAgICAvLyBBZGQgdGhlIG5ldyBjb21tZW50IHRvIHRoZSB0b3Agb2YgdGhlIGxpc3RcbiAgICBjb21tZW50c0NvbnRhaW5lci5pbnNlcnRCZWZvcmUobmV3Q29tbWVudCwgY29tbWVudHNDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgLy8gVXBkYXRlIGNvbW1lbnQgY291bnRcbiAgICB1cGRhdGVDb21tZW50Q291bnQocG9zdElkKTtcbn1cbi8qKlxuICogVXBkYXRlIHRoZSBjb21tZW50IGNvdW50IGZvciBhIHBvc3RcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQ29tbWVudENvdW50KHBvc3RJZCkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBjb3VudFNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBidXR0b25bZGF0YS1wb3N0LWlkPVwiJHtwb3N0SWR9XCJdIC5jb21tZW50cy1jb3VudGApO1xuICAgIGlmIChjb3VudFNwYW4pIHtcbiAgICAgICAgbGV0IGNvdW50ID0gcGFyc2VJbnQoKChfYSA9IGNvdW50U3Bhbi50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2UoL1soKV0vZywgJycpKSB8fCAnMCcpICsgMTtcbiAgICAgICAgY291bnRTcGFuLnRleHRDb250ZW50ID0gYCgke2NvdW50fSlgO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2NvbXBvbmVudHMvY29udGFjdC50cyAoRXhhbXBsZSlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbnRhY3RGb3JtID0gaW5pdGlhbGl6ZUNvbnRhY3RGb3JtO1xuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgY29udGFjdCBmb3JtIHBvcHVwIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDb250YWN0Rm9ybSgpIHtcbiAgICBjb25zdCBjb250YWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtYnRuJyk7XG4gICAgY29uc3QgY29udGFjdFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtcG9wdXAnKTtcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGNvbnRhY3RQb3B1cCA9PT0gbnVsbCB8fCBjb250YWN0UG9wdXAgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRhY3RQb3B1cC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtcG9wdXAnKTtcbiAgICBjb25zdCBjb250YWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWZvcm0nKTtcbiAgICBpZiAoIWNvbnRhY3RCdXR0b24gfHwgIWNvbnRhY3RQb3B1cCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnRhY3QgYnV0dG9uIG9yIHBvcHVwIGVsZW1lbnQgbm90IGZvdW5kLiBDYW5ub3QgaW5pdGlhbGl6ZSBjb250YWN0IGZvcm0uJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gLS0tIE9wZW4gUG9wdXAgLS0tXG4gICAgY29udGFjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyA8LS0gQ1JVQ0lBTDogUHJldmVudCBkZWZhdWx0IGxpbmsgbmF2aWdhdGlvblxuICAgICAgICBjb25zb2xlLmxvZygnQ29udGFjdCBidXR0b24gY2xpY2tlZCwgb3BlbmluZyBwb3B1cC4nKTtcbiAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTsgLy8gQ2hhbmdlZCBmcm9tICd2aXNpYmxlJyB0byAnb3BlbidcbiAgICB9KTtcbiAgICAvLyAtLS0gQ2xvc2UgUG9wdXAgLS0tXG4gICAgaWYgKGNsb3NlQnV0dG9uKSB7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTsgLy8gQ2hhbmdlZCBmcm9tICd2aXNpYmxlJyB0byAnb3BlbidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIENsb3NlIHBvcHVwIGlmIGNsaWNraW5nIG91dHNpZGUgdGhlIGNvbnRlbnQgYXJlYVxuICAgIGNvbnRhY3RQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBjb250YWN0UG9wdXApIHtcbiAgICAgICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7IC8vIENoYW5nZWQgZnJvbSAndmlzaWJsZScgdG8gJ29wZW4nXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyAtLS0gRm9ybSBTdWJtaXNzaW9uIC0tLVxuICAgIGlmIChjb250YWN0Rm9ybSkge1xuICAgICAgICBjb250YWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb25cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb250YWN0IGZvcm0gc3VibWl0dGVkIChwbGFjZWhvbGRlcikuJyk7XG4gICAgICAgICAgICAvLyBBZGQgeW91ciBmb3JtIHN1Ym1pc3Npb24gbG9naWMgaGVyZSAoZS5nLiwgdXNpbmcgZmV0Y2ggdG8gc2VuZCBkYXRhKVxuICAgICAgICAgICAgLy8gT3B0aW9uYWxseSBjbG9zZSBwb3B1cCBhZnRlciBzdWJtaXNzaW9uXG4gICAgICAgICAgICAvLyBjb250YWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpOyBcbiAgICAgICAgICAgIGFsZXJ0KCdDb250YWN0IGZvcm0gc3VibWlzc2lvbiBub3QgaW1wbGVtZW50ZWQgeWV0LicpOyAvLyBQbGFjZWhvbGRlciBmZWVkYmFja1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ0NvbnRhY3QgZm9ybSBpbml0aWFsaXplZC4nKTtcbn1cbi8vIEVuc3VyZSB5b3VyIENTUyBoYW5kbGVzIHRoZSAub3BlbiBjbGFzcyBmb3IgdGhlICNjb250YWN0LXBvcHVwXG4vLyBlLmcuLFxuLy8gLnBvcHVwIHsgZGlzcGxheTogbm9uZTsgLyogSGlkZGVuIGJ5IGRlZmF1bHQgKi8gfVxuLy8gLnBvcHVwLm9wZW4geyBkaXNwbGF5OiBibG9jazsgLyogT3IgZmxleCwgZ3JpZCwgZXRjLiAqLyB9XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIERhcmsgbW9kZSBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVEYXJrTW9kZSA9IGluaXRpYWxpemVEYXJrTW9kZTtcbmV4cG9ydHMuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UgPSBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZTtcbi8qKlxuICogSW5pdGlhbGl6ZSBkYXJrIG1vZGUgdG9nZ2xlXG4gKiBUaGlzIGNyZWF0ZXMgYSBmbG9hdGluZyBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvbiBhbmQgYWRkcyBpdCB0byB0aGUgRE9NXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVEYXJrTW9kZSgpIHtcbiAgICAvLyBDcmVhdGUgZGFyayBtb2RlIHRvZ2dsZSBidXR0b25cbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmNsYXNzTmFtZSA9ICdkYXJrLW1vZGUtdG9nZ2xlJztcbiAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nOyAvLyBNb29uIGljb25cbiAgICBkYXJrTW9kZVRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVG9nZ2xlIERhcmsgTW9kZScpO1xuICAgIC8vIENoZWNrIGlmIGRhcmsgbW9kZSBwcmVmZXJlbmNlIGlzIGFscmVhZHkgc2V0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09ICd0cnVlJztcbiAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uIGZvciBsaWdodCBtb2RlXG4gICAgfVxuICAgIC8vIEFkZCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgIGRhcmtNb2RlVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRGFya01vZGUpO1xuICAgIC8vIEFkZCBidXR0b24gdG8gdGhlIERPTVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGFya01vZGVUb2dnbGUpO1xufVxuLyoqXG4gKiBUb2dnbGUgZGFyayBtb2RlIG9uIGFuZCBvZmZcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlRGFya01vZGUoKSB7XG4gICAgY29uc3QgaXNEYXJrTW9kZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyay1tb2RlJyk7XG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1tb2RlLXRvZ2dsZScpO1xuICAgIC8vIFVwZGF0ZSBpY29uIGJhc2VkIG9uIG1vZGVcbiAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgaWYgKGlzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvbiBmb3IgZGFyayBtb2RlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU2F2ZSBwcmVmZXJlbmNlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCBpc0RhcmtNb2RlLnRvU3RyaW5nKCkpO1xufVxuLyoqXG4gKiBDaGVjayBpZiB1c2VyIGhhcyBzeXN0ZW0gZGFyayBtb2RlIHByZWZlcmVuY2VcbiAqIElmIHRoZXkgZG8gYW5kIHdlIGhhdmVuJ3Qgc2V0IGEgcHJlZmVyZW5jZSB5ZXQsIGFwcGx5IGRhcmsgbW9kZVxuICovXG5mdW5jdGlvbiBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSgpIHtcbiAgICAvLyBPbmx5IGNoZWNrIGlmIHVzZXIgaGFzbid0IGV4cGxpY2l0bHkgc2V0IGEgcHJlZmVyZW5jZVxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwcmVmZXJzRGFya01vZGUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgICAgIGlmIChwcmVmZXJzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgICAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgICAgICAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvY29tcG9uZW50cy9oZWFkZXIudHNcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVuZGVySGVhZGVyID0gcmVuZGVySGVhZGVyO1xuLyoqXG4gKiBIZWFkZXIgQ29tcG9uZW50XG4gKiBSZW5kZXJzIHRoZSBoZWFkZXIgc2VjdGlvbiBpbnRvIGEgdGFyZ2V0IGNvbnRhaW5lci5cbiAqIEV2ZW50IGxpc3RlbmVycyBzaG91bGQgYmUgYXR0YWNoZWQgc2VwYXJhdGVseSBhZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24uXG4gKiBAcGFyYW0gY29udGFpbmVySWQgLSBUaGUgSUQgb2YgdGhlIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBoZWFkZXIgaW50by4gRGVmYXVsdHMgdG8gJ2hlYWRlci1wbGFjZWhvbGRlcicuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckhlYWRlcihjb250YWluZXJJZCA9ICdoZWFkZXItcGxhY2Vob2xkZXInKSB7XG4gICAgLy8gRW5zdXJlIHJ1bm5pbmcgaW4gYSBicm93c2VyIGVudmlyb25tZW50XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXJJZCk7XG4gICAgaWYgKCFoZWFkZXJDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgSGVhZGVyIGNvbnRhaW5lciB3aXRoIElEICcke2NvbnRhaW5lcklkfScgbm90IGZvdW5kIGluIHRoZSBET00uYCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gLS0tIERldGVybWluZSBCYXNlIFBhdGggYmFzZWQgb24gRW52aXJvbm1lbnQgLS0tXG4gICAgLy8gQ2hlY2tzIGlmIHJ1bm5pbmcgb24gdGhlIHByb2R1Y3Rpb24gY3VzdG9tIGRvbWFpbiByb290IG9yIGdpdGh1Yi5pb1xuICAgIC8vIEFkanVzdCAnbm9lbHVnd29rZS5jb20nIGlmIHlvdXIgYWN0dWFsIHByb2R1Y3Rpb24gaG9zdG5hbWUgZGlmZmVyc1xuICAgIGNvbnN0IGlzUHJvZHVjdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ25vZWx1Z3dva2UuY29tJyB8fCB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUuZW5kc1dpdGgoJy5naXRodWIuaW8nKTtcbiAgICAvLyBEZWZpbmUgdGhlIGJhc2UgcGF0aCBmb3IgbGlua3MuIEFzc3VtZXMgZGVwbG95bWVudCBpcyB1bmRlciAvYmxvZy8gb24gcHJvZHVjdGlvbi5cbiAgICAvLyAqKiogSU1QT1JUQU5UOiBDaGFuZ2UgJy9ibG9nLycgaWYgeW91ciBHaXRIdWIgcmVwbyBuYW1lIChhbmQgdGh1cyBzdWJkaXJlY3RvcnkpIGlzIGRpZmZlcmVudCAqKipcbiAgICBjb25zdCBiYXNlUGF0aCA9IGlzUHJvZHVjdGlvbiA/ICcvYmxvZy8nIDogJy8nO1xuICAgIC8vIC0tLSBFbmQgQmFzZSBQYXRoIExvZ2ljIC0tLVxuICAgIC8vIERlZmluZSB0aGUgaGVhZGVyIEhUTUwgc3RydWN0dXJlIHVzaW5nIHRoZSBiYXNlUGF0aCBmb3IgbGlua3NcbiAgICBoZWFkZXJDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwic2l0ZS1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxoMT48YSBocmVmPVwiJHtiYXNlUGF0aH1cIj5CbG9nPC9hPjwvaDE+IFxuICAgICAgICAgICAgPG5hdj5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiJHtiYXNlUGF0aH1cIj5Ib21lPC9hPjwvbGk+IFxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiR7YmFzZVBhdGh9I2Fib3V0XCIgaWQ9XCJhYm91dC1idG5cIj5BYm91dDwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiR7YmFzZVBhdGh9I3BvcnRmb2xpb1wiPlBvcnRmb2xpbzwvYT48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIGFydGljbGVzLi4uXCIgY2xhc3M9XCJzZWFyY2gtYmFyXCI+IFxuICAgICAgICA8L2hlYWRlcj5cbiAgICBgO1xuICAgIC8vIEV2ZW50IGxpc3RlbmVycyBzaG91bGQgYmUgY2FsbGVkICphZnRlciogcmVuZGVySGVhZGVyIGlzIGV4ZWN1dGVkLlxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIE5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVOYXZpZ2F0aW9uID0gaW5pdGlhbGl6ZU5hdmlnYXRpb247XG4vKipcbiAqIEluaXRpYWxpemUgbmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVOYXZpZ2F0aW9uKCkge1xuICAgIHNldEFjdGl2ZU5hdkxpbmsoKTtcbiAgICBzZXR1cE5hdkxpbmtzKCk7XG59XG4vKipcbiAqIFNldCBhY3RpdmUgbmF2aWdhdGlvbiBsaW5rIGJhc2VkIG9uIGN1cnJlbnQgVVJMIG9yIHBhZ2Ugc2VjdGlvblxuICovXG5mdW5jdGlvbiBzZXRBY3RpdmVOYXZMaW5rKCkge1xuICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgJyNob21lJztcbiAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKGN1cnJlbnRQYXRoKTtcbn1cbi8qKlxuICogU2V0dXAgY2xpY2sgaGFuZGxlcnMgZm9yIG5hdmlnYXRpb24gbGlua3NcbiAqL1xuZnVuY3Rpb24gc2V0dXBOYXZMaW5rcygpIHtcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgIGlmIChocmVmKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlQWN0aXZlTmF2TGluayhocmVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZXMgZm9yIHBvcHVwIGxpbmtzXG4gICAgY29uc3QgYWJvdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtYnRuJyk7XG4gICAgY29uc3QgY29udGFjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWJ0bicpO1xuICAgIGlmIChhYm91dEJ0bikge1xuICAgICAgICBhYm91dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoJyNhYm91dCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGNvbnRhY3RCdG4pIHtcbiAgICAgICAgY29udGFjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoJyNjb250YWN0Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogVXBkYXRlIHRoZSBhY3RpdmUgbmF2aWdhdGlvbiBsaW5rXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCBvciBzZWN0aW9uIElEIHRvIGFjdGl2YXRlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZU5hdkxpbmsocGF0aCkge1xuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgbGlua3NcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIG1hdGNoaW5nIGxpbmtcbiAgICBjb25zdCBhY3RpdmVMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaGVhZGVyIG5hdiB1bCBsaSBhW2hyZWY9XCIke3BhdGh9XCJdYCk7XG4gICAgaWYgKGFjdGl2ZUxpbmspIHtcbiAgICAgICAgYWN0aXZlTGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVBhZ2luYXRpb24gPSBpbml0aWFsaXplUGFnaW5hdGlvbjtcbi8vIFBhZ2luYXRpb24gZnVuY3Rpb25hbGl0eVxuY29uc3QgY29tbWVudHNfMSA9IHJlcXVpcmUoXCIuL2NvbW1lbnRzXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplIHBhZ2luYXRpb24gZnVuY3Rpb25hbGl0eSB3aXRoIExvYWQgTW9yZSBidXR0b25cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVBhZ2luYXRpb24oKSB7XG4gICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgIGNvbnN0IGhpZGRlblBvc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbi1wb3N0cycpO1xuICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNhcmRzJyk7XG4gICAgaWYgKCFsb2FkTW9yZUJ0biB8fCAhaGlkZGVuUG9zdHMgfHwgIWJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1BhZ2luYXRpb24gZWxlbWVudHMgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgY3VycmVudFBhZ2UgPSAxO1xuICAgIGNvbnN0IHBvc3RzUGVyUGFnZSA9IDM7XG4gICAgY29uc3QgdG90YWxIaWRkZW5Qb3N0cyA9IGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAvLyBIaWRlIGxvYWQgbW9yZSBidXR0b24gaWYgbm8gaGlkZGVuIHBvc3RzXG4gICAgaWYgKHRvdGFsSGlkZGVuUG9zdHMgPT09IDApIHtcbiAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gICAgLy8gU2V0IHVwIGxvYWQgbW9yZSBidXR0b24gY2xpY2sgaGFuZGxlclxuICAgIGxvYWRNb3JlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsb2FkTW9yZVBvc3RzKGxvYWRNb3JlQnRuLCBoaWRkZW5Qb3N0cywgYmxvZ0NhcmRzQ29udGFpbmVyLCBjdXJyZW50UGFnZSwgcG9zdHNQZXJQYWdlKTtcbiAgICAgICAgY3VycmVudFBhZ2UrKztcbiAgICB9KTtcbiAgICAvLyBJbml0aWFsaXplIHNjcm9sbC1iYXNlZCBsb2FkaW5nIChpbmZpbml0ZSBzY3JvbGwpXG4gICAgaW5pdGlhbGl6ZUluZmluaXRlU2Nyb2xsKGxvYWRNb3JlQnRuKTtcbn1cbi8qKlxuICogTG9hZCBtb3JlIHBvc3RzIHdoZW4gdGhlIGxvYWQgbW9yZSBidXR0b24gaXMgY2xpY2tlZFxuICovXG5mdW5jdGlvbiBsb2FkTW9yZVBvc3RzKGxvYWRNb3JlQnRuLCBoaWRkZW5Qb3N0cywgYmxvZ0NhcmRzQ29udGFpbmVyLCBjdXJyZW50UGFnZSwgcG9zdHNQZXJQYWdlKSB7XG4gICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xuICAgIGxvYWRNb3JlQnRuLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNwaW5uZXJcIj48L3NwYW4+IExvYWRpbmcuLi4nO1xuICAgIC8vIFNpbXVsYXRlIGxvYWRpbmcgZGVsYXkgZm9yIGJldHRlciBVWFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggcG9zdHMgdG8gbG9hZFxuICAgICAgICBjb25zdCBzdGFydElkeCA9IChjdXJyZW50UGFnZSAtIDEpICogcG9zdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCBlbmRJZHggPSBNYXRoLm1pbihzdGFydElkeCArIHBvc3RzUGVyUGFnZSwgaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICAgICAgbGV0IHBvc3RzTG9hZGVkID0gMDtcbiAgICAgICAgLy8gQ2xvbmUgYW5kIG1vdmUgcG9zdHMgZnJvbSBoaWRkZW4gY29udGFpbmVyIHRvIHZpc2libGUgYmxvZyBjYXJkc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc3RzUGVyUGFnZSAmJiBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGggPiAwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RUb0FkZCA9IGhpZGRlblBvc3RzLmNoaWxkcmVuWzBdOyAvLyBBbHdheXMgdGFrZSB0aGUgZmlyc3QgZWxlbWVudFxuICAgICAgICAgICAgaWYgKHBvc3RUb0FkZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lZFBvc3QgPSBwb3N0VG9BZGQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgICAgIGNsb25lZFBvc3QuY2xhc3NMaXN0LmFkZCgnbmV3Jyk7IC8vIEFkZCBjbGFzcyBmb3IgYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZFBvc3QpO1xuICAgICAgICAgICAgICAgIGhpZGRlblBvc3RzLnJlbW92ZUNoaWxkKHBvc3RUb0FkZCk7XG4gICAgICAgICAgICAgICAgcG9zdHNMb2FkZWQrKztcbiAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBuZXcgcG9zdHNcbiAgICAgICAgICAgICAgICAoMCwgY29tbWVudHNfMS5pbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5KShjbG9uZWRQb3N0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayBpZiB3ZSd2ZSBsb2FkZWQgYWxsIHBvc3RzXG4gICAgICAgIGlmIChoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVzZXQgYnV0dG9uIHN0YXRlXG4gICAgICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgICAgICAgbG9hZE1vcmVCdG4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+IExvYWQgTW9yZSBQb3N0cyc7XG4gICAgICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudCB3aGVuIHBvc3RzIGFyZSBsb2FkZWRcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Bvc3RzTG9hZGVkJywgeyBkZXRhaWw6IHsgY291bnQ6IHBvc3RzTG9hZGVkIH0gfSk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0sIDgwMCk7IC8vIFNpbXVsYXRlIG5ldHdvcmsgZGVsYXlcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBpbmZpbml0ZSBzY3JvbGwgZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplSW5maW5pdGVTY3JvbGwobG9hZE1vcmVCdG4pIHtcbiAgICBsZXQgc2Nyb2xsVGltZW91dDtcbiAgICBsZXQgaXNMb2FkaW5nTW9yZVBvc3RzID0gZmFsc2U7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBoaWRkZW4gKGFsbCBwb3N0cyBsb2FkZWQpIG9yIGFscmVhZHkgaW4gbG9hZGluZyBzdGF0ZSwgZG8gbm90aGluZ1xuICAgICAgICBpZiAobG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnIHx8XG4gICAgICAgICAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ2xvYWRpbmcnKSB8fFxuICAgICAgICAgICAgaXNMb2FkaW5nTW9yZVBvc3RzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVvdXQpO1xuICAgICAgICBzY3JvbGxUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzY3JvbGxUb3AsIHNjcm9sbEhlaWdodCwgY2xpZW50SGVpZ2h0IH0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICAvLyBXaGVuIHVzZXIgc2Nyb2xscyB0byBib3R0b20gKHdpdGggc29tZSBidWZmZXIpXG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0ID49IHNjcm9sbEhlaWdodCAtIDIwMCkge1xuICAgICAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBmbGFnIGFmdGVyIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nTW9yZVBvc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9jb21wb25lbnRzL3NlYXJjaC50c1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplU2VhcmNoID0gaW5pdGlhbGl6ZVNlYXJjaDtcbi8vIE5vdGU6IGZldGNoQmxvZ1Bvc3RzIGFuZCBjcmVhdGVCbG9nQ2FyZEVsZW1lbnQgaW1wb3J0cyBtaWdodCBub3QgYmUgbmVlZGVkIFxuLy8gaWYgdGhpcyBzY3JpcHQgb25seSBmaWx0ZXJzIGFscmVhZHkgcmVuZGVyZWQgY2FyZHMuIFJlbW92ZWQgdGhlbSBmb3Igbm93LlxuLy8gaW1wb3J0IHsgZmV0Y2hCbG9nUG9zdHMgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGknOyBcbi8vIGltcG9ydCB7IGNyZWF0ZUJsb2dDYXJkRWxlbWVudCB9IGZyb20gJy4vYmxvZ0NhcmRzJztcbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBzaW1wbGUsIGNsaWVudC1zaWRlIHNlYXJjaCBmdW5jdGlvbmFsaXR5IGZvciBibG9nIHBvc3RzLlxuICogRmlsdGVycyBjdXJyZW50bHkgdmlzaWJsZSBibG9nIGNhcmRzIG9uIHRoZSBwYWdlIGFzIHRoZSB1c2VyIHR5cGVzLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplU2VhcmNoKCkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWJhcicpO1xuICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nLmJsb2ctY2FyZHMnKTsgLy8gVGFyZ2V0IHRoZSBtYWluIGNvbnRhaW5lclxuICAgIGlmICghc2VhcmNoQmFyIHx8ICFibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdTZWFyY2ggYmFyICguc2VhcmNoLWJhcikgb3IgYmxvZyBjYXJkcyBjb250YWluZXIgKCNibG9nLmJsb2ctY2FyZHMpIG5vdCBmb3VuZC4gU2VhcmNoIG5vdCBpbml0aWFsaXplZC4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgYSBzZWFyY2ggaW5kaWNhdG9yIGVsZW1lbnQgKG9wdGlvbmFsKVxuICAgIGNvbnN0IHNlYXJjaEluZGljYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlYXJjaEluZGljYXRvci5jbGFzc05hbWUgPSAnc2VhcmNoLWluZGljYXRvcic7IC8vIEFkZCBjbGFzcyBmb3Igc3R5bGluZ1xuICAgIHNlYXJjaEluZGljYXRvci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTsgLy8gQW5ub3VuY2UgY2hhbmdlcyB0byBzY3JlZW4gcmVhZGVyc1xuICAgIHNlYXJjaEluZGljYXRvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyAvLyBTdGFydCBoaWRkZW5cbiAgICAvLyBJbnNlcnQgdGhlIGluZGljYXRvciBiZWZvcmUgdGhlIGJsb2cgY2FyZHMgY29udGFpbmVyXG4gICAgKF9hID0gYmxvZ0NhcmRzQ29udGFpbmVyLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbnNlcnRCZWZvcmUoc2VhcmNoSW5kaWNhdG9yLCBibG9nQ2FyZHNDb250YWluZXIpO1xuICAgIC8vIE9wdGlvbmFsOiBXcmFwIHNlYXJjaCBiYXIgZm9yIHN0eWxpbmcgb3IgYWRkaW5nIGNsZWFyIGJ1dHRvbiAoaWYgbm90IGFscmVhZHkgZG9uZSlcbiAgICAvLyBUaGlzIGV4YW1wbGUgYXNzdW1lcyB0aGUgc2VhcmNoIGJhciBpcyBhbHJlYWR5IHBsYWNlZCBjb3JyZWN0bHkgaW4gdGhlIGhlYWRlciBIVE1MXG4gICAgLy8gS2VlcCB0cmFjayBvZiBhbGwgYmxvZyBjYXJkcyAtIHdpbGwgYmUgcG9wdWxhdGVkIG9uIGZpcnN0IGZpbHRlclxuICAgIGxldCBhbGxDYXJkcyA9IFtdO1xuICAgIC8vIEhhbmRsZSBzZWFyY2ggaW5wdXQgd2l0aCBkZWJvdW5jZVxuICAgIGxldCBkZWJvdW5jZVRpbWVyO1xuICAgIHNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHNlYXJjaEJhci52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgLy8gRGVib3VuY2UgdGhlIGZpbHRlcmluZ1xuICAgICAgICBjbGVhclRpbWVvdXQoZGVib3VuY2VUaW1lcik7XG4gICAgICAgIGRlYm91bmNlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZpbHRlckJsb2dDYXJkcyhzZWFyY2hUZXJtKTtcbiAgICAgICAgfSwgMzAwKTsgLy8gMzAwbXMgZGVsYXlcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBGaWx0ZXJzIGJsb2cgY2FyZHMgYmFzZWQgb24gc2VhcmNoIHRlcm0gYnkgYWRkaW5nL3JlbW92aW5nIGEgQ1NTIGNsYXNzLlxuICAgICAqIEBwYXJhbSB0ZXJtIC0gVGhlIHNlYXJjaCB0ZXJtIChsb3dlcmNhc2UpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbHRlckJsb2dDYXJkcyh0ZXJtKSB7XG4gICAgICAgIC8vIEdldCBhbGwgY2FyZHMgY3VycmVudGx5IGluIHRoZSBtYWluIGNvbnRhaW5lciBPUiBoaWRkZW4gY29udGFpbmVyIGlmIHRoZXkgZXhpc3RcbiAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHdlIGZpbHRlciBldmVyeXRoaW5nLCBldmVuIHBhZ2luYXRlZCBpdGVtcyBpZiB0aGV5IGFyZSBpbiB0aGUgRE9NXG4gICAgICAgIC8vIElmIHBhZ2luYXRpb24gcmVtb3ZlcyBpdGVtcyBmcm9tIERPTSwgdGhpcyBuZWVkcyBhZGp1c3RtZW50LlxuICAgICAgICBpZiAoYWxsQ2FyZHMubGVuZ3RoID09PSAwKSB7IC8vIFBvcHVsYXRlIG9uIGZpcnN0IHJ1biBvciBpZiBjbGVhcmVkXG4gICAgICAgICAgICBhbGxDYXJkcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2Jsb2cuYmxvZy1jYXJkcyAuYmxvZy1jYXJkLCAjaGlkZGVuLXBvc3RzIC5ibG9nLWNhcmQnKSk7XG4gICAgICAgICAgICBpZiAoYWxsQ2FyZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBibG9nIGNhcmRzIGZvdW5kIHRvIGZpbHRlci5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBObyBjYXJkcyByZW5kZXJlZCB5ZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTZWFyY2ggZmlsdGVyaW5nIGluaXRpYWxpemVkIHdpdGggJHthbGxDYXJkcy5sZW5ndGh9IGNhcmRzLmApO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2aXNpYmxlQ291bnQgPSAwO1xuICAgICAgICBhbGxDYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGxldCBtYXRjaGVzU2VhcmNoID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXRlcm0pIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBubyBzZWFyY2ggdGVybSwgc2hvdyBhbGwgY2FyZHNcbiAgICAgICAgICAgICAgICBtYXRjaGVzU2VhcmNoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0ZXh0IGNvbnRlbnQgZnJvbSBpbXBvcnRhbnQgZWxlbWVudHMgd2l0aGluIHRoZSBjYXJkXG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSAoKF9iID0gKF9hID0gY2FyZC5xdWVyeVNlbGVjdG9yKCdoMycpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGV4dENvbnRlbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b0xvd2VyQ2FzZSgpKSB8fCAnJztcbiAgICAgICAgICAgICAgICAvLyBBZGQgb3RoZXIgc2VhcmNoYWJsZSBmaWVsZHMgaWYgbmVlZGVkIChlLmcuLCBleGNlcnB0LCBhdXRob3IpXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgZXhjZXJwdCA9IGNhcmQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZC1leGNlcnB0Jyk/LnRleHRDb250ZW50Py50b0xvd2VyQ2FzZSgpIHx8ICcnOyBcbiAgICAgICAgICAgICAgICBjb25zdCB0YWdzID0gQXJyYXkuZnJvbShjYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWctYmFkZ2UnKSkgLy8gQXNzdW1lcyB0YWdzIGFyZSByZW5kZXJlZFxuICAgICAgICAgICAgICAgICAgICAubWFwKHRhZyA9PiB7IHZhciBfYTsgcmV0dXJuICgoX2EgPSB0YWcudGV4dENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0xvd2VyQ2FzZSgpKSB8fCAnJzsgfSk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNhcmQgbWF0Y2hlcyB0aGUgc2VhcmNoIHRlcm1cbiAgICAgICAgICAgICAgICBtYXRjaGVzU2VhcmNoID1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGUuaW5jbHVkZXModGVybSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4Y2VycHQuaW5jbHVkZXModGVybSkgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzLnNvbWUodGFnID0+IHRhZy5pbmNsdWRlcyh0ZXJtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTaG93IG9yIGhpZGUgdGhlIGNhcmQgdXNpbmcgQ1NTIGNsYXNzXG4gICAgICAgICAgICBpZiAobWF0Y2hlc1NlYXJjaCkge1xuICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuLWJ5LXNlYXJjaCcpO1xuICAgICAgICAgICAgICAgIHZpc2libGVDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4tYnktc2VhcmNoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBTaG93L0hpZGUvVXBkYXRlIHRoZSBzZWFyY2ggaW5kaWNhdG9yIHRleHRcbiAgICAgICAgaWYgKHRlcm0pIHtcbiAgICAgICAgICAgIHNlYXJjaEluZGljYXRvci50ZXh0Q29udGVudCA9IHZpc2libGVDb3VudCA+IDBcbiAgICAgICAgICAgICAgICA/IGBTaG93aW5nICR7dmlzaWJsZUNvdW50fSByZXN1bHQke3Zpc2libGVDb3VudCA+IDEgPyAncycgOiAnJ30gZm9yIFwiJHt0ZXJtfVwiYFxuICAgICAgICAgICAgICAgIDogYE5vIHJlc3VsdHMgZm91bmQgZm9yIFwiJHt0ZXJtfVwiYDtcbiAgICAgICAgICAgIHNlYXJjaEluZGljYXRvci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlYXJjaEluZGljYXRvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyAvLyBIaWRlIGluZGljYXRvciBpZiBzZWFyY2ggaXMgY2xlYXJlZFxuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSBcIk5vIHJlc3VsdHNcIiBtZXNzYWdlIHNwZWNpZmljYWxseSB3aXRoaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICBjb25zdCBub1Jlc3VsdHNNZXNzYWdlID0gYmxvZ0NhcmRzQ29udGFpbmVyID09PSBudWxsIHx8IGJsb2dDYXJkc0NvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmxvZ0NhcmRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5uby1zZWFyY2gtcmVzdWx0cy1tZXNzYWdlJyk7XG4gICAgICAgIGlmICh2aXNpYmxlQ291bnQgPT09IDAgJiYgdGVybSkge1xuICAgICAgICAgICAgaWYgKCFub1Jlc3VsdHNNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2xhc3NOYW1lID0gJ2VtcHR5LXN0YXRlIG5vLXNlYXJjaC1yZXN1bHRzLW1lc3NhZ2UnOyAvLyBVc2UgZXhpc3RpbmcgZW1wdHktc3RhdGUgc3R5bGluZ1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zZWFyY2ggZmEtM3hcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxoMz5ObyBtYXRjaGluZyBwb3N0cyBmb3VuZDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwPlRyeSBkaWZmZXJlbnQga2V5d29yZHMuPC9wPiBcbiAgICAgICAgICAgICAgICBgOyAvLyBSZW1vdmVkIGNsZWFyIGJ1dHRvbiBoZXJlLCBFc2NhcGUga2V5IHdvcmtzXG4gICAgICAgICAgICAgICAgLy8gaWYgKGJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIC8vICAgICBibG9nQ2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vUmVzdWx0c01lc3NhZ2UpIHtcbiAgICAgICAgICAgIG5vUmVzdWx0c01lc3NhZ2UucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3B0aW9uYWw6IERpc3BhdGNoIGV2ZW50IGZvciBwYWdpbmF0aW9uIHRvIHBvdGVudGlhbGx5IHJlc2V0L3VwZGF0ZVxuICAgICAgICAvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc2VhcmNoQXBwbGllZCcsIHsgZGV0YWlsOiB7IHZpc2libGVDb3VudCB9IH0pKTtcbiAgICB9XG4gICAgLy8gQWRkIGtleWJvYXJkIG5hdmlnYXRpb24gKEVzY2FwZSBrZXkgdG8gY2xlYXIpXG4gICAgc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHNlYXJjaEJhci52YWx1ZSA9ICcnOyAvLyBDbGVhciBpbnB1dFxuICAgICAgICAgICAgZmlsdGVyQmxvZ0NhcmRzKCcnKTsgLy8gUmUtZmlsdGVyIHdpdGggZW1wdHkgdGVybVxuICAgICAgICAgICAgc2VhcmNoQmFyLmJsdXIoKTsgLy8gUmVtb3ZlIGZvY3VzXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZygnU2VhcmNoIGZ1bmN0aW9uYWxpdHkgaW5pdGlhbGl6ZWQuJyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQmxvZ0Zyb250ZW5kID0gaW5pdGlhbGl6ZUJsb2dGcm9udGVuZDtcbi8qKlxuICogQmxvZyBGcm9udGVuZCBDb250cm9sbGVyXG4gKiBDbGllbnQtc2lkZSBjb250cm9sbGVyIHRoYXQgaGFuZGxlcyBhbGwgZnJvbnRlbmQgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGJsb2cgaG9tZXBhZ2UuXG4gKiBNYW5hZ2VzIFVJIGluaXRpYWxpemF0aW9uLCBwb3N0IHJlbmRlcmluZywgZmlsdGVyaW5nLCBhbmQgdXNlciBpbnRlcmFjdGlvbnMuXG4gKi9cbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTsgLy8gVXNlcyBzdGF0aWMgZmV0Y2ggbm93XG5jb25zdCBibG9nQ2FyZHNfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Jsb2dDYXJkc1wiKTtcbmNvbnN0IGNvbnRhY3RfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2NvbnRhY3RcIik7XG5jb25zdCBwYWdpbmF0aW9uXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9wYWdpbmF0aW9uXCIpO1xuY29uc3Qgc2VhcmNoXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9zZWFyY2hcIik7XG5jb25zdCBhYm91dF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYWJvdXRcIik7XG5jb25zdCBuYXZpZ2F0aW9uXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9uYXZpZ2F0aW9uXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBibG9nIGZyb250ZW5kIGZ1bmN0aW9uYWxpdHkgKGhvbWVwYWdlKVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQmxvZ0Zyb250ZW5kKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgQmxvZyBGcm9udGVuZCBDb250cm9sbGVyLi4uJyk7XG4gICAgICAgICgwLCBuYXZpZ2F0aW9uXzEuaW5pdGlhbGl6ZU5hdmlnYXRpb24pKCk7XG4gICAgICAgICgwLCBjb250YWN0XzEuaW5pdGlhbGl6ZUNvbnRhY3RGb3JtKSgpO1xuICAgICAgICAoMCwgYWJvdXRfMS5pbml0aWFsaXplQWJvdXQpKCk7XG4gICAgICAgICgwLCBzZWFyY2hfMS5pbml0aWFsaXplU2VhcmNoKSgpO1xuICAgICAgICAvLyBJbml0aWFsaXplIHBvc3RzLCB3aGljaCBub3cgaW5jbHVkZXMgZmlsdGVyaW5nIGJhc2VkIG9uIFVSTCBwYXJhbXNcbiAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgICgwLCBwYWdpbmF0aW9uXzEuaW5pdGlhbGl6ZVBhZ2luYXRpb24pKCk7IC8vIEluaXRpYWxpemUgcGFnaW5hdGlvbiBhZnRlciBpbml0aWFsIHBvc3RzIChwb3NzaWJseSBmaWx0ZXJlZCkgYXJlIGxvYWRlZFxuICAgICAgICBzZXR1cEJsb2dDYXJkc0RlbGVnYXRpb24oKTtcbiAgICAgICAgLy8gTGlzdGVuIGZvciBjdXN0b20gZXZlbnQgdG8gcmVsb2FkIHBvc3RzIChlLmcuLCBhZnRlciBzZWFyY2ggb3IgZmlsdGVyIGNoYW5nZSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVsb2FkUG9zdHMnLCBoYW5kbGVSZWxvYWRQb3N0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdCbG9nIEZyb250ZW5kIENvbnRyb2xsZXIgSW5pdGlhbGl6ZWQuJyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEhhbmRsZXMgdGhlIGN1c3RvbSAncmVsb2FkUG9zdHMnIGV2ZW50LiBSZWZldGNoZXMgYW5kIHJlLXJlbmRlcnMgcG9zdHMuXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZVJlbG9hZFBvc3RzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWxvYWRpbmcgcG9zdHMgZHVlIHRvIHJlbG9hZFBvc3RzIGV2ZW50Li4uJyk7XG4gICAgICAgIC8vIFJlLWluaXRpYWxpemUgcG9zdHMsIHdoaWNoIHdpbGwgcGljayB1cCBhbnkgbmV3IFVSTCBwYXJhbWV0ZXJzIChsaWtlIHNlYXJjaCBxdWVyeSBPUiB0YWcpXG4gICAgICAgIHlpZWxkIGluaXRpYWxpemVQb3N0cygpO1xuICAgICAgICAoMCwgcGFnaW5hdGlvbl8xLmluaXRpYWxpemVQYWdpbmF0aW9uKSgpO1xuICAgICAgICBzZXR1cEJsb2dDYXJkc0RlbGVnYXRpb24oKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGV2ZW50IGRlbGVnYXRpb24gZm9yIGJsb2cgY2FyZHMgY29udGFpbmVyXG4gKi9cbmZ1bmN0aW9uIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpIHtcbiAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZy5ibG9nLWNhcmRzJyk7XG4gICAgaWYgKGJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICBibG9nQ2FyZHNDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVCbG9nQ2FyZENsaWNrKTsgLy8gUHJldmVudCBkdXBsaWNhdGVzXG4gICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgICAgICBjb25zb2xlLmxvZygnRXZlbnQgZGVsZWdhdGlvbiBzZXQgdXAgZm9yIC5ibG9nLWNhcmRzJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBmaW5kICNibG9nLmJsb2ctY2FyZHMgY29udGFpbmVyIGZvciBkZWxlZ2F0aW9uLicpO1xuICAgIH1cbn1cbi8qKlxuICogSGFuZGxlIGNsaWNrIGV2ZW50cyBvbiBibG9nIGNhcmRzIGZvciBuYXZpZ2F0aW9uXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUJsb2dDYXJkQ2xpY2soZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgY2FyZCA9IHRhcmdldC5jbG9zZXN0KCcuYmxvZy1jYXJkJyk7XG4gICAgaWYgKGNhcmQpIHtcbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCdidXR0b24sIGEsIGknKSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCdhLnRhZy1iYWRnZScpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrZWQgdGFnIGxpbmssIGFsbG93aW5nIGRlZmF1bHQgbmF2aWdhdGlvbi4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBpbnRlcmFjdGl2ZSBlbGVtZW50IGluc2lkZSBjYXJkLCBwcmV2ZW50aW5nIG5hdmlnYXRpb24uJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zdElkID0gY2FyZC5kYXRhc2V0LnBvc3RJZDtcbiAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYE5hdmlnYXRpbmcgdG8gcG9zdCAke3Bvc3RJZH1gKTtcbiAgICAgICAgICAgIC8vIFVzZSByZWxhdGl2ZSBwYXRoIGZvciBuYXZpZ2F0aW9uXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBwb3N0Lmh0bWw/aWQ9JHtwb3N0SWR9YDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBibG9nIHBvc3RzOiBGZXRjaCwgZmlsdGVyIChiYXNlZCBvbiBVUkwgcGFyYW0pLCBhbmQgcmVuZGVyLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cuYmxvZy1jYXJkcycpO1xuICAgICAgICBpZiAoIWJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQmxvZyBjYXJkcyBjb250YWluZXIgKCNibG9nLmJsb2ctY2FyZHMpIG5vdCBmb3VuZCBpbiB0aGUgRE9NLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIC0tLSBDaGVjayBmb3IgVGFnIEZpbHRlciAtLS1cbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgY29uc3QgdGFnRmlsdGVyID0gdXJsUGFyYW1zLmdldCgndGFnJyk7XG4gICAgICAgIGNvbnN0IGZpbHRlckRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLWRpc3BsYXknKTsgLy8gT3B0aW9uYWwgZWxlbWVudCB0byBzaG93IGZpbHRlclxuICAgICAgICAvLyAtLS0gRGV0ZXJtaW5lIEJhc2UgUGF0aCAobmVlZGVkIGZvciBDbGVhciBGaWx0ZXIgbGluaykgLS0tXG4gICAgICAgIGNvbnN0IGN1cnJlbnRIb3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICAgICAgY29uc3QgaXNQcm9kdWN0aW9uID0gY3VycmVudEhvc3RuYW1lID09PSAnbm9lbHVnd29rZS5jb20nIHx8IGN1cnJlbnRIb3N0bmFtZS5lbmRzV2l0aCgnLmdpdGh1Yi5pbycpO1xuICAgICAgICAvLyAqKiogSU1QT1JUQU5UOiBDaGFuZ2UgJy9ibG9nLycgaWYgeW91ciBHaXRIdWIgcmVwbyBuYW1lL3BhdGggaXMgZGlmZmVyZW50ICoqKlxuICAgICAgICBjb25zdCBiYXNlUGF0aCA9IGlzUHJvZHVjdGlvbiA/ICcvYmxvZy8nIDogJy8nO1xuICAgICAgICAvLyAtLS0gQWRkIExvZ2dpbmcgLS0tXG4gICAgICAgIGNvbnNvbGUubG9nKGBbaW5pdGlhbGl6ZVBvc3RzXSBIb3N0bmFtZTogJHtjdXJyZW50SG9zdG5hbWV9LCBpc1Byb2R1Y3Rpb246ICR7aXNQcm9kdWN0aW9ufSwgYmFzZVBhdGg6ICR7YmFzZVBhdGh9YCk7XG4gICAgICAgIC8vIC0tLSBFbmQgTG9nZ2luZyAtLS1cbiAgICAgICAgLy8gUmVtb3ZlIGFueSBleGlzdGluZyBmaWx0ZXIgaW5kaWNhdG9yIGJlZm9yZSBwb3RlbnRpYWxseSBhZGRpbmcgYSBuZXcgb25lXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nRmlsdGVySW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhZy1maWx0ZXItaW5kaWNhdG9yJyk7XG4gICAgICAgIGlmIChleGlzdGluZ0ZpbHRlckluZGljYXRvcikge1xuICAgICAgICAgICAgZXhpc3RpbmdGaWx0ZXJJbmRpY2F0b3IucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGZpbHRlciBpbmRpY2F0b3IgaWYgdGFnRmlsdGVyIGV4aXN0c1xuICAgICAgICBpZiAodGFnRmlsdGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQXBwbHlpbmcgZmlsdGVyIGZvciB0YWc6IFwiJHt0YWdGaWx0ZXJ9XCJgKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZmlsdGVyQ29udGFpbmVyLmNsYXNzTmFtZSA9ICd0YWctZmlsdGVyLWluZGljYXRvcic7XG4gICAgICAgICAgICAvLyBVc2UgYmFzZVBhdGggZm9yIHRoZSBDbGVhciBmaWx0ZXIgbGluaydzIGhyZWZcbiAgICAgICAgICAgIGZpbHRlckNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8cD5TaG93aW5nIHBvc3RzIHRhZ2dlZCB3aXRoOiA8c3BhbiBjbGFzcz1cImZpbHRlcmVkLXRhZ1wiPiR7dGFnRmlsdGVyfTwvc3Bhbj48L3A+XG4gICAgICAgICAgICA8YSBocmVmPVwiJHtiYXNlUGF0aH1cIiBjbGFzcz1cImNsZWFyLWZpbHRlclwiPkNsZWFyIGZpbHRlcjwvYT4gXG4gICAgICAgIGA7XG4gICAgICAgICAgICBjb25zdCBibG9nU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdibG9nJyk7XG4gICAgICAgICAgICBpZiAoYmxvZ1NlY3Rpb24gPT09IG51bGwgfHwgYmxvZ1NlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJsb2dTZWN0aW9uLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBibG9nU2VjdGlvbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmaWx0ZXJDb250YWluZXIsIGJsb2dTZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWx0ZXJEaXNwbGF5KSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyRGlzcGxheS50ZXh0Q29udGVudCA9IGBTaG93aW5nIHBvc3RzIHRhZ2dlZCB3aXRoOiBcIiR7dGFnRmlsdGVyfVwiYDtcbiAgICAgICAgICAgICAgICBmaWx0ZXJEaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpbHRlckRpc3BsYXkpIHtcbiAgICAgICAgICAgIGZpbHRlckRpc3BsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICAvLyAtLS0gRW5kIENoZWNrIGZvciBUYWcgRmlsdGVyIC0tLVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+PHA+TG9hZGluZyBwb3N0cy4uLjwvcD4nO1xuICAgICAgICAgICAgbGV0IGFsbFBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEZldGNoZWQgJHthbGxQb3N0cy5sZW5ndGh9IHRvdGFsIHBvc3RzLmApO1xuICAgICAgICAgICAgLy8gLS0tIEFwcGx5IFRhZyBGaWx0ZXIgLS0tXG4gICAgICAgICAgICBsZXQgcG9zdHNUb0Rpc3BsYXkgPSBhbGxQb3N0cztcbiAgICAgICAgICAgIGlmICh0YWdGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBwb3N0c1RvRGlzcGxheSA9IGFsbFBvc3RzLmZpbHRlcihwb3N0ID0+IHBvc3QudGFncyAmJiBwb3N0LnRhZ3Muc29tZSh0YWcgPT4gdGFnLnRvTG93ZXJDYXNlKCkgPT09IHRhZ0ZpbHRlci50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZpbHRlcmVkIGRvd24gdG8gJHtwb3N0c1RvRGlzcGxheS5sZW5ndGh9IHBvc3RzIGZvciB0YWc6IFwiJHt0YWdGaWx0ZXJ9XCJgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0tLSBFbmQgQXBwbHkgVGFnIEZpbHRlciAtLS1cbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGlmIChwb3N0c1RvRGlzcGxheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTdGF0ZShibG9nQ2FyZHNDb250YWluZXIsIHRhZ0ZpbHRlciAhPT0gbnVsbCAmJiB0YWdGaWx0ZXIgIT09IHZvaWQgMCA/IHRhZ0ZpbHRlciA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgICAgICAgICAgICAgIGlmIChsb2FkTW9yZUJ0bilcbiAgICAgICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQYWdpbmF0aW9uIGxvZ2ljXG4gICAgICAgICAgICBjb25zdCBpbml0aWFsUG9zdENvdW50ID0gNjtcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlQb3N0cyA9IHBvc3RzVG9EaXNwbGF5LnNsaWNlKDAsIGluaXRpYWxQb3N0Q291bnQpO1xuICAgICAgICAgICAgY29uc3QgaGlkZGVuUG9zdHMgPSBwb3N0c1RvRGlzcGxheS5zbGljZShpbml0aWFsUG9zdENvdW50KTtcbiAgICAgICAgICAgIGRpc3BsYXlQb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2dDYXJkID0gKDAsIGJsb2dDYXJkc18xLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCkocG9zdCk7XG4gICAgICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgaGlkZGVuUG9zdHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLXBvc3RzJyk7XG4gICAgICAgICAgICBpZiAoaGlkZGVuUG9zdHNDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9nQ2FyZCA9ICgwLCBibG9nQ2FyZHNfMS5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQpKHBvc3QpO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChibG9nQ2FyZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBsb2FkTW9yZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLW1vcmUtYnRuJyk7XG4gICAgICAgICAgICBpZiAobG9hZE1vcmVCdG4pIHtcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gaGlkZGVuUG9zdHMubGVuZ3RoID4gMCA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgcG9zdHM6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd0Vycm9yU3RhdGUoYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBTaG93IGVtcHR5IHN0YXRlIHdoZW4gbm8gcG9zdHMgYXJlIGF2YWlsYWJsZVxuICovXG5mdW5jdGlvbiBzaG93RW1wdHlTdGF0ZShjb250YWluZXIsIHRhZ0ZpbHRlcikge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBjb25zdCBlbXB0eVN0YXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW1wdHlTdGF0ZURpdi5jbGFzc05hbWUgPSAnZW1wdHktc3RhdGUnO1xuICAgIC8vIC0tLSBEZXRlcm1pbmUgQmFzZSBQYXRoIChuZWVkZWQgZm9yIFZpZXcgQWxsIGxpbmspIC0tLVxuICAgIGNvbnN0IGN1cnJlbnRIb3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBjb25zdCBpc1Byb2R1Y3Rpb24gPSBjdXJyZW50SG9zdG5hbWUgPT09ICdub2VsdWd3b2tlLmNvbScgfHwgY3VycmVudEhvc3RuYW1lLmVuZHNXaXRoKCcuZ2l0aHViLmlvJyk7XG4gICAgLy8gKioqIElNUE9SVEFOVDogQ2hhbmdlICcvYmxvZy8nIGlmIHlvdXIgR2l0SHViIHJlcG8gbmFtZS9wYXRoIGlzIGRpZmZlcmVudCAqKipcbiAgICBjb25zdCBiYXNlUGF0aCA9IGlzUHJvZHVjdGlvbiA/ICcvYmxvZy8nIDogJy8nO1xuICAgIC8vIC0tLSBBZGQgTG9nZ2luZyAtLS1cbiAgICBjb25zb2xlLmxvZyhgW3Nob3dFbXB0eVN0YXRlXSBIb3N0bmFtZTogJHtjdXJyZW50SG9zdG5hbWV9LCBpc1Byb2R1Y3Rpb246ICR7aXNQcm9kdWN0aW9ufSwgYmFzZVBhdGg6ICR7YmFzZVBhdGh9YCk7XG4gICAgLy8gLS0tIEVuZCBMb2dnaW5nIC0tLVxuICAgIGNvbnN0IG1lc3NhZ2UgPSB0YWdGaWx0ZXJcbiAgICAgICAgPyBgTm8gcG9zdHMgZm91bmQgdGFnZ2VkIHdpdGggXCIke3RhZ0ZpbHRlcn1cIi5gXG4gICAgICAgIDogJ05vIHBvc3RzIHlldCEnO1xuICAgIGVtcHR5U3RhdGVEaXYuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1maWxlLWFsdCBmYS0zeFwiPjwvaT5cbiAgICAgICAgPGgzPiR7bWVzc2FnZX08L2gzPlxuICAgICAgICAke3RhZ0ZpbHRlciA/IGA8cD48YSBocmVmPVwiJHtiYXNlUGF0aH1cIj5WaWV3IGFsbCBwb3N0czwvYT48L3A+YCA6ICc8cD5DaGVjayBiYWNrIGxhdGVyIGZvciBuZXcgY29udGVudCE8L3A+J31cbiAgICBgO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbXB0eVN0YXRlRGl2KTtcbiAgICBjb25zb2xlLmxvZygnRGlzcGxheWVkIGVtcHR5IHN0YXRlIGZvciBwb3N0cy4nKTtcbn1cbi8qKlxuICogU2hvdyBlcnJvciBzdGF0ZSB3aGVuIHBvc3RzIGNvdWxkbid0IGJlIGxvYWRlZFxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JTdGF0ZShjb250YWluZXIpIHtcbiAgICAvLyAuLi4gKGltcGxlbWVudGF0aW9uIHJlbWFpbnMgdGhlIHNhbWUpIC4uLlxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBjb25zdCBlcnJvclN0YXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZXJyb3JTdGF0ZURpdi5jbGFzc05hbWUgPSAnZXJyb3Itc3RhdGUnO1xuICAgIGVycm9yU3RhdGVEaXYuaW5uZXJIVE1MID0gYC4uLmA7IC8vIEtlZXAgZXJyb3IgbWVzc2FnZSBIVE1MXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVycm9yU3RhdGVEaXYpO1xuICAgIGNvbnNvbGUubG9nKCdEaXNwbGF5ZWQgZXJyb3Igc3RhdGUgZm9yIHBvc3RzLicpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvZW50cmllcy9jbGllbnQudHNcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gSW1wb3J0cyByZW1haW4gdGhlIHNhbWUuLi5cbmNvbnN0IGJsb2dGcm9udGVuZENvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9ibG9nRnJvbnRlbmRDb250cm9sbGVyXCIpO1xuY29uc3QgcG9zdERldGFpbF8xID0gcmVxdWlyZShcIi4uL21vZHVsZXMvcG9zdERldGFpbFwiKTtcbmNvbnN0IGhlYWRlcl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaGVhZGVyXCIpO1xuY29uc3QgZGFya01vZGVfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2RhcmtNb2RlXCIpO1xuLyoqXG4gKiBDbGllbnQtc2lkZSBlbnRyeSBwb2ludCBpbml0aWFsaXplci5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNsaWVudCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpZW50IGluaXRpYWxpemluZy4uLicpO1xuICAgICAgICAvLyBJbml0aWFsaXplIGNvbW1vbiBlbGVtZW50cyBmaXJzdFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UpKCk7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGFyayBtb2RlIGluaXRpYWxpemVkIGdsb2JhbGx5LicpO1xuICAgICAgICAgICAgLy8gUmVuZGVyIEhlYWRlciBvbmx5IGlmIHBsYWNlaG9sZGVyIGV4aXN0c1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXItcGxhY2Vob2xkZXInKSkge1xuICAgICAgICAgICAgICAgICgwLCBoZWFkZXJfMS5yZW5kZXJIZWFkZXIpKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0hlYWRlciByZW5kZXJlZCBnbG9iYWxseS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignSGVhZGVyIHBsYWNlaG9sZGVyIG5vdCBmb3VuZCBvbiB0aGlzIHBhZ2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGNvbW1vbiBlbGVtZW50czpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhZ2Utc3BlY2lmaWMgbG9naWNcbiAgICAgICAgY29uc3QgcGFnZVR5cGUgPSBkb2N1bWVudC5ib2R5LmRhdGFzZXQucGFnZTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIC8vIEdldCB0aGUgYmFzZSBuYW1lIG9mIHRoZSBmaWxlL3BhdGgsIHJlbW92aW5nIHRyYWlsaW5nIHNsYXNoIGlmIHByZXNlbnRcbiAgICAgICAgY29uc3QgcGF0aEVuZCA9IGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvJykgPyBjdXJyZW50UGFnZS5zbGljZSgwLCAtMSkuc3BsaXQoJy8nKS5wb3AoKSA6IGN1cnJlbnRQYWdlLnNwbGl0KCcvJykucG9wKCk7XG4gICAgICAgIGNvbnN0IGlzUm9vdE9ySW5kZXggPSBjdXJyZW50UGFnZS5lbmRzV2l0aCgnLycpIHx8IGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvaW5kZXguaHRtbCcpOyAvLyBDaGVjayBpZiBpdCdzIHRoZSByb290IG9mIHRoZSBkZXBsb3ltZW50XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRGV0ZWN0ZWQgcGFnZVR5cGU6ICR7cGFnZVR5cGV9LCBjdXJyZW50UGFnZTogJHtjdXJyZW50UGFnZX0sIHBhdGhFbmQ6ICR7cGF0aEVuZH0sIGlzUm9vdE9ySW5kZXg6ICR7aXNSb290T3JJbmRleH1gKTtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBNYWluIFBhZ2UgKHVzaW5nIGRhdGEtcGFnZSBvciBwYXRoIGVuZGluZyBpbiAvIG9yIC9pbmRleC5odG1sKVxuICAgICAgICAgICAgaWYgKHBhZ2VUeXBlID09PSAnbWFpbicgfHwgKCFwYWdlVHlwZSAmJiBpc1Jvb3RPckluZGV4KSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgbWFpbiBibG9nIHBhZ2UgbG9naWMuLi4nKTtcbiAgICAgICAgICAgICAgICB5aWVsZCAoMCwgYmxvZ0Zyb250ZW5kQ29udHJvbGxlcl8xLmluaXRpYWxpemVCbG9nRnJvbnRlbmQpKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01haW4gYmxvZyBwYWdlIGxvZ2ljIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBQb3N0IERldGFpbCBQYWdlICh1c2luZyBkYXRhLXBhZ2Ugb3IgcGF0aCBlbmRpbmcgaW4gL3Bvc3QuaHRtbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhZ2VUeXBlID09PSAncG9zdCcgfHwgKCFwYWdlVHlwZSAmJiBjdXJyZW50UGFnZS5lbmRzV2l0aCgnL3Bvc3QuaHRtbCcpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgcG9zdCBkZXRhaWwgcGFnZSBsb2dpYyAoZnJvbSBtb2R1bGUpLi4uJyk7XG4gICAgICAgICAgICAgICAgeWllbGQgKDAsIHBvc3REZXRhaWxfMS5pbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYykoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUG9zdCBkZXRhaWwgcGFnZSBsb2dpYyBpbml0aWFsaXplZC4nKTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgQWRtaW4gUGFnZSAodXNpbmcgZGF0YS1wYWdlIG9yIHBhdGggZW5kaW5nIGluIC9hZG1pbi5odG1sKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFnZVR5cGUgPT09ICdhZG1pbicgfHwgKCFwYWdlVHlwZSAmJiBjdXJyZW50UGFnZS5lbmRzV2l0aCgnL2FkbWluLmh0bWwnKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWRtaW4gcGFnZSBkZXRlY3RlZCBieSBjbGllbnQudHMgLSBubyBhY3Rpb24gdGFrZW4uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVW5rbm93biBwYWdlIHR5cGUgKCcke3BhZ2VUeXBlfScpIG9yIHBhdGggKCcke2N1cnJlbnRQYWdlfScpLiBObyBzcGVjaWZpYyBpbml0aWFsaXphdGlvbiBuZWVkZWQgZnJvbSBjbGllbnQudHMuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgcGFnZS1zcGVjaWZpYyBjbGllbnQgaW5pdGlhbGl6YXRpb246JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyBET01Db250ZW50TG9hZGVkIGxpc3RlbmVyIHJlbWFpbnMgdGhlIHNhbWUuLi5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGl6ZUNsaWVudCk7XG59XG5lbHNlIHtcbiAgICBpbml0aWFsaXplQ2xpZW50KCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9tb2R1bGVzL3Bvc3REZXRhaWwudHNcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYyA9IGluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljO1xuZXhwb3J0cy5sb2FkUG9zdENvbnRlbnQgPSBsb2FkUG9zdENvbnRlbnQ7XG5leHBvcnRzLnVwZGF0ZVBvc3RVSSA9IHVwZGF0ZVBvc3RVSTtcbmV4cG9ydHMudXBkYXRlUGFnZU1ldGFkYXRhID0gdXBkYXRlUGFnZU1ldGFkYXRhO1xuZXhwb3J0cy5pbml0aWFsaXplU29jaWFsU2hhcmluZyA9IGluaXRpYWxpemVTb2NpYWxTaGFyaW5nO1xuZXhwb3J0cy5zaG93RXJyb3JNZXNzYWdlID0gc2hvd0Vycm9yTWVzc2FnZTtcbi8vIC0tLSBJbXBvcnRzIC0tLVxuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3QgdXJsVHJhbnNmb3JtZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlscy91cmxUcmFuc2Zvcm1lclwiKTtcbmNvbnN0IGhlYWRlcl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaGVhZGVyXCIpO1xuY29uc3QgZGFya01vZGVfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2RhcmtNb2RlXCIpO1xuLy8gLS0tIENvcmUgSW5pdGlhbGl6YXRpb24gRnVuY3Rpb24gLS0tXG4vKipcbiAqIEluaXRpYWxpemVzIGFsbCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgcG9zdCBkZXRhaWwgcGFnZS5cbiAqIFRoaXMgaXMgdGhlIG1haW4gZXhwb3J0ZWQgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgY2FsbGVkIGJ5IHRoZSBlbnRyeSBwb2ludC5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBwb3N0IGRldGFpbCBwYWdlLi4uJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEYXJrIG1vZGUgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICgwLCBoZWFkZXJfMS5yZW5kZXJIZWFkZXIpKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGVyIHJlbmRlcmVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IHVybFBhcmFtcy5nZXQoJ2lkJyk7XG4gICAgICAgIGlmIChwb3N0SWQpIHtcbiAgICAgICAgICAgIHlpZWxkIGxvYWRQb3N0Q29udGVudChwb3N0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gcG9zdCBJRCBwcm92aWRlZCBpbiB0aGUgVVJMJyk7XG4gICAgICAgICAgICBzaG93RXJyb3JNZXNzYWdlKCdObyBwb3N0IHNwZWNpZmllZC4gUGxlYXNlIGNoZWNrIHRoZSBVUkwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGV0YWlsIHBhZ2UgaW5pdGlhbGl6YXRpb24gY29tcGxldGUuJyk7XG4gICAgfSk7XG59XG4vKipcbiAqIExvYWQgYW5kIGRpc3BsYXkgcG9zdCBjb250ZW50IGJhc2VkIG9uIHBvc3QgSURcbiAqL1xuZnVuY3Rpb24gbG9hZFBvc3RDb250ZW50KHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRmV0Y2hpbmcgcG9zdCB3aXRoIElEOiAke3Bvc3RJZH1gKTtcbiAgICAgICAgICAgIGNvbnN0IHBvc3QgPSB5aWVsZCAoMCwgYXBpXzEuZmV0Y2hQb3N0QnlJZCkocG9zdElkKTtcbiAgICAgICAgICAgIGlmICghcG9zdClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBvc3Qgd2l0aCBJRCAke3Bvc3RJZH0gbm90IGZvdW5kYCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUG9zdCBkYXRhIGZldGNoZWQ6JywgcG9zdCk7XG4gICAgICAgICAgICB1cGRhdGVQb3N0VUkocG9zdCk7XG4gICAgICAgICAgICB1cGRhdGVQYWdlTWV0YWRhdGEocG9zdCk7XG4gICAgICAgICAgICBpbml0aWFsaXplU29jaWFsU2hhcmluZyhwb3N0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgcG9zdCBjb250ZW50OicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvck1lc3NhZ2UoYEZhaWxlZCB0byBsb2FkIHRoZSBibG9nIHBvc3QuICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nfWApO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgcG9zdCBVSSB3aXRoIGNvbnRlbnQgZnJvbSB0aGUgbG9hZGVkIHBvc3RcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUG9zdFVJKHBvc3QpIHtcbiAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgUG9zdCBVSSBmb3I6JywgcG9zdC50aXRsZSk7XG4gICAgY29uc3QgcG9zdEFydGljbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGlmICghcG9zdEFydGljbGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCB1cGRhdGUgVUk6ICNwb3N0LWNvbnRlbnQgZWxlbWVudCBub3QgZm91bmQuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQ29uc3RydWN0IHRoZSBpbm5lciBIVE1MIGR5bmFtaWNhbGx5XG4gICAgcG9zdEFydGljbGVFbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtaGVhZGVyXCI+XG4gICAgICAgICAgICA8aDE+JHtwb3N0LnRpdGxlfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1tZXRhXCI+XG4gICAgICAgICAgICAgICAgPHRpbWUgZGF0ZXRpbWU9XCIke3Bvc3QuY3JlYXRlZEF0ID8gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA6ICcnfVwiPlxuICAgICAgICAgICAgICAgICAgICAke3Bvc3QuY3JlYXRlZEF0ID8gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycgfSkgOiAnRGF0ZSB1bmtub3duJ31cbiAgICAgICAgICAgICAgICA8L3RpbWU+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JcIj5ieSAke3Bvc3QuYXV0aG9yIHx8ICdBbm9ueW1vdXMnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgICR7cG9zdC5pbWFnZVVybCA/IGA8aW1nIHNyYz1cIiR7cG9zdC5pbWFnZVVybH1cIiBhbHQ9XCIke3Bvc3QudGl0bGV9XCIgY2xhc3M9XCJmZWF0dXJlZC1pbWFnZVwiPmAgOiAnJ31cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1jb250ZW50LWJvZHlcIj5cbiAgICAgICAgICAgICR7cG9zdC5jb250ZW50fVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1mb290ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzXCI+XG4gICAgICAgICAgICAgICAgJHtwb3N0LnRhZ3MgJiYgcG9zdC50YWdzLmxlbmd0aCA+IDAgPyBgPHNwYW4+VGFnczo8L3NwYW4+ICR7cG9zdC50YWdzLm1hcCh0YWcgPT4gYDxhIGhyZWY9XCIkeygwLCB1cmxUcmFuc2Zvcm1lcl8xLmdlbmVyYXRlVGFnRmlsdGVyVXJsKSh0YWcpfVwiPiR7dGFnfTwvYT5gKS5qb2luKCcnKX1gIDogJyd9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWwtc2hhcmluZ1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlNoYXJlOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIHR3aXR0ZXJcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gVHdpdHRlclwiPjxpIGNsYXNzPVwiZmFiIGZhLXR3aXR0ZXJcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBmYWNlYm9va1wiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBGYWNlYm9va1wiPjxpIGNsYXNzPVwiZmFiIGZhLWZhY2Vib29rLWZcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBsaW5rZWRpblwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBMaW5rZWRJblwiPjxpIGNsYXNzPVwiZmFiIGZhLWxpbmtlZGluLWluXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgY29uc29sZS5sb2coJ1Bvc3QgVUkgdXBkYXRlZCB3aXRoIGxpa2UgYnV0dG9uIGFuZCBjb21tZW50cyBzZWN0aW9uIHN0cnVjdHVyZS4nKTtcbn1cbi8qKlxuICogVXBkYXRlIHBhZ2UgbWV0YWRhdGEgbGlrZSB0aXRsZSBhbmQgVVJMXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBhZ2VNZXRhZGF0YShwb3N0KSB7XG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHtwb3N0LnRpdGxlfSB8IE5vZWwncyBCbG9nYDtcbiAgICBjb25zb2xlLmxvZygnUGFnZSBtZXRhZGF0YSB1cGRhdGVkLicpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplIHNvY2lhbCBzaGFyaW5nIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcocG9zdCkge1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHNvY2lhbFNoYXJpbmdEaXYgPSBwb3N0QXJ0aWNsZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbC1zaGFyaW5nJyk7XG4gICAgaWYgKHNvY2lhbFNoYXJpbmdEaXYpIHtcbiAgICAgICAgc29jaWFsU2hhcmluZ0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaGFyZS1idXR0b24nKTtcbiAgICAgICAgICAgIGlmICghYnV0dG9uKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBgQ2hlY2sgb3V0IHRoaXMgYXJ0aWNsZTogJHtwb3N0LnRpdGxlfWA7XG4gICAgICAgICAgICBsZXQgc2hhcmVXaW5kb3dVcmwgPSAnJztcbiAgICAgICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd0d2l0dGVyJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX0mdGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAndHdpdHRlci1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTIzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFjZWJvb2snKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2ZhY2Vib29rLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rZWRpbicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZS8/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2xpbmtlZGluLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnU29jaWFsIHNoYXJpbmcgaW5pdGlhbGl6ZWQuJyk7XG59XG4vKipcbiAqIERpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZSB0byB0aGUgdXNlciB3aXRoaW4gdGhlIHBvc3QgY29udGVudCBhcmVhXG4gKi9cbmZ1bmN0aW9uIHNob3dFcnJvck1lc3NhZ2UobWVzc2FnZSkge1xuICAgIGNvbnN0IGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGlmIChjb250ZW50RWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb21tZW50c1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtc2VjdGlvbicpO1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gY29tbWVudHNTZWN0aW9uID8gY29tbWVudHNTZWN0aW9uIDogY29udGVudEVsZW1lbnQ7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+JHttZXNzYWdlfTwvZGl2PmA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhbGVydChtZXNzYWdlKTsgLy8gRmFsbGJhY2tcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5saWtlUG9zdCA9IGxpa2VQb3N0O1xuZXhwb3J0cy51bmxpa2VQb3N0ID0gdW5saWtlUG9zdDtcbmV4cG9ydHMuZGVsZXRlQmxvZ1Bvc3QgPSBkZWxldGVCbG9nUG9zdDtcbmV4cG9ydHMuY3JlYXRlUG9zdCA9IGNyZWF0ZVBvc3Q7XG5leHBvcnRzLnVwZGF0ZVBvc3QgPSB1cGRhdGVQb3N0O1xuZXhwb3J0cy5hZGRUYWdUb1Bvc3QgPSBhZGRUYWdUb1Bvc3Q7XG5leHBvcnRzLmZldGNoQmxvZ1Bvc3RzID0gZmV0Y2hCbG9nUG9zdHM7XG5leHBvcnRzLmZldGNoUG9zdEJ5SWQgPSBmZXRjaFBvc3RCeUlkO1xuZXhwb3J0cy5mZXRjaENvbW1lbnRzQXBpID0gZmV0Y2hDb21tZW50c0FwaTtcbmV4cG9ydHMuc3VibWl0Q29tbWVudEFwaSA9IHN1Ym1pdENvbW1lbnRBcGk7XG4vLyBBUElfVVJMIGNvbnN0YW50IGlzIG5vdCBuZWVkZWQgd2hlbiBmZXRjaGluZyBzdGF0aWMgZmlsZSBkaXJlY3RseVxuLy8gY29uc3QgQVBJX1VSTCA9ICcvYXBpJzsgXG4vLyAtLS0gRnVuY3Rpb25zIHJlbHlpbmcgb24gYmFja2VuZCBBUEkgKFdpbGwgTk9UIHdvcmsgb24gR2l0SHViIFBhZ2VzKSAtLS1cbi8vIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIGZhaWwgc2lsZW50bHkgb3IgbG9nIGVycm9ycyBpbiB0aGUgY29uc29sZSBvbiB0aGUgc3RhdGljIHNpdGUuXG5mdW5jdGlvbiBsaWtlUG9zdChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYExpa2UgZnVuY3Rpb25hbGl0eSByZXF1aXJlcyBhIGJhY2tlbmQuIENhbm5vdCBMSUtFIHBvc3QgJHtpZH0gb24gc3RhdGljIHNpdGUuYCk7XG4gICAgICAgIC8vIFJldHVybiBudWxsIG9yIGEgZGVmYXVsdCBzdHJ1Y3R1cmUgaWYgeW91ciBjYWxsaW5nIGNvZGUgZXhwZWN0cyBpdFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVubGlrZVBvc3QoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBVbmxpa2UgZnVuY3Rpb25hbGl0eSByZXF1aXJlcyBhIGJhY2tlbmQuIENhbm5vdCBVTkxJS0UgcG9zdCAke2lkfSBvbiBzdGF0aWMgc2l0ZS5gKTtcbiAgICAgICAgLy8gUmV0dXJuIG51bGwgb3IgYSBkZWZhdWx0IHN0cnVjdHVyZVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZUJsb2dQb3N0KHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgZGVsZXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlUG9zdChwb3N0RGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgY3JlYXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB1cGRhdGVQb3N0KGlkLCBwb3N0RGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgdXBkYXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBhZGRUYWdUb1Bvc3QoaWQsIHRhZykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgYWRkIHRhZyBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbi8vIC0tLSBGdW5jdGlvbnMgbW9kaWZpZWQgZm9yIHN0YXRpYyBkYXRhIC0tLVxuY29uc3QgU1RBVElDX0RBVEFfVVJMID0gJ2RhdGEvcG9zdHMuanNvbic7IC8vIERlZmluZSByZWxhdGl2ZSBwYXRoIG9uY2Vcbi8qKlxuICogRmV0Y2ggYWxsIGJsb2cgcG9zdHMgZGlyZWN0bHkgZnJvbSB0aGUgc3RhdGljIEpTT04gZmlsZS5cbiAqL1xuZnVuY3Rpb24gZmV0Y2hCbG9nUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEZldGNoaW5nIHN0YXRpYyBkYXRhIGZyb206ICR7U1RBVElDX0RBVEFfVVJMfWApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIEpTT04gZmlsZSB1c2luZyB0aGUgcmVsYXRpdmUgcGF0aFxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChTVEFUSUNfREFUQV9VUkwpO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoICR7U1RBVElDX0RBVEFfVVJMfTogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAvLyBBc3N1bWluZyB0aGUgSlNPTiBzdHJ1Y3R1cmUgaXMgeyBwb3N0czogWy4uLl0gfSBcbiAgICAgICAgICAgIHJldHVybiBkYXRhLnBvc3RzIHx8IFtdO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RhdGljICR7U1RBVElDX0RBVEFfVVJMfTpgLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSBvbiBlcnJvclxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhIHNpbmdsZSBwb3N0IGJ5IElEIGJ5IGZpbHRlcmluZyB0aGUgc3RhdGljIEpTT04gZGF0YS5cbiAqIEBwYXJhbSBpZCAtIFRoZSBwb3N0IElEIChzdHJpbmcgb3IgbnVtYmVyKVxuICovXG5mdW5jdGlvbiBmZXRjaFBvc3RCeUlkKGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZldGNoIGFsbCBwb3N0cyBmaXJzdFxuICAgICAgICAgICAgY29uc3QgYWxsUG9zdHMgPSB5aWVsZCBmZXRjaEJsb2dQb3N0cygpO1xuICAgICAgICAgICAgY29uc3QgcG9zdElkTnVtYmVyID0gdHlwZW9mIGlkID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KGlkLCAxMCkgOiBpZDtcbiAgICAgICAgICAgIGlmIChpc05hTihwb3N0SWROdW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgSW52YWxpZCBwb3N0IElEIHByb3ZpZGVkOiAke2lkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRmluZCB0aGUgc3BlY2lmaWMgcG9zdFxuICAgICAgICAgICAgY29uc3QgcG9zdCA9IGFsbFBvc3RzLmZpbmQocCA9PiBOdW1iZXIocC5pZCkgPT09IHBvc3RJZE51bWJlcik7XG4gICAgICAgICAgICBpZiAoIXBvc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFBvc3Qgd2l0aCBJRCAke2lkfSBub3QgZm91bmQgaW4gc3RhdGljIGRhdGEuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgcG9zdCAke2lkfSBpbiBzdGF0aWMgZGF0YS5gKTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RhdGljIHBvc3QgJHtpZH06YCwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIC0tLSBDb21tZW50IEFQSSBQbGFjZWhvbGRlcnMgLS0tXG5mdW5jdGlvbiBmZXRjaENvbW1lbnRzQXBpKHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkNvbW1lbnRzIGNhbm5vdCBiZSBmZXRjaGVkIG9uIHN0YXRpYyBzaXRlIHdpdGhvdXQgZXh0ZXJuYWwgc2VydmljZS9iYWNrZW5kLlwiKTtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gc3VibWl0Q29tbWVudEFwaShwb3N0SWQsIG5hbWUsIGNvbW1lbnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHN1Ym1pdCBjb21tZW50IG9uIHN0YXRpYyBzaXRlIHdpdGhvdXQgZXh0ZXJuYWwgc2VydmljZS9iYWNrZW5kLlwiKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29tbWVudCBzdWJtaXNzaW9uIG5vdCBhdmFpbGFibGUuXCIpO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvdXRpbHMvdXJsVHJhbnNmb3JtZXIudHMgKEV4YW1wbGUgTG9jYXRpb24pXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdlbmVyYXRlVGFnRmlsdGVyVXJsID0gZ2VuZXJhdGVUYWdGaWx0ZXJVcmw7XG4vKipcbiAqIEdlbmVyYXRlcyBhIFVSTCBwYXRoIGZvciBmaWx0ZXJpbmcgYnkgdGFnIG9uIHRoZSBtYWluIGJsb2cgcGFnZS5cbiAqIENyZWF0ZXMgYSBVUkwgbGlrZSBcIi9ibG9nLz90YWc9eW91ci10YWctbmFtZVwiIG9yIFwiLz90YWc9eW91ci10YWctbmFtZVwiIGJhc2VkIG9uIGVudmlyb25tZW50LlxuICpcbiAqIEBwYXJhbSB0YWcgLSBUaGUgdGFnIHN0cmluZyB0byBmaWx0ZXIgYnkuXG4gKiBAcmV0dXJucyBUaGUgVVJMIHBhdGggd2l0aCB0aGUgdGFnIHF1ZXJ5IHBhcmFtZXRlci5cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUYWdGaWx0ZXJVcmwodGFnKSB7XG4gICAgLy8gT3B0aW9uYWw6IENvbnZlcnQgdGFnIHRvIGxvd2VyY2FzZSBmb3IgY29uc2lzdGVuY3kgaW4gZmlsdGVyaW5nXG4gICAgY29uc3QgY29uc2lzdGVudFRhZyA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIFVSTFNlYXJjaFBhcmFtcyBoYW5kbGVzIG5lY2Vzc2FyeSBlbmNvZGluZyBmb3IgcXVlcnkgcGFyYW1ldGVyIHZhbHVlc1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoeyB0YWc6IGNvbnNpc3RlbnRUYWcgfSk7XG4gICAgLy8gQ2hlY2sgaWYgd2UncmUgb24gdGhlIHByb2R1Y3Rpb24gc2l0ZSBieSBsb29raW5nIGF0IHRoZSBob3N0bmFtZVxuICAgIGNvbnN0IGlzUHJvZHVjdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ25vZWx1Z3dva2UuY29tJztcbiAgICBjb25zdCBiYXNlUGF0aCA9IGlzUHJvZHVjdGlvbiA/ICcvYmxvZy8nIDogJy8nO1xuICAgIHJldHVybiBgJHtiYXNlUGF0aH0/JHtwYXJhbXMudG9TdHJpbmcoKX1gO1xufVxuLypcbi8vIE9yaWdpbmFsIGZ1bmN0aW9uIC0ga2VwdCBmb3IgcmVmZXJlbmNlIG9yIGlmIG5lZWRlZCBmb3IgZGlmZmVyZW50IFVSTCB0eXBlc1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVRhZ1RvVXJsRm9ybWF0KHRhZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGFnLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCAnLScpO1xufVxuKi9cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9lbnRyaWVzL2NsaWVudC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==