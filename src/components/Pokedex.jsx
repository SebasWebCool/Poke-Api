import axios from 'axios'
import React, { useEffect, useState } from 'react'
import nameTrainerSlice from '../store/slices/nameTrainer.slice'
import PokemonCard from './Pokedex/PokemonCard'
import { useSelector } from 'react-redux'
import SelectType from './SelectType'
import PaaginationSElect from './Pokedex/Pagination/PaaginationSElect'
const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [selectType, setSelectType] = useState("All")

  const [pokemonsShows, setpokemonsSho] = useState(20)
  const [currentPage, setcurrentPage] = useState(1)
  const [totalPokemons, setTotalPokemons] = useState()

  const [next, setNext] = useState()
  const [changePage, setChangePage] = useState("a")


  const indexOfLastPost = currentPage * pokemonsShows
  const indexOfFirsPost = indexOfLastPost - pokemonsShows

  const url = "https://pokeapi.co/api/v2/pokemon/"

  useEffect(() => {
    if (pokeSearch || selectType !== "All") {
      if (pokeSearch) {

        let url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`

        const obj = {
          results: [{ url }]
        }
        setPokemons(obj)
      } else {

        const url = `https://pokeapi.co/api/v2/type/${selectType}/`
        axios.get(url)
          .then(res => {
            const arr = res.data.pokemon.map(e => e.pokemon)
            setTotalPokemons(arr)
            setPokemons({ results: arr })
          })
          .catch(err => console.log(err))
      }

    }
    else {
      if (changePage != "a") {

        if (changePage == "b") {
          axios.get(next?.next)
            .then(res => {
              setPokemons(res.data)
              setNext(res.data)
              setChangePage(false)
            })
            .catch((err => console.log(err)))
        } else if (changePage == "c") {
          axios.get(next?.previous)
            .then(res => {
              setPokemons(res.data)
              setNext(res.data)
              setChangePage(false)
            })
            .catch((err => console.log(err)))
        }
      } else if (changePage == "a") {
        axios.get(url)
          .then(res => {
            setPokemons(res.data)
            setNext(res.data)
          }
          )
          .catch(err => console.log(err))
      }
    }
  }, [pokeSearch, selectType, changePage])

  console.log(next);

  const NextPage = () => {
    setChangePage("b")
  }
  const PreviousPage = () => {
    setChangePage("c")
  }

  const handleSubmit = e => {
    e.preventDefault()
    const pokeName = e.target.searchText.value.trim().toLowerCase()
    setPokeSearch(pokeName)
    setSelectType("All")
    e.target.searchText.value = ""
  }

  const nameTrainer = useSelector(state => state.nameTrainer)

  // console.log(selectType)

  const paginate = (pageNumber) => {
    setcurrentPage(pageNumber)
  }
  // console.log(currentPage);
  const pokesShow = pokemons?.results.slice(indexOfFirsPost, indexOfLastPost)


  return (


    <div>
      <header className='pokedex_header'>
        <div className="pokedex_top  logo">
          <img src="https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png" alt="Pokeball" />
        </div>

        <div className="pokedex_top ball">
          <div className='pokedex_ball '>
            <div className="pokedex_ball_center"></div>
          </div>
        </div>
      </header>
      <main className='pokedex_main'>

        <div className="pokedex_welcome">
          <h3> <span>Welcome {nameTrainer},</span>  here you can find your pokemon</h3>
          <div className='pokedex__serch__selec'>

            <form className='pokedex__form' action="" onSubmit={handleSubmit}>
              <input type="text" id='searchText' />
              <button>Search</button>
            </form>

            <SelectType setcurrentPage={setcurrentPage} setPokeSearch={setPokeSearch} selectType={selectType} setSelectType={setSelectType} />

          </div>

        </div>

        <div className='cont_cards'>
          {

            pokesShow?.map(pokemon => <PokemonCard url={pokemon.url} key={pokemon.name} />)
          }
        </div>
      </main>
      <footer className='pokedex_footer'>

        {
          selectType != "All" ? <PaaginationSElect pokemonsShows={pokemonsShows} totalPokemons={totalPokemons?.length} paginate={paginate} /> : ""
        }

      <div className="pokedex_btn_cont">
        {
          selectType == "All" && next?.previous ?  <button className='btn_next_previous' onClick={PreviousPage}>Back</button> : ""
        }
        {
          selectType == "All" && next?.next ?  <button className='btn_next_previous' onClick={NextPage}>Next</button> : ""
        }
      </div>
      </footer>
    </div>
  )
}

export default Pokedex