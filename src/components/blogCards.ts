import { BlogPostData } from '../../shared/types'; // Assuming this path is correct
import { generateTagFilterUrl } from '../utils/urlTransformer'; // Import the URL generator

/**
 * Creates a DOM element for a blog card from post data (display only for actions)
 */
export function createBlogCardElement(post: BlogPostData): HTMLElement {
  const blogCard = document.createElement('div');
  blogCard.className = 'blog-card';
  blogCard.dataset.postId = String(post.id);

  // 1) Background image
  const imageUrl = post.imageUrl || 'images/blog_image_3.jpeg';
  blogCard.style.backgroundImage = `url("${imageUrl}")`;

  // 2) Date
  const createdDate = new Date(post.createdAt);
  const dateStr = createdDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  // 3) Excerpt: first 120 chars of content
  const raw = post.content.replace(/(<([^>]+)>)/gi, '');
  const excerpt =
    raw.length > 120 ? raw.substring(0, 120).trimEnd() + '…' : raw;

  // 4) Tags
  const tagsHTML = post.tags?.length
    ? `<div class="post-tags">
         ${post.tags.map(tag =>
           `<a href="${generateTagFilterUrl(tag)}" class="tag-badge">${tag}</a>`
         ).join('')}
       </div>`
    : '';

  // 5) Build inner markup, replacing button with an anchor
  blogCard.innerHTML = `
    <div class="blog-card-inner">
      <div class="blog-card-header">
        <h3 class="blog-card-title">${post.title}</h3>
        <span class="blog-card-date">${dateStr}</span>
      </div>
      <p class="blog-card-excerpt">${excerpt}</p>
      ${tagsHTML}
      <a href="post.html?id=${post.id}"
         class="blog-card-button btn read-more-button">
        Read More
      </a>
    </div>
  `;

  return blogCard;
}