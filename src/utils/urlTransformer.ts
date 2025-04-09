/**
 * Transforms a tag into a URL-friendly format.
 * Replaces spaces with dashes and converts the string to lowercase.
 *
 * @param tag - The tag to transform.
 * @returns The transformed tag.
 */
export function transformTagToUrlFormat(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Transforms a tag into a URL-friendly format and appends it to the correct blog homepage URL.
 *
 * @param tag - The tag to transform.
 * @returns The full URL with the tag query parameter.
 */
export function generateTagUrl(tag: string): string {
    const baseUrl = process.env.BLOG_BASE_URL || 'https://noelugwoke.com/blog/';
    const transformedTag = transformTagToUrlFormat(tag);
    const params = new URLSearchParams({ tag: transformedTag });
    return `${baseUrl}?${params.toString()}`;
}