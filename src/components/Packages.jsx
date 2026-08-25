import { useCallback, useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/site'
import { serviceExplorerContent } from '../data/serviceExplorer'
import { useLocale } from '../i18n/locale-context'
import { Icon } from './Icon'

const shortcutLabels = {
  en: {
    label: 'Choose by audience',
    items: {
      commerce: 'For brands & store owners',
      'landing-pages': 'For campaigns & offers',
      portfolio: 'For individuals',
      corporate: 'For companies',
      'internal-tools': 'For teams',
    },
  },
  ar: {
    label: 'اختر حسب احتياجك',
    items: {
      commerce: 'للعلامات التجارية وأصحاب المتاجر',
      'landing-pages': 'للحملات والعروض',
      portfolio: 'للأفراد',
      corporate: 'للشركات',
      'internal-tools': 'لفِرَق العمل',
    },
  },
}

function getWhatsAppUrl(packageName, language) {
  const message = language === 'ar'
    ? `مرحبًا KLYX، أود مناقشة باقة ${packageName}.`
    : `Hello KLYX, I would like to discuss the ${packageName} package.`

  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`
}

function ScopeList({ items, icon = 'check' }) {
  if (!items?.length) return null

  return (
    <ul className="explorer-scope-list">
      {items.map((item) => (
        <li key={item}>
          <Icon name={icon} size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function DetailGroup({ title, items, tone = 'standard', headingLevel = 4 }) {
  if (!items?.length) return null

  const Heading = headingLevel === 5 ? 'h5' : 'h4'

  return (
    <section className={`explorer-detail-group explorer-detail-group--${tone}`}>
      <Heading>{title}</Heading>
      <ScopeList items={items} icon={tone === 'exclusion' ? 'close' : tone === 'qualification' ? 'info' : 'check'} />
    </section>
  )
}

function DisclosureSummary({ labels, packageScope = false }) {
  return (
    <summary>
      <span className="explorer-disclosure__closed">{packageScope ? labels.viewScope : labels.viewDetails}</span>
      <span className="explorer-disclosure__open">{packageScope ? labels.hideScope : labels.hideDetails}</span>
      <Icon name="chevron" size={19} />
    </summary>
  )
}

function PackageCard({ item, labels, language }) {
  return (
    <article className="explorer-package-card" data-package-id={item.id}>
      <div className="explorer-package-card__head">
        <h3>{item.name}</h3>
        {item.domainIncluded && (
          <span className="domain-badge">
            <Icon name="domain" size={15} />
            {labels.domainBadge}
          </span>
        )}
      </div>

      <p className="explorer-package-best">
        <span>{labels.bestFor}</span>
        {item.bestFor}
      </p>

      <div className="explorer-package-scope">
        <p className="mono">{labels.keyScope}</p>
        <ScopeList items={item.inclusions.slice(0, 3)} />
      </div>

      <p className="explorer-package-support">
        <Icon name="care" size={18} />
        <span><strong>{labels.launchCare}</strong>{item.launchCare}</span>
      </p>

      <details className="explorer-disclosure explorer-package-disclosure">
        <DisclosureSummary labels={labels} packageScope />
        <div className="explorer-disclosure__body">
          <DetailGroup title={labels.completeScope} items={item.inclusions} />
          <DetailGroup title={labels.exclusions} items={item.exclusions} tone="exclusion" />
          <DetailGroup title={labels.qualifications} items={item.qualifications} tone="qualification" />
        </div>
      </details>

      <a
        className="button button--dark button--full explorer-package-cta"
        href={getWhatsAppUrl(item.name, language)}
        target="_blank"
        rel="noopener noreferrer"
        data-package-name={item.name}
      >
        {labels.ask}
        <Icon name="whatsapp" size={18} />
      </a>
    </article>
  )
}

function ScopeCard({ item, labels, variant = 'standard', index }) {
  const isOperations = variant === 'operations'

  return (
    <article className={`explorer-package-card explorer-aux-card explorer-aux-card--${variant}`}>
      {isOperations ? (
        <div className="explorer-operations-card__head">
          <span className="mono">{String(index + 1).padStart(2, '0')}</span>
          <span className="explorer-operations-card__icon"><Icon name={item.icon} size={22} /></span>
          <div>
            <p className="mono">{item.responsibility}</p>
            <h4>{item.name}</h4>
          </div>
        </div>
      ) : (
        <h4>{item.name}</h4>
      )}

      {item.bestFor && <p className="explorer-package-best"><span>{labels.bestFor}</span>{item.bestFor}</p>}
      {item.intro && <p className="explorer-aux-card__intro">{item.intro}</p>}

      <details className="explorer-disclosure">
        <DisclosureSummary labels={labels} />
        <div className="explorer-disclosure__body">
          <DetailGroup title={labels.includes} items={item.inclusions} headingLevel={5} />
          <DetailGroup title={labels.exclusions} items={item.exclusions} tone="exclusion" headingLevel={5} />
          <DetailGroup title={labels.channels} items={item.channels} headingLevel={5} />
          <DetailGroup title={labels.channelRegister} items={item.channelRegister} tone="qualification" headingLevel={5} />
          <DetailGroup title={labels.operatingStandard} items={item.operatingStandard} tone="qualification" headingLevel={5} />
          <DetailGroup title={labels.authority} items={item.authority} tone="exclusion" headingLevel={5} />
          <DetailGroup title={labels.qualifications} items={item.qualifications} tone="qualification" headingLevel={5} />
        </div>
      </details>
    </article>
  )
}

function ChapterAccordion({ id, section, isOpen, onToggle, children }) {
  const buttonId = `${id}-button`
  const panelId = `${id}-panel`

  return (
    <section className={`after-launch explorer-chapter-accordion ${isOpen ? 'is-open' : ''}`} aria-labelledby={buttonId}>
      <h3>
        <button id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle}>
          <span><span className="mono">{section.eyebrow}</span>{section.title}</span>
          <Icon name="chevron" size={21} />
        </button>
      </h3>
      <div id={panelId} className="after-launch__panel" role="region" aria-labelledby={buttonId} aria-hidden={!isOpen} inert={!isOpen ? true : undefined}>
        <div className="after-launch__inner explorer-chapter-body">
          {section.intro && <p className="after-launch__intro">{section.intro}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

export function Packages() {
  const { language } = useLocale()
  const copy = serviceExplorerContent[language]
  const shortcuts = shortcutLabels[language]
  const [openServiceId, setOpenServiceId] = useState(() => {
    const hash = window.location.hash.slice(1)
    return copy.categories.some((category) => category.id === hash) ? hash : null
  })
  const [openChapterIds, setOpenChapterIds] = useState(() => new Set())
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
      if (copy.categories.some((category) => category.id === serviceId)) {
        openAndFocusService(serviceId, { updateHash: false, focus: false })
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [copy.categories, openAndFocusService])

  const toggleService = (serviceId) => {
    if (openServiceId === serviceId) {
      setOpenServiceId(null)
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#packages`)
      return
    }

    openAndFocusService(serviceId, { focus: false })
  }

  const toggleChapter = (chapterId) => {
    setOpenChapterIds((current) => {
      const next = new Set(current)
      if (next.has(chapterId)) next.delete(chapterId)
      else next.add(chapterId)
      return next
    })
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

        <nav className="audience-shortcuts" aria-label={shortcuts.label}>
          {copy.categories.map((category) => (
            <button
              type="button"
              className={openServiceId === category.id ? 'is-active' : ''}
              aria-pressed={openServiceId === category.id}
              onClick={() => openAndFocusService(category.id)}
              key={category.id}
            >
              <Icon name={category.icon} size={22} />
              <span>{shortcuts.items[category.id]}</span>
              <Icon name="arrow" size={17} className="rtl-flip audience-shortcut__arrow" />
            </button>
          ))}
        </nav>

        <div className="service-explorer-list">
          {copy.categories.map((category, index) => {
            const isOpen = openServiceId === category.id
            const buttonId = `${category.id}-button`
            const panelId = `${category.id}-panel`

            return (
              <article className={`service-explorer-item ${isOpen ? 'is-open' : ''}`} id={category.id} key={category.id}>
                <h2 className="service-explorer-item__heading">
                  <button
                    ref={(element) => {
                      if (element) serviceButtonRefs.current.set(category.id, element)
                      else serviceButtonRefs.current.delete(category.id)
                    }}
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleService(category.id)}
                  >
                    <span className="service-explorer-index mono">{String(index + 1).padStart(2, '0')}</span>
                    <span className="service-explorer-icon"><Icon name={category.icon} size={26} /></span>
                    <span className="service-explorer-summary">
                      <strong>{category.title}</strong>
                      <small>{category.audience}</small>
                    </span>
                    <span className="service-explorer-toggle" aria-hidden="true"><Icon name="plus" size={22} /></span>
                  </button>
                </h2>

                <div className="service-explorer-panel" id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!isOpen} inert={!isOpen ? true : undefined}>
                  <div className="service-explorer-panel__inner">
                    {category.guidedTitle && (
                      <div className="service-guidance">
                        <h3>{category.guidedTitle}</h3>
                        <p>{category.note}</p>
                      </div>
                    )}

                    <div className={`explorer-package-grid ${category.packages.length === 4 ? 'explorer-package-grid--four' : ''}`}>
                      {category.packages.map((item) => (
                        <PackageCard item={item} labels={copy.labels} language={language} key={item.id} />
                      ))}
                    </div>

                    {!category.guidedTitle && category.note && <p className="service-explorer-note"><Icon name="info" size={18} /><span>{category.note}</span></p>}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <aside className="domain-rule" aria-labelledby="domain-rule-title">
          <div>
            <p className="mono">{copy.domain.eyebrow}</p>
            <h3 id="domain-rule-title">{copy.domain.title}</h3>
          </div>
          <ul>
            {copy.domain.items.map((item) => <li key={item}><Icon name="info" size={17} /><span>{item}</span></li>)}
            <li><Icon name="info" size={17} /><span><strong>{copy.thirdParty.eyebrow}:</strong> {copy.thirdParty.text}</span></li>
          </ul>
        </aside>

        <ChapterAccordion id="launch-care" section={copy.launchCare} isOpen={openChapterIds.has('launch-care')} onToggle={() => toggleChapter('launch-care')}>
          <div className="launch-care-layout">
            <dl className="launch-care-list">
              {copy.launchCare.entries.map(([name, care]) => <div key={name}><dt>{name}</dt><dd>{care}</dd></div>)}
            </dl>
            <aside className="launch-care-rules"><ScopeList items={copy.launchCare.rules} icon="info" /></aside>
          </div>
        </ChapterAccordion>

        <ChapterAccordion id="continuing-care" section={copy.continuingCare} isOpen={openChapterIds.has('continuing-care')} onToggle={() => toggleChapter('continuing-care')}>
          <div className="explorer-package-grid explorer-package-grid--four explorer-aux-grid explorer-aux-grid--care">
            {copy.continuingCare.items.map((item) => <ScopeCard item={item} labels={copy.labels} key={item.id} />)}
          </div>
          <p className="explorer-chapter-caution"><Icon name="info" size={18} />{copy.continuingCare.globalExclusion}</p>
        </ChapterAccordion>

        <ChapterAccordion id="commerce-operations" section={copy.operations} isOpen={openChapterIds.has('commerce-operations')} onToggle={() => toggleChapter('commerce-operations')}>
          <div className="explorer-package-grid explorer-package-grid--four explorer-aux-grid explorer-aux-grid--operations">
            {copy.operations.items.map((item, index) => <ScopeCard item={item} labels={copy.labels} variant="operations" index={index} key={item.id} />)}
          </div>
        </ChapterAccordion>

        <ChapterAccordion id="specialist-modules" section={copy.specialistModules} isOpen={openChapterIds.has('specialist-modules')} onToggle={() => toggleChapter('specialist-modules')}>
          <div className="explorer-package-grid explorer-aux-grid explorer-aux-grid--modules">
            {copy.specialistModules.items.map((item) => <ScopeCard item={item} labels={copy.labels} variant="module" key={item.id} />)}
          </div>
        </ChapterAccordion>

        <ChapterAccordion id="not-packaged" section={copy.notPackaged} isOpen={openChapterIds.has('not-packaged')} onToggle={() => toggleChapter('not-packaged')}>
          <div className="explorer-planned-list"><ScopeList items={copy.notPackaged.items} icon="close" /></div>
        </ChapterAccordion>

        <ChapterAccordion id="customer-journey" section={copy.journey} isOpen={openChapterIds.has('customer-journey')} onToggle={() => toggleChapter('customer-journey')}>
          <ol className="explorer-journey-list">
            {copy.journey.steps.map((step, index) => (
              <li key={step}>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
                {index < copy.journey.steps.length - 1 && <Icon name="arrow" size={18} className="rtl-flip" />}
              </li>
            ))}
          </ol>
        </ChapterAccordion>
      </div>
    </section>
  )
}
