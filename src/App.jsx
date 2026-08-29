import { lazy, Suspense } from 'react'
import { HomePage } from './pages/HomePage'

const LegalPage = lazy(() => import('./pages/LegalPage').then(({ LegalPage: Page }) => ({ default: Page })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(({ NotFoundPage: Page }) => ({ default: Page })))

function RouteLoading() {
  return <main id="main-content" aria-busy="true" aria-label="Loading page" />
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/') return <HomePage />
  if (path === '/privacy') {
    return <Suspense fallback={<RouteLoading />}><LegalPage type="privacy" /></Suspense>
  }
  if (path === '/terms') {
    return <Suspense fallback={<RouteLoading />}><LegalPage type="terms" /></Suspense>
  }
  return <Suspense fallback={<RouteLoading />}><NotFoundPage /></Suspense>
}
