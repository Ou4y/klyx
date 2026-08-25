import { useCallback, useRef, useState } from 'react'
import { siteContent } from '../data/siteContent'
import { useActiveSection } from '../hooks/useActiveSection'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useTheme } from '../hooks/useTheme'
import { useLocale } from '../i18n/locale-context'
import { Icon } from './Icon'

const activeSectionIds = ['services', 'work', 'packages', 'how-we-work', 'faq', 'contact']

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLocale()
  const { navigation, header: copy } = siteContent[language]
  const { activeSectionId, activateFromLink } = useActiveSection(activeSectionIds, { offsetRef: headerRef })

  useFocusTrap({
    active: menuOpen,
    containerRef: menuRef,
    onClose: closeMenu,
    returnFocusRef: menuButtonRef,
  })

  const dark = theme === 'dark'
  const logo = dark ? '/brand/klyx-wordmark-light.svg' : '/brand/klyx-wordmark-dark.svg'
  const isActive = (href) => href.endsWith(`#${activeSectionId}`)

  return (
    <header ref={headerRef} className={`site-header ${dark ? 'site-header--dark' : 'site-header--light'}`}>
      <div className="header-shell">
        <a className="brand-link" href="/" aria-label={copy.home}>
          <img src={logo} width="124" height="36" alt="KLYX" />
        </a>

        <nav className="desktop-nav" aria-label={copy.primaryNav}>
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <a
                className={active ? 'is-active' : undefined}
                aria-current={active ? 'location' : undefined}
                key={item.label}
                href={item.href}
                onClick={(event) => activateFromLink(event, item.href)}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <button
          className="theme-toggle"
          type="button"
          aria-label={dark ? copy.themeLight : copy.themeDark}
          aria-pressed={dark}
          onClick={toggleTheme}
        >
          <Icon name={dark ? 'sun' : 'moon'} size={19} />
          <span className="sr-only">{copy.currentTheme}: {theme}</span>
        </button>

        <button className="language-toggle" type="button" aria-label={copy.languageLabel} onClick={toggleLanguage} lang={language === 'en' ? 'ar' : 'en'}>
          {copy.language}
        </button>

        <a className="button button--small header-cta" href="/#contact">{copy.start}</a>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={copy.openMenu}
          onClick={() => setMenuOpen(true)}
        >
          <Icon name="menu" size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeMenu()
        }}>
          <div ref={menuRef} className="mobile-menu" id="mobile-navigation" role="dialog" aria-modal="true" aria-label={copy.navDialog}>
            <div className="mobile-menu__top">
              <img src={logo} width="124" height="36" alt="KLYX" />
              <button type="button" className="icon-button" aria-label={copy.closeMenu} onClick={closeMenu}>
                <Icon name="close" size={24} />
              </button>
            </div>
            <nav aria-label={copy.mobileNav}>
              {navigation.map((item, index) => {
                const active = isActive(item.href)
                return (
                  <a
                    className={active ? 'is-active' : undefined}
                    aria-current={active ? 'location' : undefined}
                    key={item.label}
                    href={item.href}
                    onClick={(event) => {
                      activateFromLink(event, item.href)
                      closeMenu()
                    }}
                  >
                    <span className="mono">0{index + 1}</span>
                    {item.label}
                    <Icon name="arrow" size={20} className="rtl-flip" />
                  </a>
                )
              })}
            </nav>
            <button className="mobile-language" type="button" onClick={() => { toggleLanguage(); closeMenu() }} lang={language === 'en' ? 'ar' : 'en'}>
              {copy.language}
            </button>
            <a className="button button--primary button--full" href="/#contact" onClick={closeMenu}>{copy.start}</a>
          </div>
        </div>
      )}
    </header>
  )
}
