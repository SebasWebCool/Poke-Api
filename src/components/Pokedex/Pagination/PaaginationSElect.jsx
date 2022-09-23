import React from 'react'
import { useState } from 'react'

const PaaginationSElect = ({totalPokemons, pokemonsShows, paginate }) => {
    console.log(totalPokemons)

    const numbersPages = Math.ceil(totalPokemons / pokemonsShows)
    
    const arr = []

    for(let i = 1; i <= numbersPages; i++ ){
        arr.push(i)
    }
    console.log(arr)

  return (
<ul className='page_cont'>
   {
    arr.map( num => (
        <li key={num} className="page_num">
          <a href="!#" onClick={(e) => {
            e.preventDefault()
            paginate(num)}}>{num}</a>  
        </li>
    ))
   } 
</ul>  )
}

export default PaaginationSElect