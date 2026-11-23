import type { TrocaVisual } from "../services/fachada/tiposVisualizacao";
import { useControlador } from "./ControladorContext";
import { useConsulta } from "./useConsulta";

export function useMinhasTrocasAbertas() {
    const { fachada } = useControlador();
    return useConsulta<TrocaVisual[]>(
        () => fachada.carregarMinhasTrocasAbertas(),
        ["trocaAtualizada", "propostaAtualizada"]
    );
}
