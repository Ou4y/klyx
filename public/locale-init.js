;(function () {
  try {
    var savedLanguage = window.localStorage.getItem('klyx-language')
    var language = savedLanguage === 'ar' ? 'ar' : 'en'
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  } catch (_) {
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
  }
})()
