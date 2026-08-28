import { useLayoutEffect, useRef, useState } from 'react'
import { siteContent } from '../data/siteContent'
import { projects } from '../data/projects'
import { useLocale } from '../i18n/locale-context'
import { cancelFrame, getMediaQuery, requestFrame, subscribeToMediaQuery } from '../utils/browser'
import { Icon } from './Icon'

const desktopRowSize = 3
const desktopConnectorQuery = '(min-width: 821px)'

function crisp(value) {
  return Math.round(value * 2) / 2
}

function horizontalPath(startX, y, endX) {
  return `M ${crisp(startX)} ${crisp(y)} H ${crisp(endX)}`
}

function verticalPath(x, startY, endY) {
  return `M ${crisp(x)} ${crisp(startY)} V ${crisp(endY)}`
}

function featuredRoute(previous, next, direction) {
  const startX = direction > 0 ? previous.right : previous.left
  const endX = direction > 0 ? next.left : next.right
  const startY = previous.top + (previous.height * 0.68)
  const endY = next.top + (next.height * 0.66)
  const horizontalGap = Math.abs(endX - startX)
  const verticalGap = Math.abs(endY - startY)

  if (horizontalGap < 28 || verticalGap < 8) {
    return horizontalPath(startX, startY, endX)
  }

  const bendX = startX + (direction * Math.min(58, Math.max(28, horizontalGap * 0.36)))
  const verticalDirection = endY > startY ? 1 : -1
  const radius = Math.min(14, horizontalGap * 0.16, verticalGap * 0.28)

  return [
    `M ${crisp(startX)} ${crisp(startY)}`,
    `H ${crisp(bendX - (direction * radius))}`,
    `Q ${crisp(bendX)} ${crisp(startY)} ${crisp(bendX)} ${crisp(startY + (verticalDirection * radius))}`,
    `V ${crisp(endY - (verticalDirection * radius))}`,
    `Q ${crisp(bendX)} ${crisp(endY)} ${crisp(bendX + (direction * radius))} ${crisp(endY)}`,
    `H ${crisp(endX)}`,
  ].join(' ')
}

function rowTransition(previousRow, currentRow, direction) {
  const availableHeight = Math.max(52, currentRow.entryY - previousRow.railY)
  const horizontalOffset = Math.min(98, Math.max(68, currentRow.width * 0.08))
  const routedX = previousRow.trunkX + (direction * horizontalOffset)
  const turnOffset = Math.min(30, availableHeight * 0.24)
  const firstTurnY = previousRow.railY + turnOffset
  const secondTurnY = currentRow.entryY - turnOffset
  const radius = Math.min(14, turnOffset * 0.58, horizontalOffset * 0.2)

  return [
    `M ${crisp(previousRow.trunkX)} ${crisp(previousRow.railY)}`,
    `V ${crisp(firstTurnY - radius)}`,
    `Q ${crisp(previousRow.trunkX)} ${crisp(firstTurnY)} ${crisp(previousRow.trunkX + (direction * radius))} ${crisp(firstTurnY)}`,
    `H ${crisp(routedX - (direction * radius))}`,
    `Q ${crisp(routedX)} ${crisp(firstTurnY)} ${crisp(routedX)} ${crisp(firstTurnY + radius)}`,
    `V ${crisp(secondTurnY - radius)}`,
    `Q ${crisp(routedX)} ${crisp(secondTurnY)} ${crisp(routedX - (direction * radius))} ${crisp(secondTurnY)}`,
    `H ${crisp(currentRow.trunkX + (direction * radius))}`,
    `Q ${crisp(currentRow.trunkX)} ${crisp(secondTurnY)} ${crisp(currentRow.trunkX)} ${crisp(secondTurnY + radius)}`,
    `V ${crisp(currentRow.entryY)}`,
  ].join(' ')
}

function measureConnectorGeometry(map) {
  const mapRect = map.getBoundingClientRect()
  const rowElements = Array.from(map.querySelectorAll('.work-map__row'))
  const rtl = window.getComputedStyle(map).direction === 'rtl'
  const direction = rtl ? -1 : 1
  const archive = map.classList.contains('work-map--archive')

  if (!mapRect.width || !mapRect.height || rowElements.length === 0) {
    return null
  }

  const rowGeometry = rowElements.map((row) => {
    const rowRect = row.getBoundingClientRect()
    const projectElements = Array.from(row.children).filter((element) => element.classList.contains('work-map__project'))
    const measuredProjects = projectElements.map((project) => {
      const logoWindow = project.querySelector('.work-map__logo-window')
      const rail = project.querySelector('.work-map__rail')
      const logoRect = logoWindow.getBoundingClientRect()
      const railRect = rail.getBoundingClientRect()

      return {
        id: project.getAttribute('aria-label') || '',
        left: logoRect.left - mapRect.left,
        right: logoRect.right - mapRect.left,
        top: logoRect.top - mapRect.top,
        bottom: logoRect.bottom - mapRect.top,
        width: logoRect.width,
        height: logoRect.height,
        centerX: logoRect.left - mapRect.left + (logoRect.width / 2),
        railY: railRect.top - mapRect.top,
      }
    })

    const logicalProjects = [...measuredProjects].sort((first, second) => (
      rtl ? second.centerX - first.centerX : first.centerX - second.centerX
    ))
    const left = rowRect.left - mapRect.left
    const right = rowRect.right - mapRect.left
    const width = rowRect.width
    const railY = logicalProjects[0]?.railY || rowRect.bottom - mapRect.top
    const trunkX = rtl ? right - Math.min(46, width * 0.08) : left + Math.min(46, width * 0.08)
    const firstProject = logicalProjects[0]
    const entryY = firstProject ? firstProject.top + (firstProject.height * 0.5) : railY

    return {
      left,
      right,
      width,
      railY,
      trunkX,
      entryY,
      projects: logicalProjects,
    }
  })

  const paths = []
  const nodes = []

  rowGeometry.forEach((row, rowIndex) => {
    const nodePositions = row.projects.map((project) => project.centerX)
    const fullRow = row.projects.length === desktopRowSize
    let railStart = row.left
    let railEnd = row.right

    if (!fullRow && nodePositions.length > 0) {
      if (rtl) {
        railStart = Math.min(...nodePositions)
      } else {
        railEnd = Math.max(...nodePositions)
      }
    }

    paths.push({
      id: `row-${rowIndex}-rail`,
      kind: 'rail',
      d: horizontalPath(railStart, row.railY, railEnd),
    })

    row.projects.forEach((project, projectIndex) => {
      paths.push({
        id: `row-${rowIndex}-drop-${projectIndex}`,
        kind: 'drop',
        d: verticalPath(project.centerX, project.bottom, row.railY),
      })
      nodes.push({
        id: `row-${rowIndex}-node-${project.id}`,
        kind: 'project',
        x: crisp(project.centerX),
        y: crisp(row.railY),
      })
    })

    const firstProject = row.projects[0]

    if (!firstProject) {
      return
    }

    const leadingEdge = rtl ? firstProject.right : firstProject.left

    if (archive) {
      const entryStart = rowIndex === 0 ? (rtl ? row.right : row.left) : row.trunkX

      paths.push({
        id: `row-${rowIndex}-entry`,
        kind: 'route',
        d: horizontalPath(entryStart, row.entryY, leadingEdge),
      })
      paths.push({
        id: `row-${rowIndex}-trunk-drop`,
        kind: 'route',
        d: verticalPath(row.trunkX, row.entryY, row.railY),
      })
      nodes.push({
        id: `row-${rowIndex}-junction`,
        kind: 'junction',
        x: crisp(row.trunkX),
        y: crisp(row.railY),
      })

      if (rowIndex > 0) {
        paths.push({
          id: `row-${rowIndex}-transition`,
          kind: 'route',
          d: rowTransition(rowGeometry[rowIndex - 1], row, direction),
        })
      }

      return
    }

    paths.push({
      id: 'featured-entry',
      kind: 'route',
      d: horizontalPath(rtl ? row.right : row.left, row.entryY, leadingEdge),
    })

    for (let projectIndex = 1; projectIndex < row.projects.length; projectIndex += 1) {
      paths.push({
        id: `featured-route-${projectIndex}`,
        kind: 'route',
        d: featuredRoute(row.projects[projectIndex - 1], row.projects[projectIndex], direction),
      })
    }

    const lastProject = row.projects[row.projects.length - 1]
    const trailingEdge = rtl ? lastProject.left : lastProject.right
    const exitY = lastProject.top + (lastProject.height * 0.5)

    paths.push({
      id: 'featured-exit',
      kind: 'route',
      d: horizontalPath(trailingEdge, exitY, rtl ? row.left : row.right),
    })
  })

  return {
    width: crisp(mapRect.width),
    height: crisp(mapRect.height),
    paths,
    nodes,
  }
}

function useWorkConnectorGeometry(mapRef, language, projectCount) {
  const [geometry, setGeometry] = useState(null)
  const geometryKeyRef = useRef('')

  useLayoutEffect(() => {
    const map = mapRef.current

    if (!map) {
      return undefined
    }

    const desktopMedia = getMediaQuery(desktopConnectorQuery)
    let active = true
    let frameId = 0

    const commitGeometry = (nextGeometry) => {
      const nextKey = nextGeometry ? JSON.stringify(nextGeometry) : 'mobile'

      if (geometryKeyRef.current === nextKey) {
        return
      }

      geometryKeyRef.current = nextKey
      setGeometry(nextGeometry)
    }

    const measure = () => {
      if (!active) {
        return
      }

      const desktop = desktopMedia ? desktopMedia.matches : window.innerWidth >= 821

      try {
        commitGeometry(desktop ? measureConnectorGeometry(map) : null)
      } catch (error) {
        console.warn('Work connector enhancement was disabled.', error)
        commitGeometry(null)
      }
    }

    const scheduleMeasure = () => {
      cancelFrame(frameId)
      frameId = requestFrame(measure)
    }

    const observedElements = [
      map,
      ...map.querySelectorAll('.work-map__row, .work-map__logo-window, .work-map__rail'),
    ]
    let resizeObserver = null
    if (typeof window.ResizeObserver === 'function') {
      try {
        resizeObserver = new window.ResizeObserver(scheduleMeasure)
      } catch {
        resizeObserver = null
      }
    }
    const images = Array.from(map.querySelectorAll('.work-map__logo'))
    const unsubscribeDesktopMedia = subscribeToMediaQuery(desktopMedia, scheduleMeasure)
    const fontSet = document.fonts

    observedElements.forEach((element) => resizeObserver?.observe(element))
    images.forEach((image) => image.addEventListener('load', scheduleMeasure))
    window.addEventListener('resize', scheduleMeasure, { passive: true })
    fontSet?.addEventListener?.('loadingdone', scheduleMeasure)
    if (fontSet?.ready && typeof fontSet.ready.then === 'function') fontSet.ready.then(() => {
      if (active) {
        scheduleMeasure()
      }
    })

    measure()

    return () => {
      active = false
      cancelFrame(frameId)
      resizeObserver?.disconnect()
      images.forEach((image) => image.removeEventListener('load', scheduleMeasure))
      unsubscribeDesktopMedia()
      window.removeEventListener('resize', scheduleMeasure)
      fontSet?.removeEventListener?.('loadingdone', scheduleMeasure)
    }
  }, [language, mapRef, projectCount])

  return geometry
}

function WorkConnectors({ geometry }) {
  if (!geometry) {
    return null
  }

  return (
    <svg
      className="work-map__connectors"
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="work-map__connector-paths">
        {geometry.paths.map((path) => (
          <path
            className={`work-map__connector-path work-map__connector-path--${path.kind}`}
            d={path.d}
            key={path.id}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      <g className="work-map__connector-nodes">
        {geometry.nodes.map((node) => (
          <circle
            className={`work-map__connector-node work-map__connector-node--${node.kind}`}
            cx={node.x}
            cy={node.y}
            key={node.id}
            r="5.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  )
}

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
  const mapRef = useRef(null)
  const connectorGeometry = useWorkConnectorGeometry(mapRef, language, projects.length)

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
          ref={mapRef}
          className={`work-map ${archive ? 'work-map--archive' : 'work-map--featured'}`}
          data-project-count={projects.length}
        >
          <WorkConnectors geometry={connectorGeometry} />
          <div className="work-map__rows" role="list" aria-label={copy.title}>
            {rows.map((row, rowIndex) => (
              <div
                className="work-map__row"
                data-row-count={row.length}
                key={row.map((project) => project.id).join('-')}
                role="presentation"
              >
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
