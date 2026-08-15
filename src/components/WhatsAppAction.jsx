import { siteConfig } from '../config/site'
import { Icon } from './Icon'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'

export function WhatsAppAction() {
  const { language } = useLocale()
  const label = siteContent[language].whatsappAction
  return (
    <a className="whatsapp-action" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Icon name="whatsapp" size={21} />
      <span>{label}</span>
    </a>
  )
}
