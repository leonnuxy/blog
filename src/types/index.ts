/**
 * Frontend-specific type definitions
 * Re-exports shared types from the shared/types.ts file
 * and adds any frontend-specific types needed
 */

// Re-export all shared types
export * from '../../shared/types';

/**
 * Frontend-only types
 */

// Comment type (frontend only, not part of the shared API)
export interface Comment {
    id?: number;
    author: string;
    text: string;
    date: string;
    postId?: number;
}

/**
 * Frontend-specific extensions of shared types
 */

// No likes or comments in the shared BlogPostData interface
// If needed in the future, implement as frontend-specific extensions:
/*
export interface FrontendBlogPostData extends BlogPostData {
    // Add frontend-specific properties here
}
*/