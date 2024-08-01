import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import Navbar from './navbar';
import Content from './content';
import Filter from './filter';
import PokemonGacha from '../Pokegacha/pokegacha';

const Library = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedGeneration, setSelectedGeneration] = useState('All');

  const handleFilterChange = (filter, value) => {
    if (filter === 'type') {
      setSelectedType(value);
    } else if (filter === 'generation') {
      setSelectedGeneration(value);
    }
  };

  const filters = { type: selectedType, generation: selectedGeneration };

  return (
    <>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
        <Navbar />
      </Box>
      <Grid container sx={{ height: 'calc(100vh - 80px)' }}>
        <Grid item xs={12} md={9} lg={9}>
          <Box sx={{ overflowY: 'auto', height: '100%' }}>
            <Content filters={filters} />
          </Box>
        </Grid>
        <Grid item xs={12} md={3} lg={3} sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', mt: 5, pr: 5 }}>
              <Filter
                selectedType={selectedType}
                selectedGeneration={selectedGeneration}
                onFilterChange={handleFilterChange}
              />
              <PokemonGacha />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Library;
