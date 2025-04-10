// postManager.ts
// src/controllers/postManager.ts
import { fetchBlogPosts } from '../services/api';
import { BlogPostData } from '../../shared/types';
import { state } from './state';
import { showToast, showConfirmDialog } from '../utils/notifications';
import { escapeHtml } from '../utils/utils';


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


export function filterAndSortPosts(): BlogPostData[] {
    let filtered = [...state.posts];

    // Apply search filter
    if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase();
        filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower) ||
            post.author.toLowerCase().includes(searchLower) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }

    // Apply sorting
    filtered.sort((a, b) => {
        switch (state.sortBy) {
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

export async function loadPosts(): Promise<void> {
    const tableBody = document.getElementById('posts-table-body');
    if (!tableBody) {
        console.error('Posts table body not found');
        return;
    }

    try {
        state.posts = await fetchBlogPosts();
        updatePaginationState();
        renderCurrentPage();
    } catch (error) {
        showToast('Failed to load posts', 'error');
        console.error('Error loading posts:', error);
        showErrorState();
    }
}

export function renderCurrentPage(): void {
    const tableBody = document.getElementById('posts-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    const filteredPosts = filterAndSortPosts();
    
    if (filteredPosts.length === 0) {
        showEmptyState();
        return;
    }

    const startIndex = (state.currentPage - 1) * state.postsPerPage;
    const endIndex = startIndex + state.postsPerPage;
    const currentPagePosts = filteredPosts.slice(startIndex, endIndex);

    currentPagePosts.forEach((post: BlogPostData) => {
        const row = document.createElement('tr');
        row.dataset.postId = post.id.toString();
        const formattedDate = new Date(post.createdAt).toLocaleDateString();
        
        row.innerHTML = `
            <td>${post.id}</td>
            <td>${escapeHtml(post.title)}</td>
            <td>${escapeHtml(post.author)}</td>
            <td>${formattedDate}</td>
            <td>${post.tags.map((tag: string) => `<span class="tag-badge">${escapeHtml(tag)}</span>`).join('')}</td>
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

function showEmptyState(): void {
    const tableBody = document.getElementById('posts-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = `
        <tr>
            <td colspan="7" class="empty-state">
                <p>No blog posts found</p>
            </td>
        </tr>
    `;
}

function showErrorState(): void {
    const tableBody = document.getElementById('posts-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = `
        <tr>
            <td colspan="7" class="error-state">
                <p>Failed to load blog posts. Please try again later.</p>
            </td>
        </tr>
    `;
}