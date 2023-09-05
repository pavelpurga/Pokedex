import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/index.css'
import {Radio} from "antd";
import i18n from "../entitysData/i18n/i18n";
import {useTranslation} from "react-i18next";
import {ROUTES} from "../entitysData/constants/API_ROUTS";
const About = () => {

  const [selectedLanguage,setSelectedLanguage] = useState("en");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleButtonClick = (route:any) => {
    navigate(route);
  };
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };
    
  return (
    <div className="about">
      <Radio.Group value={selectedLanguage}>
        <Radio.Button value="ru" onChange={(e)=>handleLanguageChange(e.target.value)} >{t('RU')}</Radio.Button>
        <Radio.Button value="en" onChange={(e)=>handleLanguageChange(e.target.value)}>{t('EN')}</Radio.Button>
        <Radio.Button value="ua" onChange={(e)=>handleLanguageChange(e.target.value)}>{t('UA')}</Radio.Button>
      </Radio.Group>
      <div className="about_text">
        {t('This application was developed for educational purposes, the first task.')}
      </div>
      <div className="button_group">
        <button className="btn" 
          onClick={() => handleButtonClick(ROUTES.POKEMON_LIST)}>
          {t('Pokedex')}
        </button>
        <button className="btn"
          onClick={() => handleButtonClick(ROUTES.POSTS)}>
          {t('Posts')}
        </button>
        <button className="btn"
          onClick={() => handleButtonClick(ROUTES.ADD_MOVIE)}>
          {t('Movie')}
        </button>
      </div>
    </div>
  );
};

export default About;