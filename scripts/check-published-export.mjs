import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';
import { createStaticServer } from './serve.mjs';
import { notebookEnabled } from '../lib/features.mjs';

const fixture = path.resolve('content/notebook/export-check-fixture.md');
if (existsSync(fixture)) throw new Error('Refusing to overwrite an existing article');
function build() {
  const result = spawnSync(process.execPath, ['scripts/build.mjs'], {
    env: { ...process.env, NOTEBOOK_PREVIEW_DRAFTS: '1' }, encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(result.stdout + result.stderr);
}
let failure;
try {
  writeFileSync(fixture, `---
title: "Published export fixture"
summary: "A temporary check of the article publishing path."
slug: export-check-fixture
topics: [Testing]
project: habfly
state: published
publishedAt: "2026-10-15"
updatedAt: "2026-10-16"
---
## A generated article

This is temporary test content. **The complete article body is rendered.**

<script>shouldNeverExecute()</script>

## Results and next steps

The final paragraph remains on the same page.
`);
  build();
  const article = readFileSync('dist/client/notebook/export-check-fixture/index.html', 'utf8');
  assert.match(article, /<strong>The complete article body is rendered\.<\/strong>/);
  assert.match(article, /<time dateTime="2026-10-15"|<time datetime="2026-10-15"/);
  assert.match(article, /2026-10-16/);
  assert.match(article, /https:\/\/segkev.com\/notebook\/export-check-fixture\//);
  assert.doesNotMatch(article, /<script>shouldNeverExecute/);
  assert.match(article, /aria-label="In this article"/);
  for (const id of ['section-a-generated-article', 'section-results-and-next-steps']) {
    assert.ok(article.includes(`href="#${id}"`));
    assert.ok(article.includes(`id="${id}" tabindex="-1"`));
  }
  assert.match(article, /The final paragraph remains on the same page/);
  assert.match(article, /href="\/projects\/habfly\/"/);
  const project = readFileSync('dist/client/projects/habfly/index.html', 'utf8');
  if (notebookEnabled) assert.match(project, /href="\/notebook\/export-check-fixture\/"/);
  else assert.doesNotMatch(project, /href="\/notebook\/export-check-fixture\/"/);
  assert.doesNotMatch(article, /Next page|Previous page|Page 1 of/);
  const notebook = readFileSync('dist/client/notebook/index.html', 'utf8');
  assert.match(notebook, /export-check-fixture/);
  for (const file of ['index.html', 'sitemap.xml', 'feed.xml']) {
    const source = readFileSync(path.join('dist/client', file), 'utf8');
    if (notebookEnabled) assert.match(source, /export-check-fixture/, file);
    else assert.doesNotMatch(source, /export-check-fixture/, file);
  }
  if (!notebookEnabled) {
    for (const html of [article, notebook]) assert.match(html, /<meta[^>]*name="robots"[^>]*content="noindex, nofollow"/);
    const homepage = readFileSync('dist/client/index.html', 'utf8');
    assert.doesNotMatch(homepage, /href="\/notebook\/"|href="\/feed.xml"|application\/rss\+xml/);
  }
  const feed = readFileSync('dist/client/feed.xml', 'utf8');
  assert.equal((feed.match(/<item>/g) ?? []).length, notebookEnabled ? 1 : 0);
  const server = createStaticServer();
  try {
    await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
    const base = `http://127.0.0.1:${server.address().port}`;
    for (let visit = 0; visit < 2; visit++) {
      const response = await fetch(base + '/notebook/export-check-fixture/');
      assert.equal(response.status, 200);
      assert.match(await response.text(), /The final paragraph remains on the same page/);
    }
    assert.equal((await fetch(base + '/notebook/export-check-fixture/2/')).status, 404);
  } finally { if (server.listening) await new Promise(resolve => server.close(resolve)); }
  console.log('Continuous article, section anchors, visibility, direct visits, metadata, feed, and privacy checks passed.');
} catch (error) { failure = error; }
finally {
  rmSync(fixture, { force: true });
  build();
  assert.ok(!existsSync('dist/client/notebook/export-check-fixture'));
  console.log('Temporary article removed. Restored the public export with all three real articles still private.');
}
if (failure) throw failure;
