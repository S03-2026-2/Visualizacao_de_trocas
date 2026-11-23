import './Historico.css'
import TrocaCardHistorico from '../../components/TrocaCardHistorico'
import { useHistorico } from '../../hooks/useHistorico'

function Historico() {
  const historico = useHistorico()
  const quantidade = historico.dados?.length ?? 0

  return (
    <section className="historico-page">
      <header className="historico-header">
        <div className="historico-titulo">
          <div className="historico-titulo-linha">
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
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <h2>Histórico de trocas</h2>
          </div>
          <p>Acompanhe os resultados das suas negociações Pokémon.</p>
        </div>

        <span className="historico-contador">
          {quantidade} {quantidade === 1 ? 'negociação' : 'negociações'}
        </span>
      </header>

      {historico.carregando && !historico.dados && <p>Carregando histórico...</p>}
      {historico.erro && <p className="historicoProposta-vazio">{historico.erro}</p>}

      <div className="historicoProposta-lista">
        {historico.dados && historico.dados.length > 0 ? (
          historico.dados.map((item) => (
            <TrocaCardHistorico
              key={item.idProposta}
              {...item}
            />
          ))
        ) : historico.dados ? (
          <div className="historicoProposta-vazio">
            <h3>Nenhuma negociação encontrada</h3>
            <p>Quando suas trocas forem registradas, elas aparecerão aqui.</p>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Historico
