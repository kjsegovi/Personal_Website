import { spawnSync } from 'node:child_process';
import { rmSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { readArticles, renderFeed, escapeXml } from '../lib/notebook.mjs';
import { notebookEnabled } from '../lib/features.mjs';

// Never reuse a development artifact or honor the local draft-preview switch.
for (const directory of ['dist', '.vinext']) rmSync(directory, { recursive: true, force: true });
const env = { ...process.env, NODE_ENV: 'production' };
delete env.NOTEBOOK_PREVIEW_DRAFTS;
const result = spawnSync(process.execPath, ['node_modules/vinext/dist/cli.js', 'build'], { env, stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status ?? 1);
const output = path.resolve('dist/client');
const articles = readArticles();
writeFileSync(path.join(output, 'feed.xml'), renderFeed(notebookEnabled ? articles : []));

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith('.html') ? [file] : [];
  });
}
const pages = htmlFiles(output).filter((file) => !file.endsWith('/404.html'));
const paths = pages.map((file) => {
  const relative = path.relative(output, file).replaceAll(path.sep, '/');
  if (!relative.endsWith('index.html')) throw new Error(`Expected directory-index export, got ${relative}`);
  return '/' + relative.slice(0, -'index.html'.length);
});
const expected = ['/', '/projects/', '/about/', '/contact/', '/notebook/'];
for (const route of expected) if (!paths.includes(route)) throw new Error(`Missing static route: ${route}`);
const sitemap = paths.filter((route) => notebookEnabled || !route.startsWith('/notebook/')).sort().map((route) => {
  const article = articles.find((entry) => route === `/notebook/${entry.slug}/`);
  const date = article?.updatedAt ?? article?.publishedAt;
  return `<url><loc>${escapeXml(`https://segkev.com${route}`)}</loc>${date ? `<lastmod>${date}</lastmod>` : ''}</url>`;
}).join('');
writeFileSync(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`);
writeFileSync(path.join(output, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://segkev.com/sitemap.xml\n');

// Check the actual deployable artifact, not just article listings.
const drafts = readArticles({ includeDrafts: true }).filter((article) => article.state === 'draft');
function outputFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? outputFiles(file) : [file];
  });
}
for (const file of outputFiles(output)) {
  if (/\.(?:html|js|json|rsc|xml|txt|map)$/.test(file)) {
    const source = readFileSync(file, 'utf8');
    for (const draft of drafts) {
      if (source.includes(draft.title) || source.includes(`/notebook/${draft.slug}/`) || source.includes(draft.body.slice(0, 100))) {
        throw new Error(`Draft content found in production export: ${path.relative(output, file)}`);
      }
    }
    if (source.includes('/Users/kjsegovi/') || source.includes('content-review.md') || source.includes('.local-content')) throw new Error(`Private source reference in ${file}`);
  }
  if (file.endsWith('.map')) throw new Error('Do not publish source maps with this static site');
}
console.log(`Static export ready: ${paths.length} pages. ${drafts.length} drafts excluded. Deploy dist/client only.`);
