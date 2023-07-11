import React from 'react';
import { Pokemon } from "./Pokemon";
import { Card, Divider, Tag } from "antd";
import './../../index.css'
import { getColorByType } from "../../helpers/GetColor";
interface Props {
    pokemon: Pokemon;
    onClose: () => void;
}

const PokemonDetail: React.FC<Props> = ({ pokemon}) => {
  const movesCount = pokemon.moves?.length;
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
          </div>
        </Divider>
        <div className="pokemon_stats">
          <Divider style={{height:10}}><span>Attack:</span> {pokemon.stats[1]}</Divider>
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