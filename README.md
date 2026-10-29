# segkev.com

Kevin Segovia's portfolio and notebook. React, TypeScript, and Vinext generate a static site for GitHub Pages. Cloudflare remains the domain registrar and DNS provider.

The source repository is public. Unpublished articles and editorial notes live in the Git-ignored `.local-content/` directory on Kevin's machine. They are not part of the repository or deployment.

The notebook is temporarily hidden through `notebookEnabled = false` in `lib/features.mjs`. Navigation, article promotion, RSS discovery, and notebook sitemap entries are disabled. Direct notebook pages remain available with `noindex`, and private draft preview still works. Set the flag to `true` and rebuild when articles are ready to promote; the flag is a visibility setting, not access control.

## Local development

Use Node.js 22.13 or later and pnpm 12.11.2 (recorded in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development server binds to loopback. To review local, unpublished entries:

```sh
pnpm dev:drafts
```

Open `/notebook/` at the printed local address. Draft pages have a review banner and `noindex` metadata. This switch works only in local development, not in CI or production builds. Do not expose the development server to the internet. A fresh clone has no local drafts and will show the notebook introduction until an approved article exists.

## Build and check

```sh
pnpm check
pnpm test:publishing
pnpm start
```

`pnpm check` runs TypeScript, generates the static export, and runs content and exported-page tests. Vinext opens a temporary loopback server during export; a sandbox must permit local listening. `pnpm start` serves the export at `http://127.0.0.1:4318`. Set `PORT` to use another port.

`pnpm test:publishing` temporarily adds a self-contained published fixture, checks the full article export and discovery files, then removes it and rebuilds the original collection. It does not change the state of real articles.

The only deployment directory is **`dist/client/`**. `dist/server/` is an intermediate build artifact, not a service to deploy. Never upload the whole repository or the whole `dist/` directory.

## Content and local drafts

- `lib/projects.ts`: shared project cards and case-study sections.
- `content/notebook/*.md`: approved, published articles only. These files will be public source.
- `.local-content/notebook/*.md`: unpublished drafts, ignored by Git and read only for local preview and export checks.
- `.local-content/content-review.md`: private source references, unresolved facts, and the article review checklist; not present in a fresh clone.
- `public/`: intentionally public assets only. All files here are copied to the export. Never put unpublished attachments here.

Local draft metadata:

```yaml
title: "An article title"
summary: "A short description."
slug: an-article-title
topics: [Electronics]
state: draft
publishedAt: null
updatedAt: null
```

After review, move the article from `.local-content/notebook/` to `content/notebook/`, set `state: published`, and use a quoted `publishedAt: "YYYY-MM-DD"` with the actual publication date. Optional `updatedAt` records a later substantive edit. No dates are inferred from file timestamps. An article left in the local folder cannot become public by changing its state alone.

The checks reject draft articles in the public source folder and verify that the private folder is ignored and untracked. The build separately scans deployable text files for local draft titles, text, and routes.

Markdown is rendered at build time by `gray-matter` and `markdown-it`, with raw HTML disabled. Code fences, links, lists, and tables are supported.

Each article is one continuous page at `/notebook/<slug>/`. Articles with multiple `##` headings get an automatic contents list linking to those sections. Repeated headings receive distinct anchors. Optional `project: habfly` metadata links an article to its project overview; the project page shows related articles from the same published collection. Private drafts appear in these links only during local draft preview. There are no separate article parts or numbered page routes.

The ignored local folder is not backed up by Git. Preserve a private backup separately if those drafts need to survive loss of this checkout.

## GitHub Pages

[Launch checklist](docs/github-pages-launch.md)

**Launch scope: the portfolio includes HabFly as research in progress, with its article coming soon.** HabFly testing and article publication are separate from the portfolio launch. Keep GitHub Pages disabled and the repository Actions variable `PAGES_PUBLISH_ENABLED` set to `false` during preparation. No workflow infers approval from test results or a date.

`.github/workflows/pages.yml` checks pull requests to `main`, pushes to `main`, and manual runs. Pushes and pull requests never deploy. Upload and deployment require all three conditions: a manual run on `main`, the `publish_site` checkbox selected (default: off), and the repository variable `PAGES_PUBLISH_ENABLED` set to `true`. A missing variable also blocks publication. Only `dist/client/` can be uploaded.

At launch, GitHub's Pages setting must use **GitHub Actions** and the `github-pages` environment must allow only the `main` branch. Review changes on a branch before merging. Branch protection is a separate repository setting to configure during launch. The local checks exercise the upload/deploy conditions for push, pull-request, manual, branch, tag, enabled, and disabled cases; a GitHub-hosted workflow run remains a separate check.

Internal navigation uses ordinary links to exported HTML; it does not need a server or custom response headers for client-side routing.

The site is configured for `https://segkev.com` at the domain root, not the temporary `/Personal_Website/` project URL. Set the custom domain in GitHub Pages and DNS during launch. No Cloudflare hosting, Worker, or paid runtime is required.

Preparing the workflow does not push source, enable Pages, deploy, or change DNS. Commits, pushes, article publication, and domain changes remain separate actions.

Write full articles here first. Selected articles can later be manually imported into Medium with the original `https://segkev.com/notebook/.../` URL as the canonical source. There is no automatic cross-posting.
