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
                if (blogCardsContainer) {
                    blogCardsContainer.appendChild(message);
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ3ZCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxHQUFHO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsSUFBSTtBQUNqRDtBQUNBO0FBQ0Esc0NBQXNDLElBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELEdBQUc7QUFDM0Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7QUNoSWE7QUFDYjtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxvQkFBb0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsY0FBYyxTQUFTLEdBQUcsa0JBQWtCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDMUJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvYWJvdXQudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2Jsb2dDYXJkcy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvY29tbWVudHMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2NvbnRhY3QudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2RhcmtNb2RlLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL25hdmlnYXRpb24udHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL3BhZ2luYXRpb24udHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL3NlYXJjaC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL2Jsb2dGcm9udGVuZENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9lbnRyaWVzL2NsaWVudC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL21vZHVsZXMvcG9zdERldGFpbC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3NlcnZpY2VzL2FwaS50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3V0aWxzL3VybFRyYW5zZm9ybWVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gQWJvdXQgcG9wdXAgZnVuY3Rpb25hbGl0eVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQWJvdXQgPSBpbml0aWFsaXplQWJvdXQ7XG4vKipcbiAqIEluaXRpYWxpemUgdGhlIEFib3V0IHNlY3Rpb24gcG9wdXBcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUFib3V0KCkge1xuICAgIGNvbnN0IGFib3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWJ0bicpO1xuICAgIGNvbnN0IGFib3V0UG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtcG9wdXAnKTtcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0LXBvcHVwIC5jbG9zZS1wb3B1cCcpO1xuICAgIGlmICghYWJvdXRCdG4gfHwgIWFib3V0UG9wdXAgfHwgIWNsb3NlUG9wdXApIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdBYm91dCBwb3B1cCBlbGVtZW50cyBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIE9wZW4gcG9wdXAgd2hlbiBhYm91dCBidXR0b24gaXMgY2xpY2tlZFxuICAgIGFib3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgYW5jaG9yIGJlaGF2aW9yXG4gICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7IC8vIFByZXZlbnQgc2Nyb2xsaW5nIHdoaWxlIHBvcHVwIGlzIG9wZW5cbiAgICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBhYm91dCBsaW5rXG4gICAgICAgIGFib3V0QnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICAgIC8vIENsb3NlIHBvcHVwIHdoZW4gY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBjbG9zZVBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwb3B1cCBjb250ZW50XG4gICAgYWJvdXRQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gYWJvdXRQb3B1cCkge1xuICAgICAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugb24gZXNjYXBlIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIGFib3V0UG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcbiAgICAgICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IHRoZSBkZWZhdWx0IGFjdGl2ZSBsaW5rIHN0YXRlXG4gKi9cbmZ1bmN0aW9uIHNldERlZmF1bHRBY3RpdmVMaW5rKCkge1xuICAgIC8vIEdldCBjdXJyZW50IGhhc2ggb3IgZGVmYXVsdCB0byBob21lXG4gICAgY29uc3QgY3VycmVudEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgbmF2IGxpbmtzXG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IGhhc2ggbGlua1xuICAgIGNvbnN0IGN1cnJlbnRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaGVhZGVyIG5hdiB1bCBsaSBhW2hyZWY9XCIke2N1cnJlbnRIYXNofVwiXWApO1xuICAgIGlmIChjdXJyZW50TGluaykge1xuICAgICAgICBjdXJyZW50TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlQmxvZ0NhcmRFbGVtZW50ID0gY3JlYXRlQmxvZ0NhcmRFbGVtZW50O1xuY29uc3QgdXJsVHJhbnNmb3JtZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlscy91cmxUcmFuc2Zvcm1lclwiKTsgLy8gSW1wb3J0IHRoZSBVUkwgZ2VuZXJhdG9yXG4vKipcbiAqIENyZWF0ZXMgYSBET00gZWxlbWVudCBmb3IgYSBibG9nIGNhcmQgZnJvbSBwb3N0IGRhdGEgKGRpc3BsYXkgb25seSBmb3IgYWN0aW9ucylcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmxvZ0NhcmRFbGVtZW50KHBvc3QpIHtcbiAgICBjb25zdCBibG9nQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJsb2dDYXJkLmNsYXNzTmFtZSA9ICdibG9nLWNhcmQnO1xuICAgIGJsb2dDYXJkLmRhdGFzZXQucG9zdElkID0gU3RyaW5nKHBvc3QuaWQpO1xuICAgIGJsb2dDYXJkLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICBjb25zdCBjb21tZW50Q291bnQgPSBwb3N0LmNvbW1lbnRzID8gcG9zdC5jb21tZW50cy5sZW5ndGggOiAwO1xuICAgIGNvbnN0IGNyZWF0ZWREYXRlID0gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBjcmVhdGVkRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnXG4gICAgfSk7XG4gICAgLy8gLS0tIER5bmFtaWMgVVJMIGFuZCBUZXh0IEdlbmVyYXRpb24gZm9yIFNoYXJpbmcgLS0tXG4gICAgY29uc3QgcG9zdFVybCA9IGBwb3N0Lmh0bWw/aWQ9JHtTdHJpbmcocG9zdC5pZCl9YDtcbiAgICBjb25zdCBlbmNvZGVkVXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHBvc3RVcmwpO1xuICAgIGNvbnN0IHNoYXJlVGV4dCA9IGBDaGVjayBvdXQgdGhpcyBhcnRpY2xlOiAke3Bvc3QudGl0bGV9YDtcbiAgICBjb25zdCBlbmNvZGVkU2hhcmVUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHNoYXJlVGV4dCk7XG4gICAgLy8gLS0tIEVuZCBEeW5hbWljIFVSTCBHZW5lcmF0aW9uIC0tLVxuICAgIC8vIEdlbmVyYXRlIEhUTUwgZm9yIHRhZyBiYWRnZXMvbGlua3MgdXNpbmcgdGhlIHV0aWxpdHkgZnVuY3Rpb25cbiAgICBsZXQgdGFnc0hUTUwgPSAnJztcbiAgICBpZiAocG9zdC50YWdzICYmIHBvc3QudGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRhZ3NIVE1MID0gJzxkaXYgY2xhc3M9XCJwb3N0LXRhZ3NcIj4nICtcbiAgICAgICAgICAgIHBvc3QudGFncy5tYXAodGFnID0+IFxuICAgICAgICAgICAgLy8gVXNlIGdlbmVyYXRlVGFnRmlsdGVyVXJsIGZvciBocmVmIGluIGFuIDxhPiB0YWdcbiAgICAgICAgICAgIGA8YSBocmVmPVwiJHsoMCwgdXJsVHJhbnNmb3JtZXJfMS5nZW5lcmF0ZVRhZ0ZpbHRlclVybCkodGFnKX1cIiBjbGFzcz1cInRhZy1iYWRnZVwiPiR7dGFnfTwvYT5gKS5qb2luKCcnKSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICB9XG4gICAgY29uc3QgZmFsbGJhY2tJbWFnZVVybCA9ICdpbWFnZXMvYmxvZ19pbWFnZV8zLmpwZWcnOyAvLyBSZWxhdGl2ZSBwYXRoXG4gICAgLy8gQ3JlYXRlIEhUTUwgZm9yIGJsb2cgY2FyZFxuICAgIGJsb2dDYXJkLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGltZyBzcmM9XCIke3Bvc3QuaW1hZ2VVcmwgfHwgZmFsbGJhY2tJbWFnZVVybH1cIiBhbHQ9XCIke3Bvc3QudGl0bGV9XCI+IFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmxvZy1jYXJkLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiYmxvZy1jYXJkLWRhdGUtYXV0aG9yXCI+JHtkYXRlU3RyfTwvcD5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cImJsb2ctY2FyZC10aXRsZVwiPiR7cG9zdC50aXRsZX08L2gzPlxuICAgICAgICAgICAgJHt0YWdzSFRNTH1cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLXNoYXJpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiB0d2l0dGVyXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIFR3aXR0ZXJcIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIiBkYXRhLXRleHQ9XCIke2VuY29kZWRTaGFyZVRleHR9XCI+PGkgY2xhc3M9XCJmYWIgZmEtdHdpdHRlclwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBmYWNlYm9va1wiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBGYWNlYm9va1wiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiPjxpIGNsYXNzPVwiZmFiIGZhLWZhY2Vib29rLWZcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gbGlua2VkaW5cIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gTGlua2VkSW5cIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIj48aSBjbGFzcz1cImZhYiBmYS1saW5rZWRpbi1pblwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIC8vIFNldHVwIHNvY2lhbCBzaGFyaW5nIGxpc3RlbmVycyAoYXMgYmVmb3JlKVxuICAgIGNvbnN0IHNvY2lhbFNoYXJpbmdEaXYgPSBibG9nQ2FyZC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsLXNoYXJpbmcnKTtcbiAgICBpZiAoc29jaWFsU2hhcmluZ0Rpdikge1xuICAgICAgICBzb2NpYWxTaGFyaW5nRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyAuLi4gZXhpc3Rpbmcgc29jaWFsIHNoYXJpbmcgY2xpY2sgbG9naWMgLi4uXG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNoYXJlLWJ1dHRvbicpO1xuICAgICAgICAgICAgaWYgKCFidXR0b24pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBiYXNlUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zdWJzdHJpbmcoMCwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aXZlVXJsID0gYnV0dG9uLmRhdGFzZXQudXJsID8gZGVjb2RlVVJJQ29tcG9uZW50KGJ1dHRvbi5kYXRhc2V0LnVybCkgOiBgcG9zdC5odG1sP2lkPSR7cG9zdC5pZH1gO1xuICAgICAgICAgICAgY29uc3QgZnVsbFVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHtiYXNlUGF0aH0ke3JlbGF0aXZlVXJsfWA7XG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkRnVsbFVybCA9IGVuY29kZVVSSUNvbXBvbmVudChmdWxsVXJsKTtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBidXR0b24uZGF0YXNldC50ZXh0ID8gZGVjb2RlVVJJQ29tcG9uZW50KGJ1dHRvbi5kYXRhc2V0LnRleHQpIDogZG9jdW1lbnQudGl0bGU7XG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KTtcbiAgICAgICAgICAgIGxldCBzaGFyZVdpbmRvd1VybCA9ICcnO1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3R3aXR0ZXInKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtlbmNvZGVkVGV4dH0mdXJsPSR7ZW5jb2RlZEZ1bGxVcmx9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ3R3aXR0ZXItc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD0yMzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhY2Vib29rJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2VuY29kZWRGdWxsVXJsfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdmYWNlYm9vay1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnbGlua2VkaW4nKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyaW5nL3NoYXJlLW9mZnNpdGUvP3VybD0ke2VuY29kZWRGdWxsVXJsfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdsaW5rZWRpbi1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gUkVNT1ZFRDogU2VwYXJhdGUgZXZlbnQgbGlzdGVuZXIgbG9vcCBmb3IgdGFnIGJhZGdlcyAobm93IGhhbmRsZWQgYnkgc3RhbmRhcmQgPGE+IHRhZ3MpXG4gICAgcmV0dXJuIGJsb2dDYXJkO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50cyA9IGluaXRpYWxpemVDb21tZW50cztcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSA9IGluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHk7XG4vKipcbiAqIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgYmxvZyBwb3N0c1xuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29tbWVudHMoKSB7XG4gICAgc2V0dXBDb21tZW50VG9nZ2xlcygpO1xuICAgIHNldHVwQ29tbWVudEZvcm1zKCk7XG59XG4vKipcbiAqIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgYSBzcGVjaWZpYyBibG9nIHBvc3QgZWxlbWVudFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5KHBvc3RFbGVtZW50KSB7XG4gICAgY29uc3QgdG9nZ2xlID0gcG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLXRvZ2dsZScpO1xuICAgIGNvbnN0IGZvcm0gPSBwb3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1mb3JtJyk7XG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgICBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKTtcbiAgICB9XG4gICAgaWYgKGZvcm0pIHtcbiAgICAgICAgc2V0dXBDb21tZW50Rm9ybShmb3JtKTtcbiAgICB9XG59XG4vKipcbiAqIFNldCB1cCBjb21tZW50IHRvZ2dsZSBidXR0b25zXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudFRvZ2dsZXMoKSB7XG4gICAgY29uc3QgY29tbWVudFRvZ2dsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudHMtdG9nZ2xlJyk7XG4gICAgY29tbWVudFRvZ2dsZXMuZm9yRWFjaCh0b2dnbGUgPT4ge1xuICAgICAgICBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGEgc2luZ2xlIGNvbW1lbnQgdG9nZ2xlIGJ1dHRvblxuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKSB7XG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSB0b2dnbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAgICAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvbW1lbnRzLSR7cG9zdElkfWApO1xuICAgICAgICBpZiAoY29tbWVudHNTZWN0aW9uKSB7XG4gICAgICAgICAgICBjb21tZW50c1NlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgYnV0dG9uIHRleHQgYmFzZWQgb24gc3RhdGVcbiAgICAgICAgICAgIGlmIChjb21tZW50c1NlY3Rpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+IEhpZGUgQ29tbWVudHMgPHNwYW4gY2xhc3M9XCJjb21tZW50cy1jb3VudFwiPiR7KF9hID0gdG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb3VudCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGV4dENvbnRlbnR9PC9zcGFuPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLWNvbW1lbnRcIj48L2k+IENvbW1lbnRzIDxzcGFuIGNsYXNzPVwiY29tbWVudHMtY291bnRcIj4keyhfYiA9IHRvZ2dsZS5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY291bnQnKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRleHRDb250ZW50fTwvc3Bhbj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBjb21tZW50IGZvcm1zXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudEZvcm1zKCkge1xuICAgIGNvbnN0IGNvbW1lbnRGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LWZvcm0nKTtcbiAgICBjb21tZW50Rm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgICAgc2V0dXBDb21tZW50Rm9ybShmb3JtKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGEgc2luZ2xlIGNvbW1lbnQgZm9ybVxuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRGb3JtKGZvcm0pIHtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcG9zdElkID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zdC1pZCcpO1xuICAgICAgICBjb25zdCBjb21tZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb21tZW50cy0ke3Bvc3RJZH0gLmNvbW1lbnRzLWxpc3RgKTtcbiAgICAgICAgaWYgKCFjb21tZW50c0NvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBjb25zdCBjb21tZW50SW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhW25hbWU9XCJjb21tZW50XCJdJyk7XG4gICAgICAgIC8vIENoZWNrIGlmIGlucHV0cyBhcmUgbm90IGVtcHR5XG4gICAgICAgIGlmIChuYW1lSW5wdXQudmFsdWUudHJpbSgpID09PSAnJyB8fCBjb21tZW50SW5wdXQudmFsdWUudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFkZE5ld0NvbW1lbnQocG9zdElkLCBjb21tZW50c0NvbnRhaW5lciwgbmFtZUlucHV0LnZhbHVlLCBjb21tZW50SW5wdXQudmFsdWUpO1xuICAgICAgICAvLyBSZXNldCBmb3JtXG4gICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQWRkIGEgbmV3IGNvbW1lbnQgdG8gdGhlIGNvbW1lbnRzIGxpc3RcbiAqL1xuZnVuY3Rpb24gYWRkTmV3Q29tbWVudChwb3N0SWQsIGNvbW1lbnRzQ29udGFpbmVyLCBuYW1lLCBjb21tZW50VGV4dCkge1xuICAgIC8vIENyZWF0ZSBuZXcgY29tbWVudFxuICAgIGNvbnN0IG5ld0NvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXdDb21tZW50LmNsYXNzTmFtZSA9ICdjb21tZW50JztcbiAgICAvLyBHZXQgY3VycmVudCBkYXRlXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBkYXRlU3RyID0gbm93LnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgZGF5OiAnbnVtZXJpYydcbiAgICB9KTtcbiAgICAvLyBDb21tZW50IEhUTUwgc3RydWN0dXJlXG4gICAgbmV3Q29tbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWF2YXRhclwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlci1jaXJjbGVcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1jb250ZW50XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtYXV0aG9yXCI+JHtuYW1lfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC10ZXh0XCI+JHtjb21tZW50VGV4dH08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtZGF0ZVwiPiR7ZGF0ZVN0cn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgLy8gUmVtb3ZlIFwibm8gY29tbWVudHMgeWV0XCIgbWVzc2FnZSBpZiBpdCBleGlzdHNcbiAgICBjb25zdCBub0NvbW1lbnRzID0gY29tbWVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcignLm5vLWNvbW1lbnRzJyk7XG4gICAgaWYgKG5vQ29tbWVudHMpIHtcbiAgICAgICAgY29tbWVudHNDb250YWluZXIucmVtb3ZlQ2hpbGQobm9Db21tZW50cyk7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgbmV3IGNvbW1lbnQgdG8gdGhlIHRvcCBvZiB0aGUgbGlzdFxuICAgIGNvbW1lbnRzQ29udGFpbmVyLmluc2VydEJlZm9yZShuZXdDb21tZW50LCBjb21tZW50c0NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICAvLyBVcGRhdGUgY29tbWVudCBjb3VudFxuICAgIHVwZGF0ZUNvbW1lbnRDb3VudChwb3N0SWQpO1xufVxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvbW1lbnQgY291bnQgZm9yIGEgcG9zdFxuICovXG5mdW5jdGlvbiB1cGRhdGVDb21tZW50Q291bnQocG9zdElkKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IGNvdW50U3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGJ1dHRvbltkYXRhLXBvc3QtaWQ9XCIke3Bvc3RJZH1cIl0gLmNvbW1lbnRzLWNvdW50YCk7XG4gICAgaWYgKGNvdW50U3Bhbikge1xuICAgICAgICBsZXQgY291bnQgPSBwYXJzZUludCgoKF9hID0gY291bnRTcGFuLnRleHRDb250ZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVwbGFjZSgvWygpXS9nLCAnJykpIHx8ICcwJykgKyAxO1xuICAgICAgICBjb3VudFNwYW4udGV4dENvbnRlbnQgPSBgKCR7Y291bnR9KWA7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvY29tcG9uZW50cy9jb250YWN0LnRzIChFeGFtcGxlKVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQ29udGFjdEZvcm0gPSBpbml0aWFsaXplQ29udGFjdEZvcm07XG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBjb250YWN0IGZvcm0gcG9wdXAgZnVuY3Rpb25hbGl0eS5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbnRhY3RGb3JtKCkge1xuICAgIGNvbnN0IGNvbnRhY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1idG4nKTtcbiAgICBjb25zdCBjb250YWN0UG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1wb3B1cCcpO1xuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gY29udGFjdFBvcHVwID09PSBudWxsIHx8IGNvbnRhY3RQb3B1cCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFjdFBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1wb3B1cCcpO1xuICAgIGNvbnN0IGNvbnRhY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtZm9ybScpO1xuICAgIGlmICghY29udGFjdEJ1dHRvbiB8fCAhY29udGFjdFBvcHVwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ29udGFjdCBidXR0b24gb3IgcG9wdXAgZWxlbWVudCBub3QgZm91bmQuIENhbm5vdCBpbml0aWFsaXplIGNvbnRhY3QgZm9ybS4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyAtLS0gT3BlbiBQb3B1cCAtLS1cbiAgICBjb250YWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIDwtLSBDUlVDSUFMOiBQcmV2ZW50IGRlZmF1bHQgbGluayBuYXZpZ2F0aW9uXG4gICAgICAgIGNvbnNvbGUubG9nKCdDb250YWN0IGJ1dHRvbiBjbGlja2VkLCBvcGVuaW5nIHBvcHVwLicpO1xuICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpOyAvLyBDaGFuZ2VkIGZyb20gJ3Zpc2libGUnIHRvICdvcGVuJ1xuICAgIH0pO1xuICAgIC8vIC0tLSBDbG9zZSBQb3B1cCAtLS1cbiAgICBpZiAoY2xvc2VCdXR0b24pIHtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpOyAvLyBDaGFuZ2VkIGZyb20gJ3Zpc2libGUnIHRvICdvcGVuJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gQ2xvc2UgcG9wdXAgaWYgY2xpY2tpbmcgb3V0c2lkZSB0aGUgY29udGVudCBhcmVhXG4gICAgY29udGFjdFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IGNvbnRhY3RQb3B1cCkge1xuICAgICAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTsgLy8gQ2hhbmdlZCBmcm9tICd2aXNpYmxlJyB0byAnb3BlbidcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIC0tLSBGb3JtIFN1Ym1pc3Npb24gLS0tXG4gICAgaWYgKGNvbnRhY3RGb3JtKSB7XG4gICAgICAgIGNvbnRhY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGZvcm0gc3VibWlzc2lvblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbnRhY3QgZm9ybSBzdWJtaXR0ZWQgKHBsYWNlaG9sZGVyKS4nKTtcbiAgICAgICAgICAgIC8vIEFkZCB5b3VyIGZvcm0gc3VibWlzc2lvbiBsb2dpYyBoZXJlIChlLmcuLCB1c2luZyBmZXRjaCB0byBzZW5kIGRhdGEpXG4gICAgICAgICAgICAvLyBPcHRpb25hbGx5IGNsb3NlIHBvcHVwIGFmdGVyIHN1Ym1pc3Npb25cbiAgICAgICAgICAgIC8vIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7IFxuICAgICAgICAgICAgYWxlcnQoJ0NvbnRhY3QgZm9ybSBzdWJtaXNzaW9uIG5vdCBpbXBsZW1lbnRlZCB5ZXQuJyk7IC8vIFBsYWNlaG9sZGVyIGZlZWRiYWNrXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnQ29udGFjdCBmb3JtIGluaXRpYWxpemVkLicpO1xufVxuLy8gRW5zdXJlIHlvdXIgQ1NTIGhhbmRsZXMgdGhlIC5vcGVuIGNsYXNzIGZvciB0aGUgI2NvbnRhY3QtcG9wdXBcbi8vIGUuZy4sXG4vLyAucG9wdXAgeyBkaXNwbGF5OiBub25lOyAvKiBIaWRkZW4gYnkgZGVmYXVsdCAqLyB9XG4vLyAucG9wdXAub3BlbiB7IGRpc3BsYXk6IGJsb2NrOyAvKiBPciBmbGV4LCBncmlkLCBldGMuICovIH1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gRGFyayBtb2RlIGZ1bmN0aW9uYWxpdHlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZURhcmtNb2RlID0gaW5pdGlhbGl6ZURhcmtNb2RlO1xuZXhwb3J0cy5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSA9IGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlO1xuLyoqXG4gKiBJbml0aWFsaXplIGRhcmsgbW9kZSB0b2dnbGVcbiAqIFRoaXMgY3JlYXRlcyBhIGZsb2F0aW5nIGRhcmsgbW9kZSB0b2dnbGUgYnV0dG9uIGFuZCBhZGRzIGl0IHRvIHRoZSBET01cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZURhcmtNb2RlKCkge1xuICAgIC8vIENyZWF0ZSBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvblxuICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZGFya01vZGVUb2dnbGUuY2xhc3NOYW1lID0gJ2RhcmstbW9kZS10b2dnbGUnO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvblxuICAgIGRhcmtNb2RlVG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdUb2dnbGUgRGFyayBNb2RlJyk7XG4gICAgLy8gQ2hlY2sgaWYgZGFyayBtb2RlIHByZWZlcmVuY2UgaXMgYWxyZWFkeSBzZXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGNvbnN0IGlzRGFya01vZGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gJ3RydWUnO1xuICAgIGlmIChpc0RhcmtNb2RlKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICB9XG4gICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgZGFya01vZGVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVEYXJrTW9kZSk7XG4gICAgLy8gQWRkIGJ1dHRvbiB0byB0aGUgRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkYXJrTW9kZVRvZ2dsZSk7XG59XG4vKipcbiAqIFRvZ2dsZSBkYXJrIG1vZGUgb24gYW5kIG9mZlxuICovXG5mdW5jdGlvbiB0b2dnbGVEYXJrTW9kZSgpIHtcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrLW1vZGUnKTtcbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgLy8gVXBkYXRlIGljb24gYmFzZWQgb24gbW9kZVxuICAgIGlmIChkYXJrTW9kZVRvZ2dsZSkge1xuICAgICAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvbiBmb3IgbGlnaHQgbW9kZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLW1vb25cIj48L2k+JzsgLy8gTW9vbiBpY29uIGZvciBkYXJrIG1vZGVcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTYXZlIHByZWZlcmVuY2UgdG8gbG9jYWwgc3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsIGlzRGFya01vZGUudG9TdHJpbmcoKSk7XG59XG4vKipcbiAqIENoZWNrIGlmIHVzZXIgaGFzIHN5c3RlbSBkYXJrIG1vZGUgcHJlZmVyZW5jZVxuICogSWYgdGhleSBkbyBhbmQgd2UgaGF2ZW4ndCBzZXQgYSBwcmVmZXJlbmNlIHlldCwgYXBwbHkgZGFyayBtb2RlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKCkge1xuICAgIC8vIE9ubHkgY2hlY2sgaWYgdXNlciBoYXNuJ3QgZXhwbGljaXRseSBzZXQgYSBwcmVmZXJlbmNlXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrTW9kZScpID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHByZWZlcnNEYXJrTW9kZSA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICAgICAgaWYgKHByZWZlcnNEYXJrTW9kZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLW1vZGUnKTtcbiAgICAgICAgICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstbW9kZS10b2dnbGUnKTtcbiAgICAgICAgICAgIGlmIChkYXJrTW9kZVRvZ2dsZSkge1xuICAgICAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9jb21wb25lbnRzL2hlYWRlci50c1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZW5kZXJIZWFkZXIgPSByZW5kZXJIZWFkZXI7XG4vKipcbiAqIEhlYWRlciBDb21wb25lbnRcbiAqIFJlbmRlcnMgdGhlIGhlYWRlciBzZWN0aW9uIGludG8gYSB0YXJnZXQgY29udGFpbmVyLlxuICogRXZlbnQgbGlzdGVuZXJzIHNob3VsZCBiZSBhdHRhY2hlZCBzZXBhcmF0ZWx5IGFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSBjb250YWluZXJJZCAtIFRoZSBJRCBvZiB0aGUgZWxlbWVudCB0byByZW5kZXIgdGhlIGhlYWRlciBpbnRvLiBEZWZhdWx0cyB0byAnaGVhZGVyLXBsYWNlaG9sZGVyJy5cbiAqL1xuZnVuY3Rpb24gcmVuZGVySGVhZGVyKGNvbnRhaW5lcklkID0gJ2hlYWRlci1wbGFjZWhvbGRlcicpIHtcbiAgICAvLyBFbnN1cmUgcnVubmluZyBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGhlYWRlckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcklkKTtcbiAgICBpZiAoIWhlYWRlckNvbnRhaW5lcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBIZWFkZXIgY29udGFpbmVyIHdpdGggSUQgJyR7Y29udGFpbmVySWR9JyBub3QgZm91bmQgaW4gdGhlIERPTS5gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyAtLS0gRGV0ZXJtaW5lIEJhc2UgUGF0aCBiYXNlZCBvbiBFbnZpcm9ubWVudCAtLS1cbiAgICAvLyBDaGVja3MgaWYgcnVubmluZyBvbiB0aGUgcHJvZHVjdGlvbiBjdXN0b20gZG9tYWluIHJvb3Qgb3IgZ2l0aHViLmlvXG4gICAgLy8gQWRqdXN0ICdub2VsdWd3b2tlLmNvbScgaWYgeW91ciBhY3R1YWwgcHJvZHVjdGlvbiBob3N0bmFtZSBkaWZmZXJzXG4gICAgY29uc3QgaXNQcm9kdWN0aW9uID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbm9lbHVnd29rZS5jb20nIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5lbmRzV2l0aCgnLmdpdGh1Yi5pbycpO1xuICAgIC8vIERlZmluZSB0aGUgYmFzZSBwYXRoIGZvciBsaW5rcy4gQXNzdW1lcyBkZXBsb3ltZW50IGlzIHVuZGVyIC9ibG9nLyBvbiBwcm9kdWN0aW9uLlxuICAgIC8vICoqKiBJTVBPUlRBTlQ6IENoYW5nZSAnL2Jsb2cvJyBpZiB5b3VyIEdpdEh1YiByZXBvIG5hbWUgKGFuZCB0aHVzIHN1YmRpcmVjdG9yeSkgaXMgZGlmZmVyZW50ICoqKlxuICAgIGNvbnN0IGJhc2VQYXRoID0gaXNQcm9kdWN0aW9uID8gJy9ibG9nLycgOiAnLyc7XG4gICAgLy8gLS0tIEVuZCBCYXNlIFBhdGggTG9naWMgLS0tXG4gICAgLy8gRGVmaW5lIHRoZSBoZWFkZXIgSFRNTCBzdHJ1Y3R1cmUgdXNpbmcgdGhlIGJhc2VQYXRoIGZvciBsaW5rc1xuICAgIGhlYWRlckNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJzaXRlLWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPjxhIGhyZWY9XCIke2Jhc2VQYXRofVwiPkJsb2c8L2E+PC9oMT4gXG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIke2Jhc2VQYXRofVwiPkhvbWU8L2E+PC9saT4gXG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiJHtiYXNlUGF0aH0jYWJvdXRcIiBpZD1cImFib3V0LWJ0blwiPkFib3V0PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiJHtiYXNlUGF0aH0jcG9ydGZvbGlvXCI+UG9ydGZvbGlvPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3IgYXJ0aWNsZXMuLi5cIiBjbGFzcz1cInNlYXJjaC1iYXJcIj4gXG4gICAgICAgIDwvaGVhZGVyPlxuICAgIGA7XG4gICAgLy8gRXZlbnQgbGlzdGVuZXJzIHNob3VsZCBiZSBjYWxsZWQgKmFmdGVyKiByZW5kZXJIZWFkZXIgaXMgZXhlY3V0ZWQuXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogTmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZU5hdmlnYXRpb24gPSBpbml0aWFsaXplTmF2aWdhdGlvbjtcbi8qKlxuICogSW5pdGlhbGl6ZSBuYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZU5hdmlnYXRpb24oKSB7XG4gICAgc2V0QWN0aXZlTmF2TGluaygpO1xuICAgIHNldHVwTmF2TGlua3MoKTtcbn1cbi8qKlxuICogU2V0IGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmsgYmFzZWQgb24gY3VycmVudCBVUkwgb3IgcGFnZSBzZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIHNldEFjdGl2ZU5hdkxpbmsoKSB7XG4gICAgY29uc3QgY3VycmVudFBhdGggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoY3VycmVudFBhdGgpO1xufVxuLyoqXG4gKiBTZXR1cCBjbGljayBoYW5kbGVycyBmb3IgbmF2aWdhdGlvbiBsaW5rc1xuICovXG5mdW5jdGlvbiBzZXR1cE5hdkxpbmtzKCkge1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgaWYgKGhyZWYpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKGhyZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBIYW5kbGUgc3BlY2lhbCBjYXNlcyBmb3IgcG9wdXAgbGlua3NcbiAgICBjb25zdCBhYm91dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1idG4nKTtcbiAgICBjb25zdCBjb250YWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtYnRuJyk7XG4gICAgaWYgKGFib3V0QnRuKSB7XG4gICAgICAgIGFib3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlTmF2TGluaygnI2Fib3V0Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoY29udGFjdEJ0bikge1xuICAgICAgICBjb250YWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlTmF2TGluaygnI2NvbnRhY3QnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBVcGRhdGUgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmtcbiAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIG9yIHNlY3Rpb24gSUQgdG8gYWN0aXZhdGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQWN0aXZlTmF2TGluayhwYXRoKSB7XG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gbWF0Y2hpbmcgbGlua1xuICAgIGNvbnN0IGFjdGl2ZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXIgbmF2IHVsIGxpIGFbaHJlZj1cIiR7cGF0aH1cIl1gKTtcbiAgICBpZiAoYWN0aXZlTGluaykge1xuICAgICAgICBhY3RpdmVMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplUGFnaW5hdGlvbiA9IGluaXRpYWxpemVQYWdpbmF0aW9uO1xuLy8gUGFnaW5hdGlvbiBmdW5jdGlvbmFsaXR5XG5jb25zdCBjb21tZW50c18xID0gcmVxdWlyZShcIi4vY29tbWVudHNcIik7XG4vKipcbiAqIEluaXRpYWxpemUgcGFnaW5hdGlvbiBmdW5jdGlvbmFsaXR5IHdpdGggTG9hZCBNb3JlIGJ1dHRvblxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUGFnaW5hdGlvbigpIHtcbiAgICBjb25zdCBsb2FkTW9yZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLW1vcmUtYnRuJyk7XG4gICAgY29uc3QgaGlkZGVuUG9zdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLXBvc3RzJyk7XG4gICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZHMnKTtcbiAgICBpZiAoIWxvYWRNb3JlQnRuIHx8ICFoaWRkZW5Qb3N0cyB8fCAhYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUGFnaW5hdGlvbiBlbGVtZW50cyBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBjdXJyZW50UGFnZSA9IDE7XG4gICAgY29uc3QgcG9zdHNQZXJQYWdlID0gMztcbiAgICBjb25zdCB0b3RhbEhpZGRlblBvc3RzID0gaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIC8vIEhpZGUgbG9hZCBtb3JlIGJ1dHRvbiBpZiBubyBoaWRkZW4gcG9zdHNcbiAgICBpZiAodG90YWxIaWRkZW5Qb3N0cyA9PT0gMCkge1xuICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgICAvLyBTZXQgdXAgbG9hZCBtb3JlIGJ1dHRvbiBjbGljayBoYW5kbGVyXG4gICAgbG9hZE1vcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxvYWRNb3JlUG9zdHMobG9hZE1vcmVCdG4sIGhpZGRlblBvc3RzLCBibG9nQ2FyZHNDb250YWluZXIsIGN1cnJlbnRQYWdlLCBwb3N0c1BlclBhZ2UpO1xuICAgICAgICBjdXJyZW50UGFnZSsrO1xuICAgIH0pO1xuICAgIC8vIEluaXRpYWxpemUgc2Nyb2xsLWJhc2VkIGxvYWRpbmcgKGluZmluaXRlIHNjcm9sbClcbiAgICBpbml0aWFsaXplSW5maW5pdGVTY3JvbGwobG9hZE1vcmVCdG4pO1xufVxuLyoqXG4gKiBMb2FkIG1vcmUgcG9zdHMgd2hlbiB0aGUgbG9hZCBtb3JlIGJ1dHRvbiBpcyBjbGlja2VkXG4gKi9cbmZ1bmN0aW9uIGxvYWRNb3JlUG9zdHMobG9hZE1vcmVCdG4sIGhpZGRlblBvc3RzLCBibG9nQ2FyZHNDb250YWluZXIsIGN1cnJlbnRQYWdlLCBwb3N0c1BlclBhZ2UpIHtcbiAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJyk7XG4gICAgbG9hZE1vcmVCdG4uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic3Bpbm5lclwiPjwvc3Bhbj4gTG9hZGluZy4uLic7XG4gICAgLy8gU2ltdWxhdGUgbG9hZGluZyBkZWxheSBmb3IgYmV0dGVyIFVYXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBwb3N0cyB0byBsb2FkXG4gICAgICAgIGNvbnN0IHN0YXJ0SWR4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiBwb3N0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IGVuZElkeCA9IE1hdGgubWluKHN0YXJ0SWR4ICsgcG9zdHNQZXJQYWdlLCBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGgpO1xuICAgICAgICBsZXQgcG9zdHNMb2FkZWQgPSAwO1xuICAgICAgICAvLyBDbG9uZSBhbmQgbW92ZSBwb3N0cyBmcm9tIGhpZGRlbiBjb250YWluZXIgdG8gdmlzaWJsZSBibG9nIGNhcmRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zdHNQZXJQYWdlICYmIGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCA+IDA7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zdFRvQWRkID0gaGlkZGVuUG9zdHMuY2hpbGRyZW5bMF07IC8vIEFsd2F5cyB0YWtlIHRoZSBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgICBpZiAocG9zdFRvQWRkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmVkUG9zdCA9IHBvc3RUb0FkZC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgY2xvbmVkUG9zdC5jbGFzc0xpc3QuYWRkKCduZXcnKTsgLy8gQWRkIGNsYXNzIGZvciBhbmltYXRpb25cbiAgICAgICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkUG9zdCk7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHMucmVtb3ZlQ2hpbGQocG9zdFRvQWRkKTtcbiAgICAgICAgICAgICAgICBwb3N0c0xvYWRlZCsrO1xuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIG5ldyBwb3N0c1xuICAgICAgICAgICAgICAgICgwLCBjb21tZW50c18xLmluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkpKGNsb25lZFBvc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIGlmIHdlJ3ZlIGxvYWRlZCBhbGwgcG9zdHNcbiAgICAgICAgaWYgKGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXNldCBidXR0b24gc3RhdGVcbiAgICAgICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAgICAgICBsb2FkTW9yZUJ0bi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT4gTG9hZCBNb3JlIFBvc3RzJztcbiAgICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50IHdoZW4gcG9zdHMgYXJlIGxvYWRlZFxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgncG9zdHNMb2FkZWQnLCB7IGRldGFpbDogeyBjb3VudDogcG9zdHNMb2FkZWQgfSB9KTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSwgODAwKTsgLy8gU2ltdWxhdGUgbmV0d29yayBkZWxheVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGluZmluaXRlIHNjcm9sbCBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVJbmZpbml0ZVNjcm9sbChsb2FkTW9yZUJ0bikge1xuICAgIGxldCBzY3JvbGxUaW1lb3V0O1xuICAgIGxldCBpc0xvYWRpbmdNb3JlUG9zdHMgPSBmYWxzZTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAvLyBJZiB0aGUgYnV0dG9uIGlzIGhpZGRlbiAoYWxsIHBvc3RzIGxvYWRlZCkgb3IgYWxyZWFkeSBpbiBsb2FkaW5nIHN0YXRlLCBkbyBub3RoaW5nXG4gICAgICAgIGlmIChsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHxcbiAgICAgICAgICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5jb250YWlucygnbG9hZGluZycpIHx8XG4gICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVvdXQoc2Nyb2xsVGltZW91dCk7XG4gICAgICAgIHNjcm9sbFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0LCBjbGllbnRIZWlnaHQgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIC8vIFdoZW4gdXNlciBzY3JvbGxzIHRvIGJvdHRvbSAod2l0aCBzb21lIGJ1ZmZlcilcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gMjAwKSB7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nTW9yZVBvc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJ0bi5jbGljaygpO1xuICAgICAgICAgICAgICAgIC8vIFJlc2V0IGZsYWcgYWZ0ZXIgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2NvbXBvbmVudHMvc2VhcmNoLnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVTZWFyY2ggPSBpbml0aWFsaXplU2VhcmNoO1xuLy8gTm90ZTogZmV0Y2hCbG9nUG9zdHMgYW5kIGNyZWF0ZUJsb2dDYXJkRWxlbWVudCBpbXBvcnRzIG1pZ2h0IG5vdCBiZSBuZWVkZWQgXG4vLyBpZiB0aGlzIHNjcmlwdCBvbmx5IGZpbHRlcnMgYWxyZWFkeSByZW5kZXJlZCBjYXJkcy4gUmVtb3ZlZCB0aGVtIGZvciBub3cuXG4vLyBpbXBvcnQgeyBmZXRjaEJsb2dQb3N0cyB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaSc7IFxuLy8gaW1wb3J0IHsgY3JlYXRlQmxvZ0NhcmRFbGVtZW50IH0gZnJvbSAnLi9ibG9nQ2FyZHMnO1xuLyoqXG4gKiBJbml0aWFsaXplcyBhIHNpbXBsZSwgY2xpZW50LXNpZGUgc2VhcmNoIGZ1bmN0aW9uYWxpdHkgZm9yIGJsb2cgcG9zdHMuXG4gKiBGaWx0ZXJzIGN1cnJlbnRseSB2aXNpYmxlIGJsb2cgY2FyZHMgb24gdGhlIHBhZ2UgYXMgdGhlIHVzZXIgdHlwZXMuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVTZWFyY2goKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmFyJyk7XG4gICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cuYmxvZy1jYXJkcycpOyAvLyBUYXJnZXQgdGhlIG1haW4gY29udGFpbmVyXG4gICAgaWYgKCFzZWFyY2hCYXIgfHwgIWJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1NlYXJjaCBiYXIgKC5zZWFyY2gtYmFyKSBvciBibG9nIGNhcmRzIGNvbnRhaW5lciAoI2Jsb2cuYmxvZy1jYXJkcykgbm90IGZvdW5kLiBTZWFyY2ggbm90IGluaXRpYWxpemVkLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENyZWF0ZSBhIHNlYXJjaCBpbmRpY2F0b3IgZWxlbWVudCAob3B0aW9uYWwpXG4gICAgY29uc3Qgc2VhcmNoSW5kaWNhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VhcmNoSW5kaWNhdG9yLmNsYXNzTmFtZSA9ICdzZWFyY2gtaW5kaWNhdG9yJzsgLy8gQWRkIGNsYXNzIGZvciBzdHlsaW5nXG4gICAgc2VhcmNoSW5kaWNhdG9yLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpOyAvLyBBbm5vdW5jZSBjaGFuZ2VzIHRvIHNjcmVlbiByZWFkZXJzXG4gICAgc2VhcmNoSW5kaWNhdG9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IC8vIFN0YXJ0IGhpZGRlblxuICAgIC8vIEluc2VydCB0aGUgaW5kaWNhdG9yIGJlZm9yZSB0aGUgYmxvZyBjYXJkcyBjb250YWluZXJcbiAgICAoX2EgPSBibG9nQ2FyZHNDb250YWluZXIucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmluc2VydEJlZm9yZShzZWFyY2hJbmRpY2F0b3IsIGJsb2dDYXJkc0NvbnRhaW5lcik7XG4gICAgLy8gT3B0aW9uYWw6IFdyYXAgc2VhcmNoIGJhciBmb3Igc3R5bGluZyBvciBhZGRpbmcgY2xlYXIgYnV0dG9uIChpZiBub3QgYWxyZWFkeSBkb25lKVxuICAgIC8vIFRoaXMgZXhhbXBsZSBhc3N1bWVzIHRoZSBzZWFyY2ggYmFyIGlzIGFscmVhZHkgcGxhY2VkIGNvcnJlY3RseSBpbiB0aGUgaGVhZGVyIEhUTUxcbiAgICAvLyBLZWVwIHRyYWNrIG9mIGFsbCBibG9nIGNhcmRzIC0gd2lsbCBiZSBwb3B1bGF0ZWQgb24gZmlyc3QgZmlsdGVyXG4gICAgbGV0IGFsbENhcmRzID0gW107XG4gICAgLy8gSGFuZGxlIHNlYXJjaCBpbnB1dCB3aXRoIGRlYm91bmNlXG4gICAgbGV0IGRlYm91bmNlVGltZXI7XG4gICAgc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gc2VhcmNoQmFyLnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAvLyBEZWJvdW5jZSB0aGUgZmlsdGVyaW5nXG4gICAgICAgIGNsZWFyVGltZW91dChkZWJvdW5jZVRpbWVyKTtcbiAgICAgICAgZGVib3VuY2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZmlsdGVyQmxvZ0NhcmRzKHNlYXJjaFRlcm0pO1xuICAgICAgICB9LCAzMDApOyAvLyAzMDBtcyBkZWxheVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEZpbHRlcnMgYmxvZyBjYXJkcyBiYXNlZCBvbiBzZWFyY2ggdGVybSBieSBhZGRpbmcvcmVtb3ZpbmcgYSBDU1MgY2xhc3MuXG4gICAgICogQHBhcmFtIHRlcm0gLSBUaGUgc2VhcmNoIHRlcm0gKGxvd2VyY2FzZSkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmlsdGVyQmxvZ0NhcmRzKHRlcm0pIHtcbiAgICAgICAgLy8gR2V0IGFsbCBjYXJkcyBjdXJyZW50bHkgaW4gdGhlIG1haW4gY29udGFpbmVyIE9SIGhpZGRlbiBjb250YWluZXIgaWYgdGhleSBleGlzdFxuICAgICAgICAvLyBUaGlzIGVuc3VyZXMgd2UgZmlsdGVyIGV2ZXJ5dGhpbmcsIGV2ZW4gcGFnaW5hdGVkIGl0ZW1zIGlmIHRoZXkgYXJlIGluIHRoZSBET01cbiAgICAgICAgLy8gSWYgcGFnaW5hdGlvbiByZW1vdmVzIGl0ZW1zIGZyb20gRE9NLCB0aGlzIG5lZWRzIGFkanVzdG1lbnQuXG4gICAgICAgIGlmIChhbGxDYXJkcy5sZW5ndGggPT09IDApIHsgLy8gUG9wdWxhdGUgb24gZmlyc3QgcnVuIG9yIGlmIGNsZWFyZWRcbiAgICAgICAgICAgIGFsbENhcmRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYmxvZy5ibG9nLWNhcmRzIC5ibG9nLWNhcmQsICNoaWRkZW4tcG9zdHMgLmJsb2ctY2FyZCcpKTtcbiAgICAgICAgICAgIGlmIChhbGxDYXJkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGJsb2cgY2FyZHMgZm91bmQgdG8gZmlsdGVyLlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIE5vIGNhcmRzIHJlbmRlcmVkIHlldFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coYFNlYXJjaCBmaWx0ZXJpbmcgaW5pdGlhbGl6ZWQgd2l0aCAke2FsbENhcmRzLmxlbmd0aH0gY2FyZHMuYCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZpc2libGVDb3VudCA9IDA7XG4gICAgICAgIGFsbENhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgbGV0IG1hdGNoZXNTZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICghdGVybSkge1xuICAgICAgICAgICAgICAgIC8vIElmIG5vIHNlYXJjaCB0ZXJtLCBzaG93IGFsbCBjYXJkc1xuICAgICAgICAgICAgICAgIG1hdGNoZXNTZWFyY2ggPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRleHQgY29udGVudCBmcm9tIGltcG9ydGFudCBlbGVtZW50cyB3aXRoaW4gdGhlIGNhcmRcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9ICgoX2IgPSAoX2EgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ2gzJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCkpIHx8ICcnO1xuICAgICAgICAgICAgICAgIC8vIEFkZCBvdGhlciBzZWFyY2hhYmxlIGZpZWxkcyBpZiBuZWVkZWQgKGUuZy4sIGV4Y2VycHQsIGF1dGhvcilcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBleGNlcnB0ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkLWV4Y2VycHQnKT8udGV4dENvbnRlbnQ/LnRvTG93ZXJDYXNlKCkgfHwgJyc7IFxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBBcnJheS5mcm9tKGNhcmQucXVlcnlTZWxlY3RvckFsbCgnLnRhZy1iYWRnZScpKSAvLyBBc3N1bWVzIHRhZ3MgYXJlIHJlbmRlcmVkXG4gICAgICAgICAgICAgICAgICAgIC5tYXAodGFnID0+IHsgdmFyIF9hOyByZXR1cm4gKChfYSA9IHRhZy50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvTG93ZXJDYXNlKCkpIHx8ICcnOyB9KTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgY2FyZCBtYXRjaGVzIHRoZSBzZWFyY2ggdGVybVxuICAgICAgICAgICAgICAgIG1hdGNoZXNTZWFyY2ggPVxuICAgICAgICAgICAgICAgICAgICB0aXRsZS5pbmNsdWRlcyh0ZXJtKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhjZXJwdC5pbmNsdWRlcyh0ZXJtKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3Muc29tZSh0YWcgPT4gdGFnLmluY2x1ZGVzKHRlcm0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNob3cgb3IgaGlkZSB0aGUgY2FyZCB1c2luZyBDU1MgY2xhc3NcbiAgICAgICAgICAgIGlmIChtYXRjaGVzU2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4tYnktc2VhcmNoJyk7XG4gICAgICAgICAgICAgICAgdmlzaWJsZUNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi1ieS1zZWFyY2gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFNob3cvSGlkZS9VcGRhdGUgdGhlIHNlYXJjaCBpbmRpY2F0b3IgdGV4dFxuICAgICAgICBpZiAodGVybSkge1xuICAgICAgICAgICAgc2VhcmNoSW5kaWNhdG9yLnRleHRDb250ZW50ID0gdmlzaWJsZUNvdW50ID4gMFxuICAgICAgICAgICAgICAgID8gYFNob3dpbmcgJHt2aXNpYmxlQ291bnR9IHJlc3VsdCR7dmlzaWJsZUNvdW50ID4gMSA/ICdzJyA6ICcnfSBmb3IgXCIke3Rlcm19XCJgXG4gICAgICAgICAgICAgICAgOiBgTm8gcmVzdWx0cyBmb3VuZCBmb3IgXCIke3Rlcm19XCJgO1xuICAgICAgICAgICAgc2VhcmNoSW5kaWNhdG9yLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VhcmNoSW5kaWNhdG9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IC8vIEhpZGUgaW5kaWNhdG9yIGlmIHNlYXJjaCBpcyBjbGVhcmVkXG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIFwiTm8gcmVzdWx0c1wiIG1lc3NhZ2Ugc3BlY2lmaWNhbGx5IHdpdGhpbiB0aGUgY29udGFpbmVyXG4gICAgICAgIGNvbnN0IG5vUmVzdWx0c01lc3NhZ2UgPSBibG9nQ2FyZHNDb250YWluZXIgPT09IG51bGwgfHwgYmxvZ0NhcmRzQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBibG9nQ2FyZHNDb250YWluZXIucXVlcnlTZWxlY3RvcignLm5vLXNlYXJjaC1yZXN1bHRzLW1lc3NhZ2UnKTtcbiAgICAgICAgaWYgKHZpc2libGVDb3VudCA9PT0gMCAmJiB0ZXJtKSB7XG4gICAgICAgICAgICBpZiAoIW5vUmVzdWx0c01lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5jbGFzc05hbWUgPSAnZW1wdHktc3RhdGUgbm8tc2VhcmNoLXJlc3VsdHMtbWVzc2FnZSc7IC8vIFVzZSBleGlzdGluZyBlbXB0eS1zdGF0ZSBzdHlsaW5nXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXNlYXJjaCBmYS0zeFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPGgzPk5vIG1hdGNoaW5nIHBvc3RzIGZvdW5kPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHA+VHJ5IGRpZmZlcmVudCBrZXl3b3Jkcy48L3A+IFxuICAgICAgICAgICAgICAgIGA7IC8vIFJlbW92ZWQgY2xlYXIgYnV0dG9uIGhlcmUsIEVzY2FwZSBrZXkgd29ya3NcbiAgICAgICAgICAgICAgICBpZiAoYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9SZXN1bHRzTWVzc2FnZSkge1xuICAgICAgICAgICAgbm9SZXN1bHRzTWVzc2FnZS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPcHRpb25hbDogRGlzcGF0Y2ggZXZlbnQgZm9yIHBhZ2luYXRpb24gdG8gcG90ZW50aWFsbHkgcmVzZXQvdXBkYXRlXG4gICAgICAgIC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZWFyY2hBcHBsaWVkJywgeyBkZXRhaWw6IHsgdmlzaWJsZUNvdW50IH0gfSkpO1xuICAgIH1cbiAgICAvLyBBZGQga2V5Ym9hcmQgbmF2aWdhdGlvbiAoRXNjYXBlIGtleSB0byBjbGVhcilcbiAgICBzZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgc2VhcmNoQmFyLnZhbHVlID0gJyc7IC8vIENsZWFyIGlucHV0XG4gICAgICAgICAgICBmaWx0ZXJCbG9nQ2FyZHMoJycpOyAvLyBSZS1maWx0ZXIgd2l0aCBlbXB0eSB0ZXJtXG4gICAgICAgICAgICBzZWFyY2hCYXIuYmx1cigpOyAvLyBSZW1vdmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKCdTZWFyY2ggZnVuY3Rpb25hbGl0eSBpbml0aWFsaXplZC4nKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVCbG9nRnJvbnRlbmQgPSBpbml0aWFsaXplQmxvZ0Zyb250ZW5kO1xuLyoqXG4gKiBCbG9nIEZyb250ZW5kIENvbnRyb2xsZXJcbiAqIENsaWVudC1zaWRlIGNvbnRyb2xsZXIgdGhhdCBoYW5kbGVzIGFsbCBmcm9udGVuZCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgYmxvZyBob21lcGFnZS5cbiAqIE1hbmFnZXMgVUkgaW5pdGlhbGl6YXRpb24sIHBvc3QgcmVuZGVyaW5nLCBmaWx0ZXJpbmcsIGFuZCB1c2VyIGludGVyYWN0aW9ucy5cbiAqL1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpOyAvLyBVc2VzIHN0YXRpYyBmZXRjaCBub3dcbmNvbnN0IGJsb2dDYXJkc18xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYmxvZ0NhcmRzXCIpO1xuY29uc3QgY29udGFjdF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvY29udGFjdFwiKTtcbmNvbnN0IHBhZ2luYXRpb25fMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3BhZ2luYXRpb25cIik7XG5jb25zdCBzZWFyY2hfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3NlYXJjaFwiKTtcbmNvbnN0IGFib3V0XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9hYm91dFwiKTtcbmNvbnN0IG5hdmlnYXRpb25fMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL25hdmlnYXRpb25cIik7XG4vKipcbiAqIEluaXRpYWxpemUgdGhlIGJsb2cgZnJvbnRlbmQgZnVuY3Rpb25hbGl0eSAoaG9tZXBhZ2UpXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVCbG9nRnJvbnRlbmQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBCbG9nIEZyb250ZW5kIENvbnRyb2xsZXIuLi4nKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBuYXZpZ2F0aW9uIGZpcnN0IHRvIGVuc3VyZSBhY3RpdmUgc3RhdGVzIGFyZSBzZXRcbiAgICAgICAgKDAsIG5hdmlnYXRpb25fMS5pbml0aWFsaXplTmF2aWdhdGlvbikoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBpbnRlcmFjdGl2ZSBjb21wb25lbnRzIHNwZWNpZmljIHRvIHRoZSBtYWluIHBhZ2VcbiAgICAgICAgKDAsIGNvbnRhY3RfMS5pbml0aWFsaXplQ29udGFjdEZvcm0pKCk7IC8vIEFzc3VtZXMgI2NvbnRhY3QtYnRuIGFuZCAjY29udGFjdC1wb3B1cCBleGlzdFxuICAgICAgICAoMCwgYWJvdXRfMS5pbml0aWFsaXplQWJvdXQpKCk7IC8vIEFzc3VtZXMgI2Fib3V0LWJ0biBhbmQgI2Fib3V0LXBvcHVwIGV4aXN0XG4gICAgICAgICgwLCBzZWFyY2hfMS5pbml0aWFsaXplU2VhcmNoKSgpOyAvLyBBc3N1bWVzIC5zZWFyY2gtYmFyIGV4aXN0c1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBibG9nIHBvc3RzIGRpc3BsYXksIGluY2x1ZGluZyBmaWx0ZXJpbmdcbiAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgcGFnaW5hdGlvbiBhZnRlciBpbml0aWFsIHBvc3RzIChwb3NzaWJseSBmaWx0ZXJlZCkgYXJlIGxvYWRlZFxuICAgICAgICAoMCwgcGFnaW5hdGlvbl8xLmluaXRpYWxpemVQYWdpbmF0aW9uKSgpO1xuICAgICAgICAvLyBTZXQgdXAgZXZlbnQgZGVsZWdhdGlvbiBmb3IgbmF2aWdhdGluZyB3aGVuIGNsaWNraW5nIGJsb2cgY2FyZHNcbiAgICAgICAgc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCk7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgY3VzdG9tIGV2ZW50IHRvIHJlbG9hZCBwb3N0cyAoZS5nLiwgYWZ0ZXIgc2VhcmNoIG9yIGZpbHRlciBjaGFuZ2UpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlbG9hZFBvc3RzJywgaGFuZGxlUmVsb2FkUG9zdHMpO1xuICAgICAgICBjb25zb2xlLmxvZygnQmxvZyBGcm9udGVuZCBDb250cm9sbGVyIEluaXRpYWxpemVkLicpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBIYW5kbGVzIHRoZSBjdXN0b20gJ3JlbG9hZFBvc3RzJyBldmVudC4gUmVmZXRjaGVzIGFuZCByZS1yZW5kZXJzIHBvc3RzLlxuICovXG5mdW5jdGlvbiBoYW5kbGVSZWxvYWRQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVsb2FkaW5nIHBvc3RzIGR1ZSB0byByZWxvYWRQb3N0cyBldmVudC4uLicpO1xuICAgICAgICAvLyBSZS1pbml0aWFsaXplIHBvc3RzLCB3aGljaCB3aWxsIHBpY2sgdXAgYW55IG5ldyBVUkwgcGFyYW1ldGVycyAobGlrZSBzZWFyY2ggcXVlcnkgT1IgdGFnKVxuICAgICAgICB5aWVsZCBpbml0aWFsaXplUG9zdHMoKTtcbiAgICAgICAgKDAsIHBhZ2luYXRpb25fMS5pbml0aWFsaXplUGFnaW5hdGlvbikoKTtcbiAgICAgICAgLy8gUmUtc2V0dXAgZGVsZWdhdGlvbiBpbiBjYXNlIERPTSBlbGVtZW50cyB3ZXJlIHJlcGxhY2VkXG4gICAgICAgIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgZXZlbnQgZGVsZWdhdGlvbiBmb3IgYmxvZyBjYXJkcyBjb250YWluZXJcbiAqIEhhbmRsZXMgY2xpY2tzIGZvciBuYXZpZ2F0aW9uLCBwcmV2ZW50aW5nIGNsaWNrcyBvbiBpbnRlcmFjdGl2ZSBlbGVtZW50cy5cbiAqL1xuZnVuY3Rpb24gc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCkge1xuICAgIC8vIFRhcmdldCB0aGUgbWFpbiBjb250YWluZXIgZm9yIGJsb2cgY2FyZHNcbiAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZy5ibG9nLWNhcmRzJyk7XG4gICAgaWYgKGJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXIgZmlyc3QgdG8gcHJldmVudCBkdXBsaWNhdGVzIGlmIGluaXRpYWxpemVCbG9nRnJvbnRlbmQgaXMgY2FsbGVkIGFnYWluXG4gICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVCbG9nQ2FyZENsaWNrKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0V2ZW50IGRlbGVnYXRpb24gc2V0IHVwIGZvciAjYmxvZy5ibG9nLWNhcmRzJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBmaW5kICNibG9nLmJsb2ctY2FyZHMgY29udGFpbmVyIGZvciBkZWxlZ2F0aW9uLicpO1xuICAgIH1cbn1cbi8qKlxuICogSGFuZGxlIGNsaWNrIGV2ZW50cyBvbiBibG9nIGNhcmRzIHVzaW5nIGV2ZW50IGRlbGVnYXRpb25cbiAqL1xuZnVuY3Rpb24gaGFuZGxlQmxvZ0NhcmRDbGljayhldmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAvLyBGaW5kIHRoZSBjbG9zZXN0IGFuY2VzdG9yIHdoaWNoIGlzIGEgYmxvZyBjYXJkXG4gICAgY29uc3QgY2FyZCA9IHRhcmdldC5jbG9zZXN0KCcuYmxvZy1jYXJkJyk7XG4gICAgaWYgKGNhcmQpIHtcbiAgICAgICAgLy8gUHJldmVudCBuYXZpZ2F0aW9uIGlmIHRoZSBjbGljayBvcmlnaW5hdGVkIG9uIGFuIGludGVyYWN0aXZlIGVsZW1lbnQgd2l0aGluIHRoZSBjYXJkXG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBhLCBpJykpIHtcbiAgICAgICAgICAgIC8vIEFsbG93IG5hdmlnYXRpb24gc3BlY2lmaWNhbGx5IGZvciB0YWcgbGlua3Mgd2l0aGluIHRoZSBjYXJkXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoJ2EudGFnLWJhZGdlJykpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCB0YWcgbGluaywgYWxsb3dpbmcgZGVmYXVsdCBuYXZpZ2F0aW9uLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDbGlja2VkIGludGVyYWN0aXZlIGVsZW1lbnQgaW5zaWRlIGNhcmQsIHByZXZlbnRpbmcgbmF2aWdhdGlvbi4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgcG9zdCBJRCBhbmQgbmF2aWdhdGUgaWYgdGhlIGNhcmQgaXRzZWxmIChub3QgYW4gaW50ZXJhY3RpdmUgZWxlbWVudCkgd2FzIGNsaWNrZWRcbiAgICAgICAgY29uc3QgcG9zdElkID0gY2FyZC5kYXRhc2V0LnBvc3RJZDtcbiAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYE5hdmlnYXRpbmcgdG8gcG9zdCAke3Bvc3RJZH1gKTtcbiAgICAgICAgICAgIC8vIFVzZSByZWxhdGl2ZSBwYXRoIGZvciBuYXZpZ2F0aW9uIHRvIHBvc3QgZGV0YWlsIHBhZ2VcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHBvc3QuaHRtbD9pZD0ke3Bvc3RJZH1gO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGJsb2cgcG9zdHM6IEZldGNoLCBmaWx0ZXIgKGJhc2VkIG9uIFVSTCBwYXJhbSksIGFuZCByZW5kZXIuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZy5ibG9nLWNhcmRzJyk7XG4gICAgICAgIGlmICghYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdCbG9nIGNhcmRzIGNvbnRhaW5lciAoI2Jsb2cuYmxvZy1jYXJkcykgbm90IGZvdW5kIGluIHRoZSBET00uJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gLS0tIENoZWNrIGZvciBUYWcgRmlsdGVyIC0tLVxuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICBjb25zdCB0YWdGaWx0ZXIgPSB1cmxQYXJhbXMuZ2V0KCd0YWcnKTtcbiAgICAgICAgY29uc3QgZmlsdGVyRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXItZGlzcGxheScpOyAvLyBPcHRpb25hbCBlbGVtZW50IHRvIHNob3cgZmlsdGVyXG4gICAgICAgIC8vIC0tLSBEZXRlcm1pbmUgQmFzZSBQYXRoIChuZWVkZWQgZm9yIENsZWFyIEZpbHRlciBsaW5rKSAtLS1cbiAgICAgICAgY29uc3QgY3VycmVudEhvc3RuYW1lID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgICAgICBjb25zdCBpc1Byb2R1Y3Rpb24gPSBjdXJyZW50SG9zdG5hbWUgPT09ICdub2VsdWd3b2tlLmNvbScgfHwgY3VycmVudEhvc3RuYW1lLmVuZHNXaXRoKCcuZ2l0aHViLmlvJyk7XG4gICAgICAgIC8vICoqKiBJTVBPUlRBTlQ6IENoYW5nZSAnL2Jsb2cvJyBpZiB5b3VyIEdpdEh1YiByZXBvIG5hbWUvcGF0aCBpcyBkaWZmZXJlbnQgKioqXG4gICAgICAgIGNvbnN0IGJhc2VQYXRoID0gaXNQcm9kdWN0aW9uID8gJy9ibG9nLycgOiAnLyc7XG4gICAgICAgIC8vIC0tLSBFbmQgQmFzZSBQYXRoIExvZ2ljIC0tLVxuICAgICAgICAvLyBSZW1vdmUgYW55IGV4aXN0aW5nIGZpbHRlciBpbmRpY2F0b3IgYmVmb3JlIHBvdGVudGlhbGx5IGFkZGluZyBhIG5ldyBvbmVcbiAgICAgICAgY29uc3QgZXhpc3RpbmdGaWx0ZXJJbmRpY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFnLWZpbHRlci1pbmRpY2F0b3InKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nRmlsdGVySW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBleGlzdGluZ0ZpbHRlckluZGljYXRvci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgZmlsdGVyIGluZGljYXRvciBpZiB0YWdGaWx0ZXIgZXhpc3RzXG4gICAgICAgIGlmICh0YWdGaWx0ZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBcHBseWluZyBmaWx0ZXIgZm9yIHRhZzogXCIke3RhZ0ZpbHRlcn1cImApO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmaWx0ZXJDb250YWluZXIuY2xhc3NOYW1lID0gJ3RhZy1maWx0ZXItaW5kaWNhdG9yJztcbiAgICAgICAgICAgIC8vIFVzZSBiYXNlUGF0aCBmb3IgdGhlIENsZWFyIGZpbHRlciBsaW5rJ3MgaHJlZlxuICAgICAgICAgICAgZmlsdGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxwPlNob3dpbmcgcG9zdHMgdGFnZ2VkIHdpdGg6IDxzcGFuIGNsYXNzPVwiZmlsdGVyZWQtdGFnXCI+JHt0YWdGaWx0ZXJ9PC9zcGFuPjwvcD5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIke2Jhc2VQYXRofVwiIGNsYXNzPVwiY2xlYXItZmlsdGVyXCI+Q2xlYXIgZmlsdGVyPC9hPiBcbiAgICAgICAgYDtcbiAgICAgICAgICAgIC8vIEluc2VydCBmaWx0ZXIgaW5kaWNhdG9yIGJlZm9yZSB0aGUgYmxvZyBjYXJkcyBjb250YWluZXJcbiAgICAgICAgICAgIGNvbnN0IGJsb2dTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jsb2cnKTsgLy8gVGFyZ2V0IHRoZSBzZWN0aW9uIGl0c2VsZlxuICAgICAgICAgICAgaWYgKGJsb2dTZWN0aW9uID09PSBudWxsIHx8IGJsb2dTZWN0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBibG9nU2VjdGlvbi5wYXJlbnROb2RlKSB7IC8vIEVuc3VyZSBwYXJlbnQgZXhpc3RzXG4gICAgICAgICAgICAgICAgYmxvZ1NlY3Rpb24ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZmlsdGVyQ29udGFpbmVyLCBibG9nU2VjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBbHNvIHVwZGF0ZSBzZXBhcmF0ZSBmaWx0ZXIgZGlzcGxheSBlbGVtZW50IGlmIGl0IGV4aXN0c1xuICAgICAgICAgICAgaWYgKGZpbHRlckRpc3BsYXkpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJEaXNwbGF5LnRleHRDb250ZW50ID0gYFNob3dpbmcgcG9zdHMgdGFnZ2VkIHdpdGg6IFwiJHt0YWdGaWx0ZXJ9XCJgO1xuICAgICAgICAgICAgICAgIGZpbHRlckRpc3BsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmlsdGVyRGlzcGxheSkge1xuICAgICAgICAgICAgZmlsdGVyRGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyAvLyBIaWRlIGlmIG5vIGZpbHRlclxuICAgICAgICB9XG4gICAgICAgIC8vIC0tLSBFbmQgQ2hlY2sgZm9yIFRhZyBGaWx0ZXIgLS0tXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj48L2Rpdj48cD5Mb2FkaW5nIHBvc3RzLi4uPC9wPic7XG4gICAgICAgICAgICAvLyBGZXRjaCBBTEwgcG9zdHMgZnJvbSBzdGF0aWMgSlNPTlxuICAgICAgICAgICAgbGV0IGFsbFBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEZldGNoZWQgJHthbGxQb3N0cy5sZW5ndGh9IHRvdGFsIHBvc3RzLmApO1xuICAgICAgICAgICAgLy8gLS0tIEFwcGx5IFRhZyBGaWx0ZXIgLS0tXG4gICAgICAgICAgICBsZXQgcG9zdHNUb0Rpc3BsYXkgPSBhbGxQb3N0czsgLy8gU3RhcnQgd2l0aCBhbGwgcG9zdHNcbiAgICAgICAgICAgIGlmICh0YWdGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGFncyBhcnJheSBleGlzdHMgYW5kIHBlcmZvcm0gY2FzZS1pbnNlbnNpdGl2ZSBjb21wYXJpc29uXG4gICAgICAgICAgICAgICAgcG9zdHNUb0Rpc3BsYXkgPSBhbGxQb3N0cy5maWx0ZXIocG9zdCA9PiBwb3N0LnRhZ3MgJiYgcG9zdC50YWdzLnNvbWUodGFnID0+IHRhZy50b0xvd2VyQ2FzZSgpID09PSB0YWdGaWx0ZXIudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGaWx0ZXJlZCBkb3duIHRvICR7cG9zdHNUb0Rpc3BsYXkubGVuZ3RofSBwb3N0cyBmb3IgdGFnOiBcIiR7dGFnRmlsdGVyfVwiYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAtLS0gRW5kIEFwcGx5IFRhZyBGaWx0ZXIgLS0tXG4gICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIGxvYWRpbmcgc3RhdGVcbiAgICAgICAgICAgIGlmIChwb3N0c1RvRGlzcGxheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBQYXNzIHRoZSB0YWcgZmlsdGVyIHRvIGVtcHR5IHN0YXRlIG1lc3NhZ2UgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTdGF0ZShibG9nQ2FyZHNDb250YWluZXIsIHRhZ0ZpbHRlciAhPT0gbnVsbCAmJiB0YWdGaWx0ZXIgIT09IHZvaWQgMCA/IHRhZ0ZpbHRlciA6IHVuZGVmaW5lZCk7IC8vIFVzZSBudWxsaXNoIGNvYWxlc2NpbmcgZm9yIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICAgICAgICAgICAgICBpZiAobG9hZE1vcmVCdG4pXG4gICAgICAgICAgICAgICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUGFnaW5hdGlvbiBsb2dpY1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFBvc3RDb3VudCA9IDY7IC8vIE51bWJlciBvZiBwb3N0cyB0byBzaG93IGluaXRpYWxseVxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVBvc3RzID0gcG9zdHNUb0Rpc3BsYXkuc2xpY2UoMCwgaW5pdGlhbFBvc3RDb3VudCk7XG4gICAgICAgICAgICBjb25zdCBoaWRkZW5Qb3N0cyA9IHBvc3RzVG9EaXNwbGF5LnNsaWNlKGluaXRpYWxQb3N0Q291bnQpO1xuICAgICAgICAgICAgLy8gUmVuZGVyIGluaXRpYWxseSB2aXNpYmxlIHBvc3RzXG4gICAgICAgICAgICBkaXNwbGF5UG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9nQ2FyZCA9ICgwLCBibG9nQ2FyZHNfMS5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQpKHBvc3QpO1xuICAgICAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChibG9nQ2FyZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFByZXBhcmUgaGlkZGVuIHBvc3RzIGNvbnRhaW5lciBmb3IgcGFnaW5hdGlvblxuICAgICAgICAgICAgY29uc3QgaGlkZGVuUG9zdHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLXBvc3RzJyk7XG4gICAgICAgICAgICBpZiAoaGlkZGVuUG9zdHNDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJzsgLy8gQ2xlYXIgcHJldmlvdXMgaGlkZGVuIHBvc3RzXG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuUG9zdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvZ0NhcmQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlIGxvYWQgbW9yZSBidXR0b24gdmlzaWJpbGl0eVxuICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgICAgICAgICAgaWYgKGxvYWRNb3JlQnRuKSB7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9IGhpZGRlblBvc3RzLmxlbmd0aCA+IDAgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW5pdGlhbGl6aW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvclN0YXRlKGJsb2dDYXJkc0NvbnRhaW5lcik7IC8vIFNob3cgZXJyb3Igc3RhdGUgaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFNob3cgZW1wdHkgc3RhdGUgd2hlbiBubyBwb3N0cyBhcmUgYXZhaWxhYmxlXG4gKiBAcGFyYW0gY29udGFpbmVyIC0gVGhlIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gdGFnRmlsdGVyIC0gT3B0aW9uYWwgdGFnIGZpbHRlciB0aGF0IHdhcyB1c2VkXG4gKi9cbmZ1bmN0aW9uIHNob3dFbXB0eVN0YXRlKGNvbnRhaW5lciwgdGFnRmlsdGVyKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnN0IGVtcHR5U3RhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbXB0eVN0YXRlRGl2LmNsYXNzTmFtZSA9ICdlbXB0eS1zdGF0ZSc7XG4gICAgLy8gRGV0ZXJtaW5lIHRoZSBjb3JyZWN0IGJhc2UgcGF0aCBmb3IgdGhlIFwiVmlldyBhbGwgcG9zdHNcIiBsaW5rXG4gICAgY29uc3QgY3VycmVudEhvc3RuYW1lID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIGNvbnN0IGlzUHJvZHVjdGlvbiA9IGN1cnJlbnRIb3N0bmFtZSA9PT0gJ25vZWx1Z3dva2UuY29tJyB8fCBjdXJyZW50SG9zdG5hbWUuZW5kc1dpdGgoJy5naXRodWIuaW8nKTtcbiAgICBjb25zdCBiYXNlUGF0aCA9IGlzUHJvZHVjdGlvbiA/ICcvYmxvZy8nIDogJy8nO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0YWdGaWx0ZXJcbiAgICAgICAgPyBgTm8gcG9zdHMgZm91bmQgdGFnZ2VkIHdpdGggXCIke3RhZ0ZpbHRlcn1cIi5gXG4gICAgICAgIDogJ05vIHBvc3RzIHlldCEnOyAvLyBDaGFuZ2VkIGRlZmF1bHQgbWVzc2FnZSBzbGlnaHRseVxuICAgIGVtcHR5U3RhdGVEaXYuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1maWxlLWFsdCBmYS0zeFwiPjwvaT5cbiAgICAgICAgPGgzPiR7bWVzc2FnZX08L2gzPlxuICAgICAgICAke3RhZ0ZpbHRlciA/IGA8cD48YSBocmVmPVwiJHtiYXNlUGF0aH1cIj5WaWV3IGFsbCBwb3N0czwvYT48L3A+YCA6ICc8cD5DaGVjayBiYWNrIGxhdGVyIGZvciBuZXcgY29udGVudCE8L3A+J31cbiAgICBgO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbXB0eVN0YXRlRGl2KTtcbiAgICBjb25zb2xlLmxvZygnRGlzcGxheWVkIGVtcHR5IHN0YXRlIGZvciBwb3N0cy4nKTtcbn1cbi8qKlxuICogU2hvdyBlcnJvciBzdGF0ZSB3aGVuIHBvc3RzIGNvdWxkbid0IGJlIGxvYWRlZFxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JTdGF0ZShjb250YWluZXIpIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgY29uc3QgZXJyb3JTdGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVycm9yU3RhdGVEaXYuY2xhc3NOYW1lID0gJ2Vycm9yLXN0YXRlJztcbiAgICBlcnJvclN0YXRlRGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZmEtM3hcIj48L2k+XG4gICAgICAgIDxoMz5Tb21ldGhpbmcgd2VudCB3cm9uZzwvaDM+XG4gICAgICAgIDxwPkZhaWxlZCB0byBsb2FkIGJsb2cgcG9zdHMuIFBsZWFzZSB0cnkgcmVmcmVzaGluZyB0aGUgcGFnZS48L3A+XG4gICAgYDtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZXJyb3JTdGF0ZURpdik7XG4gICAgY29uc29sZS5sb2coJ0Rpc3BsYXllZCBlcnJvciBzdGF0ZSBmb3IgcG9zdHMuJyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9lbnRyaWVzL2NsaWVudC50c1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBJbXBvcnRzIHJlbWFpbiB0aGUgc2FtZS4uLlxuY29uc3QgYmxvZ0Zyb250ZW5kQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2Jsb2dGcm9udGVuZENvbnRyb2xsZXJcIik7XG5jb25zdCBwb3N0RGV0YWlsXzEgPSByZXF1aXJlKFwiLi4vbW9kdWxlcy9wb3N0RGV0YWlsXCIpO1xuY29uc3QgaGVhZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vKipcbiAqIENsaWVudC1zaWRlIGVudHJ5IHBvaW50IGluaXRpYWxpemVyLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ2xpZW50KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGllbnQgaW5pdGlhbGl6aW5nLi4uJyk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgY29tbW9uIGVsZW1lbnRzIGZpcnN0XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEYXJrIG1vZGUgaW5pdGlhbGl6ZWQgZ2xvYmFsbHkuJyk7XG4gICAgICAgICAgICAvLyBSZW5kZXIgSGVhZGVyIG9ubHkgaWYgcGxhY2Vob2xkZXIgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlci1wbGFjZWhvbGRlcicpKSB7XG4gICAgICAgICAgICAgICAgKDAsIGhlYWRlcl8xLnJlbmRlckhlYWRlcikoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGVyIHJlbmRlcmVkIGdsb2JhbGx5LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdIZWFkZXIgcGxhY2Vob2xkZXIgbm90IGZvdW5kIG9uIHRoaXMgcGFnZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgY29tbW9uIGVsZW1lbnRzOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUGFnZS1zcGVjaWZpYyBsb2dpY1xuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5wYWdlO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgLy8gR2V0IHRoZSBiYXNlIG5hbWUgb2YgdGhlIGZpbGUvcGF0aCwgcmVtb3ZpbmcgdHJhaWxpbmcgc2xhc2ggaWYgcHJlc2VudFxuICAgICAgICBjb25zdCBwYXRoRW5kID0gY3VycmVudFBhZ2UuZW5kc1dpdGgoJy8nKSA/IGN1cnJlbnRQYWdlLnNsaWNlKDAsIC0xKS5zcGxpdCgnLycpLnBvcCgpIDogY3VycmVudFBhZ2Uuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgICAgY29uc3QgaXNSb290T3JJbmRleCA9IGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvJykgfHwgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9pbmRleC5odG1sJyk7IC8vIENoZWNrIGlmIGl0J3MgdGhlIHJvb3Qgb2YgdGhlIGRlcGxveW1lbnRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZXRlY3RlZCBwYWdlVHlwZTogJHtwYWdlVHlwZX0sIGN1cnJlbnRQYWdlOiAke2N1cnJlbnRQYWdlfSwgcGF0aEVuZDogJHtwYXRoRW5kfSwgaXNSb290T3JJbmRleDogJHtpc1Jvb3RPckluZGV4fWApO1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIE1haW4gUGFnZSAodXNpbmcgZGF0YS1wYWdlIG9yIHBhdGggZW5kaW5nIGluIC8gb3IgL2luZGV4Lmh0bWwpXG4gICAgICAgICAgICBpZiAocGFnZVR5cGUgPT09ICdtYWluJyB8fCAoIXBhZ2VUeXBlICYmIGlzUm9vdE9ySW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBtYWluIGJsb2cgcGFnZSBsb2dpYy4uLicpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBibG9nRnJvbnRlbmRDb250cm9sbGVyXzEuaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCkoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWFpbiBibG9nIHBhZ2UgbG9naWMgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIFBvc3QgRGV0YWlsIFBhZ2UgKHVzaW5nIGRhdGEtcGFnZSBvciBwYXRoIGVuZGluZyBpbiAvcG9zdC5odG1sKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFnZVR5cGUgPT09ICdwb3N0JyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvcG9zdC5odG1sJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBwb3N0IGRldGFpbCBwYWdlIGxvZ2ljIChmcm9tIG1vZHVsZSkuLi4nKTtcbiAgICAgICAgICAgICAgICB5aWVsZCAoMCwgcG9zdERldGFpbF8xLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljKSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRldGFpbCBwYWdlIGxvZ2ljIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBBZG1pbiBQYWdlICh1c2luZyBkYXRhLXBhZ2Ugb3IgcGF0aCBlbmRpbmcgaW4gL2FkbWluLmh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ2FkbWluJyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvYWRtaW4uaHRtbCcpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZG1pbiBwYWdlIGRldGVjdGVkIGJ5IGNsaWVudC50cyAtIG5vIGFjdGlvbiB0YWtlbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmtub3duIHBhZ2UgdHlwZSAoJyR7cGFnZVR5cGV9Jykgb3IgcGF0aCAoJyR7Y3VycmVudFBhZ2V9JykuIE5vIHNwZWNpZmljIGluaXRpYWxpemF0aW9uIG5lZWRlZCBmcm9tIGNsaWVudC50cy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBwYWdlLXNwZWNpZmljIGNsaWVudCBpbml0aWFsaXphdGlvbjonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIERPTUNvbnRlbnRMb2FkZWQgbGlzdGVuZXIgcmVtYWlucyB0aGUgc2FtZS4uLlxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0aWFsaXplQ2xpZW50KTtcbn1cbmVsc2Uge1xuICAgIGluaXRpYWxpemVDbGllbnQoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL21vZHVsZXMvcG9zdERldGFpbC50c1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljID0gaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWM7XG5leHBvcnRzLmxvYWRQb3N0Q29udGVudCA9IGxvYWRQb3N0Q29udGVudDtcbmV4cG9ydHMudXBkYXRlUG9zdFVJID0gdXBkYXRlUG9zdFVJO1xuZXhwb3J0cy51cGRhdGVQYWdlTWV0YWRhdGEgPSB1cGRhdGVQYWdlTWV0YWRhdGE7XG5leHBvcnRzLmluaXRpYWxpemVTb2NpYWxTaGFyaW5nID0gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmc7XG5leHBvcnRzLnNob3dFcnJvck1lc3NhZ2UgPSBzaG93RXJyb3JNZXNzYWdlO1xuLy8gLS0tIEltcG9ydHMgLS0tXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCB1cmxUcmFuc2Zvcm1lcl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3VybFRyYW5zZm9ybWVyXCIpO1xuY29uc3QgaGVhZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vLyAtLS0gQ29yZSBJbml0aWFsaXphdGlvbiBGdW5jdGlvbiAtLS1cbi8qKlxuICogSW5pdGlhbGl6ZXMgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBwb3N0IGRldGFpbCBwYWdlLlxuICogVGhpcyBpcyB0aGUgbWFpbiBleHBvcnRlZCBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBjYWxsZWQgYnkgdGhlIGVudHJ5IHBvaW50LlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIHBvc3QgZGV0YWlsIHBhZ2UuLi4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKSgpO1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuaW5pdGlhbGl6ZURhcmtNb2RlKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RhcmsgbW9kZSBpbml0aWFsaXplZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGhlYWRlcl8xLnJlbmRlckhlYWRlcikoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWFkZXIgcmVuZGVyZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgY29uc3QgcG9zdElkID0gdXJsUGFyYW1zLmdldCgnaWQnKTtcbiAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgeWllbGQgbG9hZFBvc3RDb250ZW50KHBvc3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBwb3N0IElEIHByb3ZpZGVkIGluIHRoZSBVUkwnKTtcbiAgICAgICAgICAgIHNob3dFcnJvck1lc3NhZ2UoJ05vIHBvc3Qgc3BlY2lmaWVkLiBQbGVhc2UgY2hlY2sgdGhlIFVSTC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnUG9zdCBkZXRhaWwgcGFnZSBpbml0aWFsaXphdGlvbiBjb21wbGV0ZS4nKTtcbiAgICB9KTtcbn1cbi8qKlxuICogTG9hZCBhbmQgZGlzcGxheSBwb3N0IGNvbnRlbnQgYmFzZWQgb24gcG9zdCBJRFxuICovXG5mdW5jdGlvbiBsb2FkUG9zdENvbnRlbnQocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBwb3N0IHdpdGggSUQ6ICR7cG9zdElkfWApO1xuICAgICAgICAgICAgY29uc3QgcG9zdCA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaFBvc3RCeUlkKShwb3N0SWQpO1xuICAgICAgICAgICAgaWYgKCFwb3N0KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUG9zdCB3aXRoIElEICR7cG9zdElkfSBub3QgZm91bmRgKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRhdGEgZmV0Y2hlZDonLCBwb3N0KTtcbiAgICAgICAgICAgIHVwZGF0ZVBvc3RVSShwb3N0KTtcbiAgICAgICAgICAgIHVwZGF0ZVBhZ2VNZXRhZGF0YShwb3N0KTtcbiAgICAgICAgICAgIGluaXRpYWxpemVTb2NpYWxTaGFyaW5nKHBvc3QpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBwb3N0IGNvbnRlbnQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZShgRmFpbGVkIHRvIGxvYWQgdGhlIGJsb2cgcG9zdC4gJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLid9YCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogVXBkYXRlIHRoZSBwb3N0IFVJIHdpdGggY29udGVudCBmcm9tIHRoZSBsb2FkZWQgcG9zdFxuICovXG5mdW5jdGlvbiB1cGRhdGVQb3N0VUkocG9zdCkge1xuICAgIGNvbnNvbGUubG9nKCdVcGRhdGluZyBQb3N0IFVJIGZvcjonLCBwb3N0LnRpdGxlKTtcbiAgICBjb25zdCBwb3N0QXJ0aWNsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgaWYgKCFwb3N0QXJ0aWNsZUVsZW1lbnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQ2Fubm90IHVwZGF0ZSBVSTogI3Bvc3QtY29udGVudCBlbGVtZW50IG5vdCBmb3VuZC4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGlubmVyIEhUTUwgZHluYW1pY2FsbHlcbiAgICBwb3N0QXJ0aWNsZUVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxoMT4ke3Bvc3QudGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LW1ldGFcIj5cbiAgICAgICAgICAgICAgICA8dGltZSBkYXRldGltZT1cIiR7cG9zdC5jcmVhdGVkQXQgPyBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdIDogJyd9XCI+XG4gICAgICAgICAgICAgICAgICAgICR7cG9zdC5jcmVhdGVkQXQgPyBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJyB9KSA6ICdEYXRlIHVua25vd24nfVxuICAgICAgICAgICAgICAgIDwvdGltZT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF1dGhvclwiPmJ5ICR7cG9zdC5hdXRob3IgfHwgJ0Fub255bW91cyd9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgJHtwb3N0LmltYWdlVXJsID8gYDxpbWcgc3JjPVwiJHtwb3N0LmltYWdlVXJsfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIiBjbGFzcz1cImZlYXR1cmVkLWltYWdlXCI+YCA6ICcnfVxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWNvbnRlbnQtYm9keVwiPlxuICAgICAgICAgICAgJHtwb3N0LmNvbnRlbnR9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWZvb3RlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3NcIj5cbiAgICAgICAgICAgICAgICAke3Bvc3QudGFncyAmJiBwb3N0LnRhZ3MubGVuZ3RoID4gMCA/IGA8c3Bhbj5UYWdzOjwvc3Bhbj4gJHtwb3N0LnRhZ3MubWFwKHRhZyA9PiBgPGEgaHJlZj1cIiR7KDAsIHVybFRyYW5zZm9ybWVyXzEuZ2VuZXJhdGVUYWdGaWx0ZXJVcmwpKHRhZyl9XCI+JHt0YWd9PC9hPmApLmpvaW4oJycpfWAgOiAnJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvY2lhbC1zaGFyaW5nXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+U2hhcmU6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gdHdpdHRlclwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBUd2l0dGVyXCI+PGkgY2xhc3M9XCJmYWIgZmEtdHdpdHRlclwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGZhY2Vib29rXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIEZhY2Vib29rXCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2stZlwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGxpbmtlZGluXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIExpbmtlZEluXCI+PGkgY2xhc3M9XCJmYWIgZmEtbGlua2VkaW4taW5cIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICBjb25zb2xlLmxvZygnUG9zdCBVSSB1cGRhdGVkIHdpdGggbGlrZSBidXR0b24gYW5kIGNvbW1lbnRzIHNlY3Rpb24gc3RydWN0dXJlLicpO1xufVxuLyoqXG4gKiBVcGRhdGUgcGFnZSBtZXRhZGF0YSBsaWtlIHRpdGxlIGFuZCBVUkxcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUGFnZU1ldGFkYXRhKHBvc3QpIHtcbiAgICBkb2N1bWVudC50aXRsZSA9IGAke3Bvc3QudGl0bGV9IHwgTm9lbCdzIEJsb2dgO1xuICAgIGNvbnNvbGUubG9nKCdQYWdlIG1ldGFkYXRhIHVwZGF0ZWQuJyk7XG59XG4vKipcbiAqIEluaXRpYWxpemUgc29jaWFsIHNoYXJpbmcgZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplU29jaWFsU2hhcmluZyhwb3N0KSB7XG4gICAgY29uc3QgcG9zdEFydGljbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGlmICghcG9zdEFydGljbGVFbGVtZW50KVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3Qgc29jaWFsU2hhcmluZ0RpdiA9IHBvc3RBcnRpY2xlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsLXNoYXJpbmcnKTtcbiAgICBpZiAoc29jaWFsU2hhcmluZ0Rpdikge1xuICAgICAgICBzb2NpYWxTaGFyaW5nRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNoYXJlLWJ1dHRvbicpO1xuICAgICAgICAgICAgaWYgKCFidXR0b24pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGBDaGVjayBvdXQgdGhpcyBhcnRpY2xlOiAke3Bvc3QudGl0bGV9YDtcbiAgICAgICAgICAgIGxldCBzaGFyZVdpbmRvd1VybCA9ICcnO1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3R3aXR0ZXInKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfSZ0ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICd0d2l0dGVyLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9MjM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWNlYm9vaycpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnZmFjZWJvb2stc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmtlZGluJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmluZy9zaGFyZS1vZmZzaXRlLz91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnbGlua2VkaW4tc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdTb2NpYWwgc2hhcmluZyBpbml0aWFsaXplZC4nKTtcbn1cbi8qKlxuICogRGlzcGxheSBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSB1c2VyIHdpdGhpbiB0aGUgcG9zdCBjb250ZW50IGFyZWFcbiAqL1xuZnVuY3Rpb24gc2hvd0Vycm9yTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgY29uc3QgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgaWYgKGNvbnRlbnRFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy1zZWN0aW9uJyk7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBjb21tZW50c1NlY3Rpb24gPyBjb21tZW50c1NlY3Rpb24gOiBjb250ZW50RWxlbWVudDtcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj4ke21lc3NhZ2V9PC9kaXY+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFsZXJ0KG1lc3NhZ2UpOyAvLyBGYWxsYmFja1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmxpa2VQb3N0ID0gbGlrZVBvc3Q7XG5leHBvcnRzLnVubGlrZVBvc3QgPSB1bmxpa2VQb3N0O1xuZXhwb3J0cy5kZWxldGVCbG9nUG9zdCA9IGRlbGV0ZUJsb2dQb3N0O1xuZXhwb3J0cy5jcmVhdGVQb3N0ID0gY3JlYXRlUG9zdDtcbmV4cG9ydHMudXBkYXRlUG9zdCA9IHVwZGF0ZVBvc3Q7XG5leHBvcnRzLmFkZFRhZ1RvUG9zdCA9IGFkZFRhZ1RvUG9zdDtcbmV4cG9ydHMuZmV0Y2hCbG9nUG9zdHMgPSBmZXRjaEJsb2dQb3N0cztcbmV4cG9ydHMuZmV0Y2hQb3N0QnlJZCA9IGZldGNoUG9zdEJ5SWQ7XG5leHBvcnRzLmZldGNoQ29tbWVudHNBcGkgPSBmZXRjaENvbW1lbnRzQXBpO1xuZXhwb3J0cy5zdWJtaXRDb21tZW50QXBpID0gc3VibWl0Q29tbWVudEFwaTtcbi8vIEFQSV9VUkwgY29uc3RhbnQgaXMgbm90IG5lZWRlZCB3aGVuIGZldGNoaW5nIHN0YXRpYyBmaWxlIGRpcmVjdGx5XG4vLyBjb25zdCBBUElfVVJMID0gJy9hcGknOyBcbi8vIC0tLSBGdW5jdGlvbnMgcmVseWluZyBvbiBiYWNrZW5kIEFQSSAoV2lsbCBOT1Qgd29yayBvbiBHaXRIdWIgUGFnZXMpIC0tLVxuLy8gVGhlc2UgZnVuY3Rpb25zIHdpbGwgZmFpbCBzaWxlbnRseSBvciBsb2cgZXJyb3JzIGluIHRoZSBjb25zb2xlIG9uIHRoZSBzdGF0aWMgc2l0ZS5cbmZ1bmN0aW9uIGxpa2VQb3N0KGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgTGlrZSBmdW5jdGlvbmFsaXR5IHJlcXVpcmVzIGEgYmFja2VuZC4gQ2Fubm90IExJS0UgcG9zdCAke2lkfSBvbiBzdGF0aWMgc2l0ZS5gKTtcbiAgICAgICAgLy8gUmV0dXJuIG51bGwgb3IgYSBkZWZhdWx0IHN0cnVjdHVyZSBpZiB5b3VyIGNhbGxpbmcgY29kZSBleHBlY3RzIGl0XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdW5saWtlUG9zdChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFVubGlrZSBmdW5jdGlvbmFsaXR5IHJlcXVpcmVzIGEgYmFja2VuZC4gQ2Fubm90IFVOTElLRSBwb3N0ICR7aWR9IG9uIHN0YXRpYyBzaXRlLmApO1xuICAgICAgICAvLyBSZXR1cm4gbnVsbCBvciBhIGRlZmF1bHQgc3RydWN0dXJlXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGVsZXRlQmxvZ1Bvc3QocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBkZWxldGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVQb3N0KHBvc3REYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBjcmVhdGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVBvc3QoaWQsIHBvc3REYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCB1cGRhdGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGFkZFRhZ1RvUG9zdChpZCwgdGFnKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBhZGQgdGFnIG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuLy8gLS0tIEZ1bmN0aW9ucyBtb2RpZmllZCBmb3Igc3RhdGljIGRhdGEgLS0tXG5jb25zdCBTVEFUSUNfREFUQV9VUkwgPSAnZGF0YS9wb3N0cy5qc29uJzsgLy8gRGVmaW5lIHJlbGF0aXZlIHBhdGggb25jZVxuLyoqXG4gKiBGZXRjaCBhbGwgYmxvZyBwb3N0cyBkaXJlY3RseSBmcm9tIHRoZSBzdGF0aWMgSlNPTiBmaWxlLlxuICovXG5mdW5jdGlvbiBmZXRjaEJsb2dQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgRmV0Y2hpbmcgc3RhdGljIGRhdGEgZnJvbTogJHtTVEFUSUNfREFUQV9VUkx9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGZXRjaCB0aGUgSlNPTiBmaWxlIHVzaW5nIHRoZSByZWxhdGl2ZSBwYXRoXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKFNUQVRJQ19EQVRBX1VSTCk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggJHtTVEFUSUNfREFUQV9VUkx9OiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIC8vIEFzc3VtaW5nIHRoZSBKU09OIHN0cnVjdHVyZSBpcyB7IHBvc3RzOiBbLi4uXSB9IFxuICAgICAgICAgICAgcmV0dXJuIGRhdGEucG9zdHMgfHwgW107XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBzdGF0aWMgJHtTVEFUSUNfREFUQV9VUkx9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IG9uIGVycm9yXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGEgc2luZ2xlIHBvc3QgYnkgSUQgYnkgZmlsdGVyaW5nIHRoZSBzdGF0aWMgSlNPTiBkYXRhLlxuICogQHBhcmFtIGlkIC0gVGhlIHBvc3QgSUQgKHN0cmluZyBvciBudW1iZXIpXG4gKi9cbmZ1bmN0aW9uIGZldGNoUG9zdEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRmV0Y2ggYWxsIHBvc3RzIGZpcnN0XG4gICAgICAgICAgICBjb25zdCBhbGxQb3N0cyA9IHlpZWxkIGZldGNoQmxvZ1Bvc3RzKCk7XG4gICAgICAgICAgICBjb25zdCBwb3N0SWROdW1iZXIgPSB0eXBlb2YgaWQgPT09ICdzdHJpbmcnID8gcGFyc2VJbnQoaWQsIDEwKSA6IGlkO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHBvc3RJZE51bWJlcikpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIHBvc3QgSUQgcHJvdmlkZWQ6ICR7aWR9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBzcGVjaWZpYyBwb3N0XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0gYWxsUG9zdHMuZmluZChwID0+IE51bWJlcihwLmlkKSA9PT0gcG9zdElkTnVtYmVyKTtcbiAgICAgICAgICAgIGlmICghcG9zdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgUG9zdCB3aXRoIElEICR7aWR9IG5vdCBmb3VuZCBpbiBzdGF0aWMgZGF0YS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGb3VuZCBwb3N0ICR7aWR9IGluIHN0YXRpYyBkYXRhLmApO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBzdGF0aWMgcG9zdCAke2lkfTpgLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gLS0tIENvbW1lbnQgQVBJIFBsYWNlaG9sZGVycyAtLS1cbmZ1bmN0aW9uIGZldGNoQ29tbWVudHNBcGkocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ29tbWVudHMgY2Fubm90IGJlIGZldGNoZWQgb24gc3RhdGljIHNpdGUgd2l0aG91dCBleHRlcm5hbCBzZXJ2aWNlL2JhY2tlbmQuXCIpO1xuICAgICAgICByZXR1cm4gW107XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzdWJtaXRDb21tZW50QXBpKHBvc3RJZCwgbmFtZSwgY29tbWVudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3Qgc3VibWl0IGNvbW1lbnQgb24gc3RhdGljIHNpdGUgd2l0aG91dCBleHRlcm5hbCBzZXJ2aWNlL2JhY2tlbmQuXCIpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb21tZW50IHN1Ym1pc3Npb24gbm90IGF2YWlsYWJsZS5cIik7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy91dGlscy91cmxUcmFuc2Zvcm1lci50cyAoRXhhbXBsZSBMb2NhdGlvbilcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2VuZXJhdGVUYWdGaWx0ZXJVcmwgPSBnZW5lcmF0ZVRhZ0ZpbHRlclVybDtcbi8qKlxuICogR2VuZXJhdGVzIGEgVVJMIHBhdGggZm9yIGZpbHRlcmluZyBieSB0YWcgb24gdGhlIG1haW4gYmxvZyBwYWdlLlxuICogQ3JlYXRlcyBhIFVSTCBsaWtlIFwiL2Jsb2cvP3RhZz15b3VyLXRhZy1uYW1lXCIgb3IgXCIvP3RhZz15b3VyLXRhZy1uYW1lXCIgYmFzZWQgb24gZW52aXJvbm1lbnQuXG4gKlxuICogQHBhcmFtIHRhZyAtIFRoZSB0YWcgc3RyaW5nIHRvIGZpbHRlciBieS5cbiAqIEByZXR1cm5zIFRoZSBVUkwgcGF0aCB3aXRoIHRoZSB0YWcgcXVlcnkgcGFyYW1ldGVyLlxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRhZ0ZpbHRlclVybCh0YWcpIHtcbiAgICAvLyBPcHRpb25hbDogQ29udmVydCB0YWcgdG8gbG93ZXJjYXNlIGZvciBjb25zaXN0ZW5jeSBpbiBmaWx0ZXJpbmdcbiAgICBjb25zdCBjb25zaXN0ZW50VGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gVVJMU2VhcmNoUGFyYW1zIGhhbmRsZXMgbmVjZXNzYXJ5IGVuY29kaW5nIGZvciBxdWVyeSBwYXJhbWV0ZXIgdmFsdWVzXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7IHRhZzogY29uc2lzdGVudFRhZyB9KTtcbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBvbiB0aGUgcHJvZHVjdGlvbiBzaXRlIGJ5IGxvb2tpbmcgYXQgdGhlIGhvc3RuYW1lXG4gICAgY29uc3QgaXNQcm9kdWN0aW9uID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbm9lbHVnd29rZS5jb20nO1xuICAgIGNvbnN0IGJhc2VQYXRoID0gaXNQcm9kdWN0aW9uID8gJy9ibG9nLycgOiAnLyc7XG4gICAgcmV0dXJuIGAke2Jhc2VQYXRofT8ke3BhcmFtcy50b1N0cmluZygpfWA7XG59XG4vKlxuLy8gT3JpZ2luYWwgZnVuY3Rpb24gLSBrZXB0IGZvciByZWZlcmVuY2Ugb3IgaWYgbmVlZGVkIGZvciBkaWZmZXJlbnQgVVJMIHR5cGVzXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtVGFnVG9VcmxGb3JtYXQodGFnOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0YWcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICctJyk7XG59XG4qL1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2VudHJpZXMvY2xpZW50LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9