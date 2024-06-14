import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import pokemonDataSlice from "../features/pokemon-data/pokemonDataSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    pokemonDataSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
