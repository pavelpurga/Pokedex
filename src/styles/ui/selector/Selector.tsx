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
import {useTranslation} from "react-i18next";

type SelectorProps = {
  onSelectGenre: (genre: string) => void;
};

const Selector = ({ onSelectGenre }: SelectorProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectedOptionsRef = useRef<string[]>([]);
  const { t } = useTranslation();
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
        value={t('Select Genre')}
        isopen={showOptions ? 'true' : undefined}
      />
      {showOptions && (
        <SelectorOptions>
          <OptionLabel>
            <OptionCheckbox
              type="checkbox"
              value={t('Crime')}
              onChange={() => handleOptionChange('Crime')}
              checked={selectedOptionsRef.current.includes('Crime')}
            />
            {t('Crime')}
          </OptionLabel>
          <OptionLabel>
            <OptionCheckbox
              type="checkbox"
              value={t('Documentary')}
              onChange={() => handleOptionChange('Documentary')}
              checked={selectedOptionsRef.current.includes('Documentary')}
            />
            {t('Documentary')}
          </OptionLabel>
          <OptionLabel>
            <OptionCheckbox
              type="checkbox"
              value={t('Horror')}
              onChange={() => handleOptionChange('Horror')}
              checked={selectedOptionsRef.current.includes('Horror')}
            />
            {t('Horror')}
          </OptionLabel>
        </SelectorOptions>
      )}
      {selectedOptionsRef.current.length ===0 ?
        <Hint>{t('Select at least one genre to proceed')}</Hint> :
        <Counter>{`${t('Selected')}: ${selectedOptionsRef.current.map(value => t(value)).join(", ")}`}</Counter>
      }
    </SelectorContainer>
  );
};

export default Selector;