import {ADD_POKEMON, PokemonActionTypes, REMOVE_POKEMON} from "./Actions";
import { PokemonTypes } from "../components/pokemon/Pokemon.types";

export interface PokemonState {
  pokemonList: PokemonTypes[];
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
  case REMOVE_POKEMON:
    return {
      ...state,
      pokemonList: state.pokemonList.filter(pokemon => pokemon.id !== action.payload.id),
    };
  default:
    return state;
  }
}