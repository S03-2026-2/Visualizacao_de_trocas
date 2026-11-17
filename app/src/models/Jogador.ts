
import { Troca } from "./Troca";
import { Notificacao } from "./Notificacao";

export class Jogador {
    private email: string;
    private senha: string;
    private usuario: string;
    private autenticado: boolean;
    private historicoTrocas: Troca[];
    private notificacao: Notificacao[];

    constructor(email: string, senha: string, usuario: string) {
        this.email = email;
        this.senha = senha;
        this.usuario = usuario;
        this.autenticado = false;
        this.historicoTrocas = [];
        this.notificacao = [];
    }

    public getAutenticado(): boolean {
        return this.autenticado;
    }

    public setAutenticado(autenticado: boolean): void {
        this.autenticado = autenticado;
   }

    public getEmail(): string {
        return this.email;
    }

    public getUsuario(): string {
        return this.usuario;
    }

    public getHistoricoTrocas(): Troca[] {
        return [...this.historicoTrocas];
    }

    public getNotificacoes(): Notificacao[] {
        return [...this.notificacao];
    }

    public adicionarTroca(troca: Troca): void {
        this.historicoTrocas.push(troca);
    }

    public adicionarNotificacao(notificacao: Notificacao): void {
        this.notificacao.push(notificacao);
    }
}