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