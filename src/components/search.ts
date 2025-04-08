// Search functionality
import { BlogPostData } from '../../shared/types';
import { fetchBlogPosts } from '../services/api';
import { createBlogCardElement } from './blogCards';
import { initializeCommentsFunctionality } from './comments';

/**
 * Initialize search functionality
 */
export function initializeSearch(): void {
    const searchInput = document.querySelector('input[type="search"]');
    if (!searchInput) {
        console.warn('Search input not found in the DOM');
        return;
    }
    
    // Cycle through different placeholder texts
    setupPlaceholderCycling(searchInput as HTMLInputElement);
    
    // Set up search input event handler
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target as HTMLInputElement);
    });
}

/**
 * Cycle through different placeholder texts for the search input
 */
function setupPlaceholderCycling(searchInput: HTMLInputElement): void {
    const placeholders = [
        "Search for articles...",
        "Search for topics...",
        "Search for authors..."
    ];
    let index = 0;
    
    setInterval(() => {
        searchInput.placeholder = placeholders[index];
        index = (index + 1) % placeholders.length;
    }, 3000);
}

/**
 * Handle search input and filter blog posts
 */
async function handleSearch(searchInput: HTMLInputElement): Promise<void> {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm.length < 2) {
        // If search is cleared, reload all posts
        if (searchTerm.length === 0) {
            // Dispatch event to reload posts
            document.dispatchEvent(new CustomEvent('reloadPosts'));
        }
        return;
    }
    
    // Show loading state
    const blogCardsContainer = document.querySelector('.blog-cards');
    if (!blogCardsContainer) return;
    
    blogCardsContainer.innerHTML = '<div class="loading-spinner"></div>';
    
    try {
        // Fetch all posts and filter client-side
        // In a real app, you'd implement server-side search
        const posts = await fetchBlogPosts();
        
        const filteredPosts = filterPosts(posts, searchTerm);
        
        // Clear container
        blogCardsContainer.innerHTML = '';
        
        if (filteredPosts.length === 0) {
            // Show empty search results
            showEmptySearchResults(blogCardsContainer, searchTerm);
            return;
        }
        
        // Display filtered posts
        displayFilteredPosts(filteredPosts, blogCardsContainer);
        
    } catch (error) {
        console.error('Error searching posts:', error);
        showSearchError(blogCardsContainer);
    }
}

/**
 * Filter posts based on search term
 */
function filterPosts(posts: BlogPostData[], searchTerm: string): BlogPostData[] {
    return posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.content.toLowerCase().includes(searchTerm) || 
        post.author.toLowerCase().includes(searchTerm) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
}

/**
 * Display filtered posts in the blog container
 */
function displayFilteredPosts(filteredPosts: BlogPostData[], container: Element): void {
    filteredPosts.forEach(post => {
        const blogCard = createBlogCardElement(post);
        container.appendChild(blogCard);
        
        // Initialize comments functionality for the filtered posts
        initializeCommentsFunctionality(blogCard);
    });
    
    // Dispatch custom event when search results are displayed
    document.dispatchEvent(new CustomEvent('searchResultsDisplayed', { 
        detail: { count: filteredPosts.length } 
    }));
}

/**
 * Display empty search results message
 */
function showEmptySearchResults(container: Element, searchTerm: string): void {
    container.innerHTML = `
        <div class="empty-search">
            <i class="fas fa-search fa-3x"></i>
            <h3>No results found</h3>
            <p>No posts match your search for "${searchTerm}"</p>
        </div>
    `;
}

/**
 * Display search error message
 */
function showSearchError(container: Element): void {
    container.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle fa-3x"></i>
            <h3>Search failed</h3>
            <p>Failed to search blog posts. Please try again.</p>
        </div>
    `;
}