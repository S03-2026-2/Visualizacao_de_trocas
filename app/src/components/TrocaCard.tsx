
import './TrocaCard.css';

interface TrocaCardProps {
  idTroca: string;
  jogadorSolicitante: string;
  jogadorDestino: string;
  cartaOferecida: string;
  cartaSolicitada: string;
  status: 'Disponível' | 'Aceita' | 'Recusada' | 'Cancelada';
  dataCriacao: string;
}

function TrocaCard({
  idTroca,
  jogadorSolicitante,
  jogadorDestino,
  cartaOferecida,
  cartaSolicitada,
  status,
  dataCriacao
}: TrocaCardProps) {

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
          <strong>Solicitante:</strong> {jogadorSolicitante}
        </p>
        <p>
          <strong>Destinatário:</strong> {jogadorDestino}
        </p>
      </div>

      <div className="troca-cartas">
        <div className="troca-carta">
          <span>Carta oferecida</span>
          <strong>{cartaOferecida}</strong>
        </div>

        <span className="troca-seta">⇄</span>

        <div className="troca-carta">
          <span>Carta solicitada</span>
          <strong>{cartaSolicitada}</strong>
        </div>
      </div>

      <footer className="troca-card-footer">
        <span>Data: {dataCriacao}</span>
      </footer>
    </article>
  );
}

export default TrocaCard;
