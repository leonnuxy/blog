// Contact popup functionality

/**
 * Initialize the contact form popup
 */
export function initializeContactForm(): void {
    const contactButton = document.getElementById('contact-btn');
    const contactPopup = document.getElementById('contact-popup');
    const closePopup = document.querySelector('#contact-popup .close-popup');
    
    if (!contactButton || !contactPopup || !closePopup) {
        console.warn('Contact form elements not found in the DOM');
        return;
    }
    
    // Open popup when contact button is clicked
    contactButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        contactPopup.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while popup is open

        // Add active class to contact link
        contactButton.classList.add('active');
    });
    
    // Close popup when close button is clicked
    closePopup.addEventListener('click', () => {
        contactPopup.classList.remove('open');
        document.body.style.overflow = '';
        
        // Revert to home active state when closing popup
        setDefaultActiveLink();
    });
    
    // Close when clicking outside the popup content
    contactPopup.addEventListener('click', (e) => {
        if (e.target === contactPopup) {
            contactPopup.classList.remove('open');
            document.body.style.overflow = '';
            
            // Revert to home active state when closing popup
            setDefaultActiveLink();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactPopup.classList.contains('open')) {
            contactPopup.classList.remove('open');
            document.body.style.overflow = '';
            
            // Revert to home active state when closing popup
            setDefaultActiveLink();
        }
    });
    
    // Set up contact form submission
    setupContactFormSubmission();
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

/**
 * Handle contact form submission
 */
function setupContactFormSubmission(): void {
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = contactForm.querySelector('input[name="name"]') as HTMLInputElement;
        const emailInput = contactForm.querySelector('input[name="email"]') as HTMLInputElement;
        const messageInput = contactForm.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
        
        // Simple validation
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            showContactFormMessage('Please fill out all fields', 'error');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just simulate a successful submission
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        
        // Simulate server request
        setTimeout(() => {
            // Reset form and show success message
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            showContactFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Close the popup after a delay
            setTimeout(() => {
                const contactPopup = document.getElementById('contact-popup');
                if (contactPopup) {
                    contactPopup.classList.remove('open');
                    document.body.style.overflow = '';
                }
            }, 2000);
        }, 1500);
    });
}

/**
 * Display a message in the contact form
 */
function showContactFormMessage(message: string, type: 'success' | 'error'): void {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Remove any existing message
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and add new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    contactForm.appendChild(messageElement);
    
    // Remove message after a few seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}