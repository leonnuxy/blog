import { BlogPostData } from '../../shared/types';
import { state } from './state';
import { loadPosts } from './postManager';
import { validatePostData } from '../utils/validation';
import { showToast } from '../utils/notifications';
import { createPost, updatePost } from '../services/api';

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
            const updateData = {
                title: postData.title,
                content: postData.content,
                tags: postData.tags
            };
            result = await updatePost(parseInt(postId), updateData);
        } else {
            result = await createPost(postData);
        }

        if (result) {
            closePostModal();
            await loadPosts();
            showToast(postId ? 'Post updated successfully' : 'Post created successfully', 'success');
        } else {
            throw new Error(postId ? 'Failed to update post' : 'Failed to create post');
        }
    } catch (error) {
        showToast(postId ? 'Failed to update post' : 'Failed to create post', 'error');
        console.error('Error saving post:', error);
    }
}

export function setupModalEvents(): void {
    const modal = document.getElementById('post-modal');
    const form = document.getElementById('post-form') as HTMLFormElement;
    const closeBtn = modal?.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancel-post-btn');

    if (form) {
        form.addEventListener('submit', handleModalFormSubmit);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closePostModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closePostModal);
    }

    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e: Event) => {
            if (e.target === modal) {
                closePostModal();
            }
        });
    }
}

export function openPostModal(post?: BlogPostData): void {
    const modal = document.getElementById('post-modal') as HTMLElement;
    const form = document.getElementById('post-form') as HTMLFormElement;
    const titleInput = document.getElementById('post-title') as HTMLInputElement;
    const authorInput = document.getElementById('post-author') as HTMLInputElement;
    const contentInput = document.getElementById('post-content') as HTMLTextAreaElement;
    const tagsInput = document.getElementById('post-tags') as HTMLInputElement;
    const modalTitle = document.getElementById('modal-title');

    if (modalTitle) {
        modalTitle.textContent = post ? 'Edit Post' : 'Add New Post';
    }

    if (post) {
        titleInput.value = post.title;
        authorInput.value = post.author;
        contentInput.value = post.content;
        tagsInput.value = post.tags.join(', ');
        form.dataset.postId = post.id.toString();
    } else {
        form.reset();
        delete form.dataset.postId;
    }

    modal.classList.add('open');
}

export function closePostModal(): void {
    const modal = document.getElementById('post-modal');
    if (modal) {
        modal.classList.remove('open');
    }
}