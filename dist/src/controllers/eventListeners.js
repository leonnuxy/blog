"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEventListeners = setupEventListeners;
const postManager_1 = require("./postManager");
const state_1 = require("./state");
const formHandlers_1 = require("./formHandlers");
function setupEventListeners() {
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
    (0, formHandlers_1.setupSearchAndFilters)();
}
