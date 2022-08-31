import React, { useEffect , useState } from 'react'
import axios from 'axios'

const SelectType = ({setSelectType, setPokeSearch, selectType}) => {

    const [listTypes, setListTypes, ] = useState()

    useEffect(()=>{
        const  url = `https://pokeapi.co/api/v2/type/`
        axios.get(url)
        .then(res => setListTypes(res.data.results))
        .catch(err => console.log(err))
    },[])

    const handleChange = e =>{
      
      setSelectType(e.target.value)
      setPokeSearch("")
    }

  return (

    <select value={selectType} onChange={handleChange}>
        <option value="All">All pokemons</option>
        {
          listTypes?.map(type => (
            <option key={type.name} value={type.name}> {type.name} </option>
          ))
        }
    </select>
  )
}

export default SelectType