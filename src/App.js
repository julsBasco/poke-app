import  { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [pokemonList, setPokemonList] = useState([])

  let baseURL = 'https://pokeapi.co/api/v2/'

  const getData = async (query) => {
    const res = await axios.get(`${baseURL}pokemon/${query}`)
    const  { id, name, sprites } = res.data
    const pokemonData = {
      id,
      name,
      sprites
    }
    return pokemonData
  }

  const genaratePokemonCollection = async () => {
    let pokemonCollection = []
    let pokemonFormattedCollection = []

    for (let i = 1; i <= 30; i++) {
      let response = await getData(i)
      pokemonCollection.push(response)
    }

    pokemonFormattedCollection = pokemonCollection.map(item => {
      return(
        <tr>
          <td>
            <img src= {item.sprites.front_default} />
           
          </td>
          <td>
            {item.id}
          </td>
          <td>
            {item.name}
          </td>
        </tr>
      )
    })
    setPokemonList(pokemonFormattedCollection)
  }



  useEffect(() => {
    genaratePokemonCollection()
  }, [])

  return (
    <div>
      <table>
        <tr>
          <th>
            picture
          </th>
          <th>
            id number
          </th>
          <th>
            name
          </th>
        </tr>
        {pokemonList}
      </table>
    </div>
  );
}

export default App;
