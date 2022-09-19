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
        <div className='cont_home1'>
            <div className="cont_home">
                <div className="home">
                    <div className="home_img">
                        <img src="https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png" alt="Pokedex" />
                    </div>
                    <h1>Hi Trainer!</h1>
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
            <footer className='home__footer'>
               

                <div className="home__footer__buttom">
                    <div className='pokedex_ball  bottom'>
                        <div className="pokedex_ball_center"></div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home