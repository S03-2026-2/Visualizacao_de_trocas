import { Notificacao } from "../../models/Notificacao";
import type { Jogador } from "../../models/Jogador";
import type { ApiConsultas, NotificacaoJson } from "../comunicacao/ApiConsultas";
import type { Comunicador } from "../comunicacao/Comunicador";
import type { DadosMarcarNotificacao } from "../comunicacao/Evento";

// Não herda de ServicoGenerico: notificações não são criadas nem canceladas
// pelo jogador (pelo mesmo motivo do ServicoCartas, LSP).
export class ServicoNotificacoes {
    private api: ApiConsultas;
    private comunicador: Comunicador;

    constructor(api: ApiConsultas, comunicador: Comunicador) {
        this.api = api;
        this.comunicador = comunicador;
    }

    // Busca as notificações e guarda na coleção do próprio jogador
    // (JogadorNotificacoes, do Model), que já sabe contar as não visualizadas.
    async carregarNotificacoes(jogador: Jogador): Promise<Notificacao[]> {
        const jsons = await this.api.buscarNotificacoes(jogador.getUsuario());
        jsons.forEach((json) => jogador.adicionarNotificacao(this.fabricar(json)));
        return jogador.getNotificacoes();
    }

    async marcarComoVisualizada(notificacao: Notificacao, jogador: Jogador): Promise<void> {
        const dados: DadosMarcarNotificacao = {
            usuario: jogador.getUsuario(),
            idNotificacao: notificacao.getIdNotificacao()
        };
        await this.comunicador.postar({ tipo: "marcarNotificacaoVisualizada", dados });
        notificacao.marcarComoVisualizada();
    }

    private fabricar(json: NotificacaoJson): Notificacao {
        return new Notificacao(json.idNotificacao, json.mensagem, new Date(json.data), json.visualizada);
    }
}
