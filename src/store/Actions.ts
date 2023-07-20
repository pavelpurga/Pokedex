import {PokemonTypes} from "../components/pokemon/Pokemon.types";

export const ADD_POKEMON = 'ADD_POKEMON';
export const REMOVE_POKEMON = 'REMOVE_POKEMON';
interface AddPokemonAction {
    type: typeof ADD_POKEMON,
    payload: PokemonTypes
}

interface RemovePokemonAction {
    type: typeof REMOVE_POKEMON;
    payload: PokemonTypes;
}

export const removePokemon = (pokemon: PokemonTypes): RemovePokemonAction => ({
  type: REMOVE_POKEMON,
  payload: pokemon,
});

export type PokemonActionTypes = AddPokemonAction | RemovePokemonAction;

export const addPokemon = (pokemon: PokemonTypes): AddPokemonAction => ({
  type: ADD_POKEMON,
  payload: pokemon
});
