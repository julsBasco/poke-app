import  { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [page, setPage] = useState({start: 1, end: 10})
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(true)

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

    for (let i = page.start; i <= page.end; i++) {
      let response = await getData(i)
      pokemonCollection.push(response)
    }

    pokemonFormattedCollection = pokemonCollection.map(item => {
      return(
        <tr key={item.name + item.id}>
          <td>
            <img src= {item.sprites.front_default} alt={item.name} />
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
    setLoading(false)
  }

  const nextPageHandler = () => {
    const newPage = {
      start: page.start + 10,
      end: page.end + 10
    }
    setLoading(true)
    setPage(newPage)
  }

  useEffect(() => {
    genaratePokemonCollection()
  }, [page])

  return (
    <div>
      {loading && <h1>loading . . . </h1>}
      {!loading && 
        <>
          <button onClick={nextPageHandler}>next</button>
          <table>
            <thead>
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
            </thead>
            
            <tbody>
              {pokemonList}
            </tbody>
          </table>
        </>
      }
    </div>
  );
}

export default App;
