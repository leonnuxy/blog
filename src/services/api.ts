// src/services/api.ts
import { BlogPostData, LikeResponse } from '../../shared/types'; // Assuming types are still relevant

// API_URL constant is not needed when fetching static file directly
// const API_URL = '/api'; 

// --- Functions relying on backend API (Will NOT work on GitHub Pages) ---
// These functions will fail silently or log errors in the console on the static site.

export async function likePost(id: number): Promise<LikeResponse | null> {
    console.error(`Like functionality requires a backend. Cannot LIKE post ${id} on static site.`);
    // Return null or a default structure if your calling code expects it
    return null; 
}

export async function unlikePost(id: number): Promise<LikeResponse | null> {
    console.error(`Unlike functionality requires a backend. Cannot UNLIKE post ${id} on static site.`);
     // Return null or a default structure
    return null;
}

export async function deleteBlogPost(postId: string): Promise<boolean> {
    console.error("Cannot delete post on static site. Backend API required.");
    return false;
}

export async function createPost(postData: any): Promise<BlogPostData | null> {
     console.error("Cannot create post on static site. Backend API required.");
     return null;
}

export async function updatePost(id: number, postData: any): Promise<BlogPostData | null> {
     console.error("Cannot update post on static site. Backend API required.");
     return null;
}

export async function addTagToPost(id: number, tag: string): Promise<BlogPostData | null> {
     console.error("Cannot add tag on static site. Backend API required.");
     return null;
}


// --- Functions modified for static data ---
const STATIC_DATA_URL = 'data/posts.json'; // Define relative path once

/**
 * Fetch all blog posts directly from the static JSON file.
 */
export async function fetchBlogPosts(): Promise<BlogPostData[]> {
    try {
        // Fetch the JSON file using the relative path
        const response = await fetch(STATIC_DATA_URL); 
        if (!response.ok) {
            throw new Error(`Failed to fetch ${STATIC_DATA_URL}: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Assuming the JSON structure is { posts: [...] } 
        return data.posts || []; 
    } catch (error) {
        console.error(`Error fetching static ${STATIC_DATA_URL}:`, error);
        return []; // Return empty array on error
    }
}

/**
 * Get a single post by ID by filtering the static JSON data.
 * @param id - The post ID (string or number)
 */
export async function fetchPostById(id: string | number): Promise<BlogPostData | null> {
    try {
        // Fetch all posts first
        const allPosts = await fetchBlogPosts(); 
        const postIdNumber = typeof id === 'string' ? parseInt(id, 10) : id; 
        if (isNaN(postIdNumber)) {
            console.error(`Invalid post ID provided: ${id}`);
            return null;
        }
        
        // Find the specific post
        const post = allPosts.find(p => Number(p.id) === postIdNumber);
        
        if (!post) {
             console.warn(`Post with ID ${id} not found in static data.`);
             return null;
        }
        console.log(`Found post ${id} in static data.`);
        return post;
    } catch (error) {
        console.error(`Error fetching static post ${id}:`, error);
        return null;
    }
}

// --- Comment API Placeholders ---
export async function fetchCommentsApi(postId: string): Promise<any[]> {
    console.warn("Comments cannot be fetched on static site without external service/backend.");
    return []; 
}
export async function submitCommentApi(postId: string, name: string, comment: string): Promise<any> {
     console.error("Cannot submit comment on static site without external service/backend.");
     throw new Error("Comment submission not available.");
}
