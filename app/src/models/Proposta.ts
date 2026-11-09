import { Jogador } from './Jogador';
import { Carta } from './Carta';
import { Troca } from './Troca';

export class Proposta {
    private idProposta: string;
    private jogadorOfertante: Jogador;
    private cartaOferecida: Carta;
    private dataCriacao: Date;
    private status: 'Aberta' | 'Cancelada' | 'Aceita' | 'Recusada';

    constructor(idProposta: string, jogadorOfertante: Jogador, cartaOferecida: Carta) {
        this.idProposta = idProposta;
        this.jogadorOfertante = jogadorOfertante;
        this.cartaOferecida = cartaOferecida;
        this.dataCriacao = new Date();
        this.status = 'Aberta';
    }

    public visualizarPropostas(t: Troca): Proposta[] {
        // Lógica para visualizar propostas relacionadas a uma troca específica
        return [];
    }
}