import { useEffect } from 'react'

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)

export function useProcessProgress({ containerRef, progressRef }) {
  useEffect(() => {
    const container = containerRef.current
    const progressPath = progressRef.current
    if (!container || !progressPath) return undefined

    const steps = [...container.querySelectorAll('.process-step')]
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const render = () => {
      frame = 0

      if (motionPreference.matches) {
        progressPath.style.strokeDashoffset = '0'
        steps.forEach((step) => step.classList.add('is-reached'))
        return
      }

      const bounds = container.getBoundingClientRect()
      const desktop = window.matchMedia('(min-width: 721px)').matches
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
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', requestRender)
    motionPreference.addEventListener('change', render)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', requestRender)
      motionPreference.removeEventListener('change', render)
      progressPath.style.removeProperty('stroke-dashoffset')
      steps.forEach((step) => step.classList.remove('is-reached'))
    }
  }, [containerRef, progressRef])
}
