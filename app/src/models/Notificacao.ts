export class Notificacao {
    private idNotificacao: string;
    private mensagem: string;
    private data: Date;
    private visualizada: boolean;

    constructor(
        idNotificacao: string,
        mensagem: string,
        data: Date = new Date(),
        visualizada: boolean = false
    ) {
        this.idNotificacao = idNotificacao;
        this.mensagem = mensagem;
        this.data = new Date(data.getTime());
        this.visualizada = visualizada;
    }

    public getIdNotificacao(): string {
        return this.idNotificacao;
    }

    public obterMensagem(): string {
        return this.mensagem;
    }

    public getData(): Date {
        return new Date(this.data.getTime());
    }

    public estaVisualizada(): boolean {
        return this.visualizada;
    }

    public marcarComoVisualizada(): void {
        this.visualizada = true;
    }
}