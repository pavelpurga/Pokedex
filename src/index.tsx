import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {persistor, store} from "./store/store";
import {addPokemon} from "./helpers/Actions";
import {Pokemon} from "./components/pokemon/Pokemon";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const savedPokemonList = localStorage.getItem('pokemonList');
if (savedPokemonList) {
  const parsedPokemonList = JSON.parse(savedPokemonList);
  parsedPokemonList.forEach((pokemon: Pokemon) => {
    store.dispatch(addPokemon(pokemon));
  });
}
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
