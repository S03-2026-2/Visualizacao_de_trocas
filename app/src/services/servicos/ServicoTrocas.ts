import { Troca } from "../../models/Troca";
import type { Carta } from "../../models/Carta";
import type { Jogador } from "../../models/Jogador";
import type { TrocaJson } from "../comunicacao/ApiConsultas";
import type { DadosCancelarTroca, DadosCriarTroca } from "../comunicacao/Evento";
import { ServicoGenerico } from "./ServicoGenerico";

// Criador concreto do Factory Method: fabrica Troca a partir de TrocaJson.
export class ServicoTrocas extends ServicoGenerico<Troca, TrocaJson> {
    protected async fabricar(json: TrocaJson): Promise<Troca> {
        return new Troca(
            json.idTroca,
            this.fabricarJogador(json.jogadorDono),
            await this.cartas.fabricarCarta(json.cartaLeiloada),
            new Date(json.dataCriacao),
            json.status
        );
    }

    // ---------- Consultas ----------

    // Substitui o temporário Troca.visualizarTrocasAbertas() do model
    async getTrocasDisponiveis(jogador: Jogador): Promise<Troca[]> {
        const jsons = await this.api.buscarTrocasDisponiveis(jogador.getUsuario());
        return this.fabricarTodos(jsons);
    }

    async getHistorico(jogador: Jogador): Promise<Troca[]> {
        const jsons = await this.api.buscarHistoricoTrocas(jogador.getUsuario());
        return this.fabricarTodos(jsons);
    }

    // Nome usado no diagrama de classes
    getHistoricoTrocas(jogador: Jogador): Promise<Troca[]> {
        return this.getHistorico(jogador);
    }

    async getTroca(idTroca: string): Promise<Troca | null> {
        const json = await this.api.buscarTroca(idTroca);
        return json ? this.fabricar(json) : null;
    }

    // ---------- Ações (pedidos ao grupo de Trocas) ----------

    criarTroca(jogador: Jogador, carta: Carta): Promise<void> {
        const dados: DadosCriarTroca = {
            usuario: jogador.getUsuario(),
            idCarta: carta.getIdCarta()
        };
        return this.enviarPedido("criarTroca", dados);
    }

    cancelar(troca: Troca, jogador: Jogador): Promise<void> {
        const dados: DadosCancelarTroca = {
            usuario: jogador.getUsuario(),
            idTroca: troca.getIdTroca()
        };
        return this.enviarPedido("cancelarTroca", dados);
    }

    // Nome usado no diagrama de classes
    cancelarTroca(troca: Troca, jogador: Jogador): Promise<void> {
        return this.cancelar(troca, jogador);
    }
}
