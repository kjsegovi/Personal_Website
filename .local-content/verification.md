# Local verification — October 15, 2026

## GitHub Pages preparation with publication on hold

- Kevin requested starting GitHub Pages setup while withholding publication until HabFly testing is done. No article state or publication date changed.
- GitHub API confirmed `kjsegovi/Personal_Website` was already public, had no workflows, and had `has_pages: false`. Repository visibility was not changed.
- Created the repository Actions variable `PAGES_PUBLISH_ENABLED=false` and read it back. Created the `github-pages` environment with custom deployment branch rules and allowed only the `main` branch (type `branch`). Read back the policy and confirmed Pages remains disabled.
- Local workflow now checks pushes/PRs without publishing. Artifact upload and deployment require a manual run on main, a true `publish_site` input (default false), and an enabled publication variable. Tests exercise the actual conditions across 81 event/ref/input/variable combinations for both guards.
- Updated the Pages upload action to verified v5; retained the existing verified deployment v5 and pnpm setup v6. Official GitHub action and Pages documentation informed the preparation.
- TypeScript, static export, all 26 tests, publishing fixture, and whitespace checks passed. The fixture was removed and the 13-page export restored; three drafts excluded. No GitHub-hosted workflow has run.
- The available local Git history had no entries under `.local-content/`, `outputs/`, or `content/notebook/`. This was a targeted path check, not a complete historical secret audit.
- Created local branch `codex/github-pages-preparation`; all source changes remain uncommitted and unpushed. No Pages site, DNS records, publication, or HabFly experiment was created or run.
- Updated `docs/github-pages-launch.md` with the hold, preparation state, manual release steps, and later custom-domain setup. Publication still requires Kevin's later direction after HabFly testing.

- Final target: GitHub Pages, with a public source repository and Cloudflare DNS for segkev.com.
- TypeScript check passed.
- Static export produced 12 public pages and a custom 404.
- All 23 content, source-boundary, exported-page, and deployment-configuration tests passed.
- Publishing fixture passed: generated full article body, dates, canonical URL, home and notebook listings, sitemap, RSS, and raw-HTML escaping. Fixture removed; original export rebuilt.
- Three real drafts remain in the ignored local folder. They were never committed. Public source folder contains no article drafts.
- Browser checks covered 320, 390, 768, and 1280 pixel widths, public navigation, case-study section links, focus styling, and skip-link focus transfer to main content.
- Computed foreground/background contrast checks found no below-threshold text in the seven checked public page templates. This was a targeted DOM-based check, not a full accessibility audit.
- Workflow diagrams have visible text and ordered stages; decorative artwork is hidden from the accessibility tree.
- Reduced-motion CSS was inspected. No actual VoiceOver speech acceptance was performed.
- Local draft listing and direct article navigation passed after moving drafts. Draft metadata includes noindex/nofollow.
- Native static-page navigation opened Course Authoring Systems without browser console errors.
- GitHub Actions workflow YAML and permissions/artifact conditions were inspected locally. No GitHub-hosted workflow has run for this update.
- No commit, push, deployment, repository visibility change, or DNS edit was performed.

Screenshots and the earlier responsive/contrast results are in outputs/review/ (also ignored by Git).

The public preview uses scripts/serve.mjs on loopback port 4318. The draft development server can be restarted with pnpm dev:drafts when needed.

## AWS portfolio addition

- Added /projects/aws-infrastructure/ plus prominent shared highlights on Home and Projects, and updated About.
- The original three featured projects remain in their original order.
- User-confirmed claims: 66% infrastructure cost reduction; EC2 Auto Scaling consolidation; NAT gateway updates; geographic distribution based on user density; Amplify/Fargate deployments for courses intended to reach tens of thousands; DynamoDB/PostgreSQL migration across accounts; one hour of downtime; Kevin led each effort and did most AWS implementation.
- Only ETX Center / SESE / ASU attribution is public. No individual application, account, dataset, internal infrastructure map, or secrets were added.
- TypeScript, static build, all 24 checks, and whitespace validation passed after the final edits. Export: 13 public pages, three drafts excluded.
- Browser reviewed the new case study and Home highlight. Checked 320, 768, and 1280 pixel widths without horizontal overflow in the examined pages. The database section link worked. Temporary viewport override was reset.
- The new navy panel uses existing light text/orange colors and a visible orange keyboard focus outline. Case-study diagram has visible HTML labels.
- No infrastructure was accessed or changed. No commit, push, publication, repository visibility change, or DNS change.
- Notebook personal usage/motivation is unconfirmed; no observations were added based on the unanswered study-software question.
- Review screenshot: outputs/review/aws-case-study.jpg.

## AWS case-study review revision

- Removed the service-name figure and organization Links section; merged role and outcomes into one sentence.
- Added a labeled cost comparison based only on the confirmed 66% reduction (normalized index 100 to 34).
- AWS desktop layout now has cost prose beside the chart, then deployment and migration sections side by side. Reflows to one column on mobile.
- Found a real layout collision: the old contents class activated Tailwind's display: contents utility, flattening the navigation's children into the parent grid. Renamed to case-contents across project pages. Confirmed block sidebar plus 720px reading column on Course Authoring Systems at 1440px.
- Final TypeScript/build checks and all 24 tests passed; whitespace checks passed.
- Browser checks: AWS at 1440, 900 and 320 pixels; no horizontal overflow in those views. Verified side-by-side section positions at desktop and single-column mobile. Section link worked. New chart values are accessible as text. Temporary viewport override reset.
- Review screenshot: outputs/review/aws-desktop-revised.jpg.
- More substantive technical content awaits Kevin's answers; no migration method, NAT topology, exact account count, savings period, or scaling evidence was invented.
- No commit, push, publication, or infrastructure change.

## HabFly article navigation

- HabFly remains one continuous Markdown article, one URL, and one Notebook listing. Kevin clarified that multiple pages means document length, not separate web pages; article writing remains paused.
- Added a contents list generated from the article's second-level headings, unique section anchors, links between the article and project overview, and Notebook/back-to-top links. Section jumps and return-to-top move keyboard focus to their targets.
- Desktop contents sit beside the article; mobile contents precede it. Tables scroll within their own focusable region rather than widening the page.
- Browser checks covered 320, 390, 768, and 1280 pixel widths without page overflow after the table fix. Checked keyboard section jumps, return-to-top focus, the project/article round trip, and the Notebook listing. Temporary viewport override reset.
- TypeScript and whitespace checks passed. All 25 tests passed. The publishing fixture passed continuous-body, section-anchor, related-project, direct-visit, metadata, feed, sitemap, and privacy checks; the fixture was removed and the clean public export restored.
- Three drafts remain local, ignored by Git, absent from the production export, and accessible only through the local draft preview on port 4319. No pagination route was added.
- Review image: outputs/review/notebook-navigation.png.
- No experiments, commit, push, publication, repository visibility change, or DNS edit.
