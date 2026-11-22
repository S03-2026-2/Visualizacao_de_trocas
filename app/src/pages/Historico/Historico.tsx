import './Historico.css'
import TrocaCardHistorico from '../../components/TrocaCardHistorico';

// Dados temporários para visualização da página.
// Futuramente, serão substituídos por dados do Controller.
const historicoExemplo = [
    {
        idTroca: 'TR001',
        jogadorDono: 'Ash',
        jogadorOfertante: 'Misty',
        cartaLeiloada: 'Kakuna',
        cartaOferecida: 'Eevee',
        status: 'Aceita',
        dataCriacao: '09/11/2026'
    },
    {
        idTroca: 'TR002',
        jogadorDono: 'Brock',
        jogadorOfertante: 'Ash',
        cartaLeiloada: 'Bulbasaur',
        cartaOferecida: 'Ditto',
        status: 'Recusada',
        dataCriacao: '10/11/2026'
    },
] as const;

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
                    {historicoExemplo.length} negociações
                </span>
            </header>

            <div className='historicoProposta-lista'>
                {historicoExemplo.length > 0 ? (
                    historicoExemplo.map((historico) => (
                        <TrocaCardHistorico 
                            key={historico.idTroca}
                            {...historico}
                        />
                    ))
                ) : (
                    <p className='historicoProposta-vazio'>
                        Nenhuma proposta para ser visualizada
                    </p>
                )}
            </div>
        </section>
    )
}

export default Historico