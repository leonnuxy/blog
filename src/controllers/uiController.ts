/**
 * UI Controller
 * Unified controller for UI interactions including:
 * - Modal dialogs management
 * - Form handling and submissions
 */
import { BlogPostData, CreatePostRequest, UpdatePostRequest } from '../../shared/types';
import { state } from './state';
import { validatePostData } from '../utils/validation';
import { showToast } from '../utils/notifications';
import { createPost, updatePost } from '../services/api';
import { loadPosts } from './postController';
import { debounce } from '../utils/utils';

// ------------------- Modal Management -------------------

/**
 * Setup event listeners for modals
 */
export function setupModalEvents(): void {
    const modal = document.getElementById('post-modal');
    const closeBtn = document.querySelector('.modal .close-btn');
    const modalForm = document.getElementById('post-form') as HTMLFormElement;
    
    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closePostModal);
    }
    
    // Close when clicking outside modal content
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closePostModal();
            }
        });
    }
    
    // Handle form submission
    if (modalForm) {
        modalForm.addEventListener('submit', handleModalFormSubmit);
    }
    
    // Handle ESC key press to close modal
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePostModal();
        }
    });
}

/**
 * Open the post modal for creating or editing a post
 */
export function openPostModal(mode: 'create' | 'edit', post?: BlogPostData): void {
    const modal = document.getElementById('post-modal');
    const modalForm = document.getElementById('post-form') as HTMLFormElement;
    const modalTitle = document.querySelector('.modal-title');
    
    if (!modal || !modalForm || !modalTitle) return;
    
    // Reset form
    modalForm.reset();
    
    // Set mode and title
    if (mode === 'create') {
        modalTitle.textContent = 'Create New Post';
        modalForm.dataset.postId = '';
    } else {
        modalTitle.textContent = 'Edit Post';
        if (post) {
            modalForm.dataset.postId = post.id.toString();
            
            // Fill form with post data
            const titleInput = modalForm.querySelector('#post-title') as HTMLInputElement;
            const contentInput = modalForm.querySelector('#post-content') as HTMLTextAreaElement;
            const authorInput = modalForm.querySelector('#post-author') as HTMLInputElement;
            const tagsInput = modalForm.querySelector('#post-tags') as HTMLInputElement;
            
            if (titleInput) titleInput.value = post.title;
            if (contentInput) contentInput.value = post.content;
            if (authorInput) authorInput.value = post.author;
            if (tagsInput) tagsInput.value = post.tags.join(', ');
        }
    }
    
    // Show modal
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    
    // Focus on title input
    const titleInput = modalForm.querySelector('#post-title') as HTMLInputElement;
    if (titleInput) {
        setTimeout(() => {
            titleInput.focus();
        }, 100);
    }
}

/**
 * Close the post modal
 */
export function closePostModal(): void {
    const modal = document.getElementById('post-modal');
    if (!modal) return;
    
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
}

// ------------------- Form Handling -------------------

/**
 * Handle form submission for post creation/editing
 */
export async function handleModalFormSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const postId = form.dataset.postId;

    try {
        const postData = {
            title: (formData.get('post-title') as string)?.trim() || '',
            content: (formData.get('post-content') as string)?.trim() || '',
            author: (formData.get('post-author') as string)?.trim() || '',
            tags: (formData.get('post-tags') as string)?.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) || []
        };

        if (!validatePostData(postData)) {
            return;
        }

        let result: BlogPostData | null;
        
        if (postId) {
            // Update existing post
            const updateRequest: UpdatePostRequest = {
                ...postData,
            };
            result = await updatePost(parseInt(postId, 10), updateRequest);
            showToast('Post updated successfully', 'success');
        } else {
            // Create new post
            const createRequest: CreatePostRequest = {
                ...postData,
            };
            result = await createPost(createRequest);
            showToast('Post created successfully', 'success');
        }

        if (result) {
            closePostModal();
            await loadPosts(); // Refresh posts list
        }
    } catch (error) {
        console.error('Error saving post:', error);
        showToast('Failed to save post', 'error');
    }
}

/**
 * Handle regular form submission
 */
export async function handleFormSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const postId = form.dataset.postId;

    try {
        const postData = {
            title: (formData.get('post-title') as string)?.trim() || '',
            content: (formData.get('post-content') as string)?.trim() || '',
            author: (formData.get('post-author') as string)?.trim() || '',
            tags: (formData.get('post-tags') as string)?.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) || []
        };

        if (!validatePostData(postData)) {
            return;
        }

        let result: BlogPostData | null;
        
        if (postId) {
            // Update existing post
            const updateRequest: UpdatePostRequest = {
                ...postData,
            };
            result = await updatePost(parseInt(postId, 10), updateRequest);
            showToast('Post updated successfully', 'success');
        } else {
            // Create new post
            const createRequest: CreatePostRequest = {
                ...postData,
            };
            result = await createPost(createRequest);
            showToast('Post created successfully', 'success');
        }

        if (result) {
            closePostModal();
            await loadPosts(); // Refresh posts list
        }
    } catch (error) {
        console.error('Error saving post:', error);
        showToast('Failed to save post', 'error');
    }
}

/**
 * Handle search input events
 */
export const handleSearchInput = debounce((event: Event) => {
    const searchInput = event.target as HTMLInputElement;
    state.searchTerm = searchInput.value;
    state.currentPage = 1; // Reset to first page when searching
    loadPosts();
}, 300);

/**
 * Handle sorting change
 */
export function handleSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    state.sortBy = select.value as any;
    loadPosts();
}

/**
 * Setup general form-related events
 */
export function setupFormEvents(): void {
    // Search functionality
    const searchInput = document.getElementById('search-posts') as HTMLInputElement;
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-posts') as HTMLSelectElement;
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    }
    
    // For any standalone forms
    const forms = document.querySelectorAll('form:not(#post-form)');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}
