import './PokemonDataPage.css'
import Card from '../components/Card'
import loadPokemonData from '../helpers/loadPokemonData';
import PageIndex from '../components/PageIndex/PageIndex';
import React, { useEffect, useState } from 'react';
import { getGroupOfPokemon } from '../services/pokemonApiService'
import { useDispatch, useSelector } from 'react-redux';
import { updatePokemonData } from '../features/pokemon-data/pokemonDataSlice';

export default function PokemonDataPage() {
  const [loading, setLoading] = useState(true);

  // API to fetch data from
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';

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

  return (
    <>
      {
        loading ? <h1>Loading...</h1> : (
          <main>
            <PageIndex />
            <div className='grid-container'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon}/>
              })}
            </div>
            <PageIndex />
          </main>
        )
      }
    </>
  )
}