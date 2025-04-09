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
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createBlogCardElement = createBlogCardElement;
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
    // Use a relative path for sharing as well
    const postUrl = `post.html?id=${String(post.id)}`;
    const encodedUrl = encodeURIComponent(postUrl); // Note: Sharing services might resolve this relative to the current page
    // Alternative: Construct full URL carefully if needed by specific sharing services
    // const postFullUrl = `${window.location.origin}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/post.html?id=${String(post.id)}`;
    // const encodedFullUrl = encodeURIComponent(postFullUrl);
    const shareText = `Check out this article: ${post.title}`;
    const encodedShareText = encodeURIComponent(shareText);
    // --- End Dynamic URL Generation ---
    let tagsHTML = '';
    if (post.tags && post.tags.length > 0) {
        tagsHTML = '<div class="post-tags">' +
            post.tags.map(tag => `<span class="tag-badge" data-tag="${tag}" onclick="window.location.href='/index.html?tag=${encodeURIComponent(tag)}'">${tag}</span>`).join('') +
            '</div>';
    }
    const fallbackImageUrl = 'images/blog_image_3.jpeg'; // Relative path
    blogCard.innerHTML = `
        <img src="${post.imageUrl || fallbackImageUrl}" alt="${post.title}"> 
        <div class="blog-card-content">
            <p class="blog-card-date-author">${dateStr}</p>
            <h3 class="blog-card-title">${post.title}</h3>
            ${tagsHTML}
            <div class="post-actions">
                <span class="like-button-display" aria-label="${post.likes || 0} likes">
                    <i class="far fa-heart"></i> <span class="like-count">${post.likes || 0}</span>
                </span>
                <span class="comments-toggle-display" aria-label="${commentCount} comments">
                    <i class="fas fa-comment"></i>
                    <span class="comment-count">${commentCount}</span>
                </span>
                <div class="social-sharing">
                    <button class="share-button twitter" aria-label="Share on Twitter" data-url="${encodedUrl}" data-text="${encodedShareText}"><i class="fab fa-twitter"></i></button>
                    <button class="share-button facebook" aria-label="Share on Facebook" data-url="${encodedUrl}"><i class="fab fa-facebook-f"></i></button>
                    <button class="share-button linkedin" aria-label="Share on LinkedIn" data-url="${encodedUrl}"><i class="fab fa-linkedin-in"></i></button>
                </div>
            </div>
        </div>
    `;
    // Add event listeners for tag clicks
    const tagBadges = blogCard.querySelectorAll('.tag-badge');
    tagBadges.forEach(badge => {
        badge.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the blog card click
            const tag = event.target.dataset.tag;
            if (tag) {
                // Use client-side navigation instead of direct links
                // This uses the index.html page with a query parameter instead of a /tag/ path
                window.location.href = `index.html?tag=${encodeURIComponent(tag)}`;
            }
        });
    });
    const socialSharingDiv = blogCard.querySelector('.social-sharing');
    if (socialSharingDiv) {
        socialSharingDiv.addEventListener('click', (event) => {
            const button = event.target.closest('.share-button');
            if (!button)
                return;
            event.stopPropagation();
            // For sharing, we might need the FULL URL. Let's reconstruct it here.
            // Get the base path (e.g., '/blog/')
            const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
            const relativeUrl = button.dataset.url ? decodeURIComponent(button.dataset.url) : `post.html?id=${post.id}`; // Use relative path from data attribute
            const fullUrl = `${window.location.origin}${basePath}${relativeUrl}`; // Construct full URL
            const encodedFullUrl = encodeURIComponent(fullUrl); // Encode the full URL
            const text = button.dataset.text ? decodeURIComponent(button.dataset.text) : document.title;
            const encodedText = encodeURIComponent(text);
            let shareWindowUrl = '';
            if (button.classList.contains('twitter')) {
                shareWindowUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedFullUrl}`; // Use encodedFullUrl
                window.open(shareWindowUrl, 'twitter-share', 'width=550,height=235');
            }
            else if (button.classList.contains('facebook')) {
                shareWindowUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedFullUrl}`; // Use encodedFullUrl
                window.open(shareWindowUrl, 'facebook-share', 'width=550,height=435');
            }
            else if (button.classList.contains('linkedin')) {
                shareWindowUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedFullUrl}`; // Use encodedFullUrl
                window.open(shareWindowUrl, 'linkedin-share', 'width=550,height=435');
            }
        });
    }
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


// Contact popup functionality
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeContactForm = initializeContactForm;
/**
 * Initialize the contact form popup
 */
function initializeContactForm() {
    const contactButton = document.getElementById('contact-btn');
    const contactPopup = document.getElementById('contact-popup');
    const closePopup = document.querySelector('#contact-popup .close-popup');
    if (!contactButton || !contactPopup || !closePopup) {
        console.warn('Contact form elements not found in the DOM');
        return;
    }
    // Open popup when contact button is clicked
    contactButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        contactPopup.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while popup is open
        // Add active class to contact link
        contactButton.classList.add('active');
    });
    // Close popup when close button is clicked
    closePopup.addEventListener('click', () => {
        contactPopup.classList.remove('open');
        document.body.style.overflow = '';
        // Revert to home active state when closing popup
        setDefaultActiveLink();
    });
    // Close when clicking outside the popup content
    contactPopup.addEventListener('click', (e) => {
        if (e.target === contactPopup) {
            contactPopup.classList.remove('open');
            document.body.style.overflow = '';
            // Revert to home active state when closing popup
            setDefaultActiveLink();
        }
    });
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactPopup.classList.contains('open')) {
            contactPopup.classList.remove('open');
            document.body.style.overflow = '';
            // Revert to home active state when closing popup
            setDefaultActiveLink();
        }
    });
    // Set up contact form submission
    setupContactFormSubmission();
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
/**
 * Handle contact form submission
 */
function setupContactFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm)
        return;
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        // Simple validation
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            showContactFormMessage('Please fill out all fields', 'error');
            return;
        }
        // Here you would typically send the form data to a server
        // For now, we'll just simulate a successful submission
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        // Simulate server request
        setTimeout(() => {
            // Reset form and show success message
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            showContactFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            // Close the popup after a delay
            setTimeout(() => {
                const contactPopup = document.getElementById('contact-popup');
                if (contactPopup) {
                    contactPopup.classList.remove('open');
                    document.body.style.overflow = '';
                }
            }, 2000);
        }, 1500);
    });
}
/**
 * Display a message in the contact form
 */
function showContactFormMessage(message, type) {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm)
        return;
    // Remove any existing message
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    // Create and add new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    contactForm.appendChild(messageElement);
    // Remove message after a few seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
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
                    <li><a href="/#portfolio">Portfolio</a></li>
                    <li><a href="/#contact" id="contact-btn">Contact</a></li>
                </ul>
            </nav>
            <input type="search" placeholder="Search for articles..." class="search-bar"> 
        </header>
    `;
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
                posts = posts.filter(post => post.tags.includes(tagFilter));
                console.log(`Filtered posts by tag '${tagFilter}': ${posts.length} posts.`);
            }
            // Clear loading state
            blogCardsContainer.innerHTML = '';
            if (posts.length === 0) {
                showEmptyState(blogCardsContainer);
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
 */
function showEmptyState(container) {
    container.innerHTML = ''; // Clear container
    const emptyStateDiv = document.createElement('div');
    emptyStateDiv.className = 'empty-state'; // Add class for styling
    emptyStateDiv.innerHTML = `
        <i class="fas fa-file-alt fa-3x"></i>
        <h3>No posts found</h3>
        <p>Check back later for new content!</p> 
    `; // Example content
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
exports.getLikedPostsFromSession = getLikedPostsFromSession;
exports.addPostToSessionLikes = addPostToSessionLikes;
exports.removePostFromSessionLikes = removePostFromSessionLikes;
exports.initializePostDetailPageLogic = initializePostDetailPageLogic;
exports.loadPostContent = loadPostContent;
exports.updatePostUI = updatePostUI;
exports.updatePageMetadata = updatePageMetadata;
exports.initializeSocialSharing = initializeSocialSharing;
exports.showErrorMessage = showErrorMessage;
exports.initializeLikeButton = initializeLikeButton;
exports.loadComments = loadComments;
exports.initializeCommentForm = initializeCommentForm;
// --- Imports ---
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
const urlTransformer_1 = __webpack_require__(/*! ../utils/urlTransformer */ "./src/utils/urlTransformer.ts");
const header_1 = __webpack_require__(/*! ../components/header */ "./src/components/header.ts");
const darkMode_1 = __webpack_require__(/*! ../components/darkMode */ "./src/components/darkMode.ts");
// Placeholder API functions for comments (replace with actual implementation)
const fetchCommentsApi = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`API: Fetching comments for ${id}`);
    return [
        { id: 1, name: 'Alice', comment: 'Great post!', createdAt: new Date() },
        { id: 2, name: 'Bob', comment: 'Very informative.', createdAt: new Date() }
    ];
});
const submitCommentApi = (id, name, comment) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`API: Submitting comment for ${id}`, { name, comment });
    return { id: Date.now(), name, comment, createdAt: new Date() };
});
// --- Session Storage Helper Functions for Likes ---
const LIKED_POSTS_SESSION_KEY = 'likedPosts';
/** Gets the set of liked post IDs from sessionStorage. */
function getLikedPostsFromSession() {
    const storedLikes = sessionStorage.getItem(LIKED_POSTS_SESSION_KEY);
    try {
        const likedIds = storedLikes ? JSON.parse(storedLikes) : [];
        return new Set(Array.isArray(likedIds) ? likedIds : []);
    }
    catch (e) {
        console.error("Error parsing liked posts from sessionStorage:", e);
        return new Set();
    }
}
/** Adds a post ID to the liked posts in sessionStorage. */
function addPostToSessionLikes(postId) {
    const likedPostsSet = getLikedPostsFromSession();
    likedPostsSet.add(postId);
    sessionStorage.setItem(LIKED_POSTS_SESSION_KEY, JSON.stringify(Array.from(likedPostsSet)));
    console.log('Added post to session likes:', postId, Array.from(likedPostsSet));
}
/** Removes a post ID from the liked posts in sessionStorage. */
function removePostFromSessionLikes(postId) {
    const likedPostsSet = getLikedPostsFromSession();
    likedPostsSet.delete(postId);
    sessionStorage.setItem(LIKED_POSTS_SESSION_KEY, JSON.stringify(Array.from(likedPostsSet)));
    console.log('Removed post from session likes:', postId, Array.from(likedPostsSet));
}
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
            initializeLikeButton(post);
            initializeCommentForm(post.id.toString());
            yield loadComments(post.id.toString());
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

                <button class="like-button" data-post-id="${post.id}" aria-label="Like this post">
                    <i class="far fa-heart"></i> 
                    <span class="like-count">${post.likes || 0}</span>
                </button>
            </div>
        </div>
        
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" class="featured-image">` : ''}

        <div class="post-content-body">
            ${post.content}
        </div>

        <div class="post-footer">
            <div class="tags">
                ${post.tags && post.tags.length > 0 ? `<span>Tags:</span> ${post.tags.map(tag => `<a href="/index.html?tag=${encodeURIComponent((0, urlTransformer_1.transformTagToUrlFormat)(tag))}">${tag}</a>`).join('')}` : ''}
            </div>
            <div class="social-sharing">
                <span>Share:</span>
                <button class="share-button twitter" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></button>
                <button class="share-button facebook" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></button>
                <button class="share-button linkedin" aria-label="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></button>
            </div>
        </div>

        <section id="comments-section" class="comments-section" aria-labelledby="comments-heading">
             <h2 id="comments-heading">Comments</h2>
             <div id="comments-list" class="comments-list">
                 <p class="no-comments">Loading comments...</p> 
             </div>
             <form id="comment-form" class="comment-form" data-post-id="${post.id}">
                 <h3>Leave a Comment</h3>
                 <div class="form-group">
                     <label for="comment-name">Name:</label>
                     <input type="text" id="comment-name" name="name" required>
                 </div>
                 <div class="form-group">
                     <label for="comment-text">Comment:</label>
                     <textarea id="comment-text" name="comment" rows="4" required></textarea>
                 </div>
                 <button type="submit" class="primary-button">Submit Comment</button>
             </form>
        </section>
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
/**
 * Initialize like button functionality
 */
function initializeLikeButton(post) {
    const postIdString = post.id.toString();
    const likeBtn = document.querySelector(`#post-content .like-button[data-post-id="${postIdString}"]`);
    if (!likeBtn) {
        console.warn('Like button not found in post detail UI.');
        return;
    }
    const likedPostsSet = getLikedPostsFromSession();
    let isLiked = likedPostsSet.has(postIdString); // Initial state from session
    const icon = likeBtn.querySelector('i');
    const countSpan = likeBtn.querySelector('.like-count');
    // Set initial UI state
    if (isLiked && icon) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        likeBtn.classList.add('liked');
    }
    else if (icon) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        likeBtn.classList.remove('liked');
    }
    if (countSpan)
        countSpan.textContent = String(post.likes || 0);
    likeBtn.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const currentIcon = likeBtn.querySelector('i');
        const currentCountSpan = likeBtn.querySelector('.like-count');
        if (!currentIcon || !currentCountSpan)
            return;
        likeBtn.disabled = true; // Prevent double-clicking
        try {
            let result;
            if (isLiked) {
                console.log(`Attempting to UNLIKE post ${post.id}`);
                result = yield (0, api_1.unlikePost)(Number(post.id)); // Call unlikePost API
            }
            else {
                console.log(`Attempting to LIKE post ${post.id}`);
                result = yield (0, api_1.likePost)(Number(post.id)); // Call likePost API
            }
            if (result) {
                // Toggle the local 'isLiked' state only after successful API call
                isLiked = !isLiked;
                // Update Session Storage based on the new toggled state
                if (isLiked) {
                    addPostToSessionLikes(postIdString);
                }
                else {
                    removePostFromSessionLikes(postIdString);
                }
                // Update UI Icon based on the new toggled state
                if (isLiked) {
                    currentIcon.classList.remove('far');
                    currentIcon.classList.add('fas');
                    likeBtn.classList.add('liked');
                }
                else {
                    currentIcon.classList.remove('fas');
                    currentIcon.classList.add('far');
                    likeBtn.classList.remove('liked');
                }
                // Update count directly from the API response
                currentCountSpan.textContent = String(result.likes);
                console.log(`Like status updated. New count: ${result.likes}`);
            }
            else {
                console.error("Like/Unlike API call failed or returned null");
            }
        }
        catch (error) {
            console.error("Failed to update like/unlike status:", error);
        }
        finally {
            likeBtn.disabled = false; // Re-enable button
        }
    }));
    console.log('Like button initialized.');
}
/**
 * Fetches comments from API and renders them into the list.
 */
function loadComments(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList)
            return;
        commentsList.innerHTML = '<p class="loading-comments">Loading comments...</p>'; // Show loading state
        try {
            const comments = yield fetchCommentsApi(postId); // Replace with actual API call
            commentsList.innerHTML = ''; // Clear loading/previous comments
            if (comments.length === 0) {
                commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
            }
            else {
                comments.forEach(comment => {
                    var _a, _b, _c, _d;
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    // Basic escaping for display - consider a more robust sanitizer if needed
                    const safeName = ((_b = (_a = comment.name) === null || _a === void 0 ? void 0 : _a.replace(/</g, "&lt;")) === null || _b === void 0 ? void 0 : _b.replace(/>/g, "&gt;")) || 'Anonymous';
                    const safeComment = ((_d = (_c = comment.comment) === null || _c === void 0 ? void 0 : _c.replace(/</g, "&lt;")) === null || _d === void 0 ? void 0 : _d.replace(/>/g, "&gt;")) || '';
                    commentElement.innerHTML = `
                    <p class="comment-meta"><strong>${safeName}</strong> on ${new Date(comment.createdAt).toLocaleDateString()}</p>
                    <p class="comment-body">${safeComment}</p>
                `;
                    commentsList.appendChild(commentElement);
                });
            }
            console.log('Comments loaded.');
        }
        catch (error) {
            console.error("Failed to load comments:", error);
            commentsList.innerHTML = '<p class="error-message">Could not load comments.</p>';
        }
    });
}
/**
 * Initializes the comment submission form.
 */
function initializeCommentForm(postId) {
    const commentForm = document.getElementById('comment-form');
    if (!commentForm) {
        console.warn('Comment form not found in post detail UI.');
        return;
    }
    commentForm.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const nameInput = commentForm.elements.namedItem('name');
        const commentInput = commentForm.elements.namedItem('comment');
        const submitButton = commentForm.querySelector('button[type="submit"]');
        if (!nameInput || !commentInput || !submitButton)
            return;
        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();
        if (!name || !comment) {
            alert('Please enter both name and comment.'); // Simple validation
            return;
        }
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        try {
            yield submitCommentApi(postId, name, comment); // Replace with actual API call
            // Clear form
            nameInput.value = '';
            commentInput.value = '';
            // Refresh comments list to show the new comment
            yield loadComments(postId);
        }
        catch (error) {
            console.error("Failed to submit comment:", error);
            alert('Failed to submit comment. Please try again.'); // Simple error feedback
        }
        finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Comment';
        }
    }));
    console.log('Comment form initialized.');
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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transformTagToUrlFormat = transformTagToUrlFormat;
exports.generateTagUrl = generateTagUrl;
/**
 * Transforms a tag into a URL-friendly format.
 * Replaces spaces with dashes and converts the string to lowercase.
 *
 * @param tag - The tag to transform.
 * @returns The transformed tag.
 */
function transformTagToUrlFormat(tag) {
    return tag.toLowerCase().replace(/\s+/g, '-');
}
/**
 * Transforms a tag into a URL-friendly format and appends it to the correct blog homepage URL.
 *
 * @param tag - The tag to transform.
 * @returns The full URL with the tag query parameter.
 */
function generateTagUrl(tag) {
    const baseUrl = process.env.BLOG_BASE_URL || 'https://noelugwoke.com/blog/';
    const transformedTag = transformTagToUrlFormat(tag);
    const params = new URLSearchParams({ tag: transformedTag });
    return `${baseUrl}?${params.toString()}`;
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ25FLHVCQUF1QjtBQUN2QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsR0FBRztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLElBQUk7QUFDakQ7QUFDQTtBQUNBLHNDQUFzQyxJQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxHQUFHO0FBQzNEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDaElhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELCtCQUErQjtBQUMvQixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMscUJBQXFCO0FBQzlELGNBQWMsUUFBUSxHQUFHLGtCQUFrQjtBQUMzQzs7Ozs7OztVQ3pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2Fib3V0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9ibG9nQ2FyZHMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2NvbW1lbnRzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9jb250YWN0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9kYXJrTW9kZS50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9wYWdpbmF0aW9uLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9zZWFyY2gudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9ibG9nRnJvbnRlbmRDb250cm9sbGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvZW50cmllcy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9tb2R1bGVzL3Bvc3REZXRhaWwudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9zZXJ2aWNlcy9hcGkudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy91dGlscy91cmxUcmFuc2Zvcm1lci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIEFib3V0IHBvcHVwIGZ1bmN0aW9uYWxpdHlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUFib3V0ID0gaW5pdGlhbGl6ZUFib3V0O1xuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBBYm91dCBzZWN0aW9uIHBvcHVwXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVBYm91dCgpIHtcbiAgICBjb25zdCBhYm91dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1idG4nKTtcbiAgICBjb25zdCBhYm91dFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LXBvcHVwJyk7XG4gICAgY29uc3QgY2xvc2VQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dC1wb3B1cCAuY2xvc2UtcG9wdXAnKTtcbiAgICBpZiAoIWFib3V0QnRuIHx8ICFhYm91dFBvcHVwIHx8ICFjbG9zZVBvcHVwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQWJvdXQgcG9wdXAgZWxlbWVudHMgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBPcGVuIHBvcHVwIHdoZW4gYWJvdXQgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBhYm91dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGFuY2hvciBiZWhhdmlvclxuICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nOyAvLyBQcmV2ZW50IHNjcm9sbGluZyB3aGlsZSBwb3B1cCBpcyBvcGVuXG4gICAgICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gYWJvdXQgbGlua1xuICAgICAgICBhYm91dEJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSBwb3B1cCB3aGVuIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgY2xvc2VQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgIH0pO1xuICAgIC8vIENsb3NlIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSB0aGUgcG9wdXAgY29udGVudFxuICAgIGFib3V0UG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IGFib3V0UG9wdXApIHtcbiAgICAgICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIENsb3NlIG9uIGVzY2FwZSBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBhYm91dFBvcHVwLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XG4gICAgICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNldCB0aGUgZGVmYXVsdCBhY3RpdmUgbGluayBzdGF0ZVxuICovXG5mdW5jdGlvbiBzZXREZWZhdWx0QWN0aXZlTGluaygpIHtcbiAgICAvLyBHZXQgY3VycmVudCBoYXNoIG9yIGRlZmF1bHQgdG8gaG9tZVxuICAgIGNvbnN0IGN1cnJlbnRIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgJyNob21lJztcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIG5hdiBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBoYXNoIGxpbmtcbiAgICBjb25zdCBjdXJyZW50TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlciBuYXYgdWwgbGkgYVtocmVmPVwiJHtjdXJyZW50SGFzaH1cIl1gKTtcbiAgICBpZiAoY3VycmVudExpbmspIHtcbiAgICAgICAgY3VycmVudExpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCA9IGNyZWF0ZUJsb2dDYXJkRWxlbWVudDtcbi8qKlxuICogQ3JlYXRlcyBhIERPTSBlbGVtZW50IGZvciBhIGJsb2cgY2FyZCBmcm9tIHBvc3QgZGF0YSAoZGlzcGxheSBvbmx5IGZvciBhY3Rpb25zKVxuICovXG5mdW5jdGlvbiBjcmVhdGVCbG9nQ2FyZEVsZW1lbnQocG9zdCkge1xuICAgIGNvbnN0IGJsb2dDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmxvZ0NhcmQuY2xhc3NOYW1lID0gJ2Jsb2ctY2FyZCc7XG4gICAgYmxvZ0NhcmQuZGF0YXNldC5wb3N0SWQgPSBTdHJpbmcocG9zdC5pZCk7XG4gICAgYmxvZ0NhcmQuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgIGNvbnN0IGNvbW1lbnRDb3VudCA9IHBvc3QuY29tbWVudHMgPyBwb3N0LmNvbW1lbnRzLmxlbmd0aCA6IDA7XG4gICAgY29uc3QgY3JlYXRlZERhdGUgPSBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IGNyZWF0ZWREYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYydcbiAgICB9KTtcbiAgICAvLyAtLS0gRHluYW1pYyBVUkwgYW5kIFRleHQgR2VuZXJhdGlvbiBmb3IgU2hhcmluZyAtLS1cbiAgICAvLyBVc2UgYSByZWxhdGl2ZSBwYXRoIGZvciBzaGFyaW5nIGFzIHdlbGxcbiAgICBjb25zdCBwb3N0VXJsID0gYHBvc3QuaHRtbD9pZD0ke1N0cmluZyhwb3N0LmlkKX1gO1xuICAgIGNvbnN0IGVuY29kZWRVcmwgPSBlbmNvZGVVUklDb21wb25lbnQocG9zdFVybCk7IC8vIE5vdGU6IFNoYXJpbmcgc2VydmljZXMgbWlnaHQgcmVzb2x2ZSB0aGlzIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IHBhZ2VcbiAgICAvLyBBbHRlcm5hdGl2ZTogQ29uc3RydWN0IGZ1bGwgVVJMIGNhcmVmdWxseSBpZiBuZWVkZWQgYnkgc3BlY2lmaWMgc2hhcmluZyBzZXJ2aWNlc1xuICAgIC8vIGNvbnN0IHBvc3RGdWxsVXJsID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0ke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zdWJzdHJpbmcoMCwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmxhc3RJbmRleE9mKCcvJykpfS9wb3N0Lmh0bWw/aWQ9JHtTdHJpbmcocG9zdC5pZCl9YDtcbiAgICAvLyBjb25zdCBlbmNvZGVkRnVsbFVybCA9IGVuY29kZVVSSUNvbXBvbmVudChwb3N0RnVsbFVybCk7XG4gICAgY29uc3Qgc2hhcmVUZXh0ID0gYENoZWNrIG91dCB0aGlzIGFydGljbGU6ICR7cG9zdC50aXRsZX1gO1xuICAgIGNvbnN0IGVuY29kZWRTaGFyZVRleHQgPSBlbmNvZGVVUklDb21wb25lbnQoc2hhcmVUZXh0KTtcbiAgICAvLyAtLS0gRW5kIER5bmFtaWMgVVJMIEdlbmVyYXRpb24gLS0tXG4gICAgbGV0IHRhZ3NIVE1MID0gJyc7XG4gICAgaWYgKHBvc3QudGFncyAmJiBwb3N0LnRhZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICB0YWdzSFRNTCA9ICc8ZGl2IGNsYXNzPVwicG9zdC10YWdzXCI+JyArXG4gICAgICAgICAgICBwb3N0LnRhZ3MubWFwKHRhZyA9PiBgPHNwYW4gY2xhc3M9XCJ0YWctYmFkZ2VcIiBkYXRhLXRhZz1cIiR7dGFnfVwiIG9uY2xpY2s9XCJ3aW5kb3cubG9jYXRpb24uaHJlZj0nL2luZGV4Lmh0bWw/dGFnPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRhZyl9J1wiPiR7dGFnfTwvc3Bhbj5gKS5qb2luKCcnKSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICB9XG4gICAgY29uc3QgZmFsbGJhY2tJbWFnZVVybCA9ICdpbWFnZXMvYmxvZ19pbWFnZV8zLmpwZWcnOyAvLyBSZWxhdGl2ZSBwYXRoXG4gICAgYmxvZ0NhcmQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aW1nIHNyYz1cIiR7cG9zdC5pbWFnZVVybCB8fCBmYWxsYmFja0ltYWdlVXJsfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIj4gXG4gICAgICAgIDxkaXYgY2xhc3M9XCJibG9nLWNhcmQtY29udGVudFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJibG9nLWNhcmQtZGF0ZS1hdXRob3JcIj4ke2RhdGVTdHJ9PC9wPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiYmxvZy1jYXJkLXRpdGxlXCI+JHtwb3N0LnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAke3RhZ3NIVE1MfVxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGlrZS1idXR0b24tZGlzcGxheVwiIGFyaWEtbGFiZWw9XCIke3Bvc3QubGlrZXMgfHwgMH0gbGlrZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtaGVhcnRcIj48L2k+IDxzcGFuIGNsYXNzPVwibGlrZS1jb3VudFwiPiR7cG9zdC5saWtlcyB8fCAwfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb21tZW50cy10b2dnbGUtZGlzcGxheVwiIGFyaWEtbGFiZWw9XCIke2NvbW1lbnRDb3VudH0gY29tbWVudHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY29tbWVudFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb21tZW50LWNvdW50XCI+JHtjb21tZW50Q291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLXNoYXJpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiB0d2l0dGVyXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIFR3aXR0ZXJcIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIiBkYXRhLXRleHQ9XCIke2VuY29kZWRTaGFyZVRleHR9XCI+PGkgY2xhc3M9XCJmYWIgZmEtdHdpdHRlclwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBmYWNlYm9va1wiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBGYWNlYm9va1wiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiPjxpIGNsYXNzPVwiZmFiIGZhLWZhY2Vib29rLWZcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gbGlua2VkaW5cIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gTGlua2VkSW5cIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIj48aSBjbGFzcz1cImZhYiBmYS1saW5rZWRpbi1pblwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHRhZyBjbGlja3NcbiAgICBjb25zdCB0YWdCYWRnZXMgPSBibG9nQ2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcudGFnLWJhZGdlJyk7XG4gICAgdGFnQmFkZ2VzLmZvckVhY2goYmFkZ2UgPT4ge1xuICAgICAgICBiYWRnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFByZXZlbnQgdGhlIGJsb2cgY2FyZCBjbGlja1xuICAgICAgICAgICAgY29uc3QgdGFnID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQudGFnO1xuICAgICAgICAgICAgaWYgKHRhZykge1xuICAgICAgICAgICAgICAgIC8vIFVzZSBjbGllbnQtc2lkZSBuYXZpZ2F0aW9uIGluc3RlYWQgb2YgZGlyZWN0IGxpbmtzXG4gICAgICAgICAgICAgICAgLy8gVGhpcyB1c2VzIHRoZSBpbmRleC5odG1sIHBhZ2Ugd2l0aCBhIHF1ZXJ5IHBhcmFtZXRlciBpbnN0ZWFkIG9mIGEgL3RhZy8gcGF0aFxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGluZGV4Lmh0bWw/dGFnPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRhZyl9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgY29uc3Qgc29jaWFsU2hhcmluZ0RpdiA9IGJsb2dDYXJkLnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWwtc2hhcmluZycpO1xuICAgIGlmIChzb2NpYWxTaGFyaW5nRGl2KSB7XG4gICAgICAgIHNvY2lhbFNoYXJpbmdEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hhcmUtYnV0dG9uJyk7XG4gICAgICAgICAgICBpZiAoIWJ1dHRvbilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIC8vIEZvciBzaGFyaW5nLCB3ZSBtaWdodCBuZWVkIHRoZSBGVUxMIFVSTC4gTGV0J3MgcmVjb25zdHJ1Y3QgaXQgaGVyZS5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgYmFzZSBwYXRoIChlLmcuLCAnL2Jsb2cvJylcbiAgICAgICAgICAgIGNvbnN0IGJhc2VQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnN1YnN0cmluZygwLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVVcmwgPSBidXR0b24uZGF0YXNldC51cmwgPyBkZWNvZGVVUklDb21wb25lbnQoYnV0dG9uLmRhdGFzZXQudXJsKSA6IGBwb3N0Lmh0bWw/aWQ9JHtwb3N0LmlkfWA7IC8vIFVzZSByZWxhdGl2ZSBwYXRoIGZyb20gZGF0YSBhdHRyaWJ1dGVcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxVcmwgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7YmFzZVBhdGh9JHtyZWxhdGl2ZVVybH1gOyAvLyBDb25zdHJ1Y3QgZnVsbCBVUkxcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRGdWxsVXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KGZ1bGxVcmwpOyAvLyBFbmNvZGUgdGhlIGZ1bGwgVVJMXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYnV0dG9uLmRhdGFzZXQudGV4dCA/IGRlY29kZVVSSUNvbXBvbmVudChidXR0b24uZGF0YXNldC50ZXh0KSA6IGRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgY29uc3QgZW5jb2RlZFRleHQgPSBlbmNvZGVVUklDb21wb25lbnQodGV4dCk7XG4gICAgICAgICAgICBsZXQgc2hhcmVXaW5kb3dVcmwgPSAnJztcbiAgICAgICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd0d2l0dGVyJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7ZW5jb2RlZFRleHR9JnVybD0ke2VuY29kZWRGdWxsVXJsfWA7IC8vIFVzZSBlbmNvZGVkRnVsbFVybFxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAndHdpdHRlci1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTIzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFjZWJvb2snKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7ZW5jb2RlZEZ1bGxVcmx9YDsgLy8gVXNlIGVuY29kZWRGdWxsVXJsXG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdmYWNlYm9vay1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnbGlua2VkaW4nKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyaW5nL3NoYXJlLW9mZnNpdGUvP3VybD0ke2VuY29kZWRGdWxsVXJsfWA7IC8vIFVzZSBlbmNvZGVkRnVsbFVybFxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnbGlua2VkaW4tc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBibG9nQ2FyZDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQ29tbWVudHMgPSBpbml0aWFsaXplQ29tbWVudHM7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkgPSBpbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5O1xuLyoqXG4gKiBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIGJsb2cgcG9zdHNcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRzKCkge1xuICAgIHNldHVwQ29tbWVudFRvZ2dsZXMoKTtcbiAgICBzZXR1cENvbW1lbnRGb3JtcygpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIGEgc3BlY2lmaWMgYmxvZyBwb3N0IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eShwb3N0RWxlbWVudCkge1xuICAgIGNvbnN0IHRvZ2dsZSA9IHBvc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy10b2dnbGUnKTtcbiAgICBjb25zdCBmb3JtID0gcG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtZm9ybScpO1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgICAgc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSk7XG4gICAgfVxuICAgIGlmIChmb3JtKSB7XG4gICAgICAgIHNldHVwQ29tbWVudEZvcm0oZm9ybSk7XG4gICAgfVxufVxuLyoqXG4gKiBTZXQgdXAgY29tbWVudCB0b2dnbGUgYnV0dG9uc1xuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRUb2dnbGVzKCkge1xuICAgIGNvbnN0IGNvbW1lbnRUb2dnbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnRzLXRvZ2dsZScpO1xuICAgIGNvbW1lbnRUb2dnbGVzLmZvckVhY2godG9nZ2xlID0+IHtcbiAgICAgICAgc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSk7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBhIHNpbmdsZSBjb21tZW50IHRvZ2dsZSBidXR0b25cbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSkge1xuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgcG9zdElkID0gdG9nZ2xlLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3N0LWlkJyk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjb21tZW50cy0ke3Bvc3RJZH1gKTtcbiAgICAgICAgaWYgKGNvbW1lbnRzU2VjdGlvbikge1xuICAgICAgICAgICAgY29tbWVudHNTZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgLy8gQ2hhbmdlIGJ1dHRvbiB0ZXh0IGJhc2VkIG9uIHN0YXRlXG4gICAgICAgICAgICBpZiAoY29tbWVudHNTZWN0aW9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPiBIaWRlIENvbW1lbnRzIDxzcGFuIGNsYXNzPVwiY29tbWVudHMtY291bnRcIj4keyhfYSA9IHRvZ2dsZS5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY291bnQnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRleHRDb250ZW50fTwvc3Bhbj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS1jb21tZW50XCI+PC9pPiBDb21tZW50cyA8c3BhbiBjbGFzcz1cImNvbW1lbnRzLWNvdW50XCI+JHsoX2IgPSB0b2dnbGUucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvdW50JykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50ZXh0Q29udGVudH08L3NwYW4+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgY29tbWVudCBmb3Jtc1xuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRGb3JtcygpIHtcbiAgICBjb25zdCBjb21tZW50Rm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudC1mb3JtJyk7XG4gICAgY29tbWVudEZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICAgIHNldHVwQ29tbWVudEZvcm0oZm9ybSk7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBhIHNpbmdsZSBjb21tZW50IGZvcm1cbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50Rm9ybShmb3JtKSB7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAgICAgY29uc3QgY29tbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29tbWVudHMtJHtwb3N0SWR9IC5jb21tZW50cy1saXN0YCk7XG4gICAgICAgIGlmICghY29tbWVudHNDb250YWluZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgY29uc3QgY29tbWVudElucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwiY29tbWVudFwiXScpO1xuICAgICAgICAvLyBDaGVjayBpZiBpbnB1dHMgYXJlIG5vdCBlbXB0eVxuICAgICAgICBpZiAobmFtZUlucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycgfHwgY29tbWVudElucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhZGROZXdDb21tZW50KHBvc3RJZCwgY29tbWVudHNDb250YWluZXIsIG5hbWVJbnB1dC52YWx1ZSwgY29tbWVudElucHV0LnZhbHVlKTtcbiAgICAgICAgLy8gUmVzZXQgZm9ybVxuICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgfSk7XG59XG4vKipcbiAqIEFkZCBhIG5ldyBjb21tZW50IHRvIHRoZSBjb21tZW50cyBsaXN0XG4gKi9cbmZ1bmN0aW9uIGFkZE5ld0NvbW1lbnQocG9zdElkLCBjb21tZW50c0NvbnRhaW5lciwgbmFtZSwgY29tbWVudFRleHQpIHtcbiAgICAvLyBDcmVhdGUgbmV3IGNvbW1lbnRcbiAgICBjb25zdCBuZXdDb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3Q29tbWVudC5jbGFzc05hbWUgPSAnY29tbWVudCc7XG4gICAgLy8gR2V0IGN1cnJlbnQgZGF0ZVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IG5vdy50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgIGRheTogJ251bWVyaWMnXG4gICAgfSk7XG4gICAgLy8gQ29tbWVudCBIVE1MIHN0cnVjdHVyZVxuICAgIG5ld0NvbW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1hdmF0YXJcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtY29udGVudFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LWF1dGhvclwiPiR7bmFtZX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtdGV4dFwiPiR7Y29tbWVudFRleHR9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LWRhdGVcIj4ke2RhdGVTdHJ9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIC8vIFJlbW92ZSBcIm5vIGNvbW1lbnRzIHlldFwiIG1lc3NhZ2UgaWYgaXQgZXhpc3RzXG4gICAgY29uc3Qgbm9Db21tZW50cyA9IGNvbW1lbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5uby1jb21tZW50cycpO1xuICAgIGlmIChub0NvbW1lbnRzKSB7XG4gICAgICAgIGNvbW1lbnRzQ29udGFpbmVyLnJlbW92ZUNoaWxkKG5vQ29tbWVudHMpO1xuICAgIH1cbiAgICAvLyBBZGQgdGhlIG5ldyBjb21tZW50IHRvIHRoZSB0b3Agb2YgdGhlIGxpc3RcbiAgICBjb21tZW50c0NvbnRhaW5lci5pbnNlcnRCZWZvcmUobmV3Q29tbWVudCwgY29tbWVudHNDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgLy8gVXBkYXRlIGNvbW1lbnQgY291bnRcbiAgICB1cGRhdGVDb21tZW50Q291bnQocG9zdElkKTtcbn1cbi8qKlxuICogVXBkYXRlIHRoZSBjb21tZW50IGNvdW50IGZvciBhIHBvc3RcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQ29tbWVudENvdW50KHBvc3RJZCkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBjb3VudFNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBidXR0b25bZGF0YS1wb3N0LWlkPVwiJHtwb3N0SWR9XCJdIC5jb21tZW50cy1jb3VudGApO1xuICAgIGlmIChjb3VudFNwYW4pIHtcbiAgICAgICAgbGV0IGNvdW50ID0gcGFyc2VJbnQoKChfYSA9IGNvdW50U3Bhbi50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2UoL1soKV0vZywgJycpKSB8fCAnMCcpICsgMTtcbiAgICAgICAgY291bnRTcGFuLnRleHRDb250ZW50ID0gYCgke2NvdW50fSlgO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29udGFjdCBwb3B1cCBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVDb250YWN0Rm9ybSA9IGluaXRpYWxpemVDb250YWN0Rm9ybTtcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgY29udGFjdCBmb3JtIHBvcHVwXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDb250YWN0Rm9ybSgpIHtcbiAgICBjb25zdCBjb250YWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtYnRuJyk7XG4gICAgY29uc3QgY29udGFjdFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtcG9wdXAnKTtcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhY3QtcG9wdXAgLmNsb3NlLXBvcHVwJyk7XG4gICAgaWYgKCFjb250YWN0QnV0dG9uIHx8ICFjb250YWN0UG9wdXAgfHwgIWNsb3NlUG9wdXApIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDb250YWN0IGZvcm0gZWxlbWVudHMgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBPcGVuIHBvcHVwIHdoZW4gY29udGFjdCBidXR0b24gaXMgY2xpY2tlZFxuICAgIGNvbnRhY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgZGVmYXVsdCBhbmNob3IgYmVoYXZpb3JcbiAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nOyAvLyBQcmV2ZW50IHNjcm9sbGluZyB3aGlsZSBwb3B1cCBpcyBvcGVuXG4gICAgICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY29udGFjdCBsaW5rXG4gICAgICAgIGNvbnRhY3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2UgcG9wdXAgd2hlbiBjbG9zZSBidXR0b24gaXMgY2xpY2tlZFxuICAgIGNsb3NlUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgIH0pO1xuICAgIC8vIENsb3NlIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSB0aGUgcG9wdXAgY29udGVudFxuICAgIGNvbnRhY3RQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gY29udGFjdFBvcHVwKSB7XG4gICAgICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIENsb3NlIG9uIGVzY2FwZSBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBjb250YWN0UG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcbiAgICAgICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gU2V0IHVwIGNvbnRhY3QgZm9ybSBzdWJtaXNzaW9uXG4gICAgc2V0dXBDb250YWN0Rm9ybVN1Ym1pc3Npb24oKTtcbn1cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNldCB0aGUgZGVmYXVsdCBhY3RpdmUgbGluayBzdGF0ZVxuICovXG5mdW5jdGlvbiBzZXREZWZhdWx0QWN0aXZlTGluaygpIHtcbiAgICAvLyBHZXQgY3VycmVudCBoYXNoIG9yIGRlZmF1bHQgdG8gaG9tZVxuICAgIGNvbnN0IGN1cnJlbnRIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgJyNob21lJztcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIG5hdiBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBoYXNoIGxpbmtcbiAgICBjb25zdCBjdXJyZW50TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlciBuYXYgdWwgbGkgYVtocmVmPVwiJHtjdXJyZW50SGFzaH1cIl1gKTtcbiAgICBpZiAoY3VycmVudExpbmspIHtcbiAgICAgICAgY3VycmVudExpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuLyoqXG4gKiBIYW5kbGUgY29udGFjdCBmb3JtIHN1Ym1pc3Npb25cbiAqL1xuZnVuY3Rpb24gc2V0dXBDb250YWN0Rm9ybVN1Ym1pc3Npb24oKSB7XG4gICAgY29uc3QgY29udGFjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1mb3JtJyk7XG4gICAgaWYgKCFjb250YWN0Rm9ybSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnRhY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgY29uc3QgZW1haWxJbnB1dCA9IGNvbnRhY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJlbWFpbFwiXScpO1xuICAgICAgICBjb25zdCBtZXNzYWdlSW5wdXQgPSBjb250YWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwibWVzc2FnZVwiXScpO1xuICAgICAgICAvLyBTaW1wbGUgdmFsaWRhdGlvblxuICAgICAgICBpZiAoIW5hbWVJbnB1dC52YWx1ZS50cmltKCkgfHwgIWVtYWlsSW5wdXQudmFsdWUudHJpbSgpIHx8ICFtZXNzYWdlSW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICBzaG93Q29udGFjdEZvcm1NZXNzYWdlKCdQbGVhc2UgZmlsbCBvdXQgYWxsIGZpZWxkcycsICdlcnJvcicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhlcmUgeW91IHdvdWxkIHR5cGljYWxseSBzZW5kIHRoZSBmb3JtIGRhdGEgdG8gYSBzZXJ2ZXJcbiAgICAgICAgLy8gRm9yIG5vdywgd2UnbGwganVzdCBzaW11bGF0ZSBhIHN1Y2Nlc3NmdWwgc3VibWlzc2lvblxuICAgICAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgY29uc3Qgc3VibWl0QnRuID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKTtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxCdG5UZXh0ID0gc3VibWl0QnRuLmlubmVySFRNTDtcbiAgICAgICAgc3VibWl0QnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgc3VibWl0QnRuLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNwaW5uZXJcIj48L3NwYW4+IFNlbmRpbmcuLi4nO1xuICAgICAgICAvLyBTaW11bGF0ZSBzZXJ2ZXIgcmVxdWVzdFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIFJlc2V0IGZvcm0gYW5kIHNob3cgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICBjb250YWN0Rm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgc3VibWl0QnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBzdWJtaXRCdG4uaW5uZXJIVE1MID0gb3JpZ2luYWxCdG5UZXh0O1xuICAgICAgICAgICAgc2hvd0NvbnRhY3RGb3JtTWVzc2FnZSgnTWVzc2FnZSBzZW50IHN1Y2Nlc3NmdWxseSEgV2VcXCdsbCBnZXQgYmFjayB0byB5b3Ugc29vbi4nLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgLy8gQ2xvc2UgdGhlIHBvcHVwIGFmdGVyIGEgZGVsYXlcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LXBvcHVwJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhY3RQb3B1cCkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0sIDE1MDApO1xuICAgIH0pO1xufVxuLyoqXG4gKiBEaXNwbGF5IGEgbWVzc2FnZSBpbiB0aGUgY29udGFjdCBmb3JtXG4gKi9cbmZ1bmN0aW9uIHNob3dDb250YWN0Rm9ybU1lc3NhZ2UobWVzc2FnZSwgdHlwZSkge1xuICAgIGNvbnN0IGNvbnRhY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtZm9ybScpO1xuICAgIGlmICghY29udGFjdEZvcm0pXG4gICAgICAgIHJldHVybjtcbiAgICAvLyBSZW1vdmUgYW55IGV4aXN0aW5nIG1lc3NhZ2VcbiAgICBjb25zdCBleGlzdGluZ01lc3NhZ2UgPSBjb250YWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCcuZm9ybS1tZXNzYWdlJyk7XG4gICAgaWYgKGV4aXN0aW5nTWVzc2FnZSkge1xuICAgICAgICBleGlzdGluZ01lc3NhZ2UucmVtb3ZlKCk7XG4gICAgfVxuICAgIC8vIENyZWF0ZSBhbmQgYWRkIG5ldyBtZXNzYWdlXG4gICAgY29uc3QgbWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZXNzYWdlRWxlbWVudC5jbGFzc05hbWUgPSBgZm9ybS1tZXNzYWdlICR7dHlwZX1gO1xuICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICBjb250YWN0Rm9ybS5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudCk7XG4gICAgLy8gUmVtb3ZlIG1lc3NhZ2UgYWZ0ZXIgYSBmZXcgc2Vjb25kc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtZXNzYWdlRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9LCA1MDAwKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gRGFyayBtb2RlIGZ1bmN0aW9uYWxpdHlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZURhcmtNb2RlID0gaW5pdGlhbGl6ZURhcmtNb2RlO1xuZXhwb3J0cy5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSA9IGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlO1xuLyoqXG4gKiBJbml0aWFsaXplIGRhcmsgbW9kZSB0b2dnbGVcbiAqIFRoaXMgY3JlYXRlcyBhIGZsb2F0aW5nIGRhcmsgbW9kZSB0b2dnbGUgYnV0dG9uIGFuZCBhZGRzIGl0IHRvIHRoZSBET01cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZURhcmtNb2RlKCkge1xuICAgIC8vIENyZWF0ZSBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvblxuICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZGFya01vZGVUb2dnbGUuY2xhc3NOYW1lID0gJ2RhcmstbW9kZS10b2dnbGUnO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvblxuICAgIGRhcmtNb2RlVG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdUb2dnbGUgRGFyayBNb2RlJyk7XG4gICAgLy8gQ2hlY2sgaWYgZGFyayBtb2RlIHByZWZlcmVuY2UgaXMgYWxyZWFkeSBzZXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGNvbnN0IGlzRGFya01vZGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gJ3RydWUnO1xuICAgIGlmIChpc0RhcmtNb2RlKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICB9XG4gICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgZGFya01vZGVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVEYXJrTW9kZSk7XG4gICAgLy8gQWRkIGJ1dHRvbiB0byB0aGUgRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkYXJrTW9kZVRvZ2dsZSk7XG59XG4vKipcbiAqIFRvZ2dsZSBkYXJrIG1vZGUgb24gYW5kIG9mZlxuICovXG5mdW5jdGlvbiB0b2dnbGVEYXJrTW9kZSgpIHtcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrLW1vZGUnKTtcbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgLy8gVXBkYXRlIGljb24gYmFzZWQgb24gbW9kZVxuICAgIGlmIChkYXJrTW9kZVRvZ2dsZSkge1xuICAgICAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvbiBmb3IgbGlnaHQgbW9kZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLW1vb25cIj48L2k+JzsgLy8gTW9vbiBpY29uIGZvciBkYXJrIG1vZGVcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTYXZlIHByZWZlcmVuY2UgdG8gbG9jYWwgc3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsIGlzRGFya01vZGUudG9TdHJpbmcoKSk7XG59XG4vKipcbiAqIENoZWNrIGlmIHVzZXIgaGFzIHN5c3RlbSBkYXJrIG1vZGUgcHJlZmVyZW5jZVxuICogSWYgdGhleSBkbyBhbmQgd2UgaGF2ZW4ndCBzZXQgYSBwcmVmZXJlbmNlIHlldCwgYXBwbHkgZGFyayBtb2RlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKCkge1xuICAgIC8vIE9ubHkgY2hlY2sgaWYgdXNlciBoYXNuJ3QgZXhwbGljaXRseSBzZXQgYSBwcmVmZXJlbmNlXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrTW9kZScpID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHByZWZlcnNEYXJrTW9kZSA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICAgICAgaWYgKHByZWZlcnNEYXJrTW9kZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLW1vZGUnKTtcbiAgICAgICAgICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstbW9kZS10b2dnbGUnKTtcbiAgICAgICAgICAgIGlmIChkYXJrTW9kZVRvZ2dsZSkge1xuICAgICAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9jb21wb25lbnRzL2hlYWRlci50c1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZW5kZXJIZWFkZXIgPSByZW5kZXJIZWFkZXI7XG4vKipcbiAqIEhlYWRlciBDb21wb25lbnRcbiAqIFJlbmRlcnMgdGhlIGhlYWRlciBzZWN0aW9uIGludG8gYSB0YXJnZXQgY29udGFpbmVyLlxuICogQHBhcmFtIGNvbnRhaW5lcklkIC0gVGhlIElEIG9mIHRoZSBlbGVtZW50IHRvIHJlbmRlciB0aGUgaGVhZGVyIGludG8uIERlZmF1bHRzIHRvICdoZWFkZXItcGxhY2Vob2xkZXInLlxuICovXG5mdW5jdGlvbiByZW5kZXJIZWFkZXIoY29udGFpbmVySWQgPSAnaGVhZGVyLXBsYWNlaG9sZGVyJykge1xuICAgIC8vIEVuc3VyZSBydW5uaW5nIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudFxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRmluZCB0aGUgY29udGFpbmVyIGVsZW1lbnQgd2hlcmUgdGhlIGhlYWRlciBzaG91bGQgYmUgcGxhY2VkXG4gICAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVySWQpO1xuICAgIGlmICghaGVhZGVyQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEhlYWRlciBjb250YWluZXIgd2l0aCBJRCAnJHtjb250YWluZXJJZH0nIG5vdCBmb3VuZCBpbiB0aGUgRE9NLmApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIERlZmluZSB0aGUgaGVhZGVyIEhUTUwgc3RydWN0dXJlIC0gbWF0Y2hpbmcgaW5kZXguaHRtbFxuICAgIGhlYWRlckNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJzaXRlLWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPjxhIGhyZWY9XCIvXCI+QmxvZzwvYT48L2gxPlxuICAgICAgICAgICAgPG5hdj5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiL1wiPkhvbWU8L2E+PC9saT4gXG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiLyNhYm91dFwiIGlkPVwiYWJvdXQtYnRuXCI+QWJvdXQ8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvI3BvcnRmb2xpb1wiPlBvcnRmb2xpbzwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi8jY29udGFjdFwiIGlkPVwiY29udGFjdC1idG5cIj5Db250YWN0PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3IgYXJ0aWNsZXMuLi5cIiBjbGFzcz1cInNlYXJjaC1iYXJcIj4gXG4gICAgICAgIDwvaGVhZGVyPlxuICAgIGA7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogTmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZU5hdmlnYXRpb24gPSBpbml0aWFsaXplTmF2aWdhdGlvbjtcbi8qKlxuICogSW5pdGlhbGl6ZSBuYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZU5hdmlnYXRpb24oKSB7XG4gICAgc2V0QWN0aXZlTmF2TGluaygpO1xuICAgIHNldHVwTmF2TGlua3MoKTtcbn1cbi8qKlxuICogU2V0IGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmsgYmFzZWQgb24gY3VycmVudCBVUkwgb3IgcGFnZSBzZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIHNldEFjdGl2ZU5hdkxpbmsoKSB7XG4gICAgY29uc3QgY3VycmVudFBhdGggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoY3VycmVudFBhdGgpO1xufVxuLyoqXG4gKiBTZXR1cCBjbGljayBoYW5kbGVycyBmb3IgbmF2aWdhdGlvbiBsaW5rc1xuICovXG5mdW5jdGlvbiBzZXR1cE5hdkxpbmtzKCkge1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgaWYgKGhyZWYpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKGhyZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBIYW5kbGUgc3BlY2lhbCBjYXNlcyBmb3IgcG9wdXAgbGlua3NcbiAgICBjb25zdCBhYm91dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1idG4nKTtcbiAgICBjb25zdCBjb250YWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtYnRuJyk7XG4gICAgaWYgKGFib3V0QnRuKSB7XG4gICAgICAgIGFib3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlTmF2TGluaygnI2Fib3V0Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoY29udGFjdEJ0bikge1xuICAgICAgICBjb250YWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlTmF2TGluaygnI2NvbnRhY3QnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBVcGRhdGUgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmtcbiAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIG9yIHNlY3Rpb24gSUQgdG8gYWN0aXZhdGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQWN0aXZlTmF2TGluayhwYXRoKSB7XG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gbWF0Y2hpbmcgbGlua1xuICAgIGNvbnN0IGFjdGl2ZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXIgbmF2IHVsIGxpIGFbaHJlZj1cIiR7cGF0aH1cIl1gKTtcbiAgICBpZiAoYWN0aXZlTGluaykge1xuICAgICAgICBhY3RpdmVMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplUGFnaW5hdGlvbiA9IGluaXRpYWxpemVQYWdpbmF0aW9uO1xuLy8gUGFnaW5hdGlvbiBmdW5jdGlvbmFsaXR5XG5jb25zdCBjb21tZW50c18xID0gcmVxdWlyZShcIi4vY29tbWVudHNcIik7XG4vKipcbiAqIEluaXRpYWxpemUgcGFnaW5hdGlvbiBmdW5jdGlvbmFsaXR5IHdpdGggTG9hZCBNb3JlIGJ1dHRvblxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUGFnaW5hdGlvbigpIHtcbiAgICBjb25zdCBsb2FkTW9yZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLW1vcmUtYnRuJyk7XG4gICAgY29uc3QgaGlkZGVuUG9zdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLXBvc3RzJyk7XG4gICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZHMnKTtcbiAgICBpZiAoIWxvYWRNb3JlQnRuIHx8ICFoaWRkZW5Qb3N0cyB8fCAhYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUGFnaW5hdGlvbiBlbGVtZW50cyBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBjdXJyZW50UGFnZSA9IDE7XG4gICAgY29uc3QgcG9zdHNQZXJQYWdlID0gMztcbiAgICBjb25zdCB0b3RhbEhpZGRlblBvc3RzID0gaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIC8vIEhpZGUgbG9hZCBtb3JlIGJ1dHRvbiBpZiBubyBoaWRkZW4gcG9zdHNcbiAgICBpZiAodG90YWxIaWRkZW5Qb3N0cyA9PT0gMCkge1xuICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgICAvLyBTZXQgdXAgbG9hZCBtb3JlIGJ1dHRvbiBjbGljayBoYW5kbGVyXG4gICAgbG9hZE1vcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxvYWRNb3JlUG9zdHMobG9hZE1vcmVCdG4sIGhpZGRlblBvc3RzLCBibG9nQ2FyZHNDb250YWluZXIsIGN1cnJlbnRQYWdlLCBwb3N0c1BlclBhZ2UpO1xuICAgICAgICBjdXJyZW50UGFnZSsrO1xuICAgIH0pO1xuICAgIC8vIEluaXRpYWxpemUgc2Nyb2xsLWJhc2VkIGxvYWRpbmcgKGluZmluaXRlIHNjcm9sbClcbiAgICBpbml0aWFsaXplSW5maW5pdGVTY3JvbGwobG9hZE1vcmVCdG4pO1xufVxuLyoqXG4gKiBMb2FkIG1vcmUgcG9zdHMgd2hlbiB0aGUgbG9hZCBtb3JlIGJ1dHRvbiBpcyBjbGlja2VkXG4gKi9cbmZ1bmN0aW9uIGxvYWRNb3JlUG9zdHMobG9hZE1vcmVCdG4sIGhpZGRlblBvc3RzLCBibG9nQ2FyZHNDb250YWluZXIsIGN1cnJlbnRQYWdlLCBwb3N0c1BlclBhZ2UpIHtcbiAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJyk7XG4gICAgbG9hZE1vcmVCdG4uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic3Bpbm5lclwiPjwvc3Bhbj4gTG9hZGluZy4uLic7XG4gICAgLy8gU2ltdWxhdGUgbG9hZGluZyBkZWxheSBmb3IgYmV0dGVyIFVYXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBwb3N0cyB0byBsb2FkXG4gICAgICAgIGNvbnN0IHN0YXJ0SWR4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiBwb3N0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IGVuZElkeCA9IE1hdGgubWluKHN0YXJ0SWR4ICsgcG9zdHNQZXJQYWdlLCBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGgpO1xuICAgICAgICBsZXQgcG9zdHNMb2FkZWQgPSAwO1xuICAgICAgICAvLyBDbG9uZSBhbmQgbW92ZSBwb3N0cyBmcm9tIGhpZGRlbiBjb250YWluZXIgdG8gdmlzaWJsZSBibG9nIGNhcmRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zdHNQZXJQYWdlICYmIGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCA+IDA7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zdFRvQWRkID0gaGlkZGVuUG9zdHMuY2hpbGRyZW5bMF07IC8vIEFsd2F5cyB0YWtlIHRoZSBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgICBpZiAocG9zdFRvQWRkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmVkUG9zdCA9IHBvc3RUb0FkZC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgY2xvbmVkUG9zdC5jbGFzc0xpc3QuYWRkKCduZXcnKTsgLy8gQWRkIGNsYXNzIGZvciBhbmltYXRpb25cbiAgICAgICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVkUG9zdCk7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHMucmVtb3ZlQ2hpbGQocG9zdFRvQWRkKTtcbiAgICAgICAgICAgICAgICBwb3N0c0xvYWRlZCsrO1xuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIG5ldyBwb3N0c1xuICAgICAgICAgICAgICAgICgwLCBjb21tZW50c18xLmluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkpKGNsb25lZFBvc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIGlmIHdlJ3ZlIGxvYWRlZCBhbGwgcG9zdHNcbiAgICAgICAgaWYgKGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXNldCBidXR0b24gc3RhdGVcbiAgICAgICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAgICAgICBsb2FkTW9yZUJ0bi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT4gTG9hZCBNb3JlIFBvc3RzJztcbiAgICAgICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50IHdoZW4gcG9zdHMgYXJlIGxvYWRlZFxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgncG9zdHNMb2FkZWQnLCB7IGRldGFpbDogeyBjb3VudDogcG9zdHNMb2FkZWQgfSB9KTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSwgODAwKTsgLy8gU2ltdWxhdGUgbmV0d29yayBkZWxheVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGluZmluaXRlIHNjcm9sbCBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVJbmZpbml0ZVNjcm9sbChsb2FkTW9yZUJ0bikge1xuICAgIGxldCBzY3JvbGxUaW1lb3V0O1xuICAgIGxldCBpc0xvYWRpbmdNb3JlUG9zdHMgPSBmYWxzZTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAvLyBJZiB0aGUgYnV0dG9uIGlzIGhpZGRlbiAoYWxsIHBvc3RzIGxvYWRlZCkgb3IgYWxyZWFkeSBpbiBsb2FkaW5nIHN0YXRlLCBkbyBub3RoaW5nXG4gICAgICAgIGlmIChsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHxcbiAgICAgICAgICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5jb250YWlucygnbG9hZGluZycpIHx8XG4gICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVvdXQoc2Nyb2xsVGltZW91dCk7XG4gICAgICAgIHNjcm9sbFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0LCBjbGllbnRIZWlnaHQgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIC8vIFdoZW4gdXNlciBzY3JvbGxzIHRvIGJvdHRvbSAod2l0aCBzb21lIGJ1ZmZlcilcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgKyBjbGllbnRIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gMjAwKSB7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nTW9yZVBvc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJ0bi5jbGljaygpO1xuICAgICAgICAgICAgICAgIC8vIFJlc2V0IGZsYWcgYWZ0ZXIgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVTZWFyY2ggPSBpbml0aWFsaXplU2VhcmNoO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3QgYmxvZ0NhcmRzXzEgPSByZXF1aXJlKFwiLi9ibG9nQ2FyZHNcIik7XG5jb25zdCBjb21tZW50c18xID0gcmVxdWlyZShcIi4vY29tbWVudHNcIik7XG4vKipcbiAqIEluaXRpYWxpemUgc2VhcmNoIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNlYXJjaCgpIHtcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJzZWFyY2hcIl0nKTtcbiAgICBpZiAoIXNlYXJjaElucHV0KSB7XG4gICAgICAgIGNvbnNvbGUud2FybignU2VhcmNoIGlucHV0IG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQ3ljbGUgdGhyb3VnaCBkaWZmZXJlbnQgcGxhY2Vob2xkZXIgdGV4dHNcbiAgICBzZXR1cFBsYWNlaG9sZGVyQ3ljbGluZyhzZWFyY2hJbnB1dCk7XG4gICAgLy8gU2V0IHVwIHNlYXJjaCBpbnB1dCBldmVudCBoYW5kbGVyXG4gICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgICAgICBoYW5kbGVTZWFyY2goZS50YXJnZXQpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBDeWNsZSB0aHJvdWdoIGRpZmZlcmVudCBwbGFjZWhvbGRlciB0ZXh0cyBmb3IgdGhlIHNlYXJjaCBpbnB1dFxuICovXG5mdW5jdGlvbiBzZXR1cFBsYWNlaG9sZGVyQ3ljbGluZyhzZWFyY2hJbnB1dCkge1xuICAgIGNvbnN0IHBsYWNlaG9sZGVycyA9IFtcbiAgICAgICAgXCJTZWFyY2ggZm9yIGFydGljbGVzLi4uXCIsXG4gICAgICAgIFwiU2VhcmNoIGZvciB0b3BpY3MuLi5cIixcbiAgICAgICAgXCJTZWFyY2ggZm9yIGF1dGhvcnMuLi5cIlxuICAgIF07XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHNlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXJzW2luZGV4XTtcbiAgICAgICAgaW5kZXggPSAoaW5kZXggKyAxKSAlIHBsYWNlaG9sZGVycy5sZW5ndGg7XG4gICAgfSwgMzAwMCk7XG59XG4vKipcbiAqIEhhbmRsZSBzZWFyY2ggaW5wdXQgYW5kIGZpbHRlciBibG9nIHBvc3RzXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZVNlYXJjaChzZWFyY2hJbnB1dCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSBzZWFyY2hJbnB1dC52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHNlYXJjaFRlcm0ubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgLy8gSWYgc2VhcmNoIGlzIGNsZWFyZWQsIHJlbG9hZCBhbGwgcG9zdHNcbiAgICAgICAgICAgIGlmIChzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIERpc3BhdGNoIGV2ZW50IHRvIHJlbG9hZCBwb3N0c1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyZWxvYWRQb3N0cycpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZHMnKTtcbiAgICAgICAgaWYgKCFibG9nQ2FyZHNDb250YWluZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImxvYWRpbmctc3Bpbm5lclwiPjwvZGl2Pic7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGZXRjaCBhbGwgcG9zdHMgYW5kIGZpbHRlciBjbGllbnQtc2lkZVxuICAgICAgICAgICAgLy8gSW4gYSByZWFsIGFwcCwgeW91J2QgaW1wbGVtZW50IHNlcnZlci1zaWRlIHNlYXJjaFxuICAgICAgICAgICAgY29uc3QgcG9zdHMgPSB5aWVsZCAoMCwgYXBpXzEuZmV0Y2hCbG9nUG9zdHMpKCk7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZFBvc3RzID0gZmlsdGVyUG9zdHMocG9zdHMsIHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgLy8gQ2xlYXIgY29udGFpbmVyXG4gICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBpZiAoZmlsdGVyZWRQb3N0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBTaG93IGVtcHR5IHNlYXJjaCByZXN1bHRzXG4gICAgICAgICAgICAgICAgc2hvd0VtcHR5U2VhcmNoUmVzdWx0cyhibG9nQ2FyZHNDb250YWluZXIsIHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERpc3BsYXkgZmlsdGVyZWQgcG9zdHNcbiAgICAgICAgICAgIGRpc3BsYXlGaWx0ZXJlZFBvc3RzKGZpbHRlcmVkUG9zdHMsIGJsb2dDYXJkc0NvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZWFyY2hpbmcgcG9zdHM6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd1NlYXJjaEVycm9yKGJsb2dDYXJkc0NvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogRmlsdGVyIHBvc3RzIGJhc2VkIG9uIHNlYXJjaCB0ZXJtXG4gKi9cbmZ1bmN0aW9uIGZpbHRlclBvc3RzKHBvc3RzLCBzZWFyY2hUZXJtKSB7XG4gICAgcmV0dXJuIHBvc3RzLmZpbHRlcihwb3N0ID0+IHBvc3QudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtKSB8fFxuICAgICAgICBwb3N0LmNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtKSB8fFxuICAgICAgICBwb3N0LmF1dGhvci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pIHx8XG4gICAgICAgIChwb3N0LnRhZ3MgJiYgcG9zdC50YWdzLnNvbWUodGFnID0+IHRhZy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pKSkpO1xufVxuLyoqXG4gKiBEaXNwbGF5IGZpbHRlcmVkIHBvc3RzIGluIHRoZSBibG9nIGNvbnRhaW5lclxuICovXG5mdW5jdGlvbiBkaXNwbGF5RmlsdGVyZWRQb3N0cyhmaWx0ZXJlZFBvc3RzLCBjb250YWluZXIpIHtcbiAgICBmaWx0ZXJlZFBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgIGNvbnN0IGJsb2dDYXJkID0gKDAsIGJsb2dDYXJkc18xLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCkocG9zdCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChibG9nQ2FyZCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGZpbHRlcmVkIHBvc3RzXG4gICAgICAgICgwLCBjb21tZW50c18xLmluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkpKGJsb2dDYXJkKTtcbiAgICB9KTtcbiAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnQgd2hlbiBzZWFyY2ggcmVzdWx0cyBhcmUgZGlzcGxheWVkXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NlYXJjaFJlc3VsdHNEaXNwbGF5ZWQnLCB7XG4gICAgICAgIGRldGFpbDogeyBjb3VudDogZmlsdGVyZWRQb3N0cy5sZW5ndGggfVxuICAgIH0pKTtcbn1cbi8qKlxuICogRGlzcGxheSBlbXB0eSBzZWFyY2ggcmVzdWx0cyBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIHNob3dFbXB0eVNlYXJjaFJlc3VsdHMoY29udGFpbmVyLCBzZWFyY2hUZXJtKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVtcHR5LXNlYXJjaFwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2VhcmNoIGZhLTN4XCI+PC9pPlxuICAgICAgICAgICAgPGgzPk5vIHJlc3VsdHMgZm91bmQ8L2gzPlxuICAgICAgICAgICAgPHA+Tm8gcG9zdHMgbWF0Y2ggeW91ciBzZWFyY2ggZm9yIFwiJHtzZWFyY2hUZXJtfVwiPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuLyoqXG4gKiBEaXNwbGF5IHNlYXJjaCBlcnJvciBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIHNob3dTZWFyY2hFcnJvcihjb250YWluZXIpIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3Itc3RhdGVcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGZhLTN4XCI+PC9pPlxuICAgICAgICAgICAgPGgzPlNlYXJjaCBmYWlsZWQ8L2gzPlxuICAgICAgICAgICAgPHA+RmFpbGVkIHRvIHNlYXJjaCBibG9nIHBvc3RzLiBQbGVhc2UgdHJ5IGFnYWluLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVCbG9nRnJvbnRlbmQgPSBpbml0aWFsaXplQmxvZ0Zyb250ZW5kO1xuLyoqXG4gKiBCbG9nIEZyb250ZW5kIENvbnRyb2xsZXJcbiAqIENsaWVudC1zaWRlIGNvbnRyb2xsZXIgdGhhdCBoYW5kbGVzIGFsbCBmcm9udGVuZCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgYmxvZyBob21lcGFnZS5cbiAqIE1hbmFnZXMgVUkgaW5pdGlhbGl6YXRpb24sIHBvc3QgcmVuZGVyaW5nLCBhbmQgdXNlciBpbnRlcmFjdGlvbnMuXG4gKi9cbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTtcbmNvbnN0IGJsb2dDYXJkc18xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYmxvZ0NhcmRzXCIpO1xuLy8gQXNzdW1pbmcgaW5pdGlhbGl6ZUNvbW1lbnRzIGlzIG1lYW50IGZvciB0aGUgcG9zdCBkZXRhaWwgcGFnZSwgXG4vLyBpdCBtaWdodCBub3QgYmUgbmVlZGVkIGhlcmUgdW5sZXNzIGNhcmRzIGhhdmUgY29tbWVudCBwcmV2aWV3cy9pbnRlcmFjdGlvbnMuXG4vLyBpbXBvcnQgeyBpbml0aWFsaXplQ29tbWVudHMgfSBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1lbnRzJzsgXG5jb25zdCBjb250YWN0XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9jb250YWN0XCIpOyAvLyBIYW5kbGVzIGNvbnRhY3QgcG9wdXAgbG9naWNcbmNvbnN0IHBhZ2luYXRpb25fMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3BhZ2luYXRpb25cIik7IC8vIEhhbmRsZXMgbG9hZCBtb3JlIGxvZ2ljXG5jb25zdCBzZWFyY2hfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL3NlYXJjaFwiKTsgLy8gSGFuZGxlcyBzZWFyY2ggYmFyIGxvZ2ljXG5jb25zdCBhYm91dF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYWJvdXRcIik7IC8vIEhhbmRsZXMgYWJvdXQgcG9wdXAgbG9naWNcbmNvbnN0IG5hdmlnYXRpb25fMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL25hdmlnYXRpb25cIik7IC8vIEhhbmRsZXMgbmF2IGxpbmsgYWN0aXZlIHN0YXRlc1xuLy8gTm90ZTogRGFyayBtb2RlIGlzIGluaXRpYWxpemVkIGdsb2JhbGx5IGluIGNsaWVudC50cywgbm8gbmVlZCB0byBpbXBvcnQvY2FsbCBoZXJlIHR5cGljYWxseVxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBibG9nIGZyb250ZW5kIGZ1bmN0aW9uYWxpdHkgKGhvbWVwYWdlKVxuICogU2V0cyB1cCBhbGwgVUkgY29tcG9uZW50cyBhbmQgaW5pdGlhbGl6ZXMgdGhlIGJsb2cgcG9zdHMgZGlzcGxheS5cbiAqIEFzc3VtZXMgaGVhZGVyIGFuZCBkYXJrIG1vZGUgYXJlIGluaXRpYWxpemVkIGdsb2JhbGx5IGJlZm9yZSB0aGlzIHJ1bnMuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVCbG9nRnJvbnRlbmQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBCbG9nIEZyb250ZW5kIENvbnRyb2xsZXIuLi4nKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBuYXZpZ2F0aW9uIGFjdGl2ZSBzdGF0ZXNcbiAgICAgICAgKDAsIG5hdmlnYXRpb25fMS5pbml0aWFsaXplTmF2aWdhdGlvbikoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBpbnRlcmFjdGl2ZSBjb21wb25lbnRzIHNwZWNpZmljIHRvIHRoZSBtYWluIHBhZ2VcbiAgICAgICAgKDAsIGNvbnRhY3RfMS5pbml0aWFsaXplQ29udGFjdEZvcm0pKCk7IC8vIEFzc3VtZXMgI2NvbnRhY3QtYnRuIGFuZCAjY29udGFjdC1wb3B1cCBleGlzdFxuICAgICAgICAoMCwgYWJvdXRfMS5pbml0aWFsaXplQWJvdXQpKCk7IC8vIEFzc3VtZXMgI2Fib3V0LWJ0biBhbmQgI2Fib3V0LXBvcHVwIGV4aXN0XG4gICAgICAgICgwLCBzZWFyY2hfMS5pbml0aWFsaXplU2VhcmNoKSgpOyAvLyBBc3N1bWVzIC5zZWFyY2gtYmFyIGV4aXN0c1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBibG9nIHBvc3RzIGRpc3BsYXlcbiAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgcGFnaW5hdGlvbiBhZnRlciBwb3N0cyBhcmUgbG9hZGVkIGFuZCBjb250YWluZXJzIGV4aXN0XG4gICAgICAgICgwLCBwYWdpbmF0aW9uXzEuaW5pdGlhbGl6ZVBhZ2luYXRpb24pKCk7XG4gICAgICAgIC8vIElmIGNvbW1lbnRzIHByZXZpZXcvaW50ZXJhY3Rpb24gbmVlZGVkIG9uIGNhcmRzLCBpbml0aWFsaXplIGhlcmVcbiAgICAgICAgLy8gaW5pdGlhbGl6ZUNvbW1lbnRzKCk7IFxuICAgICAgICAvLyBTZXQgdXAgZXZlbnQgZGVsZWdhdGlvbiBmb3IgbmF2aWdhdGluZyB3aGVuIGNsaWNraW5nIGJsb2cgY2FyZHNcbiAgICAgICAgc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCk7XG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgcmVsb2FkaW5nIHBvc3RzICh1c2VkIGJ5IHNlYXJjaClcbiAgICAgICAgLy8gQ29uc2lkZXIgYWRkaW5nIGFuIG9wdGlvbiB0byByZW1vdmUgbGlzdGVuZXIgaWYgY29udHJvbGxlciBpcyBldmVyIFwiZGVzdHJveWVkXCJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVsb2FkUG9zdHMnLCBoYW5kbGVSZWxvYWRQb3N0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdCbG9nIEZyb250ZW5kIENvbnRyb2xsZXIgSW5pdGlhbGl6ZWQuJyk7XG4gICAgfSk7XG59XG4vKipcbiAqIEhhbmRsZXMgdGhlIGN1c3RvbSAncmVsb2FkUG9zdHMnIGV2ZW50LCB0eXBpY2FsbHkgdHJpZ2dlcmVkIGJ5IHNlYXJjaC5cbiAqL1xuZnVuY3Rpb24gaGFuZGxlUmVsb2FkUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlbG9hZGluZyBwb3N0cyBkdWUgdG8gcmVsb2FkUG9zdHMgZXZlbnQuLi4nKTtcbiAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgICgwLCBwYWdpbmF0aW9uXzEuaW5pdGlhbGl6ZVBhZ2luYXRpb24pKCk7XG4gICAgICAgIC8vIFJlLXNldHVwIGRlbGVnYXRpb24gaW4gY2FzZSBET00gZWxlbWVudHMgd2VyZSByZXBsYWNlZFxuICAgICAgICBzZXR1cEJsb2dDYXJkc0RlbGVnYXRpb24oKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGV2ZW50IGRlbGVnYXRpb24gZm9yIGJsb2cgY2FyZHMgY29udGFpbmVyXG4gKiBIYW5kbGVzIGNsaWNrcyBmb3IgbmF2aWdhdGlvbiwgcHJldmVudGluZyBjbGlja3Mgb24gaW50ZXJhY3RpdmUgZWxlbWVudHMuXG4gKi9cbmZ1bmN0aW9uIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpIHtcbiAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkcycpO1xuICAgIC8vIE5vdGU6IERlbGVnYXRpb24gb24gaGlkZGVuLXBvc3RzIG1pZ2h0IGJlIHVubmVjZXNzYXJ5IGlmIGNhcmRzIGFyZSBtb3ZlZCBvbiBsb2FkIG1vcmVcbiAgICAvLyBjb25zdCBoaWRkZW5Qb3N0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICBpZiAoYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lciBmaXJzdCB0byBwcmV2ZW50IGR1cGxpY2F0ZXMgaWYgY2FsbGVkIG11bHRpcGxlIHRpbWVzXG4gICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVCbG9nQ2FyZENsaWNrKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0V2ZW50IGRlbGVnYXRpb24gc2V0IHVwIGZvciAuYmxvZy1jYXJkcycpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDb3VsZCBub3QgZmluZCAuYmxvZy1jYXJkcyBjb250YWluZXIgZm9yIGRlbGVnYXRpb24uJyk7XG4gICAgfVxuICAgIC8vIGlmIChoaWRkZW5Qb3N0c0NvbnRhaW5lcikge1xuICAgIC8vICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgIC8vICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgIC8vIH1cbn1cbi8qKlxuICogSGFuZGxlIGNsaWNrIGV2ZW50cyBvbiBibG9nIGNhcmRzIHVzaW5nIGV2ZW50IGRlbGVnYXRpb25cbiAqL1xuZnVuY3Rpb24gaGFuZGxlQmxvZ0NhcmRDbGljayhldmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBjYXJkID0gdGFyZ2V0LmNsb3Nlc3QoJy5ibG9nLWNhcmQnKTsgLy8gVHlwZSBhc3NlcnRpb25cbiAgICBpZiAoY2FyZCkge1xuICAgICAgICAvLyBQcmV2ZW50IG5hdmlnYXRpb24gaWYgdGhlIGNsaWNrIG9yaWdpbmF0ZWQgb24gYSBidXR0b24sIGxpbmssIG9yIGljb24gd2l0aGluIHRoZSBjYXJkXG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBhLCBpJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDbGlja2VkIGludGVyYWN0aXZlIGVsZW1lbnQgaW5zaWRlIGNhcmQsIHByZXZlbnRpbmcgbmF2aWdhdGlvbi4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwb3N0SWQgPSBjYXJkLmRhdGFzZXQucG9zdElkOyAvLyBVc2UgZGF0YXNldCBwcm9wZXJ0eVxuICAgICAgICBpZiAocG9zdElkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTmF2aWdhdGluZyB0byBwb3N0ICR7cG9zdElkfWApO1xuICAgICAgICAgICAgLy8gVXNlIHJlbGF0aXZlIHBhdGggZm9yIG5hdmlnYXRpb25cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHBvc3QuaHRtbD9pZD0ke3Bvc3RJZH1gO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGJsb2cgcG9zdHMgZnJvbSBBUElcbiAqIEZldGNoZXMgcG9zdHMgZnJvbSB0aGUgQVBJIGFuZCByZW5kZXJzIHRoZW0gaW4gdGhlIFVJXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBVc2UgbW9yZSBzcGVjaWZpYyBzZWxlY3RvciBpZiBwb3NzaWJsZSwgZS5nLiwgI2Jsb2dcbiAgICAgICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cuYmxvZy1jYXJkcycpO1xuICAgICAgICBpZiAoIWJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQmxvZyBjYXJkcyBjb250YWluZXIgKCNibG9nLmJsb2ctY2FyZHMpIG5vdCBmb3VuZCBpbiB0aGUgRE9NLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImxvYWRpbmctc3Bpbm5lclwiPjwvZGl2PjxwPkxvYWRpbmcgcG9zdHMuLi48L3A+JztcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciA/dGFnPS4uLiBxdWVyeSBwYXJhbWV0ZXJcbiAgICAgICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICBjb25zdCB0YWdGaWx0ZXIgPSB1cmxQYXJhbXMuZ2V0KCd0YWcnKTtcbiAgICAgICAgICAgIC8vIEZldGNoIHBvc3RzIHVzaW5nIHRoZSBmdW5jdGlvbiBmcm9tIGFwaS50cyAod2hpY2ggZmV0Y2hlcyBzdGF0aWMganNvbilcbiAgICAgICAgICAgIGxldCBwb3N0cyA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaEJsb2dQb3N0cykoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGVkICR7cG9zdHMubGVuZ3RofSBwb3N0cy5gKTtcbiAgICAgICAgICAgIC8vIEZpbHRlciBwb3N0cyBieSB0YWcgaWYgdGhlIHF1ZXJ5IHBhcmFtZXRlciBpcyBwcmVzZW50XG4gICAgICAgICAgICBpZiAodGFnRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgcG9zdHMgPSBwb3N0cy5maWx0ZXIocG9zdCA9PiBwb3N0LnRhZ3MuaW5jbHVkZXModGFnRmlsdGVyKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZpbHRlcmVkIHBvc3RzIGJ5IHRhZyAnJHt0YWdGaWx0ZXJ9JzogJHtwb3N0cy5sZW5ndGh9IHBvc3RzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2xlYXIgbG9hZGluZyBzdGF0ZVxuICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgaWYgKHBvc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNob3dFbXB0eVN0YXRlKGJsb2dDYXJkc0NvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGlzcGxheSBpbml0aWFsIHBvc3RzIChlLmcuLCBmaXJzdCAzIG9yIDYpXG4gICAgICAgICAgICBjb25zdCBpbml0aWFsUG9zdENvdW50ID0gNjsgLy8gT3IgYWRqdXN0IGFzIG5lZWRlZFxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVBvc3RzID0gcG9zdHMuc2xpY2UoMCwgaW5pdGlhbFBvc3RDb3VudCk7XG4gICAgICAgICAgICBjb25zdCBoaWRkZW5Qb3N0cyA9IHBvc3RzLnNsaWNlKGluaXRpYWxQb3N0Q291bnQpO1xuICAgICAgICAgICAgLy8gQWRkIHZpc2libGUgcG9zdHMgdG8gbWFpbiBjb250YWluZXJcbiAgICAgICAgICAgIGRpc3BsYXlQb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2dDYXJkID0gKDAsIGJsb2dDYXJkc18xLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCkocG9zdCk7XG4gICAgICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gQWRkIHJlbWFpbmluZyBwb3N0cyB0byBoaWRkZW4gY29udGFpbmVyIGZvciBwYWdpbmF0aW9uXG4gICAgICAgICAgICBjb25zdCBoaWRkZW5Qb3N0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICAgICAgICAgIGlmIChoaWRkZW5Qb3N0c0NvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGhpZGRlblBvc3RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnOyAvLyBDbGVhciBwcmV2aW91cyBoaWRkZW4gcG9zdHNcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9nQ2FyZCA9ICgwLCBibG9nQ2FyZHNfMS5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQpKHBvc3QpO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChibG9nQ2FyZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7aGlkZGVuUG9zdHMubGVuZ3RofSBwb3N0cyBhZGRlZCB0byBoaWRkZW4gY29udGFpbmVyLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlIGxvYWQgbW9yZSBidXR0b24gdmlzaWJpbGl0eVxuICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgICAgICAgICAgaWYgKGxvYWRNb3JlQnRuKSB7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9IGhpZGRlblBvc3RzLmxlbmd0aCA+IDAgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW5pdGlhbGl6aW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvclN0YXRlKGJsb2dDYXJkc0NvbnRhaW5lcik7IC8vIFNob3cgZXJyb3Igc3RhdGUgaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFNob3cgZW1wdHkgc3RhdGUgd2hlbiBubyBwb3N0cyBhcmUgYXZhaWxhYmxlXG4gKi9cbmZ1bmN0aW9uIHNob3dFbXB0eVN0YXRlKGNvbnRhaW5lcikge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJzsgLy8gQ2xlYXIgY29udGFpbmVyXG4gICAgY29uc3QgZW1wdHlTdGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVtcHR5U3RhdGVEaXYuY2xhc3NOYW1lID0gJ2VtcHR5LXN0YXRlJzsgLy8gQWRkIGNsYXNzIGZvciBzdHlsaW5nXG4gICAgZW1wdHlTdGF0ZURpdi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpbGUtYWx0IGZhLTN4XCI+PC9pPlxuICAgICAgICA8aDM+Tm8gcG9zdHMgZm91bmQ8L2gzPlxuICAgICAgICA8cD5DaGVjayBiYWNrIGxhdGVyIGZvciBuZXcgY29udGVudCE8L3A+IFxuICAgIGA7IC8vIEV4YW1wbGUgY29udGVudFxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbXB0eVN0YXRlRGl2KTtcbiAgICBjb25zb2xlLmxvZygnRGlzcGxheWVkIGVtcHR5IHN0YXRlIGZvciBwb3N0cy4nKTtcbn1cbi8qKlxuICogU2hvdyBlcnJvciBzdGF0ZSB3aGVuIHBvc3RzIGNvdWxkbid0IGJlIGxvYWRlZFxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JTdGF0ZShjb250YWluZXIpIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIGNvbnRhaW5lclxuICAgIGNvbnN0IGVycm9yU3RhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlcnJvclN0YXRlRGl2LmNsYXNzTmFtZSA9ICdlcnJvci1zdGF0ZSc7IC8vIEFkZCBjbGFzcyBmb3Igc3R5bGluZ1xuICAgIGVycm9yU3RhdGVEaXYuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBmYS0zeFwiPjwvaT5cbiAgICAgICAgPGgzPlNvbWV0aGluZyB3ZW50IHdyb25nPC9oMz5cbiAgICAgICAgPHA+RmFpbGVkIHRvIGxvYWQgYmxvZyBwb3N0cy4gUGxlYXNlIHRyeSByZWZyZXNoaW5nIHRoZSBwYWdlLjwvcD5cbiAgICBgOyAvLyBFeGFtcGxlIGNvbnRlbnRcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZXJyb3JTdGF0ZURpdik7XG4gICAgY29uc29sZS5sb2coJ0Rpc3BsYXllZCBlcnJvciBzdGF0ZSBmb3IgcG9zdHMuJyk7XG59XG4vLyBSRU1PVkVEOiBMb2NhbCBkZWZpbml0aW9ucyBhbmQgY2FsbHMgZm9yIHNldHVwU2VhcmNoIGFuZCBzZXR1cFBvcHVwQnV0dG9uc1xuLy8gRnVuY3Rpb25hbGl0eSBpcyBub3cgaGFuZGxlZCBieSB0aGUgaW1wb3J0ZWQgaW5pdGlhbGl6ZVNlYXJjaCwgaW5pdGlhbGl6ZUFib3V0LCBpbml0aWFsaXplQ29udGFjdEZvcm1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2VudHJpZXMvY2xpZW50LnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIEltcG9ydHMgcmVtYWluIHRoZSBzYW1lLi4uXG5jb25zdCBibG9nRnJvbnRlbmRDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvYmxvZ0Zyb250ZW5kQ29udHJvbGxlclwiKTtcbmNvbnN0IHBvc3REZXRhaWxfMSA9IHJlcXVpcmUoXCIuLi9tb2R1bGVzL3Bvc3REZXRhaWxcIik7XG5jb25zdCBoZWFkZXJfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2hlYWRlclwiKTtcbmNvbnN0IGRhcmtNb2RlXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXJrTW9kZVwiKTtcbi8qKlxuICogQ2xpZW50LXNpZGUgZW50cnkgcG9pbnQgaW5pdGlhbGl6ZXIuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDbGllbnQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWVudCBpbml0aWFsaXppbmcuLi4nKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tb24gZWxlbWVudHMgZmlyc3RcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKSgpO1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuaW5pdGlhbGl6ZURhcmtNb2RlKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RhcmsgbW9kZSBpbml0aWFsaXplZCBnbG9iYWxseS4nKTtcbiAgICAgICAgICAgIC8vIFJlbmRlciBIZWFkZXIgb25seSBpZiBwbGFjZWhvbGRlciBleGlzdHNcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyLXBsYWNlaG9sZGVyJykpIHtcbiAgICAgICAgICAgICAgICAoMCwgaGVhZGVyXzEucmVuZGVySGVhZGVyKSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWFkZXIgcmVuZGVyZWQgZ2xvYmFsbHkuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0hlYWRlciBwbGFjZWhvbGRlciBub3QgZm91bmQgb24gdGhpcyBwYWdlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBjb21tb24gZWxlbWVudHM6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYWdlLXNwZWNpZmljIGxvZ2ljXG4gICAgICAgIGNvbnN0IHBhZ2VUeXBlID0gZG9jdW1lbnQuYm9keS5kYXRhc2V0LnBhZ2U7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICAvLyBHZXQgdGhlIGJhc2UgbmFtZSBvZiB0aGUgZmlsZS9wYXRoLCByZW1vdmluZyB0cmFpbGluZyBzbGFzaCBpZiBwcmVzZW50XG4gICAgICAgIGNvbnN0IHBhdGhFbmQgPSBjdXJyZW50UGFnZS5lbmRzV2l0aCgnLycpID8gY3VycmVudFBhZ2Uuc2xpY2UoMCwgLTEpLnNwbGl0KCcvJykucG9wKCkgOiBjdXJyZW50UGFnZS5zcGxpdCgnLycpLnBvcCgpO1xuICAgICAgICBjb25zdCBpc1Jvb3RPckluZGV4ID0gY3VycmVudFBhZ2UuZW5kc1dpdGgoJy8nKSB8fCBjdXJyZW50UGFnZS5lbmRzV2l0aCgnL2luZGV4Lmh0bWwnKTsgLy8gQ2hlY2sgaWYgaXQncyB0aGUgcm9vdCBvZiB0aGUgZGVwbG95bWVudFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERldGVjdGVkIHBhZ2VUeXBlOiAke3BhZ2VUeXBlfSwgY3VycmVudFBhZ2U6ICR7Y3VycmVudFBhZ2V9LCBwYXRoRW5kOiAke3BhdGhFbmR9LCBpc1Jvb3RPckluZGV4OiAke2lzUm9vdE9ySW5kZXh9YCk7XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgTWFpbiBQYWdlICh1c2luZyBkYXRhLXBhZ2Ugb3IgcGF0aCBlbmRpbmcgaW4gLyBvciAvaW5kZXguaHRtbClcbiAgICAgICAgICAgIGlmIChwYWdlVHlwZSA9PT0gJ21haW4nIHx8ICghcGFnZVR5cGUgJiYgaXNSb290T3JJbmRleCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIG1haW4gYmxvZyBwYWdlIGxvZ2ljLi4uJyk7XG4gICAgICAgICAgICAgICAgeWllbGQgKDAsIGJsb2dGcm9udGVuZENvbnRyb2xsZXJfMS5pbml0aWFsaXplQmxvZ0Zyb250ZW5kKSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNYWluIGJsb2cgcGFnZSBsb2dpYyBpbml0aWFsaXplZC4nKTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgUG9zdCBEZXRhaWwgUGFnZSAodXNpbmcgZGF0YS1wYWdlIG9yIHBhdGggZW5kaW5nIGluIC9wb3N0Lmh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ3Bvc3QnIHx8ICghcGFnZVR5cGUgJiYgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9wb3N0Lmh0bWwnKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIHBvc3QgZGV0YWlsIHBhZ2UgbG9naWMgKGZyb20gbW9kdWxlKS4uLicpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBwb3N0RGV0YWlsXzEuaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMpKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGV0YWlsIHBhZ2UgbG9naWMgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIEFkbWluIFBhZ2UgKHVzaW5nIGRhdGEtcGFnZSBvciBwYXRoIGVuZGluZyBpbiAvYWRtaW4uaHRtbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhZ2VUeXBlID09PSAnYWRtaW4nIHx8ICghcGFnZVR5cGUgJiYgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9hZG1pbi5odG1sJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FkbWluIHBhZ2UgZGV0ZWN0ZWQgYnkgY2xpZW50LnRzIC0gbm8gYWN0aW9uIHRha2VuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVua25vd24gcGFnZSB0eXBlICgnJHtwYWdlVHlwZX0nKSBvciBwYXRoICgnJHtjdXJyZW50UGFnZX0nKS4gTm8gc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbmVlZGVkIGZyb20gY2xpZW50LnRzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHBhZ2Utc3BlY2lmaWMgY2xpZW50IGluaXRpYWxpemF0aW9uOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gRE9NQ29udGVudExvYWRlZCBsaXN0ZW5lciByZW1haW5zIHRoZSBzYW1lLi4uXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRpYWxpemVDbGllbnQpO1xufVxuZWxzZSB7XG4gICAgaW5pdGlhbGl6ZUNsaWVudCgpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvbW9kdWxlcy9wb3N0RGV0YWlsLnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uID0gZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uO1xuZXhwb3J0cy5hZGRQb3N0VG9TZXNzaW9uTGlrZXMgPSBhZGRQb3N0VG9TZXNzaW9uTGlrZXM7XG5leHBvcnRzLnJlbW92ZVBvc3RGcm9tU2Vzc2lvbkxpa2VzID0gcmVtb3ZlUG9zdEZyb21TZXNzaW9uTGlrZXM7XG5leHBvcnRzLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljID0gaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWM7XG5leHBvcnRzLmxvYWRQb3N0Q29udGVudCA9IGxvYWRQb3N0Q29udGVudDtcbmV4cG9ydHMudXBkYXRlUG9zdFVJID0gdXBkYXRlUG9zdFVJO1xuZXhwb3J0cy51cGRhdGVQYWdlTWV0YWRhdGEgPSB1cGRhdGVQYWdlTWV0YWRhdGE7XG5leHBvcnRzLmluaXRpYWxpemVTb2NpYWxTaGFyaW5nID0gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmc7XG5leHBvcnRzLnNob3dFcnJvck1lc3NhZ2UgPSBzaG93RXJyb3JNZXNzYWdlO1xuZXhwb3J0cy5pbml0aWFsaXplTGlrZUJ1dHRvbiA9IGluaXRpYWxpemVMaWtlQnV0dG9uO1xuZXhwb3J0cy5sb2FkQ29tbWVudHMgPSBsb2FkQ29tbWVudHM7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50Rm9ybSA9IGluaXRpYWxpemVDb21tZW50Rm9ybTtcbi8vIC0tLSBJbXBvcnRzIC0tLVxuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3QgdXJsVHJhbnNmb3JtZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlscy91cmxUcmFuc2Zvcm1lclwiKTtcbmNvbnN0IGhlYWRlcl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaGVhZGVyXCIpO1xuY29uc3QgZGFya01vZGVfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2RhcmtNb2RlXCIpO1xuLy8gUGxhY2Vob2xkZXIgQVBJIGZ1bmN0aW9ucyBmb3IgY29tbWVudHMgKHJlcGxhY2Ugd2l0aCBhY3R1YWwgaW1wbGVtZW50YXRpb24pXG5jb25zdCBmZXRjaENvbW1lbnRzQXBpID0gKGlkKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zb2xlLmxvZyhgQVBJOiBGZXRjaGluZyBjb21tZW50cyBmb3IgJHtpZH1gKTtcbiAgICByZXR1cm4gW1xuICAgICAgICB7IGlkOiAxLCBuYW1lOiAnQWxpY2UnLCBjb21tZW50OiAnR3JlYXQgcG9zdCEnLCBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkgfSxcbiAgICAgICAgeyBpZDogMiwgbmFtZTogJ0JvYicsIGNvbW1lbnQ6ICdWZXJ5IGluZm9ybWF0aXZlLicsIGNyZWF0ZWRBdDogbmV3IERhdGUoKSB9XG4gICAgXTtcbn0pO1xuY29uc3Qgc3VibWl0Q29tbWVudEFwaSA9IChpZCwgbmFtZSwgY29tbWVudCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc29sZS5sb2coYEFQSTogU3VibWl0dGluZyBjb21tZW50IGZvciAke2lkfWAsIHsgbmFtZSwgY29tbWVudCB9KTtcbiAgICByZXR1cm4geyBpZDogRGF0ZS5ub3coKSwgbmFtZSwgY29tbWVudCwgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpIH07XG59KTtcbi8vIC0tLSBTZXNzaW9uIFN0b3JhZ2UgSGVscGVyIEZ1bmN0aW9ucyBmb3IgTGlrZXMgLS0tXG5jb25zdCBMSUtFRF9QT1NUU19TRVNTSU9OX0tFWSA9ICdsaWtlZFBvc3RzJztcbi8qKiBHZXRzIHRoZSBzZXQgb2YgbGlrZWQgcG9zdCBJRHMgZnJvbSBzZXNzaW9uU3RvcmFnZS4gKi9cbmZ1bmN0aW9uIGdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbigpIHtcbiAgICBjb25zdCBzdG9yZWRMaWtlcyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oTElLRURfUE9TVFNfU0VTU0lPTl9LRVkpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGxpa2VkSWRzID0gc3RvcmVkTGlrZXMgPyBKU09OLnBhcnNlKHN0b3JlZExpa2VzKSA6IFtdO1xuICAgICAgICByZXR1cm4gbmV3IFNldChBcnJheS5pc0FycmF5KGxpa2VkSWRzKSA/IGxpa2VkSWRzIDogW10pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBsaWtlZCBwb3N0cyBmcm9tIHNlc3Npb25TdG9yYWdlOlwiLCBlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG59XG4vKiogQWRkcyBhIHBvc3QgSUQgdG8gdGhlIGxpa2VkIHBvc3RzIGluIHNlc3Npb25TdG9yYWdlLiAqL1xuZnVuY3Rpb24gYWRkUG9zdFRvU2Vzc2lvbkxpa2VzKHBvc3RJZCkge1xuICAgIGNvbnN0IGxpa2VkUG9zdHNTZXQgPSBnZXRMaWtlZFBvc3RzRnJvbVNlc3Npb24oKTtcbiAgICBsaWtlZFBvc3RzU2V0LmFkZChwb3N0SWQpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oTElLRURfUE9TVFNfU0VTU0lPTl9LRVksIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20obGlrZWRQb3N0c1NldCkpKTtcbiAgICBjb25zb2xlLmxvZygnQWRkZWQgcG9zdCB0byBzZXNzaW9uIGxpa2VzOicsIHBvc3RJZCwgQXJyYXkuZnJvbShsaWtlZFBvc3RzU2V0KSk7XG59XG4vKiogUmVtb3ZlcyBhIHBvc3QgSUQgZnJvbSB0aGUgbGlrZWQgcG9zdHMgaW4gc2Vzc2lvblN0b3JhZ2UuICovXG5mdW5jdGlvbiByZW1vdmVQb3N0RnJvbVNlc3Npb25MaWtlcyhwb3N0SWQpIHtcbiAgICBjb25zdCBsaWtlZFBvc3RzU2V0ID0gZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uKCk7XG4gICAgbGlrZWRQb3N0c1NldC5kZWxldGUocG9zdElkKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKExJS0VEX1BPU1RTX1NFU1NJT05fS0VZLCBKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKGxpa2VkUG9zdHNTZXQpKSk7XG4gICAgY29uc29sZS5sb2coJ1JlbW92ZWQgcG9zdCBmcm9tIHNlc3Npb24gbGlrZXM6JywgcG9zdElkLCBBcnJheS5mcm9tKGxpa2VkUG9zdHNTZXQpKTtcbn1cbi8vIC0tLSBDb3JlIEluaXRpYWxpemF0aW9uIEZ1bmN0aW9uIC0tLVxuLyoqXG4gKiBJbml0aWFsaXplcyBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHBvc3QgZGV0YWlsIHBhZ2UuXG4gKiBUaGlzIGlzIHRoZSBtYWluIGV4cG9ydGVkIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCBieSB0aGUgZW50cnkgcG9pbnQuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgcG9zdCBkZXRhaWwgcGFnZS4uLicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UpKCk7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGFyayBtb2RlIGluaXRpYWxpemVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgaGVhZGVyXzEucmVuZGVySGVhZGVyKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0hlYWRlciByZW5kZXJlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSB1cmxQYXJhbXMuZ2V0KCdpZCcpO1xuICAgICAgICBpZiAocG9zdElkKSB7XG4gICAgICAgICAgICB5aWVsZCBsb2FkUG9zdENvbnRlbnQocG9zdElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHBvc3QgSUQgcHJvdmlkZWQgaW4gdGhlIFVSTCcpO1xuICAgICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZSgnTm8gcG9zdCBzcGVjaWZpZWQuIFBsZWFzZSBjaGVjayB0aGUgVVJMLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRldGFpbCBwYWdlIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlLicpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBMb2FkIGFuZCBkaXNwbGF5IHBvc3QgY29udGVudCBiYXNlZCBvbiBwb3N0IElEXG4gKi9cbmZ1bmN0aW9uIGxvYWRQb3N0Q29udGVudChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEZldGNoaW5nIHBvc3Qgd2l0aCBJRDogJHtwb3N0SWR9YCk7XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0geWllbGQgKDAsIGFwaV8xLmZldGNoUG9zdEJ5SWQpKHBvc3RJZCk7XG4gICAgICAgICAgICBpZiAoIXBvc3QpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQb3N0IHdpdGggSUQgJHtwb3N0SWR9IG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGF0YSBmZXRjaGVkOicsIHBvc3QpO1xuICAgICAgICAgICAgdXBkYXRlUG9zdFVJKHBvc3QpO1xuICAgICAgICAgICAgdXBkYXRlUGFnZU1ldGFkYXRhKHBvc3QpO1xuICAgICAgICAgICAgaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcocG9zdCk7XG4gICAgICAgICAgICBpbml0aWFsaXplTGlrZUJ1dHRvbihwb3N0KTtcbiAgICAgICAgICAgIGluaXRpYWxpemVDb21tZW50Rm9ybShwb3N0LmlkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgeWllbGQgbG9hZENvbW1lbnRzKHBvc3QuaWQudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHBvc3QgY29udGVudDonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93RXJyb3JNZXNzYWdlKGBGYWlsZWQgdG8gbG9hZCB0aGUgYmxvZyBwb3N0LiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1BsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJ31gKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBVcGRhdGUgdGhlIHBvc3QgVUkgd2l0aCBjb250ZW50IGZyb20gdGhlIGxvYWRlZCBwb3N0XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBvc3RVSShwb3N0KSB7XG4gICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIFBvc3QgVUkgZm9yOicsIHBvc3QudGl0bGUpO1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDYW5ub3QgdXBkYXRlIFVJOiAjcG9zdC1jb250ZW50IGVsZW1lbnQgbm90IGZvdW5kLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENvbnN0cnVjdCB0aGUgaW5uZXIgSFRNTCBkeW5hbWljYWxseVxuICAgIHBvc3RBcnRpY2xlRWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPiR7cG9zdC50aXRsZX08L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtbWV0YVwiPlxuICAgICAgICAgICAgICAgIDx0aW1lIGRhdGV0aW1lPVwiJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gOiAnJ31cIj5cbiAgICAgICAgICAgICAgICAgICAgJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnIH0pIDogJ0RhdGUgdW5rbm93bid9XG4gICAgICAgICAgICAgICAgPC90aW1lPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yXCI+YnkgJHtwb3N0LmF1dGhvciB8fCAnQW5vbnltb3VzJ308L3NwYW4+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibGlrZS1idXR0b25cIiBkYXRhLXBvc3QtaWQ9XCIke3Bvc3QuaWR9XCIgYXJpYS1sYWJlbD1cIkxpa2UgdGhpcyBwb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWhlYXJ0XCI+PC9pPiBcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsaWtlLWNvdW50XCI+JHtwb3N0Lmxpa2VzIHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgJHtwb3N0LmltYWdlVXJsID8gYDxpbWcgc3JjPVwiJHtwb3N0LmltYWdlVXJsfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIiBjbGFzcz1cImZlYXR1cmVkLWltYWdlXCI+YCA6ICcnfVxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWNvbnRlbnQtYm9keVwiPlxuICAgICAgICAgICAgJHtwb3N0LmNvbnRlbnR9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWZvb3RlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3NcIj5cbiAgICAgICAgICAgICAgICAke3Bvc3QudGFncyAmJiBwb3N0LnRhZ3MubGVuZ3RoID4gMCA/IGA8c3Bhbj5UYWdzOjwvc3Bhbj4gJHtwb3N0LnRhZ3MubWFwKHRhZyA9PiBgPGEgaHJlZj1cIi9pbmRleC5odG1sP3RhZz0ke2VuY29kZVVSSUNvbXBvbmVudCgoMCwgdXJsVHJhbnNmb3JtZXJfMS50cmFuc2Zvcm1UYWdUb1VybEZvcm1hdCkodGFnKSl9XCI+JHt0YWd9PC9hPmApLmpvaW4oJycpfWAgOiAnJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvY2lhbC1zaGFyaW5nXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+U2hhcmU6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gdHdpdHRlclwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBUd2l0dGVyXCI+PGkgY2xhc3M9XCJmYWIgZmEtdHdpdHRlclwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGZhY2Vib29rXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIEZhY2Vib29rXCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2stZlwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGxpbmtlZGluXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIExpbmtlZEluXCI+PGkgY2xhc3M9XCJmYWIgZmEtbGlua2VkaW4taW5cIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJjb21tZW50cy1zZWN0aW9uXCIgY2xhc3M9XCJjb21tZW50cy1zZWN0aW9uXCIgYXJpYS1sYWJlbGxlZGJ5PVwiY29tbWVudHMtaGVhZGluZ1wiPlxuICAgICAgICAgICAgIDxoMiBpZD1cImNvbW1lbnRzLWhlYWRpbmdcIj5Db21tZW50czwvaDI+XG4gICAgICAgICAgICAgPGRpdiBpZD1cImNvbW1lbnRzLWxpc3RcIiBjbGFzcz1cImNvbW1lbnRzLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJuby1jb21tZW50c1wiPkxvYWRpbmcgY29tbWVudHMuLi48L3A+IFxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIDxmb3JtIGlkPVwiY29tbWVudC1mb3JtXCIgY2xhc3M9XCJjb21tZW50LWZvcm1cIiBkYXRhLXBvc3QtaWQ9XCIke3Bvc3QuaWR9XCI+XG4gICAgICAgICAgICAgICAgIDxoMz5MZWF2ZSBhIENvbW1lbnQ8L2gzPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvbW1lbnQtbmFtZVwiPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY29tbWVudC1uYW1lXCIgbmFtZT1cIm5hbWVcIiByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY29tbWVudC10ZXh0XCI+Q29tbWVudDo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGlkPVwiY29tbWVudC10ZXh0XCIgbmFtZT1cImNvbW1lbnRcIiByb3dzPVwiNFwiIHJlcXVpcmVkPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cInByaW1hcnktYnV0dG9uXCI+U3VibWl0IENvbW1lbnQ8L2J1dHRvbj5cbiAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuICAgIGNvbnNvbGUubG9nKCdQb3N0IFVJIHVwZGF0ZWQgd2l0aCBsaWtlIGJ1dHRvbiBhbmQgY29tbWVudHMgc2VjdGlvbiBzdHJ1Y3R1cmUuJyk7XG59XG4vKipcbiAqIFVwZGF0ZSBwYWdlIG1ldGFkYXRhIGxpa2UgdGl0bGUgYW5kIFVSTFxuICovXG5mdW5jdGlvbiB1cGRhdGVQYWdlTWV0YWRhdGEocG9zdCkge1xuICAgIGRvY3VtZW50LnRpdGxlID0gYCR7cG9zdC50aXRsZX0gfCBOb2VsJ3MgQmxvZ2A7XG4gICAgY29uc29sZS5sb2coJ1BhZ2UgbWV0YWRhdGEgdXBkYXRlZC4nKTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBzb2NpYWwgc2hhcmluZyBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVTb2NpYWxTaGFyaW5nKHBvc3QpIHtcbiAgICBjb25zdCBwb3N0QXJ0aWNsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgaWYgKCFwb3N0QXJ0aWNsZUVsZW1lbnQpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBzb2NpYWxTaGFyaW5nRGl2ID0gcG9zdEFydGljbGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWwtc2hhcmluZycpO1xuICAgIGlmIChzb2NpYWxTaGFyaW5nRGl2KSB7XG4gICAgICAgIHNvY2lhbFNoYXJpbmdEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hhcmUtYnV0dG9uJyk7XG4gICAgICAgICAgICBpZiAoIWJ1dHRvbilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYENoZWNrIG91dCB0aGlzIGFydGljbGU6ICR7cG9zdC50aXRsZX1gO1xuICAgICAgICAgICAgbGV0IHNoYXJlV2luZG93VXJsID0gJyc7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygndHdpdHRlcicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9JnRleHQ9JHtlbmNvZGVVUklDb21wb25lbnQodGV4dCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ3R3aXR0ZXItc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD0yMzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhY2Vib29rJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdmYWNlYm9vay1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnbGlua2VkaW4nKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyaW5nL3NoYXJlLW9mZnNpdGUvP3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdsaW5rZWRpbi1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ1NvY2lhbCBzaGFyaW5nIGluaXRpYWxpemVkLicpO1xufVxuLyoqXG4gKiBEaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIHVzZXIgd2l0aGluIHRoZSBwb3N0IGNvbnRlbnQgYXJlYVxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoY29udGVudEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXNlY3Rpb24nKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGNvbW1lbnRzU2VjdGlvbiA/IGNvbW1lbnRzU2VjdGlvbiA6IGNvbnRlbnRFbGVtZW50O1xuICAgICAgICB0YXJnZXRFbGVtZW50LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPiR7bWVzc2FnZX08L2Rpdj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7IC8vIEZhbGxiYWNrXG4gICAgfVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGxpa2UgYnV0dG9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUxpa2VCdXR0b24ocG9zdCkge1xuICAgIGNvbnN0IHBvc3RJZFN0cmluZyA9IHBvc3QuaWQudG9TdHJpbmcoKTtcbiAgICBjb25zdCBsaWtlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Bvc3QtY29udGVudCAubGlrZS1idXR0b25bZGF0YS1wb3N0LWlkPVwiJHtwb3N0SWRTdHJpbmd9XCJdYCk7XG4gICAgaWYgKCFsaWtlQnRuKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignTGlrZSBidXR0b24gbm90IGZvdW5kIGluIHBvc3QgZGV0YWlsIFVJLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGxpa2VkUG9zdHNTZXQgPSBnZXRMaWtlZFBvc3RzRnJvbVNlc3Npb24oKTtcbiAgICBsZXQgaXNMaWtlZCA9IGxpa2VkUG9zdHNTZXQuaGFzKHBvc3RJZFN0cmluZyk7IC8vIEluaXRpYWwgc3RhdGUgZnJvbSBzZXNzaW9uXG4gICAgY29uc3QgaWNvbiA9IGxpa2VCdG4ucXVlcnlTZWxlY3RvcignaScpO1xuICAgIGNvbnN0IGNvdW50U3BhbiA9IGxpa2VCdG4ucXVlcnlTZWxlY3RvcignLmxpa2UtY291bnQnKTtcbiAgICAvLyBTZXQgaW5pdGlhbCBVSSBzdGF0ZVxuICAgIGlmIChpc0xpa2VkICYmIGljb24pIHtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXInKTtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTtcbiAgICAgICAgbGlrZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaWtlZCcpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpY29uKSB7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFzJyk7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmFyJyk7XG4gICAgICAgIGxpa2VCdG4uY2xhc3NMaXN0LnJlbW92ZSgnbGlrZWQnKTtcbiAgICB9XG4gICAgaWYgKGNvdW50U3BhbilcbiAgICAgICAgY291bnRTcGFuLnRleHRDb250ZW50ID0gU3RyaW5nKHBvc3QubGlrZXMgfHwgMCk7XG4gICAgbGlrZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBjdXJyZW50SWNvbiA9IGxpa2VCdG4ucXVlcnlTZWxlY3RvcignaScpO1xuICAgICAgICBjb25zdCBjdXJyZW50Q291bnRTcGFuID0gbGlrZUJ0bi5xdWVyeVNlbGVjdG9yKCcubGlrZS1jb3VudCcpO1xuICAgICAgICBpZiAoIWN1cnJlbnRJY29uIHx8ICFjdXJyZW50Q291bnRTcGFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsaWtlQnRuLmRpc2FibGVkID0gdHJ1ZTsgLy8gUHJldmVudCBkb3VibGUtY2xpY2tpbmdcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBdHRlbXB0aW5nIHRvIFVOTElLRSBwb3N0ICR7cG9zdC5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCAoMCwgYXBpXzEudW5saWtlUG9zdCkoTnVtYmVyKHBvc3QuaWQpKTsgLy8gQ2FsbCB1bmxpa2VQb3N0IEFQSVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEF0dGVtcHRpbmcgdG8gTElLRSBwb3N0ICR7cG9zdC5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCAoMCwgYXBpXzEubGlrZVBvc3QpKE51bWJlcihwb3N0LmlkKSk7IC8vIENhbGwgbGlrZVBvc3QgQVBJXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHRoZSBsb2NhbCAnaXNMaWtlZCcgc3RhdGUgb25seSBhZnRlciBzdWNjZXNzZnVsIEFQSSBjYWxsXG4gICAgICAgICAgICAgICAgaXNMaWtlZCA9ICFpc0xpa2VkO1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBTZXNzaW9uIFN0b3JhZ2UgYmFzZWQgb24gdGhlIG5ldyB0b2dnbGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgaWYgKGlzTGlrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkUG9zdFRvU2Vzc2lvbkxpa2VzKHBvc3RJZFN0cmluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVQb3N0RnJvbVNlc3Npb25MaWtlcyhwb3N0SWRTdHJpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgVUkgSWNvbiBiYXNlZCBvbiB0aGUgbmV3IHRvZ2dsZWQgc3RhdGVcbiAgICAgICAgICAgICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXInKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEljb24uY2xhc3NMaXN0LmFkZCgnZmFzJyk7XG4gICAgICAgICAgICAgICAgICAgIGxpa2VCdG4uY2xhc3NMaXN0LmFkZCgnbGlrZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcycpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInKTtcbiAgICAgICAgICAgICAgICAgICAgbGlrZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdsaWtlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY291bnQgZGlyZWN0bHkgZnJvbSB0aGUgQVBJIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY3VycmVudENvdW50U3Bhbi50ZXh0Q29udGVudCA9IFN0cmluZyhyZXN1bHQubGlrZXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMaWtlIHN0YXR1cyB1cGRhdGVkLiBOZXcgY291bnQ6ICR7cmVzdWx0Lmxpa2VzfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkxpa2UvVW5saWtlIEFQSSBjYWxsIGZhaWxlZCBvciByZXR1cm5lZCBudWxsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB1cGRhdGUgbGlrZS91bmxpa2Ugc3RhdHVzOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBsaWtlQnRuLmRpc2FibGVkID0gZmFsc2U7IC8vIFJlLWVuYWJsZSBidXR0b25cbiAgICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zb2xlLmxvZygnTGlrZSBidXR0b24gaW5pdGlhbGl6ZWQuJyk7XG59XG4vKipcbiAqIEZldGNoZXMgY29tbWVudHMgZnJvbSBBUEkgYW5kIHJlbmRlcnMgdGhlbSBpbnRvIHRoZSBsaXN0LlxuICovXG5mdW5jdGlvbiBsb2FkQ29tbWVudHMocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLWxpc3QnKTtcbiAgICAgICAgaWYgKCFjb21tZW50c0xpc3QpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJsb2FkaW5nLWNvbW1lbnRzXCI+TG9hZGluZyBjb21tZW50cy4uLjwvcD4nOyAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRzID0geWllbGQgZmV0Y2hDb21tZW50c0FwaShwb3N0SWQpOyAvLyBSZXBsYWNlIHdpdGggYWN0dWFsIEFQSSBjYWxsXG4gICAgICAgICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIGxvYWRpbmcvcHJldmlvdXMgY29tbWVudHNcbiAgICAgICAgICAgIGlmIChjb21tZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwibm8tY29tbWVudHNcIj5ObyBjb21tZW50cyB5ZXQuIEJlIHRoZSBmaXJzdCB0byBjb21tZW50ITwvcD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29tbWVudHMuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBjb21tZW50RWxlbWVudC5jbGFzc05hbWUgPSAnY29tbWVudCc7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJhc2ljIGVzY2FwaW5nIGZvciBkaXNwbGF5IC0gY29uc2lkZXIgYSBtb3JlIHJvYnVzdCBzYW5pdGl6ZXIgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhZmVOYW1lID0gKChfYiA9IChfYSA9IGNvbW1lbnQubmFtZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVwbGFjZSgvPi9nLCBcIiZndDtcIikpIHx8ICdBbm9ueW1vdXMnO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYWZlQ29tbWVudCA9ICgoX2QgPSAoX2MgPSBjb21tZW50LmNvbW1lbnQpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5yZXBsYWNlKC88L2csIFwiJmx0O1wiKSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpKSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudEVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtbWV0YVwiPjxzdHJvbmc+JHtzYWZlTmFtZX08L3N0cm9uZz4gb24gJHtuZXcgRGF0ZShjb21tZW50LmNyZWF0ZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtYm9keVwiPiR7c2FmZUNvbW1lbnR9PC9wPlxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzTGlzdC5hcHBlbmRDaGlsZChjb21tZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29tbWVudHMgbG9hZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGNvbW1lbnRzOlwiLCBlcnJvcik7XG4gICAgICAgICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPkNvdWxkIG5vdCBsb2FkIGNvbW1lbnRzLjwvcD4nO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBjb21tZW50IHN1Ym1pc3Npb24gZm9ybS5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRGb3JtKHBvc3RJZCkge1xuICAgIGNvbnN0IGNvbW1lbnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtZm9ybScpO1xuICAgIGlmICghY29tbWVudEZvcm0pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDb21tZW50IGZvcm0gbm90IGZvdW5kIGluIHBvc3QgZGV0YWlsIFVJLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbW1lbnRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjb21tZW50Rm9ybS5lbGVtZW50cy5uYW1lZEl0ZW0oJ25hbWUnKTtcbiAgICAgICAgY29uc3QgY29tbWVudElucHV0ID0gY29tbWVudEZvcm0uZWxlbWVudHMubmFtZWRJdGVtKCdjb21tZW50Jyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGNvbW1lbnRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJyk7XG4gICAgICAgIGlmICghbmFtZUlucHV0IHx8ICFjb21tZW50SW5wdXQgfHwgIXN1Ym1pdEJ1dHRvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnQgPSBjb21tZW50SW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICBpZiAoIW5hbWUgfHwgIWNvbW1lbnQpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgYm90aCBuYW1lIGFuZCBjb21tZW50LicpOyAvLyBTaW1wbGUgdmFsaWRhdGlvblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdWJtaXR0aW5nLi4uJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHlpZWxkIHN1Ym1pdENvbW1lbnRBcGkocG9zdElkLCBuYW1lLCBjb21tZW50KTsgLy8gUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gQ2xlYXIgZm9ybVxuICAgICAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICBjb21tZW50SW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIC8vIFJlZnJlc2ggY29tbWVudHMgbGlzdCB0byBzaG93IHRoZSBuZXcgY29tbWVudFxuICAgICAgICAgICAgeWllbGQgbG9hZENvbW1lbnRzKHBvc3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHN1Ym1pdCBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgICAgICAgICBhbGVydCgnRmFpbGVkIHRvIHN1Ym1pdCBjb21tZW50LiBQbGVhc2UgdHJ5IGFnYWluLicpOyAvLyBTaW1wbGUgZXJyb3IgZmVlZGJhY2tcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ1N1Ym1pdCBDb21tZW50JztcbiAgICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zb2xlLmxvZygnQ29tbWVudCBmb3JtIGluaXRpYWxpemVkLicpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubGlrZVBvc3QgPSBsaWtlUG9zdDtcbmV4cG9ydHMudW5saWtlUG9zdCA9IHVubGlrZVBvc3Q7XG5leHBvcnRzLmRlbGV0ZUJsb2dQb3N0ID0gZGVsZXRlQmxvZ1Bvc3Q7XG5leHBvcnRzLmNyZWF0ZVBvc3QgPSBjcmVhdGVQb3N0O1xuZXhwb3J0cy51cGRhdGVQb3N0ID0gdXBkYXRlUG9zdDtcbmV4cG9ydHMuYWRkVGFnVG9Qb3N0ID0gYWRkVGFnVG9Qb3N0O1xuZXhwb3J0cy5mZXRjaEJsb2dQb3N0cyA9IGZldGNoQmxvZ1Bvc3RzO1xuZXhwb3J0cy5mZXRjaFBvc3RCeUlkID0gZmV0Y2hQb3N0QnlJZDtcbmV4cG9ydHMuZmV0Y2hDb21tZW50c0FwaSA9IGZldGNoQ29tbWVudHNBcGk7XG5leHBvcnRzLnN1Ym1pdENvbW1lbnRBcGkgPSBzdWJtaXRDb21tZW50QXBpO1xuLy8gQVBJX1VSTCBjb25zdGFudCBpcyBub3QgbmVlZGVkIHdoZW4gZmV0Y2hpbmcgc3RhdGljIGZpbGUgZGlyZWN0bHlcbi8vIGNvbnN0IEFQSV9VUkwgPSAnL2FwaSc7IFxuLy8gLS0tIEZ1bmN0aW9ucyByZWx5aW5nIG9uIGJhY2tlbmQgQVBJIChXaWxsIE5PVCB3b3JrIG9uIEdpdEh1YiBQYWdlcykgLS0tXG4vLyBUaGVzZSBmdW5jdGlvbnMgd2lsbCBmYWlsIHNpbGVudGx5IG9yIGxvZyBlcnJvcnMgaW4gdGhlIGNvbnNvbGUgb24gdGhlIHN0YXRpYyBzaXRlLlxuZnVuY3Rpb24gbGlrZVBvc3QoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBMaWtlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZXMgYSBiYWNrZW5kLiBDYW5ub3QgTElLRSBwb3N0ICR7aWR9IG9uIHN0YXRpYyBzaXRlLmApO1xuICAgICAgICAvLyBSZXR1cm4gbnVsbCBvciBhIGRlZmF1bHQgc3RydWN0dXJlIGlmIHlvdXIgY2FsbGluZyBjb2RlIGV4cGVjdHMgaXRcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB1bmxpa2VQb3N0KGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgVW5saWtlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZXMgYSBiYWNrZW5kLiBDYW5ub3QgVU5MSUtFIHBvc3QgJHtpZH0gb24gc3RhdGljIHNpdGUuYCk7XG4gICAgICAgIC8vIFJldHVybiBudWxsIG9yIGEgZGVmYXVsdCBzdHJ1Y3R1cmVcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkZWxldGVCbG9nUG9zdChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGRlbGV0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBvc3QocG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGNyZWF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlUG9zdChpZCwgcG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHVwZGF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gYWRkVGFnVG9Qb3N0KGlkLCB0YWcpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGFkZCB0YWcgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG4vLyAtLS0gRnVuY3Rpb25zIG1vZGlmaWVkIGZvciBzdGF0aWMgZGF0YSAtLS1cbmNvbnN0IFNUQVRJQ19EQVRBX1VSTCA9ICdkYXRhL3Bvc3RzLmpzb24nOyAvLyBEZWZpbmUgcmVsYXRpdmUgcGF0aCBvbmNlXG4vKipcbiAqIEZldGNoIGFsbCBibG9nIHBvc3RzIGRpcmVjdGx5IGZyb20gdGhlIHN0YXRpYyBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGZldGNoQmxvZ1Bvc3RzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBzdGF0aWMgZGF0YSBmcm9tOiAke1NUQVRJQ19EQVRBX1VSTH1gKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZldGNoIHRoZSBKU09OIGZpbGUgdXNpbmcgdGhlIHJlbGF0aXZlIHBhdGhcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goU1RBVElDX0RBVEFfVVJMKTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCAke1NUQVRJQ19EQVRBX1VSTH06ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgLy8gQXNzdW1pbmcgdGhlIEpTT04gc3RydWN0dXJlIGlzIHsgcG9zdHM6IFsuLi5dIH0gXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5wb3N0cyB8fCBbXTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHN0YXRpYyAke1NUQVRJQ19EQVRBX1VSTH06YCwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgb24gZXJyb3JcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYSBzaW5nbGUgcG9zdCBieSBJRCBieSBmaWx0ZXJpbmcgdGhlIHN0YXRpYyBKU09OIGRhdGEuXG4gKiBAcGFyYW0gaWQgLSBUaGUgcG9zdCBJRCAoc3RyaW5nIG9yIG51bWJlcilcbiAqL1xuZnVuY3Rpb24gZmV0Y2hQb3N0QnlJZChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGZXRjaCBhbGwgcG9zdHMgZmlyc3RcbiAgICAgICAgICAgIGNvbnN0IGFsbFBvc3RzID0geWllbGQgZmV0Y2hCbG9nUG9zdHMoKTtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RJZE51bWJlciA9IHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyBwYXJzZUludChpZCwgMTApIDogaWQ7XG4gICAgICAgICAgICBpZiAoaXNOYU4ocG9zdElkTnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgcG9zdCBJRCBwcm92aWRlZDogJHtpZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIHNwZWNpZmljIHBvc3RcbiAgICAgICAgICAgIGNvbnN0IHBvc3QgPSBhbGxQb3N0cy5maW5kKHAgPT4gTnVtYmVyKHAuaWQpID09PSBwb3N0SWROdW1iZXIpO1xuICAgICAgICAgICAgaWYgKCFwb3N0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBQb3N0IHdpdGggSUQgJHtpZH0gbm90IGZvdW5kIGluIHN0YXRpYyBkYXRhLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coYEZvdW5kIHBvc3QgJHtpZH0gaW4gc3RhdGljIGRhdGEuYCk7XG4gICAgICAgICAgICByZXR1cm4gcG9zdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHN0YXRpYyBwb3N0ICR7aWR9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyAtLS0gQ29tbWVudCBBUEkgUGxhY2Vob2xkZXJzIC0tLVxuZnVuY3Rpb24gZmV0Y2hDb21tZW50c0FwaShwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJDb21tZW50cyBjYW5ub3QgYmUgZmV0Y2hlZCBvbiBzdGF0aWMgc2l0ZSB3aXRob3V0IGV4dGVybmFsIHNlcnZpY2UvYmFja2VuZC5cIik7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdENvbW1lbnRBcGkocG9zdElkLCBuYW1lLCBjb21tZW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBzdWJtaXQgY29tbWVudCBvbiBzdGF0aWMgc2l0ZSB3aXRob3V0IGV4dGVybmFsIHNlcnZpY2UvYmFja2VuZC5cIik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbW1lbnQgc3VibWlzc2lvbiBub3QgYXZhaWxhYmxlLlwiKTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50cmFuc2Zvcm1UYWdUb1VybEZvcm1hdCA9IHRyYW5zZm9ybVRhZ1RvVXJsRm9ybWF0O1xuZXhwb3J0cy5nZW5lcmF0ZVRhZ1VybCA9IGdlbmVyYXRlVGFnVXJsO1xuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgdGFnIGludG8gYSBVUkwtZnJpZW5kbHkgZm9ybWF0LlxuICogUmVwbGFjZXMgc3BhY2VzIHdpdGggZGFzaGVzIGFuZCBjb252ZXJ0cyB0aGUgc3RyaW5nIHRvIGxvd2VyY2FzZS5cbiAqXG4gKiBAcGFyYW0gdGFnIC0gVGhlIHRhZyB0byB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyBUaGUgdHJhbnNmb3JtZWQgdGFnLlxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1UYWdUb1VybEZvcm1hdCh0YWcpIHtcbiAgICByZXR1cm4gdGFnLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCAnLScpO1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgdGFnIGludG8gYSBVUkwtZnJpZW5kbHkgZm9ybWF0IGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBjb3JyZWN0IGJsb2cgaG9tZXBhZ2UgVVJMLlxuICpcbiAqIEBwYXJhbSB0YWcgLSBUaGUgdGFnIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIFRoZSBmdWxsIFVSTCB3aXRoIHRoZSB0YWcgcXVlcnkgcGFyYW1ldGVyLlxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRhZ1VybCh0YWcpIHtcbiAgICBjb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuQkxPR19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9ub2VsdWd3b2tlLmNvbS9ibG9nLyc7XG4gICAgY29uc3QgdHJhbnNmb3JtZWRUYWcgPSB0cmFuc2Zvcm1UYWdUb1VybEZvcm1hdCh0YWcpO1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoeyB0YWc6IHRyYW5zZm9ybWVkVGFnIH0pO1xuICAgIHJldHVybiBgJHtiYXNlVXJsfT8ke3BhcmFtcy50b1N0cmluZygpfWA7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZW50cmllcy9jbGllbnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=