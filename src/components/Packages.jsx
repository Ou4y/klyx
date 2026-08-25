import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

function DetailGroup({ title, items, tone = 'standard' }) {
  if (!items?.length) return null

  return (
    <section className={`explorer-detail-group explorer-detail-group--${tone}`}>
      <h4>{title}</h4>
      <ScopeList items={items} icon={tone === 'exclusion' ? 'close' : tone === 'qualification' ? 'info' : 'check'} />
    </section>
  )
}

function DisclosureSummary({ labels }) {
  return (
    <summary>
      <span className="explorer-disclosure__closed">{labels.viewDetails}</span>
      <span className="explorer-disclosure__open">{labels.hideDetails}</span>
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

      <div className="explorer-launch-care">
        <Icon name="care" size={18} />
        <p><span>{labels.launchCare}</span>{item.launchCare}</p>
      </div>

      <div className="explorer-key-scope">
        <p className="mono">{labels.keyScope}</p>
        <ScopeList items={item.inclusions.slice(0, 3)} />
      </div>

      <details className="explorer-disclosure explorer-package-disclosure">
        <summary>
          <span className="explorer-disclosure__closed">{labels.viewScope}</span>
          <span className="explorer-disclosure__open">{labels.hideScope}</span>
          <Icon name="chevron" size={19} />
        </summary>
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

function ChapterHeading({ eyebrow, title, intro, id }) {
  return (
    <div className="explorer-chapter__heading">
      <p className="eyebrow">{eyebrow}</p>
      <h3 id={id}>{title}</h3>
      {intro && <p>{intro}</p>}
    </div>
  )
}

function CareCard({ item, labels }) {
  return (
    <article className="explorer-scope-card">
      <h4>{item.name}</h4>
      <p className="explorer-package-best"><span>{labels.bestFor}</span>{item.bestFor}</p>
      <details className="explorer-disclosure">
        <DisclosureSummary labels={labels} />
        <div className="explorer-disclosure__body">
          <DetailGroup title={labels.includes} items={item.inclusions} />
          <DetailGroup title={labels.exclusions} items={item.exclusions} tone="exclusion" />
          <DetailGroup title={labels.qualifications} items={item.qualifications} tone="qualification" />
        </div>
      </details>
    </article>
  )
}

function OperationsCard({ item, labels, index }) {
  return (
    <article className="operations-card">
      <div className="operations-card__head">
        <span className="operations-card__index mono">{String(index + 1).padStart(2, '0')}</span>
        <span className="operations-card__icon"><Icon name={item.icon} size={24} /></span>
        <div>
          <p className="mono">{item.responsibility}</p>
          <h4>{item.name}</h4>
        </div>
      </div>
      <p className="explorer-package-best"><span>{labels.bestFor}</span>{item.bestFor}</p>
      {item.intro && <p className="operations-card__intro">{item.intro}</p>}
      <details className="explorer-disclosure">
        <DisclosureSummary labels={labels} />
        <div className="explorer-disclosure__body">
          <DetailGroup title={labels.includes} items={item.inclusions} />
          <DetailGroup title={labels.exclusions} items={item.exclusions} tone="exclusion" />
          <DetailGroup title={labels.channels} items={item.channels} />
          <DetailGroup title={labels.channelRegister} items={item.channelRegister} tone="qualification" />
          <DetailGroup title={labels.operatingStandard} items={item.operatingStandard} tone="qualification" />
          <DetailGroup title={labels.authority} items={item.authority} tone="exclusion" />
          <DetailGroup title={labels.qualifications} items={item.qualifications} tone="qualification" />
        </div>
      </details>
    </article>
  )
}

function ModuleCard({ item, labels }) {
  return (
    <article className="module-card">
      <h4>{item.name}</h4>
      {item.bestFor && <p className="explorer-package-best"><span>{labels.bestFor}</span>{item.bestFor}</p>}
      <details className="explorer-disclosure">
        <DisclosureSummary labels={labels} />
        <div className="explorer-disclosure__body">
          <DetailGroup title={labels.includes} items={item.inclusions} />
          <DetailGroup title={labels.exclusions} items={item.exclusions} tone="exclusion" />
          <DetailGroup title={labels.qualifications} items={item.qualifications} tone="qualification" />
        </div>
      </details>
    </article>
  )
}

export function Packages() {
  const { language } = useLocale()
  const copy = serviceExplorerContent[language]
  const categoryIds = useMemo(() => copy.categories.map((category) => category.id), [copy.categories])
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    const hash = window.location.hash.slice(1)
    return categoryIds.includes(hash) ? hash : categoryIds[0]
  })
  const tabRefs = useRef(new Map())

  const selectCategory = useCallback((categoryId, { focus = false, updateHash = true } = {}) => {
    setSelectedCategoryId(categoryId)
    if (updateHash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${categoryId}`)
    }
    if (focus) window.requestAnimationFrame(() => tabRefs.current.get(categoryId)?.focus())
  }, [])

  useEffect(() => {
    const handleHash = () => {
      const categoryId = window.location.hash.slice(1)
      if (categoryIds.includes(categoryId)) selectCategory(categoryId, { updateHash: false })
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [categoryIds, selectCategory])

  const selectedCategory = copy.categories.find((category) => category.id === selectedCategoryId) || copy.categories[0]

  const handleTabKeyDown = (event, currentIndex) => {
    const rtlDirection = language === 'ar' ? -1 : 1
    let nextIndex = null

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + rtlDirection + categoryIds.length) % categoryIds.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - rtlDirection + categoryIds.length) % categoryIds.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = categoryIds.length - 1
    if (nextIndex === null) return

    event.preventDefault()
    selectCategory(categoryIds[nextIndex], { focus: true })
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

        <section className="explorer-build" aria-labelledby="build-packages-title">
          <div className="explorer-build__meta">
            <p className="eyebrow">01 / {copy.labels.buildPackages}</p>
            <h3 id="build-packages-title">{copy.labels.chooseCategory}</h3>
          </div>

          <div className="explorer-tabs" role="tablist" aria-label={copy.labels.chooseCategory}>
            {copy.categories.map((category, index) => {
              const isSelected = selectedCategory.id === category.id
              return (
                <button
                  type="button"
                  role="tab"
                  id={`${category.id}-tab`}
                  aria-controls={`${category.id}-panel`}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  className={isSelected ? 'is-active' : ''}
                  onClick={() => selectCategory(category.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  ref={(element) => {
                    if (element) tabRefs.current.set(category.id, element)
                    else tabRefs.current.delete(category.id)
                  }}
                  key={category.id}
                >
                  <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                  <Icon name={category.icon} size={22} />
                  <span>{category.title}</span>
                </button>
              )
            })}
          </div>

          <div
            className={`explorer-category-panel ${selectedCategory.id === 'internal-tools' ? 'explorer-category-panel--guided' : ''}`}
            id={`${selectedCategory.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${selectedCategory.id}-tab`}
            tabIndex={0}
          >
            <div className="explorer-category-intro">
              <div>
                <p className="mono">{selectedCategory.title}</p>
                <h3>{selectedCategory.guidedTitle || selectedCategory.audience}</h3>
              </div>
              {selectedCategory.guidedTitle && <p>{selectedCategory.audience}</p>}
            </div>
            {selectedCategory.guidedTitle && selectedCategory.note && <p className="explorer-guided-note"><Icon name="info" size={18} />{selectedCategory.note}</p>}
            {!selectedCategory.guidedTitle && selectedCategory.note && <p className="explorer-category-note"><Icon name="info" size={18} />{selectedCategory.note}</p>}

            <div className={`explorer-package-grid ${selectedCategory.packages.length === 4 ? 'explorer-package-grid--four' : ''}`}>
              {selectedCategory.packages.map((item) => (
                <PackageCard item={item} labels={copy.labels} language={language} key={item.id} />
              ))}
            </div>
          </div>

          <div className="explorer-rules-grid">
            <aside className="explorer-rule-card" aria-labelledby="domain-rule-title">
              <p className="mono">{copy.domain.eyebrow}</p>
              <h3 id="domain-rule-title">{copy.domain.title}</h3>
              <ScopeList items={copy.domain.items} icon="info" />
            </aside>
            <aside className="explorer-rule-card explorer-rule-card--accent" aria-labelledby="third-party-rule-title">
              <p className="mono">{copy.thirdParty.eyebrow}</p>
              <h3 id="third-party-rule-title">{copy.thirdParty.text}</h3>
            </aside>
          </div>
        </section>

        <section className="explorer-chapter" aria-labelledby="launch-care-title">
          <ChapterHeading {...copy.launchCare} id="launch-care-title" />
          <div className="launch-care-layout">
            <dl className="launch-care-list">
              {copy.launchCare.entries.map(([name, care]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{care}</dd>
                </div>
              ))}
            </dl>
            <aside className="launch-care-rules">
              <ScopeList items={copy.launchCare.rules} icon="info" />
            </aside>
          </div>
        </section>

        <section className="explorer-chapter" aria-labelledby="continuing-care-title">
          <ChapterHeading {...copy.continuingCare} id="continuing-care-title" />
          <div className="explorer-card-grid explorer-card-grid--two">
            {copy.continuingCare.items.map((item) => <CareCard item={item} labels={copy.labels} key={item.id} />)}
          </div>
          <p className="explorer-chapter-caution"><Icon name="info" size={18} />{copy.continuingCare.globalExclusion}</p>
        </section>

        <section className="explorer-chapter" aria-labelledby="operations-title">
          <ChapterHeading {...copy.operations} id="operations-title" />
          <div className="operations-progression">
            {copy.operations.items.map((item, index) => <OperationsCard item={item} labels={copy.labels} index={index} key={item.id} />)}
          </div>
        </section>

        <section className="explorer-chapter" aria-labelledby="specialist-title">
          <ChapterHeading {...copy.specialistModules} id="specialist-title" />
          <div className="explorer-card-grid explorer-card-grid--modules">
            {copy.specialistModules.items.map((item) => <ModuleCard item={item} labels={copy.labels} key={item.id} />)}
          </div>
        </section>

        <section className="explorer-chapter explorer-chapter--planned" aria-labelledby="not-packaged-title">
          <ChapterHeading {...copy.notPackaged} id="not-packaged-title" />
          <ScopeList items={copy.notPackaged.items} icon="close" />
        </section>

        <section className="explorer-chapter explorer-journey" aria-labelledby="journey-title">
          <ChapterHeading {...copy.journey} id="journey-title" />
          <ol>
            {copy.journey.steps.map((step, index) => (
              <li key={step}>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
                {index < copy.journey.steps.length - 1 && <Icon name="arrow" size={18} className="rtl-flip" />}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  )
}
