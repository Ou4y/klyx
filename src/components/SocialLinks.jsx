import { siteConfig } from '../config/site'
import { Icon } from './Icon'
import { siteContent } from '../data/siteContent'
import { useLocale } from '../i18n/locale-context'

const profiles = [
  { name: 'Instagram', icon: 'instagram', url: siteConfig.instagramUrl },
  { name: 'TikTok', icon: 'tiktok', url: siteConfig.tiktokUrl },
]

export function SocialLinks({ compact = false }) {
  const { language } = useLocale()
  const copy = siteContent[language].socials
  const visibleProfiles = profiles.filter((profile) => profile.url)
  if (!visibleProfiles.length) return null

  return (
    <div className={`social-links ${compact ? 'social-links--compact' : ''}`} aria-label={copy.label}>
      {visibleProfiles.map((profile) => (
        <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.follow} ${profile.name}`}>
          <Icon name={profile.icon} size={compact ? 17 : 20} />
          <span>{profile.name}</span>
          {!compact && <Icon name="external" size={14} />}
        </a>
      ))}
    </div>
  )
}
