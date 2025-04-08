// About popup functionality

/**
 * Initialize the About section popup
 */
export function initializeAbout(): void {
    const aboutBtn = document.getElementById('about-btn');
    const aboutPopup = document.getElementById('about-popup');
    const closePopup = document.querySelector('#about-popup .close-popup');
    
    if (!aboutBtn || !aboutPopup || !closePopup) {
        console.warn('About popup elements not found in the DOM');
        return;
    }
    
    // Open popup when about button is clicked
    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        aboutPopup.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while popup is open
        
        // Add active class to about link
        aboutBtn.classList.add('active');
    });
    
    // Close popup when close button is clicked
    closePopup.addEventListener('click', () => {
        aboutPopup.classList.remove('open');
        document.body.style.overflow = '';
        
        // Revert to home active state when closing popup
        setDefaultActiveLink();
    });
    
    // Close when clicking outside the popup content
    aboutPopup.addEventListener('click', (e) => {
        if (e.target === aboutPopup) {
            aboutPopup.classList.remove('open');
            document.body.style.overflow = '';
            
            // Revert to home active state when closing popup
            setDefaultActiveLink();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutPopup.classList.contains('open')) {
            aboutPopup.classList.remove('open');
            document.body.style.overflow = '';
            
            // Revert to home active state when closing popup
            setDefaultActiveLink();
        }
    });
}

/**
 * Helper function to set the default active link state
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