// src/components/search.ts

import { fetchBlogPosts } from '../services/api'; // Import if not already there

/**
 * Initializes a simple, client-side search functionality for blog posts.
 * Filters currently visible blog cards on the page as the user types or redirects to the homepage for search on post detail pages.
 */
export function initializeSearch(): void {
    const searchBar = document.querySelector('#search-input') as HTMLInputElement;
    const blogCardsContainer = document.querySelector('#blog.blog-cards'); // Target the main container
    const heroSection = document.querySelector('.hero') as HTMLElement | null; // Get hero section (can be null)
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
    headerRight?.insertBefore(searchIndicator, headerRight.firstChild);

    let allCards: HTMLElement[] = [];
    let debounceTimer: ReturnType<typeof setTimeout>;

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.trim().toLowerCase();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterBlogCards(searchTerm);
        }, 300);
    });

    function filterBlogCards(term: string): void {
        if (window.location.pathname.includes('post.html')) {
            if (term) {
                window.location.href = `/?search=${encodeURIComponent(term)}`;
            } else {
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
            let matchesSearch = false;
            if (!term) {
                matchesSearch = true;
            } else {
                const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
                const tags = Array.from(card.querySelectorAll('.tag-badge'))
                    .map(tag => tag.textContent?.toLowerCase() || '');
                matchesSearch =
                    title.includes(term) ||
                    tags.some(tag => tag.includes(term));
            }
            if (matchesSearch) {
                card.classList.remove('hidden-by-search');
                visibleCount++;
            } else {
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
        } else if (noResultsMessage) {
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