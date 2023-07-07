import React, {FC, useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {Pokemon, PokemonListResponse} from "../pokemon/Pokemon";
import PokemonDetail from "../pokemon/Details";
import {Button, Card, Tag} from "antd";
import '../../index.css'
import TypeFilters from "../UI/TypeFilters";
interface Props{
    limit: number
}
interface PokemonType{
    name:string;
    color:string;
}

export const getColorByType = (typeName: string) => {
    const types: PokemonType[] = [
        { name: "normal", color: "#a8a878" },
        { name: "fire", color: "#f08030" },
        { name: "water", color: "#6890f0" },
        { name: "grass", color: "#78c850" },
        { name: "electric", color: "#f8d030" },
        { name: "ice", color: "#98d8d8" },
        { name: "fighting", color: "#c03028" },
        { name: "poison", color: "#a040a0" },
        { name: "ground", color: "#e0c068" },
        { name: "flying", color: "#a890f0" },
        { name: "psychic", color: "#f85888" },
        { name: "bug", color: "#a8b820" },
        { name: "rock", color: "#b8a038" },
        { name: "ghost", color: "#705898" },
        { name: "dragon", color: "#7038f8" },
        { name: "dark", color: "#705848" },
        { name: "steel", color: "#b8b8d0" },
        { name: "fairy", color: "#ee99ac" },
    ];
    const type = types.find((t) => t.name === typeName);
    return type ? type.color : "#000000";
};

const PokemonList: FC<Props> = ({limit}) => {
    const [offset,setOffset]=useState(0);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [pokemonList,setPokemonList] = useState<Pokemon[]>([])
    const {data, isLoading, isError} = useQuery<PokemonListResponse>
    ('pokemonList', async ()=>{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        return data;
    })
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon|null>(null)
    const loadPokemonData = async (limit:number,offset:number) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset-limit}`);
        const data = await response.json();

        const promise = data?.results.map(async (result:any) => {
            const response = await fetch(result.url);
            const pokemonData = await response.json();
            const types = pokemonData.types.map(({type}: { type: { name: string } }) => type.name)
            const stats = pokemonData.stats.map(({ base_stat }: { base_stat: number }) => base_stat);
            const moves = pokemonData.moves.map(({ move }: { move: { name: string } }) => move.name);

            return {
                id: pokemonData.id,
                name: pokemonData.name,
                types,
                stats,
                moves,
                image: pokemonData.sprites.front_default
            } as Pokemon
        })

        const pokemons = await Promise.all(promise)
        return pokemons;
    }
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
                    selectedTypes.length === 0 ? true : pokemon.types.some((type) => selectedTypes.includes(type))
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
