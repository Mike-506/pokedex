import React, { useState } from "react";
import '../Search/style.css';

/* icons */
import { RiSwordFill } from "react-icons/ri";
import { IoShieldSharp } from "react-icons/io5";
import { PiSneakerMoveFill } from "react-icons/pi";

const Search = () => {

  const [input, setInput] = useState("");
  const [pokemon, setPokemon] = useState();
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPokemon() {
    const inputText = input.toLowerCase();
    setIsLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputText}`);

    if (response.status === 404) {
      setIsLoading(false)
      setNotFound(true);
    } else if (input === "" || input === null){ 
      setIsLoading(false)
      alert("Please input a value.")
      setNotFound(false)
    } else {
      setIsLoading(false)
      setNotFound(false);
      const data = await response.json();
      setPokemon(data);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchPokemon();
    }
  }

  return (
    <div className="search">
      <h2 className="search-desc">Search Pokémon Card</h2>
      <div className="search-box">
      <input 
      type="text" 
      placeholder="Enter Pokémon name..."   
      onKeyDown={handleKeyDown} 
      value={input} 
      onChange={(e) => setInput(e.target.value)}>
      </input>
      <button onClick={fetchPokemon}>Search</button>
      </div>

      {isLoading ? (
        <div className="loader"></div>
      ) : notFound ? (
        <div> 
          <h4>No Pokémon with that name have been found in the Pokédex.<br/> Please try again.</h4>
        </div>
      ) : ( pokemon && !notFound &&(
        
        <div id="pokemon-card">

          <div className="pokemon-card-header">
          <p>{pokemon.name}</p>
          <div>{pokemon.stats[0].stat.name}<span>{pokemon.stats[0].base_stat}</span></div>
          </div>

          <img className="pokemon-img" src={pokemon.sprites.front_default} alt={`img of ${pokemon.name}`}/>

          <div className="pokemon-info">

          <div className="card-info">
          <div>Type:<span>{pokemon.types[0] ? pokemon.types[0].type.name : ""}</span>
          {pokemon.types[1] ? <span>/{pokemon.types[1].type.name}</span> : ""}
          </div>
          <div>Xp:<span>{pokemon.base_experience}</span></div>
          </div>

          <div className="abilities">Abilities:<br/> 
            {pokemon.abilities[0] ? <span>•{pokemon.abilities[0].ability.name}</span> : ""} <br /> 
            {pokemon.abilities[1] ? <span>•{pokemon.abilities[1].ability.name}</span> : ""}
          </div>

          <div className="stats">
          <div><RiSwordFill/><span>{pokemon.stats[1].base_stat}</span></div>
          <div><IoShieldSharp /><span>{pokemon.stats[2].base_stat}</span></div>
          <div><PiSneakerMoveFill /><span>{pokemon.stats[5].base_stat}</span></div>
          </div>
        </div>  
      </div>
      )
      )
      }

    </div>
  )
}

export default Search;