import React, { type FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonList from './components/pages/PokemonList'
import './index.css'
import {PokemonTypes} from "./models/Pokemon.types";
import {addPokemon} from "./store/PokemonActions";
import {useTypedDispatch} from "./store/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "./components/pages/About";
import Posts from "./components/pages/Posts";
import {addPost} from "./store/PostActions";
import {PostsTypes} from "./models/Posts.types";

const App: FC = () => {
  const queryClient = new QueryClient()
  const dispatch = useTypedDispatch()
  const savedPokemonList = localStorage.getItem('pokemonList');
  const savedPostList = localStorage.getItem('postList');

  if (savedPostList) {
    const parsedPostList = JSON.parse(savedPostList);
    if (Array.isArray(parsedPostList)){
      parsedPostList.forEach((post :PostsTypes) => {
        dispatch(addPost(post));
      })
    } else {
      console.log('not array')
    }
  }

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