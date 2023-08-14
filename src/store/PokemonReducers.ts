import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {PokemonTypes} from "../entitysData/models/Pokemon.types";


interface PokemonState {
    pokemonList: PokemonTypes[];
    loading: boolean;
    error: string;
}

const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
  error: '',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: initialState,
  reducers: {
    addPokemon(state, action: PayloadAction<PokemonTypes>) {
      state.pokemonList.push(action.payload);
    },
    removePokemon(state, action: PayloadAction<number>) {
      state.pokemonList = state.pokemonList.filter(pokemon => pokemon.id !== action.payload);
    },
  },
});

export const { addPokemon, removePokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;