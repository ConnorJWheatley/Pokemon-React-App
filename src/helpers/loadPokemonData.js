import { getPokemon } from "../services/pokemonApiService";

export default async function loadPokemonData(data) {
  let pokemonData = await Promise.all(
    data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);

      delete pokemonRecord.moves;
      //console.log(pokemonRecord)
      return pokemonRecord;
    }
  ));

  return pokemonData;
}