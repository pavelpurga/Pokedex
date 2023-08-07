import React, {FC} from 'react';
import {PokemonTypes} from "../../models/Pokemon.types";
import {Card, Tag} from "antd";
import {getColorByType} from "../../helpers/GetColor";
import '../../index.css'

interface PokemonProps {
    pokemon: PokemonTypes;
    onClick: (pokemon: PokemonTypes) => void;
}

const Pokemon:FC<PokemonProps> = ({pokemon, onClick}) => {
  const handleCardClick = () => {
    onClick(pokemon);
  };
  return (
    <Card
      className="card"
      hoverable
      style={{width: 240}}
      key={pokemon.id}
      onClick={handleCardClick}>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={{width: 170, height: 170}}/>
      <h2>{pokemon.name}</h2>
      <div>
        {pokemon.types.map((type) => (
          <Tag
            key={type}
            style={{backgroundColor: getColorByType(type)}}>
            {type}
          </Tag>
        ))}
      </div>
    </Card>
  );
};

export default Pokemon;