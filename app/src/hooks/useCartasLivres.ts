import type { CartaVisual } from "../services/fachada/tiposVisualizacao";
import { useControlador } from "./ControladorContext";
import { useConsulta } from "./useConsulta";

export function useCartasLivres() {
    const { fachada } = useControlador();
    return useConsulta<CartaVisual[]>(
        () => fachada.carregarCartasLivres(),
        ["trocaAtualizada", "propostaAtualizada"]
    );
}
