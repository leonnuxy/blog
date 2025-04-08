// src/components/header.ts

/**
 * Header Component
 * Renders the header section into a target container.
 * @param containerId - The ID of the element to render the header into. Defaults to 'header-placeholder'.
 */
export function renderHeader(containerId: string = 'header-placeholder'): void {
    // Ensure running in a browser environment
    if (typeof document === 'undefined') {
        return;
    }

    // Find the container element where the header should be placed
    const headerContainer = document.getElementById(containerId);
    if (!headerContainer) {
        console.error(`Header container with ID '${containerId}' not found in the DOM.`);
        return;
    }

    // Define the header HTML structure - matching index.html
    headerContainer.innerHTML = `
        <header class="site-header">
            <h1><a href="/">Blog</a></h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li> 
                    <li><a href="/#about" id="about-btn">About</a></li>
                    <li><a href="/#portfolio">Portfolio</a></li>
                    <li><a href="/#contact" id="contact-btn">Contact</a></li>
                </ul>
            </nav>
            <input type="search" placeholder="Search for articles..." class="search-bar"> 
        </header>
    `;

   
}