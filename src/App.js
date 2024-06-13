import './App.css';
import Card from './components/Card';
import Navbar from './components/Navbar';
import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './services/pokemon';

function App() {
  // Creating states for data related to API
  const [pokemonData, setPokemonData] = useState({});
  const [nextUrl, setNextUrl] = useState('');
  const [previousUrl, setPreviousUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)

  // Setting states for buttons used to navigate cards
  const [previousPageBtnDisabled, setPreviousPageBtnDisabled] = useState(true);
  const [nextPageBtnDisabled, setNextPageBtnDisabled] = useState(false);

  // API to fetch data from
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';

  useEffect (() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl)
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

  }, [nextUrl, previousUrl])

  const nextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPreviousUrl(data.previous);
    setCurrentPage(parseInt(currentPage) + 1);
    setLoading(false);
  }

  const previousPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(previousUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPreviousUrl(data.previous);
    setCurrentPage(parseInt(currentPage) - 1);
    setLoading(false);
  }

  const numberedPage = async (event) => {
    setLoading(true);
    let pageNumber = event.target.value;
    let offset;
    if (pageNumber > 1) {
      offset = (20 * pageNumber) - 20;
    } else {
      offset = 0;
    }
    let data = await getAllPokemon(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPreviousUrl(data.previous);
    setCurrentPage(pageNumber)
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

  // needs to run on a re-render - as the pokemon goes back to 1 but index does
  const PageIndexing = () => {
    const buttons = [];
    let newPageNumber = -2

    for (let i = 1; i <= 5; i++) {
      let pageNumber;
      if (currentPage < 3) {
        pageNumber = i;
      } else {
        // needs to use parseInt otherwise '+' concatenates the numbers instead
        pageNumber = parseInt(newPageNumber) + parseInt(currentPage);
      }
      buttons.push(
        <button onClick={numberedPage} key={pageNumber} value={pageNumber}>{pageNumber}</button>
      )
      newPageNumber++;
    }

    return buttons;

  }

  return (
    <div>
      <Navbar />
      {
        loading ? <h1>Loading...</h1> : (
          <>
            <div className="btn">
              <button disabled={previousPageBtnDisabled} onClick={previousPage}>Previous Page</button>
              <PageIndexing />
              <button disabled={nextPageBtnDisabled} onClick={nextPage}>Next Page</button>
            </div>
            <div className='grid-container'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon}/>
              })}
            </div>
            <div className="btn">
              <button onClick={previousPage}>Previous Page</button>
              <PageIndexing />
              <button onClick={nextPage}>Next Page</button>
          </div>
          </>
        )
      }
    </div>
  );
}

export default App;
