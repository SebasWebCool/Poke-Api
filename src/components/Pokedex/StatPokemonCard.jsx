import React from 'react'

const StatPokemonCard = ({infoS}) => {
  return (
    <li className='pokeCard_stats_item'>
        <h4>{infoS.stat.name}</h4>
        <p>{infoS.base_stat}</p>
    </li>
  )
}

export default StatPokemonCard