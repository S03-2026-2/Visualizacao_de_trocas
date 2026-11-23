
import './Historico.css'
import TrocaCardHistorico from '../../components/TrocaCardHistorico'

type HistoricoItem = {
  idTroca: string
  jogadorDono: string
  jogadorOfertante: string
  cartaLeiloada: string
  cartaOferecida: string
  status: 'Aberta' | 'Cancelada' | 'Aceita' | 'Recusada'
  dataCriacao: string
}

// Dados temporários para visualização da página.
// Futuramente, serão substituídos por dados do Controller.
const historicoExemplo: HistoricoItem[] = [
  {
    idTroca: 'TR001',
    jogadorDono: 'Ash',
    jogadorOfertante: 'Misty',
    cartaLeiloada: 'Kakuna',
    cartaOferecida: 'Eevee',
    status: 'Aceita',
    dataCriacao: '09/11/2026'
  },
  {
    idTroca: 'TR002',
    jogadorDono: 'Brock',
    jogadorOfertante: 'Ash',
    cartaLeiloada: 'Bulbasaur',
    cartaOferecida: 'Ditto',
    status: 'Recusada',
    dataCriacao: '10/11/2026'
  }
]

function Historico() {
  return (
    <section className="historico-page">

      {/* Cabeçalho da página */}
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

          <p>
            Acompanhe os resultados das suas negociações Pokémon.
          </p>
        </div>

        {/* Contador de negociações */}
        <span className="historico-contador">
          {historicoExemplo.length}{' '}
          {historicoExemplo.length === 1
            ? 'negociação'
            : 'negociações'}
        </span>
      </header>

      {/* Listagem do histórico */}
      <div className="historicoProposta-lista">
        {historicoExemplo.length > 0 ? (
          historicoExemplo.map((historico) => (
            <TrocaCardHistorico
              key={historico.idTroca}
              {...historico}
            />
          ))
        ) : (
          <div className="historicoProposta-vazio">
            <h3>Nenhuma negociação encontrada</h3>
            <p>
              Quando suas trocas forem registradas,
              elas aparecerão aqui.
            </p>
          </div>
        )}
      </div>

    </section>
  )
}

export default Historico
