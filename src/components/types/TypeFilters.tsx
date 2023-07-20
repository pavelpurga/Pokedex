import React from 'react';
import '../../index.css'
import {allTypes} from "../../constants/AllTypes";
import {getColorByType} from "../../helpers/GetColor";

interface TypeFiltersProps {
  selectedTypes: string[];
  setSelectedTypes: (value: React.SetStateAction<string[]>) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const TypeFilters = ({selectedTypes,setSelectedTypes}:TypeFiltersProps ) => {
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

export default TypeFilters;