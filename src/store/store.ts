import {AnyAction,} from "redux";
import { combineReducers } from "redux";
import {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {PokemonActionTypes} from "./PokemonActions";
import {ThunkAction, Action, configureStore} from '@reduxjs/toolkit'
import {pokemonAPI} from "../api/PokemonApi";
import pokemonReducer from './PokemonReducers'
import {postsAPI} from "../api/PostsApi";
import postsReducer from '../store/PostReducers';
import {PostActionsTypes} from "./PostActions";

const rootReducer = combineReducers({
  reducer: pokemonReducer,
  postReducer : postsReducer,
  [pokemonAPI.reducerPath]: pokemonAPI.reducer,
  [postsAPI.reducerPath]: postsAPI.reducer
});

export const setupStore = () => {
  return  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware).concat(postsAPI.middleware),
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<RootState, PokemonActionTypes, AnyAction>;
export type TypeDispatch = ThunkDispatch<RootState, PostActionsTypes, AnyAction>
export type TypedThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    PokemonActionTypes,
    Action<string>
>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;