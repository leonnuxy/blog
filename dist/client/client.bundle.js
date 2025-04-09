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
 * Renders the header HTML structure into a target container.
 * Event listeners should be attached separately after calling this function.
 * @param containerId - The ID of the element to render the header into. Defaults to 'header-placeholder'.
 */
function renderHeader(containerId = 'header-placeholder') {
    // Ensure running in a browser environment
    if (typeof document === 'undefined') {
        return;
    }
    // Find the container element where the header should be placed
    const headerContainer = document.getElementById(containerId);
    if (!headerContainer) {
        console.error(`Header container with ID '${containerId}' not found in the DOM.`);
        return;
    }
    // Define the header HTML structure - matching index.html
    headerContainer.innerHTML = `
        <header class="site-header">
            <h1><a href="/">Blog</a></h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li> 
                    <li><a href="/#about" id="about-btn">About</a></li>
                    <li><a href="https://noelugwoke.com">Portfolio</a></li>
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
exports.initializeSearch = initializeSearch;
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
const blogCards_1 = __webpack_require__(/*! ./blogCards */ "./src/components/blogCards.ts");
const comments_1 = __webpack_require__(/*! ./comments */ "./src/components/comments.ts");
/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.querySelector('input[type="search"]');
    if (!searchInput) {
        console.warn('Search input not found in the DOM');
        return;
    }
    // Cycle through different placeholder texts
    setupPlaceholderCycling(searchInput);
    // Set up search input event handler
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target);
    });
}
/**
 * Cycle through different placeholder texts for the search input
 */
function setupPlaceholderCycling(searchInput) {
    const placeholders = [
        "Search for articles...",
        "Search for topics...",
        "Search for authors..."
    ];
    let index = 0;
    setInterval(() => {
        searchInput.placeholder = placeholders[index];
        index = (index + 1) % placeholders.length;
    }, 3000);
}
/**
 * Handle search input and filter blog posts
 */
function handleSearch(searchInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm.length < 2) {
            // If search is cleared, reload all posts
            if (searchTerm.length === 0) {
                // Dispatch event to reload posts
                document.dispatchEvent(new CustomEvent('reloadPosts'));
            }
            return;
        }
        // Show loading state
        const blogCardsContainer = document.querySelector('.blog-cards');
        if (!blogCardsContainer)
            return;
        blogCardsContainer.innerHTML = '<div class="loading-spinner"></div>';
        try {
            // Fetch all posts and filter client-side
            // In a real app, you'd implement server-side search
            const posts = yield (0, api_1.fetchBlogPosts)();
            const filteredPosts = filterPosts(posts, searchTerm);
            // Clear container
            blogCardsContainer.innerHTML = '';
            if (filteredPosts.length === 0) {
                // Show empty search results
                showEmptySearchResults(blogCardsContainer, searchTerm);
                return;
            }
            // Display filtered posts
            displayFilteredPosts(filteredPosts, blogCardsContainer);
        }
        catch (error) {
            console.error('Error searching posts:', error);
            showSearchError(blogCardsContainer);
        }
    });
}
/**
 * Filter posts based on search term
 */
function filterPosts(posts, searchTerm) {
    return posts.filter(post => post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.author.toLowerCase().includes(searchTerm) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm))));
}
/**
 * Display filtered posts in the blog container
 */
function displayFilteredPosts(filteredPosts, container) {
    filteredPosts.forEach(post => {
        const blogCard = (0, blogCards_1.createBlogCardElement)(post);
        container.appendChild(blogCard);
        // Initialize comments functionality for the filtered posts
        (0, comments_1.initializeCommentsFunctionality)(blogCard);
    });
    // Dispatch custom event when search results are displayed
    document.dispatchEvent(new CustomEvent('searchResultsDisplayed', {
        detail: { count: filteredPosts.length }
    }));
}
/**
 * Display empty search results message
 */
function showEmptySearchResults(container, searchTerm) {
    container.innerHTML = `
        <div class="empty-search">
            <i class="fas fa-search fa-3x"></i>
            <h3>No results found</h3>
            <p>No posts match your search for "${searchTerm}"</p>
        </div>
    `;
}
/**
 * Display search error message
 */
function showSearchError(container) {
    container.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle fa-3x"></i>
            <h3>Search failed</h3>
            <p>Failed to search blog posts. Please try again.</p>
        </div>
    `;
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
 * Manages UI initialization, post rendering, and user interactions.
 */
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
const blogCards_1 = __webpack_require__(/*! ../components/blogCards */ "./src/components/blogCards.ts");
// Assuming initializeComments is meant for the post detail page, 
// it might not be needed here unless cards have comment previews/interactions.
// import { initializeComments } from '../components/comments'; 
const contact_1 = __webpack_require__(/*! ../components/contact */ "./src/components/contact.ts"); // Handles contact popup logic
const pagination_1 = __webpack_require__(/*! ../components/pagination */ "./src/components/pagination.ts"); // Handles load more logic
const search_1 = __webpack_require__(/*! ../components/search */ "./src/components/search.ts"); // Handles search bar logic
const about_1 = __webpack_require__(/*! ../components/about */ "./src/components/about.ts"); // Handles about popup logic
const navigation_1 = __webpack_require__(/*! ../components/navigation */ "./src/components/navigation.ts"); // Handles nav link active states
// Note: Dark mode is initialized globally in client.ts, no need to import/call here typically
/**
 * Initialize the blog frontend functionality (homepage)
 * Sets up all UI components and initializes the blog posts display.
 * Assumes header and dark mode are initialized globally before this runs.
 */
function initializeBlogFrontend() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Initializing Blog Frontend Controller...');
        // Initialize navigation active states
        (0, navigation_1.initializeNavigation)();
        // Initialize interactive components specific to the main page
        (0, contact_1.initializeContactForm)(); // Assumes #contact-btn and #contact-popup exist
        (0, about_1.initializeAbout)(); // Assumes #about-btn and #about-popup exist
        (0, search_1.initializeSearch)(); // Assumes .search-bar exists
        // Initialize the blog posts display
        yield initializePosts();
        // Initialize pagination after posts are loaded and containers exist
        (0, pagination_1.initializePagination)();
        // If comments preview/interaction needed on cards, initialize here
        // initializeComments(); 
        // Set up event delegation for navigating when clicking blog cards
        setupBlogCardsDelegation();
        // Add event listener for reloading posts (used by search)
        // Consider adding an option to remove listener if controller is ever "destroyed"
        document.addEventListener('reloadPosts', handleReloadPosts);
        console.log('Blog Frontend Controller Initialized.');
    });
}
/**
 * Handles the custom 'reloadPosts' event, typically triggered by search.
 */
function handleReloadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Reloading posts due to reloadPosts event...');
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
    const blogCardsContainer = document.querySelector('.blog-cards');
    // Note: Delegation on hidden-posts might be unnecessary if cards are moved on load more
    // const hiddenPostsContainer = document.getElementById('hidden-posts');
    if (blogCardsContainer) {
        // Remove listener first to prevent duplicates if called multiple times
        blogCardsContainer.removeEventListener('click', handleBlogCardClick);
        blogCardsContainer.addEventListener('click', handleBlogCardClick);
        console.log('Event delegation set up for .blog-cards');
    }
    else {
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
function handleBlogCardClick(event) {
    const target = event.target;
    const card = target.closest('.blog-card'); // Type assertion
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
function initializePosts() {
    return __awaiter(this, void 0, void 0, function* () {
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
            let posts = yield (0, api_1.fetchBlogPosts)();
            console.log(`Fetched ${posts.length} posts.`);
            // Filter posts by tag if the query parameter is present
            if (tagFilter) {
                // Case-insensitive tag filtering
                const normalizedTagFilter = tagFilter.toLowerCase();
                posts = posts.filter(post => post.tags.some(tag => tag.toLowerCase() === normalizedTagFilter));
                console.log(`Filtered posts by tag '${tagFilter}': ${posts.length} posts.`);
                // Add a filter indicator above the posts
                const filterContainer = document.createElement('div');
                filterContainer.className = 'tag-filter-indicator';
                filterContainer.innerHTML = `
                <p>Showing posts tagged with: <span class="filtered-tag">${tagFilter}</span></p>
                <a href="/" class="clear-filter">Clear filter</a>
            `;
                // Insert filter indicator before the blog cards
                const blogContainer = blogCardsContainer.parentElement;
                if (blogContainer) {
                    blogContainer.insertBefore(filterContainer, blogCardsContainer);
                }
            }
            // Clear loading state
            blogCardsContainer.innerHTML = '';
            if (posts.length === 0) {
                // Update empty state to reflect filtering if applicable
                showEmptyState(blogCardsContainer, tagFilter);
                return;
            }
            // Display initial posts (e.g., first 3 or 6)
            const initialPostCount = 6; // Or adjust as needed
            const displayPosts = posts.slice(0, initialPostCount);
            const hiddenPosts = posts.slice(initialPostCount);
            // Add visible posts to main container
            displayPosts.forEach(post => {
                const blogCard = (0, blogCards_1.createBlogCardElement)(post);
                blogCardsContainer.appendChild(blogCard);
            });
            // Add remaining posts to hidden container for pagination
            const hiddenPostsContainer = document.getElementById('hidden-posts');
            if (hiddenPostsContainer) {
                hiddenPostsContainer.innerHTML = ''; // Clear previous hidden posts
                hiddenPosts.forEach(post => {
                    const blogCard = (0, blogCards_1.createBlogCardElement)(post);
                    hiddenPostsContainer.appendChild(blogCard);
                });
                console.log(`${hiddenPosts.length} posts added to hidden container.`);
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
 * @param container The container element to show the empty state in
 * @param tagFilter Optional tag filter that was used (to explain why no posts were found)
 */
function showEmptyState(container, tagFilter) {
    container.innerHTML = ''; // Clear container
    const emptyStateDiv = document.createElement('div');
    emptyStateDiv.className = 'empty-state'; // Add class for styling
    // Customize message if filtering by tag
    const message = tagFilter
        ? `No posts found with the tag "${tagFilter}".`
        : 'No posts found.';
    emptyStateDiv.innerHTML = `
        <i class="fas fa-file-alt fa-3x"></i>
        <h3>${message}</h3>
        ${tagFilter ? '<p><a href="/">View all posts</a></p>' : '<p>Check back later for new content!</p>'}
    `;
    container.appendChild(emptyStateDiv);
    console.log('Displayed empty state for posts.');
}
/**
 * Show error state when posts couldn't be loaded
 */
function showErrorState(container) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDaElhO0FBQ2I7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsb0JBQW9CO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUyxHQUFHLGtCQUFrQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzFCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2Fib3V0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9ibG9nQ2FyZHMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2NvbW1lbnRzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9jb250YWN0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9kYXJrTW9kZS50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9wYWdpbmF0aW9uLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9zZWFyY2gudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9ibG9nRnJvbnRlbmRDb250cm9sbGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvZW50cmllcy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9tb2R1bGVzL3Bvc3REZXRhaWwudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9zZXJ2aWNlcy9hcGkudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy91dGlscy91cmxUcmFuc2Zvcm1lci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIEFib3V0IHBvcHVwIGZ1bmN0aW9uYWxpdHlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUFib3V0ID0gaW5pdGlhbGl6ZUFib3V0O1xuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBBYm91dCBzZWN0aW9uIHBvcHVwXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVBYm91dCgpIHtcbiAgICBjb25zdCBhYm91dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1idG4nKTtcbiAgICBjb25zdCBhYm91dFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LXBvcHVwJyk7XG4gICAgY29uc3QgY2xvc2VQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dC1wb3B1cCAuY2xvc2UtcG9wdXAnKTtcbiAgICBpZiAoIWFib3V0QnRuIHx8ICFhYm91dFBvcHVwIHx8ICFjbG9zZVBvcHVwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQWJvdXQgcG9wdXAgZWxlbWVudHMgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBPcGVuIHBvcHVwIHdoZW4gYWJvdXQgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBhYm91dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGFuY2hvciBiZWhhdmlvclxuICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nOyAvLyBQcmV2ZW50IHNjcm9sbGluZyB3aGlsZSBwb3B1cCBpcyBvcGVuXG4gICAgICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gYWJvdXQgbGlua1xuICAgICAgICBhYm91dEJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSBwb3B1cCB3aGVuIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgY2xvc2VQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgIH0pO1xuICAgIC8vIENsb3NlIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSB0aGUgcG9wdXAgY29udGVudFxuICAgIGFib3V0UG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IGFib3V0UG9wdXApIHtcbiAgICAgICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIENsb3NlIG9uIGVzY2FwZSBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBhYm91dFBvcHVwLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XG4gICAgICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNldCB0aGUgZGVmYXVsdCBhY3RpdmUgbGluayBzdGF0ZVxuICovXG5mdW5jdGlvbiBzZXREZWZhdWx0QWN0aXZlTGluaygpIHtcbiAgICAvLyBHZXQgY3VycmVudCBoYXNoIG9yIGRlZmF1bHQgdG8gaG9tZVxuICAgIGNvbnN0IGN1cnJlbnRIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgJyNob21lJztcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIG5hdiBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBoYXNoIGxpbmtcbiAgICBjb25zdCBjdXJyZW50TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlciBuYXYgdWwgbGkgYVtocmVmPVwiJHtjdXJyZW50SGFzaH1cIl1gKTtcbiAgICBpZiAoY3VycmVudExpbmspIHtcbiAgICAgICAgY3VycmVudExpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCA9IGNyZWF0ZUJsb2dDYXJkRWxlbWVudDtcbmNvbnN0IHVybFRyYW5zZm9ybWVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdXJsVHJhbnNmb3JtZXJcIik7IC8vIEltcG9ydCB0aGUgVVJMIGdlbmVyYXRvclxuLyoqXG4gKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnQgZm9yIGEgYmxvZyBjYXJkIGZyb20gcG9zdCBkYXRhIChkaXNwbGF5IG9ubHkgZm9yIGFjdGlvbnMpXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJsb2dDYXJkRWxlbWVudChwb3N0KSB7XG4gICAgY29uc3QgYmxvZ0NhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBibG9nQ2FyZC5jbGFzc05hbWUgPSAnYmxvZy1jYXJkJztcbiAgICBibG9nQ2FyZC5kYXRhc2V0LnBvc3RJZCA9IFN0cmluZyhwb3N0LmlkKTtcbiAgICBibG9nQ2FyZC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgY29uc3QgY29tbWVudENvdW50ID0gcG9zdC5jb21tZW50cyA/IHBvc3QuY29tbWVudHMubGVuZ3RoIDogMDtcbiAgICBjb25zdCBjcmVhdGVkRGF0ZSA9IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KTtcbiAgICBjb25zdCBkYXRlU3RyID0gY3JlYXRlZERhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJ1xuICAgIH0pO1xuICAgIC8vIC0tLSBEeW5hbWljIFVSTCBhbmQgVGV4dCBHZW5lcmF0aW9uIGZvciBTaGFyaW5nIC0tLVxuICAgIGNvbnN0IHBvc3RVcmwgPSBgcG9zdC5odG1sP2lkPSR7U3RyaW5nKHBvc3QuaWQpfWA7XG4gICAgY29uc3QgZW5jb2RlZFVybCA9IGVuY29kZVVSSUNvbXBvbmVudChwb3N0VXJsKTtcbiAgICBjb25zdCBzaGFyZVRleHQgPSBgQ2hlY2sgb3V0IHRoaXMgYXJ0aWNsZTogJHtwb3N0LnRpdGxlfWA7XG4gICAgY29uc3QgZW5jb2RlZFNoYXJlVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudChzaGFyZVRleHQpO1xuICAgIC8vIC0tLSBFbmQgRHluYW1pYyBVUkwgR2VuZXJhdGlvbiAtLS1cbiAgICAvLyBHZW5lcmF0ZSBIVE1MIGZvciB0YWcgYmFkZ2VzL2xpbmtzIHVzaW5nIHRoZSB1dGlsaXR5IGZ1bmN0aW9uXG4gICAgbGV0IHRhZ3NIVE1MID0gJyc7XG4gICAgaWYgKHBvc3QudGFncyAmJiBwb3N0LnRhZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICB0YWdzSFRNTCA9ICc8ZGl2IGNsYXNzPVwicG9zdC10YWdzXCI+JyArXG4gICAgICAgICAgICBwb3N0LnRhZ3MubWFwKHRhZyA9PiBcbiAgICAgICAgICAgIC8vIFVzZSBnZW5lcmF0ZVRhZ0ZpbHRlclVybCBmb3IgaHJlZiBpbiBhbiA8YT4gdGFnXG4gICAgICAgICAgICBgPGEgaHJlZj1cIiR7KDAsIHVybFRyYW5zZm9ybWVyXzEuZ2VuZXJhdGVUYWdGaWx0ZXJVcmwpKHRhZyl9XCIgY2xhc3M9XCJ0YWctYmFkZ2VcIj4ke3RhZ308L2E+YCkuam9pbignJykgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgfVxuICAgIGNvbnN0IGZhbGxiYWNrSW1hZ2VVcmwgPSAnaW1hZ2VzL2Jsb2dfaW1hZ2VfMy5qcGVnJzsgLy8gUmVsYXRpdmUgcGF0aFxuICAgIC8vIENyZWF0ZSBIVE1MIGZvciBibG9nIGNhcmRcbiAgICBibG9nQ2FyZC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxpbWcgc3JjPVwiJHtwb3N0LmltYWdlVXJsIHx8IGZhbGxiYWNrSW1hZ2VVcmx9XCIgYWx0PVwiJHtwb3N0LnRpdGxlfVwiPiBcbiAgICAgICAgPGRpdiBjbGFzcz1cImJsb2ctY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImJsb2ctY2FyZC1kYXRlLWF1dGhvclwiPiR7ZGF0ZVN0cn08L3A+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJibG9nLWNhcmQtdGl0bGVcIj4ke3Bvc3QudGl0bGV9PC9oMz5cbiAgICAgICAgICAgICR7dGFnc0hUTUx9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvY2lhbC1zaGFyaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gdHdpdHRlclwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBUd2l0dGVyXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCIgZGF0YS10ZXh0PVwiJHtlbmNvZGVkU2hhcmVUZXh0fVwiPjxpIGNsYXNzPVwiZmFiIGZhLXR3aXR0ZXJcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gZmFjZWJvb2tcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gRmFjZWJvb2tcIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIj48aSBjbGFzcz1cImZhYiBmYS1mYWNlYm9vay1mXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGxpbmtlZGluXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIExpbmtlZEluXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCI+PGkgY2xhc3M9XCJmYWIgZmEtbGlua2VkaW4taW5cIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICAvLyBTZXR1cCBzb2NpYWwgc2hhcmluZyBsaXN0ZW5lcnMgKGFzIGJlZm9yZSlcbiAgICBjb25zdCBzb2NpYWxTaGFyaW5nRGl2ID0gYmxvZ0NhcmQucXVlcnlTZWxlY3RvcignLnNvY2lhbC1zaGFyaW5nJyk7XG4gICAgaWYgKHNvY2lhbFNoYXJpbmdEaXYpIHtcbiAgICAgICAgc29jaWFsU2hhcmluZ0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gLi4uIGV4aXN0aW5nIHNvY2lhbCBzaGFyaW5nIGNsaWNrIGxvZ2ljIC4uLlxuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaGFyZS1idXR0b24nKTtcbiAgICAgICAgICAgIGlmICghYnV0dG9uKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgYmFzZVBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyaW5nKDAsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5sYXN0SW5kZXhPZignLycpICsgMSk7XG4gICAgICAgICAgICBjb25zdCByZWxhdGl2ZVVybCA9IGJ1dHRvbi5kYXRhc2V0LnVybCA/IGRlY29kZVVSSUNvbXBvbmVudChidXR0b24uZGF0YXNldC51cmwpIDogYHBvc3QuaHRtbD9pZD0ke3Bvc3QuaWR9YDtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxVcmwgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7YmFzZVBhdGh9JHtyZWxhdGl2ZVVybH1gO1xuICAgICAgICAgICAgY29uc3QgZW5jb2RlZEZ1bGxVcmwgPSBlbmNvZGVVUklDb21wb25lbnQoZnVsbFVybCk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYnV0dG9uLmRhdGFzZXQudGV4dCA/IGRlY29kZVVSSUNvbXBvbmVudChidXR0b24uZGF0YXNldC50ZXh0KSA6IGRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgY29uc3QgZW5jb2RlZFRleHQgPSBlbmNvZGVVUklDb21wb25lbnQodGV4dCk7XG4gICAgICAgICAgICBsZXQgc2hhcmVXaW5kb3dVcmwgPSAnJztcbiAgICAgICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd0d2l0dGVyJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7ZW5jb2RlZFRleHR9JnVybD0ke2VuY29kZWRGdWxsVXJsfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICd0d2l0dGVyLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9MjM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWNlYm9vaycpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtlbmNvZGVkRnVsbFVybH1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnZmFjZWJvb2stc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmtlZGluJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmluZy9zaGFyZS1vZmZzaXRlLz91cmw9JHtlbmNvZGVkRnVsbFVybH1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnbGlua2VkaW4tc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFJFTU9WRUQ6IFNlcGFyYXRlIGV2ZW50IGxpc3RlbmVyIGxvb3AgZm9yIHRhZyBiYWRnZXMgKG5vdyBoYW5kbGVkIGJ5IHN0YW5kYXJkIDxhPiB0YWdzKVxuICAgIHJldHVybiBibG9nQ2FyZDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQ29tbWVudHMgPSBpbml0aWFsaXplQ29tbWVudHM7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkgPSBpbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5O1xuLyoqXG4gKiBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIGJsb2cgcG9zdHNcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRzKCkge1xuICAgIHNldHVwQ29tbWVudFRvZ2dsZXMoKTtcbiAgICBzZXR1cENvbW1lbnRGb3JtcygpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIGEgc3BlY2lmaWMgYmxvZyBwb3N0IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eShwb3N0RWxlbWVudCkge1xuICAgIGNvbnN0IHRvZ2dsZSA9IHBvc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy10b2dnbGUnKTtcbiAgICBjb25zdCBmb3JtID0gcG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtZm9ybScpO1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgICAgc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSk7XG4gICAgfVxuICAgIGlmIChmb3JtKSB7XG4gICAgICAgIHNldHVwQ29tbWVudEZvcm0oZm9ybSk7XG4gICAgfVxufVxuLyoqXG4gKiBTZXQgdXAgY29tbWVudCB0b2dnbGUgYnV0dG9uc1xuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRUb2dnbGVzKCkge1xuICAgIGNvbnN0IGNvbW1lbnRUb2dnbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnRzLXRvZ2dsZScpO1xuICAgIGNvbW1lbnRUb2dnbGVzLmZvckVhY2godG9nZ2xlID0+IHtcbiAgICAgICAgc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSk7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBhIHNpbmdsZSBjb21tZW50IHRvZ2dsZSBidXR0b25cbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSkge1xuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgcG9zdElkID0gdG9nZ2xlLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3N0LWlkJyk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjb21tZW50cy0ke3Bvc3RJZH1gKTtcbiAgICAgICAgaWYgKGNvbW1lbnRzU2VjdGlvbikge1xuICAgICAgICAgICAgY29tbWVudHNTZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgLy8gQ2hhbmdlIGJ1dHRvbiB0ZXh0IGJhc2VkIG9uIHN0YXRlXG4gICAgICAgICAgICBpZiAoY29tbWVudHNTZWN0aW9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPiBIaWRlIENvbW1lbnRzIDxzcGFuIGNsYXNzPVwiY29tbWVudHMtY291bnRcIj4keyhfYSA9IHRvZ2dsZS5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY291bnQnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRleHRDb250ZW50fTwvc3Bhbj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS1jb21tZW50XCI+PC9pPiBDb21tZW50cyA8c3BhbiBjbGFzcz1cImNvbW1lbnRzLWNvdW50XCI+JHsoX2IgPSB0b2dnbGUucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvdW50JykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50ZXh0Q29udGVudH08L3NwYW4+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgY29tbWVudCBmb3Jtc1xuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRGb3JtcygpIHtcbiAgICBjb25zdCBjb21tZW50Rm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudC1mb3JtJyk7XG4gICAgY29tbWVudEZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICAgIHNldHVwQ29tbWVudEZvcm0oZm9ybSk7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBhIHNpbmdsZSBjb21tZW50IGZvcm1cbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50Rm9ybShmb3JtKSB7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAgICAgY29uc3QgY29tbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29tbWVudHMtJHtwb3N0SWR9IC5jb21tZW50cy1saXN0YCk7XG4gICAgICAgIGlmICghY29tbWVudHNDb250YWluZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgY29uc3QgY29tbWVudElucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwiY29tbWVudFwiXScpO1xuICAgICAgICAvLyBDaGVjayBpZiBpbnB1dHMgYXJlIG5vdCBlbXB0eVxuICAgICAgICBpZiAobmFtZUlucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycgfHwgY29tbWVudElucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhZGROZXdDb21tZW50KHBvc3RJZCwgY29tbWVudHNDb250YWluZXIsIG5hbWVJbnB1dC52YWx1ZSwgY29tbWVudElucHV0LnZhbHVlKTtcbiAgICAgICAgLy8gUmVzZXQgZm9ybVxuICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgfSk7XG59XG4vKipcbiAqIEFkZCBhIG5ldyBjb21tZW50IHRvIHRoZSBjb21tZW50cyBsaXN0XG4gKi9cbmZ1bmN0aW9uIGFkZE5ld0NvbW1lbnQocG9zdElkLCBjb21tZW50c0NvbnRhaW5lciwgbmFtZSwgY29tbWVudFRleHQpIHtcbiAgICAvLyBDcmVhdGUgbmV3IGNvbW1lbnRcbiAgICBjb25zdCBuZXdDb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3Q29tbWVudC5jbGFzc05hbWUgPSAnY29tbWVudCc7XG4gICAgLy8gR2V0IGN1cnJlbnQgZGF0ZVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IG5vdy50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgIGRheTogJ251bWVyaWMnXG4gICAgfSk7XG4gICAgLy8gQ29tbWVudCBIVE1MIHN0cnVjdHVyZVxuICAgIG5ld0NvbW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1hdmF0YXJcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtY29udGVudFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LWF1dGhvclwiPiR7bmFtZX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtdGV4dFwiPiR7Y29tbWVudFRleHR9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LWRhdGVcIj4ke2RhdGVTdHJ9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIC8vIFJlbW92ZSBcIm5vIGNvbW1lbnRzIHlldFwiIG1lc3NhZ2UgaWYgaXQgZXhpc3RzXG4gICAgY29uc3Qgbm9Db21tZW50cyA9IGNvbW1lbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5uby1jb21tZW50cycpO1xuICAgIGlmIChub0NvbW1lbnRzKSB7XG4gICAgICAgIGNvbW1lbnRzQ29udGFpbmVyLnJlbW92ZUNoaWxkKG5vQ29tbWVudHMpO1xuICAgIH1cbiAgICAvLyBBZGQgdGhlIG5ldyBjb21tZW50IHRvIHRoZSB0b3Agb2YgdGhlIGxpc3RcbiAgICBjb21tZW50c0NvbnRhaW5lci5pbnNlcnRCZWZvcmUobmV3Q29tbWVudCwgY29tbWVudHNDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgLy8gVXBkYXRlIGNvbW1lbnQgY291bnRcbiAgICB1cGRhdGVDb21tZW50Q291bnQocG9zdElkKTtcbn1cbi8qKlxuICogVXBkYXRlIHRoZSBjb21tZW50IGNvdW50IGZvciBhIHBvc3RcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQ29tbWVudENvdW50KHBvc3RJZCkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBjb3VudFNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBidXR0b25bZGF0YS1wb3N0LWlkPVwiJHtwb3N0SWR9XCJdIC5jb21tZW50cy1jb3VudGApO1xuICAgIGlmIChjb3VudFNwYW4pIHtcbiAgICAgICAgbGV0IGNvdW50ID0gcGFyc2VJbnQoKChfYSA9IGNvdW50U3Bhbi50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2UoL1soKV0vZywgJycpKSB8fCAnMCcpICsgMTtcbiAgICAgICAgY291bnRTcGFuLnRleHRDb250ZW50ID0gYCgke2NvdW50fSlgO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2NvbXBvbmVudHMvY29udGFjdC50cyAoRXhhbXBsZSlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbnRhY3RGb3JtID0gaW5pdGlhbGl6ZUNvbnRhY3RGb3JtO1xuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgY29udGFjdCBmb3JtIHBvcHVwIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDb250YWN0Rm9ybSgpIHtcbiAgICBjb25zdCBjb250YWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtYnRuJyk7XG4gICAgY29uc3QgY29udGFjdFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtcG9wdXAnKTtcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGNvbnRhY3RQb3B1cCA9PT0gbnVsbCB8fCBjb250YWN0UG9wdXAgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRhY3RQb3B1cC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtcG9wdXAnKTtcbiAgICBjb25zdCBjb250YWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWZvcm0nKTtcbiAgICBpZiAoIWNvbnRhY3RCdXR0b24gfHwgIWNvbnRhY3RQb3B1cCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnRhY3QgYnV0dG9uIG9yIHBvcHVwIGVsZW1lbnQgbm90IGZvdW5kLiBDYW5ub3QgaW5pdGlhbGl6ZSBjb250YWN0IGZvcm0uJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gLS0tIE9wZW4gUG9wdXAgLS0tXG4gICAgY29udGFjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyA8LS0gQ1JVQ0lBTDogUHJldmVudCBkZWZhdWx0IGxpbmsgbmF2aWdhdGlvblxuICAgICAgICBjb25zb2xlLmxvZygnQ29udGFjdCBidXR0b24gY2xpY2tlZCwgb3BlbmluZyBwb3B1cC4nKTtcbiAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTsgLy8gQ2hhbmdlZCBmcm9tICd2aXNpYmxlJyB0byAnb3BlbidcbiAgICB9KTtcbiAgICAvLyAtLS0gQ2xvc2UgUG9wdXAgLS0tXG4gICAgaWYgKGNsb3NlQnV0dG9uKSB7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTsgLy8gQ2hhbmdlZCBmcm9tICd2aXNpYmxlJyB0byAnb3BlbidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIENsb3NlIHBvcHVwIGlmIGNsaWNraW5nIG91dHNpZGUgdGhlIGNvbnRlbnQgYXJlYVxuICAgIGNvbnRhY3RQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBjb250YWN0UG9wdXApIHtcbiAgICAgICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7IC8vIENoYW5nZWQgZnJvbSAndmlzaWJsZScgdG8gJ29wZW4nXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyAtLS0gRm9ybSBTdWJtaXNzaW9uIC0tLVxuICAgIGlmIChjb250YWN0Rm9ybSkge1xuICAgICAgICBjb250YWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb25cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb250YWN0IGZvcm0gc3VibWl0dGVkIChwbGFjZWhvbGRlcikuJyk7XG4gICAgICAgICAgICAvLyBBZGQgeW91ciBmb3JtIHN1Ym1pc3Npb24gbG9naWMgaGVyZSAoZS5nLiwgdXNpbmcgZmV0Y2ggdG8gc2VuZCBkYXRhKVxuICAgICAgICAgICAgLy8gT3B0aW9uYWxseSBjbG9zZSBwb3B1cCBhZnRlciBzdWJtaXNzaW9uXG4gICAgICAgICAgICAvLyBjb250YWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpOyBcbiAgICAgICAgICAgIGFsZXJ0KCdDb250YWN0IGZvcm0gc3VibWlzc2lvbiBub3QgaW1wbGVtZW50ZWQgeWV0LicpOyAvLyBQbGFjZWhvbGRlciBmZWVkYmFja1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ0NvbnRhY3QgZm9ybSBpbml0aWFsaXplZC4nKTtcbn1cbi8vIEVuc3VyZSB5b3VyIENTUyBoYW5kbGVzIHRoZSAub3BlbiBjbGFzcyBmb3IgdGhlICNjb250YWN0LXBvcHVwXG4vLyBlLmcuLFxuLy8gLnBvcHVwIHsgZGlzcGxheTogbm9uZTsgLyogSGlkZGVuIGJ5IGRlZmF1bHQgKi8gfVxuLy8gLnBvcHVwLm9wZW4geyBkaXNwbGF5OiBibG9jazsgLyogT3IgZmxleCwgZ3JpZCwgZXRjLiAqLyB9XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIERhcmsgbW9kZSBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVEYXJrTW9kZSA9IGluaXRpYWxpemVEYXJrTW9kZTtcbmV4cG9ydHMuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UgPSBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZTtcbi8qKlxuICogSW5pdGlhbGl6ZSBkYXJrIG1vZGUgdG9nZ2xlXG4gKiBUaGlzIGNyZWF0ZXMgYSBmbG9hdGluZyBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvbiBhbmQgYWRkcyBpdCB0byB0aGUgRE9NXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVEYXJrTW9kZSgpIHtcbiAgICAvLyBDcmVhdGUgZGFyayBtb2RlIHRvZ2dsZSBidXR0b25cbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmNsYXNzTmFtZSA9ICdkYXJrLW1vZGUtdG9nZ2xlJztcbiAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nOyAvLyBNb29uIGljb25cbiAgICBkYXJrTW9kZVRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVG9nZ2xlIERhcmsgTW9kZScpO1xuICAgIC8vIENoZWNrIGlmIGRhcmsgbW9kZSBwcmVmZXJlbmNlIGlzIGFscmVhZHkgc2V0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09ICd0cnVlJztcbiAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uIGZvciBsaWdodCBtb2RlXG4gICAgfVxuICAgIC8vIEFkZCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgIGRhcmtNb2RlVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRGFya01vZGUpO1xuICAgIC8vIEFkZCBidXR0b24gdG8gdGhlIERPTVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGFya01vZGVUb2dnbGUpO1xufVxuLyoqXG4gKiBUb2dnbGUgZGFyayBtb2RlIG9uIGFuZCBvZmZcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlRGFya01vZGUoKSB7XG4gICAgY29uc3QgaXNEYXJrTW9kZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyay1tb2RlJyk7XG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1tb2RlLXRvZ2dsZScpO1xuICAgIC8vIFVwZGF0ZSBpY29uIGJhc2VkIG9uIG1vZGVcbiAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgaWYgKGlzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvbiBmb3IgZGFyayBtb2RlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU2F2ZSBwcmVmZXJlbmNlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCBpc0RhcmtNb2RlLnRvU3RyaW5nKCkpO1xufVxuLyoqXG4gKiBDaGVjayBpZiB1c2VyIGhhcyBzeXN0ZW0gZGFyayBtb2RlIHByZWZlcmVuY2VcbiAqIElmIHRoZXkgZG8gYW5kIHdlIGhhdmVuJ3Qgc2V0IGEgcHJlZmVyZW5jZSB5ZXQsIGFwcGx5IGRhcmsgbW9kZVxuICovXG5mdW5jdGlvbiBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSgpIHtcbiAgICAvLyBPbmx5IGNoZWNrIGlmIHVzZXIgaGFzbid0IGV4cGxpY2l0bHkgc2V0IGEgcHJlZmVyZW5jZVxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwcmVmZXJzRGFya01vZGUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgICAgIGlmIChwcmVmZXJzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgICAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgICAgICAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvY29tcG9uZW50cy9oZWFkZXIudHNcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVuZGVySGVhZGVyID0gcmVuZGVySGVhZGVyO1xuLyoqXG4gKiBIZWFkZXIgQ29tcG9uZW50XG4gKiBSZW5kZXJzIHRoZSBoZWFkZXIgSFRNTCBzdHJ1Y3R1cmUgaW50byBhIHRhcmdldCBjb250YWluZXIuXG4gKiBFdmVudCBsaXN0ZW5lcnMgc2hvdWxkIGJlIGF0dGFjaGVkIHNlcGFyYXRlbHkgYWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLlxuICogQHBhcmFtIGNvbnRhaW5lcklkIC0gVGhlIElEIG9mIHRoZSBlbGVtZW50IHRvIHJlbmRlciB0aGUgaGVhZGVyIGludG8uIERlZmF1bHRzIHRvICdoZWFkZXItcGxhY2Vob2xkZXInLlxuICovXG5mdW5jdGlvbiByZW5kZXJIZWFkZXIoY29udGFpbmVySWQgPSAnaGVhZGVyLXBsYWNlaG9sZGVyJykge1xuICAgIC8vIEVuc3VyZSBydW5uaW5nIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudFxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRmluZCB0aGUgY29udGFpbmVyIGVsZW1lbnQgd2hlcmUgdGhlIGhlYWRlciBzaG91bGQgYmUgcGxhY2VkXG4gICAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVySWQpO1xuICAgIGlmICghaGVhZGVyQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEhlYWRlciBjb250YWluZXIgd2l0aCBJRCAnJHtjb250YWluZXJJZH0nIG5vdCBmb3VuZCBpbiB0aGUgRE9NLmApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIERlZmluZSB0aGUgaGVhZGVyIEhUTUwgc3RydWN0dXJlIC0gbWF0Y2hpbmcgaW5kZXguaHRtbFxuICAgIGhlYWRlckNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJzaXRlLWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPjxhIGhyZWY9XCIvXCI+QmxvZzwvYT48L2gxPlxuICAgICAgICAgICAgPG5hdj5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiL1wiPkhvbWU8L2E+PC9saT4gXG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiLyNhYm91dFwiIGlkPVwiYWJvdXQtYnRuXCI+QWJvdXQ8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJodHRwczovL25vZWx1Z3dva2UuY29tXCI+UG9ydGZvbGlvPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3IgYXJ0aWNsZXMuLi5cIiBjbGFzcz1cInNlYXJjaC1iYXJcIj4gXG4gICAgICAgIDwvaGVhZGVyPlxuICAgIGA7XG4gICAgLy8gRXZlbnQgbGlzdGVuZXJzIHNob3VsZCBiZSBjYWxsZWQgKmFmdGVyKiByZW5kZXJIZWFkZXIgaXMgZXhlY3V0ZWQuXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogTmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZU5hdmlnYXRpb24gPSBpbml0aWFsaXplTmF2aWdhdGlvbjtcbi8qKlxuICogSW5pdGlhbGl6ZSBuYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZU5hdmlnYXRpb24oKSB7XG4gICAgc2V0QWN0aXZlTmF2TGluaygpO1xuICAgIHNldHVwTmF2TGlua3MoKTtcbn1cbi8qKlxuICogU2V0IGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmsgYmFzZWQgb24gY3VycmVudCBVUkwgb3IgcGFnZSBzZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIHNldEFjdGl2ZU5hdkxpbmsoKSB7XG4gICAgY29uc3QgY3VycmVudFBhdGggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoY3VycmVudFBhdGgpO1xufVxuLyoqXG4gKiBTZXR1cCBjbGljayBoYW5kbGVycyBmb3IgbmF2aWdhdGlvbiBsaW5rc1xuICovXG5mdW5jdGlvbiBzZXR1cE5hdkxpbmtzKCkge1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgaWYgKGhyZWYpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKGhyZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBIYW5kbGUgc3BlY2lhbCBjYXNlcyBmb3IgcG9wdXAgbGlua3NcbiAgICBjb25zdCBhYm91dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1idG4nKTtcbiAgICBjb25zdCBjb250YWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtYnRuJyk7XG4gICAgaWYgKGFib3V0QnRuKSB7XG4gICAgICAgIGFib3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlTmF2TGluaygnI2Fib3V0Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoY29udGFjdEJ0bikge1xuICAgICAgICBjb250YWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlTmF2TGluaygnI2NvbnRhY3QnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBVcGRhdGUgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmtcbiAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIG9yIHNlY3Rpb24gSUQgdG8gYWN0aXZhdGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQWN0aXZlTmF2TGluayhwYXRoKSB7XG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gbWF0Y2hpbmcgbGlua1xuICAgIGNvbnN0IGFjdGl2ZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXIgbmF2IHVsIGxpIGFbaHJlZj1cIiR7cGF0aH1cIl1gKTtcbiAgICBpZiAoYWN0aXZlTGluaykge1xuICAgICAgICBhY3RpdmVMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplUGFnaW5hdGlvbiA9IGluaXRpYWxpemVQYWdpbmF0aW9uO1xuLy8gUGFnaW5hdGlvbiBmdW5jdGlvbmFsaXR5XG5jb25zdCBjb21tZW50c18xID0gcmVxdWlyZShcIi4vY29tbWVudHNcIik7XG4vKipcbiAqIEluaXRpYWxpemUgcGFnaW5hdGlvbiBmdW5jdGlvbmFsaXR5IHdpdGggTG9hZCBNb3JlIGJ1dHRvblxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUGFnaW5hdGlvbigpIHtcbiAgICBjb25zdCBsb2FkTW9yZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLW1vcmUtYnRuJyk7XG4gICAgY29uc3QgaGlkZGVuUG9zdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLXBvc3RzJyk7XG4gICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZHMnKTtcbiAgICBpZiAoIWxvYWRNb3JlQnRuIHx8ICFoaWRkZW5Qb3N0cyB8fCAhYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUGFnaW5hdGlvbiBlbGVtZW50cyBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBjdXJyZW50UGFnZSA9IDE7XG4gICAgY29uc3QgcG9zdHNQZXJQYWdlID0gMztcbiAgICBjb25zdCB0b3RhbEhpZGRlblBvc3RzID0gaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIC8vIEhpZGUgbG9hZCBtb3JlIGJ1dHRvbiBpZiBubyBoaWRkZW4gcG9zdHNcbiAgICBpZiAodG90YWxIaWRkZW5Qb3N0cyA9PT0gMCkge1xuICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgICAvLyBTZXQgdXAgbG9hZCBtb3JlIGJ1dHRvbiBjbGljayBoYW5kbGVyXG4gICAgbG9hZE1vcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxvYWRNb3JlUG9zdHMobG9hZE1vcmVCdG4sIGhpZGRlblBvc3RzLCBibG9nQ2FyZHNDb250YWluZXIsIGN1cnJlbnRQYWdlLCBwb3N0c1BlclBhZ2UpO1xuICAgICAgICBjdXJyZW50UGFnZSsrO1xuICAgIH0pO1xuICAgIC8vIEluaXRpYWxpemUgc2Nyb2xsLWJhc2VkIGxvYWRpbmcgKGluZmluaXRlIHNjcm9sbClcbiAgICBpbml0aWFsaXplSW5maW5pdGVTY3JvbGwobG9hZE1vcmVCdG4pO1xufVxuLyoqXG4gKiBMb2FkIG1vcmUgcG9zdHMgd2hlbiB0aGUgbG9hZCBtb3JlIGJ1dHRvbiBpcyBjbGlja2VkXG4gKi9cbmZ1bmN0aW9uIGxvYWRNb3JlUG9zdHMobG9hZE1vcmVCdG4sIGhpZGRlblBvc3RzLCBibG9nQ2FyZHNDb250YWluZXIsIGN1cnJlbnRQYWdlLCBwb3N0c1BlclBhZ2UpIHtcbiAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJyk7XG4gICAgbG9hZE1vcmVCdG4uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic3Bpbm5lclwiPjwvc3Bhbj4gTG9hZGluZy4uLic7XG4gICAgLy8gU2ltdWxhdGUgbG9hZGluZyBkZWxheSBmb3IgYmV0dGVyIFVYXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBwb3N0cyB0byBsb2FkXG4gICAgICAgIGNvbnN0IHN0YXJ0SWR4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiBwb3N0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IGVuZElkeCA9IE1hdGgubWluKHN0YXJ0SWR4ICsgcG9zdHNQZXJQYWdlLCBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGgpO1xuICAgICAgICBsZXQgcG9zdHNMb2FkZWQgPSAwO1xuICAgICAgICAvLyBDbG9uZSBhbmQgbW92ZSBwb3N0cyBmcm9tIGhpZGRlbiBjb250YWluZXIgdG8gdmlzaWJsZSBibG9nIGNhcmRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zdHNQZXJQYWdlICYmIGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCA+IDA7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zdFRvQWRkID0gaGlkZGVuUG9zdHMuY2hpbGRyZW5bMF07IC8vIEFsd2F5cyB0YWtlIHRoZSBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgICBpZiAocG9zdFRvQWRkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmVkUG9zdCA9IHBvc3RUb0FkZC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgY2xvbmVkUG9zdC5jbGFzc0xpc3QuYWRkKCduZXcnKTsgLy8gQWRkIGNsYXNzIGZvciBhbmltYXRpb25cbiAgICAgICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkUG9zdCk7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHMucmVtb3ZlQ2hpbGQocG9zdFRvQWRkKTtcbiAgICAgICAgICAgICAgICBwb3N0c0xvYWRlZCsrO1xuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIG5ldyBwb3N0c1xuICAgICAgICAgICAgICAgICgwLCBjb21tZW50c18xLmluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkpKGNsb25lZFBvc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIGlmIHdlJ3ZlIGxvYWRlZCBhbGwgcG9zdHNcbiAgICAgICAgaWYgKGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXNldCBidXR0b24gc3RhdGVcbiAgICAgICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAgICAgICBsb2FkTW9yZUJ0bi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT4gTG9hZCBNb3JlIFBvc3RzJztcbiAgICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50IHdoZW4gcG9zdHMgYXJlIGxvYWRlZFxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgncG9zdHNMb2FkZWQnLCB7IGRldGFpbDogeyBjb3VudDogcG9zdHNMb2FkZWQgfSB9KTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSwgODAwKTsgLy8gU2ltdWxhdGUgbmV0d29yayBkZWxheVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGluZmluaXRlIHNjcm9sbCBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVJbmZpbml0ZVNjcm9sbChsb2FkTW9yZUJ0bikge1xuICAgIGxldCBzY3JvbGxUaW1lb3V0O1xuICAgIGxldCBpc0xvYWRpbmdNb3JlUG9zdHMgPSBmYWxzZTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAvLyBJZiB0aGUgYnV0dG9uIGlzIGhpZGRlbiAoYWxsIHBvc3RzIGxvYWRlZCkgb3IgYWxyZWFkeSBpbiBsb2FkaW5nIHN0YXRlLCBkbyBub3RoaW5nXG4gICAgICAgIGlmIChsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHxcbiAgICAgICAgICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5jb250YWlucygnbG9hZGluZycpIHx8XG4gICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVvdXQoc2Nyb2xsVGltZW91dCk7XG4gICAgICAgIHNjcm9sbFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0LCBjbGllbnRIZWlnaHQgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIC8vIFdoZW4gdXNlciBzY3JvbGxzIHRvIGJvdHRvbSAod2l0aCBzb21lIGJ1ZmZlcilcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gMjAwKSB7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nTW9yZVBvc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJ0bi5jbGljaygpO1xuICAgICAgICAgICAgICAgIC8vIFJlc2V0IGZsYWcgYWZ0ZXIgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVTZWFyY2ggPSBpbml0aWFsaXplU2VhcmNoO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3QgYmxvZ0NhcmRzXzEgPSByZXF1aXJlKFwiLi9ibG9nQ2FyZHNcIik7XG5jb25zdCBjb21tZW50c18xID0gcmVxdWlyZShcIi4vY29tbWVudHNcIik7XG4vKipcbiAqIEluaXRpYWxpemUgc2VhcmNoIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNlYXJjaCgpIHtcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJzZWFyY2hcIl0nKTtcbiAgICBpZiAoIXNlYXJjaElucHV0KSB7XG4gICAgICAgIGNvbnNvbGUud2FybignU2VhcmNoIGlucHV0IG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQ3ljbGUgdGhyb3VnaCBkaWZmZXJlbnQgcGxhY2Vob2xkZXIgdGV4dHNcbiAgICBzZXR1cFBsYWNlaG9sZGVyQ3ljbGluZyhzZWFyY2hJbnB1dCk7XG4gICAgLy8gU2V0IHVwIHNlYXJjaCBpbnB1dCBldmVudCBoYW5kbGVyXG4gICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgICAgICBoYW5kbGVTZWFyY2goZS50YXJnZXQpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBDeWNsZSB0aHJvdWdoIGRpZmZlcmVudCBwbGFjZWhvbGRlciB0ZXh0cyBmb3IgdGhlIHNlYXJjaCBpbnB1dFxuICovXG5mdW5jdGlvbiBzZXR1cFBsYWNlaG9sZGVyQ3ljbGluZyhzZWFyY2hJbnB1dCkge1xuICAgIGNvbnN0IHBsYWNlaG9sZGVycyA9IFtcbiAgICAgICAgXCJTZWFyY2ggZm9yIGFydGljbGVzLi4uXCIsXG4gICAgICAgIFwiU2VhcmNoIGZvciB0b3BpY3MuLi5cIixcbiAgICAgICAgXCJTZWFyY2ggZm9yIGF1dGhvcnMuLi5cIlxuICAgIF07XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHNlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXJzW2luZGV4XTtcbiAgICAgICAgaW5kZXggPSAoaW5kZXggKyAxKSAlIHBsYWNlaG9sZGVycy5sZW5ndGg7XG4gICAgfSwgMzAwMCk7XG59XG4vKipcbiAqIEhhbmRsZSBzZWFyY2ggaW5wdXQgYW5kIGZpbHRlciBibG9nIHBvc3RzXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZVNlYXJjaChzZWFyY2hJbnB1dCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSBzZWFyY2hJbnB1dC52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHNlYXJjaFRlcm0ubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgLy8gSWYgc2VhcmNoIGlzIGNsZWFyZWQsIHJlbG9hZCBhbGwgcG9zdHNcbiAgICAgICAgICAgIGlmIChzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIERpc3BhdGNoIGV2ZW50IHRvIHJlbG9hZCBwb3N0c1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyZWxvYWRQb3N0cycpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZHMnKTtcbiAgICAgICAgaWYgKCFibG9nQ2FyZHNDb250YWluZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImxvYWRpbmctc3Bpbm5lclwiPjwvZGl2Pic7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGZXRjaCBhbGwgcG9zdHMgYW5kIGZpbHRlciBjbGllbnQtc2lkZVxuICAgICAgICAgICAgLy8gSW4gYSByZWFsIGFwcCwgeW91J2QgaW1wbGVtZW50IHNlcnZlci1zaWRlIHNlYXJjaFxuICAgICAgICAgICAgY29uc3QgcG9zdHMgPSB5aWVsZCAoMCwgYXBpXzEuZmV0Y2hCbG9nUG9zdHMpKCk7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZFBvc3RzID0gZmlsdGVyUG9zdHMocG9zdHMsIHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgLy8gQ2xlYXIgY29udGFpbmVyXG4gICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBpZiAoZmlsdGVyZWRQb3N0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBTaG93IGVtcHR5IHNlYXJjaCByZXN1bHRzXG4gICAgICAgICAgICAgICAgc2hvd0VtcHR5U2VhcmNoUmVzdWx0cyhibG9nQ2FyZHNDb250YWluZXIsIHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERpc3BsYXkgZmlsdGVyZWQgcG9zdHNcbiAgICAgICAgICAgIGRpc3BsYXlGaWx0ZXJlZFBvc3RzKGZpbHRlcmVkUG9zdHMsIGJsb2dDYXJkc0NvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZWFyY2hpbmcgcG9zdHM6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd1NlYXJjaEVycm9yKGJsb2dDYXJkc0NvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogRmlsdGVyIHBvc3RzIGJhc2VkIG9uIHNlYXJjaCB0ZXJtXG4gKi9cbmZ1bmN0aW9uIGZpbHRlclBvc3RzKHBvc3RzLCBzZWFyY2hUZXJtKSB7XG4gICAgcmV0dXJuIHBvc3RzLmZpbHRlcihwb3N0ID0+IHBvc3QudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtKSB8fFxuICAgICAgICBwb3N0LmNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtKSB8fFxuICAgICAgICBwb3N0LmF1dGhvci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pIHx8XG4gICAgICAgIChwb3N0LnRhZ3MgJiYgcG9zdC50YWdzLnNvbWUodGFnID0+IHRhZy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pKSkpO1xufVxuLyoqXG4gKiBEaXNwbGF5IGZpbHRlcmVkIHBvc3RzIGluIHRoZSBibG9nIGNvbnRhaW5lclxuICovXG5mdW5jdGlvbiBkaXNwbGF5RmlsdGVyZWRQb3N0cyhmaWx0ZXJlZFBvc3RzLCBjb250YWluZXIpIHtcbiAgICBmaWx0ZXJlZFBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgIGNvbnN0IGJsb2dDYXJkID0gKDAsIGJsb2dDYXJkc18xLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCkocG9zdCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChibG9nQ2FyZCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGZpbHRlcmVkIHBvc3RzXG4gICAgICAgICgwLCBjb21tZW50c18xLmluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkpKGJsb2dDYXJkKTtcbiAgICB9KTtcbiAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnQgd2hlbiBzZWFyY2ggcmVzdWx0cyBhcmUgZGlzcGxheWVkXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NlYXJjaFJlc3VsdHNEaXNwbGF5ZWQnLCB7XG4gICAgICAgIGRldGFpbDogeyBjb3VudDogZmlsdGVyZWRQb3N0cy5sZW5ndGggfVxuICAgIH0pKTtcbn1cbi8qKlxuICogRGlzcGxheSBlbXB0eSBzZWFyY2ggcmVzdWx0cyBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIHNob3dFbXB0eVNlYXJjaFJlc3VsdHMoY29udGFpbmVyLCBzZWFyY2hUZXJtKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVtcHR5LXNlYXJjaFwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2VhcmNoIGZhLTN4XCI+PC9pPlxuICAgICAgICAgICAgPGgzPk5vIHJlc3VsdHMgZm91bmQ8L2gzPlxuICAgICAgICAgICAgPHA+Tm8gcG9zdHMgbWF0Y2ggeW91ciBzZWFyY2ggZm9yIFwiJHtzZWFyY2hUZXJtfVwiPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuLyoqXG4gKiBEaXNwbGF5IHNlYXJjaCBlcnJvciBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIHNob3dTZWFyY2hFcnJvcihjb250YWluZXIpIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3Itc3RhdGVcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGZhLTN4XCI+PC9pPlxuICAgICAgICAgICAgPGgzPlNlYXJjaCBmYWlsZWQ8L2gzPlxuICAgICAgICAgICAgPHA+RmFpbGVkIHRvIHNlYXJjaCBibG9nIHBvc3RzLiBQbGVhc2UgdHJ5IGFnYWluLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVCbG9nRnJvbnRlbmQgPSBpbml0aWFsaXplQmxvZ0Zyb250ZW5kO1xuLyoqXG4gKiBCbG9nIEZyb250ZW5kIENvbnRyb2xsZXJcbiAqIENsaWVudC1zaWRlIGNvbnRyb2xsZXIgdGhhdCBoYW5kbGVzIGFsbCBmcm9udGVuZCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgYmxvZyBob21lcGFnZS5cbiAqIE1hbmFnZXMgVUkgaW5pdGlhbGl6YXRpb24sIHBvc3QgcmVuZGVyaW5nLCBhbmQgdXNlciBpbnRlcmFjdGlvbnMuXG4gKi9cbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTtcbmNvbnN0IGJsb2dDYXJkc18xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYmxvZ0NhcmRzXCIpO1xuLy8gQXNzdW1pbmcgaW5pdGlhbGl6ZUNvbW1lbnRzIGlzIG1lYW50IGZvciB0aGUgcG9zdCBkZXRhaWwgcGFnZSwgXG4vLyBpdCBtaWdodCBub3QgYmUgbmVlZGVkIGhlcmUgdW5sZXNzIGNhcmRzIGhhdmUgY29tbWVudCBwcmV2aWV3cy9pbnRlcmFjdGlvbnMuXG4vLyBpbXBvcnQgeyBpbml0aWFsaXplQ29tbWVudHMgfSBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1lbnRzJzsgXG5jb25zdCBjb250YWN0XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9jb250YWN0XCIpOyAvLyBIYW5kbGVzIGNvbnRhY3QgcG9wdXAgbG9naWNcbmNvbnN0IHBhZ2luYXRpb25fMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3BhZ2luYXRpb25cIik7IC8vIEhhbmRsZXMgbG9hZCBtb3JlIGxvZ2ljXG5jb25zdCBzZWFyY2hfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3NlYXJjaFwiKTsgLy8gSGFuZGxlcyBzZWFyY2ggYmFyIGxvZ2ljXG5jb25zdCBhYm91dF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYWJvdXRcIik7IC8vIEhhbmRsZXMgYWJvdXQgcG9wdXAgbG9naWNcbmNvbnN0IG5hdmlnYXRpb25fMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL25hdmlnYXRpb25cIik7IC8vIEhhbmRsZXMgbmF2IGxpbmsgYWN0aXZlIHN0YXRlc1xuLy8gTm90ZTogRGFyayBtb2RlIGlzIGluaXRpYWxpemVkIGdsb2JhbGx5IGluIGNsaWVudC50cywgbm8gbmVlZCB0byBpbXBvcnQvY2FsbCBoZXJlIHR5cGljYWxseVxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBibG9nIGZyb250ZW5kIGZ1bmN0aW9uYWxpdHkgKGhvbWVwYWdlKVxuICogU2V0cyB1cCBhbGwgVUkgY29tcG9uZW50cyBhbmQgaW5pdGlhbGl6ZXMgdGhlIGJsb2cgcG9zdHMgZGlzcGxheS5cbiAqIEFzc3VtZXMgaGVhZGVyIGFuZCBkYXJrIG1vZGUgYXJlIGluaXRpYWxpemVkIGdsb2JhbGx5IGJlZm9yZSB0aGlzIHJ1bnMuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVCbG9nRnJvbnRlbmQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBCbG9nIEZyb250ZW5kIENvbnRyb2xsZXIuLi4nKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBuYXZpZ2F0aW9uIGFjdGl2ZSBzdGF0ZXNcbiAgICAgICAgKDAsIG5hdmlnYXRpb25fMS5pbml0aWFsaXplTmF2aWdhdGlvbikoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBpbnRlcmFjdGl2ZSBjb21wb25lbnRzIHNwZWNpZmljIHRvIHRoZSBtYWluIHBhZ2VcbiAgICAgICAgKDAsIGNvbnRhY3RfMS5pbml0aWFsaXplQ29udGFjdEZvcm0pKCk7IC8vIEFzc3VtZXMgI2NvbnRhY3QtYnRuIGFuZCAjY29udGFjdC1wb3B1cCBleGlzdFxuICAgICAgICAoMCwgYWJvdXRfMS5pbml0aWFsaXplQWJvdXQpKCk7IC8vIEFzc3VtZXMgI2Fib3V0LWJ0biBhbmQgI2Fib3V0LXBvcHVwIGV4aXN0XG4gICAgICAgICgwLCBzZWFyY2hfMS5pbml0aWFsaXplU2VhcmNoKSgpOyAvLyBBc3N1bWVzIC5zZWFyY2gtYmFyIGV4aXN0c1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBibG9nIHBvc3RzIGRpc3BsYXlcbiAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgcGFnaW5hdGlvbiBhZnRlciBwb3N0cyBhcmUgbG9hZGVkIGFuZCBjb250YWluZXJzIGV4aXN0XG4gICAgICAgICgwLCBwYWdpbmF0aW9uXzEuaW5pdGlhbGl6ZVBhZ2luYXRpb24pKCk7XG4gICAgICAgIC8vIElmIGNvbW1lbnRzIHByZXZpZXcvaW50ZXJhY3Rpb24gbmVlZGVkIG9uIGNhcmRzLCBpbml0aWFsaXplIGhlcmVcbiAgICAgICAgLy8gaW5pdGlhbGl6ZUNvbW1lbnRzKCk7IFxuICAgICAgICAvLyBTZXQgdXAgZXZlbnQgZGVsZWdhdGlvbiBmb3IgbmF2aWdhdGluZyB3aGVuIGNsaWNraW5nIGJsb2cgY2FyZHNcbiAgICAgICAgc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCk7XG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgcmVsb2FkaW5nIHBvc3RzICh1c2VkIGJ5IHNlYXJjaClcbiAgICAgICAgLy8gQ29uc2lkZXIgYWRkaW5nIGFuIG9wdGlvbiB0byByZW1vdmUgbGlzdGVuZXIgaWYgY29udHJvbGxlciBpcyBldmVyIFwiZGVzdHJveWVkXCJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVsb2FkUG9zdHMnLCBoYW5kbGVSZWxvYWRQb3N0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdCbG9nIEZyb250ZW5kIENvbnRyb2xsZXIgSW5pdGlhbGl6ZWQuJyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEhhbmRsZXMgdGhlIGN1c3RvbSAncmVsb2FkUG9zdHMnIGV2ZW50LCB0eXBpY2FsbHkgdHJpZ2dlcmVkIGJ5IHNlYXJjaC5cbiAqL1xuZnVuY3Rpb24gaGFuZGxlUmVsb2FkUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlbG9hZGluZyBwb3N0cyBkdWUgdG8gcmVsb2FkUG9zdHMgZXZlbnQuLi4nKTtcbiAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgICgwLCBwYWdpbmF0aW9uXzEuaW5pdGlhbGl6ZVBhZ2luYXRpb24pKCk7XG4gICAgICAgIC8vIFJlLXNldHVwIGRlbGVnYXRpb24gaW4gY2FzZSBET00gZWxlbWVudHMgd2VyZSByZXBsYWNlZFxuICAgICAgICBzZXR1cEJsb2dDYXJkc0RlbGVnYXRpb24oKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGV2ZW50IGRlbGVnYXRpb24gZm9yIGJsb2cgY2FyZHMgY29udGFpbmVyXG4gKiBIYW5kbGVzIGNsaWNrcyBmb3IgbmF2aWdhdGlvbiwgcHJldmVudGluZyBjbGlja3Mgb24gaW50ZXJhY3RpdmUgZWxlbWVudHMuXG4gKi9cbmZ1bmN0aW9uIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpIHtcbiAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkcycpO1xuICAgIC8vIE5vdGU6IERlbGVnYXRpb24gb24gaGlkZGVuLXBvc3RzIG1pZ2h0IGJlIHVubmVjZXNzYXJ5IGlmIGNhcmRzIGFyZSBtb3ZlZCBvbiBsb2FkIG1vcmVcbiAgICAvLyBjb25zdCBoaWRkZW5Qb3N0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICBpZiAoYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lciBmaXJzdCB0byBwcmV2ZW50IGR1cGxpY2F0ZXMgaWYgY2FsbGVkIG11bHRpcGxlIHRpbWVzXG4gICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVCbG9nQ2FyZENsaWNrKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0V2ZW50IGRlbGVnYXRpb24gc2V0IHVwIGZvciAuYmxvZy1jYXJkcycpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDb3VsZCBub3QgZmluZCAuYmxvZy1jYXJkcyBjb250YWluZXIgZm9yIGRlbGVnYXRpb24uJyk7XG4gICAgfVxuICAgIC8vIGlmIChoaWRkZW5Qb3N0c0NvbnRhaW5lcikge1xuICAgIC8vICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgIC8vICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgIC8vIH1cbn1cbi8qKlxuICogSGFuZGxlIGNsaWNrIGV2ZW50cyBvbiBibG9nIGNhcmRzIHVzaW5nIGV2ZW50IGRlbGVnYXRpb25cbiAqL1xuZnVuY3Rpb24gaGFuZGxlQmxvZ0NhcmRDbGljayhldmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBjYXJkID0gdGFyZ2V0LmNsb3Nlc3QoJy5ibG9nLWNhcmQnKTsgLy8gVHlwZSBhc3NlcnRpb25cbiAgICBpZiAoY2FyZCkge1xuICAgICAgICAvLyBQcmV2ZW50IG5hdmlnYXRpb24gaWYgdGhlIGNsaWNrIG9yaWdpbmF0ZWQgb24gYSBidXR0b24sIGxpbmssIG9yIGljb24gd2l0aGluIHRoZSBjYXJkXG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBhLCBpJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDbGlja2VkIGludGVyYWN0aXZlIGVsZW1lbnQgaW5zaWRlIGNhcmQsIHByZXZlbnRpbmcgbmF2aWdhdGlvbi4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwb3N0SWQgPSBjYXJkLmRhdGFzZXQucG9zdElkOyAvLyBVc2UgZGF0YXNldCBwcm9wZXJ0eVxuICAgICAgICBpZiAocG9zdElkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTmF2aWdhdGluZyB0byBwb3N0ICR7cG9zdElkfWApO1xuICAgICAgICAgICAgLy8gVXNlIHJlbGF0aXZlIHBhdGggZm9yIG5hdmlnYXRpb25cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHBvc3QuaHRtbD9pZD0ke3Bvc3RJZH1gO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGJsb2cgcG9zdHMgZnJvbSBBUElcbiAqIEZldGNoZXMgcG9zdHMgZnJvbSB0aGUgQVBJIGFuZCByZW5kZXJzIHRoZW0gaW4gdGhlIFVJXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBVc2UgbW9yZSBzcGVjaWZpYyBzZWxlY3RvciBpZiBwb3NzaWJsZSwgZS5nLiwgI2Jsb2dcbiAgICAgICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cuYmxvZy1jYXJkcycpO1xuICAgICAgICBpZiAoIWJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQmxvZyBjYXJkcyBjb250YWluZXIgKCNibG9nLmJsb2ctY2FyZHMpIG5vdCBmb3VuZCBpbiB0aGUgRE9NLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImxvYWRpbmctc3Bpbm5lclwiPjwvZGl2PjxwPkxvYWRpbmcgcG9zdHMuLi48L3A+JztcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciA/dGFnPS4uLiBxdWVyeSBwYXJhbWV0ZXJcbiAgICAgICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICBjb25zdCB0YWdGaWx0ZXIgPSB1cmxQYXJhbXMuZ2V0KCd0YWcnKTtcbiAgICAgICAgICAgIC8vIEZldGNoIHBvc3RzIHVzaW5nIHRoZSBmdW5jdGlvbiBmcm9tIGFwaS50cyAod2hpY2ggZmV0Y2hlcyBzdGF0aWMganNvbilcbiAgICAgICAgICAgIGxldCBwb3N0cyA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaEJsb2dQb3N0cykoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGVkICR7cG9zdHMubGVuZ3RofSBwb3N0cy5gKTtcbiAgICAgICAgICAgIC8vIEZpbHRlciBwb3N0cyBieSB0YWcgaWYgdGhlIHF1ZXJ5IHBhcmFtZXRlciBpcyBwcmVzZW50XG4gICAgICAgICAgICBpZiAodGFnRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FzZS1pbnNlbnNpdGl2ZSB0YWcgZmlsdGVyaW5nXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRhZ0ZpbHRlciA9IHRhZ0ZpbHRlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHBvc3RzID0gcG9zdHMuZmlsdGVyKHBvc3QgPT4gcG9zdC50YWdzLnNvbWUodGFnID0+IHRhZy50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVGFnRmlsdGVyKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZpbHRlcmVkIHBvc3RzIGJ5IHRhZyAnJHt0YWdGaWx0ZXJ9JzogJHtwb3N0cy5sZW5ndGh9IHBvc3RzLmApO1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhIGZpbHRlciBpbmRpY2F0b3IgYWJvdmUgdGhlIHBvc3RzXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ29udGFpbmVyLmNsYXNzTmFtZSA9ICd0YWctZmlsdGVyLWluZGljYXRvcic7XG4gICAgICAgICAgICAgICAgZmlsdGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8cD5TaG93aW5nIHBvc3RzIHRhZ2dlZCB3aXRoOiA8c3BhbiBjbGFzcz1cImZpbHRlcmVkLXRhZ1wiPiR7dGFnRmlsdGVyfTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9cIiBjbGFzcz1cImNsZWFyLWZpbHRlclwiPkNsZWFyIGZpbHRlcjwvYT5cbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0IGZpbHRlciBpbmRpY2F0b3IgYmVmb3JlIHRoZSBibG9nIGNhcmRzXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvZ0NvbnRhaW5lciA9IGJsb2dDYXJkc0NvbnRhaW5lci5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIGlmIChibG9nQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2dDb250YWluZXIuaW5zZXJ0QmVmb3JlKGZpbHRlckNvbnRhaW5lciwgYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDbGVhciBsb2FkaW5nIHN0YXRlXG4gICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBpZiAocG9zdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIGVtcHR5IHN0YXRlIHRvIHJlZmxlY3QgZmlsdGVyaW5nIGlmIGFwcGxpY2FibGVcbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTdGF0ZShibG9nQ2FyZHNDb250YWluZXIsIHRhZ0ZpbHRlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGlzcGxheSBpbml0aWFsIHBvc3RzIChlLmcuLCBmaXJzdCAzIG9yIDYpXG4gICAgICAgICAgICBjb25zdCBpbml0aWFsUG9zdENvdW50ID0gNjsgLy8gT3IgYWRqdXN0IGFzIG5lZWRlZFxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVBvc3RzID0gcG9zdHMuc2xpY2UoMCwgaW5pdGlhbFBvc3RDb3VudCk7XG4gICAgICAgICAgICBjb25zdCBoaWRkZW5Qb3N0cyA9IHBvc3RzLnNsaWNlKGluaXRpYWxQb3N0Q291bnQpO1xuICAgICAgICAgICAgLy8gQWRkIHZpc2libGUgcG9zdHMgdG8gbWFpbiBjb250YWluZXJcbiAgICAgICAgICAgIGRpc3BsYXlQb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2dDYXJkID0gKDAsIGJsb2dDYXJkc18xLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCkocG9zdCk7XG4gICAgICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gQWRkIHJlbWFpbmluZyBwb3N0cyB0byBoaWRkZW4gY29udGFpbmVyIGZvciBwYWdpbmF0aW9uXG4gICAgICAgICAgICBjb25zdCBoaWRkZW5Qb3N0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICAgICAgICAgIGlmIChoaWRkZW5Qb3N0c0NvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGhpZGRlblBvc3RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnOyAvLyBDbGVhciBwcmV2aW91cyBoaWRkZW4gcG9zdHNcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9nQ2FyZCA9ICgwLCBibG9nQ2FyZHNfMS5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQpKHBvc3QpO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChibG9nQ2FyZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7aGlkZGVuUG9zdHMubGVuZ3RofSBwb3N0cyBhZGRlZCB0byBoaWRkZW4gY29udGFpbmVyLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlIGxvYWQgbW9yZSBidXR0b24gdmlzaWJpbGl0eVxuICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgICAgICAgICAgaWYgKGxvYWRNb3JlQnRuKSB7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9IGhpZGRlblBvc3RzLmxlbmd0aCA+IDAgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW5pdGlhbGl6aW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvclN0YXRlKGJsb2dDYXJkc0NvbnRhaW5lcik7IC8vIFNob3cgZXJyb3Igc3RhdGUgaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFNob3cgZW1wdHkgc3RhdGUgd2hlbiBubyBwb3N0cyBhcmUgYXZhaWxhYmxlXG4gKiBAcGFyYW0gY29udGFpbmVyIFRoZSBjb250YWluZXIgZWxlbWVudCB0byBzaG93IHRoZSBlbXB0eSBzdGF0ZSBpblxuICogQHBhcmFtIHRhZ0ZpbHRlciBPcHRpb25hbCB0YWcgZmlsdGVyIHRoYXQgd2FzIHVzZWQgKHRvIGV4cGxhaW4gd2h5IG5vIHBvc3RzIHdlcmUgZm91bmQpXG4gKi9cbmZ1bmN0aW9uIHNob3dFbXB0eVN0YXRlKGNvbnRhaW5lciwgdGFnRmlsdGVyKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnOyAvLyBDbGVhciBjb250YWluZXJcbiAgICBjb25zdCBlbXB0eVN0YXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW1wdHlTdGF0ZURpdi5jbGFzc05hbWUgPSAnZW1wdHktc3RhdGUnOyAvLyBBZGQgY2xhc3MgZm9yIHN0eWxpbmdcbiAgICAvLyBDdXN0b21pemUgbWVzc2FnZSBpZiBmaWx0ZXJpbmcgYnkgdGFnXG4gICAgY29uc3QgbWVzc2FnZSA9IHRhZ0ZpbHRlclxuICAgICAgICA/IGBObyBwb3N0cyBmb3VuZCB3aXRoIHRoZSB0YWcgXCIke3RhZ0ZpbHRlcn1cIi5gXG4gICAgICAgIDogJ05vIHBvc3RzIGZvdW5kLic7XG4gICAgZW1wdHlTdGF0ZURpdi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpbGUtYWx0IGZhLTN4XCI+PC9pPlxuICAgICAgICA8aDM+JHttZXNzYWdlfTwvaDM+XG4gICAgICAgICR7dGFnRmlsdGVyID8gJzxwPjxhIGhyZWY9XCIvXCI+VmlldyBhbGwgcG9zdHM8L2E+PC9wPicgOiAnPHA+Q2hlY2sgYmFjayBsYXRlciBmb3IgbmV3IGNvbnRlbnQhPC9wPid9XG4gICAgYDtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wdHlTdGF0ZURpdik7XG4gICAgY29uc29sZS5sb2coJ0Rpc3BsYXllZCBlbXB0eSBzdGF0ZSBmb3IgcG9zdHMuJyk7XG59XG4vKipcbiAqIFNob3cgZXJyb3Igc3RhdGUgd2hlbiBwb3N0cyBjb3VsZG4ndCBiZSBsb2FkZWRcbiAqL1xuZnVuY3Rpb24gc2hvd0Vycm9yU3RhdGUoY29udGFpbmVyKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnOyAvLyBDbGVhciBjb250YWluZXJcbiAgICBjb25zdCBlcnJvclN0YXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZXJyb3JTdGF0ZURpdi5jbGFzc05hbWUgPSAnZXJyb3Itc3RhdGUnOyAvLyBBZGQgY2xhc3MgZm9yIHN0eWxpbmdcbiAgICBlcnJvclN0YXRlRGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZmEtM3hcIj48L2k+XG4gICAgICAgIDxoMz5Tb21ldGhpbmcgd2VudCB3cm9uZzwvaDM+XG4gICAgICAgIDxwPkZhaWxlZCB0byBsb2FkIGJsb2cgcG9zdHMuIFBsZWFzZSB0cnkgcmVmcmVzaGluZyB0aGUgcGFnZS48L3A+XG4gICAgYDsgLy8gRXhhbXBsZSBjb250ZW50XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVycm9yU3RhdGVEaXYpO1xuICAgIGNvbnNvbGUubG9nKCdEaXNwbGF5ZWQgZXJyb3Igc3RhdGUgZm9yIHBvc3RzLicpO1xufVxuLy8gUkVNT1ZFRDogTG9jYWwgZGVmaW5pdGlvbnMgYW5kIGNhbGxzIGZvciBzZXR1cFNlYXJjaCBhbmQgc2V0dXBQb3B1cEJ1dHRvbnNcbi8vIEZ1bmN0aW9uYWxpdHkgaXMgbm93IGhhbmRsZWQgYnkgdGhlIGltcG9ydGVkIGluaXRpYWxpemVTZWFyY2gsIGluaXRpYWxpemVBYm91dCwgaW5pdGlhbGl6ZUNvbnRhY3RGb3JtXG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9lbnRyaWVzL2NsaWVudC50c1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBJbXBvcnRzIHJlbWFpbiB0aGUgc2FtZS4uLlxuY29uc3QgYmxvZ0Zyb250ZW5kQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2Jsb2dGcm9udGVuZENvbnRyb2xsZXJcIik7XG5jb25zdCBwb3N0RGV0YWlsXzEgPSByZXF1aXJlKFwiLi4vbW9kdWxlcy9wb3N0RGV0YWlsXCIpO1xuY29uc3QgaGVhZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vKipcbiAqIENsaWVudC1zaWRlIGVudHJ5IHBvaW50IGluaXRpYWxpemVyLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ2xpZW50KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGllbnQgaW5pdGlhbGl6aW5nLi4uJyk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgY29tbW9uIGVsZW1lbnRzIGZpcnN0XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEYXJrIG1vZGUgaW5pdGlhbGl6ZWQgZ2xvYmFsbHkuJyk7XG4gICAgICAgICAgICAvLyBSZW5kZXIgSGVhZGVyIG9ubHkgaWYgcGxhY2Vob2xkZXIgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlci1wbGFjZWhvbGRlcicpKSB7XG4gICAgICAgICAgICAgICAgKDAsIGhlYWRlcl8xLnJlbmRlckhlYWRlcikoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGVyIHJlbmRlcmVkIGdsb2JhbGx5LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdIZWFkZXIgcGxhY2Vob2xkZXIgbm90IGZvdW5kIG9uIHRoaXMgcGFnZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgY29tbW9uIGVsZW1lbnRzOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUGFnZS1zcGVjaWZpYyBsb2dpY1xuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5wYWdlO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgLy8gR2V0IHRoZSBiYXNlIG5hbWUgb2YgdGhlIGZpbGUvcGF0aCwgcmVtb3ZpbmcgdHJhaWxpbmcgc2xhc2ggaWYgcHJlc2VudFxuICAgICAgICBjb25zdCBwYXRoRW5kID0gY3VycmVudFBhZ2UuZW5kc1dpdGgoJy8nKSA/IGN1cnJlbnRQYWdlLnNsaWNlKDAsIC0xKS5zcGxpdCgnLycpLnBvcCgpIDogY3VycmVudFBhZ2Uuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgICAgY29uc3QgaXNSb290T3JJbmRleCA9IGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvJykgfHwgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9pbmRleC5odG1sJyk7IC8vIENoZWNrIGlmIGl0J3MgdGhlIHJvb3Qgb2YgdGhlIGRlcGxveW1lbnRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZXRlY3RlZCBwYWdlVHlwZTogJHtwYWdlVHlwZX0sIGN1cnJlbnRQYWdlOiAke2N1cnJlbnRQYWdlfSwgcGF0aEVuZDogJHtwYXRoRW5kfSwgaXNSb290T3JJbmRleDogJHtpc1Jvb3RPckluZGV4fWApO1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIE1haW4gUGFnZSAodXNpbmcgZGF0YS1wYWdlIG9yIHBhdGggZW5kaW5nIGluIC8gb3IgL2luZGV4Lmh0bWwpXG4gICAgICAgICAgICBpZiAocGFnZVR5cGUgPT09ICdtYWluJyB8fCAoIXBhZ2VUeXBlICYmIGlzUm9vdE9ySW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBtYWluIGJsb2cgcGFnZSBsb2dpYy4uLicpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBibG9nRnJvbnRlbmRDb250cm9sbGVyXzEuaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCkoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWFpbiBibG9nIHBhZ2UgbG9naWMgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIFBvc3QgRGV0YWlsIFBhZ2UgKHVzaW5nIGRhdGEtcGFnZSBvciBwYXRoIGVuZGluZyBpbiAvcG9zdC5odG1sKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFnZVR5cGUgPT09ICdwb3N0JyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvcG9zdC5odG1sJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBwb3N0IGRldGFpbCBwYWdlIGxvZ2ljIChmcm9tIG1vZHVsZSkuLi4nKTtcbiAgICAgICAgICAgICAgICB5aWVsZCAoMCwgcG9zdERldGFpbF8xLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljKSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRldGFpbCBwYWdlIGxvZ2ljIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBBZG1pbiBQYWdlICh1c2luZyBkYXRhLXBhZ2Ugb3IgcGF0aCBlbmRpbmcgaW4gL2FkbWluLmh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ2FkbWluJyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvYWRtaW4uaHRtbCcpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZG1pbiBwYWdlIGRldGVjdGVkIGJ5IGNsaWVudC50cyAtIG5vIGFjdGlvbiB0YWtlbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmtub3duIHBhZ2UgdHlwZSAoJyR7cGFnZVR5cGV9Jykgb3IgcGF0aCAoJyR7Y3VycmVudFBhZ2V9JykuIE5vIHNwZWNpZmljIGluaXRpYWxpemF0aW9uIG5lZWRlZCBmcm9tIGNsaWVudC50cy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBwYWdlLXNwZWNpZmljIGNsaWVudCBpbml0aWFsaXphdGlvbjonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIERPTUNvbnRlbnRMb2FkZWQgbGlzdGVuZXIgcmVtYWlucyB0aGUgc2FtZS4uLlxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0aWFsaXplQ2xpZW50KTtcbn1cbmVsc2Uge1xuICAgIGluaXRpYWxpemVDbGllbnQoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL21vZHVsZXMvcG9zdERldGFpbC50c1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljID0gaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWM7XG5leHBvcnRzLmxvYWRQb3N0Q29udGVudCA9IGxvYWRQb3N0Q29udGVudDtcbmV4cG9ydHMudXBkYXRlUG9zdFVJID0gdXBkYXRlUG9zdFVJO1xuZXhwb3J0cy51cGRhdGVQYWdlTWV0YWRhdGEgPSB1cGRhdGVQYWdlTWV0YWRhdGE7XG5leHBvcnRzLmluaXRpYWxpemVTb2NpYWxTaGFyaW5nID0gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmc7XG5leHBvcnRzLnNob3dFcnJvck1lc3NhZ2UgPSBzaG93RXJyb3JNZXNzYWdlO1xuLy8gLS0tIEltcG9ydHMgLS0tXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCB1cmxUcmFuc2Zvcm1lcl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3VybFRyYW5zZm9ybWVyXCIpO1xuY29uc3QgaGVhZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vLyAtLS0gQ29yZSBJbml0aWFsaXphdGlvbiBGdW5jdGlvbiAtLS1cbi8qKlxuICogSW5pdGlhbGl6ZXMgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBwb3N0IGRldGFpbCBwYWdlLlxuICogVGhpcyBpcyB0aGUgbWFpbiBleHBvcnRlZCBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBjYWxsZWQgYnkgdGhlIGVudHJ5IHBvaW50LlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIHBvc3QgZGV0YWlsIHBhZ2UuLi4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKSgpO1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuaW5pdGlhbGl6ZURhcmtNb2RlKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RhcmsgbW9kZSBpbml0aWFsaXplZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGhlYWRlcl8xLnJlbmRlckhlYWRlcikoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWFkZXIgcmVuZGVyZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgY29uc3QgcG9zdElkID0gdXJsUGFyYW1zLmdldCgnaWQnKTtcbiAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgeWllbGQgbG9hZFBvc3RDb250ZW50KHBvc3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBwb3N0IElEIHByb3ZpZGVkIGluIHRoZSBVUkwnKTtcbiAgICAgICAgICAgIHNob3dFcnJvck1lc3NhZ2UoJ05vIHBvc3Qgc3BlY2lmaWVkLiBQbGVhc2UgY2hlY2sgdGhlIFVSTC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnUG9zdCBkZXRhaWwgcGFnZSBpbml0aWFsaXphdGlvbiBjb21wbGV0ZS4nKTtcbiAgICB9KTtcbn1cbi8qKlxuICogTG9hZCBhbmQgZGlzcGxheSBwb3N0IGNvbnRlbnQgYmFzZWQgb24gcG9zdCBJRFxuICovXG5mdW5jdGlvbiBsb2FkUG9zdENvbnRlbnQocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBwb3N0IHdpdGggSUQ6ICR7cG9zdElkfWApO1xuICAgICAgICAgICAgY29uc3QgcG9zdCA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaFBvc3RCeUlkKShwb3N0SWQpO1xuICAgICAgICAgICAgaWYgKCFwb3N0KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUG9zdCB3aXRoIElEICR7cG9zdElkfSBub3QgZm91bmRgKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRhdGEgZmV0Y2hlZDonLCBwb3N0KTtcbiAgICAgICAgICAgIHVwZGF0ZVBvc3RVSShwb3N0KTtcbiAgICAgICAgICAgIHVwZGF0ZVBhZ2VNZXRhZGF0YShwb3N0KTtcbiAgICAgICAgICAgIGluaXRpYWxpemVTb2NpYWxTaGFyaW5nKHBvc3QpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBwb3N0IGNvbnRlbnQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZShgRmFpbGVkIHRvIGxvYWQgdGhlIGJsb2cgcG9zdC4gJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLid9YCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogVXBkYXRlIHRoZSBwb3N0IFVJIHdpdGggY29udGVudCBmcm9tIHRoZSBsb2FkZWQgcG9zdFxuICovXG5mdW5jdGlvbiB1cGRhdGVQb3N0VUkocG9zdCkge1xuICAgIGNvbnNvbGUubG9nKCdVcGRhdGluZyBQb3N0IFVJIGZvcjonLCBwb3N0LnRpdGxlKTtcbiAgICBjb25zdCBwb3N0QXJ0aWNsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgaWYgKCFwb3N0QXJ0aWNsZUVsZW1lbnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQ2Fubm90IHVwZGF0ZSBVSTogI3Bvc3QtY29udGVudCBlbGVtZW50IG5vdCBmb3VuZC4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGlubmVyIEhUTUwgZHluYW1pY2FsbHlcbiAgICBwb3N0QXJ0aWNsZUVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxoMT4ke3Bvc3QudGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LW1ldGFcIj5cbiAgICAgICAgICAgICAgICA8dGltZSBkYXRldGltZT1cIiR7cG9zdC5jcmVhdGVkQXQgPyBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdIDogJyd9XCI+XG4gICAgICAgICAgICAgICAgICAgICR7cG9zdC5jcmVhdGVkQXQgPyBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJyB9KSA6ICdEYXRlIHVua25vd24nfVxuICAgICAgICAgICAgICAgIDwvdGltZT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF1dGhvclwiPmJ5ICR7cG9zdC5hdXRob3IgfHwgJ0Fub255bW91cyd9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgJHtwb3N0LmltYWdlVXJsID8gYDxpbWcgc3JjPVwiJHtwb3N0LmltYWdlVXJsfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIiBjbGFzcz1cImZlYXR1cmVkLWltYWdlXCI+YCA6ICcnfVxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWNvbnRlbnQtYm9keVwiPlxuICAgICAgICAgICAgJHtwb3N0LmNvbnRlbnR9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWZvb3RlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3NcIj5cbiAgICAgICAgICAgICAgICAke3Bvc3QudGFncyAmJiBwb3N0LnRhZ3MubGVuZ3RoID4gMCA/IGA8c3Bhbj5UYWdzOjwvc3Bhbj4gJHtwb3N0LnRhZ3MubWFwKHRhZyA9PiBgPGEgaHJlZj1cIiR7KDAsIHVybFRyYW5zZm9ybWVyXzEuZ2VuZXJhdGVUYWdGaWx0ZXJVcmwpKHRhZyl9XCI+JHt0YWd9PC9hPmApLmpvaW4oJycpfWAgOiAnJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvY2lhbC1zaGFyaW5nXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+U2hhcmU6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gdHdpdHRlclwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBUd2l0dGVyXCI+PGkgY2xhc3M9XCJmYWIgZmEtdHdpdHRlclwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGZhY2Vib29rXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIEZhY2Vib29rXCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2stZlwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGxpbmtlZGluXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIExpbmtlZEluXCI+PGkgY2xhc3M9XCJmYWIgZmEtbGlua2VkaW4taW5cIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICBjb25zb2xlLmxvZygnUG9zdCBVSSB1cGRhdGVkIHdpdGggbGlrZSBidXR0b24gYW5kIGNvbW1lbnRzIHNlY3Rpb24gc3RydWN0dXJlLicpO1xufVxuLyoqXG4gKiBVcGRhdGUgcGFnZSBtZXRhZGF0YSBsaWtlIHRpdGxlIGFuZCBVUkxcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUGFnZU1ldGFkYXRhKHBvc3QpIHtcbiAgICBkb2N1bWVudC50aXRsZSA9IGAke3Bvc3QudGl0bGV9IHwgTm9lbCdzIEJsb2dgO1xuICAgIGNvbnNvbGUubG9nKCdQYWdlIG1ldGFkYXRhIHVwZGF0ZWQuJyk7XG59XG4vKipcbiAqIEluaXRpYWxpemUgc29jaWFsIHNoYXJpbmcgZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplU29jaWFsU2hhcmluZyhwb3N0KSB7XG4gICAgY29uc3QgcG9zdEFydGljbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGlmICghcG9zdEFydGljbGVFbGVtZW50KVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3Qgc29jaWFsU2hhcmluZ0RpdiA9IHBvc3RBcnRpY2xlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsLXNoYXJpbmcnKTtcbiAgICBpZiAoc29jaWFsU2hhcmluZ0Rpdikge1xuICAgICAgICBzb2NpYWxTaGFyaW5nRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNoYXJlLWJ1dHRvbicpO1xuICAgICAgICAgICAgaWYgKCFidXR0b24pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGBDaGVjayBvdXQgdGhpcyBhcnRpY2xlOiAke3Bvc3QudGl0bGV9YDtcbiAgICAgICAgICAgIGxldCBzaGFyZVdpbmRvd1VybCA9ICcnO1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3R3aXR0ZXInKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfSZ0ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICd0d2l0dGVyLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9MjM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWNlYm9vaycpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnZmFjZWJvb2stc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmtlZGluJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmluZy9zaGFyZS1vZmZzaXRlLz91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnbGlua2VkaW4tc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdTb2NpYWwgc2hhcmluZyBpbml0aWFsaXplZC4nKTtcbn1cbi8qKlxuICogRGlzcGxheSBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSB1c2VyIHdpdGhpbiB0aGUgcG9zdCBjb250ZW50IGFyZWFcbiAqL1xuZnVuY3Rpb24gc2hvd0Vycm9yTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgY29uc3QgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgaWYgKGNvbnRlbnRFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50cy1zZWN0aW9uJyk7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBjb21tZW50c1NlY3Rpb24gPyBjb21tZW50c1NlY3Rpb24gOiBjb250ZW50RWxlbWVudDtcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj4ke21lc3NhZ2V9PC9kaXY+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFsZXJ0KG1lc3NhZ2UpOyAvLyBGYWxsYmFja1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmxpa2VQb3N0ID0gbGlrZVBvc3Q7XG5leHBvcnRzLnVubGlrZVBvc3QgPSB1bmxpa2VQb3N0O1xuZXhwb3J0cy5kZWxldGVCbG9nUG9zdCA9IGRlbGV0ZUJsb2dQb3N0O1xuZXhwb3J0cy5jcmVhdGVQb3N0ID0gY3JlYXRlUG9zdDtcbmV4cG9ydHMudXBkYXRlUG9zdCA9IHVwZGF0ZVBvc3Q7XG5leHBvcnRzLmFkZFRhZ1RvUG9zdCA9IGFkZFRhZ1RvUG9zdDtcbmV4cG9ydHMuZmV0Y2hCbG9nUG9zdHMgPSBmZXRjaEJsb2dQb3N0cztcbmV4cG9ydHMuZmV0Y2hQb3N0QnlJZCA9IGZldGNoUG9zdEJ5SWQ7XG5leHBvcnRzLmZldGNoQ29tbWVudHNBcGkgPSBmZXRjaENvbW1lbnRzQXBpO1xuZXhwb3J0cy5zdWJtaXRDb21tZW50QXBpID0gc3VibWl0Q29tbWVudEFwaTtcbi8vIEFQSV9VUkwgY29uc3RhbnQgaXMgbm90IG5lZWRlZCB3aGVuIGZldGNoaW5nIHN0YXRpYyBmaWxlIGRpcmVjdGx5XG4vLyBjb25zdCBBUElfVVJMID0gJy9hcGknOyBcbi8vIC0tLSBGdW5jdGlvbnMgcmVseWluZyBvbiBiYWNrZW5kIEFQSSAoV2lsbCBOT1Qgd29yayBvbiBHaXRIdWIgUGFnZXMpIC0tLVxuLy8gVGhlc2UgZnVuY3Rpb25zIHdpbGwgZmFpbCBzaWxlbnRseSBvciBsb2cgZXJyb3JzIGluIHRoZSBjb25zb2xlIG9uIHRoZSBzdGF0aWMgc2l0ZS5cbmZ1bmN0aW9uIGxpa2VQb3N0KGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgTGlrZSBmdW5jdGlvbmFsaXR5IHJlcXVpcmVzIGEgYmFja2VuZC4gQ2Fubm90IExJS0UgcG9zdCAke2lkfSBvbiBzdGF0aWMgc2l0ZS5gKTtcbiAgICAgICAgLy8gUmV0dXJuIG51bGwgb3IgYSBkZWZhdWx0IHN0cnVjdHVyZSBpZiB5b3VyIGNhbGxpbmcgY29kZSBleHBlY3RzIGl0XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdW5saWtlUG9zdChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFVubGlrZSBmdW5jdGlvbmFsaXR5IHJlcXVpcmVzIGEgYmFja2VuZC4gQ2Fubm90IFVOTElLRSBwb3N0ICR7aWR9IG9uIHN0YXRpYyBzaXRlLmApO1xuICAgICAgICAvLyBSZXR1cm4gbnVsbCBvciBhIGRlZmF1bHQgc3RydWN0dXJlXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGVsZXRlQmxvZ1Bvc3QocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBkZWxldGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVQb3N0KHBvc3REYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBjcmVhdGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVBvc3QoaWQsIHBvc3REYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCB1cGRhdGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGFkZFRhZ1RvUG9zdChpZCwgdGFnKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBhZGQgdGFnIG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuLy8gLS0tIEZ1bmN0aW9ucyBtb2RpZmllZCBmb3Igc3RhdGljIGRhdGEgLS0tXG5jb25zdCBTVEFUSUNfREFUQV9VUkwgPSAnZGF0YS9wb3N0cy5qc29uJzsgLy8gRGVmaW5lIHJlbGF0aXZlIHBhdGggb25jZVxuLyoqXG4gKiBGZXRjaCBhbGwgYmxvZyBwb3N0cyBkaXJlY3RseSBmcm9tIHRoZSBzdGF0aWMgSlNPTiBmaWxlLlxuICovXG5mdW5jdGlvbiBmZXRjaEJsb2dQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgRmV0Y2hpbmcgc3RhdGljIGRhdGEgZnJvbTogJHtTVEFUSUNfREFUQV9VUkx9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGZXRjaCB0aGUgSlNPTiBmaWxlIHVzaW5nIHRoZSByZWxhdGl2ZSBwYXRoXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKFNUQVRJQ19EQVRBX1VSTCk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggJHtTVEFUSUNfREFUQV9VUkx9OiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIC8vIEFzc3VtaW5nIHRoZSBKU09OIHN0cnVjdHVyZSBpcyB7IHBvc3RzOiBbLi4uXSB9IFxuICAgICAgICAgICAgcmV0dXJuIGRhdGEucG9zdHMgfHwgW107XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBzdGF0aWMgJHtTVEFUSUNfREFUQV9VUkx9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IG9uIGVycm9yXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGEgc2luZ2xlIHBvc3QgYnkgSUQgYnkgZmlsdGVyaW5nIHRoZSBzdGF0aWMgSlNPTiBkYXRhLlxuICogQHBhcmFtIGlkIC0gVGhlIHBvc3QgSUQgKHN0cmluZyBvciBudW1iZXIpXG4gKi9cbmZ1bmN0aW9uIGZldGNoUG9zdEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRmV0Y2ggYWxsIHBvc3RzIGZpcnN0XG4gICAgICAgICAgICBjb25zdCBhbGxQb3N0cyA9IHlpZWxkIGZldGNoQmxvZ1Bvc3RzKCk7XG4gICAgICAgICAgICBjb25zdCBwb3N0SWROdW1iZXIgPSB0eXBlb2YgaWQgPT09ICdzdHJpbmcnID8gcGFyc2VJbnQoaWQsIDEwKSA6IGlkO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHBvc3RJZE51bWJlcikpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIHBvc3QgSUQgcHJvdmlkZWQ6ICR7aWR9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBzcGVjaWZpYyBwb3N0XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0gYWxsUG9zdHMuZmluZChwID0+IE51bWJlcihwLmlkKSA9PT0gcG9zdElkTnVtYmVyKTtcbiAgICAgICAgICAgIGlmICghcG9zdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgUG9zdCB3aXRoIElEICR7aWR9IG5vdCBmb3VuZCBpbiBzdGF0aWMgZGF0YS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGb3VuZCBwb3N0ICR7aWR9IGluIHN0YXRpYyBkYXRhLmApO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBzdGF0aWMgcG9zdCAke2lkfTpgLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gLS0tIENvbW1lbnQgQVBJIFBsYWNlaG9sZGVycyAtLS1cbmZ1bmN0aW9uIGZldGNoQ29tbWVudHNBcGkocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ29tbWVudHMgY2Fubm90IGJlIGZldGNoZWQgb24gc3RhdGljIHNpdGUgd2l0aG91dCBleHRlcm5hbCBzZXJ2aWNlL2JhY2tlbmQuXCIpO1xuICAgICAgICByZXR1cm4gW107XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzdWJtaXRDb21tZW50QXBpKHBvc3RJZCwgbmFtZSwgY29tbWVudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3Qgc3VibWl0IGNvbW1lbnQgb24gc3RhdGljIHNpdGUgd2l0aG91dCBleHRlcm5hbCBzZXJ2aWNlL2JhY2tlbmQuXCIpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb21tZW50IHN1Ym1pc3Npb24gbm90IGF2YWlsYWJsZS5cIik7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy91dGlscy91cmxUcmFuc2Zvcm1lci50cyAoRXhhbXBsZSBMb2NhdGlvbilcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2VuZXJhdGVUYWdGaWx0ZXJVcmwgPSBnZW5lcmF0ZVRhZ0ZpbHRlclVybDtcbi8qKlxuICogR2VuZXJhdGVzIGEgVVJMIHBhdGggZm9yIGZpbHRlcmluZyBieSB0YWcgb24gdGhlIG1haW4gYmxvZyBwYWdlLlxuICogQ3JlYXRlcyBhIFVSTCBsaWtlIFwiL2Jsb2cvP3RhZz15b3VyLXRhZy1uYW1lXCIgb3IgXCIvP3RhZz15b3VyLXRhZy1uYW1lXCIgYmFzZWQgb24gZW52aXJvbm1lbnQuXG4gKlxuICogQHBhcmFtIHRhZyAtIFRoZSB0YWcgc3RyaW5nIHRvIGZpbHRlciBieS5cbiAqIEByZXR1cm5zIFRoZSBVUkwgcGF0aCB3aXRoIHRoZSB0YWcgcXVlcnkgcGFyYW1ldGVyLlxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRhZ0ZpbHRlclVybCh0YWcpIHtcbiAgICAvLyBPcHRpb25hbDogQ29udmVydCB0YWcgdG8gbG93ZXJjYXNlIGZvciBjb25zaXN0ZW5jeSBpbiBmaWx0ZXJpbmdcbiAgICBjb25zdCBjb25zaXN0ZW50VGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gVVJMU2VhcmNoUGFyYW1zIGhhbmRsZXMgbmVjZXNzYXJ5IGVuY29kaW5nIGZvciBxdWVyeSBwYXJhbWV0ZXIgdmFsdWVzXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7IHRhZzogY29uc2lzdGVudFRhZyB9KTtcbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBvbiB0aGUgcHJvZHVjdGlvbiBzaXRlIGJ5IGxvb2tpbmcgYXQgdGhlIGhvc3RuYW1lXG4gICAgY29uc3QgaXNQcm9kdWN0aW9uID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbm9lbHVnd29rZS5jb20nO1xuICAgIGNvbnN0IGJhc2VQYXRoID0gaXNQcm9kdWN0aW9uID8gJy9ibG9nLycgOiAnLyc7XG4gICAgcmV0dXJuIGAke2Jhc2VQYXRofT8ke3BhcmFtcy50b1N0cmluZygpfWA7XG59XG4vKlxuLy8gT3JpZ2luYWwgZnVuY3Rpb24gLSBrZXB0IGZvciByZWZlcmVuY2Ugb3IgaWYgbmVlZGVkIGZvciBkaWZmZXJlbnQgVVJMIHR5cGVzXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtVGFnVG9VcmxGb3JtYXQodGFnOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0YWcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICctJyk7XG59XG4qL1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2VudHJpZXMvY2xpZW50LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9