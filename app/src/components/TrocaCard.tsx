
import './TrocaCard.css';
import { buscarImagemPokemon } from '../utils/pokemonImages';

interface TrocaCardProps {
  idTroca: string;
  jogadorDono: string;
  cartaLeiloada: string;
  dataCriacao: string;
  status: 'Aberta' | 'Concluida' | 'Cancelada';
  quantidadePropostasAbertas?: number;
  onAbrir?: () => void;
}

function TrocaCard({
  idTroca,
  jogadorDono,
  cartaLeiloada,
  dataCriacao,
  status,
  quantidadePropostasAbertas,
  onAbrir
}: TrocaCardProps) {

  const imagemPokemon = buscarImagemPokemon(cartaLeiloada);

  return (
    <article
      className={`troca-card${onAbrir ? ' troca-card-clicavel' : ''}`}
      role={onAbrir ? 'button' : undefined}
      tabIndex={onAbrir ? 0 : undefined}
      onClick={onAbrir}
      onKeyDown={(event) => {
        if (onAbrir && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onAbrir();
        }
      }}
    >

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
        {quantidadePropostasAbertas !== undefined && (
          <strong>{quantidadePropostasAbertas} proposta(s) aberta(s)</strong>
        )}
      </footer>

    </article>
  );
}

export default TrocaCard;
