import { CreatePostRequest } from '../../shared/types';
import { showToast } from './notifications';

export function validatePostData(data: CreatePostRequest): boolean {
    if (!data.title || data.title.length < 3) {
        showToast('Title must be at least 3 characters long', 'error');
        return false;
    }
    if (!data.content || data.content.length < 10) {
        showToast('Content must be at least 10 characters long', 'error');
        return false;
    }
    if (!data.author) {
        showToast('Author name is required', 'error');
        return false;
    }
    return true;
}