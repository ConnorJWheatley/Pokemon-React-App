import './PokemonDataPage.css'
import Card from '../components/Card'
import PageIndex from '../components/PageIndex/PageIndex';
import React from 'react';
import usePokemonAPIData from '../hooks/usePokemonAPIData';

export default function PokemonDataPage() {
  // API to fetch data from
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const [pokemonData, loading] = usePokemonAPIData(initialUrl);

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