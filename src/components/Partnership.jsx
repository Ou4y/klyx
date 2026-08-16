import { useRef } from 'react'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'
import { useProcessProgress } from '../hooks/useProcessProgress'
import { Icon } from './Icon'

export function Partnership() {
  const { language } = useLocale()
  const copy = siteContent[language].partnership
  const journeyRef = useRef(null)
  const progressRef = useRef(null)

  useProcessProgress({ containerRef: journeyRef, progressRef })

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

        <div className="process-layout">
          <div className="process-journey" ref={journeyRef}>
            <svg className="process-wave" viewBox="0 0 120 820" preserveAspectRatio="none" aria-hidden="true">
              <path className="process-wave__base" pathLength="1" d="M60 10C18 72 20 132 60 178C101 226 100 292 60 338C18 386 20 452 60 500C101 548 100 612 60 660C18 708 22 766 60 810" />
              <path ref={progressRef} className="process-wave__progress" pathLength="1" d="M60 10C18 72 20 132 60 178C101 226 100 292 60 338C18 386 20 452 60 500C101 548 100 612 60 660C18 708 22 766 60 810" />
            </svg>
            <ol className="process-steps">
              {copy.principles.map((principle, index) => (
                <li className="process-step" key={principle}>
                  <span className="process-step__number mono">0{index + 1}</span>
                  <p>{principle}</p>
                </li>
              ))}
            </ol>
          </div>

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
