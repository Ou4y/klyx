import { projects } from '../data/projects'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'
import { Icon } from './Icon'

function ProjectCard({ project, visitLabel }) {
  return (
    <article className={`project-card project-card--${project.tone}`} aria-label={project.name}>
      <div className="project-card__logo">
        <img
          className="project-card__client-logo"
          src={project.logo.src}
          width={project.logo.width}
          height={project.logo.height}
          alt={`${project.name} logo`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="project-card__action">
        {project.websiteUrl ? (
          <a
            className="project-card__visit"
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${visitLabel} ${project.name}`}
          >
            {visitLabel}<Icon name="external" size={16} />
          </a>
        ) : (
          <span className="project-card__visit project-card__visit--static">
            {visitLabel}<Icon name="external" size={16} />
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
          {projects.map((project) => <ProjectCard key={project.name} project={project} visitLabel={copy.visitShort} />)}
        </div>
      </div>
    </section>
  )
}
