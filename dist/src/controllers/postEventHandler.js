"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPostEventListeners = setupPostEventListeners;
/**
 * Post Event Handler
 * Handles events on the post detail page
 */
const api_1 = require("../services/api");
/**
 * Setup all event listeners for a post page
 * @param postId The ID of the current post
 */
function setupPostEventListeners(postId) {
    setupLikeButton(postId);
    setupCommentForm(postId);
    setupSharingLinks();
}
/**
 * Set up the like button functionality
 */
function setupLikeButton(postId) {
    const likeButton = document.getElementById('like-button');
    if (!likeButton)
        return;
    likeButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        try {
            likeButton.disabled = true;
            // Convert string ID to number if needed - likePost expects a number
            const numericId = typeof postId === 'string' ? parseInt(postId, 10) : postId;
            const result = yield (0, api_1.likePost)(numericId);
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
        }
        catch (error) {
            console.error('Error liking post:', error);
            showNotification('Failed to like post. Please try again.', 'error');
        }
        finally {
            likeButton.disabled = false;
        }
    }));
}
/**
 * Set up the comment form submission
 */
function setupCommentForm(postId) {
    const commentForm = document.getElementById('comment-form');
    if (!commentForm)
        return;
    commentForm.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const nameInput = document.getElementById('comment-name');
        const commentText = document.getElementById('comment-text');
        if (!(nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) || !(commentText === null || commentText === void 0 ? void 0 : commentText.value)) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        try {
            const submitButton = commentForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            // Convert string ID to number if needed
            const numericId = typeof postId === 'string' ? parseInt(postId, 10) : postId;
            // In a real implementation, you would call an API endpoint to save the comment
            yield simulateCommentSubmission({
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
        }
        catch (error) {
            console.error('Error submitting comment:', error);
            showNotification('Failed to submit comment. Please try again.', 'error');
        }
        finally {
            const submitButton = commentForm.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    }));
}
/**
 * Set up social sharing links
 */
function setupSharingLinks() {
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget;
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
function addNewCommentToUI(comment) {
    var _a, _b;
    const commentsList = document.querySelector('.comments-list');
    if (!commentsList)
        return;
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
        const currentCount = parseInt(((_b = (_a = commentCount.textContent) === null || _a === void 0 ? void 0 : _a.match(/\d+/)) === null || _b === void 0 ? void 0 : _b[0]) || '0');
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
function showNotification(message, type = 'success') {
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
function simulateCommentSubmission(commentData) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            console.log('Comment submitted:', commentData);
            resolve({ success: true });
        }, 800);
    });
}
