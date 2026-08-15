import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'
import { Icon } from './Icon'

export function Partnership() {
  const { language } = useLocale()
  const copy = siteContent[language].partnership

  return (
    <section className="section section-dark partnership" id="how-we-work" aria-labelledby="partnership-title">
      <div className="container">
        <div className="section-heading section-heading--split section-heading--dark">
          <div>
            <p className="eyebrow eyebrow--dark">{copy.eyebrow}</p>
            <h2 id="partnership-title">{copy.title}</h2>
          </div>
          <p>{copy.intro}</p>
        </div>

        <div className="partnership-layout">
          <ol className="principle-list">
            {copy.principles.map((principle, index) => (
              <li key={principle}>
                <span className="mono">0{index + 1}</span>
                <p>{principle}</p>
              </li>
            ))}
          </ol>

          <aside className="managed-standard" aria-labelledby="managed-title">
            <div className="managed-standard__head">
              <span className="status"><i /> {copy.status}</span>
              <span className="mono">{copy.meta}</span>
            </div>
            <h3 id="managed-title">{copy.cardTitle}</h3>
            <ul>
              {copy.standard.map((item) => <li key={item}><Icon name="check" size={17} /><span>{item}</span></li>)}
            </ul>
            <p className="managed-standard__note">{copy.note}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
