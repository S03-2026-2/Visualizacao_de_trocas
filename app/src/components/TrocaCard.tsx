
import './TrocaCard.css';
import { buscarImagemPokemon } from '../utils/pokemonImages';

interface TrocaCardProps {
  idTroca: string;
  jogadorDono: string;
  cartaLeiloada: string;
  dataCriacao: string;
  status: 'Aberta' | 'Concluida' | 'Cancelada';
}

function TrocaCard({
  idTroca,
  jogadorDono,
  cartaLeiloada,
  dataCriacao,
  status
}: TrocaCardProps) {

  const imagemPokemon = buscarImagemPokemon(cartaLeiloada);

  return (
    <article className="troca-card">

      <header className="troca-card-header">
        <h3>Troca #{idTroca}</h3>

        <span className={`troca-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </header>

      <div className="troca-jogador">
        <p>
          <strong>Dono:</strong> {jogadorDono}
        </p>
      </div>

      {/* Imagem do Pokémon */}
      {imagemPokemon && (
        <div className="pokemon-imagem-container">
          <img
            src={imagemPokemon}
            alt={`Imagem do Pokémon ${cartaLeiloada}`}
            className="pokemon-imagem"
            loading="lazy"
          />
        </div>
      )}

      <div className="carta-leilao">
        <span>Carta:</span>
        <strong>{cartaLeiloada}</strong>
      </div>

      <footer className="troca-card-footer">
        <span>Data: {dataCriacao}</span>
      </footer>

    </article>
  );
}

export default TrocaCard;
