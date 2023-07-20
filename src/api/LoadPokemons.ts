import {fetchPokemonListLoad} from "./Api";
import axios from "axios";
import {PokemonTypes} from "../components/pokemon/Pokemon.types";

export const loadPokemonData = async (limit:number,offset:number) => {
  const data = await fetchPokemonListLoad(limit, offset);
  const promise = data?.results.map(async (result:any) => {
    const response = await axios.get(result.url);
    const pokemonData = await response.data;
    const types = pokemonData.types.map(({type}: {
        type: { name: string } }) => type.name)
    const stats = pokemonData.stats.map(({ base_stat }: {
        base_stat: number }) => base_stat);
    const moves = pokemonData.moves.map(({ move }: {
        move: { name: string } }) => move.name);

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      types,
      stats,
      moves,
      image: pokemonData.sprites.front_default
    } as PokemonTypes
  })

  const pokemons = await Promise.all(promise)
  return pokemons;
}