import { siteConfig, siteMeta } from '../config/site'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'

export function StructuredData() {
  const { language } = useLocale()
  const { services, faq } = siteContent[language]
  const base = siteMeta.siteUrl || undefined
  const sameAs = [siteConfig.instagramUrl, siteConfig.tiktokUrl].filter(Boolean)
  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: 'KLYX',
    description: siteMeta.descriptions[language],
    ...(base ? { url: base, logo: `${base}/brand/klyx-wordmark-dark.svg` } : {}),
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
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(faqPage)}</script>
    </>
  )
}
