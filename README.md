# maxklot.com

React rewrite of the personal site, built with Vite. Still a fully static
site (no server/backend) — GitHub Actions builds it and publishes the
static output to GitHub Pages on every push to `main`.

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
  `BIOGRAPHY` near the bottom — replace the placeholder paragraph.
- Page titles/descriptions for search engines: `src/data/seo.js`.
- Images: drop a new file in `src/assets/`, converting to WebP first
  (`cwebp -q 82 input.png -o output.webp`) keeps pages fast.
