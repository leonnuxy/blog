// src/utils/urlTransformer.ts (Example Location)

/**
 * Generates a root-relative URL path for filtering by tag on the main blog page.
 * Creates a URL like "/?tag=your-tag-name".
 *
 * @param tag - The tag string to filter by.
 * @returns The root-relative URL path with the tag query parameter.
 */
export function generateTagFilterUrl(tag: string): string {
    // Optional: Convert tag to lowercase for consistency in filtering
    const consistentTag = tag.toLowerCase(); 
    
    // URLSearchParams handles necessary encoding for query parameter values
    const params = new URLSearchParams({ tag: consistentTag }); 
    
    // Return a root-relative path. This works locally (resolves to http://localhost:3000/?tag=...)
    // and deployed under /blog/ (resolves to https://noelugwoke.com/blog/?tag=...)
    return `/?${params.toString()}`; 
}

/*
// Original function - kept for reference or if needed for different URL types
export function transformTagToUrlFormat(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-');
}
*/
