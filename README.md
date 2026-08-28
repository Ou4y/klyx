# KLYX website

A premium, conversion-focused React website for KLYX, built with JSX and Vite. It presents commerce, landing page, portfolio, corporate website, and internal-tool services. The project is prepared for Cloudflare Pages but is intentionally not deployed.

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

## Cloudflare Pages values

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Required environment variable: `VITE_SITE_URL=https://your-verified-domain`

The build creates a top-level `dist/404.html`, which makes Cloudflare Pages return its custom 404 response for an unknown path rather than applying its default SPA fallback. Keep the explicit `/privacy` and `/terms` rewrites in `public/_redirects`, but do not add a catch-all `200` rewrite or a `404` redirect rule. The build also generates `robots.txt` and `sitemap.xml` from `VITE_SITE_URL`. If the variable is missing, the build deliberately blocks indexing and uses localhost metadata so a preview cannot accidentally publish an invented canonical domain.

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

The site uses the approved KLYX A1-F4 wordmark, exact responsive K, Operational Neutral tokens, IBM Plex Sans, and IBM Plex Mono from the local final identity package. Logo geometry was copied without alteration. IBM Plex Mono remains restricted to real system labels and structured metadata. Font license texts are bundled in `public/fonts`.

Do not introduce new logos, colors, gradients, glow effects, invented client proof, fake metrics, or decorative grid motifs.
