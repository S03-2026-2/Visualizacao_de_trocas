import './Trocas.css';
import TrocaCard from '../../components/TrocaCard';

// Dados temporários para visualização da página.
// Futuramente, serão substituídos por dados do Controller.
const trocasExemplo = [
  {
    idTroca: 'TR003',
    jogadorSolicitante: 'Ash',
    jogadorDestino: 'Misty',
    cartaOferecida: 'Pikachu',
    cartaSolicitada: 'Eevee',
    status: 'Disponível',
    dataCriacao: '12/11/2026',
  },
  {
    idTroca: 'TR004',
    jogadorSolicitante: 'Brock',
    jogadorDestino: 'Ash',
    cartaOferecida: 'Bulbasaur',
    cartaSolicitada: 'Charmander',
    status: 'Disponível',
    dataCriacao: '13/11/2026',
  },
  {
    idTroca: 'TR005',
    jogadorSolicitante: 'Misty',
    jogadorDestino: 'Brock',
    cartaOferecida: 'Eevee',
    cartaSolicitada: 'Pikachu',
    status: 'Disponível',
    dataCriacao: '14/11/2026',
  },
] as const;

function Trocas() {
  return (
    <section className="trocas-page">
      <header className="trocas-header">
        <div>
          <h2>Trocas disponíveis</h2>
          <p>
            Explore as negociações disponíveis
            entre os jogadores.
          </p>
        </div>

        <span className="trocas-contador">
          {trocasExemplo.length} disponíveis
        </span>
      </header>

      <div className="trocas-lista">
        {trocasExemplo.length > 0 ? (
          trocasExemplo.map((troca) => (
            <TrocaCard
              key={troca.idTroca}
              {...troca}
            />
          ))
        ) : (
          <p className="trocas-vazio">
            Nenhuma troca disponível no momento.
          </p>
        )}
      </div>
    </section>
  );
}

export default Trocas;
