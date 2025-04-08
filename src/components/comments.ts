// Comments functionality
interface CommentData {
    name: string;
    text: string;
    date: Date;
}

/**
 * Initialize comments functionality for blog posts
 */
export function initializeComments(): void {
    setupCommentToggles();
    setupCommentForms();
}

/**
 * Initialize comments functionality for a specific blog post element
 */
export function initializeCommentsFunctionality(postElement: HTMLElement): void {
    const toggle = postElement.querySelector('.comments-toggle');
    const form = postElement.querySelector('.comment-form');
    
    if (toggle) {
        setupCommentToggle(toggle as HTMLElement);
    }
    
    if (form) {
        setupCommentForm(form as HTMLFormElement);
    }
}

/**
 * Set up comment toggle buttons
 */
function setupCommentToggles(): void {
    const commentToggles = document.querySelectorAll('.comments-toggle');
    commentToggles.forEach(toggle => {
        setupCommentToggle(toggle as HTMLElement);
    });
}

/**
 * Set up a single comment toggle button
 */
function setupCommentToggle(toggle: HTMLElement): void {
    toggle.addEventListener('click', () => {
        const postId = toggle.getAttribute('data-post-id');
        const commentsSection = document.getElementById(`comments-${postId}`);
        
        if (commentsSection) {
            commentsSection.classList.toggle('active');
            
            // Change button text based on state
            if (commentsSection.classList.contains('active')) {
                toggle.innerHTML = `<i class="fas fa-times"></i> Hide Comments <span class="comments-count">${toggle.querySelector('.comments-count')?.textContent}</span>`;
            } else {
                toggle.innerHTML = `<i class="fas fa-comment"></i> Comments <span class="comments-count">${toggle.querySelector('.comments-count')?.textContent}</span>`;
            }
        }
    });
}

/**
 * Set up comment forms
 */
function setupCommentForms(): void {
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
        setupCommentForm(form as HTMLFormElement);
    });
}

/**
 * Set up a single comment form
 */
function setupCommentForm(form: HTMLFormElement): void {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const postId = form.getAttribute('data-post-id');
        const commentsContainer = document.querySelector(`#comments-${postId} .comments-list`);
        
        if (!commentsContainer) return;
        
        const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
        const commentInput = form.querySelector('textarea[name="comment"]') as HTMLTextAreaElement;
        
        // Check if inputs are not empty
        if (nameInput.value.trim() === '' || commentInput.value.trim() === '') {
            return;
        }
        
        addNewComment(postId as string, commentsContainer, nameInput.value, commentInput.value);
        
        // Reset form
        form.reset();
    });
}

/**
 * Add a new comment to the comments list
 */
function addNewComment(
    postId: string, 
    commentsContainer: Element, 
    name: string, 
    commentText: string
): void {
    // Create new comment
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    
    // Get current date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Comment HTML structure
    newComment.innerHTML = `
        <div class="comment-avatar">
            <i class="fas fa-user-circle"></i>
        </div>
        <div class="comment-content">
            <p class="comment-author">${name}</p>
            <p class="comment-text">${commentText}</p>
            <p class="comment-date">${dateStr}</p>
        </div>
    `;
    
    // Remove "no comments yet" message if it exists
    const noComments = commentsContainer.querySelector('.no-comments');
    if (noComments) {
        commentsContainer.removeChild(noComments);
    }
    
    // Add the new comment to the top of the list
    commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
    
    // Update comment count
    updateCommentCount(postId);
}

/**
 * Update the comment count for a post
 */
function updateCommentCount(postId: string): void {
    const countSpan = document.querySelector(`button[data-post-id="${postId}"] .comments-count`);
    if (countSpan) {
        let count = parseInt(countSpan.textContent?.replace(/[()]/g, '') || '0') + 1;
        countSpan.textContent = `(${count})`;
    }
}