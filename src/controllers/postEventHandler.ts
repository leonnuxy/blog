/**
 * Post Event Handler
 * Handles events on the post detail page
 */
import { likePost } from '../services/api';
import { Comment } from '../../shared/types';

/**
 * Setup all event listeners for a post page
 * @param postId The ID of the current post
 */
export function setupPostEventListeners(postId: string | number): void {
    setupLikeButton(postId);
    setupCommentForm(postId);
    setupSharingLinks();
}

/**
 * Set up the like button functionality
 */
function setupLikeButton(postId: string | number): void {
    const likeButton = document.getElementById('like-button') as HTMLButtonElement;
    if (!likeButton) return;
    
    likeButton.addEventListener('click', async () => {
        try {
            likeButton.disabled = true;
            // Convert string ID to number if needed - likePost expects a number
            const numericId = typeof postId === 'string' ? parseInt(postId, 10) : postId;
            const result = await likePost(numericId);
            
            if (result) {
                // Update the like count in the button
                const heartIcon = document.createElement('i');
                heartIcon.className = 'fa fa-heart';
                likeButton.innerHTML = '';
                likeButton.appendChild(heartIcon);
                likeButton.appendChild(document.createTextNode(` Like (${result.likes})`));
                
                // Add a liked class to animate
                likeButton.classList.add('liked');
                
                // Show a small notification
                showNotification('Thanks for liking this post!');
            }
        } catch (error) {
            console.error('Error liking post:', error);
            showNotification('Failed to like post. Please try again.', 'error');
        } finally {
            likeButton.disabled = false;
        }
    });
}

/**
 * Set up the comment form submission
 */
function setupCommentForm(postId: string | number): void {
    const commentForm = document.getElementById('comment-form') as HTMLFormElement;
    if (!commentForm) return;
    
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('comment-name') as HTMLInputElement;
        const commentText = document.getElementById('comment-text') as HTMLTextAreaElement;
        
        if (!nameInput?.value || !commentText?.value) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        try {
            const submitButton = commentForm.querySelector('button[type="submit"]') as HTMLButtonElement;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            // Convert string ID to number if needed
            const numericId = typeof postId === 'string' ? parseInt(postId, 10) : postId;
            
            // In a real implementation, you would call an API endpoint to save the comment
            await simulateCommentSubmission({
                author: nameInput.value,
                text: commentText.value,
                postId: numericId
            });
            
            // Instead of refreshing, we'll add the comment to the UI
            addNewCommentToUI({
                author: nameInput.value,
                text: commentText.value,
                date: new Date().toISOString()
            });
            
            // Reset the form
            commentForm.reset();
            showNotification('Comment added successfully!');
        } catch (error) {
            console.error('Error submitting comment:', error);
            showNotification('Failed to submit comment. Please try again.', 'error');
        } finally {
            const submitButton = commentForm.querySelector('button[type="submit"]') as HTMLButtonElement;
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    });
}

/**
 * Set up social sharing links
 */
function setupSharingLinks(): void {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget as HTMLAnchorElement;
            const platform = target.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=450');
            }
        });
    });
}

/**
 * Add a new comment to the UI without refreshing
 */
function addNewCommentToUI(comment: Comment): void {
    const commentsList = document.querySelector('.comments-list');
    if (!commentsList) return;
    
    const commentElement = document.createElement('div');
    commentElement.className = 'comment new-comment';
    commentElement.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-date">${new Date(comment.date).toLocaleDateString()}</span>
        </div>
        <div class="comment-body">${comment.text}</div>
    `;
    
    // Add to the top of the list
    commentsList.insertBefore(commentElement, commentsList.firstChild);
    
    // Update the comment count
    const commentCount = document.querySelector('.comments-section h3');
    if (commentCount) {
        const currentCount = parseInt(commentCount.textContent?.match(/\d+/)?.[0] || '0');
        commentCount.textContent = `Comments (${currentCount + 1})`;
    }
    
    // Highlight the new comment briefly
    setTimeout(() => {
        commentElement.classList.add('highlight');
        setTimeout(() => {
            commentElement.classList.remove('highlight');
            commentElement.classList.remove('new-comment');
        }, 2000);
    }, 100);
}

/**
 * Show a notification to the user
 */
function showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    notification.appendChild(closeBtn);
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Auto remove after some time
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

/**
 * Simulate submitting a comment to an API
 * In a real application, this would make an API call
 */
function simulateCommentSubmission(commentData: { author: string; text: string; postId: number }): Promise<any> {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            console.log('Comment submitted:', commentData);
            resolve({ success: true });
        }, 800);
    });
}