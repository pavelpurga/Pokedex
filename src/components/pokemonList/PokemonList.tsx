import React, {FC, useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {Pokemon, PokemonListResponse} from "../pokemon/Pokemon";
import PokemonDetail from "../pokemon/Details";
import {Button, Card, Tag} from "antd";
import '../../index.css'
import TypeFilters from "../types/TypeFilters";
import axios from "axios";
import {getColorByType} from "../../helpers/GetColor";
import {loadPokemonData} from "../../helpers/LoadPokemons";
import {fetchPokemonList} from "../../api/Api";

interface Props{
    limit: number
}

const PokemonList: FC<Props> = ({limit}) => {
    const [offset,setOffset]=useState(0);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [pokemonList,setPokemonList] = useState<Pokemon[]>([])
    const {data, isLoading, isError} = useQuery<PokemonListResponse>
    ('pokemonList', async ()=>{
        const data = await fetchPokemonList(limit,offset)
        return data;
    })
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon|null>(null)
    const updatePokemonList = async () =>{
        const newPokemonList = await loadPokemonData(limit,offset);
        setPokemonList((prevPokemonList) => [...prevPokemonList,...newPokemonList])
    };
    const handleLoadMore = () => {
        setOffset(offset + limit);
    }
    useEffect(()=>{
        updatePokemonList();
    },[offset])
    const handlePokemonClick = async (pokemon:Pokemon) => {
        setSelectedPokemon(pokemon);
    }

    if (isLoading){
        return <div>Загрузка...</div>
    }
    if (isError){
        return <div>Ошибка при загрузке покемонов</div>
    }

    return (
        <>  <div className="add_container">
            <TypeFilters selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}/>
            <div className="card_list">
                {pokemonList?.filter((pokemon) =>
                    selectedTypes.length === 0 ? true : pokemon.types.find((type) => selectedTypes.includes(type))
                ).map((pokemon) => (
                    <Card
                        className="card"
                        hoverable
                        style={{width:240}}
                        key={pokemon.id} onClick={() => handlePokemonClick(pokemon)}>
                        <img src={pokemon.image} alt={pokemon.name} style={{width:170, height:170}} />
                        <h2>{pokemon.name}</h2>
                        <div>
                            {pokemon.types.map((type) => (
                                <Tag key={type} style={{backgroundColor:getColorByType(type)}}>{type}</Tag>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
            <div>
            {data?.results && data.results.length < data?.count && (
                <Button className="load_more_button" style={{width:350}} type="primary" onClick={handleLoadMore}><strong>Load more</strong></Button>
            )}
                <div className="fixed_element">
            {selectedPokemon && <PokemonDetail pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
                </div>
             </div>
            </>
    );
};

export default PokemonList;
