;(function () {
  var root = document.documentElement

  root.classList.add('js')

  var recoveryTimer = window.setTimeout(function () {
    root.classList.add('app-load-failed')
  }, 10000)

  window.__KLYX_MARK_APP_READY__ = function () {
    window.clearTimeout(recoveryTimer)
    root.classList.remove('app-load-failed')
    root.classList.add('app-ready')
    delete window.__KLYX_MARK_APP_READY__
  }

  try {
    var savedTheme = window.localStorage.getItem('klyx-theme')
    root.dataset.theme = savedTheme === 'light' ? 'light' : 'dark'
  } catch (_) {
    root.dataset.theme = 'dark'
  }
})()
