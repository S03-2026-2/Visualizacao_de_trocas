import { Jogador } from "../../models/Jogador";
import type { ApiConsultas, JogadorJson } from "../comunicacao/ApiConsultas";
import type { Comunicador } from "../comunicacao/Comunicador";
import type { TipoEventoSaida } from "../comunicacao/Evento";
import type { ServicoCartas } from "./ServicoCartas";

// Criador do Factory Method (ver README, "Design Patterns").
//
// Os dados chegam dos outros grupos como JSON. Cada serviço concreto sabe
// transformar o SEU tipo de JSON no SEU model: ServicoTrocas fabrica Troca,
// ServicoPropostas fabrica Proposta. Esse é o método-fábrica "fabricar".
// O restante (buscar histórico, enviar pedidos) é escrito uma vez só aqui,
// e usa "fabricar" sem saber qual objeto concreto vai sair.
//
// Para um novo tipo, basta criar outra subclasse e implementar "fabricar":
// nada aqui precisa mudar (Open/Closed).
//
// Diferenças em relação ao diagrama de classes (atualizar o diagrama):
// - foi adicionado o método-fábrica "fabricar(json)"
// - "criar" não está aqui porque cada tipo precisa de dados diferentes para ser criado
//   (troca: só a carta; proposta: a troca e a carta). Fica em cada subclasse.
// - TModelo e TJson são genéricos no lugar de "Objeto", para o TypeScript saber
//   o tipo exato de cada serviço.
//
// Dependências recebidas no construtor (DIP): os serviços funcionam igual
// com os mocks ou com as implementações reais.
export abstract class ServicoGenerico<TModelo, TJson> {
    protected api: ApiConsultas;
    protected comunicador: Comunicador;
    protected cartas: ServicoCartas;

    constructor(api: ApiConsultas, comunicador: Comunicador, cartas: ServicoCartas) {
        this.api = api;
        this.comunicador = comunicador;
        this.cartas = cartas;
    }

    // Método-fábrica: cada subclasse decide qual model criar a partir do JSON
    protected abstract fabricar(json: TJson): Promise<TModelo>;

    abstract getHistorico(jogador: Jogador): Promise<TModelo[]>;
    abstract cancelar(objeto: TModelo, jogador: Jogador): Promise<void>;

    protected fabricarTodos(jsons: TJson[]): Promise<TModelo[]> {
        return Promise.all(jsons.map((json) => this.fabricar(json)));
    }

    protected fabricarJogador(json: JogadorJson): Jogador {
        return new Jogador(json.email, json.usuario);
    }

    // No nosso escopo, as ações não aplicam regras: só enviam o pedido ao
    // grupo de Trocas pelo Broker. O resultado chega depois como evento.
    protected enviarPedido(tipo: TipoEventoSaida, dados: object): Promise<void> {
        return this.comunicador.postar({ tipo, dados });
    }
}
