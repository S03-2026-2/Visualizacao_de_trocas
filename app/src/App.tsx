import { useState } from 'react'
import Login from './pages/Login/Login'
import Notificacoes from './pages/Notification/Notificacoes'
import Trocas from './pages/Trocas/Trocas'

const pages = [
  { id: 'Trocas', label: 'Trocas' },
  { id: 'Notificacoes', label: 'Notificacoes' }
] as const

type Page = (typeof pages)[number]['id']

function App() {
  const [activePage, setActivePage] = useState<Page>('Trocas')

  function renderPage() {
    switch (activePage) {
      case 'Notificacoes':
        return <Notificacoes />
      case 'Trocas':
        return <Trocas />
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
          </nav>
        </div>
      </header>
      
      <main key={activePage}>{renderPage()}</main>
      
    </div>
  )
}

export default App
