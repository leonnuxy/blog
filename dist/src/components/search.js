"use strict";
// src/components/search.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSearch = initializeSearch;
// Note: fetchBlogPosts and createBlogCardElement imports might not be needed 
// if this script only filters already rendered cards. Removed them for now.
// import { fetchBlogPosts } from '../services/api'; 
// import { createBlogCardElement } from './blogCards';
/**
 * Initializes a simple, client-side search functionality for blog posts.
 * Filters currently visible blog cards on the page as the user types.
 */
function initializeSearch() {
    var _a;
    const searchBar = document.querySelector('.search-bar');
    const blogCardsContainer = document.querySelector('#blog.blog-cards'); // Target the main container
    if (!searchBar || !blogCardsContainer) {
        console.warn('Search bar (.search-bar) or blog cards container (#blog.blog-cards) not found. Search not initialized.');
        return;
    }
    // Create a search indicator element (optional)
    const searchIndicator = document.createElement('div');
    searchIndicator.className = 'search-indicator'; // Add class for styling
    searchIndicator.setAttribute('aria-live', 'polite'); // Announce changes to screen readers
    searchIndicator.style.display = 'none'; // Start hidden
    // Insert the indicator before the blog cards container
    (_a = blogCardsContainer.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(searchIndicator, blogCardsContainer);
    // Optional: Wrap search bar for styling or adding clear button (if not already done)
    // This example assumes the search bar is already placed correctly in the header HTML
    // Keep track of all blog cards - will be populated on first filter
    let allCards = [];
    // Handle search input with debounce
    let debounceTimer;
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.trim().toLowerCase();
        // Debounce the filtering
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterBlogCards(searchTerm);
        }, 300); // 300ms delay
    });
    /**
     * Filters blog cards based on search term by adding/removing a CSS class.
     * @param term - The search term (lowercase).
     */
    function filterBlogCards(term) {
        // Get all cards currently in the main container OR hidden container if they exist
        // This ensures we filter everything, even paginated items if they are in the DOM
        // If pagination removes items from DOM, this needs adjustment.
        if (allCards.length === 0) { // Populate on first run or if cleared
            allCards = Array.from(document.querySelectorAll('#blog.blog-cards .blog-card, #hidden-posts .blog-card'));
            if (allCards.length === 0) {
                console.log("No blog cards found to filter.");
                return; // No cards rendered yet
            }
            console.log(`Search filtering initialized with ${allCards.length} cards.`);
        }
        let visibleCount = 0;
        allCards.forEach(card => {
            var _a, _b;
            let matchesSearch = false;
            if (!term) {
                // If no search term, show all cards
                matchesSearch = true;
            }
            else {
                // Get text content from important elements within the card
                const title = ((_b = (_a = card.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
                // Add other searchable fields if needed (e.g., excerpt, author)
                // const excerpt = card.querySelector('.blog-card-excerpt')?.textContent?.toLowerCase() || ''; 
                const tags = Array.from(card.querySelectorAll('.tag-badge')) // Assumes tags are rendered
                    .map(tag => { var _a; return ((_a = tag.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || ''; });
                // Check if the card matches the search term
                matchesSearch =
                    title.includes(term) ||
                        // excerpt.includes(term) || 
                        tags.some(tag => tag.includes(term));
            }
            // Show or hide the card using CSS class
            if (matchesSearch) {
                card.classList.remove('hidden-by-search');
                visibleCount++;
            }
            else {
                card.classList.add('hidden-by-search');
            }
        });
        // Show/Hide/Update the search indicator text
        if (term) {
            searchIndicator.textContent = visibleCount > 0
                ? `Showing ${visibleCount} result${visibleCount > 1 ? 's' : ''} for "${term}"`
                : `No results found for "${term}"`;
            searchIndicator.style.display = 'block';
        }
        else {
            searchIndicator.style.display = 'none'; // Hide indicator if search is cleared
        }
        // Handle "No results" message specifically within the container
        const noResultsMessage = blogCardsContainer === null || blogCardsContainer === void 0 ? void 0 : blogCardsContainer.querySelector('.no-search-results-message');
        if (visibleCount === 0 && term) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'empty-state no-search-results-message'; // Use existing empty-state styling
                message.innerHTML = `
                    <i class="fas fa-search fa-3x"></i>
                    <h3>No matching posts found</h3>
                    <p>Try different keywords.</p> 
                `; // Removed clear button here, Escape key works
                // if (blogCardsContainer) {
                //     blogCardsContainer.appendChild(message);
                // }
            }
        }
        else if (noResultsMessage) {
            noResultsMessage.remove();
        }
        // Optional: Dispatch event for pagination to potentially reset/update
        // document.dispatchEvent(new CustomEvent('searchApplied', { detail: { visibleCount } }));
    }
    // Add keyboard navigation (Escape key to clear)
    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchBar.value = ''; // Clear input
            filterBlogCards(''); // Re-filter with empty term
            searchBar.blur(); // Remove focus
        }
    });
    console.log('Search functionality initialized.');
}
