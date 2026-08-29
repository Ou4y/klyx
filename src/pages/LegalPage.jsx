import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import { WhatsAppAction } from '../components/WhatsAppAction'
import { legalNotices } from '../data/legal'
import { legalNoticesAr } from '../data/legalAr'
import { routeContent } from '../data/routeContent'
import { useLocale } from '../i18n/locale-context'
import { useRouteMeta } from '../hooks/useRouteMeta'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function LegalPage({ type }) {
  const { language } = useLocale()
  const content = (language === 'ar' ? legalNoticesAr : legalNotices)[type]
  const ui = routeContent[language].legalUi
  useRouteMeta({
    title: `${content.title} — KLYX`,
    description: content.description,
    path: `/${type}`,
    language,
  })
  useScrollReveal()

  return (
    <>
      <Header />
      <main id="main-content" className="legal-main">
        <section className="legal-hero" aria-labelledby="legal-title">
          <div className="legal-hero__datum" aria-hidden="true" />
          <div className="container legal-hero__layout">
            <div>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 id="legal-title" tabIndex="-1">{content.title}</h1>
              <p className="legal-hero__lead">{content.summary}</p>
            </div>
            <aside className="legal-status" aria-label={ui.statusLabel}>
              <span className="mono">{ui.statusMeta}</span>
              <dl>
                <div><dt>{ui.updated}</dt><dd>{content.updated}</dd></div>
                <div><dt>{ui.applies}</dt><dd>{ui.appliesValue}</dd></div>
              </dl>
              <p>{content.status}</p>
            </aside>
          </div>
        </section>

        <section className="legal-content section">
          <div className="container legal-content__layout">
            <nav className="legal-nav" aria-label={`${content.title} contents`}>
              <p className="mono">{ui.contents}</p>
              {content.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>{section.title}</a>
              ))}
            </nav>

            <article className="legal-article">
              {content.sections.map((section) => (
                <section className="legal-section" id={section.id} key={section.id}>
                  <h2>{section.title}</h2>
                  {section.intro && <p>{section.intro}</p>}
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.list && (
                    <ul>
                      {section.list.map((item) => <li key={item}><Icon name="check" size={17} /><span>{item}</span></li>)}
                    </ul>
                  )}
                </section>
              ))}

              <aside className="legal-reference" aria-labelledby="legal-reference-title">
                <p className="mono" id="legal-reference-title">{ui.referenceMeta}</p>
                <p>{ui.referenceText}</p>
                {content.references.map((reference) => (
                  <a key={reference.url} href={reference.url} target="_blank" rel="noopener noreferrer">
                    {reference.label} <Icon name="external" size={15} />
                  </a>
                ))}
              </aside>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppAction />
    </>
  )
}
