import React, { FC, useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { PokemonTypes, PokemonListResponse } from "../pokemon/Pokemon.types";
import PokemonDetail from "../pokemon/Details";
import {Button, Card, Modal, Tag} from "antd";
import '../../index.css'
import TypeFilters from "../types/TypeFilters";
import { getColorByType } from "../../helpers/GetColor";
import { loadPokemonData } from "../../api/LoadPokemons";
import { fetchPokemonList } from "../../api/Api";
import {useDispatch, useSelector} from "react-redux";
import {selectPokemonList} from "../../store/Selectors";
import {addPokemon} from "../../store/Actions";
import AddPokemonForm from "../form/AddPokemonForm";
interface Props{
    limit: number
}

const PokemonList: FC<Props> = ({limit}) => {
  const [offset, setOffset]=useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const pokemonListAdd = useSelector(selectPokemonList)
  const [allPokemonList, setAllPokemonList] = useState<PokemonTypes[]>([]);
  const dispatch = useDispatch();
  const [pokemonList, setPokemonList] = useState<PokemonTypes[]>([])
  const {data, isLoading, isError} = useQuery<PokemonListResponse>
  ('pokemonList', async ()=>{
    const data = await fetchPokemonList(limit,offset)
    return data;
  })
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonTypes|null>(null)
  const updatePokemonList = async () =>{
    const newPokemonList = await loadPokemonData(limit,offset);
    setPokemonList((prevPokemonList) => [...prevPokemonList, ...newPokemonList])
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleLoadMore = () => {
    setOffset(offset + limit);
  }
  const handleAddPokemon = (pokemon: PokemonTypes) => {
    dispatch(addPokemon(pokemon));
  }
  useEffect(()=>{
    updatePokemonList();
  }, [offset])
  useEffect(() => {
    const localStoragePokemonList = 
        JSON.parse(localStorage.getItem('pokemonList') || '[]') as PokemonTypes[];
    setAllPokemonList(
      [...localStoragePokemonList, ...pokemonList]);
  }, [pokemonList, pokemonListAdd]);
  const handlePokemonClick = async (pokemon:PokemonTypes) => {
    setSelectedPokemon(pokemon);
  }

  if (isLoading){
    return <div>Загрузка...</div>
  }
  if (isError){
    return <div>Ошибка при загрузке покемонов</div>
  }

  return (
    <>
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
          <AddPokemonForm onAddPokemon={handleAddPokemon} />
        </Modal>
        <div className="card_list">
          {allPokemonList?.filter((pokemon) =>
            selectedTypes.length === 0 ? true
              : pokemon.types.find((type) => selectedTypes.includes(type))
          ).map((pokemon) => (
            <Card
              className="card"
              hoverable
              style={{width:240}}
              key={pokemon.id} onClick={() => handlePokemonClick(pokemon)}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{width:170, height:170}} />
              <h2>{pokemon.name}</h2>
              <div>
                {pokemon.types.map((type) => (
                  <Tag 
                    key={type}
                    style={{backgroundColor:getColorByType(type)}}>
                    {type}
                  </Tag>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        {data?.results && data.results.length < data?.count && (
          <Button className="load_more_button" style={{width:350}} type="primary"
            onClick={handleLoadMore}><strong>Load more</strong></Button>
        )}
        <div className="fixed_element">
          {selectedPokemon && 
            <PokemonDetail pokemon={selectedPokemon}
              onClose={() => setSelectedPokemon(null)} />}
        </div>
      </div>
    </>
  );
};

export default PokemonList;
