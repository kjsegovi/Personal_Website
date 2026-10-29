import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { before, after, test } from 'node:test';
import { createStaticServer } from '../scripts/serve.mjs';
import { readArticles } from '../lib/notebook.mjs';
import { notebookEnabled } from '../lib/features.mjs';

const directory = path.resolve('dist/client');
const routes = ['/', '/projects/', '/about/', '/contact/', '/notebook/', '/projects/course-authoring-systems/', '/projects/habfly/', '/projects/embedded-learning/', '/projects/aws-infrastructure/', '/projects/oli-torus/', '/projects/tour-it/', '/projects/support-analytics/', '/projects/infiniscope-migration/'];
let server, base;
before(async () => {
  assert.ok(existsSync(path.join(directory, 'index.html')), 'Run pnpm build before these tests');
  server = createStaticServer(directory);
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { if (server?.listening) await new Promise((resolve) => server.close(resolve)); });

for (const route of routes) test(`exported ${route} works on direct visits and refreshes`, async () => {
  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /^text\/html/);
    const html = await response.text();
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'One primary heading');
    assert.match(html, /<main[^>]*id="main-content"/);
    assert.match(html, /Skip to main content/);
    assert.match(html, /aria-label="Primary navigation"/);
    assert.match(html, new RegExp(`<link[^>]*rel="canonical"[^>]*href="https://segkev\\.com${route}"`));
    assert.doesNotMatch(html, /PandoHealth|cat.bed|\/Users\/kjsegovi|Local draft review|Unpublished draft/i);
  }
});

test('featured projects and project cards follow the launch order', () => {
  const html = readFileSync(path.join(directory, 'index.html'), 'utf8');
  const cards = [...html.matchAll(/<h3><a[^>]*>([^<]+)/g)].map((match) => match[1].trim());
  assert.deepEqual(cards, ['Course Authoring Systems', 'HabFly', 'Tour It', 'AWS Infrastructure']);
  const projects = readFileSync(path.join(directory, 'projects/index.html'), 'utf8').replaceAll(/<!--[\s\S]*?-->/g, '');
  const projectNames = [...projects.matchAll(/<article class="project-card[^\"]*">([\s\S]*?)<\/article>/g)]
    .map(([, card]) => card.match(/<h3><a[^>]*>([^<]+)/)?.[1].trim());
  assert.deepEqual(projectNames, [
    'Course Authoring Systems', 'HabFly', 'Tour It', 'Infiniscope Migration',
    'OLI Torus', 'Embedded Learning', 'Support Ticket Analytics',
  ]);
  assert.doesNotMatch(html, /class="headline"|class="card-visual|Learning tools, experimental AI/);
  assert.doesNotMatch(html, /Recent notes/);
  const notebook = readFileSync(path.join(directory, 'notebook/index.html'), 'utf8');
  assert.match(notebook, /What belongs here/);
  assert.doesNotMatch(notebook, /Coming soon|Private draft|Unpublished/);
});

test('hidden notebook has no public discovery links and requests no indexing', () => {
  if (notebookEnabled) return;
  for (const route of routes.filter((route) => !route.startsWith('/notebook/'))) {
    const html = readFileSync(path.join(directory, route, 'index.html'), 'utf8');
    assert.doesNotMatch(html, /href="\/notebook\/|href="\/feed\.xml"|application\/rss\+xml/, route);
  }
  const notebook = readFileSync(path.join(directory, 'notebook/index.html'), 'utf8');
  assert.match(notebook, /<meta[^>]*name="robots"[^>]*content="noindex, nofollow"/);
});

test('all internal links, section links, and local image references resolve', () => {
  for (const route of routes) {
    const html = readFileSync(path.join(directory, route, 'index.html'), 'utf8');
    for (const [, reference] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
      if (/^(?:https?:|mailto:|data:)/.test(reference)) continue;
      const url = new URL(reference.replaceAll('&amp;', '&'), 'https://segkev.com' + route);
      if (url.origin !== 'https://segkev.com') continue;
      const target = path.join(directory, url.pathname, path.extname(url.pathname) ? '' : 'index.html');
      assert.ok(existsSync(target), `${route} references missing ${reference}`);
      if (url.hash && target.endsWith('.html')) {
        const targetHtml = readFileSync(target, 'utf8');
        assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route} references missing anchor ${reference}`);
      }
    }
  }
});

test('unknown paths and draft article URLs return a real 404', async () => {
  for (const route of ['/not-a-page/', '/projects/not-a-project/', '/notebook/not-a-note/', ...readArticles({ includeDrafts: true }).filter((article) => article.state === 'draft').map((article) => `/notebook/${article.slug}/`)]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 404, route);
    assert.match(await response.text(), /That page isn/);
  }
  const redirect = await fetch(base + '/projects', { redirect: 'manual' });
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get('location'), '/projects/');
});

test('the whole deployable directory excludes drafts, source maps, and private notes', () => {
  const drafts = readArticles({ includeDrafts: true }).filter((article) => article.state === 'draft');
  function files(root) { return readdirSync(root, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(path.join(root, entry.name)) : [path.join(root, entry.name)]); }
  for (const file of files(directory)) {
    assert.ok(!file.endsWith('.map'), file);
    assert.doesNotMatch(file, /content-review|content\/notebook|\.local-content/);
    if (/\.(html|js|json|rsc|xml|txt)$/.test(file)) {
      const text = readFileSync(file, 'utf8');
      for (const draft of drafts) {
        assert.ok(!text.includes(draft.title), `${file} leaks a draft title`);
        assert.ok(!text.includes(`/notebook/${draft.slug}/`), `${file} leaks a draft route`);
        assert.ok(!text.includes(draft.body.slice(0, 100)), `${file} leaks draft prose`);
      }
      assert.doesNotMatch(text, /\/Users\/kjsegovi\/|\.local-content/);
    }
  }
  assert.ok(!existsSync(path.join(directory, 'server')));
  assert.ok(existsSync(path.join(directory, '.nojekyll')));
});

test('sitemap and RSS describe the published collection only', async () => {
  const sitemapResponse = await fetch(base + '/sitemap.xml');
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace('https://segkev.com', ''));
  assert.deepEqual(locations.sort(), routes.filter((route) => notebookEnabled || !route.startsWith('/notebook/')).toSorted());
  const feed = await fetch(base + '/feed.xml');
  assert.equal(feed.status, 200);
  assert.match(feed.headers.get('content-type'), /xml/);
  assert.doesNotMatch(await feed.text(), /<item>/);
  assert.match(readFileSync(path.join(directory, 'robots.txt'), 'utf8'), /https:\/\/segkev.com\/sitemap.xml/);
});
