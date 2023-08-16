import React, { type FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonList from './components/pages/PokemonList'
import './index.css'
import {useTypedDispatch} from "./store/store";
import {Route, Routes} from "react-router-dom";
import About from "./components/pages/About";
import Posts from "./components/pages/Posts";
import {PostsTypes} from "./entitysData/models/Posts.types";
import {PokemonTypes} from "./entitysData/models/Pokemon.types";
import {addPokemon} from "./store/PokemonSlice";
import {addPost} from "./store/PostSlice";
import {ROUTES} from "./entitysData/constants/API_ROUTS";

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
        <Routes>
          <Route path={ROUTES.ABOUT} element={<About/>}/>
          <Route path={ROUTES.POKEMON_LIST} element={<PokemonList/>}/>
          <Route path={ROUTES.POSTS} element={<Posts/>}/>
          <Route path={ROUTES.ABOUT} element={<About/>}/>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App