import { Carta } from "../../models/Carta";
import { Pokemon } from "../../models/Pokemon";
import type { Jogador } from "../../models/Jogador";
import type { ApiConsultas, CartaJson } from "../comunicacao/ApiConsultas";
import type { PokeApi } from "../pokeapi/PokeApi";

// Monta as cartas juntando duas origens:
// - grupo de Cartas (ApiConsultas): qual carta é, de quem é e se está ofertada
// - PokeAPI: nome, tipo e imagem do Pokémon
//
// Não herda de ServicoGenerico de propósito: cartas não são criadas, canceladas
// nem têm histórico no nosso sistema. Forçar a herança obrigaria a implementar
// métodos sem sentido aqui (isso quebraria o LSP).
export class ServicoCartas {
    private api: ApiConsultas;
    private pokeApi: PokeApi;

    constructor(api: ApiConsultas, pokeApi: PokeApi) {
        this.api = api;
        this.pokeApi = pokeApi;
    }

    // Transforma o JSON do grupo de Cartas em um model Carta (com Pokemon)
    async fabricarCarta(json: CartaJson): Promise<Carta> {
        const dados = await this.pokeApi.buscarPokemon(json.idPokemon);
        // Usamos a arte oficial como imagem por ser maior; o sprite fica de reserva
        const pokemon = new Pokemon(dados.id, dados.arte || dados.sprite);
        // Carta tem um "tipo" só: Pokémon com dois tipos ficam como "grass/poison"
        const tipo = dados.tipos.join("/");
        return new Carta(json.idCarta, dados.nome, tipo, json.ofertada, pokemon);
    }

    async getCartasDoJogador(jogador: Jogador): Promise<Carta[]> {
        const jsons = await this.api.buscarCartasDoJogador(jogador.getUsuario());
        return Promise.all(jsons.map((json) => this.fabricarCarta(json)));
    }

    // Cartas que podem ser usadas para criar uma troca ou fazer uma proposta
    async getCartasLivres(jogador: Jogador): Promise<Carta[]> {
        const cartas = await this.getCartasDoJogador(jogador);
        return cartas.filter((carta) => !carta.getOfertada());
    }
}
