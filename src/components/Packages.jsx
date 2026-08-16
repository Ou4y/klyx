import { useCallback, useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/site'
import { serviceExplorerContent } from '../data/serviceExplorer'
import { useLocale } from '../i18n/locale-context'
import { Icon } from './Icon'

function getWhatsAppUrl(packageName, language) {
  const message = language === 'ar'
    ? `مرحبًا KLYX، أود مناقشة باقة ${packageName}.`
    : `Hello KLYX, I would like to discuss the ${packageName} package.`

  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`
}

function PackageCard({ item, labels, language }) {
  return (
    <article className="explorer-package-card" data-package-id={item.id}>
      <div className="explorer-package-card__head">
        <h3>{item.name}</h3>
        {item.domainIncluded && <span className="domain-badge"><Icon name="domain" size={15} />{item.domainBadge || labels.domainBadge}</span>}
      </div>
      <p className="explorer-package-best"><span>{labels.bestFor}</span>{item.bestFor}</p>

      <div className="explorer-package-scope">
        <p className="mono">{labels.included}</p>
        <ul>
          {item.inclusions.map((inclusion) => (
            <li key={inclusion}><Icon name="check" size={17} /><span>{inclusion}</span></li>
          ))}
        </ul>
      </div>

      <p className="explorer-package-support"><Icon name="care" size={18} /><span>{item.support}</span></p>
      <a
        className="button button--dark button--full explorer-package-cta"
        href={getWhatsAppUrl(item.name, language)}
        target="_blank"
        rel="noopener noreferrer"
        data-package-name={item.name}
      >
        {labels.ask}<Icon name="whatsapp" size={18} />
      </a>
    </article>
  )
}

export function Packages() {
  const { language } = useLocale()
  const copy = serviceExplorerContent[language]
  const [openServiceId, setOpenServiceId] = useState(() => {
    const hash = window.location.hash.slice(1)
    return copy.services.some((service) => service.id === hash) ? hash : null
  })
  const [afterLaunchOpen, setAfterLaunchOpen] = useState(false)
  const serviceButtonRefs = useRef(new Map())

  const openAndFocusService = useCallback((serviceId, { updateHash = true, focus = true } = {}) => {
    setOpenServiceId(serviceId)

    if (updateHash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${serviceId}`)
    }

    window.requestAnimationFrame(() => {
      const button = serviceButtonRefs.current.get(serviceId)
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      button?.closest('.service-explorer-item')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
      if (focus) button?.focus({ preventScroll: true })
    })
  }, [])

  useEffect(() => {
    const handleHash = () => {
      const serviceId = window.location.hash.slice(1)
      if (copy.services.some((service) => service.id === serviceId)) {
        openAndFocusService(serviceId, { updateHash: false, focus: false })
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [copy.services, openAndFocusService])

  const toggleService = (serviceId) => {
    if (openServiceId === serviceId) {
      setOpenServiceId(null)
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#packages`)
      return
    }

    openAndFocusService(serviceId, { focus: false })
  }

  return (
    <section className="section section-paper packages service-explorer" id="packages" aria-labelledby="packages-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="packages-title">{copy.title}</h2>
          </div>
          <p>{copy.intro}</p>
        </div>

        <nav className="audience-shortcuts" aria-label={copy.shortcutLabel}>
          {copy.shortcuts.map((shortcut) => (
            <button
              type="button"
              className={openServiceId === shortcut.serviceId ? 'is-active' : ''}
              aria-pressed={openServiceId === shortcut.serviceId}
              onClick={() => openAndFocusService(shortcut.serviceId)}
              key={shortcut.serviceId}
            >
              <Icon name={shortcut.icon} size={22} />
              <span>{shortcut.label}</span>
              <Icon name="arrow" size={17} className="rtl-flip audience-shortcut__arrow" />
            </button>
          ))}
        </nav>

        <div className="service-explorer-list">
          {copy.services.map((service, index) => {
            const isOpen = openServiceId === service.id
            const buttonId = `${service.id}-button`
            const panelId = `${service.id}-panel`

            return (
              <article className={`service-explorer-item ${isOpen ? 'is-open' : ''}`} id={service.id} key={service.id}>
                <h2 className="service-explorer-item__heading">
                  <button
                    ref={(element) => {
                      if (element) serviceButtonRefs.current.set(service.id, element)
                      else serviceButtonRefs.current.delete(service.id)
                    }}
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleService(service.id)}
                  >
                    <span className="service-explorer-index mono">{String(index + 1).padStart(2, '0')}</span>
                    <span className="service-explorer-icon"><Icon name={service.icon} size={26} /></span>
                    <span className="service-explorer-summary">
                      <strong>{service.title}</strong>
                      <small>{service.audience}</small>
                    </span>
                    <span className="service-explorer-toggle" aria-hidden="true"><Icon name="plus" size={22} /></span>
                  </button>
                </h2>

                <div
                  className="service-explorer-panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  inert={!isOpen ? true : undefined}
                >
                  <div className="service-explorer-panel__inner">
                    {(service.subheading || service.explanation) && (
                      <div className="service-guidance">
                        {service.subheading && <h3>{service.subheading}</h3>}
                        {service.explanation && <p>{service.explanation}</p>}
                      </div>
                    )}

                    <div className={`explorer-package-grid ${service.packages.length === 4 ? 'explorer-package-grid--four' : ''}`}>
                      {service.packages.map((item) => (
                        <PackageCard item={item} labels={copy.labels} language={language} key={item.id} />
                      ))}
                    </div>

                    {service.note && <p className="service-explorer-note"><Icon name="info" size={18} /><span>{service.note}</span></p>}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <aside className="domain-rule" aria-labelledby="domain-rule-title">
          <div>
            <p className="mono">{copy.domain.title}</p>
            <h3 id="domain-rule-title">{copy.domain.lead}</h3>
          </div>
          <ul>
            {copy.domain.items.map((item) => <li key={item}><Icon name="info" size={17} /><span>{item}</span></li>)}
          </ul>
        </aside>

        <div className={`after-launch ${afterLaunchOpen ? 'is-open' : ''}`}>
          <h3>
            <button type="button" aria-expanded={afterLaunchOpen} aria-controls="after-launch-panel" onClick={() => setAfterLaunchOpen((open) => !open)}>
              <span><span className="mono">{copy.afterLaunch.meta}</span>{copy.afterLaunch.title}</span>
              <Icon name="chevron" size={21} />
            </button>
          </h3>
          <div id="after-launch-panel" className="after-launch__panel" aria-hidden={!afterLaunchOpen} inert={!afterLaunchOpen ? true : undefined}>
            <div className="after-launch__inner">
              <p className="after-launch__intro">{copy.afterLaunch.intro}</p>
              <ul className="after-launch__notes">
                {copy.afterLaunch.notes.map((item) => <li key={item}><Icon name="check" size={17} /><span>{item}</span></li>)}
              </ul>
              <h4>{copy.afterLaunch.careTitle}</h4>
              <div className="care-grid">
                {copy.afterLaunch.care.map((item) => (
                  <div className="care-option" key={item.name}>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
              <p className="after-launch__caution"><Icon name="info" size={17} />{copy.afterLaunch.caution}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
