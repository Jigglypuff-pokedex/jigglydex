import React from 'react';
import './home.css';
import pokeImage from '../../assets/poke.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/signup');
    };

  return (
    <div className='home-container'>
      <div className='intro'>
        <h2 id='welcome'>Welcome <br/>to JigglyDex</h2>
        <div className='slo'>
        <p id='slogan'>
          Explore the World of <img src={pokeImage} alt="Pokémon" className="poke-image" />
           </p>
        </div>
        <button className='get-started-button' onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  )
}

export default Home;
