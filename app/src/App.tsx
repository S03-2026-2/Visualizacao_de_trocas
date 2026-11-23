import { useState } from 'react'
import Notificacoes from './pages/Notification/Notificacoes'
import Historico from './pages/Historico/Historico'
import Trocas from './pages/Trocas/Trocas'
import './App.css'

const pages = [
  { id: 'Trocas', label: 'Trocas' },
  { id: 'Historico', label: 'Historico' }

] as const

type Page = (typeof pages)[number]['id']

function App() {
  const [activePage, setActivePage] = useState<Page>('Trocas')
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  function renderPage() {
    switch (activePage) {
      case 'Trocas':
        return <Trocas />
      case 'Historico':
        return <Historico />
      default:
        return <Trocas />
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar_content">
          <h1>Logo</h1>
        
          <nav className="navigation">
            {pages.map((page) => (
              <button
                className={`nav-item${activePage === page.id ? ' active' : ''}`}
                type="button"
                key={page.id}
                onClick={() => setActivePage(page.id)}
                aria-current={activePage === page.id ? 'page' : undefined}
              >
                {page.label}
              </button>
            ))}
            <button
              className="notification-toggle"
              type="button"
              aria-haspopup="dialog"
              aria-expanded={notificationsOpen}
              aria-controls={notificationsOpen ? 'notificacoes-popup' : undefined}
              onClick={() => setNotificationsOpen((open) => !open)}
            >
              Notificações
            </button>
          </nav>
        </div>
      </header>
      
      <main key={activePage}>{renderPage()}</main>
      {notificationsOpen && <Notificacoes />}
      
    </div>
  )
}

export default App
