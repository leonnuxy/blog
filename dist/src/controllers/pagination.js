"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaginationState = updatePaginationState;
exports.updatePaginationControls = updatePaginationControls;
const state_1 = require("./state");
const postManager_1 = require("./postManager");
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
