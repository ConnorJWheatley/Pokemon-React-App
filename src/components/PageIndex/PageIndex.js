import React, { useState, useEffect } from 'react';
import loadPokemonData from '../../helpers/loadPokemonData';
import loadingGif from '../../assets/images/pikachu_running.gif';
import { getGroupOfPokemon } from '../../services/pokemonApiService';
import { useDispatch, useSelector } from 'react-redux';
import { updatePokemonData } from '../../features/pokemon-data/pokemonDataSlice'
import './PageIndex.css'

function PageIndex() {
  // Setting states for buttons used to navigate cards
  const [previousPageBtnDisabled, setPreviousPageBtnDisabled] = useState(true);
  const [nextPageBtnDisabled, setNextPageBtnDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // don't think this needs to used here, only saved through a dispatch
  // const pokemonData = useSelector((state) => state.pokemonDataSlice.pokemonData);
  const nextUrl = useSelector((state) => state.pokemonDataSlice.nextUrl);
  const previousUrl = useSelector((state) => state.pokemonDataSlice.previousUrl);

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

  const PageNavigation = () => {
    const buttons = [];
    let newPageNumber = -2
  
    for (let i = 1; i <= 5; i++) {
      let pageNumber;
      if (currentPage < 3) {
        pageNumber = i;
      } else {
        pageNumber = parseInt(newPageNumber) + parseInt(currentPage);
      }
      buttons.push(
        <button 
          onClick={numberedPage} 
          key={pageNumber} 
          value={pageNumber}
        >
          {pageNumber}
        </button>
      )
      newPageNumber++;
    }

    return buttons;
  }

  const nextPage = async () => {
    setLoading(true);
    let response = await getGroupOfPokemon(nextUrl);
    let pokemonData = await loadPokemonData(response.results);
    dispatch(updatePokemonData([pokemonData, response.next, response.previous]))
    setCurrentPage(parseInt(currentPage) + 1);
    setLoading(false);
  }

  const previousPage = async () => {
    setLoading(true);
    let response = await getGroupOfPokemon(previousUrl);
    let pokemonData = await loadPokemonData(response.results);
    dispatch(updatePokemonData([pokemonData, response.next, response.previous]))
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
    let response = await getGroupOfPokemon(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
    let pokemonData = await loadPokemonData(response.results);
    dispatch(updatePokemonData([pokemonData, response.next, response.previous]))
    setCurrentPage(pageNumber)
    setLoading(false);
  }

  return (
    <>
      {
        loading ? 
          <div className='loading-gif-div'>
            <img className='loading-gif' src={loadingGif}/>
          </div> : (
            <div className='btn'>
              <button disabled={previousPageBtnDisabled} onClick={previousPage}>
                Previous Page
              </button>
              <PageNavigation />
              <button disabled={nextPageBtnDisabled} onClick={nextPage}>
                Next Page
              </button>
            </div>
        )
      }
    </>
  );
}

export default PageIndex;