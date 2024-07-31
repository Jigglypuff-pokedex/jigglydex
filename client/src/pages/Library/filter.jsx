import React from 'react';
import { Paper, Typography, FormControl, Select, MenuItem, styled } from '@mui/material';

const FilterBox = styled(Paper)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  overflowY: 'auto',
}));

const types = [
  'All', 'grass', 'fire', 'water', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];
const generations = [
  { label: 'All', value: 'All' },
  { label: 'Generation I', value: 1 },
  { label: 'Generation II', value: 2 },
  { label: 'Generation III', value: 3 },
  { label: 'Generation IV', value: 4 },
  { label: 'Generation V', value: 5 },
  { label: 'Generation VI', value: 6 },
  { label: 'Generation VII', value: 7 },
  { label: 'Generation VIII', value: 8 }
];

const Filter = ({ selectedType, selectedGeneration, onFilterChange }) => {
  const handleTypeChange = (event) => {
    onFilterChange('type', event.target.value);
  };

  const handleGenerationChange = (event) => {
    onFilterChange('generation', event.target.value);
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
            <MenuItem key={generation} value={generation.value}>
              {generation.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FilterBox>
  );
};

export default Filter;
