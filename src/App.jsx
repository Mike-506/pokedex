import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import Search from './components/Search';


function App() {
  const [pokemonData, setPokemonData] = useState([]);
  
  useEffect(() => {
    const fetchPokemon = async () => {
      const answer = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1150");
      const data = await answer.json();
      setPokemonData(data.results);
    };
    fetchPokemon(pokemonData);
  }, [pokemonData]);

  return (

  <BrowserRouter>
    <div className='App'>
      <header>
        <h1>Pokédex</h1>
        <nav>
        <Link to="/pokedex">Pokémon</Link>
        <Link to="/search">Search</Link>
        </nav>
      </header> 
      <Routes>
        <Route path="/pokedex" element={<Pokedex array={pokemonData}/>} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  </BrowserRouter>

  )
}

export default App;
