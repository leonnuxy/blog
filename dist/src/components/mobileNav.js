"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeMobileNav = initializeMobileNav;
function initializeMobileNav() {
    const hamburgerBtn = document.getElementById('hamburger-btn'); // Ensure this ID matches the button in header.js
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const mobileNavContainer = drawer === null || drawer === void 0 ? void 0 : drawer.querySelector('.mobile-nav');
    const desktopNav = document.querySelector('.site-header nav ul'); // Get the desktop nav list
    if (!hamburgerBtn || !closeDrawerBtn || !drawer || !overlay || !mobileNavContainer || !desktopNav) {
        console.warn('Mobile navigation elements not found. Skipping initialization.');
        return;
    }
    // --- Clone Desktop Nav Links to Mobile Drawer ---
    const cloneNavLinks = () => {
        mobileNavContainer.innerHTML = ''; // Clear existing links
        const desktopLinks = desktopNav.querySelectorAll('li a');
        desktopLinks.forEach(link => {
            const clonedLink = link.cloneNode(true);
            // Optional: Add specific classes or modify attributes for mobile if needed
            mobileNavContainer.appendChild(clonedLink);
        });
    };
    // --- Event Listeners ---
    const openDrawer = () => {
        drawer.classList.add('open');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };
    const closeDrawer = () => {
        drawer.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.style.overflow = ''; // Restore scrolling
    };
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering overlay click
        openDrawer();
    });
    closeDrawerBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
    // Close drawer when a link inside it is clicked
    mobileNavContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            closeDrawer();
        }
    });
    // --- Initialization ---
    cloneNavLinks(); // Initial population
    // Optional: Re-clone if desktop nav might change dynamically (e.g., login/logout)
    // You might need a more robust way to handle dynamic updates if required.
}
