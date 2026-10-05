export class Carta {
    private idCarta: string;
    private nome: string;
    private tipo: string;
    private disponivel: boolean;

    constructor(idCarta: string, nome: string, tipo: string, disponivel: boolean) {
        this.idCarta = idCarta;
        this.nome = nome;
        this.tipo = tipo;
        this.disponivel = disponivel;
    }

    public verificarDisponibilidade(): boolean {
        return this.disponivel;
    }

    public alterarDisponibilidade(): void {
        this.disponivel = !this.disponivel;
    }
}