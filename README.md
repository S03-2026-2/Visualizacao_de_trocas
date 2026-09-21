# Visualização de Trocas

## Descrição

A funcionalidade de **Visualização de Trocas** permite que jogadores autenticados consultem as trocas disponíveis e o histórico de trocas realizadas no sistema.

O sistema apresenta informações relacionadas às trocas entre jogadores, incluindo as cartas envolvidas, os jogadores participantes, o status da negociação e a data de criação da troca.

Além da consulta, o sistema permite acompanhar notificações relacionadas às negociações e visualizar detalhes das cartas envolvidas.

## Atores

A funcionalidade possui interação com os seguintes atores e sistemas:

- **Jogador:** usuário responsável por consultar as trocas e seu histórico.
- **Sistema de Jogador:** responsável pelas operações relacionadas ao cadastro e autenticação.
- **Visualização de Cartas:** fornece os detalhes das cartas envolvidas nas trocas.
- **Poke API:** utilizada como apoio para obtenção de informações relacionadas às cartas/Pokémon.
- **Sistema Broker:** responsável pela comunicação e envio de notificações relacionadas às trocas.
- **Sistema de Trocas:** responsável pelo gerenciamento das operações de troca.

## Pré-requisitos

Para utilizar a funcionalidade:

- O jogador deve possuir cadastro no sistema;
- O jogador deve estar autenticado;
- O jogador deve possuir acesso à funcionalidade de trocas;
- Devem existir registros de trocas para que possam ser consultados.

## Funcionalidades

### Consultar disponibilidade de trocas

O jogador pode consultar as trocas disponíveis no sistema.

O sistema verifica a disponibilidade das cartas envolvidas antes de apresentar ou permitir a continuidade de uma negociação.

### Ver detalhes de uma carta em troca

O jogador pode consultar informações sobre uma carta que esteja envolvida em uma troca.

A visualização apresenta os dados da carta, como:

- Identificador da carta;
- Nome;
- Tipo;
- Disponibilidade.

### Ver histórico de trocas

O jogador pode consultar seu histórico de trocas.

O histórico é composto pelos registros de `Troca` associados ao jogador e permite acompanhar negociações anteriores e seus respectivos dados.

Cada troca pode apresentar:

- Identificador da troca;
- Jogador solicitante;
- Jogador destinatário;
- Carta oferecida;
- Carta solicitada;
- Status da troca;
- Data de criação.

### Notificações

O sistema pode notificar o jogador sobre eventos relacionados às trocas.

Entre eles estão:

- Nova troca requisitada;
- Troca disponível;
- Atualizações relacionadas à negociação.

As notificações possuem um identificador, uma mensagem, uma data e a informação de terem sido ou não visualizadas.

## Fluxo Principal

1. O jogador realiza seu cadastro, caso ainda não possua uma conta.
2. O jogador efetua login no sistema.
3. O jogador acessa a funcionalidade de visualização de trocas.
4. O sistema consulta as trocas relacionadas ao jogador.
5. O jogador pode consultar a disponibilidade das trocas.
6. O sistema apresenta os dados das trocas encontradas.
7. O jogador pode visualizar os detalhes das cartas envolvidas.
8. O jogador também pode acessar seu histórico de trocas.
9. Quando necessário, o sistema envia notificações relacionadas às negociações.

## Estrutura das Trocas

Uma troca é representada pela entidade `Troca`, que possui os seguintes dados:

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `idTroca` | String | Identificador da troca |
| `jogadorSolicitante` | Jogador | Jogador que iniciou a troca |
| `jogadorDestino` | Jogador | Jogador que recebeu a solicitação |
| `cartaOferecida` | Carta | Carta oferecida pelo solicitante |
| `cartaSolicitada` | Carta | Carta desejada na negociação |
| `status` | String | Estado atual da troca |
| `dataCriacao` | Date | Data de criação da troca |

## Relacionamentos

O sistema estabelece os seguintes relacionamentos principais:

- Um **Jogador** pode participar de diversas trocas;
- Uma **Troca** possui uma carta oferecida;
- Uma **Troca** possui uma carta solicitada;
- Um **Jogador** possui um histórico de trocas;
- Uma **Troca** pode gerar notificações;
- As **Cartas** possuem um estado de disponibilidade utilizado durante as negociações.

## Resultado Esperado

Ao utilizar a funcionalidade, o jogador consegue visualizar de forma organizada as trocas disponíveis e seu histórico de negociações.

O sistema permite identificar quem participa da troca, quais cartas estão sendo negociadas, o status da operação e quando a troca foi criada, além de fornecer acesso aos detalhes das cartas e às notificações relacionadas ao processo.
