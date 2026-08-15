import { siteConfig } from '../config/site'
import { Icon } from './Icon'
import { SocialLinks } from './SocialLinks'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'

export function Contact() {
  const emailUrl = siteConfig.email ? `mailto:${siteConfig.email}` : ''
  const { language } = useLocale()
  const copy = siteContent[language].contact

  return (
    <section className="section section-paper contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-top">
          <div className="contact-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="contact-title">{copy.title}</h2>
            <p>{copy.intro}</p>
            <div className="contact-actions">
              <a className="button button--primary" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={19} /> {copy.whatsapp}
              </a>
              <a className="button button--outline" href={siteConfig.telUrl}><Icon name="phone" size={18} /> {copy.call}</a>
              {emailUrl && <a className="button button--outline" href={emailUrl}><Icon name="mail" size={18} /> {copy.email}</a>}
            </div>
            <SocialLinks />
          </div>

          <aside className="brief-card" aria-labelledby="brief-card-title">
            <div className="brief-card__head">
              <span className="mono">{copy.checklistMeta}</span>
              <span>{copy.checklist.length} {copy.details}</span>
            </div>
            <h3 id="brief-card-title">{copy.checklistTitle}</h3>
            <ul>
              {copy.checklist.map((item, index) => (
                <li key={item}><span className="mono">0{index + 1}</span><span>{item}</span></li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="next-steps">
          <div className="next-steps__heading">
            <p className="eyebrow">{copy.nextEyebrow}</p>
            <h3>{copy.nextTitle}</h3>
          </div>
          <ol>
            {copy.steps.map((step) => (
              <li key={step.number}>
                <span className="mono">{step.number}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
