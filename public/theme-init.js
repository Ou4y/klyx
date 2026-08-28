;(function () {
  try {
    var savedTheme = window.localStorage.getItem('klyx-theme')
    document.documentElement.dataset.theme = savedTheme === 'light' ? 'light' : 'dark'
  } catch (_) {
    document.documentElement.dataset.theme = 'dark'
  }
})()
