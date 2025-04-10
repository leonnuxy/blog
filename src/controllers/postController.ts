/**
 * Post Controller
 * Unified controller for all post-related functionality including:
 * - Post events and interactions
 * - Post data management (loading, filtering, sorting)
 * - Post detail page initialization
 */
import { fetchBlogPosts, deleteBlogPost, fetchPostById } from '../services/api';
import { BlogPostData } from '../../shared/types';
import { state } from './state';
import { showToast, showConfirmDialog } from '../utils/notifications';
import { escapeHtml } from '../utils/utils';
import { initializePostDetailPageLogic } from '../modules/postDetail';
// Import from uiController instead of the removed files
import { openPostModal } from './uiController';

// ------------------- Post Detail Functionality -------------------

/**
 * Initialize the post detail page by delegating to the module logic
 */
export async function initializePostDetail(): Promise<void> {
  await initializePostDetailPageLogic();
}

// ------------------- Post Event Handling -------------------

/**
 * Setup all event listeners for a post page
 * @param postId The ID of the current post
 */
export function setupPostEventListeners(postId: string | number): void {
    setupSharingLinks();
}

/**
 * Set up sharing links functionality
 */
function setupSharingLinks(): void {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            
            const target = event.currentTarget as HTMLAnchorElement;
            const platform = target.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=Check out this article: ${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

/**
 * Show a notification message
 */
function showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ------------------- Post Management Functionality -------------------

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
        // Update pagination directly instead of calling the removed function
        state.totalPages = Math.ceil(filterAndSortPosts().length / state.postsPerPage);
        renderPostsTable();
    } catch (error) {
        console.error('Failed to load posts:', error);
        showToast('Failed to load posts', 'error');
    }
}

export function renderPostsTable(): void {
    const tableBody = document.getElementById('posts-table-body');
    if (!tableBody) return;

    const filtered = filterAndSortPosts();
    const startIndex = (state.currentPage - 1) * state.postsPerPage;
    const endIndex = startIndex + state.postsPerPage;
    const postsToShow = filtered.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    if (postsToShow.length === 0) {
        const noPostsRow = document.createElement('tr');
        noPostsRow.innerHTML = `<td colspan="5" class="no-posts">No posts found</td>`;
        tableBody.appendChild(noPostsRow);
        return;
    }

    postsToShow.forEach((post) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.id}</td>
            <td>${escapeHtml(post.title)}</td>
            <td>${escapeHtml(post.author)}</td>
            <td>${new Date(post.createdAt).toLocaleDateString()}</td>
            <td class="actions">
                <button class="edit-btn" data-id="${post.id}">Edit</button>
                <button class="delete-btn" data-id="${post.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Update pagination info
    const paginationInfo = document.getElementById('pagination-info');
    if (paginationInfo) {
        const totalPosts = filtered.length;
        paginationInfo.textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, totalPosts)} of ${totalPosts} posts`;
    }

    // Set up edit buttons
    const editButtons = tableBody.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = (button as HTMLButtonElement).dataset.id;
            if (postId) {
                editPost(parseInt(postId, 10));
            }
        });
    });
}

export async function editPost(postId: number): Promise<void> {
    try {
        const post = await fetchPostById(postId);
        if (post) {
            openPostModal('edit', post);
        }
    } catch (error) {
        console.error('Failed to fetch post for editing:', error);
        showToast('Failed to load post data', 'error');
    }
}

