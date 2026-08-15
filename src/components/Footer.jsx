import { siteConfig } from '../config/site'
import { Icon } from './Icon'
import { SocialLinks } from './SocialLinks'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'

export function Footer() {
  const { language } = useLocale()
  const { navigation, footer: copy } = siteContent[language]
  const contactLinks = [
    { label: 'WhatsApp', href: siteConfig.whatsappUrl, external: true },
    { label: copy.call, href: siteConfig.telUrl },
    ...(siteConfig.email ? [{ label: siteConfig.email, href: `mailto:${siteConfig.email}` }] : []),
  ]

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <a href="/" aria-label={copy.home}><img src="/brand/klyx-wordmark-light.svg" width="155" height="45" alt="KLYX" /></a>
          <p>{copy.tagline}</p>
          <SocialLinks compact />
        </div>
        <div className="footer-column">
          <h2>{copy.navigate}</h2>
          {navigation.slice(0, 4).map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </div>
        <div className="footer-column">
          <h2>{copy.contact}</h2>
          {contactLinks.map((item) => (
            <a key={item.label} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}>
              {item.label}{item.external && <Icon name="external" size={14} />}
            </a>
          ))}
        </div>
        <div className="footer-column">
          <h2>{copy.legal}</h2>
          <a href="/privacy">{copy.privacy}</a>
          <a href="/terms">{copy.terms}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} KLYX. {copy.rights}</p>
        <p className="mono">{copy.meta}</p>
      </div>
    </footer>
  )
}
