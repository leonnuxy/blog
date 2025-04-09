// src/modules/postDetail.ts

// --- Imports ---
import { fetchPostById, likePost, unlikePost } from '../services/api';
import { transformTagToUrlFormat } from '../utils/urlTransformer'
import { BlogPostData } from '../../shared/types'; 
import { renderHeader } from '../components/header';
import { checkSystemDarkModePreference, initializeDarkMode } from '../components/darkMode';

// Placeholder API functions for comments (replace with actual implementation)
const fetchCommentsApi = async (id: string): Promise<any[]> => { 
    console.log(`API: Fetching comments for ${id}`); 
    return [
        { id: 1, name: 'Alice', comment: 'Great post!', createdAt: new Date() }, 
        { id: 2, name: 'Bob', comment: 'Very informative.', createdAt: new Date() }
    ]; 
};

const submitCommentApi = async (id: string, name: string, comment: string): Promise<any> => { 
    console.log(`API: Submitting comment for ${id}`, { name, comment }); 
    return { id: Date.now(), name, comment, createdAt: new Date() }; 
};

// --- Session Storage Helper Functions for Likes ---
const LIKED_POSTS_SESSION_KEY = 'likedPosts';

/** Gets the set of liked post IDs from sessionStorage. */
export function getLikedPostsFromSession(): Set<string> {
    const storedLikes = sessionStorage.getItem(LIKED_POSTS_SESSION_KEY);
    try {
        const likedIds = storedLikes ? JSON.parse(storedLikes) : [];
        return new Set(Array.isArray(likedIds) ? likedIds : []);
    } catch (e) {
        console.error("Error parsing liked posts from sessionStorage:", e);
        return new Set(); 
    }
}

/** Adds a post ID to the liked posts in sessionStorage. */
export function addPostToSessionLikes(postId: string): void {
    const likedPostsSet = getLikedPostsFromSession();
    likedPostsSet.add(postId);
    sessionStorage.setItem(LIKED_POSTS_SESSION_KEY, JSON.stringify(Array.from(likedPostsSet)));
    console.log('Added post to session likes:', postId, Array.from(likedPostsSet));
}

/** Removes a post ID from the liked posts in sessionStorage. */
export function removePostFromSessionLikes(postId: string): void {
    const likedPostsSet = getLikedPostsFromSession();
    likedPostsSet.delete(postId);
    sessionStorage.setItem(LIKED_POSTS_SESSION_KEY, JSON.stringify(Array.from(likedPostsSet)));
    console.log('Removed post from session likes:', postId, Array.from(likedPostsSet));
}

// --- Core Initialization Function ---

/**
 * Initializes all functionality for the post detail page.
 * This is the main exported function that should be called by the entry point.
 */
export async function initializePostDetailPageLogic(): Promise<void> {
  console.log('Initializing post detail page...');
  try { 
    checkSystemDarkModePreference(); 
    initializeDarkMode(); 
    console.log('Dark mode initialized.'); 
  } catch (e) { 
    console.error(e); 
  }
  
  try { 
    renderHeader(); 
    console.log('Header rendered.'); 
  } catch (e) { 
    console.error(e); 
  }

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (postId) {
    await loadPostContent(postId);
  } else {
    console.error('No post ID provided in the URL');
    showErrorMessage('No post specified. Please check the URL.');
  }
  console.log('Post detail page initialization complete.');
}

/**
 * Load and display post content based on post ID
 */
export async function loadPostContent(postId: string): Promise<void> {
  try {
    console.log(`Fetching post with ID: ${postId}`);
    const post = await fetchPostById(postId);
    if (!post) throw new Error(`Post with ID ${postId} not found`);
    console.log('Post data fetched:', post);

    updatePostUI(post);
    updatePageMetadata(post);
    initializeSocialSharing(post);
    initializeLikeButton(post);
    initializeCommentForm(post.id.toString());
    await loadComments(post.id.toString());

  } catch (error) {
    console.error('Error loading post content:', error);
    showErrorMessage(`Failed to load the blog post. ${error instanceof Error ? error.message : 'Please try again later.'}`);
  }
}

/**
 * Update the post UI with content from the loaded post
 */
export function updatePostUI(post: BlogPostData): void {
  console.log('Updating Post UI for:', post.title);
  const postArticleElement = document.getElementById('post-content');
  if (!postArticleElement) {
    console.error('Cannot update UI: #post-content element not found.');
    return;
  }

  // Construct the inner HTML dynamically
  postArticleElement.innerHTML = `
        <div class="post-header">
            <h1>${post.title}</h1>
            <div class="post-meta">
                <time datetime="${post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : ''}">
                    ${post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date unknown'}
                </time>
                <span class="author">by ${post.author || 'Anonymous'}</span>

                <button class="like-button" data-post-id="${post.id}" aria-label="Like this post">
                    <i class="far fa-heart"></i> 
                    <span class="like-count">${post.likes || 0}</span>
                </button>
            </div>
        </div>
        
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" class="featured-image">` : ''}

        <div class="post-content-body">
            ${post.content}
        </div>

        <div class="post-footer">
            <div class="tags">
                ${post.tags && post.tags.length > 0 ? `<span>Tags:</span> ${post.tags.map(tag => `<a href="/index.html?tag=${encodeURIComponent(transformTagToUrlFormat(tag))}">${tag}</a>`).join('')}` : ''}
            </div>
            <div class="social-sharing">
                <span>Share:</span>
                <button class="share-button twitter" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></button>
                <button class="share-button facebook" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></button>
                <button class="share-button linkedin" aria-label="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></button>
            </div>
        </div>

        <section id="comments-section" class="comments-section" aria-labelledby="comments-heading">
             <h2 id="comments-heading">Comments</h2>
             <div id="comments-list" class="comments-list">
                 <p class="no-comments">Loading comments...</p> 
             </div>
             <form id="comment-form" class="comment-form" data-post-id="${post.id}">
                 <h3>Leave a Comment</h3>
                 <div class="form-group">
                     <label for="comment-name">Name:</label>
                     <input type="text" id="comment-name" name="name" required>
                 </div>
                 <div class="form-group">
                     <label for="comment-text">Comment:</label>
                     <textarea id="comment-text" name="comment" rows="4" required></textarea>
                 </div>
                 <button type="submit" class="primary-button">Submit Comment</button>
             </form>
        </section>
    `;
  console.log('Post UI updated with like button and comments section structure.');
}

/**
 * Update page metadata like title and URL
 */
export function updatePageMetadata(post: BlogPostData): void {
  document.title = `${post.title} | Noel's Blog`;
  console.log('Page metadata updated.');
}

/**
 * Initialize social sharing functionality
 */
export function initializeSocialSharing(post: BlogPostData): void {
  const postArticleElement = document.getElementById('post-content');
  if (!postArticleElement) return;

  const socialSharingDiv = postArticleElement.querySelector('.social-sharing');
  if (socialSharingDiv) {
      socialSharingDiv.addEventListener('click', (event) => {
          const button = (event.target as HTMLElement).closest('.share-button') as HTMLButtonElement;
          if (!button) return;
          event.preventDefault(); 

          const url = window.location.href; 
          const text = `Check out this article: ${post.title}`;
          let shareWindowUrl = '';

          if (button.classList.contains('twitter')) {
              shareWindowUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
              window.open(shareWindowUrl, 'twitter-share', 'width=550,height=235');
          } else if (button.classList.contains('facebook')) {
              shareWindowUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
              window.open(shareWindowUrl, 'facebook-share', 'width=550,height=435');
          } else if (button.classList.contains('linkedin')) {
              shareWindowUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
              window.open(shareWindowUrl, 'linkedin-share', 'width=550,height=435');
          }
      });
  }
  console.log('Social sharing initialized.');
}

/**
 * Display an error message to the user within the post content area
 */
export function showErrorMessage(message: string): void {
  const contentElement = document.getElementById('post-content');
  if (contentElement) {
    const commentsSection = document.getElementById('comments-section');
    const targetElement = commentsSection ? commentsSection : contentElement;
    targetElement.innerHTML = `<div class="error-message">${message}</div>`;
  } else {
    alert(message); // Fallback
  }
}

/**
 * Initialize like button functionality
 */
export function initializeLikeButton(post: BlogPostData): void {
    const postIdString = post.id.toString();
    const likeBtn = document.querySelector(`#post-content .like-button[data-post-id="${postIdString}"]`) as HTMLButtonElement | null;

    if (!likeBtn) {
        console.warn('Like button not found in post detail UI.');
        return;
    }

    const likedPostsSet = getLikedPostsFromSession();
    let isLiked = likedPostsSet.has(postIdString); // Initial state from session

    const icon = likeBtn.querySelector('i');
    const countSpan = likeBtn.querySelector('.like-count');

    // Set initial UI state
    if (isLiked && icon) {
         icon.classList.remove('far'); icon.classList.add('fas'); likeBtn.classList.add('liked');
    } else if (icon) {
         icon.classList.remove('fas'); icon.classList.add('far'); likeBtn.classList.remove('liked');
    }
    if (countSpan) countSpan.textContent = String(post.likes || 0);

    likeBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const currentIcon = likeBtn.querySelector('i');
        const currentCountSpan = likeBtn.querySelector('.like-count');
        if (!currentIcon || !currentCountSpan) return;

        likeBtn.disabled = true; // Prevent double-clicking

        try {
            let result;
            if (isLiked) {
                console.log(`Attempting to UNLIKE post ${post.id}`);
                result = await unlikePost(Number(post.id)); // Call unlikePost API
            } else {
                console.log(`Attempting to LIKE post ${post.id}`);
                result = await likePost(Number(post.id)); // Call likePost API
            }

            if (result) {
                // Toggle the local 'isLiked' state only after successful API call
                isLiked = !isLiked; 

                // Update Session Storage based on the new toggled state
                if (isLiked) { 
                    addPostToSessionLikes(postIdString); 
                } else { 
                    removePostFromSessionLikes(postIdString); 
                }

                // Update UI Icon based on the new toggled state
                if (isLiked) {
                    currentIcon.classList.remove('far'); 
                    currentIcon.classList.add('fas'); 
                    likeBtn.classList.add('liked');
                } else {
                    currentIcon.classList.remove('fas'); 
                    currentIcon.classList.add('far'); 
                    likeBtn.classList.remove('liked');
                }
                
                // Update count directly from the API response
                currentCountSpan.textContent = String(result.likes); 
                console.log(`Like status updated. New count: ${result.likes}`);
            } else {
                console.error("Like/Unlike API call failed or returned null");
            }
        } catch (error) {
            console.error("Failed to update like/unlike status:", error);
        } finally {
            likeBtn.disabled = false; // Re-enable button
        }
    });
    console.log('Like button initialized.');
}

/**
 * Fetches comments from API and renders them into the list.
 */
export async function loadComments(postId: string): Promise<void> {
    const commentsList = document.getElementById('comments-list');
    if (!commentsList) return;
    commentsList.innerHTML = '<p class="loading-comments">Loading comments...</p>'; // Show loading state

    try {
        const comments = await fetchCommentsApi(postId); // Replace with actual API call
        commentsList.innerHTML = ''; // Clear loading/previous comments

        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
        } else {
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                // Basic escaping for display - consider a more robust sanitizer if needed
                const safeName = comment.name?.replace(/</g, "&lt;")?.replace(/>/g, "&gt;") || 'Anonymous';
                const safeComment = comment.comment?.replace(/</g, "&lt;")?.replace(/>/g, "&gt;") || '';
                commentElement.innerHTML = `
                    <p class="comment-meta"><strong>${safeName}</strong> on ${new Date(comment.createdAt).toLocaleDateString()}</p>
                    <p class="comment-body">${safeComment}</p>
                `;
                commentsList.appendChild(commentElement);
            });
        }
        console.log('Comments loaded.');
    } catch (error) {
        console.error("Failed to load comments:", error);
        commentsList.innerHTML = '<p class="error-message">Could not load comments.</p>';
    }
}

/**
 * Initializes the comment submission form.
 */
export function initializeCommentForm(postId: string): void {
    const commentForm = document.getElementById('comment-form') as HTMLFormElement | null;
    if (!commentForm) {
         console.warn('Comment form not found in post detail UI.');
         return;
    }

    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nameInput = commentForm.elements.namedItem('name') as HTMLInputElement;
        const commentInput = commentForm.elements.namedItem('comment') as HTMLTextAreaElement;
        const submitButton = commentForm.querySelector('button[type="submit"]') as HTMLButtonElement;

        if (!nameInput || !commentInput || !submitButton) return;

        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (!name || !comment) {
            alert('Please enter both name and comment.'); // Simple validation
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        try {
            await submitCommentApi(postId, name, comment); // Replace with actual API call
            // Clear form
            nameInput.value = '';
            commentInput.value = '';
            // Refresh comments list to show the new comment
            await loadComments(postId);
        } catch (error) {
            console.error("Failed to submit comment:", error);
            alert('Failed to submit comment. Please try again.'); // Simple error feedback
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Comment';
        }
    });
    console.log('Comment form initialized.');
}