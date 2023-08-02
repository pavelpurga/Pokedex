import {AnyAction,} from "redux";
import { combineReducers } from "redux";
import {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {PokemonActionTypes} from "./Actions";
import {ThunkAction, Action, configureStore} from '@reduxjs/toolkit'
import {pokemonAPI} from "../api/Api";
import pokemonReducer from '../store/Reducers'

const rootReducer = combineReducers({
  reducer: pokemonReducer,
  [pokemonAPI.reducerPath]: pokemonAPI.reducer
});

export const setupStore = () => {
  return  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware)
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<RootState, PokemonActionTypes, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    PokemonActionTypes,
    Action<string>
>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;