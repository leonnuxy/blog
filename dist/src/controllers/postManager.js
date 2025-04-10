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
exports.updatePaginationState = updatePaginationState;
exports.updatePaginationControls = updatePaginationControls;
exports.filterAndSortPosts = filterAndSortPosts;
exports.loadPosts = loadPosts;
exports.renderCurrentPage = renderCurrentPage;
// postManager.ts
// src/controllers/postManager.ts
const api_1 = require("../services/api");
const state_1 = require("./state");
const notifications_1 = require("../utils/notifications");
const utils_1 = require("../utils/utils");
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
