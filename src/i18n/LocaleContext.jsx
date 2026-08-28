import { useEffect, useMemo, useState } from 'react'
import { LocaleContext } from './locale-context'

function getInitialLanguage() {
  return document.documentElement.lang === 'ar' ? 'ar' : 'en'
}

export function LocaleProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    const isArabic = language === 'ar'
    document.documentElement.lang = language
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    const skipLink = document.querySelector('.skip-link')
    if (skipLink) skipLink.textContent = isArabic ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'

    try {
      window.localStorage.setItem('klyx-language', language)
    } catch {
      // The preference is optional when storage is unavailable.
    }
  }, [language])

  const value = useMemo(() => ({
    language,
    isArabic: language === 'ar',
    setLanguage,
    toggleLanguage: () => setLanguage((current) => current === 'en' ? 'ar' : 'en'),
  }), [language])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
