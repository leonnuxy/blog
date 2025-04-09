import { BlogPostData } from '../../shared/types'; // Assuming this path is correct

/**
 * Creates a DOM element for a blog card from post data (display only for actions)
 */
export function createBlogCardElement(post: BlogPostData): HTMLElement {
    const blogCard = document.createElement('div');
    blogCard.className = 'blog-card';
    blogCard.dataset.postId = String(post.id);

    blogCard.style.cursor = 'pointer';

    const commentCount = post.comments ? post.comments.length : 0;

    const createdDate = new Date(post.createdAt);
    const dateStr = createdDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    // --- Dynamic URL and Text Generation for Sharing ---
    // Use a relative path for sharing as well
    const postUrl = `post.html?id=${String(post.id)}`; 
    const encodedUrl = encodeURIComponent(postUrl); // Note: Sharing services might resolve this relative to the current page
    // Alternative: Construct full URL carefully if needed by specific sharing services
    // const postFullUrl = `${window.location.origin}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/post.html?id=${String(post.id)}`;
    // const encodedFullUrl = encodeURIComponent(postFullUrl);
    
    const shareText = `Check out this article: ${post.title}`;
    const encodedShareText = encodeURIComponent(shareText);
    // --- End Dynamic URL Generation ---

    let tagsHTML = '';
    if (post.tags && post.tags.length > 0) {
        tagsHTML = '<div class="post-tags">' +
            post.tags.map(tag => `<span class="tag-badge" data-tag="${tag}" onclick="window.location.href='/index.html?tag=${encodeURIComponent(tag)}'">${tag}</span>`).join('') +
            '</div>';
    }

    const fallbackImageUrl = 'images/blog_image_3.jpeg'; // Relative path

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

    // Add event listeners for tag clicks
    const tagBadges = blogCard.querySelectorAll('.tag-badge');
    tagBadges.forEach(badge => {
        badge.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the blog card click
            const tag = (event.target as HTMLElement).dataset.tag;
            if (tag) {
                // Use client-side navigation instead of direct links
                // This uses the index.html page with a query parameter instead of a /tag/ path
                window.location.href = `index.html?tag=${encodeURIComponent(tag)}`;
            }
        });
    });

     const socialSharingDiv = blogCard.querySelector('.social-sharing');
     if (socialSharingDiv) {
         socialSharingDiv.addEventListener('click', (event) => {
             const button = (event.target as HTMLElement).closest('.share-button') as HTMLButtonElement;
             if (!button) return;
             event.stopPropagation(); 

             // For sharing, we might need the FULL URL. Let's reconstruct it here.
             // Get the base path (e.g., '/blog/')
             const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
             const relativeUrl = button.dataset.url ? decodeURIComponent(button.dataset.url) : `post.html?id=${post.id}`; // Use relative path from data attribute
             const fullUrl = `${window.location.origin}${basePath}${relativeUrl}`; // Construct full URL
             const encodedFullUrl = encodeURIComponent(fullUrl); // Encode the full URL

             const text = button.dataset.text ? decodeURIComponent(button.dataset.text) : document.title;
             const encodedText = encodeURIComponent(text);
             let shareWindowUrl = '';

             if (button.classList.contains('twitter')) {
                 shareWindowUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedFullUrl}`; // Use encodedFullUrl
                 window.open(shareWindowUrl, 'twitter-share', 'width=550,height=235');
             } else if (button.classList.contains('facebook')) {
                 shareWindowUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedFullUrl}`; // Use encodedFullUrl
                  window.open(shareWindowUrl, 'facebook-share', 'width=550,height=435');
             } else if (button.classList.contains('linkedin')) {
                  shareWindowUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedFullUrl}`; // Use encodedFullUrl
                  window.open(shareWindowUrl, 'linkedin-share', 'width=550,height=435');
             }
         });
     }

    return blogCard;
}
