import React, { useState, useRef } from 'react';
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
  const selectedOptionsRef = useRef<string[]>([]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionChange = (value: string) => {
    const updatedOptions = selectedOptionsRef.current.includes(value)
      ? selectedOptionsRef.current.filter((option) => option !== value)
      : [...selectedOptionsRef.current, value];

    selectedOptionsRef.current = updatedOptions;
    onSelectGenre(updatedOptions.join(', '));
  };

  return (
    <SelectorContainer>
      <SelectorInput
        type="text"
        onClick={toggleOptions}
        readOnly
        value={'Select Genre'}
        isopen={showOptions ? 'true' : undefined}
      />
      {showOptions && (
        <SelectorOptions>
          <OptionLabel>
            <OptionCheckbox
              type="checkbox"
              value="Crime"
              onChange={() => handleOptionChange('Crime')}
              checked={selectedOptionsRef.current.includes('Crime')}
            />
                Crime
          </OptionLabel>
          <OptionLabel>
            <OptionCheckbox
              type="checkbox"
              value="Documentary"
              onChange={() => handleOptionChange('Documentary')}
              checked={selectedOptionsRef.current.includes('Documentary')}
            />
                Documentary
          </OptionLabel>
          <OptionLabel>
            <OptionCheckbox
              type="checkbox"
              value="Horror"
              onChange={() => handleOptionChange('Horror')}
              checked={selectedOptionsRef.current.includes('Horror')}
            />
                Horror
          </OptionLabel>
        </SelectorOptions>
      )}
      <Counter>{`Selected: ${selectedOptionsRef.current.length}`}</Counter>
      {selectedOptionsRef.current.length === 0 && <Hint>Select at least one genre to proceed</Hint>}
    </SelectorContainer>
  );
};

export default Selector;