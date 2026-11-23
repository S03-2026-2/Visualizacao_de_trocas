import type { Evento } from "./Evento";
export type AssinanteEvento = (evento: Evento) => void;

export interface Comunicador{
    postar(conteudo: Evento): Promise<void>;
    assinar(funcao: AssinanteEvento): void;
    removerAssinatura(funcao: AssinanteEvento): void;
}