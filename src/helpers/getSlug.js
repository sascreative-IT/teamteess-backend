export function getSlug(string) {
    let slug = "";
    slug = string.toLowerCase();
    slug = slug.replace(/\s+/g, '_');
    return slug;
}