import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ReliabilityBoundary } from './components/ReliabilityBoundary'
import { LocaleProvider } from './i18n/LocaleContext'
import './styles/global.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <ReliabilityBoundary>
          <LocaleProvider>
            <App />
          </LocaleProvider>
        </ReliabilityBoundary>
      </StrictMode>,
    )
  } catch (error) {
    console.error('KLYX could not initialize the application.', error)
  }
}
