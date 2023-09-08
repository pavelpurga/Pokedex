import React, {useState} from 'react';
import '../../styles/index.css'
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
  const [hoveredButton, setHoveredButton] = useState<string>('');
  const handleTypeSelect = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  const buttonStyle = (type: string) => ({
    backgroundColor: selectedTypes.includes(type) || hoveredButton === type ? getColorByType(type) : 'transparent',
    color: selectedTypes.includes(type) || hoveredButton === type ? '#fff' : getColorByType(type),
    border: `1px solid ${getColorByType(type)}`,
  });
  const buttonClassName = (type: string) => `type_button ${selectedTypes.includes(type) ? 'selected' : ''}`;
  return (
    <div className="type_filters">
      {allTypes.map((type) => (
        <Button
          key={type}
          className={buttonClassName(type)}
          style={buttonStyle(type)}
          onClick={() => handleTypeSelect(type)}
          onMouseEnter={() => setHoveredButton(type)}
          onMouseLeave={() => setHoveredButton('')}
        >
          {t(type)}
        </Button>
      ))}
    </div>
  );
};

export default PokemonFilters;