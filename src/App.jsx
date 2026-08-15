import { HomePage } from './pages/HomePage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/') return <HomePage />
  if (path === '/privacy') return <LegalPage type="privacy" />
  if (path === '/terms') return <LegalPage type="terms" />
  return <NotFoundPage />
}
