import React from 'react';
import '../../index.css'
import {getColorByType} from "../../helpers/GetColor";
import {allTypes} from "../../entitysData/constants/PokemonTypesColor";
import {Button} from "antd";
import {useTranslation} from "react-i18next";

interface TypeFiltersProps {
  selectedTypes: string[];
  setSelectedTypes: (value: React.SetStateAction<string[]>) => void;
}
const PokemonFilters = ({selectedTypes,setSelectedTypes}:TypeFiltersProps ) => {
  const { t } = useTranslation()
  const handleTypeSelect = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  const buttonStyle = (type: string) => ({
    backgroundColor: selectedTypes.includes(type) ? getColorByType(type) : 'transparent',
    color: selectedTypes.includes(type) ? '#fff' : getColorByType(type),
    border: `1px solid ${getColorByType(type)}`,
  });
  return (
    <div className="type_filters">
      {allTypes.map((type) => (
        <Button
          key={type}
          className={`type_button ${selectedTypes.includes(type) ? 'selected' : ''}`}
          style={buttonStyle(type)}
          onClick={() => handleTypeSelect(type)}
        >
          {t(type)}
        </Button>
      ))}
    </div>
  );
};

export default PokemonFilters;