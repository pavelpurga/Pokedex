import React, {useEffect, useState} from 'react';
import { PokemonTypes } from "../../models/Pokemon.types";
import PokemonDetail from "../pokemon/PokemonDetails";
import {Button, Modal, Spin} from "antd";
import '../../index.css'
import TypeFilters from "../types/TypeFilters";
import {addPokemon} from "../../store/PokemonActions";
import AddPokemonForm from "../form/AddPokemonForm";
import {useTypedDispatch} from "../../store/store";
import {pokemonAPI} from "../../api/PokemonApi";
import Pokemon from "../pokemon/Pokemon";
import { useNavigate} from "react-router-dom";


const PokemonList = () => {
  const [offset, setOffset] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const dispatch = useTypedDispatch();
  const { data: pokemon, error, isLoading } =
      pokemonAPI.useFetchAllPokemonQuery({limit:12,offset: offset})
  const[selectedPokemon, setSelectedPokemon] = useState<PokemonTypes | null>(null)
  const [allPokemonList, setAllPokemonList] = useState<PokemonTypes[]>(() => {
    const localStoragePokemonList = JSON.parse(localStorage.getItem('pokemonList') || '[]') as PokemonTypes[];
    return localStoragePokemonList;
  });
  const navigate = useNavigate();

  const handleButtonClick = (route:any) => {
    navigate(route);
  };
  useEffect(() => {
    if (Array.isArray(pokemon)) {
      setAllPokemonList((prevList) => [...prevList, ...pokemon]);
    }
  }, [pokemon]);


  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddPokemon = (pokemon: PokemonTypes) => {
    dispatch(addPokemon(pokemon));
  }

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 12);
  };
  const handlePokemonClick = async (pokemon:PokemonTypes) => {
    setSelectedPokemon(pokemon);
  }


  return (
    <>
      <div>
        <div className="header">
          <h1 className="text">Pokedex</h1>
        </div>
        <button className="btn"
          onClick={() => handleButtonClick('/about')}>
          Home
        </button>
        <button className="btn"
          onClick={() => handleButtonClick('/posts')}>
          Posts
        </button>
      </div>
      <Button className="button_add" onClick={openModal}
      >Add pokemon
      </Button>
      <div className="add_container">
        <TypeFilters
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}/>
        <Modal
          title="Adding pokemons"
          open={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <AddPokemonForm onAddPokemon={handleAddPokemon}/>
        </Modal>
        <div className="card_list">
          {isLoading && <Spin/>}
          {error && <h1>Loading Error</h1>}
          {allPokemonList?.length &&  allPokemonList?.filter((pokemon) =>
            selectedTypes.length === 0 ? true
              : pokemon.types.find((type) => selectedTypes.includes(type))
          ).map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} onClick={handlePokemonClick}/>
          ))}
        </div>
      </div>
      <div>
        {pokemon && (
          <Button className="load_more_button" style={{width: 350}} type="primary"
            onClick={handleLoadMore}><strong>Load more</strong></Button>
        )}
        <div className="fixed_element">
          {selectedPokemon &&
                  <PokemonDetail pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}/>}
        </div>
      </div>
    </>
  );
};
export default PokemonList;