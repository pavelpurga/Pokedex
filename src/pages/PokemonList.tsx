import React, {useEffect, useState} from 'react';
import PokemonDetail from "../components/pokemon/PokemonDetails";
import {Button, Modal,  Spin} from "antd";
import '../styles/index.css'
import PokemonFilters from "../components/filters/PokemonFilters";
import AddPokemonForm from "../components/form/AddPokemonForm";
import {useTypedDispatch} from "../store/store";
import {pokemonAPI} from "../api/PokemonApi";
import Pokemon from "../components/pokemon/Pokemon";
import { useNavigate} from "react-router-dom";
import {PokemonTypes} from "../entitysData/models/Pokemon.types";
import {addPokemon} from "../store/Pokemon/PokemonSlice";
import {ROUTES} from "../entitysData/constants/API_ROUTS";
import {withTranslation,useTranslation} from "react-i18next";
import '../styles/theme.scss'

const PokemonList = () => {
  const [offset, setOffset] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const dispatch = useTypedDispatch();
  const { data: pokemon, error, isLoading } =
      pokemonAPI.useFetchAllPokemonQuery({limit:12,offset: offset})
  const[selectedPokemon, setSelectedPokemon] = useState<PokemonTypes | null>(null)
  const { t } = useTranslation();
  const [allPokemonList, setAllPokemonList] = useState<PokemonTypes[]>(()=>{
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
    setAllPokemonList((prevList) => [pokemon, ...prevList]);
    closeModal()
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
          <h1 className="text">{t('Pokedex')}</h1>
        </div>
        <button className="btn"
          onClick={() => handleButtonClick(ROUTES.ABOUT)}>
          {t('Home')}
        </button>
        <button className="btn"
          onClick={() => handleButtonClick(ROUTES.POSTS)}>
          {t('Posts')}
        </button>
      </div>
      <Button className="button_add" onClick={openModal}
      >{t('Add Pokemon')}
      </Button>
      <div className="add_container">
        <PokemonFilters
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}/>
        <Modal
          title={t('Adding Pokemons')}
          open={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <AddPokemonForm  closeModal={closeModal} isModalVisible={isModalVisible} onAddPokemon={handleAddPokemon}/>
        </Modal>
        <div className="card_list">
          {isLoading && <Spin/>}
          {error && <h1>{t('Loading Error')}</h1>}
          {allPokemonList?.length &&  allPokemonList?.filter((pokemon) =>
            selectedTypes.length === 0 ? true
              : pokemon.types.find((type) => selectedTypes.includes(type))
          ).map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} onClick={handlePokemonClick}/>
          ))
          }
        </div>
        <div className="fixed_element">
          {selectedPokemon &&
              <PokemonDetail pokemon={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}/>}
        </div>
      </div>
      {pokemon && (
        <Button className="load_more_button" style={{width: 350}} type="primary"
          onClick={handleLoadMore}><strong>{t('Load More')}</strong></Button>
      )}
    </>
  );
};
export default withTranslation()(PokemonList);