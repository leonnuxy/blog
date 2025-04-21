// --- Imports ---
import { renderHeader } from '../components/navigation/header';
import { initializeMobileNav } from '../components/navigation/mobileNav';
import { initializeSearch } from '../components/search';
import { initializeNavigation } from '../components/navigation/navigation';
import { initializeAbout } from '../components/about';
import { checkSystemDarkModePreference, initializeDarkMode } from '../components/darkMode';
import { initializeBlogFrontend } from '../controllers/blogFrontendController';
import { initializePostDetailPageLogic } from '../modules/postDetail';

async function initializeClient(): Promise<void> {
  // 1) Header
  renderHeader();

  // 2) Dark mode
  checkSystemDarkModePreference();
  initializeDarkMode();

  // 3) Header widgets (only on homepage/main)
  const pageType = document.body.dataset.page;
  if (pageType !== 'post') {
    initializeMobileNav();
    initializeNavigation();
    initializeSearch();
  }

  // 4) About popup
  initializeAbout();

  // 5) Page‑specific
  const path = window.location.pathname;
  const isIndex = path === '/' || path.endsWith('/index.html');
  if (pageType === 'main' || (!pageType && isIndex)) {
    await initializeBlogFrontend();
  } else if (pageType === 'post' || path.endsWith('/post.html')) {
    await initializePostDetailPageLogic();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeClient);
} else {
  initializeClient();
}
