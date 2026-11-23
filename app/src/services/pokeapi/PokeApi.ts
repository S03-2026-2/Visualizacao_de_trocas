// Contrato da PokeAPI (o <<interface>> PokeAPI do diagrama de classes).
// O grupo de Cartas só informa QUAL Pokémon a carta é (idPokemon);
// nome, tipos e imagens vêm daqui.
//
// Quem usa depende só desta interface (DIP): dá para trocar a versão HTTP
// por uma falsa (ex.: em testes ou sem internet) sem mudar mais nada.

export interface DadosPokemon {
    readonly id: string;
    readonly nome: string;      // ex.: "Pikachu"
    readonly tipos: string[];   // nomes da PokeAPI, em inglês: ["electric"]
    readonly sprite: string;    // imagem pequena (pixel art)
    readonly arte: string;      // arte oficial, maior
}

export interface PokeApi {
    buscarPokemon(idPokemon: string): Promise<DadosPokemon>;
}
