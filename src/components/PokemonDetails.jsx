import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PokemonDetails = () => {

  const [pokeInfo, setPokeInfo] = useState()

  const { name } = useParams() // useParams es para pasar la info del parametro del navigate

  useEffect(() => {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}/`

    axios.get(url)
      .then(res => setPokeInfo(res.data))
      .catch(err => console.log(err))
  }, [])


  // console.log(pokeInfo)
  return (
    <article className='pokeInfo'>
      <header className='info_header'>
        <div className="info_header_img">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
        </div>
      </header>

      <div className='pokeInfo_cont'>

        <div className="pokeInfo_cont_main">
          <main className='info_main'>
            <div className="info_main_img">
              <img src={pokeInfo?.sprites.other["official-artwork"]["front_default"]} alt="" />
            </div>
            <div className="poke_wh">
              <div className="poke_w">
                <h3>{pokeInfo?.height}</h3>
                <h4>Heigth</h4>
              </div>
              <div className="poke_w">
                <h3>{pokeInfo?.weight}</h3>
                <h4>Weigth</h4>
              </div>
            </div>
            <h1>{pokeInfo?.name}</h1>
            <span>#{pokeInfo?.id}</span>

          </main>

          <footer className='info_footer'>

            <div className="info_type">
              <h3>Type</h3>
              <ul className='info_type_list' >
                {
                  pokeInfo?.types.map(type => (<li className='info_type_item' key={type.slot}>{type.type.name}</li>))
                }
              </ul>
            </div>

            <div className="info_type">
            <h3>Habilities</h3>
              <ul className='info_abilities_list' >
                {
                  pokeInfo?.abilities.map(ability => (<li className='info_abilities_item' key={ability.slot}>{ability.ability.name}</li>))
                }
              </ul>
            </div>
          </footer>
        </div>

        <aside className='info_aside'>
           <h3>Movements</h3>
          <ul className='info_aside_list'>
            {pokeInfo?.moves.map(move => <li className='info_aside_item' key={move.move.url}>{move.move.name}</li>)}
          </ul>
        </aside>
      </div>
    </article>

  )
}

export default PokemonDetails