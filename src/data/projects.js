// Publish only owner-approved, evidence-based projects. Actions are hidden when a URL is blank.
// Image records include responsive, source-faithful client marks; only their canvas sizing was adjusted.
export const projects = [
  {
    id: 'lam',
    number: '01 / 03',
    name: 'LAM',
    category: 'FASHION / E-COMMERCE',
    contribution: 'Online store',
    image: {
      src: '/projects/lam-logo-1600.png',
      srcSet: '/projects/lam-logo-800.png 800w, /projects/lam-logo-1600.png 1600w',
      width: 1600,
      height: 743,
      alt: 'LAM logo',
    },
    instagramUrl: '',
    websiteUrl: 'https://lam-studios.com',
  },
  {
    id: 'claro',
    number: '02 / 03',
    name: 'Claro',
    category: 'FASHION / E-COMMERCE',
    contribution: 'Online store',
    image: {
      src: '/projects/claro-logo-1600.png',
      srcSet: '/projects/claro-logo-800.png 800w, /projects/claro-logo-1600.png 1600w',
      width: 1600,
      height: 505,
      alt: 'Claro wear logo',
    },
    instagramUrl: '',
    websiteUrl: 'https://claro-wear.com/',
  },
  {
    id: 'glow-by-hk',
    number: '03 / 03',
    name: 'Glow by HK',
    category: 'BEAUTY / E-COMMERCE',
    contribution: 'Digital storefront',
    comingSoon: true,
    image: {
      src: '/projects/glow-by-hk-logo-1600.png',
      srcSet: '/projects/glow-by-hk-logo-800.png 800w, /projects/glow-by-hk-logo-1600.png 1600w',
      width: 1600,
      height: 1000,
      alt: 'Glow by HK logo',
    },
    instagramUrl: '',
    websiteUrl: '',
  },
]
