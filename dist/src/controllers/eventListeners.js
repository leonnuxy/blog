"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEventListeners = setupEventListeners;
const modalEvents_1 = require("./modalEvents");
const postManager_1 = require("./postManager");
const state_1 = require("./state");
const formHandlers_1 = require("./formHandlers");
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
