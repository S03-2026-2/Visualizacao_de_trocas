import './Historico.css'

const historicoExemploTrocas = [
        {
        idTroca: 'TR002',
        jogadorSolicitante: 'Ash',
        cartaOferecida: 'Mew',
        jogadorDestino: 'Misty',
        cartaSolicitada: 'Kakuna',
        status: 'Concluido',
        dataCriacao: '10/11/2026'
    }
]

const historicoExemploPropostas = [
    {
        idProposta: 'PR001',
        jogadorOfertante: 'Misty',
        cartaOferecida: 'Ditto',
        dataCriacao: '09/11/2026',
        status: 'Recusada'
    }
]

function Historico() {
    return (
        <section className='historico-page'>
            <header className='historico-header'>
                <div>
                    <h2>Histórico</h2>
                    <p>
                        Veja os resultados das suas negociações
                    </p>
                </div>

                <span className='historico-contador'>
                    {historicoExemploPropostas.length + historicoExemploTrocas.length} negociações
                </span>
            </header>

            <h2 className='historicoProposta-title'>Propostas:</h2>
            <div className='historicoProposta-lista'>
                {historicoExemploPropostas.length > 0 && historicoExemploTrocas.length > 0 ? (
                    historicoExemploPropostas.map((historico) => (
                        <div className='historico-card-temporario'>
                            <h3>Proposta: {historico.idProposta}</h3>

                            <p>Ofertante: {historico.jogadorOfertante}</p>
                            <p>Carta: {historico.cartaOferecida}</p>
                            <p>Data Criação: {historico.dataCriacao}</p>
                            <p>Status: {historico.status}</p>
                        </div>
                    ))
                ) : (
                    <p className='historicoProposta-vazio'>
                        Nenhuma proposta para ser visualizada
                    </p>
                )}
            </div>

            <h2 className='historicoProposta-title'>Trocas</h2>
            <div className='historicoTroca-lista'>
                {historicoExemploPropostas.length > 0 && historicoExemploTrocas.length > 0 ? (
                    historicoExemploTrocas.map((historico) => (
                        <div className='historico-card-temporario'>
                            <h3>Troca: {historico.idTroca}</h3>

                            <p>Jogador Solicitante: {historico.jogadorSolicitante}</p>
                            <p>Carta Oferecida: {historico.cartaOferecida}</p>
                            <p>Jogador Destino: {historico.jogadorDestino}</p>
                            <p>Carta Solicitada: {historico.cartaSolicitada}</p>
                            <p>Data de criação: {historico.dataCriacao}</p>
                            <p>Status: {historico.status}</p>
                        </div>
                    ))
                ) : (
                    <p className='historicoProposta-vazio'>
                        Nenhuma troca para ser visualizada
                    </p>
                )}
            </div>
        </section>
    )
}

export default Historico