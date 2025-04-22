"use strict";
// src/components/darkMode.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDarkMode = initializeDarkMode;
exports.checkSystemDarkModePreference = checkSystemDarkModePreference;
const STORAGE_KEY = 'darkMode';
/**
 * Initialize dark mode toggle
 * This creates a floating dark mode toggle button and adds it to the DOM
 */
function initializeDarkMode() {
    var _a;
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    // Icon + initial state
    const isDarkMode = localStorage.getItem(STORAGE_KEY) === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    // Apply Prism theme to match
    (_a = window.setPrismTheme) === null || _a === void 0 ? void 0 : _a.call(window, isDarkMode);
    // Wire up click
    darkModeToggle.addEventListener('click', toggleDarkMode);
    // Append to body
    document.body.appendChild(darkModeToggle);
}
/**
 * Toggle dark mode on and off
 */
function toggleDarkMode() {
    var _a;
    const isNowDark = document.body.classList.toggle('dark-mode');
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    // Swap icon
    if (toggleBtn) {
        toggleBtn.innerHTML = isNowDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
    // Persist
    localStorage.setItem(STORAGE_KEY, String(isNowDark));
    // Swap Prism theme
    (_a = window.setPrismTheme) === null || _a === void 0 ? void 0 : _a.call(window, isNowDark);
}
/**
 * Check system preference on first load
 * If the user has no stored preference, respect prefers‐color‐scheme
 */
function checkSystemDarkModePreference() {
    var _a;
    if (localStorage.getItem(STORAGE_KEY) !== null) {
        return; // user already chose
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem(STORAGE_KEY, 'true');
        // Update any existing toggle icon if already rendered
        const toggleBtn = document.querySelector('.dark-mode-toggle');
        if (toggleBtn)
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        // Swap Prism theme
        (_a = window.setPrismTheme) === null || _a === void 0 ? void 0 : _a.call(window, true);
    }
}
