import { ADD_POKEMON, PokemonActionTypes } from "./Actions";
import { Pokemon } from "../components/pokemon/Pokemon";

export interface PokemonState {
  pokemonList: Pokemon[];
}

const initialState: PokemonState = {
  pokemonList: [],
};

export const pokemonReducer = (state = initialState, action: PokemonActionTypes): PokemonState => {
  switch (action.type) {
  case ADD_POKEMON:
    return {
      ...state,
      pokemonList: [...state.pokemonList, action.payload]
    };
  default:
    return state;
  }
}