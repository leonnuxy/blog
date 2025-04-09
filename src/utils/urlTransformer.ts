// src/utils/urlTransformer.ts (Example Location)

/**
 * Generates a URL path for filtering by tag on the main blog page.
 * Creates a URL like "/blog/?tag=your-tag-name" or "/?tag=your-tag-name" based on environment.
 *
 * @param tag - The tag string to filter by.
 * @returns The URL path with the tag query parameter.
 */
export function generateTagFilterUrl(tag: string): string {
    // Optional: Convert tag to lowercase for consistency in filtering
    const consistentTag = tag.toLowerCase(); 
    
    // URLSearchParams handles necessary encoding for query parameter values
    const params = new URLSearchParams({ tag: consistentTag }); 
    
    // Check if we're on the production site by looking at the hostname
    const isProduction = window.location.hostname === 'noelugwoke.com';
    const basePath = isProduction ? '/blog/' : '/';
    
    return `${basePath}?${params.toString()}`; 
}

/*
// Original function - kept for reference or if needed for different URL types
export function transformTagToUrlFormat(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-');
}
*/
