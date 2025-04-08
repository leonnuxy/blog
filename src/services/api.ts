import { BlogPostData, CreatePostRequest, AddTagRequest, LikeResponse, PostQueryParams, UpdatePostRequest } from '../../shared/types';

const API_URL = '/api';

/**
 * Deletes a blog post by ID.
 * @param postId - The ID of the blog post to delete.
 * @returns A promise that resolves to true if the deletion was successful, or false otherwise.
 */
export async function deleteBlogPost(postId: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/posts/${postId}`, { // Corrected endpoint
            method: 'DELETE',
        });

        if (!response.ok) {
            console.error('Failed to delete blog post:', response.statusText);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return false;
    }
}

/**
 * Fetch all blog posts from the API
 */
export async function fetchBlogPosts(): Promise<BlogPostData[]> {
    try {
        const response = await fetch(`${API_URL}/posts`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

/**
 * Get a single post by ID
 * @param id - The post ID (can be string or number)
 */
export async function fetchPostById(id: string | number): Promise<BlogPostData | null> {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching post ${id}:`, error);
        return null;
    }
}

/**
 * Create a new post via API
 */
export async function createPost(postData: CreatePostRequest): Promise<BlogPostData | null> {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating post:', error);
        return null;
    }
}

/**
 * Update an existing post via API
 */
export async function updatePost(id: number, postData: UpdatePostRequest): Promise<BlogPostData | null> {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error('Failed to update post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating post:', error);
        return null;
    }
}

/**
 * Like a post via API
 */
export async function likePost(id: number): Promise<LikeResponse | null> {
    try {
        const response = await fetch(`${API_URL}/posts/${id}/like`, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Failed to like post');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error liking post ${id}:`, error);
        return null;
    }
}

/**
 * Unlike a post via API
 */
export async function unlikePost(id: number): Promise<LikeResponse | null> {
    try {
        const response = await fetch(`/api/posts/${id}/like`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to unlike post');
        return await response.json();
    } catch (error) {
        console.error('Error in unlikePost:', error);
        return null;
    }
}

/**
 * Add a tag to a post via API
 */
export async function addTagToPost(id: number, tag: string): Promise<BlogPostData | null> {
    try {
        const response = await fetch(`${API_URL}/posts/${id}/tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tag } as AddTagRequest)
        });
        if (!response.ok) {
            throw new Error('Failed to add tag');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error adding tag to post ${id}:`, error);
        return null;
    }
}