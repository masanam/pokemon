import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getPokemon, getAllPokemon } from './../../services/pokeService'
import pokeColor from './../../pages/pokeColor'


function DetailsView() {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState([])
  const [loading, isLoading] = useState(true)
  const apiURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(apiURL)
      await loadPokemon(response.results)
      isLoading(false)
    //   console.log(response)
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
	<div className='pokeType' style={{ backgroundColor: pokeColor[pokemonName] }}>
    <div className='pokeName'>
	   {pokemonName}
	</div>
	</div>

);


}

export default DetailsView;