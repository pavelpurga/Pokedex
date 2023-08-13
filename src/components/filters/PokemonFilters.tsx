import React from 'react';
import '../../index.css'
import {getColorByType} from "../../helpers/GetColor";
import {allTypes} from "../../entity\'sData/constants/PokemonTypesColor";

interface TypeFiltersProps {
  selectedTypes: string[];
  setSelectedTypes: (value: React.SetStateAction<string[]>) => void;
}
const PokemonFilters = ({selectedTypes,setSelectedTypes}:TypeFiltersProps ) => {
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
          <label className="labelType" 
            htmlFor={type}
            style={{ backgroundColor: getColorByType(type) }}
          >
            {type}
          </label>
        </span>
      ))}
    </div>
  );
};

export default PokemonFilters;