import { siteMetadata } from './siteMetadata'

export const siteConfig = {
  whatsappNumber: '201283310083',
  whatsappUrl: 'https://wa.me/201283310083',
  telUrl: 'tel:+201283310083',
  instagramUrl: 'https://www.instagram.com/klyxtech.eg',
  tiktokUrl: 'https://www.tiktok.com/@klyxtech.eg',
  email: 'klyxtech1@gmail.com',
}

export const siteMeta = {
  ...siteMetadata,
  siteUrl: import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || '',
}
