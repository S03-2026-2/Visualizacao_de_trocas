import { JogadorHistoricos } from './JogadorHistoricos';
import { JogadorNotificacoes } from './JogadorNotificacoes';

import type { Troca } from './Troca';
import type { Proposta } from './Proposta';
import type { Notificacao } from './Notificacao';

export class Jogador {
    private email: string;
    private usuario: string;
    private autenticado: boolean;

    private historicos: JogadorHistoricos;
    private notificacoes: JogadorNotificacoes;

    constructor(
        email: string,
        usuario: string,
        historicos: JogadorHistoricos = new JogadorHistoricos(),
        notificacoes: JogadorNotificacoes = new JogadorNotificacoes()
    ) {
        this.email = email;
        this.usuario = usuario;
        this.autenticado = false;
        this.historicos = historicos;
        this.notificacoes = notificacoes;
    }

    public getEmail(): string {
        return this.email;
    }

    public getUsuario(): string {
        return this.usuario;
    }

    public getAutenticado(): boolean {
        return this.autenticado;
    }

    public setAutenticado(autenticado: boolean): void {
        this.autenticado = autenticado;
    }

    public getHistoricos(): JogadorHistoricos {
        return this.historicos;
    }

    public getJogadorNotificacoes(): JogadorNotificacoes {
        return this.notificacoes;
    }

    public getHistoricoTrocas(): Troca[] {
        return this.historicos.getHistoricoTrocas();
    }

    public getHistoricoPropostas(): Proposta[] {
        return this.historicos.getHistoricoPropostas();
    }

    public getNotificacoes(): Notificacao[] {
        return this.notificacoes.getNotificacoes();
    }

    public adicionarTroca(troca: Troca): void {
        this.historicos.adicionarOuAtualizarTroca(troca);
    }

    public adicionarProposta(proposta: Proposta): void {
        this.historicos.adicionarOuAtualizarProposta(proposta);
    }

    public adicionarNotificacao(notificacao: Notificacao): void {
        this.notificacoes.adicionarOuAtualizar(notificacao);
    }
}