import React, { useEffect, useState } from "react";
import '../Pokedex/style.css';

const Pokedex = (() => {

  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      const answer = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const data = await answer.json();
      setPokemonData(data.results);
    };
    fetchPokemon(pokemonData);
  }, [pokemonData]);

  const handleClick = async (pokemonName) => {
    const answer = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await answer.json();
    setSelectedPokemon(data);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="pokedex">
      <h2>All Pokémon</h2>
      <ul>
        {
          pokemonData.map(pokemon => (
            <div className="btn-modal" onClick={() => handleClick(pokemon.name)}>
              <div key={pokemon.name}>
                <p>{pokemon.name}</p>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.substring(pokemon.url.length - 3, pokemon.url.length - 1)}.png`} alt={pokemon.name} />
              </div>
            </div>
          ))
        }
      </ul>

        {showModal && selectedPokemon && (
          <div className="modal-container">
            <div className="overlay" onClick={closeModal}>
            </div>

            <div className="modal-info"> 

              <span className="close-modal" onClick={closeModal}>&times;</span>

              <h2>{selectedPokemon.name}</h2>
              <img className="modal-img" src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name}/>
              <p>Type: <span>{selectedPokemon.types[0].type.name}</span></p> 
              <p>Weight: <span>{selectedPokemon.weight}</span></p>
              <p>Heigth: <span>{selectedPokemon.height}</span></p>
              <p>Exp: <span>{selectedPokemon.base_experience}</span></p>
        
            </div>
          </div>
        )}

    </div>
  )
})

export default Pokedex;