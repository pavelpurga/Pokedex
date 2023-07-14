import {Pokemon} from "../components/pokemon/Pokemon";

export const ADD_POKEMON = 'ADD_POKEMON';

interface AddPokemonAction {
    type: typeof ADD_POKEMON,
    payload: Pokemon
}

export type PokemonActionTypes = AddPokemonAction;

export const addPokemon = (pokemon: Pokemon): AddPokemonAction => ({
  type: ADD_POKEMON,
  payload: pokemon
});