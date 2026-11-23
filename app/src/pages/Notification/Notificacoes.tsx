import './Notificacao.css';
import { useAcao } from '../../hooks/useAcao';
import { useControlador } from '../../hooks/ControladorContext';
import { useNotificacoes } from '../../hooks/useNotificacoes';

function identificarTipo(mensagem: string) {
  const texto = mensagem.toLowerCase();
  if (texto.includes('recusou')) return { tipo: 'recusada', titulo: 'Proposta recusada' };
  if (texto.includes('aceitou')) return { tipo: 'aceita', titulo: 'Troca aceita' };
  return { tipo: 'informativa', titulo: 'Atualização de troca' };
}

function Notificacoes() {
  const notificacoes = useNotificacoes();
  const acao = useAcao();
  const { fachada } = useControlador();
  const dados = notificacoes.dados;
  const naoVisualizadas = dados?.naoVisualizadas ?? 0;

  return (
    <section
      className="notificacoes-popup"
      id="notificacoes-popup"
      role="dialog"
      aria-label="Notificações"
    >
      <header className="notificacoes-header">
        <div className="notificacoes-header-info">
          <span className="notificacoes-icone">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>
          </span>
          <div>
            <h2>Notificações</h2>
            <p>Acompanhe suas negociações</p>
          </div>
        </div>
        <span className="notificacoes-contador">{naoVisualizadas}</span>
      </header>

      <div className="notificacao-lista">
        {notificacoes.carregando && !dados && <p>Carregando notificações...</p>}
        {notificacoes.erro && <div className="notificacao-vazia"><p>{notificacoes.erro}</p></div>}
        {dados && dados.lista.length > 0 ? dados.lista.map((notificacao) => {
          const { tipo, titulo } = identificarTipo(notificacao.mensagem);
          return (
            <article
              key={notificacao.idNotificacao}
              className={`notificacao-card notificacao-${tipo} ${notificacao.visualizada ? 'visualizada' : 'nao-visualizada'}`}
            >
              <div className={`notificacao-tipo-icone ${tipo}`}>
                {tipo === 'aceita' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" />
                  </svg>
                ) : tipo === 'recusada' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 7h.01" />
                  </svg>
                )}
              </div>

              <div className="notificacao-conteudo">
                <div className="notificacao-card-header">
                  <h3>{titulo}</h3>
                  <span className="notificacao-status">
                    {notificacao.visualizada ? 'Visualizada' : 'Nova'}
                  </span>
                </div>
                <p className="notificacao-mensagem">{notificacao.mensagem}</p>
                <div className="notificacao-data">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" />
                  </svg>
                  <span>{notificacao.data}</span>
                </div>
                {!notificacao.visualizada && (
                  <button
                    type="button"
                    className="notificacao-marcar-lida"
                    disabled={acao.executando}
                    onClick={() => acao.executar(() => fachada.marcarNotificacaoVisualizada(notificacao.idNotificacao))}
                  >
                    Marcar como lida
                  </button>
                )}
              </div>
            </article>
          );
        }) : dados ? (
          <div className="notificacao-vazia">
            <h3>Nenhuma notificação</h3>
            <p>Suas atualizações aparecerão aqui.</p>
          </div>
        ) : null}
        {acao.erro && <p className="notificacao-vazia">{acao.erro}</p>}
      </div>

      {dados && dados.lista.length > 0 && naoVisualizadas === 0 && (
        <footer className="notificacoes-footer">
          Você está em dia com suas notificações
        </footer>
      )}
    </section>
  );
}

export default Notificacoes;
