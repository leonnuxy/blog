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
exports.filterAndSortPosts = filterAndSortPosts;
exports.loadPosts = loadPosts;
exports.renderCurrentPage = renderCurrentPage;
exports.handleTableActions = handleTableActions;
const api_1 = require("../services/api");
const state_1 = require("./state");
const notifications_1 = require("../utils/notifications");
const utils_1 = require("../utils/utils");
const pagination_1 = require("./pagination");
const modalEvents_1 = require("./modalEvents");
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
