# Adeer Khan — Portfolio Migration Plan

**Goal:** Turn the cloned Next.js brutalist portfolio template
into Adeer Khan's personal portfolio, run it locally, then deploy it as the live
**https://adeerkhan.github.io** site.

**Current state (where we are now):**

- This template — Next.js brutalist portfolio, originally full of
  placeholder data.
- `../adeerkhan.github.io-jekyll` — the old Jekyll (al-folio) academic site, the source
  of Adeer's personal info. Its GitHub repo becomes `adeerkhan.github.io-v1`.
- Tools: Node v24.14.1, npm 11.11.0. Use `npm install` (this template's deps are current).

---

## Phase 1 — Run the template locally ✅ DONE

1. `npm install`
2. `npm run dev` → http://localhost:3000
3. ✅ Exit criteria: page renders locally (HTTP 200), all sections scrollable.

## Phase 2 — Replace all template data with Adeer's info ✅ DONE

All content lives in `data/*.ts` (this template, not `portfolio.ts`):

| File | What's in it |
|---|---|
| `data/hero.ts` | greeting, name, title, description, resumeLink (`/CV-Adeer-Khan.pdf`), stats |
| `data/skills.ts` | skill groups (ML/DL, GenAI/LLMs, CV/3D, Geospatial, Research) |
| `data/proficiency.ts` | proficiency bars |
| `data/education.ts` | KAIST MSc + CUST BSc |
| `data/experience.ts` | Craft AEC GmbH, KAIST SSEL, Joyn Group, CUST FYP |
| `data/projects.ts` | 8 projects migrated from old site `_projects/` |
| `data/social.ts` | email/github/linkedin/instagram |

Also updated: `app/layout.tsx` (SEO → adeerkhan.github.io), `app/page.tsx`
(GitHub profile fetch → adeerkhan), `NavBar`/`ContactSection` hardcoded strings,
`public/manifest.json`, `public/favicon.svg`, `package.json`,
`tests/plan-requirements.test.ts`, `README.md`.

## Phase 3 — Assets & polish ✅ DONE

- Copied `CV-Adeer-Khan.pdf` and `profile_pic.png` into `public/`.
- Removed the template's company logos (`public/img/icons/common/`).
- Template placeholder content clean in `app/ components/ data/ public/`.

## Phase 4 — Production build + static export ✅ DONE

- `next.config.ts` already has `output: "export"`, `images.unoptimized`, `trailingSlash`.
- `npm run build` → `out/`, `npm run lint`, `npm run test` all pass.

## Phase 5 — Deploy to adeerkhan.github.io → see `DEPLOYMENT.md`

Full runbook (repo rename → fresh repo → push → enable Pages/Actions → verify):
**`DEPLOYMENT.md`**. The `.github/workflows/ci.yml` deploys on push to `main`.

## Phase 6 — Go-live checklist → end of `DEPLOYMENT.md`

---

## Next step

`gh auth login`, then follow `DEPLOYMENT.md` steps 1–4 to publish the repo and go live.
