import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, styled, LinearProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; 
import ShieldIcon from '@mui/icons-material/Shield'; 
import FlashOnIcon from '@mui/icons-material/FlashOn'; 
import SecurityIcon from '@mui/icons-material/Security'; 
import SpeedIcon from '@mui/icons-material/Speed';

const CardContainer = styled(Box)(({ theme }) => ({
  perspective: '1000px',
  width: '300px',
  height: '400px',
  margin: theme.spacing(2),
  transition: 'background 0.5s',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff6b6b, #ffcc5c, #88d8b0, #6b6bff)',
  },
}));

const CardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})(({ isFlipped }) => ({
  position: 'relative',
  width: '95%',
  height: '95%',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
}));

const CardFace = styled(Card)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  border: '1px solid #ccc', 
  borderRadius: '10px',  
  marginLeft: theme.spacing(1), 
  marginTop: theme.spacing(1)
}));

const CardBack = styled(CardFace)(({ theme }) => ({
  transform: 'rotateY(180deg)',
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(1, 0),
}));

const StatIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const StatDetails = styled(Box)(({ theme }) => ({
  flexGrow: 1,
}));

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const FlipCard = ({ id, name, types, image, stats }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardContainer
      onClick={handleClick}
      sx={{
        background: isFlipped ? 'linear-gradient(45deg, #ff6b6b, #ffcc5c, #88d8b0, #6b6bff)' : 'none',
      }}
    >
      <CardInner isFlipped={isFlipped}>
        <CardFace>
          <CardMedia
            component="img"
            image={image}
            alt={name}
            height="300"
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: -3, ml: 2, mr: 2 }}>
            <Box>
              <Typography variant="h5">{name}</Typography>
              <Typography variant="body2" color="textSecondary">ID: {id}</Typography>
              <Box display="flex" justifyContent="left" mt={1} ml={0}>
                {types.map((type) => (
                  <Box
                    key={type}
                    sx={{
                      backgroundColor: typeColors[type] || 'gray',
                      borderRadius: '4px',
                      color: 'white',
                      padding: '2px 8px',
                      margin: '0 4px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {type}
                  </Box>
                ))}
              </Box>
            </Box> 
          </Box>
        </CardFace>
        <CardBack>
          <CardContent>
            <Typography variant="h6">Stats</Typography>
            <StatItem>
              <StatIcon><FavoriteIcon color="error" /></StatIcon>
              <StatDetails>
                <Typography variant="body2" color="textSecondary">HP: {stats.hp}</Typography>
                <LinearProgress variant="determinate" value={stats.hp} sx={{ width: '100%' }} />
              </StatDetails>
            </StatItem>
            <StatItem>
              <StatIcon><FitnessCenterIcon /></StatIcon>
              <StatDetails>
                <Typography variant="body2" color="textSecondary">Attack: {stats.attack}</Typography>
                <LinearProgress variant="determinate" value={stats.attack} sx={{ width: '100%' }} />
              </StatDetails>
            </StatItem>
            <StatItem>
              <StatIcon><ShieldIcon /></StatIcon>
              <StatDetails>
                <Typography variant="body2" color="textSecondary">Defense: {stats.defense}</Typography>
                <LinearProgress variant="determinate" value={stats.defense} sx={{ width: '100%' }} />
              </StatDetails>
            </StatItem>
            <StatItem>
              <StatIcon><FlashOnIcon color="primary" /></StatIcon>
              <StatDetails>
                <Typography variant="body2" color="textSecondary">Special Attack: {stats.specialAttack}</Typography>
                <LinearProgress variant="determinate" value={stats.specialAttack} sx={{ width: '100%' }} />
              </StatDetails>
            </StatItem>
            <StatItem>
              <StatIcon><SecurityIcon color="secondary" /></StatIcon>
              <StatDetails>
                <Typography variant="body2" color="textSecondary">Special Defense: {stats.specialDefense}</Typography>
                <LinearProgress variant="determinate" value={stats.specialDefense} sx={{ width: '100%' }} />
              </StatDetails>
            </StatItem>
            <StatItem>
              <StatIcon><SpeedIcon color="action" /></StatIcon>
              <StatDetails>
                <Typography variant="body2" color="textSecondary">Speed: {stats.speed}</Typography>
                <LinearProgress variant="determinate" value={stats.speed} sx={{ width: '100%' }} />
              </StatDetails>
            </StatItem>
          </CardContent>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default FlipCard;
