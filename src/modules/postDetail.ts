// src/modules/postDetail.ts

// --- Imports ---
import { fetchPostById, likePost, unlikePost } from '../services/api';
import { generateTagFilterUrl } from '../utils/urlTransformer'
import { BlogPostData } from '../../shared/types'; 
import { renderHeader } from '../components/header';
import { checkSystemDarkModePreference, initializeDarkMode } from '../components/darkMode';

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
            </div>
        </div>
        
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" class="featured-image">` : ''}

        <div class="post-content-body">
            ${post.content}
        </div>

        <div class="post-footer">
            <div class="tags">
                ${post.tags && post.tags.length > 0 ? `<span>Tags:</span> ${post.tags.map(tag => `<a href="${generateTagFilterUrl(tag)}">${tag}</a>`).join('')}` : ''}
            </div>
            <div class="social-sharing">
                <span>Share:</span>
                <button class="share-button twitter" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></button>
                <button class="share-button facebook" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></button>
                <button class="share-button linkedin" aria-label="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></button>
            </div>
        </div>
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