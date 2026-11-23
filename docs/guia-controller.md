# Guia do Controller (para a View)

O Controller já funciona com dados simulados (mocks) e com a **PokeAPI real**. Este guia explica como as telas usam o Controller e o que falta construir na View para a demonstração.

## Como a View usa o Controller

A View **nunca** usa models, serviços ou mocks diretamente. Ela usa só dois tipos de hook:

**Consultas (dados para exibir).** Cada hook devolve `{ dados, carregando, erro }` e **se atualiza sozinho** quando chega um evento do Broker (Observer). Não é preciso recarregar nada manualmente.

```tsx
const { dados, carregando, erro } = useTrocasDisponiveis();
if (carregando && !dados) return <p>Carregando...</p>;
if (erro) return <p>{erro}</p>;
return dados!.map((troca) => <TrocaCard key={troca.idTroca} ... />);
```

**Ações (botões).** Use `useAcao` com a fachada:

```tsx
const { fachada } = useControlador();
const { executar, executando, erro } = useAcao();
<button disabled={executando} onClick={() => executar(() => fachada.aceitarProposta(idProposta))}>
  Aceitar
</button>
{erro && <p>{erro}</p>}
```

Depois de uma ação, **não é preciso atualizar a tela**: o resultado chega como evento e os hooks de consulta recarregam sozinhos.

## Hooks de consulta

| Hook | Devolve | Para a tela |
|---|---|---|
| `useTrocasDisponiveis()` | `TrocaVisual[]`: trocas abertas de outros jogadores | Trocas |
| `useMinhasTrocasAbertas()` | `TrocaVisual[]`, com `quantidadePropostasAbertas` | Trocas |
| `useDetalheTroca(idTroca)` | `DetalheTrocaVisual`: troca, propostas, `podeDecidir`, `podePropor` | Detalhe da troca |
| `useCartasLivres()` | `CartaVisual[]`: cartas do jogador que podem ser ofertadas | Criar troca / fazer proposta |
| `useHistorico()` | `ItemHistoricoVisual[]`, já no formato das props do `TrocaCardHistorico` | Histórico |
| `useNotificacoes()` | `{ lista, naoVisualizadas }` | Popup e contador de notificações |

Os formatos estão em `app/src/services/fachada/tiposVisualizacao.ts`. Os textos já vêm prontos: datas formatadas, tipo do Pokémon em português e `imagem` com a URL da arte oficial da PokeAPI.

## Ações da fachada (`useControlador().fachada`)

| Método | Quando mostrar o botão |
|---|---|
| `criarTroca(idCarta)` | Tela "Criar troca", com uma carta escolhida de `useCartasLivres()` |
| `fazerProposta(idTroca, idCarta)` | No detalhe, se `podePropor` |
| `aceitarProposta(idProposta)` | No detalhe, se `podeDecidir` e a proposta está `Aberta` |
| `rejeitarProposta(idProposta)` | No detalhe, se `podeDecidir` e a proposta está `Aberta` |
| `cancelarTroca(idTroca)` | No detalhe, se `podeDecidir` |
| `cancelarProposta(idProposta)` | No detalhe, se `proposta.ehMinha` e está `Aberta` |
| `marcarNotificacaoVisualizada(idNotificacao)` | No popup, em notificações não visualizadas |

**Só para a demonstração:** `useControlador().demo?.simularPropostaDeOutroJogador(idTroca)` faz o jogador fictício **Gary** enviar uma proposta. Coloque um botão no detalhe das **minhas** trocas abertas para mostrar a tela e as notificações se atualizando sozinhas.

## O que falta construir na View

1. **Trocas:** trocar o array de exemplo por `useMinhasTrocasAbertas()` e `useTrocasDisponiveis()` (duas seções), com um botão "Criar troca", e tornar o `TrocaCard` clicável para abrir o detalhe.
2. **Detalhe da troca** (nova): imagem/nome/tipo da carta, dono, data, status, lista de propostas com os botões da tabela acima e, se `podePropor`, um seletor de carta com o botão "Enviar proposta".
3. **Criar troca** (nova): seletor de carta (`useCartasLivres()`) com o botão "Criar troca".
4. **Componente de carta** (novo): imagem + nome + tipo, reutilizado no detalhe, nas propostas e nos seletores.
5. **Histórico:** trocar o array de exemplo por `useHistorico()`. Os itens já têm as props do `TrocaCardHistorico`.
6. **Notificações:** trocar o array por `useNotificacoes()`, com um botão "Marcar como lida" e o contador `naoVisualizadas` no botão do topo (`App.tsx`).
7. **Bug no `TrocaCard.tsx`, linha 23:** `status.toLocaleLowerCase` está sem `()`, então a classe CSS do status não é aplicada. Faltam também as classes `.aberta` e `.concluida` no `TrocaCard.css`.

## Roteiro da demonstração (jogador logado: Ash)

1. **Trocas:** Ash tem a troca TR003 (Pikachu) aberta, com 2 propostas. Disponíveis: TR004 (Bulbasaur, do Brock) e TR005 (Eevee, da Misty).
2. **Criar troca:** escolher o Squirtle → a TR006 aparece em "Minhas trocas".
3. **Abrir TR005 (da Misty):** ver a carta e as propostas; propor o Gengar → a proposta aparece na lista.
4. **Abrir TR003 (minha):** recusar a proposta do Brock (Onix) e aceitar a da Misty (Staryu) → a troca fica "Concluida", e o Staryu passa para as cartas do Ash.
5. **Abrir TR006 (minha):** "Simular proposta (demo)" → a proposta do Gary aparece sozinha e chega uma notificação nova.
6. **Notificações e Histórico:** mostrar o que mudou.

Recarregar a página volta tudo ao estado inicial, o que permite ensaiar quantas vezes for preciso.

## Testar o Controller sem as telas

Dentro da pasta `app`:

    npx tsx scripts/teste-fluxo.ts

O script segue esse mesmo roteiro chamando a fachada e mostra cada passo e cada evento no terminal. Se o script funciona mas a tela não, o problema está na View. Se o script também falha, o problema está no Controller.

## Onde fica cada coisa (`app/src/`)

| Pasta | Conteúdo |
|---|---|
| `services/comunicacao/` | Contratos (`Comunicador`, `ApiConsultas`, `Evento`) e mocks (`BackendMock` simula os outros grupos) |
| `services/pokeapi/` | Conexão com a PokeAPI (com cache e reserva se a internet falhar) |
| `services/servicos/` | `ServicoGenerico` (Factory Method), `ServicoTrocas`, `ServicoPropostas`, `ServicoCartas`, `ServicoNotificacoes` |
| `services/fachada/` | `FachadaVisualizacao` (Facade) e os tipos que a View recebe |
| `services/montarControlador.ts` | Único lugar que escolhe mock ou sistema real |
| `hooks/` | `useControlador`, `useConsulta` (Observer), `useAcao` e os hooks de consulta |
