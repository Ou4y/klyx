import { Icon } from './Icon'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'

function DeliveryStageIcon({ index }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M14 7h14l7 7v27H14z" />
        <path d="M28 7v8h7M19 23h11M19 29h11M19 35h7" />
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="9" width="34" height="30" rx="2" />
        <path d="M7 16h34M12 12.5h.01M17 12.5h.01M13 23h12M13 29h22M13 34h17" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M15 9h18v6h5v26H10V15h5z" />
      <path d="M15 9v8h18V9M16 25l3 3 6-7M28 25h5M16 34l3 3 6-7M28 34h5" />
    </svg>
  )
}

export function Hero() {
  const { language } = useLocale()
  const copy = siteContent[language].hero

  return (
    <section className="hero section-dark" aria-labelledby="hero-title">
      <div className="hero-datum" aria-hidden="true" />
      <div className="hero-live-background" aria-hidden="true">
        <span className="hero-background-sheet hero-background-sheet--one" />
        <span className="hero-background-sheet hero-background-sheet--two" />
        <span className="hero-background-sheet hero-background-sheet--three" />
      </div>
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

        <div className="hero-system" role="group" aria-label={copy.panelLabel}>
          <div className="delivery-panel">
            <div className="delivery-panel__head">
              <span className="mono">{copy.panelMeta}</span>
              <span className="status"><i /> {copy.status}</span>
            </div>
            <ol className="delivery-track" aria-label={copy.stagesLabel}>
              {copy.stages.map((stage, index) => (
                <li className="delivery-stage" key={stage.title}>
                  <span className="delivery-stage__icon"><DeliveryStageIcon index={index} /></span>
                  <span className="delivery-stage__copy">
                    <span className="mono">0{index + 1}</span>
                    <strong>{stage.title}</strong>
                    <small>{stage.text}</small>
                  </span>
                </li>
              ))}
            </ol>
            <div className="delivery-panel__footer">
              <span>{copy.partnership}</span>
              <span className="delivery-route" aria-hidden="true"><i /></span>
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
