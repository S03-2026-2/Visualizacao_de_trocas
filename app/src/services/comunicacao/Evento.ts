// isso é apenas uma simulação de como seria a comunicação com o grupo de trocas, apenas a estrutura, os nomes exatos ficam por conta deles

export type TipoEventoSaida = 'criarTroca' | 'cancelarTroca' | 'criarProposta' | 'cancelarProposta' | 'aceitarProposta' | 'rejeitarProposta' | 'marcarNotificacaoVisualizada';
export type TipoEventoEntrada = 'trocaAtualizada' | 'propostaAtualizada' | 'notificacaoRecebida';

export type TipoEvento = TipoEventoEntrada | TipoEventoSaida;

export interface Evento {
    readonly tipo: TipoEvento;
    readonly dados: unknown;
}

// Formato dos "dados" de cada pedido (eventos de Saída).
// Todo pedido leva o "usuario" de quem está agindo, para o grupo de Trocas
// conferir a permissão (ex.: só o dono da troca pode aceitar uma proposta).
export interface DadosCriarTroca {
    readonly usuario: string;
    readonly idCarta: string;
}

export interface DadosCancelarTroca {
    readonly usuario: string;
    readonly idTroca: string;
}

export interface DadosCriarProposta {
    readonly usuario: string;
    readonly idTroca: string;
    readonly idCarta: string;
}

// Usado por cancelarProposta, aceitarProposta e rejeitarProposta
export interface DadosDecisaoProposta {
    readonly usuario: string;
    readonly idProposta: string;
}

export interface DadosMarcarNotificacao {
    readonly usuario: string;
    readonly idNotificacao: string;
}
