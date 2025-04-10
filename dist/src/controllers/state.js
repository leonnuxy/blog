"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchStateChange = exports.frontendState = exports.state = void 0;
// Initialize admin state
exports.state = {
    currentPage: 1,
    postsPerPage: 10,
    totalPages: 1,
    posts: [],
    loading: false,
    searchTerm: '',
    sortBy: 'newest',
    initialized: false
};
// Initialize frontend state
exports.frontendState = {
    darkMode: false,
    postsPerPage: 6, // Show 6 posts initially on frontend
    filteredTag: undefined
};
// State change event for components to react to state changes
const dispatchStateChange = (stateType, property) => {
    document.dispatchEvent(new CustomEvent('stateChange', {
        detail: { type: stateType, property }
    }));
};
exports.dispatchStateChange = dispatchStateChange;
