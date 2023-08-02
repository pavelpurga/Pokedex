import React, { type FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonList from './components/pokemonList/PokemonList'
import './index.css'
import {PokemonTypes} from "./components/pokemon/Pokemon.types";
import {addPokemon} from "./store/Actions";
import {useTypedDispatch} from "./store/store";
const App: FC = () => {
  const queryClient = new QueryClient()
  const dispatch = useTypedDispatch()

  const savedPokemonList = localStorage.getItem('pokemonList');
  if (savedPokemonList) {
    const parsedPokemonList = JSON.parse(savedPokemonList);
    if (Array.isArray(parsedPokemonList)) {
      parsedPokemonList.forEach((pokemon: PokemonTypes) => {
        dispatch(addPokemon(pokemon));
      });
    } else {
      console.log('not array');
    }
  }
  return (
    <>
      <div className="header">
        <h1 className="text">Pokedex</h1>
      </div>
      <QueryClientProvider client={queryClient}>
        <PokemonList />
      </QueryClientProvider>
    </>
  )
}

export default App