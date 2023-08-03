import React, { type FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonList from './components/pages/PokemonList'
import './index.css'
import {PokemonTypes} from "./components/pokemon/Pokemon.types";
import {addPokemon} from "./store/Actions";
import {useTypedDispatch} from "./store/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "./components/pages/About";
import Posts from "./components/pages/Posts";

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

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/about' element={<About/>}/>
            <Route path='/pokemonList' element={<PokemonList/>}/>
            <Route path='/posts' element={<Posts/>}/>
            <Route path="/" element={<About/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App