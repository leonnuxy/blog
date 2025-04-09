// src/components/contact.ts (Example)

/**
 * Initializes the contact form popup functionality.
 */
export function initializeContactForm(): void {
    const contactButton = document.getElementById('contact-btn');
    const contactPopup = document.getElementById('contact-popup');
    const closeButton = contactPopup?.querySelector('.close-popup');
    const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;

    if (!contactButton || !contactPopup) {
        console.warn('Contact button or popup element not found. Cannot initialize contact form.');
        return;
    }

    // --- Open Popup ---
    contactButton.addEventListener('click', (event) => {
        event.preventDefault(); // <-- CRUCIAL: Prevent default link navigation
        console.log('Contact button clicked, opening popup.');
        contactPopup.classList.add('open'); // Changed from 'visible' to 'open'
    });

    // --- Close Popup ---
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            contactPopup.classList.remove('open'); // Changed from 'visible' to 'open'
        });
    }

    // Close popup if clicking outside the content area
    contactPopup.addEventListener('click', (event) => {
        if (event.target === contactPopup) {
            contactPopup.classList.remove('open'); // Changed from 'visible' to 'open'
        }
    });

    // --- Form Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            console.log('Contact form submitted (placeholder).');
            // Add your form submission logic here (e.g., using fetch to send data)
            // Optionally close popup after submission
            // contactPopup.classList.remove('open'); 
            alert('Contact form submission not implemented yet.'); // Placeholder feedback
        });
    }

    console.log('Contact form initialized.');
}

// Ensure your CSS handles the .open class for the #contact-popup
// e.g.,
// .popup { display: none; /* Hidden by default */ }
// .popup.open { display: block; /* Or flex, grid, etc. */ }
