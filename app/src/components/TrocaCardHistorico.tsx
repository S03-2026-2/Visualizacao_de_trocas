
import './TrocaCard.css';
import { buscarImagemPokemon } from '../utils/pokemonImages';

interface TrocaCardHistoricoProps {
  idTroca: string;
  jogadorDono: string;
  jogadorOfertante: string;
  cartaLeiloada: string;
  cartaOferecida: string;
  status: 'Aberta' | 'Cancelada' | 'Aceita' | 'Recusada';
  dataCriacao: string;
}

function TrocaCardHistorico({
  idTroca,
  jogadorDono,
  jogadorOfertante,
  cartaLeiloada,
  cartaOferecida,
  status,
  dataCriacao
}: TrocaCardHistoricoProps) {

  // Busca as imagens utilizando a função compartilhada
  const imagemLeiloada = buscarImagemPokemon(cartaLeiloada);
  const imagemOferecida = buscarImagemPokemon(cartaOferecida);

  return (
    <article className="troca-card">

      <header className="troca-card-header">
        <h3>Troca #{idTroca}</h3>

        <span className={`troca-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </header>

      <div className="troca-jogadores">
        <p>
          <strong>Dono:</strong> {jogadorDono}
        </p>

        <p>
          <strong>Ofertante:</strong> {jogadorOfertante}
        </p>
      </div>

      {/* Cartas envolvidas na negociação */}
      <div className="troca-cartas">

        {/* Carta leiloada */}
        <div className="troca-carta">
          <span>Carta leiloada</span>

          {imagemLeiloada && (
            <img
              src={imagemLeiloada}
              alt={`Imagem do Pokémon ${cartaLeiloada}`}
              className="pokemon-imagem"
              loading="lazy"
            />
          )}

          <strong>{cartaLeiloada}</strong>
        </div>

        {/* Seta indicando a troca */}
        <span className="troca-seta">⇄</span>

        {/* Carta oferecida */}
        <div className="troca-carta">
          <span>Carta oferecida</span>

          {imagemOferecida && (
            <img
              src={imagemOferecida}
              alt={`Imagem do Pokémon ${cartaOferecida}`}
              className="pokemon-imagem"
              loading="lazy"
            />
          )}

          <strong>{cartaOferecida}</strong>
        </div>

      </div>

      <footer className="troca-card-footer">
        <span>Data: {dataCriacao}</span>
      </footer>

    </article>
  );
}

export default TrocaCardHistorico;
