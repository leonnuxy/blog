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

        <nav class="site-nav">
          <ul>
            <li><a href="https://noelugwoke.com" target="_blank">Portfolio</a></li>
          </ul>
        </nav>

        <div class="header-right">
          <!-- desktop search -->
          <div class="search-container">
            <input id="search-input" type="search" placeholder="Search posts…" />
          </div>

          <!-- hamburger -->
          <button class="mobile-nav-toggle" aria-label="Open menu" aria-expanded="false">
            <i class="fas fa-bars"></i>
          </button>

          <!-- backdrop -->
          <div id="drawer-overlay" class="drawer-overlay"></div>

          <!-- drawer -->
          <nav id="mobile-nav-drawer" class="mobile-nav-drawer" aria-label="Mobile menu">
            <button class="close-drawer-btn" aria-label="Close menu">
              <i class="fas fa-times"></i>
            </button>

            <ul class="mobile-nav-list">
              <li><a href="https://noelugwoke.com" target="_blank">Portfolio</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  `;
}
