export function initializeMobileNav(): void {
    const hamburgerBtn = document.getElementById('hamburger-btn'); // Ensure this ID matches the button in header.js
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const mobileNavContainer = drawer?.querySelector('.mobile-nav');
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
            const clonedLink = link.cloneNode(true) as HTMLAnchorElement;
            // Optional: Add specific classes or modify attributes for mobile if needed
            mobileNavContainer.appendChild(clonedLink);
        });
    };

    // --- Drawer/Overlay Open/Close Logic ---
    const openBtn = document.querySelector('.mobile-nav-toggle')!;
    const closeBtn = drawer.querySelector('.close-drawer-btn')!;

    openBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      overlay.classList.add('open');
    });
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
    });
    overlay.addEventListener('click', () => {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
    });

    // Close drawer when a link inside it is clicked
    mobileNavContainer.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).tagName === 'A') {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
        }
    });

    // --- Initialization ---
    cloneNavLinks(); // Initial population

    // Optional: Re-clone if desktop nav might change dynamically (e.g., login/logout)
    // You might need a more robust way to handle dynamic updates if required.
}
