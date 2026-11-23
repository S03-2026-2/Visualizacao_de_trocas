import { createContext, useContext } from "react";
import type { Controlador } from "../services/montarControlador";

// Context do React: deixa o Controlador (fachada + demo) disponível para
// qualquer componente, sem passar por props de componente em componente.
// O valor é colocado pelo <ControladorProvider> em main.tsx.
export const ControladorContext = createContext<Controlador | null>(null);

export function useControlador(): Controlador {
    const controlador = useContext(ControladorContext);
    if (!controlador) {
        throw new Error("useControlador precisa ser usado dentro de <ControladorProvider>");
    }
    return controlador;
}
