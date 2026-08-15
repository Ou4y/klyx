import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { WhatsAppAction } from '../components/WhatsAppAction'
import { useRouteMeta } from '../hooks/useRouteMeta'
import { Icon } from '../components/Icon'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'
import { siteMeta } from '../config/site'

export function NotFoundPage() {
  const { language } = useLocale()
  const copy = siteContent[language].notFound
  useRouteMeta({
    title: `${language === 'ar' ? 'الصفحة غير موجودة' : 'Page not found'} — KLYX`,
    description: siteMeta.descriptions[language],
    path: window.location.pathname,
    language,
  })

  return (
    <>
      <Header />
      <main id="main-content" className="not-found section-dark">
        <div className="not-found__datum" aria-hidden="true" />
        <div className="container not-found__layout">
          <div>
            <p className="eyebrow eyebrow--dark">{copy.titleMeta}</p>
            <h1 tabIndex="-1">{copy.title}</h1>
            <p>{copy.text}</p>
            <a className="button button--mint" href="/">{copy.back} <Icon name="arrow" size={18} className="rtl-flip" /></a>
          </div>
          <div className="not-found__mark" aria-hidden="true">
            <img src="/brand/klyx-k-light.svg" width="180" height="180" alt="" />
            <span className="mono">{copy.record}</span>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppAction />
    </>
  )
}
