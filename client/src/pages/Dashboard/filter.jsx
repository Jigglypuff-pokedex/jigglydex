import React from 'react';
import { Paper, Typography, FormControl, Select, MenuItem, styled } from '@mui/material';

const FilterBox = styled(Paper)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  overflowY: 'auto',
}));

const types = ['Grass', 'Fire', 'Water', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
const generations = ['Generation I', 'Generation II', 'Generation III', 'Generation IV', 'Generation V', 'Generation VI', 'Generation VII', 'Generation VIII'];
const games = ['Red/Blue', 'Yellow', 'Gold/Silver', 'Crystal', 'Ruby/Sapphire', 'Emerald', 'Diamond/Pearl', 'Platinum', 'Black/White', 'Black 2/White 2', 'X/Y', 'Omega Ruby/Alpha Sapphire', 'Sun/Moon', 'Ultra Sun/Ultra Moon', 'Sword/Shield'];

const Filter = () => {
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedGeneration, setSelectedGeneration] = React.useState('');
  const [selectedGame, setSelectedGame] = React.useState('');

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleGenerationChange = (event) => {
    setSelectedGeneration(event.target.value);
  };

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };

  return (
    <FilterBox>
        <Typography variant="h5" gutterBottom>Filter</Typography>
      
      <Typography variant="h6">Type</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          labelId="type-select-label"
          value={selectedType}
          onChange={handleTypeChange}
        >
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Typography variant="h6">Generation</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          labelId="generation-select-label"
          value={selectedGeneration}
          onChange={handleGenerationChange}
        >
          {generations.map((generation) => (
            <MenuItem key={generation} value={generation}>
              {generation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Typography variant="h6">Game</Typography>
      <FormControl fullWidth>
        <Select
          labelId="game-select-label"
          value={selectedGame}
          onChange={handleGameChange}
        >
          {games.map((game) => (
            <MenuItem key={game} value={game}>
              {game}
            </MenuItem>
          ))}
        </Select>
      </FormControl> 
    </FilterBox>
  );
};

export default Filter;
