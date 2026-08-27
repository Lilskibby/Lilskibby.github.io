# maxklot.com

React rewrite of the personal site, built with Vite. Still a fully static
site (no server/backend) — GitHub Actions builds it and publishes the
static output to GitHub Pages on every push to `main` or `master`.

## Structure

- `src/sections/` — the three "pages" (Professional, Music, Adventure).
  They're really just parts of one continuous single-page app; see below.
- `src/components/` — shared UI (nav banner, carousels, theme toggle, etc).
- `src/data/` — editable content: experience entries, per-route SEO copy.
- `src/styles/global.css` — all styling, ported from the original site.
- `scripts/prerender.js` — build-time step that renders each route to
  static HTML (for SEO/AEO) before the client JS takes over.

## How the routing works

There's no subdomain split — `/`, `/music`, and `/adventure` are all one
React app with client-side routing (see `src/hooks/useRouter.js`), so the
existing animated transitions between sections still work exactly as
before. The only difference from the old site is that the URL now
updates as you navigate. Each route is *also* pre-rendered to real static
HTML at build time, so search engines and AI crawlers see full content
immediately without running JavaScript.

## Local development

```
npm install
npm run dev
```

## Building

```
npm run build
```

This runs, in order: the client build, an SSR build of `entry-server.jsx`,
then `scripts/prerender.js`, which stitches everything into `dist/`
(`dist/index.html`, `dist/music/index.html`, `dist/adventure/index.html`,
plus `dist/404.html` as a fallback). `npm run preview` serves that output
locally if you want to sanity-check a production build.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub
Pages automatically on every push to `main`. **One-time setup step:** in
the repo's Settings → Pages, set "Build and deployment → Source" to
**GitHub Actions** (it's probably set to "Deploy from a branch" from the
old setup). The custom domain (`maxklot.com`) is carried over via
`public/CNAME`, which gets copied into the build output automatically.

## Editing content

- Bio text, skills, coursework, experience entries: edit the relevant
  file in `src/sections/` or `src/data/experience.js`.
- Music biography: `src/sections/MusicSection.jsx`, the block marked
  `BIOGRAPHY` near the top — replace the placeholder paragraph.
- Page titles/descriptions for search engines: `src/data/seo.js`.
- Images: drop a new file in `src/assets/`, converting to WebP first
  (`cwebp -q 82 input.png -o output.webp`) keeps pages fast.
- Résumé: edit `resume/resume.docx` directly (Word, Google Docs, etc.) and
  commit it. `public/resume.pdf` is *generated* from it on every build —
  see below — so don't edit the PDF by hand, it'll just get overwritten.

## Résumé: editing a Word doc instead of a PDF

`scripts/build-resume.mjs` runs as the first step of `npm run build`. If
`resume/resume.docx` exists, it uses LibreOffice (`soffice --headless`)
to export it straight to `public/resume.pdf`, which then gets bundled
into the site like any other file in `public/`. `public/resume.pdf` is
gitignored — the `.docx` is the only thing you commit.

If `resume/resume.docx` doesn't exist, the step just skips (useful if you
haven't set this up yet, or want to keep a plain PDF instead). If it
exists but the conversion fails (e.g. LibreOffice isn't installed), the
build logs a warning and continues rather than failing the whole deploy.

**This needs LibreOffice installed wherever `npm run build` runs.** It's
already added to `.github/workflows/deploy.yml` for CI (see that file's
"Install LibreOffice" step). To preview the exported PDF locally too,
install LibreOffice on your machine (free, cross-platform:
https://www.libreoffice.org/download/download/) — without it, local
builds just skip the export and reuse whatever `public/resume.pdf`
already exists on disk.
