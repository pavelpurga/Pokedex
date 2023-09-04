import React, { useState } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fillDownIcon from "../../images/FillDown.svg"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fillUpIcon from "../../images/FillUp.svg"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import indicatorIcon from "../../images/Indicator.svg"

const SelectorContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectorInput = styled.input`
  background: #424242;
  padding-top: 16px;
  padding-left: 18px;
  padding-bottom: 17px;
  border: 1px solid #ccc;
  appearance: none;
  width: 525px;
  height: 57px;

  &{
    background-image: url(${fillUpIcon});
    background-repeat: no-repeat;
    background-position: right 23px center;
    background-size: 20px 12px;
  }
  &:focus {
    outline: none;
    background-image: url(${fillDownIcon});
  }
`;

const SelectorOptions = styled.div`
  border-radius: 4px;
  background: rgba(35, 35, 35, 0.92);
  box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.10), 0px 10px 20px 0px rgba(0, 0, 0, 0.10), 0px 2px 10px 0px rgba(0, 0, 0, 0.10), 0px 0px 2px 0px rgba(0, 0, 0, 0.10);
  backdrop-filter: blur(13.591408729553223px);
  color: white;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  color: #FFF;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-left: 18px;
`;

const OptionCheckbox = styled.input`
  width: 16.091px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 2px;
  border: 1px solid #E6E8ED;
  background: #FFF;
  margin-right: 10px;
  &:checked {
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: #F65261;
      border-radius: 1px;
      background-image: url(${indicatorIcon});
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
`;

const Counter = styled.span`
  margin-top: 4px;
  color: white;
`;

const Hint = styled.div`
  color: #F65261;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Selector = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionChange = (value : string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <SelectorContainer>
      <SelectorInput type="text" onClick={toggleOptions} readOnly value={'Select Genre'} />
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