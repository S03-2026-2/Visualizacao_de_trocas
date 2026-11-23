import { useEffect, useState } from 'react';
import './Trocas.css';
import TrocaCard from '../../components/TrocaCard';
import { useAcao } from '../../hooks/useAcao';
import { useControlador } from '../../hooks/ControladorContext';
import { useCartasLivres } from '../../hooks/useCartasLivres';
import { useDetalheTroca } from '../../hooks/useDetalheTroca';
import { useMinhasTrocasAbertas } from '../../hooks/useMinhasTrocasAbertas';
import { useTrocasDisponiveis } from '../../hooks/useTrocasDisponiveis';

function Trocas() {
  const minhasTrocas = useMinhasTrocasAbertas();
  const trocasDisponiveis = useTrocasDisponiveis();
  const [criando, setCriando] = useState(false);
  const [detalheId, setDetalheId] = useState<string | null>(null);

  return (
    <section className="trocas-page">
      <header className="trocas-header">
        <div className="trocas-titulo">
          <div className="trocas-titulo-linha">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 7h14" />
              <path d="m17 3 4 4-4 4" />
              <path d="M17 17H3" />
              <path d="m7 13-4 4 4 4" />
            </svg>
            <h2>Trocas disponíveis</h2>
          </div>
          <p>Explore as negociações disponíveis entre os jogadores e descubra novas cartas Pokémon.</p>
        </div>

        <div className="trocas-acoes-header">
          <button type="button" className="trocas-criar" onClick={() => setCriando(true)}>
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
              <path d="M12 8v8M8 12h8" />
            </svg>
            <span>Criar troca</span>
          </button>
          <span className="trocas-contador">
            {trocasDisponiveis.dados?.length ?? 0} disponíveis
          </span>
        </div>
      </header>

      <section className="trocas-secao">
        <h3>Minhas trocas abertas</h3>
        {minhasTrocas.carregando && !minhasTrocas.dados && <p>Carregando minhas trocas...</p>}
        {minhasTrocas.erro && <p className="trocas-modal-erro">{minhasTrocas.erro}</p>}
        <div className="trocas-lista">
          {minhasTrocas.dados && minhasTrocas.dados.length > 0 ? (
            minhasTrocas.dados.map((troca) => (
              <TrocaCard
                key={troca.idTroca}
                idTroca={troca.idTroca}
                jogadorDono={troca.jogadorDono}
                cartaLeiloada={troca.carta.nome}
                dataCriacao={troca.dataCriacao}
                status={troca.status}
                quantidadePropostasAbertas={troca.quantidadePropostasAbertas}
                onAbrir={() => setDetalheId(troca.idTroca)}
              />
            ))
          ) : minhasTrocas.dados ? (
            <div className="trocas-vazio">
              <h3>Você não possui trocas abertas</h3>
              <p>Use o botão Criar troca para oferecer uma carta.</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="trocas-secao">
        <h3>Disponíveis para propostas</h3>
        {trocasDisponiveis.carregando && !trocasDisponiveis.dados && <p>Carregando trocas...</p>}
        {trocasDisponiveis.erro && <p className="trocas-modal-erro">{trocasDisponiveis.erro}</p>}
        <div className="trocas-lista">
          {trocasDisponiveis.dados && trocasDisponiveis.dados.length > 0 ? (
            trocasDisponiveis.dados.map((troca) => (
              <TrocaCard
                key={troca.idTroca}
                idTroca={troca.idTroca}
                jogadorDono={troca.jogadorDono}
                cartaLeiloada={troca.carta.nome}
                dataCriacao={troca.dataCriacao}
                status={troca.status}
                onAbrir={() => setDetalheId(troca.idTroca)}
              />
            ))
          ) : trocasDisponiveis.dados ? (
            <div className="trocas-vazio">
              <h3>Nenhuma troca disponível</h3>
              <p>Ainda não existem negociações abertas.</p>
            </div>
          ) : null}
        </div>
      </section>

      {criando && <CriarTrocaModal aoFechar={() => setCriando(false)} />}
      {detalheId && <DetalheTrocaModal idTroca={detalheId} aoFechar={() => setDetalheId(null)} />}
    </section>
  );
}

function CriarTrocaModal({ aoFechar }: { aoFechar: () => void }) {
  const { fachada } = useControlador();
  const cartasLivres = useCartasLivres();
  const acao = useAcao();
  const [idCarta, setIdCarta] = useState('');

  useEffect(() => {
    if (!idCarta && cartasLivres.dados?.length) {
      setIdCarta(cartasLivres.dados[0].idCarta);
    }
  }, [cartasLivres.dados, idCarta]);

  async function criarTroca() {
    const sucesso = await acao.executar(() => fachada.criarTroca(idCarta));
    if (sucesso) aoFechar();
  }

  const cartaSelecionada = cartasLivres.dados?.find((carta) => carta.idCarta === idCarta);

  return (
    <div className="trocas-modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) aoFechar();
    }}>
      <section className="trocas-modal" role="dialog" aria-modal="true" aria-label="Criar troca">
        <header className="trocas-modal-header">
          <h2>Criar troca</h2>
          <button type="button" className="trocas-modal-fechar" onClick={aoFechar} aria-label="Fechar">×</button>
        </header>

        {cartasLivres.carregando && !cartasLivres.dados && <p>Carregando cartas...</p>}
        {cartasLivres.erro && <p className="trocas-modal-erro">{cartasLivres.erro}</p>}
        {cartasLivres.dados && cartasLivres.dados.length === 0 && (
          <p className="trocas-vazio">Você não possui cartas livres para criar uma troca.</p>
        )}
        {cartasLivres.dados && cartasLivres.dados.length > 0 && (
          <>
            <label htmlFor="carta-criar">Escolha sua carta</label>
            <select id="carta-criar" value={idCarta} onChange={(event) => setIdCarta(event.target.value)}>
              {cartasLivres.dados.map((carta) => (
                <option key={carta.idCarta} value={carta.idCarta}>
                  {carta.nome} — {carta.tipo}
                </option>
              ))}
            </select>
            {cartaSelecionada && (
              <div className="trocas-modal-carta">
                {cartaSelecionada.imagem && (
                  <img src={cartaSelecionada.imagem} alt={cartaSelecionada.nome} />
                )}
                <div>
                  <strong>{cartaSelecionada.nome}</strong>
                  <span>{cartaSelecionada.tipo}</span>
                </div>
              </div>
            )}
            <button type="button" className="trocas-modal-acao" disabled={acao.executando || !idCarta} onClick={criarTroca}>
              {acao.executando ? 'Criando...' : 'Criar troca'}
            </button>
          </>
        )}
        {acao.erro && <p className="trocas-modal-erro">{acao.erro}</p>}
      </section>
    </div>
  );
}

function DetalheTrocaModal({ idTroca, aoFechar }: { idTroca: string; aoFechar: () => void }) {
  const { fachada, demo } = useControlador();
  const detalhe = useDetalheTroca(idTroca);
  const cartasLivres = useCartasLivres();
  const acao = useAcao();
  const [idCarta, setIdCarta] = useState('');

  useEffect(() => {
    if (!idCarta && cartasLivres.dados?.length) {
      setIdCarta(cartasLivres.dados[0].idCarta);
    }
  }, [cartasLivres.dados, idCarta]);

  async function executar(acaoCallback: () => Promise<void>) {
    await acao.executar(acaoCallback);
  }

  return (
    <div className="trocas-modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) aoFechar();
    }}>
      <section className="trocas-modal detalhe-modal" role="dialog" aria-modal="true" aria-label="Detalhe da troca">
        <header className="trocas-modal-header">
          <h2>Detalhe da troca</h2>
          <button type="button" className="trocas-modal-fechar" onClick={aoFechar} aria-label="Fechar">×</button>
        </header>

        {detalhe.carregando && !detalhe.dados && <p>Carregando detalhe...</p>}
        {detalhe.erro && <p className="trocas-modal-erro">{detalhe.erro}</p>}
        {detalhe.dados && (() => {
          const { troca, propostas, podeDecidir, podePropor } = detalhe.dados;
          return (
            <>
              <div className="detalhe-troca-resumo">
                {troca.carta.imagem && (
                  <img src={troca.carta.imagem} alt={troca.carta.nome} />
                )}
                <div>
                  <h3>Troca #{troca.idTroca}</h3>
                  <p><strong>{troca.carta.nome}</strong> — {troca.carta.tipo}</p>
                  <p>Dono: {troca.jogadorDono}</p>
                  <p>Data: {troca.dataCriacao}</p>
                  <span className={`troca-status ${troca.status.toLowerCase()}`}>{troca.status}</span>
                </div>
              </div>

              {troca.ehMinha && troca.status === 'Aberta' && demo && (
                <button
                  type="button"
                  className="trocas-modal-acao-secundaria"
                  disabled={acao.executando}
                  onClick={() => executar(() => demo.simularPropostaDeOutroJogador(troca.idTroca))}
                >
                  Simular proposta (demo)
                </button>
              )}

              {podeDecidir && (
                <button
                  type="button"
                  className="trocas-modal-acao-secundaria"
                  disabled={acao.executando}
                  onClick={() => executar(() => fachada.cancelarTroca(troca.idTroca))}
                >
                  Cancelar troca
                </button>
              )}

              <section className="detalhe-propostas">
                <h3>Propostas</h3>
                {propostas.length === 0 ? (
                  <p className="trocas-vazio">Nenhuma proposta ainda.</p>
                ) : propostas.map((proposta) => (
                  <article className="detalhe-proposta" key={proposta.idProposta}>
                    {proposta.carta.imagem && (
                      <img src={proposta.carta.imagem} alt={proposta.carta.nome} />
                    )}
                    <div>
                      <strong>{proposta.carta.nome}</strong>
                      <p>{proposta.carta.tipo}</p>
                      <p>Ofertante: {proposta.jogadorOfertante}</p>
                      <p>{proposta.dataCriacao}</p>
                      <span className={`troca-status ${proposta.status.toLowerCase()}`}>{proposta.status}</span>
                    </div>
                    {podeDecidir && proposta.status === 'Aberta' && (
                      <div className="detalhe-proposta-acoes">
                        <button type="button" disabled={acao.executando} onClick={() => executar(() => fachada.aceitarProposta(proposta.idProposta))}>Aceitar</button>
                        <button type="button" className="trocas-modal-acao-secundaria" disabled={acao.executando} onClick={() => executar(() => fachada.rejeitarProposta(proposta.idProposta))}>Recusar</button>
                      </div>
                    )}
                    {proposta.ehMinha && proposta.status === 'Aberta' && (
                      <button type="button" className="trocas-modal-acao-secundaria" disabled={acao.executando} onClick={() => executar(() => fachada.cancelarProposta(proposta.idProposta))}>Cancelar proposta</button>
                    )}
                  </article>
                ))}
              </section>

              {podePropor && (
                <section className="detalhe-fazer-proposta">
                  <h3>Fazer proposta</h3>
                  {cartasLivres.dados && cartasLivres.dados.length > 0 ? (
                    <>
                      <select value={idCarta} onChange={(event) => setIdCarta(event.target.value)} aria-label="Carta para proposta">
                        {cartasLivres.dados.map((carta) => (
                          <option key={carta.idCarta} value={carta.idCarta}>
                            {carta.nome} — {carta.tipo}
                          </option>
                        ))}
                      </select>
                      <button type="button" className="trocas-modal-acao" disabled={acao.executando || !idCarta} onClick={() => executar(() => fachada.fazerProposta(troca.idTroca, idCarta))}>
                        Enviar proposta
                      </button>
                    </>
                  ) : (
                    <p className="trocas-vazio">Você não possui cartas livres para proposta.</p>
                  )}
                </section>
              )}

              {acao.erro && <p className="trocas-modal-erro">{acao.erro}</p>}
            </>
          );
        })()}
      </section>
    </div>
  );
}

export default Trocas;
