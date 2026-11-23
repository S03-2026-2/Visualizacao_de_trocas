import type { ItemHistoricoVisual } from "../services/fachada/tiposVisualizacao";
import { useControlador } from "./ControladorContext";
import { useConsulta } from "./useConsulta";

export function useHistorico() {
    const { fachada } = useControlador();
    return useConsulta<ItemHistoricoVisual[]>(
        () => fachada.carregarHistorico(),
        ["trocaAtualizada", "propostaAtualizada"]
    );
}
