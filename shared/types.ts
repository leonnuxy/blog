export interface BlogPostData {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string; // Changed from Date to string
    updatedAt?: string; // Made updatedAt optional
    tags: string[];
    likes: number;
    imageUrl?: string; // Added imageUrl property
    comments?: Comment[]; // Added comments property
}

export interface Comment {
    id?: number;
    author: string;
    text: string;
    date: string; // Changed from Date to string
    postId?: number;
}

export interface CreatePostRequest {
    title: string;
    content: string;
    author: string;
    tags?: string[];
    imageUrl?: string;
    createdAt?: string; // Optional, will be set server-side if missing
    likes?: number; // Optional, will default to 0 if missing
}

export interface UpdatePostRequest {
    title?: string;
    content?: string;
    author?: string;
    tags?: string[];
    imageUrl?: string;
    createdAt?: string; // Optional
    likes?: number; // Optional
    updatedAt?: string; // Added updatedAt, make it optional
}

export interface AddTagRequest {
    tag: string;
}

export interface LikeResponse {
    likes: number;
}

export interface PostQueryParams {
    tag?: string;
    author?: string;
}

export interface ErrorResponse {
    error: string;
    message?: string;
}
