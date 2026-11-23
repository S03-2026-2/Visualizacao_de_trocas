import type { TrocaVisual } from "../services/fachada/tiposVisualizacao";
import { useControlador } from "./ControladorContext";
import { useConsulta } from "./useConsulta";

// Exemplo de hook de consulta: lista de trocas abertas de outros jogadores.
// Recarrega sozinho quando chega um evento "trocaAtualizada" (nova troca, troca concluída...).
export function useTrocasDisponiveis() {
    const { fachada } = useControlador();
    return useConsulta<TrocaVisual[]>(
        () => fachada.carregarTrocasDisponiveis(),
        ["trocaAtualizada"]
    );
}
