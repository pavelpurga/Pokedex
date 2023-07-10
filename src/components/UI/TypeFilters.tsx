import React from 'react';
import {getColorByType} from "../pokedex/PokemonList";
import '../../index.css'

const allTypes: string[] = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
];

const TypeFilters = ({selectedTypes,setSelectedTypes}:{selectedTypes:string[];setSelectedTypes:Function}) => {
    const handleTypeSelect = (type: string) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };
    return (
        <div className="type_filters">
            {allTypes.map((type) => (
                <span className="checkBoxType" key={type}>
                    <input
                        className="checkbox_input"
                        type="checkbox"
                        id={type}
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeSelect(type)}
                    />
                    <label className="labelType" htmlFor={type} style={{ backgroundColor: getColorByType(type) }}>
                        {type}
                    </label>
                </span>
            ))}
        </div>
    );
};

export default TypeFilters;