/**
 * Navigation functionality
 */

/**
 * Initialize navigation functionality
 */
export function initializeNavigation(): void {
    setActiveNavLink();
    setupNavLinks();
}

/**
 * Set active navigation link based on current URL or page section
 */
function setActiveNavLink(): void {
    const currentPath = window.location.hash || '#home';
    updateActiveNavLink(currentPath);
}

/**
 * Setup click handlers for navigation links
 */
function setupNavLinks(): void {
    const navLinks = document.querySelectorAll('header nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            if (href) {
                updateActiveNavLink(href);
            }
        });
    });
    
    // Handle special cases for popup links
    const aboutBtn = document.getElementById('about-btn');
    const contactBtn = document.getElementById('contact-btn');
    
    if (aboutBtn) {
        aboutBtn.addEventListener('click', () => {
            updateActiveNavLink('#about');
        });
    }
    
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            updateActiveNavLink('#contact');
        });
    }
}

/**
 * Update the active navigation link
 * @param path The path or section ID to activate
 */
function updateActiveNavLink(path: string): void {
    // Remove active class from all links
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to matching link
    const activeLink = document.querySelector(`header nav ul li a[href="${path}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}