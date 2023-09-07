import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getPokemon, getAllPokemon } from './services/pokeService'
import PokemonList from '../src/pages/pokemonList'
import './App.css';
import { Heading } from './components/Heading';
import { DetailsView } from './components/DetailsView';

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [loading, isLoading] = useState(true)
  const apiURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(apiURL)
      await loadPokemon(response.results)
      isLoading(false)
      console.log(response)
    }
    fetchData()
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonGet = await getPokemon(pokemon)
      return pokemonGet

    }))
    setPokemonData(_pokemonData)
  }

  return (
    <>
    <Router>
    <Heading />
      <div className='gridContainer'>
        {loading ? <h1>Loading...</h1> : (
          <Route exact path='/'>
            {pokemonData.map((pokemon, i) => {
              return <PokemonList key={i} pokemon={pokemon} />
            })}
          </Route>
          
        )}
      </div>
      <Route path="/:pokemonName" component={DetailsView} />
    </Router>
    </>
  );
}

export default App;