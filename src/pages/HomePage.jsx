import { Contact } from '../components/Contact'
import { Faq } from '../components/Faq'
import { FeaturedWork } from '../components/FeaturedWork'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Packages } from '../components/Packages'
import { Partnership } from '../components/Partnership'
import { Services } from '../components/Services'
import { StructuredData } from '../components/StructuredData'
import { WhatsAppAction } from '../components/WhatsAppAction'
import { useRouteMeta } from '../hooks/useRouteMeta'
import { siteMeta } from '../config/site'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLocale } from '../i18n/locale-context'

export function HomePage() {
  const { language } = useLocale()
  useRouteMeta({ title: siteMeta.titles[language], description: siteMeta.descriptions[language], path: '/', language })
  useScrollReveal()

  return (
    <>
      <StructuredData />
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <FeaturedWork />
        <Packages />
        <Partnership />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppAction />
    </>
  )
}
