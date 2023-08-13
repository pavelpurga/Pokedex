import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import axios from "axios";
import {PokemonTypes} from "../entity'sData/models/Pokemon.types";

export const pokemonAPI = createApi({
  reducerPath: "pokemonAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (build) => ({
    fetchAllPokemon: build.query<PokemonTypes[], { limit?: number; offset?: number }>({
      query: ({ limit = 12, offset = 0 }) => ({
        url: "/pokemon",
        params: { limit, offset },
      }),
      transformResponse: async (response: any) => {
        const {  results } = response;
        const pokemonWithDetails = await Promise.all(
          results.map(async (pokemon: any) => {
            const detailResponse = await axios.get(pokemon.url);
            const detail = await detailResponse.data;
            const types = detail.types.map(({type}: {
                type: { name: string } }) => type.name)
            const stats = detail.stats.map(({ base_stat }: {
                base_stat: number }) => base_stat);
            const moves = detail.moves.map(({ move }: {
                move: { name: string } }) => move.name);
            return {
              id: detail.id,
              name: detail.name,
              types,
              stats,
              moves,
              image: detail.sprites.front_default,
            };
          })
        );
        return pokemonWithDetails;
      },
    }),
  }),
});