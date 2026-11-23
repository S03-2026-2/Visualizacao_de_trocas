import type { DetalheTrocaVisual } from "../services/fachada/tiposVisualizacao";
import { useControlador } from "./ControladorContext";
import { useConsulta } from "./useConsulta";

export function useDetalheTroca(idTroca: string) {
    const { fachada } = useControlador();
    return useConsulta<DetalheTrocaVisual | null>(
        () => fachada.carregarDetalheTroca(idTroca),
        ["trocaAtualizada", "propostaAtualizada"], idTroca
    );
}
