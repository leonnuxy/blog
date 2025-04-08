import { createPost, updatePost } from '../services/api';
import { BlogPostData, CreatePostRequest, UpdatePostRequest } from '../../shared/types';
import { validatePostData } from '../utils/validation';
import { showToast } from '../utils/notifications';
import { closePostModal } from './modalEvents';
import { loadPosts } from './postManager';
import { state } from './state';
import { debounce } from '../utils/utils';

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
            const updateData: UpdatePostRequest = {
                title: postData.title,
                content: postData.content,
                tags: postData.tags
            };
            result = await updatePost(parseInt(postId), updateData);
        } else {
            // Create new post
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