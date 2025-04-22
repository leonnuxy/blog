// src/components/search.ts

/**
 * Initializes a simple, client-side search functionality for blog posts.
 * Filters currently visible blog cards on the page as the user types
 * in either the desktop header or the mobile drawer search inputs,
 * and hides the hero section when filtering. On post detail pages,
 * redirects back to home with a `?search=` param.
 */
export function initializeSearch(): void {
  const desktopInput = document.querySelector<HTMLInputElement>('#search-input');
  const mobileInput  = document.querySelector<HTMLInputElement>('#search-input-mobile');
  const headerRight  = document.querySelector<HTMLElement>('.header-right');
  const blogCardsContainer = document.querySelector<HTMLElement>('.posts-grid');

  if (!headerRight || (!desktopInput && !mobileInput)) {
    console.warn('Search init skipped—no inputs/header');
    return;
  }

  // 1) Indicator box (only text + desktop clear ×)
  const searchIndicator = document.createElement('div');
  searchIndicator.className = 'search-indicator';
  searchIndicator.setAttribute('aria-live', 'polite');
  searchIndicator.style.display = 'none';
  const textSpan = document.createElement('span');

  const clearFilterBtn = document.createElement('button');
  clearFilterBtn.className = 'clear-filter-btn';
  clearFilterBtn.innerHTML = '<i class="fas fa-times"></i>';
  clearFilterBtn.setAttribute('aria-label', 'Clear search filter');
  clearFilterBtn.type = 'button';
  clearFilterBtn.addEventListener('click', () => {
    if (desktopInput) desktopInput.value = '';
    if (mobileInput)  mobileInput.value  = '';
    filterBlogCards('');
    (desktopInput || mobileInput)?.focus();
  });

  searchIndicator.append(textSpan, clearFilterBtn);
  headerRight.insertBefore(searchIndicator, headerRight.firstChild);

  // 2) Mobile “Clear Search ×” outside of the indicator
  const mobileClearBtn = document.createElement('button');
  mobileClearBtn.className = 'mobile-clear-btn';
  mobileClearBtn.textContent = 'Clear Search ×';
  mobileClearBtn.type = 'button';
  mobileClearBtn.style.display = 'none'; // hidden initially
  mobileClearBtn.addEventListener('click', () => {
    if (desktopInput) desktopInput.value = '';
    if (mobileInput)  mobileInput.value  = '';
    filterBlogCards('');
    (desktopInput || mobileInput)?.focus();
  });
  headerRight.insertBefore(mobileClearBtn, searchIndicator.nextSibling);

  let allCards: HTMLElement[] = [];
  let debounceTimer: ReturnType<typeof setTimeout>;

  function onInput(e: Event) {
    const term = ((e.target as HTMLInputElement).value || '').trim().toLowerCase();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => filterBlogCards(term), 300);
  }

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

  function filterBlogCards(term: string): void {
    // hide hero section on homepage
    document.getElementById('latest-hero')
      ?.style.setProperty('display', term ? 'none' : '');

    // on a post page, redirect instead of filtering in-place
    if (window.location.pathname.includes('post.html')) {
      window.location.href = term
        ? `/?search=${encodeURIComponent(term)}`
        : `/`;
      return;
    }
    if (!blogCardsContainer) return;

    // collect all cards once
    if (allCards.length === 0) {
      allCards = Array.from(
        document.querySelectorAll('.posts-grid .blog-card, #hidden-posts .blog-card')
      ) as HTMLElement[];
    }

    let visibleCount = 0;
    allCards.forEach(card => {
      let matches = !term;
      if (term) {
        const title   = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const tags    = Array.from(card.querySelectorAll('.tag-badge'))
                              .map(el => el.textContent?.toLowerCase() || '');
        const excerpt = card.querySelector('.post-excerpt')?.textContent?.toLowerCase() || '';
        matches = title.includes(term)
               || tags.some(t => t.includes(term))
               || excerpt.includes(term);
      }
      card.classList.toggle('hidden-by-search', !matches);
      if (matches) visibleCount++;
    });

    // update indicator
    textSpan.textContent = term
      ? (visibleCount > 0
          ? `Showing ${visibleCount} result${visibleCount > 1 ? 's' : ''} for "${term}"`
          : `No results for "${term}"`)
      : '';

    // desktop: keep indicator hidden; mobile: toggle clear‑button state
    if (term) {
      searchIndicator.style.display = 'none';
      mobileClearBtn.classList.add('active');
      mobileClearBtn.style.display = ''; // show on mobile
    } else {
      searchIndicator.style.display = 'none';
      mobileClearBtn.classList.remove('active');
      mobileClearBtn.style.display = 'none';
    }

    // handle “no results” state
    const noResults = blogCardsContainer.querySelector('.no-search-results-message');
    if (visibleCount === 0 && term) {
      if (!noResults) {
        const msg = document.createElement('div');
        msg.className = 'empty-state no-search-results-message';
        msg.innerHTML = `
          <i class="fas fa-search fa-3x"></i>
          <h3>No matching posts found</h3>
          <p>Try different keywords.</p>`;
        blogCardsContainer.append(msg);
      }
    } else if (noResults) {
      noResults.remove();
    }
  }
}

// --- AUTO‑SHOW DESKTOP SEARCH if the URL has ?showSearch=1 ---
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('showSearch')) {
    const desktopContainer = document.querySelector<HTMLElement>('.search-container');
    const desktopInput     = document.querySelector<HTMLInputElement>('#search-input');
    if (desktopContainer) {
      desktopContainer.style.display = 'flex';
      desktopInput?.focus();
    }
  }
});
