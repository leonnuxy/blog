    // src/entries/client.ts

    // Imports remain the same...
    import { initializeBlogFrontend } from '../controllers/blogFrontendController'; 
    import { initializePostDetailPageLogic } from '../modules/postDetail'; 
    import { renderHeader } from '../components/header'; 
    import { checkSystemDarkModePreference, initializeDarkMode } from '../components/darkMode'; 

    /**
     * Client-side entry point initializer.
     */
    async function initializeClient(): Promise<void> {
        console.log('Client initializing...');

        // Initialize common elements first
        try {
            checkSystemDarkModePreference(); 
            initializeDarkMode(); 
            console.log('Dark mode initialized globally.');
            // Render Header only if placeholder exists
            if (document.getElementById('header-placeholder')) {
                 renderHeader(); 
                 console.log('Header rendered globally.');
            } else {
                 console.warn('Header placeholder not found on this page.');
            }
        } catch(error) {
            console.error("Error initializing common elements:", error);
        }

        // Page-specific logic
        const pageType = document.body.dataset.page; 
        const currentPage = window.location.pathname; 
        // Get the base name of the file/path, removing trailing slash if present
        const pathEnd = currentPage.endsWith('/') ? currentPage.slice(0, -1).split('/').pop() : currentPage.split('/').pop();
        const isRootOrIndex = currentPage.endsWith('/') || currentPage.endsWith('/index.html'); // Check if it's the root of the deployment

        try {
            console.log(`Detected pageType: ${pageType}, currentPage: ${currentPage}, pathEnd: ${pathEnd}, isRootOrIndex: ${isRootOrIndex}`);

            // Check for Main Page (using data-page or path ending in / or /index.html)
            if (pageType === 'main' || (!pageType && isRootOrIndex)) {
                console.log('Initializing main blog page logic...');
                await initializeBlogFrontend(); 
                console.log('Main blog page logic initialized.');

            // Check for Post Detail Page (using data-page or path ending in /post.html)
            } else if (pageType === 'post' || (!pageType && currentPage.endsWith('/post.html'))) {
                 console.log('Initializing post detail page logic (from module)...');
                 await initializePostDetailPageLogic(); 
                 console.log('Post detail page logic initialized.');

            // Check for Admin Page (using data-page or path ending in /admin.html)
            } else if (pageType === 'admin' || (!pageType && currentPage.endsWith('/admin.html'))) {
                 console.log('Admin page detected by client.ts - no action taken.');

            } else {
                console.log(`Unknown page type ('${pageType}') or path ('${currentPage}'). No specific initialization needed from client.ts.`);
            }
        } catch (error) {
            console.error('Error during page-specific client initialization:', error);
        }
    }

    // DOMContentLoaded listener remains the same...
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeClient);
    } else {
        initializeClient();
    }
    