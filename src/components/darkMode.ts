// Dark mode functionality

/**
 * Initialize dark mode toggle
 * This creates a floating dark mode toggle button and adds it to the DOM
 */
export function initializeDarkMode(): void {
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon
    darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    
    // Check if dark mode preference is already set in local storage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
    }
    
    // Add click event listener
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Add button to the DOM
    document.body.appendChild(darkModeToggle);
}

/**
 * Toggle dark mode on and off
 */
function toggleDarkMode(): void {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    // Update icon based on mode
    if (darkModeToggle) {
        if (isDarkMode) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
        }
    }
    
    // Save preference to local storage
    localStorage.setItem('darkMode', isDarkMode.toString());
}

/**
 * Check if user has system dark mode preference
 * If they do and we haven't set a preference yet, apply dark mode
 */
export function checkSystemDarkModePreference(): void {
    // Only check if user hasn't explicitly set a preference
    if (localStorage.getItem('darkMode') === null) {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDarkMode) {
            document.body.classList.add('dark-mode');
            const darkModeToggle = document.querySelector('.dark-mode-toggle');
            if (darkModeToggle) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon
            }
            localStorage.setItem('darkMode', 'true');
        }
    }
}