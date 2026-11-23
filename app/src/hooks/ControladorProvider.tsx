import { useState, type ReactNode } from "react";
import { montarControlador } from "../services/montarControlador";
import { ControladorContext } from "./ControladorContext";

// Monta o Controlador UMA vez (a função passada ao useState só roda na primeira
// renderização) e o disponibiliza para todo o app.
function ControladorProvider({ children }: { children: ReactNode }) {
    const [controlador] = useState(montarControlador);
    return (
        <ControladorContext.Provider value={controlador}>
            {children}
        </ControladorContext.Provider>
    );
}

export default ControladorProvider;
