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
exports.handleFormSubmit = handleFormSubmit;
exports.setupSearchAndFilters = setupSearchAndFilters;
const api_1 = require("../services/api");
const validation_1 = require("../utils/validation");
const notifications_1 = require("../utils/notifications");
const modalEvents_1 = require("./modalEvents");
const postManager_1 = require("./postManager");
const state_1 = require("./state");
const utils_1 = require("../utils/utils");
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
