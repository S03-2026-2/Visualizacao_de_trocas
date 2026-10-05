import { Jogador } from "./Jogador";
import { Carta } from "./Carta";

export class Troca {
    private idTroca : string;
    private jogadorSolicitante : Jogador;
    private jogadorDestino : Jogador;
    private cartaOferecida : Carta;
    private cartaSolicitada : Carta;
    private status : string;
    private dataCriacao : Date;

    constructor(idTroca:string, jogadorSolicitante:Jogador, jogadorDestino:Jogador, cartaOferecida:Carta, cartaSolicitada:Carta, status:string, dataCriacao:Date) {
        this.idTroca = idTroca;
        this.jogadorSolicitante = jogadorSolicitante;
        this.jogadorDestino = jogadorDestino;
        this.cartaOferecida = cartaOferecida;
        this.cartaSolicitada = cartaSolicitada;
        this.status = status;
        this.dataCriacao = dataCriacao;
    }

    criarTroca():void {

    }

    consultarDisponibilidade():boolean{
        return true;
    }

    solicitarTroca():void{

    }

    aceitarTroca():void{

    }

    recusarTroca():void{

    }

    finalizarTroca():void{

    }
}