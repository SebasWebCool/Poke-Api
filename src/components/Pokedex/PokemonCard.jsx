import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StatPokemonCard from './StatPokemonCard'
import { useNavigate } from 'react-router-dom'

const PokemonCard = ({url}) => {

    const [pokemon, setPokemon] = useState()

    useEffect(()=>{
        axios.get(url)
        .then(res => setPokemon(res.data))
        .catch(err => console.log(err))
    },[])

    const navigate = useNavigate() 

    const handleClick = () =>{
        navigate(`/pokedex/${pokemon?.name}`)
    }
    // console.log(pokemon)
  return (
    <article onClick={handleClick} className={`pokeCard_cont type__${pokemon?.types[0].type.name}`} >
        <header className={`pokeCard_header_bg ${pokemon?.types[0].type.name}__header`}>
            <div className='pokeCard_header'>
                <img src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt="" />
            </div>
        </header>
        <section className='pokeCard_nt'>
            <h3>{pokemon?.name}</h3>
            <ul className='pokeCard_list'>
                {
                    pokemon?.types.map(slot =>(
                        <li key={slot.type.url}>{slot.type.name}</li>
                        // pokemon.types[1] ?  <li key={slot.type.url}>{slot.type.name} / </li>  :
                    ))
                }
            </ul>
            <p>Type</p>
        </section>
        <footer className='pokeCard_stats'>
            <ul className='pokeCard_stats_list'>
                {
                    pokemon?.stats.map(stat =>(
                        <StatPokemonCard key={stat.stat.url} infoS={stat} />
                    ))
                }
            </ul>
        </footer>
    </article>
  )
}

export default PokemonCard