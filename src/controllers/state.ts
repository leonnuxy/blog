import { BlogPostData } from '../../shared/types';

/**
 * Simplified state management for static frontend
 */

// Admin dashboard state
export interface AdminState {
    currentPage: number;
    postsPerPage: number;
    totalPages: number;
    posts: BlogPostData[];
    loading: boolean;
    searchTerm: string;
    sortBy: 'newest' | 'oldest' | 'title';
    initialized: boolean;
}

// Global frontend state (used across multiple components)
export interface FrontendState {
    darkMode: boolean;
    currentPostId?: string | number;
    postsPerPage: number;
    filteredTag?: string;
}

// Initialize admin state
export const state: AdminState = {
    currentPage: 1,
    postsPerPage: 10,
    totalPages: 1,
    posts: [],
    loading: false,
    searchTerm: '',
    sortBy: 'newest',
    initialized: false
};

// Initialize frontend state
export const frontendState: FrontendState = {
    darkMode: false,
    postsPerPage: 6, // Show 6 posts initially on frontend
    filteredTag: undefined
};

// State change event for components to react to state changes
export const dispatchStateChange = (stateType: 'admin' | 'frontend', property: string) => {
    document.dispatchEvent(new CustomEvent('stateChange', { 
        detail: { type: stateType, property } 
    }));
};