import './Notificacao.css'

const notificacoesExemplo = [
        {
            idNotificacao: 'NT001',
            mensagem: 'Misty recusou sua proposta PR001',
            date: '10/11/2026',
            visualizada: true
        },
        {
            idNotificacao: 'NT002',
            mensagem: 'Misty aceitou a sua troca TR001',
            date: '11/11/2026',
            visualizada: true
        }
    ]


function Notificacoes() {
    return (
        <section
            className='notificacoes-popup'
            id='notificacoes-popup'
            role='dialog'
            aria-label='Notificações'
        >
            <span className='notificações-contador'>
                {notificacoesExemplo.length} notificações
            </span>

            <div className='notificacao-lista'>
                {notificacoesExemplo.length > 0 ? (
                    notificacoesExemplo.map((notificacao) => (
                        <div
                            className='notificacao-card-temporario'
                            key={notificacao.idNotificacao}
                        >
                            <h6>ID: {notificacao.idNotificacao}</h6>

                            <p>Mensagem: {notificacao.mensagem}</p>
                            <p>Data: {notificacao.date}</p>

                            <p>{notificacao.visualizada ? 'Visualizada' : 'Não Visualizada'}</p>
                        </div>
                    ))
                ) : (
                    <p className='notificacao-vazia'>
                        Nenhuma notificação no momento.
                    </p>
                )
            }
            </div>
        </section>
    )
}

export default Notificacoes