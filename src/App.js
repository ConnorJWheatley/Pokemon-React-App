import './App.css';
import Card from './components/Card';
import Navbar from './components/Navbar';
import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './services/pokemon';

function App() {
  // Creating states for data related to API
  const [pokemonData, setPokemonData] = useState({});
  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const [previousPageBtnDisabled, setPreviousPageBtnDisabled] = useState(true);
  const [nextPageBtnDisabled, setNextPageBtnDisabled] = useState(false);

  // API to fetch data from
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';

  useEffect (() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl)
      console.log(response)
      setNextUrl(response.next);
      setPreviousUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect (() => {
    if (!nextUrl) {
      setNextPageBtnDisabled(true);
    } else {
      setNextPageBtnDisabled(false)
    }
    
    if (!previousUrl) {
      setPreviousPageBtnDisabled(true);
    } else {
      setPreviousPageBtnDisabled(false);
    }

  }, [pokemonData])

  const nextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPreviousUrl(data.previous);
    setLoading(false);
  }

  const previousPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(previousUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPreviousUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {

      /**
       * url for each pokemon that contains data for specific pokemon
       * e.g. https://pokeapi.co/api/v2/pokemon/1/ - this is bulbasaur
       */
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    }))

    setPokemonData(_pokemonData);
  };

  //console.log(pokemonData)
  return (
    <div>
      <Navbar />
      {
        loading ? <h1>Loading...</h1> : (
          <>
            <div className="btn">
              <button disabled={previousPageBtnDisabled} onClick={previousPage}>Previous Page</button>
              <button disabled={nextPageBtnDisabled} onClick={nextPage}>Next Page</button>
            </div>
            <div className='grid-container'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon}/>
              })}
            </div>
            <div className="btn">
              <button onClick={previousPage}>Previous Page</button>
              <button onClick={nextPage}>Next Page</button>
          </div>
          </>
        )
      }
    </div>
  );
}

export default App;
