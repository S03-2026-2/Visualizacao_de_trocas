import { useCallback, useState } from "react";
import { mensagemDeErro } from "./mensagemDeErro";

// Para botões que disparam uma ação da fachada (criar troca, aceitar proposta...).
// Controla o "enviando..." (para desabilitar o botão) e a mensagem de erro.
//
// Uso:
//   const { executar, executando, erro } = useAcao();
//   const { fachada } = useControlador();
//   <button disabled={executando} onClick={() => executar(() => fachada.aceitarProposta(id))}>
export function useAcao() {
    const [executando, setExecutando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    // Devolve true se deu certo, false se deu erro
    const executar = useCallback(async (acao: () => Promise<void>): Promise<boolean> => {
        setExecutando(true);
        setErro(null);
        try {
            await acao();
            return true;
        } catch (e) {
            setErro(mensagemDeErro(e));
            return false;
        } finally {
            setExecutando(false);
        }
    }, []);

    return { executar, executando, erro };
}
