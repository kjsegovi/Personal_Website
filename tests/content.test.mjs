import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, readdirSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import matter from 'gray-matter';
import { parseArticle, readArticles, renderMarkdown, renderFeed, draftsEnabled, notebookDirectory, renderArticle } from '../lib/notebook.mjs';

const fixture = (state, extra = '', body = 'A fixture article.') => `---\ntitle: "A test article"\nsummary: "Testing <things> & links"\nslug: test-article\ntopics: [C, Electronics]\nstate: ${state}\npublishedAt: ${state === 'published' ? '"2026-10-15"' : 'null'}\nupdatedAt: null\n${extra}\n---\n${body}`;

test('only explicitly published articles enter the normal collection or RSS', () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), 'segkev-content-'));
  try {
    writeFileSync(path.join(directory, 'draft.md'), fixture('draft').replace('test-article', 'private-note').replace('A test article', 'Private title'));
    writeFileSync(path.join(directory, 'published.md'), fixture('published'));
    const articles = readArticles({ directory });
    assert.deepEqual(articles.map((article) => article.slug), ['test-article']);
    const all = readArticles({ directory, includeDrafts: true });
    assert.equal(all.length, 2);
    const feed = renderFeed(all);
    assert.match(feed, /https:\/\/segkev.com\/notebook\/test-article\//);
    assert.match(feed, /Testing &lt;things&gt; &amp; links/);
    assert.doesNotMatch(feed, /Private title|private-note/);
    assert.match(feed, /Thu, 15 Oct 2026/);
    assert.throws(() => parseArticle(fixture('published').replace('"2026-10-15"', 'null')), /publication date/);
    assert.throws(() => parseArticle(fixture('published').replace('updatedAt: null', 'updatedAt: "2025-10-15"')), /Update precedes/);
    writeFileSync(path.join(directory, 'duplicate.md'), fixture('published'));
    assert.throws(() => readArticles({ directory }), /Duplicate article slug/);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

test('article validation rejects malformed routes and missing metadata', () => {
  assert.throws(() => parseArticle(fixture('draft').replace('test-article', '../private')), /slug/);
  assert.throws(() => parseArticle(fixture('unknown')), /state/);
  assert.throws(() => parseArticle(fixture('published').replace('2026-10-15', '2026-02-31')), /publishedAt/);
  assert.throws(() => parseArticle(fixture('draft').replace('topics: [C, Electronics]', 'topics: []')), /topics/);
});

test('article section links have unique IDs and preserve all content in one document', () => {
  const body = 'Introduction.\n\n## Results\n\nFirst result.\n\n## Results\n\nSecond result.\n\n## Results 2\n\nThird result.\n\n## **Café** and `C`\n\nFinal paragraph.\n\n```md\n## Example heading\n```\n\n<script>alert(1)</script>';
  const {html, headings} = renderArticle(body);
  assert.deepEqual(headings.map(heading => heading.id), ['section-results', 'section-results-2', 'section-results-2-2', 'section-cafe-and-c']);
  assert.equal(headings[3].title, 'Café and C');
  for (const heading of headings) assert(html.includes(`id="${heading.id}" tabindex="-1"`));
  for (const text of ['Introduction.', 'First result.', 'Second result.', 'Third result.', 'Final paragraph.']) assert(html.includes(text));
  assert.equal(headings.length, 4);
  assert.doesNotMatch(html, /<script>/);
  assert.equal(parseArticle(fixture('draft', 'project: habfly')).project, 'habfly');
  assert.throws(() => parseArticle(fixture('draft', 'project: ../private')), /related project/);
});

test('Markdown renders code and tables but never enables raw HTML or script links', () => {
  const html = renderMarkdown('## A heading\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1))\n\n```c\nint n = 1;\n```\n\n| Input | Result |\n| --- | --- |\n| 1 | 2 |');
  assert.match(html, /<h2>A heading<\/h2>/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>|href="javascript:/);
  assert.match(html, /language-c/);
  assert.match(html, /<table>/);
  assert.match(html, /role="region" aria-label="Data table" tabindex="0"/);
});

test('draft preview requires local development even when its switch is set', () => {
  const original = { NODE_ENV: process.env.NODE_ENV, NOTEBOOK_PREVIEW_DRAFTS: process.env.NOTEBOOK_PREVIEW_DRAFTS, CI: process.env.CI };
  try {
    process.env.NOTEBOOK_PREVIEW_DRAFTS = '1'; delete process.env.CI;
    process.env.NODE_ENV = 'production'; assert.equal(draftsEnabled(), false);
    process.env.NODE_ENV = 'development'; assert.equal(draftsEnabled(), true);
    process.env.CI = 'true'; assert.equal(draftsEnabled(), false);
    delete process.env.CI; delete process.env.NOTEBOOK_PREVIEW_DRAFTS; assert.equal(draftsEnabled(), false);
  } finally { for (const [key, value] of Object.entries(original)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } }
});

// The source repository will be public, so filtering the deployment is not enough.
test('private drafts and review notes stay out of Git, and source articles are approved', () => {
  for (const file of ['.local-content/notebook/example.md', '.local-content/content-review.md']) {
    const result = spawnSync('git', ['check-ignore', '--quiet', file]);
    assert.equal(result.status, 0, `${file} must be ignored`);
  }
  const tracked = spawnSync('git', ['ls-files', '.local-content'], { encoding: 'utf8' });
  assert.equal(tracked.status, 0);
  assert.equal(tracked.stdout.trim(), '', 'Private local content must never be tracked');
  for (const file of readdirSync(notebookDirectory).filter(file => file.endsWith('.md'))) {
    assert.equal(parseArticle(readFileSync(path.join(notebookDirectory, file), 'utf8')).state, 'published', 'Keep draft articles in .local-content/notebook');
  }
});

test('Pages uploads only the static export and reserves write permissions for deployment', () => {
  const workflow = matter.engines.yaml.parse(readFileSync('.github/workflows/pages.yml', 'utf8'));
  assert.equal(workflow.permissions.contents, 'read');
  assert.equal(workflow.permissions.pages, undefined);
  assert.equal(workflow.jobs.deploy.needs, 'build');
  assert.equal(workflow.jobs.build.permissions, undefined);
  assert.deepEqual(Object.keys(workflow.on).sort(), ['pull_request', 'push', 'workflow_dispatch']);
  assert.deepEqual(workflow.on.pull_request.branches, ['main']);
  assert.deepEqual(workflow.on.push.branches, ['main']);
  const upload = workflow.jobs.build.steps.find((step) => step.uses?.startsWith('actions/upload-pages-artifact@'));
  assert.equal(upload.with.path, 'dist/client');
  assert.equal(workflow.jobs.deploy.permissions.pages, 'write');
  assert.equal(workflow.jobs.deploy.permissions['id-token'], 'write');
  assert.equal(workflow.jobs.deploy.environment.name, 'github-pages');
  assert(workflow.jobs.build.steps.some(step => step.run === 'pnpm check'));
  assert(workflow.jobs.build.steps.some(step => step.run === 'pnpm test:publishing'));
});

test('Pages stays unpublished unless an enabled manual release runs on main', () => {
  const workflow = matter.engines.yaml.parse(readFileSync('.github/workflows/pages.yml', 'utf8'));
  const input = workflow.on.workflow_dispatch.inputs.publish_site;
  assert.equal(input.type, 'boolean');
  assert.equal(input.default, false);
  const upload = workflow.jobs.build.steps.find(step => step.uses?.startsWith('actions/upload-pages-artifact@'));
  // These guards use only boolean comparisons and &&, shared by Actions and JS.
  // Evaluate the actual YAML expressions against release and non-release events.
  for (const event of ['push', 'pull_request', 'workflow_dispatch']) {
    for (const ref of ['refs/heads/main', 'refs/heads/codex/review', 'refs/tags/main']) {
      for (const publish of [undefined, false, true]) {
        for (const enabled of ['', 'false', 'true']) {
          const context = {
            github: { event_name: event, ref },
            inputs: publish === undefined ? {} : { publish_site: publish },
            vars: { PAGES_PUBLISH_ENABLED: enabled },
          };
          const expected = event === 'workflow_dispatch' && ref === 'refs/heads/main' && publish === true && enabled === 'true';
          for (const guard of [upload.if, workflow.jobs.deploy.if]) {
            assert.equal(runInNewContext(guard, context), expected, JSON.stringify(context));
          }
        }
      }
    }
  }
});
