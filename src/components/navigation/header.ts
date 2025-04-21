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
        <h1 class="site-title">
          <a href="${base}">Blog</a>
        </h1>
        <nav class="site-nav">
          <ul>
            <li><a href="${base}"               class="${location.pathname.endsWith('index.html')||location.pathname==='/'?'active':''}">Home</a></li>
            <li><a href="${base}about.html"     class="${location.pathname.endsWith('about.html')?'active':''}">About</a></li>
            <li><a href="${base}contact.html"   class="${location.pathname.endsWith('contact.html')?'active':''}">Contact</a></li>
          </ul>
        </nav>
        <div class="header-right">
          <div class="search-container">
            <input
              id="search-input"
              type="search"
              placeholder="Search posts…"
              aria-label="Search posts"/>
          </div>
        </div>
      </div>
    </header>
  `;
}
