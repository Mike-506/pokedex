import React, { useState } from "react";
import '../Search/style.css';

const Search = () => {

  const [input, setInput] = useState("");
  const [pokemon, setPokemon] = useState();

  async function fetchPokemon() {
    const inputText = input.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputText}`);
    const data = await response.json();
    setPokemon(data);
    handleInputError();
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      fetchPokemon();
    }
  }

  const handleInputError = () => {
    if (input === "" || input === null) {
      alert("Please input a value")
    }
  }

  return (
    <div className="search">
      <h1>Search for a Pokemon</h1>
      <div className="search-box">
      <input 
      type="text" 
      placeholder="Enter Pokemon name..."   
      onKeyDown={handleKeyDown} 
      value={input} 
      onChange={(e) => setInput(e.target.value)}>
      </input>
      <button onClick={fetchPokemon}>Search</button>
      </div>
      { pokemon &&  (
        <div id="pokemon-card">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={`img of ${pokemon.name}`}/>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Abilities: {pokemon.abilities[0].ability.name} <br /> {pokemon.abilities[1].ability.name}</p>
      </div>
)}
    </div>
  )
}

export default Search;