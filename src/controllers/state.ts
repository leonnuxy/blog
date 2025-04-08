import { BlogPostData } from '../../shared/types';

export interface AdminState {
    currentPage: number;
    postsPerPage: number;
    totalPages: number;
    posts: BlogPostData[];
    loading: boolean;
    searchTerm: string;
    sortBy: 'newest' | 'oldest' | 'title' | 'likes';
    initialized: boolean;
}

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