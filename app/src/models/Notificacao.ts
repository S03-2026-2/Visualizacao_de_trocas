export class Notificacao {
  private idNotificacao: string;
  private mensagem: string;
  private date: Date;
  private visualizada: boolean;

  constructor(idNotificacao: string, mensagem: string) {
    this.idNotificacao = idNotificacao;
    this.mensagem = mensagem;
    this.date = new Date();
    this.visualizada = false;
  }

  public enviar(): void {
    console.log(`Notificação enviada: ${this.mensagem}`);
  }

  public marcarComoVisualizada(): void {
    this.visualizada = true;
  }
}