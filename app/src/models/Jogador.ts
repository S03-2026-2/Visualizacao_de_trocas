import { Troca } from "./Troca";
import { Notificacao } from "./Notificacao";

export class Jogador {
    private email: string;
    private senha: string;
    private usuario: string;
    private historicoTrocas: Troca[];
    private notificacao: Notificacao[];

    constructor(email: string, senha: string, usuario: string) {
        this.email = email;
        this.senha = senha;
        this.usuario = usuario;
        this.historicoTrocas = [];
        this.notificacao = [];
    }
}