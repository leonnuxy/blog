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
/**
 * Fetch all blog posts directly from the static JSON file.
 */
function fetchBlogPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        // Construct the path relative to the HTML file loading the script.
        // Assumes posts.json is copied to 'docs/data/posts.json' by the workflow.
        // And HTML files are at the root of 'docs'.
        const dataUrl = 'data/posts.json';
        console.log(`Fetching static data from: ${dataUrl}`);
        try {
            const response = yield fetch(dataUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${dataUrl}: ${response.status} ${response.statusText}`);
            }
            const data = yield response.json();
            // Assuming the JSON structure is { posts: [...] } 
            // or maybe just an array [...] directly? Adjust based on your posts.json structure.
            // If posts.json is just an array: return data || [];
            return data.posts || []; // Use this if posts.json has { "posts": [...] }
        }
        catch (error) {
            console.error('Error fetching static posts.json:', error);
            return []; // Return empty array on error
        }
    });
}
/**
 * Get a single post by ID by filtering the static JSON data.
 * Note: This loads ALL posts just to find one - less efficient than an API.
 * @param id - The post ID (string or number)
 */
function fetchPostById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allPosts = yield fetchBlogPosts(); // Fetch all posts from JSON
            // Ensure consistent ID comparison (e.g., comparing numbers)
            const postIdNumber = typeof id === 'string' ? parseInt(id, 10) : id;
            if (isNaN(postIdNumber)) {
                console.error(`Invalid post ID provided: ${id}`);
                return null;
            }
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
// --- Comment API Placeholders (Need separate service or backend) ---
// These would need to be implemented using a third-party service (like Disqus)
// or a serverless backend if you want comments on a static site.
function fetchCommentsApi(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.warn("Comments cannot be fetched on static site without external service/backend.");
        return []; // Return empty array
    });
}
function submitCommentApi(postId, name, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error("Cannot submit comment on static site without external service/backend.");
        throw new Error("Comment submission not available.");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBLHdEQUF3RCxHQUFHO0FBQzNEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7VUN0SUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9hYm91dC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvYmxvZ0NhcmRzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9jb21tZW50cy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvY29udGFjdC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvZGFya01vZGUudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2hlYWRlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvbmF2aWdhdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvcGFnaW5hdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29udHJvbGxlcnMvYmxvZ0Zyb250ZW5kQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2VudHJpZXMvY2xpZW50LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvbW9kdWxlcy9wb3N0RGV0YWlsLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvc2VydmljZXMvYXBpLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gQWJvdXQgcG9wdXAgZnVuY3Rpb25hbGl0eVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQWJvdXQgPSBpbml0aWFsaXplQWJvdXQ7XG4vKipcbiAqIEluaXRpYWxpemUgdGhlIEFib3V0IHNlY3Rpb24gcG9wdXBcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUFib3V0KCkge1xuICAgIGNvbnN0IGFib3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWJ0bicpO1xuICAgIGNvbnN0IGFib3V0UG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtcG9wdXAnKTtcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0LXBvcHVwIC5jbG9zZS1wb3B1cCcpO1xuICAgIGlmICghYWJvdXRCdG4gfHwgIWFib3V0UG9wdXAgfHwgIWNsb3NlUG9wdXApIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdBYm91dCBwb3B1cCBlbGVtZW50cyBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIE9wZW4gcG9wdXAgd2hlbiBhYm91dCBidXR0b24gaXMgY2xpY2tlZFxuICAgIGFib3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgYW5jaG9yIGJlaGF2aW9yXG4gICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7IC8vIFByZXZlbnQgc2Nyb2xsaW5nIHdoaWxlIHBvcHVwIGlzIG9wZW5cbiAgICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBhYm91dCBsaW5rXG4gICAgICAgIGFib3V0QnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICAgIC8vIENsb3NlIHBvcHVwIHdoZW4gY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBjbG9zZVBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwb3B1cCBjb250ZW50XG4gICAgYWJvdXRQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gYWJvdXRQb3B1cCkge1xuICAgICAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugb24gZXNjYXBlIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIGFib3V0UG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcbiAgICAgICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IHRoZSBkZWZhdWx0IGFjdGl2ZSBsaW5rIHN0YXRlXG4gKi9cbmZ1bmN0aW9uIHNldERlZmF1bHRBY3RpdmVMaW5rKCkge1xuICAgIC8vIEdldCBjdXJyZW50IGhhc2ggb3IgZGVmYXVsdCB0byBob21lXG4gICAgY29uc3QgY3VycmVudEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgbmF2IGxpbmtzXG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IGhhc2ggbGlua1xuICAgIGNvbnN0IGN1cnJlbnRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaGVhZGVyIG5hdiB1bCBsaSBhW2hyZWY9XCIke2N1cnJlbnRIYXNofVwiXWApO1xuICAgIGlmIChjdXJyZW50TGluaykge1xuICAgICAgICBjdXJyZW50TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlQmxvZ0NhcmRFbGVtZW50ID0gY3JlYXRlQmxvZ0NhcmRFbGVtZW50O1xuLyoqXG4gKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnQgZm9yIGEgYmxvZyBjYXJkIGZyb20gcG9zdCBkYXRhIChkaXNwbGF5IG9ubHkgZm9yIGFjdGlvbnMpXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJsb2dDYXJkRWxlbWVudChwb3N0KSB7XG4gICAgY29uc3QgYmxvZ0NhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBibG9nQ2FyZC5jbGFzc05hbWUgPSAnYmxvZy1jYXJkJztcbiAgICBibG9nQ2FyZC5kYXRhc2V0LnBvc3RJZCA9IFN0cmluZyhwb3N0LmlkKTtcbiAgICAvLyBNYWtlIHRoZSBjYXJkIGFwcGVhciBjbGlja2FibGUgKGZvciBuYXZpZ2F0aW9uKVxuICAgIGJsb2dDYXJkLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAvLyBOb3RlOiBBY3R1YWwgbmF2aWdhdGlvbiBzaG91bGQgYmUgaGFuZGxlZCBieSBhbiBldmVudCBsaXN0ZW5lclxuICAgIC8vIChwcmVmZXJhYmx5IGRlbGVnYXRpb24pIG9uIHRoZSBwYXJlbnQgY29udGFpbmVyICguYmxvZy1jYXJkcylcbiAgICAvLyB0aGF0IHJlYWRzIHRoZSBkYXRhLXBvc3QtaWQgYW5kIG5hdmlnYXRlcy5cbiAgICAvLyBDYWxjdWxhdGUgY29tbWVudCBjb3VudCAoYXNzdW1pbmcgcG9zdC5jb21tZW50cyBpcyBhbiBhcnJheSBvciB1bmRlZmluZWQpXG4gICAgY29uc3QgY29tbWVudENvdW50ID0gcG9zdC5jb21tZW50cyA/IHBvc3QuY29tbWVudHMubGVuZ3RoIDogMDtcbiAgICAvLyBGb3JtYXQgZGF0ZXNcbiAgICBjb25zdCBjcmVhdGVkRGF0ZSA9IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KTtcbiAgICBjb25zdCBkYXRlU3RyID0gY3JlYXRlZERhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJ1xuICAgIH0pO1xuICAgIC8vIC0tLSBEeW5hbWljIFVSTCBhbmQgVGV4dCBHZW5lcmF0aW9uIGZvciBTaGFyaW5nIC0tLVxuICAgIC8vIENPUlJFQ1RFRCBQQVRIOiBVc2UgJy9wb3N0Lmh0bWwnIGRpcmVjdGx5LCBzZXJ2ZWQgZnJvbSB0aGUgcHVibGljIHJvb3RcbiAgICBjb25zdCBwb3N0VXJsID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vcG9zdC5odG1sP2lkPSR7U3RyaW5nKHBvc3QuaWQpfWA7XG4gICAgY29uc3QgZW5jb2RlZFVybCA9IGVuY29kZVVSSUNvbXBvbmVudChwb3N0VXJsKTtcbiAgICBjb25zdCBzaGFyZVRleHQgPSBgQ2hlY2sgb3V0IHRoaXMgYXJ0aWNsZTogJHtwb3N0LnRpdGxlfWA7XG4gICAgY29uc3QgZW5jb2RlZFNoYXJlVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudChzaGFyZVRleHQpO1xuICAgIC8vIC0tLSBFbmQgRHluYW1pYyBVUkwgR2VuZXJhdGlvbiAtLS1cbiAgICAvLyBHZW5lcmF0ZSBIVE1MIGZvciB0YWcgYmFkZ2VzXG4gICAgbGV0IHRhZ3NIVE1MID0gJyc7XG4gICAgaWYgKHBvc3QudGFncyAmJiBwb3N0LnRhZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICB0YWdzSFRNTCA9ICc8ZGl2IGNsYXNzPVwicG9zdC10YWdzXCI+JyArXG4gICAgICAgICAgICBwb3N0LnRhZ3MubWFwKHRhZyA9PiBgPHNwYW4gY2xhc3M9XCJ0YWctYmFkZ2VcIj4ke3RhZ308L3NwYW4+YCkuam9pbignJykgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgfVxuICAgIC8vIFVzZSB0aGUgY29ycmVjdCBwdWJsaWMgcGF0aCBmb3IgdGhlIGZhbGxiYWNrIGltYWdlXG4gICAgY29uc3QgZmFsbGJhY2tJbWFnZVVybCA9ICcvaW1hZ2VzL2Jsb2dfaW1hZ2VfMy5qcGVnJztcbiAgICAvLyBDcmVhdGUgSFRNTCBmb3IgYmxvZyBjYXJkXG4gICAgYmxvZ0NhcmQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aW1nIHNyYz1cIiR7cG9zdC5pbWFnZVVybCB8fCBmYWxsYmFja0ltYWdlVXJsfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIj4gXG4gICAgICAgIDxkaXYgY2xhc3M9XCJibG9nLWNhcmQtY29udGVudFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJibG9nLWNhcmQtZGF0ZS1hdXRob3JcIj4ke2RhdGVTdHJ9PC9wPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiYmxvZy1jYXJkLXRpdGxlXCI+JHtwb3N0LnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAke3RhZ3NIVE1MfVxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGlrZS1idXR0b24tZGlzcGxheVwiIGFyaWEtbGFiZWw9XCIke3Bvc3QubGlrZXMgfHwgMH0gbGlrZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtaGVhcnRcIj48L2k+IDxzcGFuIGNsYXNzPVwibGlrZS1jb3VudFwiPiR7cG9zdC5saWtlcyB8fCAwfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb21tZW50cy10b2dnbGUtZGlzcGxheVwiIGFyaWEtbGFiZWw9XCIke2NvbW1lbnRDb3VudH0gY29tbWVudHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY29tbWVudFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb21tZW50LWNvdW50XCI+JHtjb21tZW50Q291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLXNoYXJpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiB0d2l0dGVyXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIFR3aXR0ZXJcIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIiBkYXRhLXRleHQ9XCIke2VuY29kZWRTaGFyZVRleHR9XCI+PGkgY2xhc3M9XCJmYWIgZmEtdHdpdHRlclwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBmYWNlYm9va1wiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBGYWNlYm9va1wiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiPjxpIGNsYXNzPVwiZmFiIGZhLWZhY2Vib29rLWZcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gbGlua2VkaW5cIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gTGlua2VkSW5cIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIj48aSBjbGFzcz1cImZhYiBmYS1saW5rZWRpbi1pblwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIC8vIEFkZCBKUyBsaXN0ZW5lcnMgZm9yIHNvY2lhbCBzaGFyZSBCVVRUT05TIFxuICAgIGNvbnN0IHNvY2lhbFNoYXJpbmdEaXYgPSBibG9nQ2FyZC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsLXNoYXJpbmcnKTtcbiAgICBpZiAoc29jaWFsU2hhcmluZ0Rpdikge1xuICAgICAgICBzb2NpYWxTaGFyaW5nRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNoYXJlLWJ1dHRvbicpO1xuICAgICAgICAgICAgaWYgKCFidXR0b24pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFByZXZlbnQgY2FyZCBuYXZpZ2F0aW9uXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBidXR0b24uZGF0YXNldC51cmwgPyBkZWNvZGVVUklDb21wb25lbnQoYnV0dG9uLmRhdGFzZXQudXJsKSA6IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGJ1dHRvbi5kYXRhc2V0LnRleHQgPyBkZWNvZGVVUklDb21wb25lbnQoYnV0dG9uLmRhdGFzZXQudGV4dCkgOiBkb2N1bWVudC50aXRsZTtcbiAgICAgICAgICAgIGxldCBzaGFyZVdpbmRvd1VybCA9ICcnO1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3R3aXR0ZXInKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfSZ0ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICd0d2l0dGVyLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9MjM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWNlYm9vaycpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnZmFjZWJvb2stc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmtlZGluJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmluZy9zaGFyZS1vZmZzaXRlLz91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnbGlua2VkaW4tc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBibG9nQ2FyZDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQ29tbWVudHMgPSBpbml0aWFsaXplQ29tbWVudHM7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkgPSBpbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5O1xuLyoqXG4gKiBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIGJsb2cgcG9zdHNcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRzKCkge1xuICAgIHNldHVwQ29tbWVudFRvZ2dsZXMoKTtcbiAgICBzZXR1cENvbW1lbnRGb3JtcygpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIGEgc3BlY2lmaWMgYmxvZyBwb3N0IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eShwb3N0RWxlbWVudCkge1xuICAgIGNvbnN0IHRvZ2dsZSA9IHBvc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy10b2dnbGUnKTtcbiAgICBjb25zdCBmb3JtID0gcG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnQtZm9ybScpO1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgICAgc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSk7XG4gICAgfVxuICAgIGlmIChmb3JtKSB7XG4gICAgICAgIHNldHVwQ29tbWVudEZvcm0oZm9ybSk7XG4gICAgfVxufVxuLyoqXG4gKiBTZXQgdXAgY29tbWVudCB0b2dnbGUgYnV0dG9uc1xuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRUb2dnbGVzKCkge1xuICAgIGNvbnN0IGNvbW1lbnRUb2dnbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnRzLXRvZ2dsZScpO1xuICAgIGNvbW1lbnRUb2dnbGVzLmZvckVhY2godG9nZ2xlID0+IHtcbiAgICAgICAgc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSk7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBhIHNpbmdsZSBjb21tZW50IHRvZ2dsZSBidXR0b25cbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50VG9nZ2xlKHRvZ2dsZSkge1xuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgcG9zdElkID0gdG9nZ2xlLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3N0LWlkJyk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjb21tZW50cy0ke3Bvc3RJZH1gKTtcbiAgICAgICAgaWYgKGNvbW1lbnRzU2VjdGlvbikge1xuICAgICAgICAgICAgY29tbWVudHNTZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgLy8gQ2hhbmdlIGJ1dHRvbiB0ZXh0IGJhc2VkIG9uIHN0YXRlXG4gICAgICAgICAgICBpZiAoY29tbWVudHNTZWN0aW9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPiBIaWRlIENvbW1lbnRzIDxzcGFuIGNsYXNzPVwiY29tbWVudHMtY291bnRcIj4keyhfYSA9IHRvZ2dsZS5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY291bnQnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRleHRDb250ZW50fTwvc3Bhbj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS1jb21tZW50XCI+PC9pPiBDb21tZW50cyA8c3BhbiBjbGFzcz1cImNvbW1lbnRzLWNvdW50XCI+JHsoX2IgPSB0b2dnbGUucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvdW50JykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50ZXh0Q29udGVudH08L3NwYW4+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgY29tbWVudCBmb3Jtc1xuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRGb3JtcygpIHtcbiAgICBjb25zdCBjb21tZW50Rm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudC1mb3JtJyk7XG4gICAgY29tbWVudEZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICAgIHNldHVwQ29tbWVudEZvcm0oZm9ybSk7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBhIHNpbmdsZSBjb21tZW50IGZvcm1cbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50Rm9ybShmb3JtKSB7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAgICAgY29uc3QgY29tbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29tbWVudHMtJHtwb3N0SWR9IC5jb21tZW50cy1saXN0YCk7XG4gICAgICAgIGlmICghY29tbWVudHNDb250YWluZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgY29uc3QgY29tbWVudElucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwiY29tbWVudFwiXScpO1xuICAgICAgICAvLyBDaGVjayBpZiBpbnB1dHMgYXJlIG5vdCBlbXB0eVxuICAgICAgICBpZiAobmFtZUlucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycgfHwgY29tbWVudElucHV0LnZhbHVlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhZGROZXdDb21tZW50KHBvc3RJZCwgY29tbWVudHNDb250YWluZXIsIG5hbWVJbnB1dC52YWx1ZSwgY29tbWVudElucHV0LnZhbHVlKTtcbiAgICAgICAgLy8gUmVzZXQgZm9ybVxuICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgfSk7XG59XG4vKipcbiAqIEFkZCBhIG5ldyBjb21tZW50IHRvIHRoZSBjb21tZW50cyBsaXN0XG4gKi9cbmZ1bmN0aW9uIGFkZE5ld0NvbW1lbnQocG9zdElkLCBjb21tZW50c0NvbnRhaW5lciwgbmFtZSwgY29tbWVudFRleHQpIHtcbiAgICAvLyBDcmVhdGUgbmV3IGNvbW1lbnRcbiAgICBjb25zdCBuZXdDb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3Q29tbWVudC5jbGFzc05hbWUgPSAnY29tbWVudCc7XG4gICAgLy8gR2V0IGN1cnJlbnQgZGF0ZVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IG5vdy50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgIGRheTogJ251bWVyaWMnXG4gICAgfSk7XG4gICAgLy8gQ29tbWVudCBIVE1MIHN0cnVjdHVyZVxuICAgIG5ld0NvbW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1hdmF0YXJcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtY29udGVudFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LWF1dGhvclwiPiR7bmFtZX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtdGV4dFwiPiR7Y29tbWVudFRleHR9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LWRhdGVcIj4ke2RhdGVTdHJ9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICAgIC8vIFJlbW92ZSBcIm5vIGNvbW1lbnRzIHlldFwiIG1lc3NhZ2UgaWYgaXQgZXhpc3RzXG4gICAgY29uc3Qgbm9Db21tZW50cyA9IGNvbW1lbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5uby1jb21tZW50cycpO1xuICAgIGlmIChub0NvbW1lbnRzKSB7XG4gICAgICAgIGNvbW1lbnRzQ29udGFpbmVyLnJlbW92ZUNoaWxkKG5vQ29tbWVudHMpO1xuICAgIH1cbiAgICAvLyBBZGQgdGhlIG5ldyBjb21tZW50IHRvIHRoZSB0b3Agb2YgdGhlIGxpc3RcbiAgICBjb21tZW50c0NvbnRhaW5lci5pbnNlcnRCZWZvcmUobmV3Q29tbWVudCwgY29tbWVudHNDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgLy8gVXBkYXRlIGNvbW1lbnQgY291bnRcbiAgICB1cGRhdGVDb21tZW50Q291bnQocG9zdElkKTtcbn1cbi8qKlxuICogVXBkYXRlIHRoZSBjb21tZW50IGNvdW50IGZvciBhIHBvc3RcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQ29tbWVudENvdW50KHBvc3RJZCkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBjb3VudFNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBidXR0b25bZGF0YS1wb3N0LWlkPVwiJHtwb3N0SWR9XCJdIC5jb21tZW50cy1jb3VudGApO1xuICAgIGlmIChjb3VudFNwYW4pIHtcbiAgICAgICAgbGV0IGNvdW50ID0gcGFyc2VJbnQoKChfYSA9IGNvdW50U3Bhbi50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2UoL1soKV0vZywgJycpKSB8fCAnMCcpICsgMTtcbiAgICAgICAgY291bnRTcGFuLnRleHRDb250ZW50ID0gYCgke2NvdW50fSlgO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29udGFjdCBwb3B1cCBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVDb250YWN0Rm9ybSA9IGluaXRpYWxpemVDb250YWN0Rm9ybTtcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgY29udGFjdCBmb3JtIHBvcHVwXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDb250YWN0Rm9ybSgpIHtcbiAgICBjb25zdCBjb250YWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtYnRuJyk7XG4gICAgY29uc3QgY29udGFjdFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtcG9wdXAnKTtcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhY3QtcG9wdXAgLmNsb3NlLXBvcHVwJyk7XG4gICAgaWYgKCFjb250YWN0QnV0dG9uIHx8ICFjb250YWN0UG9wdXAgfHwgIWNsb3NlUG9wdXApIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDb250YWN0IGZvcm0gZWxlbWVudHMgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBPcGVuIHBvcHVwIHdoZW4gY29udGFjdCBidXR0b24gaXMgY2xpY2tlZFxuICAgIGNvbnRhY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgZGVmYXVsdCBhbmNob3IgYmVoYXZpb3JcbiAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nOyAvLyBQcmV2ZW50IHNjcm9sbGluZyB3aGlsZSBwb3B1cCBpcyBvcGVuXG4gICAgICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY29udGFjdCBsaW5rXG4gICAgICAgIGNvbnRhY3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2UgcG9wdXAgd2hlbiBjbG9zZSBidXR0b24gaXMgY2xpY2tlZFxuICAgIGNsb3NlUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgIH0pO1xuICAgIC8vIENsb3NlIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSB0aGUgcG9wdXAgY29udGVudFxuICAgIGNvbnRhY3RQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gY29udGFjdFBvcHVwKSB7XG4gICAgICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIENsb3NlIG9uIGVzY2FwZSBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBjb250YWN0UG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcbiAgICAgICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gU2V0IHVwIGNvbnRhY3QgZm9ybSBzdWJtaXNzaW9uXG4gICAgc2V0dXBDb250YWN0Rm9ybVN1Ym1pc3Npb24oKTtcbn1cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNldCB0aGUgZGVmYXVsdCBhY3RpdmUgbGluayBzdGF0ZVxuICovXG5mdW5jdGlvbiBzZXREZWZhdWx0QWN0aXZlTGluaygpIHtcbiAgICAvLyBHZXQgY3VycmVudCBoYXNoIG9yIGRlZmF1bHQgdG8gaG9tZVxuICAgIGNvbnN0IGN1cnJlbnRIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgJyNob21lJztcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIG5hdiBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBoYXNoIGxpbmtcbiAgICBjb25zdCBjdXJyZW50TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlciBuYXYgdWwgbGkgYVtocmVmPVwiJHtjdXJyZW50SGFzaH1cIl1gKTtcbiAgICBpZiAoY3VycmVudExpbmspIHtcbiAgICAgICAgY3VycmVudExpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuLyoqXG4gKiBIYW5kbGUgY29udGFjdCBmb3JtIHN1Ym1pc3Npb25cbiAqL1xuZnVuY3Rpb24gc2V0dXBDb250YWN0Rm9ybVN1Ym1pc3Npb24oKSB7XG4gICAgY29uc3QgY29udGFjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1mb3JtJyk7XG4gICAgaWYgKCFjb250YWN0Rm9ybSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnRhY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgY29uc3QgZW1haWxJbnB1dCA9IGNvbnRhY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJlbWFpbFwiXScpO1xuICAgICAgICBjb25zdCBtZXNzYWdlSW5wdXQgPSBjb250YWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYVtuYW1lPVwibWVzc2FnZVwiXScpO1xuICAgICAgICAvLyBTaW1wbGUgdmFsaWRhdGlvblxuICAgICAgICBpZiAoIW5hbWVJbnB1dC52YWx1ZS50cmltKCkgfHwgIWVtYWlsSW5wdXQudmFsdWUudHJpbSgpIHx8ICFtZXNzYWdlSW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICBzaG93Q29udGFjdEZvcm1NZXNzYWdlKCdQbGVhc2UgZmlsbCBvdXQgYWxsIGZpZWxkcycsICdlcnJvcicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhlcmUgeW91IHdvdWxkIHR5cGljYWxseSBzZW5kIHRoZSBmb3JtIGRhdGEgdG8gYSBzZXJ2ZXJcbiAgICAgICAgLy8gRm9yIG5vdywgd2UnbGwganVzdCBzaW11bGF0ZSBhIHN1Y2Nlc3NmdWwgc3VibWlzc2lvblxuICAgICAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgY29uc3Qgc3VibWl0QnRuID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKTtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxCdG5UZXh0ID0gc3VibWl0QnRuLmlubmVySFRNTDtcbiAgICAgICAgc3VibWl0QnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgc3VibWl0QnRuLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNwaW5uZXJcIj48L3NwYW4+IFNlbmRpbmcuLi4nO1xuICAgICAgICAvLyBTaW11bGF0ZSBzZXJ2ZXIgcmVxdWVzdFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIFJlc2V0IGZvcm0gYW5kIHNob3cgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICBjb250YWN0Rm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgc3VibWl0QnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBzdWJtaXRCdG4uaW5uZXJIVE1MID0gb3JpZ2luYWxCdG5UZXh0O1xuICAgICAgICAgICAgc2hvd0NvbnRhY3RGb3JtTWVzc2FnZSgnTWVzc2FnZSBzZW50IHN1Y2Nlc3NmdWxseSEgV2VcXCdsbCBnZXQgYmFjayB0byB5b3Ugc29vbi4nLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgLy8gQ2xvc2UgdGhlIHBvcHVwIGFmdGVyIGEgZGVsYXlcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LXBvcHVwJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhY3RQb3B1cCkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0sIDE1MDApO1xuICAgIH0pO1xufVxuLyoqXG4gKiBEaXNwbGF5IGEgbWVzc2FnZSBpbiB0aGUgY29udGFjdCBmb3JtXG4gKi9cbmZ1bmN0aW9uIHNob3dDb250YWN0Rm9ybU1lc3NhZ2UobWVzc2FnZSwgdHlwZSkge1xuICAgIGNvbnN0IGNvbnRhY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtZm9ybScpO1xuICAgIGlmICghY29udGFjdEZvcm0pXG4gICAgICAgIHJldHVybjtcbiAgICAvLyBSZW1vdmUgYW55IGV4aXN0aW5nIG1lc3NhZ2VcbiAgICBjb25zdCBleGlzdGluZ01lc3NhZ2UgPSBjb250YWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCcuZm9ybS1tZXNzYWdlJyk7XG4gICAgaWYgKGV4aXN0aW5nTWVzc2FnZSkge1xuICAgICAgICBleGlzdGluZ01lc3NhZ2UucmVtb3ZlKCk7XG4gICAgfVxuICAgIC8vIENyZWF0ZSBhbmQgYWRkIG5ldyBtZXNzYWdlXG4gICAgY29uc3QgbWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZXNzYWdlRWxlbWVudC5jbGFzc05hbWUgPSBgZm9ybS1tZXNzYWdlICR7dHlwZX1gO1xuICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICBjb250YWN0Rm9ybS5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudCk7XG4gICAgLy8gUmVtb3ZlIG1lc3NhZ2UgYWZ0ZXIgYSBmZXcgc2Vjb25kc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtZXNzYWdlRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9LCA1MDAwKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gRGFyayBtb2RlIGZ1bmN0aW9uYWxpdHlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZURhcmtNb2RlID0gaW5pdGlhbGl6ZURhcmtNb2RlO1xuZXhwb3J0cy5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSA9IGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlO1xuLyoqXG4gKiBJbml0aWFsaXplIGRhcmsgbW9kZSB0b2dnbGVcbiAqIFRoaXMgY3JlYXRlcyBhIGZsb2F0aW5nIGRhcmsgbW9kZSB0b2dnbGUgYnV0dG9uIGFuZCBhZGRzIGl0IHRvIHRoZSBET01cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZURhcmtNb2RlKCkge1xuICAgIC8vIENyZWF0ZSBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvblxuICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZGFya01vZGVUb2dnbGUuY2xhc3NOYW1lID0gJ2RhcmstbW9kZS10b2dnbGUnO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvblxuICAgIGRhcmtNb2RlVG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdUb2dnbGUgRGFyayBNb2RlJyk7XG4gICAgLy8gQ2hlY2sgaWYgZGFyayBtb2RlIHByZWZlcmVuY2UgaXMgYWxyZWFkeSBzZXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGNvbnN0IGlzRGFya01vZGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gJ3RydWUnO1xuICAgIGlmIChpc0RhcmtNb2RlKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICB9XG4gICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgZGFya01vZGVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVEYXJrTW9kZSk7XG4gICAgLy8gQWRkIGJ1dHRvbiB0byB0aGUgRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkYXJrTW9kZVRvZ2dsZSk7XG59XG4vKipcbiAqIFRvZ2dsZSBkYXJrIG1vZGUgb24gYW5kIG9mZlxuICovXG5mdW5jdGlvbiB0b2dnbGVEYXJrTW9kZSgpIHtcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrLW1vZGUnKTtcbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgLy8gVXBkYXRlIGljb24gYmFzZWQgb24gbW9kZVxuICAgIGlmIChkYXJrTW9kZVRvZ2dsZSkge1xuICAgICAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvbiBmb3IgbGlnaHQgbW9kZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLW1vb25cIj48L2k+JzsgLy8gTW9vbiBpY29uIGZvciBkYXJrIG1vZGVcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTYXZlIHByZWZlcmVuY2UgdG8gbG9jYWwgc3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsIGlzRGFya01vZGUudG9TdHJpbmcoKSk7XG59XG4vKipcbiAqIENoZWNrIGlmIHVzZXIgaGFzIHN5c3RlbSBkYXJrIG1vZGUgcHJlZmVyZW5jZVxuICogSWYgdGhleSBkbyBhbmQgd2UgaGF2ZW4ndCBzZXQgYSBwcmVmZXJlbmNlIHlldCwgYXBwbHkgZGFyayBtb2RlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKCkge1xuICAgIC8vIE9ubHkgY2hlY2sgaWYgdXNlciBoYXNuJ3QgZXhwbGljaXRseSBzZXQgYSBwcmVmZXJlbmNlXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrTW9kZScpID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHByZWZlcnNEYXJrTW9kZSA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICAgICAgaWYgKHByZWZlcnNEYXJrTW9kZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLW1vZGUnKTtcbiAgICAgICAgICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstbW9kZS10b2dnbGUnKTtcbiAgICAgICAgICAgIGlmIChkYXJrTW9kZVRvZ2dsZSkge1xuICAgICAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9jb21wb25lbnRzL2hlYWRlci50c1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZW5kZXJIZWFkZXIgPSByZW5kZXJIZWFkZXI7XG4vKipcbiAqIEhlYWRlciBDb21wb25lbnRcbiAqIFJlbmRlcnMgdGhlIGhlYWRlciBzZWN0aW9uIGludG8gYSB0YXJnZXQgY29udGFpbmVyLlxuICogQHBhcmFtIGNvbnRhaW5lcklkIC0gVGhlIElEIG9mIHRoZSBlbGVtZW50IHRvIHJlbmRlciB0aGUgaGVhZGVyIGludG8uIERlZmF1bHRzIHRvICdoZWFkZXItcGxhY2Vob2xkZXInLlxuICovXG5mdW5jdGlvbiByZW5kZXJIZWFkZXIoY29udGFpbmVySWQgPSAnaGVhZGVyLXBsYWNlaG9sZGVyJykge1xuICAgIC8vIEVuc3VyZSBydW5uaW5nIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudFxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRmluZCB0aGUgY29udGFpbmVyIGVsZW1lbnQgd2hlcmUgdGhlIGhlYWRlciBzaG91bGQgYmUgcGxhY2VkXG4gICAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVySWQpO1xuICAgIGlmICghaGVhZGVyQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEhlYWRlciBjb250YWluZXIgd2l0aCBJRCAnJHtjb250YWluZXJJZH0nIG5vdCBmb3VuZCBpbiB0aGUgRE9NLmApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIERlZmluZSB0aGUgaGVhZGVyIEhUTUwgc3RydWN0dXJlIC0gbWF0Y2hpbmcgaW5kZXguaHRtbFxuICAgIGhlYWRlckNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJzaXRlLWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPjxhIGhyZWY9XCIvXCI+QmxvZzwvYT48L2gxPlxuICAgICAgICAgICAgPG5hdj5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiL1wiPkhvbWU8L2E+PC9saT4gXG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiLyNhYm91dFwiIGlkPVwiYWJvdXQtYnRuXCI+QWJvdXQ8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvI3BvcnRmb2xpb1wiPlBvcnRmb2xpbzwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi8jY29udGFjdFwiIGlkPVwiY29udGFjdC1idG5cIj5Db250YWN0PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3IgYXJ0aWNsZXMuLi5cIiBjbGFzcz1cInNlYXJjaC1iYXJcIj4gXG4gICAgICAgIDwvaGVhZGVyPlxuICAgIGA7XG4gICAgLy8gT3B0aW9uYWw6IEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIGhlYWRlciBlbGVtZW50cyBpZiBuZWVkZWQgaGVyZVxuICAgIC8vIERlZmluZSB0aGUgc2V0dXBTZWFyY2ggZnVuY3Rpb24gdG8gaGFuZGxlIHNlYXJjaCBmdW5jdGlvbmFsaXR5XG4gICAgZnVuY3Rpb24gc2V0dXBTZWFyY2goKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmFyJyk7XG4gICAgICAgIGlmICghc2VhcmNoQmFyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTZWFyY2ggYmFyIGVsZW1lbnQgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgU2VhcmNoaW5nIGZvcjogJHtxdWVyeX1gKTtcbiAgICAgICAgICAgIC8vIEFkZCBzZWFyY2ggbG9naWMgaGVyZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0dXBTZWFyY2goKTsgLy8gU2V0dXAgc2VhcmNoIGZ1bmN0aW9uYWxpdHlcbiAgICAvLyBEZWZpbmUgdGhlIHNldHVwUG9wdXBCdXR0b25zIGZ1bmN0aW9uIHRvIGhhbmRsZSBwb3B1cCBmdW5jdGlvbmFsaXR5XG4gICAgZnVuY3Rpb24gc2V0dXBQb3B1cEJ1dHRvbnMoYnV0dG9uSWQsIHBvcHVwSWQpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvcHVwSWQpO1xuICAgICAgICBpZiAoIWJ1dHRvbiB8fCAhcG9wdXApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEJ1dHRvbiB3aXRoIElEICcke2J1dHRvbklkfScgb3IgcG9wdXAgd2l0aCBJRCAnJHtwb3B1cElkfScgbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3Zpc2libGUnKTsgLy8gVG9nZ2xlIHZpc2liaWxpdHkgb2YgdGhlIHBvcHVwXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXR1cFBvcHVwQnV0dG9ucygnYWJvdXQtYnRuJywgJ2Fib3V0LXBvcHVwJyk7IC8vIFNldHVwIHBvcHVwIGZvciBhYm91dCBidXR0b25cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBOYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplTmF2aWdhdGlvbiA9IGluaXRpYWxpemVOYXZpZ2F0aW9uO1xuLyoqXG4gKiBJbml0aWFsaXplIG5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplTmF2aWdhdGlvbigpIHtcbiAgICBzZXRBY3RpdmVOYXZMaW5rKCk7XG4gICAgc2V0dXBOYXZMaW5rcygpO1xufVxuLyoqXG4gKiBTZXQgYWN0aXZlIG5hdmlnYXRpb24gbGluayBiYXNlZCBvbiBjdXJyZW50IFVSTCBvciBwYWdlIHNlY3Rpb25cbiAqL1xuZnVuY3Rpb24gc2V0QWN0aXZlTmF2TGluaygpIHtcbiAgICBjb25zdCBjdXJyZW50UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8ICcjaG9tZSc7XG4gICAgdXBkYXRlQWN0aXZlTmF2TGluayhjdXJyZW50UGF0aCk7XG59XG4vKipcbiAqIFNldHVwIGNsaWNrIGhhbmRsZXJzIGZvciBuYXZpZ2F0aW9uIGxpbmtzXG4gKi9cbmZ1bmN0aW9uIHNldHVwTmF2TGlua3MoKSB7XG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICBpZiAoaHJlZikge1xuICAgICAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoaHJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIEhhbmRsZSBzcGVjaWFsIGNhc2VzIGZvciBwb3B1cCBsaW5rc1xuICAgIGNvbnN0IGFib3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWJ0bicpO1xuICAgIGNvbnN0IGNvbnRhY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1idG4nKTtcbiAgICBpZiAoYWJvdXRCdG4pIHtcbiAgICAgICAgYWJvdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKCcjYWJvdXQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChjb250YWN0QnRuKSB7XG4gICAgICAgIGNvbnRhY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKCcjY29udGFjdCcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgYWN0aXZlIG5hdmlnYXRpb24gbGlua1xuICogQHBhcmFtIHBhdGggVGhlIHBhdGggb3Igc2VjdGlvbiBJRCB0byBhY3RpdmF0ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVBY3RpdmVOYXZMaW5rKHBhdGgpIHtcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIGxpbmtzXG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBtYXRjaGluZyBsaW5rXG4gICAgY29uc3QgYWN0aXZlTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlciBuYXYgdWwgbGkgYVtocmVmPVwiJHtwYXRofVwiXWApO1xuICAgIGlmIChhY3RpdmVMaW5rKSB7XG4gICAgICAgIGFjdGl2ZUxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVQYWdpbmF0aW9uID0gaW5pdGlhbGl6ZVBhZ2luYXRpb247XG4vLyBQYWdpbmF0aW9uIGZ1bmN0aW9uYWxpdHlcbmNvbnN0IGNvbW1lbnRzXzEgPSByZXF1aXJlKFwiLi9jb21tZW50c1wiKTtcbi8qKlxuICogSW5pdGlhbGl6ZSBwYWdpbmF0aW9uIGZ1bmN0aW9uYWxpdHkgd2l0aCBMb2FkIE1vcmUgYnV0dG9uXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQYWdpbmF0aW9uKCkge1xuICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICBjb25zdCBoaWRkZW5Qb3N0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkcycpO1xuICAgIGlmICghbG9hZE1vcmVCdG4gfHwgIWhpZGRlblBvc3RzIHx8ICFibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdQYWdpbmF0aW9uIGVsZW1lbnRzIG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGN1cnJlbnRQYWdlID0gMTtcbiAgICBjb25zdCBwb3N0c1BlclBhZ2UgPSAzO1xuICAgIGNvbnN0IHRvdGFsSGlkZGVuUG9zdHMgPSBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgLy8gSGlkZSBsb2FkIG1vcmUgYnV0dG9uIGlmIG5vIGhpZGRlbiBwb3N0c1xuICAgIGlmICh0b3RhbEhpZGRlblBvc3RzID09PSAwKSB7XG4gICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICAgIC8vIFNldCB1cCBsb2FkIG1vcmUgYnV0dG9uIGNsaWNrIGhhbmRsZXJcbiAgICBsb2FkTW9yZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbG9hZE1vcmVQb3N0cyhsb2FkTW9yZUJ0biwgaGlkZGVuUG9zdHMsIGJsb2dDYXJkc0NvbnRhaW5lciwgY3VycmVudFBhZ2UsIHBvc3RzUGVyUGFnZSk7XG4gICAgICAgIGN1cnJlbnRQYWdlKys7XG4gICAgfSk7XG4gICAgLy8gSW5pdGlhbGl6ZSBzY3JvbGwtYmFzZWQgbG9hZGluZyAoaW5maW5pdGUgc2Nyb2xsKVxuICAgIGluaXRpYWxpemVJbmZpbml0ZVNjcm9sbChsb2FkTW9yZUJ0bik7XG59XG4vKipcbiAqIExvYWQgbW9yZSBwb3N0cyB3aGVuIHRoZSBsb2FkIG1vcmUgYnV0dG9uIGlzIGNsaWNrZWRcbiAqL1xuZnVuY3Rpb24gbG9hZE1vcmVQb3N0cyhsb2FkTW9yZUJ0biwgaGlkZGVuUG9zdHMsIGJsb2dDYXJkc0NvbnRhaW5lciwgY3VycmVudFBhZ2UsIHBvc3RzUGVyUGFnZSkge1xuICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKTtcbiAgICBsb2FkTW9yZUJ0bi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzcGlubmVyXCI+PC9zcGFuPiBMb2FkaW5nLi4uJztcbiAgICAvLyBTaW11bGF0ZSBsb2FkaW5nIGRlbGF5IGZvciBiZXR0ZXIgVVhcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHdoaWNoIHBvc3RzIHRvIGxvYWRcbiAgICAgICAgY29uc3Qgc3RhcnRJZHggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHBvc3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgZW5kSWR4ID0gTWF0aC5taW4oc3RhcnRJZHggKyBwb3N0c1BlclBhZ2UsIGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgIGxldCBwb3N0c0xvYWRlZCA9IDA7XG4gICAgICAgIC8vIENsb25lIGFuZCBtb3ZlIHBvc3RzIGZyb20gaGlkZGVuIGNvbnRhaW5lciB0byB2aXNpYmxlIGJsb2cgY2FyZHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3N0c1BlclBhZ2UgJiYgaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoID4gMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwb3N0VG9BZGQgPSBoaWRkZW5Qb3N0cy5jaGlsZHJlblswXTsgLy8gQWx3YXlzIHRha2UgdGhlIGZpcnN0IGVsZW1lbnRcbiAgICAgICAgICAgIGlmIChwb3N0VG9BZGQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZWRQb3N0ID0gcG9zdFRvQWRkLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBjbG9uZWRQb3N0LmNsYXNzTGlzdC5hZGQoJ25ldycpOyAvLyBBZGQgY2xhc3MgZm9yIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZWRQb3N0KTtcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0cy5yZW1vdmVDaGlsZChwb3N0VG9BZGQpO1xuICAgICAgICAgICAgICAgIHBvc3RzTG9hZGVkKys7XG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgbmV3IHBvc3RzXG4gICAgICAgICAgICAgICAgKDAsIGNvbW1lbnRzXzEuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSkoY2xvbmVkUG9zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UndmUgbG9hZGVkIGFsbCBwb3N0c1xuICAgICAgICBpZiAoaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc2V0IGJ1dHRvbiBzdGF0ZVxuICAgICAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gICAgICAgIGxvYWRNb3JlQnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPiBMb2FkIE1vcmUgUG9zdHMnO1xuICAgICAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnQgd2hlbiBwb3N0cyBhcmUgbG9hZGVkXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdwb3N0c0xvYWRlZCcsIHsgZGV0YWlsOiB7IGNvdW50OiBwb3N0c0xvYWRlZCB9IH0pO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9LCA4MDApOyAvLyBTaW11bGF0ZSBuZXR3b3JrIGRlbGF5XG59XG4vKipcbiAqIEluaXRpYWxpemUgaW5maW5pdGUgc2Nyb2xsIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUluZmluaXRlU2Nyb2xsKGxvYWRNb3JlQnRuKSB7XG4gICAgbGV0IHNjcm9sbFRpbWVvdXQ7XG4gICAgbGV0IGlzTG9hZGluZ01vcmVQb3N0cyA9IGZhbHNlO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgIC8vIElmIHRoZSBidXR0b24gaXMgaGlkZGVuIChhbGwgcG9zdHMgbG9hZGVkKSBvciBhbHJlYWR5IGluIGxvYWRpbmcgc3RhdGUsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyB8fFxuICAgICAgICAgICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2FkaW5nJykgfHxcbiAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyVGltZW91dChzY3JvbGxUaW1lb3V0KTtcbiAgICAgICAgc2Nyb2xsVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgc2Nyb2xsVG9wLCBzY3JvbGxIZWlnaHQsIGNsaWVudEhlaWdodCB9ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgLy8gV2hlbiB1c2VyIHNjcm9sbHMgdG8gYm90dG9tICh3aXRoIHNvbWUgYnVmZmVyKVxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCA+PSBzY3JvbGxIZWlnaHQgLSAyMDApIHtcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxvYWRNb3JlQnRuLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgZmxhZyBhZnRlciBhbmltYXRpb24gY29tcGxldGVzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDApO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVNlYXJjaCA9IGluaXRpYWxpemVTZWFyY2g7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCBibG9nQ2FyZHNfMSA9IHJlcXVpcmUoXCIuL2Jsb2dDYXJkc1wiKTtcbmNvbnN0IGNvbW1lbnRzXzEgPSByZXF1aXJlKFwiLi9jb21tZW50c1wiKTtcbi8qKlxuICogSW5pdGlhbGl6ZSBzZWFyY2ggZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplU2VhcmNoKCkge1xuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInNlYXJjaFwiXScpO1xuICAgIGlmICghc2VhcmNoSW5wdXQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdTZWFyY2ggaW5wdXQgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDeWNsZSB0aHJvdWdoIGRpZmZlcmVudCBwbGFjZWhvbGRlciB0ZXh0c1xuICAgIHNldHVwUGxhY2Vob2xkZXJDeWNsaW5nKHNlYXJjaElucHV0KTtcbiAgICAvLyBTZXQgdXAgc2VhcmNoIGlucHV0IGV2ZW50IGhhbmRsZXJcbiAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgICAgIGhhbmRsZVNlYXJjaChlLnRhcmdldCk7XG4gICAgfSk7XG59XG4vKipcbiAqIEN5Y2xlIHRocm91Z2ggZGlmZmVyZW50IHBsYWNlaG9sZGVyIHRleHRzIGZvciB0aGUgc2VhcmNoIGlucHV0XG4gKi9cbmZ1bmN0aW9uIHNldHVwUGxhY2Vob2xkZXJDeWNsaW5nKHNlYXJjaElucHV0KSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXJzID0gW1xuICAgICAgICBcIlNlYXJjaCBmb3IgYXJ0aWNsZXMuLi5cIixcbiAgICAgICAgXCJTZWFyY2ggZm9yIHRvcGljcy4uLlwiLFxuICAgICAgICBcIlNlYXJjaCBmb3IgYXV0aG9ycy4uLlwiXG4gICAgXTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgc2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcnNbaW5kZXhdO1xuICAgICAgICBpbmRleCA9IChpbmRleCArIDEpICUgcGxhY2Vob2xkZXJzLmxlbmd0aDtcbiAgICB9LCAzMDAwKTtcbn1cbi8qKlxuICogSGFuZGxlIHNlYXJjaCBpbnB1dCBhbmQgZmlsdGVyIGJsb2cgcG9zdHNcbiAqL1xuZnVuY3Rpb24gaGFuZGxlU2VhcmNoKHNlYXJjaElucHV0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoc2VhcmNoVGVybS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAvLyBJZiBzZWFyY2ggaXMgY2xlYXJlZCwgcmVsb2FkIGFsbCBwb3N0c1xuICAgICAgICAgICAgaWYgKHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gRGlzcGF0Y2ggZXZlbnQgdG8gcmVsb2FkIHBvc3RzXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JlbG9hZFBvc3RzJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkcycpO1xuICAgICAgICBpZiAoIWJsb2dDYXJkc0NvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+JztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZldGNoIGFsbCBwb3N0cyBhbmQgZmlsdGVyIGNsaWVudC1zaWRlXG4gICAgICAgICAgICAvLyBJbiBhIHJlYWwgYXBwLCB5b3UnZCBpbXBsZW1lbnQgc2VydmVyLXNpZGUgc2VhcmNoXG4gICAgICAgICAgICBjb25zdCBwb3N0cyA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaEJsb2dQb3N0cykoKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkUG9zdHMgPSBmaWx0ZXJQb3N0cyhwb3N0cywgc2VhcmNoVGVybSk7XG4gICAgICAgICAgICAvLyBDbGVhciBjb250YWluZXJcbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGlmIChmaWx0ZXJlZFBvc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIFNob3cgZW1wdHkgc2VhcmNoIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTZWFyY2hSZXN1bHRzKGJsb2dDYXJkc0NvbnRhaW5lciwgc2VhcmNoVGVybSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGlzcGxheSBmaWx0ZXJlZCBwb3N0c1xuICAgICAgICAgICAgZGlzcGxheUZpbHRlcmVkUG9zdHMoZmlsdGVyZWRQb3N0cywgYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlYXJjaGluZyBwb3N0czonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93U2VhcmNoRXJyb3IoYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBGaWx0ZXIgcG9zdHMgYmFzZWQgb24gc2VhcmNoIHRlcm1cbiAqL1xuZnVuY3Rpb24gZmlsdGVyUG9zdHMocG9zdHMsIHNlYXJjaFRlcm0pIHtcbiAgICByZXR1cm4gcG9zdHMuZmlsdGVyKHBvc3QgPT4gcG9zdC50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pIHx8XG4gICAgICAgIHBvc3QuY29udGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pIHx8XG4gICAgICAgIHBvc3QuYXV0aG9yLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkgfHxcbiAgICAgICAgKHBvc3QudGFncyAmJiBwb3N0LnRhZ3Muc29tZSh0YWcgPT4gdGFnLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkpKSk7XG59XG4vKipcbiAqIERpc3BsYXkgZmlsdGVyZWQgcG9zdHMgaW4gdGhlIGJsb2cgY29udGFpbmVyXG4gKi9cbmZ1bmN0aW9uIGRpc3BsYXlGaWx0ZXJlZFBvc3RzKGZpbHRlcmVkUG9zdHMsIGNvbnRhaW5lcikge1xuICAgIGZpbHRlcmVkUG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgZmlsdGVyZWQgcG9zdHNcbiAgICAgICAgKDAsIGNvbW1lbnRzXzEuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSkoYmxvZ0NhcmQpO1xuICAgIH0pO1xuICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudCB3aGVuIHNlYXJjaCByZXN1bHRzIGFyZSBkaXNwbGF5ZWRcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc2VhcmNoUmVzdWx0c0Rpc3BsYXllZCcsIHtcbiAgICAgICAgZGV0YWlsOiB7IGNvdW50OiBmaWx0ZXJlZFBvc3RzLmxlbmd0aCB9XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEaXNwbGF5IGVtcHR5IHNlYXJjaCByZXN1bHRzIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gc2hvd0VtcHR5U2VhcmNoUmVzdWx0cyhjb250YWluZXIsIHNlYXJjaFRlcm0pIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktc2VhcmNoXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zZWFyY2ggZmEtM3hcIj48L2k+XG4gICAgICAgICAgICA8aDM+Tm8gcmVzdWx0cyBmb3VuZDwvaDM+XG4gICAgICAgICAgICA8cD5ObyBwb3N0cyBtYXRjaCB5b3VyIHNlYXJjaCBmb3IgXCIke3NlYXJjaFRlcm19XCI8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4vKipcbiAqIERpc3BsYXkgc2VhcmNoIGVycm9yIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gc2hvd1NlYXJjaEVycm9yKGNvbnRhaW5lcikge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci1zdGF0ZVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZmEtM3hcIj48L2k+XG4gICAgICAgICAgICA8aDM+U2VhcmNoIGZhaWxlZDwvaDM+XG4gICAgICAgICAgICA8cD5GYWlsZWQgdG8gc2VhcmNoIGJsb2cgcG9zdHMuIFBsZWFzZSB0cnkgYWdhaW4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCA9IGluaXRpYWxpemVCbG9nRnJvbnRlbmQ7XG4vKipcbiAqIEJsb2cgRnJvbnRlbmQgQ29udHJvbGxlclxuICogQ2xpZW50LXNpZGUgY29udHJvbGxlciB0aGF0IGhhbmRsZXMgYWxsIGZyb250ZW5kIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBibG9nLlxuICogTWFuYWdlcyBVSSBpbml0aWFsaXphdGlvbiwgcG9zdCByZW5kZXJpbmcsIGFuZCB1c2VyIGludGVyYWN0aW9ucy5cbiAqL1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3QgYmxvZ0NhcmRzXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9ibG9nQ2FyZHNcIik7XG5jb25zdCBjb21tZW50c18xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvY29tbWVudHNcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG5jb25zdCBjb250YWN0XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9jb250YWN0XCIpO1xuY29uc3QgcGFnaW5hdGlvbl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvcGFnaW5hdGlvblwiKTtcbmNvbnN0IHNlYXJjaF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvc2VhcmNoXCIpO1xuY29uc3QgYWJvdXRfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Fib3V0XCIpO1xuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2aWdhdGlvblwiKTtcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgYmxvZyBmdW5jdGlvbmFsaXR5XG4gKiBTZXRzIHVwIGFsbCBVSSBjb21wb25lbnRzIGFuZCBpbml0aWFsaXplcyB0aGUgYmxvZyBwb3N0cyBkaXNwbGF5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVCbG9nRnJvbnRlbmQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHN5c3RlbSBkYXJrIG1vZGUgcHJlZmVyZW5jZSBmaXJzdFxuICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBuYXZpZ2F0aW9uIGZpcnN0IHRvIGVuc3VyZSBhY3RpdmUgc3RhdGVzIGFyZSBzZXRcbiAgICAgICAgKDAsIG5hdmlnYXRpb25fMS5pbml0aWFsaXplTmF2aWdhdGlvbikoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBhbGwgVUkgY29tcG9uZW50c1xuICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgICgwLCBjb250YWN0XzEuaW5pdGlhbGl6ZUNvbnRhY3RGb3JtKSgpO1xuICAgICAgICAoMCwgYWJvdXRfMS5pbml0aWFsaXplQWJvdXQpKCk7IC8vIEluaXRpYWxpemUgQWJvdXQgcG9wdXBcbiAgICAgICAgKDAsIHNlYXJjaF8xLmluaXRpYWxpemVTZWFyY2gpKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGJsb2cgcG9zdHNcbiAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgcGFnaW5hdGlvbiBhZnRlciBwb3N0cyBhcmUgbG9hZGVkXG4gICAgICAgICgwLCBwYWdpbmF0aW9uXzEuaW5pdGlhbGl6ZVBhZ2luYXRpb24pKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eVxuICAgICAgICAoMCwgY29tbWVudHNfMS5pbml0aWFsaXplQ29tbWVudHMpKCk7XG4gICAgICAgIC8vIFNldCB1cCBldmVudCBkZWxlZ2F0aW9uIGZvciBibG9nIGNhcmRzXG4gICAgICAgIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpO1xuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHJlbG9hZGluZyBwb3N0cyAodXNlZCBieSBzZWFyY2gpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlbG9hZFBvc3RzJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgICAgICAoMCwgcGFnaW5hdGlvbl8xLmluaXRpYWxpemVQYWdpbmF0aW9uKSgpO1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIGV2ZW50IGRlbGVnYXRpb24gaXMgc2V0IHVwIGFnYWluIGFmdGVyIHJlbG9hZGluZyBwb3N0c1xuICAgICAgICAgICAgc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGV2ZW50IGRlbGVnYXRpb24gZm9yIGJsb2cgY2FyZHMgY29udGFpbmVyXG4gKiBNb3JlIGVmZmljaWVudCB0aGFuIGF0dGFjaGluZyBldmVudCBsaXN0ZW5lcnMgdG8gZWFjaCBjYXJkXG4gKi9cbmZ1bmN0aW9uIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpIHtcbiAgICAvLyBHZXQgYm90aCBwcmltYXJ5IGFuZCBoaWRkZW4gYmxvZyBjb250YWluZXJzXG4gICAgY29uc3QgYmxvZ0NvbnRhaW5lcnMgPSBbXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNhcmRzJyksXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKVxuICAgIF07XG4gICAgLy8gQXBwbHkgZGVsZWdhdGlvbiB0byBlYWNoIGNvbnRhaW5lclxuICAgIGJsb2dDb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgaWYgKCFjb250YWluZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIFJlbW92ZSBleGlzdGluZyBldmVudCBsaXN0ZW5lciBpZiBpdCBleGlzdHMgKHRvIHByZXZlbnQgZHVwbGljYXRlcylcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQmxvZ0NhcmRDbGljayk7XG4gICAgICAgIC8vIEFkZCB0aGUgbmV3IGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgIH0pO1xufVxuLyoqXG4gKiBIYW5kbGUgY2xpY2sgZXZlbnRzIG9uIGJsb2cgY2FyZHMgdXNpbmcgZXZlbnQgZGVsZWdhdGlvblxuICovXG5mdW5jdGlvbiBoYW5kbGVCbG9nQ2FyZENsaWNrKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIC8vIEZpbmQgdGhlIGNsb3Nlc3QgYmxvZyBjYXJkIHRvIHRoZSBjbGlja2VkIGVsZW1lbnRcbiAgICBjb25zdCBjYXJkID0gdGFyZ2V0LmNsb3Nlc3QoJy5ibG9nLWNhcmQnKTtcbiAgICBpZiAoY2FyZCkge1xuICAgICAgICAvLyBEb24ndCBuYXZpZ2F0ZSBpZiBjbGlja2luZyBvbiBidXR0b25zLCBsaW5rcywgb3IgaWNvbnNcbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCdidXR0b24nKSB8fFxuICAgICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJ2EnKSB8fFxuICAgICAgICAgICAgdGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2knKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IHRoZSBwb3N0IElEIGZyb20gdGhlIGNhcmQncyBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICBjb25zdCBwb3N0SWQgPSBjYXJkLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3N0LWlkJyk7XG4gICAgICAgIGlmIChwb3N0SWQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9wb3N0Lmh0bWw/aWQ9JHtwb3N0SWR9YDsgLy8gTk9UIC9wdWJsaWMvcG9zdC5odG1sXG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEluaXRpYWxpemUgYmxvZyBwb3N0cyBmcm9tIEFQSVxuICogRmV0Y2hlcyBwb3N0cyBmcm9tIHRoZSBBUEkgYW5kIHJlbmRlcnMgdGhlbSBpbiB0aGUgVUlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVBvc3RzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNhcmRzJyk7XG4gICAgICAgIGlmICghYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0Jsb2cgY2FyZHMgY29udGFpbmVyIG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENsZWFyIGxvYWRpbmcgcGxhY2Vob2xkZXIgb3IgZXhpc3RpbmcgY29udGVudFxuICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+JztcbiAgICAgICAgICAgIC8vIEZldGNoIHBvc3RzIGZyb20gQVBJXG4gICAgICAgICAgICBjb25zdCBwb3N0cyA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaEJsb2dQb3N0cykoKTtcbiAgICAgICAgICAgIGlmIChwb3N0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBTaG93IGVtcHR5IHN0YXRlXG4gICAgICAgICAgICAgICAgc2hvd0VtcHR5U3RhdGUoYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDbGVhciBjb250YWluZXJcbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIC8vIERpc3BsYXkgZmlyc3QgMyBwb3N0c1xuICAgICAgICAgICAgY29uc3QgZGlzcGxheVBvc3RzID0gcG9zdHMuc2xpY2UoMCwgMyk7XG4gICAgICAgICAgICBjb25zdCBoaWRkZW5Qb3N0cyA9IHBvc3RzLnNsaWNlKDMpO1xuICAgICAgICAgICAgLy8gQWRkIHZpc2libGUgcG9zdHMgdG8gbWFpbiBjb250YWluZXJcbiAgICAgICAgICAgIGRpc3BsYXlQb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2dDYXJkID0gKDAsIGJsb2dDYXJkc18xLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCkocG9zdCk7XG4gICAgICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gQWRkIGhpZGRlbiBwb3N0cyB0byBoaWRkZW4gY29udGFpbmVyXG4gICAgICAgICAgICBjb25zdCBoaWRkZW5Qb3N0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICAgICAgICAgIGlmIChoaWRkZW5Qb3N0c0NvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGhpZGRlblBvc3RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGhpZGRlblBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2dDYXJkID0gKDAsIGJsb2dDYXJkc18xLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCkocG9zdCk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlblBvc3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBsb2FkIG1vcmUgYnV0dG9uIHZpc2liaWxpdHlcbiAgICAgICAgICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICAgICAgICAgIGlmIChsb2FkTW9yZUJ0bikge1xuICAgICAgICAgICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSBoaWRkZW5Qb3N0cy5sZW5ndGggPiAwID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluaXRpYWxpemluZyBwb3N0czonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93RXJyb3JTdGF0ZShibG9nQ2FyZHNDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFNob3cgZW1wdHkgc3RhdGUgd2hlbiBubyBwb3N0cyBhcmUgYXZhaWxhYmxlXG4gKiBDcmVhdGVzIGFuZCBhcHBlbmRzIERPTSBlbGVtZW50cyBpbnN0ZWFkIG9mIHVzaW5nIGlubmVySFRNTCBmb3IgYmV0dGVyIG1haW50YWluYWJpbGl0eVxuICovXG5mdW5jdGlvbiBzaG93RW1wdHlTdGF0ZShjb250YWluZXIpIHtcbiAgICAvLyBDbGVhciB0aGUgY29udGFpbmVyIGZpcnN0XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIC8vIENyZWF0ZSB0aGUgZW1wdHkgc3RhdGUgY29udGFpbmVyXG4gICAgY29uc3QgZW1wdHlTdGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVtcHR5U3RhdGVEaXYuY2xhc3NOYW1lID0gJ2VtcHR5LXN0YXRlJztcbiAgICAvLyBDcmVhdGUgYW5kIGFkZCB0aGUgaWNvblxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmFzIGZhLWZpbGUtYWx0IGZhLTN4JztcbiAgICBlbXB0eVN0YXRlRGl2LmFwcGVuZENoaWxkKGljb24pO1xuICAgIC8vIENyZWF0ZSBhbmQgYWRkIHRoZSBoZWFkaW5nXG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgaGVhZGluZy50ZXh0Q29udGVudCA9ICdObyBwb3N0cyBmb3VuZCc7XG4gICAgZW1wdHlTdGF0ZURpdi5hcHBlbmRDaGlsZChoZWFkaW5nKTtcbiAgICAvLyBDcmVhdGUgYW5kIGFkZCB0aGUgcGFyYWdyYXBoXG4gICAgY29uc3QgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHBhcmFncmFwaC50ZXh0Q29udGVudCA9ICdCZSB0aGUgZmlyc3QgdG8gY3JlYXRlIGEgYmxvZyBwb3N0ISc7XG4gICAgZW1wdHlTdGF0ZURpdi5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuICAgIC8vIEFwcGVuZCB0aGUgZW1wdHkgc3RhdGUgdG8gdGhlIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbXB0eVN0YXRlRGl2KTtcbn1cbi8qKlxuICogU2hvdyBlcnJvciBzdGF0ZSB3aGVuIHBvc3RzIGNvdWxkbid0IGJlIGxvYWRlZFxuICogQ3JlYXRlcyBhbmQgYXBwZW5kcyBET00gZWxlbWVudHMgaW5zdGVhZCBvZiB1c2luZyBpbm5lckhUTUwgZm9yIGJldHRlciBtYWludGFpbmFiaWxpdHlcbiAqL1xuZnVuY3Rpb24gc2hvd0Vycm9yU3RhdGUoY29udGFpbmVyKSB7XG4gICAgLy8gQ2xlYXIgdGhlIGNvbnRhaW5lciBmaXJzdFxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAvLyBDcmVhdGUgdGhlIGVycm9yIHN0YXRlIGNvbnRhaW5lclxuICAgIGNvbnN0IGVycm9yU3RhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlcnJvclN0YXRlRGl2LmNsYXNzTmFtZSA9ICdlcnJvci1zdGF0ZSc7XG4gICAgLy8gQ3JlYXRlIGFuZCBhZGQgdGhlIGljb25cbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIGljb24uY2xhc3NOYW1lID0gJ2ZhcyBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBmYS0zeCc7XG4gICAgZXJyb3JTdGF0ZURpdi5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAvLyBDcmVhdGUgYW5kIGFkZCB0aGUgaGVhZGluZ1xuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGhlYWRpbmcudGV4dENvbnRlbnQgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmcnO1xuICAgIGVycm9yU3RhdGVEaXYuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgLy8gQ3JlYXRlIGFuZCBhZGQgdGhlIHBhcmFncmFwaFxuICAgIGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBwYXJhZ3JhcGgudGV4dENvbnRlbnQgPSAnRmFpbGVkIHRvIGxvYWQgYmxvZyBwb3N0cy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nO1xuICAgIGVycm9yU3RhdGVEaXYuYXBwZW5kQ2hpbGQocGFyYWdyYXBoKTtcbiAgICAvLyBBcHBlbmQgdGhlIGVycm9yIHN0YXRlIHRvIHRoZSBjb250YWluZXJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZXJyb3JTdGF0ZURpdik7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9lbnRyaWVzL2NsaWVudC50c1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBJbXBvcnRzIHJlbWFpbiB0aGUgc2FtZS4uLlxuY29uc3QgYmxvZ0Zyb250ZW5kQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2Jsb2dGcm9udGVuZENvbnRyb2xsZXJcIik7XG5jb25zdCBwb3N0RGV0YWlsXzEgPSByZXF1aXJlKFwiLi4vbW9kdWxlcy9wb3N0RGV0YWlsXCIpO1xuY29uc3QgaGVhZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vKipcbiAqIENsaWVudC1zaWRlIGVudHJ5IHBvaW50IGluaXRpYWxpemVyLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ2xpZW50KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGllbnQgaW5pdGlhbGl6aW5nLi4uJyk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgY29tbW9uIGVsZW1lbnRzIGZpcnN0XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEYXJrIG1vZGUgaW5pdGlhbGl6ZWQgZ2xvYmFsbHkuJyk7XG4gICAgICAgICAgICAvLyBSZW5kZXIgSGVhZGVyIG9ubHkgaWYgcGxhY2Vob2xkZXIgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlci1wbGFjZWhvbGRlcicpKSB7XG4gICAgICAgICAgICAgICAgKDAsIGhlYWRlcl8xLnJlbmRlckhlYWRlcikoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGVyIHJlbmRlcmVkIGdsb2JhbGx5LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdIZWFkZXIgcGxhY2Vob2xkZXIgbm90IGZvdW5kIG9uIHRoaXMgcGFnZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgY29tbW9uIGVsZW1lbnRzOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUGFnZS1zcGVjaWZpYyBsb2dpY1xuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5wYWdlO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgLy8gR2V0IHRoZSBiYXNlIG5hbWUgb2YgdGhlIGZpbGUvcGF0aCwgcmVtb3ZpbmcgdHJhaWxpbmcgc2xhc2ggaWYgcHJlc2VudFxuICAgICAgICBjb25zdCBwYXRoRW5kID0gY3VycmVudFBhZ2UuZW5kc1dpdGgoJy8nKSA/IGN1cnJlbnRQYWdlLnNsaWNlKDAsIC0xKS5zcGxpdCgnLycpLnBvcCgpIDogY3VycmVudFBhZ2Uuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgICAgY29uc3QgaXNSb290T3JJbmRleCA9IGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvJykgfHwgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9pbmRleC5odG1sJyk7IC8vIENoZWNrIGlmIGl0J3MgdGhlIHJvb3Qgb2YgdGhlIGRlcGxveW1lbnRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZXRlY3RlZCBwYWdlVHlwZTogJHtwYWdlVHlwZX0sIGN1cnJlbnRQYWdlOiAke2N1cnJlbnRQYWdlfSwgcGF0aEVuZDogJHtwYXRoRW5kfSwgaXNSb290T3JJbmRleDogJHtpc1Jvb3RPckluZGV4fWApO1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIE1haW4gUGFnZSAodXNpbmcgZGF0YS1wYWdlIG9yIHBhdGggZW5kaW5nIGluIC8gb3IgL2luZGV4Lmh0bWwpXG4gICAgICAgICAgICBpZiAocGFnZVR5cGUgPT09ICdtYWluJyB8fCAoIXBhZ2VUeXBlICYmIGlzUm9vdE9ySW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBtYWluIGJsb2cgcGFnZSBsb2dpYy4uLicpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBibG9nRnJvbnRlbmRDb250cm9sbGVyXzEuaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCkoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWFpbiBibG9nIHBhZ2UgbG9naWMgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIFBvc3QgRGV0YWlsIFBhZ2UgKHVzaW5nIGRhdGEtcGFnZSBvciBwYXRoIGVuZGluZyBpbiAvcG9zdC5odG1sKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFnZVR5cGUgPT09ICdwb3N0JyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvcG9zdC5odG1sJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBwb3N0IGRldGFpbCBwYWdlIGxvZ2ljIChmcm9tIG1vZHVsZSkuLi4nKTtcbiAgICAgICAgICAgICAgICB5aWVsZCAoMCwgcG9zdERldGFpbF8xLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljKSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRldGFpbCBwYWdlIGxvZ2ljIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBBZG1pbiBQYWdlICh1c2luZyBkYXRhLXBhZ2Ugb3IgcGF0aCBlbmRpbmcgaW4gL2FkbWluLmh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ2FkbWluJyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvYWRtaW4uaHRtbCcpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZG1pbiBwYWdlIGRldGVjdGVkIGJ5IGNsaWVudC50cyAtIG5vIGFjdGlvbiB0YWtlbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmtub3duIHBhZ2UgdHlwZSAoJyR7cGFnZVR5cGV9Jykgb3IgcGF0aCAoJyR7Y3VycmVudFBhZ2V9JykuIE5vIHNwZWNpZmljIGluaXRpYWxpemF0aW9uIG5lZWRlZCBmcm9tIGNsaWVudC50cy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBwYWdlLXNwZWNpZmljIGNsaWVudCBpbml0aWFsaXphdGlvbjonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIERPTUNvbnRlbnRMb2FkZWQgbGlzdGVuZXIgcmVtYWlucyB0aGUgc2FtZS4uLlxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0aWFsaXplQ2xpZW50KTtcbn1cbmVsc2Uge1xuICAgIGluaXRpYWxpemVDbGllbnQoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL21vZHVsZXMvcG9zdERldGFpbC50c1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbiA9IGdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbjtcbmV4cG9ydHMuYWRkUG9zdFRvU2Vzc2lvbkxpa2VzID0gYWRkUG9zdFRvU2Vzc2lvbkxpa2VzO1xuZXhwb3J0cy5yZW1vdmVQb3N0RnJvbVNlc3Npb25MaWtlcyA9IHJlbW92ZVBvc3RGcm9tU2Vzc2lvbkxpa2VzO1xuZXhwb3J0cy5pbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYyA9IGluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljO1xuZXhwb3J0cy5sb2FkUG9zdENvbnRlbnQgPSBsb2FkUG9zdENvbnRlbnQ7XG5leHBvcnRzLnVwZGF0ZVBvc3RVSSA9IHVwZGF0ZVBvc3RVSTtcbmV4cG9ydHMudXBkYXRlUGFnZU1ldGFkYXRhID0gdXBkYXRlUGFnZU1ldGFkYXRhO1xuZXhwb3J0cy5pbml0aWFsaXplU29jaWFsU2hhcmluZyA9IGluaXRpYWxpemVTb2NpYWxTaGFyaW5nO1xuZXhwb3J0cy5zaG93RXJyb3JNZXNzYWdlID0gc2hvd0Vycm9yTWVzc2FnZTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUxpa2VCdXR0b24gPSBpbml0aWFsaXplTGlrZUJ1dHRvbjtcbmV4cG9ydHMubG9hZENvbW1lbnRzID0gbG9hZENvbW1lbnRzO1xuZXhwb3J0cy5pbml0aWFsaXplQ29tbWVudEZvcm0gPSBpbml0aWFsaXplQ29tbWVudEZvcm07XG4vLyAtLS0gSW1wb3J0cyAtLS1cbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTtcbmNvbnN0IGhlYWRlcl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaGVhZGVyXCIpO1xuY29uc3QgZGFya01vZGVfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2RhcmtNb2RlXCIpO1xuLy8gUGxhY2Vob2xkZXIgQVBJIGZ1bmN0aW9ucyBmb3IgY29tbWVudHMgKHJlcGxhY2Ugd2l0aCBhY3R1YWwgaW1wbGVtZW50YXRpb24pXG5jb25zdCBmZXRjaENvbW1lbnRzQXBpID0gKGlkKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zb2xlLmxvZyhgQVBJOiBGZXRjaGluZyBjb21tZW50cyBmb3IgJHtpZH1gKTtcbiAgICByZXR1cm4gW1xuICAgICAgICB7IGlkOiAxLCBuYW1lOiAnQWxpY2UnLCBjb21tZW50OiAnR3JlYXQgcG9zdCEnLCBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkgfSxcbiAgICAgICAgeyBpZDogMiwgbmFtZTogJ0JvYicsIGNvbW1lbnQ6ICdWZXJ5IGluZm9ybWF0aXZlLicsIGNyZWF0ZWRBdDogbmV3IERhdGUoKSB9XG4gICAgXTtcbn0pO1xuY29uc3Qgc3VibWl0Q29tbWVudEFwaSA9IChpZCwgbmFtZSwgY29tbWVudCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc29sZS5sb2coYEFQSTogU3VibWl0dGluZyBjb21tZW50IGZvciAke2lkfWAsIHsgbmFtZSwgY29tbWVudCB9KTtcbiAgICByZXR1cm4geyBpZDogRGF0ZS5ub3coKSwgbmFtZSwgY29tbWVudCwgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpIH07XG59KTtcbi8vIC0tLSBTZXNzaW9uIFN0b3JhZ2UgSGVscGVyIEZ1bmN0aW9ucyBmb3IgTGlrZXMgLS0tXG5jb25zdCBMSUtFRF9QT1NUU19TRVNTSU9OX0tFWSA9ICdsaWtlZFBvc3RzJztcbi8qKiBHZXRzIHRoZSBzZXQgb2YgbGlrZWQgcG9zdCBJRHMgZnJvbSBzZXNzaW9uU3RvcmFnZS4gKi9cbmZ1bmN0aW9uIGdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbigpIHtcbiAgICBjb25zdCBzdG9yZWRMaWtlcyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oTElLRURfUE9TVFNfU0VTU0lPTl9LRVkpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGxpa2VkSWRzID0gc3RvcmVkTGlrZXMgPyBKU09OLnBhcnNlKHN0b3JlZExpa2VzKSA6IFtdO1xuICAgICAgICByZXR1cm4gbmV3IFNldChBcnJheS5pc0FycmF5KGxpa2VkSWRzKSA/IGxpa2VkSWRzIDogW10pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBsaWtlZCBwb3N0cyBmcm9tIHNlc3Npb25TdG9yYWdlOlwiLCBlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG59XG4vKiogQWRkcyBhIHBvc3QgSUQgdG8gdGhlIGxpa2VkIHBvc3RzIGluIHNlc3Npb25TdG9yYWdlLiAqL1xuZnVuY3Rpb24gYWRkUG9zdFRvU2Vzc2lvbkxpa2VzKHBvc3RJZCkge1xuICAgIGNvbnN0IGxpa2VkUG9zdHNTZXQgPSBnZXRMaWtlZFBvc3RzRnJvbVNlc3Npb24oKTtcbiAgICBsaWtlZFBvc3RzU2V0LmFkZChwb3N0SWQpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oTElLRURfUE9TVFNfU0VTU0lPTl9LRVksIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20obGlrZWRQb3N0c1NldCkpKTtcbiAgICBjb25zb2xlLmxvZygnQWRkZWQgcG9zdCB0byBzZXNzaW9uIGxpa2VzOicsIHBvc3RJZCwgQXJyYXkuZnJvbShsaWtlZFBvc3RzU2V0KSk7XG59XG4vKiogUmVtb3ZlcyBhIHBvc3QgSUQgZnJvbSB0aGUgbGlrZWQgcG9zdHMgaW4gc2Vzc2lvblN0b3JhZ2UuICovXG5mdW5jdGlvbiByZW1vdmVQb3N0RnJvbVNlc3Npb25MaWtlcyhwb3N0SWQpIHtcbiAgICBjb25zdCBsaWtlZFBvc3RzU2V0ID0gZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uKCk7XG4gICAgbGlrZWRQb3N0c1NldC5kZWxldGUocG9zdElkKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKExJS0VEX1BPU1RTX1NFU1NJT05fS0VZLCBKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKGxpa2VkUG9zdHNTZXQpKSk7XG4gICAgY29uc29sZS5sb2coJ1JlbW92ZWQgcG9zdCBmcm9tIHNlc3Npb24gbGlrZXM6JywgcG9zdElkLCBBcnJheS5mcm9tKGxpa2VkUG9zdHNTZXQpKTtcbn1cbi8vIC0tLSBDb3JlIEluaXRpYWxpemF0aW9uIEZ1bmN0aW9uIC0tLVxuLyoqXG4gKiBJbml0aWFsaXplcyBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHBvc3QgZGV0YWlsIHBhZ2UuXG4gKiBUaGlzIGlzIHRoZSBtYWluIGV4cG9ydGVkIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCBieSB0aGUgZW50cnkgcG9pbnQuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgcG9zdCBkZXRhaWwgcGFnZS4uLicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UpKCk7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGFyayBtb2RlIGluaXRpYWxpemVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgaGVhZGVyXzEucmVuZGVySGVhZGVyKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0hlYWRlciByZW5kZXJlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSB1cmxQYXJhbXMuZ2V0KCdpZCcpO1xuICAgICAgICBpZiAocG9zdElkKSB7XG4gICAgICAgICAgICB5aWVsZCBsb2FkUG9zdENvbnRlbnQocG9zdElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHBvc3QgSUQgcHJvdmlkZWQgaW4gdGhlIFVSTCcpO1xuICAgICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZSgnTm8gcG9zdCBzcGVjaWZpZWQuIFBsZWFzZSBjaGVjayB0aGUgVVJMLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRldGFpbCBwYWdlIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlLicpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBMb2FkIGFuZCBkaXNwbGF5IHBvc3QgY29udGVudCBiYXNlZCBvbiBwb3N0IElEXG4gKi9cbmZ1bmN0aW9uIGxvYWRQb3N0Q29udGVudChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEZldGNoaW5nIHBvc3Qgd2l0aCBJRDogJHtwb3N0SWR9YCk7XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0geWllbGQgKDAsIGFwaV8xLmZldGNoUG9zdEJ5SWQpKHBvc3RJZCk7XG4gICAgICAgICAgICBpZiAoIXBvc3QpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQb3N0IHdpdGggSUQgJHtwb3N0SWR9IG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGF0YSBmZXRjaGVkOicsIHBvc3QpO1xuICAgICAgICAgICAgdXBkYXRlUG9zdFVJKHBvc3QpO1xuICAgICAgICAgICAgdXBkYXRlUGFnZU1ldGFkYXRhKHBvc3QpO1xuICAgICAgICAgICAgaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcocG9zdCk7XG4gICAgICAgICAgICBpbml0aWFsaXplTGlrZUJ1dHRvbihwb3N0KTtcbiAgICAgICAgICAgIGluaXRpYWxpemVDb21tZW50Rm9ybShwb3N0LmlkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgeWllbGQgbG9hZENvbW1lbnRzKHBvc3QuaWQudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHBvc3QgY29udGVudDonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93RXJyb3JNZXNzYWdlKGBGYWlsZWQgdG8gbG9hZCB0aGUgYmxvZyBwb3N0LiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1BsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJ31gKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBVcGRhdGUgdGhlIHBvc3QgVUkgd2l0aCBjb250ZW50IGZyb20gdGhlIGxvYWRlZCBwb3N0XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBvc3RVSShwb3N0KSB7XG4gICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIFBvc3QgVUkgZm9yOicsIHBvc3QudGl0bGUpO1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDYW5ub3QgdXBkYXRlIFVJOiAjcG9zdC1jb250ZW50IGVsZW1lbnQgbm90IGZvdW5kLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENvbnN0cnVjdCB0aGUgaW5uZXIgSFRNTCBkeW5hbWljYWxseVxuICAgIHBvc3RBcnRpY2xlRWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPiR7cG9zdC50aXRsZX08L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtbWV0YVwiPlxuICAgICAgICAgICAgICAgIDx0aW1lIGRhdGV0aW1lPVwiJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gOiAnJ31cIj5cbiAgICAgICAgICAgICAgICAgICAgJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnIH0pIDogJ0RhdGUgdW5rbm93bid9XG4gICAgICAgICAgICAgICAgPC90aW1lPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yXCI+YnkgJHtwb3N0LmF1dGhvciB8fCAnQW5vbnltb3VzJ308L3NwYW4+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibGlrZS1idXR0b25cIiBkYXRhLXBvc3QtaWQ9XCIke3Bvc3QuaWR9XCIgYXJpYS1sYWJlbD1cIkxpa2UgdGhpcyBwb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWhlYXJ0XCI+PC9pPiBcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsaWtlLWNvdW50XCI+JHtwb3N0Lmxpa2VzIHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgJHtwb3N0LmltYWdlVXJsID8gYDxpbWcgc3JjPVwiJHtwb3N0LmltYWdlVXJsfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIiBjbGFzcz1cImZlYXR1cmVkLWltYWdlXCI+YCA6ICcnfVxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWNvbnRlbnQtYm9keVwiPlxuICAgICAgICAgICAgJHtwb3N0LmNvbnRlbnR9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWZvb3RlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3NcIj5cbiAgICAgICAgICAgICAgICAke3Bvc3QudGFncyAmJiBwb3N0LnRhZ3MubGVuZ3RoID4gMCA/IGA8c3Bhbj5UYWdzOjwvc3Bhbj4gJHtwb3N0LnRhZ3MubWFwKHRhZyA9PiBgPGEgaHJlZj1cIi90YWcvJHt0YWcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICctJyl9XCI+JHt0YWd9PC9hPmApLmpvaW4oJycpfWAgOiAnJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvY2lhbC1zaGFyaW5nXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+U2hhcmU6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gdHdpdHRlclwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBUd2l0dGVyXCI+PGkgY2xhc3M9XCJmYWIgZmEtdHdpdHRlclwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGZhY2Vib29rXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIEZhY2Vib29rXCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2stZlwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGxpbmtlZGluXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIExpbmtlZEluXCI+PGkgY2xhc3M9XCJmYWIgZmEtbGlua2VkaW4taW5cIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJjb21tZW50cy1zZWN0aW9uXCIgY2xhc3M9XCJjb21tZW50cy1zZWN0aW9uXCIgYXJpYS1sYWJlbGxlZGJ5PVwiY29tbWVudHMtaGVhZGluZ1wiPlxuICAgICAgICAgICAgIDxoMiBpZD1cImNvbW1lbnRzLWhlYWRpbmdcIj5Db21tZW50czwvaDI+XG4gICAgICAgICAgICAgPGRpdiBpZD1cImNvbW1lbnRzLWxpc3RcIiBjbGFzcz1cImNvbW1lbnRzLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJuby1jb21tZW50c1wiPkxvYWRpbmcgY29tbWVudHMuLi48L3A+IFxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIDxmb3JtIGlkPVwiY29tbWVudC1mb3JtXCIgY2xhc3M9XCJjb21tZW50LWZvcm1cIiBkYXRhLXBvc3QtaWQ9XCIke3Bvc3QuaWR9XCI+XG4gICAgICAgICAgICAgICAgIDxoMz5MZWF2ZSBhIENvbW1lbnQ8L2gzPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvbW1lbnQtbmFtZVwiPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY29tbWVudC1uYW1lXCIgbmFtZT1cIm5hbWVcIiByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY29tbWVudC10ZXh0XCI+Q29tbWVudDo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGlkPVwiY29tbWVudC10ZXh0XCIgbmFtZT1cImNvbW1lbnRcIiByb3dzPVwiNFwiIHJlcXVpcmVkPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cInByaW1hcnktYnV0dG9uXCI+U3VibWl0IENvbW1lbnQ8L2J1dHRvbj5cbiAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuICAgIGNvbnNvbGUubG9nKCdQb3N0IFVJIHVwZGF0ZWQgd2l0aCBsaWtlIGJ1dHRvbiBhbmQgY29tbWVudHMgc2VjdGlvbiBzdHJ1Y3R1cmUuJyk7XG59XG4vKipcbiAqIFVwZGF0ZSBwYWdlIG1ldGFkYXRhIGxpa2UgdGl0bGUgYW5kIFVSTFxuICovXG5mdW5jdGlvbiB1cGRhdGVQYWdlTWV0YWRhdGEocG9zdCkge1xuICAgIGRvY3VtZW50LnRpdGxlID0gYCR7cG9zdC50aXRsZX0gfCBOb2VsJ3MgQmxvZ2A7XG4gICAgY29uc29sZS5sb2coJ1BhZ2UgbWV0YWRhdGEgdXBkYXRlZC4nKTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBzb2NpYWwgc2hhcmluZyBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVTb2NpYWxTaGFyaW5nKHBvc3QpIHtcbiAgICBjb25zdCBwb3N0QXJ0aWNsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgaWYgKCFwb3N0QXJ0aWNsZUVsZW1lbnQpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBzb2NpYWxTaGFyaW5nRGl2ID0gcG9zdEFydGljbGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWwtc2hhcmluZycpO1xuICAgIGlmIChzb2NpYWxTaGFyaW5nRGl2KSB7XG4gICAgICAgIHNvY2lhbFNoYXJpbmdEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hhcmUtYnV0dG9uJyk7XG4gICAgICAgICAgICBpZiAoIWJ1dHRvbilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYENoZWNrIG91dCB0aGlzIGFydGljbGU6ICR7cG9zdC50aXRsZX1gO1xuICAgICAgICAgICAgbGV0IHNoYXJlV2luZG93VXJsID0gJyc7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygndHdpdHRlcicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9JnRleHQ9JHtlbmNvZGVVUklDb21wb25lbnQodGV4dCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ3R3aXR0ZXItc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD0yMzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhY2Vib29rJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdmYWNlYm9vay1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnbGlua2VkaW4nKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyaW5nL3NoYXJlLW9mZnNpdGUvP3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdsaW5rZWRpbi1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ1NvY2lhbCBzaGFyaW5nIGluaXRpYWxpemVkLicpO1xufVxuLyoqXG4gKiBEaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIHVzZXIgd2l0aGluIHRoZSBwb3N0IGNvbnRlbnQgYXJlYVxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoY29udGVudEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXNlY3Rpb24nKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGNvbW1lbnRzU2VjdGlvbiA/IGNvbW1lbnRzU2VjdGlvbiA6IGNvbnRlbnRFbGVtZW50O1xuICAgICAgICB0YXJnZXRFbGVtZW50LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPiR7bWVzc2FnZX08L2Rpdj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7IC8vIEZhbGxiYWNrXG4gICAgfVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGxpa2UgYnV0dG9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUxpa2VCdXR0b24ocG9zdCkge1xuICAgIGNvbnN0IHBvc3RJZFN0cmluZyA9IHBvc3QuaWQudG9TdHJpbmcoKTtcbiAgICBjb25zdCBsaWtlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Bvc3QtY29udGVudCAubGlrZS1idXR0b25bZGF0YS1wb3N0LWlkPVwiJHtwb3N0SWRTdHJpbmd9XCJdYCk7XG4gICAgaWYgKCFsaWtlQnRuKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignTGlrZSBidXR0b24gbm90IGZvdW5kIGluIHBvc3QgZGV0YWlsIFVJLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGxpa2VkUG9zdHNTZXQgPSBnZXRMaWtlZFBvc3RzRnJvbVNlc3Npb24oKTtcbiAgICBsZXQgaXNMaWtlZCA9IGxpa2VkUG9zdHNTZXQuaGFzKHBvc3RJZFN0cmluZyk7IC8vIEluaXRpYWwgc3RhdGUgZnJvbSBzZXNzaW9uXG4gICAgY29uc3QgaWNvbiA9IGxpa2VCdG4ucXVlcnlTZWxlY3RvcignaScpO1xuICAgIGNvbnN0IGNvdW50U3BhbiA9IGxpa2VCdG4ucXVlcnlTZWxlY3RvcignLmxpa2UtY291bnQnKTtcbiAgICAvLyBTZXQgaW5pdGlhbCBVSSBzdGF0ZVxuICAgIGlmIChpc0xpa2VkICYmIGljb24pIHtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXInKTtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTtcbiAgICAgICAgbGlrZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaWtlZCcpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpY29uKSB7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFzJyk7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmFyJyk7XG4gICAgICAgIGxpa2VCdG4uY2xhc3NMaXN0LnJlbW92ZSgnbGlrZWQnKTtcbiAgICB9XG4gICAgaWYgKGNvdW50U3BhbilcbiAgICAgICAgY291bnRTcGFuLnRleHRDb250ZW50ID0gU3RyaW5nKHBvc3QubGlrZXMgfHwgMCk7XG4gICAgbGlrZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBjdXJyZW50SWNvbiA9IGxpa2VCdG4ucXVlcnlTZWxlY3RvcignaScpO1xuICAgICAgICBjb25zdCBjdXJyZW50Q291bnRTcGFuID0gbGlrZUJ0bi5xdWVyeVNlbGVjdG9yKCcubGlrZS1jb3VudCcpO1xuICAgICAgICBpZiAoIWN1cnJlbnRJY29uIHx8ICFjdXJyZW50Q291bnRTcGFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsaWtlQnRuLmRpc2FibGVkID0gdHJ1ZTsgLy8gUHJldmVudCBkb3VibGUtY2xpY2tpbmdcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBdHRlbXB0aW5nIHRvIFVOTElLRSBwb3N0ICR7cG9zdC5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCAoMCwgYXBpXzEudW5saWtlUG9zdCkoTnVtYmVyKHBvc3QuaWQpKTsgLy8gQ2FsbCB1bmxpa2VQb3N0IEFQSVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEF0dGVtcHRpbmcgdG8gTElLRSBwb3N0ICR7cG9zdC5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCAoMCwgYXBpXzEubGlrZVBvc3QpKE51bWJlcihwb3N0LmlkKSk7IC8vIENhbGwgbGlrZVBvc3QgQVBJXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHRoZSBsb2NhbCAnaXNMaWtlZCcgc3RhdGUgb25seSBhZnRlciBzdWNjZXNzZnVsIEFQSSBjYWxsXG4gICAgICAgICAgICAgICAgaXNMaWtlZCA9ICFpc0xpa2VkO1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBTZXNzaW9uIFN0b3JhZ2UgYmFzZWQgb24gdGhlIG5ldyB0b2dnbGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgaWYgKGlzTGlrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkUG9zdFRvU2Vzc2lvbkxpa2VzKHBvc3RJZFN0cmluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVQb3N0RnJvbVNlc3Npb25MaWtlcyhwb3N0SWRTdHJpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgVUkgSWNvbiBiYXNlZCBvbiB0aGUgbmV3IHRvZ2dsZWQgc3RhdGVcbiAgICAgICAgICAgICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXInKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEljb24uY2xhc3NMaXN0LmFkZCgnZmFzJyk7XG4gICAgICAgICAgICAgICAgICAgIGxpa2VCdG4uY2xhc3NMaXN0LmFkZCgnbGlrZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcycpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInKTtcbiAgICAgICAgICAgICAgICAgICAgbGlrZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdsaWtlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY291bnQgZGlyZWN0bHkgZnJvbSB0aGUgQVBJIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY3VycmVudENvdW50U3Bhbi50ZXh0Q29udGVudCA9IFN0cmluZyhyZXN1bHQubGlrZXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMaWtlIHN0YXR1cyB1cGRhdGVkLiBOZXcgY291bnQ6ICR7cmVzdWx0Lmxpa2VzfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkxpa2UvVW5saWtlIEFQSSBjYWxsIGZhaWxlZCBvciByZXR1cm5lZCBudWxsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB1cGRhdGUgbGlrZS91bmxpa2Ugc3RhdHVzOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBsaWtlQnRuLmRpc2FibGVkID0gZmFsc2U7IC8vIFJlLWVuYWJsZSBidXR0b25cbiAgICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zb2xlLmxvZygnTGlrZSBidXR0b24gaW5pdGlhbGl6ZWQuJyk7XG59XG4vKipcbiAqIEZldGNoZXMgY29tbWVudHMgZnJvbSBBUEkgYW5kIHJlbmRlcnMgdGhlbSBpbnRvIHRoZSBsaXN0LlxuICovXG5mdW5jdGlvbiBsb2FkQ29tbWVudHMocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLWxpc3QnKTtcbiAgICAgICAgaWYgKCFjb21tZW50c0xpc3QpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJsb2FkaW5nLWNvbW1lbnRzXCI+TG9hZGluZyBjb21tZW50cy4uLjwvcD4nOyAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRzID0geWllbGQgZmV0Y2hDb21tZW50c0FwaShwb3N0SWQpOyAvLyBSZXBsYWNlIHdpdGggYWN0dWFsIEFQSSBjYWxsXG4gICAgICAgICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIGxvYWRpbmcvcHJldmlvdXMgY29tbWVudHNcbiAgICAgICAgICAgIGlmIChjb21tZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwibm8tY29tbWVudHNcIj5ObyBjb21tZW50cyB5ZXQuIEJlIHRoZSBmaXJzdCB0byBjb21tZW50ITwvcD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29tbWVudHMuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBjb21tZW50RWxlbWVudC5jbGFzc05hbWUgPSAnY29tbWVudCc7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJhc2ljIGVzY2FwaW5nIGZvciBkaXNwbGF5IC0gY29uc2lkZXIgYSBtb3JlIHJvYnVzdCBzYW5pdGl6ZXIgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhZmVOYW1lID0gKChfYiA9IChfYSA9IGNvbW1lbnQubmFtZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVwbGFjZSgvPi9nLCBcIiZndDtcIikpIHx8ICdBbm9ueW1vdXMnO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYWZlQ29tbWVudCA9ICgoX2QgPSAoX2MgPSBjb21tZW50LmNvbW1lbnQpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5yZXBsYWNlKC88L2csIFwiJmx0O1wiKSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpKSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudEVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtbWV0YVwiPjxzdHJvbmc+JHtzYWZlTmFtZX08L3N0cm9uZz4gb24gJHtuZXcgRGF0ZShjb21tZW50LmNyZWF0ZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtYm9keVwiPiR7c2FmZUNvbW1lbnR9PC9wPlxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzTGlzdC5hcHBlbmRDaGlsZChjb21tZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29tbWVudHMgbG9hZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGNvbW1lbnRzOlwiLCBlcnJvcik7XG4gICAgICAgICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPkNvdWxkIG5vdCBsb2FkIGNvbW1lbnRzLjwvcD4nO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBjb21tZW50IHN1Ym1pc3Npb24gZm9ybS5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRGb3JtKHBvc3RJZCkge1xuICAgIGNvbnN0IGNvbW1lbnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtZm9ybScpO1xuICAgIGlmICghY29tbWVudEZvcm0pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDb21tZW50IGZvcm0gbm90IGZvdW5kIGluIHBvc3QgZGV0YWlsIFVJLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbW1lbnRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjb21tZW50Rm9ybS5lbGVtZW50cy5uYW1lZEl0ZW0oJ25hbWUnKTtcbiAgICAgICAgY29uc3QgY29tbWVudElucHV0ID0gY29tbWVudEZvcm0uZWxlbWVudHMubmFtZWRJdGVtKCdjb21tZW50Jyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGNvbW1lbnRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJyk7XG4gICAgICAgIGlmICghbmFtZUlucHV0IHx8ICFjb21tZW50SW5wdXQgfHwgIXN1Ym1pdEJ1dHRvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnQgPSBjb21tZW50SW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICBpZiAoIW5hbWUgfHwgIWNvbW1lbnQpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgYm90aCBuYW1lIGFuZCBjb21tZW50LicpOyAvLyBTaW1wbGUgdmFsaWRhdGlvblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdWJtaXR0aW5nLi4uJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHlpZWxkIHN1Ym1pdENvbW1lbnRBcGkocG9zdElkLCBuYW1lLCBjb21tZW50KTsgLy8gUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gQ2xlYXIgZm9ybVxuICAgICAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICBjb21tZW50SW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIC8vIFJlZnJlc2ggY29tbWVudHMgbGlzdCB0byBzaG93IHRoZSBuZXcgY29tbWVudFxuICAgICAgICAgICAgeWllbGQgbG9hZENvbW1lbnRzKHBvc3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHN1Ym1pdCBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgICAgICAgICBhbGVydCgnRmFpbGVkIHRvIHN1Ym1pdCBjb21tZW50LiBQbGVhc2UgdHJ5IGFnYWluLicpOyAvLyBTaW1wbGUgZXJyb3IgZmVlZGJhY2tcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ1N1Ym1pdCBDb21tZW50JztcbiAgICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zb2xlLmxvZygnQ29tbWVudCBmb3JtIGluaXRpYWxpemVkLicpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubGlrZVBvc3QgPSBsaWtlUG9zdDtcbmV4cG9ydHMudW5saWtlUG9zdCA9IHVubGlrZVBvc3Q7XG5leHBvcnRzLmRlbGV0ZUJsb2dQb3N0ID0gZGVsZXRlQmxvZ1Bvc3Q7XG5leHBvcnRzLmNyZWF0ZVBvc3QgPSBjcmVhdGVQb3N0O1xuZXhwb3J0cy51cGRhdGVQb3N0ID0gdXBkYXRlUG9zdDtcbmV4cG9ydHMuYWRkVGFnVG9Qb3N0ID0gYWRkVGFnVG9Qb3N0O1xuZXhwb3J0cy5mZXRjaEJsb2dQb3N0cyA9IGZldGNoQmxvZ1Bvc3RzO1xuZXhwb3J0cy5mZXRjaFBvc3RCeUlkID0gZmV0Y2hQb3N0QnlJZDtcbmV4cG9ydHMuZmV0Y2hDb21tZW50c0FwaSA9IGZldGNoQ29tbWVudHNBcGk7XG5leHBvcnRzLnN1Ym1pdENvbW1lbnRBcGkgPSBzdWJtaXRDb21tZW50QXBpO1xuLy8gQVBJX1VSTCBjb25zdGFudCBpcyBub3QgbmVlZGVkIHdoZW4gZmV0Y2hpbmcgc3RhdGljIGZpbGUgZGlyZWN0bHlcbi8vIGNvbnN0IEFQSV9VUkwgPSAnL2FwaSc7IFxuLy8gLS0tIEZ1bmN0aW9ucyByZWx5aW5nIG9uIGJhY2tlbmQgQVBJIChXaWxsIE5PVCB3b3JrIG9uIEdpdEh1YiBQYWdlcykgLS0tXG4vLyBUaGVzZSBmdW5jdGlvbnMgd2lsbCBmYWlsIHNpbGVudGx5IG9yIGxvZyBlcnJvcnMgaW4gdGhlIGNvbnNvbGUgb24gdGhlIHN0YXRpYyBzaXRlLlxuZnVuY3Rpb24gbGlrZVBvc3QoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBMaWtlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZXMgYSBiYWNrZW5kLiBDYW5ub3QgTElLRSBwb3N0ICR7aWR9IG9uIHN0YXRpYyBzaXRlLmApO1xuICAgICAgICAvLyBSZXR1cm4gbnVsbCBvciBhIGRlZmF1bHQgc3RydWN0dXJlIGlmIHlvdXIgY2FsbGluZyBjb2RlIGV4cGVjdHMgaXRcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB1bmxpa2VQb3N0KGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgVW5saWtlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZXMgYSBiYWNrZW5kLiBDYW5ub3QgVU5MSUtFIHBvc3QgJHtpZH0gb24gc3RhdGljIHNpdGUuYCk7XG4gICAgICAgIC8vIFJldHVybiBudWxsIG9yIGEgZGVmYXVsdCBzdHJ1Y3R1cmVcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkZWxldGVCbG9nUG9zdChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGRlbGV0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBvc3QocG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGNyZWF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlUG9zdChpZCwgcG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHVwZGF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gYWRkVGFnVG9Qb3N0KGlkLCB0YWcpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGFkZCB0YWcgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG4vLyAtLS0gRnVuY3Rpb25zIG1vZGlmaWVkIGZvciBzdGF0aWMgZGF0YSAtLS1cbi8qKlxuICogRmV0Y2ggYWxsIGJsb2cgcG9zdHMgZGlyZWN0bHkgZnJvbSB0aGUgc3RhdGljIEpTT04gZmlsZS5cbiAqL1xuZnVuY3Rpb24gZmV0Y2hCbG9nUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gQ29uc3RydWN0IHRoZSBwYXRoIHJlbGF0aXZlIHRvIHRoZSBIVE1MIGZpbGUgbG9hZGluZyB0aGUgc2NyaXB0LlxuICAgICAgICAvLyBBc3N1bWVzIHBvc3RzLmpzb24gaXMgY29waWVkIHRvICdkb2NzL2RhdGEvcG9zdHMuanNvbicgYnkgdGhlIHdvcmtmbG93LlxuICAgICAgICAvLyBBbmQgSFRNTCBmaWxlcyBhcmUgYXQgdGhlIHJvb3Qgb2YgJ2RvY3MnLlxuICAgICAgICBjb25zdCBkYXRhVXJsID0gJ2RhdGEvcG9zdHMuanNvbic7XG4gICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBzdGF0aWMgZGF0YSBmcm9tOiAke2RhdGFVcmx9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGRhdGFVcmwpO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoICR7ZGF0YVVybH06ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgLy8gQXNzdW1pbmcgdGhlIEpTT04gc3RydWN0dXJlIGlzIHsgcG9zdHM6IFsuLi5dIH0gXG4gICAgICAgICAgICAvLyBvciBtYXliZSBqdXN0IGFuIGFycmF5IFsuLi5dIGRpcmVjdGx5PyBBZGp1c3QgYmFzZWQgb24geW91ciBwb3N0cy5qc29uIHN0cnVjdHVyZS5cbiAgICAgICAgICAgIC8vIElmIHBvc3RzLmpzb24gaXMganVzdCBhbiBhcnJheTogcmV0dXJuIGRhdGEgfHwgW107XG4gICAgICAgICAgICByZXR1cm4gZGF0YS5wb3N0cyB8fCBbXTsgLy8gVXNlIHRoaXMgaWYgcG9zdHMuanNvbiBoYXMgeyBcInBvc3RzXCI6IFsuLi5dIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHN0YXRpYyBwb3N0cy5qc29uOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IG9uIGVycm9yXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGEgc2luZ2xlIHBvc3QgYnkgSUQgYnkgZmlsdGVyaW5nIHRoZSBzdGF0aWMgSlNPTiBkYXRhLlxuICogTm90ZTogVGhpcyBsb2FkcyBBTEwgcG9zdHMganVzdCB0byBmaW5kIG9uZSAtIGxlc3MgZWZmaWNpZW50IHRoYW4gYW4gQVBJLlxuICogQHBhcmFtIGlkIC0gVGhlIHBvc3QgSUQgKHN0cmluZyBvciBudW1iZXIpXG4gKi9cbmZ1bmN0aW9uIGZldGNoUG9zdEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgYWxsUG9zdHMgPSB5aWVsZCBmZXRjaEJsb2dQb3N0cygpOyAvLyBGZXRjaCBhbGwgcG9zdHMgZnJvbSBKU09OXG4gICAgICAgICAgICAvLyBFbnN1cmUgY29uc2lzdGVudCBJRCBjb21wYXJpc29uIChlLmcuLCBjb21wYXJpbmcgbnVtYmVycylcbiAgICAgICAgICAgIGNvbnN0IHBvc3RJZE51bWJlciA9IHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyBwYXJzZUludChpZCwgMTApIDogaWQ7XG4gICAgICAgICAgICBpZiAoaXNOYU4ocG9zdElkTnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgcG9zdCBJRCBwcm92aWRlZDogJHtpZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBvc3QgPSBhbGxQb3N0cy5maW5kKHAgPT4gTnVtYmVyKHAuaWQpID09PSBwb3N0SWROdW1iZXIpO1xuICAgICAgICAgICAgaWYgKCFwb3N0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBQb3N0IHdpdGggSUQgJHtpZH0gbm90IGZvdW5kIGluIHN0YXRpYyBkYXRhLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coYEZvdW5kIHBvc3QgJHtpZH0gaW4gc3RhdGljIGRhdGEuYCk7XG4gICAgICAgICAgICByZXR1cm4gcG9zdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHN0YXRpYyBwb3N0ICR7aWR9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyAtLS0gQ29tbWVudCBBUEkgUGxhY2Vob2xkZXJzIChOZWVkIHNlcGFyYXRlIHNlcnZpY2Ugb3IgYmFja2VuZCkgLS0tXG4vLyBUaGVzZSB3b3VsZCBuZWVkIHRvIGJlIGltcGxlbWVudGVkIHVzaW5nIGEgdGhpcmQtcGFydHkgc2VydmljZSAobGlrZSBEaXNxdXMpXG4vLyBvciBhIHNlcnZlcmxlc3MgYmFja2VuZCBpZiB5b3Ugd2FudCBjb21tZW50cyBvbiBhIHN0YXRpYyBzaXRlLlxuZnVuY3Rpb24gZmV0Y2hDb21tZW50c0FwaShwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJDb21tZW50cyBjYW5ub3QgYmUgZmV0Y2hlZCBvbiBzdGF0aWMgc2l0ZSB3aXRob3V0IGV4dGVybmFsIHNlcnZpY2UvYmFja2VuZC5cIik7XG4gICAgICAgIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzdWJtaXRDb21tZW50QXBpKHBvc3RJZCwgbmFtZSwgY29tbWVudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3Qgc3VibWl0IGNvbW1lbnQgb24gc3RhdGljIHNpdGUgd2l0aG91dCBleHRlcm5hbCBzZXJ2aWNlL2JhY2tlbmQuXCIpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb21tZW50IHN1Ym1pc3Npb24gbm90IGF2YWlsYWJsZS5cIik7XG4gICAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZW50cmllcy9jbGllbnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=