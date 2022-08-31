import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Pagination1 = ({pokemonsPPage, totalPokemons, setNextPrevios}) => {

  const pageNumbers = []  

    const  navLength = Math.ceil(totalPokemons / pokemonsPPage)
    // console.log(navLength)

    for (let i = 1; i <=navLength; i++){
        pageNumbers.push(i)
    }

const handleUrl = ()=>{
  setNextPrevios(true)
}
  return (
    <nav>
      <button onClick={handleUrl}>+</button>
      <button>-</button>
      <ul>
        {
          pageNumbers.map( number =>(

            <li key={number} className="pg.item">
              <a href="!#" >
                {number}
              </a>
            </li>
          )
          )
        }
      </ul>
    </nav>
  )
}

export default Pagination1