import type {
    ApiConsultas,
    CartaJson,
    JogadorJson,
    NotificacaoJson,
    PropostaJson,
    TrocaJson
} from "./ApiConsultas";
import { simularLatencia } from "./simularLatencia";

// Dados falsos no formato que esperamos receber dos outros grupos.
// Reaproveitam os exemplos das páginas (Ash, Misty, Brock...), para as telas
// continuarem iguais quando passarem a usar o Controller.
// O usuário "logado" nos testes é o Ash.

const ash: JogadorJson = { email: "ash@exemplo.com", usuario: "Ash" };
const misty: JogadorJson = { email: "misty@exemplo.com", usuario: "Misty" };
const brock: JogadorJson = { email: "brock@exemplo.com", usuario: "Brock" };

// Monta a URL do sprite oficial da PokeAPI a partir do número do Pokémon.
function sprite(numeroPokemon: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroPokemon}.png`;
}

// "ofertada" = a carta está em uma troca ou proposta aberta.
const cartas: CartaJson[] = [
    { idCarta: "C001", nome: "Pikachu", tipo: "electric", ofertada: true, pokemon: { id: "25", sprite: sprite(25) } },
    { idCarta: "C002", nome: "Bulbasaur", tipo: "grass", ofertada: true, pokemon: { id: "1", sprite: sprite(1) } },
    { idCarta: "C003", nome: "Eevee", tipo: "normal", ofertada: true, pokemon: { id: "133", sprite: sprite(133) } },
    { idCarta: "C004", nome: "Kakuna", tipo: "bug", ofertada: false, pokemon: { id: "14", sprite: sprite(14) } },
    { idCarta: "C005", nome: "Eevee", tipo: "normal", ofertada: false, pokemon: { id: "133", sprite: sprite(133) } },
    { idCarta: "C006", nome: "Ditto", tipo: "normal", ofertada: false, pokemon: { id: "132", sprite: sprite(132) } },
    { idCarta: "C007", nome: "Charmander", tipo: "fire", ofertada: true, pokemon: { id: "4", sprite: sprite(4) } },
    { idCarta: "C008", nome: "Bulbasaur", tipo: "grass", ofertada: false, pokemon: { id: "1", sprite: sprite(1) } }
];

// Busca uma carta da lista acima pelo id (só para montar os dados de exemplo).
function carta(idCarta: string): CartaJson {
    const encontrada = cartas.find((c) => c.idCarta === idCarta);
    if (!encontrada) {
        throw new Error(`Carta de exemplo não existe: ${idCarta}`);
    }
    return encontrada;
}

const trocas: TrocaJson[] = [
    // Abertas: aparecem em "Trocas disponíveis"
    { idTroca: "TR003", jogadorDono: ash, cartaLeiloada: carta("C001"), dataCriacao: "2026-11-12T10:00:00.000Z", status: "Aberta" },
    { idTroca: "TR004", jogadorDono: brock, cartaLeiloada: carta("C002"), dataCriacao: "2026-11-13T10:00:00.000Z", status: "Aberta" },
    { idTroca: "TR005", jogadorDono: misty, cartaLeiloada: carta("C003"), dataCriacao: "2026-11-14T10:00:00.000Z", status: "Aberta" },
    // Encerradas: aparecem no histórico
    { idTroca: "TR001", jogadorDono: ash, cartaLeiloada: carta("C004"), dataCriacao: "2026-11-09T10:00:00.000Z", status: "Concluida" },
    { idTroca: "TR002", jogadorDono: brock, cartaLeiloada: carta("C008"), dataCriacao: "2026-11-10T10:00:00.000Z", status: "Cancelada" }
];

const propostas: PropostaJson[] = [
    // Misty ofereceu Eevee pelo Kakuna do Ash, e o Ash aceitou
    { idProposta: "PR001", idTroca: "TR001", jogadorOfertante: misty, cartaOferecida: carta("C005"), dataCriacao: "2026-11-09T12:00:00.000Z", status: "Aceita" },
    // Ash ofereceu Ditto pelo Bulbasaur do Brock, e o Brock recusou
    { idProposta: "PR002", idTroca: "TR002", jogadorOfertante: ash, cartaOferecida: carta("C006"), dataCriacao: "2026-11-10T12:00:00.000Z", status: "Recusada" },
    // Ash ofereceu Charmander pelo Bulbasaur do Brock, ainda sem resposta
    { idProposta: "PR003", idTroca: "TR004", jogadorOfertante: ash, cartaOferecida: carta("C007"), dataCriacao: "2026-11-13T12:00:00.000Z", status: "Aberta" }
];

const notificacoes: (NotificacaoJson & { destinatario: string })[] = [
    { idNotificacao: "NT001", destinatario: "Ash", mensagem: "Brock recusou sua proposta PR002", data: "2026-11-10T13:00:00.000Z", visualizada: true },
    { idNotificacao: "NT002", destinatario: "Ash", mensagem: "Misty fez uma proposta na sua troca TR001", data: "2026-11-09T12:00:00.000Z", visualizada: false }
];

export class ApiConsultasMock implements ApiConsultas {
    // Todos os métodos esperam um pouco (como a rede faria) e devolvem uma CÓPIA
    // dos dados (structuredClone), para que quem recebe não altere os dados do mock.

    async buscarTrocasDisponiveis(usuario: string): Promise<TrocaJson[]> {
        await simularLatencia();
        // Disponíveis = abertas e de outros jogadores (não faz sentido propor na própria troca)
        const disponiveis = trocas.filter(
            (t) => t.status === "Aberta" && t.jogadorDono.usuario !== usuario
        );
        return structuredClone(disponiveis);
    }

    async buscarHistoricoTrocas(usuario: string): Promise<TrocaJson[]> {
        await simularLatencia();
        // Trocas que o jogador criou
        const doJogador = trocas.filter((t) => t.jogadorDono.usuario === usuario);
        return structuredClone(doJogador);
    }

    async buscarHistoricoPropostas(usuario: string): Promise<PropostaJson[]> {
        await simularLatencia();
        // Propostas em que o jogador participa: as que ele fez
        // e as que outros fizeram nas trocas dele
        const idsTrocasDoJogador = trocas
            .filter((t) => t.jogadorDono.usuario === usuario)
            .map((t) => t.idTroca);
        const doJogador = propostas.filter(
            (p) =>
                p.jogadorOfertante.usuario === usuario ||
                idsTrocasDoJogador.includes(p.idTroca)
        );
        return structuredClone(doJogador);
    }

    async buscarCarta(idCarta: string): Promise<CartaJson | null> {
        await simularLatencia();
        const encontrada = cartas.find((c) => c.idCarta === idCarta);
        return encontrada ? structuredClone(encontrada) : null;
    }

    async buscarNotificacoes(usuario: string): Promise<NotificacaoJson[]> {
        await simularLatencia();
        // "destinatario" só existe no mock, para filtrar; não faz parte do NotificacaoJson
        const doJogador = notificacoes
            .filter((n) => n.destinatario === usuario)
            .map(({ destinatario: _destinatario, ...notificacao }) => notificacao);
        return structuredClone(doJogador);
    }
}
