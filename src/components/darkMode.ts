// src/components/darkMode.ts

// Let TS know about our global theme‐swap helper
declare global {
  interface Window {
    setPrismTheme?: (isDark: boolean) => void;
  }
}

const STORAGE_KEY = 'darkMode';

/**
 * Initialize dark mode toggle
 * This creates a floating dark mode toggle button and adds it to the DOM
 */
export function initializeDarkMode(): void {
  // Create dark mode toggle button
  const darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');

  // Icon + initial state
  const isDarkMode = localStorage.getItem(STORAGE_KEY) === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Apply Prism theme to match
  window.setPrismTheme?.(isDarkMode);

  // Wire up click
  darkModeToggle.addEventListener('click', toggleDarkMode);

  // Append to body
  document.body.appendChild(darkModeToggle);
}

/**
 * Toggle dark mode on and off
 */
function toggleDarkMode(): void {
  const isNowDark = document.body.classList.toggle('dark-mode');
  const toggleBtn = document.querySelector<HTMLButtonElement>('.dark-mode-toggle');

  // Swap icon
  if (toggleBtn) {
    toggleBtn.innerHTML = isNowDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }

  // Persist
  localStorage.setItem(STORAGE_KEY, String(isNowDark));

  // Swap Prism theme
  window.setPrismTheme?.(isNowDark);
}

/**
 * Check system preference on first load
 * If the user has no stored preference, respect prefers‐color‐scheme
 */
export function checkSystemDarkModePreference(): void {
  if (localStorage.getItem(STORAGE_KEY) !== null) {
    return; // user already chose
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.body.classList.add('dark-mode');
    localStorage.setItem(STORAGE_KEY, 'true');
    // Update any existing toggle icon if already rendered
    const toggleBtn = document.querySelector<HTMLButtonElement>('.dark-mode-toggle');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    // Swap Prism theme
    window.setPrismTheme?.(true);
  }
}
