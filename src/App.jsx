import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import Search from './components/Search';


function App() {
  return (

  <BrowserRouter>
    <div className='App'>
      <header>
        <h1>Pokédex</h1>
        <nav>
        <Link to="/">Pokédex</Link>
        <Link to="/search">Search</Link>
        </nav>
      </header> 
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  </BrowserRouter>

  )
}

export default App;
