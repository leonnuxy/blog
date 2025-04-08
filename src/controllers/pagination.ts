import { state } from './state';
import { filterAndSortPosts } from './postManager';

export function updatePaginationState(): void {
    state.totalPages = Math.ceil(filterAndSortPosts().length / state.postsPerPage);
    updatePaginationControls();
}

export function updatePaginationControls(): void {
    const prevBtn = document.getElementById('prev-page') as HTMLButtonElement;
    const nextBtn = document.getElementById('next-page') as HTMLButtonElement;
    const pageIndicator = document.getElementById('page-indicator');

    if (prevBtn && nextBtn && pageIndicator) {
        prevBtn.disabled = state.currentPage === 1;
        nextBtn.disabled = state.currentPage === state.totalPages;
        pageIndicator.textContent = `Page ${state.currentPage} of ${state.totalPages}`;
    }
}