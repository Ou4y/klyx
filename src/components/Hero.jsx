import { Icon } from './Icon'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'

export function Hero() {
  const { language } = useLocale()
  const copy = siteContent[language].hero

  return (
    <section className="hero section-dark" aria-labelledby="hero-title">
      <div className="hero-datum" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow eyebrow--dark"><span>{copy.eyebrow}</span></p>
          <h1 id="hero-title">{copy.title}</h1>
          <p className="hero-lead">{copy.lead}</p>
          <div className="hero-actions">
            <a className="button button--mint" href="#services">
              {copy.explore} <Icon name="arrow" size={18} className="rtl-flip" />
            </a>
            <a className="button button--ghost-light" href="#contact">{copy.start}</a>
          </div>
          <p className="trust-line"><span aria-hidden="true" /> {copy.trust}</p>
        </div>

        <div className="hero-system" aria-label={copy.panelLabel}>
          <img className="hero-k" src="/brand/klyx-k-light.svg" width="144" height="144" alt="" aria-hidden="true" />
          <div className="system-panel">
            <div className="system-panel__head">
              <span className="mono">{copy.panelMeta}</span>
              <span className="status"><i /> {copy.status}</span>
            </div>
            <div className="system-stages" aria-label={copy.stagesLabel}>
              {copy.stages.map((stage, index) => (
                <div className={`system-stage ${index === 0 ? 'is-active' : ''}`} key={stage.title}>
                  <span className="mono">0{index + 1}</span>
                  <strong>{stage.title}</strong>
                  <small>{stage.text}</small>
                </div>
              ))}
            </div>
            <div className="system-footer">
              <span>{copy.partnership}</span>
              <span className="system-line" aria-hidden="true"><i /></span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-foot container" aria-hidden="true">
        <span>{copy.location}</span>
        <span>{copy.sequence}</span>
      </div>
    </section>
  )
}
