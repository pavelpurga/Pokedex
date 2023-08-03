import React from 'react';
import {useNavigate} from "react-router-dom";
import '../../index.css'
const About = () => {
    
  const navigate = useNavigate();

  const handleButtonClick = (route:any) => {
    navigate(route);
  };
    
  return (
    <div className="about">
      <div className="about_text">
              This application was developed for educational purposes, the first task.
      </div>
      <div className="button_group">
        <button className="btn" 
          onClick={() => handleButtonClick('/pokemonList')}>
            Pokedex
        </button>
        <button className="btn"
          onClick={() => handleButtonClick('/posts')}>
            Posts
        </button>
      </div>
    </div>
  );
};

export default About;