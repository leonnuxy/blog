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
const eventListeners_1 = __webpack_require__(/*! ./eventListeners */ "./src/controllers/eventListeners.ts");
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

/***/ "./src/controllers/eventListeners.ts":
/*!*******************************************!*\
  !*** ./src/controllers/eventListeners.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupEventListeners = setupEventListeners;
const modalEvents_1 = __webpack_require__(/*! ./modalEvents */ "./src/controllers/modalEvents.ts");
const postManager_1 = __webpack_require__(/*! ./postManager */ "./src/controllers/postManager.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/controllers/state.ts");
const formHandlers_1 = __webpack_require__(/*! ./formHandlers */ "./src/controllers/formHandlers.ts");
function setupEventListeners() {
    // Table actions
    const tableBody = document.getElementById('posts-table-body');
    if (tableBody) {
        tableBody.addEventListener('click', postManager_1.handleTableActions);
    }
    // Add new post button
    const addPostBtn = document.getElementById('add-post-btn');
    if (addPostBtn) {
        addPostBtn.addEventListener('click', () => (0, modalEvents_1.openPostModal)());
    }
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
    (0, modalEvents_1.setupModalEvents)();
    (0, formHandlers_1.setupSearchAndFilters)();
}


/***/ }),

/***/ "./src/controllers/formHandlers.ts":
/*!*****************************************!*\
  !*** ./src/controllers/formHandlers.ts ***!
  \*****************************************/
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
exports.handleFormSubmit = handleFormSubmit;
exports.setupSearchAndFilters = setupSearchAndFilters;
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
const validation_1 = __webpack_require__(/*! ../utils/validation */ "./src/utils/validation.ts");
const notifications_1 = __webpack_require__(/*! ../utils/notifications */ "./src/utils/notifications.ts");
const modalEvents_1 = __webpack_require__(/*! ./modalEvents */ "./src/controllers/modalEvents.ts");
const postManager_1 = __webpack_require__(/*! ./postManager */ "./src/controllers/postManager.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/controllers/state.ts");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
function handleFormSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const postId = form.dataset.postId;
        try {
            const postData = {
                title: ((_a = formData.get('post-title')) === null || _a === void 0 ? void 0 : _a.trim()) || '',
                content: ((_b = formData.get('post-content')) === null || _b === void 0 ? void 0 : _b.trim()) || '',
                author: ((_c = formData.get('post-author')) === null || _c === void 0 ? void 0 : _c.trim()) || '',
                tags: ((_d = formData.get('post-tags')) === null || _d === void 0 ? void 0 : _d.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)) || []
            };
            if (!(0, validation_1.validatePostData)(postData)) {
                return;
            }
            let result;
            if (postId) {
                // Update existing post
                const updateData = {
                    title: postData.title,
                    content: postData.content,
                    tags: postData.tags
                };
                result = yield (0, api_1.updatePost)(parseInt(postId), updateData);
            }
            else {
                // Create new post
                result = yield (0, api_1.createPost)(postData);
            }
            if (result) {
                (0, modalEvents_1.closePostModal)();
                yield (0, postManager_1.loadPosts)();
                (0, notifications_1.showToast)(postId ? 'Post updated successfully' : 'Post created successfully', 'success');
            }
            else {
                throw new Error(postId ? 'Failed to update post' : 'Failed to create post');
            }
        }
        catch (error) {
            (0, notifications_1.showToast)(postId ? 'Failed to update post' : 'Failed to create post', 'error');
            console.error('Error saving post:', error);
        }
    });
}
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

/***/ "./src/controllers/modalEvents.ts":
/*!****************************************!*\
  !*** ./src/controllers/modalEvents.ts ***!
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
exports.handleModalFormSubmit = handleModalFormSubmit;
exports.setupModalEvents = setupModalEvents;
exports.openPostModal = openPostModal;
exports.closePostModal = closePostModal;
const postManager_1 = __webpack_require__(/*! ./postManager */ "./src/controllers/postManager.ts");
const validation_1 = __webpack_require__(/*! ../utils/validation */ "./src/utils/validation.ts");
const notifications_1 = __webpack_require__(/*! ../utils/notifications */ "./src/utils/notifications.ts");
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
function handleModalFormSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const postId = form.dataset.postId;
        try {
            const postData = {
                title: ((_a = formData.get('post-title')) === null || _a === void 0 ? void 0 : _a.trim()) || '',
                content: ((_b = formData.get('post-content')) === null || _b === void 0 ? void 0 : _b.trim()) || '',
                author: ((_c = formData.get('post-author')) === null || _c === void 0 ? void 0 : _c.trim()) || '',
                tags: ((_d = formData.get('post-tags')) === null || _d === void 0 ? void 0 : _d.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)) || []
            };
            if (!(0, validation_1.validatePostData)(postData)) {
                return;
            }
            let result;
            if (postId) {
                const updateData = {
                    title: postData.title,
                    content: postData.content,
                    tags: postData.tags
                };
                result = yield (0, api_1.updatePost)(parseInt(postId), updateData);
            }
            else {
                result = yield (0, api_1.createPost)(postData);
            }
            if (result) {
                closePostModal();
                yield (0, postManager_1.loadPosts)();
                (0, notifications_1.showToast)(postId ? 'Post updated successfully' : 'Post created successfully', 'success');
            }
            else {
                throw new Error(postId ? 'Failed to update post' : 'Failed to create post');
            }
        }
        catch (error) {
            (0, notifications_1.showToast)(postId ? 'Failed to update post' : 'Failed to create post', 'error');
            console.error('Error saving post:', error);
        }
    });
}
function setupModalEvents() {
    const modal = document.getElementById('post-modal');
    const form = document.getElementById('post-form');
    const closeBtn = modal === null || modal === void 0 ? void 0 : modal.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancel-post-btn');
    if (form) {
        form.addEventListener('submit', handleModalFormSubmit);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closePostModal);
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closePostModal);
    }
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePostModal();
            }
        });
    }
}
function openPostModal(post) {
    const modal = document.getElementById('post-modal');
    const form = document.getElementById('post-form');
    const titleInput = document.getElementById('post-title');
    const authorInput = document.getElementById('post-author');
    const contentInput = document.getElementById('post-content');
    const tagsInput = document.getElementById('post-tags');
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) {
        modalTitle.textContent = post ? 'Edit Post' : 'Add New Post';
    }
    if (post) {
        titleInput.value = post.title;
        authorInput.value = post.author;
        contentInput.value = post.content;
        tagsInput.value = post.tags.join(', ');
        form.dataset.postId = post.id.toString();
    }
    else {
        form.reset();
        delete form.dataset.postId;
    }
    modal.classList.add('open');
}
function closePostModal() {
    const modal = document.getElementById('post-modal');
    if (modal) {
        modal.classList.remove('open');
    }
}


/***/ }),

/***/ "./src/controllers/pagination.ts":
/*!***************************************!*\
  !*** ./src/controllers/pagination.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updatePaginationState = updatePaginationState;
exports.updatePaginationControls = updatePaginationControls;
const state_1 = __webpack_require__(/*! ./state */ "./src/controllers/state.ts");
const postManager_1 = __webpack_require__(/*! ./postManager */ "./src/controllers/postManager.ts");
function updatePaginationState() {
    state_1.state.totalPages = Math.ceil((0, postManager_1.filterAndSortPosts)().length / state_1.state.postsPerPage);
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
exports.filterAndSortPosts = filterAndSortPosts;
exports.loadPosts = loadPosts;
exports.renderCurrentPage = renderCurrentPage;
exports.handleTableActions = handleTableActions;
const api_1 = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/controllers/state.ts");
const notifications_1 = __webpack_require__(/*! ../utils/notifications */ "./src/utils/notifications.ts");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
const pagination_1 = __webpack_require__(/*! ./pagination */ "./src/controllers/pagination.ts");
const modalEvents_1 = __webpack_require__(/*! ./modalEvents */ "./src/controllers/modalEvents.ts");
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
            case 'likes':
                return b.likes - a.likes;
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
            (0, pagination_1.updatePaginationState)();
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
            <td>${post.likes}</td>
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
    (0, pagination_1.updatePaginationState)();
}
function handleTableActions(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const target = event.target;
        const actionButton = target.closest('.btn-edit, .btn-delete');
        if (!actionButton) {
            return;
        }
        const row = actionButton.closest('tr');
        if (!row)
            return;
        const postId = row.dataset.postId;
        if (!postId)
            return;
        if (actionButton.classList.contains('btn-delete')) {
            yield handleDeletePost(Number(postId), row);
        }
        else if (actionButton.classList.contains('btn-edit')) {
            yield handleEditPost(Number(postId));
        }
    });
}
function handleDeletePost(postId, row) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmDelete = yield (0, notifications_1.showConfirmDialog)('Are you sure you want to delete this post?');
        if (!confirmDelete)
            return;
        try {
            const success = yield (0, api_1.deleteBlogPost)(postId.toString());
            if (success) {
                row.remove();
                const previousCount = state_1.state.posts.length;
                state_1.state.posts = state_1.state.posts.filter(post => Number(post.id) !== postId);
                console.log(`Posts filtered: from ${previousCount} to ${state_1.state.posts.length}`);
                (0, notifications_1.showToast)('Post deleted successfully', 'success');
                (0, pagination_1.updatePaginationState)();
                // Check if we need to render the page again (e.g., if we deleted the last item on a page)
                if (state_1.state.posts.length === 0 ||
                    (state_1.state.currentPage > 1 &&
                        (state_1.state.currentPage - 1) * state_1.state.postsPerPage >= state_1.state.posts.length)) {
                    state_1.state.currentPage = Math.max(1, state_1.state.currentPage - 1);
                    renderCurrentPage();
                }
            }
            else {
                console.error('Delete operation returned false/unsuccessful');
                throw new Error('Server returned unsuccessful response when deleting post');
            }
        }
        catch (error) {
            console.error('Error deleting post:', error);
            (0, notifications_1.showToast)(`Failed to delete post: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
        }
    });
}
function handleEditPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, api_1.fetchPostById)(postId);
            if (post) {
                (0, modalEvents_1.openPostModal)(post);
            }
            else {
                throw new Error('Post not found');
            }
        }
        catch (error) {
            (0, notifications_1.showToast)('Failed to load post for editing', 'error');
            console.error('Error loading post:', error);
        }
    });
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
exports.state = void 0;
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
/**
 * Admin Dashboard entry point
 */
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


/***/ }),

/***/ "./src/utils/validation.ts":
/*!*********************************!*\
  !*** ./src/utils/validation.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validatePostData = validatePostData;
const notifications_1 = __webpack_require__(/*! ./notifications */ "./src/utils/notifications.ts");
function validatePostData(data) {
    if (!data.title || data.title.length < 3) {
        (0, notifications_1.showToast)('Title must be at least 3 characters long', 'error');
        return false;
    }
    if (!data.content || data.content.length < 10) {
        (0, notifications_1.showToast)('Content must be at least 10 characters long', 'error');
        return false;
    }
    if (!data.author) {
        (0, notifications_1.showToast)('Author name is required', 'error');
        return false;
    }
    return true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDBCQUEwQjtBQUMxQixxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0Esc0VBQXNFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3RGE7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQywyQ0FBUztBQUNqQyx5QkFBeUIsbUJBQU8sQ0FBQyw2REFBa0I7QUFDbkQsc0JBQXNCLG1CQUFPLENBQUMsdURBQWU7QUFDN0Msd0JBQXdCLG1CQUFPLENBQUMsNERBQXdCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7QUN0Q2E7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMkJBQTJCO0FBQzNCLHNCQUFzQixtQkFBTyxDQUFDLHVEQUFlO0FBQzdDLHNCQUFzQixtQkFBTyxDQUFDLHVEQUFlO0FBQzdDLGdCQUFnQixtQkFBTyxDQUFDLDJDQUFTO0FBQ2pDLHVCQUF1QixtQkFBTyxDQUFDLHlEQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZDYTtBQUNiO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCO0FBQ3hCLDZCQUE2QjtBQUM3QixjQUFjLG1CQUFPLENBQUMsOENBQWlCO0FBQ3ZDLHFCQUFxQixtQkFBTyxDQUFDLHNEQUFxQjtBQUNsRCx3QkFBd0IsbUJBQU8sQ0FBQyw0REFBd0I7QUFDeEQsc0JBQXNCLG1CQUFPLENBQUMsdURBQWU7QUFDN0Msc0JBQXNCLG1CQUFPLENBQUMsdURBQWU7QUFDN0MsZ0JBQWdCLG1CQUFPLENBQUMsMkNBQVM7QUFDakMsZ0JBQWdCLG1CQUFPLENBQUMsNENBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDdkdhO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCw2QkFBNkI7QUFDN0Isd0JBQXdCO0FBQ3hCLHFCQUFxQjtBQUNyQixzQkFBc0I7QUFDdEIsc0JBQXNCLG1CQUFPLENBQUMsdURBQWU7QUFDN0MscUJBQXFCLG1CQUFPLENBQUMsc0RBQXFCO0FBQ2xELHdCQUF3QixtQkFBTyxDQUFDLDREQUF3QjtBQUN4RCxjQUFjLG1CQUFPLENBQUMsOENBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuSGE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNkJBQTZCO0FBQzdCLGdDQUFnQztBQUNoQyxnQkFBZ0IsbUJBQU8sQ0FBQywyQ0FBUztBQUNqQyxzQkFBc0IsbUJBQU8sQ0FBQyx1REFBZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLDJCQUEyQixLQUFLLHlCQUF5QjtBQUNyRztBQUNBOzs7Ozs7Ozs7OztBQ25CYTtBQUNiO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMEJBQTBCO0FBQzFCLGlCQUFpQjtBQUNqQix5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCLGNBQWMsbUJBQU8sQ0FBQyw4Q0FBaUI7QUFDdkMsZ0JBQWdCLG1CQUFPLENBQUMsMkNBQVM7QUFDakMsd0JBQXdCLG1CQUFPLENBQUMsNERBQXdCO0FBQ3hELGdCQUFnQixtQkFBTyxDQUFDLDRDQUFnQjtBQUN4QyxxQkFBcUIsbUJBQU8sQ0FBQyxxREFBYztBQUMzQyxzQkFBc0IsbUJBQU8sQ0FBQyx1REFBZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQixrQkFBa0Isb0NBQW9DO0FBQ3RELGtCQUFrQixxQ0FBcUM7QUFDdkQsa0JBQWtCLGNBQWM7QUFDaEMsa0JBQWtCLGtEQUFrRCw2QkFBNkIsbUJBQW1CO0FBQ3BILGtCQUFrQixXQUFXO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsZUFBZSxLQUFLLDJCQUEyQjtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLHlEQUF5RDtBQUM5SDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN0TWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYTtBQUNiLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWmE7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtQkFBTyxDQUFDLDRFQUFnQyxHQUFHO0FBQ3JFLG1CQUFtQixtQkFBTyxDQUFDLDREQUF3QixHQUFHO0FBQ3REO0FBQ0EsWUFBWSx3QkFBd0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Qsa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMzR2E7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGdCQUFnQjtBQUNoQixrQkFBa0I7QUFDbEIsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsb0JBQW9CO0FBQ3BCLHNCQUFzQjtBQUN0QixxQkFBcUI7QUFDckIsd0JBQXdCO0FBQ3hCLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUYsSUFBSTtBQUNyRjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRixJQUFJO0FBQ3pGO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFFBQVE7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFFBQVEsSUFBSSxpQkFBaUIsRUFBRSxvQkFBb0I7QUFDdEc7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUNBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxHQUFHO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLElBQUk7QUFDakQ7QUFDQTtBQUNBLHNDQUFzQyxJQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxHQUFHO0FBQzNEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDdElhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQjtBQUNqQix5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixLQUFLO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7QUM5Q2E7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2xCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3QkFBd0I7QUFDeEIsd0JBQXdCLG1CQUFPLENBQUMscURBQWlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2xCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb21wb25lbnRzL2RhcmtNb2RlLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29udHJvbGxlcnMvYWRtaW5Db250cm9sbGVyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29udHJvbGxlcnMvZXZlbnRMaXN0ZW5lcnMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9mb3JtSGFuZGxlcnMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9tb2RhbEV2ZW50cy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL3BhZ2luYXRpb24udHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9wb3N0TWFuYWdlci50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL3N0YXRlLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvZW50cmllcy9hZG1pbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3NlcnZpY2VzL2FwaS50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3V0aWxzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy91dGlscy91dGlscy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3V0aWxzL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBEYXJrIG1vZGUgZnVuY3Rpb25hbGl0eVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplRGFya01vZGUgPSBpbml0aWFsaXplRGFya01vZGU7XG5leHBvcnRzLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlID0gY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2U7XG4vKipcbiAqIEluaXRpYWxpemUgZGFyayBtb2RlIHRvZ2dsZVxuICogVGhpcyBjcmVhdGVzIGEgZmxvYXRpbmcgZGFyayBtb2RlIHRvZ2dsZSBidXR0b24gYW5kIGFkZHMgaXQgdG8gdGhlIERPTVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplRGFya01vZGUoKSB7XG4gICAgLy8gQ3JlYXRlIGRhcmsgbW9kZSB0b2dnbGUgYnV0dG9uXG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkYXJrTW9kZVRvZ2dsZS5jbGFzc05hbWUgPSAnZGFyay1tb2RlLXRvZ2dsZSc7XG4gICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLW1vb25cIj48L2k+JzsgLy8gTW9vbiBpY29uXG4gICAgZGFya01vZGVUb2dnbGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1RvZ2dsZSBEYXJrIE1vZGUnKTtcbiAgICAvLyBDaGVjayBpZiBkYXJrIG1vZGUgcHJlZmVyZW5jZSBpcyBhbHJlYWR5IHNldCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgY29uc3QgaXNEYXJrTW9kZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrTW9kZScpID09PSAndHJ1ZSc7XG4gICAgaWYgKGlzRGFya01vZGUpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLW1vZGUnKTtcbiAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvbiBmb3IgbGlnaHQgbW9kZVxuICAgIH1cbiAgICAvLyBBZGQgY2xpY2sgZXZlbnQgbGlzdGVuZXJcbiAgICBkYXJrTW9kZVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZURhcmtNb2RlKTtcbiAgICAvLyBBZGQgYnV0dG9uIHRvIHRoZSBET01cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRhcmtNb2RlVG9nZ2xlKTtcbn1cbi8qKlxuICogVG9nZ2xlIGRhcmsgbW9kZSBvbiBhbmQgb2ZmXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZURhcmtNb2RlKCkge1xuICAgIGNvbnN0IGlzRGFya01vZGUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmstbW9kZScpO1xuICAgIGNvbnN0IGRhcmtNb2RlVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstbW9kZS10b2dnbGUnKTtcbiAgICAvLyBVcGRhdGUgaWNvbiBiYXNlZCBvbiBtb2RlXG4gICAgaWYgKGRhcmtNb2RlVG9nZ2xlKSB7XG4gICAgICAgIGlmIChpc0RhcmtNb2RlKSB7XG4gICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uIGZvciBsaWdodCBtb2RlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nOyAvLyBNb29uIGljb24gZm9yIGRhcmsgbW9kZVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFNhdmUgcHJlZmVyZW5jZSB0byBsb2NhbCBzdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmtNb2RlJywgaXNEYXJrTW9kZS50b1N0cmluZygpKTtcbn1cbi8qKlxuICogQ2hlY2sgaWYgdXNlciBoYXMgc3lzdGVtIGRhcmsgbW9kZSBwcmVmZXJlbmNlXG4gKiBJZiB0aGV5IGRvIGFuZCB3ZSBoYXZlbid0IHNldCBhIHByZWZlcmVuY2UgeWV0LCBhcHBseSBkYXJrIG1vZGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UoKSB7XG4gICAgLy8gT25seSBjaGVjayBpZiB1c2VyIGhhc24ndCBleHBsaWNpdGx5IHNldCBhIHByZWZlcmVuY2VcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcHJlZmVyc0RhcmtNb2RlID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzO1xuICAgICAgICBpZiAocHJlZmVyc0RhcmtNb2RlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICAgICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1tb2RlLXRvZ2dsZScpO1xuICAgICAgICAgICAgaWYgKGRhcmtNb2RlVG9nZ2xlKSB7XG4gICAgICAgICAgICAgICAgZGFya01vZGVUb2dnbGUuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLXN1blwiPjwvaT4nOyAvLyBTdW4gaWNvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmtNb2RlJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVBZG1pbkRhc2hib2FyZCA9IGluaXRpYWxpemVBZG1pbkRhc2hib2FyZDtcbi8qKlxuICogQWRtaW4gQ29udHJvbGxlciBmb3IgbWFuYWdpbmcgYmxvZyBwb3N0cyBhbmQgZGFzaGJvYXJkIGZ1bmN0aW9uYWxpdHlcbiAqL1xuY29uc3Qgc3RhdGVfMSA9IHJlcXVpcmUoXCIuL3N0YXRlXCIpO1xuY29uc3QgZXZlbnRMaXN0ZW5lcnNfMSA9IHJlcXVpcmUoXCIuL2V2ZW50TGlzdGVuZXJzXCIpO1xuY29uc3QgcG9zdE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL3Bvc3RNYW5hZ2VyXCIpO1xuY29uc3Qgbm90aWZpY2F0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL25vdGlmaWNhdGlvbnNcIik7XG5mdW5jdGlvbiBpbml0aWFsaXplQWRtaW5EYXNoYm9hcmQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZV8xLnN0YXRlLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGVfMS5zdGF0ZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICgwLCBldmVudExpc3RlbmVyc18xLnNldHVwRXZlbnRMaXN0ZW5lcnMpKCk7XG4gICAgICAgICAgICB5aWVsZCAoMCwgcG9zdE1hbmFnZXJfMS5sb2FkUG9zdHMpKCk7XG4gICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICgwLCBub3RpZmljYXRpb25zXzEuc2hvd1RvYXN0KSgnRmFpbGVkIHRvIGluaXRpYWxpemUgZGFzaGJvYXJkJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXNoYm9hcmQgaW5pdGlhbGl6YXRpb24gZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc3RhdGVfMS5zdGF0ZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXR1cEV2ZW50TGlzdGVuZXJzID0gc2V0dXBFdmVudExpc3RlbmVycztcbmNvbnN0IG1vZGFsRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9tb2RhbEV2ZW50c1wiKTtcbmNvbnN0IHBvc3RNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9wb3N0TWFuYWdlclwiKTtcbmNvbnN0IHN0YXRlXzEgPSByZXF1aXJlKFwiLi9zdGF0ZVwiKTtcbmNvbnN0IGZvcm1IYW5kbGVyc18xID0gcmVxdWlyZShcIi4vZm9ybUhhbmRsZXJzXCIpO1xuZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICAvLyBUYWJsZSBhY3Rpb25zXG4gICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RzLXRhYmxlLWJvZHknKTtcbiAgICBpZiAodGFibGVCb2R5KSB7XG4gICAgICAgIHRhYmxlQm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBvc3RNYW5hZ2VyXzEuaGFuZGxlVGFibGVBY3Rpb25zKTtcbiAgICB9XG4gICAgLy8gQWRkIG5ldyBwb3N0IGJ1dHRvblxuICAgIGNvbnN0IGFkZFBvc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXBvc3QtYnRuJyk7XG4gICAgaWYgKGFkZFBvc3RCdG4pIHtcbiAgICAgICAgYWRkUG9zdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+ICgwLCBtb2RhbEV2ZW50c18xLm9wZW5Qb3N0TW9kYWwpKCkpO1xuICAgIH1cbiAgICAvLyBQYWdpbmF0aW9uIGNvbnRyb2xzXG4gICAgY29uc3QgcHJldkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2LXBhZ2UnKTtcbiAgICBjb25zdCBuZXh0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25leHQtcGFnZScpO1xuICAgIGlmIChwcmV2QnRuKSB7XG4gICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSA+IDEpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlLS07XG4gICAgICAgICAgICAgICAgKDAsIHBvc3RNYW5hZ2VyXzEucmVuZGVyQ3VycmVudFBhZ2UpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobmV4dEJ0bikge1xuICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UgPCBzdGF0ZV8xLnN0YXRlLnRvdGFsUGFnZXMpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlKys7XG4gICAgICAgICAgICAgICAgKDAsIHBvc3RNYW5hZ2VyXzEucmVuZGVyQ3VycmVudFBhZ2UpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAoMCwgbW9kYWxFdmVudHNfMS5zZXR1cE1vZGFsRXZlbnRzKSgpO1xuICAgICgwLCBmb3JtSGFuZGxlcnNfMS5zZXR1cFNlYXJjaEFuZEZpbHRlcnMpKCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbmV4cG9ydHMuc2V0dXBTZWFyY2hBbmRGaWx0ZXJzID0gc2V0dXBTZWFyY2hBbmRGaWx0ZXJzO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3QgdmFsaWRhdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3ZhbGlkYXRpb25cIik7XG5jb25zdCBub3RpZmljYXRpb25zXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvbm90aWZpY2F0aW9uc1wiKTtcbmNvbnN0IG1vZGFsRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9tb2RhbEV2ZW50c1wiKTtcbmNvbnN0IHBvc3RNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9wb3N0TWFuYWdlclwiKTtcbmNvbnN0IHN0YXRlXzEgPSByZXF1aXJlKFwiLi9zdGF0ZVwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdXRpbHNcIik7XG5mdW5jdGlvbiBoYW5kbGVGb3JtU3VibWl0KGV2ZW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBmb3JtID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgY29uc3QgcG9zdElkID0gZm9ybS5kYXRhc2V0LnBvc3RJZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBvc3REYXRhID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAoKF9hID0gZm9ybURhdGEuZ2V0KCdwb3N0LXRpdGxlJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50cmltKCkpIHx8ICcnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICgoX2IgPSBmb3JtRGF0YS5nZXQoJ3Bvc3QtY29udGVudCcpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudHJpbSgpKSB8fCAnJyxcbiAgICAgICAgICAgICAgICBhdXRob3I6ICgoX2MgPSBmb3JtRGF0YS5nZXQoJ3Bvc3QtYXV0aG9yJykpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50cmltKCkpIHx8ICcnLFxuICAgICAgICAgICAgICAgIHRhZ3M6ICgoX2QgPSBmb3JtRGF0YS5nZXQoJ3Bvc3QtdGFncycpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Quc3BsaXQoJywnKS5tYXAodGFnID0+IHRhZy50cmltKCkpLmZpbHRlcih0YWcgPT4gdGFnLmxlbmd0aCA+IDApKSB8fCBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghKDAsIHZhbGlkYXRpb25fMS52YWxpZGF0ZVBvc3REYXRhKShwb3N0RGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBwb3N0XG4gICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHBvc3REYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBwb3N0RGF0YS5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICB0YWdzOiBwb3N0RGF0YS50YWdzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCAoMCwgYXBpXzEudXBkYXRlUG9zdCkocGFyc2VJbnQocG9zdElkKSwgdXBkYXRlRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHBvc3RcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCAoMCwgYXBpXzEuY3JlYXRlUG9zdCkocG9zdERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICgwLCBtb2RhbEV2ZW50c18xLmNsb3NlUG9zdE1vZGFsKSgpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBwb3N0TWFuYWdlcl8xLmxvYWRQb3N0cykoKTtcbiAgICAgICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkocG9zdElkID8gJ1Bvc3QgdXBkYXRlZCBzdWNjZXNzZnVsbHknIDogJ1Bvc3QgY3JlYXRlZCBzdWNjZXNzZnVsbHknLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHBvc3RJZCA/ICdGYWlsZWQgdG8gdXBkYXRlIHBvc3QnIDogJ0ZhaWxlZCB0byBjcmVhdGUgcG9zdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zaG93VG9hc3QpKHBvc3RJZCA/ICdGYWlsZWQgdG8gdXBkYXRlIHBvc3QnIDogJ0ZhaWxlZCB0byBjcmVhdGUgcG9zdCcsICdlcnJvcicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIHBvc3Q6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzZXR1cFNlYXJjaEFuZEZpbHRlcnMoKSB7XG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLXBvc3RzJyk7XG4gICAgY29uc3Qgc29ydFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3J0LWJ5Jyk7XG4gICAgY29uc3QgZmlsdGVyVGFnU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci10YWcnKTtcbiAgICBpZiAoc2VhcmNoSW5wdXQpIHtcbiAgICAgICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoMCwgdXRpbHNfMS5kZWJvdW5jZSkoKGUpID0+IHtcbiAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUuc2VhcmNoVGVybSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgKDAsIHBvc3RNYW5hZ2VyXzEubG9hZFBvc3RzKSgpO1xuICAgICAgICB9LCAzMDApKTtcbiAgICB9XG4gICAgaWYgKHNvcnRTZWxlY3QpIHtcbiAgICAgICAgc29ydFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgICAgICAgc3RhdGVfMS5zdGF0ZS5zb3J0QnkgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICgwLCBwb3N0TWFuYWdlcl8xLmxvYWRQb3N0cykoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChmaWx0ZXJUYWdTZWxlY3QpIHtcbiAgICAgICAgdXBkYXRlVGFnRmlsdGVyT3B0aW9ucygpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZVRhZ0ZpbHRlck9wdGlvbnMoKSB7XG4gICAgY29uc3QgZmlsdGVyVGFnU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci10YWcnKTtcbiAgICBpZiAoIWZpbHRlclRhZ1NlbGVjdClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHVuaXF1ZVRhZ3MgPSBuZXcgU2V0KCk7XG4gICAgc3RhdGVfMS5zdGF0ZS5wb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICBwb3N0LnRhZ3MuZm9yRWFjaCh0YWcgPT4gdW5pcXVlVGFncy5hZGQodGFnKSk7XG4gICAgfSk7XG4gICAgZmlsdGVyVGFnU2VsZWN0LmlubmVySFRNTCA9ICc8b3B0aW9uIHZhbHVlPVwiXCI+QWxsIFRhZ3M8L29wdGlvbj4nO1xuICAgIEFycmF5LmZyb20odW5pcXVlVGFncylcbiAgICAgICAgLnNvcnQoKVxuICAgICAgICAuZm9yRWFjaCh0YWcgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gdGFnO1xuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSB0YWc7XG4gICAgICAgIGZpbHRlclRhZ1NlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaGFuZGxlTW9kYWxGb3JtU3VibWl0ID0gaGFuZGxlTW9kYWxGb3JtU3VibWl0O1xuZXhwb3J0cy5zZXR1cE1vZGFsRXZlbnRzID0gc2V0dXBNb2RhbEV2ZW50cztcbmV4cG9ydHMub3BlblBvc3RNb2RhbCA9IG9wZW5Qb3N0TW9kYWw7XG5leHBvcnRzLmNsb3NlUG9zdE1vZGFsID0gY2xvc2VQb3N0TW9kYWw7XG5jb25zdCBwb3N0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4vcG9zdE1hbmFnZXJcIik7XG5jb25zdCB2YWxpZGF0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdmFsaWRhdGlvblwiKTtcbmNvbnN0IG5vdGlmaWNhdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9ub3RpZmljYXRpb25zXCIpO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuZnVuY3Rpb24gaGFuZGxlTW9kYWxGb3JtU3VibWl0KGV2ZW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBmb3JtID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgY29uc3QgcG9zdElkID0gZm9ybS5kYXRhc2V0LnBvc3RJZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBvc3REYXRhID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAoKF9hID0gZm9ybURhdGEuZ2V0KCdwb3N0LXRpdGxlJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50cmltKCkpIHx8ICcnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICgoX2IgPSBmb3JtRGF0YS5nZXQoJ3Bvc3QtY29udGVudCcpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudHJpbSgpKSB8fCAnJyxcbiAgICAgICAgICAgICAgICBhdXRob3I6ICgoX2MgPSBmb3JtRGF0YS5nZXQoJ3Bvc3QtYXV0aG9yJykpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50cmltKCkpIHx8ICcnLFxuICAgICAgICAgICAgICAgIHRhZ3M6ICgoX2QgPSBmb3JtRGF0YS5nZXQoJ3Bvc3QtdGFncycpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Quc3BsaXQoJywnKS5tYXAodGFnID0+IHRhZy50cmltKCkpLmZpbHRlcih0YWcgPT4gdGFnLmxlbmd0aCA+IDApKSB8fCBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghKDAsIHZhbGlkYXRpb25fMS52YWxpZGF0ZVBvc3REYXRhKShwb3N0RGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBwb3N0RGF0YS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogcG9zdERhdGEuY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgdGFnczogcG9zdERhdGEudGFnc1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgKDAsIGFwaV8xLnVwZGF0ZVBvc3QpKHBhcnNlSW50KHBvc3RJZCksIHVwZGF0ZURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgKDAsIGFwaV8xLmNyZWF0ZVBvc3QpKHBvc3REYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvc3RNb2RhbCgpO1xuICAgICAgICAgICAgICAgIHlpZWxkICgwLCBwb3N0TWFuYWdlcl8xLmxvYWRQb3N0cykoKTtcbiAgICAgICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkocG9zdElkID8gJ1Bvc3QgdXBkYXRlZCBzdWNjZXNzZnVsbHknIDogJ1Bvc3QgY3JlYXRlZCBzdWNjZXNzZnVsbHknLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHBvc3RJZCA/ICdGYWlsZWQgdG8gdXBkYXRlIHBvc3QnIDogJ0ZhaWxlZCB0byBjcmVhdGUgcG9zdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zaG93VG9hc3QpKHBvc3RJZCA/ICdGYWlsZWQgdG8gdXBkYXRlIHBvc3QnIDogJ0ZhaWxlZCB0byBjcmVhdGUgcG9zdCcsICdlcnJvcicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIHBvc3Q6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzZXR1cE1vZGFsRXZlbnRzKCkge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtbW9kYWwnKTtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtZm9ybScpO1xuICAgIGNvbnN0IGNsb3NlQnRuID0gbW9kYWwgPT09IG51bGwgfHwgbW9kYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1tb2RhbCcpO1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWwtcG9zdC1idG4nKTtcbiAgICBpZiAoZm9ybSkge1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZU1vZGFsRm9ybVN1Ym1pdCk7XG4gICAgfVxuICAgIGlmIChjbG9zZUJ0bikge1xuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9zdE1vZGFsKTtcbiAgICB9XG4gICAgaWYgKGNhbmNlbEJ0bikge1xuICAgICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvc3RNb2RhbCk7XG4gICAgfVxuICAgIC8vIENsb3NlIG1vZGFsIG9uIG91dHNpZGUgY2xpY2tcbiAgICBpZiAobW9kYWwpIHtcbiAgICAgICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBtb2RhbCkge1xuICAgICAgICAgICAgICAgIGNsb3NlUG9zdE1vZGFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG9wZW5Qb3N0TW9kYWwocG9zdCkge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtbW9kYWwnKTtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtZm9ybScpO1xuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC10aXRsZScpO1xuICAgIGNvbnN0IGF1dGhvcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtYXV0aG9yJyk7XG4gICAgY29uc3QgY29udGVudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpO1xuICAgIGNvbnN0IHRhZ3NJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LXRhZ3MnKTtcbiAgICBjb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLXRpdGxlJyk7XG4gICAgaWYgKG1vZGFsVGl0bGUpIHtcbiAgICAgICAgbW9kYWxUaXRsZS50ZXh0Q29udGVudCA9IHBvc3QgPyAnRWRpdCBQb3N0JyA6ICdBZGQgTmV3IFBvc3QnO1xuICAgIH1cbiAgICBpZiAocG9zdCkge1xuICAgICAgICB0aXRsZUlucHV0LnZhbHVlID0gcG9zdC50aXRsZTtcbiAgICAgICAgYXV0aG9ySW5wdXQudmFsdWUgPSBwb3N0LmF1dGhvcjtcbiAgICAgICAgY29udGVudElucHV0LnZhbHVlID0gcG9zdC5jb250ZW50O1xuICAgICAgICB0YWdzSW5wdXQudmFsdWUgPSBwb3N0LnRhZ3Muam9pbignLCAnKTtcbiAgICAgICAgZm9ybS5kYXRhc2V0LnBvc3RJZCA9IHBvc3QuaWQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICAgICAgZGVsZXRlIGZvcm0uZGF0YXNldC5wb3N0SWQ7XG4gICAgfVxuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcbn1cbmZ1bmN0aW9uIGNsb3NlUG9zdE1vZGFsKCkge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtbW9kYWwnKTtcbiAgICBpZiAobW9kYWwpIHtcbiAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51cGRhdGVQYWdpbmF0aW9uU3RhdGUgPSB1cGRhdGVQYWdpbmF0aW9uU3RhdGU7XG5leHBvcnRzLnVwZGF0ZVBhZ2luYXRpb25Db250cm9scyA9IHVwZGF0ZVBhZ2luYXRpb25Db250cm9scztcbmNvbnN0IHN0YXRlXzEgPSByZXF1aXJlKFwiLi9zdGF0ZVwiKTtcbmNvbnN0IHBvc3RNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9wb3N0TWFuYWdlclwiKTtcbmZ1bmN0aW9uIHVwZGF0ZVBhZ2luYXRpb25TdGF0ZSgpIHtcbiAgICBzdGF0ZV8xLnN0YXRlLnRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoKDAsIHBvc3RNYW5hZ2VyXzEuZmlsdGVyQW5kU29ydFBvc3RzKSgpLmxlbmd0aCAvIHN0YXRlXzEuc3RhdGUucG9zdHNQZXJQYWdlKTtcbiAgICB1cGRhdGVQYWdpbmF0aW9uQ29udHJvbHMoKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVBhZ2luYXRpb25Db250cm9scygpIHtcbiAgICBjb25zdCBwcmV2QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXYtcGFnZScpO1xuICAgIGNvbnN0IG5leHRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dC1wYWdlJyk7XG4gICAgY29uc3QgcGFnZUluZGljYXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlLWluZGljYXRvcicpO1xuICAgIGlmIChwcmV2QnRuICYmIG5leHRCdG4gJiYgcGFnZUluZGljYXRvcikge1xuICAgICAgICBwcmV2QnRuLmRpc2FibGVkID0gc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gMTtcbiAgICAgICAgbmV4dEJ0bi5kaXNhYmxlZCA9IHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UgPT09IHN0YXRlXzEuc3RhdGUudG90YWxQYWdlcztcbiAgICAgICAgcGFnZUluZGljYXRvci50ZXh0Q29udGVudCA9IGBQYWdlICR7c3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZX0gb2YgJHtzdGF0ZV8xLnN0YXRlLnRvdGFsUGFnZXN9YDtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5maWx0ZXJBbmRTb3J0UG9zdHMgPSBmaWx0ZXJBbmRTb3J0UG9zdHM7XG5leHBvcnRzLmxvYWRQb3N0cyA9IGxvYWRQb3N0cztcbmV4cG9ydHMucmVuZGVyQ3VycmVudFBhZ2UgPSByZW5kZXJDdXJyZW50UGFnZTtcbmV4cG9ydHMuaGFuZGxlVGFibGVBY3Rpb25zID0gaGFuZGxlVGFibGVBY3Rpb25zO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvYXBpXCIpO1xuY29uc3Qgc3RhdGVfMSA9IHJlcXVpcmUoXCIuL3N0YXRlXCIpO1xuY29uc3Qgbm90aWZpY2F0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL25vdGlmaWNhdGlvbnNcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL3V0aWxzXCIpO1xuY29uc3QgcGFnaW5hdGlvbl8xID0gcmVxdWlyZShcIi4vcGFnaW5hdGlvblwiKTtcbmNvbnN0IG1vZGFsRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9tb2RhbEV2ZW50c1wiKTtcbmZ1bmN0aW9uIGZpbHRlckFuZFNvcnRQb3N0cygpIHtcbiAgICBsZXQgZmlsdGVyZWQgPSBbLi4uc3RhdGVfMS5zdGF0ZS5wb3N0c107XG4gICAgLy8gQXBwbHkgc2VhcmNoIGZpbHRlclxuICAgIGlmIChzdGF0ZV8xLnN0YXRlLnNlYXJjaFRlcm0pIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoTG93ZXIgPSBzdGF0ZV8xLnN0YXRlLnNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgZmlsdGVyZWQgPSBmaWx0ZXJlZC5maWx0ZXIocG9zdCA9PiBwb3N0LnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpIHx8XG4gICAgICAgICAgICBwb3N0LmNvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgIHBvc3QuYXV0aG9yLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpIHx8XG4gICAgICAgICAgICBwb3N0LnRhZ3Muc29tZSh0YWcgPT4gdGFnLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpKSk7XG4gICAgfVxuICAgIC8vIEFwcGx5IHNvcnRpbmdcbiAgICBmaWx0ZXJlZC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGVfMS5zdGF0ZS5zb3J0QnkpIHtcbiAgICAgICAgICAgIGNhc2UgJ25ld2VzdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGIuY3JlYXRlZEF0KS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLmNyZWF0ZWRBdCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY2FzZSAnb2xkZXN0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoYS5jcmVhdGVkQXQpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGIuY3JlYXRlZEF0KS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjYXNlICd0aXRsZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlKTtcbiAgICAgICAgICAgIGNhc2UgJ2xpa2VzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gYi5saWtlcyAtIGEubGlrZXM7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkO1xufVxuZnVuY3Rpb24gbG9hZFBvc3RzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0cy10YWJsZS1ib2R5Jyk7XG4gICAgICAgIGlmICghdGFibGVCb2R5KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdQb3N0cyB0YWJsZSBib2R5IG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLnBvc3RzID0geWllbGQgKDAsIGFwaV8xLmZldGNoQmxvZ1Bvc3RzKSgpO1xuICAgICAgICAgICAgKDAsIHBhZ2luYXRpb25fMS51cGRhdGVQYWdpbmF0aW9uU3RhdGUpKCk7XG4gICAgICAgICAgICByZW5kZXJDdXJyZW50UGFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zaG93VG9hc3QpKCdGYWlsZWQgdG8gbG9hZCBwb3N0cycsICdlcnJvcicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBwb3N0czonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93RXJyb3JTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZW5kZXJDdXJyZW50UGFnZSgpIHtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdHMtdGFibGUtYm9keScpO1xuICAgIGlmICghdGFibGVCb2R5KVxuICAgICAgICByZXR1cm47XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnN0IGZpbHRlcmVkUG9zdHMgPSBmaWx0ZXJBbmRTb3J0UG9zdHMoKTtcbiAgICBpZiAoZmlsdGVyZWRQb3N0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2hvd0VtcHR5U3RhdGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdGFydEluZGV4ID0gKHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UgLSAxKSAqIHN0YXRlXzEuc3RhdGUucG9zdHNQZXJQYWdlO1xuICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCArIHN0YXRlXzEuc3RhdGUucG9zdHNQZXJQYWdlO1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlUG9zdHMgPSBmaWx0ZXJlZFBvc3RzLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgICBjdXJyZW50UGFnZVBvc3RzLmZvckVhY2goKHBvc3QpID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgcm93LmRhdGFzZXQucG9zdElkID0gcG9zdC5pZC50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICAgICAgICByb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHRkPiR7cG9zdC5pZH08L3RkPlxuICAgICAgICAgICAgPHRkPiR7KDAsIHV0aWxzXzEuZXNjYXBlSHRtbCkocG9zdC50aXRsZSl9PC90ZD5cbiAgICAgICAgICAgIDx0ZD4keygwLCB1dGlsc18xLmVzY2FwZUh0bWwpKHBvc3QuYXV0aG9yKX08L3RkPlxuICAgICAgICAgICAgPHRkPiR7Zm9ybWF0dGVkRGF0ZX08L3RkPlxuICAgICAgICAgICAgPHRkPiR7cG9zdC50YWdzLm1hcCgodGFnKSA9PiBgPHNwYW4gY2xhc3M9XCJ0YWctYmFkZ2VcIj4keygwLCB1dGlsc18xLmVzY2FwZUh0bWwpKHRhZyl9PC9zcGFuPmApLmpvaW4oJycpfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+JHtwb3N0Lmxpa2VzfTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJhY3Rpb24tYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4taWNvbiBidG4tZWRpdFwiIHRpdGxlPVwiRWRpdCBwb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWVkaXRcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1pY29uIGJ0bi1kZWxldGVcIiB0aXRsZT1cIkRlbGV0ZSBwb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRyYXNoXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgYDtcbiAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfSk7XG4gICAgKDAsIHBhZ2luYXRpb25fMS51cGRhdGVQYWdpbmF0aW9uU3RhdGUpKCk7XG59XG5mdW5jdGlvbiBoYW5kbGVUYWJsZUFjdGlvbnMoZXZlbnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGFjdGlvbkJ1dHRvbiA9IHRhcmdldC5jbG9zZXN0KCcuYnRuLWVkaXQsIC5idG4tZGVsZXRlJyk7XG4gICAgICAgIGlmICghYWN0aW9uQnV0dG9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93ID0gYWN0aW9uQnV0dG9uLmNsb3Nlc3QoJ3RyJyk7XG4gICAgICAgIGlmICghcm93KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSByb3cuZGF0YXNldC5wb3N0SWQ7XG4gICAgICAgIGlmICghcG9zdElkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoYWN0aW9uQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnYnRuLWRlbGV0ZScpKSB7XG4gICAgICAgICAgICB5aWVsZCBoYW5kbGVEZWxldGVQb3N0KE51bWJlcihwb3N0SWQpLCByb3cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbkJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2J0bi1lZGl0JykpIHtcbiAgICAgICAgICAgIHlpZWxkIGhhbmRsZUVkaXRQb3N0KE51bWJlcihwb3N0SWQpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlUG9zdChwb3N0SWQsIHJvdykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpcm1EZWxldGUgPSB5aWVsZCAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dDb25maXJtRGlhbG9nKSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHBvc3Q/Jyk7XG4gICAgICAgIGlmICghY29uZmlybURlbGV0ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB5aWVsZCAoMCwgYXBpXzEuZGVsZXRlQmxvZ1Bvc3QpKHBvc3RJZC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcm93LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzQ291bnQgPSBzdGF0ZV8xLnN0YXRlLnBvc3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLnBvc3RzID0gc3RhdGVfMS5zdGF0ZS5wb3N0cy5maWx0ZXIocG9zdCA9PiBOdW1iZXIocG9zdC5pZCkgIT09IHBvc3RJZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFBvc3RzIGZpbHRlcmVkOiBmcm9tICR7cHJldmlvdXNDb3VudH0gdG8gJHtzdGF0ZV8xLnN0YXRlLnBvc3RzLmxlbmd0aH1gKTtcbiAgICAgICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkoJ1Bvc3QgZGVsZXRlZCBzdWNjZXNzZnVsbHknLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICgwLCBwYWdpbmF0aW9uXzEudXBkYXRlUGFnaW5hdGlvblN0YXRlKSgpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gcmVuZGVyIHRoZSBwYWdlIGFnYWluIChlLmcuLCBpZiB3ZSBkZWxldGVkIHRoZSBsYXN0IGl0ZW0gb24gYSBwYWdlKVxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZV8xLnN0YXRlLnBvc3RzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICAoc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSA+IDEgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlIC0gMSkgKiBzdGF0ZV8xLnN0YXRlLnBvc3RzUGVyUGFnZSA+PSBzdGF0ZV8xLnN0YXRlLnBvc3RzLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSA9IE1hdGgubWF4KDEsIHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ3VycmVudFBhZ2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEZWxldGUgb3BlcmF0aW9uIHJldHVybmVkIGZhbHNlL3Vuc3VjY2Vzc2Z1bCcpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2VydmVyIHJldHVybmVkIHVuc3VjY2Vzc2Z1bCByZXNwb25zZSB3aGVuIGRlbGV0aW5nIHBvc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRlbGV0aW5nIHBvc3Q6JywgZXJyb3IpO1xuICAgICAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zaG93VG9hc3QpKGBGYWlsZWQgdG8gZGVsZXRlIHBvc3Q6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnVW5rbm93biBlcnJvcid9YCwgJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGhhbmRsZUVkaXRQb3N0KHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0geWllbGQgKDAsIGFwaV8xLmZldGNoUG9zdEJ5SWQpKHBvc3RJZCk7XG4gICAgICAgICAgICBpZiAocG9zdCkge1xuICAgICAgICAgICAgICAgICgwLCBtb2RhbEV2ZW50c18xLm9wZW5Qb3N0TW9kYWwpKHBvc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3N0IG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zaG93VG9hc3QpKCdGYWlsZWQgdG8gbG9hZCBwb3N0IGZvciBlZGl0aW5nJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHBvc3Q6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzaG93RW1wdHlTdGF0ZSgpIHtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdHMtdGFibGUtYm9keScpO1xuICAgIGlmICghdGFibGVCb2R5KVxuICAgICAgICByZXR1cm47XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IGBcbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJlbXB0eS1zdGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxwPk5vIGJsb2cgcG9zdHMgZm91bmQ8L3A+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgIGA7XG59XG5mdW5jdGlvbiBzaG93RXJyb3JTdGF0ZSgpIHtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdHMtdGFibGUtYm9keScpO1xuICAgIGlmICghdGFibGVCb2R5KVxuICAgICAgICByZXR1cm47XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IGBcbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJlcnJvci1zdGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxwPkZhaWxlZCB0byBsb2FkIGJsb2cgcG9zdHMuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuPC9wPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICBgO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN0YXRlID0gdm9pZCAwO1xuZXhwb3J0cy5zdGF0ZSA9IHtcbiAgICBjdXJyZW50UGFnZTogMSxcbiAgICBwb3N0c1BlclBhZ2U6IDEwLFxuICAgIHRvdGFsUGFnZXM6IDEsXG4gICAgcG9zdHM6IFtdLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIHNlYXJjaFRlcm06ICcnLFxuICAgIHNvcnRCeTogJ25ld2VzdCcsXG4gICAgaW5pdGlhbGl6ZWQ6IGZhbHNlXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQWRtaW4gRGFzaGJvYXJkIGVudHJ5IHBvaW50XG4gKi9cbmNvbnN0IGFkbWluQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2FkbWluQ29udHJvbGxlclwiKTsgLy8gSGFuZGxlcyBjb3JlIGFkbWluIGxvZ2ljXG5jb25zdCBkYXJrTW9kZV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvZGFya01vZGVcIik7IC8vIEhhbmRsZXMgZGFyayBtb2RlIFVJXG4vLyBDb25zaWRlciBpbXBvcnRpbmcgYSBkZWRpY2F0ZWQgbW9kYWwgaGFuZGxlciBpZiBsb2dpYyBiZWNvbWVzIGNvbXBsZXhcbi8vIGltcG9ydCB7IGluaXRpYWxpemVBZG1pbk1vZGFscyB9IGZyb20gJy4vYWRtaW5Nb2RhbHMnO1xuLyoqXG4gKiBJbml0aWFsaXplcyBhbGwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGFkbWluIGRhc2hib2FyZCBwYWdlLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplQWRtaW5QYWdlKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyAxLiBJbml0aWFsaXplIFVJIGVsZW1lbnRzIGxpa2UgZGFyayBtb2RlIGZpcnN0XG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5jaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSkoKTsgLy8gQ2hlY2sgc3lzdGVtIHByZWZlcmVuY2Ugb24gbG9hZFxuICAgICAgICAgICAgKDAsIGRhcmtNb2RlXzEuaW5pdGlhbGl6ZURhcmtNb2RlKSgpOyAvLyBTZXR1cCB0aGUgdG9nZ2xlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgIC8vIDIuIEluaXRpYWxpemUgY29yZSBhZG1pbiBkYXNoYm9hcmQgbG9naWMgKGUuZy4sIGZldGNoaW5nIGRhdGEsIHNldHRpbmcgdXAgdGFibGVzKVxuICAgICAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBzaG91bGQgaWRlYWxseSBjcmVhdGUvcmVuZGVyIHRoZSBuZWNlc3NhcnkgRE9NIGVsZW1lbnRzIGlmIHRoZXkgYXJlbid0IHN0YXRpYyBIVE1MXG4gICAgICAgICAgICB5aWVsZCAoMCwgYWRtaW5Db250cm9sbGVyXzEuaW5pdGlhbGl6ZUFkbWluRGFzaGJvYXJkKSgpO1xuICAgICAgICAgICAgLy8gMy4gSW5pdGlhbGl6ZSBpbnRlcmFjdGl2ZSBjb21wb25lbnRzIGxpa2UgbW9kYWxzIEFGVEVSIGNvcmUgY29udGVudCBpcyByZWFkeVxuICAgICAgICAgICAgaW5pdGlhbGl6ZU1vZGFsRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIC8vIEV4YW1wbGU6IElmIHlvdSBoYWQgbW9yZSBjb21wbGV4IG1vZGFsIGxvZ2ljOlxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZUFkbWluTW9kYWxzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbml0aWFsaXppbmcgYWRtaW4gZGFzaGJvYXJkOicsIGVycm9yKTtcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsbHkgZGlzcGxheSBhbiBlcnJvciBtZXNzYWdlIHRvIHRoZSBhZG1pbiB1c2VyXG4gICAgICAgICAgICBjb25zdCBlcnJvckRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tZXJyb3ItZGlzcGxheScpO1xuICAgICAgICAgICAgaWYgKGVycm9yRGlzcGxheSkge1xuICAgICAgICAgICAgICAgIGVycm9yRGlzcGxheS50ZXh0Q29udGVudCA9ICdGYWlsZWQgdG8gaW5pdGlhbGl6ZSBhZG1pbiBkYXNoYm9hcmQuIFBsZWFzZSBjaGVjayBjb25zb2xlIG9yIHRyeSBhZ2FpbiBsYXRlci4nO1xuICAgICAgICAgICAgICAgIGVycm9yRGlzcGxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgLy8gTWFrZSBpdCB2aXNpYmxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogU2V0cyB1cCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBwb3N0IGNyZWF0aW9uL2VkaXRpbmcgbW9kYWwuXG4gKiBBc3N1bWVzIG1vZGFsIGVsZW1lbnRzIGV4aXN0IGluIHRoZSBzdGF0aWMgSFRNTCBvciBhcmUgY3JlYXRlZCBieSBpbml0aWFsaXplQWRtaW5EYXNoYm9hcmQuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVNb2RhbEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGFkZFBvc3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXBvc3QtYnRuJyk7XG4gICAgY29uc3QgcG9zdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtbW9kYWwnKTtcbiAgICAvLyBVc2UgbW9yZSBzcGVjaWZpYyBzZWxlY3RvcnMgaWYgcG9zc2libGUsIGVzcGVjaWFsbHkgaWYgbXVsdGlwbGUgbW9kYWxzIGV4aXN0XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IHBvc3RNb2RhbCA9PT0gbnVsbCB8fCBwb3N0TW9kYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBvc3RNb2RhbC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtbW9kYWwnKTtcbiAgICBjb25zdCBjYW5jZWxQb3N0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbC1wb3N0LWJ0bicpOyAvLyBBc3N1bWluZyB0aGlzIGlzIGluc2lkZSB0aGUgbW9kYWxcbiAgICBpZiAoIXBvc3RNb2RhbCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1Bvc3QgbW9kYWwgZWxlbWVudCAoI3Bvc3QtbW9kYWwpIG5vdCBmb3VuZC4gQ2Fubm90IGluaXRpYWxpemUgbW9kYWwgZXZlbnRzLicpO1xuICAgICAgICByZXR1cm47IC8vIEV4aXQgaWYgdGhlIG1haW4gbW9kYWwgZWxlbWVudCBpcyBtaXNzaW5nXG4gICAgfVxuICAgIGlmIChhZGRQb3N0QnV0dG9uKSB7XG4gICAgICAgIGFkZFBvc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3N0TW9kYWwuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQWRkIHBvc3QgYnV0dG9uICgjYWRkLXBvc3QtYnRuKSBub3QgZm91bmQuJyk7XG4gICAgfVxuICAgIGlmIChjbG9zZU1vZGFsQnV0dG9uKSB7XG4gICAgICAgIGNsb3NlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3N0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ2xvc2UgbW9kYWwgYnV0dG9uICguY2xvc2UtbW9kYWwpIG5vdCBmb3VuZCB3aXRoaW4gI3Bvc3QtbW9kYWwuJyk7XG4gICAgfVxuICAgIGlmIChjYW5jZWxQb3N0QnV0dG9uKSB7XG4gICAgICAgIGNhbmNlbFBvc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBwb3N0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ2FuY2VsIHBvc3QgYnV0dG9uICgjY2FuY2VsLXBvc3QtYnRuKSBub3QgZm91bmQuJyk7XG4gICAgfVxuICAgIC8vIE9wdGlvbmFsOiBBZGQgbGlzdGVuZXIgdG8gY2xvc2UgbW9kYWwgaWYgY2xpY2tpbmcgb3V0c2lkZSBvZiBpdFxuICAgIHBvc3RNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY2xpY2sgdGFyZ2V0IGlzIHRoZSBtb2RhbCBiYWNrZHJvcCBpdHNlbGYsIG5vdCBpdHMgY29udGVudFxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwb3N0TW9kYWwpIHtcbiAgICAgICAgICAgIHBvc3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBPcHRpb25hbDogQWRkIGxpc3RlbmVyIHRvIGNsb3NlIG1vZGFsIHdpdGggdGhlIEVzY2FwZSBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnICYmIHBvc3RNb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICAgICAgcG9zdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gLS0tIE1haW4gRXhlY3V0aW9uIC0tLVxuLy8gV2FpdCBmb3IgdGhlIERPTSB0byBiZSBmdWxseSBsb2FkZWQgYmVmb3JlIGluaXRpYWxpemluZ1xuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0aWFsaXplQWRtaW5QYWdlKTtcbn1cbmVsc2Uge1xuICAgIC8vIERPTUNvbnRlbnRMb2FkZWQgaGFzIGFscmVhZHkgZmlyZWRcbiAgICBpbml0aWFsaXplQWRtaW5QYWdlKCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5saWtlUG9zdCA9IGxpa2VQb3N0O1xuZXhwb3J0cy51bmxpa2VQb3N0ID0gdW5saWtlUG9zdDtcbmV4cG9ydHMuZGVsZXRlQmxvZ1Bvc3QgPSBkZWxldGVCbG9nUG9zdDtcbmV4cG9ydHMuY3JlYXRlUG9zdCA9IGNyZWF0ZVBvc3Q7XG5leHBvcnRzLnVwZGF0ZVBvc3QgPSB1cGRhdGVQb3N0O1xuZXhwb3J0cy5hZGRUYWdUb1Bvc3QgPSBhZGRUYWdUb1Bvc3Q7XG5leHBvcnRzLmZldGNoQmxvZ1Bvc3RzID0gZmV0Y2hCbG9nUG9zdHM7XG5leHBvcnRzLmZldGNoUG9zdEJ5SWQgPSBmZXRjaFBvc3RCeUlkO1xuZXhwb3J0cy5mZXRjaENvbW1lbnRzQXBpID0gZmV0Y2hDb21tZW50c0FwaTtcbmV4cG9ydHMuc3VibWl0Q29tbWVudEFwaSA9IHN1Ym1pdENvbW1lbnRBcGk7XG4vLyBBUElfVVJMIGNvbnN0YW50IGlzIG5vdCBuZWVkZWQgd2hlbiBmZXRjaGluZyBzdGF0aWMgZmlsZSBkaXJlY3RseVxuLy8gY29uc3QgQVBJX1VSTCA9ICcvYXBpJzsgXG4vLyAtLS0gRnVuY3Rpb25zIHJlbHlpbmcgb24gYmFja2VuZCBBUEkgKFdpbGwgTk9UIHdvcmsgb24gR2l0SHViIFBhZ2VzKSAtLS1cbi8vIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIGZhaWwgc2lsZW50bHkgb3IgbG9nIGVycm9ycyBpbiB0aGUgY29uc29sZSBvbiB0aGUgc3RhdGljIHNpdGUuXG5mdW5jdGlvbiBsaWtlUG9zdChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYExpa2UgZnVuY3Rpb25hbGl0eSByZXF1aXJlcyBhIGJhY2tlbmQuIENhbm5vdCBMSUtFIHBvc3QgJHtpZH0gb24gc3RhdGljIHNpdGUuYCk7XG4gICAgICAgIC8vIFJldHVybiBudWxsIG9yIGEgZGVmYXVsdCBzdHJ1Y3R1cmUgaWYgeW91ciBjYWxsaW5nIGNvZGUgZXhwZWN0cyBpdFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVubGlrZVBvc3QoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBVbmxpa2UgZnVuY3Rpb25hbGl0eSByZXF1aXJlcyBhIGJhY2tlbmQuIENhbm5vdCBVTkxJS0UgcG9zdCAke2lkfSBvbiBzdGF0aWMgc2l0ZS5gKTtcbiAgICAgICAgLy8gUmV0dXJuIG51bGwgb3IgYSBkZWZhdWx0IHN0cnVjdHVyZVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZUJsb2dQb3N0KHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgZGVsZXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlUG9zdChwb3N0RGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgY3JlYXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB1cGRhdGVQb3N0KGlkLCBwb3N0RGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgdXBkYXRlIHBvc3Qgb24gc3RhdGljIHNpdGUuIEJhY2tlbmQgQVBJIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBhZGRUYWdUb1Bvc3QoaWQsIHRhZykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgYWRkIHRhZyBvbiBzdGF0aWMgc2l0ZS4gQmFja2VuZCBBUEkgcmVxdWlyZWQuXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbn1cbi8vIC0tLSBGdW5jdGlvbnMgbW9kaWZpZWQgZm9yIHN0YXRpYyBkYXRhIC0tLVxuLyoqXG4gKiBGZXRjaCBhbGwgYmxvZyBwb3N0cyBkaXJlY3RseSBmcm9tIHRoZSBzdGF0aWMgSlNPTiBmaWxlLlxuICovXG5mdW5jdGlvbiBmZXRjaEJsb2dQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBDb25zdHJ1Y3QgdGhlIHBhdGggcmVsYXRpdmUgdG8gdGhlIEhUTUwgZmlsZSBsb2FkaW5nIHRoZSBzY3JpcHQuXG4gICAgICAgIC8vIEFzc3VtZXMgcG9zdHMuanNvbiBpcyBjb3BpZWQgdG8gJ2RvY3MvZGF0YS9wb3N0cy5qc29uJyBieSB0aGUgd29ya2Zsb3cuXG4gICAgICAgIC8vIEFuZCBIVE1MIGZpbGVzIGFyZSBhdCB0aGUgcm9vdCBvZiAnZG9jcycuXG4gICAgICAgIGNvbnN0IGRhdGFVcmwgPSAnZGF0YS9wb3N0cy5qc29uJztcbiAgICAgICAgY29uc29sZS5sb2coYEZldGNoaW5nIHN0YXRpYyBkYXRhIGZyb206ICR7ZGF0YVVybH1gKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goZGF0YVVybCk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggJHtkYXRhVXJsfTogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAvLyBBc3N1bWluZyB0aGUgSlNPTiBzdHJ1Y3R1cmUgaXMgeyBwb3N0czogWy4uLl0gfSBcbiAgICAgICAgICAgIC8vIG9yIG1heWJlIGp1c3QgYW4gYXJyYXkgWy4uLl0gZGlyZWN0bHk/IEFkanVzdCBiYXNlZCBvbiB5b3VyIHBvc3RzLmpzb24gc3RydWN0dXJlLlxuICAgICAgICAgICAgLy8gSWYgcG9zdHMuanNvbiBpcyBqdXN0IGFuIGFycmF5OiByZXR1cm4gZGF0YSB8fCBbXTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLnBvc3RzIHx8IFtdOyAvLyBVc2UgdGhpcyBpZiBwb3N0cy5qc29uIGhhcyB7IFwicG9zdHNcIjogWy4uLl0gfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc3RhdGljIHBvc3RzLmpzb246JywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgb24gZXJyb3JcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBHZXQgYSBzaW5nbGUgcG9zdCBieSBJRCBieSBmaWx0ZXJpbmcgdGhlIHN0YXRpYyBKU09OIGRhdGEuXG4gKiBOb3RlOiBUaGlzIGxvYWRzIEFMTCBwb3N0cyBqdXN0IHRvIGZpbmQgb25lIC0gbGVzcyBlZmZpY2llbnQgdGhhbiBhbiBBUEkuXG4gKiBAcGFyYW0gaWQgLSBUaGUgcG9zdCBJRCAoc3RyaW5nIG9yIG51bWJlcilcbiAqL1xuZnVuY3Rpb24gZmV0Y2hQb3N0QnlJZChpZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBhbGxQb3N0cyA9IHlpZWxkIGZldGNoQmxvZ1Bvc3RzKCk7IC8vIEZldGNoIGFsbCBwb3N0cyBmcm9tIEpTT05cbiAgICAgICAgICAgIC8vIEVuc3VyZSBjb25zaXN0ZW50IElEIGNvbXBhcmlzb24gKGUuZy4sIGNvbXBhcmluZyBudW1iZXJzKVxuICAgICAgICAgICAgY29uc3QgcG9zdElkTnVtYmVyID0gdHlwZW9mIGlkID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KGlkLCAxMCkgOiBpZDtcbiAgICAgICAgICAgIGlmIChpc05hTihwb3N0SWROdW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgSW52YWxpZCBwb3N0IElEIHByb3ZpZGVkOiAke2lkfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcG9zdCA9IGFsbFBvc3RzLmZpbmQocCA9PiBOdW1iZXIocC5pZCkgPT09IHBvc3RJZE51bWJlcik7XG4gICAgICAgICAgICBpZiAoIXBvc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFBvc3Qgd2l0aCBJRCAke2lkfSBub3QgZm91bmQgaW4gc3RhdGljIGRhdGEuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgcG9zdCAke2lkfSBpbiBzdGF0aWMgZGF0YS5gKTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RhdGljIHBvc3QgJHtpZH06YCwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIC0tLSBDb21tZW50IEFQSSBQbGFjZWhvbGRlcnMgKE5lZWQgc2VwYXJhdGUgc2VydmljZSBvciBiYWNrZW5kKSAtLS1cbi8vIFRoZXNlIHdvdWxkIG5lZWQgdG8gYmUgaW1wbGVtZW50ZWQgdXNpbmcgYSB0aGlyZC1wYXJ0eSBzZXJ2aWNlIChsaWtlIERpc3F1cylcbi8vIG9yIGEgc2VydmVybGVzcyBiYWNrZW5kIGlmIHlvdSB3YW50IGNvbW1lbnRzIG9uIGEgc3RhdGljIHNpdGUuXG5mdW5jdGlvbiBmZXRjaENvbW1lbnRzQXBpKHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkNvbW1lbnRzIGNhbm5vdCBiZSBmZXRjaGVkIG9uIHN0YXRpYyBzaXRlIHdpdGhvdXQgZXh0ZXJuYWwgc2VydmljZS9iYWNrZW5kLlwiKTtcbiAgICAgICAgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXlcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdENvbW1lbnRBcGkocG9zdElkLCBuYW1lLCBjb21tZW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBzdWJtaXQgY29tbWVudCBvbiBzdGF0aWMgc2l0ZSB3aXRob3V0IGV4dGVybmFsIHNlcnZpY2UvYmFja2VuZC5cIik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbW1lbnQgc3VibWlzc2lvbiBub3QgYXZhaWxhYmxlLlwiKTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaG93VG9hc3QgPSBzaG93VG9hc3Q7XG5leHBvcnRzLnNob3dDb25maXJtRGlhbG9nID0gc2hvd0NvbmZpcm1EaWFsb2c7XG5mdW5jdGlvbiBzaG93VG9hc3QobWVzc2FnZSwgdHlwZSkge1xuICAgIGNvbnN0IHRvYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvYXN0LW5vdGlmaWNhdGlvbicpO1xuICAgIGNvbnN0IHRvYXN0TWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2FzdC1tZXNzYWdlJyk7XG4gICAgaWYgKCF0b2FzdCB8fCAhdG9hc3RNZXNzYWdlKVxuICAgICAgICByZXR1cm47XG4gICAgdG9hc3QuY2xhc3NOYW1lID0gYHRvYXN0ICR7dHlwZX1gO1xuICAgIHRvYXN0TWVzc2FnZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgdG9hc3Quc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRvYXN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSwgMzAwMCk7XG59XG4vLyBJbnNpZGUgbm90aWZpY2F0aW9ucy50c1xuZnVuY3Rpb24gc2hvd0NvbmZpcm1EaWFsb2cobWVzc2FnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBjb25maXJtRGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmZpcm0tZGlhbG9nJyk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gY29uZmlybURpYWxvZy5xdWVyeVNlbGVjdG9yKCdwJyk7XG4gICAgICAgIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZmlybS1kZWxldGUtYnRuJyk7XG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWwtZGVsZXRlLWJ0bicpO1xuICAgICAgICBpZiAoIWNvbmZpcm1EaWFsb2cgfHwgIW1lc3NhZ2VFbGVtZW50IHx8ICFjb25maXJtQnV0dG9uIHx8ICFjYW5jZWxCdXR0b24pIHtcbiAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICAgICAgY29uZmlybURpYWxvZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnLCAnb3BlbicpO1xuICAgICAgICBjb25zdCBoYW5kbGVDb25maXJtID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uZmlybURpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnLCAnb3BlbicpO1xuICAgICAgICAgICAgY2xlYW51cExpc3RlbmVycygpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaGFuZGxlQ2FuY2VsID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uZmlybURpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnLCAnb3BlbicpO1xuICAgICAgICAgICAgY2xlYW51cExpc3RlbmVycygpO1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNsZWFudXBMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25maXJtQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ29uZmlybSk7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDYW5jZWwpO1xuICAgICAgICB9O1xuICAgICAgICBjb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ29uZmlybSk7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNhbmNlbCk7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZXNjYXBlSHRtbCA9IGVzY2FwZUh0bWw7XG5leHBvcnRzLmRlYm91bmNlID0gZGVib3VuY2U7XG5mdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZSkge1xuICAgIHJldHVybiB1bnNhZmVcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcbn1cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcbiAgICBsZXQgdGltZW91dDtcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBmdW5jKC4uLmFyZ3MpLCB3YWl0KTtcbiAgICB9O1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhbGlkYXRlUG9zdERhdGEgPSB2YWxpZGF0ZVBvc3REYXRhO1xuY29uc3Qgbm90aWZpY2F0aW9uc18xID0gcmVxdWlyZShcIi4vbm90aWZpY2F0aW9uc1wiKTtcbmZ1bmN0aW9uIHZhbGlkYXRlUG9zdERhdGEoZGF0YSkge1xuICAgIGlmICghZGF0YS50aXRsZSB8fCBkYXRhLnRpdGxlLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zaG93VG9hc3QpKCdUaXRsZSBtdXN0IGJlIGF0IGxlYXN0IDMgY2hhcmFjdGVycyBsb25nJywgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFkYXRhLmNvbnRlbnQgfHwgZGF0YS5jb250ZW50Lmxlbmd0aCA8IDEwKSB7XG4gICAgICAgICgwLCBub3RpZmljYXRpb25zXzEuc2hvd1RvYXN0KSgnQ29udGVudCBtdXN0IGJlIGF0IGxlYXN0IDEwIGNoYXJhY3RlcnMgbG9uZycsICdlcnJvcicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghZGF0YS5hdXRob3IpIHtcbiAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zaG93VG9hc3QpKCdBdXRob3IgbmFtZSBpcyByZXF1aXJlZCcsICdlcnJvcicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2VudHJpZXMvYWRtaW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=