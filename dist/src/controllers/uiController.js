"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSearchInput = void 0;
exports.setupModalEvents = setupModalEvents;
exports.openPostModal = openPostModal;
exports.closePostModal = closePostModal;
exports.handleModalFormSubmit = handleModalFormSubmit;
exports.handleFormSubmit = handleFormSubmit;
exports.handleSortChange = handleSortChange;
exports.setupFormEvents = setupFormEvents;
const state_1 = require("./state");
const validation_1 = require("../utils/validation");
const notifications_1 = require("../utils/notifications");
const api_1 = require("../services/api");
const postController_1 = require("./postController");
const utils_1 = require("../utils/utils");
// ------------------- Modal Management -------------------
/**
 * Setup event listeners for modals
 */
function setupModalEvents() {
    const modal = document.getElementById('post-modal');
    const closeBtn = document.querySelector('.modal .close-btn');
    const modalForm = document.getElementById('post-form');
    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closePostModal);
    }
    // Close when clicking outside modal content
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closePostModal();
            }
        });
    }
    // Handle form submission
    if (modalForm) {
        modalForm.addEventListener('submit', handleModalFormSubmit);
    }
    // Handle ESC key press to close modal
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePostModal();
        }
    });
}
/**
 * Open the post modal for creating or editing a post
 */
function openPostModal(mode, post) {
    const modal = document.getElementById('post-modal');
    const modalForm = document.getElementById('post-form');
    const modalTitle = document.querySelector('.modal-title');
    if (!modal || !modalForm || !modalTitle)
        return;
    // Reset form
    modalForm.reset();
    // Set mode and title
    if (mode === 'create') {
        modalTitle.textContent = 'Create New Post';
        modalForm.dataset.postId = '';
    }
    else {
        modalTitle.textContent = 'Edit Post';
        if (post) {
            modalForm.dataset.postId = post.id.toString();
            // Fill form with post data
            const titleInput = modalForm.querySelector('#post-title');
            const contentInput = modalForm.querySelector('#post-content');
            const authorInput = modalForm.querySelector('#post-author');
            const tagsInput = modalForm.querySelector('#post-tags');
            if (titleInput)
                titleInput.value = post.title;
            if (contentInput)
                contentInput.value = post.content;
            if (authorInput)
                authorInput.value = post.author;
            if (tagsInput)
                tagsInput.value = post.tags.join(', ');
        }
    }
    // Show modal
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    // Focus on title input
    const titleInput = modalForm.querySelector('#post-title');
    if (titleInput) {
        setTimeout(() => {
            titleInput.focus();
        }, 100);
    }
}
/**
 * Close the post modal
 */
function closePostModal() {
    const modal = document.getElementById('post-modal');
    if (!modal)
        return;
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
}
// ------------------- Form Handling -------------------
/**
 * Handle form submission for post creation/editing
 */
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
                // Update existing post
                const updateRequest = Object.assign({}, postData);
                result = yield (0, api_1.updatePost)(parseInt(postId, 10), updateRequest);
                (0, notifications_1.showToast)('Post updated successfully', 'success');
            }
            else {
                // Create new post
                const createRequest = Object.assign({}, postData);
                result = yield (0, api_1.createPost)(createRequest);
                (0, notifications_1.showToast)('Post created successfully', 'success');
            }
            if (result) {
                closePostModal();
                yield (0, postController_1.loadPosts)(); // Refresh posts list
            }
        }
        catch (error) {
            console.error('Error saving post:', error);
            (0, notifications_1.showToast)('Failed to save post', 'error');
        }
    });
}
/**
 * Handle regular form submission
 */
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
                const updateRequest = Object.assign({}, postData);
                result = yield (0, api_1.updatePost)(parseInt(postId, 10), updateRequest);
                (0, notifications_1.showToast)('Post updated successfully', 'success');
            }
            else {
                // Create new post
                const createRequest = Object.assign({}, postData);
                result = yield (0, api_1.createPost)(createRequest);
                (0, notifications_1.showToast)('Post created successfully', 'success');
            }
            if (result) {
                closePostModal();
                yield (0, postController_1.loadPosts)(); // Refresh posts list
            }
        }
        catch (error) {
            console.error('Error saving post:', error);
            (0, notifications_1.showToast)('Failed to save post', 'error');
        }
    });
}
/**
 * Handle search input events
 */
exports.handleSearchInput = (0, utils_1.debounce)((event) => {
    const searchInput = event.target;
    state_1.state.searchTerm = searchInput.value;
    state_1.state.currentPage = 1; // Reset to first page when searching
    (0, postController_1.loadPosts)();
}, 300);
/**
 * Handle sorting change
 */
function handleSortChange(event) {
    const select = event.target;
    state_1.state.sortBy = select.value;
    (0, postController_1.loadPosts)();
}
/**
 * Setup general form-related events
 */
function setupFormEvents() {
    // Search functionality
    const searchInput = document.getElementById('search-posts');
    if (searchInput) {
        searchInput.addEventListener('input', exports.handleSearchInput);
    }
    // Sort functionality
    const sortSelect = document.getElementById('sort-posts');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    }
    // For any standalone forms
    const forms = document.querySelectorAll('form:not(#post-form)');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}
