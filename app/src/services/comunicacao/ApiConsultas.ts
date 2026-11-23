import type { StatusTroca } from "../../models/Troca";
import type { StatusProposta } from "../../models/Proposta";

// Contrato das consultas REST aos outros grupos (tabela "REST" do README).
// Assim como em Evento.ts, os formatos abaixo são provisórios:
// os nomes e campos exatos devem ser confirmados com os grupos de Trocas, Jogador e Cartas.
//
// Os tipos "...Json" descrevem os dados CRUS que chegam da rede, não os models.
// Transformar esses dados em Troca, Proposta, etc. é trabalho da fábrica (próxima etapa).
//
// Datas chegam como string (ex.: "2026-11-12T14:30:00.000Z"),
// porque JSON não tem tipo Date. A fábrica converte para Date.

export interface JogadorJson {
    readonly email: string;
    readonly usuario: string;
    // sem "senha": a senha nunca deve trafegar nas consultas
}

export interface PokemonJson {
    readonly id: string;
    readonly sprite: string;
}

export interface CartaJson {
    readonly idCarta: string;
    readonly nome: string;
    readonly tipo: string;
    readonly ofertada: boolean;
    readonly pokemon: PokemonJson;
}

export interface TrocaJson {
    readonly idTroca: string;
    readonly jogadorDono: JogadorJson;
    readonly cartaLeiloada: CartaJson;
    readonly dataCriacao: string;
    readonly status: StatusTroca;
}

export interface PropostaJson {
    readonly idProposta: string;
    readonly idTroca: string;
    readonly jogadorOfertante: JogadorJson;
    readonly cartaOferecida: CartaJson;
    readonly dataCriacao: string;
    readonly status: StatusProposta;
}

export interface NotificacaoJson {
    readonly idNotificacao: string;
    readonly mensagem: string;
    readonly data: string;
    readonly visualizada: boolean;
}

// O jogador é identificado pelo "usuario" (provisório: confirmar com o grupo de Jogador).
//
// Uma interface só para todas as consultas porque, por enquanto, quem usa todas juntas
// é a fachada. Se os grupos expuserem APIs separadas, dá para dividir em uma interface
// por grupo (ISP) sem mudar quem depende delas.
//
// A "decisão sobre uma troca" (aceitar/recusar) não está aqui: ações são enviadas
// pelo Comunicador (Broker), aqui ficam só as consultas.
export interface ApiConsultas {
    buscarTrocasDisponiveis(usuario: string): Promise<TrocaJson[]>;
    buscarHistoricoTrocas(usuario: string): Promise<TrocaJson[]>;
    buscarHistoricoPropostas(usuario: string): Promise<PropostaJson[]>;
    buscarCarta(idCarta: string): Promise<CartaJson | null>; // null = carta não encontrada
    buscarNotificacoes(usuario: string): Promise<NotificacaoJson[]>;
}
