// Usado pelos mocks para imitar o tempo de resposta da rede.
// Retorna uma Promise que só termina depois de "ms" milissegundos,
// então quem faz "await simularLatencia()" fica esperando esse tempo.
export function simularLatencia(ms: number = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
