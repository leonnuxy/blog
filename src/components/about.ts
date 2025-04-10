// src/components/about.ts

// About popup functionality

/**
 * Initialize the About section popup
 */
export function initializeAbout(): void {
    // Get DOM elements
    const aboutBtn = document.getElementById('about-btn');
    const aboutPopup = document.getElementById('about-popup');
    const closePopup = document.querySelector('#about-popup .close-popup');

    // Exit if required elements don't exist
    if (!aboutBtn || !aboutPopup || !closePopup) {
        console.warn('About popup elements not found in the DOM');
        return;
    }

    /**
     * Close popup and reset state
     */
    const closeAboutPopup = () => {
        aboutPopup.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
        setDefaultActiveLink(); // Reset navigation highlighting
    };

    // --- Event Listeners ---
    // Open popup when about button is clicked
    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        aboutPopup.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while popup is open
        aboutBtn.classList.add('active'); // Highlight nav item
    });

    // Close popup when close button is clicked
    closePopup.addEventListener('click', closeAboutPopup);

    // Close when clicking outside the popup content
    aboutPopup.addEventListener('click', (e) => {
        if (e.target === aboutPopup) {
            closeAboutPopup();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutPopup.classList.contains('open')) {
            closeAboutPopup();
        }
    });
}

/**
 * Helper function to set the default active link state
 * in the navigation based on the current URL hash
 */
function setDefaultActiveLink(): void {
    // Get current hash or default to home
    const currentHash = window.location.hash || '#home';

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));

    // Add active class to current hash link
    const currentLink = document.querySelector(`header nav ul li a[href="${currentHash}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
}