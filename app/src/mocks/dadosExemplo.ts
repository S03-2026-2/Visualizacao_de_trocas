
import { Jogador } from '../models/Jogador';
import { Pokemon } from '../models/Pokemon';
import { Carta } from '../models/Carta';
import { Troca } from '../models/Troca';
import { Proposta } from '../models/Proposta';
import { Notificacao } from '../models/Notificacao';

export const ash = new Jogador(
    'ash@exemplo.com',
    'Ash'
);

export const misty = new Jogador(
    'misty@exemplo.com',
    'Misty'
);

export const brock = new Jogador(
    'brock@exemplo.com',
    'Brock'
);

export const pikachu = new Pokemon(
    '25',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
);

export const eevee = new Pokemon(
    '133',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png'
);

export const bulbasaur = new Pokemon(
    '1',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
);


export const cartaPikachu = new Carta(
    'C001',
    'Pikachu',
    'Eletrico',
    true,
    pikachu
);

export const cartaEevee = new Carta(
    'C003',
    'Eevee',
    'Normal',
    true,
    eevee
);

export const cartaBulbasaur = new Carta(
    'C002',
    'Bulbasaur',
    'Planta',
    true,
    bulbasaur
);

export const trocaPikachu = new Troca(
    'TR003',
    ash,
    cartaPikachu,
    new Date('2026-11-12T10:00:00.000Z'),
    'Aberta'
);

export const propostaEevee = new Proposta(
    'PR004',
    'TR003',
    misty,
    cartaEevee,
    new Date('2026-11-12T15:00:00.000Z'),
    'Aberta'
);

export const notificacaoProposta = new Notificacao(
    'NT002',
    'Misty fez uma proposta na sua troca TR003',
    new Date('2026-11-12T15:00:00.000Z'),
    false
);

ash.adicionarNotificacao(notificacaoProposta);