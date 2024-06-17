import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupOfPokemon } from '../services/pokemonApiService';
import { updatePokemonData } from '../features/pokemon-data/pokemonDataSlice';
import loadPokemonData from '../helpers/loadPokemonData';

export default function usePokemonAPIData(initialUrl) {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const pokemonData = useSelector((state) => state.pokemonDataSlice.pokemonData);

  useEffect (() => {
    async function fetchData() {
      setLoading(true);
      let response = await getGroupOfPokemon(initialUrl);
      let pokemonData = await loadPokemonData(response.results);
      console.log(pokemonData)
      dispatch(updatePokemonData([pokemonData, response.next, response.previous]))
      setLoading(false);
    }
    fetchData();
  }, []);

  return [pokemonData, loading];
}