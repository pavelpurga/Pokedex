import { createAction } from '@reduxjs/toolkit';
import {PokemonTypes} from "../entity'sData/models/Pokemon.types";

export const addPokemon = createAction('ADD_POKEMON', (pokemon: PokemonTypes) => ({
  payload: pokemon
}));

export const removePokemon = createAction('REMOVE_POKEMON', (pokemonId: number) => ({
  payload: pokemonId
}));

export type PokemonActionTypes = ReturnType<typeof addPokemon | typeof removePokemon>;