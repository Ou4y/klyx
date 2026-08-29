import { siteContent } from '../data/siteContent'
import { projects } from '../data/projects'
import { useLocale } from '../i18n/locale-context'
import { Icon } from './Icon'

function projectNumber(index) {
  return String(index + 1).padStart(2, '0')
}

function ProjectCard({ project, index, language, visitLabel, unavailableLabel }) {
  const number = projectNumber(index)
  const category = project.category[language]
  const contribution = project.contribution[language]

  return (
    <li className={`work-card work-card--${project.id}`}>
      <article aria-labelledby={`work-project-${project.id}`}>
        <div className="work-card__meta mono">
          <span aria-hidden="true">{number}</span>
          <span>{category}</span>
        </div>

        <div className="work-card__visual" style={{ '--project-canvas': project.canvasColor }}>
          <img
            className="work-card__logo"
            src={project.image.src}
            srcSet={project.image.srcSet || undefined}
            sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1080px) calc((100vw - 64px) / 2), 400px"
            width={project.image.width}
            height={project.image.height}
            alt={project.image.alt}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="work-card__body">
          <div className="work-card__identity">
            <p className="mono">{contribution}</p>
            <h3 id={`work-project-${project.id}`} dir="ltr">{project.name}</h3>
          </div>

          {project.websiteUrl ? (
            <a
              className="work-card__action"
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${visitLabel}: ${project.name}`}
            >
              <span>{visitLabel}</span>
              <Icon name="external" size={17} />
            </a>
          ) : (
            <span className="work-card__status mono">
              <span className="work-card__status-dot" aria-hidden="true" />
              {unavailableLabel}
            </span>
          )}
        </div>
      </article>
    </li>
  )
}

export function FeaturedWork() {
  const { language } = useLocale()
  const copy = siteContent[language].work

  return (
    <section className="section section-dark work-section" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="work-section__heading">
          <div>
            <p className="eyebrow eyebrow--dark">{copy.eyebrow}</p>
            <h2 id="work-title">{copy.title}</h2>
          </div>

          <div className="work-section__summary">
            <p>{copy.intro}</p>
            <span className="work-section__count mono">{copy.library}</span>
          </div>
        </div>

        <ol className="work-grid" aria-label={copy.title}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              language={language}
              visitLabel={copy.visit}
              unavailableLabel={copy.comingSoon}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
