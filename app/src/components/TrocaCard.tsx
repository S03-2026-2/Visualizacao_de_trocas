import './TrocaCard.css'

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

    return (
        <article className='troca-card'>
            <header className='troca-card-header'>
                <h3>Troca #{idTroca}</h3>
                <span className={`troca-status ${status.toLocaleLowerCase}`}>
                    {status}
                </span>
            </header>

            <div className='troca-jogador'>
                <p>
                    <strong>Dono:</strong> {jogadorDono}
                </p>
            </div>

            <div className='carta-leilao'>
                <span>Carta:</span>
                <strong> {cartaLeiloada}</strong>
            </div>

            <footer className='troca-card-footer'>
                <span>Data: {dataCriacao}</span>
            </footer>
        </article>
    );
}

export default TrocaCard;