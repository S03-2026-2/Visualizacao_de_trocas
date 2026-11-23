import type { NotificacoesVisual } from "../services/fachada/tiposVisualizacao";
import { useControlador } from "./ControladorContext";
import { useConsulta } from "./useConsulta";

export function useNotificacoes() {
    const { fachada } = useControlador();
    return useConsulta<NotificacoesVisual>(
        () => fachada.carregarNotificacoes(),
        ["notificacaoRecebida"]
    );
}
