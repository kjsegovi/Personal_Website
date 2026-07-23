import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Kevin Segovia's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Kevin Segovia \| Accessible Products, Backend Systems &amp; AI Infrastructure<\/title>/i,
  );
  assert.match(html, /<h1[^>]*>Kevin Segovia<\/h1>/i);
  assert.match(html, /href="#work"/i);
  assert.match(html, /href="#experience"/i);
  assert.match(html, /href="#credentials"/i);
  assert.match(html, /href="#contact"/i);
  assert.match(html, /Skip to main content/i);
  assert.match(html, /alt="Kevin Segovia smiling in a white shirt\."/i);
  assert.match(html, /OLI Torus/i);
  assert.match(html, /Google Slides-to-Torus importer/i);
  assert.match(html, /Advanced Author \/ Automation POC/i);
  assert.match(html, /oli-torus-simple-author-ai\/commit\/8d174158/i);
  assert.match(html, /Support Ticket Analytics/i);
  assert.match(html, /Into the Animal Cell/i);
  assert.match(html, /MacChatLMBackend/i);
  assert.match(html, /mailto:kjsegovi@icloud\.com/i);
  assert.doesNotMatch(html, /gmail|telephone|phone number|download (my )?résumé/i);
});

test("keeps the final portfolio self-contained and accessible", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(page, /imageSrc\?: string/);
  assert.match(page, /imageAlt\?: string/);
  assert.match(page, /imagePosition\?: string/);
  assert.match(page, /<main id="main-content">/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(layout, /themeColor: "#14213D"/);
  assert.match(css, /--black: #000000/);
  assert.match(css, /--navy: #14213d/i);
  assert.match(css, /--orange: #fca311/i);
  assert.match(css, /--gray: #e5e5e5/i);
  assert.match(css, /--white: #ffffff/i);
  assert.match(css, /prefers-reduced-motion: reduce/);

  assert.deepEqual(
    await readdir(new URL("../app/_sites-preview", import.meta.url)),
    [],
  );
  await access(new URL("../public/kevin-segovia-portrait.png", import.meta.url));
  await access(new URL("../public/github-avatar.png", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("package.json", projectRoot));
});
