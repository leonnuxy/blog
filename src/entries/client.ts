// src/entries/client.ts

// --- Imports ---
// Page‑specific logic
import { initializeBlogFrontend }       from '../controllers/blogFrontendController';
import { initializePostDetailPageLogic } from '../modules/postDetail';

// Common components & utilities
import { renderHeader }               from '../components/navigation/header';
import { initializeMobileNav }        from '../components/navigation/mobileNav';
import { initializeSearch }           from '../components/search';
import { initializeNavigation }       from '../components/navigation/navigation';
import { checkSystemDarkModePreference, initializeDarkMode }
                                      from '../components/darkMode';
import { initBackgroundImageLazyLoading, initImageFadeIn } 
                                          from '../utils/lazyLoader';

async function initializeClient(): Promise<void> {
  console.log('Client initializing…');

  // 1) Inject our single header into the placeholder
  renderHeader();

  // 2) Theme + dark mode
  checkSystemDarkModePreference();
  initializeDarkMode();

  // 3) Always wire up header widgets (mobile menu, site nav, search)
  //    (so the drawer works on both main and post pages)
  initializeMobileNav();
  initializeNavigation();
  initializeSearch();
  
  // 4) Page‑specific logic & Lazy Loading Initialization
  const path = window.location.pathname;
  const isIndex = path === '/' || path.endsWith('/index.html');
  const pageType = document.body.dataset.page;

  try {
    if (pageType === 'main' || (!pageType && isIndex)) {
      console.log('Initializing main blog page…');
      await initializeBlogFrontend();
      console.log('Main page ready.');
      // Initialize lazy loading AFTER main content is loaded
      initBackgroundImageLazyLoading('.blog-card'); 
      initImageFadeIn('.hero-grid img[loading="lazy"]'); // Target hero images specifically
    } else if (pageType === 'post' || path.endsWith('/post.html')) {
      console.log('Initializing post detail page…');
      await initializePostDetailPageLogic();
      console.log('Post detail ready.');
      // Initialize lazy loading AFTER post content is loaded
      initImageFadeIn('.post-featured-image[loading="lazy"]'); // Target post image specifically
    } else {
      console.log(`No page‑specific logic for pageType="${pageType}", path="${path}".`);
    }
  } catch (e) {
    console.error('Error during page‑specific init:', e);
  }
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeClient);
} else {
  initializeClient();
}
