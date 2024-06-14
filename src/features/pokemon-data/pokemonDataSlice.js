import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemonData: {},
  nextUrl: '',
  previousUrl: ''
}

export const pokemonDataSlice = createSlice({
  name: 'pokemonData',
  initialState,
  reducers: {
      updatePokemonData: (state, action) => {
        const [pokemonData, nextUrl, previousUrl] = action.payload;
        state.pokemonData = pokemonData;
        state.nextUrl = nextUrl;
        state.previousUrl = previousUrl;
      }
  }
})

export const {updatePokemonData} = pokemonDataSlice.actions
export default pokemonDataSlice.reducer