import { siteContent } from '../data/siteContent'
import { projects } from '../data/projects'
import { useLocale } from '../i18n/locale-context'
import { Icon } from './Icon'

const desktopRowSize = 3

function projectRows(projectList) {
  const rows = []

  for (let index = 0; index < projectList.length; index += desktopRowSize) {
    rows.push(projectList.slice(index, index + desktopRowSize))
  }

  return rows
}

function projectNumber(index) {
  return String(index + 1).padStart(2, '0')
}

function ProjectEntry({ project, index, visitLabel, unavailableLabel }) {
  const number = projectNumber(index)

  return (
    <article
      className={`project-card work-map__project work-map__project--${project.id}`}
      style={{ '--project-canvas': project.canvasColor }}
      role="listitem"
      aria-label={`${number}. ${project.name}`}
    >
      <span className="work-map__number mono" dir="ltr" aria-hidden="true">{number}</span>
      <span className="work-map__node" aria-hidden="true" />

      <div className="work-map__logo-window">
        <img
          className="work-map__logo"
          src={project.image.src}
          srcSet={project.image.srcSet || undefined}
          sizes="(max-width: 820px) calc(100vw - 116px), (max-width: 1120px) 27vw, 320px"
          width={project.image.width}
          height={project.image.height}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="work-map__rail">
        <span className="work-map__name" dir="ltr">{project.name}</span>
        {project.websiteUrl ? (
          <a
            className="work-map__visit"
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${visitLabel} ${project.name}`}
          >
            {visitLabel}<Icon name="external" size={16} />
          </a>
        ) : (
          <span
            className="work-map__visit work-map__visit--static"
            aria-disabled="true"
            aria-label={`${project.name}: ${unavailableLabel}`}
          >
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
  const rows = projectRows(projects)
  const archive = projects.length >= 4

  return (
    <section className="section section-dark work-section" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-heading section-heading--split section-heading--dark">
          <div>
            <p className="eyebrow eyebrow--dark">{copy.eyebrow}</p>
            <h2 id="work-title">{copy.title}</h2>
          </div>
          <p>{copy.intro}</p>
        </div>

        <div
          className={`work-map ${archive ? 'work-map--archive' : 'work-map--featured'}`}
          data-project-count={projects.length}
        >
          <div className="work-map__rows" role="list" aria-label={copy.title}>
            {rows.map((row, rowIndex) => (
              <div
                className="work-map__row"
                data-row-count={row.length}
                key={row.map((project) => project.id).join('-')}
                role="presentation"
              >
                <span className="work-map__row-junction" aria-hidden="true" />
                {row.map((project, columnIndex) => (
                  <ProjectEntry
                    key={project.id}
                    project={project}
                    index={(rowIndex * desktopRowSize) + columnIndex}
                    visitLabel={copy.visitShort}
                    unavailableLabel={copy.comingSoon}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
