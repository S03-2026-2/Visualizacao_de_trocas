import { Proposta } from "../../models/Proposta";
import type { Carta } from "../../models/Carta";
import type { Jogador } from "../../models/Jogador";
import type { Troca } from "../../models/Troca";
import type { PropostaJson } from "../comunicacao/ApiConsultas";
import type { DadosCriarProposta, DadosDecisaoProposta } from "../comunicacao/Evento";
import { ServicoGenerico } from "./ServicoGenerico";

// Criador concreto do Factory Method: fabrica Proposta a partir de PropostaJson.
export class ServicoPropostas extends ServicoGenerico<Proposta, PropostaJson> {
    protected async fabricar(json: PropostaJson): Promise<Proposta> {
        return new Proposta(
            json.idProposta,
            json.idTroca,
            this.fabricarJogador(json.jogadorOfertante),
            await this.cartas.fabricarCarta(json.cartaOferecida),
            new Date(json.dataCriacao),
            json.status
        );
    }

    // ---------- Consultas ----------

    async getHistorico(jogador: Jogador): Promise<Proposta[]> {
        const jsons = await this.api.buscarHistoricoPropostas(jogador.getUsuario());
        return this.fabricarTodos(jsons);
    }

    // Nome usado no diagrama de classes
    getHistoricoPropostas(jogador: Jogador): Promise<Proposta[]> {
        return this.getHistorico(jogador);
    }

    // Substitui o temporário Proposta.visualizarPropostas(troca) do model
    async getPropostasDaTroca(troca: Troca): Promise<Proposta[]> {
        const jsons = await this.api.buscarPropostasDaTroca(troca.getIdTroca());
        return this.fabricarTodos(jsons);
    }

    // ---------- Ações (pedidos ao grupo de Trocas) ----------

    criarProposta(troca: Troca, jogador: Jogador, carta: Carta): Promise<void> {
        const dados: DadosCriarProposta = {
            usuario: jogador.getUsuario(),
            idTroca: troca.getIdTroca(),
            idCarta: carta.getIdCarta()
        };
        return this.enviarPedido("criarProposta", dados);
    }

    // Quem fez a proposta desiste dela
    cancelar(proposta: Proposta, jogador: Jogador): Promise<void> {
        return this.enviarPedido("cancelarProposta", this.dadosDecisao(proposta, jogador));
    }

    // Nome usado no diagrama de classes
    cancelarProposta(proposta: Proposta, jogador: Jogador): Promise<void> {
        return this.cancelar(proposta, jogador);
    }

    // O dono da troca escolhe esta proposta (as outras são recusadas pelo grupo de Trocas)
    aceitarProposta(proposta: Proposta, jogador: Jogador): Promise<void> {
        return this.enviarPedido("aceitarProposta", this.dadosDecisao(proposta, jogador));
    }

    // O dono da troca recusa só esta proposta (a troca continua aberta)
    rejeitarProposta(proposta: Proposta, jogador: Jogador): Promise<void> {
        return this.enviarPedido("rejeitarProposta", this.dadosDecisao(proposta, jogador));
    }

    private dadosDecisao(proposta: Proposta, jogador: Jogador): DadosDecisaoProposta {
        return { usuario: jogador.getUsuario(), idProposta: proposta.getIdProposta() };
    }
}
