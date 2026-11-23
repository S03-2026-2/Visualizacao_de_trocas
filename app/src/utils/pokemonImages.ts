
const pokemonIds: Record<string, number> = {
  pikachu: 25,
  eevee: 133,
  bulbasaur: 1,
  charmander: 4,
  kakuna: 14,
  ditto: 132
};

export function buscarImagemPokemon(nome: string): string | null {
  const id = pokemonIds[nome.trim().toLowerCase()];

  if (!id) return null;

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
