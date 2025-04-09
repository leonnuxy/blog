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
 * Generates a root-relative URL path for filtering by tag on the main blog page.
 * Creates a URL like "/?tag=your-tag-name".
 *
 * @param tag - The tag string to filter by.
 * @returns The root-relative URL path with the tag query parameter.
 */
function generateTagFilterUrl(tag) {
    // Optional: Convert tag to lowercase for consistency in filtering
    const consistentTag = tag.toLowerCase();
    // URLSearchParams handles necessary encoding for query parameter values
    const params = new URLSearchParams({ tag: consistentTag });
    // Return a root-relative path. This works locally (resolves to http://localhost:3000/?tag=...)
    // and deployed under /blog/ (resolves to https://noelugwoke.com/blog/?tag=...)
    return `/?${params.toString()}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDaElhO0FBQ2I7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsb0JBQW9CO0FBQzdEO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDekJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvYWJvdXQudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2Jsb2dDYXJkcy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvY29tbWVudHMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2NvbnRhY3QudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2RhcmtNb2RlLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL25hdmlnYXRpb24udHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL3BhZ2luYXRpb24udHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL3NlYXJjaC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL2Jsb2dGcm9udGVuZENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9lbnRyaWVzL2NsaWVudC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL21vZHVsZXMvcG9zdERldGFpbC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3NlcnZpY2VzL2FwaS50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3V0aWxzL3VybFRyYW5zZm9ybWVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gQWJvdXQgcG9wdXAgZnVuY3Rpb25hbGl0eVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQWJvdXQgPSBpbml0aWFsaXplQWJvdXQ7XG4vKipcbiAqIEluaXRpYWxpemUgdGhlIEFib3V0IHNlY3Rpb24gcG9wdXBcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUFib3V0KCkge1xuICAgIGNvbnN0IGFib3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWJ0bicpO1xuICAgIGNvbnN0IGFib3V0UG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtcG9wdXAnKTtcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0LXBvcHVwIC5jbG9zZS1wb3B1cCcpO1xuICAgIGlmICghYWJvdXRCdG4gfHwgIWFib3V0UG9wdXAgfHwgIWNsb3NlUG9wdXApIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdBYm91dCBwb3B1cCBlbGVtZW50cyBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIE9wZW4gcG9wdXAgd2hlbiBhYm91dCBidXR0b24gaXMgY2xpY2tlZFxuICAgIGFib3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgYW5jaG9yIGJlaGF2aW9yXG4gICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7IC8vIFByZXZlbnQgc2Nyb2xsaW5nIHdoaWxlIHBvcHVwIGlzIG9wZW5cbiAgICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBhYm91dCBsaW5rXG4gICAgICAgIGFib3V0QnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICAgIC8vIENsb3NlIHBvcHVwIHdoZW4gY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBjbG9zZVBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwb3B1cCBjb250ZW50XG4gICAgYWJvdXRQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gYWJvdXRQb3B1cCkge1xuICAgICAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugb24gZXNjYXBlIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIGFib3V0UG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcbiAgICAgICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IHRoZSBkZWZhdWx0IGFjdGl2ZSBsaW5rIHN0YXRlXG4gKi9cbmZ1bmN0aW9uIHNldERlZmF1bHRBY3RpdmVMaW5rKCkge1xuICAgIC8vIEdldCBjdXJyZW50IGhhc2ggb3IgZGVmYXVsdCB0byBob21lXG4gICAgY29uc3QgY3VycmVudEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgbmF2IGxpbmtzXG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IGhhc2ggbGlua1xuICAgIGNvbnN0IGN1cnJlbnRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaGVhZGVyIG5hdiB1bCBsaSBhW2hyZWY9XCIke2N1cnJlbnRIYXNofVwiXWApO1xuICAgIGlmIChjdXJyZW50TGluaykge1xuICAgICAgICBjdXJyZW50TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlQmxvZ0NhcmRFbGVtZW50ID0gY3JlYXRlQmxvZ0NhcmRFbGVtZW50O1xuY29uc3QgdXJsVHJhbnNmb3JtZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlscy91cmxUcmFuc2Zvcm1lclwiKTsgLy8gSW1wb3J0IHRoZSBVUkwgZ2VuZXJhdG9yXG4vKipcbiAqIENyZWF0ZXMgYSBET00gZWxlbWVudCBmb3IgYSBibG9nIGNhcmQgZnJvbSBwb3N0IGRhdGEgKGRpc3BsYXkgb25seSBmb3IgYWN0aW9ucylcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmxvZ0NhcmRFbGVtZW50KHBvc3QpIHtcbiAgICBjb25zdCBibG9nQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJsb2dDYXJkLmNsYXNzTmFtZSA9ICdibG9nLWNhcmQnO1xuICAgIGJsb2dDYXJkLmRhdGFzZXQucG9zdElkID0gU3RyaW5nKHBvc3QuaWQpO1xuICAgIGJsb2dDYXJkLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICBjb25zdCBjb21tZW50Q291bnQgPSBwb3N0LmNvbW1lbnRzID8gcG9zdC5jb21tZW50cy5sZW5ndGggOiAwO1xuICAgIGNvbnN0IGNyZWF0ZWREYXRlID0gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBjcmVhdGVkRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnXG4gICAgfSk7XG4gICAgLy8gLS0tIER5bmFtaWMgVVJMIGFuZCBUZXh0IEdlbmVyYXRpb24gZm9yIFNoYXJpbmcgLS0tXG4gICAgY29uc3QgcG9zdFVybCA9IGBwb3N0Lmh0bWw/aWQ9JHtTdHJpbmcocG9zdC5pZCl9YDtcbiAgICBjb25zdCBlbmNvZGVkVXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHBvc3RVcmwpO1xuICAgIGNvbnN0IHNoYXJlVGV4dCA9IGBDaGVjayBvdXQgdGhpcyBhcnRpY2xlOiAke3Bvc3QudGl0bGV9YDtcbiAgICBjb25zdCBlbmNvZGVkU2hhcmVUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHNoYXJlVGV4dCk7XG4gICAgLy8gLS0tIEVuZCBEeW5hbWljIFVSTCBHZW5lcmF0aW9uIC0tLVxuICAgIC8vIEdlbmVyYXRlIEhUTUwgZm9yIHRhZyBiYWRnZXMvbGlua3MgdXNpbmcgdGhlIHV0aWxpdHkgZnVuY3Rpb25cbiAgICBsZXQgdGFnc0hUTUwgPSAnJztcbiAgICBpZiAocG9zdC50YWdzICYmIHBvc3QudGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRhZ3NIVE1MID0gJzxkaXYgY2xhc3M9XCJwb3N0LXRhZ3NcIj4nICtcbiAgICAgICAgICAgIHBvc3QudGFncy5tYXAodGFnID0+IFxuICAgICAgICAgICAgLy8gVXNlIGdlbmVyYXRlVGFnRmlsdGVyVXJsIGZvciBocmVmIGluIGFuIDxhPiB0YWdcbiAgICAgICAgICAgIGA8YSBocmVmPVwiJHsoMCwgdXJsVHJhbnNmb3JtZXJfMS5nZW5lcmF0ZVRhZ0ZpbHRlclVybCkodGFnKX1cIiBjbGFzcz1cInRhZy1iYWRnZVwiPiR7dGFnfTwvYT5gKS5qb2luKCcnKSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICB9XG4gICAgY29uc3QgZmFsbGJhY2tJbWFnZVVybCA9ICdpbWFnZXMvYmxvZ19pbWFnZV8zLmpwZWcnOyAvLyBSZWxhdGl2ZSBwYXRoXG4gICAgLy8gQ3JlYXRlIEhUTUwgZm9yIGJsb2cgY2FyZFxuICAgIGJsb2dDYXJkLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGltZyBzcmM9XCIke3Bvc3QuaW1hZ2VVcmwgfHwgZmFsbGJhY2tJbWFnZVVybH1cIiBhbHQ9XCIke3Bvc3QudGl0bGV9XCI+IFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmxvZy1jYXJkLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiYmxvZy1jYXJkLWRhdGUtYXV0aG9yXCI+JHtkYXRlU3RyfTwvcD5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cImJsb2ctY2FyZC10aXRsZVwiPiR7cG9zdC50aXRsZX08L2gzPlxuICAgICAgICAgICAgJHt0YWdzSFRNTH1cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLXNoYXJpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiB0d2l0dGVyXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIFR3aXR0ZXJcIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIiBkYXRhLXRleHQ9XCIke2VuY29kZWRTaGFyZVRleHR9XCI+PGkgY2xhc3M9XCJmYWIgZmEtdHdpdHRlclwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBmYWNlYm9va1wiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBGYWNlYm9va1wiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiPjxpIGNsYXNzPVwiZmFiIGZhLWZhY2Vib29rLWZcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gbGlua2VkaW5cIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gTGlua2VkSW5cIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIj48aSBjbGFzcz1cImZhYiBmYS1saW5rZWRpbi1pblwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIC8vIFNldHVwIHNvY2lhbCBzaGFyaW5nIGxpc3RlbmVycyAoYXMgYmVmb3JlKVxuICAgIGNvbnN0IHNvY2lhbFNoYXJpbmdEaXYgPSBibG9nQ2FyZC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsLXNoYXJpbmcnKTtcbiAgICBpZiAoc29jaWFsU2hhcmluZ0Rpdikge1xuICAgICAgICBzb2NpYWxTaGFyaW5nRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyAuLi4gZXhpc3Rpbmcgc29jaWFsIHNoYXJpbmcgY2xpY2sgbG9naWMgLi4uXG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNoYXJlLWJ1dHRvbicpO1xuICAgICAgICAgICAgaWYgKCFidXR0b24pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBiYXNlUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zdWJzdHJpbmcoMCwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aXZlVXJsID0gYnV0dG9uLmRhdGFzZXQudXJsID8gZGVjb2RlVVJJQ29tcG9uZW50KGJ1dHRvbi5kYXRhc2V0LnVybCkgOiBgcG9zdC5odG1sP2lkPSR7cG9zdC5pZH1gO1xuICAgICAgICAgICAgY29uc3QgZnVsbFVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHtiYXNlUGF0aH0ke3JlbGF0aXZlVXJsfWA7XG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkRnVsbFVybCA9IGVuY29kZVVSSUNvbXBvbmVudChmdWxsVXJsKTtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBidXR0b24uZGF0YXNldC50ZXh0ID8gZGVjb2RlVVJJQ29tcG9uZW50KGJ1dHRvbi5kYXRhc2V0LnRleHQpIDogZG9jdW1lbnQudGl0bGU7XG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KTtcbiAgICAgICAgICAgIGxldCBzaGFyZVdpbmRvd1VybCA9ICcnO1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3R3aXR0ZXInKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtlbmNvZGVkVGV4dH0mdXJsPSR7ZW5jb2RlZEZ1bGxVcmx9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ3R3aXR0ZXItc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD0yMzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhY2Vib29rJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2VuY29kZWRGdWxsVXJsfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdmYWNlYm9vay1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnbGlua2VkaW4nKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyaW5nL3NoYXJlLW9mZnNpdGUvP3VybD0ke2VuY29kZWRGdWxsVXJsfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdsaW5rZWRpbi1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gUkVNT1ZFRDogU2VwYXJhdGUgZXZlbnQgbGlzdGVuZXIgbG9vcCBmb3IgdGFnIGJhZGdlcyAobm93IGhhbmRsZWQgYnkgc3RhbmRhcmQgPGE+IHRhZ3MpXG4gICAgcmV0dXJuIGJsb2dDYXJkO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50cyA9IGluaXRpYWxpemVDb21tZW50cztcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSA9IGluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHk7XG4vKipcbiAqIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgYmxvZyBwb3N0c1xuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29tbWVudHMoKSB7XG4gICAgc2V0dXBDb21tZW50VG9nZ2xlcygpO1xuICAgIHNldHVwQ29tbWVudEZvcm1zKCk7XG59XG4vKipcbiAqIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgYSBzcGVjaWZpYyBibG9nIHBvc3QgZWxlbWVudFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5KHBvc3RFbGVtZW50KSB7XG4gICAgY29uc3QgdG9nZ2xlID0gcG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLXRvZ2dsZScpO1xuICAgIGNvbnN0IGZvcm0gPSBwb3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1mb3JtJyk7XG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgICBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKTtcbiAgICB9XG4gICAgaWYgKGZvcm0pIHtcbiAgICAgICAgc2V0dXBDb21tZW50Rm9ybShmb3JtKTtcbiAgICB9XG59XG4vKipcbiAqIFNldCB1cCBjb21tZW50IHRvZ2dsZSBidXR0b25zXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudFRvZ2dsZXMoKSB7XG4gICAgY29uc3QgY29tbWVudFRvZ2dsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudHMtdG9nZ2xlJyk7XG4gICAgY29tbWVudFRvZ2dsZXMuZm9yRWFjaCh0b2dnbGUgPT4ge1xuICAgICAgICBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGEgc2luZ2xlIGNvbW1lbnQgdG9nZ2xlIGJ1dHRvblxuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKSB7XG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSB0b2dnbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAgICAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvbW1lbnRzLSR7cG9zdElkfWApO1xuICAgICAgICBpZiAoY29tbWVudHNTZWN0aW9uKSB7XG4gICAgICAgICAgICBjb21tZW50c1NlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgYnV0dG9uIHRleHQgYmFzZWQgb24gc3RhdGVcbiAgICAgICAgICAgIGlmIChjb21tZW50c1NlY3Rpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+IEhpZGUgQ29tbWVudHMgPHNwYW4gY2xhc3M9XCJjb21tZW50cy1jb3VudFwiPiR7KF9hID0gdG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb3VudCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGV4dENvbnRlbnR9PC9zcGFuPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLWNvbW1lbnRcIj48L2k+IENvbW1lbnRzIDxzcGFuIGNsYXNzPVwiY29tbWVudHMtY291bnRcIj4keyhfYiA9IHRvZ2dsZS5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY291bnQnKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRleHRDb250ZW50fTwvc3Bhbj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBjb21tZW50IGZvcm1zXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudEZvcm1zKCkge1xuICAgIGNvbnN0IGNvbW1lbnRGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LWZvcm0nKTtcbiAgICBjb21tZW50Rm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgICAgc2V0dXBDb21tZW50Rm9ybShmb3JtKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGEgc2luZ2xlIGNvbW1lbnQgZm9ybVxuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRGb3JtKGZvcm0pIHtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcG9zdElkID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zdC1pZCcpO1xuICAgICAgICBjb25zdCBjb21tZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb21tZW50cy0ke3Bvc3RJZH0gLmNvbW1lbnRzLWxpc3RgKTtcbiAgICAgICAgaWYgKCFjb21tZW50c0NvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBjb25zdCBjb21tZW50SW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhW25hbWU9XCJjb21tZW50XCJdJyk7XG4gICAgICAgIC8vIENoZWNrIGlmIGlucHV0cyBhcmUgbm90IGVtcHR5XG4gICAgICAgIGlmIChuYW1lSW5wdXQudmFsdWUudHJpbSgpID09PSAnJyB8fCBjb21tZW50SW5wdXQudmFsdWUudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFkZE5ld0NvbW1lbnQocG9zdElkLCBjb21tZW50c0NvbnRhaW5lciwgbmFtZUlucHV0LnZhbHVlLCBjb21tZW50SW5wdXQudmFsdWUpO1xuICAgICAgICAvLyBSZXNldCBmb3JtXG4gICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQWRkIGEgbmV3IGNvbW1lbnQgdG8gdGhlIGNvbW1lbnRzIGxpc3RcbiAqL1xuZnVuY3Rpb24gYWRkTmV3Q29tbWVudChwb3N0SWQsIGNvbW1lbnRzQ29udGFpbmVyLCBuYW1lLCBjb21tZW50VGV4dCkge1xuICAgIC8vIENyZWF0ZSBuZXcgY29tbWVudFxuICAgIGNvbnN0IG5ld0NvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXdDb21tZW50LmNsYXNzTmFtZSA9ICdjb21tZW50JztcbiAgICAvLyBHZXQgY3VycmVudCBkYXRlXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBkYXRlU3RyID0gbm93LnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgZGF5OiAnbnVtZXJpYydcbiAgICB9KTtcbiAgICAvLyBDb21tZW50IEhUTUwgc3RydWN0dXJlXG4gICAgbmV3Q29tbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWF2YXRhclwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlci1jaXJjbGVcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1jb250ZW50XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtYXV0aG9yXCI+JHtuYW1lfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC10ZXh0XCI+JHtjb21tZW50VGV4dH08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtZGF0ZVwiPiR7ZGF0ZVN0cn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgLy8gUmVtb3ZlIFwibm8gY29tbWVudHMgeWV0XCIgbWVzc2FnZSBpZiBpdCBleGlzdHNcbiAgICBjb25zdCBub0NvbW1lbnRzID0gY29tbWVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcignLm5vLWNvbW1lbnRzJyk7XG4gICAgaWYgKG5vQ29tbWVudHMpIHtcbiAgICAgICAgY29tbWVudHNDb250YWluZXIucmVtb3ZlQ2hpbGQobm9Db21tZW50cyk7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgbmV3IGNvbW1lbnQgdG8gdGhlIHRvcCBvZiB0aGUgbGlzdFxuICAgIGNvbW1lbnRzQ29udGFpbmVyLmluc2VydEJlZm9yZShuZXdDb21tZW50LCBjb21tZW50c0NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICAvLyBVcGRhdGUgY29tbWVudCBjb3VudFxuICAgIHVwZGF0ZUNvbW1lbnRDb3VudChwb3N0SWQpO1xufVxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvbW1lbnQgY291bnQgZm9yIGEgcG9zdFxuICovXG5mdW5jdGlvbiB1cGRhdGVDb21tZW50Q291bnQocG9zdElkKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IGNvdW50U3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGJ1dHRvbltkYXRhLXBvc3QtaWQ9XCIke3Bvc3RJZH1cIl0gLmNvbW1lbnRzLWNvdW50YCk7XG4gICAgaWYgKGNvdW50U3Bhbikge1xuICAgICAgICBsZXQgY291bnQgPSBwYXJzZUludCgoKF9hID0gY291bnRTcGFuLnRleHRDb250ZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVwbGFjZSgvWygpXS9nLCAnJykpIHx8ICcwJykgKyAxO1xuICAgICAgICBjb3VudFNwYW4udGV4dENvbnRlbnQgPSBgKCR7Y291bnR9KWA7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvY29tcG9uZW50cy9jb250YWN0LnRzIChFeGFtcGxlKVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQ29udGFjdEZvcm0gPSBpbml0aWFsaXplQ29udGFjdEZvcm07XG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBjb250YWN0IGZvcm0gcG9wdXAgZnVuY3Rpb25hbGl0eS5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbnRhY3RGb3JtKCkge1xuICAgIGNvbnN0IGNvbnRhY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1idG4nKTtcbiAgICBjb25zdCBjb250YWN0UG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1wb3B1cCcpO1xuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gY29udGFjdFBvcHVwID09PSBudWxsIHx8IGNvbnRhY3RQb3B1cCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFjdFBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1wb3B1cCcpO1xuICAgIGNvbnN0IGNvbnRhY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtZm9ybScpO1xuICAgIGlmICghY29udGFjdEJ1dHRvbiB8fCAhY29udGFjdFBvcHVwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ29udGFjdCBidXR0b24gb3IgcG9wdXAgZWxlbWVudCBub3QgZm91bmQuIENhbm5vdCBpbml0aWFsaXplIGNvbnRhY3QgZm9ybS4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyAtLS0gT3BlbiBQb3B1cCAtLS1cbiAgICBjb250YWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIDwtLSBDUlVDSUFMOiBQcmV2ZW50IGRlZmF1bHQgbGluayBuYXZpZ2F0aW9uXG4gICAgICAgIGNvbnNvbGUubG9nKCdDb250YWN0IGJ1dHRvbiBjbGlja2VkLCBvcGVuaW5nIHBvcHVwLicpO1xuICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpOyAvLyBDaGFuZ2VkIGZyb20gJ3Zpc2libGUnIHRvICdvcGVuJ1xuICAgIH0pO1xuICAgIC8vIC0tLSBDbG9zZSBQb3B1cCAtLS1cbiAgICBpZiAoY2xvc2VCdXR0b24pIHtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpOyAvLyBDaGFuZ2VkIGZyb20gJ3Zpc2libGUnIHRvICdvcGVuJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gQ2xvc2UgcG9wdXAgaWYgY2xpY2tpbmcgb3V0c2lkZSB0aGUgY29udGVudCBhcmVhXG4gICAgY29udGFjdFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IGNvbnRhY3RQb3B1cCkge1xuICAgICAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTsgLy8gQ2hhbmdlZCBmcm9tICd2aXNpYmxlJyB0byAnb3BlbidcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIC0tLSBGb3JtIFN1Ym1pc3Npb24gLS0tXG4gICAgaWYgKGNvbnRhY3RGb3JtKSB7XG4gICAgICAgIGNvbnRhY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGZvcm0gc3VibWlzc2lvblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbnRhY3QgZm9ybSBzdWJtaXR0ZWQgKHBsYWNlaG9sZGVyKS4nKTtcbiAgICAgICAgICAgIC8vIEFkZCB5b3VyIGZvcm0gc3VibWlzc2lvbiBsb2dpYyBoZXJlIChlLmcuLCB1c2luZyBmZXRjaCB0byBzZW5kIGRhdGEpXG4gICAgICAgICAgICAvLyBPcHRpb25hbGx5IGNsb3NlIHBvcHVwIGFmdGVyIHN1Ym1pc3Npb25cbiAgICAgICAgICAgIC8vIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7IFxuICAgICAgICAgICAgYWxlcnQoJ0NvbnRhY3QgZm9ybSBzdWJtaXNzaW9uIG5vdCBpbXBsZW1lbnRlZCB5ZXQuJyk7IC8vIFBsYWNlaG9sZGVyIGZlZWRiYWNrXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnQ29udGFjdCBmb3JtIGluaXRpYWxpemVkLicpO1xufVxuLy8gRW5zdXJlIHlvdXIgQ1NTIGhhbmRsZXMgdGhlIC5vcGVuIGNsYXNzIGZvciB0aGUgI2NvbnRhY3QtcG9wdXBcbi8vIGUuZy4sXG4vLyAucG9wdXAgeyBkaXNwbGF5OiBub25lOyAvKiBIaWRkZW4gYnkgZGVmYXVsdCAqLyB9XG4vLyAucG9wdXAub3BlbiB7IGRpc3BsYXk6IGJsb2NrOyAvKiBPciBmbGV4LCBncmlkLCBldGMuICovIH1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gRGFyayBtb2RlIGZ1bmN0aW9uYWxpdHlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZURhcmtNb2RlID0gaW5pdGlhbGl6ZURhcmtNb2RlO1xuZXhwb3J0cy5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSA9IGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlO1xuLyoqXG4gKiBJbml0aWFsaXplIGRhcmsgbW9kZSB0b2dnbGVcbiAqIFRoaXMgY3JlYXRlcyBhIGZsb2F0aW5nIGRhcmsgbW9kZSB0b2dnbGUgYnV0dG9uIGFuZCBhZGRzIGl0IHRvIHRoZSBET01cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZURhcmtNb2RlKCkge1xuICAgIC8vIENyZWF0ZSBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvblxuICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZGFya01vZGVUb2dnbGUuY2xhc3NOYW1lID0gJ2RhcmstbW9kZS10b2dnbGUnO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvblxuICAgIGRhcmtNb2RlVG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdUb2dnbGUgRGFyayBNb2RlJyk7XG4gICAgLy8gQ2hlY2sgaWYgZGFyayBtb2RlIHByZWZlcmVuY2UgaXMgYWxyZWFkeSBzZXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGNvbnN0IGlzRGFya01vZGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gJ3RydWUnO1xuICAgIGlmIChpc0RhcmtNb2RlKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICB9XG4gICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgZGFya01vZGVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVEYXJrTW9kZSk7XG4gICAgLy8gQWRkIGJ1dHRvbiB0byB0aGUgRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkYXJrTW9kZVRvZ2dsZSk7XG59XG4vKipcbiAqIFRvZ2dsZSBkYXJrIG1vZGUgb24gYW5kIG9mZlxuICovXG5mdW5jdGlvbiB0b2dnbGVEYXJrTW9kZSgpIHtcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrLW1vZGUnKTtcbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgLy8gVXBkYXRlIGljb24gYmFzZWQgb24gbW9kZVxuICAgIGlmIChkYXJrTW9kZVRvZ2dsZSkge1xuICAgICAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvbiBmb3IgbGlnaHQgbW9kZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLW1vb25cIj48L2k+JzsgLy8gTW9vbiBpY29uIGZvciBkYXJrIG1vZGVcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTYXZlIHByZWZlcmVuY2UgdG8gbG9jYWwgc3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsIGlzRGFya01vZGUudG9TdHJpbmcoKSk7XG59XG4vKipcbiAqIENoZWNrIGlmIHVzZXIgaGFzIHN5c3RlbSBkYXJrIG1vZGUgcHJlZmVyZW5jZVxuICogSWYgdGhleSBkbyBhbmQgd2UgaGF2ZW4ndCBzZXQgYSBwcmVmZXJlbmNlIHlldCwgYXBwbHkgZGFyayBtb2RlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKCkge1xuICAgIC8vIE9ubHkgY2hlY2sgaWYgdXNlciBoYXNuJ3QgZXhwbGljaXRseSBzZXQgYSBwcmVmZXJlbmNlXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrTW9kZScpID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHByZWZlcnNEYXJrTW9kZSA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICAgICAgaWYgKHByZWZlcnNEYXJrTW9kZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLW1vZGUnKTtcbiAgICAgICAgICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstbW9kZS10b2dnbGUnKTtcbiAgICAgICAgICAgIGlmIChkYXJrTW9kZVRvZ2dsZSkge1xuICAgICAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9jb21wb25lbnRzL2hlYWRlci50c1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZW5kZXJIZWFkZXIgPSByZW5kZXJIZWFkZXI7XG4vKipcbiAqIEhlYWRlciBDb21wb25lbnRcbiAqIFJlbmRlcnMgdGhlIGhlYWRlciBIVE1MIHN0cnVjdHVyZSBpbnRvIGEgdGFyZ2V0IGNvbnRhaW5lci5cbiAqIEV2ZW50IGxpc3RlbmVycyBzaG91bGQgYmUgYXR0YWNoZWQgc2VwYXJhdGVseSBhZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24uXG4gKiBAcGFyYW0gY29udGFpbmVySWQgLSBUaGUgSUQgb2YgdGhlIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBoZWFkZXIgaW50by4gRGVmYXVsdHMgdG8gJ2hlYWRlci1wbGFjZWhvbGRlcicuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckhlYWRlcihjb250YWluZXJJZCA9ICdoZWFkZXItcGxhY2Vob2xkZXInKSB7XG4gICAgLy8gRW5zdXJlIHJ1bm5pbmcgaW4gYSBicm93c2VyIGVudmlyb25tZW50XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBGaW5kIHRoZSBjb250YWluZXIgZWxlbWVudCB3aGVyZSB0aGUgaGVhZGVyIHNob3VsZCBiZSBwbGFjZWRcbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXJJZCk7XG4gICAgaWYgKCFoZWFkZXJDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgSGVhZGVyIGNvbnRhaW5lciB3aXRoIElEICcke2NvbnRhaW5lcklkfScgbm90IGZvdW5kIGluIHRoZSBET00uYCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVmaW5lIHRoZSBoZWFkZXIgSFRNTCBzdHJ1Y3R1cmUgLSBtYXRjaGluZyBpbmRleC5odG1sXG4gICAgaGVhZGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGhlYWRlciBjbGFzcz1cInNpdGUtaGVhZGVyXCI+XG4gICAgICAgICAgICA8aDE+PGEgaHJlZj1cIi9cIj5CbG9nPC9hPjwvaDE+XG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvXCI+SG9tZTwvYT48L2xpPiBcbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvI2Fib3V0XCIgaWQ9XCJhYm91dC1idG5cIj5BYm91dDwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cImh0dHBzOi8vbm9lbHVnd29rZS5jb21cIj5Qb3J0Zm9saW88L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZvciBhcnRpY2xlcy4uLlwiIGNsYXNzPVwic2VhcmNoLWJhclwiPiBcbiAgICAgICAgPC9oZWFkZXI+XG4gICAgYDtcbiAgICAvLyBFdmVudCBsaXN0ZW5lcnMgc2hvdWxkIGJlIGNhbGxlZCAqYWZ0ZXIqIHJlbmRlckhlYWRlciBpcyBleGVjdXRlZC5cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBOYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplTmF2aWdhdGlvbiA9IGluaXRpYWxpemVOYXZpZ2F0aW9uO1xuLyoqXG4gKiBJbml0aWFsaXplIG5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplTmF2aWdhdGlvbigpIHtcbiAgICBzZXRBY3RpdmVOYXZMaW5rKCk7XG4gICAgc2V0dXBOYXZMaW5rcygpO1xufVxuLyoqXG4gKiBTZXQgYWN0aXZlIG5hdmlnYXRpb24gbGluayBiYXNlZCBvbiBjdXJyZW50IFVSTCBvciBwYWdlIHNlY3Rpb25cbiAqL1xuZnVuY3Rpb24gc2V0QWN0aXZlTmF2TGluaygpIHtcbiAgICBjb25zdCBjdXJyZW50UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8ICcjaG9tZSc7XG4gICAgdXBkYXRlQWN0aXZlTmF2TGluayhjdXJyZW50UGF0aCk7XG59XG4vKipcbiAqIFNldHVwIGNsaWNrIGhhbmRsZXJzIGZvciBuYXZpZ2F0aW9uIGxpbmtzXG4gKi9cbmZ1bmN0aW9uIHNldHVwTmF2TGlua3MoKSB7XG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICBpZiAoaHJlZikge1xuICAgICAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoaHJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIEhhbmRsZSBzcGVjaWFsIGNhc2VzIGZvciBwb3B1cCBsaW5rc1xuICAgIGNvbnN0IGFib3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWJ0bicpO1xuICAgIGNvbnN0IGNvbnRhY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1idG4nKTtcbiAgICBpZiAoYWJvdXRCdG4pIHtcbiAgICAgICAgYWJvdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKCcjYWJvdXQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChjb250YWN0QnRuKSB7XG4gICAgICAgIGNvbnRhY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKCcjY29udGFjdCcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgYWN0aXZlIG5hdmlnYXRpb24gbGlua1xuICogQHBhcmFtIHBhdGggVGhlIHBhdGggb3Igc2VjdGlvbiBJRCB0byBhY3RpdmF0ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVBY3RpdmVOYXZMaW5rKHBhdGgpIHtcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIGxpbmtzXG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBtYXRjaGluZyBsaW5rXG4gICAgY29uc3QgYWN0aXZlTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlciBuYXYgdWwgbGkgYVtocmVmPVwiJHtwYXRofVwiXWApO1xuICAgIGlmIChhY3RpdmVMaW5rKSB7XG4gICAgICAgIGFjdGl2ZUxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVQYWdpbmF0aW9uID0gaW5pdGlhbGl6ZVBhZ2luYXRpb247XG4vLyBQYWdpbmF0aW9uIGZ1bmN0aW9uYWxpdHlcbmNvbnN0IGNvbW1lbnRzXzEgPSByZXF1aXJlKFwiLi9jb21tZW50c1wiKTtcbi8qKlxuICogSW5pdGlhbGl6ZSBwYWdpbmF0aW9uIGZ1bmN0aW9uYWxpdHkgd2l0aCBMb2FkIE1vcmUgYnV0dG9uXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQYWdpbmF0aW9uKCkge1xuICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICBjb25zdCBoaWRkZW5Qb3N0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkcycpO1xuICAgIGlmICghbG9hZE1vcmVCdG4gfHwgIWhpZGRlblBvc3RzIHx8ICFibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdQYWdpbmF0aW9uIGVsZW1lbnRzIG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGN1cnJlbnRQYWdlID0gMTtcbiAgICBjb25zdCBwb3N0c1BlclBhZ2UgPSAzO1xuICAgIGNvbnN0IHRvdGFsSGlkZGVuUG9zdHMgPSBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgLy8gSGlkZSBsb2FkIG1vcmUgYnV0dG9uIGlmIG5vIGhpZGRlbiBwb3N0c1xuICAgIGlmICh0b3RhbEhpZGRlblBvc3RzID09PSAwKSB7XG4gICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICAgIC8vIFNldCB1cCBsb2FkIG1vcmUgYnV0dG9uIGNsaWNrIGhhbmRsZXJcbiAgICBsb2FkTW9yZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbG9hZE1vcmVQb3N0cyhsb2FkTW9yZUJ0biwgaGlkZGVuUG9zdHMsIGJsb2dDYXJkc0NvbnRhaW5lciwgY3VycmVudFBhZ2UsIHBvc3RzUGVyUGFnZSk7XG4gICAgICAgIGN1cnJlbnRQYWdlKys7XG4gICAgfSk7XG4gICAgLy8gSW5pdGlhbGl6ZSBzY3JvbGwtYmFzZWQgbG9hZGluZyAoaW5maW5pdGUgc2Nyb2xsKVxuICAgIGluaXRpYWxpemVJbmZpbml0ZVNjcm9sbChsb2FkTW9yZUJ0bik7XG59XG4vKipcbiAqIExvYWQgbW9yZSBwb3N0cyB3aGVuIHRoZSBsb2FkIG1vcmUgYnV0dG9uIGlzIGNsaWNrZWRcbiAqL1xuZnVuY3Rpb24gbG9hZE1vcmVQb3N0cyhsb2FkTW9yZUJ0biwgaGlkZGVuUG9zdHMsIGJsb2dDYXJkc0NvbnRhaW5lciwgY3VycmVudFBhZ2UsIHBvc3RzUGVyUGFnZSkge1xuICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKTtcbiAgICBsb2FkTW9yZUJ0bi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzcGlubmVyXCI+PC9zcGFuPiBMb2FkaW5nLi4uJztcbiAgICAvLyBTaW11bGF0ZSBsb2FkaW5nIGRlbGF5IGZvciBiZXR0ZXIgVVhcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHdoaWNoIHBvc3RzIHRvIGxvYWRcbiAgICAgICAgY29uc3Qgc3RhcnRJZHggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHBvc3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgZW5kSWR4ID0gTWF0aC5taW4oc3RhcnRJZHggKyBwb3N0c1BlclBhZ2UsIGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgIGxldCBwb3N0c0xvYWRlZCA9IDA7XG4gICAgICAgIC8vIENsb25lIGFuZCBtb3ZlIHBvc3RzIGZyb20gaGlkZGVuIGNvbnRhaW5lciB0byB2aXNpYmxlIGJsb2cgY2FyZHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3N0c1BlclBhZ2UgJiYgaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoID4gMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwb3N0VG9BZGQgPSBoaWRkZW5Qb3N0cy5jaGlsZHJlblswXTsgLy8gQWx3YXlzIHRha2UgdGhlIGZpcnN0IGVsZW1lbnRcbiAgICAgICAgICAgIGlmIChwb3N0VG9BZGQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZWRQb3N0ID0gcG9zdFRvQWRkLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBjbG9uZWRQb3N0LmNsYXNzTGlzdC5hZGQoJ25ldycpOyAvLyBBZGQgY2xhc3MgZm9yIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZWRQb3N0KTtcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0cy5yZW1vdmVDaGlsZChwb3N0VG9BZGQpO1xuICAgICAgICAgICAgICAgIHBvc3RzTG9hZGVkKys7XG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgbmV3IHBvc3RzXG4gICAgICAgICAgICAgICAgKDAsIGNvbW1lbnRzXzEuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSkoY2xvbmVkUG9zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UndmUgbG9hZGVkIGFsbCBwb3N0c1xuICAgICAgICBpZiAoaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc2V0IGJ1dHRvbiBzdGF0ZVxuICAgICAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gICAgICAgIGxvYWRNb3JlQnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPiBMb2FkIE1vcmUgUG9zdHMnO1xuICAgICAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnQgd2hlbiBwb3N0cyBhcmUgbG9hZGVkXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdwb3N0c0xvYWRlZCcsIHsgZGV0YWlsOiB7IGNvdW50OiBwb3N0c0xvYWRlZCB9IH0pO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9LCA4MDApOyAvLyBTaW11bGF0ZSBuZXR3b3JrIGRlbGF5XG59XG4vKipcbiAqIEluaXRpYWxpemUgaW5maW5pdGUgc2Nyb2xsIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUluZmluaXRlU2Nyb2xsKGxvYWRNb3JlQnRuKSB7XG4gICAgbGV0IHNjcm9sbFRpbWVvdXQ7XG4gICAgbGV0IGlzTG9hZGluZ01vcmVQb3N0cyA9IGZhbHNlO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgIC8vIElmIHRoZSBidXR0b24gaXMgaGlkZGVuIChhbGwgcG9zdHMgbG9hZGVkKSBvciBhbHJlYWR5IGluIGxvYWRpbmcgc3RhdGUsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyB8fFxuICAgICAgICAgICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2FkaW5nJykgfHxcbiAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyVGltZW91dChzY3JvbGxUaW1lb3V0KTtcbiAgICAgICAgc2Nyb2xsVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgc2Nyb2xsVG9wLCBzY3JvbGxIZWlnaHQsIGNsaWVudEhlaWdodCB9ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgLy8gV2hlbiB1c2VyIHNjcm9sbHMgdG8gYm90dG9tICh3aXRoIHNvbWUgYnVmZmVyKVxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCA+PSBzY3JvbGxIZWlnaHQgLSAyMDApIHtcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxvYWRNb3JlQnRuLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgZmxhZyBhZnRlciBhbmltYXRpb24gY29tcGxldGVzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDApO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVNlYXJjaCA9IGluaXRpYWxpemVTZWFyY2g7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCBibG9nQ2FyZHNfMSA9IHJlcXVpcmUoXCIuL2Jsb2dDYXJkc1wiKTtcbmNvbnN0IGNvbW1lbnRzXzEgPSByZXF1aXJlKFwiLi9jb21tZW50c1wiKTtcbi8qKlxuICogSW5pdGlhbGl6ZSBzZWFyY2ggZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplU2VhcmNoKCkge1xuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInNlYXJjaFwiXScpO1xuICAgIGlmICghc2VhcmNoSW5wdXQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdTZWFyY2ggaW5wdXQgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDeWNsZSB0aHJvdWdoIGRpZmZlcmVudCBwbGFjZWhvbGRlciB0ZXh0c1xuICAgIHNldHVwUGxhY2Vob2xkZXJDeWNsaW5nKHNlYXJjaElucHV0KTtcbiAgICAvLyBTZXQgdXAgc2VhcmNoIGlucHV0IGV2ZW50IGhhbmRsZXJcbiAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgICAgIGhhbmRsZVNlYXJjaChlLnRhcmdldCk7XG4gICAgfSk7XG59XG4vKipcbiAqIEN5Y2xlIHRocm91Z2ggZGlmZmVyZW50IHBsYWNlaG9sZGVyIHRleHRzIGZvciB0aGUgc2VhcmNoIGlucHV0XG4gKi9cbmZ1bmN0aW9uIHNldHVwUGxhY2Vob2xkZXJDeWNsaW5nKHNlYXJjaElucHV0KSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXJzID0gW1xuICAgICAgICBcIlNlYXJjaCBmb3IgYXJ0aWNsZXMuLi5cIixcbiAgICAgICAgXCJTZWFyY2ggZm9yIHRvcGljcy4uLlwiLFxuICAgICAgICBcIlNlYXJjaCBmb3IgYXV0aG9ycy4uLlwiXG4gICAgXTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgc2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcnNbaW5kZXhdO1xuICAgICAgICBpbmRleCA9IChpbmRleCArIDEpICUgcGxhY2Vob2xkZXJzLmxlbmd0aDtcbiAgICB9LCAzMDAwKTtcbn1cbi8qKlxuICogSGFuZGxlIHNlYXJjaCBpbnB1dCBhbmQgZmlsdGVyIGJsb2cgcG9zdHNcbiAqL1xuZnVuY3Rpb24gaGFuZGxlU2VhcmNoKHNlYXJjaElucHV0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoc2VhcmNoVGVybS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAvLyBJZiBzZWFyY2ggaXMgY2xlYXJlZCwgcmVsb2FkIGFsbCBwb3N0c1xuICAgICAgICAgICAgaWYgKHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gRGlzcGF0Y2ggZXZlbnQgdG8gcmVsb2FkIHBvc3RzXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JlbG9hZFBvc3RzJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkcycpO1xuICAgICAgICBpZiAoIWJsb2dDYXJkc0NvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+JztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZldGNoIGFsbCBwb3N0cyBhbmQgZmlsdGVyIGNsaWVudC1zaWRlXG4gICAgICAgICAgICAvLyBJbiBhIHJlYWwgYXBwLCB5b3UnZCBpbXBsZW1lbnQgc2VydmVyLXNpZGUgc2VhcmNoXG4gICAgICAgICAgICBjb25zdCBwb3N0cyA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaEJsb2dQb3N0cykoKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkUG9zdHMgPSBmaWx0ZXJQb3N0cyhwb3N0cywgc2VhcmNoVGVybSk7XG4gICAgICAgICAgICAvLyBDbGVhciBjb250YWluZXJcbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGlmIChmaWx0ZXJlZFBvc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIFNob3cgZW1wdHkgc2VhcmNoIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTZWFyY2hSZXN1bHRzKGJsb2dDYXJkc0NvbnRhaW5lciwgc2VhcmNoVGVybSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGlzcGxheSBmaWx0ZXJlZCBwb3N0c1xuICAgICAgICAgICAgZGlzcGxheUZpbHRlcmVkUG9zdHMoZmlsdGVyZWRQb3N0cywgYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlYXJjaGluZyBwb3N0czonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93U2VhcmNoRXJyb3IoYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBGaWx0ZXIgcG9zdHMgYmFzZWQgb24gc2VhcmNoIHRlcm1cbiAqL1xuZnVuY3Rpb24gZmlsdGVyUG9zdHMocG9zdHMsIHNlYXJjaFRlcm0pIHtcbiAgICByZXR1cm4gcG9zdHMuZmlsdGVyKHBvc3QgPT4gcG9zdC50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pIHx8XG4gICAgICAgIHBvc3QuY29udGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pIHx8XG4gICAgICAgIHBvc3QuYXV0aG9yLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkgfHxcbiAgICAgICAgKHBvc3QudGFncyAmJiBwb3N0LnRhZ3Muc29tZSh0YWcgPT4gdGFnLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkpKSk7XG59XG4vKipcbiAqIERpc3BsYXkgZmlsdGVyZWQgcG9zdHMgaW4gdGhlIGJsb2cgY29udGFpbmVyXG4gKi9cbmZ1bmN0aW9uIGRpc3BsYXlGaWx0ZXJlZFBvc3RzKGZpbHRlcmVkUG9zdHMsIGNvbnRhaW5lcikge1xuICAgIGZpbHRlcmVkUG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgZmlsdGVyZWQgcG9zdHNcbiAgICAgICAgKDAsIGNvbW1lbnRzXzEuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSkoYmxvZ0NhcmQpO1xuICAgIH0pO1xuICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudCB3aGVuIHNlYXJjaCByZXN1bHRzIGFyZSBkaXNwbGF5ZWRcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc2VhcmNoUmVzdWx0c0Rpc3BsYXllZCcsIHtcbiAgICAgICAgZGV0YWlsOiB7IGNvdW50OiBmaWx0ZXJlZFBvc3RzLmxlbmd0aCB9XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEaXNwbGF5IGVtcHR5IHNlYXJjaCByZXN1bHRzIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gc2hvd0VtcHR5U2VhcmNoUmVzdWx0cyhjb250YWluZXIsIHNlYXJjaFRlcm0pIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktc2VhcmNoXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zZWFyY2ggZmEtM3hcIj48L2k+XG4gICAgICAgICAgICA8aDM+Tm8gcmVzdWx0cyBmb3VuZDwvaDM+XG4gICAgICAgICAgICA8cD5ObyBwb3N0cyBtYXRjaCB5b3VyIHNlYXJjaCBmb3IgXCIke3NlYXJjaFRlcm19XCI8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4vKipcbiAqIERpc3BsYXkgc2VhcmNoIGVycm9yIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gc2hvd1NlYXJjaEVycm9yKGNvbnRhaW5lcikge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci1zdGF0ZVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZmEtM3hcIj48L2k+XG4gICAgICAgICAgICA8aDM+U2VhcmNoIGZhaWxlZDwvaDM+XG4gICAgICAgICAgICA8cD5GYWlsZWQgdG8gc2VhcmNoIGJsb2cgcG9zdHMuIFBsZWFzZSB0cnkgYWdhaW4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCA9IGluaXRpYWxpemVCbG9nRnJvbnRlbmQ7XG4vKipcbiAqIEJsb2cgRnJvbnRlbmQgQ29udHJvbGxlclxuICogQ2xpZW50LXNpZGUgY29udHJvbGxlciB0aGF0IGhhbmRsZXMgYWxsIGZyb250ZW5kIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBibG9nIGhvbWVwYWdlLlxuICogTWFuYWdlcyBVSSBpbml0aWFsaXphdGlvbiwgcG9zdCByZW5kZXJpbmcsIGFuZCB1c2VyIGludGVyYWN0aW9ucy5cbiAqL1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3QgYmxvZ0NhcmRzXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9ibG9nQ2FyZHNcIik7XG4vLyBBc3N1bWluZyBpbml0aWFsaXplQ29tbWVudHMgaXMgbWVhbnQgZm9yIHRoZSBwb3N0IGRldGFpbCBwYWdlLCBcbi8vIGl0IG1pZ2h0IG5vdCBiZSBuZWVkZWQgaGVyZSB1bmxlc3MgY2FyZHMgaGF2ZSBjb21tZW50IHByZXZpZXdzL2ludGVyYWN0aW9ucy5cbi8vIGltcG9ydCB7IGluaXRpYWxpemVDb21tZW50cyB9IGZyb20gJy4uL2NvbXBvbmVudHMvY29tbWVudHMnOyBcbmNvbnN0IGNvbnRhY3RfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2NvbnRhY3RcIik7IC8vIEhhbmRsZXMgY29udGFjdCBwb3B1cCBsb2dpY1xuY29uc3QgcGFnaW5hdGlvbl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvcGFnaW5hdGlvblwiKTsgLy8gSGFuZGxlcyBsb2FkIG1vcmUgbG9naWNcbmNvbnN0IHNlYXJjaF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvc2VhcmNoXCIpOyAvLyBIYW5kbGVzIHNlYXJjaCBiYXIgbG9naWNcbmNvbnN0IGFib3V0XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9hYm91dFwiKTsgLy8gSGFuZGxlcyBhYm91dCBwb3B1cCBsb2dpY1xuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2aWdhdGlvblwiKTsgLy8gSGFuZGxlcyBuYXYgbGluayBhY3RpdmUgc3RhdGVzXG4vLyBOb3RlOiBEYXJrIG1vZGUgaXMgaW5pdGlhbGl6ZWQgZ2xvYmFsbHkgaW4gY2xpZW50LnRzLCBubyBuZWVkIHRvIGltcG9ydC9jYWxsIGhlcmUgdHlwaWNhbGx5XG4vKipcbiAqIEluaXRpYWxpemUgdGhlIGJsb2cgZnJvbnRlbmQgZnVuY3Rpb25hbGl0eSAoaG9tZXBhZ2UpXG4gKiBTZXRzIHVwIGFsbCBVSSBjb21wb25lbnRzIGFuZCBpbml0aWFsaXplcyB0aGUgYmxvZyBwb3N0cyBkaXNwbGF5LlxuICogQXNzdW1lcyBoZWFkZXIgYW5kIGRhcmsgbW9kZSBhcmUgaW5pdGlhbGl6ZWQgZ2xvYmFsbHkgYmVmb3JlIHRoaXMgcnVucy5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIEJsb2cgRnJvbnRlbmQgQ29udHJvbGxlci4uLicpO1xuICAgICAgICAvLyBJbml0aWFsaXplIG5hdmlnYXRpb24gYWN0aXZlIHN0YXRlc1xuICAgICAgICAoMCwgbmF2aWdhdGlvbl8xLmluaXRpYWxpemVOYXZpZ2F0aW9uKSgpO1xuICAgICAgICAvLyBJbml0aWFsaXplIGludGVyYWN0aXZlIGNvbXBvbmVudHMgc3BlY2lmaWMgdG8gdGhlIG1haW4gcGFnZVxuICAgICAgICAoMCwgY29udGFjdF8xLmluaXRpYWxpemVDb250YWN0Rm9ybSkoKTsgLy8gQXNzdW1lcyAjY29udGFjdC1idG4gYW5kICNjb250YWN0LXBvcHVwIGV4aXN0XG4gICAgICAgICgwLCBhYm91dF8xLmluaXRpYWxpemVBYm91dCkoKTsgLy8gQXNzdW1lcyAjYWJvdXQtYnRuIGFuZCAjYWJvdXQtcG9wdXAgZXhpc3RcbiAgICAgICAgKDAsIHNlYXJjaF8xLmluaXRpYWxpemVTZWFyY2gpKCk7IC8vIEFzc3VtZXMgLnNlYXJjaC1iYXIgZXhpc3RzXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGJsb2cgcG9zdHMgZGlzcGxheVxuICAgICAgICB5aWVsZCBpbml0aWFsaXplUG9zdHMoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBwYWdpbmF0aW9uIGFmdGVyIHBvc3RzIGFyZSBsb2FkZWQgYW5kIGNvbnRhaW5lcnMgZXhpc3RcbiAgICAgICAgKDAsIHBhZ2luYXRpb25fMS5pbml0aWFsaXplUGFnaW5hdGlvbikoKTtcbiAgICAgICAgLy8gSWYgY29tbWVudHMgcHJldmlldy9pbnRlcmFjdGlvbiBuZWVkZWQgb24gY2FyZHMsIGluaXRpYWxpemUgaGVyZVxuICAgICAgICAvLyBpbml0aWFsaXplQ29tbWVudHMoKTsgXG4gICAgICAgIC8vIFNldCB1cCBldmVudCBkZWxlZ2F0aW9uIGZvciBuYXZpZ2F0aW5nIHdoZW4gY2xpY2tpbmcgYmxvZyBjYXJkc1xuICAgICAgICBzZXR1cEJsb2dDYXJkc0RlbGVnYXRpb24oKTtcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGZvciByZWxvYWRpbmcgcG9zdHMgKHVzZWQgYnkgc2VhcmNoKVxuICAgICAgICAvLyBDb25zaWRlciBhZGRpbmcgYW4gb3B0aW9uIHRvIHJlbW92ZSBsaXN0ZW5lciBpZiBjb250cm9sbGVyIGlzIGV2ZXIgXCJkZXN0cm95ZWRcIlxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZWxvYWRQb3N0cycsIGhhbmRsZVJlbG9hZFBvc3RzKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0Jsb2cgRnJvbnRlbmQgQ29udHJvbGxlciBJbml0aWFsaXplZC4nKTtcbiAgICB9KTtcbn1cbi8qKlxuICogSGFuZGxlcyB0aGUgY3VzdG9tICdyZWxvYWRQb3N0cycgZXZlbnQsIHR5cGljYWxseSB0cmlnZ2VyZWQgYnkgc2VhcmNoLlxuICovXG5mdW5jdGlvbiBoYW5kbGVSZWxvYWRQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVsb2FkaW5nIHBvc3RzIGR1ZSB0byByZWxvYWRQb3N0cyBldmVudC4uLicpO1xuICAgICAgICB5aWVsZCBpbml0aWFsaXplUG9zdHMoKTtcbiAgICAgICAgKDAsIHBhZ2luYXRpb25fMS5pbml0aWFsaXplUGFnaW5hdGlvbikoKTtcbiAgICAgICAgLy8gUmUtc2V0dXAgZGVsZWdhdGlvbiBpbiBjYXNlIERPTSBlbGVtZW50cyB3ZXJlIHJlcGxhY2VkXG4gICAgICAgIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgZXZlbnQgZGVsZWdhdGlvbiBmb3IgYmxvZyBjYXJkcyBjb250YWluZXJcbiAqIEhhbmRsZXMgY2xpY2tzIGZvciBuYXZpZ2F0aW9uLCBwcmV2ZW50aW5nIGNsaWNrcyBvbiBpbnRlcmFjdGl2ZSBlbGVtZW50cy5cbiAqL1xuZnVuY3Rpb24gc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCkge1xuICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNhcmRzJyk7XG4gICAgLy8gTm90ZTogRGVsZWdhdGlvbiBvbiBoaWRkZW4tcG9zdHMgbWlnaHQgYmUgdW5uZWNlc3NhcnkgaWYgY2FyZHMgYXJlIG1vdmVkIG9uIGxvYWQgbW9yZVxuICAgIC8vIGNvbnN0IGhpZGRlblBvc3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbi1wb3N0cycpO1xuICAgIGlmIChibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGxpc3RlbmVyIGZpcnN0IHRvIHByZXZlbnQgZHVwbGljYXRlcyBpZiBjYWxsZWQgbXVsdGlwbGUgdGltZXNcbiAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQmxvZ0NhcmRDbGljayk7XG4gICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgICAgICBjb25zb2xlLmxvZygnRXZlbnQgZGVsZWdhdGlvbiBzZXQgdXAgZm9yIC5ibG9nLWNhcmRzJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBmaW5kIC5ibG9nLWNhcmRzIGNvbnRhaW5lciBmb3IgZGVsZWdhdGlvbi4nKTtcbiAgICB9XG4gICAgLy8gaWYgKGhpZGRlblBvc3RzQ29udGFpbmVyKSB7XG4gICAgLy8gICAgIGhpZGRlblBvc3RzQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQmxvZ0NhcmRDbGljayk7XG4gICAgLy8gICAgIGhpZGRlblBvc3RzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQmxvZ0NhcmRDbGljayk7XG4gICAgLy8gfVxufVxuLyoqXG4gKiBIYW5kbGUgY2xpY2sgZXZlbnRzIG9uIGJsb2cgY2FyZHMgdXNpbmcgZXZlbnQgZGVsZWdhdGlvblxuICovXG5mdW5jdGlvbiBoYW5kbGVCbG9nQ2FyZENsaWNrKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IGNhcmQgPSB0YXJnZXQuY2xvc2VzdCgnLmJsb2ctY2FyZCcpOyAvLyBUeXBlIGFzc2VydGlvblxuICAgIGlmIChjYXJkKSB7XG4gICAgICAgIC8vIFByZXZlbnQgbmF2aWdhdGlvbiBpZiB0aGUgY2xpY2sgb3JpZ2luYXRlZCBvbiBhIGJ1dHRvbiwgbGluaywgb3IgaWNvbiB3aXRoaW4gdGhlIGNhcmRcbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCdidXR0b24sIGEsIGknKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrZWQgaW50ZXJhY3RpdmUgZWxlbWVudCBpbnNpZGUgY2FyZCwgcHJldmVudGluZyBuYXZpZ2F0aW9uLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IGNhcmQuZGF0YXNldC5wb3N0SWQ7IC8vIFVzZSBkYXRhc2V0IHByb3BlcnR5XG4gICAgICAgIGlmIChwb3N0SWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBOYXZpZ2F0aW5nIHRvIHBvc3QgJHtwb3N0SWR9YCk7XG4gICAgICAgICAgICAvLyBVc2UgcmVsYXRpdmUgcGF0aCBmb3IgbmF2aWdhdGlvblxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgcG9zdC5odG1sP2lkPSR7cG9zdElkfWA7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEluaXRpYWxpemUgYmxvZyBwb3N0cyBmcm9tIEFQSVxuICogRmV0Y2hlcyBwb3N0cyBmcm9tIHRoZSBBUEkgYW5kIHJlbmRlcnMgdGhlbSBpbiB0aGUgVUlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVBvc3RzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIFVzZSBtb3JlIHNwZWNpZmljIHNlbGVjdG9yIGlmIHBvc3NpYmxlLCBlLmcuLCAjYmxvZ1xuICAgICAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZy5ibG9nLWNhcmRzJyk7XG4gICAgICAgIGlmICghYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdCbG9nIGNhcmRzIGNvbnRhaW5lciAoI2Jsb2cuYmxvZy1jYXJkcykgbm90IGZvdW5kIGluIHRoZSBET00uJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+PHA+TG9hZGluZyBwb3N0cy4uLjwvcD4nO1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yID90YWc9Li4uIHF1ZXJ5IHBhcmFtZXRlclxuICAgICAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgICAgIGNvbnN0IHRhZ0ZpbHRlciA9IHVybFBhcmFtcy5nZXQoJ3RhZycpO1xuICAgICAgICAgICAgLy8gRmV0Y2ggcG9zdHMgdXNpbmcgdGhlIGZ1bmN0aW9uIGZyb20gYXBpLnRzICh3aGljaCBmZXRjaGVzIHN0YXRpYyBqc29uKVxuICAgICAgICAgICAgbGV0IHBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEZldGNoZWQgJHtwb3N0cy5sZW5ndGh9IHBvc3RzLmApO1xuICAgICAgICAgICAgLy8gRmlsdGVyIHBvc3RzIGJ5IHRhZyBpZiB0aGUgcXVlcnkgcGFyYW1ldGVyIGlzIHByZXNlbnRcbiAgICAgICAgICAgIGlmICh0YWdGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBDYXNlLWluc2Vuc2l0aXZlIHRhZyBmaWx0ZXJpbmdcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVkVGFnRmlsdGVyID0gdGFnRmlsdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgcG9zdHMgPSBwb3N0cy5maWx0ZXIocG9zdCA9PiBwb3N0LnRhZ3Muc29tZSh0YWcgPT4gdGFnLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRUYWdGaWx0ZXIpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRmlsdGVyZWQgcG9zdHMgYnkgdGFnICcke3RhZ0ZpbHRlcn0nOiAke3Bvc3RzLmxlbmd0aH0gcG9zdHMuYCk7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGEgZmlsdGVyIGluZGljYXRvciBhYm92ZSB0aGUgcG9zdHNcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXJDb250YWluZXIuY2xhc3NOYW1lID0gJ3RhZy1maWx0ZXItaW5kaWNhdG9yJztcbiAgICAgICAgICAgICAgICBmaWx0ZXJDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxwPlNob3dpbmcgcG9zdHMgdGFnZ2VkIHdpdGg6IDxzcGFuIGNsYXNzPVwiZmlsdGVyZWQtdGFnXCI+JHt0YWdGaWx0ZXJ9PC9zcGFuPjwvcD5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL1wiIGNsYXNzPVwiY2xlYXItZmlsdGVyXCI+Q2xlYXIgZmlsdGVyPC9hPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgZmlsdGVyIGluZGljYXRvciBiZWZvcmUgdGhlIGJsb2cgY2FyZHNcbiAgICAgICAgICAgICAgICBjb25zdCBibG9nQ29udGFpbmVyID0gYmxvZ0NhcmRzQ29udGFpbmVyLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2dDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvZ0NvbnRhaW5lci5pbnNlcnRCZWZvcmUoZmlsdGVyQ29udGFpbmVyLCBibG9nQ2FyZHNDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENsZWFyIGxvYWRpbmcgc3RhdGVcbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGlmIChwb3N0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgZW1wdHkgc3RhdGUgdG8gcmVmbGVjdCBmaWx0ZXJpbmcgaWYgYXBwbGljYWJsZVxuICAgICAgICAgICAgICAgIHNob3dFbXB0eVN0YXRlKGJsb2dDYXJkc0NvbnRhaW5lciwgdGFnRmlsdGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEaXNwbGF5IGluaXRpYWwgcG9zdHMgKGUuZy4sIGZpcnN0IDMgb3IgNilcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxQb3N0Q291bnQgPSA2OyAvLyBPciBhZGp1c3QgYXMgbmVlZGVkXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5UG9zdHMgPSBwb3N0cy5zbGljZSgwLCBpbml0aWFsUG9zdENvdW50KTtcbiAgICAgICAgICAgIGNvbnN0IGhpZGRlblBvc3RzID0gcG9zdHMuc2xpY2UoaW5pdGlhbFBvc3RDb3VudCk7XG4gICAgICAgICAgICAvLyBBZGQgdmlzaWJsZSBwb3N0cyB0byBtYWluIGNvbnRhaW5lclxuICAgICAgICAgICAgZGlzcGxheVBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvZ0NhcmQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBBZGQgcmVtYWluaW5nIHBvc3RzIHRvIGhpZGRlbiBjb250YWluZXIgZm9yIHBhZ2luYXRpb25cbiAgICAgICAgICAgIGNvbnN0IGhpZGRlblBvc3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbi1wb3N0cycpO1xuICAgICAgICAgICAgaWYgKGhpZGRlblBvc3RzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIHByZXZpb3VzIGhpZGRlbiBwb3N0c1xuICAgICAgICAgICAgICAgIGhpZGRlblBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2dDYXJkID0gKDAsIGJsb2dDYXJkc18xLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCkocG9zdCk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlblBvc3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtoaWRkZW5Qb3N0cy5sZW5ndGh9IHBvc3RzIGFkZGVkIHRvIGhpZGRlbiBjb250YWluZXIuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVcGRhdGUgbG9hZCBtb3JlIGJ1dHRvbiB2aXNpYmlsaXR5XG4gICAgICAgICAgICBjb25zdCBsb2FkTW9yZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLW1vcmUtYnRuJyk7XG4gICAgICAgICAgICBpZiAobG9hZE1vcmVCdG4pIHtcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gaGlkZGVuUG9zdHMubGVuZ3RoID4gMCA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgcG9zdHM6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd0Vycm9yU3RhdGUoYmxvZ0NhcmRzQ29udGFpbmVyKTsgLy8gU2hvdyBlcnJvciBzdGF0ZSBpbiB0aGUgY29udGFpbmVyXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogU2hvdyBlbXB0eSBzdGF0ZSB3aGVuIG5vIHBvc3RzIGFyZSBhdmFpbGFibGVcbiAqIEBwYXJhbSBjb250YWluZXIgVGhlIGNvbnRhaW5lciBlbGVtZW50IHRvIHNob3cgdGhlIGVtcHR5IHN0YXRlIGluXG4gKiBAcGFyYW0gdGFnRmlsdGVyIE9wdGlvbmFsIHRhZyBmaWx0ZXIgdGhhdCB3YXMgdXNlZCAodG8gZXhwbGFpbiB3aHkgbm8gcG9zdHMgd2VyZSBmb3VuZClcbiAqL1xuZnVuY3Rpb24gc2hvd0VtcHR5U3RhdGUoY29udGFpbmVyLCB0YWdGaWx0ZXIpIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIGNvbnRhaW5lclxuICAgIGNvbnN0IGVtcHR5U3RhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbXB0eVN0YXRlRGl2LmNsYXNzTmFtZSA9ICdlbXB0eS1zdGF0ZSc7IC8vIEFkZCBjbGFzcyBmb3Igc3R5bGluZ1xuICAgIC8vIEN1c3RvbWl6ZSBtZXNzYWdlIGlmIGZpbHRlcmluZyBieSB0YWdcbiAgICBjb25zdCBtZXNzYWdlID0gdGFnRmlsdGVyXG4gICAgICAgID8gYE5vIHBvc3RzIGZvdW5kIHdpdGggdGhlIHRhZyBcIiR7dGFnRmlsdGVyfVwiLmBcbiAgICAgICAgOiAnTm8gcG9zdHMgZm91bmQuJztcbiAgICBlbXB0eVN0YXRlRGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZmlsZS1hbHQgZmEtM3hcIj48L2k+XG4gICAgICAgIDxoMz4ke21lc3NhZ2V9PC9oMz5cbiAgICAgICAgJHt0YWdGaWx0ZXIgPyAnPHA+PGEgaHJlZj1cIi9cIj5WaWV3IGFsbCBwb3N0czwvYT48L3A+JyA6ICc8cD5DaGVjayBiYWNrIGxhdGVyIGZvciBuZXcgY29udGVudCE8L3A+J31cbiAgICBgO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbXB0eVN0YXRlRGl2KTtcbiAgICBjb25zb2xlLmxvZygnRGlzcGxheWVkIGVtcHR5IHN0YXRlIGZvciBwb3N0cy4nKTtcbn1cbi8qKlxuICogU2hvdyBlcnJvciBzdGF0ZSB3aGVuIHBvc3RzIGNvdWxkbid0IGJlIGxvYWRlZFxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JTdGF0ZShjb250YWluZXIpIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIGNvbnRhaW5lclxuICAgIGNvbnN0IGVycm9yU3RhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlcnJvclN0YXRlRGl2LmNsYXNzTmFtZSA9ICdlcnJvci1zdGF0ZSc7IC8vIEFkZCBjbGFzcyBmb3Igc3R5bGluZ1xuICAgIGVycm9yU3RhdGVEaXYuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBmYS0zeFwiPjwvaT5cbiAgICAgICAgPGgzPlNvbWV0aGluZyB3ZW50IHdyb25nPC9oMz5cbiAgICAgICAgPHA+RmFpbGVkIHRvIGxvYWQgYmxvZyBwb3N0cy4gUGxlYXNlIHRyeSByZWZyZXNoaW5nIHRoZSBwYWdlLjwvcD5cbiAgICBgOyAvLyBFeGFtcGxlIGNvbnRlbnRcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZXJyb3JTdGF0ZURpdik7XG4gICAgY29uc29sZS5sb2coJ0Rpc3BsYXllZCBlcnJvciBzdGF0ZSBmb3IgcG9zdHMuJyk7XG59XG4vLyBSRU1PVkVEOiBMb2NhbCBkZWZpbml0aW9ucyBhbmQgY2FsbHMgZm9yIHNldHVwU2VhcmNoIGFuZCBzZXR1cFBvcHVwQnV0dG9uc1xuLy8gRnVuY3Rpb25hbGl0eSBpcyBub3cgaGFuZGxlZCBieSB0aGUgaW1wb3J0ZWQgaW5pdGlhbGl6ZVNlYXJjaCwgaW5pdGlhbGl6ZUFib3V0LCBpbml0aWFsaXplQ29udGFjdEZvcm1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2VudHJpZXMvY2xpZW50LnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIEltcG9ydHMgcmVtYWluIHRoZSBzYW1lLi4uXG5jb25zdCBibG9nRnJvbnRlbmRDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvYmxvZ0Zyb250ZW5kQ29udHJvbGxlclwiKTtcbmNvbnN0IHBvc3REZXRhaWxfMSA9IHJlcXVpcmUoXCIuLi9tb2R1bGVzL3Bvc3REZXRhaWxcIik7XG5jb25zdCBoZWFkZXJfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2hlYWRlclwiKTtcbmNvbnN0IGRhcmtNb2RlXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXJrTW9kZVwiKTtcbi8qKlxuICogQ2xpZW50LXNpZGUgZW50cnkgcG9pbnQgaW5pdGlhbGl6ZXIuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDbGllbnQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWVudCBpbml0aWFsaXppbmcuLi4nKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tb24gZWxlbWVudHMgZmlyc3RcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKSgpO1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuaW5pdGlhbGl6ZURhcmtNb2RlKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RhcmsgbW9kZSBpbml0aWFsaXplZCBnbG9iYWxseS4nKTtcbiAgICAgICAgICAgIC8vIFJlbmRlciBIZWFkZXIgb25seSBpZiBwbGFjZWhvbGRlciBleGlzdHNcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyLXBsYWNlaG9sZGVyJykpIHtcbiAgICAgICAgICAgICAgICAoMCwgaGVhZGVyXzEucmVuZGVySGVhZGVyKSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWFkZXIgcmVuZGVyZWQgZ2xvYmFsbHkuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0hlYWRlciBwbGFjZWhvbGRlciBub3QgZm91bmQgb24gdGhpcyBwYWdlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBjb21tb24gZWxlbWVudHM6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYWdlLXNwZWNpZmljIGxvZ2ljXG4gICAgICAgIGNvbnN0IHBhZ2VUeXBlID0gZG9jdW1lbnQuYm9keS5kYXRhc2V0LnBhZ2U7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICAvLyBHZXQgdGhlIGJhc2UgbmFtZSBvZiB0aGUgZmlsZS9wYXRoLCByZW1vdmluZyB0cmFpbGluZyBzbGFzaCBpZiBwcmVzZW50XG4gICAgICAgIGNvbnN0IHBhdGhFbmQgPSBjdXJyZW50UGFnZS5lbmRzV2l0aCgnLycpID8gY3VycmVudFBhZ2Uuc2xpY2UoMCwgLTEpLnNwbGl0KCcvJykucG9wKCkgOiBjdXJyZW50UGFnZS5zcGxpdCgnLycpLnBvcCgpO1xuICAgICAgICBjb25zdCBpc1Jvb3RPckluZGV4ID0gY3VycmVudFBhZ2UuZW5kc1dpdGgoJy8nKSB8fCBjdXJyZW50UGFnZS5lbmRzV2l0aCgnL2luZGV4Lmh0bWwnKTsgLy8gQ2hlY2sgaWYgaXQncyB0aGUgcm9vdCBvZiB0aGUgZGVwbG95bWVudFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERldGVjdGVkIHBhZ2VUeXBlOiAke3BhZ2VUeXBlfSwgY3VycmVudFBhZ2U6ICR7Y3VycmVudFBhZ2V9LCBwYXRoRW5kOiAke3BhdGhFbmR9LCBpc1Jvb3RPckluZGV4OiAke2lzUm9vdE9ySW5kZXh9YCk7XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgTWFpbiBQYWdlICh1c2luZyBkYXRhLXBhZ2Ugb3IgcGF0aCBlbmRpbmcgaW4gLyBvciAvaW5kZXguaHRtbClcbiAgICAgICAgICAgIGlmIChwYWdlVHlwZSA9PT0gJ21haW4nIHx8ICghcGFnZVR5cGUgJiYgaXNSb290T3JJbmRleCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIG1haW4gYmxvZyBwYWdlIGxvZ2ljLi4uJyk7XG4gICAgICAgICAgICAgICAgeWllbGQgKDAsIGJsb2dGcm9udGVuZENvbnRyb2xsZXJfMS5pbml0aWFsaXplQmxvZ0Zyb250ZW5kKSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNYWluIGJsb2cgcGFnZSBsb2dpYyBpbml0aWFsaXplZC4nKTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgUG9zdCBEZXRhaWwgUGFnZSAodXNpbmcgZGF0YS1wYWdlIG9yIHBhdGggZW5kaW5nIGluIC9wb3N0Lmh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ3Bvc3QnIHx8ICghcGFnZVR5cGUgJiYgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9wb3N0Lmh0bWwnKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIHBvc3QgZGV0YWlsIHBhZ2UgbG9naWMgKGZyb20gbW9kdWxlKS4uLicpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBwb3N0RGV0YWlsXzEuaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMpKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGV0YWlsIHBhZ2UgbG9naWMgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIEFkbWluIFBhZ2UgKHVzaW5nIGRhdGEtcGFnZSBvciBwYXRoIGVuZGluZyBpbiAvYWRtaW4uaHRtbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhZ2VUeXBlID09PSAnYWRtaW4nIHx8ICghcGFnZVR5cGUgJiYgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9hZG1pbi5odG1sJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FkbWluIHBhZ2UgZGV0ZWN0ZWQgYnkgY2xpZW50LnRzIC0gbm8gYWN0aW9uIHRha2VuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVua25vd24gcGFnZSB0eXBlICgnJHtwYWdlVHlwZX0nKSBvciBwYXRoICgnJHtjdXJyZW50UGFnZX0nKS4gTm8gc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbmVlZGVkIGZyb20gY2xpZW50LnRzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHBhZ2Utc3BlY2lmaWMgY2xpZW50IGluaXRpYWxpemF0aW9uOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gRE9NQ29udGVudExvYWRlZCBsaXN0ZW5lciByZW1haW5zIHRoZSBzYW1lLi4uXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRpYWxpemVDbGllbnQpO1xufVxuZWxzZSB7XG4gICAgaW5pdGlhbGl6ZUNsaWVudCgpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvbW9kdWxlcy9wb3N0RGV0YWlsLnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMgPSBpbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYztcbmV4cG9ydHMubG9hZFBvc3RDb250ZW50ID0gbG9hZFBvc3RDb250ZW50O1xuZXhwb3J0cy51cGRhdGVQb3N0VUkgPSB1cGRhdGVQb3N0VUk7XG5leHBvcnRzLnVwZGF0ZVBhZ2VNZXRhZGF0YSA9IHVwZGF0ZVBhZ2VNZXRhZGF0YTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcgPSBpbml0aWFsaXplU29jaWFsU2hhcmluZztcbmV4cG9ydHMuc2hvd0Vycm9yTWVzc2FnZSA9IHNob3dFcnJvck1lc3NhZ2U7XG4vLyAtLS0gSW1wb3J0cyAtLS1cbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTtcbmNvbnN0IHVybFRyYW5zZm9ybWVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdXJsVHJhbnNmb3JtZXJcIik7XG5jb25zdCBoZWFkZXJfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2hlYWRlclwiKTtcbmNvbnN0IGRhcmtNb2RlXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXJrTW9kZVwiKTtcbi8vIC0tLSBDb3JlIEluaXRpYWxpemF0aW9uIEZ1bmN0aW9uIC0tLVxuLyoqXG4gKiBJbml0aWFsaXplcyBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHBvc3QgZGV0YWlsIHBhZ2UuXG4gKiBUaGlzIGlzIHRoZSBtYWluIGV4cG9ydGVkIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCBieSB0aGUgZW50cnkgcG9pbnQuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgcG9zdCBkZXRhaWwgcGFnZS4uLicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UpKCk7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGFyayBtb2RlIGluaXRpYWxpemVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgaGVhZGVyXzEucmVuZGVySGVhZGVyKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0hlYWRlciByZW5kZXJlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSB1cmxQYXJhbXMuZ2V0KCdpZCcpO1xuICAgICAgICBpZiAocG9zdElkKSB7XG4gICAgICAgICAgICB5aWVsZCBsb2FkUG9zdENvbnRlbnQocG9zdElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHBvc3QgSUQgcHJvdmlkZWQgaW4gdGhlIFVSTCcpO1xuICAgICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZSgnTm8gcG9zdCBzcGVjaWZpZWQuIFBsZWFzZSBjaGVjayB0aGUgVVJMLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRldGFpbCBwYWdlIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlLicpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBMb2FkIGFuZCBkaXNwbGF5IHBvc3QgY29udGVudCBiYXNlZCBvbiBwb3N0IElEXG4gKi9cbmZ1bmN0aW9uIGxvYWRQb3N0Q29udGVudChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEZldGNoaW5nIHBvc3Qgd2l0aCBJRDogJHtwb3N0SWR9YCk7XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0geWllbGQgKDAsIGFwaV8xLmZldGNoUG9zdEJ5SWQpKHBvc3RJZCk7XG4gICAgICAgICAgICBpZiAoIXBvc3QpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQb3N0IHdpdGggSUQgJHtwb3N0SWR9IG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGF0YSBmZXRjaGVkOicsIHBvc3QpO1xuICAgICAgICAgICAgdXBkYXRlUG9zdFVJKHBvc3QpO1xuICAgICAgICAgICAgdXBkYXRlUGFnZU1ldGFkYXRhKHBvc3QpO1xuICAgICAgICAgICAgaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcocG9zdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHBvc3QgY29udGVudDonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93RXJyb3JNZXNzYWdlKGBGYWlsZWQgdG8gbG9hZCB0aGUgYmxvZyBwb3N0LiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1BsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJ31gKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBVcGRhdGUgdGhlIHBvc3QgVUkgd2l0aCBjb250ZW50IGZyb20gdGhlIGxvYWRlZCBwb3N0XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBvc3RVSShwb3N0KSB7XG4gICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIFBvc3QgVUkgZm9yOicsIHBvc3QudGl0bGUpO1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDYW5ub3QgdXBkYXRlIFVJOiAjcG9zdC1jb250ZW50IGVsZW1lbnQgbm90IGZvdW5kLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENvbnN0cnVjdCB0aGUgaW5uZXIgSFRNTCBkeW5hbWljYWxseVxuICAgIHBvc3RBcnRpY2xlRWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPiR7cG9zdC50aXRsZX08L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtbWV0YVwiPlxuICAgICAgICAgICAgICAgIDx0aW1lIGRhdGV0aW1lPVwiJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gOiAnJ31cIj5cbiAgICAgICAgICAgICAgICAgICAgJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnIH0pIDogJ0RhdGUgdW5rbm93bid9XG4gICAgICAgICAgICAgICAgPC90aW1lPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yXCI+YnkgJHtwb3N0LmF1dGhvciB8fCAnQW5vbnltb3VzJ308L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAke3Bvc3QuaW1hZ2VVcmwgPyBgPGltZyBzcmM9XCIke3Bvc3QuaW1hZ2VVcmx9XCIgYWx0PVwiJHtwb3N0LnRpdGxlfVwiIGNsYXNzPVwiZmVhdHVyZWQtaW1hZ2VcIj5gIDogJyd9XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtY29udGVudC1ib2R5XCI+XG4gICAgICAgICAgICAke3Bvc3QuY29udGVudH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtZm9vdGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICR7cG9zdC50YWdzICYmIHBvc3QudGFncy5sZW5ndGggPiAwID8gYDxzcGFuPlRhZ3M6PC9zcGFuPiAke3Bvc3QudGFncy5tYXAodGFnID0+IGA8YSBocmVmPVwiJHsoMCwgdXJsVHJhbnNmb3JtZXJfMS5nZW5lcmF0ZVRhZ0ZpbHRlclVybCkodGFnKX1cIj4ke3RhZ308L2E+YCkuam9pbignJyl9YCA6ICcnfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLXNoYXJpbmdcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TaGFyZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiB0d2l0dGVyXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIFR3aXR0ZXJcIj48aSBjbGFzcz1cImZhYiBmYS10d2l0dGVyXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gZmFjZWJvb2tcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gRmFjZWJvb2tcIj48aSBjbGFzcz1cImZhYiBmYS1mYWNlYm9vay1mXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gbGlua2VkaW5cIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gTGlua2VkSW5cIj48aSBjbGFzcz1cImZhYiBmYS1saW5rZWRpbi1pblwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIGNvbnNvbGUubG9nKCdQb3N0IFVJIHVwZGF0ZWQgd2l0aCBsaWtlIGJ1dHRvbiBhbmQgY29tbWVudHMgc2VjdGlvbiBzdHJ1Y3R1cmUuJyk7XG59XG4vKipcbiAqIFVwZGF0ZSBwYWdlIG1ldGFkYXRhIGxpa2UgdGl0bGUgYW5kIFVSTFxuICovXG5mdW5jdGlvbiB1cGRhdGVQYWdlTWV0YWRhdGEocG9zdCkge1xuICAgIGRvY3VtZW50LnRpdGxlID0gYCR7cG9zdC50aXRsZX0gfCBOb2VsJ3MgQmxvZ2A7XG4gICAgY29uc29sZS5sb2coJ1BhZ2UgbWV0YWRhdGEgdXBkYXRlZC4nKTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBzb2NpYWwgc2hhcmluZyBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVTb2NpYWxTaGFyaW5nKHBvc3QpIHtcbiAgICBjb25zdCBwb3N0QXJ0aWNsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgaWYgKCFwb3N0QXJ0aWNsZUVsZW1lbnQpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBzb2NpYWxTaGFyaW5nRGl2ID0gcG9zdEFydGljbGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWwtc2hhcmluZycpO1xuICAgIGlmIChzb2NpYWxTaGFyaW5nRGl2KSB7XG4gICAgICAgIHNvY2lhbFNoYXJpbmdEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hhcmUtYnV0dG9uJyk7XG4gICAgICAgICAgICBpZiAoIWJ1dHRvbilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYENoZWNrIG91dCB0aGlzIGFydGljbGU6ICR7cG9zdC50aXRsZX1gO1xuICAgICAgICAgICAgbGV0IHNoYXJlV2luZG93VXJsID0gJyc7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygndHdpdHRlcicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9JnRleHQ9JHtlbmNvZGVVUklDb21wb25lbnQodGV4dCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ3R3aXR0ZXItc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD0yMzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhY2Vib29rJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdmYWNlYm9vay1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnbGlua2VkaW4nKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyaW5nL3NoYXJlLW9mZnNpdGUvP3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdsaW5rZWRpbi1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ1NvY2lhbCBzaGFyaW5nIGluaXRpYWxpemVkLicpO1xufVxuLyoqXG4gKiBEaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIHVzZXIgd2l0aGluIHRoZSBwb3N0IGNvbnRlbnQgYXJlYVxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoY29udGVudEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXNlY3Rpb24nKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGNvbW1lbnRzU2VjdGlvbiA/IGNvbW1lbnRzU2VjdGlvbiA6IGNvbnRlbnRFbGVtZW50O1xuICAgICAgICB0YXJnZXRFbGVtZW50LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPiR7bWVzc2FnZX08L2Rpdj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7IC8vIEZhbGxiYWNrXG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubGlrZVBvc3QgPSBsaWtlUG9zdDtcbmV4cG9ydHMudW5saWtlUG9zdCA9IHVubGlrZVBvc3Q7XG5leHBvcnRzLmRlbGV0ZUJsb2dQb3N0ID0gZGVsZXRlQmxvZ1Bvc3Q7XG5leHBvcnRzLmNyZWF0ZVBvc3QgPSBjcmVhdGVQb3N0O1xuZXhwb3J0cy51cGRhdGVQb3N0ID0gdXBkYXRlUG9zdDtcbmV4cG9ydHMuYWRkVGFnVG9Qb3N0ID0gYWRkVGFnVG9Qb3N0O1xuZXhwb3J0cy5mZXRjaEJsb2dQb3N0cyA9IGZldGNoQmxvZ1Bvc3RzO1xuZXhwb3J0cy5mZXRjaFBvc3RCeUlkID0gZmV0Y2hQb3N0QnlJZDtcbmV4cG9ydHMuZmV0Y2hDb21tZW50c0FwaSA9IGZldGNoQ29tbWVudHNBcGk7XG5leHBvcnRzLnN1Ym1pdENvbW1lbnRBcGkgPSBzdWJtaXRDb21tZW50QXBpO1xuLy8gQVBJX1VSTCBjb25zdGFudCBpcyBub3QgbmVlZGVkIHdoZW4gZmV0Y2hpbmcgc3RhdGljIGZpbGUgZGlyZWN0bHlcbi8vIGNvbnN0IEFQSV9VUkwgPSAnL2FwaSc7IFxuLy8gLS0tIEZ1bmN0aW9ucyByZWx5aW5nIG9uIGJhY2tlbmQgQVBJIChXaWxsIE5PVCB3b3JrIG9uIEdpdEh1YiBQYWdlcykgLS0tXG4vLyBUaGVzZSBmdW5jdGlvbnMgd2lsbCBmYWlsIHNpbGVudGx5IG9yIGxvZyBlcnJvcnMgaW4gdGhlIGNvbnNvbGUgb24gdGhlIHN0YXRpYyBzaXRlLlxuZnVuY3Rpb24gbGlrZVBvc3QoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBMaWtlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZXMgYSBiYWNrZW5kLiBDYW5ub3QgTElLRSBwb3N0ICR7aWR9IG9uIHN0YXRpYyBzaXRlLmApO1xuICAgICAgICAvLyBSZXR1cm4gbnVsbCBvciBhIGRlZmF1bHQgc3RydWN0dXJlIGlmIHlvdXIgY2FsbGluZyBjb2RlIGV4cGVjdHMgaXRcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB1bmxpa2VQb3N0KGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgVW5saWtlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZXMgYSBiYWNrZW5kLiBDYW5ub3QgVU5MSUtFIHBvc3QgJHtpZH0gb24gc3RhdGljIHNpdGUuYCk7XG4gICAgICAgIC8vIFJldHVybiBudWxsIG9yIGEgZGVmYXVsdCBzdHJ1Y3R1cmVcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkZWxldGVCbG9nUG9zdChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGRlbGV0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBvc3QocG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGNyZWF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlUG9zdChpZCwgcG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHVwZGF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gYWRkVGFnVG9Qb3N0KGlkLCB0YWcpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGFkZCB0YWcgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG4vLyAtLS0gRnVuY3Rpb25zIG1vZGlmaWVkIGZvciBzdGF0aWMgZGF0YSAtLS1cbmNvbnN0IFNUQVRJQ19EQVRBX1VSTCA9ICdkYXRhL3Bvc3RzLmpzb24nOyAvLyBEZWZpbmUgcmVsYXRpdmUgcGF0aCBvbmNlXG4vKipcbiAqIEZldGNoIGFsbCBibG9nIHBvc3RzIGRpcmVjdGx5IGZyb20gdGhlIHN0YXRpYyBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGZldGNoQmxvZ1Bvc3RzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBzdGF0aWMgZGF0YSBmcm9tOiAke1NUQVRJQ19EQVRBX1VSTH1gKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZldGNoIHRoZSBKU09OIGZpbGUgdXNpbmcgdGhlIHJlbGF0aXZlIHBhdGhcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goU1RBVElDX0RBVEFfVVJMKTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCAke1NUQVRJQ19EQVRBX1VSTH06ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgLy8gQXNzdW1pbmcgdGhlIEpTT04gc3RydWN0dXJlIGlzIHsgcG9zdHM6IFsuLi5dIH0gXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5wb3N0cyB8fCBbXTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHN0YXRpYyAke1NUQVRJQ19EQVRBX1VSTH06YCwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgb24gZXJyb3JcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYSBzaW5nbGUgcG9zdCBieSBJRCBieSBmaWx0ZXJpbmcgdGhlIHN0YXRpYyBKU09OIGRhdGEuXG4gKiBAcGFyYW0gaWQgLSBUaGUgcG9zdCBJRCAoc3RyaW5nIG9yIG51bWJlcilcbiAqL1xuZnVuY3Rpb24gZmV0Y2hQb3N0QnlJZChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGZXRjaCBhbGwgcG9zdHMgZmlyc3RcbiAgICAgICAgICAgIGNvbnN0IGFsbFBvc3RzID0geWllbGQgZmV0Y2hCbG9nUG9zdHMoKTtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RJZE51bWJlciA9IHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyBwYXJzZUludChpZCwgMTApIDogaWQ7XG4gICAgICAgICAgICBpZiAoaXNOYU4ocG9zdElkTnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgcG9zdCBJRCBwcm92aWRlZDogJHtpZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIHNwZWNpZmljIHBvc3RcbiAgICAgICAgICAgIGNvbnN0IHBvc3QgPSBhbGxQb3N0cy5maW5kKHAgPT4gTnVtYmVyKHAuaWQpID09PSBwb3N0SWROdW1iZXIpO1xuICAgICAgICAgICAgaWYgKCFwb3N0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBQb3N0IHdpdGggSUQgJHtpZH0gbm90IGZvdW5kIGluIHN0YXRpYyBkYXRhLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coYEZvdW5kIHBvc3QgJHtpZH0gaW4gc3RhdGljIGRhdGEuYCk7XG4gICAgICAgICAgICByZXR1cm4gcG9zdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHN0YXRpYyBwb3N0ICR7aWR9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyAtLS0gQ29tbWVudCBBUEkgUGxhY2Vob2xkZXJzIC0tLVxuZnVuY3Rpb24gZmV0Y2hDb21tZW50c0FwaShwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJDb21tZW50cyBjYW5ub3QgYmUgZmV0Y2hlZCBvbiBzdGF0aWMgc2l0ZSB3aXRob3V0IGV4dGVybmFsIHNlcnZpY2UvYmFja2VuZC5cIik7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdENvbW1lbnRBcGkocG9zdElkLCBuYW1lLCBjb21tZW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBzdWJtaXQgY29tbWVudCBvbiBzdGF0aWMgc2l0ZSB3aXRob3V0IGV4dGVybmFsIHNlcnZpY2UvYmFja2VuZC5cIik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbW1lbnQgc3VibWlzc2lvbiBub3QgYXZhaWxhYmxlLlwiKTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL3V0aWxzL3VybFRyYW5zZm9ybWVyLnRzIChFeGFtcGxlIExvY2F0aW9uKVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZW5lcmF0ZVRhZ0ZpbHRlclVybCA9IGdlbmVyYXRlVGFnRmlsdGVyVXJsO1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSByb290LXJlbGF0aXZlIFVSTCBwYXRoIGZvciBmaWx0ZXJpbmcgYnkgdGFnIG9uIHRoZSBtYWluIGJsb2cgcGFnZS5cbiAqIENyZWF0ZXMgYSBVUkwgbGlrZSBcIi8/dGFnPXlvdXItdGFnLW5hbWVcIi5cbiAqXG4gKiBAcGFyYW0gdGFnIC0gVGhlIHRhZyBzdHJpbmcgdG8gZmlsdGVyIGJ5LlxuICogQHJldHVybnMgVGhlIHJvb3QtcmVsYXRpdmUgVVJMIHBhdGggd2l0aCB0aGUgdGFnIHF1ZXJ5IHBhcmFtZXRlci5cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUYWdGaWx0ZXJVcmwodGFnKSB7XG4gICAgLy8gT3B0aW9uYWw6IENvbnZlcnQgdGFnIHRvIGxvd2VyY2FzZSBmb3IgY29uc2lzdGVuY3kgaW4gZmlsdGVyaW5nXG4gICAgY29uc3QgY29uc2lzdGVudFRhZyA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIFVSTFNlYXJjaFBhcmFtcyBoYW5kbGVzIG5lY2Vzc2FyeSBlbmNvZGluZyBmb3IgcXVlcnkgcGFyYW1ldGVyIHZhbHVlc1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoeyB0YWc6IGNvbnNpc3RlbnRUYWcgfSk7XG4gICAgLy8gUmV0dXJuIGEgcm9vdC1yZWxhdGl2ZSBwYXRoLiBUaGlzIHdvcmtzIGxvY2FsbHkgKHJlc29sdmVzIHRvIGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8/dGFnPS4uLilcbiAgICAvLyBhbmQgZGVwbG95ZWQgdW5kZXIgL2Jsb2cvIChyZXNvbHZlcyB0byBodHRwczovL25vZWx1Z3dva2UuY29tL2Jsb2cvP3RhZz0uLi4pXG4gICAgcmV0dXJuIGAvPyR7cGFyYW1zLnRvU3RyaW5nKCl9YDtcbn1cbi8qXG4vLyBPcmlnaW5hbCBmdW5jdGlvbiAtIGtlcHQgZm9yIHJlZmVyZW5jZSBvciBpZiBuZWVkZWQgZm9yIGRpZmZlcmVudCBVUkwgdHlwZXNcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1UYWdUb1VybEZvcm1hdCh0YWc6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRhZy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgJy0nKTtcbn1cbiovXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZW50cmllcy9jbGllbnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=