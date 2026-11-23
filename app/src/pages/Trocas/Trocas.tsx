import './Trocas.css';
import TrocaCard from '../../components/TrocaCard';

// Dados temporários para visualização da página.
// Futuramente, serão substituídos por dados do Controller.
const trocasExemplo = [
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
