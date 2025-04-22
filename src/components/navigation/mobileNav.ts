// src/components/navigation/mobileNav.ts

export function initializeMobileNav(): void {
  const toggleBtn = document.querySelector<HTMLButtonElement>('.mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (!toggleBtn || !drawer || !overlay) return;

  const closeBtn = drawer.querySelector<HTMLButtonElement>('.close-drawer-btn');
  if (!closeBtn) return;

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

  toggleBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // If a nav link is clicked, also close
  drawer.querySelectorAll('.mobile-nav-list a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // ** NEW **: wire up the mobile “Search” button
  const searchBtn = document.getElementById('drawer-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      // close the drawer first
      closeMenu();
      // then navigate to homepage with showSearch flag
      const prefix = window.location.pathname.includes('/blog/') ? '/blog/' : '/';
      window.location.href = `${prefix}?showSearch=1`;
    });
  }

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close menu when clicking outside the drawer and toggle button
  document.addEventListener('mousedown', (event) => {
    if (
      drawer.classList.contains('open') &&
      !drawer.contains(event.target as Node) &&
      !toggleBtn.contains(event.target as Node)
    ) {
      closeMenu();
    }
  });
}