import type { Carta } from "../../models/Carta";
import type { Jogador } from "../../models/Jogador";
import type { Notificacao } from "../../models/Notificacao";
import type { Proposta } from "../../models/Proposta";
import type { Troca } from "../../models/Troca";
import type { AssinanteEvento } from "../comunicacao/Comunicador";
import type { Comunicador } from "../comunicacao/Comunicador";
import type { ServicoCartas } from "../servicos/ServicoCartas";
import type { ServicoNotificacoes } from "../servicos/ServicoNotificacoes";
import type { ServicoPropostas } from "../servicos/ServicoPropostas";
import type { ServicoTrocas } from "../servicos/ServicoTrocas";
import type {
    CartaVisual,
    DetalheTrocaVisual,
    ItemHistoricoVisual,
    NotificacoesVisual,
    PropostaVisual,
    TrocaVisual
} from "./tiposVisualizacao";

// Facade (ver README, "Design Patterns"): o ÚNICO ponto que a View usa.
// Esconde os serviços de trocas, propostas, cartas (+ PokeAPI) e notificações,
// e o Comunicador (Broker).
//
// Também é aqui que acontece a tradução Model -> View (papel do Controller no MVC):
// a View recebe objetos simples (tiposVisualizacao.ts), com datas formatadas e
// textos prontos, e nunca toca nos models diretamente.
//
// As ações recebem só ids (é o que a View tem). Para achar o model correspondente,
// a fachada guarda os models que ela mesma entregou nas consultas: a View só consegue
// agir sobre algo que já foi exibido, então ele sempre foi carregado antes.
export class FachadaVisualizacao {
    private jogador: Jogador;
    private trocas: ServicoTrocas;
    private propostas: ServicoPropostas;
    private cartas: ServicoCartas;
    private notificacoes: ServicoNotificacoes;
    private comunicador: Comunicador;

    private trocasCarregadas = new Map<string, Troca>();
    private propostasCarregadas = new Map<string, Proposta>();
    private cartasCarregadas = new Map<string, Carta>();
    private notificacoesCarregadas = new Map<string, Notificacao>();

    constructor(
        jogador: Jogador,
        trocas: ServicoTrocas,
        propostas: ServicoPropostas,
        cartas: ServicoCartas,
        notificacoes: ServicoNotificacoes,
        comunicador: Comunicador
    ) {
        this.jogador = jogador;
        this.trocas = trocas;
        this.propostas = propostas;
        this.cartas = cartas;
        this.notificacoes = notificacoes;
        this.comunicador = comunicador;
    }

    getUsuarioLogado(): string {
        return this.jogador.getUsuario();
    }

    // ---------- Observer: a View (pelos hooks) é avisada quando chegam eventos ----------

    assinarAtualizacoes(funcao: AssinanteEvento): void {
        this.comunicador.assinar(funcao);
    }

    removerAssinatura(funcao: AssinanteEvento): void {
        this.comunicador.removerAssinatura(funcao);
    }

    // ---------- Consultas ----------

    async carregarTrocasDisponiveis(): Promise<TrocaVisual[]> {
        const trocas = await this.trocas.getTrocasDisponiveis(this.jogador);
        return trocas.map((troca) => this.trocaVisual(troca));
    }

    async carregarMinhasTrocasAbertas(): Promise<TrocaVisual[]> {
        const minhas = await this.trocas.getHistoricoTrocas(this.jogador);
        const abertas = minhas.filter((troca) => troca.getStatus() === "Aberta");
        return Promise.all(
            abertas.map(async (troca) => {
                const propostas = await this.propostas.getPropostasDaTroca(troca);
                return {
                    ...this.trocaVisual(troca),
                    quantidadePropostasAbertas: propostas.filter((p) => p.getStatus() === "Aberta").length
                };
            })
        );
    }

    async carregarDetalheTroca(idTroca: string): Promise<DetalheTrocaVisual | null> {
        const troca = await this.trocas.getTroca(idTroca);
        if (!troca) {
            return null;
        }
        const propostas = await this.propostas.getPropostasDaTroca(troca);
        const trocaVisual = this.trocaVisual(troca);
        const aberta = troca.getStatus() === "Aberta";

        return {
            troca: trocaVisual,
            // Mais recentes primeiro
            propostas: propostas
                .sort((a, b) => b.getDataCriacao().getTime() - a.getDataCriacao().getTime())
                .map((proposta) => this.propostaVisual(proposta)),
            podeDecidir: aberta && trocaVisual.ehMinha,
            podePropor: aberta && !trocaVisual.ehMinha
        };
    }

    async carregarCartasLivres(): Promise<CartaVisual[]> {
        const cartas = await this.cartas.getCartasLivres(this.jogador);
        return cartas.map((carta) => this.cartaVisual(carta));
    }

    // Histórico = todas as propostas em que o jogador participou, com a troca de cada uma
    async carregarHistorico(): Promise<ItemHistoricoVisual[]> {
        const propostas = await this.propostas.getHistoricoPropostas(this.jogador);

        // Busca cada troca envolvida uma vez só (várias propostas podem ser da mesma troca)
        const idsTrocas = [...new Set(propostas.map((p) => p.getIdTroca()))];
        const trocas = await Promise.all(idsTrocas.map((id) => this.trocas.getTroca(id)));
        const trocaPorId = new Map<string, Troca>();
        trocas.forEach((troca) => {
            if (troca) {
                trocaPorId.set(troca.getIdTroca(), troca);
                this.jogador.adicionarTroca(troca);
            }
        });

        // Guarda também na coleção do próprio jogador (JogadorHistoricos, do Model)
        propostas.forEach((proposta) => this.jogador.adicionarProposta(proposta));

        return propostas
            .sort((a, b) => b.getDataCriacao().getTime() - a.getDataCriacao().getTime())
            .flatMap((proposta) => {
                const troca = trocaPorId.get(proposta.getIdTroca());
                if (!troca) {
                    return [];
                }
                return [{
                    idTroca: troca.getIdTroca(),
                    idProposta: proposta.getIdProposta(),
                    jogadorDono: troca.getJogadorDono().getUsuario(),
                    jogadorOfertante: proposta.getJogadorOfertante().getUsuario(),
                    cartaLeiloada: troca.getCartaLeiloada().getNome(),
                    cartaOferecida: proposta.getCartaOferecida().getNome(),
                    status: proposta.getStatus(),
                    dataCriacao: this.formatarData(proposta.getDataCriacao())
                }];
            });
    }

    async carregarNotificacoes(): Promise<NotificacoesVisual> {
        const notificacoes = await this.notificacoes.carregarNotificacoes(this.jogador);
        notificacoes.forEach((n) => this.notificacoesCarregadas.set(n.getIdNotificacao(), n));

        return {
            lista: notificacoes
                .sort((a, b) => b.getData().getTime() - a.getData().getTime())
                .map((n) => ({
                    idNotificacao: n.getIdNotificacao(),
                    mensagem: n.obterMensagem(),
                    data: this.formatarDataHora(n.getData()),
                    visualizada: n.estaVisualizada()
                })),
            naoVisualizadas: this.jogador.getJogadorNotificacoes().contarNaoVisualizadas()
        };
    }

    // ---------- Ações ----------
    // Só enviam o pedido. A tela se atualiza quando o resultado chega como evento.

    criarTroca(idCarta: string): Promise<void> {
        return this.trocas.criarTroca(this.jogador, this.cartaCarregada(idCarta));
    }

    cancelarTroca(idTroca: string): Promise<void> {
        return this.trocas.cancelarTroca(this.trocaCarregada(idTroca), this.jogador);
    }

    fazerProposta(idTroca: string, idCarta: string): Promise<void> {
        return this.propostas.criarProposta(
            this.trocaCarregada(idTroca),
            this.jogador,
            this.cartaCarregada(idCarta)
        );
    }

    cancelarProposta(idProposta: string): Promise<void> {
        return this.propostas.cancelarProposta(this.propostaCarregada(idProposta), this.jogador);
    }

    aceitarProposta(idProposta: string): Promise<void> {
        return this.propostas.aceitarProposta(this.propostaCarregada(idProposta), this.jogador);
    }

    rejeitarProposta(idProposta: string): Promise<void> {
        return this.propostas.rejeitarProposta(this.propostaCarregada(idProposta), this.jogador);
    }

    marcarNotificacaoVisualizada(idNotificacao: string): Promise<void> {
        const notificacao = this.notificacoesCarregadas.get(idNotificacao);
        if (!notificacao) {
            return Promise.reject(new Error(`Notificação ${idNotificacao} não foi carregada`));
        }
        return this.notificacoes.marcarComoVisualizada(notificacao, this.jogador);
    }

    // ---------- Tradução Model -> View ----------

    private trocaVisual(troca: Troca): TrocaVisual {
        this.trocasCarregadas.set(troca.getIdTroca(), troca);
        return {
            idTroca: troca.getIdTroca(),
            jogadorDono: troca.getJogadorDono().getUsuario(),
            carta: this.cartaVisual(troca.getCartaLeiloada()),
            dataCriacao: this.formatarData(troca.getDataCriacao()),
            status: troca.getStatus(),
            ehMinha: troca.getJogadorDono().getUsuario() === this.jogador.getUsuario()
        };
    }

    private propostaVisual(proposta: Proposta): PropostaVisual {
        this.propostasCarregadas.set(proposta.getIdProposta(), proposta);
        return {
            idProposta: proposta.getIdProposta(),
            idTroca: proposta.getIdTroca(),
            jogadorOfertante: proposta.getJogadorOfertante().getUsuario(),
            carta: this.cartaVisual(proposta.getCartaOferecida()),
            dataCriacao: this.formatarData(proposta.getDataCriacao()),
            status: proposta.getStatus(),
            ehMinha: proposta.getJogadorOfertante().getUsuario() === this.jogador.getUsuario()
        };
    }

    private cartaVisual(carta: Carta): CartaVisual {
        this.cartasCarregadas.set(carta.getIdCarta(), carta);
        return {
            idCarta: carta.getIdCarta(),
            nome: carta.getNome(),
            tipo: this.traduzirTipo(carta.getTipo()),
            imagem: carta.getPokemon().getSprite(),
            ofertada: carta.getOfertada()
        };
    }

    private trocaCarregada(idTroca: string): Troca {
        return this.exigir(this.trocasCarregadas.get(idTroca), `Troca ${idTroca}`);
    }

    private propostaCarregada(idProposta: string): Proposta {
        return this.exigir(this.propostasCarregadas.get(idProposta), `Proposta ${idProposta}`);
    }

    private cartaCarregada(idCarta: string): Carta {
        return this.exigir(this.cartasCarregadas.get(idCarta), `Carta ${idCarta}`);
    }

    private exigir<T>(valor: T | undefined, descricao: string): T {
        if (valor === undefined) {
            throw new Error(`${descricao} não foi carregada`);
        }
        return valor;
    }

    private formatarData(data: Date): string {
        return data.toLocaleDateString("pt-BR");
    }

    private formatarDataHora(data: Date): string {
        return data.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    }

    // "grass/poison" -> "Planta / Venenoso"
    private traduzirTipo(tipo: string): string {
        if (!tipo) {
            return "Desconhecido";
        }
        return tipo
            .split("/")
            .map((t) => TIPOS_EM_PORTUGUES[t] ?? t)
            .join(" / ");
    }
}

const TIPOS_EM_PORTUGUES: Record<string, string> = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    grass: "Planta",
    electric: "Elétrico",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Venenoso",
    ground: "Terrestre",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Sombrio",
    steel: "Aço",
    fairy: "Fada"
};
