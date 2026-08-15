import { useState } from 'react'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'
import { Icon } from './Icon'

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  const { language } = useLocale()
  const copy = siteContent[language].faq

  return (
    <section className="section section-mist faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="faq-intro">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="faq-title">{copy.title}</h2>
          <p>{copy.intro}</p>
          <a className="text-link" href="#contact">{copy.ask} <Icon name="arrow" size={18} className="rtl-flip" /></a>
        </div>

        <div className="accordion">
          {copy.items.map((faq, index) => {
            const isOpen = openIndex === index
            const buttonId = `faq-button-${index}`
            const panelId = `faq-panel-${index}`
            return (
              <article className={`faq-item ${isOpen ? 'is-open' : ''}`} key={faq.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span><span className="mono">{String(index + 1).padStart(2, '0')}</span>{faq.question}</span>
                    <Icon name="chevron" size={20} />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
                  <p>{faq.answer}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
