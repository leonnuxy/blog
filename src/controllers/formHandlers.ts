import { loadPosts } from './postManager';
import { state } from './state';
import { debounce } from '../utils/utils';



export function setupSearchAndFilters(): void {
    const searchInput = document.getElementById('search-posts') as HTMLInputElement;
    const sortSelect = document.getElementById('sort-by') as HTMLSelectElement;
    const filterTagSelect = document.getElementById('filter-tag') as HTMLSelectElement;

    if (searchInput) {
        searchInput.addEventListener('input', debounce((e: Event) => {
            state.searchTerm = (e.target as HTMLInputElement).value;
            loadPosts();
        }, 300));
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e: Event) => {
            state.sortBy = (e.target as HTMLSelectElement).value as typeof state.sortBy;
            loadPosts();
        });
    }

    if (filterTagSelect) {
        updateTagFilterOptions();
    }
}

function updateTagFilterOptions(): void {
    const filterTagSelect = document.getElementById('filter-tag') as HTMLSelectElement;
    if (!filterTagSelect) return;

    const uniqueTags = new Set<string>();
    state.posts.forEach(post => {
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