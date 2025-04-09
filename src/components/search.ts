import { fetchBlogPosts } from '../services/api';
import { createBlogCardElement } from './blogCards';

/**
 * Initializes a simple, in-page search functionality for blog posts.
 * Filters the existing blog cards on the page as the user types.
 */
export function initializeSearch(): void {
    const searchBar = document.querySelector('.search-bar') as HTMLInputElement;
    if (!searchBar) {
        console.warn('Search bar not found in the DOM');
        return;
    }

    // Create a search indicator element
    const searchIndicator = document.createElement('div');
    searchIndicator.className = 'search-indicator';
    searchIndicator.textContent = 'Filtering results...';
    searchIndicator.style.display = 'none';
    
    // Insert the indicator before the blog cards
    const blogContainer = document.querySelector('.blog-cards');
    if (blogContainer && blogContainer.parentNode) {
        blogContainer.parentNode.insertBefore(searchIndicator, blogContainer);
    }
    
    // Add a clear button to the search bar
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper';
    searchBar.parentNode?.insertBefore(searchWrapper, searchBar);
    searchWrapper.appendChild(searchBar);
    

    // Keep track of all blog cards
    let allCards: HTMLElement[] = [];
    
    // Collect all blog cards once the page is loaded
    setTimeout(() => {
        allCards = Array.from(document.querySelectorAll('.blog-card'));
        console.log(`Initialized search with ${allCards.length} blog cards`);
    }, 100);
    
    // Handle search input with debounce
    let debounceTimer: ReturnType<typeof setTimeout>;
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.trim().toLowerCase();
        
        
        // Debounce the filtering
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterBlogCards(searchTerm);
        }, 300);
    });
    
    // Filter blog cards based on search term
    function filterBlogCards(term: string): void {
        if (allCards.length === 0) {
            allCards = Array.from(document.querySelectorAll('.blog-card'));
            if (allCards.length === 0) return;
        }
        
        let visibleCount = 0;
        
        allCards.forEach(card => {
            if (!term) {
                // If no search term, show all cards
                card.style.display = '';
                visibleCount++;
                return;
            }
            
            // Get text content from important elements within the card
            const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
            const description = card.querySelector('.card-description')?.textContent?.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.tag-badge'))
                .map(tag => tag.textContent?.toLowerCase() || '');
            
            // Check if the card matches the search term
            const matchesSearch = 
                title.includes(term) || 
                description.includes(term) || 
                tags.some(tag => tag.includes(term));
            
            // Show or hide the card based on the search match
            card.style.display = matchesSearch ? '' : 'none';
            if (matchesSearch) visibleCount++;
        });
        
        // Show or hide the search indicator
        searchIndicator.style.display = term ? 'block' : 'none';
        
        // Update the indicator text
        if (term) {
            searchIndicator.textContent = visibleCount > 0
                ? `Showing ${visibleCount} result${visibleCount > 1 ? 's' : ''} for "${term}"`
                : `No results found for "${term}"`;
        }
        
        // If there are no visible cards, show a message in the blog container
        const noResultsMessage = document.getElementById('no-search-results');
        if (visibleCount === 0 && term) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.id = 'no-search-results';
                message.className = 'empty-state';
                message.innerHTML = `
                    <i class="fas fa-search fa-3x"></i>
                    <h3>No matching posts found</h3>
                    <p>Try different keywords or <button class="clear-search-btn">clear search</button></p>
                `;
                
                // Find where to insert the message
                const container = document.querySelector('.blog-cards') || document.body;
                container.appendChild(message);
                
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // Add keyboard navigation
    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchBar.value = '';
            filterBlogCards('');
            searchBar.blur();
        }
    });

    console.log('Search functionality initialized');
}