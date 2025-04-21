/**
 * Admin Dashboard entry point
 */
import { renderHeader } from '../components/navigation/header';
import { initializeAdminDashboard } from '../controllers/adminController'; // Handles core admin logic
import { initializeDarkMode, checkSystemDarkModePreference } from '../components/darkMode'; // Handles dark mode UI
// Consider importing a dedicated modal handler if logic becomes complex
// import { initializeAdminModals } from './adminModals';

/**
 * Initializes all functionality for the admin dashboard page.
 */
async function initializeAdminPage(): Promise<void> {

    try {
        // 1. Initialize UI elements like dark mode first
        checkSystemDarkModePreference(); // Check system preference on load
        initializeDarkMode(); // Setup the toggle functionality

        // 2. Initialize core admin dashboard logic (e.g., fetching data, setting up tables)
        // This function should ideally create/render the necessary DOM elements if they aren't static HTML
        await initializeAdminDashboard();

        // 3. Initialize interactive components like modals AFTER core content is ready
        initializeModalEventListeners();
        // Example: If you had more complex modal logic:
        // initializeAdminModals();

    } catch (error) {
        console.error('Error initializing admin dashboard:', error);
        // Optionally display an error message to the admin user
        const errorDisplay = document.getElementById('admin-error-display');
        if (errorDisplay) {
            errorDisplay.textContent = 'Failed to initialize admin dashboard. Please check console or try again later.';
            errorDisplay.style.display = 'block'; // Make it visible
        }
    }
}

/**
 * Sets up event listeners for the post creation/editing modal.
 * Assumes modal elements exist in the static HTML or are created by initializeAdminDashboard.
 */
function initializeModalEventListeners(): void {
    const addPostButton = document.getElementById('add-post-btn');
    const postModal = document.getElementById('post-modal');
    // Use more specific selectors if possible, especially if multiple modals exist
    const closeModalButton = postModal?.querySelector('.close-modal');
    const cancelPostButton = document.getElementById('cancel-post-btn'); // Assuming this is inside the modal

    if (!postModal) {
        console.warn('Post modal element (#post-modal) not found. Cannot initialize modal events.');
        return; // Exit if the main modal element is missing
    }

    if (addPostButton) {
        addPostButton.addEventListener('click', () => {
            postModal.classList.add('open');
        });
    } else {
        console.warn('Add post button (#add-post-btn) not found.');
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            postModal.classList.remove('open');
        });
    } else {
        console.warn('Close modal button (.close-modal) not found within #post-modal.');
    }

    if (cancelPostButton) {
        cancelPostButton.addEventListener('click', (event) => {
            event.preventDefault();
            postModal.classList.remove('open');
        });
    } else {
        console.warn('Cancel post button (#cancel-post-btn) not found.');
    }

    // Optional: Add listener to close modal if clicking outside of it
    postModal.addEventListener('click', (event) => {
        // Check if the click target is the modal backdrop itself, not its content
        if (event.target === postModal) {
            postModal.classList.remove('open');
        }
    });

     // Optional: Add listener to close modal with the Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && postModal.classList.contains('open')) {
            postModal.classList.remove('open');
        }
    });
}


// --- Main Execution ---
// Wait for the DOM to be fully loaded before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdminPage);
} else {
    // DOMContentLoaded has already fired
    initializeAdminPage();
}
