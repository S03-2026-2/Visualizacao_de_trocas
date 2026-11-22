import type { Jogador } from './Jogador';
import type { Carta } from './Carta';

export type StatusTroca = 'Aberta' | 'Concluida' | 'Cancelada';

export class Troca {
    private idTroca: string;
    private jogadorDono: Jogador;
    private cartaLeiloada: Carta;
    private dataCriacao: Date;
    private status: StatusTroca;

    constructor(
        idTroca: string,
        jogadorDono: Jogador,
        cartaLeiloada: Carta,
        dataCriacao: Date,
        status: StatusTroca = 'Aberta'
    ) {
        this.idTroca = idTroca;
        this.jogadorDono = jogadorDono;
        this.cartaLeiloada = cartaLeiloada;
        this.dataCriacao = new Date(dataCriacao.getTime());
        this.status = status;
    }

    public getIdTroca(): string {
        return this.idTroca;
    }

    public getJogadorDono(): Jogador {
        return this.jogadorDono;
    }

    public getCartaLeiloada(): Carta {
        return this.cartaLeiloada;
    }

    public getDataCriacao(): Date {
        return new Date(this.dataCriacao.getTime());
    }

    public getStatus(): StatusTroca {
        return this.status;
    }

    // Temporário: a consulta será implementada no serviço.
    public visualizarTrocasAbertas(): Troca[] {
        return [];
    }
}