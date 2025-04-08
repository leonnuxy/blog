"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPost = deleteBlogPost;
exports.fetchBlogPosts = fetchBlogPosts;
exports.fetchPostById = fetchPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.likePost = likePost;
exports.unlikePost = unlikePost;
exports.addTagToPost = addTagToPost;
const API_URL = '/api';
/**
 * Deletes a blog post by ID.
 * @param postId - The ID of the blog post to delete.
 * @returns A promise that resolves to true if the deletion was successful, or false otherwise.
 */
function deleteBlogPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                console.error('Failed to delete blog post:', response.statusText);
                return false;
            }
            return true;
        }
        catch (error) {
            console.error('Error deleting blog post:', error);
            return false;
        }
    });
}
/**
 * Fetch all blog posts from the API
 */
function fetchBlogPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return yield response.json();
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    });
}
/**
 * Get a single post by ID
 * @param id - The post ID (can be string or number)
 */
function fetchPostById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            return yield response.json();
        }
        catch (error) {
            console.error(`Error fetching post ${id}:`, error);
            return null;
        }
    });
}
/**
 * Create a new post via API
 */
function createPost(postData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            return yield response.json();
        }
        catch (error) {
            console.error('Error creating post:', error);
            return null;
        }
    });
}
/**
 * Update an existing post via API
 */
function updatePost(id, postData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to update post');
            }
            return yield response.json();
        }
        catch (error) {
            console.error('Error updating post:', error);
            return null;
        }
    });
}
/**
 * Like a post via API
 */
function likePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts/${id}/like`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Failed to like post');
            }
            return yield response.json();
        }
        catch (error) {
            console.error(`Error liking post ${id}:`, error);
            return null;
        }
    });
}
/**
 * Unlike a post via API
 */
function unlikePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/api/posts/${id}/like`, { method: 'DELETE' });
            if (!response.ok)
                throw new Error('Failed to unlike post');
            return yield response.json();
        }
        catch (error) {
            console.error('Error in unlikePost:', error);
            return null;
        }
    });
}
/**
 * Add a tag to a post via API
 */
function addTagToPost(id, tag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/posts/${id}/tags`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tag })
            });
            if (!response.ok) {
                throw new Error('Failed to add tag');
            }
            return yield response.json();
        }
        catch (error) {
            console.error(`Error adding tag to post ${id}:`, error);
            return null;
        }
    });
}
