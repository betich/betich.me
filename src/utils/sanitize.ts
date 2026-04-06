/**
 * Strip MDX/markdown to plain text for use in meta descriptions.
 */
export function mdxToText(body: string, maxLength = 160): string {
  const text = body
    .replace(/^---[\s\S]*?---\s*/m, "")            // frontmatter
    .replace(/^import\s+.+$/gm, "")                 // import statements
    .replace(/^export\s+.+$/gm, "")                 // export statements
    .replace(/<[^>]+>/g, "")                         // JSX/HTML tags
    .replace(/!\[.*?\]\(.*?\)/g, "")                 // images
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")           // links → text
    .replace(/^#{1,6}\s+/gm, "")                     // headings
    .replace(/(\*\*|__)(.*?)\1/g, "$2")              // bold
    .replace(/(\*|_)(.*?)\1/g, "$2")                 // italic
    .replace(/`{1,3}[^`]*`{1,3}/g, "")              // inline/block code
    .replace(/^[-*+]\s+/gm, "")                      // list bullets
    .replace(/^\d+\.\s+/gm, "")                      // ordered list
    .replace(/^>\s+/gm, "")                          // blockquotes
    .replace(/^---+$/gm, "")                          // hr
    .replace(/\n{2,}/g, " ")                          // multiple newlines → space
    .replace(/\n/g, " ")                              // remaining newlines
    .replace(/\s{2,}/g, " ")                          // collapse spaces
    .trim();

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s\S*$/, "") + "…";
}
