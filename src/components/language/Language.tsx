import React, {useState} from 'react';
import {Radio} from "antd";
import i18n from "../../entitysData/i18n/i18n";

const Language = () => {
  const [selectedLanguage,setSelectedLanguage] = useState("en");
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };
    
  return (
    <div>
      <Radio.Group  value={selectedLanguage}>
        <Radio.Button className="language_Button" value="ru" onChange={(e)=>handleLanguageChange(e.target.value)} >RU</Radio.Button>
        <Radio.Button className="language_Button" value="en" onChange={(e)=>handleLanguageChange(e.target.value)}>EN</Radio.Button>
        <Radio.Button className="language_Button" value="ua" onChange={(e)=>handleLanguageChange(e.target.value)}>UA</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default Language;