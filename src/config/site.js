export const siteConfig = {
  whatsappNumber: '201283310083',
  whatsappUrl: 'https://wa.me/201283310083',
  telUrl: 'tel:+201283310083',
  instagramUrl: 'https://www.instagram.com/klyxtech.eg',
  tiktokUrl: 'https://www.tiktok.com/@klyxtech.eg',
  email: 'klyxtech1@gmail.com',
}

export const siteMeta = {
  name: 'KLYX',
  siteUrl: import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || '',
  locale: 'en_EG',
  language: 'en',
  titles: {
    en: 'KLYX — Websites, commerce, and internal tools for growing businesses',
    ar: 'KLYX — مواقع ومتاجر وأنظمة داخلية للأعمال',
  },
  descriptions: {
    en: 'KLYX builds commerce stores, landing pages, portfolio websites, corporate websites, and internal tools for growing businesses.',
    ar: 'تطوّر KLYX المتاجر الإلكترونية وصفحات الهبوط والمواقع التعريفية ومواقع الشركات والأنظمة الداخلية للأعمال.',
  },
}
