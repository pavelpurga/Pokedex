import React, { type FC } from 'react'
import PokemonList from './pages/PokemonList'
import './styles/index.css'
import {useTypedDispatch} from "./store/store";
import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import {PostsTypes} from "./entitysData/models/Posts.types";
import {PokemonTypes} from "./entitysData/models/Pokemon.types";
import {addPokemon} from "./store/Pokemon/PokemonSlice";
import {addPost} from "./store/Post/PostSlice";
import {ROUTES} from "./entitysData/constants/API_ROUTS";
import AddMovie from "./pages/AddMovie";

const App: FC = () => {
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
      <Routes>
        <Route path={ROUTES.ABOUT} element={<About/>}/>
        <Route path={ROUTES.POKEMON_LIST} element={<PokemonList/>}/>
        <Route path={ROUTES.POSTS} element={<Posts/>}/>
        <Route path={ROUTES.ADD_MOVIE} element={<AddMovie/>}/>
        <Route path='/' element={<About/>}/>
      </Routes>
    </>
  )
}

export default App