# KLYX website

A premium, conversion-focused React website for KLYX, built with JSX and Vite. It presents commerce, landing page, portfolio, corporate website, and internal-tool services and is configured for Cloudflare deployment.

The approved dark brand mode is the default. Visitors can switch the theme and move between English and Arabic from the header; both choices are stored only in local browser storage. Motion and functional 2D vector diagrams respect `prefers-reduced-motion`.

## Local setup

Requirements: a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. Useful checks:

```bash
npm run lint
npm run build
npm run preview
```

## Cloudflare Workers values

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Required environment variable: `VITE_SITE_URL=https://your-verified-domain`

The build creates route-specific `dist/index.html`, `dist/privacy.html`, and `dist/terms.html` documents with canonical metadata and structured data, plus a no-index `dist/404.html`. Workers Static Assets is configured in `wrangler.jsonc` with `assets.not_found_handling` set to `404-page`; its default HTML handling serves the flat legal documents at extensionless `/privacy` and `/terms`, while explicit `_redirects` rules return `301` for their trailing-slash variants. An unknown path returns the custom 404 response rather than the SPA shell with HTTP `200`. Do not add a catch-all `200` rewrite or a `404` redirect rule. The build also generates `robots.txt` and `sitemap.xml` from `VITE_SITE_URL`. If the variable is missing, the build deliberately blocks indexing and uses localhost metadata so a preview cannot accidentally publish an invented canonical domain.

Production JavaScript source maps are disabled. The CSP permits only Cloudflare Web Analytics' documented beacon path and its observed versioned subpath; automatic injection reports to the same-origin `/cdn-cgi/rum` endpoint already covered by `connect-src 'self'`. HTML uses `no-cache, must-revalidate`, allowing safe conditional reuse while requiring deployment-fresh validation. Keep the tiny external fallback stylesheet and synchronous theme/language initializers unless a measured replacement preserves the no-flash and no-JavaScript recovery behavior.

Before a public deployment, verify the final domain and add one approved canonical host redirect to `public/_redirects` (for example, www to apex or apex to www). Do not add both directions.

## Contact destinations

The supplied KLYX WhatsApp, telephone, Gmail, Instagram, and TikTok destinations are centralized in `src/config/site.js`. Social icons appear in the contact section and footer, and package actions create a WhatsApp message containing the selected package name.

Verify before a public launch:

- Every public package name, feature, qualification, and scope note in the Service Explorer data
- Final owner and Egyptian-counsel review of the substantive Privacy Policy and Website Terms
- All official project records and their evidence
- Final canonical domain and host redirect

## Add an approved project

Project data belongs in `src/data/projects.js`. Publish only owner-approved facts and assets. A record follows this shape:

```js
{
  name: 'Approved project name',
  tone: 'light',
  websiteUrl: 'https://approved-project.example',
  logo: {
    src: '/projects/project-logo.png',
    width: 800,
    height: 400,
  },
}
```

Keep logo dimensions accurate, use `tone` only to provide suitable card contrast, omit `websiteUrl` until the destination is approved, and never publish an unverified client, claim, result, screenshot, or link.

## Update services and packages safely

All five service categories, package details, domain badges, launch-care rules, continuing-care options, Commerce Operations, specialist modules, and their Arabic translations live in `src/data/serviceExplorerEn.js` and `src/data/serviceExplorerAr.js`, assembled by `src/data/serviceExplorer.js`. Domain badges remain limited to eligible packages. Any new commercial copy should be owner-approved before deployment; external costs and operating authority must remain explicit. Public package-cost data must not be added to the frontend.

## Content and localization architecture

Repeated page content is centralized in `src/data/siteContent.js`, the complete bilingual Service Explorer scope is centralized in its English and Arabic data files, and the legal notices live in `src/data/legal.js` and `src/data/legalAr.js`. The locale provider persists the visitor’s selection and applies document-level `lang` and `dir`; both LTR and RTL layouts are included. Review both languages whenever visible copy changes.

## Brand source

The site uses the approved KLYX A1-F4 wordmark, exact responsive K, Operational Neutral tokens, IBM Plex Sans, and IBM Plex Mono from the local final identity package. Logo geometry was copied without alteration. IBM Plex Mono remains restricted to real system labels and structured metadata. The two above-the-fold fonts are validated WOFF2 subsets; source TTF files stay in the approved identity handoff rather than the public deployment. Font license texts are bundled in `public/fonts`.

Do not introduce new logos, colors, gradients, glow effects, invented client proof, fake metrics, or decorative grid motifs.
