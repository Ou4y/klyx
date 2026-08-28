import { useCallback, useEffect, useState } from 'react'
import { browserNow, cancelFrame, requestFrame } from '../utils/browser'

function normalizePathname(pathname) {
  return pathname.replace(/\/+$/, '') || '/'
}

function readHashId(hash) {
  if (!hash || hash === '#') return null

  try {
    return decodeURIComponent(hash.slice(1)) || null
  } catch {
    return hash.slice(1) || null
  }
}

function findOwningSection(hash, sectionIds) {
  const hashId = readHashId(hash)
  if (!hashId) return null

  const target = document.getElementById(hashId)
  if (!target) return null
  if (sectionIds.has(target.id)) return target.id

  const parentSection = target.closest('section[id]')
  return parentSection && sectionIds.has(parentSection.id) ? parentSection.id : null
}

function findSectionAtOffset(sections, offset) {
  const probe = offset + 1
  return sections.find((section) => {
    const bounds = section.getBoundingClientRect()
    return bounds.top <= probe && bounds.bottom > probe
  })?.id || null
}

export function useActiveSection(sectionIds, { offsetRef } = {}) {
  const [activeSectionId, setActiveSectionId] = useState(null)

  useEffect(() => {
    const idSet = new Set(sectionIds)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return undefined

    let observer
    let resizeFrame
    let initialFrame
    let hashSyncUntil = 0

    const readOffset = () => {
      const headerHeight = offsetRef?.current?.getBoundingClientRect().height || 0
      const scrollPadding = Number.parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      return Math.min(Math.ceil(Math.max(headerHeight, scrollPadding)), Math.max(window.innerHeight - 2, 0))
    }

    const updateFromViewport = () => {
      const offset = readOffset()
      const hashSectionId = findOwningSection(window.location.hash, idSet)
      const hashSection = hashSectionId ? document.getElementById(hashSectionId) : null
      const hashId = readHashId(window.location.hash)
      const hashTarget = hashId ? document.getElementById(hashId) : null
      const hashBounds = hashTarget?.getBoundingClientRect()
      const scrollMargin = hashTarget
        ? Number.parseFloat(window.getComputedStyle(hashTarget).scrollMarginTop) || 0
        : 0
      const hashIsAnchorAligned = hashBounds
        && hashBounds.top > offset
        && hashBounds.top <= offset + scrollMargin + 2
        && hashBounds.bottom > offset
      const activeId = (hashSection && browserNow() < hashSyncUntil) || hashIsAnchorAligned
        ? hashSectionId
        : findSectionAtOffset(sections, offset)
      setActiveSectionId((current) => current === activeId ? current : activeId)
    }

    const updateFromHash = () => {
      const hashSectionId = findOwningSection(window.location.hash, idSet)
      if (hashSectionId) {
        hashSyncUntil = browserNow() + 1200
        setActiveSectionId((current) => current === hashSectionId ? current : hashSectionId)
        return
      }

      hashSyncUntil = 0
      updateFromViewport()
    }

    const createObserver = () => {
      observer?.disconnect()

      if (typeof window.IntersectionObserver !== 'function') {
        updateFromHash()
        return
      }

      const offset = readOffset()
      const bottomInset = Math.max(window.innerHeight - offset - 2, 0)
      try {
        observer = new window.IntersectionObserver(updateFromViewport, {
          rootMargin: `-${offset}px 0px -${bottomInset}px 0px`,
          threshold: 0,
        })
      } catch {
        observer = undefined
        updateFromHash()
        return
      }
      sections.forEach((section) => observer.observe(section))
    }

    const handleResize = () => {
      cancelFrame(resizeFrame)
      resizeFrame = requestFrame(() => {
        createObserver()
        updateFromViewport()
      })
    }

    createObserver()
    initialFrame = requestFrame(updateFromHash)
    window.addEventListener('hashchange', updateFromHash)
    window.addEventListener('popstate', updateFromHash)
    window.addEventListener('resize', handleResize)

    return () => {
      observer?.disconnect()
      cancelFrame(resizeFrame)
      cancelFrame(initialFrame)
      window.removeEventListener('hashchange', updateFromHash)
      window.removeEventListener('popstate', updateFromHash)
      window.removeEventListener('resize', handleResize)
    }
  }, [offsetRef, sectionIds])

  const activateFromLink = useCallback((event, href) => {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return

    const destination = new URL(href, window.location.href)
    if (normalizePathname(destination.pathname) !== normalizePathname(window.location.pathname)) return

    const idSet = new Set(sectionIds)
    const sectionId = findOwningSection(destination.hash, idSet)
    if (sectionId) {
      setActiveSectionId(sectionId)
    }
  }, [sectionIds])

  return { activeSectionId, activateFromLink }
}
