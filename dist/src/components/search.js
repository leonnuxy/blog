"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSearch = initializeSearch;
/**
 * Initializes a simple, client-side search functionality for blog posts.
 * Filters currently visible blog cards on the page as the user types
 * or redirects to the homepage for searches on post detail pages.
 */
function initializeSearch() {
    const searchBar = document.querySelector('#search-input');
    const headerRight = document.querySelector('.header-right');
    const blogCardsContainer = document.querySelector('.posts-grid');
    if (!searchBar || !headerRight) {
        console.warn('Search elements not found. Skipping initialization.');
        return;
    }
    // live‑status + clear button
    const searchIndicator = document.createElement('div');
    searchIndicator.className = 'search-indicator';
    searchIndicator.setAttribute('aria-live', 'polite');
    searchIndicator.style.display = 'none';
    const clearFilterBtn = document.createElement('button');
    clearFilterBtn.className = 'clear-filter-btn';
    clearFilterBtn.innerHTML = '<i class="fas fa-times"></i> Clear Filter';
    clearFilterBtn.setAttribute('aria-label', 'Clear search filter');
    clearFilterBtn.type = 'button';
    clearFilterBtn.addEventListener('click', () => {
        searchBar.value = '';
        filterBlogCards('');
        searchBar.focus();
    });
    const textSpan = document.createElement('span');
    searchIndicator.append(textSpan, clearFilterBtn);
    headerRight.insertBefore(searchIndicator, headerRight.firstChild);
    let allCards = [];
    let debounceTimer;
    searchBar.addEventListener('input', () => {
        const term = searchBar.value.trim().toLowerCase();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => filterBlogCards(term), 300);
    });
    searchBar.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            searchBar.value = '';
            filterBlogCards('');
            searchBar.blur();
        }
    });
    function filterBlogCards(term) {
        const heroSection = document.getElementById('latest-hero');
        if (heroSection) {
            heroSection.style.display = term ? 'none' : '';
        }
        // on post page → redirect
        if (window.location.pathname.includes('post.html')) {
            window.location.href = term
                ? `/?search=${encodeURIComponent(term)}`
                : `/`;
            return;
        }
        if (!blogCardsContainer)
            return;
        if (allCards.length === 0) {
            allCards = Array.from(document.querySelectorAll('.posts-grid .blog-card, #hidden-posts .blog-card'));
            if (!allCards.length) {
                return;
            }
        }
        let visibleCount = 0;
        allCards.forEach(card => {
            var _a, _b;
            let matches = !term;
            if (term) {
                const title = ((_b = (_a = card.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
                const tags = Array.from(card.querySelectorAll('.tag-badge'))
                    .map(el => { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || ''; });
                matches = title.includes(term) || tags.some(t => t.includes(term));
            }
            card.classList.toggle('hidden-by-search', !matches);
            if (matches)
                visibleCount++;
        });
        textSpan.textContent = term
            ? (visibleCount
                ? `Showing ${visibleCount} result${visibleCount > 1 ? 's' : ''} for "${term}"`
                : `No results for "${term}"`)
            : '';
        searchIndicator.style.display = term ? 'block' : 'none';
        // no‑results message
        const noResults = blogCardsContainer.querySelector('.no-search-results-message');
        if (visibleCount === 0 && term) {
            if (!noResults) {
                const msg = document.createElement('div');
                msg.className = 'empty-state no-search-results-message';
                msg.innerHTML = `
          <i class="fas fa-search fa-3x"></i>
          <h3>No matching posts found</h3>
          <p>Try different keywords.</p>
        `;
                blogCardsContainer.append(msg);
            }
        }
        else if (noResults) {
            noResults.remove();
        }
    }
}
