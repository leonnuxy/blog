"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const darkMode_1 = require("./darkMode");
const blogLoader_1 = require("./blogLoader");
const header_1 = require("./header"); // Assuming you have this
const mobileNav_1 = require("./mobileNav"); // Import mobile nav
const search_1 = require("./search");
const tagFilter_1 = require("./tagFilter");
// ... other imports
document.addEventListener('DOMContentLoaded', () => {
    (0, header_1.initializeHeader)(); // Make sure header (with hamburger) is loaded first
    (0, darkMode_1.initializeDarkMode)();
    (0, mobileNav_1.initializeMobileNav)(); // Initialize the mobile navigation
    (0, search_1.initializeSearch)(); // Initialize search functionality
    (0, tagFilter_1.initializeTagFiltering)(); // Initialize tag filtering
    // Load posts only on the main page or blog page
    if (document.body.dataset.page === 'main' || document.body.dataset.page === 'blog') {
        (0, blogLoader_1.loadBlogPosts)().then(() => {
            (0, blogLoader_1.initializeLoadMore)();
            // Potentially re-initialize search/filter listeners if posts load async
        });
    }
    // Initialize popups/modals if they exist on the page
    // Example: initializePopup('about-popup', 'about-link'); // If you have links to open them
});
