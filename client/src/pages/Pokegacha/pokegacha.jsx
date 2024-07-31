import React, { useState, useEffect } from 'react';
import pokeball from '../../assets/pkball.png'; 
import FlipCard from './flipCardSave';
import { Box, Button } from '@mui/material';

const PokemonGacha = () => {
  const [pokemon, setPokemon] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const pokemonAPI = 'http://localhost:3000/api/dashboard/random';

  useEffect(() => {
    const wheel = document.getElementById('wheel');
    if (wheel) {
      wheel.style.transition = 'none';
      wheel.style.transform = 'rotate(360deg)';
      requestAnimationFrame(() => {
        wheel.style.transition = 'all 0s';
        wheel.style.transform = 'rotate(0deg)';
      });
    }
  }, []);

  const getRandomPokemon = async () => {
    const response = await fetch(pokemonAPI);
    const data = await response.json();
    return data;
  };

  const spinWheel = async () => {
    setSpinning(true);
    setShowCard(false);
    const deg = Math.floor(5000 + Math.random() * 5000);
    const wheel = document.getElementById('wheel');
    if (wheel) {
      wheel.style.transition = 'all 5s ease-out';
      wheel.style.transform = `rotate(${deg}deg)`;
    }
    setTimeout(async () => {
      const actualDeg = deg % 360;
      const pokemon = await getRandomPokemon();
      setPokemon(pokemon);
      setSpinning(false);
      setShowCard(true);
    }, 5000);
  };

  const handleFavorite = async (pokemonId) => {
    const userId = '66a9828579bbf523a9b981b3'; 
    const response = await fetch('http://localhost:3000/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, pokemonId }),
    });

    if (response.ok) {
      console.log('Added to favorites');
    } else {
      console.error('Failed to add to favorites');
    }
    setShowCard(false);
  };

  const handleClose = () => {
    setShowCard(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', position: 'relative' }}>
      <Box id="wheel" sx={{
        width: 300,
        height: 300,
        border: '5px solid #000',
        borderRadius: '50%',
        position: 'relative',
        backgroundImage: `url(${pokeball})`,
        backgroundSize: 'cover',
        transition: 'transform 5s ease-out',
        transform: showCard ? 'scale(0)' : 'scale(1)'
      }}>
        <Box sx={{
          width: 0,
          height: 0,
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '30px solid red',
          position: 'absolute',
          top: '-35px',
          left: 'calc(50% - 15px)'
        }}></Box>
      </Box>
      <Button onClick={spinWheel} disabled={spinning} variant="contained" color="primary" sx={{ mt: 2 }}>Spin!</Button>
      {pokemon && showCard && (
        <Box sx={{
          width: '300px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'grow 1s ease-out forwards, yellowGlow 1s infinite alternate',
          '@keyframes grow': {
            from: { transform: 'scale(0) translate(-50%, -50%)' },
            to: { transform: 'scale(1) translate(-50%, -50%)' }
          },
          '@keyframes yellowGlow': {
            from: { boxShadow: '0 0 5px #fff' },
            to: { boxShadow: '0 0 20px #ffeb3b' }
          },
          margin: 0,
        }}>
          <FlipCard
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            image={pokemon.image}
            stats={pokemon.stats}
            onClose={handleClose}
            onFavorite={handleFavorite}
          />
        </Box>
      )}
    </Box>
  );
};

export default PokemonGacha;
