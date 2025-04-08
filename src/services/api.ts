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

/**
 * Fetch all blog posts directly from the static JSON file.
 */
export async function fetchBlogPosts(): Promise<BlogPostData[]> {
    // Construct the path relative to the HTML file loading the script.
    // Assumes posts.json is copied to 'docs/data/posts.json' by the workflow.
    // And HTML files are at the root of 'docs'.
    const dataUrl = 'data/posts.json'; 
    console.log(`Fetching static data from: ${dataUrl}`);
    try {
        const response = await fetch(dataUrl); 
        if (!response.ok) {
            throw new Error(`Failed to fetch ${dataUrl}: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Assuming the JSON structure is { posts: [...] } 
        // or maybe just an array [...] directly? Adjust based on your posts.json structure.
        // If posts.json is just an array: return data || [];
        return data.posts || []; // Use this if posts.json has { "posts": [...] }
    } catch (error) {
        console.error('Error fetching static posts.json:', error);
        return []; // Return empty array on error
    }
}

/**
 * Get a single post by ID by filtering the static JSON data.
 * Note: This loads ALL posts just to find one - less efficient than an API.
 * @param id - The post ID (string or number)
 */
export async function fetchPostById(id: string | number): Promise<BlogPostData | null> {
    try {
        const allPosts = await fetchBlogPosts(); // Fetch all posts from JSON
        // Ensure consistent ID comparison (e.g., comparing numbers)
        const postIdNumber = typeof id === 'string' ? parseInt(id, 10) : id; 
        if (isNaN(postIdNumber)) {
            console.error(`Invalid post ID provided: ${id}`);
            return null;
        }
        
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

// --- Comment API Placeholders (Need separate service or backend) ---
// These would need to be implemented using a third-party service (like Disqus)
// or a serverless backend if you want comments on a static site.

export async function fetchCommentsApi(postId: string): Promise<any[]> {
    console.warn("Comments cannot be fetched on static site without external service/backend.");
    return []; // Return empty array
}

export async function submitCommentApi(postId: string, name: string, comment: string): Promise<any> {
     console.error("Cannot submit comment on static site without external service/backend.");
     throw new Error("Comment submission not available.");
}

