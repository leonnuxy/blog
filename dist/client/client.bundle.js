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
            post.tags.map(tag => `<span class="tag-badge" data-tag="${tag}">${tag}</span>`).join('') +
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
                    {/* Use encodedUrl which is now relative */}
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
            // Fetch posts using the function from api.ts (which fetches static json)
            const posts = yield (0, api_1.fetchBlogPosts)();
            console.log(`Fetched ${posts.length} posts.`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDckQ7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELEdBQUc7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsSUFBSTtBQUNqRDtBQUNBO0FBQ0Esc0NBQXNDLElBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELEdBQUc7QUFDM0Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7OztVQ3RJQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2Fib3V0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9ibG9nQ2FyZHMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2NvbW1lbnRzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9jb250YWN0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9kYXJrTW9kZS50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9wYWdpbmF0aW9uLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9zZWFyY2gudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9ibG9nRnJvbnRlbmRDb250cm9sbGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvZW50cmllcy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9tb2R1bGVzL3Bvc3REZXRhaWwudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9zZXJ2aWNlcy9hcGkudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBBYm91dCBwb3B1cCBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVBYm91dCA9IGluaXRpYWxpemVBYm91dDtcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgQWJvdXQgc2VjdGlvbiBwb3B1cFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQWJvdXQoKSB7XG4gICAgY29uc3QgYWJvdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtYnRuJyk7XG4gICAgY29uc3QgYWJvdXRQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1wb3B1cCcpO1xuICAgIGNvbnN0IGNsb3NlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQtcG9wdXAgLmNsb3NlLXBvcHVwJyk7XG4gICAgaWYgKCFhYm91dEJ0biB8fCAhYWJvdXRQb3B1cCB8fCAhY2xvc2VQb3B1cCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0Fib3V0IHBvcHVwIGVsZW1lbnRzIG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gT3BlbiBwb3B1cCB3aGVuIGFib3V0IGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgYWJvdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgZGVmYXVsdCBhbmNob3IgYmVoYXZpb3JcbiAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJzsgLy8gUHJldmVudCBzY3JvbGxpbmcgd2hpbGUgcG9wdXAgaXMgb3BlblxuICAgICAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGFib3V0IGxpbmtcbiAgICAgICAgYWJvdXRCdG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2UgcG9wdXAgd2hlbiBjbG9zZSBidXR0b24gaXMgY2xpY2tlZFxuICAgIGNsb3NlUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSB3aGVuIGNsaWNraW5nIG91dHNpZGUgdGhlIHBvcHVwIGNvbnRlbnRcbiAgICBhYm91dFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBhYm91dFBvcHVwKSB7XG4gICAgICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBDbG9zZSBvbiBlc2NhcGUga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgYWJvdXRQb3B1cC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgdGhlIGRlZmF1bHQgYWN0aXZlIGxpbmsgc3RhdGVcbiAqL1xuZnVuY3Rpb24gc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKSB7XG4gICAgLy8gR2V0IGN1cnJlbnQgaGFzaCBvciBkZWZhdWx0IHRvIGhvbWVcbiAgICBjb25zdCBjdXJyZW50SGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8ICcjaG9tZSc7XG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBuYXYgbGlua3NcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgaGFzaCBsaW5rXG4gICAgY29uc3QgY3VycmVudExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXIgbmF2IHVsIGxpIGFbaHJlZj1cIiR7Y3VycmVudEhhc2h9XCJdYCk7XG4gICAgaWYgKGN1cnJlbnRMaW5rKSB7XG4gICAgICAgIGN1cnJlbnRMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQgPSBjcmVhdGVCbG9nQ2FyZEVsZW1lbnQ7XG4vKipcbiAqIENyZWF0ZXMgYSBET00gZWxlbWVudCBmb3IgYSBibG9nIGNhcmQgZnJvbSBwb3N0IGRhdGEgKGRpc3BsYXkgb25seSBmb3IgYWN0aW9ucylcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmxvZ0NhcmRFbGVtZW50KHBvc3QpIHtcbiAgICBjb25zdCBibG9nQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJsb2dDYXJkLmNsYXNzTmFtZSA9ICdibG9nLWNhcmQnO1xuICAgIGJsb2dDYXJkLmRhdGFzZXQucG9zdElkID0gU3RyaW5nKHBvc3QuaWQpO1xuICAgIGJsb2dDYXJkLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICBjb25zdCBjb21tZW50Q291bnQgPSBwb3N0LmNvbW1lbnRzID8gcG9zdC5jb21tZW50cy5sZW5ndGggOiAwO1xuICAgIGNvbnN0IGNyZWF0ZWREYXRlID0gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBjcmVhdGVkRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnXG4gICAgfSk7XG4gICAgLy8gLS0tIER5bmFtaWMgVVJMIGFuZCBUZXh0IEdlbmVyYXRpb24gZm9yIFNoYXJpbmcgLS0tXG4gICAgLy8gVXNlIGEgcmVsYXRpdmUgcGF0aCBmb3Igc2hhcmluZyBhcyB3ZWxsXG4gICAgY29uc3QgcG9zdFVybCA9IGBwb3N0Lmh0bWw/aWQ9JHtTdHJpbmcocG9zdC5pZCl9YDtcbiAgICBjb25zdCBlbmNvZGVkVXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHBvc3RVcmwpOyAvLyBOb3RlOiBTaGFyaW5nIHNlcnZpY2VzIG1pZ2h0IHJlc29sdmUgdGhpcyByZWxhdGl2ZSB0byB0aGUgY3VycmVudCBwYWdlXG4gICAgLy8gQWx0ZXJuYXRpdmU6IENvbnN0cnVjdCBmdWxsIFVSTCBjYXJlZnVsbHkgaWYgbmVlZGVkIGJ5IHNwZWNpZmljIHNoYXJpbmcgc2VydmljZXNcbiAgICAvLyBjb25zdCBwb3N0RnVsbFVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyaW5nKDAsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5sYXN0SW5kZXhPZignLycpKX0vcG9zdC5odG1sP2lkPSR7U3RyaW5nKHBvc3QuaWQpfWA7XG4gICAgLy8gY29uc3QgZW5jb2RlZEZ1bGxVcmwgPSBlbmNvZGVVUklDb21wb25lbnQocG9zdEZ1bGxVcmwpO1xuICAgIGNvbnN0IHNoYXJlVGV4dCA9IGBDaGVjayBvdXQgdGhpcyBhcnRpY2xlOiAke3Bvc3QudGl0bGV9YDtcbiAgICBjb25zdCBlbmNvZGVkU2hhcmVUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHNoYXJlVGV4dCk7XG4gICAgLy8gLS0tIEVuZCBEeW5hbWljIFVSTCBHZW5lcmF0aW9uIC0tLVxuICAgIGxldCB0YWdzSFRNTCA9ICcnO1xuICAgIGlmIChwb3N0LnRhZ3MgJiYgcG9zdC50YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGFnc0hUTUwgPSAnPGRpdiBjbGFzcz1cInBvc3QtdGFnc1wiPicgK1xuICAgICAgICAgICAgcG9zdC50YWdzLm1hcCh0YWcgPT4gYDxzcGFuIGNsYXNzPVwidGFnLWJhZGdlXCIgZGF0YS10YWc9XCIke3RhZ31cIj4ke3RhZ308L3NwYW4+YCkuam9pbignJykgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgfVxuICAgIGNvbnN0IGZhbGxiYWNrSW1hZ2VVcmwgPSAnaW1hZ2VzL2Jsb2dfaW1hZ2VfMy5qcGVnJzsgLy8gUmVsYXRpdmUgcGF0aFxuICAgIGJsb2dDYXJkLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGltZyBzcmM9XCIke3Bvc3QuaW1hZ2VVcmwgfHwgZmFsbGJhY2tJbWFnZVVybH1cIiBhbHQ9XCIke3Bvc3QudGl0bGV9XCI+IFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmxvZy1jYXJkLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiYmxvZy1jYXJkLWRhdGUtYXV0aG9yXCI+JHtkYXRlU3RyfTwvcD5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cImJsb2ctY2FyZC10aXRsZVwiPiR7cG9zdC50aXRsZX08L2gzPlxuICAgICAgICAgICAgJHt0YWdzSFRNTH1cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxpa2UtYnV0dG9uLWRpc3BsYXlcIiBhcmlhLWxhYmVsPVwiJHtwb3N0Lmxpa2VzIHx8IDB9IGxpa2VzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWhlYXJ0XCI+PC9pPiA8c3BhbiBjbGFzcz1cImxpa2UtY291bnRcIj4ke3Bvc3QubGlrZXMgfHwgMH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29tbWVudHMtdG9nZ2xlLWRpc3BsYXlcIiBhcmlhLWxhYmVsPVwiJHtjb21tZW50Q291bnR9IGNvbW1lbnRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNvbW1lbnRcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29tbWVudC1jb3VudFwiPiR7Y29tbWVudENvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvY2lhbC1zaGFyaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIHsvKiBVc2UgZW5jb2RlZFVybCB3aGljaCBpcyBub3cgcmVsYXRpdmUgKi99XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gdHdpdHRlclwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBUd2l0dGVyXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCIgZGF0YS10ZXh0PVwiJHtlbmNvZGVkU2hhcmVUZXh0fVwiPjxpIGNsYXNzPVwiZmFiIGZhLXR3aXR0ZXJcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gZmFjZWJvb2tcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gRmFjZWJvb2tcIiBkYXRhLXVybD1cIiR7ZW5jb2RlZFVybH1cIj48aSBjbGFzcz1cImZhYiBmYS1mYWNlYm9vay1mXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGxpbmtlZGluXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIExpbmtlZEluXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCI+PGkgY2xhc3M9XCJmYWIgZmEtbGlua2VkaW4taW5cIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB0YWcgY2xpY2tzXG4gICAgY29uc3QgdGFnQmFkZ2VzID0gYmxvZ0NhcmQucXVlcnlTZWxlY3RvckFsbCgnLnRhZy1iYWRnZScpO1xuICAgIHRhZ0JhZGdlcy5mb3JFYWNoKGJhZGdlID0+IHtcbiAgICAgICAgYmFkZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50IHRoZSBibG9nIGNhcmQgY2xpY2tcbiAgICAgICAgICAgIGNvbnN0IHRhZyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnRhZztcbiAgICAgICAgICAgIGlmICh0YWcpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2UgY2xpZW50LXNpZGUgbmF2aWdhdGlvbiBpbnN0ZWFkIG9mIGRpcmVjdCBsaW5rc1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgdXNlcyB0aGUgaW5kZXguaHRtbCBwYWdlIHdpdGggYSBxdWVyeSBwYXJhbWV0ZXIgaW5zdGVhZCBvZiBhIC90YWcvIHBhdGhcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBpbmRleC5odG1sP3RhZz0ke2VuY29kZVVSSUNvbXBvbmVudCh0YWcpfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IHNvY2lhbFNoYXJpbmdEaXYgPSBibG9nQ2FyZC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsLXNoYXJpbmcnKTtcbiAgICBpZiAoc29jaWFsU2hhcmluZ0Rpdikge1xuICAgICAgICBzb2NpYWxTaGFyaW5nRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNoYXJlLWJ1dHRvbicpO1xuICAgICAgICAgICAgaWYgKCFidXR0b24pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAvLyBGb3Igc2hhcmluZywgd2UgbWlnaHQgbmVlZCB0aGUgRlVMTCBVUkwuIExldCdzIHJlY29uc3RydWN0IGl0IGhlcmUuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGJhc2UgcGF0aCAoZS5nLiwgJy9ibG9nLycpXG4gICAgICAgICAgICBjb25zdCBiYXNlUGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zdWJzdHJpbmcoMCwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aXZlVXJsID0gYnV0dG9uLmRhdGFzZXQudXJsID8gZGVjb2RlVVJJQ29tcG9uZW50KGJ1dHRvbi5kYXRhc2V0LnVybCkgOiBgcG9zdC5odG1sP2lkPSR7cG9zdC5pZH1gOyAvLyBVc2UgcmVsYXRpdmUgcGF0aCBmcm9tIGRhdGEgYXR0cmlidXRlXG4gICAgICAgICAgICBjb25zdCBmdWxsVXJsID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0ke2Jhc2VQYXRofSR7cmVsYXRpdmVVcmx9YDsgLy8gQ29uc3RydWN0IGZ1bGwgVVJMXG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkRnVsbFVybCA9IGVuY29kZVVSSUNvbXBvbmVudChmdWxsVXJsKTsgLy8gRW5jb2RlIHRoZSBmdWxsIFVSTFxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGJ1dHRvbi5kYXRhc2V0LnRleHQgPyBkZWNvZGVVUklDb21wb25lbnQoYnV0dG9uLmRhdGFzZXQudGV4dCkgOiBkb2N1bWVudC50aXRsZTtcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpO1xuICAgICAgICAgICAgbGV0IHNoYXJlV2luZG93VXJsID0gJyc7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygndHdpdHRlcicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2VuY29kZWRUZXh0fSZ1cmw9JHtlbmNvZGVkRnVsbFVybH1gOyAvLyBVc2UgZW5jb2RlZEZ1bGxVcmxcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ3R3aXR0ZXItc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD0yMzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhY2Vib29rJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2VuY29kZWRGdWxsVXJsfWA7IC8vIFVzZSBlbmNvZGVkRnVsbFVybFxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAnZmFjZWJvb2stc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD00MzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmtlZGluJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmluZy9zaGFyZS1vZmZzaXRlLz91cmw9JHtlbmNvZGVkRnVsbFVybH1gOyAvLyBVc2UgZW5jb2RlZEZ1bGxVcmxcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2xpbmtlZGluLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYmxvZ0NhcmQ7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbW1lbnRzID0gaW5pdGlhbGl6ZUNvbW1lbnRzO1xuZXhwb3J0cy5pbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5ID0gaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eTtcbi8qKlxuICogSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciBibG9nIHBvc3RzXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDb21tZW50cygpIHtcbiAgICBzZXR1cENvbW1lbnRUb2dnbGVzKCk7XG4gICAgc2V0dXBDb21tZW50Rm9ybXMoKTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciBhIHNwZWNpZmljIGJsb2cgcG9zdCBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHkocG9zdEVsZW1lbnQpIHtcbiAgICBjb25zdCB0b2dnbGUgPSBwb3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtdG9nZ2xlJyk7XG4gICAgY29uc3QgZm9ybSA9IHBvc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50LWZvcm0nKTtcbiAgICBpZiAodG9nZ2xlKSB7XG4gICAgICAgIHNldHVwQ29tbWVudFRvZ2dsZSh0b2dnbGUpO1xuICAgIH1cbiAgICBpZiAoZm9ybSkge1xuICAgICAgICBzZXR1cENvbW1lbnRGb3JtKGZvcm0pO1xuICAgIH1cbn1cbi8qKlxuICogU2V0IHVwIGNvbW1lbnQgdG9nZ2xlIGJ1dHRvbnNcbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50VG9nZ2xlcygpIHtcbiAgICBjb25zdCBjb21tZW50VG9nZ2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50cy10b2dnbGUnKTtcbiAgICBjb21tZW50VG9nZ2xlcy5mb3JFYWNoKHRvZ2dsZSA9PiB7XG4gICAgICAgIHNldHVwQ29tbWVudFRvZ2dsZSh0b2dnbGUpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgYSBzaW5nbGUgY29tbWVudCB0b2dnbGUgYnV0dG9uXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudFRvZ2dsZSh0b2dnbGUpIHtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IHRvZ2dsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zdC1pZCcpO1xuICAgICAgICBjb25zdCBjb21tZW50c1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY29tbWVudHMtJHtwb3N0SWR9YCk7XG4gICAgICAgIGlmIChjb21tZW50c1NlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbW1lbnRzU2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIC8vIENoYW5nZSBidXR0b24gdGV4dCBiYXNlZCBvbiBzdGF0ZVxuICAgICAgICAgICAgaWYgKGNvbW1lbnRzU2VjdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT4gSGlkZSBDb21tZW50cyA8c3BhbiBjbGFzcz1cImNvbW1lbnRzLWNvdW50XCI+JHsoX2EgPSB0b2dnbGUucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvdW50JykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50ZXh0Q29udGVudH08L3NwYW4+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtY29tbWVudFwiPjwvaT4gQ29tbWVudHMgPHNwYW4gY2xhc3M9XCJjb21tZW50cy1jb3VudFwiPiR7KF9iID0gdG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb3VudCcpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudGV4dENvbnRlbnR9PC9zcGFuPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGNvbW1lbnQgZm9ybXNcbiAqL1xuZnVuY3Rpb24gc2V0dXBDb21tZW50Rm9ybXMoKSB7XG4gICAgY29uc3QgY29tbWVudEZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnQtZm9ybScpO1xuICAgIGNvbW1lbnRGb3Jtcy5mb3JFYWNoKGZvcm0gPT4ge1xuICAgICAgICBzZXR1cENvbW1lbnRGb3JtKGZvcm0pO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgYSBzaW5nbGUgY29tbWVudCBmb3JtXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudEZvcm0oZm9ybSkge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3N0LWlkJyk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbW1lbnRzLSR7cG9zdElkfSAuY29tbWVudHMtbGlzdGApO1xuICAgICAgICBpZiAoIWNvbW1lbnRzQ29udGFpbmVyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcigndGV4dGFyZWFbbmFtZT1cImNvbW1lbnRcIl0nKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgaW5wdXRzIGFyZSBub3QgZW1wdHlcbiAgICAgICAgaWYgKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgPT09ICcnIHx8IGNvbW1lbnRJbnB1dC52YWx1ZS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYWRkTmV3Q29tbWVudChwb3N0SWQsIGNvbW1lbnRzQ29udGFpbmVyLCBuYW1lSW5wdXQudmFsdWUsIGNvbW1lbnRJbnB1dC52YWx1ZSk7XG4gICAgICAgIC8vIFJlc2V0IGZvcm1cbiAgICAgICAgZm9ybS5yZXNldCgpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBBZGQgYSBuZXcgY29tbWVudCB0byB0aGUgY29tbWVudHMgbGlzdFxuICovXG5mdW5jdGlvbiBhZGROZXdDb21tZW50KHBvc3RJZCwgY29tbWVudHNDb250YWluZXIsIG5hbWUsIGNvbW1lbnRUZXh0KSB7XG4gICAgLy8gQ3JlYXRlIG5ldyBjb21tZW50XG4gICAgY29uc3QgbmV3Q29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5ld0NvbW1lbnQuY2xhc3NOYW1lID0gJ2NvbW1lbnQnO1xuICAgIC8vIEdldCBjdXJyZW50IGRhdGVcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRhdGVTdHIgPSBub3cudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICBtb250aDogJ2xvbmcnLFxuICAgICAgICBkYXk6ICdudW1lcmljJ1xuICAgIH0pO1xuICAgIC8vIENvbW1lbnQgSFRNTCBzdHJ1Y3R1cmVcbiAgICBuZXdDb21tZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtYXZhdGFyXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS11c2VyLWNpcmNsZVwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1hdXRob3JcIj4ke25hbWV9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LXRleHRcIj4ke2NvbW1lbnRUZXh0fTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1kYXRlXCI+JHtkYXRlU3RyfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICAvLyBSZW1vdmUgXCJubyBjb21tZW50cyB5ZXRcIiBtZXNzYWdlIGlmIGl0IGV4aXN0c1xuICAgIGNvbnN0IG5vQ29tbWVudHMgPSBjb21tZW50c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubm8tY29tbWVudHMnKTtcbiAgICBpZiAobm9Db21tZW50cykge1xuICAgICAgICBjb21tZW50c0NvbnRhaW5lci5yZW1vdmVDaGlsZChub0NvbW1lbnRzKTtcbiAgICB9XG4gICAgLy8gQWRkIHRoZSBuZXcgY29tbWVudCB0byB0aGUgdG9wIG9mIHRoZSBsaXN0XG4gICAgY29tbWVudHNDb250YWluZXIuaW5zZXJ0QmVmb3JlKG5ld0NvbW1lbnQsIGNvbW1lbnRzQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIC8vIFVwZGF0ZSBjb21tZW50IGNvdW50XG4gICAgdXBkYXRlQ29tbWVudENvdW50KHBvc3RJZCk7XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgY29tbWVudCBjb3VudCBmb3IgYSBwb3N0XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUNvbW1lbnRDb3VudChwb3N0SWQpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgY291bnRTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgYnV0dG9uW2RhdGEtcG9zdC1pZD1cIiR7cG9zdElkfVwiXSAuY29tbWVudHMtY291bnRgKTtcbiAgICBpZiAoY291bnRTcGFuKSB7XG4gICAgICAgIGxldCBjb3VudCA9IHBhcnNlSW50KCgoX2EgPSBjb3VudFNwYW4udGV4dENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXBsYWNlKC9bKCldL2csICcnKSkgfHwgJzAnKSArIDE7XG4gICAgICAgIGNvdW50U3Bhbi50ZXh0Q29udGVudCA9IGAoJHtjb3VudH0pYDtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvbnRhY3QgcG9wdXAgZnVuY3Rpb25hbGl0eVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQ29udGFjdEZvcm0gPSBpbml0aWFsaXplQ29udGFjdEZvcm07XG4vKipcbiAqIEluaXRpYWxpemUgdGhlIGNvbnRhY3QgZm9ybSBwb3B1cFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29udGFjdEZvcm0oKSB7XG4gICAgY29uc3QgY29udGFjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWJ0bicpO1xuICAgIGNvbnN0IGNvbnRhY3RQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LXBvcHVwJyk7XG4gICAgY29uc3QgY2xvc2VQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWN0LXBvcHVwIC5jbG9zZS1wb3B1cCcpO1xuICAgIGlmICghY29udGFjdEJ1dHRvbiB8fCAhY29udGFjdFBvcHVwIHx8ICFjbG9zZVBvcHVwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ29udGFjdCBmb3JtIGVsZW1lbnRzIG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gT3BlbiBwb3B1cCB3aGVuIGNvbnRhY3QgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBjb250YWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgYW5jaG9yIGJlaGF2aW9yXG4gICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJzsgLy8gUHJldmVudCBzY3JvbGxpbmcgd2hpbGUgcG9wdXAgaXMgb3BlblxuICAgICAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGNvbnRhY3QgbGlua1xuICAgICAgICBjb250YWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICAgIC8vIENsb3NlIHBvcHVwIHdoZW4gY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBjbG9zZVBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSB3aGVuIGNsaWNraW5nIG91dHNpZGUgdGhlIHBvcHVwIGNvbnRlbnRcbiAgICBjb250YWN0UG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IGNvbnRhY3RQb3B1cCkge1xuICAgICAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBDbG9zZSBvbiBlc2NhcGUga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XG4gICAgICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIFNldCB1cCBjb250YWN0IGZvcm0gc3VibWlzc2lvblxuICAgIHNldHVwQ29udGFjdEZvcm1TdWJtaXNzaW9uKCk7XG59XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgdGhlIGRlZmF1bHQgYWN0aXZlIGxpbmsgc3RhdGVcbiAqL1xuZnVuY3Rpb24gc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKSB7XG4gICAgLy8gR2V0IGN1cnJlbnQgaGFzaCBvciBkZWZhdWx0IHRvIGhvbWVcbiAgICBjb25zdCBjdXJyZW50SGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8ICcjaG9tZSc7XG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBuYXYgbGlua3NcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgaGFzaCBsaW5rXG4gICAgY29uc3QgY3VycmVudExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXIgbmF2IHVsIGxpIGFbaHJlZj1cIiR7Y3VycmVudEhhc2h9XCJdYCk7XG4gICAgaWYgKGN1cnJlbnRMaW5rKSB7XG4gICAgICAgIGN1cnJlbnRMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn1cbi8qKlxuICogSGFuZGxlIGNvbnRhY3QgZm9ybSBzdWJtaXNzaW9uXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29udGFjdEZvcm1TdWJtaXNzaW9uKCkge1xuICAgIGNvbnN0IGNvbnRhY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtZm9ybScpO1xuICAgIGlmICghY29udGFjdEZvcm0pXG4gICAgICAgIHJldHVybjtcbiAgICBjb250YWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGNvbnRhY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gICAgICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBjb250YWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiZW1haWxcIl0nKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZUlucHV0ID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcigndGV4dGFyZWFbbmFtZT1cIm1lc3NhZ2VcIl0nKTtcbiAgICAgICAgLy8gU2ltcGxlIHZhbGlkYXRpb25cbiAgICAgICAgaWYgKCFuYW1lSW5wdXQudmFsdWUudHJpbSgpIHx8ICFlbWFpbElucHV0LnZhbHVlLnRyaW0oKSB8fCAhbWVzc2FnZUlucHV0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgc2hvd0NvbnRhY3RGb3JtTWVzc2FnZSgnUGxlYXNlIGZpbGwgb3V0IGFsbCBmaWVsZHMnLCAnZXJyb3InKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBIZXJlIHlvdSB3b3VsZCB0eXBpY2FsbHkgc2VuZCB0aGUgZm9ybSBkYXRhIHRvIGEgc2VydmVyXG4gICAgICAgIC8vIEZvciBub3csIHdlJ2xsIGp1c3Qgc2ltdWxhdGUgYSBzdWNjZXNzZnVsIHN1Ym1pc3Npb25cbiAgICAgICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGNvbnRhY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJyk7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsQnRuVGV4dCA9IHN1Ym1pdEJ0bi5pbm5lckhUTUw7XG4gICAgICAgIHN1Ym1pdEJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHN1Ym1pdEJ0bi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzcGlubmVyXCI+PC9zcGFuPiBTZW5kaW5nLi4uJztcbiAgICAgICAgLy8gU2ltdWxhdGUgc2VydmVyIHJlcXVlc3RcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBSZXNldCBmb3JtIGFuZCBzaG93IHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgY29udGFjdEZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgc3VibWl0QnRuLmlubmVySFRNTCA9IG9yaWdpbmFsQnRuVGV4dDtcbiAgICAgICAgICAgIHNob3dDb250YWN0Rm9ybU1lc3NhZ2UoJ01lc3NhZ2Ugc2VudCBzdWNjZXNzZnVsbHkhIFdlXFwnbGwgZ2V0IGJhY2sgdG8geW91IHNvb24uJywgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgIC8vIENsb3NlIHRoZSBwb3B1cCBhZnRlciBhIGRlbGF5XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWN0UG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1wb3B1cCcpO1xuICAgICAgICAgICAgICAgIGlmIChjb250YWN0UG9wdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICB9KTtcbn1cbi8qKlxuICogRGlzcGxheSBhIG1lc3NhZ2UgaW4gdGhlIGNvbnRhY3QgZm9ybVxuICovXG5mdW5jdGlvbiBzaG93Q29udGFjdEZvcm1NZXNzYWdlKG1lc3NhZ2UsIHR5cGUpIHtcbiAgICBjb25zdCBjb250YWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWZvcm0nKTtcbiAgICBpZiAoIWNvbnRhY3RGb3JtKVxuICAgICAgICByZXR1cm47XG4gICAgLy8gUmVtb3ZlIGFueSBleGlzdGluZyBtZXNzYWdlXG4gICAgY29uc3QgZXhpc3RpbmdNZXNzYWdlID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcignLmZvcm0tbWVzc2FnZScpO1xuICAgIGlmIChleGlzdGluZ01lc3NhZ2UpIHtcbiAgICAgICAgZXhpc3RpbmdNZXNzYWdlLnJlbW92ZSgpO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgYW5kIGFkZCBuZXcgbWVzc2FnZVxuICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVzc2FnZUVsZW1lbnQuY2xhc3NOYW1lID0gYGZvcm0tbWVzc2FnZSAke3R5cGV9YDtcbiAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgY29udGFjdEZvcm0uYXBwZW5kQ2hpbGQobWVzc2FnZUVsZW1lbnQpO1xuICAgIC8vIFJlbW92ZSBtZXNzYWdlIGFmdGVyIGEgZmV3IHNlY29uZHNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbWVzc2FnZUVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSwgNTAwMCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIERhcmsgbW9kZSBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVEYXJrTW9kZSA9IGluaXRpYWxpemVEYXJrTW9kZTtcbmV4cG9ydHMuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UgPSBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZTtcbi8qKlxuICogSW5pdGlhbGl6ZSBkYXJrIG1vZGUgdG9nZ2xlXG4gKiBUaGlzIGNyZWF0ZXMgYSBmbG9hdGluZyBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvbiBhbmQgYWRkcyBpdCB0byB0aGUgRE9NXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVEYXJrTW9kZSgpIHtcbiAgICAvLyBDcmVhdGUgZGFyayBtb2RlIHRvZ2dsZSBidXR0b25cbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmNsYXNzTmFtZSA9ICdkYXJrLW1vZGUtdG9nZ2xlJztcbiAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nOyAvLyBNb29uIGljb25cbiAgICBkYXJrTW9kZVRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVG9nZ2xlIERhcmsgTW9kZScpO1xuICAgIC8vIENoZWNrIGlmIGRhcmsgbW9kZSBwcmVmZXJlbmNlIGlzIGFscmVhZHkgc2V0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09ICd0cnVlJztcbiAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uIGZvciBsaWdodCBtb2RlXG4gICAgfVxuICAgIC8vIEFkZCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgIGRhcmtNb2RlVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRGFya01vZGUpO1xuICAgIC8vIEFkZCBidXR0b24gdG8gdGhlIERPTVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGFya01vZGVUb2dnbGUpO1xufVxuLyoqXG4gKiBUb2dnbGUgZGFyayBtb2RlIG9uIGFuZCBvZmZcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlRGFya01vZGUoKSB7XG4gICAgY29uc3QgaXNEYXJrTW9kZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyay1tb2RlJyk7XG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1tb2RlLXRvZ2dsZScpO1xuICAgIC8vIFVwZGF0ZSBpY29uIGJhc2VkIG9uIG1vZGVcbiAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgaWYgKGlzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvbiBmb3IgZGFyayBtb2RlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU2F2ZSBwcmVmZXJlbmNlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCBpc0RhcmtNb2RlLnRvU3RyaW5nKCkpO1xufVxuLyoqXG4gKiBDaGVjayBpZiB1c2VyIGhhcyBzeXN0ZW0gZGFyayBtb2RlIHByZWZlcmVuY2VcbiAqIElmIHRoZXkgZG8gYW5kIHdlIGhhdmVuJ3Qgc2V0IGEgcHJlZmVyZW5jZSB5ZXQsIGFwcGx5IGRhcmsgbW9kZVxuICovXG5mdW5jdGlvbiBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSgpIHtcbiAgICAvLyBPbmx5IGNoZWNrIGlmIHVzZXIgaGFzbid0IGV4cGxpY2l0bHkgc2V0IGEgcHJlZmVyZW5jZVxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwcmVmZXJzRGFya01vZGUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgICAgIGlmIChwcmVmZXJzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgICAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgICAgICAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvY29tcG9uZW50cy9oZWFkZXIudHNcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVuZGVySGVhZGVyID0gcmVuZGVySGVhZGVyO1xuLyoqXG4gKiBIZWFkZXIgQ29tcG9uZW50XG4gKiBSZW5kZXJzIHRoZSBoZWFkZXIgc2VjdGlvbiBpbnRvIGEgdGFyZ2V0IGNvbnRhaW5lci5cbiAqIEBwYXJhbSBjb250YWluZXJJZCAtIFRoZSBJRCBvZiB0aGUgZWxlbWVudCB0byByZW5kZXIgdGhlIGhlYWRlciBpbnRvLiBEZWZhdWx0cyB0byAnaGVhZGVyLXBsYWNlaG9sZGVyJy5cbiAqL1xuZnVuY3Rpb24gcmVuZGVySGVhZGVyKGNvbnRhaW5lcklkID0gJ2hlYWRlci1wbGFjZWhvbGRlcicpIHtcbiAgICAvLyBFbnN1cmUgcnVubmluZyBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEZpbmQgdGhlIGNvbnRhaW5lciBlbGVtZW50IHdoZXJlIHRoZSBoZWFkZXIgc2hvdWxkIGJlIHBsYWNlZFxuICAgIGNvbnN0IGhlYWRlckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcklkKTtcbiAgICBpZiAoIWhlYWRlckNvbnRhaW5lcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBIZWFkZXIgY29udGFpbmVyIHdpdGggSUQgJyR7Y29udGFpbmVySWR9JyBub3QgZm91bmQgaW4gdGhlIERPTS5gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBEZWZpbmUgdGhlIGhlYWRlciBIVE1MIHN0cnVjdHVyZSAtIG1hdGNoaW5nIGluZGV4Lmh0bWxcbiAgICBoZWFkZXJDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwic2l0ZS1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxoMT48YSBocmVmPVwiL1wiPkJsb2c8L2E+PC9oMT5cbiAgICAgICAgICAgIDxuYXY+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi9cIj5Ib21lPC9hPjwvbGk+IFxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi8jYWJvdXRcIiBpZD1cImFib3V0LWJ0blwiPkFib3V0PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiLyNwb3J0Zm9saW9cIj5Qb3J0Zm9saW88L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvI2NvbnRhY3RcIiBpZD1cImNvbnRhY3QtYnRuXCI+Q29udGFjdDwvYT48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIGFydGljbGVzLi4uXCIgY2xhc3M9XCJzZWFyY2gtYmFyXCI+IFxuICAgICAgICA8L2hlYWRlcj5cbiAgICBgO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIE5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVOYXZpZ2F0aW9uID0gaW5pdGlhbGl6ZU5hdmlnYXRpb247XG4vKipcbiAqIEluaXRpYWxpemUgbmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVOYXZpZ2F0aW9uKCkge1xuICAgIHNldEFjdGl2ZU5hdkxpbmsoKTtcbiAgICBzZXR1cE5hdkxpbmtzKCk7XG59XG4vKipcbiAqIFNldCBhY3RpdmUgbmF2aWdhdGlvbiBsaW5rIGJhc2VkIG9uIGN1cnJlbnQgVVJMIG9yIHBhZ2Ugc2VjdGlvblxuICovXG5mdW5jdGlvbiBzZXRBY3RpdmVOYXZMaW5rKCkge1xuICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgJyNob21lJztcbiAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKGN1cnJlbnRQYXRoKTtcbn1cbi8qKlxuICogU2V0dXAgY2xpY2sgaGFuZGxlcnMgZm9yIG5hdmlnYXRpb24gbGlua3NcbiAqL1xuZnVuY3Rpb24gc2V0dXBOYXZMaW5rcygpIHtcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgIGlmIChocmVmKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlQWN0aXZlTmF2TGluayhocmVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZXMgZm9yIHBvcHVwIGxpbmtzXG4gICAgY29uc3QgYWJvdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtYnRuJyk7XG4gICAgY29uc3QgY29udGFjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWJ0bicpO1xuICAgIGlmIChhYm91dEJ0bikge1xuICAgICAgICBhYm91dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoJyNhYm91dCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGNvbnRhY3RCdG4pIHtcbiAgICAgICAgY29udGFjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoJyNjb250YWN0Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogVXBkYXRlIHRoZSBhY3RpdmUgbmF2aWdhdGlvbiBsaW5rXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCBvciBzZWN0aW9uIElEIHRvIGFjdGl2YXRlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZU5hdkxpbmsocGF0aCkge1xuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgbGlua3NcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2hlYWRlciBuYXYgdWwgbGkgYScpO1xuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIG1hdGNoaW5nIGxpbmtcbiAgICBjb25zdCBhY3RpdmVMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaGVhZGVyIG5hdiB1bCBsaSBhW2hyZWY9XCIke3BhdGh9XCJdYCk7XG4gICAgaWYgKGFjdGl2ZUxpbmspIHtcbiAgICAgICAgYWN0aXZlTGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVBhZ2luYXRpb24gPSBpbml0aWFsaXplUGFnaW5hdGlvbjtcbi8vIFBhZ2luYXRpb24gZnVuY3Rpb25hbGl0eVxuY29uc3QgY29tbWVudHNfMSA9IHJlcXVpcmUoXCIuL2NvbW1lbnRzXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplIHBhZ2luYXRpb24gZnVuY3Rpb25hbGl0eSB3aXRoIExvYWQgTW9yZSBidXR0b25cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVBhZ2luYXRpb24oKSB7XG4gICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgIGNvbnN0IGhpZGRlblBvc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbi1wb3N0cycpO1xuICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNhcmRzJyk7XG4gICAgaWYgKCFsb2FkTW9yZUJ0biB8fCAhaGlkZGVuUG9zdHMgfHwgIWJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1BhZ2luYXRpb24gZWxlbWVudHMgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgY3VycmVudFBhZ2UgPSAxO1xuICAgIGNvbnN0IHBvc3RzUGVyUGFnZSA9IDM7XG4gICAgY29uc3QgdG90YWxIaWRkZW5Qb3N0cyA9IGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAvLyBIaWRlIGxvYWQgbW9yZSBidXR0b24gaWYgbm8gaGlkZGVuIHBvc3RzXG4gICAgaWYgKHRvdGFsSGlkZGVuUG9zdHMgPT09IDApIHtcbiAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gICAgLy8gU2V0IHVwIGxvYWQgbW9yZSBidXR0b24gY2xpY2sgaGFuZGxlclxuICAgIGxvYWRNb3JlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsb2FkTW9yZVBvc3RzKGxvYWRNb3JlQnRuLCBoaWRkZW5Qb3N0cywgYmxvZ0NhcmRzQ29udGFpbmVyLCBjdXJyZW50UGFnZSwgcG9zdHNQZXJQYWdlKTtcbiAgICAgICAgY3VycmVudFBhZ2UrKztcbiAgICB9KTtcbiAgICAvLyBJbml0aWFsaXplIHNjcm9sbC1iYXNlZCBsb2FkaW5nIChpbmZpbml0ZSBzY3JvbGwpXG4gICAgaW5pdGlhbGl6ZUluZmluaXRlU2Nyb2xsKGxvYWRNb3JlQnRuKTtcbn1cbi8qKlxuICogTG9hZCBtb3JlIHBvc3RzIHdoZW4gdGhlIGxvYWQgbW9yZSBidXR0b24gaXMgY2xpY2tlZFxuICovXG5mdW5jdGlvbiBsb2FkTW9yZVBvc3RzKGxvYWRNb3JlQnRuLCBoaWRkZW5Qb3N0cywgYmxvZ0NhcmRzQ29udGFpbmVyLCBjdXJyZW50UGFnZSwgcG9zdHNQZXJQYWdlKSB7XG4gICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xuICAgIGxvYWRNb3JlQnRuLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNwaW5uZXJcIj48L3NwYW4+IExvYWRpbmcuLi4nO1xuICAgIC8vIFNpbXVsYXRlIGxvYWRpbmcgZGVsYXkgZm9yIGJldHRlciBVWFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggcG9zdHMgdG8gbG9hZFxuICAgICAgICBjb25zdCBzdGFydElkeCA9IChjdXJyZW50UGFnZSAtIDEpICogcG9zdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCBlbmRJZHggPSBNYXRoLm1pbihzdGFydElkeCArIHBvc3RzUGVyUGFnZSwgaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICAgICAgbGV0IHBvc3RzTG9hZGVkID0gMDtcbiAgICAgICAgLy8gQ2xvbmUgYW5kIG1vdmUgcG9zdHMgZnJvbSBoaWRkZW4gY29udGFpbmVyIHRvIHZpc2libGUgYmxvZyBjYXJkc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc3RzUGVyUGFnZSAmJiBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGggPiAwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RUb0FkZCA9IGhpZGRlblBvc3RzLmNoaWxkcmVuWzBdOyAvLyBBbHdheXMgdGFrZSB0aGUgZmlyc3QgZWxlbWVudFxuICAgICAgICAgICAgaWYgKHBvc3RUb0FkZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lZFBvc3QgPSBwb3N0VG9BZGQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgICAgIGNsb25lZFBvc3QuY2xhc3NMaXN0LmFkZCgnbmV3Jyk7IC8vIEFkZCBjbGFzcyBmb3IgYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZFBvc3QpO1xuICAgICAgICAgICAgICAgIGhpZGRlblBvc3RzLnJlbW92ZUNoaWxkKHBvc3RUb0FkZCk7XG4gICAgICAgICAgICAgICAgcG9zdHNMb2FkZWQrKztcbiAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBuZXcgcG9zdHNcbiAgICAgICAgICAgICAgICAoMCwgY29tbWVudHNfMS5pbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5KShjbG9uZWRQb3N0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayBpZiB3ZSd2ZSBsb2FkZWQgYWxsIHBvc3RzXG4gICAgICAgIGlmIChoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVzZXQgYnV0dG9uIHN0YXRlXG4gICAgICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgICAgICAgbG9hZE1vcmVCdG4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+IExvYWQgTW9yZSBQb3N0cyc7XG4gICAgICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudCB3aGVuIHBvc3RzIGFyZSBsb2FkZWRcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3Bvc3RzTG9hZGVkJywgeyBkZXRhaWw6IHsgY291bnQ6IHBvc3RzTG9hZGVkIH0gfSk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0sIDgwMCk7IC8vIFNpbXVsYXRlIG5ldHdvcmsgZGVsYXlcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBpbmZpbml0ZSBzY3JvbGwgZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplSW5maW5pdGVTY3JvbGwobG9hZE1vcmVCdG4pIHtcbiAgICBsZXQgc2Nyb2xsVGltZW91dDtcbiAgICBsZXQgaXNMb2FkaW5nTW9yZVBvc3RzID0gZmFsc2U7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBoaWRkZW4gKGFsbCBwb3N0cyBsb2FkZWQpIG9yIGFscmVhZHkgaW4gbG9hZGluZyBzdGF0ZSwgZG8gbm90aGluZ1xuICAgICAgICBpZiAobG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnIHx8XG4gICAgICAgICAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ2xvYWRpbmcnKSB8fFxuICAgICAgICAgICAgaXNMb2FkaW5nTW9yZVBvc3RzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVvdXQpO1xuICAgICAgICBzY3JvbGxUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzY3JvbGxUb3AsIHNjcm9sbEhlaWdodCwgY2xpZW50SGVpZ2h0IH0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICAvLyBXaGVuIHVzZXIgc2Nyb2xscyB0byBib3R0b20gKHdpdGggc29tZSBidWZmZXIpXG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0ID49IHNjcm9sbEhlaWdodCAtIDIwMCkge1xuICAgICAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBmbGFnIGFmdGVyIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nTW9yZVBvc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplU2VhcmNoID0gaW5pdGlhbGl6ZVNlYXJjaDtcbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTtcbmNvbnN0IGJsb2dDYXJkc18xID0gcmVxdWlyZShcIi4vYmxvZ0NhcmRzXCIpO1xuY29uc3QgY29tbWVudHNfMSA9IHJlcXVpcmUoXCIuL2NvbW1lbnRzXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplIHNlYXJjaCBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVTZWFyY2goKSB7XG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwic2VhcmNoXCJdJyk7XG4gICAgaWYgKCFzZWFyY2hJbnB1dCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1NlYXJjaCBpbnB1dCBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEN5Y2xlIHRocm91Z2ggZGlmZmVyZW50IHBsYWNlaG9sZGVyIHRleHRzXG4gICAgc2V0dXBQbGFjZWhvbGRlckN5Y2xpbmcoc2VhcmNoSW5wdXQpO1xuICAgIC8vIFNldCB1cCBzZWFyY2ggaW5wdXQgZXZlbnQgaGFuZGxlclxuICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICAgICAgaGFuZGxlU2VhcmNoKGUudGFyZ2V0KTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ3ljbGUgdGhyb3VnaCBkaWZmZXJlbnQgcGxhY2Vob2xkZXIgdGV4dHMgZm9yIHRoZSBzZWFyY2ggaW5wdXRcbiAqL1xuZnVuY3Rpb24gc2V0dXBQbGFjZWhvbGRlckN5Y2xpbmcoc2VhcmNoSW5wdXQpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBbXG4gICAgICAgIFwiU2VhcmNoIGZvciBhcnRpY2xlcy4uLlwiLFxuICAgICAgICBcIlNlYXJjaCBmb3IgdG9waWNzLi4uXCIsXG4gICAgICAgIFwiU2VhcmNoIGZvciBhdXRob3JzLi4uXCJcbiAgICBdO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBzZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyc1tpbmRleF07XG4gICAgICAgIGluZGV4ID0gKGluZGV4ICsgMSkgJSBwbGFjZWhvbGRlcnMubGVuZ3RoO1xuICAgIH0sIDMwMDApO1xufVxuLyoqXG4gKiBIYW5kbGUgc2VhcmNoIGlucHV0IGFuZCBmaWx0ZXIgYmxvZyBwb3N0c1xuICovXG5mdW5jdGlvbiBoYW5kbGVTZWFyY2goc2VhcmNoSW5wdXQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChzZWFyY2hUZXJtLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIC8vIElmIHNlYXJjaCBpcyBjbGVhcmVkLCByZWxvYWQgYWxsIHBvc3RzXG4gICAgICAgICAgICBpZiAoc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBEaXNwYXRjaCBldmVudCB0byByZWxvYWQgcG9zdHNcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgncmVsb2FkUG9zdHMnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNhcmRzJyk7XG4gICAgICAgIGlmICghYmxvZ0NhcmRzQ29udGFpbmVyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj48L2Rpdj4nO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRmV0Y2ggYWxsIHBvc3RzIGFuZCBmaWx0ZXIgY2xpZW50LXNpZGVcbiAgICAgICAgICAgIC8vIEluIGEgcmVhbCBhcHAsIHlvdSdkIGltcGxlbWVudCBzZXJ2ZXItc2lkZSBzZWFyY2hcbiAgICAgICAgICAgIGNvbnN0IHBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRQb3N0cyA9IGZpbHRlclBvc3RzKHBvc3RzLCBzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgIC8vIENsZWFyIGNvbnRhaW5lclxuICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgaWYgKGZpbHRlcmVkUG9zdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU2hvdyBlbXB0eSBzZWFyY2ggcmVzdWx0c1xuICAgICAgICAgICAgICAgIHNob3dFbXB0eVNlYXJjaFJlc3VsdHMoYmxvZ0NhcmRzQ29udGFpbmVyLCBzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEaXNwbGF5IGZpbHRlcmVkIHBvc3RzXG4gICAgICAgICAgICBkaXNwbGF5RmlsdGVyZWRQb3N0cyhmaWx0ZXJlZFBvc3RzLCBibG9nQ2FyZHNDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2VhcmNoaW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dTZWFyY2hFcnJvcihibG9nQ2FyZHNDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEZpbHRlciBwb3N0cyBiYXNlZCBvbiBzZWFyY2ggdGVybVxuICovXG5mdW5jdGlvbiBmaWx0ZXJQb3N0cyhwb3N0cywgc2VhcmNoVGVybSkge1xuICAgIHJldHVybiBwb3N0cy5maWx0ZXIocG9zdCA9PiBwb3N0LnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkgfHxcbiAgICAgICAgcG9zdC5jb250ZW50LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkgfHxcbiAgICAgICAgcG9zdC5hdXRob3IudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtKSB8fFxuICAgICAgICAocG9zdC50YWdzICYmIHBvc3QudGFncy5zb21lKHRhZyA9PiB0YWcudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtKSkpKTtcbn1cbi8qKlxuICogRGlzcGxheSBmaWx0ZXJlZCBwb3N0cyBpbiB0aGUgYmxvZyBjb250YWluZXJcbiAqL1xuZnVuY3Rpb24gZGlzcGxheUZpbHRlcmVkUG9zdHMoZmlsdGVyZWRQb3N0cywgY29udGFpbmVyKSB7XG4gICAgZmlsdGVyZWRQb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICBjb25zdCBibG9nQ2FyZCA9ICgwLCBibG9nQ2FyZHNfMS5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQpKHBvc3QpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvZ0NhcmQpO1xuICAgICAgICAvLyBJbml0aWFsaXplIGNvbW1lbnRzIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBmaWx0ZXJlZCBwb3N0c1xuICAgICAgICAoMCwgY29tbWVudHNfMS5pbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5KShibG9nQ2FyZCk7XG4gICAgfSk7XG4gICAgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50IHdoZW4gc2VhcmNoIHJlc3VsdHMgYXJlIGRpc3BsYXllZFxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZWFyY2hSZXN1bHRzRGlzcGxheWVkJywge1xuICAgICAgICBkZXRhaWw6IHsgY291bnQ6IGZpbHRlcmVkUG9zdHMubGVuZ3RoIH1cbiAgICB9KSk7XG59XG4vKipcbiAqIERpc3BsYXkgZW1wdHkgc2VhcmNoIHJlc3VsdHMgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBzaG93RW1wdHlTZWFyY2hSZXN1bHRzKGNvbnRhaW5lciwgc2VhcmNoVGVybSkge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1zZWFyY2hcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXNlYXJjaCBmYS0zeFwiPjwvaT5cbiAgICAgICAgICAgIDxoMz5ObyByZXN1bHRzIGZvdW5kPC9oMz5cbiAgICAgICAgICAgIDxwPk5vIHBvc3RzIG1hdGNoIHlvdXIgc2VhcmNoIGZvciBcIiR7c2VhcmNoVGVybX1cIjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbn1cbi8qKlxuICogRGlzcGxheSBzZWFyY2ggZXJyb3IgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBzaG93U2VhcmNoRXJyb3IoY29udGFpbmVyKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXN0YXRlXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBmYS0zeFwiPjwvaT5cbiAgICAgICAgICAgIDxoMz5TZWFyY2ggZmFpbGVkPC9oMz5cbiAgICAgICAgICAgIDxwPkZhaWxlZCB0byBzZWFyY2ggYmxvZyBwb3N0cy4gUGxlYXNlIHRyeSBhZ2Fpbi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQmxvZ0Zyb250ZW5kID0gaW5pdGlhbGl6ZUJsb2dGcm9udGVuZDtcbi8qKlxuICogQmxvZyBGcm9udGVuZCBDb250cm9sbGVyXG4gKiBDbGllbnQtc2lkZSBjb250cm9sbGVyIHRoYXQgaGFuZGxlcyBhbGwgZnJvbnRlbmQgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGJsb2cgaG9tZXBhZ2UuXG4gKiBNYW5hZ2VzIFVJIGluaXRpYWxpemF0aW9uLCBwb3N0IHJlbmRlcmluZywgYW5kIHVzZXIgaW50ZXJhY3Rpb25zLlxuICovXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCBibG9nQ2FyZHNfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Jsb2dDYXJkc1wiKTtcbi8vIEFzc3VtaW5nIGluaXRpYWxpemVDb21tZW50cyBpcyBtZWFudCBmb3IgdGhlIHBvc3QgZGV0YWlsIHBhZ2UsIFxuLy8gaXQgbWlnaHQgbm90IGJlIG5lZWRlZCBoZXJlIHVubGVzcyBjYXJkcyBoYXZlIGNvbW1lbnQgcHJldmlld3MvaW50ZXJhY3Rpb25zLlxuLy8gaW1wb3J0IHsgaW5pdGlhbGl6ZUNvbW1lbnRzIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50cyc7IFxuY29uc3QgY29udGFjdF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvY29udGFjdFwiKTsgLy8gSGFuZGxlcyBjb250YWN0IHBvcHVwIGxvZ2ljXG5jb25zdCBwYWdpbmF0aW9uXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9wYWdpbmF0aW9uXCIpOyAvLyBIYW5kbGVzIGxvYWQgbW9yZSBsb2dpY1xuY29uc3Qgc2VhcmNoXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9zZWFyY2hcIik7IC8vIEhhbmRsZXMgc2VhcmNoIGJhciBsb2dpY1xuY29uc3QgYWJvdXRfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Fib3V0XCIpOyAvLyBIYW5kbGVzIGFib3V0IHBvcHVwIGxvZ2ljXG5jb25zdCBuYXZpZ2F0aW9uXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9uYXZpZ2F0aW9uXCIpOyAvLyBIYW5kbGVzIG5hdiBsaW5rIGFjdGl2ZSBzdGF0ZXNcbi8vIE5vdGU6IERhcmsgbW9kZSBpcyBpbml0aWFsaXplZCBnbG9iYWxseSBpbiBjbGllbnQudHMsIG5vIG5lZWQgdG8gaW1wb3J0L2NhbGwgaGVyZSB0eXBpY2FsbHlcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgYmxvZyBmcm9udGVuZCBmdW5jdGlvbmFsaXR5IChob21lcGFnZSlcbiAqIFNldHMgdXAgYWxsIFVJIGNvbXBvbmVudHMgYW5kIGluaXRpYWxpemVzIHRoZSBibG9nIHBvc3RzIGRpc3BsYXkuXG4gKiBBc3N1bWVzIGhlYWRlciBhbmQgZGFyayBtb2RlIGFyZSBpbml0aWFsaXplZCBnbG9iYWxseSBiZWZvcmUgdGhpcyBydW5zLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQmxvZ0Zyb250ZW5kKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgQmxvZyBGcm9udGVuZCBDb250cm9sbGVyLi4uJyk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgbmF2aWdhdGlvbiBhY3RpdmUgc3RhdGVzXG4gICAgICAgICgwLCBuYXZpZ2F0aW9uXzEuaW5pdGlhbGl6ZU5hdmlnYXRpb24pKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgaW50ZXJhY3RpdmUgY29tcG9uZW50cyBzcGVjaWZpYyB0byB0aGUgbWFpbiBwYWdlXG4gICAgICAgICgwLCBjb250YWN0XzEuaW5pdGlhbGl6ZUNvbnRhY3RGb3JtKSgpOyAvLyBBc3N1bWVzICNjb250YWN0LWJ0biBhbmQgI2NvbnRhY3QtcG9wdXAgZXhpc3RcbiAgICAgICAgKDAsIGFib3V0XzEuaW5pdGlhbGl6ZUFib3V0KSgpOyAvLyBBc3N1bWVzICNhYm91dC1idG4gYW5kICNhYm91dC1wb3B1cCBleGlzdFxuICAgICAgICAoMCwgc2VhcmNoXzEuaW5pdGlhbGl6ZVNlYXJjaCkoKTsgLy8gQXNzdW1lcyAuc2VhcmNoLWJhciBleGlzdHNcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgYmxvZyBwb3N0cyBkaXNwbGF5XG4gICAgICAgIHlpZWxkIGluaXRpYWxpemVQb3N0cygpO1xuICAgICAgICAvLyBJbml0aWFsaXplIHBhZ2luYXRpb24gYWZ0ZXIgcG9zdHMgYXJlIGxvYWRlZCBhbmQgY29udGFpbmVycyBleGlzdFxuICAgICAgICAoMCwgcGFnaW5hdGlvbl8xLmluaXRpYWxpemVQYWdpbmF0aW9uKSgpO1xuICAgICAgICAvLyBJZiBjb21tZW50cyBwcmV2aWV3L2ludGVyYWN0aW9uIG5lZWRlZCBvbiBjYXJkcywgaW5pdGlhbGl6ZSBoZXJlXG4gICAgICAgIC8vIGluaXRpYWxpemVDb21tZW50cygpOyBcbiAgICAgICAgLy8gU2V0IHVwIGV2ZW50IGRlbGVnYXRpb24gZm9yIG5hdmlnYXRpbmcgd2hlbiBjbGlja2luZyBibG9nIGNhcmRzXG4gICAgICAgIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpO1xuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHJlbG9hZGluZyBwb3N0cyAodXNlZCBieSBzZWFyY2gpXG4gICAgICAgIC8vIENvbnNpZGVyIGFkZGluZyBhbiBvcHRpb24gdG8gcmVtb3ZlIGxpc3RlbmVyIGlmIGNvbnRyb2xsZXIgaXMgZXZlciBcImRlc3Ryb3llZFwiXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlbG9hZFBvc3RzJywgaGFuZGxlUmVsb2FkUG9zdHMpO1xuICAgICAgICBjb25zb2xlLmxvZygnQmxvZyBGcm9udGVuZCBDb250cm9sbGVyIEluaXRpYWxpemVkLicpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBIYW5kbGVzIHRoZSBjdXN0b20gJ3JlbG9hZFBvc3RzJyBldmVudCwgdHlwaWNhbGx5IHRyaWdnZXJlZCBieSBzZWFyY2guXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZVJlbG9hZFBvc3RzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWxvYWRpbmcgcG9zdHMgZHVlIHRvIHJlbG9hZFBvc3RzIGV2ZW50Li4uJyk7XG4gICAgICAgIHlpZWxkIGluaXRpYWxpemVQb3N0cygpO1xuICAgICAgICAoMCwgcGFnaW5hdGlvbl8xLmluaXRpYWxpemVQYWdpbmF0aW9uKSgpO1xuICAgICAgICAvLyBSZS1zZXR1cCBkZWxlZ2F0aW9uIGluIGNhc2UgRE9NIGVsZW1lbnRzIHdlcmUgcmVwbGFjZWRcbiAgICAgICAgc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCk7XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBldmVudCBkZWxlZ2F0aW9uIGZvciBibG9nIGNhcmRzIGNvbnRhaW5lclxuICogSGFuZGxlcyBjbGlja3MgZm9yIG5hdmlnYXRpb24sIHByZXZlbnRpbmcgY2xpY2tzIG9uIGludGVyYWN0aXZlIGVsZW1lbnRzLlxuICovXG5mdW5jdGlvbiBzZXR1cEJsb2dDYXJkc0RlbGVnYXRpb24oKSB7XG4gICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZHMnKTtcbiAgICAvLyBOb3RlOiBEZWxlZ2F0aW9uIG9uIGhpZGRlbi1wb3N0cyBtaWdodCBiZSB1bm5lY2Vzc2FyeSBpZiBjYXJkcyBhcmUgbW92ZWQgb24gbG9hZCBtb3JlXG4gICAgLy8gY29uc3QgaGlkZGVuUG9zdHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLXBvc3RzJyk7XG4gICAgaWYgKGJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXIgZmlyc3QgdG8gcHJldmVudCBkdXBsaWNhdGVzIGlmIGNhbGxlZCBtdWx0aXBsZSB0aW1lc1xuICAgICAgICBibG9nQ2FyZHNDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVCbG9nQ2FyZENsaWNrKTtcbiAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQmxvZ0NhcmRDbGljayk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBkZWxlZ2F0aW9uIHNldCB1cCBmb3IgLmJsb2ctY2FyZHMnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IGZpbmQgLmJsb2ctY2FyZHMgY29udGFpbmVyIGZvciBkZWxlZ2F0aW9uLicpO1xuICAgIH1cbiAgICAvLyBpZiAoaGlkZGVuUG9zdHNDb250YWluZXIpIHtcbiAgICAvLyAgICAgaGlkZGVuUG9zdHNDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVCbG9nQ2FyZENsaWNrKTtcbiAgICAvLyAgICAgaGlkZGVuUG9zdHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVCbG9nQ2FyZENsaWNrKTtcbiAgICAvLyB9XG59XG4vKipcbiAqIEhhbmRsZSBjbGljayBldmVudHMgb24gYmxvZyBjYXJkcyB1c2luZyBldmVudCBkZWxlZ2F0aW9uXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUJsb2dDYXJkQ2xpY2soZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgY2FyZCA9IHRhcmdldC5jbG9zZXN0KCcuYmxvZy1jYXJkJyk7IC8vIFR5cGUgYXNzZXJ0aW9uXG4gICAgaWYgKGNhcmQpIHtcbiAgICAgICAgLy8gUHJldmVudCBuYXZpZ2F0aW9uIGlmIHRoZSBjbGljayBvcmlnaW5hdGVkIG9uIGEgYnV0dG9uLCBsaW5rLCBvciBpY29uIHdpdGhpbiB0aGUgY2FyZFxuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbiwgYSwgaScpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBpbnRlcmFjdGl2ZSBlbGVtZW50IGluc2lkZSBjYXJkLCBwcmV2ZW50aW5nIG5hdmlnYXRpb24uJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zdElkID0gY2FyZC5kYXRhc2V0LnBvc3RJZDsgLy8gVXNlIGRhdGFzZXQgcHJvcGVydHlcbiAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYE5hdmlnYXRpbmcgdG8gcG9zdCAke3Bvc3RJZH1gKTtcbiAgICAgICAgICAgIC8vIFVzZSByZWxhdGl2ZSBwYXRoIGZvciBuYXZpZ2F0aW9uXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBwb3N0Lmh0bWw/aWQ9JHtwb3N0SWR9YDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBibG9nIHBvc3RzIGZyb20gQVBJXG4gKiBGZXRjaGVzIHBvc3RzIGZyb20gdGhlIEFQSSBhbmQgcmVuZGVycyB0aGVtIGluIHRoZSBVSVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gVXNlIG1vcmUgc3BlY2lmaWMgc2VsZWN0b3IgaWYgcG9zc2libGUsIGUuZy4sICNibG9nXG4gICAgICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nLmJsb2ctY2FyZHMnKTtcbiAgICAgICAgaWYgKCFibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Jsb2cgY2FyZHMgY29udGFpbmVyICgjYmxvZy5ibG9nLWNhcmRzKSBub3QgZm91bmQgaW4gdGhlIERPTS4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj48L2Rpdj48cD5Mb2FkaW5nIHBvc3RzLi4uPC9wPic7XG4gICAgICAgICAgICAvLyBGZXRjaCBwb3N0cyB1c2luZyB0aGUgZnVuY3Rpb24gZnJvbSBhcGkudHMgKHdoaWNoIGZldGNoZXMgc3RhdGljIGpzb24pXG4gICAgICAgICAgICBjb25zdCBwb3N0cyA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaEJsb2dQb3N0cykoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGVkICR7cG9zdHMubGVuZ3RofSBwb3N0cy5gKTtcbiAgICAgICAgICAgIC8vIENsZWFyIGxvYWRpbmcgc3RhdGVcbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGlmIChwb3N0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTdGF0ZShibG9nQ2FyZHNDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERpc3BsYXkgaW5pdGlhbCBwb3N0cyAoZS5nLiwgZmlyc3QgMyBvciA2KVxuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFBvc3RDb3VudCA9IDY7IC8vIE9yIGFkanVzdCBhcyBuZWVkZWRcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlQb3N0cyA9IHBvc3RzLnNsaWNlKDAsIGluaXRpYWxQb3N0Q291bnQpO1xuICAgICAgICAgICAgY29uc3QgaGlkZGVuUG9zdHMgPSBwb3N0cy5zbGljZShpbml0aWFsUG9zdENvdW50KTtcbiAgICAgICAgICAgIC8vIEFkZCB2aXNpYmxlIHBvc3RzIHRvIG1haW4gY29udGFpbmVyXG4gICAgICAgICAgICBkaXNwbGF5UG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9nQ2FyZCA9ICgwLCBibG9nQ2FyZHNfMS5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQpKHBvc3QpO1xuICAgICAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChibG9nQ2FyZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIEFkZCByZW1haW5pbmcgcG9zdHMgdG8gaGlkZGVuIGNvbnRhaW5lciBmb3IgcGFnaW5hdGlvblxuICAgICAgICAgICAgY29uc3QgaGlkZGVuUG9zdHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLXBvc3RzJyk7XG4gICAgICAgICAgICBpZiAoaGlkZGVuUG9zdHNDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJzsgLy8gQ2xlYXIgcHJldmlvdXMgaGlkZGVuIHBvc3RzXG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuUG9zdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvZ0NhcmQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2hpZGRlblBvc3RzLmxlbmd0aH0gcG9zdHMgYWRkZWQgdG8gaGlkZGVuIGNvbnRhaW5lci5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBsb2FkIG1vcmUgYnV0dG9uIHZpc2liaWxpdHlcbiAgICAgICAgICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICAgICAgICAgIGlmIChsb2FkTW9yZUJ0bikge1xuICAgICAgICAgICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSBoaWRkZW5Qb3N0cy5sZW5ndGggPiAwID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluaXRpYWxpemluZyBwb3N0czonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93RXJyb3JTdGF0ZShibG9nQ2FyZHNDb250YWluZXIpOyAvLyBTaG93IGVycm9yIHN0YXRlIGluIHRoZSBjb250YWluZXJcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBTaG93IGVtcHR5IHN0YXRlIHdoZW4gbm8gcG9zdHMgYXJlIGF2YWlsYWJsZVxuICovXG5mdW5jdGlvbiBzaG93RW1wdHlTdGF0ZShjb250YWluZXIpIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIGNvbnRhaW5lclxuICAgIGNvbnN0IGVtcHR5U3RhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbXB0eVN0YXRlRGl2LmNsYXNzTmFtZSA9ICdlbXB0eS1zdGF0ZSc7IC8vIEFkZCBjbGFzcyBmb3Igc3R5bGluZ1xuICAgIGVtcHR5U3RhdGVEaXYuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1maWxlLWFsdCBmYS0zeFwiPjwvaT5cbiAgICAgICAgPGgzPk5vIHBvc3RzIGZvdW5kPC9oMz5cbiAgICAgICAgPHA+Q2hlY2sgYmFjayBsYXRlciBmb3IgbmV3IGNvbnRlbnQhPC9wPiBcbiAgICBgOyAvLyBFeGFtcGxlIGNvbnRlbnRcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wdHlTdGF0ZURpdik7XG4gICAgY29uc29sZS5sb2coJ0Rpc3BsYXllZCBlbXB0eSBzdGF0ZSBmb3IgcG9zdHMuJyk7XG59XG4vKipcbiAqIFNob3cgZXJyb3Igc3RhdGUgd2hlbiBwb3N0cyBjb3VsZG4ndCBiZSBsb2FkZWRcbiAqL1xuZnVuY3Rpb24gc2hvd0Vycm9yU3RhdGUoY29udGFpbmVyKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnOyAvLyBDbGVhciBjb250YWluZXJcbiAgICBjb25zdCBlcnJvclN0YXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZXJyb3JTdGF0ZURpdi5jbGFzc05hbWUgPSAnZXJyb3Itc3RhdGUnOyAvLyBBZGQgY2xhc3MgZm9yIHN0eWxpbmdcbiAgICBlcnJvclN0YXRlRGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZmEtM3hcIj48L2k+XG4gICAgICAgIDxoMz5Tb21ldGhpbmcgd2VudCB3cm9uZzwvaDM+XG4gICAgICAgIDxwPkZhaWxlZCB0byBsb2FkIGJsb2cgcG9zdHMuIFBsZWFzZSB0cnkgcmVmcmVzaGluZyB0aGUgcGFnZS48L3A+XG4gICAgYDsgLy8gRXhhbXBsZSBjb250ZW50XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVycm9yU3RhdGVEaXYpO1xuICAgIGNvbnNvbGUubG9nKCdEaXNwbGF5ZWQgZXJyb3Igc3RhdGUgZm9yIHBvc3RzLicpO1xufVxuLy8gUkVNT1ZFRDogTG9jYWwgZGVmaW5pdGlvbnMgYW5kIGNhbGxzIGZvciBzZXR1cFNlYXJjaCBhbmQgc2V0dXBQb3B1cEJ1dHRvbnNcbi8vIEZ1bmN0aW9uYWxpdHkgaXMgbm93IGhhbmRsZWQgYnkgdGhlIGltcG9ydGVkIGluaXRpYWxpemVTZWFyY2gsIGluaXRpYWxpemVBYm91dCwgaW5pdGlhbGl6ZUNvbnRhY3RGb3JtXG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9lbnRyaWVzL2NsaWVudC50c1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBJbXBvcnRzIHJlbWFpbiB0aGUgc2FtZS4uLlxuY29uc3QgYmxvZ0Zyb250ZW5kQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2Jsb2dGcm9udGVuZENvbnRyb2xsZXJcIik7XG5jb25zdCBwb3N0RGV0YWlsXzEgPSByZXF1aXJlKFwiLi4vbW9kdWxlcy9wb3N0RGV0YWlsXCIpO1xuY29uc3QgaGVhZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vKipcbiAqIENsaWVudC1zaWRlIGVudHJ5IHBvaW50IGluaXRpYWxpemVyLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ2xpZW50KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGllbnQgaW5pdGlhbGl6aW5nLi4uJyk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgY29tbW9uIGVsZW1lbnRzIGZpcnN0XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEYXJrIG1vZGUgaW5pdGlhbGl6ZWQgZ2xvYmFsbHkuJyk7XG4gICAgICAgICAgICAvLyBSZW5kZXIgSGVhZGVyIG9ubHkgaWYgcGxhY2Vob2xkZXIgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlci1wbGFjZWhvbGRlcicpKSB7XG4gICAgICAgICAgICAgICAgKDAsIGhlYWRlcl8xLnJlbmRlckhlYWRlcikoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGVyIHJlbmRlcmVkIGdsb2JhbGx5LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdIZWFkZXIgcGxhY2Vob2xkZXIgbm90IGZvdW5kIG9uIHRoaXMgcGFnZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbml0aWFsaXppbmcgY29tbW9uIGVsZW1lbnRzOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUGFnZS1zcGVjaWZpYyBsb2dpY1xuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5wYWdlO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgLy8gR2V0IHRoZSBiYXNlIG5hbWUgb2YgdGhlIGZpbGUvcGF0aCwgcmVtb3ZpbmcgdHJhaWxpbmcgc2xhc2ggaWYgcHJlc2VudFxuICAgICAgICBjb25zdCBwYXRoRW5kID0gY3VycmVudFBhZ2UuZW5kc1dpdGgoJy8nKSA/IGN1cnJlbnRQYWdlLnNsaWNlKDAsIC0xKS5zcGxpdCgnLycpLnBvcCgpIDogY3VycmVudFBhZ2Uuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgICAgY29uc3QgaXNSb290T3JJbmRleCA9IGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvJykgfHwgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9pbmRleC5odG1sJyk7IC8vIENoZWNrIGlmIGl0J3MgdGhlIHJvb3Qgb2YgdGhlIGRlcGxveW1lbnRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZXRlY3RlZCBwYWdlVHlwZTogJHtwYWdlVHlwZX0sIGN1cnJlbnRQYWdlOiAke2N1cnJlbnRQYWdlfSwgcGF0aEVuZDogJHtwYXRoRW5kfSwgaXNSb290T3JJbmRleDogJHtpc1Jvb3RPckluZGV4fWApO1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIE1haW4gUGFnZSAodXNpbmcgZGF0YS1wYWdlIG9yIHBhdGggZW5kaW5nIGluIC8gb3IgL2luZGV4Lmh0bWwpXG4gICAgICAgICAgICBpZiAocGFnZVR5cGUgPT09ICdtYWluJyB8fCAoIXBhZ2VUeXBlICYmIGlzUm9vdE9ySW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBtYWluIGJsb2cgcGFnZSBsb2dpYy4uLicpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBibG9nRnJvbnRlbmRDb250cm9sbGVyXzEuaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCkoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWFpbiBibG9nIHBhZ2UgbG9naWMgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIFBvc3QgRGV0YWlsIFBhZ2UgKHVzaW5nIGRhdGEtcGFnZSBvciBwYXRoIGVuZGluZyBpbiAvcG9zdC5odG1sKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFnZVR5cGUgPT09ICdwb3N0JyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvcG9zdC5odG1sJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBwb3N0IGRldGFpbCBwYWdlIGxvZ2ljIChmcm9tIG1vZHVsZSkuLi4nKTtcbiAgICAgICAgICAgICAgICB5aWVsZCAoMCwgcG9zdERldGFpbF8xLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljKSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRldGFpbCBwYWdlIGxvZ2ljIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBBZG1pbiBQYWdlICh1c2luZyBkYXRhLXBhZ2Ugb3IgcGF0aCBlbmRpbmcgaW4gL2FkbWluLmh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ2FkbWluJyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvYWRtaW4uaHRtbCcpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZG1pbiBwYWdlIGRldGVjdGVkIGJ5IGNsaWVudC50cyAtIG5vIGFjdGlvbiB0YWtlbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmtub3duIHBhZ2UgdHlwZSAoJyR7cGFnZVR5cGV9Jykgb3IgcGF0aCAoJyR7Y3VycmVudFBhZ2V9JykuIE5vIHNwZWNpZmljIGluaXRpYWxpemF0aW9uIG5lZWRlZCBmcm9tIGNsaWVudC50cy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBwYWdlLXNwZWNpZmljIGNsaWVudCBpbml0aWFsaXphdGlvbjonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIERPTUNvbnRlbnRMb2FkZWQgbGlzdGVuZXIgcmVtYWlucyB0aGUgc2FtZS4uLlxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0aWFsaXplQ2xpZW50KTtcbn1cbmVsc2Uge1xuICAgIGluaXRpYWxpemVDbGllbnQoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL21vZHVsZXMvcG9zdERldGFpbC50c1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbiA9IGdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbjtcbmV4cG9ydHMuYWRkUG9zdFRvU2Vzc2lvbkxpa2VzID0gYWRkUG9zdFRvU2Vzc2lvbkxpa2VzO1xuZXhwb3J0cy5yZW1vdmVQb3N0RnJvbVNlc3Npb25MaWtlcyA9IHJlbW92ZVBvc3RGcm9tU2Vzc2lvbkxpa2VzO1xuZXhwb3J0cy5pbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYyA9IGluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljO1xuZXhwb3J0cy5sb2FkUG9zdENvbnRlbnQgPSBsb2FkUG9zdENvbnRlbnQ7XG5leHBvcnRzLnVwZGF0ZVBvc3RVSSA9IHVwZGF0ZVBvc3RVSTtcbmV4cG9ydHMudXBkYXRlUGFnZU1ldGFkYXRhID0gdXBkYXRlUGFnZU1ldGFkYXRhO1xuZXhwb3J0cy5pbml0aWFsaXplU29jaWFsU2hhcmluZyA9IGluaXRpYWxpemVTb2NpYWxTaGFyaW5nO1xuZXhwb3J0cy5zaG93RXJyb3JNZXNzYWdlID0gc2hvd0Vycm9yTWVzc2FnZTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUxpa2VCdXR0b24gPSBpbml0aWFsaXplTGlrZUJ1dHRvbjtcbmV4cG9ydHMubG9hZENvbW1lbnRzID0gbG9hZENvbW1lbnRzO1xuZXhwb3J0cy5pbml0aWFsaXplQ29tbWVudEZvcm0gPSBpbml0aWFsaXplQ29tbWVudEZvcm07XG4vLyAtLS0gSW1wb3J0cyAtLS1cbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTtcbmNvbnN0IGhlYWRlcl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaGVhZGVyXCIpO1xuY29uc3QgZGFya01vZGVfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2RhcmtNb2RlXCIpO1xuLy8gUGxhY2Vob2xkZXIgQVBJIGZ1bmN0aW9ucyBmb3IgY29tbWVudHMgKHJlcGxhY2Ugd2l0aCBhY3R1YWwgaW1wbGVtZW50YXRpb24pXG5jb25zdCBmZXRjaENvbW1lbnRzQXBpID0gKGlkKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zb2xlLmxvZyhgQVBJOiBGZXRjaGluZyBjb21tZW50cyBmb3IgJHtpZH1gKTtcbiAgICByZXR1cm4gW1xuICAgICAgICB7IGlkOiAxLCBuYW1lOiAnQWxpY2UnLCBjb21tZW50OiAnR3JlYXQgcG9zdCEnLCBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkgfSxcbiAgICAgICAgeyBpZDogMiwgbmFtZTogJ0JvYicsIGNvbW1lbnQ6ICdWZXJ5IGluZm9ybWF0aXZlLicsIGNyZWF0ZWRBdDogbmV3IERhdGUoKSB9XG4gICAgXTtcbn0pO1xuY29uc3Qgc3VibWl0Q29tbWVudEFwaSA9IChpZCwgbmFtZSwgY29tbWVudCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc29sZS5sb2coYEFQSTogU3VibWl0dGluZyBjb21tZW50IGZvciAke2lkfWAsIHsgbmFtZSwgY29tbWVudCB9KTtcbiAgICByZXR1cm4geyBpZDogRGF0ZS5ub3coKSwgbmFtZSwgY29tbWVudCwgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpIH07XG59KTtcbi8vIC0tLSBTZXNzaW9uIFN0b3JhZ2UgSGVscGVyIEZ1bmN0aW9ucyBmb3IgTGlrZXMgLS0tXG5jb25zdCBMSUtFRF9QT1NUU19TRVNTSU9OX0tFWSA9ICdsaWtlZFBvc3RzJztcbi8qKiBHZXRzIHRoZSBzZXQgb2YgbGlrZWQgcG9zdCBJRHMgZnJvbSBzZXNzaW9uU3RvcmFnZS4gKi9cbmZ1bmN0aW9uIGdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbigpIHtcbiAgICBjb25zdCBzdG9yZWRMaWtlcyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oTElLRURfUE9TVFNfU0VTU0lPTl9LRVkpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGxpa2VkSWRzID0gc3RvcmVkTGlrZXMgPyBKU09OLnBhcnNlKHN0b3JlZExpa2VzKSA6IFtdO1xuICAgICAgICByZXR1cm4gbmV3IFNldChBcnJheS5pc0FycmF5KGxpa2VkSWRzKSA/IGxpa2VkSWRzIDogW10pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBsaWtlZCBwb3N0cyBmcm9tIHNlc3Npb25TdG9yYWdlOlwiLCBlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG59XG4vKiogQWRkcyBhIHBvc3QgSUQgdG8gdGhlIGxpa2VkIHBvc3RzIGluIHNlc3Npb25TdG9yYWdlLiAqL1xuZnVuY3Rpb24gYWRkUG9zdFRvU2Vzc2lvbkxpa2VzKHBvc3RJZCkge1xuICAgIGNvbnN0IGxpa2VkUG9zdHNTZXQgPSBnZXRMaWtlZFBvc3RzRnJvbVNlc3Npb24oKTtcbiAgICBsaWtlZFBvc3RzU2V0LmFkZChwb3N0SWQpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oTElLRURfUE9TVFNfU0VTU0lPTl9LRVksIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20obGlrZWRQb3N0c1NldCkpKTtcbiAgICBjb25zb2xlLmxvZygnQWRkZWQgcG9zdCB0byBzZXNzaW9uIGxpa2VzOicsIHBvc3RJZCwgQXJyYXkuZnJvbShsaWtlZFBvc3RzU2V0KSk7XG59XG4vKiogUmVtb3ZlcyBhIHBvc3QgSUQgZnJvbSB0aGUgbGlrZWQgcG9zdHMgaW4gc2Vzc2lvblN0b3JhZ2UuICovXG5mdW5jdGlvbiByZW1vdmVQb3N0RnJvbVNlc3Npb25MaWtlcyhwb3N0SWQpIHtcbiAgICBjb25zdCBsaWtlZFBvc3RzU2V0ID0gZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uKCk7XG4gICAgbGlrZWRQb3N0c1NldC5kZWxldGUocG9zdElkKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKExJS0VEX1BPU1RTX1NFU1NJT05fS0VZLCBKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKGxpa2VkUG9zdHNTZXQpKSk7XG4gICAgY29uc29sZS5sb2coJ1JlbW92ZWQgcG9zdCBmcm9tIHNlc3Npb24gbGlrZXM6JywgcG9zdElkLCBBcnJheS5mcm9tKGxpa2VkUG9zdHNTZXQpKTtcbn1cbi8vIC0tLSBDb3JlIEluaXRpYWxpemF0aW9uIEZ1bmN0aW9uIC0tLVxuLyoqXG4gKiBJbml0aWFsaXplcyBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHBvc3QgZGV0YWlsIHBhZ2UuXG4gKiBUaGlzIGlzIHRoZSBtYWluIGV4cG9ydGVkIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCBieSB0aGUgZW50cnkgcG9pbnQuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgcG9zdCBkZXRhaWwgcGFnZS4uLicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UpKCk7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGFyayBtb2RlIGluaXRpYWxpemVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgaGVhZGVyXzEucmVuZGVySGVhZGVyKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0hlYWRlciByZW5kZXJlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSB1cmxQYXJhbXMuZ2V0KCdpZCcpO1xuICAgICAgICBpZiAocG9zdElkKSB7XG4gICAgICAgICAgICB5aWVsZCBsb2FkUG9zdENvbnRlbnQocG9zdElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHBvc3QgSUQgcHJvdmlkZWQgaW4gdGhlIFVSTCcpO1xuICAgICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZSgnTm8gcG9zdCBzcGVjaWZpZWQuIFBsZWFzZSBjaGVjayB0aGUgVVJMLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRldGFpbCBwYWdlIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlLicpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBMb2FkIGFuZCBkaXNwbGF5IHBvc3QgY29udGVudCBiYXNlZCBvbiBwb3N0IElEXG4gKi9cbmZ1bmN0aW9uIGxvYWRQb3N0Q29udGVudChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEZldGNoaW5nIHBvc3Qgd2l0aCBJRDogJHtwb3N0SWR9YCk7XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0geWllbGQgKDAsIGFwaV8xLmZldGNoUG9zdEJ5SWQpKHBvc3RJZCk7XG4gICAgICAgICAgICBpZiAoIXBvc3QpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQb3N0IHdpdGggSUQgJHtwb3N0SWR9IG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGF0YSBmZXRjaGVkOicsIHBvc3QpO1xuICAgICAgICAgICAgdXBkYXRlUG9zdFVJKHBvc3QpO1xuICAgICAgICAgICAgdXBkYXRlUGFnZU1ldGFkYXRhKHBvc3QpO1xuICAgICAgICAgICAgaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcocG9zdCk7XG4gICAgICAgICAgICBpbml0aWFsaXplTGlrZUJ1dHRvbihwb3N0KTtcbiAgICAgICAgICAgIGluaXRpYWxpemVDb21tZW50Rm9ybShwb3N0LmlkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgeWllbGQgbG9hZENvbW1lbnRzKHBvc3QuaWQudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHBvc3QgY29udGVudDonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93RXJyb3JNZXNzYWdlKGBGYWlsZWQgdG8gbG9hZCB0aGUgYmxvZyBwb3N0LiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1BsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJ31gKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBVcGRhdGUgdGhlIHBvc3QgVUkgd2l0aCBjb250ZW50IGZyb20gdGhlIGxvYWRlZCBwb3N0XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBvc3RVSShwb3N0KSB7XG4gICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIFBvc3QgVUkgZm9yOicsIHBvc3QudGl0bGUpO1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDYW5ub3QgdXBkYXRlIFVJOiAjcG9zdC1jb250ZW50IGVsZW1lbnQgbm90IGZvdW5kLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENvbnN0cnVjdCB0aGUgaW5uZXIgSFRNTCBkeW5hbWljYWxseVxuICAgIHBvc3RBcnRpY2xlRWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPiR7cG9zdC50aXRsZX08L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtbWV0YVwiPlxuICAgICAgICAgICAgICAgIDx0aW1lIGRhdGV0aW1lPVwiJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gOiAnJ31cIj5cbiAgICAgICAgICAgICAgICAgICAgJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnIH0pIDogJ0RhdGUgdW5rbm93bid9XG4gICAgICAgICAgICAgICAgPC90aW1lPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yXCI+YnkgJHtwb3N0LmF1dGhvciB8fCAnQW5vbnltb3VzJ308L3NwYW4+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibGlrZS1idXR0b25cIiBkYXRhLXBvc3QtaWQ9XCIke3Bvc3QuaWR9XCIgYXJpYS1sYWJlbD1cIkxpa2UgdGhpcyBwb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLWhlYXJ0XCI+PC9pPiBcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsaWtlLWNvdW50XCI+JHtwb3N0Lmxpa2VzIHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgJHtwb3N0LmltYWdlVXJsID8gYDxpbWcgc3JjPVwiJHtwb3N0LmltYWdlVXJsfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIiBjbGFzcz1cImZlYXR1cmVkLWltYWdlXCI+YCA6ICcnfVxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWNvbnRlbnQtYm9keVwiPlxuICAgICAgICAgICAgJHtwb3N0LmNvbnRlbnR9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWZvb3RlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3NcIj5cbiAgICAgICAgICAgICAgICAke3Bvc3QudGFncyAmJiBwb3N0LnRhZ3MubGVuZ3RoID4gMCA/IGA8c3Bhbj5UYWdzOjwvc3Bhbj4gJHtwb3N0LnRhZ3MubWFwKHRhZyA9PiBgPGEgaHJlZj1cIi90YWcvJHt0YWcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICctJyl9XCI+JHt0YWd9PC9hPmApLmpvaW4oJycpfWAgOiAnJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvY2lhbC1zaGFyaW5nXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+U2hhcmU6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gdHdpdHRlclwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBUd2l0dGVyXCI+PGkgY2xhc3M9XCJmYWIgZmEtdHdpdHRlclwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGZhY2Vib29rXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIEZhY2Vib29rXCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2stZlwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGxpbmtlZGluXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIExpbmtlZEluXCI+PGkgY2xhc3M9XCJmYWIgZmEtbGlua2VkaW4taW5cIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJjb21tZW50cy1zZWN0aW9uXCIgY2xhc3M9XCJjb21tZW50cy1zZWN0aW9uXCIgYXJpYS1sYWJlbGxlZGJ5PVwiY29tbWVudHMtaGVhZGluZ1wiPlxuICAgICAgICAgICAgIDxoMiBpZD1cImNvbW1lbnRzLWhlYWRpbmdcIj5Db21tZW50czwvaDI+XG4gICAgICAgICAgICAgPGRpdiBpZD1cImNvbW1lbnRzLWxpc3RcIiBjbGFzcz1cImNvbW1lbnRzLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJuby1jb21tZW50c1wiPkxvYWRpbmcgY29tbWVudHMuLi48L3A+IFxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIDxmb3JtIGlkPVwiY29tbWVudC1mb3JtXCIgY2xhc3M9XCJjb21tZW50LWZvcm1cIiBkYXRhLXBvc3QtaWQ9XCIke3Bvc3QuaWR9XCI+XG4gICAgICAgICAgICAgICAgIDxoMz5MZWF2ZSBhIENvbW1lbnQ8L2gzPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvbW1lbnQtbmFtZVwiPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY29tbWVudC1uYW1lXCIgbmFtZT1cIm5hbWVcIiByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY29tbWVudC10ZXh0XCI+Q29tbWVudDo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGlkPVwiY29tbWVudC10ZXh0XCIgbmFtZT1cImNvbW1lbnRcIiByb3dzPVwiNFwiIHJlcXVpcmVkPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cInByaW1hcnktYnV0dG9uXCI+U3VibWl0IENvbW1lbnQ8L2J1dHRvbj5cbiAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuICAgIGNvbnNvbGUubG9nKCdQb3N0IFVJIHVwZGF0ZWQgd2l0aCBsaWtlIGJ1dHRvbiBhbmQgY29tbWVudHMgc2VjdGlvbiBzdHJ1Y3R1cmUuJyk7XG59XG4vKipcbiAqIFVwZGF0ZSBwYWdlIG1ldGFkYXRhIGxpa2UgdGl0bGUgYW5kIFVSTFxuICovXG5mdW5jdGlvbiB1cGRhdGVQYWdlTWV0YWRhdGEocG9zdCkge1xuICAgIGRvY3VtZW50LnRpdGxlID0gYCR7cG9zdC50aXRsZX0gfCBOb2VsJ3MgQmxvZ2A7XG4gICAgY29uc29sZS5sb2coJ1BhZ2UgbWV0YWRhdGEgdXBkYXRlZC4nKTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBzb2NpYWwgc2hhcmluZyBmdW5jdGlvbmFsaXR5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVTb2NpYWxTaGFyaW5nKHBvc3QpIHtcbiAgICBjb25zdCBwb3N0QXJ0aWNsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgaWYgKCFwb3N0QXJ0aWNsZUVsZW1lbnQpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBzb2NpYWxTaGFyaW5nRGl2ID0gcG9zdEFydGljbGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWwtc2hhcmluZycpO1xuICAgIGlmIChzb2NpYWxTaGFyaW5nRGl2KSB7XG4gICAgICAgIHNvY2lhbFNoYXJpbmdEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hhcmUtYnV0dG9uJyk7XG4gICAgICAgICAgICBpZiAoIWJ1dHRvbilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYENoZWNrIG91dCB0aGlzIGFydGljbGU6ICR7cG9zdC50aXRsZX1gO1xuICAgICAgICAgICAgbGV0IHNoYXJlV2luZG93VXJsID0gJyc7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygndHdpdHRlcicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9JnRleHQ9JHtlbmNvZGVVUklDb21wb25lbnQodGV4dCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ3R3aXR0ZXItc2hhcmUnLCAnd2lkdGg9NTUwLGhlaWdodD0yMzUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhY2Vib29rJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdmYWNlYm9vay1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnbGlua2VkaW4nKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyaW5nL3NoYXJlLW9mZnNpdGUvP3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWA7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdsaW5rZWRpbi1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ1NvY2lhbCBzaGFyaW5nIGluaXRpYWxpemVkLicpO1xufVxuLyoqXG4gKiBEaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIHVzZXIgd2l0aGluIHRoZSBwb3N0IGNvbnRlbnQgYXJlYVxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoY29udGVudEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLXNlY3Rpb24nKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGNvbW1lbnRzU2VjdGlvbiA/IGNvbW1lbnRzU2VjdGlvbiA6IGNvbnRlbnRFbGVtZW50O1xuICAgICAgICB0YXJnZXRFbGVtZW50LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPiR7bWVzc2FnZX08L2Rpdj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7IC8vIEZhbGxiYWNrXG4gICAgfVxufVxuLyoqXG4gKiBJbml0aWFsaXplIGxpa2UgYnV0dG9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUxpa2VCdXR0b24ocG9zdCkge1xuICAgIGNvbnN0IHBvc3RJZFN0cmluZyA9IHBvc3QuaWQudG9TdHJpbmcoKTtcbiAgICBjb25zdCBsaWtlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Bvc3QtY29udGVudCAubGlrZS1idXR0b25bZGF0YS1wb3N0LWlkPVwiJHtwb3N0SWRTdHJpbmd9XCJdYCk7XG4gICAgaWYgKCFsaWtlQnRuKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignTGlrZSBidXR0b24gbm90IGZvdW5kIGluIHBvc3QgZGV0YWlsIFVJLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGxpa2VkUG9zdHNTZXQgPSBnZXRMaWtlZFBvc3RzRnJvbVNlc3Npb24oKTtcbiAgICBsZXQgaXNMaWtlZCA9IGxpa2VkUG9zdHNTZXQuaGFzKHBvc3RJZFN0cmluZyk7IC8vIEluaXRpYWwgc3RhdGUgZnJvbSBzZXNzaW9uXG4gICAgY29uc3QgaWNvbiA9IGxpa2VCdG4ucXVlcnlTZWxlY3RvcignaScpO1xuICAgIGNvbnN0IGNvdW50U3BhbiA9IGxpa2VCdG4ucXVlcnlTZWxlY3RvcignLmxpa2UtY291bnQnKTtcbiAgICAvLyBTZXQgaW5pdGlhbCBVSSBzdGF0ZVxuICAgIGlmIChpc0xpa2VkICYmIGljb24pIHtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXInKTtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTtcbiAgICAgICAgbGlrZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaWtlZCcpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpY29uKSB7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFzJyk7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmFyJyk7XG4gICAgICAgIGxpa2VCdG4uY2xhc3NMaXN0LnJlbW92ZSgnbGlrZWQnKTtcbiAgICB9XG4gICAgaWYgKGNvdW50U3BhbilcbiAgICAgICAgY291bnRTcGFuLnRleHRDb250ZW50ID0gU3RyaW5nKHBvc3QubGlrZXMgfHwgMCk7XG4gICAgbGlrZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBjdXJyZW50SWNvbiA9IGxpa2VCdG4ucXVlcnlTZWxlY3RvcignaScpO1xuICAgICAgICBjb25zdCBjdXJyZW50Q291bnRTcGFuID0gbGlrZUJ0bi5xdWVyeVNlbGVjdG9yKCcubGlrZS1jb3VudCcpO1xuICAgICAgICBpZiAoIWN1cnJlbnRJY29uIHx8ICFjdXJyZW50Q291bnRTcGFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsaWtlQnRuLmRpc2FibGVkID0gdHJ1ZTsgLy8gUHJldmVudCBkb3VibGUtY2xpY2tpbmdcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBdHRlbXB0aW5nIHRvIFVOTElLRSBwb3N0ICR7cG9zdC5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCAoMCwgYXBpXzEudW5saWtlUG9zdCkoTnVtYmVyKHBvc3QuaWQpKTsgLy8gQ2FsbCB1bmxpa2VQb3N0IEFQSVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEF0dGVtcHRpbmcgdG8gTElLRSBwb3N0ICR7cG9zdC5pZH1gKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCAoMCwgYXBpXzEubGlrZVBvc3QpKE51bWJlcihwb3N0LmlkKSk7IC8vIENhbGwgbGlrZVBvc3QgQVBJXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHRoZSBsb2NhbCAnaXNMaWtlZCcgc3RhdGUgb25seSBhZnRlciBzdWNjZXNzZnVsIEFQSSBjYWxsXG4gICAgICAgICAgICAgICAgaXNMaWtlZCA9ICFpc0xpa2VkO1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBTZXNzaW9uIFN0b3JhZ2UgYmFzZWQgb24gdGhlIG5ldyB0b2dnbGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgaWYgKGlzTGlrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkUG9zdFRvU2Vzc2lvbkxpa2VzKHBvc3RJZFN0cmluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVQb3N0RnJvbVNlc3Npb25MaWtlcyhwb3N0SWRTdHJpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgVUkgSWNvbiBiYXNlZCBvbiB0aGUgbmV3IHRvZ2dsZWQgc3RhdGVcbiAgICAgICAgICAgICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXInKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEljb24uY2xhc3NMaXN0LmFkZCgnZmFzJyk7XG4gICAgICAgICAgICAgICAgICAgIGxpa2VCdG4uY2xhc3NMaXN0LmFkZCgnbGlrZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcycpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInKTtcbiAgICAgICAgICAgICAgICAgICAgbGlrZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdsaWtlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY291bnQgZGlyZWN0bHkgZnJvbSB0aGUgQVBJIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY3VycmVudENvdW50U3Bhbi50ZXh0Q29udGVudCA9IFN0cmluZyhyZXN1bHQubGlrZXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMaWtlIHN0YXR1cyB1cGRhdGVkLiBOZXcgY291bnQ6ICR7cmVzdWx0Lmxpa2VzfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkxpa2UvVW5saWtlIEFQSSBjYWxsIGZhaWxlZCBvciByZXR1cm5lZCBudWxsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB1cGRhdGUgbGlrZS91bmxpa2Ugc3RhdHVzOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBsaWtlQnRuLmRpc2FibGVkID0gZmFsc2U7IC8vIFJlLWVuYWJsZSBidXR0b25cbiAgICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zb2xlLmxvZygnTGlrZSBidXR0b24gaW5pdGlhbGl6ZWQuJyk7XG59XG4vKipcbiAqIEZldGNoZXMgY29tbWVudHMgZnJvbSBBUEkgYW5kIHJlbmRlcnMgdGhlbSBpbnRvIHRoZSBsaXN0LlxuICovXG5mdW5jdGlvbiBsb2FkQ29tbWVudHMocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRzLWxpc3QnKTtcbiAgICAgICAgaWYgKCFjb21tZW50c0xpc3QpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJsb2FkaW5nLWNvbW1lbnRzXCI+TG9hZGluZyBjb21tZW50cy4uLjwvcD4nOyAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRzID0geWllbGQgZmV0Y2hDb21tZW50c0FwaShwb3N0SWQpOyAvLyBSZXBsYWNlIHdpdGggYWN0dWFsIEFQSSBjYWxsXG4gICAgICAgICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIGxvYWRpbmcvcHJldmlvdXMgY29tbWVudHNcbiAgICAgICAgICAgIGlmIChjb21tZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwibm8tY29tbWVudHNcIj5ObyBjb21tZW50cyB5ZXQuIEJlIHRoZSBmaXJzdCB0byBjb21tZW50ITwvcD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29tbWVudHMuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBjb21tZW50RWxlbWVudC5jbGFzc05hbWUgPSAnY29tbWVudCc7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJhc2ljIGVzY2FwaW5nIGZvciBkaXNwbGF5IC0gY29uc2lkZXIgYSBtb3JlIHJvYnVzdCBzYW5pdGl6ZXIgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhZmVOYW1lID0gKChfYiA9IChfYSA9IGNvbW1lbnQubmFtZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVwbGFjZSgvPi9nLCBcIiZndDtcIikpIHx8ICdBbm9ueW1vdXMnO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYWZlQ29tbWVudCA9ICgoX2QgPSAoX2MgPSBjb21tZW50LmNvbW1lbnQpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5yZXBsYWNlKC88L2csIFwiJmx0O1wiKSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpKSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudEVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtbWV0YVwiPjxzdHJvbmc+JHtzYWZlTmFtZX08L3N0cm9uZz4gb24gJHtuZXcgRGF0ZShjb21tZW50LmNyZWF0ZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtYm9keVwiPiR7c2FmZUNvbW1lbnR9PC9wPlxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzTGlzdC5hcHBlbmRDaGlsZChjb21tZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29tbWVudHMgbG9hZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGNvbW1lbnRzOlwiLCBlcnJvcik7XG4gICAgICAgICAgICBjb21tZW50c0xpc3QuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPkNvdWxkIG5vdCBsb2FkIGNvbW1lbnRzLjwvcD4nO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBjb21tZW50IHN1Ym1pc3Npb24gZm9ybS5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbW1lbnRGb3JtKHBvc3RJZCkge1xuICAgIGNvbnN0IGNvbW1lbnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtZm9ybScpO1xuICAgIGlmICghY29tbWVudEZvcm0pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDb21tZW50IGZvcm0gbm90IGZvdW5kIGluIHBvc3QgZGV0YWlsIFVJLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbW1lbnRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjb21tZW50Rm9ybS5lbGVtZW50cy5uYW1lZEl0ZW0oJ25hbWUnKTtcbiAgICAgICAgY29uc3QgY29tbWVudElucHV0ID0gY29tbWVudEZvcm0uZWxlbWVudHMubmFtZWRJdGVtKCdjb21tZW50Jyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGNvbW1lbnRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJyk7XG4gICAgICAgIGlmICghbmFtZUlucHV0IHx8ICFjb21tZW50SW5wdXQgfHwgIXN1Ym1pdEJ1dHRvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgIGNvbnN0IGNvbW1lbnQgPSBjb21tZW50SW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICBpZiAoIW5hbWUgfHwgIWNvbW1lbnQpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgYm90aCBuYW1lIGFuZCBjb21tZW50LicpOyAvLyBTaW1wbGUgdmFsaWRhdGlvblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdWJtaXR0aW5nLi4uJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHlpZWxkIHN1Ym1pdENvbW1lbnRBcGkocG9zdElkLCBuYW1lLCBjb21tZW50KTsgLy8gUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gQ2xlYXIgZm9ybVxuICAgICAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICBjb21tZW50SW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIC8vIFJlZnJlc2ggY29tbWVudHMgbGlzdCB0byBzaG93IHRoZSBuZXcgY29tbWVudFxuICAgICAgICAgICAgeWllbGQgbG9hZENvbW1lbnRzKHBvc3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHN1Ym1pdCBjb21tZW50OlwiLCBlcnJvcik7XG4gICAgICAgICAgICBhbGVydCgnRmFpbGVkIHRvIHN1Ym1pdCBjb21tZW50LiBQbGVhc2UgdHJ5IGFnYWluLicpOyAvLyBTaW1wbGUgZXJyb3IgZmVlZGJhY2tcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ1N1Ym1pdCBDb21tZW50JztcbiAgICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zb2xlLmxvZygnQ29tbWVudCBmb3JtIGluaXRpYWxpemVkLicpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubGlrZVBvc3QgPSBsaWtlUG9zdDtcbmV4cG9ydHMudW5saWtlUG9zdCA9IHVubGlrZVBvc3Q7XG5leHBvcnRzLmRlbGV0ZUJsb2dQb3N0ID0gZGVsZXRlQmxvZ1Bvc3Q7XG5leHBvcnRzLmNyZWF0ZVBvc3QgPSBjcmVhdGVQb3N0O1xuZXhwb3J0cy51cGRhdGVQb3N0ID0gdXBkYXRlUG9zdDtcbmV4cG9ydHMuYWRkVGFnVG9Qb3N0ID0gYWRkVGFnVG9Qb3N0O1xuZXhwb3J0cy5mZXRjaEJsb2dQb3N0cyA9IGZldGNoQmxvZ1Bvc3RzO1xuZXhwb3J0cy5mZXRjaFBvc3RCeUlkID0gZmV0Y2hQb3N0QnlJZDtcbmV4cG9ydHMuZmV0Y2hDb21tZW50c0FwaSA9IGZldGNoQ29tbWVudHNBcGk7XG5leHBvcnRzLnN1Ym1pdENvbW1lbnRBcGkgPSBzdWJtaXRDb21tZW50QXBpO1xuLy8gQVBJX1VSTCBjb25zdGFudCBpcyBub3QgbmVlZGVkIHdoZW4gZmV0Y2hpbmcgc3RhdGljIGZpbGUgZGlyZWN0bHlcbi8vIGNvbnN0IEFQSV9VUkwgPSAnL2FwaSc7IFxuLy8gLS0tIEZ1bmN0aW9ucyByZWx5aW5nIG9uIGJhY2tlbmQgQVBJIChXaWxsIE5PVCB3b3JrIG9uIEdpdEh1YiBQYWdlcykgLS0tXG4vLyBUaGVzZSBmdW5jdGlvbnMgd2lsbCBmYWlsIHNpbGVudGx5IG9yIGxvZyBlcnJvcnMgaW4gdGhlIGNvbnNvbGUgb24gdGhlIHN0YXRpYyBzaXRlLlxuZnVuY3Rpb24gbGlrZVBvc3QoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBMaWtlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZXMgYSBiYWNrZW5kLiBDYW5ub3QgTElLRSBwb3N0ICR7aWR9IG9uIHN0YXRpYyBzaXRlLmApO1xuICAgICAgICAvLyBSZXR1cm4gbnVsbCBvciBhIGRlZmF1bHQgc3RydWN0dXJlIGlmIHlvdXIgY2FsbGluZyBjb2RlIGV4cGVjdHMgaXRcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB1bmxpa2VQb3N0KGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgVW5saWtlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZXMgYSBiYWNrZW5kLiBDYW5ub3QgVU5MSUtFIHBvc3QgJHtpZH0gb24gc3RhdGljIHNpdGUuYCk7XG4gICAgICAgIC8vIFJldHVybiBudWxsIG9yIGEgZGVmYXVsdCBzdHJ1Y3R1cmVcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkZWxldGVCbG9nUG9zdChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGRlbGV0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBvc3QocG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGNyZWF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlUG9zdChpZCwgcG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHVwZGF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gYWRkVGFnVG9Qb3N0KGlkLCB0YWcpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGFkZCB0YWcgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG4vLyAtLS0gRnVuY3Rpb25zIG1vZGlmaWVkIGZvciBzdGF0aWMgZGF0YSAtLS1cbi8qKlxuICogRmV0Y2ggYWxsIGJsb2cgcG9zdHMgZGlyZWN0bHkgZnJvbSB0aGUgc3RhdGljIEpTT04gZmlsZS5cbiAqL1xuZnVuY3Rpb24gZmV0Y2hCbG9nUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gQ29uc3RydWN0IHRoZSBwYXRoIHJlbGF0aXZlIHRvIHRoZSBIVE1MIGZpbGUgbG9hZGluZyB0aGUgc2NyaXB0LlxuICAgICAgICAvLyBBc3N1bWVzIHBvc3RzLmpzb24gaXMgY29waWVkIHRvICdkb2NzL2RhdGEvcG9zdHMuanNvbicgYnkgdGhlIHdvcmtmbG93LlxuICAgICAgICAvLyBBbmQgSFRNTCBmaWxlcyBhcmUgYXQgdGhlIHJvb3Qgb2YgJ2RvY3MnLlxuICAgICAgICBjb25zdCBkYXRhVXJsID0gJ2RhdGEvcG9zdHMuanNvbic7XG4gICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBzdGF0aWMgZGF0YSBmcm9tOiAke2RhdGFVcmx9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGRhdGFVcmwpO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoICR7ZGF0YVVybH06ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgLy8gQXNzdW1pbmcgdGhlIEpTT04gc3RydWN0dXJlIGlzIHsgcG9zdHM6IFsuLi5dIH0gXG4gICAgICAgICAgICAvLyBvciBtYXliZSBqdXN0IGFuIGFycmF5IFsuLi5dIGRpcmVjdGx5PyBBZGp1c3QgYmFzZWQgb24geW91ciBwb3N0cy5qc29uIHN0cnVjdHVyZS5cbiAgICAgICAgICAgIC8vIElmIHBvc3RzLmpzb24gaXMganVzdCBhbiBhcnJheTogcmV0dXJuIGRhdGEgfHwgW107XG4gICAgICAgICAgICByZXR1cm4gZGF0YS5wb3N0cyB8fCBbXTsgLy8gVXNlIHRoaXMgaWYgcG9zdHMuanNvbiBoYXMgeyBcInBvc3RzXCI6IFsuLi5dIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHN0YXRpYyBwb3N0cy5qc29uOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IG9uIGVycm9yXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGEgc2luZ2xlIHBvc3QgYnkgSUQgYnkgZmlsdGVyaW5nIHRoZSBzdGF0aWMgSlNPTiBkYXRhLlxuICogTm90ZTogVGhpcyBsb2FkcyBBTEwgcG9zdHMganVzdCB0byBmaW5kIG9uZSAtIGxlc3MgZWZmaWNpZW50IHRoYW4gYW4gQVBJLlxuICogQHBhcmFtIGlkIC0gVGhlIHBvc3QgSUQgKHN0cmluZyBvciBudW1iZXIpXG4gKi9cbmZ1bmN0aW9uIGZldGNoUG9zdEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgYWxsUG9zdHMgPSB5aWVsZCBmZXRjaEJsb2dQb3N0cygpOyAvLyBGZXRjaCBhbGwgcG9zdHMgZnJvbSBKU09OXG4gICAgICAgICAgICAvLyBFbnN1cmUgY29uc2lzdGVudCBJRCBjb21wYXJpc29uIChlLmcuLCBjb21wYXJpbmcgbnVtYmVycylcbiAgICAgICAgICAgIGNvbnN0IHBvc3RJZE51bWJlciA9IHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyBwYXJzZUludChpZCwgMTApIDogaWQ7XG4gICAgICAgICAgICBpZiAoaXNOYU4ocG9zdElkTnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgcG9zdCBJRCBwcm92aWRlZDogJHtpZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBvc3QgPSBhbGxQb3N0cy5maW5kKHAgPT4gTnVtYmVyKHAuaWQpID09PSBwb3N0SWROdW1iZXIpO1xuICAgICAgICAgICAgaWYgKCFwb3N0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBQb3N0IHdpdGggSUQgJHtpZH0gbm90IGZvdW5kIGluIHN0YXRpYyBkYXRhLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coYEZvdW5kIHBvc3QgJHtpZH0gaW4gc3RhdGljIGRhdGEuYCk7XG4gICAgICAgICAgICByZXR1cm4gcG9zdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHN0YXRpYyBwb3N0ICR7aWR9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyAtLS0gQ29tbWVudCBBUEkgUGxhY2Vob2xkZXJzIChOZWVkIHNlcGFyYXRlIHNlcnZpY2Ugb3IgYmFja2VuZCkgLS0tXG4vLyBUaGVzZSB3b3VsZCBuZWVkIHRvIGJlIGltcGxlbWVudGVkIHVzaW5nIGEgdGhpcmQtcGFydHkgc2VydmljZSAobGlrZSBEaXNxdXMpXG4vLyBvciBhIHNlcnZlcmxlc3MgYmFja2VuZCBpZiB5b3Ugd2FudCBjb21tZW50cyBvbiBhIHN0YXRpYyBzaXRlLlxuZnVuY3Rpb24gZmV0Y2hDb21tZW50c0FwaShwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJDb21tZW50cyBjYW5ub3QgYmUgZmV0Y2hlZCBvbiBzdGF0aWMgc2l0ZSB3aXRob3V0IGV4dGVybmFsIHNlcnZpY2UvYmFja2VuZC5cIik7XG4gICAgICAgIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzdWJtaXRDb21tZW50QXBpKHBvc3RJZCwgbmFtZSwgY29tbWVudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3Qgc3VibWl0IGNvbW1lbnQgb24gc3RhdGljIHNpdGUgd2l0aG91dCBleHRlcm5hbCBzZXJ2aWNlL2JhY2tlbmQuXCIpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb21tZW50IHN1Ym1pc3Npb24gbm90IGF2YWlsYWJsZS5cIik7XG4gICAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZW50cmllcy9jbGllbnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=