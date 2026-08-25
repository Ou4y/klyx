import { useEffect } from 'react'

const revealSelector = [
  '.section-heading',
  '.service-card',
  '.project-card',
  '.audience-shortcuts',
  '.service-explorer-item',
  '.domain-rule',
  '.after-launch',
  '.process-step',
  '.managed-standard',
  '.faq-item',
  '.contact-top',
  '.next-steps li',
  '.legal-section',
].join(',')

export function useScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !('IntersectionObserver' in window)) return undefined

    const elements = [...document.querySelectorAll(revealSelector)]
    document.documentElement.classList.add('reveal-ready')
    elements.forEach((element, index) => {
      element.classList.add('reveal-item')
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`)
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('reveal-ready')
      elements.forEach((element) => {
        element.classList.remove('reveal-item', 'is-revealed')
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [])
}
