// src/components/navigation/mobileNav.ts

export function initializeMobileNav(): void {
  const toggleBtn = document.querySelector<HTMLButtonElement>('.mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('drawer-overlay');

  if (!toggleBtn || !drawer || !overlay) {
    console.warn('Mobile nav elements not found; skipping initialization.');
    return;
  }

  const closeBtn = drawer.querySelector<HTMLButtonElement>('.close-drawer-btn');
  const navLinks = drawer.querySelectorAll<HTMLAnchorElement>('.mobile-nav-list a');

  if (!closeBtn) {
    console.warn('Close button not found; skipping initialization.');
    return;
  }

  const openMenu = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  // Event listeners
  toggleBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  
  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}