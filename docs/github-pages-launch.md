# Launch segkev.com on GitHub Pages

Kevin approved preparing the portfolio launch with HabFly included as research in progress and its article coming soon. Completing HabFly testing is no longer a portfolio launch prerequisite. Keep unpublished articles private; review and check the release before publication.

## Preparation status

Checked October 15, 2026:

- `kjsegovi/Personal_Website` is already public. Visibility was not changed during preparation.
- GitHub Pages is disabled (`has_pages: false`).
- The repository Actions variable `PAGES_PUBLISH_ENABLED` is set to `false`.
- The `github-pages` deployment environment permits the `main` branch only.
- No workflows were present on GitHub when preparation began. The new workflow and site changes remain local and uncommitted on `codex/github-pages-preparation`.
- No source was pushed, no workflow was dispatched, and no site or DNS change was made.

## The setup

- Existing repository: `kjsegovi/Personal_Website`.
- Source visibility: public, with unpublished writing kept locally.
- Hosting: GitHub Pages, built and deployed by GitHub Actions.
- Domain and DNS: Cloudflare, using the already-owned `segkev.com`.
- Primary address: `https://segkev.com`; `www` redirects to the apex through GitHub Pages.

The repository does not need to be renamed to use this custom domain. The generated site's links assume the domain root. Until that domain is attached, the default project URL under `/Personal_Website/` is not a supported preview address; use the local preview during preparation.

## 1. Prepare and review source

Use a review branch. Run:

```sh
pnpm check
pnpm test:publishing
pnpm start
```

Review the pages and copy, including the project claims. The three article drafts are in `.local-content/notebook/`. Review them separately with `pnpm dev:drafts`.

`.local-content/` and `outputs/` must stay ignored and untracked. The drafts and private review notes created for this update have never been committed. The tests check this boundary; the available local Git history also contains no entries for `.local-content/`, `outputs/`, or `content/notebook/`. This is a targeted privacy check, not a full review of every historical file. Source committed or pushed to the existing public repository is publicly readable.

Only move an article into `content/notebook/` once approved, with `state: published` and the actual publication date. Do not force-add the ignored local folder. Keep a separate private backup of the drafts.

For this portfolio launch, keep all notebook entries in their local draft folder. HabFly’s public project overview announces the forthcoming article. Publish articles separately after review, using the actual publication date.

Commits and pushes still need Kevin's direction. When authorized, use a review branch and keep the publication switch off while checking the changes on GitHub. Branch protection is a separate setting to configure for the review process.

## 2. Keep publication disabled during testing

In Settings → Secrets and variables → Actions → Variables, keep the repository variable **PAGES_PUBLISH_ENABLED** set to **false**. A missing variable blocks publication too. Keep the repository's Pages feature disabled until launch.

The prepared workflow, **Check site and manually publish**, uses Node 24, pnpm 12.11.2, `pnpm check`, and the publishing-fixture test. Pull requests and pushes to `main` run checks only. A normal manual run also runs checks only because the **publish_site** input defaults to off.

Uploading a Pages artifact and deploying both require:

1. A manual workflow run (`workflow_dispatch`).
2. The selected branch is `main`.
3. The **publish_site** checkbox is selected.
4. **PAGES_PUBLISH_ENABLED** is set to **true**.

Only `dist/client/` is uploaded when all four conditions are met. The local tests evaluate the actual workflow conditions across push, pull-request, manual, branch, tag, checked, unchecked, enabled, and disabled cases. They do not replace running the workflow on GitHub after the source is pushed.

The build job has read-only repository permissions. Only the deployment job receives Pages and identity-token permissions. There is no personal access token or Cloudflare key to add. Configure the `github-pages` environment to deploy from `main`.

The prepared environment has a custom deployment branch rule for `main`, of type **Branch**. Tags and other branches are not allowed. Reviewers can be added later if wanted, but publication does not depend on an unconfigured reviewer rule.

## 3. Connect Pages and the domain at launch

For this launch, use the HabFly overview marked as research in progress with its article coming soon. Check and review the release source. Once the approved source and workflow are on `main`, select **GitHub Actions** in Settings → Pages → Build and deployment. Keep **PAGES_PUBLISH_ENABLED=false** while completing the settings below.

In the GitHub account's Settings → Pages, add `segkev.com` as a verified domain. GitHub provides a TXT record; create that exact record in Cloudflare and complete verification. Retain the verification record.

In the repository's Pages settings, set the custom domain to **segkev.com** before directing the live domain to GitHub. With an Actions publishing source, the domain is configured in GitHub settings; a committed `CNAME` file is not required.

Inspect existing Cloudflare DNS first and preserve email and unrelated service records. Configure the apex with GitHub's Pages A records:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | kjsegovi.github.io |

Keep these records DNS-only during setup so GitHub can check the destination and provision HTTPS. The `www` target is the account hostname, without `/Personal_Website` or any path. Do not add wildcard records. If old apex AAAA records point elsewhere, resolve that conflict during the DNS walkthrough rather than leaving some visitors on the old host.

GitHub can redirect `www` to `segkev.com` when both have the correct DNS and the apex is the selected custom domain. Enable **Enforce HTTPS** once the certificate is ready. Check both hostnames after propagation.

## 4. Publish deliberately

After approval and domain setup, change the repository variable **PAGES_PUBLISH_ENABLED** to **true**. Open Actions → **Check site and manually publish** → Run workflow, select **main**, and select **publish_site**. Confirm the intended reviewed commit before starting the run.

After the deployment, return **PAGES_PUBLISH_ENABLED** to **false**. This keeps later checks and manual runs from publishing until another release is deliberately enabled. Pushes and pull requests never deploy, even when the switch is on.

## 5. Check the deployment

- The workflow succeeds on GitHub and uploads only the public static artifact.
- `https://segkev.com` loads, and `www` redirects to it with the expected path and query.
- Direct visits and refreshes work on project pages.
- Unknown routes and local-draft slugs return the custom 404, with status 404.
- Canonical URLs, sharing images, `/sitemap.xml`, `/feed.xml`, and `/robots.txt` point to the intended site.
- Images, styles, and navigation work on the custom domain, including a phone and keyboard check.
- No unpublished writing, private notes, or intermediate server files appear in the artifact or public source/history.

If a deployment needs to be reversed, restore the previous approved source through review and use the same manual release process. Keep the domain attached while troubleshooting; changing DNS is a separate action.

## References

Checked October 15, 2026:

- [GitHub Pages Actions starter](https://github.com/actions/starter-workflows/blob/main/pages/static.yml)
- [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verifying a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [pnpm setup action](https://github.com/pnpm/action-setup)
- [Actions inputs and variables](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts)
