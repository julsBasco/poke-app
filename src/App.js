import  { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import './app.css'

function App() {
  const [page, setPage] = useState({start: 1, end: 10})
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(true)

  let baseURL = 'https://pokeapi.co/api/v2/'

  const getData = useCallback(async (query) => {
    const res = await axios.get(`${baseURL}pokemon/${query}`)
    const  { id, name, sprites } = res.data
    const pokemonData = {
      id,
      name,
      sprites
    }
    return pokemonData
  }, [baseURL])

  const genaratePokemonCollection = useCallback(async () => {
    let pokemonCollection = []
    let pokemonFormattedCollection = []

    for (let i = 1; i <= 30; i++) {
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
  }, [getData])

  const nextPageHandler = () => {
    const newPage = {
      start: page.start + 10,
      end: page.end + 10
    }
    
    setPage(newPage)
  }

  const prevPageHandler = () => {
    const newPage = {
      start: page.start - 10,
      end: page.end - 10
    }
    
    setPage(newPage)
  }

  const slicePokemonList = () => {
    return pokemonList.slice(page.start -1, page.end)
  }

  useEffect(() => {
    genaratePokemonCollection()
  })

  return (
    <div className='app'>
      {loading && <div className='loader'>
          <h1>PokeDex</h1>
          <div class="loadingio-spinner-spinner-f4luciuyvbi"><div class="ldio-j5wtyjca40m">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div></div>
          <h3>Please wait while we connect to the pokemon servers . . .</h3>
        </div>
      }
      {!loading && 
        <>
          <table>
            <thead>
              <tr>
                <th>
                  Picture
                </th>
                <th>
                  Id number
                </th>
                <th>
                  Name
                </th>
              </tr>
            </thead>
            
            <tbody>
              {slicePokemonList()}
            </tbody>
          </table>
          <div className='mobile-button-group'>
            <option disabled={page.start === 1} onClick={prevPageHandler} className='button-primary'>PREV</option>
            <option disabled={page.end === 30} onClick={nextPageHandler} className='button-primary'>NEXT</option>
          </div>
        </>
      }
    </div>
  );
}

export default App;
