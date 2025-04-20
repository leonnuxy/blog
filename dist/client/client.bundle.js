/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/about.ts":
/*!*********************************!*\
  !*** ./src/components/about.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


// src/components/about.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeAbout = initializeAbout;
// About popup functionality
/**
 * Initialize the About section popup
 */
function initializeAbout() {
    // Get DOM elements
    const aboutBtn = document.getElementById('about-btn');
    const aboutPopup = document.getElementById('about-popup');
    const closePopup = document.querySelector('#about-popup .close-popup');
    // Exit if required elements don't exist
    if (!aboutBtn || !aboutPopup || !closePopup) {
        console.warn('About popup elements not found in the DOM');
        return;
    }
    /**
     * Close popup and reset state
     */
    const closeAboutPopup = () => {
        aboutPopup.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
        setDefaultActiveLink(); // Reset navigation highlighting
    };
    // --- Event Listeners ---
    // Open popup when about button is clicked
    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        aboutPopup.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while popup is open
        aboutBtn.classList.add('active'); // Highlight nav item
    });
    // Close popup when close button is clicked
    closePopup.addEventListener('click', closeAboutPopup);
    // Close when clicking outside the popup content
    aboutPopup.addEventListener('click', (e) => {
        if (e.target === aboutPopup) {
            closeAboutPopup();
        }
    });
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutPopup.classList.contains('open')) {
            closeAboutPopup();
        }
    });
}
/**
 * Helper function to set the default active link state
 * in the navigation based on the current URL hash
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
    return blogCard;
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

/***/ "./src/components/navigation/header.ts":
/*!*********************************************!*\
  !*** ./src/components/navigation/header.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


// src/components/header.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderHeader = renderHeader;
/**
 * Header Component
 *
 * Renders the header section into a target container.
 *
 * @param containerId - The ID of the element to render the header into. Defaults to 'header-placeholder'.
 */
function renderHeader(containerId = 'header-placeholder') {
    // Determine base path for proper link prefixing
    const pathParts = window.location.pathname.split('/');
    // Remove empty strings and the last part (current page)
    const depth = pathParts.filter(Boolean).length;
    const basePath = depth > 0 ? '../'.repeat(depth) : './';
    const headerContainer = document.getElementById(containerId);
    if (!headerContainer) {
        console.error(`Header container with ID ${containerId} not found.`);
        return;
    }
    // Get current path for active link highlighting
    const currentPath = window.location.pathname;
    // Define the header HTML structure using the basePath for links
    headerContainer.innerHTML = `
        <header class="site-header">
            <div class="container">
                <h1 class="site-title">
                    <a href="${basePath}">Blog</a>
                </h1>
                <nav>
                    <ul>
                        <li><a href="${basePath}" class="${currentPath === '/' || currentPath.endsWith('index.html') ? 'active' : ''}">Home</a></li>
                        <li><a href="#" id="about-btn" class="${currentPath.includes('/about') ? 'active' : ''}">About</a></li>
                    </ul>
                </nav>
                <div class="header-right">
                    <div class="search-container search-bar">
                        <input type="text" id="search-input" placeholder="Search..." aria-label="Search">
                        <button type="button" id="search-button" aria-label="Submit search">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <button id="theme-toggle" aria-label="Toggle dark mode">
                        <i class="icon-moon"></i>
                    </button>
                    <button id="hamburger-btn" class="mobile-menu-button" aria-label="Toggle mobile menu">
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </header>
        
        <!-- About Popup Modal -->
        <div id="about-popup" class="popup modal">
            <div class="popup-content modal-content">
                <button class="close-popup close-modal" aria-label="Close About Popup">&times;</button>
                <h2>About Me</h2>
                <p>Hi there, I'm Noel! With a background in computer science and experience across the full software
                    lifecycle, I love diving into complex problems, especially in full-stack development and cloud
                    solutions. But this blog isn't just about code – it's my space for sharing insights, exploring new ideas
                    in tech and life, and learning together. Thanks for stopping by!</p>
            </div>
        </div>
        
        <!-- Mobile Navigation Drawer -->
        <div id="mobile-nav-drawer" class="mobile-drawer">
            <div class="drawer-header">
                <h2>Menu</h2>
                <button id="close-drawer-btn" aria-label="Close menu">&times;</button>
            </div>
            <div class="mobile-nav">
                <!-- Navigation links will be cloned here by JS -->
            </div>
        </div>
        
        <!-- Drawer Overlay -->
        <div id="drawer-overlay" class="drawer-overlay"></div>
    `;
    // Event listeners should be called *after* renderHeader is executed.
}


/***/ }),

/***/ "./src/components/navigation/mobileNav.ts":
/*!************************************************!*\
  !*** ./src/components/navigation/mobileNav.ts ***!
  \************************************************/
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

/***/ "./src/components/navigation/navigation.ts":
/*!*************************************************!*\
  !*** ./src/components/navigation/navigation.ts ***!
  \*************************************************/
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

/***/ "./src/components/search.ts":
/*!**********************************!*\
  !*** ./src/components/search.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


// src/components/search.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeSearch = initializeSearch;
/**
 * Initializes a simple, client-side search functionality for blog posts.
 * Filters currently visible blog cards on the page as the user types or redirects to the homepage for search on post detail pages.
 */
function initializeSearch() {
    const searchBar = document.querySelector('#search-input');
    const blogCardsContainer = document.querySelector('#blog.blog-cards'); // Target the main container
    const heroSection = document.querySelector('.hero'); // Get hero section (can be null)
    const searchIndicator = document.createElement('div');
    searchIndicator.className = 'search-indicator';
    searchIndicator.setAttribute('aria-live', 'polite');
    searchIndicator.style.display = 'none';
    const clearFilterBtn = document.createElement('button');
    clearFilterBtn.className = 'clear-filter-btn';
    clearFilterBtn.innerHTML = '<i class="fas fa-times"></i> Clear Filter';
    clearFilterBtn.setAttribute('aria-label', 'Clear search filter and return to homepage');
    clearFilterBtn.addEventListener('click', () => {
        searchBar.value = '';
        filterBlogCards('');
        searchBar.focus();
    });
    searchIndicator.appendChild(document.createElement('span'));
    searchIndicator.appendChild(clearFilterBtn);
    const headerRight = document.querySelector('.header-right');
    headerRight === null || headerRight === void 0 ? void 0 : headerRight.insertBefore(searchIndicator, headerRight.firstChild);
    let allCards = [];
    let debounceTimer;
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.trim().toLowerCase();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterBlogCards(searchTerm);
        }, 300);
    });
    function filterBlogCards(term) {
        if (window.location.pathname.includes('post.html')) {
            if (term) {
                window.location.href = `/?search=${encodeURIComponent(term)}`;
            }
            else {
                window.location.href = `/`; // Redirect to homepage if search is cleared
            }
            return; // Exit the function as we've redirected
        }
        // if (heroSection) {
        //     heroSection.style.display = term ? 'none' : '';
        // }
        if (!blogCardsContainer) {
            return; // If no blog cards container (not on main page), do nothing more
        }
        if (allCards.length === 0) {
            allCards = Array.from(document.querySelectorAll('#blog.blog-cards .blog-card, #hidden-posts .blog-card'));
            if (allCards.length === 0) {
                console.log("No blog cards found to filter.");
                return;
            }
            console.log(`Search filtering initialized with ${allCards.length} cards.`);
        }
        let visibleCount = 0;
        allCards.forEach(card => {
            var _a, _b;
            let matchesSearch = false;
            if (!term) {
                matchesSearch = true;
            }
            else {
                const title = ((_b = (_a = card.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
                const tags = Array.from(card.querySelectorAll('.tag-badge'))
                    .map(tag => { var _a; return ((_a = tag.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || ''; });
                matchesSearch =
                    title.includes(term) ||
                        tags.some(tag => tag.includes(term));
            }
            if (matchesSearch) {
                card.classList.remove('hidden-by-search');
                visibleCount++;
            }
            else {
                card.classList.add('hidden-by-search');
            }
        });
        const textSpan = searchIndicator.querySelector('span');
        if (textSpan) {
            textSpan.textContent = term
                ? (visibleCount > 0
                    ? `Showing ${visibleCount} result${visibleCount > 1 ? 's' : ''} for "${term}"`
                    : `No results found for "${term}"`)
                : '';
        }
        searchIndicator.style.display = term ? 'block' : 'none';
        const noResultsMessage = blogCardsContainer.querySelector('.no-search-results-message');
        if (visibleCount === 0 && term) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'empty-state no-search-results-message';
                message.innerHTML = `
                    <i class="fas fa-search fa-3x"></i>
                    <h3>No matching posts found</h3>
                    <p>Try different keywords.</p>
                `;
                blogCardsContainer.appendChild(message);
            }
        }
        else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchBar.value = '';
            filterBlogCards('');
            searchBar.blur();
        }
    });
    const searchButton = document.querySelector('#search-button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchBar.value.trim().toLowerCase();
            filterBlogCards(searchTerm);
        });
    }
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
// blogFrontendController.ts
/**
 * Blog Frontend Controller
 * Client-side controller that handles all frontend functionality for the blog homepage.
 * Manages UI initialization, post rendering, filtering, pagination, and user interactions.
 */
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts"); // Uses static fetch now
const blogCards_1 = __webpack_require__(/*! ../components/blogCards */ "./src/components/blogCards.ts");
const navigation_1 = __webpack_require__(/*! ../components/navigation/navigation */ "./src/components/navigation/navigation.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/controllers/state.ts");
/**
 * Initialize the blog frontend functionality (homepage)
 */
function initializeBlogFrontend() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        (0, navigation_1.initializeNavigation)();
        // Initialize posts, which now includes filtering based on URL params
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = (_a = urlParams.get('search')) !== null && _a !== void 0 ? _a : undefined;
        yield initializePosts(searchTerm);
        initializePagination(); // Now calls our local function, not the component
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
        var _a;
        // Re-initialize posts, which will pick up any new URL parameters (like search query OR tag)
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = (_a = urlParams.get('search')) !== null && _a !== void 0 ? _a : undefined;
        yield initializePosts(searchTerm);
        initializePagination();
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
function initializePosts(searchTerm) {
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
                // Store the filtered tag in frontend state
                state_1.frontendState.filteredTag = tagFilter;
            }
            else {
                state_1.frontendState.filteredTag = undefined;
            }
            // --- End Apply Tag Filter ---
            // --- Apply Search Filter ---
            if (searchTerm) {
                postsToDisplay = postsToDisplay.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
            }
            // --- End Apply Search Filter ---
            blogCardsContainer.innerHTML = '';
            if (postsToDisplay.length === 0) {
                showEmptyState(blogCardsContainer, tagFilter !== null && tagFilter !== void 0 ? tagFilter : undefined);
                const loadMoreBtn = document.getElementById('load-more-btn');
                if (loadMoreBtn)
                    loadMoreBtn.style.display = 'none';
                return;
            }
            // Pagination logic
            const initialPostCount = state_1.frontendState.postsPerPage;
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
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-newspaper fa-3x"></i>
            <h3>${tagFilter ? `No posts found with tag "${tagFilter}"` : 'No posts available'}</h3>
            <p>${tagFilter ? 'Try selecting a different tag or check back later.' : 'Check back later for new content.'}</p>
            ${tagFilter ? `<a href="/" class="btn">View All Posts</a>` : ''}
        </div>
    `;
}
/**
 * Show error state when posts couldn't be loaded
 */
function showErrorState(container) {
    container.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-circle fa-3x"></i>
            <h3>Failed to load posts</h3>
            <p>There was an error loading the blog posts. Please try again later.</p>
            <button onclick="window.location.reload()" class="btn">Retry</button>
        </div>
    `;
}
/**
 * Initialize pagination controls
 * This replaces the external component initialization with integrated functionality
 */
function initializePagination() {
    setupLoadMoreButton();
    updatePaginationControls();
}
/**
 * Set up the "Load More" button functionality
 */
function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenPostsContainer = document.getElementById('hidden-posts');
    const visibleContainer = document.querySelector('#blog.blog-cards');
    if (!loadMoreBtn || !hiddenPostsContainer || !visibleContainer)
        return;
    // Remove existing event listener to prevent duplicates
    loadMoreBtn.removeEventListener('click', handleLoadMore);
    // Add event listener
    loadMoreBtn.addEventListener('click', handleLoadMore);
}
/**
 * Handle the "Load More" button click
 */
function handleLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenPostsContainer = document.getElementById('hidden-posts');
    const visibleContainer = document.querySelector('#blog.blog-cards');
    if (!loadMoreBtn || !hiddenPostsContainer || !visibleContainer)
        return;
    // Get posts to show (use a reasonable batch size)
    const postsToShow = Array.from(hiddenPostsContainer.children).slice(0, state_1.frontendState.postsPerPage);
    // Move posts from hidden to visible container
    postsToShow.forEach(post => {
        visibleContainer.appendChild(post);
    });
    // Hide button if no more hidden posts
    if (hiddenPostsContainer.children.length === 0) {
        loadMoreBtn.style.display = 'none';
    }
    // Dispatch state change for analytics or other components
    (0, state_1.dispatchStateChange)('frontend', 'loadedMorePosts');
}
/**
 * Update pagination controls visibility based on current state
 */
function updatePaginationControls() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenPostsContainer = document.getElementById('hidden-posts');
    if (loadMoreBtn && hiddenPostsContainer) {
        loadMoreBtn.style.display = hiddenPostsContainer.children.length > 0 ? 'block' : 'none';
    }
}


/***/ }),

/***/ "./src/controllers/state.ts":
/*!**********************************!*\
  !*** ./src/controllers/state.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dispatchStateChange = exports.frontendState = exports.state = void 0;
// Initialize admin state
exports.state = {
    currentPage: 1,
    postsPerPage: 10,
    totalPages: 1,
    posts: [],
    loading: false,
    searchTerm: '',
    sortBy: 'newest',
    initialized: false
};
// Initialize frontend state
exports.frontendState = {
    darkMode: false,
    postsPerPage: 6, // Show 6 posts initially on frontend
    filteredTag: undefined
};
// State change event for components to react to state changes
const dispatchStateChange = (stateType, property) => {
    document.dispatchEvent(new CustomEvent('stateChange', {
        detail: { type: stateType, property }
    }));
};
exports.dispatchStateChange = dispatchStateChange;


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
const header_1 = __webpack_require__(/*! ../components/navigation/header */ "./src/components/navigation/header.ts");
const darkMode_1 = __webpack_require__(/*! ../components/darkMode */ "./src/components/darkMode.ts");
const mobileNav_1 = __webpack_require__(/*! ../components/navigation/mobileNav */ "./src/components/navigation/mobileNav.ts");
const search_1 = __webpack_require__(/*! ../components/search */ "./src/components/search.ts"); // Assuming path is correct
const navigation_1 = __webpack_require__(/*! ../components/navigation/navigation */ "./src/components/navigation/navigation.ts");
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
                // Wait a moment for DOM to update before initializing components dependent on header
                setTimeout(() => {
                    // Initialize components dependent on header *after* rendering
                    (0, mobileNav_1.initializeMobileNav)(); // Initialize mobile nav using header elements
                    (0, search_1.initializeSearch)(); // Initialize search bar in header
                    (0, navigation_1.initializeNavigation)(); // Initialize nav link active states
                    console.log('Header-dependent components initialized.');
                }, 0);
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
        contentElement.innerHTML = `<div class="error-message">${message}</div>`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsb0JBQW9CO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUyxHQUFHLGtCQUFrQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzFCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2Fib3V0LnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9ibG9nQ2FyZHMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2RhcmtNb2RlLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9uYXZpZ2F0aW9uL2hlYWRlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvbmF2aWdhdGlvbi9tb2JpbGVOYXYudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvc2VhcmNoLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29udHJvbGxlcnMvYmxvZ0Zyb250ZW5kQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL3N0YXRlLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvZW50cmllcy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9tb2R1bGVzL3Bvc3REZXRhaWwudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9zZXJ2aWNlcy9hcGkudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy91dGlscy91cmxUcmFuc2Zvcm1lci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9jb21wb25lbnRzL2Fib3V0LnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVBYm91dCA9IGluaXRpYWxpemVBYm91dDtcbi8vIEFib3V0IHBvcHVwIGZ1bmN0aW9uYWxpdHlcbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgQWJvdXQgc2VjdGlvbiBwb3B1cFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQWJvdXQoKSB7XG4gICAgLy8gR2V0IERPTSBlbGVtZW50c1xuICAgIGNvbnN0IGFib3V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0LWJ0bicpO1xuICAgIGNvbnN0IGFib3V0UG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXQtcG9wdXAnKTtcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0LXBvcHVwIC5jbG9zZS1wb3B1cCcpO1xuICAgIC8vIEV4aXQgaWYgcmVxdWlyZWQgZWxlbWVudHMgZG9uJ3QgZXhpc3RcbiAgICBpZiAoIWFib3V0QnRuIHx8ICFhYm91dFBvcHVwIHx8ICFjbG9zZVBvcHVwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQWJvdXQgcG9wdXAgZWxlbWVudHMgbm90IGZvdW5kIGluIHRoZSBET00nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZSBwb3B1cCBhbmQgcmVzZXQgc3RhdGVcbiAgICAgKi9cbiAgICBjb25zdCBjbG9zZUFib3V0UG9wdXAgPSAoKSA9PiB7XG4gICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7IC8vIFJlc3RvcmUgc2Nyb2xsaW5nXG4gICAgICAgIHNldERlZmF1bHRBY3RpdmVMaW5rKCk7IC8vIFJlc2V0IG5hdmlnYXRpb24gaGlnaGxpZ2h0aW5nXG4gICAgfTtcbiAgICAvLyAtLS0gRXZlbnQgTGlzdGVuZXJzIC0tLVxuICAgIC8vIE9wZW4gcG9wdXAgd2hlbiBhYm91dCBidXR0b24gaXMgY2xpY2tlZFxuICAgIGFib3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgYW5jaG9yIGJlaGF2aW9yXG4gICAgICAgIGFib3V0UG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7IC8vIFByZXZlbnQgc2Nyb2xsaW5nIHdoaWxlIHBvcHVwIGlzIG9wZW5cbiAgICAgICAgYWJvdXRCdG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7IC8vIEhpZ2hsaWdodCBuYXYgaXRlbVxuICAgIH0pO1xuICAgIC8vIENsb3NlIHBvcHVwIHdoZW4gY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBjbG9zZVBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VBYm91dFBvcHVwKTtcbiAgICAvLyBDbG9zZSB3aGVuIGNsaWNraW5nIG91dHNpZGUgdGhlIHBvcHVwIGNvbnRlbnRcbiAgICBhYm91dFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBhYm91dFBvcHVwKSB7XG4gICAgICAgICAgICBjbG9zZUFib3V0UG9wdXAoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIENsb3NlIG9uIGVzY2FwZSBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBhYm91dFBvcHVwLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XG4gICAgICAgICAgICBjbG9zZUFib3V0UG9wdXAoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IHRoZSBkZWZhdWx0IGFjdGl2ZSBsaW5rIHN0YXRlXG4gKiBpbiB0aGUgbmF2aWdhdGlvbiBiYXNlZCBvbiB0aGUgY3VycmVudCBVUkwgaGFzaFxuICovXG5mdW5jdGlvbiBzZXREZWZhdWx0QWN0aXZlTGluaygpIHtcbiAgICAvLyBHZXQgY3VycmVudCBoYXNoIG9yIGRlZmF1bHQgdG8gaG9tZVxuICAgIGNvbnN0IGN1cnJlbnRIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgJyNob21lJztcbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZyb20gYWxsIG5hdiBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBoYXNoIGxpbmtcbiAgICBjb25zdCBjdXJyZW50TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGhlYWRlciBuYXYgdWwgbGkgYVtocmVmPVwiJHtjdXJyZW50SGFzaH1cIl1gKTtcbiAgICBpZiAoY3VycmVudExpbmspIHtcbiAgICAgICAgY3VycmVudExpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCA9IGNyZWF0ZUJsb2dDYXJkRWxlbWVudDtcbmNvbnN0IHVybFRyYW5zZm9ybWVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdXJsVHJhbnNmb3JtZXJcIik7IC8vIEltcG9ydCB0aGUgVVJMIGdlbmVyYXRvclxuLyoqXG4gKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnQgZm9yIGEgYmxvZyBjYXJkIGZyb20gcG9zdCBkYXRhIChkaXNwbGF5IG9ubHkgZm9yIGFjdGlvbnMpXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJsb2dDYXJkRWxlbWVudChwb3N0KSB7XG4gICAgY29uc3QgYmxvZ0NhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBibG9nQ2FyZC5jbGFzc05hbWUgPSAnYmxvZy1jYXJkJztcbiAgICBibG9nQ2FyZC5kYXRhc2V0LnBvc3RJZCA9IFN0cmluZyhwb3N0LmlkKTtcbiAgICBibG9nQ2FyZC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgY29uc3QgY3JlYXRlZERhdGUgPSBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCk7XG4gICAgY29uc3QgZGF0ZVN0ciA9IGNyZWF0ZWREYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYydcbiAgICB9KTtcbiAgICAvLyAtLS0gRHluYW1pYyBVUkwgYW5kIFRleHQgR2VuZXJhdGlvbiBmb3IgU2hhcmluZyAtLS1cbiAgICBjb25zdCBwb3N0VXJsID0gYHBvc3QuaHRtbD9pZD0ke1N0cmluZyhwb3N0LmlkKX1gO1xuICAgIGNvbnN0IGVuY29kZWRVcmwgPSBlbmNvZGVVUklDb21wb25lbnQocG9zdFVybCk7XG4gICAgY29uc3Qgc2hhcmVUZXh0ID0gYENoZWNrIG91dCB0aGlzIGFydGljbGU6ICR7cG9zdC50aXRsZX1gO1xuICAgIGNvbnN0IGVuY29kZWRTaGFyZVRleHQgPSBlbmNvZGVVUklDb21wb25lbnQoc2hhcmVUZXh0KTtcbiAgICAvLyAtLS0gRW5kIER5bmFtaWMgVVJMIEdlbmVyYXRpb24gLS0tXG4gICAgLy8gR2VuZXJhdGUgSFRNTCBmb3IgdGFnIGJhZGdlcy9saW5rcyB1c2luZyB0aGUgdXRpbGl0eSBmdW5jdGlvblxuICAgIGxldCB0YWdzSFRNTCA9ICcnO1xuICAgIGlmIChwb3N0LnRhZ3MgJiYgcG9zdC50YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGFnc0hUTUwgPSAnPGRpdiBjbGFzcz1cInBvc3QtdGFnc1wiPicgK1xuICAgICAgICAgICAgcG9zdC50YWdzLm1hcCh0YWcgPT4gXG4gICAgICAgICAgICAvLyBVc2UgZ2VuZXJhdGVUYWdGaWx0ZXJVcmwgZm9yIGhyZWYgaW4gYW4gPGE+IHRhZ1xuICAgICAgICAgICAgYDxhIGhyZWY9XCIkeygwLCB1cmxUcmFuc2Zvcm1lcl8xLmdlbmVyYXRlVGFnRmlsdGVyVXJsKSh0YWcpfVwiIGNsYXNzPVwidGFnLWJhZGdlXCI+JHt0YWd9PC9hPmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgIH1cbiAgICBjb25zdCBmYWxsYmFja0ltYWdlVXJsID0gJ2ltYWdlcy9ibG9nX2ltYWdlXzMuanBlZyc7IC8vIFJlbGF0aXZlIHBhdGhcbiAgICAvLyBDcmVhdGUgSFRNTCBmb3IgYmxvZyBjYXJkXG4gICAgYmxvZ0NhcmQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aW1nIHNyYz1cIiR7cG9zdC5pbWFnZVVybCB8fCBmYWxsYmFja0ltYWdlVXJsfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIj4gXG4gICAgICAgIDxkaXYgY2xhc3M9XCJibG9nLWNhcmQtY29udGVudFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJibG9nLWNhcmQtZGF0ZS1hdXRob3JcIj4ke2RhdGVTdHJ9PC9wPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiYmxvZy1jYXJkLXRpdGxlXCI+JHtwb3N0LnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAke3RhZ3NIVE1MfVxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWwtc2hhcmluZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIHR3aXR0ZXJcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gVHdpdHRlclwiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiIGRhdGEtdGV4dD1cIiR7ZW5jb2RlZFNoYXJlVGV4dH1cIj48aSBjbGFzcz1cImZhYiBmYS10d2l0dGVyXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2hhcmUtYnV0dG9uIGZhY2Vib29rXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIEZhY2Vib29rXCIgZGF0YS11cmw9XCIke2VuY29kZWRVcmx9XCI+PGkgY2xhc3M9XCJmYWIgZmEtZmFjZWJvb2stZlwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiBsaW5rZWRpblwiIGFyaWEtbGFiZWw9XCJTaGFyZSBvbiBMaW5rZWRJblwiIGRhdGEtdXJsPVwiJHtlbmNvZGVkVXJsfVwiPjxpIGNsYXNzPVwiZmFiIGZhLWxpbmtlZGluLWluXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgLy8gU2V0dXAgc29jaWFsIHNoYXJpbmcgbGlzdGVuZXJzIChhcyBiZWZvcmUpXG4gICAgY29uc3Qgc29jaWFsU2hhcmluZ0RpdiA9IGJsb2dDYXJkLnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWwtc2hhcmluZycpO1xuICAgIGlmIChzb2NpYWxTaGFyaW5nRGl2KSB7XG4gICAgICAgIHNvY2lhbFNoYXJpbmdEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIC4uLiBleGlzdGluZyBzb2NpYWwgc2hhcmluZyBjbGljayBsb2dpYyAuLi5cbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hhcmUtYnV0dG9uJyk7XG4gICAgICAgICAgICBpZiAoIWJ1dHRvbilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnN1YnN0cmluZygwLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVVcmwgPSBidXR0b24uZGF0YXNldC51cmwgPyBkZWNvZGVVUklDb21wb25lbnQoYnV0dG9uLmRhdGFzZXQudXJsKSA6IGBwb3N0Lmh0bWw/aWQ9JHtwb3N0LmlkfWA7XG4gICAgICAgICAgICBjb25zdCBmdWxsVXJsID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0ke2Jhc2VQYXRofSR7cmVsYXRpdmVVcmx9YDtcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRGdWxsVXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KGZ1bGxVcmwpO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGJ1dHRvbi5kYXRhc2V0LnRleHQgPyBkZWNvZGVVUklDb21wb25lbnQoYnV0dG9uLmRhdGFzZXQudGV4dCkgOiBkb2N1bWVudC50aXRsZTtcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpO1xuICAgICAgICAgICAgbGV0IHNoYXJlV2luZG93VXJsID0gJyc7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygndHdpdHRlcicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2VuY29kZWRUZXh0fSZ1cmw9JHtlbmNvZGVkRnVsbFVybH1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAndHdpdHRlci1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTIzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFjZWJvb2snKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7ZW5jb2RlZEZ1bGxVcmx9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2ZhY2Vib29rLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rZWRpbicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZS8/dXJsPSR7ZW5jb2RlZEZ1bGxVcmx9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2xpbmtlZGluLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYmxvZ0NhcmQ7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIERhcmsgbW9kZSBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVEYXJrTW9kZSA9IGluaXRpYWxpemVEYXJrTW9kZTtcbmV4cG9ydHMuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UgPSBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZTtcbi8qKlxuICogSW5pdGlhbGl6ZSBkYXJrIG1vZGUgdG9nZ2xlXG4gKiBUaGlzIGNyZWF0ZXMgYSBmbG9hdGluZyBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvbiBhbmQgYWRkcyBpdCB0byB0aGUgRE9NXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVEYXJrTW9kZSgpIHtcbiAgICAvLyBDcmVhdGUgZGFyayBtb2RlIHRvZ2dsZSBidXR0b25cbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmNsYXNzTmFtZSA9ICdkYXJrLW1vZGUtdG9nZ2xlJztcbiAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nOyAvLyBNb29uIGljb25cbiAgICBkYXJrTW9kZVRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVG9nZ2xlIERhcmsgTW9kZScpO1xuICAgIC8vIENoZWNrIGlmIGRhcmsgbW9kZSBwcmVmZXJlbmNlIGlzIGFscmVhZHkgc2V0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09ICd0cnVlJztcbiAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uIGZvciBsaWdodCBtb2RlXG4gICAgfVxuICAgIC8vIEFkZCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgIGRhcmtNb2RlVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRGFya01vZGUpO1xuICAgIC8vIEFkZCBidXR0b24gdG8gdGhlIERPTVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGFya01vZGVUb2dnbGUpO1xufVxuLyoqXG4gKiBUb2dnbGUgZGFyayBtb2RlIG9uIGFuZCBvZmZcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlRGFya01vZGUoKSB7XG4gICAgY29uc3QgaXNEYXJrTW9kZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyay1tb2RlJyk7XG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1tb2RlLXRvZ2dsZScpO1xuICAgIC8vIFVwZGF0ZSBpY29uIGJhc2VkIG9uIG1vZGVcbiAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgaWYgKGlzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvbiBmb3IgZGFyayBtb2RlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU2F2ZSBwcmVmZXJlbmNlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCBpc0RhcmtNb2RlLnRvU3RyaW5nKCkpO1xufVxuLyoqXG4gKiBDaGVjayBpZiB1c2VyIGhhcyBzeXN0ZW0gZGFyayBtb2RlIHByZWZlcmVuY2VcbiAqIElmIHRoZXkgZG8gYW5kIHdlIGhhdmVuJ3Qgc2V0IGEgcHJlZmVyZW5jZSB5ZXQsIGFwcGx5IGRhcmsgbW9kZVxuICovXG5mdW5jdGlvbiBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSgpIHtcbiAgICAvLyBPbmx5IGNoZWNrIGlmIHVzZXIgaGFzbid0IGV4cGxpY2l0bHkgc2V0IGEgcHJlZmVyZW5jZVxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwcmVmZXJzRGFya01vZGUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgICAgIGlmIChwcmVmZXJzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgICAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgICAgICAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvY29tcG9uZW50cy9oZWFkZXIudHNcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVuZGVySGVhZGVyID0gcmVuZGVySGVhZGVyO1xuLyoqXG4gKiBIZWFkZXIgQ29tcG9uZW50XG4gKlxuICogUmVuZGVycyB0aGUgaGVhZGVyIHNlY3Rpb24gaW50byBhIHRhcmdldCBjb250YWluZXIuXG4gKlxuICogQHBhcmFtIGNvbnRhaW5lcklkIC0gVGhlIElEIG9mIHRoZSBlbGVtZW50IHRvIHJlbmRlciB0aGUgaGVhZGVyIGludG8uIERlZmF1bHRzIHRvICdoZWFkZXItcGxhY2Vob2xkZXInLlxuICovXG5mdW5jdGlvbiByZW5kZXJIZWFkZXIoY29udGFpbmVySWQgPSAnaGVhZGVyLXBsYWNlaG9sZGVyJykge1xuICAgIC8vIERldGVybWluZSBiYXNlIHBhdGggZm9yIHByb3BlciBsaW5rIHByZWZpeGluZ1xuICAgIGNvbnN0IHBhdGhQYXJ0cyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgIC8vIFJlbW92ZSBlbXB0eSBzdHJpbmdzIGFuZCB0aGUgbGFzdCBwYXJ0IChjdXJyZW50IHBhZ2UpXG4gICAgY29uc3QgZGVwdGggPSBwYXRoUGFydHMuZmlsdGVyKEJvb2xlYW4pLmxlbmd0aDtcbiAgICBjb25zdCBiYXNlUGF0aCA9IGRlcHRoID4gMCA/ICcuLi8nLnJlcGVhdChkZXB0aCkgOiAnLi8nO1xuICAgIGNvbnN0IGhlYWRlckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcklkKTtcbiAgICBpZiAoIWhlYWRlckNvbnRhaW5lcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBIZWFkZXIgY29udGFpbmVyIHdpdGggSUQgJHtjb250YWluZXJJZH0gbm90IGZvdW5kLmApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEdldCBjdXJyZW50IHBhdGggZm9yIGFjdGl2ZSBsaW5rIGhpZ2hsaWdodGluZ1xuICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIC8vIERlZmluZSB0aGUgaGVhZGVyIEhUTUwgc3RydWN0dXJlIHVzaW5nIHRoZSBiYXNlUGF0aCBmb3IgbGlua3NcbiAgICBoZWFkZXJDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwic2l0ZS1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJzaXRlLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke2Jhc2VQYXRofVwiPkJsb2c8L2E+XG4gICAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiR7YmFzZVBhdGh9XCIgY2xhc3M9XCIke2N1cnJlbnRQYXRoID09PSAnLycgfHwgY3VycmVudFBhdGguZW5kc1dpdGgoJ2luZGV4Lmh0bWwnKSA/ICdhY3RpdmUnIDogJyd9XCI+SG9tZTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCIjXCIgaWQ9XCJhYm91dC1idG5cIiBjbGFzcz1cIiR7Y3VycmVudFBhdGguaW5jbHVkZXMoJy9hYm91dCcpID8gJ2FjdGl2ZScgOiAnJ31cIj5BYm91dDwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1jb250YWluZXIgc2VhcmNoLWJhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJzZWFyY2gtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaC4uLlwiIGFyaWEtbGFiZWw9XCJTZWFyY2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwic2VhcmNoLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJTdWJtaXQgc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2VhcmNoXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwidGhlbWUtdG9nZ2xlXCIgYXJpYS1sYWJlbD1cIlRvZ2dsZSBkYXJrIG1vZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaWNvbi1tb29uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImhhbWJ1cmdlci1idG5cIiBjbGFzcz1cIm1vYmlsZS1tZW51LWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJUb2dnbGUgbW9iaWxlIG1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj48c3Bhbj48L3NwYW4+PHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgXG4gICAgICAgIDwhLS0gQWJvdXQgUG9wdXAgTW9kYWwgLS0+XG4gICAgICAgIDxkaXYgaWQ9XCJhYm91dC1wb3B1cFwiIGNsYXNzPVwicG9wdXAgbW9kYWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3B1cC1jb250ZW50IG1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2UtcG9wdXAgY2xvc2UtbW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2UgQWJvdXQgUG9wdXBcIj4mdGltZXM7PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGgyPkFib3V0IE1lPC9oMj5cbiAgICAgICAgICAgICAgICA8cD5IaSB0aGVyZSwgSSdtIE5vZWwhIFdpdGggYSBiYWNrZ3JvdW5kIGluIGNvbXB1dGVyIHNjaWVuY2UgYW5kIGV4cGVyaWVuY2UgYWNyb3NzIHRoZSBmdWxsIHNvZnR3YXJlXG4gICAgICAgICAgICAgICAgICAgIGxpZmVjeWNsZSwgSSBsb3ZlIGRpdmluZyBpbnRvIGNvbXBsZXggcHJvYmxlbXMsIGVzcGVjaWFsbHkgaW4gZnVsbC1zdGFjayBkZXZlbG9wbWVudCBhbmQgY2xvdWRcbiAgICAgICAgICAgICAgICAgICAgc29sdXRpb25zLiBCdXQgdGhpcyBibG9nIGlzbid0IGp1c3QgYWJvdXQgY29kZSDigJMgaXQncyBteSBzcGFjZSBmb3Igc2hhcmluZyBpbnNpZ2h0cywgZXhwbG9yaW5nIG5ldyBpZGVhc1xuICAgICAgICAgICAgICAgICAgICBpbiB0ZWNoIGFuZCBsaWZlLCBhbmQgbGVhcm5pbmcgdG9nZXRoZXIuIFRoYW5rcyBmb3Igc3RvcHBpbmcgYnkhPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPCEtLSBNb2JpbGUgTmF2aWdhdGlvbiBEcmF3ZXIgLS0+XG4gICAgICAgIDxkaXYgaWQ9XCJtb2JpbGUtbmF2LWRyYXdlclwiIGNsYXNzPVwibW9iaWxlLWRyYXdlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRyYXdlci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8aDI+TWVudTwvaDI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImNsb3NlLWRyYXdlci1idG5cIiBhcmlhLWxhYmVsPVwiQ2xvc2UgbWVudVwiPiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vYmlsZS1uYXZcIj5cbiAgICAgICAgICAgICAgICA8IS0tIE5hdmlnYXRpb24gbGlua3Mgd2lsbCBiZSBjbG9uZWQgaGVyZSBieSBKUyAtLT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDwhLS0gRHJhd2VyIE92ZXJsYXkgLS0+XG4gICAgICAgIDxkaXYgaWQ9XCJkcmF3ZXItb3ZlcmxheVwiIGNsYXNzPVwiZHJhd2VyLW92ZXJsYXlcIj48L2Rpdj5cbiAgICBgO1xuICAgIC8vIEV2ZW50IGxpc3RlbmVycyBzaG91bGQgYmUgY2FsbGVkICphZnRlciogcmVuZGVySGVhZGVyIGlzIGV4ZWN1dGVkLlxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVNb2JpbGVOYXYgPSBpbml0aWFsaXplTW9iaWxlTmF2O1xuZnVuY3Rpb24gaW5pdGlhbGl6ZU1vYmlsZU5hdigpIHtcbiAgICBjb25zdCBoYW1idXJnZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGFtYnVyZ2VyLWJ0bicpOyAvLyBFbnN1cmUgdGhpcyBJRCBtYXRjaGVzIHRoZSBidXR0b24gaW4gaGVhZGVyLmpzXG4gICAgY29uc3QgY2xvc2VEcmF3ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtZHJhd2VyLWJ0bicpO1xuICAgIGNvbnN0IGRyYXdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2JpbGUtbmF2LWRyYXdlcicpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJhd2VyLW92ZXJsYXknKTtcbiAgICBjb25zdCBtb2JpbGVOYXZDb250YWluZXIgPSBkcmF3ZXIgPT09IG51bGwgfHwgZHJhd2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkcmF3ZXIucXVlcnlTZWxlY3RvcignLm1vYmlsZS1uYXYnKTtcbiAgICBjb25zdCBkZXNrdG9wTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtaGVhZGVyIG5hdiB1bCcpOyAvLyBHZXQgdGhlIGRlc2t0b3AgbmF2IGxpc3RcbiAgICBpZiAoIWhhbWJ1cmdlckJ0biB8fCAhY2xvc2VEcmF3ZXJCdG4gfHwgIWRyYXdlciB8fCAhb3ZlcmxheSB8fCAhbW9iaWxlTmF2Q29udGFpbmVyIHx8ICFkZXNrdG9wTmF2KSB7XG4gICAgICAgIGNvbnNvbGUud2FybignTW9iaWxlIG5hdmlnYXRpb24gZWxlbWVudHMgbm90IGZvdW5kLiBTa2lwcGluZyBpbml0aWFsaXphdGlvbi4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyAtLS0gQ2xvbmUgRGVza3RvcCBOYXYgTGlua3MgdG8gTW9iaWxlIERyYXdlciAtLS1cbiAgICBjb25zdCBjbG9uZU5hdkxpbmtzID0gKCkgPT4ge1xuICAgICAgICBtb2JpbGVOYXZDb250YWluZXIuaW5uZXJIVE1MID0gJyc7IC8vIENsZWFyIGV4aXN0aW5nIGxpbmtzXG4gICAgICAgIGNvbnN0IGRlc2t0b3BMaW5rcyA9IGRlc2t0b3BOYXYucXVlcnlTZWxlY3RvckFsbCgnbGkgYScpO1xuICAgICAgICBkZXNrdG9wTGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZExpbmsgPSBsaW5rLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsOiBBZGQgc3BlY2lmaWMgY2xhc3NlcyBvciBtb2RpZnkgYXR0cmlidXRlcyBmb3IgbW9iaWxlIGlmIG5lZWRlZFxuICAgICAgICAgICAgbW9iaWxlTmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZExpbmspO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIC0tLSBFdmVudCBMaXN0ZW5lcnMgLS0tXG4gICAgY29uc3Qgb3BlbkRyYXdlciA9ICgpID0+IHtcbiAgICAgICAgZHJhd2VyLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJzsgLy8gUHJldmVudCBiYWNrZ3JvdW5kIHNjcm9sbGluZ1xuICAgIH07XG4gICAgY29uc3QgY2xvc2VEcmF3ZXIgPSAoKSA9PiB7XG4gICAgICAgIGRyYXdlci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7IC8vIFJlc3RvcmUgc2Nyb2xsaW5nXG4gICAgfTtcbiAgICBoYW1idXJnZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50IHRyaWdnZXJpbmcgb3ZlcmxheSBjbGlja1xuICAgICAgICBvcGVuRHJhd2VyKCk7XG4gICAgfSk7XG4gICAgY2xvc2VEcmF3ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZURyYXdlcik7XG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlRHJhd2VyKTtcbiAgICAvLyBDbG9zZSBkcmF3ZXIgd2hlbiBhIGxpbmsgaW5zaWRlIGl0IGlzIGNsaWNrZWRcbiAgICBtb2JpbGVOYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgICAgICBjbG9zZURyYXdlcigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gLS0tIEluaXRpYWxpemF0aW9uIC0tLVxuICAgIGNsb25lTmF2TGlua3MoKTsgLy8gSW5pdGlhbCBwb3B1bGF0aW9uXG4gICAgLy8gT3B0aW9uYWw6IFJlLWNsb25lIGlmIGRlc2t0b3AgbmF2IG1pZ2h0IGNoYW5nZSBkeW5hbWljYWxseSAoZS5nLiwgbG9naW4vbG9nb3V0KVxuICAgIC8vIFlvdSBtaWdodCBuZWVkIGEgbW9yZSByb2J1c3Qgd2F5IHRvIGhhbmRsZSBkeW5hbWljIHVwZGF0ZXMgaWYgcmVxdWlyZWQuXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogTmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZU5hdmlnYXRpb24gPSBpbml0aWFsaXplTmF2aWdhdGlvbjtcbi8qKlxuICogSW5pdGlhbGl6ZSBuYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZU5hdmlnYXRpb24oKSB7XG4gICAgc2V0QWN0aXZlTmF2TGluaygpO1xuICAgIHNldHVwTmF2TGlua3MoKTtcbn1cbi8qKlxuICogU2V0IGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmsgYmFzZWQgb24gY3VycmVudCBVUkwgb3IgcGFnZSBzZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIHNldEFjdGl2ZU5hdkxpbmsoKSB7XG4gICAgY29uc3QgY3VycmVudFBhdGggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCAnI2hvbWUnO1xuICAgIHVwZGF0ZUFjdGl2ZU5hdkxpbmsoY3VycmVudFBhdGgpO1xufVxuLyoqXG4gKiBTZXR1cCBjbGljayBoYW5kbGVycyBmb3IgbmF2aWdhdGlvbiBsaW5rc1xuICovXG5mdW5jdGlvbiBzZXR1cE5hdkxpbmtzKCkge1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgaWYgKGhyZWYpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKGhyZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBIYW5kbGUgc3BlY2lhbCBjYXNlcyBmb3IgcG9wdXAgbGlua3NcbiAgICBjb25zdCBhYm91dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dC1idG4nKTtcbiAgICBpZiAoYWJvdXRCdG4pIHtcbiAgICAgICAgYWJvdXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVOYXZMaW5rKCcjYWJvdXQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBVcGRhdGUgdGhlIGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmtcbiAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIG9yIHNlY3Rpb24gSUQgdG8gYWN0aXZhdGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQWN0aXZlTmF2TGluayhwYXRoKSB7XG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmcm9tIGFsbCBsaW5rc1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaGVhZGVyIG5hdiB1bCBsaSBhJyk7XG4gICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gbWF0Y2hpbmcgbGlua1xuICAgIGNvbnN0IGFjdGl2ZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXIgbmF2IHVsIGxpIGFbaHJlZj1cIiR7cGF0aH1cIl1gKTtcbiAgICBpZiAoYWN0aXZlTGluaykge1xuICAgICAgICBhY3RpdmVMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2NvbXBvbmVudHMvc2VhcmNoLnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVTZWFyY2ggPSBpbml0aWFsaXplU2VhcmNoO1xuLyoqXG4gKiBJbml0aWFsaXplcyBhIHNpbXBsZSwgY2xpZW50LXNpZGUgc2VhcmNoIGZ1bmN0aW9uYWxpdHkgZm9yIGJsb2cgcG9zdHMuXG4gKiBGaWx0ZXJzIGN1cnJlbnRseSB2aXNpYmxlIGJsb2cgY2FyZHMgb24gdGhlIHBhZ2UgYXMgdGhlIHVzZXIgdHlwZXMgb3IgcmVkaXJlY3RzIHRvIHRoZSBob21lcGFnZSBmb3Igc2VhcmNoIG9uIHBvc3QgZGV0YWlsIHBhZ2VzLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplU2VhcmNoKCkge1xuICAgIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKTtcbiAgICBjb25zdCBibG9nQ2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZy5ibG9nLWNhcmRzJyk7IC8vIFRhcmdldCB0aGUgbWFpbiBjb250YWluZXJcbiAgICBjb25zdCBoZXJvU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvJyk7IC8vIEdldCBoZXJvIHNlY3Rpb24gKGNhbiBiZSBudWxsKVxuICAgIGNvbnN0IHNlYXJjaEluZGljYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlYXJjaEluZGljYXRvci5jbGFzc05hbWUgPSAnc2VhcmNoLWluZGljYXRvcic7XG4gICAgc2VhcmNoSW5kaWNhdG9yLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpO1xuICAgIHNlYXJjaEluZGljYXRvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGNvbnN0IGNsZWFyRmlsdGVyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2xlYXJGaWx0ZXJCdG4uY2xhc3NOYW1lID0gJ2NsZWFyLWZpbHRlci1idG4nO1xuICAgIGNsZWFyRmlsdGVyQnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT4gQ2xlYXIgRmlsdGVyJztcbiAgICBjbGVhckZpbHRlckJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQ2xlYXIgc2VhcmNoIGZpbHRlciBhbmQgcmV0dXJuIHRvIGhvbWVwYWdlJyk7XG4gICAgY2xlYXJGaWx0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHNlYXJjaEJhci52YWx1ZSA9ICcnO1xuICAgICAgICBmaWx0ZXJCbG9nQ2FyZHMoJycpO1xuICAgICAgICBzZWFyY2hCYXIuZm9jdXMoKTtcbiAgICB9KTtcbiAgICBzZWFyY2hJbmRpY2F0b3IuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcbiAgICBzZWFyY2hJbmRpY2F0b3IuYXBwZW5kQ2hpbGQoY2xlYXJGaWx0ZXJCdG4pO1xuICAgIGNvbnN0IGhlYWRlclJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1yaWdodCcpO1xuICAgIGhlYWRlclJpZ2h0ID09PSBudWxsIHx8IGhlYWRlclJpZ2h0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoZWFkZXJSaWdodC5pbnNlcnRCZWZvcmUoc2VhcmNoSW5kaWNhdG9yLCBoZWFkZXJSaWdodC5maXJzdENoaWxkKTtcbiAgICBsZXQgYWxsQ2FyZHMgPSBbXTtcbiAgICBsZXQgZGVib3VuY2VUaW1lcjtcbiAgICBzZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSBzZWFyY2hCYXIudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNsZWFyVGltZW91dChkZWJvdW5jZVRpbWVyKTtcbiAgICAgICAgZGVib3VuY2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZmlsdGVyQmxvZ0NhcmRzKHNlYXJjaFRlcm0pO1xuICAgICAgICB9LCAzMDApO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGZpbHRlckJsb2dDYXJkcyh0ZXJtKSB7XG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoJ3Bvc3QuaHRtbCcpKSB7XG4gICAgICAgICAgICBpZiAodGVybSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC8/c2VhcmNoPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRlcm0pfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvYDsgLy8gUmVkaXJlY3QgdG8gaG9tZXBhZ2UgaWYgc2VhcmNoIGlzIGNsZWFyZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjsgLy8gRXhpdCB0aGUgZnVuY3Rpb24gYXMgd2UndmUgcmVkaXJlY3RlZFxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIChoZXJvU2VjdGlvbikge1xuICAgICAgICAvLyAgICAgaGVyb1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9IHRlcm0gPyAnbm9uZScgOiAnJztcbiAgICAgICAgLy8gfVxuICAgICAgICBpZiAoIWJsb2dDYXJkc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBJZiBubyBibG9nIGNhcmRzIGNvbnRhaW5lciAobm90IG9uIG1haW4gcGFnZSksIGRvIG5vdGhpbmcgbW9yZVxuICAgICAgICB9XG4gICAgICAgIGlmIChhbGxDYXJkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFsbENhcmRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYmxvZy5ibG9nLWNhcmRzIC5ibG9nLWNhcmQsICNoaWRkZW4tcG9zdHMgLmJsb2ctY2FyZCcpKTtcbiAgICAgICAgICAgIGlmIChhbGxDYXJkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGJsb2cgY2FyZHMgZm91bmQgdG8gZmlsdGVyLlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgU2VhcmNoIGZpbHRlcmluZyBpbml0aWFsaXplZCB3aXRoICR7YWxsQ2FyZHMubGVuZ3RofSBjYXJkcy5gKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmlzaWJsZUNvdW50ID0gMDtcbiAgICAgICAgYWxsQ2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlc1NlYXJjaCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCF0ZXJtKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlc1NlYXJjaCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9ICgoX2IgPSAoX2EgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ2gzJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvTG93ZXJDYXNlKCkpIHx8ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBBcnJheS5mcm9tKGNhcmQucXVlcnlTZWxlY3RvckFsbCgnLnRhZy1iYWRnZScpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKHRhZyA9PiB7IHZhciBfYTsgcmV0dXJuICgoX2EgPSB0YWcudGV4dENvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0xvd2VyQ2FzZSgpKSB8fCAnJzsgfSk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlc1NlYXJjaCA9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLmluY2x1ZGVzKHRlcm0pIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzLnNvbWUodGFnID0+IHRhZy5pbmNsdWRlcyh0ZXJtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hlc1NlYXJjaCkge1xuICAgICAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuLWJ5LXNlYXJjaCcpO1xuICAgICAgICAgICAgICAgIHZpc2libGVDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4tYnktc2VhcmNoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0ZXh0U3BhbiA9IHNlYXJjaEluZGljYXRvci5xdWVyeVNlbGVjdG9yKCdzcGFuJyk7XG4gICAgICAgIGlmICh0ZXh0U3Bhbikge1xuICAgICAgICAgICAgdGV4dFNwYW4udGV4dENvbnRlbnQgPSB0ZXJtXG4gICAgICAgICAgICAgICAgPyAodmlzaWJsZUNvdW50ID4gMFxuICAgICAgICAgICAgICAgICAgICA/IGBTaG93aW5nICR7dmlzaWJsZUNvdW50fSByZXN1bHQke3Zpc2libGVDb3VudCA+IDEgPyAncycgOiAnJ30gZm9yIFwiJHt0ZXJtfVwiYFxuICAgICAgICAgICAgICAgICAgICA6IGBObyByZXN1bHRzIGZvdW5kIGZvciBcIiR7dGVybX1cImApXG4gICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hJbmRpY2F0b3Iuc3R5bGUuZGlzcGxheSA9IHRlcm0gPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICBjb25zdCBub1Jlc3VsdHNNZXNzYWdlID0gYmxvZ0NhcmRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5uby1zZWFyY2gtcmVzdWx0cy1tZXNzYWdlJyk7XG4gICAgICAgIGlmICh2aXNpYmxlQ291bnQgPT09IDAgJiYgdGVybSkge1xuICAgICAgICAgICAgaWYgKCFub1Jlc3VsdHNNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2xhc3NOYW1lID0gJ2VtcHR5LXN0YXRlIG5vLXNlYXJjaC1yZXN1bHRzLW1lc3NhZ2UnO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zZWFyY2ggZmEtM3hcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxoMz5ObyBtYXRjaGluZyBwb3N0cyBmb3VuZDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwPlRyeSBkaWZmZXJlbnQga2V5d29yZHMuPC9wPlxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vUmVzdWx0c01lc3NhZ2UpIHtcbiAgICAgICAgICAgIG5vUmVzdWx0c01lc3NhZ2UucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHNlYXJjaEJhci52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgZmlsdGVyQmxvZ0NhcmRzKCcnKTtcbiAgICAgICAgICAgIHNlYXJjaEJhci5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJ1dHRvbicpO1xuICAgIGlmIChzZWFyY2hCdXR0b24pIHtcbiAgICAgICAgc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHNlYXJjaEJhci52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGZpbHRlckJsb2dDYXJkcyhzZWFyY2hUZXJtKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUJsb2dGcm9udGVuZCA9IGluaXRpYWxpemVCbG9nRnJvbnRlbmQ7XG4vLyBibG9nRnJvbnRlbmRDb250cm9sbGVyLnRzXG4vKipcbiAqIEJsb2cgRnJvbnRlbmQgQ29udHJvbGxlclxuICogQ2xpZW50LXNpZGUgY29udHJvbGxlciB0aGF0IGhhbmRsZXMgYWxsIGZyb250ZW5kIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBibG9nIGhvbWVwYWdlLlxuICogTWFuYWdlcyBVSSBpbml0aWFsaXphdGlvbiwgcG9zdCByZW5kZXJpbmcsIGZpbHRlcmluZywgcGFnaW5hdGlvbiwgYW5kIHVzZXIgaW50ZXJhY3Rpb25zLlxuICovXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7IC8vIFVzZXMgc3RhdGljIGZldGNoIG5vd1xuY29uc3QgYmxvZ0NhcmRzXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9ibG9nQ2FyZHNcIik7XG5jb25zdCBuYXZpZ2F0aW9uXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9uYXZpZ2F0aW9uL25hdmlnYXRpb25cIik7XG5jb25zdCBzdGF0ZV8xID0gcmVxdWlyZShcIi4vc3RhdGVcIik7XG4vKipcbiAqIEluaXRpYWxpemUgdGhlIGJsb2cgZnJvbnRlbmQgZnVuY3Rpb25hbGl0eSAoaG9tZXBhZ2UpXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVCbG9nRnJvbnRlbmQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoMCwgbmF2aWdhdGlvbl8xLmluaXRpYWxpemVOYXZpZ2F0aW9uKSgpO1xuICAgICAgICAvLyBJbml0aWFsaXplIHBvc3RzLCB3aGljaCBub3cgaW5jbHVkZXMgZmlsdGVyaW5nIGJhc2VkIG9uIFVSTCBwYXJhbXNcbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IChfYSA9IHVybFBhcmFtcy5nZXQoJ3NlYXJjaCcpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB1bmRlZmluZWQ7XG4gICAgICAgIHlpZWxkIGluaXRpYWxpemVQb3N0cyhzZWFyY2hUZXJtKTtcbiAgICAgICAgaW5pdGlhbGl6ZVBhZ2luYXRpb24oKTsgLy8gTm93IGNhbGxzIG91ciBsb2NhbCBmdW5jdGlvbiwgbm90IHRoZSBjb21wb25lbnRcbiAgICAgICAgc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCk7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgY3VzdG9tIGV2ZW50IHRvIHJlbG9hZCBwb3N0cyAoZS5nLiwgYWZ0ZXIgc2VhcmNoIG9yIGZpbHRlciBjaGFuZ2UpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlbG9hZFBvc3RzJywgaGFuZGxlUmVsb2FkUG9zdHMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBIYW5kbGVzIHRoZSBjdXN0b20gJ3JlbG9hZFBvc3RzJyBldmVudC4gUmVmZXRjaGVzIGFuZCByZS1yZW5kZXJzIHBvc3RzLlxuICovXG5mdW5jdGlvbiBoYW5kbGVSZWxvYWRQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIFJlLWluaXRpYWxpemUgcG9zdHMsIHdoaWNoIHdpbGwgcGljayB1cCBhbnkgbmV3IFVSTCBwYXJhbWV0ZXJzIChsaWtlIHNlYXJjaCBxdWVyeSBPUiB0YWcpXG4gICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoX2EgPSB1cmxQYXJhbXMuZ2V0KCdzZWFyY2gnKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdW5kZWZpbmVkO1xuICAgICAgICB5aWVsZCBpbml0aWFsaXplUG9zdHMoc2VhcmNoVGVybSk7XG4gICAgICAgIGluaXRpYWxpemVQYWdpbmF0aW9uKCk7XG4gICAgICAgIHNldHVwQmxvZ0NhcmRzRGVsZWdhdGlvbigpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBTZXQgdXAgZXZlbnQgZGVsZWdhdGlvbiBmb3IgYmxvZyBjYXJkcyBjb250YWluZXJcbiAqL1xuZnVuY3Rpb24gc2V0dXBCbG9nQ2FyZHNEZWxlZ2F0aW9uKCkge1xuICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nLmJsb2ctY2FyZHMnKTtcbiAgICBpZiAoYmxvZ0NhcmRzQ29udGFpbmVyKSB7XG4gICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUJsb2dDYXJkQ2xpY2spOyAvLyBQcmV2ZW50IGR1cGxpY2F0ZXNcbiAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQmxvZ0NhcmRDbGljayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBmaW5kICNibG9nLmJsb2ctY2FyZHMgY29udGFpbmVyIGZvciBkZWxlZ2F0aW9uLicpO1xuICAgIH1cbn1cbi8qKlxuICogSGFuZGxlIGNsaWNrIGV2ZW50cyBvbiBibG9nIGNhcmRzIGZvciBuYXZpZ2F0aW9uXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUJsb2dDYXJkQ2xpY2soZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgY2FyZCA9IHRhcmdldC5jbG9zZXN0KCcuYmxvZy1jYXJkJyk7XG4gICAgaWYgKGNhcmQpIHtcbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCdidXR0b24sIGEsIGknKSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCdhLnRhZy1iYWRnZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IGNhcmQuZGF0YXNldC5wb3N0SWQ7XG4gICAgICAgIGlmIChwb3N0SWQpIHtcbiAgICAgICAgICAgIC8vIFVzZSByZWxhdGl2ZSBwYXRoIGZvciBuYXZpZ2F0aW9uXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBwb3N0Lmh0bWw/aWQ9JHtwb3N0SWR9YDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSW5pdGlhbGl6ZSBibG9nIHBvc3RzOiBGZXRjaCwgZmlsdGVyIChiYXNlZCBvbiBVUkwgcGFyYW0pLCBhbmQgcmVuZGVyLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUG9zdHMoc2VhcmNoVGVybSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGJsb2dDYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nLmJsb2ctY2FyZHMnKTtcbiAgICAgICAgaWYgKCFibG9nQ2FyZHNDb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Jsb2cgY2FyZHMgY29udGFpbmVyICgjYmxvZy5ibG9nLWNhcmRzKSBub3QgZm91bmQgaW4gdGhlIERPTS4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyAtLS0gQ2hlY2sgZm9yIFRhZyBGaWx0ZXIgLS0tXG4gICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgIGNvbnN0IHRhZ0ZpbHRlciA9IHVybFBhcmFtcy5nZXQoJ3RhZycpO1xuICAgICAgICBjb25zdCBmaWx0ZXJEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci1kaXNwbGF5Jyk7IC8vIE9wdGlvbmFsIGVsZW1lbnQgdG8gc2hvdyBmaWx0ZXJcbiAgICAgICAgLy8gLS0tIERldGVybWluZSBCYXNlIFBhdGggKG5lZWRlZCBmb3IgQ2xlYXIgRmlsdGVyIGxpbmspIC0tLVxuICAgICAgICBjb25zdCBjdXJyZW50SG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgICAgIGNvbnN0IGlzUHJvZHVjdGlvbiA9IGN1cnJlbnRIb3N0bmFtZSA9PT0gJ25vZWx1Z3dva2UuY29tJyB8fCBjdXJyZW50SG9zdG5hbWUuZW5kc1dpdGgoJy5naXRodWIuaW8nKTtcbiAgICAgICAgLy8gKioqIElNUE9SVEFOVDogQ2hhbmdlICcvYmxvZy8nIGlmIHlvdXIgR2l0SHViIHJlcG8gbmFtZS9wYXRoIGlzIGRpZmZlcmVudCAqKipcbiAgICAgICAgY29uc3QgYmFzZVBhdGggPSBpc1Byb2R1Y3Rpb24gPyAnL2Jsb2cvJyA6ICcvJztcbiAgICAgICAgLy8gUmVtb3ZlIGFueSBleGlzdGluZyBmaWx0ZXIgaW5kaWNhdG9yIGJlZm9yZSBwb3RlbnRpYWxseSBhZGRpbmcgYSBuZXcgb25lXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nRmlsdGVySW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhZy1maWx0ZXItaW5kaWNhdG9yJyk7XG4gICAgICAgIGlmIChleGlzdGluZ0ZpbHRlckluZGljYXRvcikge1xuICAgICAgICAgICAgZXhpc3RpbmdGaWx0ZXJJbmRpY2F0b3IucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGZpbHRlciBpbmRpY2F0b3IgaWYgdGFnRmlsdGVyIGV4aXN0c1xuICAgICAgICBpZiAodGFnRmlsdGVyKSB7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGZpbHRlckNvbnRhaW5lci5jbGFzc05hbWUgPSAndGFnLWZpbHRlci1pbmRpY2F0b3InO1xuICAgICAgICAgICAgLy8gVXNlIGJhc2VQYXRoIGZvciB0aGUgQ2xlYXIgZmlsdGVyIGxpbmsncyBocmVmXG4gICAgICAgICAgICBmaWx0ZXJDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHA+U2hvd2luZyBwb3N0cyB0YWdnZWQgd2l0aDogPHNwYW4gY2xhc3M9XCJmaWx0ZXJlZC10YWdcIj4ke3RhZ0ZpbHRlcn08L3NwYW4+PC9wPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiR7YmFzZVBhdGh9XCIgY2xhc3M9XCJjbGVhci1maWx0ZXJcIj5DbGVhciBmaWx0ZXI8L2E+XG4gICAgICAgIGA7XG4gICAgICAgICAgICBjb25zdCBibG9nU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdibG9nJyk7XG4gICAgICAgICAgICBpZiAoYmxvZ1NlY3Rpb24gPT09IG51bGwgfHwgYmxvZ1NlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJsb2dTZWN0aW9uLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBibG9nU2VjdGlvbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmaWx0ZXJDb250YWluZXIsIGJsb2dTZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWx0ZXJEaXNwbGF5KSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyRGlzcGxheS50ZXh0Q29udGVudCA9IGBTaG93aW5nIHBvc3RzIHRhZ2dlZCB3aXRoOiBcIiR7dGFnRmlsdGVyfVwiYDtcbiAgICAgICAgICAgICAgICBmaWx0ZXJEaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpbHRlckRpc3BsYXkpIHtcbiAgICAgICAgICAgIGZpbHRlckRpc3BsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICAvLyAtLS0gRW5kIENoZWNrIGZvciBUYWcgRmlsdGVyIC0tLVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibG9hZGluZy1zcGlubmVyXCI+PC9kaXY+PHA+TG9hZGluZyBwb3N0cy4uLjwvcD4nO1xuICAgICAgICAgICAgbGV0IGFsbFBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgLy8gLS0tIEFwcGx5IFRhZyBGaWx0ZXIgLS0tXG4gICAgICAgICAgICBsZXQgcG9zdHNUb0Rpc3BsYXkgPSBhbGxQb3N0cztcbiAgICAgICAgICAgIGlmICh0YWdGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBwb3N0c1RvRGlzcGxheSA9IGFsbFBvc3RzLmZpbHRlcihwb3N0ID0+IHBvc3QudGFncyAmJiBwb3N0LnRhZ3Muc29tZSh0YWcgPT4gdGFnLnRvTG93ZXJDYXNlKCkgPT09IHRhZ0ZpbHRlci50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGZpbHRlcmVkIHRhZyBpbiBmcm9udGVuZCBzdGF0ZVxuICAgICAgICAgICAgICAgIHN0YXRlXzEuZnJvbnRlbmRTdGF0ZS5maWx0ZXJlZFRhZyA9IHRhZ0ZpbHRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXRlXzEuZnJvbnRlbmRTdGF0ZS5maWx0ZXJlZFRhZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0tLSBFbmQgQXBwbHkgVGFnIEZpbHRlciAtLS1cbiAgICAgICAgICAgIC8vIC0tLSBBcHBseSBTZWFyY2ggRmlsdGVyIC0tLVxuICAgICAgICAgICAgaWYgKHNlYXJjaFRlcm0pIHtcbiAgICAgICAgICAgICAgICBwb3N0c1RvRGlzcGxheSA9IHBvc3RzVG9EaXNwbGF5LmZpbHRlcihwb3N0ID0+IHBvc3QudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICAgICAgICAgICAgICAgIHBvc3QuY29udGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgcG9zdC50YWdzLnNvbWUodGFnID0+IHRhZy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0tLSBFbmQgQXBwbHkgU2VhcmNoIEZpbHRlciAtLS1cbiAgICAgICAgICAgIGJsb2dDYXJkc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGlmIChwb3N0c1RvRGlzcGxheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzaG93RW1wdHlTdGF0ZShibG9nQ2FyZHNDb250YWluZXIsIHRhZ0ZpbHRlciAhPT0gbnVsbCAmJiB0YWdGaWx0ZXIgIT09IHZvaWQgMCA/IHRhZ0ZpbHRlciA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC1tb3JlLWJ0bicpO1xuICAgICAgICAgICAgICAgIGlmIChsb2FkTW9yZUJ0bilcbiAgICAgICAgICAgICAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQYWdpbmF0aW9uIGxvZ2ljXG4gICAgICAgICAgICBjb25zdCBpbml0aWFsUG9zdENvdW50ID0gc3RhdGVfMS5mcm9udGVuZFN0YXRlLnBvc3RzUGVyUGFnZTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlQb3N0cyA9IHBvc3RzVG9EaXNwbGF5LnNsaWNlKDAsIGluaXRpYWxQb3N0Q291bnQpO1xuICAgICAgICAgICAgY29uc3QgaGlkZGVuUG9zdHMgPSBwb3N0c1RvRGlzcGxheS5zbGljZShpbml0aWFsUG9zdENvdW50KTtcbiAgICAgICAgICAgIGRpc3BsYXlQb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2dDYXJkID0gKDAsIGJsb2dDYXJkc18xLmNyZWF0ZUJsb2dDYXJkRWxlbWVudCkocG9zdCk7XG4gICAgICAgICAgICAgICAgYmxvZ0NhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2dDYXJkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgaGlkZGVuUG9zdHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLXBvc3RzJyk7XG4gICAgICAgICAgICBpZiAoaGlkZGVuUG9zdHNDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9nQ2FyZCA9ICgwLCBibG9nQ2FyZHNfMS5jcmVhdGVCbG9nQ2FyZEVsZW1lbnQpKHBvc3QpO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5Qb3N0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChibG9nQ2FyZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBsb2FkTW9yZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLW1vcmUtYnRuJyk7XG4gICAgICAgICAgICBpZiAobG9hZE1vcmVCdG4pIHtcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gaGlkZGVuUG9zdHMubGVuZ3RoID4gMCA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgcG9zdHM6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd0Vycm9yU3RhdGUoYmxvZ0NhcmRzQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBTaG93IGVtcHR5IHN0YXRlIHdoZW4gbm8gcG9zdHMgYXJlIGF2YWlsYWJsZVxuICovXG5mdW5jdGlvbiBzaG93RW1wdHlTdGF0ZShjb250YWluZXIsIHRhZ0ZpbHRlcikge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1zdGF0ZVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtbmV3c3BhcGVyIGZhLTN4XCI+PC9pPlxuICAgICAgICAgICAgPGgzPiR7dGFnRmlsdGVyID8gYE5vIHBvc3RzIGZvdW5kIHdpdGggdGFnIFwiJHt0YWdGaWx0ZXJ9XCJgIDogJ05vIHBvc3RzIGF2YWlsYWJsZSd9PC9oMz5cbiAgICAgICAgICAgIDxwPiR7dGFnRmlsdGVyID8gJ1RyeSBzZWxlY3RpbmcgYSBkaWZmZXJlbnQgdGFnIG9yIGNoZWNrIGJhY2sgbGF0ZXIuJyA6ICdDaGVjayBiYWNrIGxhdGVyIGZvciBuZXcgY29udGVudC4nfTwvcD5cbiAgICAgICAgICAgICR7dGFnRmlsdGVyID8gYDxhIGhyZWY9XCIvXCIgY2xhc3M9XCJidG5cIj5WaWV3IEFsbCBQb3N0czwvYT5gIDogJyd9XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4vKipcbiAqIFNob3cgZXJyb3Igc3RhdGUgd2hlbiBwb3N0cyBjb3VsZG4ndCBiZSBsb2FkZWRcbiAqL1xuZnVuY3Rpb24gc2hvd0Vycm9yU3RhdGUoY29udGFpbmVyKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXN0YXRlXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1leGNsYW1hdGlvbi1jaXJjbGUgZmEtM3hcIj48L2k+XG4gICAgICAgICAgICA8aDM+RmFpbGVkIHRvIGxvYWQgcG9zdHM8L2gzPlxuICAgICAgICAgICAgPHA+VGhlcmUgd2FzIGFuIGVycm9yIGxvYWRpbmcgdGhlIGJsb2cgcG9zdHMuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuPC9wPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwid2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXCIgY2xhc3M9XCJidG5cIj5SZXRyeTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuLyoqXG4gKiBJbml0aWFsaXplIHBhZ2luYXRpb24gY29udHJvbHNcbiAqIFRoaXMgcmVwbGFjZXMgdGhlIGV4dGVybmFsIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbiB3aXRoIGludGVncmF0ZWQgZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUGFnaW5hdGlvbigpIHtcbiAgICBzZXR1cExvYWRNb3JlQnV0dG9uKCk7XG4gICAgdXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzKCk7XG59XG4vKipcbiAqIFNldCB1cCB0aGUgXCJMb2FkIE1vcmVcIiBidXR0b24gZnVuY3Rpb25hbGl0eVxuICovXG5mdW5jdGlvbiBzZXR1cExvYWRNb3JlQnV0dG9uKCkge1xuICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICBjb25zdCBoaWRkZW5Qb3N0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICBjb25zdCB2aXNpYmxlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cuYmxvZy1jYXJkcycpO1xuICAgIGlmICghbG9hZE1vcmVCdG4gfHwgIWhpZGRlblBvc3RzQ29udGFpbmVyIHx8ICF2aXNpYmxlQ29udGFpbmVyKVxuICAgICAgICByZXR1cm47XG4gICAgLy8gUmVtb3ZlIGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVyIHRvIHByZXZlbnQgZHVwbGljYXRlc1xuICAgIGxvYWRNb3JlQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlTG9hZE1vcmUpO1xuICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lclxuICAgIGxvYWRNb3JlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlTG9hZE1vcmUpO1xufVxuLyoqXG4gKiBIYW5kbGUgdGhlIFwiTG9hZCBNb3JlXCIgYnV0dG9uIGNsaWNrXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUxvYWRNb3JlKCkge1xuICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICBjb25zdCBoaWRkZW5Qb3N0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICBjb25zdCB2aXNpYmxlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cuYmxvZy1jYXJkcycpO1xuICAgIGlmICghbG9hZE1vcmVCdG4gfHwgIWhpZGRlblBvc3RzQ29udGFpbmVyIHx8ICF2aXNpYmxlQ29udGFpbmVyKVxuICAgICAgICByZXR1cm47XG4gICAgLy8gR2V0IHBvc3RzIHRvIHNob3cgKHVzZSBhIHJlYXNvbmFibGUgYmF0Y2ggc2l6ZSlcbiAgICBjb25zdCBwb3N0c1RvU2hvdyA9IEFycmF5LmZyb20oaGlkZGVuUG9zdHNDb250YWluZXIuY2hpbGRyZW4pLnNsaWNlKDAsIHN0YXRlXzEuZnJvbnRlbmRTdGF0ZS5wb3N0c1BlclBhZ2UpO1xuICAgIC8vIE1vdmUgcG9zdHMgZnJvbSBoaWRkZW4gdG8gdmlzaWJsZSBjb250YWluZXJcbiAgICBwb3N0c1RvU2hvdy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICB2aXNpYmxlQ29udGFpbmVyLmFwcGVuZENoaWxkKHBvc3QpO1xuICAgIH0pO1xuICAgIC8vIEhpZGUgYnV0dG9uIGlmIG5vIG1vcmUgaGlkZGVuIHBvc3RzXG4gICAgaWYgKGhpZGRlblBvc3RzQ29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBsb2FkTW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgICAvLyBEaXNwYXRjaCBzdGF0ZSBjaGFuZ2UgZm9yIGFuYWx5dGljcyBvciBvdGhlciBjb21wb25lbnRzXG4gICAgKDAsIHN0YXRlXzEuZGlzcGF0Y2hTdGF0ZUNoYW5nZSkoJ2Zyb250ZW5kJywgJ2xvYWRlZE1vcmVQb3N0cycpO1xufVxuLyoqXG4gKiBVcGRhdGUgcGFnaW5hdGlvbiBjb250cm9scyB2aXNpYmlsaXR5IGJhc2VkIG9uIGN1cnJlbnQgc3RhdGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzKCkge1xuICAgIGNvbnN0IGxvYWRNb3JlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZS1idG4nKTtcbiAgICBjb25zdCBoaWRkZW5Qb3N0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tcG9zdHMnKTtcbiAgICBpZiAobG9hZE1vcmVCdG4gJiYgaGlkZGVuUG9zdHNDb250YWluZXIpIHtcbiAgICAgICAgbG9hZE1vcmVCdG4uc3R5bGUuZGlzcGxheSA9IGhpZGRlblBvc3RzQ29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kaXNwYXRjaFN0YXRlQ2hhbmdlID0gZXhwb3J0cy5mcm9udGVuZFN0YXRlID0gZXhwb3J0cy5zdGF0ZSA9IHZvaWQgMDtcbi8vIEluaXRpYWxpemUgYWRtaW4gc3RhdGVcbmV4cG9ydHMuc3RhdGUgPSB7XG4gICAgY3VycmVudFBhZ2U6IDEsXG4gICAgcG9zdHNQZXJQYWdlOiAxMCxcbiAgICB0b3RhbFBhZ2VzOiAxLFxuICAgIHBvc3RzOiBbXSxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICBzb3J0Qnk6ICduZXdlc3QnLFxuICAgIGluaXRpYWxpemVkOiBmYWxzZVxufTtcbi8vIEluaXRpYWxpemUgZnJvbnRlbmQgc3RhdGVcbmV4cG9ydHMuZnJvbnRlbmRTdGF0ZSA9IHtcbiAgICBkYXJrTW9kZTogZmFsc2UsXG4gICAgcG9zdHNQZXJQYWdlOiA2LCAvLyBTaG93IDYgcG9zdHMgaW5pdGlhbGx5IG9uIGZyb250ZW5kXG4gICAgZmlsdGVyZWRUYWc6IHVuZGVmaW5lZFxufTtcbi8vIFN0YXRlIGNoYW5nZSBldmVudCBmb3IgY29tcG9uZW50cyB0byByZWFjdCB0byBzdGF0ZSBjaGFuZ2VzXG5jb25zdCBkaXNwYXRjaFN0YXRlQ2hhbmdlID0gKHN0YXRlVHlwZSwgcHJvcGVydHkpID0+IHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc3RhdGVDaGFuZ2UnLCB7XG4gICAgICAgIGRldGFpbDogeyB0eXBlOiBzdGF0ZVR5cGUsIHByb3BlcnR5IH1cbiAgICB9KSk7XG59O1xuZXhwb3J0cy5kaXNwYXRjaFN0YXRlQ2hhbmdlID0gZGlzcGF0Y2hTdGF0ZUNoYW5nZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gc3JjL2VudHJpZXMvY2xpZW50LnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIC0tLSBJbXBvcnRzIC0tLVxuLy8gUGFnZSBTcGVjaWZpYyBMb2dpY1xuY29uc3QgYmxvZ0Zyb250ZW5kQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2Jsb2dGcm9udGVuZENvbnRyb2xsZXJcIik7XG5jb25zdCBwb3N0RGV0YWlsXzEgPSByZXF1aXJlKFwiLi4vbW9kdWxlcy9wb3N0RGV0YWlsXCIpO1xuLy8gQ29tbW9uIENvbXBvbmVudHMgJiBVdGlsaXRpZXNcbmNvbnN0IGhlYWRlcl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2aWdhdGlvbi9oZWFkZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG5jb25zdCBtb2JpbGVOYXZfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL25hdmlnYXRpb24vbW9iaWxlTmF2XCIpO1xuY29uc3Qgc2VhcmNoXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9zZWFyY2hcIik7IC8vIEFzc3VtaW5nIHBhdGggaXMgY29ycmVjdFxuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uXCIpO1xuY29uc3QgYWJvdXRfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2Fib3V0XCIpOyAvLyBBc3N1bWluZyBwYXRoIGlzIGNvcnJlY3Rcbi8vIEltcG9ydCB0YWcgZmlsdGVyaW5nIGlmIGl0IHNldHMgdXAgZ2xvYmFsIGxpc3RlbmVycyBvciBuZWVkcyB0byBydW4gZWFybHlcbi8vIGltcG9ydCB7IGluaXRpYWxpemVUYWdGaWx0ZXJpbmcgfSBmcm9tICcuLi9jb21wb25lbnRzL3RhZ0ZpbHRlcic7IC8vIEFzc3VtaW5nIHBhdGggaXMgY29ycmVjdFxuLyoqXG4gKiBDbGllbnQtc2lkZSBlbnRyeSBwb2ludCBpbml0aWFsaXplci5cbiAqIEluaXRpYWxpemVzIGNvbW1vbiBjb21wb25lbnRzIGFuZCBwYWdlLXNwZWNpZmljIGxvZ2ljLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQ2xpZW50KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGllbnQgaW5pdGlhbGl6aW5nLi4uJyk7XG4gICAgICAgIC8vIC0tLSBJbml0aWFsaXplIENvbW1vbiBFbGVtZW50cyAmIEZ1bmN0aW9uYWxpdHkgLS0tXG4gICAgICAgIC8vIFRoZXNlIHJ1biBvbiBldmVyeSBwYWdlIHRoYXQgbG9hZHMgY2xpZW50LmJ1bmRsZS5qc1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVGhlbWUgYW5kIEhlYWRlciBmaXJzdFxuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UpKCk7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGFyayBtb2RlIGluaXRpYWxpemVkIGdsb2JhbGx5LicpO1xuICAgICAgICAgICAgLy8gUmVuZGVyIEhlYWRlciBvbmx5IGlmIHBsYWNlaG9sZGVyIGV4aXN0c1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXItcGxhY2Vob2xkZXInKSkge1xuICAgICAgICAgICAgICAgICgwLCBoZWFkZXJfMS5yZW5kZXJIZWFkZXIpKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0hlYWRlciByZW5kZXJlZCBnbG9iYWxseS4nKTtcbiAgICAgICAgICAgICAgICAvLyBXYWl0IGEgbW9tZW50IGZvciBET00gdG8gdXBkYXRlIGJlZm9yZSBpbml0aWFsaXppbmcgY29tcG9uZW50cyBkZXBlbmRlbnQgb24gaGVhZGVyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgY29tcG9uZW50cyBkZXBlbmRlbnQgb24gaGVhZGVyICphZnRlciogcmVuZGVyaW5nXG4gICAgICAgICAgICAgICAgICAgICgwLCBtb2JpbGVOYXZfMS5pbml0aWFsaXplTW9iaWxlTmF2KSgpOyAvLyBJbml0aWFsaXplIG1vYmlsZSBuYXYgdXNpbmcgaGVhZGVyIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICgwLCBzZWFyY2hfMS5pbml0aWFsaXplU2VhcmNoKSgpOyAvLyBJbml0aWFsaXplIHNlYXJjaCBiYXIgaW4gaGVhZGVyXG4gICAgICAgICAgICAgICAgICAgICgwLCBuYXZpZ2F0aW9uXzEuaW5pdGlhbGl6ZU5hdmlnYXRpb24pKCk7IC8vIEluaXRpYWxpemUgbmF2IGxpbmsgYWN0aXZlIHN0YXRlc1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGVyLWRlcGVuZGVudCBjb21wb25lbnRzIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdIZWFkZXIgcGxhY2Vob2xkZXIgbm90IGZvdW5kIG9uIHRoaXMgcGFnZS4gU2tpcHBpbmcgaGVhZGVyLWRlcGVuZGVudCBpbml0aWFsaXphdGlvbnMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIG90aGVyIGNvbW1vbiBVSSBlbGVtZW50cyBsaWtlIHBvcHVwc1xuICAgICAgICAgICAgKDAsIGFib3V0XzEuaW5pdGlhbGl6ZUFib3V0KSgpOyAvLyBBc3N1bWVzICNhYm91dC1idG4gYW5kICNhYm91dC1wb3B1cCBtaWdodCBleGlzdCBnbG9iYWxseSBvciBhcmUgaGFuZGxlZCBzYWZlbHkgaW5zaWRlXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHRhZyBmaWx0ZXJpbmcgbGlzdGVuZXJzIGlmIG5lZWRlZCBnbG9iYWxseSAoZS5nLiwgaWYgdGFncyBhcHBlYXIgaW4gaGVhZGVyL2Zvb3RlcilcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemVUYWdGaWx0ZXJpbmcoKTsgXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGNvbW1vbiBlbGVtZW50czpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIC0tLSBFbmQgQ29tbW9uIEVsZW1lbnRzIC0tLVxuICAgICAgICAvLyAtLS0gUGFnZS1TcGVjaWZpYyBMb2dpYyAtLS1cbiAgICAgICAgY29uc3QgcGFnZVR5cGUgPSBkb2N1bWVudC5ib2R5LmRhdGFzZXQucGFnZTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIGNvbnN0IGlzUm9vdE9ySW5kZXggPSBjdXJyZW50UGFnZS5lbmRzV2l0aCgnLycpIHx8IGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvaW5kZXguaHRtbCcpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYERldGVjdGVkIHBhZ2VUeXBlOiAke3BhZ2VUeXBlfSwgY3VycmVudFBhZ2U6ICR7Y3VycmVudFBhZ2V9LCBpc1Jvb3RPckluZGV4OiAke2lzUm9vdE9ySW5kZXh9YCk7XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgTWFpbiBQYWdlIFxuICAgICAgICAgICAgaWYgKHBhZ2VUeXBlID09PSAnbWFpbicgfHwgKCFwYWdlVHlwZSAmJiBpc1Jvb3RPckluZGV4KSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgbWFpbiBibG9nIHBhZ2UgbG9naWMuLi4nKTtcbiAgICAgICAgICAgICAgICB5aWVsZCAoMCwgYmxvZ0Zyb250ZW5kQ29udHJvbGxlcl8xLmluaXRpYWxpemVCbG9nRnJvbnRlbmQpKCk7IC8vIEhhbmRsZXMgcG9zdHMsIHBhZ2luYXRpb24sIGNhcmQgZGVsZWdhdGlvbiBldGMuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01haW4gYmxvZyBwYWdlIGxvZ2ljIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBQb3N0IERldGFpbCBQYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ3Bvc3QnIHx8ICghcGFnZVR5cGUgJiYgY3VycmVudFBhZ2UuZW5kc1dpdGgoJy9wb3N0Lmh0bWwnKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIHBvc3QgZGV0YWlsIHBhZ2UgbG9naWMgKGZyb20gbW9kdWxlKS4uLicpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBwb3N0RGV0YWlsXzEuaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMpKCk7IC8vIEhhbmRsZXMgc2luZ2xlIHBvc3QgZGlzcGxheSwgbGlrZSwgY29tbWVudHMgZXRjLlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQb3N0IGRldGFpbCBwYWdlIGxvZ2ljIGluaXRpYWxpemVkLicpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBBZG1pbiBQYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlVHlwZSA9PT0gJ2FkbWluJyB8fCAoIXBhZ2VUeXBlICYmIGN1cnJlbnRQYWdlLmVuZHNXaXRoKCcvYWRtaW4uaHRtbCcpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBZG1pbiBwYWdlIGRldGVjdGVkIGJ5IGNsaWVudC50cyAtIG5vIGFjdGlvbiB0YWtlbi4nKTsgLy8gQWRtaW4gbG9naWMgaXMgaW4gYWRtaW4uYnVuZGxlLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVW5rbm93biBwYWdlIHR5cGUgKCcke3BhZ2VUeXBlfScpIG9yIHBhdGggKCcke2N1cnJlbnRQYWdlfScpLiBObyBzcGVjaWZpYyBpbml0aWFsaXphdGlvbiBuZWVkZWQgZnJvbSBjbGllbnQudHMuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgcGFnZS1zcGVjaWZpYyBjbGllbnQgaW5pdGlhbGl6YXRpb246JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyAtLS0gR2xvYmFsIEV4ZWN1dGlvbiAtLS1cbi8vIFJ1biBpbml0aWFsaXphdGlvbiBsb2dpYyB3aGVuIHRoZSBET00gaXMgcmVhZHlcbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGl6ZUNsaWVudCk7XG59XG5lbHNlIHtcbiAgICAvLyBET01Db250ZW50TG9hZGVkIGhhcyBhbHJlYWR5IGZpcmVkXG4gICAgaW5pdGlhbGl6ZUNsaWVudCgpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzcmMvbW9kdWxlcy9wb3N0RGV0YWlsLnRzXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVBvc3REZXRhaWxQYWdlTG9naWMgPSBpbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYztcbmV4cG9ydHMubG9hZFBvc3RDb250ZW50ID0gbG9hZFBvc3RDb250ZW50O1xuZXhwb3J0cy51cGRhdGVQb3N0VUkgPSB1cGRhdGVQb3N0VUk7XG5leHBvcnRzLnVwZGF0ZVBhZ2VNZXRhZGF0YSA9IHVwZGF0ZVBhZ2VNZXRhZGF0YTtcbmV4cG9ydHMuaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcgPSBpbml0aWFsaXplU29jaWFsU2hhcmluZztcbmV4cG9ydHMuc2hvd0Vycm9yTWVzc2FnZSA9IHNob3dFcnJvck1lc3NhZ2U7XG4vLyAtLS0gSW1wb3J0cyAtLS1cbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTtcbmNvbnN0IHVybFRyYW5zZm9ybWVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdXJsVHJhbnNmb3JtZXJcIik7XG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7XG4vLyAtLS0gQ29yZSBJbml0aWFsaXphdGlvbiBGdW5jdGlvbiAtLS1cbi8qKlxuICogSW5pdGlhbGl6ZXMgYWxsIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBwb3N0IGRldGFpbCBwYWdlLlxuICogVGhpcyBpcyB0aGUgbWFpbiBleHBvcnRlZCBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBjYWxsZWQgYnkgdGhlIGVudHJ5IHBvaW50LlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUG9zdERldGFpbFBhZ2VMb2dpYygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UpKCk7XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgY29uc3QgcG9zdElkID0gdXJsUGFyYW1zLmdldCgnaWQnKTtcbiAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgeWllbGQgbG9hZFBvc3RDb250ZW50KHBvc3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBwb3N0IElEIHByb3ZpZGVkIGluIHRoZSBVUkwnKTtcbiAgICAgICAgICAgIHNob3dFcnJvck1lc3NhZ2UoJ05vIHBvc3Qgc3BlY2lmaWVkLiBQbGVhc2UgY2hlY2sgdGhlIFVSTC4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBMb2FkIGFuZCBkaXNwbGF5IHBvc3QgY29udGVudCBiYXNlZCBvbiBwb3N0IElEXG4gKi9cbmZ1bmN0aW9uIGxvYWRQb3N0Q29udGVudChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcG9zdCA9IHlpZWxkICgwLCBhcGlfMS5mZXRjaFBvc3RCeUlkKShwb3N0SWQpO1xuICAgICAgICAgICAgaWYgKCFwb3N0KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUG9zdCB3aXRoIElEICR7cG9zdElkfSBub3QgZm91bmRgKTtcbiAgICAgICAgICAgIHVwZGF0ZVBvc3RVSShwb3N0KTtcbiAgICAgICAgICAgIHVwZGF0ZVBhZ2VNZXRhZGF0YShwb3N0KTtcbiAgICAgICAgICAgIGluaXRpYWxpemVTb2NpYWxTaGFyaW5nKHBvc3QpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBwb3N0IGNvbnRlbnQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZShgRmFpbGVkIHRvIGxvYWQgdGhlIGJsb2cgcG9zdC4gJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLid9YCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogVXBkYXRlIHRoZSBwb3N0IFVJIHdpdGggY29udGVudCBmcm9tIHRoZSBsb2FkZWQgcG9zdFxuICovXG5mdW5jdGlvbiB1cGRhdGVQb3N0VUkocG9zdCkge1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDYW5ub3QgdXBkYXRlIFVJOiAjcG9zdC1jb250ZW50IGVsZW1lbnQgbm90IGZvdW5kLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENvbnN0cnVjdCB0aGUgaW5uZXIgSFRNTCBkeW5hbWljYWxseVxuICAgIHBvc3RBcnRpY2xlRWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWhlYWRlclwiPlxuICAgICAgICAgICAgPGgxPiR7cG9zdC50aXRsZX08L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtbWV0YVwiPlxuICAgICAgICAgICAgICAgIDx0aW1lIGRhdGV0aW1lPVwiJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gOiAnJ31cIj5cbiAgICAgICAgICAgICAgICAgICAgJHtwb3N0LmNyZWF0ZWRBdCA/IG5ldyBEYXRlKHBvc3QuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnIH0pIDogJ0RhdGUgdW5rbm93bid9XG4gICAgICAgICAgICAgICAgPC90aW1lPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yXCI+YnkgJHtwb3N0LmF1dGhvciB8fCAnQW5vbnltb3VzJ308L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAke3Bvc3QuaW1hZ2VVcmwgPyBgPGltZyBzcmM9XCIke3Bvc3QuaW1hZ2VVcmx9XCIgYWx0PVwiJHtwb3N0LnRpdGxlfVwiIGNsYXNzPVwiZmVhdHVyZWQtaW1hZ2VcIj5gIDogJyd9XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtY29udGVudC1ib2R5XCI+XG4gICAgICAgICAgICAke3Bvc3QuY29udGVudH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtZm9vdGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICR7cG9zdC50YWdzICYmIHBvc3QudGFncy5sZW5ndGggPiAwID8gYDxzcGFuPlRhZ3M6PC9zcGFuPiAke3Bvc3QudGFncy5tYXAodGFnID0+IGA8YSBocmVmPVwiJHsoMCwgdXJsVHJhbnNmb3JtZXJfMS5nZW5lcmF0ZVRhZ0ZpbHRlclVybCkodGFnKX1cIj4ke3RhZ308L2E+YCkuam9pbignJyl9YCA6ICcnfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsLXNoYXJpbmdcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TaGFyZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNoYXJlLWJ1dHRvbiB0d2l0dGVyXCIgYXJpYS1sYWJlbD1cIlNoYXJlIG9uIFR3aXR0ZXJcIj48aSBjbGFzcz1cImZhYiBmYS10d2l0dGVyXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gZmFjZWJvb2tcIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gRmFjZWJvb2tcIj48aSBjbGFzcz1cImZhYiBmYS1mYWNlYm9vay1mXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaGFyZS1idXR0b24gbGlua2VkaW5cIiBhcmlhLWxhYmVsPVwiU2hhcmUgb24gTGlua2VkSW5cIj48aSBjbGFzcz1cImZhYiBmYS1saW5rZWRpbi1pblwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuLyoqXG4gKiBVcGRhdGUgcGFnZSBtZXRhZGF0YSBsaWtlIHRpdGxlIGFuZCBVUkxcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUGFnZU1ldGFkYXRhKHBvc3QpIHtcbiAgICBkb2N1bWVudC50aXRsZSA9IGAke3Bvc3QudGl0bGV9IHwgTm9lbCdzIEJsb2dgO1xufVxuLyoqXG4gKiBJbml0aWFsaXplIHNvY2lhbCBzaGFyaW5nIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVNvY2lhbFNoYXJpbmcocG9zdCkge1xuICAgIGNvbnN0IHBvc3RBcnRpY2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRlbnQnKTtcbiAgICBpZiAoIXBvc3RBcnRpY2xlRWxlbWVudClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHNvY2lhbFNoYXJpbmdEaXYgPSBwb3N0QXJ0aWNsZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbC1zaGFyaW5nJyk7XG4gICAgaWYgKHNvY2lhbFNoYXJpbmdEaXYpIHtcbiAgICAgICAgc29jaWFsU2hhcmluZ0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaGFyZS1idXR0b24nKTtcbiAgICAgICAgICAgIGlmICghYnV0dG9uKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBgQ2hlY2sgb3V0IHRoaXMgYXJ0aWNsZTogJHtwb3N0LnRpdGxlfWA7XG4gICAgICAgICAgICBsZXQgc2hhcmVXaW5kb3dVcmwgPSAnJztcbiAgICAgICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd0d2l0dGVyJykpIHtcbiAgICAgICAgICAgICAgICBzaGFyZVdpbmRvd1VybCA9IGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX0mdGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudCh0ZXh0KX1gO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHNoYXJlV2luZG93VXJsLCAndHdpdHRlci1zaGFyZScsICd3aWR0aD01NTAsaGVpZ2h0PTIzNScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFjZWJvb2snKSkge1xuICAgICAgICAgICAgICAgIHNoYXJlV2luZG93VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2ZhY2Vib29rLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rZWRpbicpKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVXaW5kb3dVcmwgPSBgaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZS8/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YDtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzaGFyZVdpbmRvd1VybCwgJ2xpbmtlZGluLXNoYXJlJywgJ3dpZHRoPTU1MCxoZWlnaHQ9NDM1Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogRGlzcGxheSBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSB1c2VyIHdpdGhpbiB0aGUgcG9zdCBjb250ZW50IGFyZWFcbiAqL1xuZnVuY3Rpb24gc2hvd0Vycm9yTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgY29uc3QgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgaWYgKGNvbnRlbnRFbGVtZW50KSB7XG4gICAgICAgIGNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPiR7bWVzc2FnZX08L2Rpdj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7IC8vIEZhbGxiYWNrXG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVsZXRlQmxvZ1Bvc3QgPSBkZWxldGVCbG9nUG9zdDtcbmV4cG9ydHMuY3JlYXRlUG9zdCA9IGNyZWF0ZVBvc3Q7XG5leHBvcnRzLnVwZGF0ZVBvc3QgPSB1cGRhdGVQb3N0O1xuZXhwb3J0cy5hZGRUYWdUb1Bvc3QgPSBhZGRUYWdUb1Bvc3Q7XG5leHBvcnRzLmZldGNoQmxvZ1Bvc3RzID0gZmV0Y2hCbG9nUG9zdHM7XG5leHBvcnRzLmZldGNoUG9zdEJ5SWQgPSBmZXRjaFBvc3RCeUlkO1xuZXhwb3J0cy5mZXRjaENvbW1lbnRzQXBpID0gZmV0Y2hDb21tZW50c0FwaTtcbmV4cG9ydHMuc3VibWl0Q29tbWVudEFwaSA9IHN1Ym1pdENvbW1lbnRBcGk7XG4vLyBBUElfVVJMIGNvbnN0YW50IGlzIG5vdCBuZWVkZWQgd2hlbiBmZXRjaGluZyBzdGF0aWMgZmlsZSBkaXJlY3RseVxuLy8gY29uc3QgQVBJX1VSTCA9ICcvYXBpJzsgXG4vLyAtLS0gRnVuY3Rpb25zIHJlbHlpbmcgb24gYmFja2VuZCBBUEkgKFdpbGwgTk9UIHdvcmsgb24gR2l0SHViIFBhZ2VzKSAtLS1cbi8vIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIGZhaWwgc2lsZW50bHkgb3IgbG9nIGVycm9ycyBpbiB0aGUgY29uc29sZSBvbiB0aGUgc3RhdGljIHNpdGUuXG5mdW5jdGlvbiBkZWxldGVCbG9nUG9zdChwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGRlbGV0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBvc3QocG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGNyZWF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlUG9zdChpZCwgcG9zdERhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHVwZGF0ZSBwb3N0IG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gYWRkVGFnVG9Qb3N0KGlkLCB0YWcpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IGFkZCB0YWcgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG4vLyAtLS0gRnVuY3Rpb25zIG1vZGlmaWVkIGZvciBzdGF0aWMgZGF0YSAtLS1cbmNvbnN0IFNUQVRJQ19EQVRBX1VSTCA9ICdkYXRhL3Bvc3RzLmpzb24nOyAvLyBEZWZpbmUgcmVsYXRpdmUgcGF0aCBvbmNlXG4vKipcbiAqIEZldGNoIGFsbCBibG9nIHBvc3RzIGRpcmVjdGx5IGZyb20gdGhlIHN0YXRpYyBKU09OIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIGZldGNoQmxvZ1Bvc3RzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGZXRjaCB0aGUgSlNPTiBmaWxlIHVzaW5nIHRoZSByZWxhdGl2ZSBwYXRoXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKFNUQVRJQ19EQVRBX1VSTCk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggJHtTVEFUSUNfREFUQV9VUkx9OiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIC8vIEFzc3VtaW5nIHRoZSBKU09OIHN0cnVjdHVyZSBpcyB7IHBvc3RzOiBbLi4uXSB9IFxuICAgICAgICAgICAgcmV0dXJuIGRhdGEucG9zdHMgfHwgW107XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBzdGF0aWMgJHtTVEFUSUNfREFUQV9VUkx9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IG9uIGVycm9yXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogR2V0IGEgc2luZ2xlIHBvc3QgYnkgSUQgYnkgZmlsdGVyaW5nIHRoZSBzdGF0aWMgSlNPTiBkYXRhLlxuICogQHBhcmFtIGlkIC0gVGhlIHBvc3QgSUQgKHN0cmluZyBvciBudW1iZXIpXG4gKi9cbmZ1bmN0aW9uIGZldGNoUG9zdEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRmV0Y2ggYWxsIHBvc3RzIGZpcnN0XG4gICAgICAgICAgICBjb25zdCBhbGxQb3N0cyA9IHlpZWxkIGZldGNoQmxvZ1Bvc3RzKCk7XG4gICAgICAgICAgICBjb25zdCBwb3N0SWROdW1iZXIgPSB0eXBlb2YgaWQgPT09ICdzdHJpbmcnID8gcGFyc2VJbnQoaWQsIDEwKSA6IGlkO1xuICAgICAgICAgICAgaWYgKGlzTmFOKHBvc3RJZE51bWJlcikpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIHBvc3QgSUQgcHJvdmlkZWQ6ICR7aWR9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBzcGVjaWZpYyBwb3N0XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0gYWxsUG9zdHMuZmluZChwID0+IE51bWJlcihwLmlkKSA9PT0gcG9zdElkTnVtYmVyKTtcbiAgICAgICAgICAgIGlmICghcG9zdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgUG9zdCB3aXRoIElEICR7aWR9IG5vdCBmb3VuZCBpbiBzdGF0aWMgZGF0YS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGb3VuZCBwb3N0ICR7aWR9IGluIHN0YXRpYyBkYXRhLmApO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBzdGF0aWMgcG9zdCAke2lkfTpgLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gLS0tIENvbW1lbnQgQVBJIFBsYWNlaG9sZGVycyAtLS1cbmZ1bmN0aW9uIGZldGNoQ29tbWVudHNBcGkocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ29tbWVudHMgY2Fubm90IGJlIGZldGNoZWQgb24gc3RhdGljIHNpdGUgd2l0aG91dCBleHRlcm5hbCBzZXJ2aWNlL2JhY2tlbmQuXCIpO1xuICAgICAgICByZXR1cm4gW107XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzdWJtaXRDb21tZW50QXBpKHBvc3RJZCwgbmFtZSwgY29tbWVudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3Qgc3VibWl0IGNvbW1lbnQgb24gc3RhdGljIHNpdGUgd2l0aG91dCBleHRlcm5hbCBzZXJ2aWNlL2JhY2tlbmQuXCIpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb21tZW50IHN1Ym1pc3Npb24gbm90IGF2YWlsYWJsZS5cIik7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy91dGlscy91cmxUcmFuc2Zvcm1lci50cyAoRXhhbXBsZSBMb2NhdGlvbilcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2VuZXJhdGVUYWdGaWx0ZXJVcmwgPSBnZW5lcmF0ZVRhZ0ZpbHRlclVybDtcbi8qKlxuICogR2VuZXJhdGVzIGEgVVJMIHBhdGggZm9yIGZpbHRlcmluZyBieSB0YWcgb24gdGhlIG1haW4gYmxvZyBwYWdlLlxuICogQ3JlYXRlcyBhIFVSTCBsaWtlIFwiL2Jsb2cvP3RhZz15b3VyLXRhZy1uYW1lXCIgb3IgXCIvP3RhZz15b3VyLXRhZy1uYW1lXCIgYmFzZWQgb24gZW52aXJvbm1lbnQuXG4gKlxuICogQHBhcmFtIHRhZyAtIFRoZSB0YWcgc3RyaW5nIHRvIGZpbHRlciBieS5cbiAqIEByZXR1cm5zIFRoZSBVUkwgcGF0aCB3aXRoIHRoZSB0YWcgcXVlcnkgcGFyYW1ldGVyLlxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRhZ0ZpbHRlclVybCh0YWcpIHtcbiAgICAvLyBPcHRpb25hbDogQ29udmVydCB0YWcgdG8gbG93ZXJjYXNlIGZvciBjb25zaXN0ZW5jeSBpbiBmaWx0ZXJpbmdcbiAgICBjb25zdCBjb25zaXN0ZW50VGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gVVJMU2VhcmNoUGFyYW1zIGhhbmRsZXMgbmVjZXNzYXJ5IGVuY29kaW5nIGZvciBxdWVyeSBwYXJhbWV0ZXIgdmFsdWVzXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7IHRhZzogY29uc2lzdGVudFRhZyB9KTtcbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBvbiB0aGUgcHJvZHVjdGlvbiBzaXRlIGJ5IGxvb2tpbmcgYXQgdGhlIGhvc3RuYW1lXG4gICAgY29uc3QgaXNQcm9kdWN0aW9uID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbm9lbHVnd29rZS5jb20nO1xuICAgIGNvbnN0IGJhc2VQYXRoID0gaXNQcm9kdWN0aW9uID8gJy9ibG9nLycgOiAnLyc7XG4gICAgcmV0dXJuIGAke2Jhc2VQYXRofT8ke3BhcmFtcy50b1N0cmluZygpfWA7XG59XG4vKlxuLy8gT3JpZ2luYWwgZnVuY3Rpb24gLSBrZXB0IGZvciByZWZlcmVuY2Ugb3IgaWYgbmVlZGVkIGZvciBkaWZmZXJlbnQgVVJMIHR5cGVzXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtVGFnVG9VcmxGb3JtYXQodGFnOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0YWcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICctJyk7XG59XG4qL1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2VudHJpZXMvY2xpZW50LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9