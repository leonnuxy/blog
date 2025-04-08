import { setupModalEvents, openPostModal } from './modalEvents';
import { handleTableActions, renderCurrentPage } from './postManager';
import { state } from './state';
import { debounce } from '../utils/utils';
import { setupSearchAndFilters } from './formHandlers';

export function setupEventListeners(): void {
    // Table actions
    const tableBody = document.getElementById('posts-table-body');
    if (tableBody) {
        tableBody.addEventListener('click', handleTableActions);
    }

    // Add new post button
    const addPostBtn = document.getElementById('add-post-btn');
    if (addPostBtn) {
        addPostBtn.addEventListener('click', () => openPostModal());
    }

    // Pagination controls
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (state.currentPage > 1) {
                state.currentPage--;
                renderCurrentPage();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (state.currentPage < state.totalPages) {
                state.currentPage++;
                renderCurrentPage();
            }
        });
    }

    setupModalEvents();
    setupSearchAndFilters();
}