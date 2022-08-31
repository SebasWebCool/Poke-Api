import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import ProtectedRoutes from './components/ProtectedRoutes'
import Pokedex from './components/Pokedex'
import PokemonDetails from './components/PokemonDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<Home/>}/>

        <Route element={<ProtectedRoutes/>}>
          <Route path='/pokedex' element={<Pokedex/>}/>
          <Route path='/pokedex/:name' element={<PokemonDetails/>}/>
        </Route>

      </Routes>
    </div>
    // <a href="https://www.flaticon.es/iconos-gratis/pokemon" title="pokemon iconos">Pokemon iconos creados por Nikita Golubev - Flaticon</a>
  )
}

export default App
