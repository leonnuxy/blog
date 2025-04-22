/**
 * Lazy Image Loader Utility
 * 
 * Uses Intersection Observer API to implement lazy loading for images.
 * Can be used for both regular <img> tags and CSS background images.
 */

/**
 * Initialize lazy loading for elements with background images
 * @param selector - CSS selector for elements to observe
 * @param options - IntersectionObserver options
 */
export function initBackgroundImageLazyLoading(
  selector: string = '.blog-card',
  options: IntersectionObserverInit = {
    rootMargin: '200px 0px',
    threshold: 0.1
  }
): void {
  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    console.warn('Intersection Observer not supported, background image lazy loading disabled');
    // Fallback: Load all images immediately if IO is not supported
    document.querySelectorAll(`${selector}:not([data-lazy-bg-loaded])`).forEach(element => {
      const el = element as HTMLElement;
      if (el.dataset.bgImage) {
        el.style.backgroundImage = `url("${el.dataset.bgImage}")`;
        el.dataset.lazyBgLoaded = 'true'; // Mark as loaded
        el.style.opacity = '1'; // Ensure visible
      }
    });
    return;
  }

  // Get all elements matching the selector that haven't been initialized yet
  const elements = document.querySelectorAll(`${selector}:not([data-lazy-bg-initialized])`);

  if (elements.length === 0) {
    // console.log('[LazyLoad] No new elements found for background lazy loading.');
    return; // No new elements to observe
  }

  // Create a new IntersectionObserver
  const observer = new IntersectionObserver((entries, obs) => { // Pass observer instance
    entries.forEach(entry => {
      const element = entry.target as HTMLElement;
      const elementId = element.dataset.postId || 'unknown'; // For logging

      // Check if the element has the bgImage dataset and is intersecting
      if (entry.isIntersecting && element.dataset.bgImage && element.dataset.lazyBgLoaded !== 'true') {
        console.log(`[LazyLoad] Element ${elementId} intersecting. Loading image: ${element.dataset.bgImage}`);
        // Element is entering viewport, add loading class for visual feedback
        // element.classList.add('loading'); // Removed as CSS handles initial state
        
        // Create an image object to preload the background
        const img = new Image();
        const imageUrl = element.dataset.bgImage;
        
        img.onload = () => {
          console.log(`[LazyLoad] Image loaded successfully for element ${elementId}: ${imageUrl}`);
          // Once image is loaded, set the background image style
          element.style.backgroundImage = `url("${imageUrl}")`;
          
          // Remove loading class and add loaded class for fade-in animation
          // element.classList.remove('loading'); // Removed
          element.classList.add('loaded');
          
          // Mark as loaded and stop observing the element
          element.dataset.lazyBgLoaded = 'true'; 
          obs.unobserve(element); // Use the observer instance passed to the callback
        };
        
        img.onerror = () => {
          console.error(`[LazyLoad] Failed to load background image for element ${elementId}: ${imageUrl}`);
          // element.classList.remove('loading'); // Removed
          // Optionally add an error state class
          element.style.opacity = '1'; // Make sure it's visible even on error (maybe show placeholder?)
          obs.unobserve(element); // Stop observing on error too
        };
        
        // Start loading the image
        img.src = imageUrl;

      } else if (entry.isIntersecting && element.dataset.lazyBgLoaded === 'true') {
         // Already loaded, do nothing, maybe log? 
         // console.log(`[LazyLoad] Element ${elementId} intersecting but already loaded.`);
      } else if (!entry.isIntersecting) {
        // Optional: Log when element leaves viewport
        // console.log(`[LazyLoad] Element ${elementId} left viewport.`);
      }
    });
  }, options);

  // Start observing each element
  elements.forEach(element => {
    const el = element as HTMLElement;
    // Check if it has the data attribute and hasn't been loaded
    if (el.dataset.bgImage && el.dataset.lazyBgLoaded !== 'true') {
      el.dataset.lazyBgInitialized = 'true'; // Mark as initialized to prevent re-observing
      // console.log(`[LazyLoad] Observing element ${el.dataset.postId || 'unknown'}`);
      observer.observe(el);
    } else if (!el.dataset.bgImage) {
      console.warn('[LazyLoad] Element selected for lazy loading is missing data-bg-image:', el);
    } else {
      // Already loaded or initialized, skip observation
      // console.log(`[LazyLoad] Skipping observation for already loaded/initialized element ${el.dataset.postId || 'unknown'}`);
    }
  });
}

/**
 * Apply fade-in animation to lazy-loaded images
 * Call this after images have been loaded via loading="lazy" attribute
 */
export function initImageFadeIn(
  selector: string = 'img[loading="lazy"]',
  options: IntersectionObserverInit = {
    rootMargin: '0px',
    threshold: 0.1
  }
): void {
  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    return;
  }

  // Get all elements matching the selector
  const images = document.querySelectorAll(selector);

  // Create a new IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLElement;
        
        // Add the fade-in class when image enters viewport
        image.classList.add('fade-in');
        
        // Stop observing the image
        observer.unobserve(image);
      }
    });
  }, options);

  // Start observing each image
  images.forEach(image => {
    // Add a class to set initial opacity to 0
    image.classList.add('lazy-image');
    
    // Start observing
    observer.observe(image);
  });
}
