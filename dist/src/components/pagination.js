"use strict";
// src/components/pagination.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePagination = initializePagination;
/**
 * Sets up "Load More" pagination — desktop via button, mobile via infinite scroll.
 */
function initializePagination() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const visibleContainer = document.querySelector('.posts-grid');
    const hiddenContainer = document.getElementById('hidden-posts');
    // guard early and bail if any are missing
    if (!loadMoreBtn || !visibleContainer || !hiddenContainer) {
        console.warn('Pagination elements not found; skipping pagination setup.');
        return;
    }
    // from this point on, these three are guaranteed non‑null
    const btn = loadMoreBtn;
    const visible = visibleContainer;
    const hidden = hiddenContainer;
    const postsPerPage = 3;
    let isLoading = false;
    let scrollDebounce;
    /**
     * Move up to postsPerPage items from hidden → visible, with loading UI.
     */
    function loadMore() {
        if (isLoading)
            return;
        isLoading = true;
        // show loading state
        btn.classList.add('loading');
        btn.innerHTML = `<span class="spinner"></span> Loading…`;
        setTimeout(() => {
            let moved = 0;
            while (moved < postsPerPage && hidden.children.length) {
                const post = hidden.removeChild(hidden.children[0]);
                post.classList.add('new'); // optional animation class
                visible.appendChild(post);
                moved++;
            }
            // if no more hidden, hide button & stop infinite‑scroll
            if (!hidden.children.length) {
                btn.style.display = 'none';
                window.removeEventListener('scroll', onScroll);
            }
            // restore button UI
            btn.classList.remove('loading');
            btn.innerHTML = `<i class="fas fa-plus"></i> Load More`;
            isLoading = false;
        }, 600);
    }
    /**
     * Debounced scroll handler to trigger loadMore near bottom.
     */
    function onScroll() {
        clearTimeout(scrollDebounce);
        scrollDebounce = window.setTimeout(() => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 200) {
                loadMore();
            }
        }, 150);
    }
    // if no hidden posts up front, hide button immediately
    if (!hidden.children.length) {
        btn.style.display = 'none';
        return;
    }
    if (window.innerWidth < 768) {
        // mobile: infinite scroll
        btn.style.display = 'none';
        window.addEventListener('scroll', onScroll);
    }
    else {
        // desktop: click to load more
        btn.style.display = 'inline-flex';
        btn.addEventListener('click', loadMore);
    }
}
