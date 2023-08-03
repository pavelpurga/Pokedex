import React from 'react';
import {useNavigate} from "react-router-dom";

const Posts = () => {

  const navigate = useNavigate();
  const handleButtonClick = (route:any) => {
    navigate(route);
  };
    
  return (
    <div>
      <div className="header">
        <h1 className="text">Pokemon's posts</h1>
      </div>
      <div>
        <button className="btn"
          onClick={() => handleButtonClick('/about')}>
              Home
        </button>
        <button className="btn"
          onClick={() => handleButtonClick('/pokemonList')}>
              Posts
        </button>
      </div>
    </div>
  );
};

export default Posts;