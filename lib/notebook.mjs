import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

export const notebookDirectory = path.join(process.cwd(), 'content/notebook');
export const localDraftDirectory = path.join(process.cwd(), '.local-content/notebook');
const markdown = new MarkdownIt({ html: false, linkify: true, typographer: false });
markdown.renderer.rules.table_open = () => '<div class="article-table-scroll" role="region" aria-label="Data table" tabindex="0"><table>\n';
markdown.renderer.rules.table_close = () => '</table></div>\n';
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function draftsEnabled() {
  return process.env.NODE_ENV === 'development' && process.env.NOTEBOOK_PREVIEW_DRAFTS === '1' && !process.env.CI;
}

/** @param {string} source */
export function parseArticle(source) {
  const { data, content } = matter(source);
  for (const key of ['title', 'summary', 'slug']) {
    if (typeof data[key] !== 'string' || !data[key].trim()) throw new Error(`Article needs ${key}`);
  }
  if (!slugPattern.test(data.slug)) throw new Error(`Invalid article slug: ${data.slug}`);
  if (data.project != null && (typeof data.project !== 'string' || !slugPattern.test(data.project))) throw new Error(`Invalid related project: ${data.slug}`);
  if (!['draft', 'published'].includes(data.state)) throw new Error(`Invalid article state: ${data.slug}`);
  if (!Array.isArray(data.topics) || !data.topics.length || !data.topics.every((topic) => typeof topic === 'string' && topic.trim())) {
    throw new Error(`Article needs topics: ${data.slug}`);
  }
  for (const key of ['publishedAt', 'updatedAt']) {
    const value = data[key];
    if (value != null && (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || (!Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value))) {
      throw new Error(`Invalid ${key}: ${data.slug}`);
    }
  }
  if (data.state === 'published' && !data.publishedAt) throw new Error(`Published article needs a publication date: ${data.slug}`);
  if (data.updatedAt && data.publishedAt && data.updatedAt < data.publishedAt) throw new Error(`Update precedes publication: ${data.slug}`);
  // Explicit fields keep private frontmatter out of page props and syndication.
  return {
    slug: /** @type {string} */ (data.slug), title: /** @type {string} */ (data.title),
    summary: /** @type {string} */ (data.summary), topics: /** @type {string[]} */ (data.topics),
    state: /** @type {'draft' | 'published'} */ (data.state),
    publishedAt: /** @type {string | null} */ (data.publishedAt ?? null),
    updatedAt: /** @type {string | null} */ (data.updatedAt ?? null), body: content.trim(),
    project: /** @type {string | null} */ (data.project ?? null),
  };
}

export function readArticles({ includeDrafts = false, directory = notebookDirectory } = {}) {
  const seen = new Set();
  const directories = [directory];
  if (includeDrafts && directory === notebookDirectory && existsSync(localDraftDirectory)) directories.push(localDraftDirectory);
  const articles = directories.flatMap((sourceDirectory) => readdirSync(sourceDirectory).filter((file) => file.endsWith('.md')).map((file) => {
    const article = parseArticle(readFileSync(path.join(sourceDirectory, file), 'utf8'));
    if (sourceDirectory === localDraftDirectory && article.state !== 'draft') throw new Error(`Move approved articles into content/notebook before publishing: ${article.slug}`);
    if (seen.has(article.slug)) throw new Error(`Duplicate article slug: ${article.slug}`);
    seen.add(article.slug);
    return article;
  }));
  return articles.filter((article) => article.state === 'published' || includeDrafts)
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '') || a.title.localeCompare(b.title));
}

/** @param {string} body */
export function renderMarkdown(body) {
  return markdown.render(body);
}

/** Render one continuous article and derive section links from the same tokens. */
export function renderArticle(body) {
  const tokens = markdown.parse(body, {});
  const headings = [];
  const used = new Set();
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    if (token.type !== 'heading_open' || token.tag !== 'h2' || token.level !== 0) continue;
    const inline = tokens[index + 1];
    const title = (inline.children ?? []).map(child => child.type === 'softbreak' ? ' ' : child.content).join('');
    const stem = 'section-' + (title.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'heading');
    let id = stem;
    let suffix = 2;
    while (used.has(id)) id = `${stem}-${suffix++}`;
    used.add(id);
    token.attrSet('id', id);
    token.attrSet('tabindex', '-1');
    headings.push({ id, title });
  }
  return { html: markdown.renderer.render(tokens, markdown.options, {}), headings };
}

/** @param {string} value */
export function escapeXml(value) {
  return value.replace(/[<>&"']/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]);
}

/** @param {ReturnType<typeof readArticles>} articles */
export function renderFeed(articles) {
  const items = articles.filter((article) => article.state === 'published').map((article) => {
    const url = `https://segkev.com/notebook/${article.slug}/`;
    return `<item><title>${escapeXml(article.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(article.summary)}</description><pubDate>${new Date(article.publishedAt + 'T12:00:00Z').toUTCString()}</pubDate>${article.topics.map((topic) => `<category>${escapeXml(topic)}</category>`).join('')}</item>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Kevin Segovia — Notebook</title><link>https://segkev.com/notebook/</link><description>Notes on software, electronics, and home servers.</description><language>en-us</language><atom:link href="https://segkev.com/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
}
