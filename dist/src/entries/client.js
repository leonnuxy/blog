"use strict";
// src/entries/client.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// --- Imports ---
// Page Specific Logic
const blogFrontendController_1 = require("../controllers/blogFrontendController");
const postDetail_1 = require("../modules/postDetail");
// Common Components & Utilities
const header_1 = require("../components/header");
const darkMode_1 = require("../components/darkMode");
const mobileNav_1 = require("../components/mobileNav"); // Assuming path is correct
const search_1 = require("../components/search"); // Assuming path is correct
const navigation_1 = require("../components/navigation"); // Assuming path is correct
const about_1 = require("../components/about"); // Assuming path is correct
// Import tag filtering if it sets up global listeners or needs to run early
// import { initializeTagFiltering } from '../components/tagFilter'; // Assuming path is correct
/**
 * Client-side entry point initializer.
 * Initializes common components and page-specific logic.
 */
function initializeClient() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Client initializing...');
        // --- Initialize Common Elements & Functionality ---
        // These run on every page that loads client.bundle.js
        try {
            // Theme and Header first
            (0, darkMode_1.checkSystemDarkModePreference)();
            (0, darkMode_1.initializeDarkMode)();
            console.log('Dark mode initialized globally.');
            // Render Header only if placeholder exists
            if (document.getElementById('header-placeholder')) {
                (0, header_1.renderHeader)();
                console.log('Header rendered globally.');
                // Initialize components dependent on header *after* rendering
                (0, mobileNav_1.initializeMobileNav)(); // Initialize mobile nav using header elements
                (0, search_1.initializeSearch)(); // Initialize search bar in header
                (0, navigation_1.initializeNavigation)(); // Initialize nav link active states
            }
            else {
                console.warn('Header placeholder not found on this page. Skipping header-dependent initializations.');
            }
            // Initialize other common UI elements like popups
            (0, about_1.initializeAbout)(); // Assumes #about-btn and #about-popup might exist globally or are handled safely inside
            // Initialize tag filtering listeners if needed globally (e.g., if tags appear in header/footer)
            // initializeTagFiltering(); 
        }
        catch (error) {
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
                yield (0, blogFrontendController_1.initializeBlogFrontend)(); // Handles posts, pagination, card delegation etc.
                console.log('Main blog page logic initialized.');
                // Check for Post Detail Page
            }
            else if (pageType === 'post' || (!pageType && currentPage.endsWith('/post.html'))) {
                console.log('Initializing post detail page logic (from module)...');
                yield (0, postDetail_1.initializePostDetailPageLogic)(); // Handles single post display, like, comments etc.
                console.log('Post detail page logic initialized.');
                // Check for Admin Page
            }
            else if (pageType === 'admin' || (!pageType && currentPage.endsWith('/admin.html'))) {
                console.log('Admin page detected by client.ts - no action taken.'); // Admin logic is in admin.bundle.js
            }
            else {
                console.log(`Unknown page type ('${pageType}') or path ('${currentPage}'). No specific initialization needed from client.ts.`);
            }
        }
        catch (error) {
            console.error('Error during page-specific client initialization:', error);
        }
    });
}
// --- Global Execution ---
// Run initialization logic when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClient);
}
else {
    // DOMContentLoaded has already fired
    initializeClient();
}
