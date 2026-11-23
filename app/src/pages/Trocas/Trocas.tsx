
import './Trocas.css';
import TrocaCard from '../../components/TrocaCard';

type TrocaItem = {
  idTroca: string;
  jogadorDono: string;
  jogadorOfertante: string;
  cartaLeiloada: string;
  cartaOferecida: string;
  status: 'Aberta' | 'Concluida' | 'Cancelada';
  dataCriacao: string;
};

// Dados temporários para visualização da página.
// Futuramente, serão substituídos por dados do Controller.
const trocasExemplo: TrocaItem[] = [
  {
    idTroca: 'TR003',
    jogadorDono: 'Ash',
    jogadorOfertante: 'Misty',
    cartaLeiloada: 'Pikachu',
    cartaOferecida: 'Eevee',
    status: 'Aberta',
    dataCriacao: '12/11/2026'
  },
  {
    idTroca: 'TR004',
    jogadorDono: 'Brock',
    jogadorOfertante: 'Ash',
    cartaLeiloada: 'Bulbasaur',
    cartaOferecida: 'Charmander',
    status: 'Aberta',
    dataCriacao: '13/11/2026'
  },
  {
    idTroca: 'TR005',
    jogadorDono: 'Misty',
    jogadorOfertante: 'Brock',
    cartaLeiloada: 'Eevee',
    cartaOferecida: 'Pikachu',
    status: 'Aberta',
    dataCriacao: '14/11/2026'
  }
];

function Trocas() {
  const quantidadeTrocas = trocasExemplo.length;

  return (
    <section className="trocas-page">

      {/* Cabeçalho da página */}
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

          <p>
            Explore as negociações disponíveis entre os jogadores
            e descubra novas cartas Pokémon.
          </p>
        </div>

        {/* Contador */}
        <span className="trocas-contador">
          {quantidadeTrocas}{' '}
          {quantidadeTrocas === 1 ? 'disponível' : 'disponíveis'}
        </span>
      </header>

      {/* Listagem de trocas */}
      <div className="trocas-lista">
        {quantidadeTrocas > 0 ? (
          trocasExemplo.map((troca) => (
            <TrocaCard
              key={troca.idTroca}
              {...troca}
            />
          ))
        ) : (
          <div className="trocas-vazio">
            <h3>Nenhuma troca disponível</h3>
            <p>
              Ainda não existem negociações abertas.
              Volte mais tarde para conferir novas cartas.
            </p>
          </div>
        )}
      </div>

    </section>
  );
}

export default Trocas;
