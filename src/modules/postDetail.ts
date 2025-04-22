// src/modules/postDetail.ts

/** Let TS know about the global Prism loader on window */
declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}
/** Tell TS there’s a global Prism variable (loaded via CDN) */
declare const Prism: {
  highlightAll: () => void;
};

// --- Imports ---
import { fetchPostById } from '../services/api';
import { generateTagFilterUrl } from '../utils/urlTransformer'
import { BlogPostData } from '../../shared/types';
import { checkSystemDarkModePreference, initializeDarkMode } from '../components/darkMode';
import { marked } from 'marked';

// --- Core Initialization Function ---

/**
 * Initializes all functionality for the post detail page.
 * This is the main exported function that should be called by the entry point.
 */
export async function initializePostDetailPageLogic(): Promise<void> {
  try {
    checkSystemDarkModePreference();
    initializeDarkMode();
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
}

/**
 * Load and display post content based on post ID
 */
export async function loadPostContent(postId: string): Promise<void> {
  try {
    const post = await fetchPostById(postId);
    if (!post) throw new Error(`Post with ID ${postId} not found`);

    await updatePostUI(post); // Await the UI update
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
export async function updatePostUI(post: BlogPostData): Promise<void> {
  // 1) Hero
  const titleEl = document.getElementById('post-title');
  const dateEl = document.getElementById('post-date');
  const tagsEl = document.getElementById('post-tags');
  const imageEl = document.getElementById('post-image') as HTMLImageElement;

  if (titleEl) titleEl.textContent = post.title;
  if (dateEl) dateEl.textContent = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  if (tagsEl) {
    tagsEl.innerHTML = post.tags
      .map(
        tag => `
          <a
            href="${generateTagFilterUrl(tag)}"
            class="tag-badge"
          >${tag}</a>
        `
      )
      .join('');
  }
  if (imageEl) imageEl.src = post.imageUrl; // Set the featured image

  // 2) Content
  const contentEl = document.getElementById('post-content');
  if (contentEl) {
    contentEl.innerHTML = marked.parse(post.content) as string;
    // Add line-numbers class to all <pre> blocks
    contentEl
      .querySelectorAll<HTMLElement>('pre')
      .forEach(pre => pre.classList.add('line-numbers'));

    // Use whichever Prism reference is present
    const prismInstance = window.Prism ?? Prism;
    if (typeof prismInstance.highlightAll === 'function') {
      prismInstance.highlightAll();
    }
  }
}

/**
 * Update page metadata like title and URL
 */
export function updatePageMetadata(post: BlogPostData): void {
  document.title = `${post.title} | Blog`;
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
}

/**
 * Display an error message to the user within the post content area
 */
export function showErrorMessage(message: string): void {
  const contentElement = document.getElementById('post-content');
  if (contentElement) {
    contentElement.innerHTML = `<div class="error-message">${message}</div>`;
  } else {
    alert(message); // Fallback
  }
}