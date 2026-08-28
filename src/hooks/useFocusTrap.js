import { useEffect } from 'react'
import { cancelFrame, focusWithoutScroll, requestFrame } from '../utils/browser'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function useFocusTrap({ active, containerRef, onClose, returnFocusRef }) {
  useEffect(() => {
    if (!active) return undefined

    const container = containerRef.current
    const returnFocusElement = returnFocusRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusable = () => [...(container?.querySelectorAll(focusableSelector) || [])]
    const focusFrame = requestFrame(() => focusWithoutScroll(focusable()[0]))

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return
      const elements = focusable()
      if (!elements.length) return
      const first = elements[0]
      const last = elements[elements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      focusWithoutScroll(returnFocusElement)
    }
  }, [active, containerRef, onClose, returnFocusRef])
}
