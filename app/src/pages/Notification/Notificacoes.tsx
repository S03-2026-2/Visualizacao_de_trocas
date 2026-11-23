
import './Notificacao.css';

type Notificacao = {
  idNotificacao: string;
  mensagem: string;
  date: string;
  visualizada: boolean;
};

const notificacoesExemplo: Notificacao[] = [
  {
    idNotificacao: 'NT001',
    mensagem: 'Misty recusou sua proposta PR001',
    date: '10/11/2026',
    visualizada: true
  },
  {
    idNotificacao: 'NT002',
    mensagem: 'Misty aceitou a sua troca TR001',
    date: '11/11/2026',
    visualizada: true
  }
];

// Identifica o tipo para apresentar a notificação.
// A classificação é visual, baseada na mensagem temporária.
function identificarTipo(mensagem: string) {
  const texto = mensagem.toLowerCase();

  if (texto.includes('recusou')) {
    return {
      tipo: 'recusada',
      titulo: 'Proposta recusada'
    };
  }

  if (texto.includes('aceitou')) {
    return {
      tipo: 'aceita',
      titulo: 'Troca aceita'
    };
  }

  return {
    tipo: 'informativa',
    titulo: 'Atualização de troca'
  };
}

function Notificacoes() {
  const quantidade = notificacoesExemplo.length;
  const naoVisualizadas = notificacoesExemplo.filter(
    (notificacao) => !notificacao.visualizada
  ).length;

  return (
    <section
      className="notificacoes-popup"
      id="notificacoes-popup"
      role="dialog"
      aria-label="Notificações"
    >
      {/* Cabeçalho */}
      <header className="notificacoes-header">
        <div className="notificacoes-header-info">
          <span className="notificacoes-icone">
            <svg
              width="22"
              height="22"
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
          </span>

          <div>
            <h2>Notificações</h2>
            <p>Acompanhe suas negociações</p>
          </div>
        </div>

        <span className="notificacoes-contador">
          {quantidade}
        </span>
      </header>

      {/* Lista */}
      <div className="notificacao-lista">
        {quantidade > 0 ? (
          notificacoesExemplo.map((notificacao) => {
            const { tipo, titulo } = identificarTipo(
              notificacao.mensagem
            );

            return (
              <article
                key={notificacao.idNotificacao}
                className={`notificacao-card notificacao-${tipo} ${
                  notificacao.visualizada
                    ? 'visualizada'
                    : 'nao-visualizada'
                }`}
              >
                <div className={`notificacao-tipo-icone ${tipo}`}>
                  {tipo === 'aceita' ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="m8 12 3 3 5-6" />
                    </svg>
                  ) : tipo === 'recusada' ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M9 9l6 6M15 9l-6 6" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 11v5M12 7h.01" />
                    </svg>
                  )}
                </div>

                <div className="notificacao-conteudo">
                  <div className="notificacao-card-header">
                    <h3>{titulo}</h3>

                    <span className="notificacao-status">
                      {notificacao.visualizada
                        ? 'Visualizada'
                        : 'Nova'}
                    </span>
                  </div>

                  <p className="notificacao-mensagem">
                    {notificacao.mensagem}
                  </p>

                  <div className="notificacao-data">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="16"
                        rx="2"
                      />
                      <path d="M16 3v4M8 3v4M3 10h18" />
                    </svg>

                    <span>{notificacao.date}</span>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="notificacao-vazia">
            <h3>Nenhuma notificação</h3>
            <p>Suas atualizações aparecerão aqui.</p>
          </div>
        )}
      </div>

      {/* Rodapé */}
      {quantidade > 0 && naoVisualizadas === 0 && (
        <footer className="notificacoes-footer">
          Você está em dia com suas notificações
        </footer>
      )}
    </section>
  );
}

export default Notificacoes;
