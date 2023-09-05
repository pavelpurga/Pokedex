import React, { useState } from 'react';
import {
  Counter,
  Hint,
  OptionCheckbox,
  OptionLabel,
  SelectorContainer,
  SelectorInput,
  SelectorOptions
} from "./Selector.styles";

type SelectorProps = {
  onSelectGenre: (genre: string) => void;
};

const Selector = ({ onSelectGenre }: SelectorProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionChange = (value : string) => {
    const updatedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter(option => option !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedOptions);
    onSelectGenre(updatedOptions.join(', '));
  };

  return (
    <SelectorContainer>
      <SelectorInput type="text" onClick={toggleOptions} readOnly value={'Select Genre'} isopen={showOptions ? 'true' : undefined} />
      {showOptions && (
        <SelectorOptions>
          <OptionLabel>
            <OptionCheckbox type="checkbox" value="Crime" onChange={() => handleOptionChange('Crime')} />
            Crime
          </OptionLabel>
          <OptionLabel>
            <OptionCheckbox type="checkbox" value="Documentary" onChange={() => handleOptionChange('Documentary')} />
            Documentary
          </OptionLabel>
          <OptionLabel>
            <OptionCheckbox type="checkbox" value="Horror" onChange={() => handleOptionChange('Horror')} />
            Horror
          </OptionLabel>
        </SelectorOptions>
      )}
      <Counter>{`Selected: ${selectedOptions.length}`}</Counter>
      {selectedOptions.length === 0 && <Hint>Select at least one genre to proceed</Hint>}
    </SelectorContainer>
  );
};

export default Selector;