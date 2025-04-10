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
exports.initializePostDetail = initializePostDetail;
exports.setupPostEventListeners = setupPostEventListeners;
exports.filterAndSortPosts = filterAndSortPosts;
exports.loadPosts = loadPosts;
exports.renderPostsTable = renderPostsTable;
exports.editPost = editPost;
/**
 * Post Controller
 * Unified controller for all post-related functionality including:
 * - Post events and interactions
 * - Post data management (loading, filtering, sorting)
 * - Post detail page initialization
 */
const api_1 = require("../services/api");
const state_1 = require("./state");
const notifications_1 = require("../utils/notifications");
const utils_1 = require("../utils/utils");
const postDetail_1 = require("../modules/postDetail");
// Import from uiController instead of the removed files
const uiController_1 = require("./uiController");
// ------------------- Post Detail Functionality -------------------
/**
 * Initialize the post detail page by delegating to the module logic
 */
function initializePostDetail() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, postDetail_1.initializePostDetailPageLogic)();
    });
}
// ------------------- Post Event Handling -------------------
/**
 * Setup all event listeners for a post page
 * @param postId The ID of the current post
 */
function setupPostEventListeners(postId) {
    setupSharingLinks();
}
/**
 * Set up sharing links functionality
 */
function setupSharingLinks() {
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.currentTarget;
            const platform = target.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl = '';
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=Check out this article: ${url}`;
                    break;
            }
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}
/**
 * Show a notification message
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
// ------------------- Post Management Functionality -------------------
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
            // Update pagination directly instead of calling the removed function
            state_1.state.totalPages = Math.ceil(filterAndSortPosts().length / state_1.state.postsPerPage);
            renderPostsTable();
        }
        catch (error) {
            console.error('Failed to load posts:', error);
            (0, notifications_1.showToast)('Failed to load posts', 'error');
        }
    });
}
function renderPostsTable() {
    const tableBody = document.getElementById('posts-table-body');
    if (!tableBody)
        return;
    const filtered = filterAndSortPosts();
    const startIndex = (state_1.state.currentPage - 1) * state_1.state.postsPerPage;
    const endIndex = startIndex + state_1.state.postsPerPage;
    const postsToShow = filtered.slice(startIndex, endIndex);
    tableBody.innerHTML = '';
    if (postsToShow.length === 0) {
        const noPostsRow = document.createElement('tr');
        noPostsRow.innerHTML = `<td colspan="5" class="no-posts">No posts found</td>`;
        tableBody.appendChild(noPostsRow);
        return;
    }
    postsToShow.forEach((post) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.id}</td>
            <td>${(0, utils_1.escapeHtml)(post.title)}</td>
            <td>${(0, utils_1.escapeHtml)(post.author)}</td>
            <td>${new Date(post.createdAt).toLocaleDateString()}</td>
            <td class="actions">
                <button class="edit-btn" data-id="${post.id}">Edit</button>
                <button class="delete-btn" data-id="${post.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    // Update pagination info
    const paginationInfo = document.getElementById('pagination-info');
    if (paginationInfo) {
        const totalPosts = filtered.length;
        paginationInfo.textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, totalPosts)} of ${totalPosts} posts`;
    }
    // Set up edit buttons
    const editButtons = tableBody.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.dataset.id;
            if (postId) {
                editPost(parseInt(postId, 10));
            }
        });
    });
}
function editPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, api_1.fetchPostById)(postId);
            if (post) {
                (0, uiController_1.openPostModal)('edit', post);
            }
        }
        catch (error) {
            console.error('Failed to fetch post for editing:', error);
            (0, notifications_1.showToast)('Failed to load post data', 'error');
        }
    });
}
