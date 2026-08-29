import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import { siteMetadata } from '../src/config/siteMetadata.js'
import { siteContent } from '../src/data/siteContent.js'
import { legalNotices } from '../src/data/legal.js'

const outputDirectory = resolve('dist')
const fileEnvironment = loadEnv('production', process.cwd(), 'VITE_')
const configuredUrl = (process.env.VITE_SITE_URL || fileEnvironment.VITE_SITE_URL)?.trim().replace(/\/$/, '')
const siteUrl = configuredUrl || 'http://localhost'
const isPublic = Boolean(configuredUrl)
const contact = {
  instagramUrl: 'https://www.instagram.com/klyxtech.eg',
  tiktokUrl: 'https://www.tiktok.com/@klyxtech.eg',
}

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function serializeStructuredData(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}

function replaceMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`, 'i')
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function buildHomeStructuredData() {
  const { services, faq } = siteContent.en
  const sameAs = [contact.instagramUrl, contact.tiktokUrl].filter(Boolean)

  return [
    {
      id: 'organization',
      value: {
        '@context': 'https://schema.org',
        '@type': ['Organization', 'ProfessionalService'],
        name: siteMetadata.name,
        description: siteMetadata.descriptions.en,
        ...(isPublic ? { url: siteUrl, logo: `${siteUrl}/brand/klyx-wordmark-dark.svg` } : {}),
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+201283310083',
          contactType: 'sales',
          areaServed: 'EG',
          availableLanguage: ['English', 'Arabic'],
        },
        ...(sameAs.length ? { sameAs } : {}),
        makesOffer: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.summary,
          },
        })),
      },
    },
    {
      id: 'faq',
      value: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    },
  ]
}

function buildLegalStructuredData({ path, title, description, dateModified }) {
  return [{
    id: path.slice(1),
    value: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      inLanguage: 'en',
      dateModified,
      ...(isPublic ? {
        url: `${siteUrl}${path}`,
        isPartOf: { '@type': 'WebSite', name: siteMetadata.name, url: siteUrl },
      } : {}),
    },
  }]
}

function renderRoute(baseHtml, route) {
  let html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(route.title)}</title>`)
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/\s*<meta\s+property="og:url"[^>]*>/gi, '')
    .replace(/\s*<meta\s+name="robots"[^>]*>/gi, '')
    .replace(/\s*<script\s+type="application\/ld\+json"\s+data-klyx-structured-data[^>]*>[\s\S]*?<\/script>/gi, '')

  html = replaceMeta(html, 'name', 'description', route.description)
  html = replaceMeta(html, 'property', 'og:title', route.title)
  html = replaceMeta(html, 'property', 'og:description', route.description)
  html = replaceMeta(html, 'name', 'twitter:title', route.title)
  html = replaceMeta(html, 'name', 'twitter:description', route.description)

  const headTags = []
  if (isPublic && route.indexable) {
    const canonicalUrl = `${siteUrl}${route.path}`
    headTags.push(`<link rel="canonical" href="${escapeAttribute(canonicalUrl)}" />`)
    headTags.push(`<meta property="og:url" content="${escapeAttribute(canonicalUrl)}" />`)
  } else if (!route.indexable || !isPublic) {
    headTags.push('<meta name="robots" content="noindex, nofollow" />')
  }

  route.structuredData.forEach(({ id, value }) => {
    headTags.push(`<script type="application/ld+json" data-klyx-structured-data="${id}">${serializeStructuredData(value)}</script>`)
  })

  return html.replace('</head>', `    ${headTags.join('\n    ')}\n  </head>`)
}

const baseHtml = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')
const privacy = legalNotices.privacy
const terms = legalNotices.terms
const routes = [
  {
    path: '/',
    output: 'index.html',
    title: siteMetadata.titles.en,
    description: siteMetadata.descriptions.en,
    indexable: true,
    structuredData: buildHomeStructuredData(),
  },
  {
    path: '/privacy',
    output: 'privacy.html',
    title: `${privacy.title} — KLYX`,
    description: privacy.description,
    indexable: true,
    structuredData: buildLegalStructuredData({
      path: '/privacy',
      title: `${privacy.title} — KLYX`,
      description: privacy.description,
      dateModified: '2026-08-29',
    }),
  },
  {
    path: '/terms',
    output: 'terms.html',
    title: `${terms.title} — KLYX`,
    description: terms.description,
    indexable: true,
    structuredData: buildLegalStructuredData({
      path: '/terms',
      title: `${terms.title} — KLYX`,
      description: terms.description,
      dateModified: '2026-08-15',
    }),
  },
]

for (const route of routes) {
  const outputPath = resolve(outputDirectory, route.output)
  await mkdir(resolve(outputPath, '..'), { recursive: true })
  await writeFile(outputPath, renderRoute(baseHtml, route))
}

const notFoundHtml = renderRoute(baseHtml, {
  path: '/404',
  title: 'Page not found — KLYX',
  description: siteMetadata.descriptions.en,
  indexable: false,
  structuredData: [],
})
await writeFile(resolve(outputDirectory, '404.html'), notFoundHtml)

const robots = isPublic
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n'

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc></url>
  <url><loc>${siteUrl}/privacy</loc></url>
  <url><loc>${siteUrl}/terms</loc></url>
</urlset>
`

await writeFile(resolve(outputDirectory, 'robots.txt'), robots)
await writeFile(resolve(outputDirectory, 'sitemap.xml'), sitemap)

if (!configuredUrl) {
  console.warn('VITE_SITE_URL is not set: generated build remains blocked from indexing and uses localhost metadata.')
}
