import { renderCurrentPage } from '../postManager';
import { state } from '../state';
import { setupSearchAndFilters } from '../formHandlers';

export function setupEventListeners(): void {

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

    setupSearchAndFilters();
}