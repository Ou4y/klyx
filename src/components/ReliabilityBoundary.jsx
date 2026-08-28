import { Component } from 'react'

export function AppFallback() {
  return (
    <main className="app-fallback" id="main-content" role="alert" aria-live="polite">
      <div className="app-fallback__panel">
        <img className="app-fallback__logo app-fallback__logo--dark" src="/brand/klyx-wordmark-light.svg" width="172" height="50" alt="KLYX" />
        <img className="app-fallback__logo app-fallback__logo--light" src="/brand/klyx-wordmark-dark.svg" width="172" height="50" alt="KLYX" />
        <p className="app-fallback__eyebrow">PAGE RECOVERY / KLYX</p>
        <h1>We could not finish loading this page.</h1>
        <p>Try reopening the page, or contact KLYX directly and we will help you continue.</p>
        <p lang="ar" dir="rtl">تعذّر استكمال تحميل الصفحة. أعد فتحها أو تواصل مع KLYX مباشرة وسنساعدك على المتابعة.</p>
        <div className="app-fallback__actions">
          <a href="https://wa.me/201283310083" target="_blank" rel="noopener noreferrer">Start on WhatsApp</a>
          <a href="tel:+201283310083">Call KLYX</a>
        </div>
      </div>
    </main>
  )
}

export class ReliabilityBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    console.error('KLYX recovered from an application error.', error, info)
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback === undefined ? <AppFallback /> : this.props.fallback
    }

    return this.props.children
  }
}
