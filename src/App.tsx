import React, { type FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonList from './components/pokemonList/PokemonList'
import './index.css'
const App: FC = () => {
  const queryClient = new QueryClient()
  return (
    <>
      <div className="header">
        <h1 className="text">Pokedex</h1>
      </div>
      <div className="main">
        <QueryClientProvider client={queryClient}>
          <PokemonList limit={12}/>
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App
