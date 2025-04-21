// src/components/header.ts

/**
 * Header Component
 *
 * Renders the header section into a target container.
 *
 * @param containerId - The ID of the element to render the header into. Defaults to 'header-placeholder'.
 */
export function renderHeader(containerId = 'header-placeholder'): void {
  const slot = document.getElementById(containerId);
  if (!slot) return;

  const base = './';
  slot.innerHTML = `
    <header class="site-header">
      <div class="container">
        <h1 class="site-title"><a href="${base}">Blog</a></h1>

        <!-- desktop nav -->
        <nav class="site-nav">
          <ul>
            <li><a href="${base}" class="${location.pathname === '/' ? 'active' : ''}">Home</a></li>
            <li><a href="https://noelugwoke.com" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
          </ul>
        </nav>

        <div class="header-right">
          <div class="search-container">
            <input id="search-input" type="search" placeholder="Search posts…" />
          </div>
          <button class="mobile-nav-toggle" aria-label="Open menu" aria-expanded="false">
            <i class="fas fa-bars"></i>
          </button>

          <div id="drawer-overlay" class="drawer-overlay"></div>
          <nav id="mobile-nav-drawer" class="mobile-nav-drawer" aria-label="Mobile menu">
            <div class="drawer-search-container">
              <input id="search-input-mobile"
                     type="search"
                     placeholder="Search posts…"
                     aria-label="Search posts" />
            </div>
            <button class="close-drawer-btn" aria-label="Close menu">
              <i class="fas fa-times"></i>
            </button>
            <ul class="mobile-nav-list">
              <li><a href="./" class="${location.pathname === '/' ? 'active' : ''}">Home</a></li>
              <li><a href="https://noelugwoke.com" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  `;
}