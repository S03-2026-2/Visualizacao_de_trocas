import TrocaCard from '../components/TrocaCard';
import './Trocas.css';

const trocasExemplo = [
  {
    idTroca: 'TR001',
    jogadorSolicitante: 'Ash',
    jogadorDestino: 'Misty',
    cartaOferecida: 'Pikachu',
    cartaSolicitada: 'Charmander',
    status: 'Disponível' as const,
    dataCriacao: '12/11/2026'
  },
  {
    idTroca: 'TR002',
    jogadorSolicitante: 'Brock',
    jogadorDestino: 'Gary',
    cartaOferecida: 'Bulbasaur',
    cartaSolicitada: 'Squirtle',
    status: 'Aceita' as const,
    dataCriacao: '13/11/2026'
  },
  {
    idTroca: 'TR003',
    jogadorSolicitante: 'Misty',
    jogadorDestino: 'Ash',
    cartaOferecida: 'Eevee',
    cartaSolicitada: 'Jigglypuff',
    status: 'Recusada' as const,
    dataCriacao: '14/11/2026'
  }
];

function Trocas() {
  return (
    <section className="trocas-page">
      <header>
        <h2>Negociações entre jogadores</h2>
        <p>Confira as negociações disponíveis e seus respectivos status.</p>
      </header>

      <div className="trocas-lista">
        {trocasExemplo.map((troca) => (
          <TrocaCard
            key={troca.idTroca}
            {...troca}
          />
        ))}
      </div>
    </section>
  );
}

export default Trocas;
