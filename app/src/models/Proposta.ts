import type { Jogador } from './Jogador';
import type { Carta } from './Carta';
import type { Troca } from './Troca';

export type StatusProposta =
    | 'Aberta'
    | 'Cancelada'
    | 'Aceita'
    | 'Recusada';

export class Proposta {
    private idProposta: string;
    private idTroca: string;
    private jogadorOfertante: Jogador;
    private cartaOferecida: Carta;
    private dataCriacao: Date;
    private status: StatusProposta;

    constructor(
        idProposta: string,
        idTroca: string,
        jogadorOfertante: Jogador,
        cartaOferecida: Carta,
        dataCriacao: Date = new Date(),
        status: StatusProposta = 'Aberta'
    ) {
        this.idProposta = idProposta;
        this.idTroca = idTroca;
        this.jogadorOfertante = jogadorOfertante;
        this.cartaOferecida = cartaOferecida;
        this.dataCriacao = new Date(dataCriacao.getTime());
        this.status = status;
    }

    public getIdProposta(): string {
        return this.idProposta;
    }

    public getIdTroca(): string {
        return this.idTroca;
    }

    public getJogadorOfertante(): Jogador {
        return this.jogadorOfertante;
    }

    public getCartaOferecida(): Carta {
        return this.cartaOferecida;
    }

    public getDataCriacao(): Date {
        return new Date(this.dataCriacao.getTime());
    }

    public getStatus(): StatusProposta {
        return this.status;
    }

    // Temporário: a consulta será implementada no serviço.
    public visualizarPropostas(_troca: Troca): Proposta[] {
        return [];
    }
}