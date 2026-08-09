# DEPLOYMENT — Publish & Go-Live (Phase 5)

This repo is the **source** for the live site **https://adeerkhan.github.io**. The old
Jekyll (al-folio) site is preserved in the repo `adeerkhan/adeerkhan.github.io-v1`
and locally at `../adeerkhan.github.io-jekyll`.

Deployment is fully automated: pushing to `main` triggers
`.github/workflows/ci.yml`, which runs `npm ci` + `npm run build` and deploys the
`out/` folder to GitHub Pages (via `actions/deploy-pages`). No Node server runs on
GitHub Pages — the site is a static export (`output: "export"` in `next.config.ts`).

---

## Step 0 — Prerequisites

```bash
gh auth login          # one time, browser flow
git config user.name  "Adeer Khan"
git config user.email "adeersafi@gmail.com"
```

## Step 1 — Make the repo your own (done once)

The repo's original `origin` has been removed. Re-point it to your new repo.

```bash
git remote add origin https://github.com/adeerkhan/adeerkhan.github.io.git
```

> Local folder name is cosmetic — only the GitHub repo
> name matters. Rename it freely once no editor/terminal holds it open.

## Step 2 — Prepare GitHub (fresh-repo path, chosen)

`adeerkhan.github.io` already exists and is your **live** Jekyll repo. To avoid
clobbering it, rename it first, then create a fresh empty repo for this template:

```bash
# 1. Preserve the old site repo under a new name (its Pages publish stops).
gh repo rename adeerkhan.github.io-v1 --repo adeerkhan/adeerkhan.github.io

# 2. Create the new empty repo.
gh repo create adeerkhan/adeerkhan.github.io --public
```

> Rollback: the old site is untouched in `adeerkhan.github.io-v1`. To restore it,
> rename the repos back and re-enable Pages from the `master` branch.

## Step 3 — Push

```bash
git push -u origin main
```

The `main` branch carries the deploy workflow, so a build+deploy starts immediately.
Watch it: `gh run watch`.

## Step 4 — Enable GitHub Pages (Actions source)

- GitHub web UI: repo → **Settings → Pages → Source → GitHub Actions**. Save.
- or via CLI:
  ```bash
  gh api --method POST repos/adeerkhan/adeerkhan.github.io/pages \
    -f build_type=workflow
  ```

Wait for the `pages build and deployment` run to finish, then verify
**https://adeerkhan.github.io**.

## Step 5 — Clean up the old repo

Once the new site is live and verified:

```bash
gh repo set-default adeerkhan/adeerkhan.github.io       # default branch -> main
```

Inside the `-v1` repo, delete the now-unused branches only after confirming
`adeerkhan.github.io` serves the new site:
```bash
git push adeerkhan.github.io-v1 --delete master gh-pages   # optional, after verify
```

## Manual fallback (no GitHub Actions)

If you ever want to deploy without CI:

```bash
npm run build
git init out && cd out
git add -A && git commit -m "deploy"
git push -f git@github.com:adeerkhan/adeerkhan.github.io.git HEAD:gh-pages
```

Then set Pages → Source → **Deploy from a branch → gh-pages**. Each future deploy
needs a manual `npm run build` + push.

## Routine updates

1. Edit content in `data/*.ts` (hero, skills, education, experience, projects, social).
2. `npm run dev` to preview locally.
3. `npm run lint && npm run test` before pushing.
4. Commit and `git push` — GitHub Actions deploys automatically.

## Go-live checklist (Phase 6)

- [ ] https://adeerkhan.github.io serves the new site (old Jekyll content gone)
- [ ] Social links, resume (`/CV-Adeer-Khan.pdf`), and project links work
- [ ] Mobile view + `npm run build` clean
- [ ] No placeholder template content (names, links, profile data) remains in
      `app/ components/ data/ public/`
- [ ] Old site safe in `adeerkhan.github.io-v1` + local `../adeerkhan.github.io-jekyll`
