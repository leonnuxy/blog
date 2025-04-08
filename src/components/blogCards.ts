import { BlogPostData } from '../../shared/types'; // Assuming this path is correct

/**
 * Creates a DOM element for a blog card from post data (display only for actions)
 */
export function createBlogCardElement(post: BlogPostData): HTMLElement {
    const blogCard = document.createElement('div');
    blogCard.className = 'blog-card';
    blogCard.dataset.postId = String(post.id);

    // Make the card appear clickable (for navigation)
    blogCard.style.cursor = 'pointer';
    // Note: Actual navigation should be handled by an event listener
    // (preferably delegation) on the parent container (.blog-cards)
    // that reads the data-post-id and navigates.

    // Calculate comment count (assuming post.comments is an array or undefined)
    const commentCount = post.comments ? post.comments.length : 0;

    // Format dates
    const createdDate = new Date(post.createdAt);
    const dateStr = createdDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    // --- Dynamic URL and Text Generation for Sharing ---
    // CORRECTED PATH: Use '/post.html' directly, served from the public root
    const postUrl = `${window.location.origin}/post.html?id=${String(post.id)}`; 
    const encodedUrl = encodeURIComponent(postUrl);
    const shareText = `Check out this article: ${post.title}`;
    const encodedShareText = encodeURIComponent(shareText);
    // --- End Dynamic URL Generation ---

    // Generate HTML for tag badges
    let tagsHTML = '';
    if (post.tags && post.tags.length > 0) {
        tagsHTML = '<div class="post-tags">' +
            post.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('') +
            '</div>';
    }

    // Use the correct public path for the fallback image
    const fallbackImageUrl = 'images/blog_image_3.jpeg'; 

    // Create HTML for blog card
    blogCard.innerHTML = `
        <img src="${post.imageUrl || fallbackImageUrl}" alt="${post.title}"> 
        <div class="blog-card-content">
            <p class="blog-card-date-author">${dateStr}</p>
            <h3 class="blog-card-title">${post.title}</h3>
            ${tagsHTML}
            <div class="post-actions">
                <span class="like-button-display" aria-label="${post.likes || 0} likes">
                    <i class="far fa-heart"></i> <span class="like-count">${post.likes || 0}</span>
                </span>
                <span class="comments-toggle-display" aria-label="${commentCount} comments">
                    <i class="fas fa-comment"></i>
                    <span class="comment-count">${commentCount}</span>
                </span>
                <div class="social-sharing">
                    <button class="share-button twitter" aria-label="Share on Twitter" data-url="${encodedUrl}" data-text="${encodedShareText}"><i class="fab fa-twitter"></i></button>
                    <button class="share-button facebook" aria-label="Share on Facebook" data-url="${encodedUrl}"><i class="fab fa-facebook-f"></i></button>
                    <button class="share-button linkedin" aria-label="Share on LinkedIn" data-url="${encodedUrl}"><i class="fab fa-linkedin-in"></i></button>
                </div>
            </div>
        </div>
    `; 

     // Add JS listeners for social share BUTTONS 
     const socialSharingDiv = blogCard.querySelector('.social-sharing');
     if (socialSharingDiv) {
         socialSharingDiv.addEventListener('click', (event) => {
             const button = (event.target as HTMLElement).closest('.share-button') as HTMLButtonElement;
             if (!button) return;
             event.stopPropagation(); // Prevent card navigation

             const url = button.dataset.url ? decodeURIComponent(button.dataset.url) : window.location.href;
             const text = button.dataset.text ? decodeURIComponent(button.dataset.text) : document.title;
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

    return blogCard;
}
