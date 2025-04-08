// Basic blog post types
export interface BlogPostData {
    id: string; // Changed id to string
    title: string;
    content: string;
    author: string;
    createdAt: string;  // Changed from Date to string
    updatedAt?: string;  // Made updatedAt optional
    tags: string[];
    likes: number;
    imageUrl?: string;  // Added imageUrl property
    comments?: Comment[]; // Added comments property
}

// Comment type
export interface Comment {
    id?: number;
    author: string;
    text: string;
    date: string; // Changed from Date to string
    postId?: number;
}

// Request types
export interface CreatePostRequest {
    title: string;
    content: string;
    author: string;
    tags?: string[];
    imageUrl?: string;
    createdAt?: string; // Optional, will be set server-side if missing
    likes?: number;    // Optional, will default to 0 if missing
}

export interface UpdatePostRequest {
    title?: string;
    content?: string;
    author?: string; //  Keep or remove if you want server control
    tags?: string[];
    imageUrl?: string;
    createdAt?: string; //  Keep or remove based on your needs
    likes?: number;    //  Keep or remove based on your needs
    updatedAt?: string;  // Add updatedAt, make it optional
}

export interface AddTagRequest {
    tag: string;
}

// Response types
export interface ErrorResponse {
    error: string;
    message?: string;
}

export interface LikeResponse {
    likes: number;
}

// Query parameter types
export interface PostQueryParams {
    tag?: string;
    author?: string;
}