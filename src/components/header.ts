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

    // Optional: Add event listeners for header elements if needed here
    // Define the setupSearch function to handle search functionality
    function setupSearch(): void {
        const searchBar = document.querySelector('.search-bar') as HTMLInputElement | null;
        if (!searchBar) {
            console.error('Search bar element not found.');
            return;
        }

        searchBar.addEventListener('input', (event) => {
            const query = (event.target as HTMLInputElement).value;
            console.log(`Searching for: ${query}`);
        });
    }

    setupSearch(); // Setup search functionality
    // Define the setupPopupButtons function to handle popup functionality
    function setupPopupButtons(buttonId: string, popupId: string): void {
        const button = document.getElementById(buttonId);
        const popup = document.getElementById(popupId);

        if (!button || !popup) {
            console.error(`Button with ID '${buttonId}' or popup with ID '${popupId}' not found.`);
            return;
        }

        button.addEventListener('click', () => {
            popup.classList.toggle('visible'); // Toggle visibility of the popup
        });
    }

    setupPopupButtons('about-btn', 'about-popup'); // Setup popup for about button
}