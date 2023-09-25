import React from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/index.css'
import {useTranslation} from "react-i18next";
import {ROUTES} from "../entitysData/constants/API_ROUTS";
const About = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleButtonClick = (route:any) => {
    navigate(route);
  };
    
  return (
    <div className="about">
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