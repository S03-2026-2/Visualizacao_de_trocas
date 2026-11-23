import type { StatusTroca } from "../../models/Troca";
import type { StatusProposta } from "../../models/Proposta";

// Formato dos dados que a View recebe da fachada.
// São objetos simples, já prontos para exibir (textos formatados, tipo em português...),
// para que os componentes não precisem conhecer os models nem fazer conversões.

export interface CartaVisual {
    idCarta: string;
    nome: string;
    tipo: string;     // ex.: "Elétrico", "Planta / Venenoso"
    imagem: string;   // URL da imagem (pode ser "" se a PokeAPI falhar)
    ofertada: boolean;
}

export interface TrocaVisual {
    idTroca: string;
    jogadorDono: string;
    carta: CartaVisual;
    dataCriacao: string; // ex.: "12/11/2026"
    status: StatusTroca;
    ehMinha: boolean;
    quantidadePropostasAbertas?: number; // preenchido só nas "minhas trocas"
}

export interface PropostaVisual {
    idProposta: string;
    idTroca: string;
    jogadorOfertante: string;
    carta: CartaVisual;
    dataCriacao: string;
    status: StatusProposta;
    ehMinha: boolean;
}

export interface DetalheTrocaVisual {
    troca: TrocaVisual;
    propostas: PropostaVisual[];
    podeDecidir: boolean; // sou o dono e a troca está aberta: aceitar/recusar/cancelar
    podePropor: boolean;  // não sou o dono e a troca está aberta: fazer proposta
}

// Mesmo formato das props do TrocaCardHistorico
export interface ItemHistoricoVisual {
    idTroca: string;
    idProposta: string;
    jogadorDono: string;
    jogadorOfertante: string;
    cartaLeiloada: string;
    cartaOferecida: string;
    status: StatusProposta;
    dataCriacao: string;
}

export interface NotificacaoVisual {
    idNotificacao: string;
    mensagem: string;
    data: string; // ex.: "12/11/2026 15:00"
    visualizada: boolean;
}

export interface NotificacoesVisual {
    lista: NotificacaoVisual[];
    naoVisualizadas: number;
}
