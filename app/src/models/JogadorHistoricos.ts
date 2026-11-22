import type { Troca } from './Troca';
import type { Proposta } from './Proposta';

export class JogadorHistoricos {
    private historicoTrocas: Troca[];
    private historicoPropostas: Proposta[];

    constructor(
        trocas: Troca[] = [],
        propostas: Proposta[] = []
    ) {
        this.historicoTrocas = [...trocas];
        this.historicoPropostas = [...propostas];
    }

    public getHistoricoTrocas(): Troca[] {
        return [...this.historicoTrocas];
    }

    public getHistoricoPropostas(): Proposta[] {
        return [...this.historicoPropostas];
    }

    public adicionarOuAtualizarTroca(troca: Troca): void {
        const indice = this.historicoTrocas.findIndex(
            (item) => item.getIdTroca() === troca.getIdTroca()
        );

        if (indice === -1) {
            this.historicoTrocas.push(troca);
        } else {
            this.historicoTrocas[indice] = troca;
        }
    }

    public adicionarOuAtualizarProposta(proposta: Proposta): void {
        const indice = this.historicoPropostas.findIndex(
            (item) =>
                item.getIdProposta() === proposta.getIdProposta()
        );

        if (indice === -1) {
            this.historicoPropostas.push(proposta);
        } else {
            this.historicoPropostas[indice] = proposta;
        }
    }
}