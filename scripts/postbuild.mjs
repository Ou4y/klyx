import { copyFile, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const outputDirectory = resolve('dist')
const configuredUrl = process.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
const siteUrl = configuredUrl || 'http://localhost'
const isPublic = Boolean(configuredUrl)

await copyFile(resolve(outputDirectory, 'index.html'), resolve(outputDirectory, '404.html'))

if (configuredUrl) {
  const indexPath = resolve(outputDirectory, 'index.html')
  const indexHtml = await readFile(indexPath, 'utf8')
  const canonicalTags = `    <link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />\n`

  await writeFile(indexPath, indexHtml.replace('</head>', `${canonicalTags}  </head>`))
}

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
