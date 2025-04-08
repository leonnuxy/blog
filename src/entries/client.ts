// src/entries/client.ts

// Imports for the functions to be called
import { initializeBlogFrontend } from '../controllers/blogFrontendController'; // For main page (index.html)

// Import the specific initialization function for the post detail page (Option B)
import { initializePostDetailPageLogic } from '../modules/postDetail'; // Adjust path if your module is elsewhere

// Import common components needed on potentially multiple pages
import { renderHeader } from '../components/header'; 
import { checkSystemDarkModePreference, initializeDarkMode } from '../components/darkMode'; 

/**
 * Client-side entry point initializer.
 * Determines the current page and runs the appropriate logic.
 */
async function initializeClient(): Promise<void> {
    console.log('Client initializing...');

    // --- Initialize common elements first ---
    try {
        checkSystemDarkModePreference(); 
        initializeDarkMode(); 
        console.log('Dark mode initialized globally.');
        renderHeader(); 
        console.log('Header rendered globally.');
    } catch(error) {
        console.error("Error initializing common elements:", error);
    }
    // --- End common elements ---


    // --- Page-specific logic ---
    const pageType = document.body.dataset.page; // Use data attribute from <body>
    const currentPage = window.location.pathname; // Fallback path

    try {
        console.log(`Detected pageType: ${pageType}, currentPage: ${currentPage}`);

        // Check for Main Page (index.html served at /)
        // Use data-page="main" primarily, fall back to path check for '/' or '/index.html'
        if (pageType === 'main' || (!pageType && (currentPage === '/' || currentPage.endsWith('/index.html')))) {
            console.log('Initializing main blog page logic...');
            await initializeBlogFrontend(); // Initialize blog cards, pagination etc. for the main page
            console.log('Main blog page logic initialized.');

        // Check for Post Detail Page (post.html served at /post.html)
        } else if (pageType === 'post' || (!pageType && currentPage.endsWith('/post.html'))) {
             console.log('Initializing post detail page logic (from module)...');
             // Call the refactored function from the module.
             // It handles getting the postId from the URL internally.
             await initializePostDetailPageLogic(); 
             console.log('Post detail page logic initialized.');

        // Check for Admin Page (admin.html served at /admin.html)
        } else if (pageType === 'admin' || (!pageType && currentPage.endsWith('/admin.html'))) {
             // This bundle (client.bundle.js) shouldn't run admin-specific init logic.
             // admin.bundle.js handles that page.
             console.log('Admin page detected by client.ts - no action taken.');

        } else {
            console.log(`Unknown page type ('${pageType}') or path ('${currentPage}'). No specific initialization needed from client.ts.`);
        }
    } catch (error) {
        console.error('Error during page-specific client initialization:', error);
    }
}

// Ensure the DOM is fully loaded before running initialization logic
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClient);
} else {
    // DOMContentLoaded has already fired
    initializeClient();
}
