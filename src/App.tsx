import React, { type FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonList from './components/pokemonList/PokemonList'
import './index.css'
import {useDispatch} from "react-redux";
import {PokemonTypes} from "./components/pokemon/Pokemon.types";
import {addPokemon} from "./store/Actions";
const App: FC = () => {
  const queryClient = new QueryClient()
  const dispatch = useDispatch()

  const savedPokemonList = localStorage.getItem('pokemonList');
  if (savedPokemonList) {
    const parsedPokemonList = JSON.parse(savedPokemonList);
    parsedPokemonList.forEach((pokemon: PokemonTypes) => {
      dispatch(addPokemon(pokemon));
    });
  }
  return (
    <>
      <div className="header">
        <h1 className="text">Pokedex</h1>
      </div>
      <QueryClientProvider client={queryClient}>
        <PokemonList limit={12}/>
      </QueryClientProvider>
    </>
  )
}

export default App
