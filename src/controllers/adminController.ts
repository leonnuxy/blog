/**
 * Admin Controller for managing blog posts and dashboard functionality
 */
import { state } from './state';
import { setupEventListeners } from './events/eventListeners';
import { loadPosts } from './postManager';
import { showToast } from '../utils/notifications';

export async function initializeAdminDashboard(): Promise<void> {
    try {
        if (state.initialized) {
            return;
        }
        state.loading = true;

        setupEventListeners();
        await loadPosts();
        
        state.initialized = true;
    } catch (error) {
        showToast('Failed to initialize dashboard', 'error');
        console.error('Dashboard initialization error:', error);
    } finally {
        state.loading = false;
    }
}