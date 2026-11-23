// Testa o Controller SEM as telas: chama a fachada do mesmo jeito que a View vai chamar,
// seguindo o roteiro da apresentação, e mostra no terminal o que aconteceu.
// Usa os mocks dos outros grupos e a PokeAPI de verdade (precisa de internet).
//
// Para rodar, dentro da pasta app:
//     npx tsx scripts/teste-fluxo.ts
//
// Se este script funciona mas a tela não, o problema está na View.
// Se este script também falha, o problema está no Controller.

import { montarControlador } from "../src/services/montarControlador";
import type { TrocaVisual } from "../src/services/fachada/tiposVisualizacao";

const { fachada, demo } = montarControlador();

// Mostra cada evento que chega do "Broker" (é o que faz as telas se atualizarem)
fachada.assinarAtualizacoes((evento) => {
    const dados = evento.dados as Record<string, unknown>;
    const detalhe = [dados.idTroca, dados.idProposta, dados.status ?? dados.mensagem]
        .filter((valor) => valor !== undefined)
        .join(" ");
    console.log(`      [evento] ${evento.tipo} ${detalhe}`);
});

function resumirTrocas(trocas: TrocaVisual[]): string {
    return trocas
        .map((t) => {
            const propostas = t.quantidadePropostasAbertas !== undefined
                ? `, ${t.quantidadePropostasAbertas} proposta(s) aberta(s)`
                : "";
            return `${t.idTroca} ${t.carta.nome} (${t.carta.tipo}) de ${t.jogadorDono}${propostas}`;
        })
        .join(" | ");
}

async function main() {
    console.log(`Jogador logado: ${fachada.getUsuarioLogado()}\n`);

    console.log("1. Tela de trocas");
    console.log("   Minhas abertas:", resumirTrocas(await fachada.carregarMinhasTrocasAbertas()));
    console.log("   Disponíveis:   ", resumirTrocas(await fachada.carregarTrocasDisponiveis()));
    const livres = await fachada.carregarCartasLivres();
    console.log("   Cartas livres: ", livres.map((c) => `${c.idCarta} ${c.nome}`).join(", "));
    console.log("   Imagem (PokeAPI):", livres[0]?.imagem || "(sem imagem: PokeAPI inacessível?)");

    console.log("\n2. Criar troca com o Squirtle (C009)");
    await fachada.criarTroca("C009");
    console.log("   Minhas abertas:", resumirTrocas(await fachada.carregarMinhasTrocasAbertas()));

    console.log("\n3. Abrir a TR005 (da Misty) e propor o Gengar (C010)");
    let detalhe = await fachada.carregarDetalheTroca("TR005");
    console.log(`   podePropor: ${detalhe?.podePropor}, podeDecidir: ${detalhe?.podeDecidir}`);
    await fachada.fazerProposta("TR005", "C010");
    detalhe = await fachada.carregarDetalheTroca("TR005");
    for (const p of detalhe?.propostas ?? []) {
        console.log(`   ${p.idProposta}: ${p.jogadorOfertante} oferece ${p.carta.nome} (${p.status}${p.ehMinha ? ", minha" : ""})`);
    }

    console.log("\n4. Abrir a TR003 (minha): recusar o Brock e aceitar a Misty");
    detalhe = await fachada.carregarDetalheTroca("TR003");
    for (const p of detalhe?.propostas ?? []) {
        console.log(`   antes: ${p.idProposta} de ${p.jogadorOfertante} (${p.carta.nome}) ${p.status}`);
    }
    await fachada.rejeitarProposta("PR005");
    await fachada.aceitarProposta("PR004");
    detalhe = await fachada.carregarDetalheTroca("TR003");
    console.log(`   TR003 agora: ${detalhe?.troca.status}, podeDecidir: ${detalhe?.podeDecidir}`);
    for (const p of detalhe?.propostas ?? []) {
        console.log(`   depois: ${p.idProposta} de ${p.jogadorOfertante} ${p.status}`);
    }
    const livresDepois = await fachada.carregarCartasLivres();
    console.log("   Cartas livres:", livresDepois.map((c) => c.nome).join(", "), "(ganhou o Staryu)");

    console.log("\n5. Demo: o Gary faz uma proposta na minha TR006");
    await demo?.simularPropostaDeOutroJogador("TR006");
    const notificacoes = await fachada.carregarNotificacoes();
    console.log(`   Não lidas: ${notificacoes.naoVisualizadas}`);
    console.log(`   Mais recente: "${notificacoes.lista[0]?.mensagem}" (${notificacoes.lista[0]?.data})`);
    await fachada.marcarNotificacaoVisualizada(notificacoes.lista[0].idNotificacao);
    console.log(`   Não lidas depois de marcar uma: ${(await fachada.carregarNotificacoes()).naoVisualizadas}`);

    console.log("\n6. Histórico");
    for (const h of await fachada.carregarHistorico()) {
        console.log(`   ${h.dataCriacao} ${h.idTroca}: ${h.jogadorDono} (${h.cartaLeiloada}) <- ${h.jogadorOfertante} (${h.cartaOferecida}): ${h.status}`);
    }

    console.log("\n7. Ações inválidas (devem ser recusadas)");
    await fachada.carregarDetalheTroca("TR006");
    await fachada.carregarCartasLivres();
    try {
        await fachada.fazerProposta("TR006", "C011");
        console.log("   ERRO: deveria ter recusado a proposta na própria troca");
    } catch (erro) {
        console.log("   Propor na própria troca ->", (erro as Error).message);
    }
    try {
        await fachada.aceitarProposta("PR004");
        console.log("   ERRO: deveria ter recusado aceitar de novo");
    } catch (erro) {
        console.log("   Aceitar proposta de troca já concluída ->", (erro as Error).message);
    }

    console.log("\nFluxo completo.");
}

main().catch((erro) => {
    console.error("\nFALHOU:", erro);
    process.exit(1);
});
