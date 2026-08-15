import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'
import { Icon } from './Icon'
import { ServiceVector } from './ServiceVector'

export function Services() {
  const { language } = useLocale()
  const { services, servicesSection: copy } = siteContent[language]

  return (
    <section className="section section-paper" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="services-title">{copy.title}</h2>
          </div>
          <p>{copy.intro}</p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-card__head">
                <span className="service-icon"><Icon name={service.icon} size={25} /></span>
                <span className="mono">{service.number}</span>
              </div>
              <ServiceVector type={service.icon} label={service.vectorLabel} />
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul>
                {service.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="scope-note">
          <span className="scope-note__mark" aria-hidden="true" />
          <p>{copy.scope}</p>
        </div>
      </div>
    </section>
  )
}
