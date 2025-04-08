import { fetchBlogPosts, deleteBlogPost, fetchPostById } from '../services/api';
import { BlogPostData } from '../../shared/types';
import { state } from './state';
import { showToast, showConfirmDialog } from '../utils/notifications';
import { escapeHtml } from '../utils/utils';
import { updatePaginationState } from './pagination';
import { openPostModal } from './modalEvents';

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
            case 'likes':
                return b.likes - a.likes;
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
            <td>${post.likes}</td>
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

export async function handleTableActions(event: Event): Promise<void> {

    const target = event.target as HTMLElement;
    const actionButton = target.closest('.btn-edit, .btn-delete') as HTMLButtonElement;

    if (!actionButton) {
        return;
    }

    const row = actionButton.closest('tr');
    if (!row) return;

    const postId = row.dataset.postId;
    if (!postId) return;

    if (actionButton.classList.contains('btn-delete')) {
        await handleDeletePost(Number(postId), row);
    } else if (actionButton.classList.contains('btn-edit')) {
        await handleEditPost(Number(postId));
    }
}

async function handleDeletePost(postId: number, row: HTMLElement): Promise<void> {
    const confirmDelete = await showConfirmDialog('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
        const success = await deleteBlogPost(postId.toString());
        if (success) {
            row.remove();
            const previousCount = state.posts.length;
            state.posts = state.posts.filter(post => Number(post.id) !== postId);
            console.log(`Posts filtered: from ${previousCount} to ${state.posts.length}`);
            
            showToast('Post deleted successfully', 'success');
            updatePaginationState();
            
            // Check if we need to render the page again (e.g., if we deleted the last item on a page)
            if (state.posts.length === 0 || 
                (state.currentPage > 1 && 
                 (state.currentPage - 1) * state.postsPerPage >= state.posts.length)) {
                state.currentPage = Math.max(1, state.currentPage - 1);
                renderCurrentPage();
            }
        } else {
            console.error('Delete operation returned false/unsuccessful');
            throw new Error('Server returned unsuccessful response when deleting post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        showToast(`Failed to delete post: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
}

async function handleEditPost(postId: number): Promise<void> {
    try {
        const post = await fetchPostById(postId);
        if (post) {
            openPostModal(post);
        } else {
            throw new Error('Post not found');
        }
    } catch (error) {
        showToast('Failed to load post for editing', 'error');
        console.error('Error loading post:', error);
    }
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