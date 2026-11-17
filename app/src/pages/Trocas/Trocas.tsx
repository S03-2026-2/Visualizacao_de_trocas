import './Trocas.css';

// Dados temporários para visualização da página.
// Futuramente, serão substituídos por dados do Controller.
const trocasExemplo = [
  {
    idTroca: 'TR001',
    jogadorSolicitante: 'Ash',
    jogadorDestino: 'Misty',
    cartaOferecida: 'Pikachu',
    cartaSolicitada: 'Charmander',
    status: 'Disponível',
    dataCriacao: '12/11/2026',
  },
  {
    idTroca: 'TR002',
    jogadorSolicitante: 'Brock',
    jogadorDestino: 'Gary',
    cartaOferecida: 'Bulbasaur',
    cartaSolicitada: 'Squirtle',
    status: 'Disponível',
    dataCriacao: '13/11/2026',
  },
  {
    idTroca: 'TR003',
    jogadorSolicitante: 'Misty',
    jogadorDestino: 'Ash',
    cartaOferecida: 'Eevee',
    cartaSolicitada: 'Jigglypuff',
    status: 'Disponível',
    dataCriacao: '14/11/2026',
  },
];

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
            //Temporário: Adicionei a classe "troca-card-temporario" para estilizar os cards de troca.
            <div className="troca-card-temporario" key={troca.idTroca}>
            <h3>Troca #{troca.idTroca}</h3>

            <p>Jogador: {troca.jogadorSolicitante}</p>
            <p>Destinatário: {troca.jogadorDestino}</p>

            <p>Carta oferecida: {troca.cartaOferecida}</p>
            <p>Carta solicitada: {troca.cartaSolicitada}</p>

            <p>Status: {troca.status}</p>
            <p>Data: {troca.dataCriacao}</p>
            </div>
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