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
    // Make the card appear clickable (for navigation)
    blogCard.style.cursor = 'pointer';
    // Note: Actual navigation should be handled by an event listener
    // (preferably delegation) on the parent container (.blog-cards)
    // that reads the data-post-id and navigates.
    // Calculate comment count (assuming post.comments is an array or undefined)
    const commentCount = post.comments ? post.comments.length : 0;
    // Format dates
    const createdDate = new Date(post.createdAt);
    const dateStr = createdDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    // --- Dynamic URL and Text Generation for Sharing ---
    // CORRECTED PATH: Use '/post.html' directly, served from the public root
    const postUrl = `${window.location.origin}/post.html?id=${String(post.id)}`;
    const encodedUrl = encodeURIComponent(postUrl);
    const shareText = `Check out this article: ${post.title}`;
    const encodedShareText = encodeURIComponent(shareText);
    // --- End Dynamic URL Generation ---
    // Generate HTML for tag badges
    let tagsHTML = '';
    if (post.tags && post.tags.length > 0) {
        tagsHTML = '<div class="post-tags">' +
            post.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('') +
            '</div>';
    }
    // Use the correct public path for the fallback image
    const fallbackImageUrl = '/images/blog_image_3.jpeg';
    // Create HTML for blog card
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
    // Add JS listeners for social share BUTTONS 
    const socialSharingDiv = blogCard.querySelector('.social-sharing');
    if (socialSharingDiv) {
        socialSharingDiv.addEventListener('click', (event) => {
            const button = event.target.closest('.share-button');
            if (!button)
                return;
            event.stopPropagation(); // Prevent card navigation
            const url = button.dataset.url ? decodeURIComponent(button.dataset.url) : window.location.href;
            const text = button.dataset.text ? decodeURIComponent(button.dataset.text) : document.title;
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
    // Optional: Add event listeners for header elements if needed here
    // Define the setupSearch function to handle search functionality
    function setupSearch() {
        const searchBar = document.querySelector('.search-bar');
        if (!searchBar) {
            console.error('Search bar element not found.');
            return;
        }
        searchBar.addEventListener('input', (event) => {
            const query = event.target.value;
            console.log(`Searching for: ${query}`);
            // Add search logic here
        });
    }
    setupSearch(); // Setup search functionality
    // Define the setupPopupButtons function to handle popup functionality
    function setupPopupButtons(buttonId, popupId) {
        const button = document.getElementById(buttonId);
        const popup = document.getElementById(popupId);
        if (!button || !popup) {
            console.error(`Button with ID '${buttonId}' or popup with ID '${popupId}' not found.`);
            return;
        }
        button.addEventListener('click', () => {
            popup.classList.toggle('visible'); // Toggle visibility of the popup
        });
    }
    setupPopupButtons('about-btn', 'about-popup'); // Setup popup for about button
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
 * Client-side controller that handles all frontend functionality for the blog.
 * Manages UI initialization, post rendering, and user interactions.
 */
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
const blogCards_1 = __webpack_require__(/*! ../components/blogCards */ "./src/components/blogCards.ts");
const comments_1 = __webpack_require__(/*! ../components/comments */ "./src/components/comments.ts");
const darkMode_1 = __webpack_require__(/*! ../components/darkMode */ "./src/components/darkMode.ts");
const contact_1 = __webpack_require__(/*! ../components/contact */ "./src/components/contact.ts");
const pagination_1 = __webpack_require__(/*! ../components/pagination */ "./src/components/pagination.ts");
const search_1 = __webpack_require__(/*! ../components/search */ "./src/components/search.ts");
const about_1 = __webpack_require__(/*! ../components/about */ "./src/components/about.ts");
const navigation_1 = __webpack_require__(/*! ../components/navigation */ "./src/components/navigation.ts");
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
// Imports for the functions to be called
const blogFrontendController_1 = __webpack_require__(/*! ../controllers/blogFrontendController */ "./src/controllers/blogFrontendController.ts"); // For main page (index.html)
// Import the specific initialization function for the post detail page (Option B)
const postDetail_1 = __webpack_require__(/*! ../modules/postDetail */ "./src/modules/postDetail.ts"); // Adjust path if your module is elsewhere
// Import common components needed on potentially multiple pages
const header_1 = __webpack_require__(/*! ../components/header */ "./src/components/header.ts");
const darkMode_1 = __webpack_require__(/*! ../components/darkMode */ "./src/components/darkMode.ts");
/**
 * Client-side entry point initializer.
 * Determines the current page and runs the appropriate logic.
 */
function initializeClient() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Client initializing...');
        // --- Initialize common elements first ---
        try {
            (0, darkMode_1.checkSystemDarkModePreference)();
            (0, darkMode_1.initializeDarkMode)();
            console.log('Dark mode initialized globally.');
            (0, header_1.renderHeader)();
            console.log('Header rendered globally.');
        }
        catch (error) {
            console.error("Error initializing common elements:", error);
        }
        // --- End common elements ---
        // --- Page-specific logic ---
        const pageType = document.body.dataset.page; // Use data attribute from <body>
        const currentPage = window.location.pathname; // Fallback path
        try {
            console.log(`Detected pageType: ${pageType}, currentPage: ${currentPage}`);
            // Check for Main Page (index.html served at /)
            // Use data-page="main" primarily, fall back to path check for '/' or '/index.html'
            if (pageType === 'main' || (!pageType && (currentPage === '/' || currentPage.endsWith('/index.html')))) {
                console.log('Initializing main blog page logic...');
                yield (0, blogFrontendController_1.initializeBlogFrontend)(); // Initialize blog cards, pagination etc. for the main page
                console.log('Main blog page logic initialized.');
                // Check for Post Detail Page (post.html served at /post.html)
            }
            else if (pageType === 'post' || (!pageType && currentPage.endsWith('/post.html'))) {
                console.log('Initializing post detail page logic (from module)...');
                // Call the refactored function from the module.
                // It handles getting the postId from the URL internally.
                yield (0, postDetail_1.initializePostDetailPageLogic)();
                console.log('Post detail page logic initialized.');
                // Check for Admin Page (admin.html served at /admin.html)
            }
            else if (pageType === 'admin' || (!pageType && currentPage.endsWith('/admin.html'))) {
                // This bundle (client.bundle.js) shouldn't run admin-specific init logic.
                // admin.bundle.js handles that page.
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
// Ensure the DOM is fully loaded before running initialization logic
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
                ${post.tags && post.tags.length > 0 ? `<span>Tags:</span> ${post.tags.map(tag => `<a href="/tag/${tag.toLowerCase().replace(/\s+/g, '-')}">${tag}</a>`).join('')}` : ''}
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
exports.deleteBlogPost = deleteBlogPost;
exports.fetchBlogPosts = fetchBlogPosts;
exports.fetchPostById = fetchPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.likePost = likePost;
exports.unlikePost = unlikePost;
exports.addTagToPost = addTagToPost;
const API_URL = '/api';
/**
 * Deletes a blog post by ID.
 * @param postId - The ID of the blog post to delete.
 * @returns A promise that resolves to true if the deletion was successful, or false otherwise.
 */
function deleteBlogPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                console.error('Failed to delete blog post:', response.statusText);
                return false;
            }
            return true;
        }
        catch (error) {
            console.error('Error deleting blog post:', error);
            return false;
        }
    });
}
/**
 * Fetch all blog posts from the API
 */
function fetchBlogPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return yield response.json();
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    });
}
/**
 * Get a single post by ID
 * @param id - The post ID (can be string or number)
 */
function fetchPostById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            return yield response.json();
        }
        catch (error) {
            console.error(`Error fetching post ${id}:`, error);
            return null;
        }
    });
}
/**
 * Create a new post via API
 */
function createPost(postData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            return yield response.json();
        }
        catch (error) {
            console.error('Error creating post:', error);
            return null;
        }
    });
}
/**
 * Update an existing post via API
 */
function updatePost(id, postData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to update post');
            }
            return yield response.json();
        }
        catch (error) {
            console.error('Error updating post:', error);
            return null;
        }
    });
}
/**
 * Like a post via API
 */
function likePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts/${id}/like`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Failed to like post');
            }
            return yield response.json();
        }
        catch (error) {
            console.error(`Error liking post ${id}:`, error);
            return null;
        }
    });
}
/**
 * Unlike a post via API
 */
function unlikePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/api/posts/${id}/like`, { method: 'DELETE' });
            if (!response.ok)
                throw new Error('Failed to unlike post');
            return yield response.json();
        }
        catch (error) {
            console.error('Error in unlikePost:', error);
            return null;
        }
    });
}
/**
 * Add a tag to a post via API
 */
function addTagToPost(id, tag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts/${id}/tags`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tag })
            });
            if (!response.ok) {
                throw new Error('Failed to add tag');
            }
            return yield response.json();
        }
        catch (error) {
            console.error(`Error adding tag to post ${id}:`, error);
            return null;
        }
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFFBQVEsU0FBUyxHQUFHO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxHQUFHO0FBQ2xEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsR0FBRyxVQUFVLGtCQUFrQjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFFBQVEsU0FBUyxHQUFHO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQix1Q0FBdUMsS0FBSztBQUM1QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELEdBQUc7QUFDekQ7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7OztVQzVMQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2Fib3V0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9ibG9nQ2FyZHMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2NvbW1lbnRzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9jb250YWN0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9kYXJrTW9kZS50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9wYWdpbmF0aW9uLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9zZWFyY2gudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9ibG9nRnJvbnRlbmRDb250cm9sbGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvZW50cmllcy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9tb2R1bGVzL3Bvc3REZXRhaWwudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9zZXJ2aWNlcy9hcGkudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBBYm91dCBwb3B1cCBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVBYm91dCA9IGluaXRpYWxpemVBYm91dDtcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgQWJvdXQgc2VjdGlvbiBwb3B1cFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQWJvdXQoKSB7XG4gICAgY29uc3QgYWJvdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtYnRuJyk7XG4gICAgY29uc3QgYWJvdXRQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1wb3B1cCcpO1xuICAgIGNvbnN0IGNsb3NlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQtcG9wdXAgLmNsb3NlLXBvcHVwJyk7XG4gICAgaWYgKCFhYm91dEJ0biB8fCAhYWJvdXRQb3B1cCB8fCAhY2xvc2VQb3B1cCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0Fib3V0IHBvcHVwIGVsZW1lbnRzIG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gT3BlbiBwb3B1cCB3aGVuIGFib3V0IGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgYWJvdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgZGVmYXVsdCBhbmNob3IgYmVoYXZpb3JcbiAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJzsgLy8gUHJldmVudCBzY3JvbGxpbmcgd2hpbGUgcG9wdXAgaXMgb3BlblxuICAgICAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGFib3V0IGxpbmtcbiAgICAgICAgYWJvdXRCdG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2UgcG9wdXAgd2hlbiBjbG9zZSBidXR0b24gaXMgY2xpY2tlZFxuICAgIGNsb3NlUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSB3aGVuIGNsaWNraW5nIG91dHNpZGUgdGhlIHBvcHVwIGNvbnRlbnRcbiAgICBhYm91dFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBhYm91dFBvcHVwKSB7XG4gICAgICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBDbG9zZSBvbiBlc2NhcGUga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgYWJvdXRQb3B1cC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgdGhlIGRlZmF1bHQgYWN0aXZlIGxpbmsgc3RhdGVcbiAqL1xuZnVuY3Rpb24gc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKSB7XG4gICAgLy8gR2V0IGN1cnJlbnQgaGFzaCBvciBkZWZhdWx0IHRvIGhvbWVcbiAgICBjb25zdCBjdXJyZW50SGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8ICcjaG9tZSc7XG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBuYXYgbGlua3NcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgaGFzaCBsaW5rXG4gICAgY29uc3QgY3VycmVudExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXIgbmF2IHVsIGxpIGFbaHJlZj1cIiR7Y3VycmVudEhhc2h9XCJdYCk7XG4gICAgaWYgKGN1cnJlbnRMaW5rKSB7XG4gICAgICAgIGN1cnJlbnRMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQgPSBjcmVhdGVCbG9nQ2FyZEVsZW1lbnQ7XG4vKipcbiAqIENyZWF0ZXMgYSBET00gZWxlbWVudCBmb3IgYSBibG9nIGNhcmQgZnJvbSBwb3N0IGRhdGEgKGRpc3BsYXkgb25seSBmb3IgYWN0aW9ucylcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmxvZ0NhcmRFbGVtZW50KHBvc3QpIHtcbiAgICBjb25zdCBibG9nQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJsb2dDYXJkLmNsYXNzTmFtZSA9ICdibG9nLWNhcmQnO1xuICAgIGJsb2dDYXJkLmRhdGFzZXQucG9zdElkID0gU3RyaW5nKHBvc3QuaWQpO1xuICAgIC8vIE1ha2UgdGhlIGNhcmQgYXBwZWFyIGNsaWNrYWJsZSAoZm9yIG5hdmlnYXRpb24pXG4gICAgYmxvZ0NhcmQuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgIC8vIE5vdGU6IEFjdHVhbCBuYXZpZ2F0aW9uIHNob3VsZCBiZSBoYW5kbGVkIGJ5IGFuIGV2ZW50IGxpc3RlbmVyXG4gICAgLy8gKHByZWZlcmFibHkgZGVsZWdhdGlvbikgb24gdGhlIHBhcmVudCBjb250YWluZXIgKC5ibG9nLWNhcmRzKVxuICAgIC8vIHRoYXQgcmVhZHMgdGhlIGRhdGEtcG9zdC1pZCBhbmQgbmF2aWdhdGVzLlxuICAgIC8vIENhbGN1bGF0ZSBjb21tZW50IGNvdW50IChhc3N1bWluZyBwb3N0LmNvbW1lbnRzIGlzIGFuIGFycmF5IG9yIHVuZGVmaW5lZClcbiAgICBjb25zdCBjb21tZW50Q291bnQgPSBwb3N0LmNvbW1lbnRzID8gcG9zdC5jb21tZW50cy5sZW5ndGggOiAwO1xuICAgIC8vIEZvcm1hdCBkYXRlc1xuICAgIGNvbnN0IGNyZWF0ZWREYXRlID0gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBjcmVhdGVkRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnXG4gICAgfSk7XG4gICAgLy8gLS0tIER5bmFtaWMgVVJMIGFuZCBUZXh0IEdlbmVyYXRpb24gZm9yIFNoYXJpbmcgLS0tXG4gICAgLy8gQ09SUkVDVEVEIFBBVEg6IFVzZSAnL3Bvc3QuaHRtbCcgZGlyZWN0bHksIHNlcnZlZCBmcm9tIHRoZSBwdWJsaWMgcm9vdFxuICAgIGNvbnN0IHBvc3RVcmwgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9wb3N0Lmh0bWw/aWQ9JHtTdHJpbmcocG9zdC5pZCl9YDtcbiAgICBjb25zdCBlbmNvZGVkVXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHBvc3RVcmwpO1xuICAgIGNvbnN0IHNoYXJlVGV4dCA9IGBDaGVjayBvdXQgdGhpcyBhcnRpY2xlOiAke3Bvc3QudGl0bGV9YDtcbiAgICBjb25zdCBlbmNvZGVkU2hhcmVUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHNoYXJlVGV4dCk7XG4gICAgLy8gLS0tIEVuZCBEeW5hbWljIFVSTCBHZW5lcmF0aW9uIC0tLVxuICAgIC8vIEdlbmVyYXRlIEhUTUwgZm9yIHRhZyBiYWRnZXNcbiAgICBsZXQgdGFnc0hUTUwgPSAnJztcbiAgICBpZiAocG9zdC50YWdzICYmIHBvc3QudGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRhZ3NIVE1MID0gJzxkaXYgY2xhc3M9XCJwb3N0LXRhZ3NcIj4nICtcbiAgICAgICAgICAgIHBvc3QudGFncy5tYXAodGFnID0+IGA8c3BhbiBjbGFzcz1cInRhZy1iYWRnZVwiPiR7dGFnfTwvc3Bhbj5gKS5qb2luKCcnKSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICB9XG4gICAgLy8gVXNlIHRoZSBjb3JyZWN0IHB1YmxpYyBwYXRoIGZvciB0aGUgZmFsbGJhY2sgaW1hZ2VcbiAgICBjb25zdCBmYWxsYmFja0ltYWdlVXJsID0gJy9pbWFnZXMvYmxvZ19pbWFnZV8zLmpwZWcnO1xuICAgIC8vIENyZWF0ZSBIVE1MIGZvciBibG9nIGNhcmRcbiAgICBibG9nQ2FyZC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxpbWcgc3JjPVwiJHtwb3N0LmltYWdlVXJsIHx8IGZhbGxiYWNrSW1hZ2VVcmx9XCIgYWx0PVwiJHtwb3N0LnRpdGxlfVwiPiBcbiAgICAgICAgPGRpdiBjbGFzcz1cImJsb2ctY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImJsb2ctY2FyZC1kYXRlLWF1dGhvclwiPiR7ZGF0ZVN0cn08L3A+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJibG9nLWNhcmQtdGl0bGVcIj4ke3Bvc3QudGl0bGV9PC9oMz5cbiAgICAgICAgICAgICR7dGFnc0hUTUx9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsaWtlLWJ1dHRvbi1kaXNwbGF5XCIgYXJpYS1sYWJlbD1cIiR7cG9zdC5saWtlcyB8fCAwfSBsaWtlc1wiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1oZWFydFwiPjwvaT4gPHNwYW4gY2xhc3M9XCJsaWtlLWNvdW50XCI+JHtwb3N0Lmxpa2VzIHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbW1lbnRzLXRvZ2dsZS1kaXNwbGF5XCIgYXJpYS1sYWJlbD1cIiR7Y29tbWVudENvdW50fSBjb21tZW50c1wiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jb21tZW50XCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbW1lbnQtY291bnRcIj4ke2NvbW1lbnRDb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWwtc2hhcmluZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIHR3aXR0ZXJcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gVHdpdHRlclwiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiIGRhdGEtdGV4dD1cIiR7ZW5jb2RlZFNoYXJlVGV4dH1cIj48aSBjbGFzcz1cImZhYiBmYS10d2l0dGVyXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGZhY2Vib29rXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIEZhY2Vib29rXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2stZlwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBsaW5rZWRpblwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBMaW5rZWRJblwiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiPjxpIGNsYXNzPVwiZmFiIGZhLWxpbmtlZGluLWluXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgLy8gQWRkIEpTIGxpc3RlbmVycyBmb3Igc29jaWFsIHNoYXJlIEJVVFRPTlMgXG4gICAgY29uc3Qgc29jaWFsU2hhcmluZ0RpdiA9IGJsb2dDYXJkLnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWwtc2hhcmluZycpO1xuICAgIGlmIChzb2NpYWxTaGFyaW5nRGl2KSB7XG4gICAgICAgIHNvY2lhbFNoYXJpbmdEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hhcmUtYnV0dG9uJyk7XG4gICAgICAgICAgICBpZiAoIWJ1dHRvbilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCBjYXJkIG5hdmlnYXRpb25cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGJ1dHRvbi5kYXRhc2V0LnVybCA/IGRlY29kZVVSSUNvbXBvbmVudChidXR0b24uZGF0YXNldC51cmwpIDogd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYnV0dG9uLmRhdGFzZXQudGV4dCA/IGRlY29kZVVSSUNvbXBvbmVudChidXR0b24uZGF0YXNldC50ZXh0KSA6IGRvY3VtZW50LnRpdGxlO1xuICAgICAgICAgICAgbGV0IHNoYXJlV2luZG93VXJsID0gJyc7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygndHdpdHRlcicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9JnRleHQ9JHtlbmNvZGVVUklDb21wb25lbnQodGV4dCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ3R3aXR0ZXItc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD0yMzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhY2Vib29rJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdmYWNlYm9vay1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnbGlua2VkaW4nKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyaW5nL3NoYXJlLW9mZnNpdGUvP3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdsaW5rZWRpbi1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGJsb2dDYXJkO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50cyA9IGluaXRpYWxpemVDb21tZW50cztcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSA9IGluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHk7XG4vKipcbiAqIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgYmxvZyBwb3N0c1xuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29tbWVudHMoKSB7XG4gICAgc2V0dXBDb21tZW50VG9nZ2xlcygpO1xuICAgIHNldHVwQ29tbWVudEZvcm1zKCk7XG59XG4vKipcbiAqIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgYSBzcGVjaWZpYyBibG9nIHBvc3QgZWxlbWVudFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5KHBvc3RFbGVtZW50KSB7XG4gICAgY29uc3QgdG9nZ2xlID0gcG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLXRvZ2dsZScpO1xuICAgIGNvbnN0IGZvcm0gPSBwb3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1mb3JtJyk7XG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgICBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKTtcbiAgICB9XG4gICAgaWYgKGZvcm0pIHtcbiAgICAgICAgc2V0dXBDb21tZW50Rm9ybShmb3JtKTtcbiAgICB9XG59XG4vKipcbiAqIFNldCB1cCBjb21tZW50IHRvZ2dsZSBidXR0b25zXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudFRvZ2dsZXMoKSB7XG4gICAgY29uc3QgY29tbWVudFRvZ2dsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudHMtdG9nZ2xlJyk7XG4gICAgY29tbWVudFRvZ2dsZXMuZm9yRWFjaCh0b2dnbGUgPT4ge1xuICAgICAgICBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGEgc2luZ2xlIGNvbW1lbnQgdG9nZ2xlIGJ1dHRvblxuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKSB7XG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSB0b2dnbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAgICAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvbW1lbnRzLSR7cG9zdElkfWApO1xuICAgICAgICBpZiAoY29tbWVudHNTZWN0aW9uKSB7XG4gICAgICAgICAgICBjb21tZW50c1NlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgYnV0dG9uIHRleHQgYmFzZWQgb24gc3RhdGVcbiAgICAgICAgICAgIGlmIChjb21tZW50c1NlY3Rpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+IEhpZGUgQ29tbWVudHMgPHNwYW4gY2xhc3M9XCJjb21tZW50cy1jb3VudFwiPiR7KF9hID0gdG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb3VudCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGV4dENvbnRlbnR9PC9zcGFuPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLWNvbW1lbnRcIj48L2k+IENvbW1lbnRzIDxzcGFuIGNsYXNzPVwiY29tbWVudHMtY291bnRcIj4keyhfYiA9IHRvZ2dsZS5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY291bnQnKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRleHRDb250ZW50fTwvc3Bhbj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBjb21tZW50IGZvcm1zXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudEZvcm1zKCkge1xuICAgIGNvbnN0IGNvbW1lbnRGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LWZvcm0nKTtcbiAgICBjb21tZW50Rm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgICAgc2V0dXBDb21tZW50Rm9ybShmb3JtKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGEgc2luZ2xlIGNvbW1lbnQgZm9ybVxuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRGb3JtKGZvcm0pIHtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcG9zdElkID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zdC1pZCcpO1xuICAgICAgICBjb25zdCBjb21tZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb21tZW50cy0ke3Bvc3RJZH0gLmNvbW1lbnRzLWxpc3RgKTtcbiAgICAgICAgaWYgKCFjb21tZW50c0NvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBjb25zdCBjb21tZW50SW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhW25hbWU9XCJjb21tZW50XCJdJyk7XG4gICAgICAgIC8vIENoZWNrIGlmIGlucHV0cyBhcmUgbm90IGVtcHR5XG4gICAgICAgIGlmIChuYW1lSW5wdXQudmFsdWUudHJpbSgpID09PSAnJyB8fCBjb21tZW50SW5wdXQudmFsdWUudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFkZE5ld0NvbW1lbnQocG9zdElkLCBjb21tZW50c0NvbnRhaW5lciwgbmFtZUlucHV0LnZhbHVlLCBjb21tZW50SW5wdXQudmFsdWUpO1xuICAgICAgICAvLyBSZXNldCBmb3JtXG4gICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQWRkIGEgbmV3IGNvbW1lbnQgdG8gdGhlIGNvbW1lbnRzIGxpc3RcbiAqL1xuZnVuY3Rpb24gYWRkTmV3Q29tbWVudChwb3N0SWQsIGNvbW1lbnRzQ29udGFpbmVyLCBuYW1lLCBjb21tZW50VGV4dCkge1xuICAgIC8vIENyZWF0ZSBuZXcgY29tbWVudFxuICAgIGNvbnN0IG5ld0NvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXdDb21tZW50LmNsYXNzTmFtZSA9ICdjb21tZW50JztcbiAgICAvLyBHZXQgY3VycmVudCBkYXRlXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBkYXRlU3RyID0gbm93LnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgZGF5OiAnbnVtZXJpYydcbiAgICB9KTtcbiAgICAvLyBDb21tZW50IEhUTUwgc3RydWN0dXJlXG4gICAgbmV3Q29tbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWF2YXRhclwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlci1jaXJjbGVcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1jb250ZW50XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtYXV0aG9yXCI+JHtuYW1lfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC10ZXh0XCI+JHtjb21tZW50VGV4dH08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtZGF0ZVwiPiR7ZGF0ZVN0cn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgLy8gUmVtb3ZlIFwibm8gY29tbWVudHMgeWV0XCIgbWVzc2FnZSBpZiBpdCBleGlzdHNcbiAgICBjb25zdCBub0NvbW1lbnRzID0gY29tbWVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcignLm5vLWNvbW1lbnRzJyk7XG4gICAgaWYgKG5vQ29tbWVudHMpIHtcbiAgICAgICAgY29tbWVudHNDb250YWluZXIucmVtb3ZlQ2hpbGQobm9Db21tZW50cyk7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgbmV3IGNvbW1lbnQgdG8gdGhlIHRvcCBvZiB0aGUgbGlzdFxuICAgIGNvbW1lbnRzQ29udGFpbmVyLmluc2VydEJlZm9yZShuZXdDb21tZW50LCBjb21tZW50c0NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICAvLyBVcGRhdGUgY29tbWVudCBjb3VudFxuICAgIHVwZGF0ZUNvbW1lbnRDb3VudChwb3N0SWQpO1xufVxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvbW1lbnQgY291bnQgZm9yIGEgcG9zdFxuICovXG5mdW5jdGlvbiB1cGRhdGVDb21tZW50Q291bnQocG9zdElkKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IGNvdW50U3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGJ1dHRvbltkYXRhLXBvc3QtaWQ9XCIke3Bvc3RJZH1cIl0gLmNvbW1lbnRzLWNvdW50YCk7XG4gICAgaWYgKGNvdW50U3Bhbikge1xuICAgICAgICBsZXQgY291bnQgPSBwYXJzZUludCgoKF9hID0gY291bnRTcGFuLnRleHRDb250ZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVwbGFjZSgvWygpXS9nLCAnJykpIHx8ICcwJykgKyAxO1xuICAgICAgICBjb3VudFNwYW4udGV4dENvbnRlbnQgPSBgKCR7Y291bnR9KWA7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb250YWN0IHBvcHVwIGZ1bmN0aW9uYWxpdHlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbnRhY3RGb3JtID0gaW5pdGlhbGl6ZUNvbnRhY3RGb3JtO1xuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBjb250YWN0IGZvcm0gcG9wdXBcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbnRhY3RGb3JtKCkge1xuICAgIGNvbnN0IGNvbnRhY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1idG4nKTtcbiAgICBjb25zdCBjb250YWN0UG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1wb3B1cCcpO1xuICAgIGNvbnN0IGNsb3NlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFjdC1wb3B1cCAuY2xvc2UtcG9wdXAnKTtcbiAgICBpZiAoIWNvbnRhY3RCdXR0b24gfHwgIWNvbnRhY3RQb3B1cCB8fCAhY2xvc2VQb3B1cCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnRhY3QgZm9ybSBlbGVtZW50cyBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIE9wZW4gcG9wdXAgd2hlbiBjb250YWN0IGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgY29udGFjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGFuY2hvciBiZWhhdmlvclxuICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7IC8vIFByZXZlbnQgc2Nyb2xsaW5nIHdoaWxlIHBvcHVwIGlzIG9wZW5cbiAgICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjb250YWN0IGxpbmtcbiAgICAgICAgY29udGFjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSBwb3B1cCB3aGVuIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgY2xvc2VQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwb3B1cCBjb250ZW50XG4gICAgY29udGFjdFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBjb250YWN0UG9wdXApIHtcbiAgICAgICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugb24gZXNjYXBlIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBTZXQgdXAgY29udGFjdCBmb3JtIHN1Ym1pc3Npb25cbiAgICBzZXR1cENvbnRhY3RGb3JtU3VibWlzc2lvbigpO1xufVxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IHRoZSBkZWZhdWx0IGFjdGl2ZSBsaW5rIHN0YXRlXG4gKi9cbmZ1bmN0aW9uIHNldERlZmF1bHRBY3RpdmVMaW5rKCkge1xuICAgIC8vIEdldCBjdXJyZW50IGhhc2ggb3IgZGVmYXVsdCB0byBob21lXG4gICAgY29uc3QgY3VycmVudEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgbmF2IGxpbmtzXG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IGhhc2ggbGlua1xuICAgIGNvbnN0IGN1cnJlbnRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaGVhZGVyIG5hdiB1bCBsaSBhW2hyZWY9XCIke2N1cnJlbnRIYXNofVwiXWApO1xuICAgIGlmIChjdXJyZW50TGluaykge1xuICAgICAgICBjdXJyZW50TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59XG4vKipcbiAqIEhhbmRsZSBjb250YWN0IGZvcm0gc3VibWlzc2lvblxuICovXG5mdW5jdGlvbiBzZXR1cENvbnRhY3RGb3JtU3VibWlzc2lvbigpIHtcbiAgICBjb25zdCBjb250YWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWZvcm0nKTtcbiAgICBpZiAoIWNvbnRhY3RGb3JtKVxuICAgICAgICByZXR1cm47XG4gICAgY29udGFjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjb250YWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBjb25zdCBlbWFpbElucHV0ID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImVtYWlsXCJdJyk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJbnB1dCA9IGNvbnRhY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhW25hbWU9XCJtZXNzYWdlXCJdJyk7XG4gICAgICAgIC8vIFNpbXBsZSB2YWxpZGF0aW9uXG4gICAgICAgIGlmICghbmFtZUlucHV0LnZhbHVlLnRyaW0oKSB8fCAhZW1haWxJbnB1dC52YWx1ZS50cmltKCkgfHwgIW1lc3NhZ2VJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgIHNob3dDb250YWN0Rm9ybU1lc3NhZ2UoJ1BsZWFzZSBmaWxsIG91dCBhbGwgZmllbGRzJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGVyZSB5b3Ugd291bGQgdHlwaWNhbGx5IHNlbmQgdGhlIGZvcm0gZGF0YSB0byBhIHNlcnZlclxuICAgICAgICAvLyBGb3Igbm93LCB3ZSdsbCBqdXN0IHNpbXVsYXRlIGEgc3VjY2Vzc2Z1bCBzdWJtaXNzaW9uXG4gICAgICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBjb250YWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpO1xuICAgICAgICBjb25zdCBvcmlnaW5hbEJ0blRleHQgPSBzdWJtaXRCdG4uaW5uZXJIVE1MO1xuICAgICAgICBzdWJtaXRCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICBzdWJtaXRCdG4uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic3Bpbm5lclwiPjwvc3Bhbj4gU2VuZGluZy4uLic7XG4gICAgICAgIC8vIFNpbXVsYXRlIHNlcnZlciByZXF1ZXN0XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gUmVzZXQgZm9ybSBhbmQgc2hvdyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgIGNvbnRhY3RGb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBzdWJtaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5pbm5lckhUTUwgPSBvcmlnaW5hbEJ0blRleHQ7XG4gICAgICAgICAgICBzaG93Q29udGFjdEZvcm1NZXNzYWdlKCdNZXNzYWdlIHNlbnQgc3VjY2Vzc2Z1bGx5ISBXZVxcJ2xsIGdldCBiYWNrIHRvIHlvdSBzb29uLicsICdzdWNjZXNzJyk7XG4gICAgICAgICAgICAvLyBDbG9zZSB0aGUgcG9wdXAgYWZ0ZXIgYSBkZWxheVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtcG9wdXAnKTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGFjdFBvcHVwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSwgMTUwMCk7XG4gICAgfSk7XG59XG4vKipcbiAqIERpc3BsYXkgYSBtZXNzYWdlIGluIHRoZSBjb250YWN0IGZvcm1cbiAqL1xuZnVuY3Rpb24gc2hvd0NvbnRhY3RGb3JtTWVzc2FnZShtZXNzYWdlLCB0eXBlKSB7XG4gICAgY29uc3QgY29udGFjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1mb3JtJyk7XG4gICAgaWYgKCFjb250YWN0Rm9ybSlcbiAgICAgICAgcmV0dXJuO1xuICAgIC8vIFJlbW92ZSBhbnkgZXhpc3RpbmcgbWVzc2FnZVxuICAgIGNvbnN0IGV4aXN0aW5nTWVzc2FnZSA9IGNvbnRhY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW1lc3NhZ2UnKTtcbiAgICBpZiAoZXhpc3RpbmdNZXNzYWdlKSB7XG4gICAgICAgIGV4aXN0aW5nTWVzc2FnZS5yZW1vdmUoKTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIGFuZCBhZGQgbmV3IG1lc3NhZ2VcbiAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1lc3NhZ2VFbGVtZW50LmNsYXNzTmFtZSA9IGBmb3JtLW1lc3NhZ2UgJHt0eXBlfWA7XG4gICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIGNvbnRhY3RGb3JtLmFwcGVuZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcbiAgICAvLyBSZW1vdmUgbWVzc2FnZSBhZnRlciBhIGZldyBzZWNvbmRzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnJlbW92ZSgpO1xuICAgIH0sIDUwMDApO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBEYXJrIG1vZGUgZnVuY3Rpb25hbGl0eVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplRGFya01vZGUgPSBpbml0aWFsaXplRGFya01vZGU7XG5leHBvcnRzLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlID0gY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2U7XG4vKipcbiAqIEluaXRpYWxpemUgZGFyayBtb2RlIHRvZ2dsZVxuICogVGhpcyBjcmVhdGVzIGEgZmxvYXRpbmcgZGFyayBtb2RlIHRvZ2dsZSBidXR0b24gYW5kIGFkZHMgaXQgdG8gdGhlIERPTVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplRGFya01vZGUoKSB7XG4gICAgLy8gQ3JlYXRlIGRhcmsgbW9kZSB0b2dnbGUgYnV0dG9uXG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkYXJrTW9kZVRvZ2dsZS5jbGFzc05hbWUgPSAnZGFyay1tb2RlLXRvZ2dsZSc7XG4gICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLW1vb25cIj48L2k+JzsgLy8gTW9vbiBpY29uXG4gICAgZGFya01vZGVUb2dnbGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1RvZ2dsZSBEYXJrIE1vZGUnKTtcbiAgICAvLyBDaGVjayBpZiBkYXJrIG1vZGUgcHJlZmVyZW5jZSBpcyBhbHJlYWR5IHNldCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgY29uc3QgaXNEYXJrTW9kZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrTW9kZScpID09PSAndHJ1ZSc7XG4gICAgaWYgKGlzRGFya01vZGUpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLW1vZGUnKTtcbiAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvbiBmb3IgbGlnaHQgbW9kZVxuICAgIH1cbiAgICAvLyBBZGQgY2xpY2sgZXZlbnQgbGlzdGVuZXJcbiAgICBkYXJrTW9kZVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZURhcmtNb2RlKTtcbiAgICAvLyBBZGQgYnV0dG9uIHRvIHRoZSBET01cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRhcmtNb2RlVG9nZ2xlKTtcbn1cbi8qKlxuICogVG9nZ2xlIGRhcmsgbW9kZSBvbiBhbmQgb2ZmXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZURhcmtNb2RlKCkge1xuICAgIGNvbnN0IGlzRGFya01vZGUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmstbW9kZScpO1xuICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstbW9kZS10b2dnbGUnKTtcbiAgICAvLyBVcGRhdGUgaWNvbiBiYXNlZCBvbiBtb2RlXG4gICAgaWYgKGRhcmtNb2RlVG9nZ2xlKSB7XG4gICAgICAgIGlmIChpc0RhcmtNb2RlKSB7XG4gICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uIGZvciBsaWdodCBtb2RlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nOyAvLyBNb29uIGljb24gZm9yIGRhcmsgbW9kZVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFNhdmUgcHJlZmVyZW5jZSB0byBsb2NhbCBzdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmtNb2RlJywgaXNEYXJrTW9kZS50b1N0cmluZygpKTtcbn1cbi8qKlxuICogQ2hlY2sgaWYgdXNlciBoYXMgc3lzdGVtIGRhcmsgbW9kZSBwcmVmZXJlbmNlXG4gKiBJZiB0aGV5IGRvIGFuZCB3ZSBoYXZlbid0IHNldCBhIHByZWZlcmVuY2UgeWV0LCBhcHBseSBkYXJrIG1vZGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UoKSB7XG4gICAgLy8gT25seSBjaGVjayBpZiB1c2VyIGhhc24ndCBleHBsaWNpdGx5IHNldCBhIHByZWZlcmVuY2VcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcHJlZmVyc0RhcmtNb2RlID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzO1xuICAgICAgICBpZiAocHJlZmVyc0RhcmtNb2RlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICAgICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1tb2RlLXRvZ2dsZScpO1xuICAgICAgICAgICAgaWYgKGRhcmtNb2RlVG9nZ2xlKSB7XG4gICAgICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmtNb2RlJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2NvbXBvbmVudHMvaGVhZGVyLnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlbmRlckhlYWRlciA9IHJlbmRlckhlYWRlcjtcbi8qKlxuICogSGVhZGVyIENvbXBvbmVudFxuICogUmVuZGVycyB0aGUgaGVhZGVyIHNlY3Rpb24gaW50byBhIHRhcmdldCBjb250YWluZXIuXG4gKiBAcGFyYW0gY29udGFpbmVySWQgLSBUaGUgSUQgb2YgdGhlIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBoZWFkZXIgaW50by4gRGVmYXVsdHMgdG8gJ2hlYWRlci1wbGFjZWhvbGRlcicuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckhlYWRlcihjb250YWluZXJJZCA9ICdoZWFkZXItcGxhY2Vob2xkZXInKSB7XG4gICAgLy8gRW5zdXJlIHJ1bm5pbmcgaW4gYSBicm93c2VyIGVudmlyb25tZW50XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBGaW5kIHRoZSBjb250YWluZXIgZWxlbWVudCB3aGVyZSB0aGUgaGVhZGVyIHNob3VsZCBiZSBwbGFjZWRcbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXJJZCk7XG4gICAgaWYgKCFoZWFkZXJDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgSGVhZGVyIGNvbnRhaW5lciB3aXRoIElEICcke2NvbnRhaW5lcklkfScgbm90IGZvdW5kIGluIHRoZSBET00uYCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVmaW5lIHRoZSBoZWFkZXIgSFRNTCBzdHJ1Y3R1cmUgLSBtYXRjaGluZyBpbmRleC5odG1sXG4gICAgaGVhZGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGhlYWRlciBjbGFzcz1cInNpdGUtaGVhZGVyXCI+XG4gICAgICAgICAgICA8aDE+PGEgaHJlZj1cIi9cIj5CbG9nPC9hPjwvaDE+XG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvXCI+SG9tZTwvYT48L2xpPiBcbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvI2Fib3V0XCIgaWQ9XCJhYm91dC1idG5cIj5BYm91dDwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi8jcG9ydGZvbGlvXCI+UG9ydGZvbGlvPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiLyNjb250YWN0XCIgaWQ9XCJjb250YWN0LWJ0blwiPkNvbnRhY3Q8L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZvciBhcnRpY2xlcy4uLlwiIGNsYXNzPVwic2VhcmNoLWJhclwiPiBcbiAgICAgICAgPC9oZWFkZXI+XG4gICAgYDtcbiAgICAvLyBPcHRpb25hbDogQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgaGVhZGVyIGVsZW1lbnRzIGlmIG5lZWRlZCBoZXJlXG4gICAgLy8gRGVmaW5lIHRoZSBzZXR1cFNlYXJjaCBmdW5jdGlvbiB0byBoYW5kbGUgc2VhcmNoIGZ1bmN0aW9uYWxpdHlcbiAgICBmdW5jdGlvbiBzZXR1cFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1iYXInKTtcbiAgICAgICAgaWYgKCFzZWFyY2hCYXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NlYXJjaCBiYXIgZWxlbWVudCBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTZWFyY2hpbmcgZm9yOiAke3F1ZXJ5fWApO1xuICAgICAgICAgICAgLy8gQWRkIHNlYXJjaCBsb2dpYyBoZXJlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXR1cFNlYXJjaCgpOyAvLyBTZXR1cCBzZWFyY2ggZnVuY3Rpb25hbGl0eVxuICAgIC8vIERlZmluZSB0aGUgc2V0dXBQb3B1cEJ1dHRvbnMgZnVuY3Rpb24gdG8gaGFuZGxlIHBvcHVwIGZ1bmN0aW9uYWxpdHlcbiAgICBmdW5jdGlvbiBzZXR1cFBvcHVwQnV0dG9ucyhidXR0b25JZCwgcG9wdXBJZCkge1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9wdXBJZCk7XG4gICAgICAgIGlmICghYnV0dG9uIHx8ICFwb3B1cCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQnV0dG9uIHdpdGggSUQgJyR7YnV0dG9uSWR9JyBvciBwb3B1cCB3aXRoIElEICcke3BvcHVwSWR9JyBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgndmlzaWJsZScpOyAvLyBUb2dnbGUgdmlzaWJpbGl0eSBvZiB0aGUgcG9wdXBcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldHVwUG9wdXBCdXR0b25zKCdhYm91dC1idG4nLCAnYWJvdXQtcG9wdXAnKTsgLy8gU2V0dXAgcG9wdXAgZm9yIGFib3V0IGJ1dHRvblxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIE5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVOYXZpZ2F0aW9uID0gaW5pdGlhbGl6ZU5hdmlnYXRpb247XG4vKipcbiAqIEluaXRpYWxpemUgbmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVOYXZpZ2F0aW9uKCkge1xuICAgIHNldEFjdGl2ZU5hdkxpbmsoKTtcbiAgICBzZXR1cE5hdkxpbmtzKCk7XG59XG4vKipcbiAqIFNldCBhY3RpdmUgbmF2aWdhdGlvbiBsaW5rIGJhc2VkIG9uIGN1cnJlbnQgVVJMIG9yIHBhZ2Ugc2VjdGlvblxuICovXG5mdW5jdGlvbiBzZXRBY3RpdmVOYXZMaW5rKCkge1xuICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgJyNob21lJztcbiAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKGN1cnJlbnRQYXRoKTtcbn1cbi8qKlxuICogU2V0dXAgY2xpY2sgaGFuZGxlcnMgZm9yIG5hdmlnYXRpb24gbGlua3NcbiAqL1xuZnVuY3Rpb24gc2V0dXBOYXZMaW5rcygpIHtcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgIGlmIChocmVmKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlQWN0aXZlTmF2TGluayhocmVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZXMgZm9yIHBvcHVwIGxpbmtzXG4gICAgY29uc3QgYWJvdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtYnRuJyk7XG4gICAgY29uc3QgY29udGFjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWJ0bicpO1xuICAgIGlmIChhYm91dEJ0bikge1xuICAgICAgICBhYm91dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoJyNhYm91dCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGNvbnRhY3RCdG4pIHtcbiAgICAgICAgY29udGFjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoJyNjb250YWN0Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogVXBkYXRlIHRoZSBhY3RpdmUgbmF2aWdhdGlvbiBsaW5rXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCBvciBzZWN0aW9uIElEIHRvIGFjdGl2YXRlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZU5hdkxpbmsocGF0aCkge1xuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgbGlua3NcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIG1hdGNoaW5nIGxpbmtcbiAgICBjb25zdCBhY3RpdmVMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaGVhZGVyIG5hdiB1bCBsaSBhW2hyZWY9XCIke3BhdGh9XCJdYCk7XG4gICAgaWYgKGFjdGl2ZUxpbmspIHtcbiAgICAgICAgYWN0aXZlTGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVBhZ2luYXRpb24gPSBpbml0aWFsaXplUGFnaW5hdGlvbjtcbi8vIFBhZ2luYXRpb24gZnVuY3Rpb25hbGl0eVxuY29uc3QgY29tbWVudHNfMSA9IHJlcXVpcmUoXCIuL2NvbW1lbnRzXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplIHBhZ2luYXRpb24gZnVuY3Rpb25hbGl0eSB3aXRoIExvYWQgTW9yZSBidXR0b25cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVBhZ2luYXRpb24oKSB7XG4gICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgIGNvbnN0IGhpZGRlblBvc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbi1wb3N0cycpO1xuICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNhcmRzJyk7XG4gICAgaWYgKCFsb2FkTW9yZUJ0biB8fCAhaGlkZGVuUG9zdHMgfHwgIWJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1BhZ2luYXRpb24gZWxlbWVudHMgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgY3VycmVudFBhZ2UgPSAxO1xuICAgIGNvbnN0IHBvc3RzUGVyUGFnZSA9IDM7XG4gICAgY29uc3QgdG90YWxIaWRkZW5Qb3N0cyA9IGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAvLyBIaWRlIGxvYWQgbW9yZSBidXR0b24gaWYgbm8gaGlkZGVuIHBvc3RzXG4gICAgaWYgKHRvdGFsSGlkZGVuUG9zdHMgPT09IDApIHtcbiAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gICAgLy8gU2V0IHVwIGxvYWQgbW9yZSBidXR0b24gY2xpY2sgaGFuZGxlclxuICAgIGxvYWRNb3JlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsb2FkTW9yZVBvc3RzKGxvYWRNb3JlQnRuLCBoaWRkZW5Qb3N0cywgYmxvZ0NhcmRzQ29udGFpbmVyLCBjdXJyZW50UGFnZSwgcG9zdHNQZXJQYWdlKTtcbiAgICAgICAgY3VycmVudFBhZ2UrKztcbiAgICB9KTtcbiAgICAvLyBJbml0aWFsaXplIHNjcm9sbC1iYXNlZCBsb2FkaW5nIChpbmZpbml0ZSBzY3JvbGwpXG4gICAgaW5pdGlhbGl6ZUluZmluaXRlU2Nyb2xsKGxvYWRNb3JlQnRuKTtcbn1cbi8qKlxuICogTG9hZCBtb3JlIHBvc3RzIHdoZW4gdGhlIGxvYWQgbW9yZSBidXR0b24gaXMgY2xpY2tlZFxuICovXG5mdW5jdGlvbiBsb2FkTW9yZVBvc3RzKGxvYWRNb3JlQnRuLCBoaWRkZW5Qb3N0cywgYmxvZ0NhcmRzQ29udGFpbmVyLCBjdXJyZW50UGFnZSwgcG9zdHNQZXJQYWdlKSB7XG4gICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xuICAgIGxvYWRNb3JlQnRuLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNwaW5uZXJcIj48L3NwYW4+IExvYWRpbmcuLi4nO1xuICAgIC8vIFNpbXVsYXRlIGxvYWRpbmcgZGVsYXkgZm9yIGJldHRlciBVWFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggcG9zdHMgdG8gbG9hZFxuICAgICAgICBjb25zdCBzdGFydElkeCA9IChjdXJyZW50UGFnZSAtIDEpICogcG9zdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCBlbmRJZHggPSBNYXRoLm1pbihzdGFydElkeCArIHBvc3RzUGVyUGFnZSwgaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICAgICAgbGV0IHBvc3RzTG9hZGVkID0gMDtcbiAgICAgICAgLy8gQ2xvbmUgYW5kIG1vdmUgcG9zdHMgZnJvbSBoaWRkZW4gY29udGFpbmVyIHRvIHZpc2libGUgYmxvZyBjYXJkc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc3RzUGVyUGFnZSAmJiBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGggPiAwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RUb0FkZCA9IGhpZGRlblBvc3RzLmNoaWxkcmVuWzBdOyAvLyBBbHdheXMgdGFrZSB0aGUgZmlyc3QgZWxlbWVudFxuICAgICAgICAgICAgaWYgKHBvc3RUb0FkZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lZFBvc3QgPSBwb3N0VG9BZGQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgICAgIGNsb25lZFBvc3QuY2xhc3NMaXN0LmFkZCgnbmV3Jyk7IC8vIEFkZCBjbGFzcyBmb3IgYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZFBvc3QpO1xuICAgICAgICAgICAgICAgIGhpZGRlblBvc3RzLnJlbW92ZUNoaWxkKHBvc3RUb0FkZCk7XG4gICAgICAgICAgICAgICAgcG9zdHNMb2FkZWQrKztcbiAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBuZXcgcG9zdHNcbiAgICAgICAgICAgICAgICAoMCwgY29tbWVudHNfMS5pbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5KShjbG9uZWRQb3N0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayBpZiB3ZSd2ZSBsb2FkZWQgYWxsIHBvc3RzXG4gICAgICAgIGlmIChoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVzZXQgYnV0dG9uIHN0YXRlXG4gICAgICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgICAgICAgbG9hZE1vcmVCdG4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+IExvYWQgTW9yZSBQb3N0cyc7XG4gICAgICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudCB3aGVuIHBvc3RzIGFyZSBsb2FkZWRcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Bvc3RzTG9hZGVkJywgeyBkZXRhaWw6IHsgY291bnQ6IHBvc3RzTG9hZGVkIH0gfSk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0sIDgwMCk7IC8vIFNpbXVsYXRlIG5ldHdvcmsgZGVsYXlcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBpbmZpbml0ZSBzY3JvbGwgZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplSW5maW5pdGVTY3JvbGwobG9hZE1vcmVCdG4pIHtcbiAgICBsZXQgc2Nyb2xsVGltZW91dDtcbiAgICBsZXQgaXNMb2FkaW5nTW9yZVBvc3RzID0gZmFsc2U7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBoaWRkZW4gKGFsbCBwb3N0cyBsb2FkZWQpIG9yIGFscmVhZHkgaW4gbG9hZGluZyBzdGF0ZSwgZG8gbm90aGluZ1xuICAgICAgICBpZiAobG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnIHx8XG4gICAgICAgICAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ2xvYWRpbmcnKSB8fFxuICAgICAgICAgICAgaXNMb2FkaW5nTW9yZVBvc3RzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVvdXQpO1xuICAgICAgICBzY3JvbGxUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzY3JvbGxUb3AsIHNjcm9sbEhlaWdodCwgY2xpZW50SGVpZ2h0IH0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICAvLyBXaGVuIHVzZXIgc2Nyb2xscyB0byBib3R0b20gKHdpdGggc29tZSBidWZmZXIpXG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0ID49IHNjcm9sbEhlaWdodCAtIDIwMCkge1xuICAgICAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBmbGFnIGFmdGVyIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nTW9yZVBvc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplU2VhcmNoID0gaW5pdGlhbGl6ZVNlYXJjaDtcbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTtcbmNvbnN0IGJsb2dDYXJkc18xID0gcmVxdWlyZShcIi4vYmxvZ0NhcmRzXCIpO1xuY29uc3QgY29tbWVudHNfMSA9IHJlcXVpcmUoXCIuL2NvbW1lbnRzXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplIHNlYXJjaCBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVTZWFyY2goKSB7XG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwic2VhcmNoXCJdJyk7XG4gICAgaWYgKCFzZWFyY2hJbnB1dCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1NlYXJjaCBpbnB1dCBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEN5Y2xlIHRocm91Z2ggZGlmZmVyZW50IHBsYWNlaG9sZGVyIHRleHRzXG4gICAgc2V0dXBQbGFjZWhvbGRlckN5Y2xpbmcoc2VhcmNoSW5wdXQpO1xuICAgIC8vIFNldCB1cCBzZWFyY2ggaW5wdXQgZXZlbnQgaGFuZGxlclxuICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICAgICAgaGFuZGxlU2VhcmNoKGUudGFyZ2V0KTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ3ljbGUgdGhyb3VnaCBkaWZmZXJlbnQgcGxhY2Vob2xkZXIgdGV4dHMgZm9yIHRoZSBzZWFyY2ggaW5wdXRcbiAqL1xuZnVuY3Rpb24gc2V0dXBQbGFjZWhvbGRlckN5Y2xpbmcoc2VhcmNoSW5wdXQpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBbXG4gICAgICAgIFwiU2VhcmNoIGZvciBhcnRpY2xlcy4uLlwiLFxuICAgICAgICBcIlNlYXJjaCBmb3IgdG9waWNzLi4uXCIsXG4gICAgICAgIFwiU2VhcmNoIGZvciBhdXRob3JzLi4uXCJcbiAgICBdO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBzZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyc1tpbmRleF07XG4gICAgICAgIGluZGV4ID0gKGluZGV4ICsgMSkgJSBwbGFjZWhvbGRlcnMubGVuZ3RoO1xuICAgIH0sIDMwMDApO1xufVxuLyoqXG4gKiBIYW5kbGUgc2VhcmNoIGlucHV0IGFuZCBmaWx0ZXIgYmxvZyBwb3N0c1xuICovXG5mdW5jdGlvbiBoYW5kbGVTZWFyY2goc2VhcmNoSW5wdXQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChzZWFyY2hUZXJtLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIC8vIElmIHNlYXJjaCBpcyBjbGVhcmVkLCByZWxvYWQgYWxsIHBvc3RzXG4gICAgICAgICAgICBpZiAoc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBEaXNwYXRjaCBldmVudCB0byByZWxvYWQgcG9zdHNcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgncmVsb2FkUG9zdHMnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNhcmRzJyk7XG4gICAgICAgIGlmICghYmxvZ0NhcmRzQ29udGFpbmVyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj48L2Rpdj4nO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRmV0Y2ggYWxsIHBvc3RzIGFuZCBmaWx0ZXIgY2xpZW50LXNpZGVcbiAgICAgICAgICAgIC8vIEluIGEgcmVhbCBhcHAsIHlvdSdkIGltcGxlbWVudCBzZXJ2ZXItc2lkZSBzZWFyY2hcbiAgICAgICAgICAgIGNvbnN0IHBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRQb3N0cyA9IGZpbHRlclBvc3RzKHBvc3RzLCBzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgIC8vIENsZWFyIGNvbnRhaW5lclxuICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgaWYgKGZpbHRlcmVkUG9zdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU2hvdyBlbXB0eSBzZWFyY2ggcmVzdWx0c1xuICAgICAgICAgICAgICAgIHNob3dFbXB0eVNlYXJjaFJlc3VsdHMoYmxvZ0NhcmRzQ29udGFpbmVyLCBzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEaXNwbGF5IGZpbHRlcmVkIHBvc3RzXG4gICAgICAgICAgICBkaXNwbGF5RmlsdGVyZWRQb3N0cyhmaWx0ZXJlZFBvc3RzLCBibG9nQ2FyZHNDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2VhcmNoaW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dTZWFyY2hFcnJvcihibG9nQ2FyZHNDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEZpbHRlciBwb3N0cyBiYXNlZCBvbiBzZWFyY2ggdGVybVxuICovXG5mdW5jdGlvbiBmaWx0ZXJQb3N0cyhwb3N0cywgc2VhcmNoVGVybSkge1xuICAgIHJldHVybiBwb3N0cy5maWx0ZXIocG9zdCA9PiBwb3N0LnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkgfHxcbiAgICAgICAgcG9zdC5jb250ZW50LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkgfHxcbiAgICAgICAgcG9zdC5hdXRob3IudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtKSB8fFxuICAgICAgICAocG9zdC50YWdzICYmIHBvc3QudGFncy5zb21lKHRhZyA9PiB0YWcudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtKSkpKTtcbn1cbi8qKlxuICogRGlzcGxheSBmaWx0ZXJlZCBwb3N0cyBpbiB0aGUgYmxvZyBjb250YWluZXJcbiAqL1xuZnVuY3Rpb24gZGlzcGxheUZpbHRlcmVkUG9zdHMoZmlsdGVyZWRQb3N0cywgY29udGFpbmVyKSB7XG4gICAgZmlsdGVyZWRQb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICBjb25zdCBibG9nQ2FyZCA9ICgwLCBibG9nQ2FyZHNfMS5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQpKHBvc3QpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvZ0NhcmQpO1xuICAgICAgICAvLyBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBmaWx0ZXJlZCBwb3N0c1xuICAgICAgICAoMCwgY29tbWVudHNfMS5pbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5KShibG9nQ2FyZCk7XG4gICAgfSk7XG4gICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50IHdoZW4gc2VhcmNoIHJlc3VsdHMgYXJlIGRpc3BsYXllZFxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZWFyY2hSZXN1bHRzRGlzcGxheWVkJywge1xuICAgICAgICBkZXRhaWw6IHsgY291bnQ6IGZpbHRlcmVkUG9zdHMubGVuZ3RoIH1cbiAgICB9KSk7XG59XG4vKipcbiAqIERpc3BsYXkgZW1wdHkgc2VhcmNoIHJlc3VsdHMgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBzaG93RW1wdHlTZWFyY2hSZXN1bHRzKGNvbnRhaW5lciwgc2VhcmNoVGVybSkge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1zZWFyY2hcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXNlYXJjaCBmYS0zeFwiPjwvaT5cbiAgICAgICAgICAgIDxoMz5ObyByZXN1bHRzIGZvdW5kPC9oMz5cbiAgICAgICAgICAgIDxwPk5vIHBvc3RzIG1hdGNoIHlvdXIgc2VhcmNoIGZvciBcIiR7c2VhcmNoVGVybX1cIjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbn1cbi8qKlxuICogRGlzcGxheSBzZWFyY2ggZXJyb3IgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBzaG93U2VhcmNoRXJyb3IoY29udGFpbmVyKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXN0YXRlXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBmYS0zeFwiPjwvaT5cbiAgICAgICAgICAgIDxoMz5TZWFyY2ggZmFpbGVkPC9oMz5cbiAgICAgICAgICAgIDxwPkZhaWxlZCB0byBzZWFyY2ggYmxvZyBwb3N0cy4gUGxlYXNlIHRyeSBhZ2Fpbi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQmxvZ0Zyb250ZW5kID0gaW5pdGlhbGl6ZUJsb2dGcm9udGVuZDtcbi8qKlxuICogQmxvZyBGcm9udGVuZCBDb250cm9sbGVyXG4gKiBDbGllbnQtc2lkZSBjb250cm9sbGVyIHRoYXQgaGFuZGxlcyBhbGwgZnJvbnRlbmQgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGJsb2cuXG4gKiBNYW5hZ2VzIFVJIGluaXRpYWxpemF0aW9uLCBwb3N0IHJlbmRlcmluZywgYW5kIHVzZXIgaW50ZXJhY3Rpb25zLlxuICovXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCBibG9nQ2FyZHNfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Jsb2dDYXJkc1wiKTtcbmNvbnN0IGNvbW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9jb21tZW50c1wiKTtcbmNvbnN0IGRhcmtNb2RlXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXJrTW9kZVwiKTtcbmNvbnN0IGNvbnRhY3RfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2NvbnRhY3RcIik7XG5jb25zdCBwYWdpbmF0aW9uXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9wYWdpbmF0aW9uXCIpO1xuY29uc3Qgc2VhcmNoXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9zZWFyY2hcIik7XG5jb25zdCBhYm91dF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYWJvdXRcIik7XG5jb25zdCBuYXZpZ2F0aW9uXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9uYXZpZ2F0aW9uXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBibG9nIGZ1bmN0aW9uYWxpdHlcbiAqIFNldHMgdXAgYWxsIFVJIGNvbXBvbmVudHMgYW5kIGluaXRpYWxpemVzIHRoZSBibG9nIHBvc3RzIGRpc3BsYXlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBDaGVjayBmb3Igc3lzdGVtIGRhcmsgbW9kZSBwcmVmZXJlbmNlIGZpcnN0XG4gICAgICAgICgwLCBkYXJrTW9kZV8xLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKSgpO1xuICAgICAgICAvLyBJbml0aWFsaXplIG5hdmlnYXRpb24gZmlyc3QgdG8gZW5zdXJlIGFjdGl2ZSBzdGF0ZXMgYXJlIHNldFxuICAgICAgICAoMCwgbmF2aWdhdGlvbl8xLmluaXRpYWxpemVOYXZpZ2F0aW9uKSgpO1xuICAgICAgICAvLyBJbml0aWFsaXplIGFsbCBVSSBjb21wb25lbnRzXG4gICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgKDAsIGNvbnRhY3RfMS5pbml0aWFsaXplQ29udGFjdEZvcm0pKCk7XG4gICAgICAgICgwLCBhYm91dF8xLmluaXRpYWxpemVBYm91dCkoKTsgLy8gSW5pdGlhbGl6ZSBBYm91dCBwb3B1cFxuICAgICAgICAoMCwgc2VhcmNoXzEuaW5pdGlhbGl6ZVNlYXJjaCkoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgYmxvZyBwb3N0c1xuICAgICAgICB5aWVsZCBpbml0aWFsaXplUG9zdHMoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBwYWdpbmF0aW9uIGFmdGVyIHBvc3RzIGFyZSBsb2FkZWRcbiAgICAgICAgKDAsIHBhZ2luYXRpb25fMS5pbml0aWFsaXplUGFnaW5hdGlvbikoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5XG4gICAgICAgICgwLCBjb21tZW50c18xLmluaXRpYWxpemVDb21tZW50cykoKTtcbiAgICAgICAgLy8gU2V0IHVwIGV2ZW50IGRlbGVnYXRpb24gZm9yIGJsb2cgY2FyZHNcbiAgICAgICAgc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCk7XG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgcmVsb2FkaW5nIHBvc3RzICh1c2VkIGJ5IHNlYXJjaClcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVsb2FkUG9zdHMnLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB5aWVsZCBpbml0aWFsaXplUG9zdHMoKTtcbiAgICAgICAgICAgICgwLCBwYWdpbmF0aW9uXzEuaW5pdGlhbGl6ZVBhZ2luYXRpb24pKCk7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgZXZlbnQgZGVsZWdhdGlvbiBpcyBzZXQgdXAgYWdhaW4gYWZ0ZXIgcmVsb2FkaW5nIHBvc3RzXG4gICAgICAgICAgICBzZXR1cEJsb2dDYXJkc0RlbGVnYXRpb24oKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgZXZlbnQgZGVsZWdhdGlvbiBmb3IgYmxvZyBjYXJkcyBjb250YWluZXJcbiAqIE1vcmUgZWZmaWNpZW50IHRoYW4gYXR0YWNoaW5nIGV2ZW50IGxpc3RlbmVycyB0byBlYWNoIGNhcmRcbiAqL1xuZnVuY3Rpb24gc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCkge1xuICAgIC8vIEdldCBib3RoIHByaW1hcnkgYW5kIGhpZGRlbiBibG9nIGNvbnRhaW5lcnNcbiAgICBjb25zdCBibG9nQ29udGFpbmVycyA9IFtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZHMnKSxcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbi1wb3N0cycpXG4gICAgXTtcbiAgICAvLyBBcHBseSBkZWxlZ2F0aW9uIHRvIGVhY2ggY29udGFpbmVyXG4gICAgYmxvZ0NvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgICBpZiAoIWNvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gUmVtb3ZlIGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVyIGlmIGl0IGV4aXN0cyAodG8gcHJldmVudCBkdXBsaWNhdGVzKVxuICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVCbG9nQ2FyZENsaWNrKTtcbiAgICAgICAgLy8gQWRkIHRoZSBuZXcgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQmxvZ0NhcmRDbGljayk7XG4gICAgfSk7XG59XG4vKipcbiAqIEhhbmRsZSBjbGljayBldmVudHMgb24gYmxvZyBjYXJkcyB1c2luZyBldmVudCBkZWxlZ2F0aW9uXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUJsb2dDYXJkQ2xpY2soZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgLy8gRmluZCB0aGUgY2xvc2VzdCBibG9nIGNhcmQgdG8gdGhlIGNsaWNrZWQgZWxlbWVudFxuICAgIGNvbnN0IGNhcmQgPSB0YXJnZXQuY2xvc2VzdCgnLmJsb2ctY2FyZCcpO1xuICAgIGlmIChjYXJkKSB7XG4gICAgICAgIC8vIERvbid0IG5hdmlnYXRlIGlmIGNsaWNraW5nIG9uIGJ1dHRvbnMsIGxpbmtzLCBvciBpY29uc1xuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbicpIHx8XG4gICAgICAgICAgICB0YXJnZXQuY2xvc2VzdCgnYScpIHx8XG4gICAgICAgICAgICB0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgdGhlIHBvc3QgSUQgZnJvbSB0aGUgY2FyZCdzIGRhdGEgYXR0cmlidXRlXG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IGNhcmQuZ2V0QXR0cmlidXRlKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL3Bvc3QuaHRtbD9pZD0ke3Bvc3RJZH1gOyAvLyBOT1QgL3B1YmxpYy9wb3N0Lmh0bWxcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBibG9nIHBvc3RzIGZyb20gQVBJXG4gKiBGZXRjaGVzIHBvc3RzIGZyb20gdGhlIEFQSSBhbmQgcmVuZGVycyB0aGVtIGluIHRoZSBVSVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZHMnKTtcbiAgICAgICAgaWYgKCFibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQmxvZyBjYXJkcyBjb250YWluZXIgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQ2xlYXIgbG9hZGluZyBwbGFjZWhvbGRlciBvciBleGlzdGluZyBjb250ZW50XG4gICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj48L2Rpdj4nO1xuICAgICAgICAgICAgLy8gRmV0Y2ggcG9zdHMgZnJvbSBBUElcbiAgICAgICAgICAgIGNvbnN0IHBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgaWYgKHBvc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIFNob3cgZW1wdHkgc3RhdGVcbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTdGF0ZShibG9nQ2FyZHNDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENsZWFyIGNvbnRhaW5lclxuICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgLy8gRGlzcGxheSBmaXJzdCAzIHBvc3RzXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5UG9zdHMgPSBwb3N0cy5zbGljZSgwLCAzKTtcbiAgICAgICAgICAgIGNvbnN0IGhpZGRlblBvc3RzID0gcG9zdHMuc2xpY2UoMyk7XG4gICAgICAgICAgICAvLyBBZGQgdmlzaWJsZSBwb3N0cyB0byBtYWluIGNvbnRhaW5lclxuICAgICAgICAgICAgZGlzcGxheVBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvZ0NhcmQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBBZGQgaGlkZGVuIHBvc3RzIHRvIGhpZGRlbiBjb250YWluZXJcbiAgICAgICAgICAgIGNvbnN0IGhpZGRlblBvc3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbi1wb3N0cycpO1xuICAgICAgICAgICAgaWYgKGhpZGRlblBvc3RzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuUG9zdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvZ0NhcmQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlIGxvYWQgbW9yZSBidXR0b24gdmlzaWJpbGl0eVxuICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgICAgICAgICAgaWYgKGxvYWRNb3JlQnRuKSB7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9IGhpZGRlblBvc3RzLmxlbmd0aCA+IDAgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW5pdGlhbGl6aW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvclN0YXRlKGJsb2dDYXJkc0NvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogU2hvdyBlbXB0eSBzdGF0ZSB3aGVuIG5vIHBvc3RzIGFyZSBhdmFpbGFibGVcbiAqIENyZWF0ZXMgYW5kIGFwcGVuZHMgRE9NIGVsZW1lbnRzIGluc3RlYWQgb2YgdXNpbmcgaW5uZXJIVE1MIGZvciBiZXR0ZXIgbWFpbnRhaW5hYmlsaXR5XG4gKi9cbmZ1bmN0aW9uIHNob3dFbXB0eVN0YXRlKGNvbnRhaW5lcikge1xuICAgIC8vIENsZWFyIHRoZSBjb250YWluZXIgZmlyc3RcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgLy8gQ3JlYXRlIHRoZSBlbXB0eSBzdGF0ZSBjb250YWluZXJcbiAgICBjb25zdCBlbXB0eVN0YXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW1wdHlTdGF0ZURpdi5jbGFzc05hbWUgPSAnZW1wdHktc3RhdGUnO1xuICAgIC8vIENyZWF0ZSBhbmQgYWRkIHRoZSBpY29uXG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBpY29uLmNsYXNzTmFtZSA9ICdmYXMgZmEtZmlsZS1hbHQgZmEtM3gnO1xuICAgIGVtcHR5U3RhdGVEaXYuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgLy8gQ3JlYXRlIGFuZCBhZGQgdGhlIGhlYWRpbmdcbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBoZWFkaW5nLnRleHRDb250ZW50ID0gJ05vIHBvc3RzIGZvdW5kJztcbiAgICBlbXB0eVN0YXRlRGl2LmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuICAgIC8vIENyZWF0ZSBhbmQgYWRkIHRoZSBwYXJhZ3JhcGhcbiAgICBjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgcGFyYWdyYXBoLnRleHRDb250ZW50ID0gJ0JlIHRoZSBmaXJzdCB0byBjcmVhdGUgYSBibG9nIHBvc3QhJztcbiAgICBlbXB0eVN0YXRlRGl2LmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG4gICAgLy8gQXBwZW5kIHRoZSBlbXB0eSBzdGF0ZSB0byB0aGUgY29udGFpbmVyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVtcHR5U3RhdGVEaXYpO1xufVxuLyoqXG4gKiBTaG93IGVycm9yIHN0YXRlIHdoZW4gcG9zdHMgY291bGRuJ3QgYmUgbG9hZGVkXG4gKiBDcmVhdGVzIGFuZCBhcHBlbmRzIERPTSBlbGVtZW50cyBpbnN0ZWFkIG9mIHVzaW5nIGlubmVySFRNTCBmb3IgYmV0dGVyIG1haW50YWluYWJpbGl0eVxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JTdGF0ZShjb250YWluZXIpIHtcbiAgICAvLyBDbGVhciB0aGUgY29udGFpbmVyIGZpcnN0XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIC8vIENyZWF0ZSB0aGUgZXJyb3Igc3RhdGUgY29udGFpbmVyXG4gICAgY29uc3QgZXJyb3JTdGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVycm9yU3RhdGVEaXYuY2xhc3NOYW1lID0gJ2Vycm9yLXN0YXRlJztcbiAgICAvLyBDcmVhdGUgYW5kIGFkZCB0aGUgaWNvblxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmFzIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGZhLTN4JztcbiAgICBlcnJvclN0YXRlRGl2LmFwcGVuZENoaWxkKGljb24pO1xuICAgIC8vIENyZWF0ZSBhbmQgYWRkIHRoZSBoZWFkaW5nXG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgaGVhZGluZy50ZXh0Q29udGVudCA9ICdTb21ldGhpbmcgd2VudCB3cm9uZyc7XG4gICAgZXJyb3JTdGF0ZURpdi5hcHBlbmRDaGlsZChoZWFkaW5nKTtcbiAgICAvLyBDcmVhdGUgYW5kIGFkZCB0aGUgcGFyYWdyYXBoXG4gICAgY29uc3QgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHBhcmFncmFwaC50ZXh0Q29udGVudCA9ICdGYWlsZWQgdG8gbG9hZCBibG9nIHBvc3RzLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLic7XG4gICAgZXJyb3JTdGF0ZURpdi5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuICAgIC8vIEFwcGVuZCB0aGUgZXJyb3Igc3RhdGUgdG8gdGhlIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlcnJvclN0YXRlRGl2KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2VudHJpZXMvY2xpZW50LnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIEltcG9ydHMgZm9yIHRoZSBmdW5jdGlvbnMgdG8gYmUgY2FsbGVkXG5jb25zdCBibG9nRnJvbnRlbmRDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvYmxvZ0Zyb250ZW5kQ29udHJvbGxlclwiKTsgLy8gRm9yIG1haW4gcGFnZSAoaW5kZXguaHRtbClcbi8vIEltcG9ydCB0aGUgc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24gZm9yIHRoZSBwb3N0IGRldGFpbCBwYWdlIChPcHRpb24gQilcbmNvbnN0IHBvc3REZXRhaWxfMSA9IHJlcXVpcmUoXCIuLi9tb2R1bGVzL3Bvc3REZXRhaWxcIik7IC8vIEFkanVzdCBwYXRoIGlmIHlvdXIgbW9kdWxlIGlzIGVsc2V3aGVyZVxuLy8gSW1wb3J0IGNvbW1vbiBjb21wb25lbnRzIG5lZWRlZCBvbiBwb3RlbnRpYWxseSBtdWx0aXBsZSBwYWdlc1xuY29uc3QgaGVhZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vKipcbiAqIENsaWVudC1zaWRlIGVudHJ5IHBvaW50IGluaXRpYWxpemVyLlxuICogRGV0ZXJtaW5lcyB0aGUgY3VycmVudCBwYWdlIGFuZCBydW5zIHRoZSBhcHByb3ByaWF0ZSBsb2dpYy5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNsaWVudCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpZW50IGluaXRpYWxpemluZy4uLicpO1xuICAgICAgICAvLyAtLS0gSW5pdGlhbGl6ZSBjb21tb24gZWxlbWVudHMgZmlyc3QgLS0tXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEYXJrIG1vZGUgaW5pdGlhbGl6ZWQgZ2xvYmFsbHkuJyk7XG4gICAgICAgICAgICAoMCwgaGVhZGVyXzEucmVuZGVySGVhZGVyKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0hlYWRlciByZW5kZXJlZCBnbG9iYWxseS4nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgY29tbW9uIGVsZW1lbnRzOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gLS0tIEVuZCBjb21tb24gZWxlbWVudHMgLS0tXG4gICAgICAgIC8vIC0tLSBQYWdlLXNwZWNpZmljIGxvZ2ljIC0tLVxuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5wYWdlOyAvLyBVc2UgZGF0YSBhdHRyaWJ1dGUgZnJvbSA8Ym9keT5cbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7IC8vIEZhbGxiYWNrIHBhdGhcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZXRlY3RlZCBwYWdlVHlwZTogJHtwYWdlVHlwZX0sIGN1cnJlbnRQYWdlOiAke2N1cnJlbnRQYWdlfWApO1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIE1haW4gUGFnZSAoaW5kZXguaHRtbCBzZXJ2ZWQgYXQgLylcbiAgICAgICAgICAgIC8vIFVzZSBkYXRhLXBhZ2U9XCJtYWluXCIgcHJpbWFyaWx5LCBmYWxsIGJhY2sgdG8gcGF0aCBjaGVjayBmb3IgJy8nIG9yICcvaW5kZXguaHRtbCdcbiAgICAgICAgICAgIGlmIChwYWdlVHlwZSA9PT0gJ21haW4nIHx8ICghcGFnZVR5cGUgJiYgKGN1cnJlbnRQYWdlID09PSAnLycgfHwgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9pbmRleC5odG1sJykpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgbWFpbiBibG9nIHBhZ2UgbG9naWMuLi4nKTtcbiAgICAgICAgICAgICAgICB5aWVsZCAoMCwgYmxvZ0Zyb250ZW5kQ29udHJvbGxlcl8xLmluaXRpYWxpemVCbG9nRnJvbnRlbmQpKCk7IC8vIEluaXRpYWxpemUgYmxvZyBjYXJkcywgcGFnaW5hdGlvbiBldGMuIGZvciB0aGUgbWFpbiBwYWdlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01haW4gYmxvZyBwYWdlIGxvZ2ljIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBQb3N0IERldGFpbCBQYWdlIChwb3N0Lmh0bWwgc2VydmVkIGF0IC9wb3N0Lmh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ3Bvc3QnIHx8ICghcGFnZVR5cGUgJiYgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9wb3N0Lmh0bWwnKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIHBvc3QgZGV0YWlsIHBhZ2UgbG9naWMgKGZyb20gbW9kdWxlKS4uLicpO1xuICAgICAgICAgICAgICAgIC8vIENhbGwgdGhlIHJlZmFjdG9yZWQgZnVuY3Rpb24gZnJvbSB0aGUgbW9kdWxlLlxuICAgICAgICAgICAgICAgIC8vIEl0IGhhbmRsZXMgZ2V0dGluZyB0aGUgcG9zdElkIGZyb20gdGhlIFVSTCBpbnRlcm5hbGx5LlxuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBwb3N0RGV0YWlsXzEuaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMpKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGV0YWlsIHBhZ2UgbG9naWMgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIEFkbWluIFBhZ2UgKGFkbWluLmh0bWwgc2VydmVkIGF0IC9hZG1pbi5odG1sKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFnZVR5cGUgPT09ICdhZG1pbicgfHwgKCFwYWdlVHlwZSAmJiBjdXJyZW50UGFnZS5lbmRzV2l0aCgnL2FkbWluLmh0bWwnKSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGJ1bmRsZSAoY2xpZW50LmJ1bmRsZS5qcykgc2hvdWxkbid0IHJ1biBhZG1pbi1zcGVjaWZpYyBpbml0IGxvZ2ljLlxuICAgICAgICAgICAgICAgIC8vIGFkbWluLmJ1bmRsZS5qcyBoYW5kbGVzIHRoYXQgcGFnZS5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWRtaW4gcGFnZSBkZXRlY3RlZCBieSBjbGllbnQudHMgLSBubyBhY3Rpb24gdGFrZW4uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVW5rbm93biBwYWdlIHR5cGUgKCcke3BhZ2VUeXBlfScpIG9yIHBhdGggKCcke2N1cnJlbnRQYWdlfScpLiBObyBzcGVjaWZpYyBpbml0aWFsaXphdGlvbiBuZWVkZWQgZnJvbSBjbGllbnQudHMuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgcGFnZS1zcGVjaWZpYyBjbGllbnQgaW5pdGlhbGl6YXRpb246JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyBFbnN1cmUgdGhlIERPTSBpcyBmdWxseSBsb2FkZWQgYmVmb3JlIHJ1bm5pbmcgaW5pdGlhbGl6YXRpb24gbG9naWNcbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGl6ZUNsaWVudCk7XG59XG5lbHNlIHtcbiAgICAvLyBET01Db250ZW50TG9hZGVkIGhhcyBhbHJlYWR5IGZpcmVkXG4gICAgaW5pdGlhbGl6ZUNsaWVudCgpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvbW9kdWxlcy9wb3N0RGV0YWlsLnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uID0gZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uO1xuZXhwb3J0cy5hZGRQb3N0VG9TZXNzaW9uTGlrZXMgPSBhZGRQb3N0VG9TZXNzaW9uTGlrZXM7XG5leHBvcnRzLnJlbW92ZVBvc3RGcm9tU2Vzc2lvbkxpa2VzID0gcmVtb3ZlUG9zdEZyb21TZXNzaW9uTGlrZXM7XG5leHBvcnRzLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljID0gaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWM7XG5leHBvcnRzLmxvYWRQb3N0Q29udGVudCA9IGxvYWRQb3N0Q29udGVudDtcbmV4cG9ydHMudXBkYXRlUG9zdFVJID0gdXBkYXRlUG9zdFVJO1xuZXhwb3J0cy51cGRhdGVQYWdlTWV0YWRhdGEgPSB1cGRhdGVQYWdlTWV0YWRhdGE7XG5leHBvcnRzLmluaXRpYWxpemVTb2NpYWxTaGFyaW5nID0gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmc7XG5leHBvcnRzLnNob3dFcnJvck1lc3NhZ2UgPSBzaG93RXJyb3JNZXNzYWdlO1xuZXhwb3J0cy5pbml0aWFsaXplTGlrZUJ1dHRvbiA9IGluaXRpYWxpemVMaWtlQnV0dG9uO1xuZXhwb3J0cy5sb2FkQ29tbWVudHMgPSBsb2FkQ29tbWVudHM7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50Rm9ybSA9IGluaXRpYWxpemVDb21tZW50Rm9ybTtcbi8vIC0tLSBJbXBvcnRzIC0tLVxuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3QgaGVhZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vLyBQbGFjZWhvbGRlciBBUEkgZnVuY3Rpb25zIGZvciBjb21tZW50cyAocmVwbGFjZSB3aXRoIGFjdHVhbCBpbXBsZW1lbnRhdGlvbilcbmNvbnN0IGZldGNoQ29tbWVudHNBcGkgPSAoaWQpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnNvbGUubG9nKGBBUEk6IEZldGNoaW5nIGNvbW1lbnRzIGZvciAke2lkfWApO1xuICAgIHJldHVybiBbXG4gICAgICAgIHsgaWQ6IDEsIG5hbWU6ICdBbGljZScsIGNvbW1lbnQ6ICdHcmVhdCBwb3N0IScsIGNyZWF0ZWRBdDogbmV3IERhdGUoKSB9LFxuICAgICAgICB7IGlkOiAyLCBuYW1lOiAnQm9iJywgY29tbWVudDogJ1ZlcnkgaW5mb3JtYXRpdmUuJywgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpIH1cbiAgICBdO1xufSk7XG5jb25zdCBzdWJtaXRDb21tZW50QXBpID0gKGlkLCBuYW1lLCBjb21tZW50KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zb2xlLmxvZyhgQVBJOiBTdWJtaXR0aW5nIGNvbW1lbnQgZm9yICR7aWR9YCwgeyBuYW1lLCBjb21tZW50IH0pO1xuICAgIHJldHVybiB7IGlkOiBEYXRlLm5vdygpLCBuYW1lLCBjb21tZW50LCBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkgfTtcbn0pO1xuLy8gLS0tIFNlc3Npb24gU3RvcmFnZSBIZWxwZXIgRnVuY3Rpb25zIGZvciBMaWtlcyAtLS1cbmNvbnN0IExJS0VEX1BPU1RTX1NFU1NJT05fS0VZID0gJ2xpa2VkUG9zdHMnO1xuLyoqIEdldHMgdGhlIHNldCBvZiBsaWtlZCBwb3N0IElEcyBmcm9tIHNlc3Npb25TdG9yYWdlLiAqL1xuZnVuY3Rpb24gZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uKCkge1xuICAgIGNvbnN0IHN0b3JlZExpa2VzID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShMSUtFRF9QT1NUU19TRVNTSU9OX0tFWSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbGlrZWRJZHMgPSBzdG9yZWRMaWtlcyA/IEpTT04ucGFyc2Uoc3RvcmVkTGlrZXMpIDogW107XG4gICAgICAgIHJldHVybiBuZXcgU2V0KEFycmF5LmlzQXJyYXkobGlrZWRJZHMpID8gbGlrZWRJZHMgOiBbXSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGxpa2VkIHBvc3RzIGZyb20gc2Vzc2lvblN0b3JhZ2U6XCIsIGUpO1xuICAgICAgICByZXR1cm4gbmV3IFNldCgpO1xuICAgIH1cbn1cbi8qKiBBZGRzIGEgcG9zdCBJRCB0byB0aGUgbGlrZWQgcG9zdHMgaW4gc2Vzc2lvblN0b3JhZ2UuICovXG5mdW5jdGlvbiBhZGRQb3N0VG9TZXNzaW9uTGlrZXMocG9zdElkKSB7XG4gICAgY29uc3QgbGlrZWRQb3N0c1NldCA9IGdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbigpO1xuICAgIGxpa2VkUG9zdHNTZXQuYWRkKHBvc3RJZCk7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShMSUtFRF9QT1NUU19TRVNTSU9OX0tFWSwgSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbShsaWtlZFBvc3RzU2V0KSkpO1xuICAgIGNvbnNvbGUubG9nKCdBZGRlZCBwb3N0IHRvIHNlc3Npb24gbGlrZXM6JywgcG9zdElkLCBBcnJheS5mcm9tKGxpa2VkUG9zdHNTZXQpKTtcbn1cbi8qKiBSZW1vdmVzIGEgcG9zdCBJRCBmcm9tIHRoZSBsaWtlZCBwb3N0cyBpbiBzZXNzaW9uU3RvcmFnZS4gKi9cbmZ1bmN0aW9uIHJlbW92ZVBvc3RGcm9tU2Vzc2lvbkxpa2VzKHBvc3RJZCkge1xuICAgIGNvbnN0IGxpa2VkUG9zdHNTZXQgPSBnZXRMaWtlZFBvc3RzRnJvbVNlc3Npb24oKTtcbiAgICBsaWtlZFBvc3RzU2V0LmRlbGV0ZShwb3N0SWQpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oTElLRURfUE9TVFNfU0VTU0lPTl9LRVksIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20obGlrZWRQb3N0c1NldCkpKTtcbiAgICBjb25zb2xlLmxvZygnUmVtb3ZlZCBwb3N0IGZyb20gc2Vzc2lvbiBsaWtlczonLCBwb3N0SWQsIEFycmF5LmZyb20obGlrZWRQb3N0c1NldCkpO1xufVxuLy8gLS0tIENvcmUgSW5pdGlhbGl6YXRpb24gRnVuY3Rpb24gLS0tXG4vKipcbiAqIEluaXRpYWxpemVzIGFsbCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgcG9zdCBkZXRhaWwgcGFnZS5cbiAqIFRoaXMgaXMgdGhlIG1haW4gZXhwb3J0ZWQgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgY2FsbGVkIGJ5IHRoZSBlbnRyeSBwb2ludC5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBwb3N0IGRldGFpbCBwYWdlLi4uJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEYXJrIG1vZGUgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICgwLCBoZWFkZXJfMS5yZW5kZXJIZWFkZXIpKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGVyIHJlbmRlcmVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IHVybFBhcmFtcy5nZXQoJ2lkJyk7XG4gICAgICAgIGlmIChwb3N0SWQpIHtcbiAgICAgICAgICAgIHlpZWxkIGxvYWRQb3N0Q29udGVudChwb3N0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gcG9zdCBJRCBwcm92aWRlZCBpbiB0aGUgVVJMJyk7XG4gICAgICAgICAgICBzaG93RXJyb3JNZXNzYWdlKCdObyBwb3N0IHNwZWNpZmllZC4gUGxlYXNlIGNoZWNrIHRoZSBVUkwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGV0YWlsIHBhZ2UgaW5pdGlhbGl6YXRpb24gY29tcGxldGUuJyk7XG4gICAgfSk7XG59XG4vKipcbiAqIExvYWQgYW5kIGRpc3BsYXkgcG9zdCBjb250ZW50IGJhc2VkIG9uIHBvc3QgSURcbiAqL1xuZnVuY3Rpb24gbG9hZFBvc3RDb250ZW50KHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRmV0Y2hpbmcgcG9zdCB3aXRoIElEOiAke3Bvc3RJZH1gKTtcbiAgICAgICAgICAgIGNvbnN0IHBvc3QgPSB5aWVsZCAoMCwgYXBpXzEuZmV0Y2hQb3N0QnlJZCkocG9zdElkKTtcbiAgICAgICAgICAgIGlmICghcG9zdClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBvc3Qgd2l0aCBJRCAke3Bvc3RJZH0gbm90IGZvdW5kYCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUG9zdCBkYXRhIGZldGNoZWQ6JywgcG9zdCk7XG4gICAgICAgICAgICB1cGRhdGVQb3N0VUkocG9zdCk7XG4gICAgICAgICAgICB1cGRhdGVQYWdlTWV0YWRhdGEocG9zdCk7XG4gICAgICAgICAgICBpbml0aWFsaXplU29jaWFsU2hhcmluZyhwb3N0KTtcbiAgICAgICAgICAgIGluaXRpYWxpemVMaWtlQnV0dG9uKHBvc3QpO1xuICAgICAgICAgICAgaW5pdGlhbGl6ZUNvbW1lbnRGb3JtKHBvc3QuaWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB5aWVsZCBsb2FkQ29tbWVudHMocG9zdC5pZC50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgcG9zdCBjb250ZW50OicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvck1lc3NhZ2UoYEZhaWxlZCB0byBsb2FkIHRoZSBibG9nIHBvc3QuICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nfWApO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgcG9zdCBVSSB3aXRoIGNvbnRlbnQgZnJvbSB0aGUgbG9hZGVkIHBvc3RcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUG9zdFVJKHBvc3QpIHtcbiAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgUG9zdCBVSSBmb3I6JywgcG9zdC50aXRsZSk7XG4gICAgY29uc3QgcG9zdEFydGljbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGlmICghcG9zdEFydGljbGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCB1cGRhdGUgVUk6ICNwb3N0LWNvbnRlbnQgZWxlbWVudCBub3QgZm91bmQuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQ29uc3RydWN0IHRoZSBpbm5lciBIVE1MIGR5bmFtaWNhbGx5XG4gICAgcG9zdEFydGljbGVFbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtaGVhZGVyXCI+XG4gICAgICAgICAgICA8aDE+JHtwb3N0LnRpdGxlfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1tZXRhXCI+XG4gICAgICAgICAgICAgICAgPHRpbWUgZGF0ZXRpbWU9XCIke3Bvc3QuY3JlYXRlZEF0ID8gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA6ICcnfVwiPlxuICAgICAgICAgICAgICAgICAgICAke3Bvc3QuY3JlYXRlZEF0ID8gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycgfSkgOiAnRGF0ZSB1bmtub3duJ31cbiAgICAgICAgICAgICAgICA8L3RpbWU+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JcIj5ieSAke3Bvc3QuYXV0aG9yIHx8ICdBbm9ueW1vdXMnfTwvc3Bhbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJsaWtlLWJ1dHRvblwiIGRhdGEtcG9zdC1pZD1cIiR7cG9zdC5pZH1cIiBhcmlhLWxhYmVsPVwiTGlrZSB0aGlzIHBvc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtaGVhcnRcIj48L2k+IFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxpa2UtY291bnRcIj4ke3Bvc3QubGlrZXMgfHwgMH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAke3Bvc3QuaW1hZ2VVcmwgPyBgPGltZyBzcmM9XCIke3Bvc3QuaW1hZ2VVcmx9XCIgYWx0PVwiJHtwb3N0LnRpdGxlfVwiIGNsYXNzPVwiZmVhdHVyZWQtaW1hZ2VcIj5gIDogJyd9XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtY29udGVudC1ib2R5XCI+XG4gICAgICAgICAgICAke3Bvc3QuY29udGVudH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtZm9vdGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICR7cG9zdC50YWdzICYmIHBvc3QudGFncy5sZW5ndGggPiAwID8gYDxzcGFuPlRhZ3M6PC9zcGFuPiAke3Bvc3QudGFncy5tYXAodGFnID0+IGA8YSBocmVmPVwiL3RhZy8ke3RhZy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgJy0nKX1cIj4ke3RhZ308L2E+YCkuam9pbignJyl9YCA6ICcnfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLXNoYXJpbmdcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TaGFyZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiB0d2l0dGVyXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIFR3aXR0ZXJcIj48aSBjbGFzcz1cImZhYiBmYS10d2l0dGVyXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gZmFjZWJvb2tcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gRmFjZWJvb2tcIj48aSBjbGFzcz1cImZhYiBmYS1mYWNlYm9vay1mXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gbGlua2VkaW5cIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gTGlua2VkSW5cIj48aSBjbGFzcz1cImZhYiBmYS1saW5rZWRpbi1pblwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8c2VjdGlvbiBpZD1cImNvbW1lbnRzLXNlY3Rpb25cIiBjbGFzcz1cImNvbW1lbnRzLXNlY3Rpb25cIiBhcmlhLWxhYmVsbGVkYnk9XCJjb21tZW50cy1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgPGgyIGlkPVwiY29tbWVudHMtaGVhZGluZ1wiPkNvbW1lbnRzPC9oMj5cbiAgICAgICAgICAgICA8ZGl2IGlkPVwiY29tbWVudHMtbGlzdFwiIGNsYXNzPVwiY29tbWVudHMtbGlzdFwiPlxuICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm5vLWNvbW1lbnRzXCI+TG9hZGluZyBjb21tZW50cy4uLjwvcD4gXG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgPGZvcm0gaWQ9XCJjb21tZW50LWZvcm1cIiBjbGFzcz1cImNvbW1lbnQtZm9ybVwiIGRhdGEtcG9zdC1pZD1cIiR7cG9zdC5pZH1cIj5cbiAgICAgICAgICAgICAgICAgPGgzPkxlYXZlIGEgQ29tbWVudDwvaDM+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY29tbWVudC1uYW1lXCI+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJjb21tZW50LW5hbWVcIiBuYW1lPVwibmFtZVwiIHJlcXVpcmVkPlxuICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjb21tZW50LXRleHRcIj5Db21tZW50OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgaWQ9XCJjb21tZW50LXRleHRcIiBuYW1lPVwiY29tbWVudFwiIHJvd3M9XCI0XCIgcmVxdWlyZWQ+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwicHJpbWFyeS1idXR0b25cIj5TdWJtaXQgQ29tbWVudDwvYnV0dG9uPlxuICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgIGA7XG4gICAgY29uc29sZS5sb2coJ1Bvc3QgVUkgdXBkYXRlZCB3aXRoIGxpa2UgYnV0dG9uIGFuZCBjb21tZW50cyBzZWN0aW9uIHN0cnVjdHVyZS4nKTtcbn1cbi8qKlxuICogVXBkYXRlIHBhZ2UgbWV0YWRhdGEgbGlrZSB0aXRsZSBhbmQgVVJMXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBhZ2VNZXRhZGF0YShwb3N0KSB7XG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHtwb3N0LnRpdGxlfSB8IE5vZWwncyBCbG9nYDtcbiAgICBjb25zb2xlLmxvZygnUGFnZSBtZXRhZGF0YSB1cGRhdGVkLicpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplIHNvY2lhbCBzaGFyaW5nIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcocG9zdCkge1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHNvY2lhbFNoYXJpbmdEaXYgPSBwb3N0QXJ0aWNsZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbC1zaGFyaW5nJyk7XG4gICAgaWYgKHNvY2lhbFNoYXJpbmdEaXYpIHtcbiAgICAgICAgc29jaWFsU2hhcmluZ0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaGFyZS1idXR0b24nKTtcbiAgICAgICAgICAgIGlmICghYnV0dG9uKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBgQ2hlY2sgb3V0IHRoaXMgYXJ0aWNsZTogJHtwb3N0LnRpdGxlfWA7XG4gICAgICAgICAgICBsZXQgc2hhcmVXaW5kb3dVcmwgPSAnJztcbiAgICAgICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd0d2l0dGVyJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX0mdGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAndHdpdHRlci1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTIzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFjZWJvb2snKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2ZhY2Vib29rLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rZWRpbicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZS8/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2xpbmtlZGluLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnU29jaWFsIHNoYXJpbmcgaW5pdGlhbGl6ZWQuJyk7XG59XG4vKipcbiAqIERpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZSB0byB0aGUgdXNlciB3aXRoaW4gdGhlIHBvc3QgY29udGVudCBhcmVhXG4gKi9cbmZ1bmN0aW9uIHNob3dFcnJvck1lc3NhZ2UobWVzc2FnZSkge1xuICAgIGNvbnN0IGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGlmIChjb250ZW50RWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb21tZW50c1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtc2VjdGlvbicpO1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gY29tbWVudHNTZWN0aW9uID8gY29tbWVudHNTZWN0aW9uIDogY29udGVudEVsZW1lbnQ7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+JHttZXNzYWdlfTwvZGl2PmA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhbGVydChtZXNzYWdlKTsgLy8gRmFsbGJhY2tcbiAgICB9XG59XG4vKipcbiAqIEluaXRpYWxpemUgbGlrZSBidXR0b24gZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplTGlrZUJ1dHRvbihwb3N0KSB7XG4gICAgY29uc3QgcG9zdElkU3RyaW5nID0gcG9zdC5pZC50b1N0cmluZygpO1xuICAgIGNvbnN0IGxpa2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcG9zdC1jb250ZW50IC5saWtlLWJ1dHRvbltkYXRhLXBvc3QtaWQ9XCIke3Bvc3RJZFN0cmluZ31cIl1gKTtcbiAgICBpZiAoIWxpa2VCdG4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdMaWtlIGJ1dHRvbiBub3QgZm91bmQgaW4gcG9zdCBkZXRhaWwgVUkuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbGlrZWRQb3N0c1NldCA9IGdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbigpO1xuICAgIGxldCBpc0xpa2VkID0gbGlrZWRQb3N0c1NldC5oYXMocG9zdElkU3RyaW5nKTsgLy8gSW5pdGlhbCBzdGF0ZSBmcm9tIHNlc3Npb25cbiAgICBjb25zdCBpY29uID0gbGlrZUJ0bi5xdWVyeVNlbGVjdG9yKCdpJyk7XG4gICAgY29uc3QgY291bnRTcGFuID0gbGlrZUJ0bi5xdWVyeVNlbGVjdG9yKCcubGlrZS1jb3VudCcpO1xuICAgIC8vIFNldCBpbml0aWFsIFVJIHN0YXRlXG4gICAgaWYgKGlzTGlrZWQgJiYgaWNvbikge1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcicpO1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcycpO1xuICAgICAgICBsaWtlQnRuLmNsYXNzTGlzdC5hZGQoJ2xpa2VkJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGljb24pIHtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXMnKTtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInKTtcbiAgICAgICAgbGlrZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdsaWtlZCcpO1xuICAgIH1cbiAgICBpZiAoY291bnRTcGFuKVxuICAgICAgICBjb3VudFNwYW4udGV4dENvbnRlbnQgPSBTdHJpbmcocG9zdC5saWtlcyB8fCAwKTtcbiAgICBsaWtlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJY29uID0gbGlrZUJ0bi5xdWVyeVNlbGVjdG9yKCdpJyk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb3VudFNwYW4gPSBsaWtlQnRuLnF1ZXJ5U2VsZWN0b3IoJy5saWtlLWNvdW50Jyk7XG4gICAgICAgIGlmICghY3VycmVudEljb24gfHwgIWN1cnJlbnRDb3VudFNwYW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxpa2VCdG4uZGlzYWJsZWQgPSB0cnVlOyAvLyBQcmV2ZW50IGRvdWJsZS1jbGlja2luZ1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgIGlmIChpc0xpa2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEF0dGVtcHRpbmcgdG8gVU5MSUtFIHBvc3QgJHtwb3N0LmlkfWApO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkICgwLCBhcGlfMS51bmxpa2VQb3N0KShOdW1iZXIocG9zdC5pZCkpOyAvLyBDYWxsIHVubGlrZVBvc3QgQVBJXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQXR0ZW1wdGluZyB0byBMSUtFIHBvc3QgJHtwb3N0LmlkfWApO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkICgwLCBhcGlfMS5saWtlUG9zdCkoTnVtYmVyKHBvc3QuaWQpKTsgLy8gQ2FsbCBsaWtlUG9zdCBBUElcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAvLyBUb2dnbGUgdGhlIGxvY2FsICdpc0xpa2VkJyBzdGF0ZSBvbmx5IGFmdGVyIHN1Y2Nlc3NmdWwgQVBJIGNhbGxcbiAgICAgICAgICAgICAgICBpc0xpa2VkID0gIWlzTGlrZWQ7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIFNlc3Npb24gU3RvcmFnZSBiYXNlZCBvbiB0aGUgbmV3IHRvZ2dsZWQgc3RhdGVcbiAgICAgICAgICAgICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRQb3N0VG9TZXNzaW9uTGlrZXMocG9zdElkU3RyaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVBvc3RGcm9tU2Vzc2lvbkxpa2VzKHBvc3RJZFN0cmluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBVSSBJY29uIGJhc2VkIG9uIHRoZSBuZXcgdG9nZ2xlZCBzdGF0ZVxuICAgICAgICAgICAgICAgIGlmIChpc0xpa2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcicpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTtcbiAgICAgICAgICAgICAgICAgICAgbGlrZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaWtlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFzJyk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicpO1xuICAgICAgICAgICAgICAgICAgICBsaWtlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2xpa2VkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBjb3VudCBkaXJlY3RseSBmcm9tIHRoZSBBUEkgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBjdXJyZW50Q291bnRTcGFuLnRleHRDb250ZW50ID0gU3RyaW5nKHJlc3VsdC5saWtlcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExpa2Ugc3RhdHVzIHVwZGF0ZWQuIE5ldyBjb3VudDogJHtyZXN1bHQubGlrZXN9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTGlrZS9Vbmxpa2UgQVBJIGNhbGwgZmFpbGVkIG9yIHJldHVybmVkIG51bGxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHVwZGF0ZSBsaWtlL3VubGlrZSBzdGF0dXM6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGxpa2VCdG4uZGlzYWJsZWQgPSBmYWxzZTsgLy8gUmUtZW5hYmxlIGJ1dHRvblxuICAgICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnNvbGUubG9nKCdMaWtlIGJ1dHRvbiBpbml0aWFsaXplZC4nKTtcbn1cbi8qKlxuICogRmV0Y2hlcyBjb21tZW50cyBmcm9tIEFQSSBhbmQgcmVuZGVycyB0aGVtIGludG8gdGhlIGxpc3QuXG4gKi9cbmZ1bmN0aW9uIGxvYWRDb21tZW50cyhwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBjb21tZW50c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtbGlzdCcpO1xuICAgICAgICBpZiAoIWNvbW1lbnRzTGlzdClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29tbWVudHNMaXN0LmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImxvYWRpbmctY29tbWVudHNcIj5Mb2FkaW5nIGNvbW1lbnRzLi4uPC9wPic7IC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY29tbWVudHMgPSB5aWVsZCBmZXRjaENvbW1lbnRzQXBpKHBvc3RJZCk7IC8vIFJlcGxhY2Ugd2l0aCBhY3R1YWwgQVBJIGNhbGxcbiAgICAgICAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnJzsgLy8gQ2xlYXIgbG9hZGluZy9wcmV2aW91cyBjb21tZW50c1xuICAgICAgICAgICAgaWYgKGNvbW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJuby1jb21tZW50c1wiPk5vIGNvbW1lbnRzIHlldC4gQmUgdGhlIGZpcnN0IHRvIGNvbW1lbnQhPC9wPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb21tZW50cy5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRFbGVtZW50LmNsYXNzTmFtZSA9ICdjb21tZW50JztcbiAgICAgICAgICAgICAgICAgICAgLy8gQmFzaWMgZXNjYXBpbmcgZm9yIGRpc3BsYXkgLSBjb25zaWRlciBhIG1vcmUgcm9idXN0IHNhbml0aXplciBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2FmZU5hbWUgPSAoKF9iID0gKF9hID0gY29tbWVudC5uYW1lKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKSkgfHwgJ0Fub255bW91cyc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhZmVDb21tZW50ID0gKChfZCA9IChfYyA9IGNvbW1lbnQuY29tbWVudCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucmVwbGFjZSgvPi9nLCBcIiZndDtcIikpIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICBjb21tZW50RWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1tZXRhXCI+PHN0cm9uZz4ke3NhZmVOYW1lfTwvc3Ryb25nPiBvbiAke25ldyBEYXRlKGNvbW1lbnQuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1ib2R5XCI+JHtzYWZlQ29tbWVudH08L3A+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudHNMaXN0LmFwcGVuZENoaWxkKGNvbW1lbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb21tZW50cyBsb2FkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgY29tbWVudHM6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+Q291bGQgbm90IGxvYWQgY29tbWVudHMuPC9wPic7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIGNvbW1lbnQgc3VibWlzc2lvbiBmb3JtLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29tbWVudEZvcm0ocG9zdElkKSB7XG4gICAgY29uc3QgY29tbWVudEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC1mb3JtJyk7XG4gICAgaWYgKCFjb21tZW50Rm9ybSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvbW1lbnQgZm9ybSBub3QgZm91bmQgaW4gcG9zdCBkZXRhaWwgVUkuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29tbWVudEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGNvbW1lbnRGb3JtLmVsZW1lbnRzLm5hbWVkSXRlbSgnbmFtZScpO1xuICAgICAgICBjb25zdCBjb21tZW50SW5wdXQgPSBjb21tZW50Rm9ybS5lbGVtZW50cy5uYW1lZEl0ZW0oJ2NvbW1lbnQnKTtcbiAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gY29tbWVudEZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKTtcbiAgICAgICAgaWYgKCFuYW1lSW5wdXQgfHwgIWNvbW1lbnRJbnB1dCB8fCAhc3VibWl0QnV0dG9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgY29uc3QgY29tbWVudCA9IGNvbW1lbnRJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgIGlmICghbmFtZSB8fCAhY29tbWVudCkge1xuICAgICAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBib3RoIG5hbWUgYW5kIGNvbW1lbnQuJyk7IC8vIFNpbXBsZSB2YWxpZGF0aW9uXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ1N1Ym1pdHRpbmcuLi4nO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgeWllbGQgc3VibWl0Q29tbWVudEFwaShwb3N0SWQsIG5hbWUsIGNvbW1lbnQpOyAvLyBSZXBsYWNlIHdpdGggYWN0dWFsIEFQSSBjYWxsXG4gICAgICAgICAgICAvLyBDbGVhciBmb3JtXG4gICAgICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGNvbW1lbnRJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgLy8gUmVmcmVzaCBjb21tZW50cyBsaXN0IHRvIHNob3cgdGhlIG5ldyBjb21tZW50XG4gICAgICAgICAgICB5aWVsZCBsb2FkQ29tbWVudHMocG9zdElkKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc3VibWl0IGNvbW1lbnQ6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gc3VibWl0IGNvbW1lbnQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7IC8vIFNpbXBsZSBlcnJvciBmZWVkYmFja1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnU3VibWl0IENvbW1lbnQnO1xuICAgICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnNvbGUubG9nKCdDb21tZW50IGZvcm0gaW5pdGlhbGl6ZWQuJyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWxldGVCbG9nUG9zdCA9IGRlbGV0ZUJsb2dQb3N0O1xuZXhwb3J0cy5mZXRjaEJsb2dQb3N0cyA9IGZldGNoQmxvZ1Bvc3RzO1xuZXhwb3J0cy5mZXRjaFBvc3RCeUlkID0gZmV0Y2hQb3N0QnlJZDtcbmV4cG9ydHMuY3JlYXRlUG9zdCA9IGNyZWF0ZVBvc3Q7XG5leHBvcnRzLnVwZGF0ZVBvc3QgPSB1cGRhdGVQb3N0O1xuZXhwb3J0cy5saWtlUG9zdCA9IGxpa2VQb3N0O1xuZXhwb3J0cy51bmxpa2VQb3N0ID0gdW5saWtlUG9zdDtcbmV4cG9ydHMuYWRkVGFnVG9Qb3N0ID0gYWRkVGFnVG9Qb3N0O1xuY29uc3QgQVBJX1VSTCA9ICcvYXBpJztcbi8qKlxuICogRGVsZXRlcyBhIGJsb2cgcG9zdCBieSBJRC5cbiAqIEBwYXJhbSBwb3N0SWQgLSBUaGUgSUQgb2YgdGhlIGJsb2cgcG9zdCB0byBkZWxldGUuXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0cnVlIGlmIHRoZSBkZWxldGlvbiB3YXMgc3VjY2Vzc2Z1bCwgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5mdW5jdGlvbiBkZWxldGVCbG9nUG9zdChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgL2FwaS9wb3N0cy8ke3Bvc3RJZH1gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBkZWxldGUgYmxvZyBwb3N0OicsIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZGVsZXRpbmcgYmxvZyBwb3N0OicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBGZXRjaCBhbGwgYmxvZyBwb3N0cyBmcm9tIHRoZSBBUElcbiAqL1xuZnVuY3Rpb24gZmV0Y2hCbG9nUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7QVBJX1VSTH0vcG9zdHNgKTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBwb3N0cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYSBzaW5nbGUgcG9zdCBieSBJRFxuICogQHBhcmFtIGlkIC0gVGhlIHBvc3QgSUQgKGNhbiBiZSBzdHJpbmcgb3IgbnVtYmVyKVxuICovXG5mdW5jdGlvbiBmZXRjaFBvc3RCeUlkKGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7QVBJX1VSTH0vcG9zdHMvJHtpZH1gKTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBwb3N0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgcG9zdCAke2lkfTpgLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcG9zdCB2aWEgQVBJXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBvc3QocG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHtBUElfVVJMfS9wb3N0c2AsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBvc3REYXRhKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIHBvc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBwb3N0OicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFVwZGF0ZSBhbiBleGlzdGluZyBwb3N0IHZpYSBBUElcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUG9zdChpZCwgcG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHtBUElfVVJMfS9wb3N0cy8ke2lkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocG9zdERhdGEpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byB1cGRhdGUgcG9zdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHBvc3Q6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogTGlrZSBhIHBvc3QgdmlhIEFQSVxuICovXG5mdW5jdGlvbiBsaWtlUG9zdChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke0FQSV9VUkx9L3Bvc3RzLyR7aWR9L2xpa2VgLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxpa2UgcG9zdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGxpa2luZyBwb3N0ICR7aWR9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFVubGlrZSBhIHBvc3QgdmlhIEFQSVxuICovXG5mdW5jdGlvbiB1bmxpa2VQb3N0KGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYC9hcGkvcG9zdHMvJHtpZH0vbGlrZWAsIHsgbWV0aG9kOiAnREVMRVRFJyB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gdW5saWtlIHBvc3QnKTtcbiAgICAgICAgICAgIHJldHVybiB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiB1bmxpa2VQb3N0OicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEFkZCBhIHRhZyB0byBhIHBvc3QgdmlhIEFQSVxuICovXG5mdW5jdGlvbiBhZGRUYWdUb1Bvc3QoaWQsIHRhZykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke0FQSV9VUkx9L3Bvc3RzLyR7aWR9L3RhZ3NgLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHRhZyB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gYWRkIHRhZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGFkZGluZyB0YWcgdG8gcG9zdCAke2lkfTpgLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2VudHJpZXMvY2xpZW50LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9