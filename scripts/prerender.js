// Build-time static-site generation.
//
// Runs after the client and SSR bundles are built. For each of the site's
// three routes it renders the React tree to a plain HTML string, stitches
// it (plus route-specific <head> tags: title, description, canonical, OG,
// Twitter, JSON-LD) into the already-built dist/index.html shell, and
// writes the result to the matching static path. This means GitHub Pages
// serves fully-formed HTML for each URL with no JS required to see the
// content — good for SEO and for AI/agent crawlers (AEO) — while React
// still hydrates on top for the animated single-page behavior.
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const distDir = join(root, 'dist')

const { render } = await import(join(root, 'dist-ssr', 'entry-server.js'))
const { SEO, SITE_URL, SITE_NAME, AUTHOR_SAME_AS } = await import(
  join(root, 'src', 'data', 'seo.js')
)

const template = await readFile(join(distDir, 'index.html'), 'utf-8')

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function buildJsonLd(path) {
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: 'Software Developer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Rochester Institute of Technology',
    },
    sameAs: AUTHOR_SAME_AS,
  }

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Professional', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Music', item: `${SITE_URL}/music` },
      { '@type': 'ListItem', position: 3, name: 'Adventure', item: `${SITE_URL}/adventure` },
    ],
  }

  const graph = [person, breadcrumb]

  if (path === '/music') {
    graph.push(
      {
        '@type': 'MusicGroup',
        name: 'Courtyard',
        genre: ['Pop', 'Jazz', 'Funk'],
        url: 'https://courtyardtheband.com',
        member: { '@id': `${SITE_URL}/#person` },
        sameAs: [
          'https://open.spotify.com/artist/4KWXQXPxfdIpt0Dy5OCVJo',
          'https://music.apple.com/za/artist/courtyard/1768829490',
          'https://www.youtube.com/@Courtyardtheband',
        ],
      },
      {
        '@type': 'MusicGroup',
        name: 'Max Klot',
        url: `${SITE_URL}/music`,
        member: { '@id': `${SITE_URL}/#person` },
        sameAs: [
          'https://open.spotify.com/artist/2TM9TmJScf6KHsGtPeVNLJ',
          'https://music.apple.com/gb/artist/max-klot/1677962057',
          'https://www.youtube.com/channel/UCPKmL2H6A8NuqoMd6g3Wttg',
        ],
      },
    )
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

function buildHead(path, meta) {
  const canonical = `${SITE_URL}${path === '/' ? '/' : path + '/'}`
  const title = escapeAttr(meta.title)
  const description = escapeAttr(meta.description)
  const ogImage = `${SITE_URL}/og-image.jpg`
  const jsonLd = JSON.stringify(buildJsonLd(path))

  return `<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Max Klot">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${ogImage}">
<script type="application/ld+json">${jsonLd}</script>`
}

async function writeRoute(path, meta) {
  const { html, section } = render(path)
  const head = buildHead(path, meta)

  let output = template
  output = output.replace('<!--app-html-->', html)
  output = output.replace('<!--route-meta-->', head)
  output = output.replace(/data-section="[^"]*"/, `data-section="${section}"`)

  const outPath = path === '/' ? join(distDir, 'index.html') : join(distDir, path.slice(1), 'index.html')
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, output, 'utf-8')
  return outPath
}

const written = []
for (const [path, meta] of Object.entries(SEO)) {
  written.push(await writeRoute(path, meta))
}

// SPA fallback for any stray/unknown path — same as the homepage.
await copyFile(join(distDir, 'index.html'), join(distDir, '404.html'))

console.log(`Prerendered ${written.length} routes:\n${written.map((p) => ' - ' + p).join('\n')}`)
console.log(' - ' + join(distDir, '404.html') + ' (fallback)')
