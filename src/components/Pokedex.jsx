import axios from 'axios'
import React, { useEffect, useState } from 'react'
import nameTrainerSlice from '../store/slices/nameTrainer.slice'
import PokemonCard from './Pokedex/PokemonCard'
import { useSelector } from 'react-redux'
import Pagination1 from './Pokedex/Pagination/Pagination1'
import SelectType from './SelectType'
const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [selectType, setSelectType] = useState("All")
  const [nextPrevios, setNextPrevios] = useState(false)
  const [existUrl, setExistUrl] = useState()

  
  const url = "https://pokeapi.co/api/v2/pokemon/"

  useEffect(() => {
    if(pokeSearch || selectType !== "All"){
      if(pokeSearch){

        let url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`
        
        const obj ={
          results:[{url}]
        }
        setPokemons(obj)
      } else{

        const url =`https://pokeapi.co/api/v2/type/${selectType}/`
        axios.get(url)
        .then(res =>{
          const arr = res.data.pokemon.map(e => e.pokemon)
          setPokemons({results:arr})
        })
        .catch(err=> console.log(err))
      }

    }
    //  else if(nextPrevios){

    //   let url = pokemons?.next

    //   const obj1 ={
    //     results:[
    //       {
    //         url
    //       }
    //     ]
    //   }
    //   setPokemons(obj1)
    //   setNextPrevios(false)

    // }    
    else{
      axios.get(url)
        .then(res => setPokemons(res.data)
        )
        .catch(err => console.log(err))
    }
  }, [pokeSearch, selectType])  
  
  const handleSubmit = e =>{
    e.preventDefault()
    const pokeName = e.target.searchText.value.trim().toLowerCase()
    setPokeSearch(pokeName)
    setSelectType("All")
    e.target.searchText.value = ""
  }

  const nameTrainer = useSelector(state => state.nameTrainer)

  console.log(selectType)

  return (


    <div>
      <header className='pokedex_header'>
        
        <div className="pokedex_top">
          <img src="https://res.cloudinary.com/ddict5xw3/image/upload/v1661811371/Poke-Api/pokebola_paknoj.png" alt="Pokeball" />
        </div>
        <div className="pokedex_top">
          <img src="https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png" alt="Pokeball" />
        </div>
      </header>
      <main className='pokedex_main'>

        <div className="pokedex_welcome">
          <h3> <span>Welcome {nameTrainer},</span>  here you can find your pokemon</h3>

          <form action="" onSubmit={handleSubmit}>
            <input type="text" id='searchText'/>
            <button>Search</button>
          </form>

          <SelectType setPokeSearch={setPokeSearch} selectType={selectType} setSelectType={setSelectType}/>

        </div>

        <div className='cont_cards'>
          {
            pokemons?.results.map(pokemon => <PokemonCard url={pokemon.url} key={pokemon.name} />)
          }
        </div>
      </main>
      <footer className='pokedex_footer'>
          {/* <Pagination1  setNextPrevios={setNextPrevios} pokemonsPPage={pokemons?.results.length} totalPokemons={pokemons?.count}/> */}
      </footer>
    </div>
  )
}

export default Pokedex