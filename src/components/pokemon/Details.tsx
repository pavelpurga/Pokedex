import React from 'react';
import { PokemonTypes } from "../../models/Pokemon.types";
import {Button, Card, Divider, Tag} from "antd";
import './../../index.css'
import { getColorByType } from "../../helpers/GetColor";
import {removePokemon} from "../../store/Actions";
import {useTypedDispatch} from "../../store/store";
interface Props {
    pokemon: PokemonTypes;
    onClose: () => void;
}

const PokemonDetail: React.FC<Props> = ({ pokemon, onClose}) => {
  const movesCount = pokemon.moves?.length;
  const dispatch = useTypedDispatch();

  const handleRemove = () => {
    const result = window.confirm(`Are you sure you want to remove ${pokemon.name} from localStorage?`);
    if (result) {
      const pokemonList = JSON.parse(localStorage.getItem('pokemonList') || '[]');
      const updatedPokemonList = pokemonList.filter((p: PokemonTypes) => p.id !== pokemon.id);
      localStorage.setItem('pokemonList', JSON.stringify(updatedPokemonList));
      dispatch(removePokemon(pokemon.id));
      onClose();
    }
  };

  return (
    <Card className="cardDetail" style={{width:320,height:550}}>
      <div>
        <img src={pokemon.image} alt={pokemon.name} style={{width:250,height:250}}/>
        <div className="nameId">
          <Divider style={{height:5}}><h2>{pokemon.name} {`#${pokemon.id.toString().padStart(4,'0')}`}</h2></Divider>
        </div>
        <Divider style={{height:10}}>
          <div className="pokemon-types">
            {pokemon.types?.map(type => (
              <Tag key={type} style={{backgroundColor:getColorByType(type)}}>{type}</Tag>
            ))}
            <Button onClick={handleRemove} className="delete_button">
              Delete Pokemon
            </Button>
          </div>
        </Divider>
        <div className="pokemon_stats">
          <Divider style={{height:10}}>Attack: {pokemon.stats[1]}</Divider>
          <Divider style={{height:10}}>Defense: {pokemon.stats[2]}</Divider>
          <Divider style={{height:10}}>HP: {pokemon.stats[0]}</Divider>
          <Divider style={{height:10}}>Special Attack: {pokemon.stats[3]}</Divider>
          <Divider style={{height:10}}>Special Defense: {pokemon.stats[4]}</Divider>
          <Divider style={{height:10}}>Speed: {pokemon.stats[5]}</Divider>
          <Divider style={{height:10}}>Move count: {movesCount}</Divider>
        </div>
      </div>
    </Card>
  );
};

export default PokemonDetail;