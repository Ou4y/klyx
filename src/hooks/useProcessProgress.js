import { useEffect } from 'react'
import {
  cancelFrame,
  getMediaQuery,
  mediaQueryMatches,
  requestFrame,
  subscribeToMediaQuery,
} from '../utils/browser'

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)

export function useProcessProgress({ containerRef, progressRef }) {
  useEffect(() => {
    const container = containerRef.current
    const progressPath = progressRef.current
    if (!container || !progressPath) return undefined

    const steps = [...container.querySelectorAll('.process-step')]
    const motionPreference = getMediaQuery('(prefers-reduced-motion: reduce)')
    let frame = 0

    const render = () => {
      frame = 0

      if (!motionPreference || motionPreference.matches) {
        progressPath.style.strokeDashoffset = '0'
        steps.forEach((step) => step.classList.add('is-reached'))
        return
      }

      const bounds = container.getBoundingClientRect()
      const desktop = mediaQueryMatches('(min-width: 721px)', window.innerWidth >= 721)
      let progress

      if (desktop) {
        const section = container.closest('section')
        const sectionBounds = section?.getBoundingClientRect()
        const startTop = window.innerHeight * 0.66
        const journeyOffset = sectionBounds ? bounds.top - sectionBounds.top : 0
        const endTop = sectionBounds
          ? window.innerHeight - (sectionBounds.height - journeyOffset)
          : startTop - bounds.height
        const travel = Math.max(startTop - endTop, 1)
        progress = sectionBounds && sectionBounds.bottom <= window.innerHeight + 1
          ? 1
          : clamp((startTop - bounds.top) / travel, 0, 1)
      } else {
        progress = clamp((window.innerHeight * 0.66 - bounds.top) / Math.max(bounds.height, 1), 0, 1)
      }

      progressPath.style.strokeDashoffset = String(1 - progress)
      steps.forEach((step, index) => {
        const threshold = steps.length === 1 ? 0 : index / (steps.length - 1)
        step.classList.toggle('is-reached', progress >= threshold - 0.035)
      })
    }

    const requestRender = () => {
      if (!frame) frame = requestFrame(render)
    }

    render()
    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', requestRender)
    const unsubscribeMotionPreference = subscribeToMediaQuery(motionPreference, render)

    return () => {
      cancelFrame(frame)
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', requestRender)
      unsubscribeMotionPreference()
      progressPath.style.removeProperty('stroke-dashoffset')
      steps.forEach((step) => step.classList.remove('is-reached'))
    }
  }, [containerRef, progressRef])
}
