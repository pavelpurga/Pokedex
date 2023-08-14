import {AnyAction} from "redux";
import { combineReducers } from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ThunkAction, Action, configureStore} from '@reduxjs/toolkit'
import {pokemonAPI} from "../api/PokemonApi";
import pokemonReducer from './PokemonSlice'
import {postsAPI} from "../api/PostsApi";
import postsReducer from './PostSlice';

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
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, Action<string>, AnyAction>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;