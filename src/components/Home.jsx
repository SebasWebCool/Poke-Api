import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'


const Home = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const getTrainerName = (e) => {
        e.preventDefault()
        const inputValue = e.target.name.value.trim()
        if (inputValue !== 0) {
            dispatch(setNameTrainer(inputValue))
            navigate('/pokedex')
        }
        e.target.name.value = ""
        // console.log(inputValue)
    }

    return (
        <div className="cont_home">
            <div className="home">
                <h1>Hi Trainer!</h1>
                <div className="home_img">
                    <img src="https://mario.wiki.gallery/images/thumb/a/a1/SSBU_Pokemon_Trainer_Solo_Artwork.png/1200px-SSBU_Pokemon_Trainer_Solo_Artwork.png" alt="Pokemon Trainer" />
                </div>
                <form className='home_form' action="" onSubmit={getTrainerName}>
                    <label htmlFor="name">Give me your name to start</label>
                    <div className="home_input">
                        <input id='name' type="text" />
                        <button>
                            <img src="https://res.cloudinary.com/ddict5xw3/image/upload/v1661811371/Poke-Api/pokebola_paknoj.png" alt="Pokeball" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home