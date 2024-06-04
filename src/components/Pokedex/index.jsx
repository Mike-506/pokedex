import { useState, useMemo } from "react";
import * as React from "react";
import './style.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { CgPokemon } from "react-icons/cg";
import ReactPaginate from 'react-paginate';

const Pokedex = (({ array }) => {

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const [sortOrder, setSortOrder] = useState('default');

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 50;

  const openModal = async (pokemonName) => {
    const answer = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await answer.json();
    setSelectedPokemon(data);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  //Show Pokemon depends on how its sorted
  const sortedPokemonList = useMemo(() => {
    let sortedData = [...array];
    switch (sortOrder) {
      case 'High/Low':
        sortedData.reverse();
        break;

      case 'A-Z':
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break; 
      
      default:
        break;
    }
    return sortedData;
  }, [array, sortOrder]);

  //Paginate
  const indexOfLastPokemon = currentPage * postsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - postsPerPage;
  const currentPokemon = sortedPokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //get Pokemon image url
   const getPokemonImageUrl = (url) => {
    const parts = url.split("/pokemon/");
    const pokemonId = parts[1].replace("/", "");
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  };
  

  return (
    <div className="hero">
      <div className="pokedex">
        <div className="sort-container">
          <p>Sort by:</p>
          <div className="dropdown">
            <button className="dropbtn">
              <span><CgPokemon /></span> {sortOrder === 'default' ? 'Low/High' :
                sortOrder === 'High/Low' ? 'High/Low' :
                sortOrder === 'A-Z' ? 'A-Z' :
                sortOrder === 'Z-A' ? 'Z-A' : ''}
              <span><MdKeyboardArrowDown /></span>  
            </button>
            <div className="dropdown-content">
              <span onClick={() => setSortOrder('default')}>Low/High</span>
              <span onClick={() => setSortOrder('High/Low')}>High/Low</span>
              <span onClick={() => setSortOrder('A-Z')}>A-Z</span>
              <span className="lastSort" onClick={() => setSortOrder('Z-A')}>Z-A</span>
            </div>
          </div> 
      </div>

      <ul className="main">
        { 
          currentPokemon.map(pokemon => (
            <div className="btn-modal" key={pokemon.name} onClick={() => openModal(pokemon.name)}>
              <div>
                <p>{pokemon.name}</p>
                <img src={getPokemonImageUrl(pokemon.url)} alt={pokemon.name} />
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

              <div className="img-cont-modal">
                <h2>{selectedPokemon.name}</h2>
                <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name}/>
              </div>

              <div className="p-cont-modal">
                <p>Type: <span>{selectedPokemon.types[0] ? selectedPokemon.types[0].type.name : ""}</span>
                  {selectedPokemon.types[1] ? <span>/{selectedPokemon.types[1].type.name}</span> : ""}              
                </p> 
                
                <p>Weight: <span>{selectedPokemon.weight}</span></p>
                <p>Heigth: <span>{selectedPokemon.height}</span></p>
                <p>Exp: <span>{selectedPokemon.base_experience}</span></p>
              </div>
        
            </div>
          </div>
        )}

    </div>

    <div className="pagination">
        <ReactPaginate
          pageCount={Math.ceil(sortedPokemonList.length / postsPerPage)}
          onPageChange={({ selected }) => paginate(selected + 1)}
          pageClassName="pag-number"
          activeClassName="active"
          previousLabel="<"
          nextLabel=">"
        />
    </div>

    </div>
  )
})

export default Pokedex;