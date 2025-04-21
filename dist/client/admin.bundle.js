/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/controllers/adminController.ts":
/*!********************************************!*\
  !*** ./src/controllers/adminController.ts ***!
  \********************************************/
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
exports.initializeAdminDashboard = initializeAdminDashboard;
/**
 * Admin Controller for managing blog posts and dashboard functionality
 */
const state_1 = __webpack_require__(/*! ./state */ "./src/controllers/state.ts");
const eventListeners_1 = __webpack_require__(/*! ./events/eventListeners */ "./src/controllers/events/eventListeners.ts");
const postManager_1 = __webpack_require__(/*! ./postManager */ "./src/controllers/postManager.ts");
const notifications_1 = __webpack_require__(/*! ../utils/notifications */ "./src/utils/notifications.ts");
function initializeAdminDashboard() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (state_1.state.initialized) {
                return;
            }
            state_1.state.loading = true;
            (0, eventListeners_1.setupEventListeners)();
            yield (0, postManager_1.loadPosts)();
            state_1.state.initialized = true;
        }
        catch (error) {
            (0, notifications_1.showToast)('Failed to initialize dashboard', 'error');
            console.error('Dashboard initialization error:', error);
        }
        finally {
            state_1.state.loading = false;
        }
    });
}


/***/ }),

/***/ "./src/controllers/events/eventListeners.ts":
/*!**************************************************!*\
  !*** ./src/controllers/events/eventListeners.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupEventListeners = setupEventListeners;
const postManager_1 = __webpack_require__(/*! ../postManager */ "./src/controllers/postManager.ts");
const state_1 = __webpack_require__(/*! ../state */ "./src/controllers/state.ts");
const formHandlers_1 = __webpack_require__(/*! ../formHandlers */ "./src/controllers/formHandlers.ts");
function setupEventListeners() {
    // Pagination controls
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (state_1.state.currentPage > 1) {
                state_1.state.currentPage--;
                (0, postManager_1.renderCurrentPage)();
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (state_1.state.currentPage < state_1.state.totalPages) {
                state_1.state.currentPage++;
                (0, postManager_1.renderCurrentPage)();
            }
        });
    }
    (0, formHandlers_1.setupSearchAndFilters)();
}


/***/ }),

/***/ "./src/controllers/formHandlers.ts":
/*!*****************************************!*\
  !*** ./src/controllers/formHandlers.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupSearchAndFilters = setupSearchAndFilters;
const postManager_1 = __webpack_require__(/*! ./postManager */ "./src/controllers/postManager.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/controllers/state.ts");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
function setupSearchAndFilters() {
    const searchInput = document.getElementById('search-posts');
    const sortSelect = document.getElementById('sort-by');
    const filterTagSelect = document.getElementById('filter-tag');
    if (searchInput) {
        searchInput.addEventListener('input', (0, utils_1.debounce)((e) => {
            state_1.state.searchTerm = e.target.value;
            (0, postManager_1.loadPosts)();
        }, 300));
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state_1.state.sortBy = e.target.value;
            (0, postManager_1.loadPosts)();
        });
    }
    if (filterTagSelect) {
        updateTagFilterOptions();
    }
}
function updateTagFilterOptions() {
    const filterTagSelect = document.getElementById('filter-tag');
    if (!filterTagSelect)
        return;
    const uniqueTags = new Set();
    state_1.state.posts.forEach(post => {
        post.tags.forEach(tag => uniqueTags.add(tag));
    });
    filterTagSelect.innerHTML = '<option value="">All Tags</option>';
    Array.from(uniqueTags)
        .sort()
        .forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        filterTagSelect.appendChild(option);
    });
}


/***/ }),

/***/ "./src/controllers/postManager.ts":
/*!****************************************!*\
  !*** ./src/controllers/postManager.ts ***!
  \****************************************/
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
exports.updatePaginationState = updatePaginationState;
exports.updatePaginationControls = updatePaginationControls;
exports.filterAndSortPosts = filterAndSortPosts;
exports.loadPosts = loadPosts;
exports.renderCurrentPage = renderCurrentPage;
// postManager.ts
// src/controllers/postManager.ts
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/controllers/state.ts");
const notifications_1 = __webpack_require__(/*! ../utils/notifications */ "./src/utils/notifications.ts");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
function updatePaginationState() {
    state_1.state.totalPages = Math.ceil(filterAndSortPosts().length / state_1.state.postsPerPage);
    updatePaginationControls();
}
function updatePaginationControls() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageIndicator = document.getElementById('page-indicator');
    if (prevBtn && nextBtn && pageIndicator) {
        prevBtn.disabled = state_1.state.currentPage === 1;
        nextBtn.disabled = state_1.state.currentPage === state_1.state.totalPages;
        pageIndicator.textContent = `Page ${state_1.state.currentPage} of ${state_1.state.totalPages}`;
    }
}
function filterAndSortPosts() {
    let filtered = [...state_1.state.posts];
    // Apply search filter
    if (state_1.state.searchTerm) {
        const searchLower = state_1.state.searchTerm.toLowerCase();
        filtered = filtered.filter(post => post.title.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower) ||
            post.author.toLowerCase().includes(searchLower) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchLower)));
    }
    // Apply sorting
    filtered.sort((a, b) => {
        switch (state_1.state.sortBy) {
            case 'newest':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'oldest':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });
    return filtered;
}
function loadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const tableBody = document.getElementById('posts-table-body');
        if (!tableBody) {
            console.error('Posts table body not found');
            return;
        }
        try {
            state_1.state.posts = yield (0, api_1.fetchBlogPosts)();
            updatePaginationState();
            renderCurrentPage();
        }
        catch (error) {
            (0, notifications_1.showToast)('Failed to load posts', 'error');
            console.error('Error loading posts:', error);
            showErrorState();
        }
    });
}
function renderCurrentPage() {
    const tableBody = document.getElementById('posts-table-body');
    if (!tableBody)
        return;
    tableBody.innerHTML = '';
    const filteredPosts = filterAndSortPosts();
    if (filteredPosts.length === 0) {
        showEmptyState();
        return;
    }
    const startIndex = (state_1.state.currentPage - 1) * state_1.state.postsPerPage;
    const endIndex = startIndex + state_1.state.postsPerPage;
    const currentPagePosts = filteredPosts.slice(startIndex, endIndex);
    currentPagePosts.forEach((post) => {
        const row = document.createElement('tr');
        row.dataset.postId = post.id.toString();
        const formattedDate = new Date(post.createdAt).toLocaleDateString();
        row.innerHTML = `
            <td>${post.id}</td>
            <td>${(0, utils_1.escapeHtml)(post.title)}</td>
            <td>${(0, utils_1.escapeHtml)(post.author)}</td>
            <td>${formattedDate}</td>
            <td>${post.tags.map((tag) => `<span class="tag-badge">${(0, utils_1.escapeHtml)(tag)}</span>`).join('')}</td>
            <td class="action-buttons">
                <button class="btn-icon btn-edit" title="Edit post">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" title="Delete post">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    updatePaginationState();
}
function showEmptyState() {
    const tableBody = document.getElementById('posts-table-body');
    if (!tableBody)
        return;
    tableBody.innerHTML = `
        <tr>
            <td colspan="7" class="empty-state">
                <p>No blog posts found</p>
            </td>
        </tr>
    `;
}
function showErrorState() {
    const tableBody = document.getElementById('posts-table-body');
    if (!tableBody)
        return;
    tableBody.innerHTML = `
        <tr>
            <td colspan="7" class="error-state">
                <p>Failed to load blog posts. Please try again later.</p>
            </td>
        </tr>
    `;
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

/***/ "./src/entries/admin.ts":
/*!******************************!*\
  !*** ./src/entries/admin.ts ***!
  \******************************/
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
const adminController_1 = __webpack_require__(/*! ../controllers/adminController */ "./src/controllers/adminController.ts"); // Handles core admin logic
const darkMode_1 = __webpack_require__(/*! ../components/darkMode */ "./src/components/darkMode.ts"); // Handles dark mode UI
// Consider importing a dedicated modal handler if logic becomes complex
// import { initializeAdminModals } from './adminModals';
/**
 * Initializes all functionality for the admin dashboard page.
 */
function initializeAdminPage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1. Initialize UI elements like dark mode first
            (0, darkMode_1.checkSystemDarkModePreference)(); // Check system preference on load
            (0, darkMode_1.initializeDarkMode)(); // Setup the toggle functionality
            // 2. Initialize core admin dashboard logic (e.g., fetching data, setting up tables)
            // This function should ideally create/render the necessary DOM elements if they aren't static HTML
            yield (0, adminController_1.initializeAdminDashboard)();
            // 3. Initialize interactive components like modals AFTER core content is ready
            initializeModalEventListeners();
            // Example: If you had more complex modal logic:
            // initializeAdminModals();
        }
        catch (error) {
            console.error('Error initializing admin dashboard:', error);
            // Optionally display an error message to the admin user
            const errorDisplay = document.getElementById('admin-error-display');
            if (errorDisplay) {
                errorDisplay.textContent = 'Failed to initialize admin dashboard. Please check console or try again later.';
                errorDisplay.style.display = 'block'; // Make it visible
            }
        }
    });
}
/**
 * Sets up event listeners for the post creation/editing modal.
 * Assumes modal elements exist in the static HTML or are created by initializeAdminDashboard.
 */
function initializeModalEventListeners() {
    const addPostButton = document.getElementById('add-post-btn');
    const postModal = document.getElementById('post-modal');
    // Use more specific selectors if possible, especially if multiple modals exist
    const closeModalButton = postModal === null || postModal === void 0 ? void 0 : postModal.querySelector('.close-modal');
    const cancelPostButton = document.getElementById('cancel-post-btn'); // Assuming this is inside the modal
    if (!postModal) {
        console.warn('Post modal element (#post-modal) not found. Cannot initialize modal events.');
        return; // Exit if the main modal element is missing
    }
    if (addPostButton) {
        addPostButton.addEventListener('click', () => {
            postModal.classList.add('open');
        });
    }
    else {
        console.warn('Add post button (#add-post-btn) not found.');
    }
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            postModal.classList.remove('open');
        });
    }
    else {
        console.warn('Close modal button (.close-modal) not found within #post-modal.');
    }
    if (cancelPostButton) {
        cancelPostButton.addEventListener('click', (event) => {
            event.preventDefault();
            postModal.classList.remove('open');
        });
    }
    else {
        console.warn('Cancel post button (#cancel-post-btn) not found.');
    }
    // Optional: Add listener to close modal if clicking outside of it
    postModal.addEventListener('click', (event) => {
        // Check if the click target is the modal backdrop itself, not its content
        if (event.target === postModal) {
            postModal.classList.remove('open');
        }
    });
    // Optional: Add listener to close modal with the Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && postModal.classList.contains('open')) {
            postModal.classList.remove('open');
        }
    });
}
// --- Main Execution ---
// Wait for the DOM to be fully loaded before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdminPage);
}
else {
    // DOMContentLoaded has already fired
    initializeAdminPage();
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
            // Map raw data to ensure all fields, including imageUrl, are present
            return data.posts.map((post) => ({
                id: post.id,
                title: post.title,
                content: post.content,
                author: post.author,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                tags: post.tags,
                imageUrl: post.imageUrl // Ensure imageUrl is included
            }));
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

/***/ "./src/utils/notifications.ts":
/*!************************************!*\
  !*** ./src/utils/notifications.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showToast = showToast;
exports.showConfirmDialog = showConfirmDialog;
function showToast(message, type) {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage)
        return;
    toast.className = `toast ${type}`;
    toastMessage.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
// Inside notifications.ts
function showConfirmDialog(message) {
    return new Promise((resolve) => {
        const confirmDialog = document.getElementById('confirm-dialog');
        const messageElement = confirmDialog.querySelector('p');
        const confirmButton = document.getElementById('confirm-delete-btn');
        const cancelButton = document.getElementById('cancel-delete-btn');
        if (!confirmDialog || !messageElement || !confirmButton || !cancelButton) {
            resolve(false);
            return;
        }
        messageElement.textContent = message;
        confirmDialog.classList.add('active', 'open');
        const handleConfirm = () => {
            confirmDialog.classList.remove('active', 'open');
            cleanupListeners();
            resolve(true);
        };
        const handleCancel = () => {
            confirmDialog.classList.remove('active', 'open');
            cleanupListeners();
            resolve(false);
        };
        const cleanupListeners = () => {
            confirmButton.removeEventListener('click', handleConfirm);
            cancelButton.removeEventListener('click', handleCancel);
        };
        confirmButton.addEventListener('click', handleConfirm);
        cancelButton.addEventListener('click', handleCancel);
    });
}


/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.escapeHtml = escapeHtml;
exports.debounce = debounce;
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/entries/admin.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7QUN4SGE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7OztBQzlDYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1Qiw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNsQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29tcG9uZW50cy9kYXJrTW9kZS50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL2FkbWluQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL2V2ZW50cy9ldmVudExpc3RlbmVycy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL2Zvcm1IYW5kbGVycy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL3Bvc3RNYW5hZ2VyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29udHJvbGxlcnMvc3RhdGUudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9lbnRyaWVzL2FkbWluLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvc2VydmljZXMvYXBpLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvdXRpbHMvbm90aWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3V0aWxzL3V0aWxzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gRGFyayBtb2RlIGZ1bmN0aW9uYWxpdHlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZURhcmtNb2RlID0gaW5pdGlhbGl6ZURhcmtNb2RlO1xuZXhwb3J0cy5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSA9IGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlO1xuLyoqXG4gKiBJbml0aWFsaXplIGRhcmsgbW9kZSB0b2dnbGVcbiAqIFRoaXMgY3JlYXRlcyBhIGZsb2F0aW5nIGRhcmsgbW9kZSB0b2dnbGUgYnV0dG9uIGFuZCBhZGRzIGl0IHRvIHRoZSBET01cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZURhcmtNb2RlKCkge1xuICAgIC8vIENyZWF0ZSBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvblxuICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZGFya01vZGVUb2dnbGUuY2xhc3NOYW1lID0gJ2RhcmstbW9kZS10b2dnbGUnO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvblxuICAgIGRhcmtNb2RlVG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdUb2dnbGUgRGFyayBNb2RlJyk7XG4gICAgLy8gQ2hlY2sgaWYgZGFyayBtb2RlIHByZWZlcmVuY2UgaXMgYWxyZWFkeSBzZXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGNvbnN0IGlzRGFya01vZGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gJ3RydWUnO1xuICAgIGlmIChpc0RhcmtNb2RlKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICB9XG4gICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgZGFya01vZGVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVEYXJrTW9kZSk7XG4gICAgLy8gQWRkIGJ1dHRvbiB0byB0aGUgRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkYXJrTW9kZVRvZ2dsZSk7XG59XG4vKipcbiAqIFRvZ2dsZSBkYXJrIG1vZGUgb24gYW5kIG9mZlxuICovXG5mdW5jdGlvbiB0b2dnbGVEYXJrTW9kZSgpIHtcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrLW1vZGUnKTtcbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgLy8gVXBkYXRlIGljb24gYmFzZWQgb24gbW9kZVxuICAgIGlmIChkYXJrTW9kZVRvZ2dsZSkge1xuICAgICAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvbiBmb3IgbGlnaHQgbW9kZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLW1vb25cIj48L2k+JzsgLy8gTW9vbiBpY29uIGZvciBkYXJrIG1vZGVcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTYXZlIHByZWZlcmVuY2UgdG8gbG9jYWwgc3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsIGlzRGFya01vZGUudG9TdHJpbmcoKSk7XG59XG4vKipcbiAqIENoZWNrIGlmIHVzZXIgaGFzIHN5c3RlbSBkYXJrIG1vZGUgcHJlZmVyZW5jZVxuICogSWYgdGhleSBkbyBhbmQgd2UgaGF2ZW4ndCBzZXQgYSBwcmVmZXJlbmNlIHlldCwgYXBwbHkgZGFyayBtb2RlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKCkge1xuICAgIC8vIE9ubHkgY2hlY2sgaWYgdXNlciBoYXNuJ3QgZXhwbGljaXRseSBzZXQgYSBwcmVmZXJlbmNlXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrTW9kZScpID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHByZWZlcnNEYXJrTW9kZSA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICAgICAgaWYgKHByZWZlcnNEYXJrTW9kZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLW1vZGUnKTtcbiAgICAgICAgICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstbW9kZS10b2dnbGUnKTtcbiAgICAgICAgICAgIGlmIChkYXJrTW9kZVRvZ2dsZSkge1xuICAgICAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplQWRtaW5EYXNoYm9hcmQgPSBpbml0aWFsaXplQWRtaW5EYXNoYm9hcmQ7XG4vKipcbiAqIEFkbWluIENvbnRyb2xsZXIgZm9yIG1hbmFnaW5nIGJsb2cgcG9zdHMgYW5kIGRhc2hib2FyZCBmdW5jdGlvbmFsaXR5XG4gKi9cbmNvbnN0IHN0YXRlXzEgPSByZXF1aXJlKFwiLi9zdGF0ZVwiKTtcbmNvbnN0IGV2ZW50TGlzdGVuZXJzXzEgPSByZXF1aXJlKFwiLi9ldmVudHMvZXZlbnRMaXN0ZW5lcnNcIik7XG5jb25zdCBwb3N0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4vcG9zdE1hbmFnZXJcIik7XG5jb25zdCBub3RpZmljYXRpb25zXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvbm90aWZpY2F0aW9uc1wiKTtcbmZ1bmN0aW9uIGluaXRpYWxpemVBZG1pbkRhc2hib2FyZCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHN0YXRlXzEuc3RhdGUuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgKDAsIGV2ZW50TGlzdGVuZXJzXzEuc2V0dXBFdmVudExpc3RlbmVycykoKTtcbiAgICAgICAgICAgIHlpZWxkICgwLCBwb3N0TWFuYWdlcl8xLmxvYWRQb3N0cykoKTtcbiAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zaG93VG9hc3QpKCdGYWlsZWQgdG8gaW5pdGlhbGl6ZSBkYXNoYm9hcmQnLCAnZXJyb3InKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Rhc2hib2FyZCBpbml0aWFsaXphdGlvbiBlcnJvcjonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNldHVwRXZlbnRMaXN0ZW5lcnMgPSBzZXR1cEV2ZW50TGlzdGVuZXJzO1xuY29uc3QgcG9zdE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuLi9wb3N0TWFuYWdlclwiKTtcbmNvbnN0IHN0YXRlXzEgPSByZXF1aXJlKFwiLi4vc3RhdGVcIik7XG5jb25zdCBmb3JtSGFuZGxlcnNfMSA9IHJlcXVpcmUoXCIuLi9mb3JtSGFuZGxlcnNcIik7XG5mdW5jdGlvbiBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIFBhZ2luYXRpb24gY29udHJvbHNcbiAgICBjb25zdCBwcmV2QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXYtcGFnZScpO1xuICAgIGNvbnN0IG5leHRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dC1wYWdlJyk7XG4gICAgaWYgKHByZXZCdG4pIHtcbiAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlID4gMSkge1xuICAgICAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UtLTtcbiAgICAgICAgICAgICAgICAoMCwgcG9zdE1hbmFnZXJfMS5yZW5kZXJDdXJyZW50UGFnZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChuZXh0QnRuKSB7XG4gICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSA8IHN0YXRlXzEuc3RhdGUudG90YWxQYWdlcykge1xuICAgICAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UrKztcbiAgICAgICAgICAgICAgICAoMCwgcG9zdE1hbmFnZXJfMS5yZW5kZXJDdXJyZW50UGFnZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgICgwLCBmb3JtSGFuZGxlcnNfMS5zZXR1cFNlYXJjaEFuZEZpbHRlcnMpKCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0dXBTZWFyY2hBbmRGaWx0ZXJzID0gc2V0dXBTZWFyY2hBbmRGaWx0ZXJzO1xuY29uc3QgcG9zdE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL3Bvc3RNYW5hZ2VyXCIpO1xuY29uc3Qgc3RhdGVfMSA9IHJlcXVpcmUoXCIuL3N0YXRlXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy91dGlsc1wiKTtcbmZ1bmN0aW9uIHNldHVwU2VhcmNoQW5kRmlsdGVycygpIHtcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtcG9zdHMnKTtcbiAgICBjb25zdCBzb3J0U2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvcnQtYnknKTtcbiAgICBjb25zdCBmaWx0ZXJUYWdTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLXRhZycpO1xuICAgIGlmIChzZWFyY2hJbnB1dCkge1xuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgwLCB1dGlsc18xLmRlYm91bmNlKSgoZSkgPT4ge1xuICAgICAgICAgICAgc3RhdGVfMS5zdGF0ZS5zZWFyY2hUZXJtID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAoMCwgcG9zdE1hbmFnZXJfMS5sb2FkUG9zdHMpKCk7XG4gICAgICAgIH0sIDMwMCkpO1xuICAgIH1cbiAgICBpZiAoc29ydFNlbGVjdCkge1xuICAgICAgICBzb3J0U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLnNvcnRCeSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgKDAsIHBvc3RNYW5hZ2VyXzEubG9hZFBvc3RzKSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGZpbHRlclRhZ1NlbGVjdCkge1xuICAgICAgICB1cGRhdGVUYWdGaWx0ZXJPcHRpb25zKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlVGFnRmlsdGVyT3B0aW9ucygpIHtcbiAgICBjb25zdCBmaWx0ZXJUYWdTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLXRhZycpO1xuICAgIGlmICghZmlsdGVyVGFnU2VsZWN0KVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgdW5pcXVlVGFncyA9IG5ldyBTZXQoKTtcbiAgICBzdGF0ZV8xLnN0YXRlLnBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgIHBvc3QudGFncy5mb3JFYWNoKHRhZyA9PiB1bmlxdWVUYWdzLmFkZCh0YWcpKTtcbiAgICB9KTtcbiAgICBmaWx0ZXJUYWdTZWxlY3QuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCJcIj5BbGwgVGFnczwvb3B0aW9uPic7XG4gICAgQXJyYXkuZnJvbSh1bmlxdWVUYWdzKVxuICAgICAgICAuc29ydCgpXG4gICAgICAgIC5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBvcHRpb24udmFsdWUgPSB0YWc7XG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHRhZztcbiAgICAgICAgZmlsdGVyVGFnU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51cGRhdGVQYWdpbmF0aW9uU3RhdGUgPSB1cGRhdGVQYWdpbmF0aW9uU3RhdGU7XG5leHBvcnRzLnVwZGF0ZVBhZ2luYXRpb25Db250cm9scyA9IHVwZGF0ZVBhZ2luYXRpb25Db250cm9scztcbmV4cG9ydHMuZmlsdGVyQW5kU29ydFBvc3RzID0gZmlsdGVyQW5kU29ydFBvc3RzO1xuZXhwb3J0cy5sb2FkUG9zdHMgPSBsb2FkUG9zdHM7XG5leHBvcnRzLnJlbmRlckN1cnJlbnRQYWdlID0gcmVuZGVyQ3VycmVudFBhZ2U7XG4vLyBwb3N0TWFuYWdlci50c1xuLy8gc3JjL2NvbnRyb2xsZXJzL3Bvc3RNYW5hZ2VyLnRzXG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCBzdGF0ZV8xID0gcmVxdWlyZShcIi4vc3RhdGVcIik7XG5jb25zdCBub3RpZmljYXRpb25zXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvbm90aWZpY2F0aW9uc1wiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdXRpbHNcIik7XG5mdW5jdGlvbiB1cGRhdGVQYWdpbmF0aW9uU3RhdGUoKSB7XG4gICAgc3RhdGVfMS5zdGF0ZS50b3RhbFBhZ2VzID0gTWF0aC5jZWlsKGZpbHRlckFuZFNvcnRQb3N0cygpLmxlbmd0aCAvIHN0YXRlXzEuc3RhdGUucG9zdHNQZXJQYWdlKTtcbiAgICB1cGRhdGVQYWdpbmF0aW9uQ29udHJvbHMoKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVBhZ2luYXRpb25Db250cm9scygpIHtcbiAgICBjb25zdCBwcmV2QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXYtcGFnZScpO1xuICAgIGNvbnN0IG5leHRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dC1wYWdlJyk7XG4gICAgY29uc3QgcGFnZUluZGljYXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlLWluZGljYXRvcicpO1xuICAgIGlmIChwcmV2QnRuICYmIG5leHRCdG4gJiYgcGFnZUluZGljYXRvcikge1xuICAgICAgICBwcmV2QnRuLmRpc2FibGVkID0gc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gMTtcbiAgICAgICAgbmV4dEJ0bi5kaXNhYmxlZCA9IHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UgPT09IHN0YXRlXzEuc3RhdGUudG90YWxQYWdlcztcbiAgICAgICAgcGFnZUluZGljYXRvci50ZXh0Q29udGVudCA9IGBQYWdlICR7c3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZX0gb2YgJHtzdGF0ZV8xLnN0YXRlLnRvdGFsUGFnZXN9YDtcbiAgICB9XG59XG5mdW5jdGlvbiBmaWx0ZXJBbmRTb3J0UG9zdHMoKSB7XG4gICAgbGV0IGZpbHRlcmVkID0gWy4uLnN0YXRlXzEuc3RhdGUucG9zdHNdO1xuICAgIC8vIEFwcGx5IHNlYXJjaCBmaWx0ZXJcbiAgICBpZiAoc3RhdGVfMS5zdGF0ZS5zZWFyY2hUZXJtKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaExvd2VyID0gc3RhdGVfMS5zdGF0ZS5zZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGZpbHRlcmVkID0gZmlsdGVyZWQuZmlsdGVyKHBvc3QgPT4gcG9zdC50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgcG9zdC5jb250ZW50LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpIHx8XG4gICAgICAgICAgICBwb3N0LmF1dGhvci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgcG9zdC50YWdzLnNvbWUodGFnID0+IHRhZy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKSkpO1xuICAgIH1cbiAgICAvLyBBcHBseSBzb3J0aW5nXG4gICAgZmlsdGVyZWQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBzd2l0Y2ggKHN0YXRlXzEuc3RhdGUuc29ydEJ5KSB7XG4gICAgICAgICAgICBjYXNlICduZXdlc3QnOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShiLmNyZWF0ZWRBdCkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYS5jcmVhdGVkQXQpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNhc2UgJ29sZGVzdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGEuY3JlYXRlZEF0KS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShiLmNyZWF0ZWRBdCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkO1xufVxuZnVuY3Rpb24gbG9hZFBvc3RzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0cy10YWJsZS1ib2R5Jyk7XG4gICAgICAgIGlmICghdGFibGVCb2R5KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdQb3N0cyB0YWJsZSBib2R5IG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLnBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgdXBkYXRlUGFnaW5hdGlvblN0YXRlKCk7XG4gICAgICAgICAgICByZW5kZXJDdXJyZW50UGFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zaG93VG9hc3QpKCdGYWlsZWQgdG8gbG9hZCBwb3N0cycsICdlcnJvcicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBwb3N0czonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93RXJyb3JTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZW5kZXJDdXJyZW50UGFnZSgpIHtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdHMtdGFibGUtYm9keScpO1xuICAgIGlmICghdGFibGVCb2R5KVxuICAgICAgICByZXR1cm47XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnN0IGZpbHRlcmVkUG9zdHMgPSBmaWx0ZXJBbmRTb3J0UG9zdHMoKTtcbiAgICBpZiAoZmlsdGVyZWRQb3N0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2hvd0VtcHR5U3RhdGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdGFydEluZGV4ID0gKHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UgLSAxKSAqIHN0YXRlXzEuc3RhdGUucG9zdHNQZXJQYWdlO1xuICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCArIHN0YXRlXzEuc3RhdGUucG9zdHNQZXJQYWdlO1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlUG9zdHMgPSBmaWx0ZXJlZFBvc3RzLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgICBjdXJyZW50UGFnZVBvc3RzLmZvckVhY2goKHBvc3QpID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgcm93LmRhdGFzZXQucG9zdElkID0gcG9zdC5pZC50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICAgICAgICByb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHRkPiR7cG9zdC5pZH08L3RkPlxuICAgICAgICAgICAgPHRkPiR7KDAsIHV0aWxzXzEuZXNjYXBlSHRtbCkocG9zdC50aXRsZSl9PC90ZD5cbiAgICAgICAgICAgIDx0ZD4keygwLCB1dGlsc18xLmVzY2FwZUh0bWwpKHBvc3QuYXV0aG9yKX08L3RkPlxuICAgICAgICAgICAgPHRkPiR7Zm9ybWF0dGVkRGF0ZX08L3RkPlxuICAgICAgICAgICAgPHRkPiR7cG9zdC50YWdzLm1hcCgodGFnKSA9PiBgPHNwYW4gY2xhc3M9XCJ0YWctYmFkZ2VcIj4keygwLCB1dGlsc18xLmVzY2FwZUh0bWwpKHRhZyl9PC9zcGFuPmApLmpvaW4oJycpfTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJhY3Rpb24tYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4taWNvbiBidG4tZWRpdFwiIHRpdGxlPVwiRWRpdCBwb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWVkaXRcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1pY29uIGJ0bi1kZWxldGVcIiB0aXRsZT1cIkRlbGV0ZSBwb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRyYXNoXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgYDtcbiAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSk7XG4gICAgdXBkYXRlUGFnaW5hdGlvblN0YXRlKCk7XG59XG5mdW5jdGlvbiBzaG93RW1wdHlTdGF0ZSgpIHtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdHMtdGFibGUtYm9keScpO1xuICAgIGlmICghdGFibGVCb2R5KVxuICAgICAgICByZXR1cm47XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IGBcbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJlbXB0eS1zdGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxwPk5vIGJsb2cgcG9zdHMgZm91bmQ8L3A+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgIGA7XG59XG5mdW5jdGlvbiBzaG93RXJyb3JTdGF0ZSgpIHtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdHMtdGFibGUtYm9keScpO1xuICAgIGlmICghdGFibGVCb2R5KVxuICAgICAgICByZXR1cm47XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IGBcbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJlcnJvci1zdGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxwPkZhaWxlZCB0byBsb2FkIGJsb2cgcG9zdHMuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuPC9wPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICBgO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRpc3BhdGNoU3RhdGVDaGFuZ2UgPSBleHBvcnRzLmZyb250ZW5kU3RhdGUgPSBleHBvcnRzLnN0YXRlID0gdm9pZCAwO1xuLy8gSW5pdGlhbGl6ZSBhZG1pbiBzdGF0ZVxuZXhwb3J0cy5zdGF0ZSA9IHtcbiAgICBjdXJyZW50UGFnZTogMSxcbiAgICBwb3N0c1BlclBhZ2U6IDEwLFxuICAgIHRvdGFsUGFnZXM6IDEsXG4gICAgcG9zdHM6IFtdLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIHNlYXJjaFRlcm06ICcnLFxuICAgIHNvcnRCeTogJ25ld2VzdCcsXG4gICAgaW5pdGlhbGl6ZWQ6IGZhbHNlXG59O1xuLy8gSW5pdGlhbGl6ZSBmcm9udGVuZCBzdGF0ZVxuZXhwb3J0cy5mcm9udGVuZFN0YXRlID0ge1xuICAgIGRhcmtNb2RlOiBmYWxzZSxcbiAgICBwb3N0c1BlclBhZ2U6IDYsIC8vIFNob3cgNiBwb3N0cyBpbml0aWFsbHkgb24gZnJvbnRlbmRcbiAgICBmaWx0ZXJlZFRhZzogdW5kZWZpbmVkXG59O1xuLy8gU3RhdGUgY2hhbmdlIGV2ZW50IGZvciBjb21wb25lbnRzIHRvIHJlYWN0IHRvIHN0YXRlIGNoYW5nZXNcbmNvbnN0IGRpc3BhdGNoU3RhdGVDaGFuZ2UgPSAoc3RhdGVUeXBlLCBwcm9wZXJ0eSkgPT4ge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzdGF0ZUNoYW5nZScsIHtcbiAgICAgICAgZGV0YWlsOiB7IHR5cGU6IHN0YXRlVHlwZSwgcHJvcGVydHkgfVxuICAgIH0pKTtcbn07XG5leHBvcnRzLmRpc3BhdGNoU3RhdGVDaGFuZ2UgPSBkaXNwYXRjaFN0YXRlQ2hhbmdlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFkbWluQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2FkbWluQ29udHJvbGxlclwiKTsgLy8gSGFuZGxlcyBjb3JlIGFkbWluIGxvZ2ljXG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7IC8vIEhhbmRsZXMgZGFyayBtb2RlIFVJXG4vLyBDb25zaWRlciBpbXBvcnRpbmcgYSBkZWRpY2F0ZWQgbW9kYWwgaGFuZGxlciBpZiBsb2dpYyBiZWNvbWVzIGNvbXBsZXhcbi8vIGltcG9ydCB7IGluaXRpYWxpemVBZG1pbk1vZGFscyB9IGZyb20gJy4vYWRtaW5Nb2RhbHMnO1xuLyoqXG4gKiBJbml0aWFsaXplcyBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGFkbWluIGRhc2hib2FyZCBwYWdlLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQWRtaW5QYWdlKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyAxLiBJbml0aWFsaXplIFVJIGVsZW1lbnRzIGxpa2UgZGFyayBtb2RlIGZpcnN0XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTsgLy8gQ2hlY2sgc3lzdGVtIHByZWZlcmVuY2Ugb24gbG9hZFxuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuaW5pdGlhbGl6ZURhcmtNb2RlKSgpOyAvLyBTZXR1cCB0aGUgdG9nZ2xlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgIC8vIDIuIEluaXRpYWxpemUgY29yZSBhZG1pbiBkYXNoYm9hcmQgbG9naWMgKGUuZy4sIGZldGNoaW5nIGRhdGEsIHNldHRpbmcgdXAgdGFibGVzKVxuICAgICAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBzaG91bGQgaWRlYWxseSBjcmVhdGUvcmVuZGVyIHRoZSBuZWNlc3NhcnkgRE9NIGVsZW1lbnRzIGlmIHRoZXkgYXJlbid0IHN0YXRpYyBIVE1MXG4gICAgICAgICAgICB5aWVsZCAoMCwgYWRtaW5Db250cm9sbGVyXzEuaW5pdGlhbGl6ZUFkbWluRGFzaGJvYXJkKSgpO1xuICAgICAgICAgICAgLy8gMy4gSW5pdGlhbGl6ZSBpbnRlcmFjdGl2ZSBjb21wb25lbnRzIGxpa2UgbW9kYWxzIEFGVEVSIGNvcmUgY29udGVudCBpcyByZWFkeVxuICAgICAgICAgICAgaW5pdGlhbGl6ZU1vZGFsRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIC8vIEV4YW1wbGU6IElmIHlvdSBoYWQgbW9yZSBjb21wbGV4IG1vZGFsIGxvZ2ljOlxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZUFkbWluTW9kYWxzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgYWRtaW4gZGFzaGJvYXJkOicsIGVycm9yKTtcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsbHkgZGlzcGxheSBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSBhZG1pbiB1c2VyXG4gICAgICAgICAgICBjb25zdCBlcnJvckRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tZXJyb3ItZGlzcGxheScpO1xuICAgICAgICAgICAgaWYgKGVycm9yRGlzcGxheSkge1xuICAgICAgICAgICAgICAgIGVycm9yRGlzcGxheS50ZXh0Q29udGVudCA9ICdGYWlsZWQgdG8gaW5pdGlhbGl6ZSBhZG1pbiBkYXNoYm9hcmQuIFBsZWFzZSBjaGVjayBjb25zb2xlIG9yIHRyeSBhZ2FpbiBsYXRlci4nO1xuICAgICAgICAgICAgICAgIGVycm9yRGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgLy8gTWFrZSBpdCB2aXNpYmxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogU2V0cyB1cCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBwb3N0IGNyZWF0aW9uL2VkaXRpbmcgbW9kYWwuXG4gKiBBc3N1bWVzIG1vZGFsIGVsZW1lbnRzIGV4aXN0IGluIHRoZSBzdGF0aWMgSFRNTCBvciBhcmUgY3JlYXRlZCBieSBpbml0aWFsaXplQWRtaW5EYXNoYm9hcmQuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVNb2RhbEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGFkZFBvc3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXBvc3QtYnRuJyk7XG4gICAgY29uc3QgcG9zdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtbW9kYWwnKTtcbiAgICAvLyBVc2UgbW9yZSBzcGVjaWZpYyBzZWxlY3RvcnMgaWYgcG9zc2libGUsIGVzcGVjaWFsbHkgaWYgbXVsdGlwbGUgbW9kYWxzIGV4aXN0XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IHBvc3RNb2RhbCA9PT0gbnVsbCB8fCBwb3N0TW9kYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBvc3RNb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtbW9kYWwnKTtcbiAgICBjb25zdCBjYW5jZWxQb3N0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbC1wb3N0LWJ0bicpOyAvLyBBc3N1bWluZyB0aGlzIGlzIGluc2lkZSB0aGUgbW9kYWxcbiAgICBpZiAoIXBvc3RNb2RhbCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1Bvc3QgbW9kYWwgZWxlbWVudCAoI3Bvc3QtbW9kYWwpIG5vdCBmb3VuZC4gQ2Fubm90IGluaXRpYWxpemUgbW9kYWwgZXZlbnRzLicpO1xuICAgICAgICByZXR1cm47IC8vIEV4aXQgaWYgdGhlIG1haW4gbW9kYWwgZWxlbWVudCBpcyBtaXNzaW5nXG4gICAgfVxuICAgIGlmIChhZGRQb3N0QnV0dG9uKSB7XG4gICAgICAgIGFkZFBvc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3N0TW9kYWwuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQWRkIHBvc3QgYnV0dG9uICgjYWRkLXBvc3QtYnRuKSBub3QgZm91bmQuJyk7XG4gICAgfVxuICAgIGlmIChjbG9zZU1vZGFsQnV0dG9uKSB7XG4gICAgICAgIGNsb3NlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3N0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ2xvc2UgbW9kYWwgYnV0dG9uICguY2xvc2UtbW9kYWwpIG5vdCBmb3VuZCB3aXRoaW4gI3Bvc3QtbW9kYWwuJyk7XG4gICAgfVxuICAgIGlmIChjYW5jZWxQb3N0QnV0dG9uKSB7XG4gICAgICAgIGNhbmNlbFBvc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBwb3N0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ2FuY2VsIHBvc3QgYnV0dG9uICgjY2FuY2VsLXBvc3QtYnRuKSBub3QgZm91bmQuJyk7XG4gICAgfVxuICAgIC8vIE9wdGlvbmFsOiBBZGQgbGlzdGVuZXIgdG8gY2xvc2UgbW9kYWwgaWYgY2xpY2tpbmcgb3V0c2lkZSBvZiBpdFxuICAgIHBvc3RNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY2xpY2sgdGFyZ2V0IGlzIHRoZSBtb2RhbCBiYWNrZHJvcCBpdHNlbGYsIG5vdCBpdHMgY29udGVudFxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwb3N0TW9kYWwpIHtcbiAgICAgICAgICAgIHBvc3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBPcHRpb25hbDogQWRkIGxpc3RlbmVyIHRvIGNsb3NlIG1vZGFsIHdpdGggdGhlIEVzY2FwZSBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnICYmIHBvc3RNb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICAgICAgcG9zdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gLS0tIE1haW4gRXhlY3V0aW9uIC0tLVxuLy8gV2FpdCBmb3IgdGhlIERPTSB0byBiZSBmdWxseSBsb2FkZWQgYmVmb3JlIGluaXRpYWxpemluZ1xuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0aWFsaXplQWRtaW5QYWdlKTtcbn1cbmVsc2Uge1xuICAgIC8vIERPTUNvbnRlbnRMb2FkZWQgaGFzIGFscmVhZHkgZmlyZWRcbiAgICBpbml0aWFsaXplQWRtaW5QYWdlKCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWxldGVCbG9nUG9zdCA9IGRlbGV0ZUJsb2dQb3N0O1xuZXhwb3J0cy5jcmVhdGVQb3N0ID0gY3JlYXRlUG9zdDtcbmV4cG9ydHMudXBkYXRlUG9zdCA9IHVwZGF0ZVBvc3Q7XG5leHBvcnRzLmFkZFRhZ1RvUG9zdCA9IGFkZFRhZ1RvUG9zdDtcbmV4cG9ydHMuZmV0Y2hCbG9nUG9zdHMgPSBmZXRjaEJsb2dQb3N0cztcbmV4cG9ydHMuZmV0Y2hQb3N0QnlJZCA9IGZldGNoUG9zdEJ5SWQ7XG5leHBvcnRzLmZldGNoQ29tbWVudHNBcGkgPSBmZXRjaENvbW1lbnRzQXBpO1xuZXhwb3J0cy5zdWJtaXRDb21tZW50QXBpID0gc3VibWl0Q29tbWVudEFwaTtcbi8vIEFQSV9VUkwgY29uc3RhbnQgaXMgbm90IG5lZWRlZCB3aGVuIGZldGNoaW5nIHN0YXRpYyBmaWxlIGRpcmVjdGx5XG4vLyBjb25zdCBBUElfVVJMID0gJy9hcGknOyBcbi8vIC0tLSBGdW5jdGlvbnMgcmVseWluZyBvbiBiYWNrZW5kIEFQSSAoV2lsbCBOT1Qgd29yayBvbiBHaXRIdWIgUGFnZXMpIC0tLVxuLy8gVGhlc2UgZnVuY3Rpb25zIHdpbGwgZmFpbCBzaWxlbnRseSBvciBsb2cgZXJyb3JzIGluIHRoZSBjb25zb2xlIG9uIHRoZSBzdGF0aWMgc2l0ZS5cbmZ1bmN0aW9uIGRlbGV0ZUJsb2dQb3N0KHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgZGVsZXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlUG9zdChwb3N0RGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgY3JlYXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB1cGRhdGVQb3N0KGlkLCBwb3N0RGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgdXBkYXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBhZGRUYWdUb1Bvc3QoaWQsIHRhZykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgYWRkIHRhZyBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbi8vIC0tLSBGdW5jdGlvbnMgbW9kaWZpZWQgZm9yIHN0YXRpYyBkYXRhIC0tLVxuY29uc3QgU1RBVElDX0RBVEFfVVJMID0gJ2RhdGEvcG9zdHMuanNvbic7IC8vIERlZmluZSByZWxhdGl2ZSBwYXRoIG9uY2Vcbi8qKlxuICogRmV0Y2ggYWxsIGJsb2cgcG9zdHMgZGlyZWN0bHkgZnJvbSB0aGUgc3RhdGljIEpTT04gZmlsZS5cbiAqL1xuZnVuY3Rpb24gZmV0Y2hCbG9nUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZldGNoIHRoZSBKU09OIGZpbGUgdXNpbmcgdGhlIHJlbGF0aXZlIHBhdGhcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goU1RBVElDX0RBVEFfVVJMKTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCAke1NUQVRJQ19EQVRBX1VSTH06ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgLy8gTWFwIHJhdyBkYXRhIHRvIGVuc3VyZSBhbGwgZmllbGRzLCBpbmNsdWRpbmcgaW1hZ2VVcmwsIGFyZSBwcmVzZW50XG4gICAgICAgICAgICByZXR1cm4gZGF0YS5wb3N0cy5tYXAoKHBvc3QpID0+ICh7XG4gICAgICAgICAgICAgICAgaWQ6IHBvc3QuaWQsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHBvc3QudGl0bGUsXG4gICAgICAgICAgICAgICAgY29udGVudDogcG9zdC5jb250ZW50LFxuICAgICAgICAgICAgICAgIGF1dGhvcjogcG9zdC5hdXRob3IsXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBwb3N0LmNyZWF0ZWRBdCxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6IHBvc3QudXBkYXRlZEF0LFxuICAgICAgICAgICAgICAgIHRhZ3M6IHBvc3QudGFncyxcbiAgICAgICAgICAgICAgICBpbWFnZVVybDogcG9zdC5pbWFnZVVybCAvLyBFbnN1cmUgaW1hZ2VVcmwgaXMgaW5jbHVkZWRcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHN0YXRpYyAke1NUQVRJQ19EQVRBX1VSTH06YCwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgb24gZXJyb3JcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYSBzaW5nbGUgcG9zdCBieSBJRCBieSBmaWx0ZXJpbmcgdGhlIHN0YXRpYyBKU09OIGRhdGEuXG4gKiBAcGFyYW0gaWQgLSBUaGUgcG9zdCBJRCAoc3RyaW5nIG9yIG51bWJlcilcbiAqL1xuZnVuY3Rpb24gZmV0Y2hQb3N0QnlJZChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGZXRjaCBhbGwgcG9zdHMgZmlyc3RcbiAgICAgICAgICAgIGNvbnN0IGFsbFBvc3RzID0geWllbGQgZmV0Y2hCbG9nUG9zdHMoKTtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RJZE51bWJlciA9IHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyBwYXJzZUludChpZCwgMTApIDogaWQ7XG4gICAgICAgICAgICBpZiAoaXNOYU4ocG9zdElkTnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgcG9zdCBJRCBwcm92aWRlZDogJHtpZH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIHNwZWNpZmljIHBvc3RcbiAgICAgICAgICAgIGNvbnN0IHBvc3QgPSBhbGxQb3N0cy5maW5kKHAgPT4gTnVtYmVyKHAuaWQpID09PSBwb3N0SWROdW1iZXIpO1xuICAgICAgICAgICAgaWYgKCFwb3N0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBQb3N0IHdpdGggSUQgJHtpZH0gbm90IGZvdW5kIGluIHN0YXRpYyBkYXRhLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coYEZvdW5kIHBvc3QgJHtpZH0gaW4gc3RhdGljIGRhdGEuYCk7XG4gICAgICAgICAgICByZXR1cm4gcG9zdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHN0YXRpYyBwb3N0ICR7aWR9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyAtLS0gQ29tbWVudCBBUEkgUGxhY2Vob2xkZXJzIC0tLVxuZnVuY3Rpb24gZmV0Y2hDb21tZW50c0FwaShwb3N0SWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJDb21tZW50cyBjYW5ub3QgYmUgZmV0Y2hlZCBvbiBzdGF0aWMgc2l0ZSB3aXRob3V0IGV4dGVybmFsIHNlcnZpY2UvYmFja2VuZC5cIik7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdENvbW1lbnRBcGkocG9zdElkLCBuYW1lLCBjb21tZW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBzdWJtaXQgY29tbWVudCBvbiBzdGF0aWMgc2l0ZSB3aXRob3V0IGV4dGVybmFsIHNlcnZpY2UvYmFja2VuZC5cIik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbW1lbnQgc3VibWlzc2lvbiBub3QgYXZhaWxhYmxlLlwiKTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaG93VG9hc3QgPSBzaG93VG9hc3Q7XG5leHBvcnRzLnNob3dDb25maXJtRGlhbG9nID0gc2hvd0NvbmZpcm1EaWFsb2c7XG5mdW5jdGlvbiBzaG93VG9hc3QobWVzc2FnZSwgdHlwZSkge1xuICAgIGNvbnN0IHRvYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvYXN0LW5vdGlmaWNhdGlvbicpO1xuICAgIGNvbnN0IHRvYXN0TWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2FzdC1tZXNzYWdlJyk7XG4gICAgaWYgKCF0b2FzdCB8fCAhdG9hc3RNZXNzYWdlKVxuICAgICAgICByZXR1cm47XG4gICAgdG9hc3QuY2xhc3NOYW1lID0gYHRvYXN0ICR7dHlwZX1gO1xuICAgIHRvYXN0TWVzc2FnZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgdG9hc3Quc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRvYXN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSwgMzAwMCk7XG59XG4vLyBJbnNpZGUgbm90aWZpY2F0aW9ucy50c1xuZnVuY3Rpb24gc2hvd0NvbmZpcm1EaWFsb2cobWVzc2FnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBjb25maXJtRGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmZpcm0tZGlhbG9nJyk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gY29uZmlybURpYWxvZy5xdWVyeVNlbGVjdG9yKCdwJyk7XG4gICAgICAgIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZmlybS1kZWxldGUtYnRuJyk7XG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWwtZGVsZXRlLWJ0bicpO1xuICAgICAgICBpZiAoIWNvbmZpcm1EaWFsb2cgfHwgIW1lc3NhZ2VFbGVtZW50IHx8ICFjb25maXJtQnV0dG9uIHx8ICFjYW5jZWxCdXR0b24pIHtcbiAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICAgICAgY29uZmlybURpYWxvZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnLCAnb3BlbicpO1xuICAgICAgICBjb25zdCBoYW5kbGVDb25maXJtID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uZmlybURpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnLCAnb3BlbicpO1xuICAgICAgICAgICAgY2xlYW51cExpc3RlbmVycygpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaGFuZGxlQ2FuY2VsID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uZmlybURpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnLCAnb3BlbicpO1xuICAgICAgICAgICAgY2xlYW51cExpc3RlbmVycygpO1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNsZWFudXBMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ29uZmlybSk7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDYW5jZWwpO1xuICAgICAgICB9O1xuICAgICAgICBjb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ29uZmlybSk7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNhbmNlbCk7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZXNjYXBlSHRtbCA9IGVzY2FwZUh0bWw7XG5leHBvcnRzLmRlYm91bmNlID0gZGVib3VuY2U7XG5mdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZSkge1xuICAgIHJldHVybiB1bnNhZmVcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcbn1cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcbiAgICBsZXQgdGltZW91dDtcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBmdW5jKC4uLmFyZ3MpLCB3YWl0KTtcbiAgICB9O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2VudHJpZXMvYWRtaW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=