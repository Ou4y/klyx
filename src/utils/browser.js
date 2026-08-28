export function getMediaQuery(query) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return null

  try {
    return window.matchMedia(query)
  } catch {
    return null
  }
}

export function mediaQueryMatches(query, fallback = false) {
  const mediaQuery = getMediaQuery(query)
  return mediaQuery ? Boolean(mediaQuery.matches) : fallback
}

export function subscribeToMediaQuery(mediaQuery, listener) {
  if (!mediaQuery || typeof listener !== 'function') return () => {}

  if (typeof mediaQuery.addEventListener === 'function') {
    try {
      mediaQuery.addEventListener('change', listener)
      return () => {
        try {
          mediaQuery.removeEventListener?.('change', listener)
        } catch {
          // The query remains harmless when a legacy WebView cannot remove it.
        }
      }
    } catch {
      // Some embedded WebViews expose the modern method but only support addListener.
    }
  }

  if (typeof mediaQuery.addListener === 'function') {
    try {
      mediaQuery.addListener(listener)
      return () => {
        try {
          mediaQuery.removeListener?.(listener)
        } catch {
          // The query remains harmless when a legacy WebView cannot remove it.
        }
      }
    } catch {
      // The enhancement stays static when media-query subscriptions are unavailable.
    }
  }

  return () => {}
}

export function requestFrame(callback) {
  if (typeof window === 'undefined') return 0

  if (typeof window.requestAnimationFrame === 'function') {
    return window.requestAnimationFrame(callback)
  }

  return window.setTimeout(() => callback(Date.now()), 16)
}

export function cancelFrame(frameId) {
  if (!frameId || typeof window === 'undefined') return

  if (typeof window.cancelAnimationFrame === 'function') {
    window.cancelAnimationFrame(frameId)
  }
  window.clearTimeout(frameId)
}

export function browserNow() {
  if (typeof window !== 'undefined' && window.performance && typeof window.performance.now === 'function') {
    return window.performance.now()
  }

  return Date.now()
}

export function focusWithoutScroll(element) {
  if (!element || typeof element.focus !== 'function') return

  try {
    element.focus({ preventScroll: true })
  } catch {
    element.focus()
  }
}

export function scrollElementIntoView(element, options) {
  if (!element || typeof element.scrollIntoView !== 'function') return

  try {
    element.scrollIntoView(options)
  } catch {
    element.scrollIntoView()
  }
}
