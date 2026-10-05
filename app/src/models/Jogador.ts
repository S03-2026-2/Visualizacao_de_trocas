export interface Jogador {
    email: string,
    senha: string,
    usuario: string,
    historicoTrocas: Troca[]
    notificacao: Notificacao[]
}