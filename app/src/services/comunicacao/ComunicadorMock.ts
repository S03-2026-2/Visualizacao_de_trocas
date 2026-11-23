import type { AssinanteEvento, Comunicador } from "./Comunicador";
import type { Evento, TipoEventoEntrada } from "./Evento";
import { simularLatencia } from "./simularLatencia";

// Simula o Broker em memória, enquanto o sistema real não está disponível.
// - assinar, removerAssinatura e entregar: mecânica que a versão real também terá
// - postar: finge ser o grupo de Trocas (recebe o pedido e responde com um fato)
// - simularEvento: finge ser os outros jogadores (eventos que o nosso app não pediu)
export class ComunicadorMock implements Comunicador{
    private listaFuncoes: AssinanteEvento[] = [];
    assinar(funcao: AssinanteEvento): void {
        if (!this.listaFuncoes.includes(funcao)){
            this.listaFuncoes.push(funcao);
        }
    }
    removerAssinatura(funcao: AssinanteEvento): void {
        const novaLista = this.listaFuncoes.filter((f) => f !== funcao);
        this.listaFuncoes = novaLista;
    }

    // Recebe um pedido (evento de Saída) e, depois de um tempo, responde
    // com o fato correspondente (evento de Entrada), como o grupo de Trocas faria.
    // Os assinantes nunca recebem o pedido em si, só o fato.
    async postar(conteudo: Evento): Promise<void> {
        await simularLatencia();

        let resposta: TipoEventoEntrada;
        switch (conteudo.tipo) {
            case "criarProposta":
            case "cancelarProposta":
            case "aceitarProposta":
            case "rejeitarProposta":
                resposta = "propostaAtualizada";
                break;
            case "criarTroca":
            case "cancelarTroca":
                resposta = "trocaAtualizada";
                break;
            default:
                // Eventos de Entrada são fatos vindos de fora: o app não deve postá-los
                console.error(`ComunicadorMock: "${conteudo.tipo}" não é um evento de saída`);
                return;
        }

        // Por enquanto devolve os mesmos dados do pedido
        this.entregar({ tipo: resposta, dados: conteudo.dados });
    }

    // Só existe no mock: entrega um evento de Entrada como se viesse de outro jogador
    // (ex.: uma notificação "Misty aceitou sua proposta"). Útil para testes e demonstração.
    simularEvento(evento: Evento): void {
        this.entregar(evento);
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
