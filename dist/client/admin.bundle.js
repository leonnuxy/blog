/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/darkMode.ts":
/*!************************************!*\
  !*** ./src/components/darkMode.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


// src/components/darkMode.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeDarkMode = initializeDarkMode;
exports.checkSystemDarkModePreference = checkSystemDarkModePreference;
const STORAGE_KEY = 'darkMode';
/**
 * Initialize dark mode toggle
 * This creates a floating dark mode toggle button and adds it to the DOM
 */
function initializeDarkMode() {
    var _a;
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    // Icon + initial state
    const isDarkMode = localStorage.getItem(STORAGE_KEY) === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    // Apply Prism theme to match
    (_a = window.setPrismTheme) === null || _a === void 0 ? void 0 : _a.call(window, isDarkMode);
    // Wire up click
    darkModeToggle.addEventListener('click', toggleDarkMode);
    // Append to body
    document.body.appendChild(darkModeToggle);
}
/**
 * Toggle dark mode on and off
 */
function toggleDarkMode() {
    var _a;
    const isNowDark = document.body.classList.toggle('dark-mode');
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    // Swap icon
    if (toggleBtn) {
        toggleBtn.innerHTML = isNowDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
    // Persist
    localStorage.setItem(STORAGE_KEY, String(isNowDark));
    // Swap Prism theme
    (_a = window.setPrismTheme) === null || _a === void 0 ? void 0 : _a.call(window, isNowDark);
}
/**
 * Check system preference on first load
 * If the user has no stored preference, respect prefers‐color‐scheme
 */
function checkSystemDarkModePreference() {
    var _a;
    if (localStorage.getItem(STORAGE_KEY) !== null) {
        return; // user already chose
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem(STORAGE_KEY, 'true');
        // Update any existing toggle icon if already rendered
        const toggleBtn = document.querySelector('.dark-mode-toggle');
        if (toggleBtn)
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        // Swap Prism theme
        (_a = window.setPrismTheme) === null || _a === void 0 ? void 0 : _a.call(window, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDeEhhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQjtBQUNqQix5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixLQUFLO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7QUM5Q2E7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvZGFya01vZGUudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9hZG1pbkNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9ldmVudHMvZXZlbnRMaXN0ZW5lcnMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9mb3JtSGFuZGxlcnMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9wb3N0TWFuYWdlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL3N0YXRlLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvZW50cmllcy9hZG1pbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3NlcnZpY2VzL2FwaS50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3V0aWxzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy91dGlscy91dGlscy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIHNyYy9jb21wb25lbnRzL2RhcmtNb2RlLnRzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVEYXJrTW9kZSA9IGluaXRpYWxpemVEYXJrTW9kZTtcbmV4cG9ydHMuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UgPSBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZTtcbmNvbnN0IFNUT1JBR0VfS0VZID0gJ2RhcmtNb2RlJztcbi8qKlxuICogSW5pdGlhbGl6ZSBkYXJrIG1vZGUgdG9nZ2xlXG4gKiBUaGlzIGNyZWF0ZXMgYSBmbG9hdGluZyBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvbiBhbmQgYWRkcyBpdCB0byB0aGUgRE9NXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVEYXJrTW9kZSgpIHtcbiAgICB2YXIgX2E7XG4gICAgLy8gQ3JlYXRlIGRhcmsgbW9kZSB0b2dnbGUgYnV0dG9uXG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkYXJrTW9kZVRvZ2dsZS5jbGFzc05hbWUgPSAnZGFyay1tb2RlLXRvZ2dsZSc7XG4gICAgZGFya01vZGVUb2dnbGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1RvZ2dsZSBEYXJrIE1vZGUnKTtcbiAgICAvLyBJY29uICsgaW5pdGlhbCBzdGF0ZVxuICAgIGNvbnN0IGlzRGFya01vZGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSkgPT09ICd0cnVlJztcbiAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nO1xuICAgIH1cbiAgICAvLyBBcHBseSBQcmlzbSB0aGVtZSB0byBtYXRjaFxuICAgIChfYSA9IHdpbmRvdy5zZXRQcmlzbVRoZW1lKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh3aW5kb3csIGlzRGFya01vZGUpO1xuICAgIC8vIFdpcmUgdXAgY2xpY2tcbiAgICBkYXJrTW9kZVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZURhcmtNb2RlKTtcbiAgICAvLyBBcHBlbmQgdG8gYm9keVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGFya01vZGVUb2dnbGUpO1xufVxuLyoqXG4gKiBUb2dnbGUgZGFyayBtb2RlIG9uIGFuZCBvZmZcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlRGFya01vZGUoKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IGlzTm93RGFyayA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyay1tb2RlJyk7XG4gICAgY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstbW9kZS10b2dnbGUnKTtcbiAgICAvLyBTd2FwIGljb25cbiAgICBpZiAodG9nZ2xlQnRuKSB7XG4gICAgICAgIHRvZ2dsZUJ0bi5pbm5lckhUTUwgPSBpc05vd0RhcmtcbiAgICAgICAgICAgID8gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nXG4gICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7XG4gICAgfVxuICAgIC8vIFBlcnNpc3RcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWSwgU3RyaW5nKGlzTm93RGFyaykpO1xuICAgIC8vIFN3YXAgUHJpc20gdGhlbWVcbiAgICAoX2EgPSB3aW5kb3cuc2V0UHJpc21UaGVtZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwod2luZG93LCBpc05vd0RhcmspO1xufVxuLyoqXG4gKiBDaGVjayBzeXN0ZW0gcHJlZmVyZW5jZSBvbiBmaXJzdCBsb2FkXG4gKiBJZiB0aGUgdXNlciBoYXMgbm8gc3RvcmVkIHByZWZlcmVuY2UsIHJlc3BlY3QgcHJlZmVyc+KAkGNvbG9y4oCQc2NoZW1lXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKCkge1xuICAgIHZhciBfYTtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjsgLy8gdXNlciBhbHJlYWR5IGNob3NlXG4gICAgfVxuICAgIGNvbnN0IHByZWZlcnNEYXJrID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzO1xuICAgIGlmIChwcmVmZXJzRGFyaykge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWSwgJ3RydWUnKTtcbiAgICAgICAgLy8gVXBkYXRlIGFueSBleGlzdGluZyB0b2dnbGUgaWNvbiBpZiBhbHJlYWR5IHJlbmRlcmVkXG4gICAgICAgIGNvbnN0IHRvZ2dsZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgICAgIGlmICh0b2dnbGVCdG4pXG4gICAgICAgICAgICB0b2dnbGVCdG4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nO1xuICAgICAgICAvLyBTd2FwIFByaXNtIHRoZW1lXG4gICAgICAgIChfYSA9IHdpbmRvdy5zZXRQcmlzbVRoZW1lKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh3aW5kb3csIHRydWUpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVBZG1pbkRhc2hib2FyZCA9IGluaXRpYWxpemVBZG1pbkRhc2hib2FyZDtcbi8qKlxuICogQWRtaW4gQ29udHJvbGxlciBmb3IgbWFuYWdpbmcgYmxvZyBwb3N0cyBhbmQgZGFzaGJvYXJkIGZ1bmN0aW9uYWxpdHlcbiAqL1xuY29uc3Qgc3RhdGVfMSA9IHJlcXVpcmUoXCIuL3N0YXRlXCIpO1xuY29uc3QgZXZlbnRMaXN0ZW5lcnNfMSA9IHJlcXVpcmUoXCIuL2V2ZW50cy9ldmVudExpc3RlbmVyc1wiKTtcbmNvbnN0IHBvc3RNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9wb3N0TWFuYWdlclwiKTtcbmNvbnN0IG5vdGlmaWNhdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9ub3RpZmljYXRpb25zXCIpO1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUFkbWluRGFzaGJvYXJkKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoc3RhdGVfMS5zdGF0ZS5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAoMCwgZXZlbnRMaXN0ZW5lcnNfMS5zZXR1cEV2ZW50TGlzdGVuZXJzKSgpO1xuICAgICAgICAgICAgeWllbGQgKDAsIHBvc3RNYW5hZ2VyXzEubG9hZFBvc3RzKSgpO1xuICAgICAgICAgICAgc3RhdGVfMS5zdGF0ZS5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkoJ0ZhaWxlZCB0byBpbml0aWFsaXplIGRhc2hib2FyZCcsICdlcnJvcicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRGFzaGJvYXJkIGluaXRpYWxpemF0aW9uIGVycm9yOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0dXBFdmVudExpc3RlbmVycyA9IHNldHVwRXZlbnRMaXN0ZW5lcnM7XG5jb25zdCBwb3N0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4uL3Bvc3RNYW5hZ2VyXCIpO1xuY29uc3Qgc3RhdGVfMSA9IHJlcXVpcmUoXCIuLi9zdGF0ZVwiKTtcbmNvbnN0IGZvcm1IYW5kbGVyc18xID0gcmVxdWlyZShcIi4uL2Zvcm1IYW5kbGVyc1wiKTtcbmZ1bmN0aW9uIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgLy8gUGFnaW5hdGlvbiBjb250cm9sc1xuICAgIGNvbnN0IHByZXZCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldi1wYWdlJyk7XG4gICAgY29uc3QgbmV4dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXh0LXBhZ2UnKTtcbiAgICBpZiAocHJldkJ0bikge1xuICAgICAgICBwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UgPiAxKSB7XG4gICAgICAgICAgICAgICAgc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZS0tO1xuICAgICAgICAgICAgICAgICgwLCBwb3N0TWFuYWdlcl8xLnJlbmRlckN1cnJlbnRQYWdlKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG5leHRCdG4pIHtcbiAgICAgICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlIDwgc3RhdGVfMS5zdGF0ZS50b3RhbFBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSsrO1xuICAgICAgICAgICAgICAgICgwLCBwb3N0TWFuYWdlcl8xLnJlbmRlckN1cnJlbnRQYWdlKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgKDAsIGZvcm1IYW5kbGVyc18xLnNldHVwU2VhcmNoQW5kRmlsdGVycykoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXR1cFNlYXJjaEFuZEZpbHRlcnMgPSBzZXR1cFNlYXJjaEFuZEZpbHRlcnM7XG5jb25zdCBwb3N0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4vcG9zdE1hbmFnZXJcIik7XG5jb25zdCBzdGF0ZV8xID0gcmVxdWlyZShcIi4vc3RhdGVcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL3V0aWxzXCIpO1xuZnVuY3Rpb24gc2V0dXBTZWFyY2hBbmRGaWx0ZXJzKCkge1xuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1wb3N0cycpO1xuICAgIGNvbnN0IHNvcnRTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29ydC1ieScpO1xuICAgIGNvbnN0IGZpbHRlclRhZ1NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXItdGFnJyk7XG4gICAgaWYgKHNlYXJjaElucHV0KSB7XG4gICAgICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKDAsIHV0aWxzXzEuZGVib3VuY2UpKChlKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLnNlYXJjaFRlcm0gPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICgwLCBwb3N0TWFuYWdlcl8xLmxvYWRQb3N0cykoKTtcbiAgICAgICAgfSwgMzAwKSk7XG4gICAgfVxuICAgIGlmIChzb3J0U2VsZWN0KSB7XG4gICAgICAgIHNvcnRTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUuc29ydEJ5ID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAoMCwgcG9zdE1hbmFnZXJfMS5sb2FkUG9zdHMpKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZmlsdGVyVGFnU2VsZWN0KSB7XG4gICAgICAgIHVwZGF0ZVRhZ0ZpbHRlck9wdGlvbnMoKTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVUYWdGaWx0ZXJPcHRpb25zKCkge1xuICAgIGNvbnN0IGZpbHRlclRhZ1NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXItdGFnJyk7XG4gICAgaWYgKCFmaWx0ZXJUYWdTZWxlY3QpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCB1bmlxdWVUYWdzID0gbmV3IFNldCgpO1xuICAgIHN0YXRlXzEuc3RhdGUucG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgcG9zdC50YWdzLmZvckVhY2godGFnID0+IHVuaXF1ZVRhZ3MuYWRkKHRhZykpO1xuICAgIH0pO1xuICAgIGZpbHRlclRhZ1NlbGVjdC5pbm5lckhUTUwgPSAnPG9wdGlvbiB2YWx1ZT1cIlwiPkFsbCBUYWdzPC9vcHRpb24+JztcbiAgICBBcnJheS5mcm9tKHVuaXF1ZVRhZ3MpXG4gICAgICAgIC5zb3J0KClcbiAgICAgICAgLmZvckVhY2godGFnID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IHRhZztcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gdGFnO1xuICAgICAgICBmaWx0ZXJUYWdTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVwZGF0ZVBhZ2luYXRpb25TdGF0ZSA9IHVwZGF0ZVBhZ2luYXRpb25TdGF0ZTtcbmV4cG9ydHMudXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzID0gdXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzO1xuZXhwb3J0cy5maWx0ZXJBbmRTb3J0UG9zdHMgPSBmaWx0ZXJBbmRTb3J0UG9zdHM7XG5leHBvcnRzLmxvYWRQb3N0cyA9IGxvYWRQb3N0cztcbmV4cG9ydHMucmVuZGVyQ3VycmVudFBhZ2UgPSByZW5kZXJDdXJyZW50UGFnZTtcbi8vIHBvc3RNYW5hZ2VyLnRzXG4vLyBzcmMvY29udHJvbGxlcnMvcG9zdE1hbmFnZXIudHNcbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2VzL2FwaVwiKTtcbmNvbnN0IHN0YXRlXzEgPSByZXF1aXJlKFwiLi9zdGF0ZVwiKTtcbmNvbnN0IG5vdGlmaWNhdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9ub3RpZmljYXRpb25zXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy91dGlsc1wiKTtcbmZ1bmN0aW9uIHVwZGF0ZVBhZ2luYXRpb25TdGF0ZSgpIHtcbiAgICBzdGF0ZV8xLnN0YXRlLnRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoZmlsdGVyQW5kU29ydFBvc3RzKCkubGVuZ3RoIC8gc3RhdGVfMS5zdGF0ZS5wb3N0c1BlclBhZ2UpO1xuICAgIHVwZGF0ZVBhZ2luYXRpb25Db250cm9scygpO1xufVxuZnVuY3Rpb24gdXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzKCkge1xuICAgIGNvbnN0IHByZXZCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldi1wYWdlJyk7XG4gICAgY29uc3QgbmV4dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXh0LXBhZ2UnKTtcbiAgICBjb25zdCBwYWdlSW5kaWNhdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2UtaW5kaWNhdG9yJyk7XG4gICAgaWYgKHByZXZCdG4gJiYgbmV4dEJ0biAmJiBwYWdlSW5kaWNhdG9yKSB7XG4gICAgICAgIHByZXZCdG4uZGlzYWJsZWQgPSBzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxO1xuICAgICAgICBuZXh0QnRuLmRpc2FibGVkID0gc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gc3RhdGVfMS5zdGF0ZS50b3RhbFBhZ2VzO1xuICAgICAgICBwYWdlSW5kaWNhdG9yLnRleHRDb250ZW50ID0gYFBhZ2UgJHtzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlfSBvZiAke3N0YXRlXzEuc3RhdGUudG90YWxQYWdlc31gO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGZpbHRlckFuZFNvcnRQb3N0cygpIHtcbiAgICBsZXQgZmlsdGVyZWQgPSBbLi4uc3RhdGVfMS5zdGF0ZS5wb3N0c107XG4gICAgLy8gQXBwbHkgc2VhcmNoIGZpbHRlclxuICAgIGlmIChzdGF0ZV8xLnN0YXRlLnNlYXJjaFRlcm0pIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoTG93ZXIgPSBzdGF0ZV8xLnN0YXRlLnNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgZmlsdGVyZWQgPSBmaWx0ZXJlZC5maWx0ZXIocG9zdCA9PiBwb3N0LnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpIHx8XG4gICAgICAgICAgICBwb3N0LmNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgIHBvc3QuYXV0aG9yLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpIHx8XG4gICAgICAgICAgICBwb3N0LnRhZ3Muc29tZSh0YWcgPT4gdGFnLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpKSk7XG4gICAgfVxuICAgIC8vIEFwcGx5IHNvcnRpbmdcbiAgICBmaWx0ZXJlZC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGVfMS5zdGF0ZS5zb3J0QnkpIHtcbiAgICAgICAgICAgIGNhc2UgJ25ld2VzdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGIuY3JlYXRlZEF0KS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLmNyZWF0ZWRBdCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY2FzZSAnb2xkZXN0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoYS5jcmVhdGVkQXQpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGIuY3JlYXRlZEF0KS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjYXNlICd0aXRsZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyZWQ7XG59XG5mdW5jdGlvbiBsb2FkUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RzLXRhYmxlLWJvZHknKTtcbiAgICAgICAgaWYgKCF0YWJsZUJvZHkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Bvc3RzIHRhYmxlIGJvZHkgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUucG9zdHMgPSB5aWVsZCAoMCwgYXBpXzEuZmV0Y2hCbG9nUG9zdHMpKCk7XG4gICAgICAgICAgICB1cGRhdGVQYWdpbmF0aW9uU3RhdGUoKTtcbiAgICAgICAgICAgIHJlbmRlckN1cnJlbnRQYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkoJ0ZhaWxlZCB0byBsb2FkIHBvc3RzJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvclN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlckN1cnJlbnRQYWdlKCkge1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0cy10YWJsZS1ib2R5Jyk7XG4gICAgaWYgKCF0YWJsZUJvZHkpXG4gICAgICAgIHJldHVybjtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gJyc7XG4gICAgY29uc3QgZmlsdGVyZWRQb3N0cyA9IGZpbHRlckFuZFNvcnRQb3N0cygpO1xuICAgIGlmIChmaWx0ZXJlZFBvc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzaG93RW1wdHlTdGF0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSAoc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSAtIDEpICogc3RhdGVfMS5zdGF0ZS5wb3N0c1BlclBhZ2U7XG4gICAgY29uc3QgZW5kSW5kZXggPSBzdGFydEluZGV4ICsgc3RhdGVfMS5zdGF0ZS5wb3N0c1BlclBhZ2U7XG4gICAgY29uc3QgY3VycmVudFBhZ2VQb3N0cyA9IGZpbHRlcmVkUG9zdHMuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgIGN1cnJlbnRQYWdlUG9zdHMuZm9yRWFjaCgocG9zdCkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICByb3cuZGF0YXNldC5wb3N0SWQgPSBwb3N0LmlkLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICAgIHJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8dGQ+JHtwb3N0LmlkfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+JHsoMCwgdXRpbHNfMS5lc2NhcGVIdG1sKShwb3N0LnRpdGxlKX08L3RkPlxuICAgICAgICAgICAgPHRkPiR7KDAsIHV0aWxzXzEuZXNjYXBlSHRtbCkocG9zdC5hdXRob3IpfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+JHtmb3JtYXR0ZWREYXRlfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+JHtwb3N0LnRhZ3MubWFwKCh0YWcpID0+IGA8c3BhbiBjbGFzcz1cInRhZy1iYWRnZVwiPiR7KDAsIHV0aWxzXzEuZXNjYXBlSHRtbCkodGFnKX08L3NwYW4+YCkuam9pbignJyl9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFjdGlvbi1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1pY29uIGJ0bi1lZGl0XCIgdGl0bGU9XCJFZGl0IHBvc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZWRpdFwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWljb24gYnRuLWRlbGV0ZVwiIHRpdGxlPVwiRGVsZXRlIHBvc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdHJhc2hcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICBgO1xuICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICB9KTtcbiAgICB1cGRhdGVQYWdpbmF0aW9uU3RhdGUoKTtcbn1cbmZ1bmN0aW9uIHNob3dFbXB0eVN0YXRlKCkge1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0cy10YWJsZS1ib2R5Jyk7XG4gICAgaWYgKCF0YWJsZUJvZHkpXG4gICAgICAgIHJldHVybjtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gYFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjdcIiBjbGFzcz1cImVtcHR5LXN0YXRlXCI+XG4gICAgICAgICAgICAgICAgPHA+Tm8gYmxvZyBwb3N0cyBmb3VuZDwvcD5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgYDtcbn1cbmZ1bmN0aW9uIHNob3dFcnJvclN0YXRlKCkge1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0cy10YWJsZS1ib2R5Jyk7XG4gICAgaWYgKCF0YWJsZUJvZHkpXG4gICAgICAgIHJldHVybjtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gYFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjdcIiBjbGFzcz1cImVycm9yLXN0YXRlXCI+XG4gICAgICAgICAgICAgICAgPHA+RmFpbGVkIHRvIGxvYWQgYmxvZyBwb3N0cy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci48L3A+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgIGA7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGlzcGF0Y2hTdGF0ZUNoYW5nZSA9IGV4cG9ydHMuZnJvbnRlbmRTdGF0ZSA9IGV4cG9ydHMuc3RhdGUgPSB2b2lkIDA7XG4vLyBJbml0aWFsaXplIGFkbWluIHN0YXRlXG5leHBvcnRzLnN0YXRlID0ge1xuICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgIHBvc3RzUGVyUGFnZTogMTAsXG4gICAgdG90YWxQYWdlczogMSxcbiAgICBwb3N0czogW10sXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgc2VhcmNoVGVybTogJycsXG4gICAgc29ydEJ5OiAnbmV3ZXN0JyxcbiAgICBpbml0aWFsaXplZDogZmFsc2Vcbn07XG4vLyBJbml0aWFsaXplIGZyb250ZW5kIHN0YXRlXG5leHBvcnRzLmZyb250ZW5kU3RhdGUgPSB7XG4gICAgZGFya01vZGU6IGZhbHNlLFxuICAgIHBvc3RzUGVyUGFnZTogNiwgLy8gU2hvdyA2IHBvc3RzIGluaXRpYWxseSBvbiBmcm9udGVuZFxuICAgIGZpbHRlcmVkVGFnOiB1bmRlZmluZWRcbn07XG4vLyBTdGF0ZSBjaGFuZ2UgZXZlbnQgZm9yIGNvbXBvbmVudHMgdG8gcmVhY3QgdG8gc3RhdGUgY2hhbmdlc1xuY29uc3QgZGlzcGF0Y2hTdGF0ZUNoYW5nZSA9IChzdGF0ZVR5cGUsIHByb3BlcnR5KSA9PiB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3N0YXRlQ2hhbmdlJywge1xuICAgICAgICBkZXRhaWw6IHsgdHlwZTogc3RhdGVUeXBlLCBwcm9wZXJ0eSB9XG4gICAgfSkpO1xufTtcbmV4cG9ydHMuZGlzcGF0Y2hTdGF0ZUNoYW5nZSA9IGRpc3BhdGNoU3RhdGVDaGFuZ2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYWRtaW5Db250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvYWRtaW5Db250cm9sbGVyXCIpOyAvLyBIYW5kbGVzIGNvcmUgYWRtaW4gbG9naWNcbmNvbnN0IGRhcmtNb2RlXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXJrTW9kZVwiKTsgLy8gSGFuZGxlcyBkYXJrIG1vZGUgVUlcbi8vIENvbnNpZGVyIGltcG9ydGluZyBhIGRlZGljYXRlZCBtb2RhbCBoYW5kbGVyIGlmIGxvZ2ljIGJlY29tZXMgY29tcGxleFxuLy8gaW1wb3J0IHsgaW5pdGlhbGl6ZUFkbWluTW9kYWxzIH0gZnJvbSAnLi9hZG1pbk1vZGFscyc7XG4vKipcbiAqIEluaXRpYWxpemVzIGFsbCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgYWRtaW4gZGFzaGJvYXJkIHBhZ2UuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVBZG1pblBhZ2UoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIDEuIEluaXRpYWxpemUgVUkgZWxlbWVudHMgbGlrZSBkYXJrIG1vZGUgZmlyc3RcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKSgpOyAvLyBDaGVjayBzeXN0ZW0gcHJlZmVyZW5jZSBvbiBsb2FkXG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7IC8vIFNldHVwIHRoZSB0b2dnbGUgZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgLy8gMi4gSW5pdGlhbGl6ZSBjb3JlIGFkbWluIGRhc2hib2FyZCBsb2dpYyAoZS5nLiwgZmV0Y2hpbmcgZGF0YSwgc2V0dGluZyB1cCB0YWJsZXMpXG4gICAgICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpZGVhbGx5IGNyZWF0ZS9yZW5kZXIgdGhlIG5lY2Vzc2FyeSBET00gZWxlbWVudHMgaWYgdGhleSBhcmVuJ3Qgc3RhdGljIEhUTUxcbiAgICAgICAgICAgIHlpZWxkICgwLCBhZG1pbkNvbnRyb2xsZXJfMS5pbml0aWFsaXplQWRtaW5EYXNoYm9hcmQpKCk7XG4gICAgICAgICAgICAvLyAzLiBJbml0aWFsaXplIGludGVyYWN0aXZlIGNvbXBvbmVudHMgbGlrZSBtb2RhbHMgQUZURVIgY29yZSBjb250ZW50IGlzIHJlYWR5XG4gICAgICAgICAgICBpbml0aWFsaXplTW9kYWxFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgLy8gRXhhbXBsZTogSWYgeW91IGhhZCBtb3JlIGNvbXBsZXggbW9kYWwgbG9naWM6XG4gICAgICAgICAgICAvLyBpbml0aWFsaXplQWRtaW5Nb2RhbHMoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluaXRpYWxpemluZyBhZG1pbiBkYXNoYm9hcmQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgLy8gT3B0aW9uYWxseSBkaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIGFkbWluIHVzZXJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1lcnJvci1kaXNwbGF5Jyk7XG4gICAgICAgICAgICBpZiAoZXJyb3JEaXNwbGF5KSB7XG4gICAgICAgICAgICAgICAgZXJyb3JEaXNwbGF5LnRleHRDb250ZW50ID0gJ0ZhaWxlZCB0byBpbml0aWFsaXplIGFkbWluIGRhc2hib2FyZC4gUGxlYXNlIGNoZWNrIGNvbnNvbGUgb3IgdHJ5IGFnYWluIGxhdGVyLic7XG4gICAgICAgICAgICAgICAgZXJyb3JEaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyAvLyBNYWtlIGl0IHZpc2libGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBTZXRzIHVwIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHBvc3QgY3JlYXRpb24vZWRpdGluZyBtb2RhbC5cbiAqIEFzc3VtZXMgbW9kYWwgZWxlbWVudHMgZXhpc3QgaW4gdGhlIHN0YXRpYyBIVE1MIG9yIGFyZSBjcmVhdGVkIGJ5IGluaXRpYWxpemVBZG1pbkRhc2hib2FyZC5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZU1vZGFsRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgYWRkUG9zdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcG9zdC1idG4nKTtcbiAgICBjb25zdCBwb3N0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1tb2RhbCcpO1xuICAgIC8vIFVzZSBtb3JlIHNwZWNpZmljIHNlbGVjdG9ycyBpZiBwb3NzaWJsZSwgZXNwZWNpYWxseSBpZiBtdWx0aXBsZSBtb2RhbHMgZXhpc3RcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gcG9zdE1vZGFsID09PSBudWxsIHx8IHBvc3RNb2RhbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9zdE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1tb2RhbCcpO1xuICAgIGNvbnN0IGNhbmNlbFBvc3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLXBvc3QtYnRuJyk7IC8vIEFzc3VtaW5nIHRoaXMgaXMgaW5zaWRlIHRoZSBtb2RhbFxuICAgIGlmICghcG9zdE1vZGFsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUG9zdCBtb2RhbCBlbGVtZW50ICgjcG9zdC1tb2RhbCkgbm90IGZvdW5kLiBDYW5ub3QgaW5pdGlhbGl6ZSBtb2RhbCBldmVudHMuJyk7XG4gICAgICAgIHJldHVybjsgLy8gRXhpdCBpZiB0aGUgbWFpbiBtb2RhbCBlbGVtZW50IGlzIG1pc3NpbmdcbiAgICB9XG4gICAgaWYgKGFkZFBvc3RCdXR0b24pIHtcbiAgICAgICAgYWRkUG9zdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvc3RNb2RhbC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdBZGQgcG9zdCBidXR0b24gKCNhZGQtcG9zdC1idG4pIG5vdCBmb3VuZC4nKTtcbiAgICB9XG4gICAgaWYgKGNsb3NlTW9kYWxCdXR0b24pIHtcbiAgICAgICAgY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvc3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDbG9zZSBtb2RhbCBidXR0b24gKC5jbG9zZS1tb2RhbCkgbm90IGZvdW5kIHdpdGhpbiAjcG9zdC1tb2RhbC4nKTtcbiAgICB9XG4gICAgaWYgKGNhbmNlbFBvc3RCdXR0b24pIHtcbiAgICAgICAgY2FuY2VsUG9zdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHBvc3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDYW5jZWwgcG9zdCBidXR0b24gKCNjYW5jZWwtcG9zdC1idG4pIG5vdCBmb3VuZC4nKTtcbiAgICB9XG4gICAgLy8gT3B0aW9uYWw6IEFkZCBsaXN0ZW5lciB0byBjbG9zZSBtb2RhbCBpZiBjbGlja2luZyBvdXRzaWRlIG9mIGl0XG4gICAgcG9zdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjbGljayB0YXJnZXQgaXMgdGhlIG1vZGFsIGJhY2tkcm9wIGl0c2VsZiwgbm90IGl0cyBjb250ZW50XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHBvc3RNb2RhbCkge1xuICAgICAgICAgICAgcG9zdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIE9wdGlvbmFsOiBBZGQgbGlzdGVuZXIgdG8gY2xvc2UgbW9kYWwgd2l0aCB0aGUgRXNjYXBlIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgJiYgcG9zdE1vZGFsLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XG4gICAgICAgICAgICBwb3N0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyAtLS0gTWFpbiBFeGVjdXRpb24gLS0tXG4vLyBXYWl0IGZvciB0aGUgRE9NIHRvIGJlIGZ1bGx5IGxvYWRlZCBiZWZvcmUgaW5pdGlhbGl6aW5nXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRpYWxpemVBZG1pblBhZ2UpO1xufVxuZWxzZSB7XG4gICAgLy8gRE9NQ29udGVudExvYWRlZCBoYXMgYWxyZWFkeSBmaXJlZFxuICAgIGluaXRpYWxpemVBZG1pblBhZ2UoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlbGV0ZUJsb2dQb3N0ID0gZGVsZXRlQmxvZ1Bvc3Q7XG5leHBvcnRzLmNyZWF0ZVBvc3QgPSBjcmVhdGVQb3N0O1xuZXhwb3J0cy51cGRhdGVQb3N0ID0gdXBkYXRlUG9zdDtcbmV4cG9ydHMuYWRkVGFnVG9Qb3N0ID0gYWRkVGFnVG9Qb3N0O1xuZXhwb3J0cy5mZXRjaEJsb2dQb3N0cyA9IGZldGNoQmxvZ1Bvc3RzO1xuZXhwb3J0cy5mZXRjaFBvc3RCeUlkID0gZmV0Y2hQb3N0QnlJZDtcbmV4cG9ydHMuZmV0Y2hDb21tZW50c0FwaSA9IGZldGNoQ29tbWVudHNBcGk7XG5leHBvcnRzLnN1Ym1pdENvbW1lbnRBcGkgPSBzdWJtaXRDb21tZW50QXBpO1xuLy8gQVBJX1VSTCBjb25zdGFudCBpcyBub3QgbmVlZGVkIHdoZW4gZmV0Y2hpbmcgc3RhdGljIGZpbGUgZGlyZWN0bHlcbi8vIGNvbnN0IEFQSV9VUkwgPSAnL2FwaSc7IFxuLy8gLS0tIEZ1bmN0aW9ucyByZWx5aW5nIG9uIGJhY2tlbmQgQVBJIChXaWxsIE5PVCB3b3JrIG9uIEdpdEh1YiBQYWdlcykgLS0tXG4vLyBUaGVzZSBmdW5jdGlvbnMgd2lsbCBmYWlsIHNpbGVudGx5IG9yIGxvZyBlcnJvcnMgaW4gdGhlIGNvbnNvbGUgb24gdGhlIHN0YXRpYyBzaXRlLlxuZnVuY3Rpb24gZGVsZXRlQmxvZ1Bvc3QocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBkZWxldGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVQb3N0KHBvc3REYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBjcmVhdGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVBvc3QoaWQsIHBvc3REYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCB1cGRhdGUgcG9zdCBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGFkZFRhZ1RvUG9zdChpZCwgdGFnKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBhZGQgdGFnIG9uIHN0YXRpYyBzaXRlLiBCYWNrZW5kIEFQSSByZXF1aXJlZC5cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuLy8gLS0tIEZ1bmN0aW9ucyBtb2RpZmllZCBmb3Igc3RhdGljIGRhdGEgLS0tXG5jb25zdCBTVEFUSUNfREFUQV9VUkwgPSAnZGF0YS9wb3N0cy5qc29uJzsgLy8gRGVmaW5lIHJlbGF0aXZlIHBhdGggb25jZVxuLyoqXG4gKiBGZXRjaCBhbGwgYmxvZyBwb3N0cyBkaXJlY3RseSBmcm9tIHRoZSBzdGF0aWMgSlNPTiBmaWxlLlxuICovXG5mdW5jdGlvbiBmZXRjaEJsb2dQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIEpTT04gZmlsZSB1c2luZyB0aGUgcmVsYXRpdmUgcGF0aFxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChTVEFUSUNfREFUQV9VUkwpO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoICR7U1RBVElDX0RBVEFfVVJMfTogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAvLyBNYXAgcmF3IGRhdGEgdG8gZW5zdXJlIGFsbCBmaWVsZHMsIGluY2x1ZGluZyBpbWFnZVVybCwgYXJlIHByZXNlbnRcbiAgICAgICAgICAgIHJldHVybiBkYXRhLnBvc3RzLm1hcCgocG9zdCkgPT4gKHtcbiAgICAgICAgICAgICAgICBpZDogcG9zdC5pZCxcbiAgICAgICAgICAgICAgICB0aXRsZTogcG9zdC50aXRsZSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBwb3N0LmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgYXV0aG9yOiBwb3N0LmF1dGhvcixcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHBvc3QuY3JlYXRlZEF0LFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBdDogcG9zdC51cGRhdGVkQXQsXG4gICAgICAgICAgICAgICAgdGFnczogcG9zdC50YWdzLFxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBwb3N0LmltYWdlVXJsIC8vIEVuc3VyZSBpbWFnZVVybCBpcyBpbmNsdWRlZFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RhdGljICR7U1RBVElDX0RBVEFfVVJMfTpgLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSBvbiBlcnJvclxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhIHNpbmdsZSBwb3N0IGJ5IElEIGJ5IGZpbHRlcmluZyB0aGUgc3RhdGljIEpTT04gZGF0YS5cbiAqIEBwYXJhbSBpZCAtIFRoZSBwb3N0IElEIChzdHJpbmcgb3IgbnVtYmVyKVxuICovXG5mdW5jdGlvbiBmZXRjaFBvc3RCeUlkKGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEZldGNoIGFsbCBwb3N0cyBmaXJzdFxuICAgICAgICAgICAgY29uc3QgYWxsUG9zdHMgPSB5aWVsZCBmZXRjaEJsb2dQb3N0cygpO1xuICAgICAgICAgICAgY29uc3QgcG9zdElkTnVtYmVyID0gdHlwZW9mIGlkID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KGlkLCAxMCkgOiBpZDtcbiAgICAgICAgICAgIGlmIChpc05hTihwb3N0SWROdW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgSW52YWxpZCBwb3N0IElEIHByb3ZpZGVkOiAke2lkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRmluZCB0aGUgc3BlY2lmaWMgcG9zdFxuICAgICAgICAgICAgY29uc3QgcG9zdCA9IGFsbFBvc3RzLmZpbmQocCA9PiBOdW1iZXIocC5pZCkgPT09IHBvc3RJZE51bWJlcik7XG4gICAgICAgICAgICBpZiAoIXBvc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFBvc3Qgd2l0aCBJRCAke2lkfSBub3QgZm91bmQgaW4gc3RhdGljIGRhdGEuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgcG9zdCAke2lkfSBpbiBzdGF0aWMgZGF0YS5gKTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RhdGljIHBvc3QgJHtpZH06YCwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIC0tLSBDb21tZW50IEFQSSBQbGFjZWhvbGRlcnMgLS0tXG5mdW5jdGlvbiBmZXRjaENvbW1lbnRzQXBpKHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkNvbW1lbnRzIGNhbm5vdCBiZSBmZXRjaGVkIG9uIHN0YXRpYyBzaXRlIHdpdGhvdXQgZXh0ZXJuYWwgc2VydmljZS9iYWNrZW5kLlwiKTtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gc3VibWl0Q29tbWVudEFwaShwb3N0SWQsIG5hbWUsIGNvbW1lbnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHN1Ym1pdCBjb21tZW50IG9uIHN0YXRpYyBzaXRlIHdpdGhvdXQgZXh0ZXJuYWwgc2VydmljZS9iYWNrZW5kLlwiKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29tbWVudCBzdWJtaXNzaW9uIG5vdCBhdmFpbGFibGUuXCIpO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNob3dUb2FzdCA9IHNob3dUb2FzdDtcbmV4cG9ydHMuc2hvd0NvbmZpcm1EaWFsb2cgPSBzaG93Q29uZmlybURpYWxvZztcbmZ1bmN0aW9uIHNob3dUb2FzdChtZXNzYWdlLCB0eXBlKSB7XG4gICAgY29uc3QgdG9hc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9hc3Qtbm90aWZpY2F0aW9uJyk7XG4gICAgY29uc3QgdG9hc3RNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvYXN0LW1lc3NhZ2UnKTtcbiAgICBpZiAoIXRvYXN0IHx8ICF0b2FzdE1lc3NhZ2UpXG4gICAgICAgIHJldHVybjtcbiAgICB0b2FzdC5jbGFzc05hbWUgPSBgdG9hc3QgJHt0eXBlfWA7XG4gICAgdG9hc3RNZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICB0b2FzdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdG9hc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9LCAzMDAwKTtcbn1cbi8vIEluc2lkZSBub3RpZmljYXRpb25zLnRzXG5mdW5jdGlvbiBzaG93Q29uZmlybURpYWxvZyhtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpcm1EaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZmlybS1kaWFsb2cnKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZUVsZW1lbnQgPSBjb25maXJtRGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcbiAgICAgICAgY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25maXJtLWRlbGV0ZS1idG4nKTtcbiAgICAgICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbC1kZWxldGUtYnRuJyk7XG4gICAgICAgIGlmICghY29uZmlybURpYWxvZyB8fCAhbWVzc2FnZUVsZW1lbnQgfHwgIWNvbmZpcm1CdXR0b24gfHwgIWNhbmNlbEJ1dHRvbikge1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgICAgICBjb25maXJtRGlhbG9nLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScsICdvcGVuJyk7XG4gICAgICAgIGNvbnN0IGhhbmRsZUNvbmZpcm0gPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtRGlhbG9nLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScsICdvcGVuJyk7XG4gICAgICAgICAgICBjbGVhbnVwTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBoYW5kbGVDYW5jZWwgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtRGlhbG9nLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScsICdvcGVuJyk7XG4gICAgICAgICAgICBjbGVhbnVwTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2xlYW51cExpc3RlbmVycyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDb25maXJtKTtcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNhbmNlbCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDb25maXJtKTtcbiAgICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2FuY2VsKTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5lc2NhcGVIdG1sID0gZXNjYXBlSHRtbDtcbmV4cG9ydHMuZGVib3VuY2UgPSBkZWJvdW5jZTtcbmZ1bmN0aW9uIGVzY2FwZUh0bWwodW5zYWZlKSB7XG4gICAgcmV0dXJuIHVuc2FmZVxuICAgICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xufVxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoLi4uYXJncyksIHdhaXQpO1xuICAgIH07XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZW50cmllcy9hZG1pbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==