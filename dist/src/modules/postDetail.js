"use strict";
// src/modules/postDetail.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePostDetailPageLogic = initializePostDetailPageLogic;
exports.loadPostContent = loadPostContent;
exports.updatePostUI = updatePostUI;
exports.updatePageMetadata = updatePageMetadata;
exports.initializeSocialSharing = initializeSocialSharing;
exports.showErrorMessage = showErrorMessage;
// --- Imports ---
const api_1 = require("../services/api");
const urlTransformer_1 = require("../utils/urlTransformer");
const darkMode_1 = require("../components/darkMode");
const marked_1 = require("marked");
// --- Core Initialization Function ---
/**
 * Initializes all functionality for the post detail page.
 * This is the main exported function that should be called by the entry point.
 */
function initializePostDetailPageLogic() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, darkMode_1.checkSystemDarkModePreference)();
            (0, darkMode_1.initializeDarkMode)();
        }
        catch (e) {
            console.error(e);
        }
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        if (postId) {
            yield loadPostContent(postId);
        }
        else {
            console.error('No post ID provided in the URL');
            showErrorMessage('No post specified. Please check the URL.');
        }
    });
}
/**
 * Load and display post content based on post ID
 */
function loadPostContent(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, api_1.fetchPostById)(postId);
            if (!post)
                throw new Error(`Post with ID ${postId} not found`);
            yield updatePostUI(post); // Await the UI update
            updatePageMetadata(post);
            initializeSocialSharing(post);
        }
        catch (error) {
            console.error('Error loading post content:', error);
            showErrorMessage(`Failed to load the blog post. ${error instanceof Error ? error.message : 'Please try again later.'}`);
        }
    });
}
/**
 * Update the post UI with content from the loaded post
 */
function updatePostUI(post) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // 1) Hero
        const titleEl = document.getElementById('post-title');
        const dateEl = document.getElementById('post-date');
        const tagsEl = document.getElementById('post-tags');
        const imageEl = document.getElementById('post-image');
        if (titleEl)
            titleEl.textContent = post.title;
        if (dateEl)
            dateEl.textContent = new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        if (tagsEl) {
            tagsEl.innerHTML = post.tags
                .map(tag => `
          <a
            href="${(0, urlTransformer_1.generateTagFilterUrl)(tag)}"
            class="tag-badge"
          >${tag}</a>
        `)
                .join('');
        }
        if (imageEl)
            imageEl.src = post.imageUrl; // Set the featured image
        // 2) Content
        const contentEl = document.getElementById('post-content');
        if (contentEl) {
            contentEl.innerHTML = marked_1.marked.parse(post.content);
            // Add line-numbers class to all <pre> blocks
            contentEl
                .querySelectorAll('pre')
                .forEach(pre => pre.classList.add('line-numbers'));
            // Use whichever Prism reference is present
            const prismInstance = (_a = window.Prism) !== null && _a !== void 0 ? _a : Prism;
            if (typeof prismInstance.highlightAll === 'function') {
                prismInstance.highlightAll();
            }
        }
    });
}
/**
 * Update page metadata like title and URL
 */
function updatePageMetadata(post) {
    document.title = `${post.title} | Blog`;
}
/**
 * Initialize social sharing functionality
 */
function initializeSocialSharing(post) {
    const postArticleElement = document.getElementById('post-content');
    if (!postArticleElement)
        return;
    const socialSharingDiv = postArticleElement.querySelector('.social-sharing');
    if (socialSharingDiv) {
        socialSharingDiv.addEventListener('click', (event) => {
            const button = event.target.closest('.share-button');
            if (!button)
                return;
            event.preventDefault();
            const url = window.location.href;
            const text = `Check out this article: ${post.title}`;
            let shareWindowUrl = '';
            if (button.classList.contains('twitter')) {
                shareWindowUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                window.open(shareWindowUrl, 'twitter-share', 'width=550,height=235');
            }
            else if (button.classList.contains('facebook')) {
                shareWindowUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                window.open(shareWindowUrl, 'facebook-share', 'width=550,height=435');
            }
            else if (button.classList.contains('linkedin')) {
                shareWindowUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                window.open(shareWindowUrl, 'linkedin-share', 'width=550,height=435');
            }
        });
    }
}
/**
 * Display an error message to the user within the post content area
 */
function showErrorMessage(message) {
    const contentElement = document.getElementById('post-content');
    if (contentElement) {
        contentElement.innerHTML = `<div class="error-message">${message}</div>`;
    }
    else {
        alert(message); // Fallback
    }
}
