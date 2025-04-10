// src/components/header.ts

/**
 * Header Component
 *
 * Renders the header section into a target container.
 *
 * @param containerId - The ID of the element to render the header into. Defaults to 'header-placeholder'.
 */
export function renderHeader(containerId: string = 'header-placeholder'): void {
    // Determine base path for proper link prefixing
    const pathParts = window.location.pathname.split('/');

    // Remove empty strings and the last part (current page)
    const depth = pathParts.filter(Boolean).length;
    const basePath = depth > 0 ? '../'.repeat(depth) : './';

    const headerContainer = document.getElementById(containerId);
    
    if (!headerContainer) {
        console.error(`Header container with ID ${containerId} not found.`);
        return;
    }

    // Get current path for active link highlighting
    const currentPath = window.location.pathname;
    
    // Define the header HTML structure using the basePath for links
    headerContainer.innerHTML = `
        <header class="site-header">
            <div class="container">
                <h1 class="site-title">
                    <a href="${basePath}">Blog</a>
                </h1>
                <nav>
                    <ul>
                        <li><a href="${basePath}" class="${currentPath === '/' || currentPath.endsWith('index.html') ? 'active' : ''}">Home</a></li>
                        <li><a href="#" id="about-btn" class="${currentPath.includes('/about') ? 'active' : ''}">About</a></li>
                    </ul>
                </nav>
                <div class="header-right">
                    <div class="search-container search-bar">
                        <input type="text" id="search-input" placeholder="Search..." aria-label="Search">
                        <button type="button" id="search-button" aria-label="Submit search">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <button id="theme-toggle" aria-label="Toggle dark mode">
                        <i class="icon-moon"></i>
                    </button>
                    <button id="hamburger-btn" class="mobile-menu-button" aria-label="Toggle mobile menu">
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </header>
        
        <!-- About Popup Modal -->
        <div id="about-popup" class="popup modal">
            <div class="popup-content modal-content">
                <button class="close-popup close-modal" aria-label="Close About Popup">&times;</button>
                <h2>About Me</h2>
                <p>Hi there, I'm Noel! With a background in computer science and experience across the full software
                    lifecycle, I love diving into complex problems, especially in full-stack development and cloud
                    solutions. But this blog isn't just about code – it's my space for sharing insights, exploring new ideas
                    in tech and life, and learning together. Thanks for stopping by!</p>
            </div>
        </div>
        
        <!-- Mobile Navigation Drawer -->
        <div id="mobile-nav-drawer" class="mobile-drawer">
            <div class="drawer-header">
                <h2>Menu</h2>
                <button id="close-drawer-btn" aria-label="Close menu">&times;</button>
            </div>
            <div class="mobile-nav">
                <!-- Navigation links will be cloned here by JS -->
            </div>
        </div>
        
        <!-- Drawer Overlay -->
        <div id="drawer-overlay" class="drawer-overlay"></div>
    `;
    
    // Event listeners should be called *after* renderHeader is executed.
}
