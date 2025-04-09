// src/components/header.ts

/**
 * Header Component
 * Renders the header section into a target container.
 * Event listeners should be attached separately after calling this function.
 * @param containerId - The ID of the element to render the header into. Defaults to 'header-placeholder'.
 */
export function renderHeader(containerId: string = 'header-placeholder'): void {
    // Ensure running in a browser environment
    if (typeof document === 'undefined') {
        return;
    }

    const headerContainer = document.getElementById(containerId);
    if (!headerContainer) {
        return;
    }

    // --- Determine Base Path based on Environment ---
    // Checks if running on the production custom domain root or github.io
    // Adjust 'noelugwoke.com' if your actual production hostname differs
    const isProduction = window.location.hostname === 'noelugwoke.com' || window.location.hostname.endsWith('.github.io'); 
    // Define the base path for links. Assumes deployment is under /blog/ on production.
    // *** IMPORTANT: Change '/blog/' if your GitHub repo name (and thus subdirectory) is different ***
    const basePath = isProduction ? '/blog/' : '/'; 
    // --- End Base Path Logic ---


    // Define the header HTML structure using the basePath for links
    headerContainer.innerHTML = `
        <header class="site-header">
            <h1><a href="${basePath}">Blog</a></h1> 
            <nav>
                <ul>
                    <li><a href="${basePath}">Home</a></li> 
                    <li><a href="${basePath}#about" id="about-btn">About</a></li>
                    <li><a href="https://noelugwoke.com/">Portfolio</a></li>
                </ul>
            </nav>
            <input type="search" placeholder="Search for articles..." class="search-bar"> 
        </header>
    `;

    // Event listeners should be called *after* renderHeader is executed.
}
