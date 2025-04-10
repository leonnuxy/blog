"use strict";
// src/components/search.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSearch = initializeSearch;
/**
 * Initializes a simple, client-side search functionality for blog posts.
 * Filters currently visible blog cards on the page as the user types or redirects to the homepage for search on post detail pages.
 */
function initializeSearch() {
    const searchBar = document.querySelector('#search-input');
    const blogCardsContainer = document.querySelector('#blog.blog-cards'); // Target the main container
    const heroSection = document.querySelector('.hero'); // Get hero section (can be null)
    const searchIndicator = document.createElement('div');
    searchIndicator.className = 'search-indicator';
    searchIndicator.setAttribute('aria-live', 'polite');
    searchIndicator.style.display = 'none';
    const clearFilterBtn = document.createElement('button');
    clearFilterBtn.className = 'clear-filter-btn';
    clearFilterBtn.innerHTML = '<i class="fas fa-times"></i> Clear Filter';
    clearFilterBtn.setAttribute('aria-label', 'Clear search filter and return to homepage');
    clearFilterBtn.addEventListener('click', () => {
        searchBar.value = '';
        filterBlogCards('');
        searchBar.focus();
    });
    searchIndicator.appendChild(document.createElement('span'));
    searchIndicator.appendChild(clearFilterBtn);
    const headerRight = document.querySelector('.header-right');
    headerRight === null || headerRight === void 0 ? void 0 : headerRight.insertBefore(searchIndicator, headerRight.firstChild);
    let allCards = [];
    let debounceTimer;
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.trim().toLowerCase();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterBlogCards(searchTerm);
        }, 300);
    });
    function filterBlogCards(term) {
        if (window.location.pathname.includes('post.html')) {
            if (term) {
                window.location.href = `/?search=${encodeURIComponent(term)}`;
            }
            else {
                window.location.href = `/`; // Redirect to homepage if search is cleared
            }
            return; // Exit the function as we've redirected
        }
        // if (heroSection) {
        //     heroSection.style.display = term ? 'none' : '';
        // }
        if (!blogCardsContainer) {
            return; // If no blog cards container (not on main page), do nothing more
        }
        if (allCards.length === 0) {
            allCards = Array.from(document.querySelectorAll('#blog.blog-cards .blog-card, #hidden-posts .blog-card'));
            if (allCards.length === 0) {
                console.log("No blog cards found to filter.");
                return;
            }
            console.log(`Search filtering initialized with ${allCards.length} cards.`);
        }
        let visibleCount = 0;
        allCards.forEach(card => {
            var _a, _b;
            let matchesSearch = false;
            if (!term) {
                matchesSearch = true;
            }
            else {
                const title = ((_b = (_a = card.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
                const tags = Array.from(card.querySelectorAll('.tag-badge'))
                    .map(tag => { var _a; return ((_a = tag.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || ''; });
                matchesSearch =
                    title.includes(term) ||
                        tags.some(tag => tag.includes(term));
            }
            if (matchesSearch) {
                card.classList.remove('hidden-by-search');
                visibleCount++;
            }
            else {
                card.classList.add('hidden-by-search');
            }
        });
        const textSpan = searchIndicator.querySelector('span');
        if (textSpan) {
            textSpan.textContent = term
                ? (visibleCount > 0
                    ? `Showing ${visibleCount} result${visibleCount > 1 ? 's' : ''} for "${term}"`
                    : `No results found for "${term}"`)
                : '';
        }
        searchIndicator.style.display = term ? 'block' : 'none';
        const noResultsMessage = blogCardsContainer.querySelector('.no-search-results-message');
        if (visibleCount === 0 && term) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'empty-state no-search-results-message';
                message.innerHTML = `
                    <i class="fas fa-search fa-3x"></i>
                    <h3>No matching posts found</h3>
                    <p>Try different keywords.</p>
                `;
                blogCardsContainer.appendChild(message);
            }
        }
        else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchBar.value = '';
            filterBlogCards('');
            searchBar.blur();
        }
    });
    const searchButton = document.querySelector('#search-button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchBar.value.trim().toLowerCase();
            filterBlogCards(searchTerm);
        });
    }
}
