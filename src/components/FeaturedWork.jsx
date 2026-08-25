import { projects } from '../data/projects'
import { Icon } from './Icon'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'

function ProjectCard({ project, copy }) {
  return (
    <article className={`project-card project-card--${project.id}`}>
      <div className="project-card__visual">
        <span className="project-card__record mono">{project.number}</span>
        <img
          className="project-card__mark"
          src={project.image.src}
          srcSet={project.image.srcSet || undefined}
          sizes="(max-width: 760px) 100vw, (max-width: 1120px) 50vw, 60vw"
          width={project.image.width}
          height={project.image.height}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="project-card__body">
        <p className="mono">{project.category}</p>
        <h3>{project.name}</h3>
        <p className={project.comingSoon ? 'project-card__coming-soon mono' : undefined}>{project.comingSoon ? copy.comingSoon : project.contribution}</p>
        {(project.instagramUrl || project.websiteUrl) && (
          <div className="project-card__actions">
            {project.instagramUrl && (
              <a href={project.instagramUrl} target="_blank" rel="noopener noreferrer">{copy.instagram} <Icon name="external" size={16} /></a>
            )}
            {project.websiteUrl && (
              <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={`${copy.visit}: ${project.name}`}>{copy.visit} <Icon name="external" size={16} /></a>
            )}
          </div>
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

        {projects.length > 0 ? (
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.name} project={project} copy={copy} />)}
          </div>
        ) : (
          <div className="work-empty">
            <div className="work-empty__visual" aria-hidden="true">
              <img src="/brand/klyx-k-dark.svg" width="106" height="106" alt="" />
              <span className="work-empty__line" />
              <span className="mono">{copy.proof}</span>
            </div>
            <div className="work-empty__copy">
              <p className="mono">{copy.library}</p>
              <h3>{copy.pendingTitle}</h3>
              <p>{copy.pendingText}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
