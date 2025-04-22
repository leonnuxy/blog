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
// Page‑specific logic
const blogFrontendController_1 = require("../controllers/blogFrontendController");
const postDetail_1 = require("../modules/postDetail");
// Common components & utilities
const header_1 = require("../components/navigation/header");
const mobileNav_1 = require("../components/navigation/mobileNav");
const search_1 = require("../components/search");
const navigation_1 = require("../components/navigation/navigation");
const darkMode_1 = require("../components/darkMode");
const lazyLoader_1 = require("../utils/lazyLoader");
function initializeClient() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Client initializing…');
        // 1) Inject our single header into the placeholder
        (0, header_1.renderHeader)();
        // 2) Theme + dark mode
        (0, darkMode_1.checkSystemDarkModePreference)();
        (0, darkMode_1.initializeDarkMode)();
        // 3) Always wire up header widgets (mobile menu, site nav, search)
        //    (so the drawer works on both main and post pages)
        (0, mobileNav_1.initializeMobileNav)();
        (0, navigation_1.initializeNavigation)();
        (0, search_1.initializeSearch)();
        // 4) Page‑specific logic & Lazy Loading Initialization
        const path = window.location.pathname;
        const isIndex = path === '/' || path.endsWith('/index.html');
        const pageType = document.body.dataset.page;
        try {
            if (pageType === 'main' || (!pageType && isIndex)) {
                console.log('Initializing main blog page…');
                yield (0, blogFrontendController_1.initializeBlogFrontend)();
                console.log('Main page ready.');
                // Initialize lazy loading AFTER main content is loaded
                (0, lazyLoader_1.initBackgroundImageLazyLoading)('.blog-card');
                (0, lazyLoader_1.initImageFadeIn)('.hero-grid img[loading="lazy"]'); // Target hero images specifically
            }
            else if (pageType === 'post' || path.endsWith('/post.html')) {
                console.log('Initializing post detail page…');
                yield (0, postDetail_1.initializePostDetailPageLogic)();
                console.log('Post detail ready.');
                // Initialize lazy loading AFTER post content is loaded
                (0, lazyLoader_1.initImageFadeIn)('.post-featured-image[loading="lazy"]'); // Target post image specifically
            }
            else {
                console.log(`No page‑specific logic for pageType="${pageType}", path="${path}".`);
            }
        }
        catch (e) {
            console.error('Error during page‑specific init:', e);
        }
    });
}
// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClient);
}
else {
    initializeClient();
}
