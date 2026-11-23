import type { AssinanteEvento, Comunicador } from "./Comunicador";
import type { Evento } from "./Evento";
import type { BackendMock } from "./BackendMock";
import { simularLatencia } from "./simularLatencia";

// Simula o Broker em memória, enquanto o sistema real não está disponível.
// - assinar, removerAssinatura e entregar: mecânica que a versão real também terá
// - postar: finge ser o grupo de Trocas (o BackendMock aplica o pedido e devolve os fatos)
// - simularEvento e simularPropostaDeOutroJogador: fingem ser os outros jogadores
//   (eventos que o nosso app não pediu)
export class ComunicadorMock implements Comunicador{
    private listaFuncoes: AssinanteEvento[] = [];
    private backend: BackendMock;

    constructor(backend: BackendMock) {
        this.backend = backend;
    }

    assinar(funcao: AssinanteEvento): void {
        if (!this.listaFuncoes.includes(funcao)){
            this.listaFuncoes.push(funcao);
        }
    }
    removerAssinatura(funcao: AssinanteEvento): void {
        const novaLista = this.listaFuncoes.filter((f) => f !== funcao);
        this.listaFuncoes = novaLista;
    }

    // Recebe um pedido (evento de Saída) e, depois de um tempo, entrega
    // os fatos resultantes (eventos de Entrada), como o grupo de Trocas faria.
    // Os assinantes nunca recebem o pedido em si, só os fatos.
    //
    // Simplificação do mock: se o pedido for inválido (ex.: carta já ofertada),
    // a Promise é rejeitada com o motivo. No sistema real, a recusa provavelmente
    // chegaria como um evento; isso deve ser combinado com o grupo de Trocas.
    async postar(conteudo: Evento): Promise<void> {
        await simularLatencia();
        const fatos = this.backend.processar(conteudo);
        fatos.forEach((fato) => this.entregar(fato));
    }

    // Só existe no mock: entrega um evento de Entrada como se viesse de outro jogador.
    // Útil para testes e demonstração.
    simularEvento(evento: Evento): void {
        this.entregar(evento);
    }

    // Só existe no mock: um jogador fictício faz uma proposta na troca informada,
    // para mostrar a tela se atualizando sozinha (Observer) durante a demonstração.
    async simularPropostaDeOutroJogador(idTroca: string): Promise<void> {
        await simularLatencia();
        const fatos = this.backend.simularPropostaDeOutroJogador(idTroca);
        fatos.forEach((fato) => this.entregar(fato));
    }

    // Avisa todos os assinantes (passo "notificar observadores" do Observer).
    private entregar(evento: Evento): void{
        // Percorre uma cópia: se um assinante remover a assinatura durante a entrega,
        // a lista original muda, mas a cópia não, e ninguém é pulado
        const copiaLista = [...this.listaFuncoes];
        copiaLista.forEach((funcao) => {
            // try/catch em cada chamada: o erro de um assinante não impede os outros
            try {
                funcao(evento);
            } catch (erro) {
                console.error("ComunicadorMock: erro em um assinante", erro);
            }
        });
    }
}
