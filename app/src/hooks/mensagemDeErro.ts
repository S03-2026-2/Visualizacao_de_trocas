// Transforma qualquer erro capturado em um texto para mostrar na tela
export function mensagemDeErro(erro: unknown): string {
    return erro instanceof Error ? erro.message : "Ocorreu um erro inesperado";
}
