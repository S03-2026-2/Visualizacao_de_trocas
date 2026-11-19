
import { useState } from 'react';
import Trocas from './pages/Trocas';

const pages = [
  { id: 'Trocas', label: 'Trocas' },
  { id: 'Notificacoes', label: 'Notificações' }
] as const;

type Page = (typeof pages)[number]['id'];

function App() {
  const [activePage, setActivePage] = useState<Page>('Trocas');

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

      <main key={activePage}>
        {activePage === 'Trocas' ? (
          <Trocas />
        ) : (
          <div>Notificações</div>
        )}
      </main>
    </div>
  );
}

export default App;
