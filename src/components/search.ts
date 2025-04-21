// src/components/search.ts

/**
 * Initializes a simple, client-side search functionality for blog posts.
 * Filters currently visible blog cards on the page as the user types
 * in either the desktop header or the mobile drawer search inputs,
 * and hides the hero section when filtering. On post detail pages,
 * redirects back to home with a `?search=` param.
 */
export function initializeSearch(): void {
  // grab both desktop and mobile search inputs
  const desktopInput = document.querySelector<HTMLInputElement>('#search-input');
  const mobileInput  = document.querySelector<HTMLInputElement>('#search-input-mobile');
  const headerRight  = document.querySelector<HTMLElement>('.header-right');
  const blogCardsContainer = document.querySelector<HTMLElement>('.posts-grid');

  // need at least one input + header container
  if (!headerRight) {
    console.warn('Header container not found; skipping search initialization.');
    return;
  }
  if (!desktopInput && !mobileInput) {
    console.warn('No search inputs found; skipping search initialization.');
    return;
  }

  // create live‑status indicator + clear button
  const searchIndicator = document.createElement('div');
  searchIndicator.className = 'search-indicator';
  searchIndicator.setAttribute('aria-live', 'polite');
  searchIndicator.style.display = 'none';

  const clearFilterBtn = document.createElement('button');
  clearFilterBtn.className = 'clear-filter-btn';
  clearFilterBtn.innerHTML = '<i class="fas fa-times"></i>';
  clearFilterBtn.setAttribute('aria-label', 'Clear search filter');
  clearFilterBtn.type = 'button';
  clearFilterBtn.addEventListener('click', () => {
    // clear both inputs
    if (desktopInput) desktopInput.value = '';
    if (mobileInput)  mobileInput.value  = '';
    filterBlogCards('');
    // focus desktop input if present, else mobile
    (desktopInput || mobileInput)?.focus();
  });

  const textSpan = document.createElement('span');
  searchIndicator.append(textSpan, clearFilterBtn);
  // insert indicator to the left of existing header widgets
  headerRight.insertBefore(searchIndicator, headerRight.firstChild);

  let allCards: HTMLElement[] = [];
  let debounceTimer: ReturnType<typeof setTimeout>;

  // unify input listener
  function onInput(e: Event) {
    const term = ((e.target as HTMLInputElement).value || '').trim().toLowerCase();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => filterBlogCards(term), 300);
  }

  // wire up desktop input
  if (desktopInput) {
    desktopInput.addEventListener('input', onInput);
    desktopInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        desktopInput.value = '';
        filterBlogCards('');
        desktopInput.blur();
      }
    });
  }

  // wire up mobile input
  if (mobileInput) {
    mobileInput.addEventListener('input', onInput);
    mobileInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        mobileInput.value = '';
        filterBlogCards('');
        mobileInput.blur();
      }
    });
  }

  /**
   * Core filtering logic.
   */
  function filterBlogCards(term: string): void {
    // hide or show hero based on search term
    const heroSection = document.getElementById('latest-hero');
    if (heroSection) {
      heroSection.style.display = term ? 'none' : '';
    }

    // on a post-detail page, redirect instead of in-place filtering
    if (window.location.pathname.includes('post.html')) {
      window.location.href = term
        ? `/?search=${encodeURIComponent(term)}`
        : `/`;
      return;
    }

    if (!blogCardsContainer) return;

    // collect cards once
    if (allCards.length === 0) {
      allCards = Array.from(
        document.querySelectorAll('.posts-grid .blog-card, #hidden-posts .blog-card')
      ) as HTMLElement[];
    }

    let visibleCount = 0;
    allCards.forEach(card => {
      let matches = !term;
      if (term) {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const tags  = Array.from(card.querySelectorAll('.tag-badge'))
                           .map(el => el.textContent?.toLowerCase() || '');
        matches = title.includes(term) || tags.some(t => t.includes(term));
      }
      card.classList.toggle('hidden-by-search', !matches);
      if (matches) visibleCount++;
    });

    // update indicator text & visibility
    textSpan.textContent = term
      ? (visibleCount > 0
          ? `Showing ${visibleCount} result${visibleCount > 1 ? 's' : ''} for "${term}"`
          : `No results for "${term}"`)
      : '';
    searchIndicator.style.display = term ? 'block' : 'none';

    // handle "no results" empty state below the cards
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
    } else if (noResults) {
      noResults.remove();
    }
  }
}
