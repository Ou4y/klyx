import { siteContent } from '../data/siteContent'
import { projects } from '../data/projects'
import { useLocale } from '../i18n/locale-context'
import { Icon } from './Icon'

const projectTones = {
  lam: 'light',
  'glow-by-hk': 'light',
  claro: 'dark',
}

function ProjectCard({ project, visitLabel, comingSoonLabel }) {
  const websiteLabel = project.websiteLabel || project.websiteUrl

  return (
    <article className={`project-card project-card--${projectTones[project.id]} project-card--${project.id}`} aria-label={project.name}>
      <div className="project-card__record">
        <p className="project-card__number mono">{project.number}</p>
      </div>
      <div className="project-card__logo">
        <img
          className="project-card__client-logo"
          src={project.image.src}
          srcSet={project.image.srcSet || undefined}
          sizes="(max-width: 720px) calc(100vw - 84px), (max-width: 1120px) 44vw, 34vw"
          width={project.image.width}
          height={project.image.height}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="project-card__identity">
        <p className="project-card__name">{project.name}</p>
      </div>
      <div className="project-card__action">
        {project.websiteUrl ? (
          <a
            className="project-card__visit"
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${visitLabel} ${websiteLabel}`}
          >
            <span dir="ltr">{websiteLabel}</span><Icon name="external" size={15} />
          </a>
        ) : (
          <span className="project-card__visit project-card__visit--static" aria-label={comingSoonLabel}>
            {comingSoonLabel}
          </span>
        )}
      </div>
    </article>
  )
}

export function FeaturedWork() {
  const { language } = useLocale()
  const copy = siteContent[language].work

  return (
    <section className="section section-mist" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="work-title">{copy.title}</h2>
          </div>
          <p>{copy.intro}</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              visitLabel={copy.visitShort}
              comingSoonLabel={copy.comingSoon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
