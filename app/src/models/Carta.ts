import type { Pokemon } from './Pokemon';

export class Carta {
    private idCarta: string;
    private nome: string;
    private tipo: string;
    private ofertada: boolean;
    private pokemon: Pokemon;

    constructor(
        idCarta: string,
        nome: string,
        tipo: string,
        ofertada: boolean,
        pokemon: Pokemon
    ) {
        this.idCarta = idCarta;
        this.nome = nome;
        this.tipo = tipo;
        this.ofertada = ofertada;
        this.pokemon = pokemon;
    }

    public getIdCarta(): string {
        return this.idCarta;
    }

    public getNome(): string {
        return this.nome;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getOfertada(): boolean {
        return this.ofertada;
    }

    public getPokemon(): Pokemon {
        return this.pokemon;
    }

    public setOfertada(ofertada: boolean): void {
        this.ofertada = ofertada;
    }
}