import { Pokemon } from "../components/pokemon/Pokemon";
import { RootState } from "../store/store";

export const selectPokemonList = (state: RootState)
    : Pokemon[] => state.pokemon.pokemonList;