import { useCallback, useEffect, useRef, useState } from "react";
import type { Evento, TipoEventoEntrada } from "../services/comunicacao/Evento";
import { useControlador } from "./ControladorContext";
import { mensagemDeErro } from "./mensagemDeErro";

export interface ResultadoConsulta<T> {
    dados: T | null;      // null enquanto a primeira carga não terminou
    carregando: boolean;
    erro: string | null;
    recarregar: () => void;
}

// Hook genérico usado por todos os hooks de consulta (useTrocasDisponiveis, etc.):
// 1. carrega os dados quando o componente aparece
// 2. ASSINA o Comunicador (Observer): quando chega um evento de um dos tipos
//    informados, carrega de novo, e a tela se atualiza sozinha
// 3. remove a assinatura quando o componente sai da tela
//
// "chave": quando ela muda (ex.: o id da troca exibida), carrega de novo.
export function useConsulta<T>(
    carregar: () => Promise<T>,
    eventosQueRecarregam: readonly TipoEventoEntrada[],
    chave: string = ""
): ResultadoConsulta<T> {
    const { fachada } = useControlador();
    const [dados, setDados] = useState<T | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [versao, setVersao] = useState(0);

    // Guardamos a função e os eventos em refs para sempre usar a versão mais recente
    // sem que os efeitos rodem de novo a cada renderização.
    const carregarRef = useRef(carregar);
    const eventosRef = useRef(eventosQueRecarregam);
    useEffect(() => {
        carregarRef.current = carregar;
        eventosRef.current = eventosQueRecarregam;
    });

    const recarregar = useCallback(() => {
        setCarregando(true);
        setVersao((v) => v + 1);
    }, []);

    // 1. Carregar (de novo sempre que "versao" ou "chave" mudarem)
    useEffect(() => {
        // Se outra carga começar antes desta terminar, o resultado desta é ignorado
        let ativa = true;
        carregarRef.current()
            .then((resultado) => {
                if (ativa) {
                    setDados(resultado);
                    setErro(null);
                }
            })
            .catch((e: unknown) => {
                if (ativa) {
                    setErro(mensagemDeErro(e));
                }
            })
            .finally(() => {
                if (ativa) {
                    setCarregando(false);
                }
            });
        return () => {
            ativa = false;
        };
    }, [versao, chave]);

    // 2 e 3. Assinar e remover a assinatura (Observer)
    useEffect(() => {
        // A MESMA função é usada para assinar e remover (removerAssinatura compara a referência)
        const aoReceberEvento = (evento: Evento) => {
            if ((eventosRef.current as readonly string[]).includes(evento.tipo)) {
                recarregar();
            }
        };
        fachada.assinarAtualizacoes(aoReceberEvento);
        return () => fachada.removerAssinatura(aoReceberEvento);
    }, [fachada, recarregar]);

    return { dados, carregando, erro, recarregar };
}
