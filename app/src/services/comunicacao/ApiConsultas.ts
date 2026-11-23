import type { StatusTroca } from "../../models/Troca";
import type { StatusProposta } from "../../models/Proposta";

// Contrato das consultas REST aos outros grupos (tabela "REST" do README).
// Assim como em Evento.ts, os formatos abaixo são provisórios:
// os nomes e campos exatos devem ser confirmados com os grupos de Trocas, Jogador e Cartas.
//
// Os tipos "...Json" descrevem os dados CRUS que chegam da rede, não os models.
// Transformar esses dados em Troca, Proposta, etc. é trabalho da fábrica (Factory Method,
// nos serviços).
//
// Datas chegam como string (ex.: "2026-11-12T14:30:00.000Z"),
// porque JSON não tem tipo Date. A fábrica converte para Date.

export interface JogadorJson {
    readonly email: string;
    readonly usuario: string;
    // sem "senha": a senha nunca deve trafegar nas consultas
}

// O grupo de Cartas informa só qual Pokémon a carta é (idPokemon).
// Nome, tipo e imagem vêm da PokeAPI (ver services/pokeapi).
export interface CartaJson {
    readonly idCarta: string;
    readonly idPokemon: string;
    readonly ofertada: boolean; // true = está em uma troca ou proposta aberta
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
// são os serviços. Se os grupos expuserem APIs separadas, dá para dividir em uma interface
// por grupo (ISP) sem mudar quem depende delas.
//
// Ações (criar troca, aceitar proposta...) não estão aqui: elas são enviadas
// pelo Comunicador (Broker). Aqui ficam só as consultas.
export interface ApiConsultas {
    // Grupo de Trocas
    buscarTrocasDisponiveis(usuario: string): Promise<TrocaJson[]>; // abertas e de outros jogadores
    buscarHistoricoTrocas(usuario: string): Promise<TrocaJson[]>; // trocas criadas pelo jogador
    buscarTroca(idTroca: string): Promise<TrocaJson | null>; // null = não encontrada
    buscarPropostasDaTroca(idTroca: string): Promise<PropostaJson[]>;
    buscarHistoricoPropostas(usuario: string): Promise<PropostaJson[]>; // feitas por ele ou nas trocas dele

    // Grupo de Cartas
    buscarCarta(idCarta: string): Promise<CartaJson | null>; // null = não encontrada
    buscarCartasDoJogador(usuario: string): Promise<CartaJson[]>;

    // Notificações do jogador
    buscarNotificacoes(usuario: string): Promise<NotificacaoJson[]>;
}
