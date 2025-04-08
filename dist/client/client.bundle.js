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
            window.location.href = `post.html?id=${postId}`; // NOT /public/post.html
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxHQUFHO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLElBQUk7QUFDakQ7QUFDQTtBQUNBLHNDQUFzQyxJQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxHQUFHO0FBQzNEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7VUN0SUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9hYm91dC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvYmxvZ0NhcmRzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9jb21tZW50cy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvY29udGFjdC50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvZGFya01vZGUudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2hlYWRlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvbmF2aWdhdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvcGFnaW5hdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29udHJvbGxlcnMvYmxvZ0Zyb250ZW5kQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2VudHJpZXMvY2xpZW50LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvbW9kdWxlcy9wb3N0RGV0YWlsLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvc2VydmljZXMvYXBpLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gQWJvdXQgcG9wdXAgZnVuY3Rpb25hbGl0eVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQWJvdXQgPSBpbml0aWFsaXplQWJvdXQ7XG4vKipcbiAqIEluaXRpYWxpemUgdGhlIEFib3V0IHNlY3Rpb24gcG9wdXBcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUFib3V0KCkge1xuICAgIGNvbnN0IGFib3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWJ0bicpO1xuICAgIGNvbnN0IGFib3V0UG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtcG9wdXAnKTtcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0LXBvcHVwIC5jbG9zZS1wb3B1cCcpO1xuICAgIGlmICghYWJvdXRCdG4gfHwgIWFib3V0UG9wdXAgfHwgIWNsb3NlUG9wdXApIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdBYm91dCBwb3B1cCBlbGVtZW50cyBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIE9wZW4gcG9wdXAgd2hlbiBhYm91dCBidXR0b24gaXMgY2xpY2tlZFxuICAgIGFib3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgYW5jaG9yIGJlaGF2aW9yXG4gICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7IC8vIFByZXZlbnQgc2Nyb2xsaW5nIHdoaWxlIHBvcHVwIGlzIG9wZW5cbiAgICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBhYm91dCBsaW5rXG4gICAgICAgIGFib3V0QnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICAgIC8vIENsb3NlIHBvcHVwIHdoZW4gY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBjbG9zZVBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhYm91dFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwb3B1cCBjb250ZW50XG4gICAgYWJvdXRQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gYWJvdXRQb3B1cCkge1xuICAgICAgICAgICAgYWJvdXRQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugb24gZXNjYXBlIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIGFib3V0UG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcbiAgICAgICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAgICAgLy8gUmV2ZXJ0IHRvIGhvbWUgYWN0aXZlIHN0YXRlIHdoZW4gY2xvc2luZyBwb3B1cFxuICAgICAgICAgICAgc2V0RGVmYXVsdEFjdGl2ZUxpbmsoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IHRoZSBkZWZhdWx0IGFjdGl2ZSBsaW5rIHN0YXRlXG4gKi9cbmZ1bmN0aW9uIHNldERlZmF1bHRBY3RpdmVMaW5rKCkge1xuICAgIC8vIEdldCBjdXJyZW50IGhhc2ggb3IgZGVmYXVsdCB0byBob21lXG4gICAgY29uc3QgY3VycmVudEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgbmF2IGxpbmtzXG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IGhhc2ggbGlua1xuICAgIGNvbnN0IGN1cnJlbnRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaGVhZGVyIG5hdiB1bCBsaSBhW2hyZWY9XCIke2N1cnJlbnRIYXNofVwiXWApO1xuICAgIGlmIChjdXJyZW50TGluaykge1xuICAgICAgICBjdXJyZW50TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlQmxvZ0NhcmRFbGVtZW50ID0gY3JlYXRlQmxvZ0NhcmRFbGVtZW50O1xuLyoqXG4gKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnQgZm9yIGEgYmxvZyBjYXJkIGZyb20gcG9zdCBkYXRhIChkaXNwbGF5IG9ubHkgZm9yIGFjdGlvbnMpXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJsb2dDYXJkRWxlbWVudChwb3N0KSB7XG4gICAgY29uc3QgYmxvZ0NhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBibG9nQ2FyZC5jbGFzc05hbWUgPSAnYmxvZy1jYXJkJztcbiAgICBibG9nQ2FyZC5kYXRhc2V0LnBvc3RJZCA9IFN0cmluZyhwb3N0LmlkKTtcbiAgICBibG9nQ2FyZC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgY29uc3QgY29tbWVudENvdW50ID0gcG9zdC5jb21tZW50cyA/IHBvc3QuY29tbWVudHMubGVuZ3RoIDogMDtcbiAgICBjb25zdCBjcmVhdGVkRGF0ZSA9IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KTtcbiAgICBjb25zdCBkYXRlU3RyID0gY3JlYXRlZERhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJ1xuICAgIH0pO1xuICAgIC8vIC0tLSBEeW5hbWljIFVSTCBhbmQgVGV4dCBHZW5lcmF0aW9uIGZvciBTaGFyaW5nIC0tLVxuICAgIC8vIFVzZSBhIHJlbGF0aXZlIHBhdGggZm9yIHNoYXJpbmcgYXMgd2VsbFxuICAgIGNvbnN0IHBvc3RVcmwgPSBgcG9zdC5odG1sP2lkPSR7U3RyaW5nKHBvc3QuaWQpfWA7XG4gICAgY29uc3QgZW5jb2RlZFVybCA9IGVuY29kZVVSSUNvbXBvbmVudChwb3N0VXJsKTsgLy8gTm90ZTogU2hhcmluZyBzZXJ2aWNlcyBtaWdodCByZXNvbHZlIHRoaXMgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgcGFnZVxuICAgIC8vIEFsdGVybmF0aXZlOiBDb25zdHJ1Y3QgZnVsbCBVUkwgY2FyZWZ1bGx5IGlmIG5lZWRlZCBieSBzcGVjaWZpYyBzaGFyaW5nIHNlcnZpY2VzXG4gICAgLy8gY29uc3QgcG9zdEZ1bGxVcmwgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnN1YnN0cmluZygwLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSl9L3Bvc3QuaHRtbD9pZD0ke1N0cmluZyhwb3N0LmlkKX1gO1xuICAgIC8vIGNvbnN0IGVuY29kZWRGdWxsVXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHBvc3RGdWxsVXJsKTtcbiAgICBjb25zdCBzaGFyZVRleHQgPSBgQ2hlY2sgb3V0IHRoaXMgYXJ0aWNsZTogJHtwb3N0LnRpdGxlfWA7XG4gICAgY29uc3QgZW5jb2RlZFNoYXJlVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudChzaGFyZVRleHQpO1xuICAgIC8vIC0tLSBFbmQgRHluYW1pYyBVUkwgR2VuZXJhdGlvbiAtLS1cbiAgICBsZXQgdGFnc0hUTUwgPSAnJztcbiAgICBpZiAocG9zdC50YWdzICYmIHBvc3QudGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRhZ3NIVE1MID0gJzxkaXYgY2xhc3M9XCJwb3N0LXRhZ3NcIj4nICtcbiAgICAgICAgICAgIHBvc3QudGFncy5tYXAodGFnID0+IGA8c3BhbiBjbGFzcz1cInRhZy1iYWRnZVwiIGRhdGEtdGFnPVwiJHt0YWd9XCI+JHt0YWd9PC9zcGFuPmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgIH1cbiAgICBjb25zdCBmYWxsYmFja0ltYWdlVXJsID0gJ2ltYWdlcy9ibG9nX2ltYWdlXzMuanBlZyc7IC8vIFJlbGF0aXZlIHBhdGhcbiAgICBibG9nQ2FyZC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxpbWcgc3JjPVwiJHtwb3N0LmltYWdlVXJsIHx8IGZhbGxiYWNrSW1hZ2VVcmx9XCIgYWx0PVwiJHtwb3N0LnRpdGxlfVwiPiBcbiAgICAgICAgPGRpdiBjbGFzcz1cImJsb2ctY2FyZC1jb250ZW50XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImJsb2ctY2FyZC1kYXRlLWF1dGhvclwiPiR7ZGF0ZVN0cn08L3A+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJibG9nLWNhcmQtdGl0bGVcIj4ke3Bvc3QudGl0bGV9PC9oMz5cbiAgICAgICAgICAgICR7dGFnc0hUTUx9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsaWtlLWJ1dHRvbi1kaXNwbGF5XCIgYXJpYS1sYWJlbD1cIiR7cG9zdC5saWtlcyB8fCAwfSBsaWtlc1wiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1oZWFydFwiPjwvaT4gPHNwYW4gY2xhc3M9XCJsaWtlLWNvdW50XCI+JHtwb3N0Lmxpa2VzIHx8IDB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbW1lbnRzLXRvZ2dsZS1kaXNwbGF5XCIgYXJpYS1sYWJlbD1cIiR7Y29tbWVudENvdW50fSBjb21tZW50c1wiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jb21tZW50XCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbW1lbnQtY291bnRcIj4ke2NvbW1lbnRDb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWwtc2hhcmluZ1wiPlxuICAgICAgICAgICAgICAgICAgICB7LyogVXNlIGVuY29kZWRVcmwgd2hpY2ggaXMgbm93IHJlbGF0aXZlICovfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIHR3aXR0ZXJcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gVHdpdHRlclwiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiIGRhdGEtdGV4dD1cIiR7ZW5jb2RlZFNoYXJlVGV4dH1cIj48aSBjbGFzcz1cImZhYiBmYS10d2l0dGVyXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGZhY2Vib29rXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIEZhY2Vib29rXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2stZlwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBsaW5rZWRpblwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBMaW5rZWRJblwiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiPjxpIGNsYXNzPVwiZmFiIGZhLWxpbmtlZGluLWluXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgdGFnIGNsaWNrc1xuICAgIGNvbnN0IHRhZ0JhZGdlcyA9IGJsb2dDYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWctYmFkZ2UnKTtcbiAgICB0YWdCYWRnZXMuZm9yRWFjaChiYWRnZSA9PiB7XG4gICAgICAgIGJhZGdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCB0aGUgYmxvZyBjYXJkIGNsaWNrXG4gICAgICAgICAgICBjb25zdCB0YWcgPSBldmVudC50YXJnZXQuZGF0YXNldC50YWc7XG4gICAgICAgICAgICBpZiAodGFnKSB7XG4gICAgICAgICAgICAgICAgLy8gVXNlIGNsaWVudC1zaWRlIG5hdmlnYXRpb24gaW5zdGVhZCBvZiBkaXJlY3QgbGlua3NcbiAgICAgICAgICAgICAgICAvLyBUaGlzIHVzZXMgdGhlIGluZGV4Lmh0bWwgcGFnZSB3aXRoIGEgcXVlcnkgcGFyYW1ldGVyIGluc3RlYWQgb2YgYSAvdGFnLyBwYXRoXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgaW5kZXguaHRtbD90YWc9JHtlbmNvZGVVUklDb21wb25lbnQodGFnKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBjb25zdCBzb2NpYWxTaGFyaW5nRGl2ID0gYmxvZ0NhcmQucXVlcnlTZWxlY3RvcignLnNvY2lhbC1zaGFyaW5nJyk7XG4gICAgaWYgKHNvY2lhbFNoYXJpbmdEaXYpIHtcbiAgICAgICAgc29jaWFsU2hhcmluZ0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaGFyZS1idXR0b24nKTtcbiAgICAgICAgICAgIGlmICghYnV0dG9uKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgLy8gRm9yIHNoYXJpbmcsIHdlIG1pZ2h0IG5lZWQgdGhlIEZVTEwgVVJMLiBMZXQncyByZWNvbnN0cnVjdCBpdCBoZXJlLlxuICAgICAgICAgICAgLy8gR2V0IHRoZSBiYXNlIHBhdGggKGUuZy4sICcvYmxvZy8nKVxuICAgICAgICAgICAgY29uc3QgYmFzZVBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyaW5nKDAsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5sYXN0SW5kZXhPZignLycpICsgMSk7XG4gICAgICAgICAgICBjb25zdCByZWxhdGl2ZVVybCA9IGJ1dHRvbi5kYXRhc2V0LnVybCA/IGRlY29kZVVSSUNvbXBvbmVudChidXR0b24uZGF0YXNldC51cmwpIDogYHBvc3QuaHRtbD9pZD0ke3Bvc3QuaWR9YDsgLy8gVXNlIHJlbGF0aXZlIHBhdGggZnJvbSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICAgICAgY29uc3QgZnVsbFVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHtiYXNlUGF0aH0ke3JlbGF0aXZlVXJsfWA7IC8vIENvbnN0cnVjdCBmdWxsIFVSTFxuICAgICAgICAgICAgY29uc3QgZW5jb2RlZEZ1bGxVcmwgPSBlbmNvZGVVUklDb21wb25lbnQoZnVsbFVybCk7IC8vIEVuY29kZSB0aGUgZnVsbCBVUkxcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBidXR0b24uZGF0YXNldC50ZXh0ID8gZGVjb2RlVVJJQ29tcG9uZW50KGJ1dHRvbi5kYXRhc2V0LnRleHQpIDogZG9jdW1lbnQudGl0bGU7XG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KTtcbiAgICAgICAgICAgIGxldCBzaGFyZVdpbmRvd1VybCA9ICcnO1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3R3aXR0ZXInKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtlbmNvZGVkVGV4dH0mdXJsPSR7ZW5jb2RlZEZ1bGxVcmx9YDsgLy8gVXNlIGVuY29kZWRGdWxsVXJsXG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICd0d2l0dGVyLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9MjM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWNlYm9vaycpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtlbmNvZGVkRnVsbFVybH1gOyAvLyBVc2UgZW5jb2RlZEZ1bGxVcmxcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2ZhY2Vib29rLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rZWRpbicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZS8/dXJsPSR7ZW5jb2RlZEZ1bGxVcmx9YDsgLy8gVXNlIGVuY29kZWRGdWxsVXJsXG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oc2hhcmVXaW5kb3dVcmwsICdsaW5rZWRpbi1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTQzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGJsb2dDYXJkO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50cyA9IGluaXRpYWxpemVDb21tZW50cztcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSA9IGluaXRpYWxpemVDb21tZW50c0Z1bmN0aW9uYWxpdHk7XG4vKipcbiAqIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgYmxvZyBwb3N0c1xuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29tbWVudHMoKSB7XG4gICAgc2V0dXBDb21tZW50VG9nZ2xlcygpO1xuICAgIHNldHVwQ29tbWVudEZvcm1zKCk7XG59XG4vKipcbiAqIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eSBmb3IgYSBzcGVjaWZpYyBibG9nIHBvc3QgZWxlbWVudFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29tbWVudHNGdW5jdGlvbmFsaXR5KHBvc3RFbGVtZW50KSB7XG4gICAgY29uc3QgdG9nZ2xlID0gcG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLXRvZ2dsZScpO1xuICAgIGNvbnN0IGZvcm0gPSBwb3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudC1mb3JtJyk7XG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgICBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKTtcbiAgICB9XG4gICAgaWYgKGZvcm0pIHtcbiAgICAgICAgc2V0dXBDb21tZW50Rm9ybShmb3JtKTtcbiAgICB9XG59XG4vKipcbiAqIFNldCB1cCBjb21tZW50IHRvZ2dsZSBidXR0b25zXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudFRvZ2dsZXMoKSB7XG4gICAgY29uc3QgY29tbWVudFRvZ2dsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudHMtdG9nZ2xlJyk7XG4gICAgY29tbWVudFRvZ2dsZXMuZm9yRWFjaCh0b2dnbGUgPT4ge1xuICAgICAgICBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGEgc2luZ2xlIGNvbW1lbnQgdG9nZ2xlIGJ1dHRvblxuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRUb2dnbGUodG9nZ2xlKSB7XG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSB0b2dnbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAgICAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvbW1lbnRzLSR7cG9zdElkfWApO1xuICAgICAgICBpZiAoY29tbWVudHNTZWN0aW9uKSB7XG4gICAgICAgICAgICBjb21tZW50c1NlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgYnV0dG9uIHRleHQgYmFzZWQgb24gc3RhdGVcbiAgICAgICAgICAgIGlmIChjb21tZW50c1NlY3Rpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+IEhpZGUgQ29tbWVudHMgPHNwYW4gY2xhc3M9XCJjb21tZW50cy1jb3VudFwiPiR7KF9hID0gdG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb3VudCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGV4dENvbnRlbnR9PC9zcGFuPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLWNvbW1lbnRcIj48L2k+IENvbW1lbnRzIDxzcGFuIGNsYXNzPVwiY29tbWVudHMtY291bnRcIj4keyhfYiA9IHRvZ2dsZS5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY291bnQnKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRleHRDb250ZW50fTwvc3Bhbj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFNldCB1cCBjb21tZW50IGZvcm1zXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tbWVudEZvcm1zKCkge1xuICAgIGNvbnN0IGNvbW1lbnRGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LWZvcm0nKTtcbiAgICBjb21tZW50Rm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgICAgc2V0dXBDb21tZW50Rm9ybShmb3JtKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGEgc2luZ2xlIGNvbW1lbnQgZm9ybVxuICovXG5mdW5jdGlvbiBzZXR1cENvbW1lbnRGb3JtKGZvcm0pIHtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcG9zdElkID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zdC1pZCcpO1xuICAgICAgICBjb25zdCBjb21tZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb21tZW50cy0ke3Bvc3RJZH0gLmNvbW1lbnRzLWxpc3RgKTtcbiAgICAgICAgaWYgKCFjb21tZW50c0NvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBjb25zdCBjb21tZW50SW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhW25hbWU9XCJjb21tZW50XCJdJyk7XG4gICAgICAgIC8vIENoZWNrIGlmIGlucHV0cyBhcmUgbm90IGVtcHR5XG4gICAgICAgIGlmIChuYW1lSW5wdXQudmFsdWUudHJpbSgpID09PSAnJyB8fCBjb21tZW50SW5wdXQudmFsdWUudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFkZE5ld0NvbW1lbnQocG9zdElkLCBjb21tZW50c0NvbnRhaW5lciwgbmFtZUlucHV0LnZhbHVlLCBjb21tZW50SW5wdXQudmFsdWUpO1xuICAgICAgICAvLyBSZXNldCBmb3JtXG4gICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQWRkIGEgbmV3IGNvbW1lbnQgdG8gdGhlIGNvbW1lbnRzIGxpc3RcbiAqL1xuZnVuY3Rpb24gYWRkTmV3Q29tbWVudChwb3N0SWQsIGNvbW1lbnRzQ29udGFpbmVyLCBuYW1lLCBjb21tZW50VGV4dCkge1xuICAgIC8vIENyZWF0ZSBuZXcgY29tbWVudFxuICAgIGNvbnN0IG5ld0NvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXdDb21tZW50LmNsYXNzTmFtZSA9ICdjb21tZW50JztcbiAgICAvLyBHZXQgY3VycmVudCBkYXRlXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBkYXRlU3RyID0gbm93LnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgZGF5OiAnbnVtZXJpYydcbiAgICB9KTtcbiAgICAvLyBDb21tZW50IEhUTUwgc3RydWN0dXJlXG4gICAgbmV3Q29tbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWF2YXRhclwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlci1jaXJjbGVcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1jb250ZW50XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtYXV0aG9yXCI+JHtuYW1lfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC10ZXh0XCI+JHtjb21tZW50VGV4dH08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtZGF0ZVwiPiR7ZGF0ZVN0cn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgLy8gUmVtb3ZlIFwibm8gY29tbWVudHMgeWV0XCIgbWVzc2FnZSBpZiBpdCBleGlzdHNcbiAgICBjb25zdCBub0NvbW1lbnRzID0gY29tbWVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcignLm5vLWNvbW1lbnRzJyk7XG4gICAgaWYgKG5vQ29tbWVudHMpIHtcbiAgICAgICAgY29tbWVudHNDb250YWluZXIucmVtb3ZlQ2hpbGQobm9Db21tZW50cyk7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgbmV3IGNvbW1lbnQgdG8gdGhlIHRvcCBvZiB0aGUgbGlzdFxuICAgIGNvbW1lbnRzQ29udGFpbmVyLmluc2VydEJlZm9yZShuZXdDb21tZW50LCBjb21tZW50c0NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICAvLyBVcGRhdGUgY29tbWVudCBjb3VudFxuICAgIHVwZGF0ZUNvbW1lbnRDb3VudChwb3N0SWQpO1xufVxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvbW1lbnQgY291bnQgZm9yIGEgcG9zdFxuICovXG5mdW5jdGlvbiB1cGRhdGVDb21tZW50Q291bnQocG9zdElkKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IGNvdW50U3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGJ1dHRvbltkYXRhLXBvc3QtaWQ9XCIke3Bvc3RJZH1cIl0gLmNvbW1lbnRzLWNvdW50YCk7XG4gICAgaWYgKGNvdW50U3Bhbikge1xuICAgICAgICBsZXQgY291bnQgPSBwYXJzZUludCgoKF9hID0gY291bnRTcGFuLnRleHRDb250ZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVwbGFjZSgvWygpXS9nLCAnJykpIHx8ICcwJykgKyAxO1xuICAgICAgICBjb3VudFNwYW4udGV4dENvbnRlbnQgPSBgKCR7Y291bnR9KWA7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb250YWN0IHBvcHVwIGZ1bmN0aW9uYWxpdHlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUNvbnRhY3RGb3JtID0gaW5pdGlhbGl6ZUNvbnRhY3RGb3JtO1xuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBjb250YWN0IGZvcm0gcG9wdXBcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbnRhY3RGb3JtKCkge1xuICAgIGNvbnN0IGNvbnRhY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1idG4nKTtcbiAgICBjb25zdCBjb250YWN0UG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1wb3B1cCcpO1xuICAgIGNvbnN0IGNsb3NlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFjdC1wb3B1cCAuY2xvc2UtcG9wdXAnKTtcbiAgICBpZiAoIWNvbnRhY3RCdXR0b24gfHwgIWNvbnRhY3RQb3B1cCB8fCAhY2xvc2VQb3B1cCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnRhY3QgZm9ybSBlbGVtZW50cyBub3QgZm91bmQgaW4gdGhlIERPTScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIE9wZW4gcG9wdXAgd2hlbiBjb250YWN0IGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgY29udGFjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGFuY2hvciBiZWhhdmlvclxuICAgICAgICBjb250YWN0UG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7IC8vIFByZXZlbnQgc2Nyb2xsaW5nIHdoaWxlIHBvcHVwIGlzIG9wZW5cbiAgICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjb250YWN0IGxpbmtcbiAgICAgICAgY29udGFjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZSBwb3B1cCB3aGVuIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgY2xvc2VQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwb3B1cCBjb250ZW50XG4gICAgY29udGFjdFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBjb250YWN0UG9wdXApIHtcbiAgICAgICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gaG9tZSBhY3RpdmUgc3RhdGUgd2hlbiBjbG9zaW5nIHBvcHVwXG4gICAgICAgICAgICBzZXREZWZhdWx0QWN0aXZlTGluaygpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ2xvc2Ugb24gZXNjYXBlIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICAgICAgY29udGFjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBob21lIGFjdGl2ZSBzdGF0ZSB3aGVuIGNsb3NpbmcgcG9wdXBcbiAgICAgICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBTZXQgdXAgY29udGFjdCBmb3JtIHN1Ym1pc3Npb25cbiAgICBzZXR1cENvbnRhY3RGb3JtU3VibWlzc2lvbigpO1xufVxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IHRoZSBkZWZhdWx0IGFjdGl2ZSBsaW5rIHN0YXRlXG4gKi9cbmZ1bmN0aW9uIHNldERlZmF1bHRBY3RpdmVMaW5rKCkge1xuICAgIC8vIEdldCBjdXJyZW50IGhhc2ggb3IgZGVmYXVsdCB0byBob21lXG4gICAgY29uc3QgY3VycmVudEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSBhbGwgbmF2IGxpbmtzXG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IGhhc2ggbGlua1xuICAgIGNvbnN0IGN1cnJlbnRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaGVhZGVyIG5hdiB1bCBsaSBhW2hyZWY9XCIke2N1cnJlbnRIYXNofVwiXWApO1xuICAgIGlmIChjdXJyZW50TGluaykge1xuICAgICAgICBjdXJyZW50TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG59XG4vKipcbiAqIEhhbmRsZSBjb250YWN0IGZvcm0gc3VibWlzc2lvblxuICovXG5mdW5jdGlvbiBzZXR1cENvbnRhY3RGb3JtU3VibWlzc2lvbigpIHtcbiAgICBjb25zdCBjb250YWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWZvcm0nKTtcbiAgICBpZiAoIWNvbnRhY3RGb3JtKVxuICAgICAgICByZXR1cm47XG4gICAgY29udGFjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjb250YWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBjb25zdCBlbWFpbElucHV0ID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImVtYWlsXCJdJyk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VJbnB1dCA9IGNvbnRhY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhW25hbWU9XCJtZXNzYWdlXCJdJyk7XG4gICAgICAgIC8vIFNpbXBsZSB2YWxpZGF0aW9uXG4gICAgICAgIGlmICghbmFtZUlucHV0LnZhbHVlLnRyaW0oKSB8fCAhZW1haWxJbnB1dC52YWx1ZS50cmltKCkgfHwgIW1lc3NhZ2VJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgIHNob3dDb250YWN0Rm9ybU1lc3NhZ2UoJ1BsZWFzZSBmaWxsIG91dCBhbGwgZmllbGRzJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGVyZSB5b3Ugd291bGQgdHlwaWNhbGx5IHNlbmQgdGhlIGZvcm0gZGF0YSB0byBhIHNlcnZlclxuICAgICAgICAvLyBGb3Igbm93LCB3ZSdsbCBqdXN0IHNpbXVsYXRlIGEgc3VjY2Vzc2Z1bCBzdWJtaXNzaW9uXG4gICAgICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBjb250YWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpO1xuICAgICAgICBjb25zdCBvcmlnaW5hbEJ0blRleHQgPSBzdWJtaXRCdG4uaW5uZXJIVE1MO1xuICAgICAgICBzdWJtaXRCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICBzdWJtaXRCdG4uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic3Bpbm5lclwiPjwvc3Bhbj4gU2VuZGluZy4uLic7XG4gICAgICAgIC8vIFNpbXVsYXRlIHNlcnZlciByZXF1ZXN0XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gUmVzZXQgZm9ybSBhbmQgc2hvdyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgIGNvbnRhY3RGb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBzdWJtaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5pbm5lckhUTUwgPSBvcmlnaW5hbEJ0blRleHQ7XG4gICAgICAgICAgICBzaG93Q29udGFjdEZvcm1NZXNzYWdlKCdNZXNzYWdlIHNlbnQgc3VjY2Vzc2Z1bGx5ISBXZVxcJ2xsIGdldCBiYWNrIHRvIHlvdSBzb29uLicsICdzdWNjZXNzJyk7XG4gICAgICAgICAgICAvLyBDbG9zZSB0aGUgcG9wdXAgYWZ0ZXIgYSBkZWxheVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtcG9wdXAnKTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGFjdFBvcHVwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSwgMTUwMCk7XG4gICAgfSk7XG59XG4vKipcbiAqIERpc3BsYXkgYSBtZXNzYWdlIGluIHRoZSBjb250YWN0IGZvcm1cbiAqL1xuZnVuY3Rpb24gc2hvd0NvbnRhY3RGb3JtTWVzc2FnZShtZXNzYWdlLCB0eXBlKSB7XG4gICAgY29uc3QgY29udGFjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1mb3JtJyk7XG4gICAgaWYgKCFjb250YWN0Rm9ybSlcbiAgICAgICAgcmV0dXJuO1xuICAgIC8vIFJlbW92ZSBhbnkgZXhpc3RpbmcgbWVzc2FnZVxuICAgIGNvbnN0IGV4aXN0aW5nTWVzc2FnZSA9IGNvbnRhY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW1lc3NhZ2UnKTtcbiAgICBpZiAoZXhpc3RpbmdNZXNzYWdlKSB7XG4gICAgICAgIGV4aXN0aW5nTWVzc2FnZS5yZW1vdmUoKTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIGFuZCBhZGQgbmV3IG1lc3NhZ2VcbiAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1lc3NhZ2VFbGVtZW50LmNsYXNzTmFtZSA9IGBmb3JtLW1lc3NhZ2UgJHt0eXBlfWA7XG4gICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIGNvbnRhY3RGb3JtLmFwcGVuZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcbiAgICAvLyBSZW1vdmUgbWVzc2FnZSBhZnRlciBhIGZldyBzZWNvbmRzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnJlbW92ZSgpO1xuICAgIH0sIDUwMDApO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBEYXJrIG1vZGUgZnVuY3Rpb25hbGl0eVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplRGFya01vZGUgPSBpbml0aWFsaXplRGFya01vZGU7XG5leHBvcnRzLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlID0gY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2U7XG4vKipcbiAqIEluaXRpYWxpemUgZGFyayBtb2RlIHRvZ2dsZVxuICogVGhpcyBjcmVhdGVzIGEgZmxvYXRpbmcgZGFyayBtb2RlIHRvZ2dsZSBidXR0b24gYW5kIGFkZHMgaXQgdG8gdGhlIERPTVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplRGFya01vZGUoKSB7XG4gICAgLy8gQ3JlYXRlIGRhcmsgbW9kZSB0b2dnbGUgYnV0dG9uXG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkYXJrTW9kZVRvZ2dsZS5jbGFzc05hbWUgPSAnZGFyay1tb2RlLXRvZ2dsZSc7XG4gICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLW1vb25cIj48L2k+JzsgLy8gTW9vbiBpY29uXG4gICAgZGFya01vZGVUb2dnbGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1RvZ2dsZSBEYXJrIE1vZGUnKTtcbiAgICAvLyBDaGVjayBpZiBkYXJrIG1vZGUgcHJlZmVyZW5jZSBpcyBhbHJlYWR5IHNldCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgY29uc3QgaXNEYXJrTW9kZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrTW9kZScpID09PSAndHJ1ZSc7XG4gICAgaWYgKGlzRGFya01vZGUpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLW1vZGUnKTtcbiAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvbiBmb3IgbGlnaHQgbW9kZVxuICAgIH1cbiAgICAvLyBBZGQgY2xpY2sgZXZlbnQgbGlzdGVuZXJcbiAgICBkYXJrTW9kZVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZURhcmtNb2RlKTtcbiAgICAvLyBBZGQgYnV0dG9uIHRvIHRoZSBET01cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRhcmtNb2RlVG9nZ2xlKTtcbn1cbi8qKlxuICogVG9nZ2xlIGRhcmsgbW9kZSBvbiBhbmQgb2ZmXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZURhcmtNb2RlKCkge1xuICAgIGNvbnN0IGlzRGFya01vZGUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmstbW9kZScpO1xuICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstbW9kZS10b2dnbGUnKTtcbiAgICAvLyBVcGRhdGUgaWNvbiBiYXNlZCBvbiBtb2RlXG4gICAgaWYgKGRhcmtNb2RlVG9nZ2xlKSB7XG4gICAgICAgIGlmIChpc0RhcmtNb2RlKSB7XG4gICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uIGZvciBsaWdodCBtb2RlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nOyAvLyBNb29uIGljb24gZm9yIGRhcmsgbW9kZVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFNhdmUgcHJlZmVyZW5jZSB0byBsb2NhbCBzdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmtNb2RlJywgaXNEYXJrTW9kZS50b1N0cmluZygpKTtcbn1cbi8qKlxuICogQ2hlY2sgaWYgdXNlciBoYXMgc3lzdGVtIGRhcmsgbW9kZSBwcmVmZXJlbmNlXG4gKiBJZiB0aGV5IGRvIGFuZCB3ZSBoYXZlbid0IHNldCBhIHByZWZlcmVuY2UgeWV0LCBhcHBseSBkYXJrIG1vZGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UoKSB7XG4gICAgLy8gT25seSBjaGVjayBpZiB1c2VyIGhhc24ndCBleHBsaWNpdGx5IHNldCBhIHByZWZlcmVuY2VcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcHJlZmVyc0RhcmtNb2RlID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzO1xuICAgICAgICBpZiAocHJlZmVyc0RhcmtNb2RlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICAgICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1tb2RlLXRvZ2dsZScpO1xuICAgICAgICAgICAgaWYgKGRhcmtNb2RlVG9nZ2xlKSB7XG4gICAgICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmtNb2RlJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2NvbXBvbmVudHMvaGVhZGVyLnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlbmRlckhlYWRlciA9IHJlbmRlckhlYWRlcjtcbi8qKlxuICogSGVhZGVyIENvbXBvbmVudFxuICogUmVuZGVycyB0aGUgaGVhZGVyIHNlY3Rpb24gaW50byBhIHRhcmdldCBjb250YWluZXIuXG4gKiBAcGFyYW0gY29udGFpbmVySWQgLSBUaGUgSUQgb2YgdGhlIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBoZWFkZXIgaW50by4gRGVmYXVsdHMgdG8gJ2hlYWRlci1wbGFjZWhvbGRlcicuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckhlYWRlcihjb250YWluZXJJZCA9ICdoZWFkZXItcGxhY2Vob2xkZXInKSB7XG4gICAgLy8gRW5zdXJlIHJ1bm5pbmcgaW4gYSBicm93c2VyIGVudmlyb25tZW50XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBGaW5kIHRoZSBjb250YWluZXIgZWxlbWVudCB3aGVyZSB0aGUgaGVhZGVyIHNob3VsZCBiZSBwbGFjZWRcbiAgICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXJJZCk7XG4gICAgaWYgKCFoZWFkZXJDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgSGVhZGVyIGNvbnRhaW5lciB3aXRoIElEICcke2NvbnRhaW5lcklkfScgbm90IGZvdW5kIGluIHRoZSBET00uYCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVmaW5lIHRoZSBoZWFkZXIgSFRNTCBzdHJ1Y3R1cmUgLSBtYXRjaGluZyBpbmRleC5odG1sXG4gICAgaGVhZGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGhlYWRlciBjbGFzcz1cInNpdGUtaGVhZGVyXCI+XG4gICAgICAgICAgICA8aDE+PGEgaHJlZj1cIi9cIj5CbG9nPC9hPjwvaDE+XG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvXCI+SG9tZTwvYT48L2xpPiBcbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIvI2Fib3V0XCIgaWQ9XCJhYm91dC1idG5cIj5BYm91dDwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIi8jcG9ydGZvbGlvXCI+UG9ydGZvbGlvPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiLyNjb250YWN0XCIgaWQ9XCJjb250YWN0LWJ0blwiPkNvbnRhY3Q8L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZvciBhcnRpY2xlcy4uLlwiIGNsYXNzPVwic2VhcmNoLWJhclwiPiBcbiAgICAgICAgPC9oZWFkZXI+XG4gICAgYDtcbiAgICAvLyBPcHRpb25hbDogQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgaGVhZGVyIGVsZW1lbnRzIGlmIG5lZWRlZCBoZXJlXG4gICAgLy8gRGVmaW5lIHRoZSBzZXR1cFNlYXJjaCBmdW5jdGlvbiB0byBoYW5kbGUgc2VhcmNoIGZ1bmN0aW9uYWxpdHlcbiAgICBmdW5jdGlvbiBzZXR1cFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1iYXInKTtcbiAgICAgICAgaWYgKCFzZWFyY2hCYXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NlYXJjaCBiYXIgZWxlbWVudCBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTZWFyY2hpbmcgZm9yOiAke3F1ZXJ5fWApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0dXBTZWFyY2goKTsgLy8gU2V0dXAgc2VhcmNoIGZ1bmN0aW9uYWxpdHlcbiAgICAvLyBEZWZpbmUgdGhlIHNldHVwUG9wdXBCdXR0b25zIGZ1bmN0aW9uIHRvIGhhbmRsZSBwb3B1cCBmdW5jdGlvbmFsaXR5XG4gICAgZnVuY3Rpb24gc2V0dXBQb3B1cEJ1dHRvbnMoYnV0dG9uSWQsIHBvcHVwSWQpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvcHVwSWQpO1xuICAgICAgICBpZiAoIWJ1dHRvbiB8fCAhcG9wdXApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEJ1dHRvbiB3aXRoIElEICcke2J1dHRvbklkfScgb3IgcG9wdXAgd2l0aCBJRCAnJHtwb3B1cElkfScgbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3Zpc2libGUnKTsgLy8gVG9nZ2xlIHZpc2liaWxpdHkgb2YgdGhlIHBvcHVwXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXR1cFBvcHVwQnV0dG9ucygnYWJvdXQtYnRuJywgJ2Fib3V0LXBvcHVwJyk7IC8vIFNldHVwIHBvcHVwIGZvciBhYm91dCBidXR0b25cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBOYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplTmF2aWdhdGlvbiA9IGluaXRpYWxpemVOYXZpZ2F0aW9uO1xuLyoqXG4gKiBJbml0aWFsaXplIG5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplTmF2aWdhdGlvbigpIHtcbiAgICBzZXRBY3RpdmVOYXZMaW5rKCk7XG4gICAgc2V0dXBOYXZMaW5rcygpO1xufVxuLyoqXG4gKiBTZXQgYWN0aXZlIG5hdmlnYXRpb24gbGluayBiYXNlZCBvbiBjdXJyZW50IFVSTCBvciBwYWdlIHNlY3Rpb25cbiAqL1xuZnVuY3Rpb24gc2V0QWN0aXZlTmF2TGluaygpIHtcbiAgICBjb25zdCBjdXJyZW50UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8ICcjaG9tZSc7XG4gICAgdXBkYXRlQWN0aXZlTmF2TGluayhjdXJyZW50UGF0aCk7XG59XG4vKipcbiAqIFNldHVwIGNsaWNrIGhhbmRsZXJzIGZvciBuYXZpZ2F0aW9uIGxpbmtzXG4gKi9cbmZ1bmN0aW9uIHNldHVwTmF2TGlua3MoKSB7XG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICBpZiAoaHJlZikge1xuICAgICAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoaHJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIEhhbmRsZSBzcGVjaWFsIGNhc2VzIGZvciBwb3B1cCBsaW5rc1xuICAgIGNvbnN0IGFib3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWJ0bicpO1xuICAgIGNvbnN0IGNvbnRhY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1idG4nKTtcbiAgICBpZiAoYWJvdXRCdG4pIHtcbiAgICAgICAgYWJvdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKCcjYWJvdXQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChjb250YWN0QnRuKSB7XG4gICAgICAgIGNvbnRhY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKCcjY29udGFjdCcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgYWN0aXZlIG5hdmlnYXRpb24gbGlua1xuICogQHBhcmFtIHBhdGggVGhlIHBhdGggb3Igc2VjdGlvbiBJRCB0byBhY3RpdmF0ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVBY3RpdmVOYXZMaW5rKHBhdGgpIHtcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIGxpbmtzXG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoZWFkZXIgbmF2IHVsIGxpIGEnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBtYXRjaGluZyBsaW5rXG4gICAgY29uc3QgYWN0aXZlTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlciBuYXYgdWwgbGkgYVtocmVmPVwiJHtwYXRofVwiXWApO1xuICAgIGlmIChhY3RpdmVMaW5rKSB7XG4gICAgICAgIGFjdGl2ZUxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVQYWdpbmF0aW9uID0gaW5pdGlhbGl6ZVBhZ2luYXRpb247XG4vLyBQYWdpbmF0aW9uIGZ1bmN0aW9uYWxpdHlcbmNvbnN0IGNvbW1lbnRzXzEgPSByZXF1aXJlKFwiLi9jb21tZW50c1wiKTtcbi8qKlxuICogSW5pdGlhbGl6ZSBwYWdpbmF0aW9uIGZ1bmN0aW9uYWxpdHkgd2l0aCBMb2FkIE1vcmUgYnV0dG9uXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVQYWdpbmF0aW9uKCkge1xuICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICBjb25zdCBoaWRkZW5Qb3N0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkcycpO1xuICAgIGlmICghbG9hZE1vcmVCdG4gfHwgIWhpZGRlblBvc3RzIHx8ICFibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdQYWdpbmF0aW9uIGVsZW1lbnRzIG5vdCBmb3VuZCBpbiB0aGUgRE9NJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGN1cnJlbnRQYWdlID0gMTtcbiAgICBjb25zdCBwb3N0c1BlclBhZ2UgPSAzO1xuICAgIGNvbnN0IHRvdGFsSGlkZGVuUG9zdHMgPSBoaWRkZW5Qb3N0cy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgLy8gSGlkZSBsb2FkIG1vcmUgYnV0dG9uIGlmIG5vIGhpZGRlbiBwb3N0c1xuICAgIGlmICh0b3RhbEhpZGRlblBvc3RzID09PSAwKSB7XG4gICAgICAgIGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICAgIC8vIFNldCB1cCBsb2FkIG1vcmUgYnV0dG9uIGNsaWNrIGhhbmRsZXJcbiAgICBsb2FkTW9yZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbG9hZE1vcmVQb3N0cyhsb2FkTW9yZUJ0biwgaGlkZGVuUG9zdHMsIGJsb2dDYXJkc0NvbnRhaW5lciwgY3VycmVudFBhZ2UsIHBvc3RzUGVyUGFnZSk7XG4gICAgICAgIGN1cnJlbnRQYWdlKys7XG4gICAgfSk7XG4gICAgLy8gSW5pdGlhbGl6ZSBzY3JvbGwtYmFzZWQgbG9hZGluZyAoaW5maW5pdGUgc2Nyb2xsKVxuICAgIGluaXRpYWxpemVJbmZpbml0ZVNjcm9sbChsb2FkTW9yZUJ0bik7XG59XG4vKipcbiAqIExvYWQgbW9yZSBwb3N0cyB3aGVuIHRoZSBsb2FkIG1vcmUgYnV0dG9uIGlzIGNsaWNrZWRcbiAqL1xuZnVuY3Rpb24gbG9hZE1vcmVQb3N0cyhsb2FkTW9yZUJ0biwgaGlkZGVuUG9zdHMsIGJsb2dDYXJkc0NvbnRhaW5lciwgY3VycmVudFBhZ2UsIHBvc3RzUGVyUGFnZSkge1xuICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgIGxvYWRNb3JlQnRuLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKTtcbiAgICBsb2FkTW9yZUJ0bi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzcGlubmVyXCI+PC9zcGFuPiBMb2FkaW5nLi4uJztcbiAgICAvLyBTaW11bGF0ZSBsb2FkaW5nIGRlbGF5IGZvciBiZXR0ZXIgVVhcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHdoaWNoIHBvc3RzIHRvIGxvYWRcbiAgICAgICAgY29uc3Qgc3RhcnRJZHggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHBvc3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgZW5kSWR4ID0gTWF0aC5taW4oc3RhcnRJZHggKyBwb3N0c1BlclBhZ2UsIGhpZGRlblBvc3RzLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgIGxldCBwb3N0c0xvYWRlZCA9IDA7XG4gICAgICAgIC8vIENsb25lIGFuZCBtb3ZlIHBvc3RzIGZyb20gaGlkZGVuIGNvbnRhaW5lciB0byB2aXNpYmxlIGJsb2cgY2FyZHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3N0c1BlclBhZ2UgJiYgaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoID4gMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwb3N0VG9BZGQgPSBoaWRkZW5Qb3N0cy5jaGlsZHJlblswXTsgLy8gQWx3YXlzIHRha2UgdGhlIGZpcnN0IGVsZW1lbnRcbiAgICAgICAgICAgIGlmIChwb3N0VG9BZGQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZWRQb3N0ID0gcG9zdFRvQWRkLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBjbG9uZWRQb3N0LmNsYXNzTGlzdC5hZGQoJ25ldycpOyAvLyBBZGQgY2xhc3MgZm9yIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9uZWRQb3N0KTtcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0cy5yZW1vdmVDaGlsZChwb3N0VG9BZGQpO1xuICAgICAgICAgICAgICAgIHBvc3RzTG9hZGVkKys7XG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgbmV3IHBvc3RzXG4gICAgICAgICAgICAgICAgKDAsIGNvbW1lbnRzXzEuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSkoY2xvbmVkUG9zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UndmUgbG9hZGVkIGFsbCBwb3N0c1xuICAgICAgICBpZiAoaGlkZGVuUG9zdHMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc2V0IGJ1dHRvbiBzdGF0ZVxuICAgICAgICBsb2FkTW9yZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gICAgICAgIGxvYWRNb3JlQnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPiBMb2FkIE1vcmUgUG9zdHMnO1xuICAgICAgICAvLyBEaXNwYXRjaCBjdXN0b20gZXZlbnQgd2hlbiBwb3N0cyBhcmUgbG9hZGVkXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdwb3N0c0xvYWRlZCcsIHsgZGV0YWlsOiB7IGNvdW50OiBwb3N0c0xvYWRlZCB9IH0pO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9LCA4MDApOyAvLyBTaW11bGF0ZSBuZXR3b3JrIGRlbGF5XG59XG4vKipcbiAqIEluaXRpYWxpemUgaW5maW5pdGUgc2Nyb2xsIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUluZmluaXRlU2Nyb2xsKGxvYWRNb3JlQnRuKSB7XG4gICAgbGV0IHNjcm9sbFRpbWVvdXQ7XG4gICAgbGV0IGlzTG9hZGluZ01vcmVQb3N0cyA9IGZhbHNlO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgIC8vIElmIHRoZSBidXR0b24gaXMgaGlkZGVuIChhbGwgcG9zdHMgbG9hZGVkKSBvciBhbHJlYWR5IGluIGxvYWRpbmcgc3RhdGUsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKGxvYWRNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyB8fFxuICAgICAgICAgICAgbG9hZE1vcmVCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2FkaW5nJykgfHxcbiAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyVGltZW91dChzY3JvbGxUaW1lb3V0KTtcbiAgICAgICAgc2Nyb2xsVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgc2Nyb2xsVG9wLCBzY3JvbGxIZWlnaHQsIGNsaWVudEhlaWdodCB9ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgLy8gV2hlbiB1c2VyIHNjcm9sbHMgdG8gYm90dG9tICh3aXRoIHNvbWUgYnVmZmVyKVxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCA+PSBzY3JvbGxIZWlnaHQgLSAyMDApIHtcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmdNb3JlUG9zdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxvYWRNb3JlQnRuLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgZmxhZyBhZnRlciBhbmltYXRpb24gY29tcGxldGVzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZ01vcmVQb3N0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDApO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVNlYXJjaCA9IGluaXRpYWxpemVTZWFyY2g7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCBibG9nQ2FyZHNfMSA9IHJlcXVpcmUoXCIuL2Jsb2dDYXJkc1wiKTtcbmNvbnN0IGNvbW1lbnRzXzEgPSByZXF1aXJlKFwiLi9jb21tZW50c1wiKTtcbi8qKlxuICogSW5pdGlhbGl6ZSBzZWFyY2ggZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplU2VhcmNoKCkge1xuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInNlYXJjaFwiXScpO1xuICAgIGlmICghc2VhcmNoSW5wdXQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdTZWFyY2ggaW5wdXQgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDeWNsZSB0aHJvdWdoIGRpZmZlcmVudCBwbGFjZWhvbGRlciB0ZXh0c1xuICAgIHNldHVwUGxhY2Vob2xkZXJDeWNsaW5nKHNlYXJjaElucHV0KTtcbiAgICAvLyBTZXQgdXAgc2VhcmNoIGlucHV0IGV2ZW50IGhhbmRsZXJcbiAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgICAgIGhhbmRsZVNlYXJjaChlLnRhcmdldCk7XG4gICAgfSk7XG59XG4vKipcbiAqIEN5Y2xlIHRocm91Z2ggZGlmZmVyZW50IHBsYWNlaG9sZGVyIHRleHRzIGZvciB0aGUgc2VhcmNoIGlucHV0XG4gKi9cbmZ1bmN0aW9uIHNldHVwUGxhY2Vob2xkZXJDeWNsaW5nKHNlYXJjaElucHV0KSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXJzID0gW1xuICAgICAgICBcIlNlYXJjaCBmb3IgYXJ0aWNsZXMuLi5cIixcbiAgICAgICAgXCJTZWFyY2ggZm9yIHRvcGljcy4uLlwiLFxuICAgICAgICBcIlNlYXJjaCBmb3IgYXV0aG9ycy4uLlwiXG4gICAgXTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgc2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcnNbaW5kZXhdO1xuICAgICAgICBpbmRleCA9IChpbmRleCArIDEpICUgcGxhY2Vob2xkZXJzLmxlbmd0aDtcbiAgICB9LCAzMDAwKTtcbn1cbi8qKlxuICogSGFuZGxlIHNlYXJjaCBpbnB1dCBhbmQgZmlsdGVyIGJsb2cgcG9zdHNcbiAqL1xuZnVuY3Rpb24gaGFuZGxlU2VhcmNoKHNlYXJjaElucHV0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoc2VhcmNoVGVybS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAvLyBJZiBzZWFyY2ggaXMgY2xlYXJlZCwgcmVsb2FkIGFsbCBwb3N0c1xuICAgICAgICAgICAgaWYgKHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gRGlzcGF0Y2ggZXZlbnQgdG8gcmVsb2FkIHBvc3RzXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JlbG9hZFBvc3RzJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jYXJkcycpO1xuICAgICAgICBpZiAoIWJsb2dDYXJkc0NvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+JztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZldGNoIGFsbCBwb3N0cyBhbmQgZmlsdGVyIGNsaWVudC1zaWRlXG4gICAgICAgICAgICAvLyBJbiBhIHJlYWwgYXBwLCB5b3UnZCBpbXBsZW1lbnQgc2VydmVyLXNpZGUgc2VhcmNoXG4gICAgICAgICAgICBjb25zdCBwb3N0cyA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaEJsb2dQb3N0cykoKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkUG9zdHMgPSBmaWx0ZXJQb3N0cyhwb3N0cywgc2VhcmNoVGVybSk7XG4gICAgICAgICAgICAvLyBDbGVhciBjb250YWluZXJcbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGlmIChmaWx0ZXJlZFBvc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIFNob3cgZW1wdHkgc2VhcmNoIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTZWFyY2hSZXN1bHRzKGJsb2dDYXJkc0NvbnRhaW5lciwgc2VhcmNoVGVybSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGlzcGxheSBmaWx0ZXJlZCBwb3N0c1xuICAgICAgICAgICAgZGlzcGxheUZpbHRlcmVkUG9zdHMoZmlsdGVyZWRQb3N0cywgYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlYXJjaGluZyBwb3N0czonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93U2VhcmNoRXJyb3IoYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBGaWx0ZXIgcG9zdHMgYmFzZWQgb24gc2VhcmNoIHRlcm1cbiAqL1xuZnVuY3Rpb24gZmlsdGVyUG9zdHMocG9zdHMsIHNlYXJjaFRlcm0pIHtcbiAgICByZXR1cm4gcG9zdHMuZmlsdGVyKHBvc3QgPT4gcG9zdC50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pIHx8XG4gICAgICAgIHBvc3QuY29udGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pIHx8XG4gICAgICAgIHBvc3QuYXV0aG9yLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkgfHxcbiAgICAgICAgKHBvc3QudGFncyAmJiBwb3N0LnRhZ3Muc29tZSh0YWcgPT4gdGFnLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybSkpKSk7XG59XG4vKipcbiAqIERpc3BsYXkgZmlsdGVyZWQgcG9zdHMgaW4gdGhlIGJsb2cgY29udGFpbmVyXG4gKi9cbmZ1bmN0aW9uIGRpc3BsYXlGaWx0ZXJlZFBvc3RzKGZpbHRlcmVkUG9zdHMsIGNvbnRhaW5lcikge1xuICAgIGZpbHRlcmVkUG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tZW50cyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgZmlsdGVyZWQgcG9zdHNcbiAgICAgICAgKDAsIGNvbW1lbnRzXzEuaW5pdGlhbGl6ZUNvbW1lbnRzRnVuY3Rpb25hbGl0eSkoYmxvZ0NhcmQpO1xuICAgIH0pO1xuICAgIC8vIERpc3BhdGNoIGN1c3RvbSBldmVudCB3aGVuIHNlYXJjaCByZXN1bHRzIGFyZSBkaXNwbGF5ZWRcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc2VhcmNoUmVzdWx0c0Rpc3BsYXllZCcsIHtcbiAgICAgICAgZGV0YWlsOiB7IGNvdW50OiBmaWx0ZXJlZFBvc3RzLmxlbmd0aCB9XG4gICAgfSkpO1xufVxuLyoqXG4gKiBEaXNwbGF5IGVtcHR5IHNlYXJjaCByZXN1bHRzIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gc2hvd0VtcHR5U2VhcmNoUmVzdWx0cyhjb250YWluZXIsIHNlYXJjaFRlcm0pIHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktc2VhcmNoXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zZWFyY2ggZmEtM3hcIj48L2k+XG4gICAgICAgICAgICA8aDM+Tm8gcmVzdWx0cyBmb3VuZDwvaDM+XG4gICAgICAgICAgICA8cD5ObyBwb3N0cyBtYXRjaCB5b3VyIHNlYXJjaCBmb3IgXCIke3NlYXJjaFRlcm19XCI8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4vKipcbiAqIERpc3BsYXkgc2VhcmNoIGVycm9yIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gc2hvd1NlYXJjaEVycm9yKGNvbnRhaW5lcikge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci1zdGF0ZVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZmEtM3hcIj48L2k+XG4gICAgICAgICAgICA8aDM+U2VhcmNoIGZhaWxlZDwvaDM+XG4gICAgICAgICAgICA8cD5GYWlsZWQgdG8gc2VhcmNoIGJsb2cgcG9zdHMuIFBsZWFzZSB0cnkgYWdhaW4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCA9IGluaXRpYWxpemVCbG9nRnJvbnRlbmQ7XG4vKipcbiAqIEJsb2cgRnJvbnRlbmQgQ29udHJvbGxlclxuICogQ2xpZW50LXNpZGUgY29udHJvbGxlciB0aGF0IGhhbmRsZXMgYWxsIGZyb250ZW5kIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBibG9nLlxuICogTWFuYWdlcyBVSSBpbml0aWFsaXphdGlvbiwgcG9zdCByZW5kZXJpbmcsIGFuZCB1c2VyIGludGVyYWN0aW9ucy5cbiAqL1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3QgYmxvZ0NhcmRzXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9ibG9nQ2FyZHNcIik7XG5jb25zdCBjb21tZW50c18xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvY29tbWVudHNcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG5jb25zdCBjb250YWN0XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9jb250YWN0XCIpO1xuY29uc3QgcGFnaW5hdGlvbl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvcGFnaW5hdGlvblwiKTtcbmNvbnN0IHNlYXJjaF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvc2VhcmNoXCIpO1xuY29uc3QgYWJvdXRfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Fib3V0XCIpO1xuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2aWdhdGlvblwiKTtcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgYmxvZyBmdW5jdGlvbmFsaXR5XG4gKiBTZXRzIHVwIGFsbCBVSSBjb21wb25lbnRzIGFuZCBpbml0aWFsaXplcyB0aGUgYmxvZyBwb3N0cyBkaXNwbGF5XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVCbG9nRnJvbnRlbmQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHN5c3RlbSBkYXJrIG1vZGUgcHJlZmVyZW5jZSBmaXJzdFxuICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBuYXZpZ2F0aW9uIGZpcnN0IHRvIGVuc3VyZSBhY3RpdmUgc3RhdGVzIGFyZSBzZXRcbiAgICAgICAgKDAsIG5hdmlnYXRpb25fMS5pbml0aWFsaXplTmF2aWdhdGlvbikoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBhbGwgVUkgY29tcG9uZW50c1xuICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgICgwLCBjb250YWN0XzEuaW5pdGlhbGl6ZUNvbnRhY3RGb3JtKSgpO1xuICAgICAgICAoMCwgYWJvdXRfMS5pbml0aWFsaXplQWJvdXQpKCk7IC8vIEluaXRpYWxpemUgQWJvdXQgcG9wdXBcbiAgICAgICAgKDAsIHNlYXJjaF8xLmluaXRpYWxpemVTZWFyY2gpKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGJsb2cgcG9zdHNcbiAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgcGFnaW5hdGlvbiBhZnRlciBwb3N0cyBhcmUgbG9hZGVkXG4gICAgICAgICgwLCBwYWdpbmF0aW9uXzEuaW5pdGlhbGl6ZVBhZ2luYXRpb24pKCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgY29tbWVudHMgZnVuY3Rpb25hbGl0eVxuICAgICAgICAoMCwgY29tbWVudHNfMS5pbml0aWFsaXplQ29tbWVudHMpKCk7XG4gICAgICAgIC8vIFNldCB1cCBldmVudCBkZWxlZ2F0aW9uIGZvciBibG9nIGNhcmRzXG4gICAgICAgIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpO1xuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHJlbG9hZGluZyBwb3N0cyAodXNlZCBieSBzZWFyY2gpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlbG9hZFBvc3RzJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgaW5pdGlhbGl6ZVBvc3RzKCk7XG4gICAgICAgICAgICAoMCwgcGFnaW5hdGlvbl8xLmluaXRpYWxpemVQYWdpbmF0aW9uKSgpO1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIGV2ZW50IGRlbGVnYXRpb24gaXMgc2V0IHVwIGFnYWluIGFmdGVyIHJlbG9hZGluZyBwb3N0c1xuICAgICAgICAgICAgc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbi8qKlxuICogU2V0IHVwIGV2ZW50IGRlbGVnYXRpb24gZm9yIGJsb2cgY2FyZHMgY29udGFpbmVyXG4gKiBNb3JlIGVmZmljaWVudCB0aGFuIGF0dGFjaGluZyBldmVudCBsaXN0ZW5lcnMgdG8gZWFjaCBjYXJkXG4gKi9cbmZ1bmN0aW9uIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpIHtcbiAgICAvLyBHZXQgYm90aCBwcmltYXJ5IGFuZCBoaWRkZW4gYmxvZyBjb250YWluZXJzXG4gICAgY29uc3QgYmxvZ0NvbnRhaW5lcnMgPSBbXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNhcmRzJyksXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKVxuICAgIF07XG4gICAgLy8gQXBwbHkgZGVsZWdhdGlvbiB0byBlYWNoIGNvbnRhaW5lclxuICAgIGJsb2dDb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgaWYgKCFjb250YWluZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIFJlbW92ZSBleGlzdGluZyBldmVudCBsaXN0ZW5lciBpZiBpdCBleGlzdHMgKHRvIHByZXZlbnQgZHVwbGljYXRlcylcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQmxvZ0NhcmRDbGljayk7XG4gICAgICAgIC8vIEFkZCB0aGUgbmV3IGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spO1xuICAgIH0pO1xufVxuLyoqXG4gKiBIYW5kbGUgY2xpY2sgZXZlbnRzIG9uIGJsb2cgY2FyZHMgdXNpbmcgZXZlbnQgZGVsZWdhdGlvblxuICovXG5mdW5jdGlvbiBoYW5kbGVCbG9nQ2FyZENsaWNrKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIC8vIEZpbmQgdGhlIGNsb3Nlc3QgYmxvZyBjYXJkIHRvIHRoZSBjbGlja2VkIGVsZW1lbnRcbiAgICBjb25zdCBjYXJkID0gdGFyZ2V0LmNsb3Nlc3QoJy5ibG9nLWNhcmQnKTtcbiAgICBpZiAoY2FyZCkge1xuICAgICAgICAvLyBEb24ndCBuYXZpZ2F0ZSBpZiBjbGlja2luZyBvbiBidXR0b25zLCBsaW5rcywgb3IgaWNvbnNcbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCdidXR0b24nKSB8fFxuICAgICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJ2EnKSB8fFxuICAgICAgICAgICAgdGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2knKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IHRoZSBwb3N0IElEIGZyb20gdGhlIGNhcmQncyBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICBjb25zdCBwb3N0SWQgPSBjYXJkLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3N0LWlkJyk7XG4gICAgICAgIGlmIChwb3N0SWQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYHBvc3QuaHRtbD9pZD0ke3Bvc3RJZH1gOyAvLyBOT1QgL3B1YmxpYy9wb3N0Lmh0bWxcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBibG9nIHBvc3RzIGZyb20gQVBJXG4gKiBGZXRjaGVzIHBvc3RzIGZyb20gdGhlIEFQSSBhbmQgcmVuZGVycyB0aGVtIGluIHRoZSBVSVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgYmxvZ0NhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY2FyZHMnKTtcbiAgICAgICAgaWYgKCFibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQmxvZyBjYXJkcyBjb250YWluZXIgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQ2xlYXIgbG9hZGluZyBwbGFjZWhvbGRlciBvciBleGlzdGluZyBjb250ZW50XG4gICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj48L2Rpdj4nO1xuICAgICAgICAgICAgLy8gRmV0Y2ggcG9zdHMgZnJvbSBBUElcbiAgICAgICAgICAgIGNvbnN0IHBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgaWYgKHBvc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIFNob3cgZW1wdHkgc3RhdGVcbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTdGF0ZShibG9nQ2FyZHNDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENsZWFyIGNvbnRhaW5lclxuICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgLy8gRGlzcGxheSBmaXJzdCAzIHBvc3RzXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5UG9zdHMgPSBwb3N0cy5zbGljZSgwLCAzKTtcbiAgICAgICAgICAgIGNvbnN0IGhpZGRlblBvc3RzID0gcG9zdHMuc2xpY2UoMyk7XG4gICAgICAgICAgICAvLyBBZGQgdmlzaWJsZSBwb3N0cyB0byBtYWluIGNvbnRhaW5lclxuICAgICAgICAgICAgZGlzcGxheVBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgICAgICAgICBibG9nQ2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvZ0NhcmQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBBZGQgaGlkZGVuIHBvc3RzIHRvIGhpZGRlbiBjb250YWluZXJcbiAgICAgICAgICAgIGNvbnN0IGhpZGRlblBvc3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbi1wb3N0cycpO1xuICAgICAgICAgICAgaWYgKGhpZGRlblBvc3RzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgaGlkZGVuUG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxvZ0NhcmQgPSAoMCwgYmxvZ0NhcmRzXzEuY3JlYXRlQmxvZ0NhcmRFbGVtZW50KShwb3N0KTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuUG9zdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvZ0NhcmQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlIGxvYWQgbW9yZSBidXR0b24gdmlzaWJpbGl0eVxuICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgICAgICAgICAgaWYgKGxvYWRNb3JlQnRuKSB7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9IGhpZGRlblBvc3RzLmxlbmd0aCA+IDAgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW5pdGlhbGl6aW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvclN0YXRlKGJsb2dDYXJkc0NvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogU2hvdyBlbXB0eSBzdGF0ZSB3aGVuIG5vIHBvc3RzIGFyZSBhdmFpbGFibGVcbiAqIENyZWF0ZXMgYW5kIGFwcGVuZHMgRE9NIGVsZW1lbnRzIGluc3RlYWQgb2YgdXNpbmcgaW5uZXJIVE1MIGZvciBiZXR0ZXIgbWFpbnRhaW5hYmlsaXR5XG4gKi9cbmZ1bmN0aW9uIHNob3dFbXB0eVN0YXRlKGNvbnRhaW5lcikge1xuICAgIC8vIENsZWFyIHRoZSBjb250YWluZXIgZmlyc3RcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgLy8gQ3JlYXRlIHRoZSBlbXB0eSBzdGF0ZSBjb250YWluZXJcbiAgICBjb25zdCBlbXB0eVN0YXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW1wdHlTdGF0ZURpdi5jbGFzc05hbWUgPSAnZW1wdHktc3RhdGUnO1xuICAgIC8vIENyZWF0ZSBhbmQgYWRkIHRoZSBpY29uXG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBpY29uLmNsYXNzTmFtZSA9ICdmYXMgZmEtZmlsZS1hbHQgZmEtM3gnO1xuICAgIGVtcHR5U3RhdGVEaXYuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgLy8gQ3JlYXRlIGFuZCBhZGQgdGhlIGhlYWRpbmdcbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBoZWFkaW5nLnRleHRDb250ZW50ID0gJ05vIHBvc3RzIGZvdW5kJztcbiAgICBlbXB0eVN0YXRlRGl2LmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuICAgIC8vIENyZWF0ZSBhbmQgYWRkIHRoZSBwYXJhZ3JhcGhcbiAgICBjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgcGFyYWdyYXBoLnRleHRDb250ZW50ID0gJ0JlIHRoZSBmaXJzdCB0byBjcmVhdGUgYSBibG9nIHBvc3QhJztcbiAgICBlbXB0eVN0YXRlRGl2LmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG4gICAgLy8gQXBwZW5kIHRoZSBlbXB0eSBzdGF0ZSB0byB0aGUgY29udGFpbmVyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVtcHR5U3RhdGVEaXYpO1xufVxuLyoqXG4gKiBTaG93IGVycm9yIHN0YXRlIHdoZW4gcG9zdHMgY291bGRuJ3QgYmUgbG9hZGVkXG4gKiBDcmVhdGVzIGFuZCBhcHBlbmRzIERPTSBlbGVtZW50cyBpbnN0ZWFkIG9mIHVzaW5nIGlubmVySFRNTCBmb3IgYmV0dGVyIG1haW50YWluYWJpbGl0eVxuICovXG5mdW5jdGlvbiBzaG93RXJyb3JTdGF0ZShjb250YWluZXIpIHtcbiAgICAvLyBDbGVhciB0aGUgY29udGFpbmVyIGZpcnN0XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIC8vIENyZWF0ZSB0aGUgZXJyb3Igc3RhdGUgY29udGFpbmVyXG4gICAgY29uc3QgZXJyb3JTdGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVycm9yU3RhdGVEaXYuY2xhc3NOYW1lID0gJ2Vycm9yLXN0YXRlJztcbiAgICAvLyBDcmVhdGUgYW5kIGFkZCB0aGUgaWNvblxuICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgaWNvbi5jbGFzc05hbWUgPSAnZmFzIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGZhLTN4JztcbiAgICBlcnJvclN0YXRlRGl2LmFwcGVuZENoaWxkKGljb24pO1xuICAgIC8vIENyZWF0ZSBhbmQgYWRkIHRoZSBoZWFkaW5nXG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgaGVhZGluZy50ZXh0Q29udGVudCA9ICdTb21ldGhpbmcgd2VudCB3cm9uZyc7XG4gICAgZXJyb3JTdGF0ZURpdi5hcHBlbmRDaGlsZChoZWFkaW5nKTtcbiAgICAvLyBDcmVhdGUgYW5kIGFkZCB0aGUgcGFyYWdyYXBoXG4gICAgY29uc3QgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHBhcmFncmFwaC50ZXh0Q29udGVudCA9ICdGYWlsZWQgdG8gbG9hZCBibG9nIHBvc3RzLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLic7XG4gICAgZXJyb3JTdGF0ZURpdi5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuICAgIC8vIEFwcGVuZCB0aGUgZXJyb3Igc3RhdGUgdG8gdGhlIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlcnJvclN0YXRlRGl2KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2VudHJpZXMvY2xpZW50LnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIEltcG9ydHMgcmVtYWluIHRoZSBzYW1lLi4uXG5jb25zdCBibG9nRnJvbnRlbmRDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvYmxvZ0Zyb250ZW5kQ29udHJvbGxlclwiKTtcbmNvbnN0IHBvc3REZXRhaWxfMSA9IHJlcXVpcmUoXCIuLi9tb2R1bGVzL3Bvc3REZXRhaWxcIik7XG5jb25zdCBoZWFkZXJfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2hlYWRlclwiKTtcbmNvbnN0IGRhcmtNb2RlXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXJrTW9kZVwiKTtcbi8qKlxuICogQ2xpZW50LXNpZGUgZW50cnkgcG9pbnQgaW5pdGlhbGl6ZXIuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVDbGllbnQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWVudCBpbml0aWFsaXppbmcuLi4nKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBjb21tb24gZWxlbWVudHMgZmlyc3RcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKSgpO1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuaW5pdGlhbGl6ZURhcmtNb2RlKSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0RhcmsgbW9kZSBpbml0aWFsaXplZCBnbG9iYWxseS4nKTtcbiAgICAgICAgICAgIC8vIFJlbmRlciBIZWFkZXIgb25seSBpZiBwbGFjZWhvbGRlciBleGlzdHNcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyLXBsYWNlaG9sZGVyJykpIHtcbiAgICAgICAgICAgICAgICAoMCwgaGVhZGVyXzEucmVuZGVySGVhZGVyKSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWFkZXIgcmVuZGVyZWQgZ2xvYmFsbHkuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0hlYWRlciBwbGFjZWhvbGRlciBub3QgZm91bmQgb24gdGhpcyBwYWdlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBjb21tb24gZWxlbWVudHM6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYWdlLXNwZWNpZmljIGxvZ2ljXG4gICAgICAgIGNvbnN0IHBhZ2VUeXBlID0gZG9jdW1lbnQuYm9keS5kYXRhc2V0LnBhZ2U7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICAvLyBHZXQgdGhlIGJhc2UgbmFtZSBvZiB0aGUgZmlsZS9wYXRoLCByZW1vdmluZyB0cmFpbGluZyBzbGFzaCBpZiBwcmVzZW50XG4gICAgICAgIGNvbnN0IHBhdGhFbmQgPSBjdXJyZW50UGFnZS5lbmRzV2l0aCgnLycpID8gY3VycmVudFBhZ2Uuc2xpY2UoMCwgLTEpLnNwbGl0KCcvJykucG9wKCkgOiBjdXJyZW50UGFnZS5zcGxpdCgnLycpLnBvcCgpO1xuICAgICAgICBjb25zdCBpc1Jvb3RPckluZGV4ID0gY3VycmVudFBhZ2UuZW5kc1dpdGgoJy8nKSB8fCBjdXJyZW50UGFnZS5lbmRzV2l0aCgnL2luZGV4Lmh0bWwnKTsgLy8gQ2hlY2sgaWYgaXQncyB0aGUgcm9vdCBvZiB0aGUgZGVwbG95bWVudFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERldGVjdGVkIHBhZ2VUeXBlOiAke3BhZ2VUeXBlfSwgY3VycmVudFBhZ2U6ICR7Y3VycmVudFBhZ2V9LCBwYXRoRW5kOiAke3BhdGhFbmR9LCBpc1Jvb3RPckluZGV4OiAke2lzUm9vdE9ySW5kZXh9YCk7XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgTWFpbiBQYWdlICh1c2luZyBkYXRhLXBhZ2Ugb3IgcGF0aCBlbmRpbmcgaW4gLyBvciAvaW5kZXguaHRtbClcbiAgICAgICAgICAgIGlmIChwYWdlVHlwZSA9PT0gJ21haW4nIHx8ICghcGFnZVR5cGUgJiYgaXNSb290T3JJbmRleCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIG1haW4gYmxvZyBwYWdlIGxvZ2ljLi4uJyk7XG4gICAgICAgICAgICAgICAgeWllbGQgKDAsIGJsb2dGcm9udGVuZENvbnRyb2xsZXJfMS5pbml0aWFsaXplQmxvZ0Zyb250ZW5kKSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNYWluIGJsb2cgcGFnZSBsb2dpYyBpbml0aWFsaXplZC4nKTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgUG9zdCBEZXRhaWwgUGFnZSAodXNpbmcgZGF0YS1wYWdlIG9yIHBhdGggZW5kaW5nIGluIC9wb3N0Lmh0bWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ3Bvc3QnIHx8ICghcGFnZVR5cGUgJiYgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9wb3N0Lmh0bWwnKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIHBvc3QgZGV0YWlsIHBhZ2UgbG9naWMgKGZyb20gbW9kdWxlKS4uLicpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBwb3N0RGV0YWlsXzEuaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMpKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGV0YWlsIHBhZ2UgbG9naWMgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIEFkbWluIFBhZ2UgKHVzaW5nIGRhdGEtcGFnZSBvciBwYXRoIGVuZGluZyBpbiAvYWRtaW4uaHRtbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhZ2VUeXBlID09PSAnYWRtaW4nIHx8ICghcGFnZVR5cGUgJiYgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9hZG1pbi5odG1sJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FkbWluIHBhZ2UgZGV0ZWN0ZWQgYnkgY2xpZW50LnRzIC0gbm8gYWN0aW9uIHRha2VuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVua25vd24gcGFnZSB0eXBlICgnJHtwYWdlVHlwZX0nKSBvciBwYXRoICgnJHtjdXJyZW50UGFnZX0nKS4gTm8gc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbmVlZGVkIGZyb20gY2xpZW50LnRzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHBhZ2Utc3BlY2lmaWMgY2xpZW50IGluaXRpYWxpemF0aW9uOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gRE9NQ29udGVudExvYWRlZCBsaXN0ZW5lciByZW1haW5zIHRoZSBzYW1lLi4uXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRpYWxpemVDbGllbnQpO1xufVxuZWxzZSB7XG4gICAgaW5pdGlhbGl6ZUNsaWVudCgpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvbW9kdWxlcy9wb3N0RGV0YWlsLnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uID0gZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uO1xuZXhwb3J0cy5hZGRQb3N0VG9TZXNzaW9uTGlrZXMgPSBhZGRQb3N0VG9TZXNzaW9uTGlrZXM7XG5leHBvcnRzLnJlbW92ZVBvc3RGcm9tU2Vzc2lvbkxpa2VzID0gcmVtb3ZlUG9zdEZyb21TZXNzaW9uTGlrZXM7XG5leHBvcnRzLmluaXRpYWxpemVQb3N0RGV0YWlsUGFnZUxvZ2ljID0gaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWM7XG5leHBvcnRzLmxvYWRQb3N0Q29udGVudCA9IGxvYWRQb3N0Q29udGVudDtcbmV4cG9ydHMudXBkYXRlUG9zdFVJID0gdXBkYXRlUG9zdFVJO1xuZXhwb3J0cy51cGRhdGVQYWdlTWV0YWRhdGEgPSB1cGRhdGVQYWdlTWV0YWRhdGE7XG5leHBvcnRzLmluaXRpYWxpemVTb2NpYWxTaGFyaW5nID0gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmc7XG5leHBvcnRzLnNob3dFcnJvck1lc3NhZ2UgPSBzaG93RXJyb3JNZXNzYWdlO1xuZXhwb3J0cy5pbml0aWFsaXplTGlrZUJ1dHRvbiA9IGluaXRpYWxpemVMaWtlQnV0dG9uO1xuZXhwb3J0cy5sb2FkQ29tbWVudHMgPSBsb2FkQ29tbWVudHM7XG5leHBvcnRzLmluaXRpYWxpemVDb21tZW50Rm9ybSA9IGluaXRpYWxpemVDb21tZW50Rm9ybTtcbi8vIC0tLSBJbXBvcnRzIC0tLVxuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3QgaGVhZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vLyBQbGFjZWhvbGRlciBBUEkgZnVuY3Rpb25zIGZvciBjb21tZW50cyAocmVwbGFjZSB3aXRoIGFjdHVhbCBpbXBsZW1lbnRhdGlvbilcbmNvbnN0IGZldGNoQ29tbWVudHNBcGkgPSAoaWQpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnNvbGUubG9nKGBBUEk6IEZldGNoaW5nIGNvbW1lbnRzIGZvciAke2lkfWApO1xuICAgIHJldHVybiBbXG4gICAgICAgIHsgaWQ6IDEsIG5hbWU6ICdBbGljZScsIGNvbW1lbnQ6ICdHcmVhdCBwb3N0IScsIGNyZWF0ZWRBdDogbmV3IERhdGUoKSB9LFxuICAgICAgICB7IGlkOiAyLCBuYW1lOiAnQm9iJywgY29tbWVudDogJ1ZlcnkgaW5mb3JtYXRpdmUuJywgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpIH1cbiAgICBdO1xufSk7XG5jb25zdCBzdWJtaXRDb21tZW50QXBpID0gKGlkLCBuYW1lLCBjb21tZW50KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zb2xlLmxvZyhgQVBJOiBTdWJtaXR0aW5nIGNvbW1lbnQgZm9yICR7aWR9YCwgeyBuYW1lLCBjb21tZW50IH0pO1xuICAgIHJldHVybiB7IGlkOiBEYXRlLm5vdygpLCBuYW1lLCBjb21tZW50LCBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkgfTtcbn0pO1xuLy8gLS0tIFNlc3Npb24gU3RvcmFnZSBIZWxwZXIgRnVuY3Rpb25zIGZvciBMaWtlcyAtLS1cbmNvbnN0IExJS0VEX1BPU1RTX1NFU1NJT05fS0VZID0gJ2xpa2VkUG9zdHMnO1xuLyoqIEdldHMgdGhlIHNldCBvZiBsaWtlZCBwb3N0IElEcyBmcm9tIHNlc3Npb25TdG9yYWdlLiAqL1xuZnVuY3Rpb24gZ2V0TGlrZWRQb3N0c0Zyb21TZXNzaW9uKCkge1xuICAgIGNvbnN0IHN0b3JlZExpa2VzID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShMSUtFRF9QT1NUU19TRVNTSU9OX0tFWSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbGlrZWRJZHMgPSBzdG9yZWRMaWtlcyA/IEpTT04ucGFyc2Uoc3RvcmVkTGlrZXMpIDogW107XG4gICAgICAgIHJldHVybiBuZXcgU2V0KEFycmF5LmlzQXJyYXkobGlrZWRJZHMpID8gbGlrZWRJZHMgOiBbXSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGxpa2VkIHBvc3RzIGZyb20gc2Vzc2lvblN0b3JhZ2U6XCIsIGUpO1xuICAgICAgICByZXR1cm4gbmV3IFNldCgpO1xuICAgIH1cbn1cbi8qKiBBZGRzIGEgcG9zdCBJRCB0byB0aGUgbGlrZWQgcG9zdHMgaW4gc2Vzc2lvblN0b3JhZ2UuICovXG5mdW5jdGlvbiBhZGRQb3N0VG9TZXNzaW9uTGlrZXMocG9zdElkKSB7XG4gICAgY29uc3QgbGlrZWRQb3N0c1NldCA9IGdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbigpO1xuICAgIGxpa2VkUG9zdHNTZXQuYWRkKHBvc3RJZCk7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShMSUtFRF9QT1NUU19TRVNTSU9OX0tFWSwgSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbShsaWtlZFBvc3RzU2V0KSkpO1xuICAgIGNvbnNvbGUubG9nKCdBZGRlZCBwb3N0IHRvIHNlc3Npb24gbGlrZXM6JywgcG9zdElkLCBBcnJheS5mcm9tKGxpa2VkUG9zdHNTZXQpKTtcbn1cbi8qKiBSZW1vdmVzIGEgcG9zdCBJRCBmcm9tIHRoZSBsaWtlZCBwb3N0cyBpbiBzZXNzaW9uU3RvcmFnZS4gKi9cbmZ1bmN0aW9uIHJlbW92ZVBvc3RGcm9tU2Vzc2lvbkxpa2VzKHBvc3RJZCkge1xuICAgIGNvbnN0IGxpa2VkUG9zdHNTZXQgPSBnZXRMaWtlZFBvc3RzRnJvbVNlc3Npb24oKTtcbiAgICBsaWtlZFBvc3RzU2V0LmRlbGV0ZShwb3N0SWQpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oTElLRURfUE9TVFNfU0VTU0lPTl9LRVksIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20obGlrZWRQb3N0c1NldCkpKTtcbiAgICBjb25zb2xlLmxvZygnUmVtb3ZlZCBwb3N0IGZyb20gc2Vzc2lvbiBsaWtlczonLCBwb3N0SWQsIEFycmF5LmZyb20obGlrZWRQb3N0c1NldCkpO1xufVxuLy8gLS0tIENvcmUgSW5pdGlhbGl6YXRpb24gRnVuY3Rpb24gLS0tXG4vKipcbiAqIEluaXRpYWxpemVzIGFsbCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgcG9zdCBkZXRhaWwgcGFnZS5cbiAqIFRoaXMgaXMgdGhlIG1haW4gZXhwb3J0ZWQgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgY2FsbGVkIGJ5IHRoZSBlbnRyeSBwb2ludC5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBwb3N0IGRldGFpbCBwYWdlLi4uJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTtcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmluaXRpYWxpemVEYXJrTW9kZSkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEYXJrIG1vZGUgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICgwLCBoZWFkZXJfMS5yZW5kZXJIZWFkZXIpKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGVyIHJlbmRlcmVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IHVybFBhcmFtcy5nZXQoJ2lkJyk7XG4gICAgICAgIGlmIChwb3N0SWQpIHtcbiAgICAgICAgICAgIHlpZWxkIGxvYWRQb3N0Q29udGVudChwb3N0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gcG9zdCBJRCBwcm92aWRlZCBpbiB0aGUgVVJMJyk7XG4gICAgICAgICAgICBzaG93RXJyb3JNZXNzYWdlKCdObyBwb3N0IHNwZWNpZmllZC4gUGxlYXNlIGNoZWNrIHRoZSBVUkwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ1Bvc3QgZGV0YWlsIHBhZ2UgaW5pdGlhbGl6YXRpb24gY29tcGxldGUuJyk7XG4gICAgfSk7XG59XG4vKipcbiAqIExvYWQgYW5kIGRpc3BsYXkgcG9zdCBjb250ZW50IGJhc2VkIG9uIHBvc3QgSURcbiAqL1xuZnVuY3Rpb24gbG9hZFBvc3RDb250ZW50KHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRmV0Y2hpbmcgcG9zdCB3aXRoIElEOiAke3Bvc3RJZH1gKTtcbiAgICAgICAgICAgIGNvbnN0IHBvc3QgPSB5aWVsZCAoMCwgYXBpXzEuZmV0Y2hQb3N0QnlJZCkocG9zdElkKTtcbiAgICAgICAgICAgIGlmICghcG9zdClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBvc3Qgd2l0aCBJRCAke3Bvc3RJZH0gbm90IGZvdW5kYCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUG9zdCBkYXRhIGZldGNoZWQ6JywgcG9zdCk7XG4gICAgICAgICAgICB1cGRhdGVQb3N0VUkocG9zdCk7XG4gICAgICAgICAgICB1cGRhdGVQYWdlTWV0YWRhdGEocG9zdCk7XG4gICAgICAgICAgICBpbml0aWFsaXplU29jaWFsU2hhcmluZyhwb3N0KTtcbiAgICAgICAgICAgIGluaXRpYWxpemVMaWtlQnV0dG9uKHBvc3QpO1xuICAgICAgICAgICAgaW5pdGlhbGl6ZUNvbW1lbnRGb3JtKHBvc3QuaWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB5aWVsZCBsb2FkQ29tbWVudHMocG9zdC5pZC50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgcG9zdCBjb250ZW50OicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvck1lc3NhZ2UoYEZhaWxlZCB0byBsb2FkIHRoZSBibG9nIHBvc3QuICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nfWApO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgcG9zdCBVSSB3aXRoIGNvbnRlbnQgZnJvbSB0aGUgbG9hZGVkIHBvc3RcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUG9zdFVJKHBvc3QpIHtcbiAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgUG9zdCBVSSBmb3I6JywgcG9zdC50aXRsZSk7XG4gICAgY29uc3QgcG9zdEFydGljbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGlmICghcG9zdEFydGljbGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCB1cGRhdGUgVUk6ICNwb3N0LWNvbnRlbnQgZWxlbWVudCBub3QgZm91bmQuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQ29uc3RydWN0IHRoZSBpbm5lciBIVE1MIGR5bmFtaWNhbGx5XG4gICAgcG9zdEFydGljbGVFbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtaGVhZGVyXCI+XG4gICAgICAgICAgICA8aDE+JHtwb3N0LnRpdGxlfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1tZXRhXCI+XG4gICAgICAgICAgICAgICAgPHRpbWUgZGF0ZXRpbWU9XCIke3Bvc3QuY3JlYXRlZEF0ID8gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA6ICcnfVwiPlxuICAgICAgICAgICAgICAgICAgICAke3Bvc3QuY3JlYXRlZEF0ID8gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycgfSkgOiAnRGF0ZSB1bmtub3duJ31cbiAgICAgICAgICAgICAgICA8L3RpbWU+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JcIj5ieSAke3Bvc3QuYXV0aG9yIHx8ICdBbm9ueW1vdXMnfTwvc3Bhbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJsaWtlLWJ1dHRvblwiIGRhdGEtcG9zdC1pZD1cIiR7cG9zdC5pZH1cIiBhcmlhLWxhYmVsPVwiTGlrZSB0aGlzIHBvc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtaGVhcnRcIj48L2k+IFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxpa2UtY291bnRcIj4ke3Bvc3QubGlrZXMgfHwgMH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAke3Bvc3QuaW1hZ2VVcmwgPyBgPGltZyBzcmM9XCIke3Bvc3QuaW1hZ2VVcmx9XCIgYWx0PVwiJHtwb3N0LnRpdGxlfVwiIGNsYXNzPVwiZmVhdHVyZWQtaW1hZ2VcIj5gIDogJyd9XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtY29udGVudC1ib2R5XCI+XG4gICAgICAgICAgICAke3Bvc3QuY29udGVudH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtZm9vdGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICR7cG9zdC50YWdzICYmIHBvc3QudGFncy5sZW5ndGggPiAwID8gYDxzcGFuPlRhZ3M6PC9zcGFuPiAke3Bvc3QudGFncy5tYXAodGFnID0+IGA8YSBocmVmPVwiL3RhZy8ke3RhZy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgJy0nKX1cIj4ke3RhZ308L2E+YCkuam9pbignJyl9YCA6ICcnfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLXNoYXJpbmdcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TaGFyZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiB0d2l0dGVyXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIFR3aXR0ZXJcIj48aSBjbGFzcz1cImZhYiBmYS10d2l0dGVyXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gZmFjZWJvb2tcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gRmFjZWJvb2tcIj48aSBjbGFzcz1cImZhYiBmYS1mYWNlYm9vay1mXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gbGlua2VkaW5cIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gTGlua2VkSW5cIj48aSBjbGFzcz1cImZhYiBmYS1saW5rZWRpbi1pblwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8c2VjdGlvbiBpZD1cImNvbW1lbnRzLXNlY3Rpb25cIiBjbGFzcz1cImNvbW1lbnRzLXNlY3Rpb25cIiBhcmlhLWxhYmVsbGVkYnk9XCJjb21tZW50cy1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgPGgyIGlkPVwiY29tbWVudHMtaGVhZGluZ1wiPkNvbW1lbnRzPC9oMj5cbiAgICAgICAgICAgICA8ZGl2IGlkPVwiY29tbWVudHMtbGlzdFwiIGNsYXNzPVwiY29tbWVudHMtbGlzdFwiPlxuICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm5vLWNvbW1lbnRzXCI+TG9hZGluZyBjb21tZW50cy4uLjwvcD4gXG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgPGZvcm0gaWQ9XCJjb21tZW50LWZvcm1cIiBjbGFzcz1cImNvbW1lbnQtZm9ybVwiIGRhdGEtcG9zdC1pZD1cIiR7cG9zdC5pZH1cIj5cbiAgICAgICAgICAgICAgICAgPGgzPkxlYXZlIGEgQ29tbWVudDwvaDM+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY29tbWVudC1uYW1lXCI+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJjb21tZW50LW5hbWVcIiBuYW1lPVwibmFtZVwiIHJlcXVpcmVkPlxuICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjb21tZW50LXRleHRcIj5Db21tZW50OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgaWQ9XCJjb21tZW50LXRleHRcIiBuYW1lPVwiY29tbWVudFwiIHJvd3M9XCI0XCIgcmVxdWlyZWQ+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwicHJpbWFyeS1idXR0b25cIj5TdWJtaXQgQ29tbWVudDwvYnV0dG9uPlxuICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgIGA7XG4gICAgY29uc29sZS5sb2coJ1Bvc3QgVUkgdXBkYXRlZCB3aXRoIGxpa2UgYnV0dG9uIGFuZCBjb21tZW50cyBzZWN0aW9uIHN0cnVjdHVyZS4nKTtcbn1cbi8qKlxuICogVXBkYXRlIHBhZ2UgbWV0YWRhdGEgbGlrZSB0aXRsZSBhbmQgVVJMXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBhZ2VNZXRhZGF0YShwb3N0KSB7XG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHtwb3N0LnRpdGxlfSB8IE5vZWwncyBCbG9nYDtcbiAgICBjb25zb2xlLmxvZygnUGFnZSBtZXRhZGF0YSB1cGRhdGVkLicpO1xufVxuLyoqXG4gKiBJbml0aWFsaXplIHNvY2lhbCBzaGFyaW5nIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcocG9zdCkge1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHNvY2lhbFNoYXJpbmdEaXYgPSBwb3N0QXJ0aWNsZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbC1zaGFyaW5nJyk7XG4gICAgaWYgKHNvY2lhbFNoYXJpbmdEaXYpIHtcbiAgICAgICAgc29jaWFsU2hhcmluZ0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaGFyZS1idXR0b24nKTtcbiAgICAgICAgICAgIGlmICghYnV0dG9uKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBgQ2hlY2sgb3V0IHRoaXMgYXJ0aWNsZTogJHtwb3N0LnRpdGxlfWA7XG4gICAgICAgICAgICBsZXQgc2hhcmVXaW5kb3dVcmwgPSAnJztcbiAgICAgICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd0d2l0dGVyJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX0mdGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAndHdpdHRlci1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTIzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFjZWJvb2snKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2ZhY2Vib29rLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rZWRpbicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZS8/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2xpbmtlZGluLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnU29jaWFsIHNoYXJpbmcgaW5pdGlhbGl6ZWQuJyk7XG59XG4vKipcbiAqIERpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZSB0byB0aGUgdXNlciB3aXRoaW4gdGhlIHBvc3QgY29udGVudCBhcmVhXG4gKi9cbmZ1bmN0aW9uIHNob3dFcnJvck1lc3NhZ2UobWVzc2FnZSkge1xuICAgIGNvbnN0IGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGlmIChjb250ZW50RWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb21tZW50c1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtc2VjdGlvbicpO1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gY29tbWVudHNTZWN0aW9uID8gY29tbWVudHNTZWN0aW9uIDogY29udGVudEVsZW1lbnQ7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+JHttZXNzYWdlfTwvZGl2PmA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhbGVydChtZXNzYWdlKTsgLy8gRmFsbGJhY2tcbiAgICB9XG59XG4vKipcbiAqIEluaXRpYWxpemUgbGlrZSBidXR0b24gZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplTGlrZUJ1dHRvbihwb3N0KSB7XG4gICAgY29uc3QgcG9zdElkU3RyaW5nID0gcG9zdC5pZC50b1N0cmluZygpO1xuICAgIGNvbnN0IGxpa2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcG9zdC1jb250ZW50IC5saWtlLWJ1dHRvbltkYXRhLXBvc3QtaWQ9XCIke3Bvc3RJZFN0cmluZ31cIl1gKTtcbiAgICBpZiAoIWxpa2VCdG4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdMaWtlIGJ1dHRvbiBub3QgZm91bmQgaW4gcG9zdCBkZXRhaWwgVUkuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbGlrZWRQb3N0c1NldCA9IGdldExpa2VkUG9zdHNGcm9tU2Vzc2lvbigpO1xuICAgIGxldCBpc0xpa2VkID0gbGlrZWRQb3N0c1NldC5oYXMocG9zdElkU3RyaW5nKTsgLy8gSW5pdGlhbCBzdGF0ZSBmcm9tIHNlc3Npb25cbiAgICBjb25zdCBpY29uID0gbGlrZUJ0bi5xdWVyeVNlbGVjdG9yKCdpJyk7XG4gICAgY29uc3QgY291bnRTcGFuID0gbGlrZUJ0bi5xdWVyeVNlbGVjdG9yKCcubGlrZS1jb3VudCcpO1xuICAgIC8vIFNldCBpbml0aWFsIFVJIHN0YXRlXG4gICAgaWYgKGlzTGlrZWQgJiYgaWNvbikge1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcicpO1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcycpO1xuICAgICAgICBsaWtlQnRuLmNsYXNzTGlzdC5hZGQoJ2xpa2VkJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGljb24pIHtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYXMnKTtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInKTtcbiAgICAgICAgbGlrZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdsaWtlZCcpO1xuICAgIH1cbiAgICBpZiAoY291bnRTcGFuKVxuICAgICAgICBjb3VudFNwYW4udGV4dENvbnRlbnQgPSBTdHJpbmcocG9zdC5saWtlcyB8fCAwKTtcbiAgICBsaWtlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJY29uID0gbGlrZUJ0bi5xdWVyeVNlbGVjdG9yKCdpJyk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb3VudFNwYW4gPSBsaWtlQnRuLnF1ZXJ5U2VsZWN0b3IoJy5saWtlLWNvdW50Jyk7XG4gICAgICAgIGlmICghY3VycmVudEljb24gfHwgIWN1cnJlbnRDb3VudFNwYW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxpa2VCdG4uZGlzYWJsZWQgPSB0cnVlOyAvLyBQcmV2ZW50IGRvdWJsZS1jbGlja2luZ1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgIGlmIChpc0xpa2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEF0dGVtcHRpbmcgdG8gVU5MSUtFIHBvc3QgJHtwb3N0LmlkfWApO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkICgwLCBhcGlfMS51bmxpa2VQb3N0KShOdW1iZXIocG9zdC5pZCkpOyAvLyBDYWxsIHVubGlrZVBvc3QgQVBJXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQXR0ZW1wdGluZyB0byBMSUtFIHBvc3QgJHtwb3N0LmlkfWApO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkICgwLCBhcGlfMS5saWtlUG9zdCkoTnVtYmVyKHBvc3QuaWQpKTsgLy8gQ2FsbCBsaWtlUG9zdCBBUElcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAvLyBUb2dnbGUgdGhlIGxvY2FsICdpc0xpa2VkJyBzdGF0ZSBvbmx5IGFmdGVyIHN1Y2Nlc3NmdWwgQVBJIGNhbGxcbiAgICAgICAgICAgICAgICBpc0xpa2VkID0gIWlzTGlrZWQ7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIFNlc3Npb24gU3RvcmFnZSBiYXNlZCBvbiB0aGUgbmV3IHRvZ2dsZWQgc3RhdGVcbiAgICAgICAgICAgICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRQb3N0VG9TZXNzaW9uTGlrZXMocG9zdElkU3RyaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVBvc3RGcm9tU2Vzc2lvbkxpa2VzKHBvc3RJZFN0cmluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBVSSBJY29uIGJhc2VkIG9uIHRoZSBuZXcgdG9nZ2xlZCBzdGF0ZVxuICAgICAgICAgICAgICAgIGlmIChpc0xpa2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcicpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTtcbiAgICAgICAgICAgICAgICAgICAgbGlrZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaWtlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmFzJyk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicpO1xuICAgICAgICAgICAgICAgICAgICBsaWtlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2xpa2VkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBjb3VudCBkaXJlY3RseSBmcm9tIHRoZSBBUEkgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBjdXJyZW50Q291bnRTcGFuLnRleHRDb250ZW50ID0gU3RyaW5nKHJlc3VsdC5saWtlcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYExpa2Ugc3RhdHVzIHVwZGF0ZWQuIE5ldyBjb3VudDogJHtyZXN1bHQubGlrZXN9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTGlrZS9Vbmxpa2UgQVBJIGNhbGwgZmFpbGVkIG9yIHJldHVybmVkIG51bGxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHVwZGF0ZSBsaWtlL3VubGlrZSBzdGF0dXM6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGxpa2VCdG4uZGlzYWJsZWQgPSBmYWxzZTsgLy8gUmUtZW5hYmxlIGJ1dHRvblxuICAgICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnNvbGUubG9nKCdMaWtlIGJ1dHRvbiBpbml0aWFsaXplZC4nKTtcbn1cbi8qKlxuICogRmV0Y2hlcyBjb21tZW50cyBmcm9tIEFQSSBhbmQgcmVuZGVycyB0aGVtIGludG8gdGhlIGxpc3QuXG4gKi9cbmZ1bmN0aW9uIGxvYWRDb21tZW50cyhwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBjb21tZW50c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudHMtbGlzdCcpO1xuICAgICAgICBpZiAoIWNvbW1lbnRzTGlzdClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29tbWVudHNMaXN0LmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImxvYWRpbmctY29tbWVudHNcIj5Mb2FkaW5nIGNvbW1lbnRzLi4uPC9wPic7IC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY29tbWVudHMgPSB5aWVsZCBmZXRjaENvbW1lbnRzQXBpKHBvc3RJZCk7IC8vIFJlcGxhY2Ugd2l0aCBhY3R1YWwgQVBJIGNhbGxcbiAgICAgICAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnJzsgLy8gQ2xlYXIgbG9hZGluZy9wcmV2aW91cyBjb21tZW50c1xuICAgICAgICAgICAgaWYgKGNvbW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJuby1jb21tZW50c1wiPk5vIGNvbW1lbnRzIHlldC4gQmUgdGhlIGZpcnN0IHRvIGNvbW1lbnQhPC9wPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb21tZW50cy5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRFbGVtZW50LmNsYXNzTmFtZSA9ICdjb21tZW50JztcbiAgICAgICAgICAgICAgICAgICAgLy8gQmFzaWMgZXNjYXBpbmcgZm9yIGRpc3BsYXkgLSBjb25zaWRlciBhIG1vcmUgcm9idXN0IHNhbml0aXplciBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2FmZU5hbWUgPSAoKF9iID0gKF9hID0gY29tbWVudC5uYW1lKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKSkgfHwgJ0Fub255bW91cyc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhZmVDb21tZW50ID0gKChfZCA9IChfYyA9IGNvbW1lbnQuY29tbWVudCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucmVwbGFjZSgvPi9nLCBcIiZndDtcIikpIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICBjb21tZW50RWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1tZXRhXCI+PHN0cm9uZz4ke3NhZmVOYW1lfTwvc3Ryb25nPiBvbiAke25ldyBEYXRlKGNvbW1lbnQuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1ib2R5XCI+JHtzYWZlQ29tbWVudH08L3A+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudHNMaXN0LmFwcGVuZENoaWxkKGNvbW1lbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb21tZW50cyBsb2FkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgY29tbWVudHM6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIGNvbW1lbnRzTGlzdC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+Q291bGQgbm90IGxvYWQgY29tbWVudHMuPC9wPic7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIGNvbW1lbnQgc3VibWlzc2lvbiBmb3JtLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ29tbWVudEZvcm0ocG9zdElkKSB7XG4gICAgY29uc3QgY29tbWVudEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC1mb3JtJyk7XG4gICAgaWYgKCFjb21tZW50Rm9ybSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvbW1lbnQgZm9ybSBub3QgZm91bmQgaW4gcG9zdCBkZXRhaWwgVUkuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29tbWVudEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGNvbW1lbnRGb3JtLmVsZW1lbnRzLm5hbWVkSXRlbSgnbmFtZScpO1xuICAgICAgICBjb25zdCBjb21tZW50SW5wdXQgPSBjb21tZW50Rm9ybS5lbGVtZW50cy5uYW1lZEl0ZW0oJ2NvbW1lbnQnKTtcbiAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gY29tbWVudEZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKTtcbiAgICAgICAgaWYgKCFuYW1lSW5wdXQgfHwgIWNvbW1lbnRJbnB1dCB8fCAhc3VibWl0QnV0dG9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgY29uc3QgY29tbWVudCA9IGNvbW1lbnRJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgIGlmICghbmFtZSB8fCAhY29tbWVudCkge1xuICAgICAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBib3RoIG5hbWUgYW5kIGNvbW1lbnQuJyk7IC8vIFNpbXBsZSB2YWxpZGF0aW9uXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ1N1Ym1pdHRpbmcuLi4nO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgeWllbGQgc3VibWl0Q29tbWVudEFwaShwb3N0SWQsIG5hbWUsIGNvbW1lbnQpOyAvLyBSZXBsYWNlIHdpdGggYWN0dWFsIEFQSSBjYWxsXG4gICAgICAgICAgICAvLyBDbGVhciBmb3JtXG4gICAgICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGNvbW1lbnRJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgLy8gUmVmcmVzaCBjb21tZW50cyBsaXN0IHRvIHNob3cgdGhlIG5ldyBjb21tZW50XG4gICAgICAgICAgICB5aWVsZCBsb2FkQ29tbWVudHMocG9zdElkKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc3VibWl0IGNvbW1lbnQ6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gc3VibWl0IGNvbW1lbnQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7IC8vIFNpbXBsZSBlcnJvciBmZWVkYmFja1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnU3VibWl0IENvbW1lbnQnO1xuICAgICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnNvbGUubG9nKCdDb21tZW50IGZvcm0gaW5pdGlhbGl6ZWQuJyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5saWtlUG9zdCA9IGxpa2VQb3N0O1xuZXhwb3J0cy51bmxpa2VQb3N0ID0gdW5saWtlUG9zdDtcbmV4cG9ydHMuZGVsZXRlQmxvZ1Bvc3QgPSBkZWxldGVCbG9nUG9zdDtcbmV4cG9ydHMuY3JlYXRlUG9zdCA9IGNyZWF0ZVBvc3Q7XG5leHBvcnRzLnVwZGF0ZVBvc3QgPSB1cGRhdGVQb3N0O1xuZXhwb3J0cy5hZGRUYWdUb1Bvc3QgPSBhZGRUYWdUb1Bvc3Q7XG5leHBvcnRzLmZldGNoQmxvZ1Bvc3RzID0gZmV0Y2hCbG9nUG9zdHM7XG5leHBvcnRzLmZldGNoUG9zdEJ5SWQgPSBmZXRjaFBvc3RCeUlkO1xuZXhwb3J0cy5mZXRjaENvbW1lbnRzQXBpID0gZmV0Y2hDb21tZW50c0FwaTtcbmV4cG9ydHMuc3VibWl0Q29tbWVudEFwaSA9IHN1Ym1pdENvbW1lbnRBcGk7XG4vLyBBUElfVVJMIGNvbnN0YW50IGlzIG5vdCBuZWVkZWQgd2hlbiBmZXRjaGluZyBzdGF0aWMgZmlsZSBkaXJlY3RseVxuLy8gY29uc3QgQVBJX1VSTCA9ICcvYXBpJzsgXG4vLyAtLS0gRnVuY3Rpb25zIHJlbHlpbmcgb24gYmFja2VuZCBBUEkgKFdpbGwgTk9UIHdvcmsgb24gR2l0SHViIFBhZ2VzKSAtLS1cbi8vIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIGZhaWwgc2lsZW50bHkgb3IgbG9nIGVycm9ycyBpbiB0aGUgY29uc29sZSBvbiB0aGUgc3RhdGljIHNpdGUuXG5mdW5jdGlvbiBsaWtlUG9zdChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYExpa2UgZnVuY3Rpb25hbGl0eSByZXF1aXJlcyBhIGJhY2tlbmQuIENhbm5vdCBMSUtFIHBvc3QgJHtpZH0gb24gc3RhdGljIHNpdGUuYCk7XG4gICAgICAgIC8vIFJldHVybiBudWxsIG9yIGEgZGVmYXVsdCBzdHJ1Y3R1cmUgaWYgeW91ciBjYWxsaW5nIGNvZGUgZXhwZWN0cyBpdFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVubGlrZVBvc3QoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBVbmxpa2UgZnVuY3Rpb25hbGl0eSByZXF1aXJlcyBhIGJhY2tlbmQuIENhbm5vdCBVTkxJS0UgcG9zdCAke2lkfSBvbiBzdGF0aWMgc2l0ZS5gKTtcbiAgICAgICAgLy8gUmV0dXJuIG51bGwgb3IgYSBkZWZhdWx0IHN0cnVjdHVyZVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZUJsb2dQb3N0KHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgZGVsZXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlUG9zdChwb3N0RGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgY3JlYXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB1cGRhdGVQb3N0KGlkLCBwb3N0RGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgdXBkYXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBhZGRUYWdUb1Bvc3QoaWQsIHRhZykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgYWRkIHRhZyBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbi8vIC0tLSBGdW5jdGlvbnMgbW9kaWZpZWQgZm9yIHN0YXRpYyBkYXRhIC0tLVxuLyoqXG4gKiBGZXRjaCBhbGwgYmxvZyBwb3N0cyBkaXJlY3RseSBmcm9tIHRoZSBzdGF0aWMgSlNPTiBmaWxlLlxuICovXG5mdW5jdGlvbiBmZXRjaEJsb2dQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBDb25zdHJ1Y3QgdGhlIHBhdGggcmVsYXRpdmUgdG8gdGhlIEhUTUwgZmlsZSBsb2FkaW5nIHRoZSBzY3JpcHQuXG4gICAgICAgIC8vIEFzc3VtZXMgcG9zdHMuanNvbiBpcyBjb3BpZWQgdG8gJ2RvY3MvZGF0YS9wb3N0cy5qc29uJyBieSB0aGUgd29ya2Zsb3cuXG4gICAgICAgIC8vIEFuZCBIVE1MIGZpbGVzIGFyZSBhdCB0aGUgcm9vdCBvZiAnZG9jcycuXG4gICAgICAgIGNvbnN0IGRhdGFVcmwgPSAnZGF0YS9wb3N0cy5qc29uJztcbiAgICAgICAgY29uc29sZS5sb2coYEZldGNoaW5nIHN0YXRpYyBkYXRhIGZyb206ICR7ZGF0YVVybH1gKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goZGF0YVVybCk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggJHtkYXRhVXJsfTogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAvLyBBc3N1bWluZyB0aGUgSlNPTiBzdHJ1Y3R1cmUgaXMgeyBwb3N0czogWy4uLl0gfSBcbiAgICAgICAgICAgIC8vIG9yIG1heWJlIGp1c3QgYW4gYXJyYXkgWy4uLl0gZGlyZWN0bHk/IEFkanVzdCBiYXNlZCBvbiB5b3VyIHBvc3RzLmpzb24gc3RydWN0dXJlLlxuICAgICAgICAgICAgLy8gSWYgcG9zdHMuanNvbiBpcyBqdXN0IGFuIGFycmF5OiByZXR1cm4gZGF0YSB8fCBbXTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLnBvc3RzIHx8IFtdOyAvLyBVc2UgdGhpcyBpZiBwb3N0cy5qc29uIGhhcyB7IFwicG9zdHNcIjogWy4uLl0gfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc3RhdGljIHBvc3RzLmpzb246JywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgb24gZXJyb3JcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYSBzaW5nbGUgcG9zdCBieSBJRCBieSBmaWx0ZXJpbmcgdGhlIHN0YXRpYyBKU09OIGRhdGEuXG4gKiBOb3RlOiBUaGlzIGxvYWRzIEFMTCBwb3N0cyBqdXN0IHRvIGZpbmQgb25lIC0gbGVzcyBlZmZpY2llbnQgdGhhbiBhbiBBUEkuXG4gKiBAcGFyYW0gaWQgLSBUaGUgcG9zdCBJRCAoc3RyaW5nIG9yIG51bWJlcilcbiAqL1xuZnVuY3Rpb24gZmV0Y2hQb3N0QnlJZChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBhbGxQb3N0cyA9IHlpZWxkIGZldGNoQmxvZ1Bvc3RzKCk7IC8vIEZldGNoIGFsbCBwb3N0cyBmcm9tIEpTT05cbiAgICAgICAgICAgIC8vIEVuc3VyZSBjb25zaXN0ZW50IElEIGNvbXBhcmlzb24gKGUuZy4sIGNvbXBhcmluZyBudW1iZXJzKVxuICAgICAgICAgICAgY29uc3QgcG9zdElkTnVtYmVyID0gdHlwZW9mIGlkID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KGlkLCAxMCkgOiBpZDtcbiAgICAgICAgICAgIGlmIChpc05hTihwb3N0SWROdW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgSW52YWxpZCBwb3N0IElEIHByb3ZpZGVkOiAke2lkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcG9zdCA9IGFsbFBvc3RzLmZpbmQocCA9PiBOdW1iZXIocC5pZCkgPT09IHBvc3RJZE51bWJlcik7XG4gICAgICAgICAgICBpZiAoIXBvc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFBvc3Qgd2l0aCBJRCAke2lkfSBub3QgZm91bmQgaW4gc3RhdGljIGRhdGEuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgcG9zdCAke2lkfSBpbiBzdGF0aWMgZGF0YS5gKTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RhdGljIHBvc3QgJHtpZH06YCwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIC0tLSBDb21tZW50IEFQSSBQbGFjZWhvbGRlcnMgKE5lZWQgc2VwYXJhdGUgc2VydmljZSBvciBiYWNrZW5kKSAtLS1cbi8vIFRoZXNlIHdvdWxkIG5lZWQgdG8gYmUgaW1wbGVtZW50ZWQgdXNpbmcgYSB0aGlyZC1wYXJ0eSBzZXJ2aWNlIChsaWtlIERpc3F1cylcbi8vIG9yIGEgc2VydmVybGVzcyBiYWNrZW5kIGlmIHlvdSB3YW50IGNvbW1lbnRzIG9uIGEgc3RhdGljIHNpdGUuXG5mdW5jdGlvbiBmZXRjaENvbW1lbnRzQXBpKHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkNvbW1lbnRzIGNhbm5vdCBiZSBmZXRjaGVkIG9uIHN0YXRpYyBzaXRlIHdpdGhvdXQgZXh0ZXJuYWwgc2VydmljZS9iYWNrZW5kLlwiKTtcbiAgICAgICAgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXlcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdENvbW1lbnRBcGkocG9zdElkLCBuYW1lLCBjb21tZW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBzdWJtaXQgY29tbWVudCBvbiBzdGF0aWMgc2l0ZSB3aXRob3V0IGV4dGVybmFsIHNlcnZpY2UvYmFja2VuZC5cIik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbW1lbnQgc3VibWlzc2lvbiBub3QgYXZhaWxhYmxlLlwiKTtcbiAgICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9lbnRyaWVzL2NsaWVudC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==