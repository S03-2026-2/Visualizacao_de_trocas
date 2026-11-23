import './TrocaCard.css';

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

      <div className="troca-cartas">
        <div className="troca-carta">
          <span>Carta Leiloada</span>
          <strong>{cartaLeiloada}</strong>
        </div>

        <span className="troca-seta">⇄</span>

        <div className="troca-carta">
          <span>Carta oferecida</span>
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
