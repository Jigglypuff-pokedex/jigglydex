import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, styled, IconButton, LinearProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShieldIcon from '@mui/icons-material/Shield';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CardContainer = styled(Box)(({ theme }) => ({
  perspective: '1000px',
  width: '300px',
  height: '400px',
  margin: theme.spacing(2),
}));

const CardInner = styled(Box)(({ isflipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  transform: isflipped ? 'rotateY(180deg)' : 'rotateY(0)',
}));

const CardFace = styled(Card)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  border: '1px solid #ccc',  // Border color
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',  // Shadow effect
  borderRadius: '10px',  // Rounded corners
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

const FlipCard = ({ id, name, type, image, stats }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddToCollection = (event) => {
    event.stopPropagation();
    setIsAdded(!isAdded);
    //addToCollection(id);
  };

  return (
    <CardContainer onClick={handleClick}>
      <CardInner isflipped={isFlipped}>
        <CardFace>
          <CardMedia
            component="img"
            image={image}
            alt={name}
            height="300"
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ ml: 2, mr: 2 }}>
            <Box>
              <Typography variant="h5">{name}</Typography>
              <Typography variant="body2" color="textSecondary">Type: {type}</Typography>
              <Typography variant="body2" color="textSecondary">ID: {id}</Typography>
            </Box>
            <IconButton onClick={handleAddToCollection}>
              {isAdded ? <FavoriteIcon sx={{ color: '#f4c2c2' }} /> : <FavoriteBorderIcon />}
            </IconButton>
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