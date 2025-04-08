/**
 * Post detail controller
 * Handles loading and displaying individual blog posts
 */
import { initializePostDetailPageLogic } from '../modules/postDetail';

/**
 * Initialize the post detail page by delegating to the module logic
 */
export async function initializePostDetail(): Promise<void> {
  await initializePostDetailPageLogic();
}