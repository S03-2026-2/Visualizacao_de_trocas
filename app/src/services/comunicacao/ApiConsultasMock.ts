import type {
    ApiConsultas,
    CartaJson,
    NotificacaoJson,
    PropostaJson,
    TrocaJson
} from "./ApiConsultas";
import type { BackendMock } from "./BackendMock";
import { simularLatencia } from "./simularLatencia";

// Versão falsa das consultas REST. Os dados vêm do BackendMock, que é o mesmo
// usado pelo ComunicadorMock: assim, o que for criado/alterado pelos pedidos
// aparece aqui na próxima consulta.
// Cada método espera um pouco, como a rede faria.
export class ApiConsultasMock implements ApiConsultas {
    private backend: BackendMock;

    constructor(backend: BackendMock) {
        this.backend = backend;
    }

    async buscarTrocasDisponiveis(usuario: string): Promise<TrocaJson[]> {
        await simularLatencia();
        return this.backend.trocasDisponiveis(usuario);
    }

    async buscarHistoricoTrocas(usuario: string): Promise<TrocaJson[]> {
        await simularLatencia();
        return this.backend.historicoTrocas(usuario);
    }

    async buscarTroca(idTroca: string): Promise<TrocaJson | null> {
        await simularLatencia();
        return this.backend.troca(idTroca);
    }

    async buscarPropostasDaTroca(idTroca: string): Promise<PropostaJson[]> {
        await simularLatencia();
        return this.backend.propostasDaTroca(idTroca);
    }

    async buscarHistoricoPropostas(usuario: string): Promise<PropostaJson[]> {
        await simularLatencia();
        return this.backend.historicoPropostas(usuario);
    }

    async buscarCarta(idCarta: string): Promise<CartaJson | null> {
        await simularLatencia();
        return this.backend.carta(idCarta);
    }

    async buscarCartasDoJogador(usuario: string): Promise<CartaJson[]> {
        await simularLatencia();
        return this.backend.cartasDoJogador(usuario);
    }

    async buscarNotificacoes(usuario: string): Promise<NotificacaoJson[]> {
        await simularLatencia();
        return this.backend.notificacoesDoJogador(usuario);
    }
}
