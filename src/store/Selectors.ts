import { PokemonTypes } from "../components/pokemon/Pokemon.types";
import { RootState } from "./store";

export const selectPokemonList = (state: RootState)
    : PokemonTypes[] => state.pokemon.pokemonList;