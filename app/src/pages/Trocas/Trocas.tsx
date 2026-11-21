import './Trocas.css';

// Dados temporários para visualização da página.
// Futuramente, serão substituídos por dados do Controller.
const trocasExemplo = [
  {
    idTroca: 'TR003',
    jogadorSolicitante: 'Ash',
    cartaOferecida: 'Pikachu',
    status: 'Disponível',
    dataCriacao: '12/11/2026',
  },
  {
    idTroca: 'TR004',
    jogadorSolicitante: 'Brock',
    cartaOferecida: 'Bulbasaur',
    status: 'Disponível',
    dataCriacao: '13/11/2026',
  },
  {
    idTroca: 'TR005',
    jogadorSolicitante: 'Misty',
    cartaOferecida: 'Eevee',
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
            <p>Carta oferecida: {troca.cartaOferecida}</p>
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