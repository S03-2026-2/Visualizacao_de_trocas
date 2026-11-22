import type { Notificacao } from './Notificacao';

export class JogadorNotificacoes {
    private notificacoes: Notificacao[];

    constructor(notificacoes: Notificacao[] = []) {
        this.notificacoes = [...notificacoes];
    }

    public getNotificacoes(): Notificacao[] {
        return [...this.notificacoes];
    }

    public adicionarOuAtualizar(notificacao: Notificacao): void {
        const indice = this.notificacoes.findIndex(
            (item) =>
                item.getIdNotificacao() ===
                notificacao.getIdNotificacao()
        );

        if (indice === -1) {
            this.notificacoes.push(notificacao);
        } else {
            this.notificacoes[indice] = notificacao;
        }
    }

    public getNaoVisualizadas(): Notificacao[] {
        return this.notificacoes.filter(
            (notificacao) => !notificacao.estaVisualizada()
        );
    }

    public contarNaoVisualizadas(): number {
        return this.getNaoVisualizadas().length;
    }

    public marcarComoVisualizada(idNotificacao: string): boolean {
        const notificacao = this.notificacoes.find(
            (item) => item.getIdNotificacao() === idNotificacao
        );

        if (!notificacao) {
            return false;
        }

        notificacao.marcarComoVisualizada();
        return true;
    }
}