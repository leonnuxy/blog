// src/entries/client.ts

// --- Imports ---
// Page Specific Logic
import { initializeBlogFrontend } from '../controllers/blogFrontendController'; 
import { initializePostDetailPageLogic } from '../modules/postDetail'; 

// Common Components & Utilities
import { renderHeader } from '../components/header'; 
import { checkSystemDarkModePreference, initializeDarkMode } from '../components/darkMode'; 
import { initializeMobileNav } from '../components/mobileNav'; // Assuming path is correct
import { initializeSearch } from '../components/search'; // Assuming path is correct
import { initializeNavigation } from '../components/navigation'; // Assuming path is correct
import { initializeAbout } from '../components/about'; // Assuming path is correct
// Import tag filtering if it sets up global listeners or needs to run early
// import { initializeTagFiltering } from '../components/tagFilter'; // Assuming path is correct

/**
 * Client-side entry point initializer.
 * Initializes common components and page-specific logic.
 */
async function initializeClient(): Promise<void> {
    console.log('Client initializing...');

    // --- Initialize Common Elements & Functionality ---
    // These run on every page that loads client.bundle.js
    try {
        // Theme and Header first
        checkSystemDarkModePreference(); 
        initializeDarkMode(); 
        console.log('Dark mode initialized globally.');
        
        // Render Header only if placeholder exists
        if (document.getElementById('header-placeholder')) {
            renderHeader(); 
            console.log('Header rendered globally.');
            
            // Wait a moment for DOM to update before initializing components dependent on header
            setTimeout(() => {
                // Initialize components dependent on header *after* rendering
                initializeMobileNav(); // Initialize mobile nav using header elements
                initializeSearch();    // Initialize search bar in header
                initializeNavigation(); // Initialize nav link active states
                console.log('Header-dependent components initialized.');
            }, 0);
        } else {
            console.warn('Header placeholder not found on this page. Skipping header-dependent initializations.');
        }

        // Initialize other common UI elements like popups
        initializeAbout();     // Assumes #about-btn and #about-popup might exist globally or are handled safely inside
        
        // Initialize tag filtering listeners if needed globally (e.g., if tags appear in header/footer)
        // initializeTagFiltering(); 

    } catch(error) {
        console.error("Error initializing common elements:", error);
    }
    // --- End Common Elements ---


    // --- Page-Specific Logic ---
    const pageType = document.body.dataset.page; 
    const currentPage = window.location.pathname; 
    const isRootOrIndex = currentPage.endsWith('/') || currentPage.endsWith('/index.html'); 

    try {
        console.log(`Detected pageType: ${pageType}, currentPage: ${currentPage}, isRootOrIndex: ${isRootOrIndex}`);

        // Check for Main Page 
        if (pageType === 'main' || (!pageType && isRootOrIndex)) {
            console.log('Initializing main blog page logic...');
            await initializeBlogFrontend(); // Handles posts, pagination, card delegation etc.
            console.log('Main blog page logic initialized.');

        // Check for Post Detail Page
        } else if (pageType === 'post' || (!pageType && currentPage.endsWith('/post.html'))) {
             console.log('Initializing post detail page logic (from module)...');
             await initializePostDetailPageLogic(); // Handles single post display, like, comments etc.
             console.log('Post detail page logic initialized.');

        // Check for Admin Page
        } else if (pageType === 'admin' || (!pageType && currentPage.endsWith('/admin.html'))) {
             console.log('Admin page detected by client.ts - no action taken.'); // Admin logic is in admin.bundle.js

        } else {
            console.log(`Unknown page type ('${pageType}') or path ('${currentPage}'). No specific initialization needed from client.ts.`);
        }
    } catch (error) {
        console.error('Error during page-specific client initialization:', error);
    }
}

// --- Global Execution ---
// Run initialization logic when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClient);
} else {
    // DOMContentLoaded has already fired
    initializeClient();
}
