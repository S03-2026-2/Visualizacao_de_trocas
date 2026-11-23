// isso é apenas uma simulação de como seria a comunicação com o grupo de trocas, apenas a estrutura, os nomes exatos ficam por conta deles

export type TipoEventoSaida = 'criarTroca' | 'cancelarTroca' | 'criarProposta' | 'cancelarProposta' | 'aceitarProposta' | 'rejeitarProposta';
export type TipoEventoEntrada = 'trocaAtualizada' | 'propostaAtualizada' | 'notificacaoRecebida';

export type TipoEvento = TipoEventoEntrada | TipoEventoSaida;

export interface Evento {
    readonly tipo: TipoEvento;
    readonly dados: unknown;
}