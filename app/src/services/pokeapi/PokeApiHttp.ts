import type { DadosPokemon, PokeApi } from "./PokeApi";

// Formato (resumido) da resposta de https://pokeapi.co/api/v2/pokemon/{id}.
// Só os campos que usamos; a resposta real tem muitos outros.
interface RespostaPokemon {
    id: number;
    name: string;
    types: { slot: number; type: { name: string } }[];
    sprites: {
        front_default: string | null;
        other?: { "official-artwork"?: { front_default: string | null } };
    };
}

const URL_BASE = "https://pokeapi.co/api/v2/pokemon";
const TEMPO_LIMITE_MS = 8000;

// Implementação real: consulta a PokeAPI pela internet.
export class PokeApiHttp implements PokeApi {
    // Cache: cada Pokémon é buscado só uma vez. Guardamos a Promise (e não o resultado)
    // para que várias cartas do mesmo Pokémon pedidas ao mesmo tempo
    // compartilhem uma única requisição.
    private cache = new Map<string, Promise<DadosPokemon>>();

    buscarPokemon(idPokemon: string): Promise<DadosPokemon> {
        const emCache = this.cache.get(idPokemon);
        if (emCache) {
            return emCache;
        }

        const requisicao = this.requisitar(idPokemon).catch((erro) => {
            // Se a PokeAPI falhar (sem internet, fora do ar...), a tela não pode quebrar:
            // devolvemos dados genéricos e tiramos do cache para tentar de novo depois.
            console.error(`PokeApiHttp: falha ao buscar o Pokémon ${idPokemon}`, erro);
            this.cache.delete(idPokemon);
            return this.dadosGenericos(idPokemon);
        });

        this.cache.set(idPokemon, requisicao);
        return requisicao;
    }

    private async requisitar(idPokemon: string): Promise<DadosPokemon> {
        const resposta = await fetch(`${URL_BASE}/${idPokemon}`, {
            signal: AbortSignal.timeout(TEMPO_LIMITE_MS)
        });
        if (!resposta.ok) {
            throw new Error(`PokeAPI respondeu ${resposta.status}`);
        }
        const json = (await resposta.json()) as RespostaPokemon;

        const sprite = json.sprites.front_default ?? "";
        return {
            id: String(json.id),
            nome: this.capitalizar(json.name),
            tipos: [...json.types]
                .sort((a, b) => a.slot - b.slot)
                .map((t) => t.type.name),
            sprite,
            arte: json.sprites.other?.["official-artwork"]?.front_default ?? sprite
        };
    }

    private dadosGenericos(idPokemon: string): DadosPokemon {
        return { id: idPokemon, nome: `Pokémon #${idPokemon}`, tipos: [], sprite: "", arte: "" };
    }

    // "mr-mime" -> "Mr Mime"
    private capitalizar(nome: string): string {
        return nome
            .split("-")
            .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
            .join(" ");
    }
}
