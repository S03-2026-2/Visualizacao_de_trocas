import { Jogador } from "../models/Jogador";
import { ApiConsultasMock } from "./comunicacao/ApiConsultasMock";
import { BackendMock } from "./comunicacao/BackendMock";
import { ComunicadorMock } from "./comunicacao/ComunicadorMock";
import { FachadaVisualizacao } from "./fachada/FachadaVisualizacao";
import { PokeApiHttp } from "./pokeapi/PokeApiHttp";
import { ServicoCartas } from "./servicos/ServicoCartas";
import { ServicoNotificacoes } from "./servicos/ServicoNotificacoes";
import { ServicoPropostas } from "./servicos/ServicoPropostas";
import { ServicoTrocas } from "./servicos/ServicoTrocas";

// Ações que só existem por causa dos mocks, para a demonstração.
// Ficam fora da fachada: a fachada não sabe que está usando mocks.
export interface Demo {
    simularPropostaDeOutroJogador(idTroca: string): Promise<void>;
}

export interface Controlador {
    fachada: FachadaVisualizacao;
    demo: Demo | null; // null quando estiver usando os sistemas reais
}

// ÚNICO lugar que escolhe as implementações concretas (DIP na prática).
// Para usar os sistemas reais dos outros grupos, só este arquivo muda:
// troca ApiConsultasMock/ComunicadorMock pelas versões reais e demo vira null.
export function montarControlador(): Controlador {
    const backend = new BackendMock();
    const api = new ApiConsultasMock(backend);
    const comunicador = new ComunicadorMock(backend);
    const pokeApi = new PokeApiHttp();

    // Provisório: o login é do grupo de Jogador. Até lá, o Ash já entra autenticado.
    const jogador = new Jogador("ash@exemplo.com", "Ash");
    jogador.setAutenticado(true);

    const cartas = new ServicoCartas(api, pokeApi);
    const trocas = new ServicoTrocas(api, comunicador, cartas);
    const propostas = new ServicoPropostas(api, comunicador, cartas);
    const notificacoes = new ServicoNotificacoes(api, comunicador);

    const fachada = new FachadaVisualizacao(jogador, trocas, propostas, cartas, notificacoes, comunicador);

    const demo: Demo = {
        simularPropostaDeOutroJogador: (idTroca) => comunicador.simularPropostaDeOutroJogador(idTroca)
    };

    return { fachada, demo };
}
