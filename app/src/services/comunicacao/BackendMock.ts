import type {
    CartaJson,
    JogadorJson,
    NotificacaoJson,
    PropostaJson,
    TrocaJson
} from "./ApiConsultas";
import type {
    DadosCancelarTroca,
    DadosCriarProposta,
    DadosCriarTroca,
    DadosDecisaoProposta,
    DadosMarcarNotificacao,
    Evento
} from "./Evento";
import type { StatusTroca } from "../../models/Troca";
import type { StatusProposta } from "../../models/Proposta";

// Simula, em memória, os sistemas dos OUTROS grupos (Trocas, Cartas e Jogador).
// As regras de negócio daqui (quem pode aceitar, o que acontece com as outras propostas...)
// são responsabilidade do grupo de Trocas: estão aqui só para a demonstração funcionar.
//
// ApiConsultasMock lê destes dados, e ComunicadorMock manda os pedidos para cá.
// Como os dois usam a MESMA instância, criar uma troca faz ela aparecer nas consultas.
// Recarregar a página volta tudo ao estado inicial.

interface CartaArmazenada {
    idCarta: string;
    idPokemon: string; // número do Pokémon na PokeAPI
    dono: string;
    ofertada: boolean;
}

interface TrocaArmazenada {
    idTroca: string;
    dono: string;
    idCarta: string;
    dataCriacao: string;
    status: StatusTroca;
}

interface PropostaArmazenada {
    idProposta: string;
    idTroca: string;
    ofertante: string;
    idCarta: string;
    dataCriacao: string;
    status: StatusProposta;
}

interface NotificacaoArmazenada {
    idNotificacao: string;
    destinatario: string;
    mensagem: string;
    data: string;
    visualizada: boolean;
}

// Jogador fictício usado por "simular proposta de outro jogador" na demonstração
const JOGADOR_SIMULADO = "Gary";

export class BackendMock {
    private jogadores: JogadorJson[] = [
        { email: "ash@exemplo.com", usuario: "Ash" },
        { email: "misty@exemplo.com", usuario: "Misty" },
        { email: "brock@exemplo.com", usuario: "Brock" },
        { email: "gary@exemplo.com", usuario: JOGADOR_SIMULADO }
    ];

    private cartas: CartaArmazenada[] = [
        // Ash
        { idCarta: "C001", idPokemon: "25", dono: "Ash", ofertada: true },     // Pikachu (na troca TR003)
        { idCarta: "C005", idPokemon: "133", dono: "Ash", ofertada: false },   // Eevee (ganhou na TR001)
        { idCarta: "C006", idPokemon: "132", dono: "Ash", ofertada: false },   // Ditto
        { idCarta: "C007", idPokemon: "4", dono: "Ash", ofertada: true },      // Charmander (proposta PR003)
        { idCarta: "C009", idPokemon: "7", dono: "Ash", ofertada: false },     // Squirtle
        { idCarta: "C010", idPokemon: "94", dono: "Ash", ofertada: false },    // Gengar
        { idCarta: "C011", idPokemon: "143", dono: "Ash", ofertada: false },   // Snorlax
        // Misty
        { idCarta: "C003", idPokemon: "133", dono: "Misty", ofertada: true },  // Eevee (na troca TR005)
        { idCarta: "C004", idPokemon: "14", dono: "Misty", ofertada: false },  // Kakuna (ganhou na TR001)
        { idCarta: "C012", idPokemon: "120", dono: "Misty", ofertada: true },  // Staryu (proposta PR004)
        { idCarta: "C013", idPokemon: "54", dono: "Misty", ofertada: false },  // Psyduck
        // Brock
        { idCarta: "C002", idPokemon: "1", dono: "Brock", ofertada: true },    // Bulbasaur (na troca TR004)
        { idCarta: "C008", idPokemon: "1", dono: "Brock", ofertada: false },   // Bulbasaur
        { idCarta: "C014", idPokemon: "95", dono: "Brock", ofertada: true },   // Onix (proposta PR005)
        { idCarta: "C015", idPokemon: "74", dono: "Brock", ofertada: false },  // Geodude
        // Gary (jogador simulado)
        { idCarta: "C016", idPokemon: "39", dono: JOGADOR_SIMULADO, ofertada: false },  // Jigglypuff
        { idCarta: "C017", idPokemon: "52", dono: JOGADOR_SIMULADO, ofertada: false },  // Meowth
        { idCarta: "C018", idPokemon: "63", dono: JOGADOR_SIMULADO, ofertada: false }   // Abra
    ];

    private trocas: TrocaArmazenada[] = [
        { idTroca: "TR001", dono: "Ash", idCarta: "C004", dataCriacao: "2026-11-09T10:00:00.000Z", status: "Concluida" },
        { idTroca: "TR002", dono: "Brock", idCarta: "C008", dataCriacao: "2026-11-10T10:00:00.000Z", status: "Cancelada" },
        { idTroca: "TR003", dono: "Ash", idCarta: "C001", dataCriacao: "2026-11-12T10:00:00.000Z", status: "Aberta" },
        { idTroca: "TR004", dono: "Brock", idCarta: "C002", dataCriacao: "2026-11-13T10:00:00.000Z", status: "Aberta" },
        { idTroca: "TR005", dono: "Misty", idCarta: "C003", dataCriacao: "2026-11-14T10:00:00.000Z", status: "Aberta" }
    ];

    private propostas: PropostaArmazenada[] = [
        // Misty ofereceu Eevee pelo Kakuna do Ash, e o Ash aceitou
        { idProposta: "PR001", idTroca: "TR001", ofertante: "Misty", idCarta: "C005", dataCriacao: "2026-11-09T12:00:00.000Z", status: "Aceita" },
        // Ash ofereceu Ditto pelo Bulbasaur do Brock, e o Brock recusou
        { idProposta: "PR002", idTroca: "TR002", ofertante: "Ash", idCarta: "C006", dataCriacao: "2026-11-10T12:00:00.000Z", status: "Recusada" },
        // Ash ofereceu Charmander pelo Bulbasaur do Brock, ainda sem resposta
        { idProposta: "PR003", idTroca: "TR004", ofertante: "Ash", idCarta: "C007", dataCriacao: "2026-11-13T12:00:00.000Z", status: "Aberta" },
        // Duas propostas abertas no Pikachu do Ash (para a demonstração de aceitar/recusar)
        { idProposta: "PR004", idTroca: "TR003", ofertante: "Misty", idCarta: "C012", dataCriacao: "2026-11-12T15:00:00.000Z", status: "Aberta" },
        { idProposta: "PR005", idTroca: "TR003", ofertante: "Brock", idCarta: "C014", dataCriacao: "2026-11-12T16:00:00.000Z", status: "Aberta" }
    ];

    private notificacoes: NotificacaoArmazenada[] = [
        { idNotificacao: "NT001", destinatario: "Ash", mensagem: "Brock recusou sua proposta PR002", data: "2026-11-10T13:00:00.000Z", visualizada: true },
        { idNotificacao: "NT002", destinatario: "Ash", mensagem: "Misty fez uma proposta na sua troca TR003", data: "2026-11-12T15:00:00.000Z", visualizada: false },
        { idNotificacao: "NT003", destinatario: "Ash", mensagem: "Brock fez uma proposta na sua troca TR003", data: "2026-11-12T16:00:00.000Z", visualizada: false }
    ];

    private proximoIdTroca = 6;
    private proximoIdProposta = 6;
    private proximoIdNotificacao = 4;

    // ---------- Consultas (usadas pelo ApiConsultasMock) ----------

    trocasDisponiveis(usuario: string): TrocaJson[] {
        return this.trocas
            .filter((t) => t.status === "Aberta" && t.dono !== usuario)
            .map((t) => this.paraTrocaJson(t));
    }

    historicoTrocas(usuario: string): TrocaJson[] {
        return this.trocas
            .filter((t) => t.dono === usuario)
            .map((t) => this.paraTrocaJson(t));
    }

    troca(idTroca: string): TrocaJson | null {
        const troca = this.trocas.find((t) => t.idTroca === idTroca);
        return troca ? this.paraTrocaJson(troca) : null;
    }

    propostasDaTroca(idTroca: string): PropostaJson[] {
        return this.propostas
            .filter((p) => p.idTroca === idTroca)
            .map((p) => this.paraPropostaJson(p));
    }

    historicoPropostas(usuario: string): PropostaJson[] {
        // Propostas que o jogador fez e as que outros fizeram nas trocas dele
        return this.propostas
            .filter((p) => p.ofertante === usuario || this.buscarTroca(p.idTroca).dono === usuario)
            .map((p) => this.paraPropostaJson(p));
    }

    carta(idCarta: string): CartaJson | null {
        const carta = this.cartas.find((c) => c.idCarta === idCarta);
        return carta ? this.paraCartaJson(carta) : null;
    }

    cartasDoJogador(usuario: string): CartaJson[] {
        return this.cartas
            .filter((c) => c.dono === usuario)
            .map((c) => this.paraCartaJson(c));
    }

    notificacoesDoJogador(usuario: string): NotificacaoJson[] {
        return this.notificacoes
            .filter((n) => n.destinatario === usuario)
            .map((n) => ({ idNotificacao: n.idNotificacao, mensagem: n.mensagem, data: n.data, visualizada: n.visualizada }));
    }

    // ---------- Pedidos (usados pelo ComunicadorMock) ----------

    // Recebe um pedido (evento de Saída), aplica as regras e devolve os fatos
    // (eventos de Entrada) que resultaram dele. Se o pedido for inválido, lança um erro.
    processar(pedido: Evento): Evento[] {
        switch (pedido.tipo) {
            case "criarTroca":
                return this.criarTroca(pedido.dados as DadosCriarTroca);
            case "cancelarTroca":
                return this.cancelarTroca(pedido.dados as DadosCancelarTroca);
            case "criarProposta":
                return this.criarProposta(pedido.dados as DadosCriarProposta);
            case "cancelarProposta":
                return this.cancelarProposta(pedido.dados as DadosDecisaoProposta);
            case "aceitarProposta":
                return this.aceitarProposta(pedido.dados as DadosDecisaoProposta);
            case "rejeitarProposta":
                return this.rejeitarProposta(pedido.dados as DadosDecisaoProposta);
            case "marcarNotificacaoVisualizada":
                return this.marcarNotificacao(pedido.dados as DadosMarcarNotificacao);
            default:
                throw new Error(`"${pedido.tipo}" não é um pedido (evento de saída)`);
        }
    }

    // Só para a demonstração: o jogador simulado faz uma proposta na troca informada
    simularPropostaDeOutroJogador(idTroca: string): Evento[] {
        const livre = this.cartas.find((c) => c.dono === JOGADOR_SIMULADO && !c.ofertada);
        if (!livre) {
            throw new Error(`${JOGADOR_SIMULADO} não tem mais cartas livres para ofertar`);
        }
        return this.criarProposta({ usuario: JOGADOR_SIMULADO, idTroca, idCarta: livre.idCarta });
    }

    private criarTroca(dados: DadosCriarTroca): Evento[] {
        const carta = this.buscarCartaLivreDoJogador(dados.idCarta, dados.usuario);

        const troca: TrocaArmazenada = {
            idTroca: this.gerarId("TR", this.proximoIdTroca++),
            dono: dados.usuario,
            idCarta: carta.idCarta,
            dataCriacao: new Date().toISOString(),
            status: "Aberta"
        };
        this.trocas.push(troca);
        carta.ofertada = true;

        return [this.eventoTroca(troca)];
    }

    private cancelarTroca(dados: DadosCancelarTroca): Evento[] {
        const troca = this.buscarTroca(dados.idTroca);
        this.exigirDonoDaTroca(troca, dados.usuario);
        this.exigirTrocaAberta(troca);

        troca.status = "Cancelada";
        this.liberarCarta(troca.idCarta);
        const eventos: Evento[] = [this.eventoTroca(troca)];

        // As propostas abertas dessa troca são recusadas, e as cartas voltam a ficar livres
        for (const proposta of this.propostasAbertas(troca.idTroca)) {
            proposta.status = "Recusada";
            this.liberarCarta(proposta.idCarta);
            eventos.push(this.eventoProposta(proposta));
            eventos.push(this.notificar(proposta.ofertante, `${troca.dono} cancelou a troca ${troca.idTroca}`));
        }
        return eventos;
    }

    private criarProposta(dados: DadosCriarProposta): Evento[] {
        const troca = this.buscarTroca(dados.idTroca);
        this.exigirTrocaAberta(troca);
        if (troca.dono === dados.usuario) {
            throw new Error("Não é possível fazer proposta na própria troca");
        }
        const carta = this.buscarCartaLivreDoJogador(dados.idCarta, dados.usuario);

        const proposta: PropostaArmazenada = {
            idProposta: this.gerarId("PR", this.proximoIdProposta++),
            idTroca: troca.idTroca,
            ofertante: dados.usuario,
            idCarta: carta.idCarta,
            dataCriacao: new Date().toISOString(),
            status: "Aberta"
        };
        this.propostas.push(proposta);
        carta.ofertada = true;

        return [
            this.eventoProposta(proposta),
            this.notificar(troca.dono, `${dados.usuario} fez uma proposta na sua troca ${troca.idTroca}`)
        ];
    }

    private cancelarProposta(dados: DadosDecisaoProposta): Evento[] {
        const proposta = this.buscarProposta(dados.idProposta);
        if (proposta.ofertante !== dados.usuario) {
            throw new Error("Só quem fez a proposta pode cancelá-la");
        }
        this.exigirPropostaAberta(proposta);

        proposta.status = "Cancelada";
        this.liberarCarta(proposta.idCarta);
        const troca = this.buscarTroca(proposta.idTroca);

        return [
            this.eventoProposta(proposta),
            this.notificar(troca.dono, `${dados.usuario} cancelou a proposta ${proposta.idProposta} na sua troca ${troca.idTroca}`)
        ];
    }

    private aceitarProposta(dados: DadosDecisaoProposta): Evento[] {
        const proposta = this.buscarProposta(dados.idProposta);
        const troca = this.buscarTroca(proposta.idTroca);
        this.exigirDonoDaTroca(troca, dados.usuario);
        this.exigirTrocaAberta(troca);
        this.exigirPropostaAberta(proposta);

        // A proposta escolhida vence e a troca é concluída
        proposta.status = "Aceita";
        troca.status = "Concluida";

        // As cartas trocam de dono
        const cartaDaTroca = this.buscarCarta(troca.idCarta);
        const cartaDaProposta = this.buscarCarta(proposta.idCarta);
        cartaDaTroca.dono = proposta.ofertante;
        cartaDaProposta.dono = troca.dono;
        cartaDaTroca.ofertada = false;
        cartaDaProposta.ofertada = false;

        const eventos: Evento[] = [
            this.eventoTroca(troca),
            this.eventoProposta(proposta),
            this.notificar(proposta.ofertante, `${troca.dono} aceitou sua proposta ${proposta.idProposta} na troca ${troca.idTroca}`)
        ];

        // As outras propostas abertas da mesma troca são recusadas
        for (const outra of this.propostasAbertas(troca.idTroca)) {
            outra.status = "Recusada";
            this.liberarCarta(outra.idCarta);
            eventos.push(this.eventoProposta(outra));
            eventos.push(this.notificar(outra.ofertante, `${troca.dono} escolheu outra proposta na troca ${troca.idTroca}`));
        }
        return eventos;
    }

    private rejeitarProposta(dados: DadosDecisaoProposta): Evento[] {
        const proposta = this.buscarProposta(dados.idProposta);
        const troca = this.buscarTroca(proposta.idTroca);
        this.exigirDonoDaTroca(troca, dados.usuario);
        this.exigirPropostaAberta(proposta);

        proposta.status = "Recusada";
        this.liberarCarta(proposta.idCarta);

        return [
            this.eventoProposta(proposta),
            this.notificar(proposta.ofertante, `${troca.dono} recusou sua proposta ${proposta.idProposta}`)
        ];
    }

    private marcarNotificacao(dados: DadosMarcarNotificacao): Evento[] {
        const notificacao = this.notificacoes.find(
            (n) => n.idNotificacao === dados.idNotificacao && n.destinatario === dados.usuario
        );
        if (!notificacao) {
            throw new Error(`Notificação ${dados.idNotificacao} não encontrada`);
        }
        notificacao.visualizada = true;
        return [{ tipo: "notificacaoRecebida", dados: { ...notificacao } }];
    }

    // ---------- Auxiliares ----------

    private buscarTroca(idTroca: string): TrocaArmazenada {
        const troca = this.trocas.find((t) => t.idTroca === idTroca);
        if (!troca) {
            throw new Error(`Troca ${idTroca} não encontrada`);
        }
        return troca;
    }

    private buscarProposta(idProposta: string): PropostaArmazenada {
        const proposta = this.propostas.find((p) => p.idProposta === idProposta);
        if (!proposta) {
            throw new Error(`Proposta ${idProposta} não encontrada`);
        }
        return proposta;
    }

    private buscarCarta(idCarta: string): CartaArmazenada {
        const carta = this.cartas.find((c) => c.idCarta === idCarta);
        if (!carta) {
            throw new Error(`Carta ${idCarta} não encontrada`);
        }
        return carta;
    }

    private buscarCartaLivreDoJogador(idCarta: string, usuario: string): CartaArmazenada {
        const carta = this.buscarCarta(idCarta);
        if (carta.dono !== usuario) {
            throw new Error("Essa carta não pertence a você");
        }
        if (carta.ofertada) {
            throw new Error("Essa carta já está em outra troca ou proposta aberta");
        }
        return carta;
    }

    private buscarJogador(usuario: string): JogadorJson {
        const jogador = this.jogadores.find((j) => j.usuario === usuario);
        if (!jogador) {
            throw new Error(`Jogador ${usuario} não encontrado`);
        }
        return jogador;
    }

    private propostasAbertas(idTroca: string): PropostaArmazenada[] {
        return this.propostas.filter((p) => p.idTroca === idTroca && p.status === "Aberta");
    }

    private exigirDonoDaTroca(troca: TrocaArmazenada, usuario: string): void {
        if (troca.dono !== usuario) {
            throw new Error("Só o dono da troca pode fazer isso");
        }
    }

    private exigirTrocaAberta(troca: TrocaArmazenada): void {
        if (troca.status !== "Aberta") {
            throw new Error(`A troca ${troca.idTroca} não está mais aberta`);
        }
    }

    private exigirPropostaAberta(proposta: PropostaArmazenada): void {
        if (proposta.status !== "Aberta") {
            throw new Error(`A proposta ${proposta.idProposta} não está mais aberta`);
        }
    }

    private liberarCarta(idCarta: string): void {
        this.buscarCarta(idCarta).ofertada = false;
    }

    private gerarId(prefixo: string, numero: number): string {
        return prefixo + String(numero).padStart(3, "0");
    }

    private notificar(destinatario: string, mensagem: string): Evento {
        const notificacao: NotificacaoArmazenada = {
            idNotificacao: this.gerarId("NT", this.proximoIdNotificacao++),
            destinatario,
            mensagem,
            data: new Date().toISOString(),
            visualizada: false
        };
        this.notificacoes.push(notificacao);
        return { tipo: "notificacaoRecebida", dados: { ...notificacao } };
    }

    private eventoTroca(troca: TrocaArmazenada): Evento {
        return { tipo: "trocaAtualizada", dados: this.paraTrocaJson(troca) };
    }

    private eventoProposta(proposta: PropostaArmazenada): Evento {
        return { tipo: "propostaAtualizada", dados: this.paraPropostaJson(proposta) };
    }

    // Os métodos "para...Json" montam objetos NOVOS a cada chamada,
    // então quem recebe não consegue alterar os dados guardados aqui.
    private paraCartaJson(carta: CartaArmazenada): CartaJson {
        return { idCarta: carta.idCarta, idPokemon: carta.idPokemon, ofertada: carta.ofertada };
    }

    private paraTrocaJson(troca: TrocaArmazenada): TrocaJson {
        return {
            idTroca: troca.idTroca,
            jogadorDono: { ...this.buscarJogador(troca.dono) },
            cartaLeiloada: this.paraCartaJson(this.buscarCarta(troca.idCarta)),
            dataCriacao: troca.dataCriacao,
            status: troca.status
        };
    }

    private paraPropostaJson(proposta: PropostaArmazenada): PropostaJson {
        return {
            idProposta: proposta.idProposta,
            idTroca: proposta.idTroca,
            jogadorOfertante: { ...this.buscarJogador(proposta.ofertante) },
            cartaOferecida: this.paraCartaJson(this.buscarCarta(proposta.idCarta)),
            dataCriacao: proposta.dataCriacao,
            status: proposta.status
        };
    }
}
