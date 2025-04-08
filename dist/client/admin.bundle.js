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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7OztBQzlDYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1Qiw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QjtBQUN4Qix3QkFBd0IsbUJBQU8sQ0FBQyxxREFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbXBvbmVudHMvZGFya01vZGUudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9hZG1pbkNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9jb250cm9sbGVycy9ldmVudExpc3RlbmVycy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL2Zvcm1IYW5kbGVycy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL21vZGFsRXZlbnRzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29udHJvbGxlcnMvcGFnaW5hdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL2NvbnRyb2xsZXJzL3Bvc3RNYW5hZ2VyLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvY29udHJvbGxlcnMvc3RhdGUudHMiLCJ3ZWJwYWNrOi8vZHVvbGluZ28tc3R5bGUtYmxvZy8uL3NyYy9lbnRyaWVzL2FkbWluLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvc2VydmljZXMvYXBpLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvdXRpbHMvbm90aWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nLy4vc3JjL3V0aWxzL3V0aWxzLnRzIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvLi9zcmMvdXRpbHMvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1b2xpbmdvLXN0eWxlLWJsb2cvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kdW9saW5nby1zdHlsZS1ibG9nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIERhcmsgbW9kZSBmdW5jdGlvbmFsaXR5XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemVEYXJrTW9kZSA9IGluaXRpYWxpemVEYXJrTW9kZTtcbmV4cG9ydHMuY2hlY2tTeXN0ZW1EYXJrTW9kZVByZWZlcmVuY2UgPSBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZTtcbi8qKlxuICogSW5pdGlhbGl6ZSBkYXJrIG1vZGUgdG9nZ2xlXG4gKiBUaGlzIGNyZWF0ZXMgYSBmbG9hdGluZyBkYXJrIG1vZGUgdG9nZ2xlIGJ1dHRvbiBhbmQgYWRkcyBpdCB0byB0aGUgRE9NXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVEYXJrTW9kZSgpIHtcbiAgICAvLyBDcmVhdGUgZGFyayBtb2RlIHRvZ2dsZSBidXR0b25cbiAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRhcmtNb2RlVG9nZ2xlLmNsYXNzTmFtZSA9ICdkYXJrLW1vZGUtdG9nZ2xlJztcbiAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT4nOyAvLyBNb29uIGljb25cbiAgICBkYXJrTW9kZVRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVG9nZ2xlIERhcmsgTW9kZScpO1xuICAgIC8vIENoZWNrIGlmIGRhcmsgbW9kZSBwcmVmZXJlbmNlIGlzIGFscmVhZHkgc2V0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09ICd0cnVlJztcbiAgICBpZiAoaXNEYXJrTW9kZSkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xuICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uIGZvciBsaWdodCBtb2RlXG4gICAgfVxuICAgIC8vIEFkZCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgIGRhcmtNb2RlVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRGFya01vZGUpO1xuICAgIC8vIEFkZCBidXR0b24gdG8gdGhlIERPTVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGFya01vZGVUb2dnbGUpO1xufVxuLyoqXG4gKiBUb2dnbGUgZGFyayBtb2RlIG9uIGFuZCBvZmZcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlRGFya01vZGUoKSB7XG4gICAgY29uc3QgaXNEYXJrTW9kZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyay1tb2RlJyk7XG4gICAgY29uc3QgZGFya01vZGVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1tb2RlLXRvZ2dsZScpO1xuICAgIC8vIFVwZGF0ZSBpY29uIGJhc2VkIG9uIG1vZGVcbiAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgaWYgKGlzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JzsgLy8gU3VuIGljb24gZm9yIGxpZ2h0IG1vZGVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhcmtNb2RlVG9nZ2xlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tb29uXCI+PC9pPic7IC8vIE1vb24gaWNvbiBmb3IgZGFyayBtb2RlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU2F2ZSBwcmVmZXJlbmNlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCBpc0RhcmtNb2RlLnRvU3RyaW5nKCkpO1xufVxuLyoqXG4gKiBDaGVjayBpZiB1c2VyIGhhcyBzeXN0ZW0gZGFyayBtb2RlIHByZWZlcmVuY2VcbiAqIElmIHRoZXkgZG8gYW5kIHdlIGhhdmVuJ3Qgc2V0IGEgcHJlZmVyZW5jZSB5ZXQsIGFwcGx5IGRhcmsgbW9kZVxuICovXG5mdW5jdGlvbiBjaGVja1N5c3RlbURhcmtNb2RlUHJlZmVyZW5jZSgpIHtcbiAgICAvLyBPbmx5IGNoZWNrIGlmIHVzZXIgaGFzbid0IGV4cGxpY2l0bHkgc2V0IGEgcHJlZmVyZW5jZVxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwcmVmZXJzRGFya01vZGUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgICAgIGlmIChwcmVmZXJzRGFya01vZGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XG4gICAgICAgICAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW1vZGUtdG9nZ2xlJyk7XG4gICAgICAgICAgICBpZiAoZGFya01vZGVUb2dnbGUpIHtcbiAgICAgICAgICAgICAgICBkYXJrTW9kZVRvZ2dsZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtc3VuXCI+PC9pPic7IC8vIFN1biBpY29uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya01vZGUnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZUFkbWluRGFzaGJvYXJkID0gaW5pdGlhbGl6ZUFkbWluRGFzaGJvYXJkO1xuLyoqXG4gKiBBZG1pbiBDb250cm9sbGVyIGZvciBtYW5hZ2luZyBibG9nIHBvc3RzIGFuZCBkYXNoYm9hcmQgZnVuY3Rpb25hbGl0eVxuICovXG5jb25zdCBzdGF0ZV8xID0gcmVxdWlyZShcIi4vc3RhdGVcIik7XG5jb25zdCBldmVudExpc3RlbmVyc18xID0gcmVxdWlyZShcIi4vZXZlbnRMaXN0ZW5lcnNcIik7XG5jb25zdCBwb3N0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4vcG9zdE1hbmFnZXJcIik7XG5jb25zdCBub3RpZmljYXRpb25zXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvbm90aWZpY2F0aW9uc1wiKTtcbmZ1bmN0aW9uIGluaXRpYWxpemVBZG1pbkRhc2hib2FyZCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHN0YXRlXzEuc3RhdGUuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgKDAsIGV2ZW50TGlzdGVuZXJzXzEuc2V0dXBFdmVudExpc3RlbmVycykoKTtcbiAgICAgICAgICAgIHlpZWxkICgwLCBwb3N0TWFuYWdlcl8xLmxvYWRQb3N0cykoKTtcbiAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgKDAsIG5vdGlmaWNhdGlvbnNfMS5zaG93VG9hc3QpKCdGYWlsZWQgdG8gaW5pdGlhbGl6ZSBkYXNoYm9hcmQnLCAnZXJyb3InKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Rhc2hib2FyZCBpbml0aWFsaXphdGlvbiBlcnJvcjonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNldHVwRXZlbnRMaXN0ZW5lcnMgPSBzZXR1cEV2ZW50TGlzdGVuZXJzO1xuY29uc3QgbW9kYWxFdmVudHNfMSA9IHJlcXVpcmUoXCIuL21vZGFsRXZlbnRzXCIpO1xuY29uc3QgcG9zdE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL3Bvc3RNYW5hZ2VyXCIpO1xuY29uc3Qgc3RhdGVfMSA9IHJlcXVpcmUoXCIuL3N0YXRlXCIpO1xuY29uc3QgZm9ybUhhbmRsZXJzXzEgPSByZXF1aXJlKFwiLi9mb3JtSGFuZGxlcnNcIik7XG5mdW5jdGlvbiBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIFRhYmxlIGFjdGlvbnNcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdHMtdGFibGUtYm9keScpO1xuICAgIGlmICh0YWJsZUJvZHkpIHtcbiAgICAgICAgdGFibGVCb2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcG9zdE1hbmFnZXJfMS5oYW5kbGVUYWJsZUFjdGlvbnMpO1xuICAgIH1cbiAgICAvLyBBZGQgbmV3IHBvc3QgYnV0dG9uXG4gICAgY29uc3QgYWRkUG9zdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcG9zdC1idG4nKTtcbiAgICBpZiAoYWRkUG9zdEJ0bikge1xuICAgICAgICBhZGRQb3N0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gKDAsIG1vZGFsRXZlbnRzXzEub3BlblBvc3RNb2RhbCkoKSk7XG4gICAgfVxuICAgIC8vIFBhZ2luYXRpb24gY29udHJvbHNcbiAgICBjb25zdCBwcmV2QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXYtcGFnZScpO1xuICAgIGNvbnN0IG5leHRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dC1wYWdlJyk7XG4gICAgaWYgKHByZXZCdG4pIHtcbiAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlID4gMSkge1xuICAgICAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UtLTtcbiAgICAgICAgICAgICAgICAoMCwgcG9zdE1hbmFnZXJfMS5yZW5kZXJDdXJyZW50UGFnZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChuZXh0QnRuKSB7XG4gICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSA8IHN0YXRlXzEuc3RhdGUudG90YWxQYWdlcykge1xuICAgICAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UrKztcbiAgICAgICAgICAgICAgICAoMCwgcG9zdE1hbmFnZXJfMS5yZW5kZXJDdXJyZW50UGFnZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgICgwLCBtb2RhbEV2ZW50c18xLnNldHVwTW9kYWxFdmVudHMpKCk7XG4gICAgKDAsIGZvcm1IYW5kbGVyc18xLnNldHVwU2VhcmNoQW5kRmlsdGVycykoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmhhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuZXhwb3J0cy5zZXR1cFNlYXJjaEFuZEZpbHRlcnMgPSBzZXR1cFNlYXJjaEFuZEZpbHRlcnM7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCB2YWxpZGF0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdmFsaWRhdGlvblwiKTtcbmNvbnN0IG5vdGlmaWNhdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9ub3RpZmljYXRpb25zXCIpO1xuY29uc3QgbW9kYWxFdmVudHNfMSA9IHJlcXVpcmUoXCIuL21vZGFsRXZlbnRzXCIpO1xuY29uc3QgcG9zdE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL3Bvc3RNYW5hZ2VyXCIpO1xuY29uc3Qgc3RhdGVfMSA9IHJlcXVpcmUoXCIuL3N0YXRlXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy91dGlsc1wiKTtcbmZ1bmN0aW9uIGhhbmRsZUZvcm1TdWJtaXQoZXZlbnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSBmb3JtLmRhdGFzZXQucG9zdElkO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICgoX2EgPSBmb3JtRGF0YS5nZXQoJ3Bvc3QtdGl0bGUnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRyaW0oKSkgfHwgJycsXG4gICAgICAgICAgICAgICAgY29udGVudDogKChfYiA9IGZvcm1EYXRhLmdldCgncG9zdC1jb250ZW50JykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50cmltKCkpIHx8ICcnLFxuICAgICAgICAgICAgICAgIGF1dGhvcjogKChfYyA9IGZvcm1EYXRhLmdldCgncG9zdC1hdXRob3InKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnRyaW0oKSkgfHwgJycsXG4gICAgICAgICAgICAgICAgdGFnczogKChfZCA9IGZvcm1EYXRhLmdldCgncG9zdC10YWdzJykpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5zcGxpdCgnLCcpLm1hcCh0YWcgPT4gdGFnLnRyaW0oKSkuZmlsdGVyKHRhZyA9PiB0YWcubGVuZ3RoID4gMCkpIHx8IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCEoMCwgdmFsaWRhdGlvbl8xLnZhbGlkYXRlUG9zdERhdGEpKHBvc3REYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBpZiAocG9zdElkKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIGV4aXN0aW5nIHBvc3RcbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogcG9zdERhdGEudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvc3REYXRhLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IHBvc3REYXRhLnRhZ3NcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkICgwLCBhcGlfMS51cGRhdGVQb3N0KShwYXJzZUludChwb3N0SWQpLCB1cGRhdGVEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgcG9zdFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkICgwLCBhcGlfMS5jcmVhdGVQb3N0KShwb3N0RGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgKDAsIG1vZGFsRXZlbnRzXzEuY2xvc2VQb3N0TW9kYWwpKCk7XG4gICAgICAgICAgICAgICAgeWllbGQgKDAsIHBvc3RNYW5hZ2VyXzEubG9hZFBvc3RzKSgpO1xuICAgICAgICAgICAgICAgICgwLCBub3RpZmljYXRpb25zXzEuc2hvd1RvYXN0KShwb3N0SWQgPyAnUG9zdCB1cGRhdGVkIHN1Y2Nlc3NmdWxseScgOiAnUG9zdCBjcmVhdGVkIHN1Y2Nlc3NmdWxseScsICdzdWNjZXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocG9zdElkID8gJ0ZhaWxlZCB0byB1cGRhdGUgcG9zdCcgOiAnRmFpbGVkIHRvIGNyZWF0ZSBwb3N0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkocG9zdElkID8gJ0ZhaWxlZCB0byB1cGRhdGUgcG9zdCcgOiAnRmFpbGVkIHRvIGNyZWF0ZSBwb3N0JywgJ2Vycm9yJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgcG9zdDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHNldHVwU2VhcmNoQW5kRmlsdGVycygpIHtcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtcG9zdHMnKTtcbiAgICBjb25zdCBzb3J0U2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvcnQtYnknKTtcbiAgICBjb25zdCBmaWx0ZXJUYWdTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLXRhZycpO1xuICAgIGlmIChzZWFyY2hJbnB1dCkge1xuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgwLCB1dGlsc18xLmRlYm91bmNlKSgoZSkgPT4ge1xuICAgICAgICAgICAgc3RhdGVfMS5zdGF0ZS5zZWFyY2hUZXJtID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAoMCwgcG9zdE1hbmFnZXJfMS5sb2FkUG9zdHMpKCk7XG4gICAgICAgIH0sIDMwMCkpO1xuICAgIH1cbiAgICBpZiAoc29ydFNlbGVjdCkge1xuICAgICAgICBzb3J0U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLnNvcnRCeSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgKDAsIHBvc3RNYW5hZ2VyXzEubG9hZFBvc3RzKSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGZpbHRlclRhZ1NlbGVjdCkge1xuICAgICAgICB1cGRhdGVUYWdGaWx0ZXJPcHRpb25zKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlVGFnRmlsdGVyT3B0aW9ucygpIHtcbiAgICBjb25zdCBmaWx0ZXJUYWdTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLXRhZycpO1xuICAgIGlmICghZmlsdGVyVGFnU2VsZWN0KVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgdW5pcXVlVGFncyA9IG5ldyBTZXQoKTtcbiAgICBzdGF0ZV8xLnN0YXRlLnBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgIHBvc3QudGFncy5mb3JFYWNoKHRhZyA9PiB1bmlxdWVUYWdzLmFkZCh0YWcpKTtcbiAgICB9KTtcbiAgICBmaWx0ZXJUYWdTZWxlY3QuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCJcIj5BbGwgVGFnczwvb3B0aW9uPic7XG4gICAgQXJyYXkuZnJvbSh1bmlxdWVUYWdzKVxuICAgICAgICAuc29ydCgpXG4gICAgICAgIC5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBvcHRpb24udmFsdWUgPSB0YWc7XG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHRhZztcbiAgICAgICAgZmlsdGVyVGFnU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5oYW5kbGVNb2RhbEZvcm1TdWJtaXQgPSBoYW5kbGVNb2RhbEZvcm1TdWJtaXQ7XG5leHBvcnRzLnNldHVwTW9kYWxFdmVudHMgPSBzZXR1cE1vZGFsRXZlbnRzO1xuZXhwb3J0cy5vcGVuUG9zdE1vZGFsID0gb3BlblBvc3RNb2RhbDtcbmV4cG9ydHMuY2xvc2VQb3N0TW9kYWwgPSBjbG9zZVBvc3RNb2RhbDtcbmNvbnN0IHBvc3RNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9wb3N0TWFuYWdlclwiKTtcbmNvbnN0IHZhbGlkYXRpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlscy92YWxpZGF0aW9uXCIpO1xuY29uc3Qgbm90aWZpY2F0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL25vdGlmaWNhdGlvbnNcIik7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5mdW5jdGlvbiBoYW5kbGVNb2RhbEZvcm1TdWJtaXQoZXZlbnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgICAgICBjb25zdCBwb3N0SWQgPSBmb3JtLmRhdGFzZXQucG9zdElkO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICgoX2EgPSBmb3JtRGF0YS5nZXQoJ3Bvc3QtdGl0bGUnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRyaW0oKSkgfHwgJycsXG4gICAgICAgICAgICAgICAgY29udGVudDogKChfYiA9IGZvcm1EYXRhLmdldCgncG9zdC1jb250ZW50JykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50cmltKCkpIHx8ICcnLFxuICAgICAgICAgICAgICAgIGF1dGhvcjogKChfYyA9IGZvcm1EYXRhLmdldCgncG9zdC1hdXRob3InKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnRyaW0oKSkgfHwgJycsXG4gICAgICAgICAgICAgICAgdGFnczogKChfZCA9IGZvcm1EYXRhLmdldCgncG9zdC10YWdzJykpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5zcGxpdCgnLCcpLm1hcCh0YWcgPT4gdGFnLnRyaW0oKSkuZmlsdGVyKHRhZyA9PiB0YWcubGVuZ3RoID4gMCkpIHx8IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCEoMCwgdmFsaWRhdGlvbl8xLnZhbGlkYXRlUG9zdERhdGEpKHBvc3REYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBpZiAocG9zdElkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHBvc3REYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBwb3N0RGF0YS5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICB0YWdzOiBwb3N0RGF0YS50YWdzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCAoMCwgYXBpXzEudXBkYXRlUG9zdCkocGFyc2VJbnQocG9zdElkKSwgdXBkYXRlRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCAoMCwgYXBpXzEuY3JlYXRlUG9zdCkocG9zdERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNsb3NlUG9zdE1vZGFsKCk7XG4gICAgICAgICAgICAgICAgeWllbGQgKDAsIHBvc3RNYW5hZ2VyXzEubG9hZFBvc3RzKSgpO1xuICAgICAgICAgICAgICAgICgwLCBub3RpZmljYXRpb25zXzEuc2hvd1RvYXN0KShwb3N0SWQgPyAnUG9zdCB1cGRhdGVkIHN1Y2Nlc3NmdWxseScgOiAnUG9zdCBjcmVhdGVkIHN1Y2Nlc3NmdWxseScsICdzdWNjZXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocG9zdElkID8gJ0ZhaWxlZCB0byB1cGRhdGUgcG9zdCcgOiAnRmFpbGVkIHRvIGNyZWF0ZSBwb3N0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkocG9zdElkID8gJ0ZhaWxlZCB0byB1cGRhdGUgcG9zdCcgOiAnRmFpbGVkIHRvIGNyZWF0ZSBwb3N0JywgJ2Vycm9yJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgcG9zdDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHNldHVwTW9kYWxFdmVudHMoKSB7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1tb2RhbCcpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1mb3JtJyk7XG4gICAgY29uc3QgY2xvc2VCdG4gPSBtb2RhbCA9PT0gbnVsbCB8fCBtb2RhbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kYWwucXVlcnlTZWxlY3RvcignLmNsb3NlLW1vZGFsJyk7XG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbC1wb3N0LWJ0bicpO1xuICAgIGlmIChmb3JtKSB7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlTW9kYWxGb3JtU3VibWl0KTtcbiAgICB9XG4gICAgaWYgKGNsb3NlQnRuKSB7XG4gICAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3N0TW9kYWwpO1xuICAgIH1cbiAgICBpZiAoY2FuY2VsQnRuKSB7XG4gICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9zdE1vZGFsKTtcbiAgICB9XG4gICAgLy8gQ2xvc2UgbW9kYWwgb24gb3V0c2lkZSBjbGlja1xuICAgIGlmIChtb2RhbCkge1xuICAgICAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VQb3N0TW9kYWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gb3BlblBvc3RNb2RhbChwb3N0KSB7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1tb2RhbCcpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1mb3JtJyk7XG4gICAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LXRpdGxlJyk7XG4gICAgY29uc3QgYXV0aG9ySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1hdXRob3InKTtcbiAgICBjb25zdCBjb250ZW50SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50Jyk7XG4gICAgY29uc3QgdGFnc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtdGFncycpO1xuICAgIGNvbnN0IG1vZGFsVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtdGl0bGUnKTtcbiAgICBpZiAobW9kYWxUaXRsZSkge1xuICAgICAgICBtb2RhbFRpdGxlLnRleHRDb250ZW50ID0gcG9zdCA/ICdFZGl0IFBvc3QnIDogJ0FkZCBOZXcgUG9zdCc7XG4gICAgfVxuICAgIGlmIChwb3N0KSB7XG4gICAgICAgIHRpdGxlSW5wdXQudmFsdWUgPSBwb3N0LnRpdGxlO1xuICAgICAgICBhdXRob3JJbnB1dC52YWx1ZSA9IHBvc3QuYXV0aG9yO1xuICAgICAgICBjb250ZW50SW5wdXQudmFsdWUgPSBwb3N0LmNvbnRlbnQ7XG4gICAgICAgIHRhZ3NJbnB1dC52YWx1ZSA9IHBvc3QudGFncy5qb2luKCcsICcpO1xuICAgICAgICBmb3JtLmRhdGFzZXQucG9zdElkID0gcG9zdC5pZC50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9ybS5yZXNldCgpO1xuICAgICAgICBkZWxldGUgZm9ybS5kYXRhc2V0LnBvc3RJZDtcbiAgICB9XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xufVxuZnVuY3Rpb24gY2xvc2VQb3N0TW9kYWwoKSB7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1tb2RhbCcpO1xuICAgIGlmIChtb2RhbCkge1xuICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVwZGF0ZVBhZ2luYXRpb25TdGF0ZSA9IHVwZGF0ZVBhZ2luYXRpb25TdGF0ZTtcbmV4cG9ydHMudXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzID0gdXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzO1xuY29uc3Qgc3RhdGVfMSA9IHJlcXVpcmUoXCIuL3N0YXRlXCIpO1xuY29uc3QgcG9zdE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL3Bvc3RNYW5hZ2VyXCIpO1xuZnVuY3Rpb24gdXBkYXRlUGFnaW5hdGlvblN0YXRlKCkge1xuICAgIHN0YXRlXzEuc3RhdGUudG90YWxQYWdlcyA9IE1hdGguY2VpbCgoMCwgcG9zdE1hbmFnZXJfMS5maWx0ZXJBbmRTb3J0UG9zdHMpKCkubGVuZ3RoIC8gc3RhdGVfMS5zdGF0ZS5wb3N0c1BlclBhZ2UpO1xuICAgIHVwZGF0ZVBhZ2luYXRpb25Db250cm9scygpO1xufVxuZnVuY3Rpb24gdXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzKCkge1xuICAgIGNvbnN0IHByZXZCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldi1wYWdlJyk7XG4gICAgY29uc3QgbmV4dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXh0LXBhZ2UnKTtcbiAgICBjb25zdCBwYWdlSW5kaWNhdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2UtaW5kaWNhdG9yJyk7XG4gICAgaWYgKHByZXZCdG4gJiYgbmV4dEJ0biAmJiBwYWdlSW5kaWNhdG9yKSB7XG4gICAgICAgIHByZXZCdG4uZGlzYWJsZWQgPSBzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlID09PSAxO1xuICAgICAgICBuZXh0QnRuLmRpc2FibGVkID0gc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSA9PT0gc3RhdGVfMS5zdGF0ZS50b3RhbFBhZ2VzO1xuICAgICAgICBwYWdlSW5kaWNhdG9yLnRleHRDb250ZW50ID0gYFBhZ2UgJHtzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlfSBvZiAke3N0YXRlXzEuc3RhdGUudG90YWxQYWdlc31gO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZpbHRlckFuZFNvcnRQb3N0cyA9IGZpbHRlckFuZFNvcnRQb3N0cztcbmV4cG9ydHMubG9hZFBvc3RzID0gbG9hZFBvc3RzO1xuZXhwb3J0cy5yZW5kZXJDdXJyZW50UGFnZSA9IHJlbmRlckN1cnJlbnRQYWdlO1xuZXhwb3J0cy5oYW5kbGVUYWJsZUFjdGlvbnMgPSBoYW5kbGVUYWJsZUFjdGlvbnM7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlcy9hcGlcIik7XG5jb25zdCBzdGF0ZV8xID0gcmVxdWlyZShcIi4vc3RhdGVcIik7XG5jb25zdCBub3RpZmljYXRpb25zXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvbm90aWZpY2F0aW9uc1wiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvdXRpbHNcIik7XG5jb25zdCBwYWdpbmF0aW9uXzEgPSByZXF1aXJlKFwiLi9wYWdpbmF0aW9uXCIpO1xuY29uc3QgbW9kYWxFdmVudHNfMSA9IHJlcXVpcmUoXCIuL21vZGFsRXZlbnRzXCIpO1xuZnVuY3Rpb24gZmlsdGVyQW5kU29ydFBvc3RzKCkge1xuICAgIGxldCBmaWx0ZXJlZCA9IFsuLi5zdGF0ZV8xLnN0YXRlLnBvc3RzXTtcbiAgICAvLyBBcHBseSBzZWFyY2ggZmlsdGVyXG4gICAgaWYgKHN0YXRlXzEuc3RhdGUuc2VhcmNoVGVybSkge1xuICAgICAgICBjb25zdCBzZWFyY2hMb3dlciA9IHN0YXRlXzEuc3RhdGUuc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBmaWx0ZXJlZCA9IGZpbHRlcmVkLmZpbHRlcihwb3N0ID0+IHBvc3QudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgIHBvc3QuY29udGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKSB8fFxuICAgICAgICAgICAgcG9zdC5hdXRob3IudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgIHBvc3QudGFncy5zb21lKHRhZyA9PiB0YWcudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcikpKTtcbiAgICB9XG4gICAgLy8gQXBwbHkgc29ydGluZ1xuICAgIGZpbHRlcmVkLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgc3dpdGNoIChzdGF0ZV8xLnN0YXRlLnNvcnRCeSkge1xuICAgICAgICAgICAgY2FzZSAnbmV3ZXN0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoYi5jcmVhdGVkQXQpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGEuY3JlYXRlZEF0KS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBjYXNlICdvbGRlc3QnOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShhLmNyZWF0ZWRBdCkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYi5jcmVhdGVkQXQpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGNhc2UgJ3RpdGxlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gYS50aXRsZS5sb2NhbGVDb21wYXJlKGIudGl0bGUpO1xuICAgICAgICAgICAgY2FzZSAnbGlrZXMnOlxuICAgICAgICAgICAgICAgIHJldHVybiBiLmxpa2VzIC0gYS5saWtlcztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyZWQ7XG59XG5mdW5jdGlvbiBsb2FkUG9zdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RzLXRhYmxlLWJvZHknKTtcbiAgICAgICAgaWYgKCF0YWJsZUJvZHkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Bvc3RzIHRhYmxlIGJvZHkgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUucG9zdHMgPSB5aWVsZCAoMCwgYXBpXzEuZmV0Y2hCbG9nUG9zdHMpKCk7XG4gICAgICAgICAgICAoMCwgcGFnaW5hdGlvbl8xLnVwZGF0ZVBhZ2luYXRpb25TdGF0ZSkoKTtcbiAgICAgICAgICAgIHJlbmRlckN1cnJlbnRQYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkoJ0ZhaWxlZCB0byBsb2FkIHBvc3RzJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHBvc3RzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dFcnJvclN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlbmRlckN1cnJlbnRQYWdlKCkge1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0cy10YWJsZS1ib2R5Jyk7XG4gICAgaWYgKCF0YWJsZUJvZHkpXG4gICAgICAgIHJldHVybjtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gJyc7XG4gICAgY29uc3QgZmlsdGVyZWRQb3N0cyA9IGZpbHRlckFuZFNvcnRQb3N0cygpO1xuICAgIGlmIChmaWx0ZXJlZFBvc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzaG93RW1wdHlTdGF0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSAoc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSAtIDEpICogc3RhdGVfMS5zdGF0ZS5wb3N0c1BlclBhZ2U7XG4gICAgY29uc3QgZW5kSW5kZXggPSBzdGFydEluZGV4ICsgc3RhdGVfMS5zdGF0ZS5wb3N0c1BlclBhZ2U7XG4gICAgY29uc3QgY3VycmVudFBhZ2VQb3N0cyA9IGZpbHRlcmVkUG9zdHMuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgIGN1cnJlbnRQYWdlUG9zdHMuZm9yRWFjaCgocG9zdCkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICByb3cuZGF0YXNldC5wb3N0SWQgPSBwb3N0LmlkLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICAgIHJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8dGQ+JHtwb3N0LmlkfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+JHsoMCwgdXRpbHNfMS5lc2NhcGVIdG1sKShwb3N0LnRpdGxlKX08L3RkPlxuICAgICAgICAgICAgPHRkPiR7KDAsIHV0aWxzXzEuZXNjYXBlSHRtbCkocG9zdC5hdXRob3IpfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+JHtmb3JtYXR0ZWREYXRlfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+JHtwb3N0LnRhZ3MubWFwKCh0YWcpID0+IGA8c3BhbiBjbGFzcz1cInRhZy1iYWRnZVwiPiR7KDAsIHV0aWxzXzEuZXNjYXBlSHRtbCkodGFnKX08L3NwYW4+YCkuam9pbignJyl9PC90ZD5cbiAgICAgICAgICAgIDx0ZD4ke3Bvc3QubGlrZXN9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFjdGlvbi1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1pY29uIGJ0bi1lZGl0XCIgdGl0bGU9XCJFZGl0IHBvc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZWRpdFwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWljb24gYnRuLWRlbGV0ZVwiIHRpdGxlPVwiRGVsZXRlIHBvc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdHJhc2hcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICBgO1xuICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICB9KTtcbiAgICAoMCwgcGFnaW5hdGlvbl8xLnVwZGF0ZVBhZ2luYXRpb25TdGF0ZSkoKTtcbn1cbmZ1bmN0aW9uIGhhbmRsZVRhYmxlQWN0aW9ucyhldmVudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgYWN0aW9uQnV0dG9uID0gdGFyZ2V0LmNsb3Nlc3QoJy5idG4tZWRpdCwgLmJ0bi1kZWxldGUnKTtcbiAgICAgICAgaWYgKCFhY3Rpb25CdXR0b24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3cgPSBhY3Rpb25CdXR0b24uY2xvc2VzdCgndHInKTtcbiAgICAgICAgaWYgKCFyb3cpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IHJvdy5kYXRhc2V0LnBvc3RJZDtcbiAgICAgICAgaWYgKCFwb3N0SWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChhY3Rpb25CdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4tZGVsZXRlJykpIHtcbiAgICAgICAgICAgIHlpZWxkIGhhbmRsZURlbGV0ZVBvc3QoTnVtYmVyKHBvc3RJZCksIHJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnYnRuLWVkaXQnKSkge1xuICAgICAgICAgICAgeWllbGQgaGFuZGxlRWRpdFBvc3QoTnVtYmVyKHBvc3RJZCkpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBoYW5kbGVEZWxldGVQb3N0KHBvc3RJZCwgcm93KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgY29uZmlybURlbGV0ZSA9IHlpZWxkICgwLCBub3RpZmljYXRpb25zXzEuc2hvd0NvbmZpcm1EaWFsb2cpKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcG9zdD8nKTtcbiAgICAgICAgaWYgKCFjb25maXJtRGVsZXRlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHlpZWxkICgwLCBhcGlfMS5kZWxldGVCbG9nUG9zdCkocG9zdElkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByb3cucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNDb3VudCA9IHN0YXRlXzEuc3RhdGUucG9zdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHN0YXRlXzEuc3RhdGUucG9zdHMgPSBzdGF0ZV8xLnN0YXRlLnBvc3RzLmZpbHRlcihwb3N0ID0+IE51bWJlcihwb3N0LmlkKSAhPT0gcG9zdElkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUG9zdHMgZmlsdGVyZWQ6IGZyb20gJHtwcmV2aW91c0NvdW50fSB0byAke3N0YXRlXzEuc3RhdGUucG9zdHMubGVuZ3RofWApO1xuICAgICAgICAgICAgICAgICgwLCBub3RpZmljYXRpb25zXzEuc2hvd1RvYXN0KSgnUG9zdCBkZWxldGVkIHN1Y2Nlc3NmdWxseScsICdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgKDAsIHBhZ2luYXRpb25fMS51cGRhdGVQYWdpbmF0aW9uU3RhdGUpKCk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byByZW5kZXIgdGhlIHBhZ2UgYWdhaW4gKGUuZy4sIGlmIHdlIGRlbGV0ZWQgdGhlIGxhc3QgaXRlbSBvbiBhIHBhZ2UpXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlXzEuc3RhdGUucG9zdHMubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgIChzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlID4gMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHN0YXRlXzEuc3RhdGUuY3VycmVudFBhZ2UgLSAxKSAqIHN0YXRlXzEuc3RhdGUucG9zdHNQZXJQYWdlID49IHN0YXRlXzEuc3RhdGUucG9zdHMubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZV8xLnN0YXRlLmN1cnJlbnRQYWdlID0gTWF0aC5tYXgoMSwgc3RhdGVfMS5zdGF0ZS5jdXJyZW50UGFnZSAtIDEpO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJDdXJyZW50UGFnZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RlbGV0ZSBvcGVyYXRpb24gcmV0dXJuZWQgZmFsc2UvdW5zdWNjZXNzZnVsJyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZXJ2ZXIgcmV0dXJuZWQgdW5zdWNjZXNzZnVsIHJlc3BvbnNlIHdoZW4gZGVsZXRpbmcgcG9zdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZGVsZXRpbmcgcG9zdDonLCBlcnJvcik7XG4gICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkoYEZhaWxlZCB0byBkZWxldGUgcG9zdDogJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdVbmtub3duIGVycm9yJ31gLCAnZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaGFuZGxlRWRpdFBvc3QocG9zdElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBvc3QgPSB5aWVsZCAoMCwgYXBpXzEuZmV0Y2hQb3N0QnlJZCkocG9zdElkKTtcbiAgICAgICAgICAgIGlmIChwb3N0KSB7XG4gICAgICAgICAgICAgICAgKDAsIG1vZGFsRXZlbnRzXzEub3BlblBvc3RNb2RhbCkocG9zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bvc3Qgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkoJ0ZhaWxlZCB0byBsb2FkIHBvc3QgZm9yIGVkaXRpbmcnLCAnZXJyb3InKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgcG9zdDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHNob3dFbXB0eVN0YXRlKCkge1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0cy10YWJsZS1ib2R5Jyk7XG4gICAgaWYgKCF0YWJsZUJvZHkpXG4gICAgICAgIHJldHVybjtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gYFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjdcIiBjbGFzcz1cImVtcHR5LXN0YXRlXCI+XG4gICAgICAgICAgICAgICAgPHA+Tm8gYmxvZyBwb3N0cyBmb3VuZDwvcD5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgYDtcbn1cbmZ1bmN0aW9uIHNob3dFcnJvclN0YXRlKCkge1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0cy10YWJsZS1ib2R5Jyk7XG4gICAgaWYgKCF0YWJsZUJvZHkpXG4gICAgICAgIHJldHVybjtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gYFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjdcIiBjbGFzcz1cImVycm9yLXN0YXRlXCI+XG4gICAgICAgICAgICAgICAgPHA+RmFpbGVkIHRvIGxvYWQgYmxvZyBwb3N0cy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci48L3A+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgIGA7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3RhdGUgPSB2b2lkIDA7XG5leHBvcnRzLnN0YXRlID0ge1xuICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgIHBvc3RzUGVyUGFnZTogMTAsXG4gICAgdG90YWxQYWdlczogMSxcbiAgICBwb3N0czogW10sXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgc2VhcmNoVGVybTogJycsXG4gICAgc29ydEJ5OiAnbmV3ZXN0JyxcbiAgICBpbml0aWFsaXplZDogZmFsc2Vcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBBZG1pbiBEYXNoYm9hcmQgZW50cnkgcG9pbnRcbiAqL1xuY29uc3QgYWRtaW5Db250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvYWRtaW5Db250cm9sbGVyXCIpOyAvLyBIYW5kbGVzIGNvcmUgYWRtaW4gbG9naWNcbmNvbnN0IGRhcmtNb2RlXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9kYXJrTW9kZVwiKTsgLy8gSGFuZGxlcyBkYXJrIG1vZGUgVUlcbi8vIENvbnNpZGVyIGltcG9ydGluZyBhIGRlZGljYXRlZCBtb2RhbCBoYW5kbGVyIGlmIGxvZ2ljIGJlY29tZXMgY29tcGxleFxuLy8gaW1wb3J0IHsgaW5pdGlhbGl6ZUFkbWluTW9kYWxzIH0gZnJvbSAnLi9hZG1pbk1vZGFscyc7XG4vKipcbiAqIEluaXRpYWxpemVzIGFsbCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgYWRtaW4gZGFzaGJvYXJkIHBhZ2UuXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVBZG1pblBhZ2UoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIDEuIEluaXRpYWxpemUgVUkgZWxlbWVudHMgbGlrZSBkYXJrIG1vZGUgZmlyc3RcbiAgICAgICAgICAgICgwLCBkYXJrTW9kZV8xLmNoZWNrU3lzdGVtRGFya01vZGVQcmVmZXJlbmNlKSgpOyAvLyBDaGVjayBzeXN0ZW0gcHJlZmVyZW5jZSBvbiBsb2FkXG4gICAgICAgICAgICAoMCwgZGFya01vZGVfMS5pbml0aWFsaXplRGFya01vZGUpKCk7IC8vIFNldHVwIHRoZSB0b2dnbGUgZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgLy8gMi4gSW5pdGlhbGl6ZSBjb3JlIGFkbWluIGRhc2hib2FyZCBsb2dpYyAoZS5nLiwgZmV0Y2hpbmcgZGF0YSwgc2V0dGluZyB1cCB0YWJsZXMpXG4gICAgICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpZGVhbGx5IGNyZWF0ZS9yZW5kZXIgdGhlIG5lY2Vzc2FyeSBET00gZWxlbWVudHMgaWYgdGhleSBhcmVuJ3Qgc3RhdGljIEhUTUxcbiAgICAgICAgICAgIHlpZWxkICgwLCBhZG1pbkNvbnRyb2xsZXJfMS5pbml0aWFsaXplQWRtaW5EYXNoYm9hcmQpKCk7XG4gICAgICAgICAgICAvLyAzLiBJbml0aWFsaXplIGludGVyYWN0aXZlIGNvbXBvbmVudHMgbGlrZSBtb2RhbHMgQUZURVIgY29yZSBjb250ZW50IGlzIHJlYWR5XG4gICAgICAgICAgICBpbml0aWFsaXplTW9kYWxFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgLy8gRXhhbXBsZTogSWYgeW91IGhhZCBtb3JlIGNvbXBsZXggbW9kYWwgbG9naWM6XG4gICAgICAgICAgICAvLyBpbml0aWFsaXplQWRtaW5Nb2RhbHMoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluaXRpYWxpemluZyBhZG1pbiBkYXNoYm9hcmQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgLy8gT3B0aW9uYWxseSBkaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIGFkbWluIHVzZXJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1lcnJvci1kaXNwbGF5Jyk7XG4gICAgICAgICAgICBpZiAoZXJyb3JEaXNwbGF5KSB7XG4gICAgICAgICAgICAgICAgZXJyb3JEaXNwbGF5LnRleHRDb250ZW50ID0gJ0ZhaWxlZCB0byBpbml0aWFsaXplIGFkbWluIGRhc2hib2FyZC4gUGxlYXNlIGNoZWNrIGNvbnNvbGUgb3IgdHJ5IGFnYWluIGxhdGVyLic7XG4gICAgICAgICAgICAgICAgZXJyb3JEaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyAvLyBNYWtlIGl0IHZpc2libGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBTZXRzIHVwIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHBvc3QgY3JlYXRpb24vZWRpdGluZyBtb2RhbC5cbiAqIEFzc3VtZXMgbW9kYWwgZWxlbWVudHMgZXhpc3QgaW4gdGhlIHN0YXRpYyBIVE1MIG9yIGFyZSBjcmVhdGVkIGJ5IGluaXRpYWxpemVBZG1pbkRhc2hib2FyZC5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZU1vZGFsRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgYWRkUG9zdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcG9zdC1idG4nKTtcbiAgICBjb25zdCBwb3N0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1tb2RhbCcpO1xuICAgIC8vIFVzZSBtb3JlIHNwZWNpZmljIHNlbGVjdG9ycyBpZiBwb3NzaWJsZSwgZXNwZWNpYWxseSBpZiBtdWx0aXBsZSBtb2RhbHMgZXhpc3RcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gcG9zdE1vZGFsID09PSBudWxsIHx8IHBvc3RNb2RhbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9zdE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1tb2RhbCcpO1xuICAgIGNvbnN0IGNhbmNlbFBvc3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLXBvc3QtYnRuJyk7IC8vIEFzc3VtaW5nIHRoaXMgaXMgaW5zaWRlIHRoZSBtb2RhbFxuICAgIGlmICghcG9zdE1vZGFsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUG9zdCBtb2RhbCBlbGVtZW50ICgjcG9zdC1tb2RhbCkgbm90IGZvdW5kLiBDYW5ub3QgaW5pdGlhbGl6ZSBtb2RhbCBldmVudHMuJyk7XG4gICAgICAgIHJldHVybjsgLy8gRXhpdCBpZiB0aGUgbWFpbiBtb2RhbCBlbGVtZW50IGlzIG1pc3NpbmdcbiAgICB9XG4gICAgaWYgKGFkZFBvc3RCdXR0b24pIHtcbiAgICAgICAgYWRkUG9zdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvc3RNb2RhbC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdBZGQgcG9zdCBidXR0b24gKCNhZGQtcG9zdC1idG4pIG5vdCBmb3VuZC4nKTtcbiAgICB9XG4gICAgaWYgKGNsb3NlTW9kYWxCdXR0b24pIHtcbiAgICAgICAgY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBvc3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDbG9zZSBtb2RhbCBidXR0b24gKC5jbG9zZS1tb2RhbCkgbm90IGZvdW5kIHdpdGhpbiAjcG9zdC1tb2RhbC4nKTtcbiAgICB9XG4gICAgaWYgKGNhbmNlbFBvc3RCdXR0b24pIHtcbiAgICAgICAgY2FuY2VsUG9zdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHBvc3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDYW5jZWwgcG9zdCBidXR0b24gKCNjYW5jZWwtcG9zdC1idG4pIG5vdCBmb3VuZC4nKTtcbiAgICB9XG4gICAgLy8gT3B0aW9uYWw6IEFkZCBsaXN0ZW5lciB0byBjbG9zZSBtb2RhbCBpZiBjbGlja2luZyBvdXRzaWRlIG9mIGl0XG4gICAgcG9zdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjbGljayB0YXJnZXQgaXMgdGhlIG1vZGFsIGJhY2tkcm9wIGl0c2VsZiwgbm90IGl0cyBjb250ZW50XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHBvc3RNb2RhbCkge1xuICAgICAgICAgICAgcG9zdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIE9wdGlvbmFsOiBBZGQgbGlzdGVuZXIgdG8gY2xvc2UgbW9kYWwgd2l0aCB0aGUgRXNjYXBlIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgJiYgcG9zdE1vZGFsLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XG4gICAgICAgICAgICBwb3N0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyAtLS0gTWFpbiBFeGVjdXRpb24gLS0tXG4vLyBXYWl0IGZvciB0aGUgRE9NIHRvIGJlIGZ1bGx5IGxvYWRlZCBiZWZvcmUgaW5pdGlhbGl6aW5nXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRpYWxpemVBZG1pblBhZ2UpO1xufVxuZWxzZSB7XG4gICAgLy8gRE9NQ29udGVudExvYWRlZCBoYXMgYWxyZWFkeSBmaXJlZFxuICAgIGluaXRpYWxpemVBZG1pblBhZ2UoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlbGV0ZUJsb2dQb3N0ID0gZGVsZXRlQmxvZ1Bvc3Q7XG5leHBvcnRzLmZldGNoQmxvZ1Bvc3RzID0gZmV0Y2hCbG9nUG9zdHM7XG5leHBvcnRzLmZldGNoUG9zdEJ5SWQgPSBmZXRjaFBvc3RCeUlkO1xuZXhwb3J0cy5jcmVhdGVQb3N0ID0gY3JlYXRlUG9zdDtcbmV4cG9ydHMudXBkYXRlUG9zdCA9IHVwZGF0ZVBvc3Q7XG5leHBvcnRzLmxpa2VQb3N0ID0gbGlrZVBvc3Q7XG5leHBvcnRzLnVubGlrZVBvc3QgPSB1bmxpa2VQb3N0O1xuZXhwb3J0cy5hZGRUYWdUb1Bvc3QgPSBhZGRUYWdUb1Bvc3Q7XG5jb25zdCBBUElfVVJMID0gJy9hcGknO1xuLyoqXG4gKiBEZWxldGVzIGEgYmxvZyBwb3N0IGJ5IElELlxuICogQHBhcmFtIHBvc3RJZCAtIFRoZSBJRCBvZiB0aGUgYmxvZyBwb3N0IHRvIGRlbGV0ZS5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRydWUgaWYgdGhlIGRlbGV0aW9uIHdhcyBzdWNjZXNzZnVsLCBvciBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZUJsb2dQb3N0KHBvc3RJZCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAvYXBpL3Bvc3RzLyR7cG9zdElkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGRlbGV0ZSBibG9nIHBvc3Q6JywgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZWxldGluZyBibG9nIHBvc3Q6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEZldGNoIGFsbCBibG9nIHBvc3RzIGZyb20gdGhlIEFQSVxuICovXG5mdW5jdGlvbiBmZXRjaEJsb2dQb3N0cygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHtBUElfVVJMfS9wb3N0c2ApO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHBvc3RzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgcG9zdHM6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEdldCBhIHNpbmdsZSBwb3N0IGJ5IElEXG4gKiBAcGFyYW0gaWQgLSBUaGUgcG9zdCBJRCAoY2FuIGJlIHN0cmluZyBvciBudW1iZXIpXG4gKi9cbmZ1bmN0aW9uIGZldGNoUG9zdEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHtBUElfVVJMfS9wb3N0cy8ke2lkfWApO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHBvc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBwb3N0ICR7aWR9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIG5ldyBwb3N0IHZpYSBBUElcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUG9zdChwb3N0RGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke0FQSV9VUkx9L3Bvc3RzYCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocG9zdERhdGEpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBjcmVhdGUgcG9zdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIHBvc3Q6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogVXBkYXRlIGFuIGV4aXN0aW5nIHBvc3QgdmlhIEFQSVxuICovXG5mdW5jdGlvbiB1cGRhdGVQb3N0KGlkLCBwb3N0RGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke0FQSV9VUkx9L3Bvc3RzLyR7aWR9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwb3N0RGF0YSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHVwZGF0ZSBwb3N0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBkYXRpbmcgcG9zdDonLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBMaWtlIGEgcG9zdCB2aWEgQVBJXG4gKi9cbmZ1bmN0aW9uIGxpa2VQb3N0KGlkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7QVBJX1VSTH0vcG9zdHMvJHtpZH0vbGlrZWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbGlrZSBwb3N0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgbGlraW5nIHBvc3QgJHtpZH06YCwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogVW5saWtlIGEgcG9zdCB2aWEgQVBJXG4gKi9cbmZ1bmN0aW9uIHVubGlrZVBvc3QoaWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgL2FwaS9wb3N0cy8ke2lkfS9saWtlYCwgeyBtZXRob2Q6ICdERUxFVEUnIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byB1bmxpa2UgcG9zdCcpO1xuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIHVubGlrZVBvc3Q6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogQWRkIGEgdGFnIHRvIGEgcG9zdCB2aWEgQVBJXG4gKi9cbmZ1bmN0aW9uIGFkZFRhZ1RvUG9zdChpZCwgdGFnKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7QVBJX1VSTH0vcG9zdHMvJHtpZH0vdGFnc2AsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdGFnIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBhZGQgdGFnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgYWRkaW5nIHRhZyB0byBwb3N0ICR7aWR9OmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2hvd1RvYXN0ID0gc2hvd1RvYXN0O1xuZXhwb3J0cy5zaG93Q29uZmlybURpYWxvZyA9IHNob3dDb25maXJtRGlhbG9nO1xuZnVuY3Rpb24gc2hvd1RvYXN0KG1lc3NhZ2UsIHR5cGUpIHtcbiAgICBjb25zdCB0b2FzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2FzdC1ub3RpZmljYXRpb24nKTtcbiAgICBjb25zdCB0b2FzdE1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9hc3QtbWVzc2FnZScpO1xuICAgIGlmICghdG9hc3QgfHwgIXRvYXN0TWVzc2FnZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHRvYXN0LmNsYXNzTmFtZSA9IGB0b2FzdCAke3R5cGV9YDtcbiAgICB0b2FzdE1lc3NhZ2UudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIHRvYXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0b2FzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0sIDMwMDApO1xufVxuLy8gSW5zaWRlIG5vdGlmaWNhdGlvbnMudHNcbmZ1bmN0aW9uIHNob3dDb25maXJtRGlhbG9nKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlybURpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25maXJtLWRpYWxvZycpO1xuICAgICAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IGNvbmZpcm1EaWFsb2cucXVlcnlTZWxlY3RvcigncCcpO1xuICAgICAgICBjb25zdCBjb25maXJtQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmZpcm0tZGVsZXRlLWJ0bicpO1xuICAgICAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLWRlbGV0ZS1idG4nKTtcbiAgICAgICAgaWYgKCFjb25maXJtRGlhbG9nIHx8ICFtZXNzYWdlRWxlbWVudCB8fCAhY29uZmlybUJ1dHRvbiB8fCAhY2FuY2VsQnV0dG9uKSB7XG4gICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgICAgIGNvbmZpcm1EaWFsb2cuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJywgJ29wZW4nKTtcbiAgICAgICAgY29uc3QgaGFuZGxlQ29uZmlybSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbmZpcm1EaWFsb2cuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJywgJ29wZW4nKTtcbiAgICAgICAgICAgIGNsZWFudXBMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGhhbmRsZUNhbmNlbCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbmZpcm1EaWFsb2cuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJywgJ29wZW4nKTtcbiAgICAgICAgICAgIGNsZWFudXBMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjbGVhbnVwTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uZmlybUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNvbmZpcm0pO1xuICAgICAgICAgICAgY2FuY2VsQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2FuY2VsKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNvbmZpcm0pO1xuICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDYW5jZWwpO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuZXhwb3J0cy5kZWJvdW5jZSA9IGRlYm91bmNlO1xuZnVuY3Rpb24gZXNjYXBlSHRtbCh1bnNhZmUpIHtcbiAgICByZXR1cm4gdW5zYWZlXG4gICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XG59XG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG4gICAgbGV0IHRpbWVvdXQ7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gZnVuYyguLi5hcmdzKSwgd2FpdCk7XG4gICAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YWxpZGF0ZVBvc3REYXRhID0gdmFsaWRhdGVQb3N0RGF0YTtcbmNvbnN0IG5vdGlmaWNhdGlvbnNfMSA9IHJlcXVpcmUoXCIuL25vdGlmaWNhdGlvbnNcIik7XG5mdW5jdGlvbiB2YWxpZGF0ZVBvc3REYXRhKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEudGl0bGUgfHwgZGF0YS50aXRsZS5sZW5ndGggPCAzKSB7XG4gICAgICAgICgwLCBub3RpZmljYXRpb25zXzEuc2hvd1RvYXN0KSgnVGl0bGUgbXVzdCBiZSBhdCBsZWFzdCAzIGNoYXJhY3RlcnMgbG9uZycsICdlcnJvcicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghZGF0YS5jb250ZW50IHx8IGRhdGEuY29udGVudC5sZW5ndGggPCAxMCkge1xuICAgICAgICAoMCwgbm90aWZpY2F0aW9uc18xLnNob3dUb2FzdCkoJ0NvbnRlbnQgbXVzdCBiZSBhdCBsZWFzdCAxMCBjaGFyYWN0ZXJzIGxvbmcnLCAnZXJyb3InKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWRhdGEuYXV0aG9yKSB7XG4gICAgICAgICgwLCBub3RpZmljYXRpb25zXzEuc2hvd1RvYXN0KSgnQXV0aG9yIG5hbWUgaXMgcmVxdWlyZWQnLCAnZXJyb3InKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9lbnRyaWVzL2FkbWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9