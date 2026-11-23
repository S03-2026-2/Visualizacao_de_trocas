
import { useState } from 'react'
import Notificacoes from './pages/Notification/Notificacoes'
import Historico from './pages/Historico/Historico'
import Trocas from './pages/Trocas/Trocas'
import logoTrocaDex from './assets/logo-trocadex.png'
import './App.css'

const pages = [
  { id: 'Trocas', label: 'Trocas' },
  { id: 'Historico', label: 'Histórico' }
] as const

type Page = (typeof pages)[number]['id']

function App() {
  const [activePage, setActivePage] = useState<Page>('Trocas')
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Renderiza a página selecionada
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

  // Renderiza o ícone correspondente à página
  function renderIcon(page: Page) {
    if (page === 'Trocas') {
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 7h14l-4-4" />
          <path d="m21 7-4 4" />
          <path d="M17 17H3l4 4" />
          <path d="m3 17 4-4" />
        </svg>
      )
    }

    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    )
  }

  return (
    <div className="app">

      {/* Cabeçalho principal */}
      <header className="topbar">
        <div className="topbar_content">

          {/* Logo TrocaDex */}
          <div className="logo-container">
            <img
              src={logoTrocaDex}
              alt="TrocaDex"
              className="logo-trocadex"
            />
          </div>

          {/* Navegação principal */}
          <nav
            className="navigation"
            aria-label="Navegação principal"
          >

            {/* Botões de Trocas e Histórico */}
            {pages.map((page) => (
              <button
                key={page.id}
                type="button"
                className={`nav-item ${
                  activePage === page.id ? 'active' : ''
                }`}
                onClick={() => setActivePage(page.id)}
                aria-current={
                  activePage === page.id
                    ? 'page'
                    : undefined
                }
              >
                {/* Ícone da página */}
                {renderIcon(page.id)}

                {/* Nome da página */}
                <span>{page.label}</span>
              </button>
            ))}

            {/* Botão de Notificações */}
            <button
              className={`notification-toggle ${
                notificationsOpen
                  ? 'notification-active'
                  : ''
              }`}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={notificationsOpen}
              aria-controls={
                notificationsOpen
                  ? 'notificacoes-popup'
                  : undefined
              }
              onClick={() =>
                setNotificationsOpen((open) => !open)
              }
            >
              {/* Ícone de sino */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>

              <span>Notificações</span>
            </button>

          </nav>
        </div>
      </header>

      {/* Conteúdo da página selecionada */}
      <main key={activePage}>
        {renderPage()}
      </main>

      {/* Componente de notificações */}
      {notificationsOpen && <Notificacoes />}

    </div>
  )
}

export default App
