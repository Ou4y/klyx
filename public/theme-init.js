(() => {
  try {
    const savedTheme = localStorage.getItem('klyx-theme')
    document.documentElement.dataset.theme = savedTheme === 'light' ? 'light' : 'dark'
  } catch {
    document.documentElement.dataset.theme = 'dark'
  }
})()
