export interface BlogPostData {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string; // Changed from Date to string
    updatedAt?: string; // Made updatedAt optional
    tags: string[];
    imageUrl: string; // Made imageUrl required
}

export interface CreatePostRequest {
    title: string;
    content: string;
    author: string;
    tags?: string[];
    imageUrl?: string;
    createdAt?: string; // Optional, will be set server-side if missing
}

export interface UpdatePostRequest {
    title?: string;
    content?: string;
    author?: string;
    tags?: string[];
    imageUrl?: string;
    createdAt?: string; // Optional
    updatedAt?: string; // Added updatedAt, make it optional
}

export interface AddTagRequest {
    tag: string;
}

// LikeResponse interface removed as part of removing likes functionality

export interface PostQueryParams {
    tag?: string;
    author?: string;
}

export interface ErrorResponse {
    error: string;
    message?: string;
}
