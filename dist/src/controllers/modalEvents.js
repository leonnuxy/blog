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
exports.handleModalFormSubmit = handleModalFormSubmit;
exports.setupModalEvents = setupModalEvents;
exports.openPostModal = openPostModal;
exports.closePostModal = closePostModal;
const postManager_1 = require("./postManager");
const validation_1 = require("../utils/validation");
const notifications_1 = require("../utils/notifications");
const api_1 = require("../services/api");
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
