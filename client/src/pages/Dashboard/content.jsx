import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid, Pagination, styled } from '@mui/material';
import FlipCard from './flipCard';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1199, 
      lg: 1530,
      xl: 1536, 
    },
  },
});

const ContentBox = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  height: 'calc(100vh - 80px)', 
  padding: theme.spacing(2),
}));

const itemsPerPage = 12; 

const Content = () => {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const data = Array.from(Array(50).keys()).map((id) => ({
    id,
    name: `Pokemon ${id + 1}`,
    type: 'Fire',
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`,
    stats: {
      hp: 45 + id,
      attack: 49 + id,
      defense: 49 + id,
      specialAttack: 65 + id,
      specialDefense: 65 + id,
      speed: 45 + id,
    },
  }));

  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <ThemeProvider theme={theme}>
      <ContentBox>
        <Grid container spacing={2}>
          {paginatedData.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={pokemon.id}>
              <FlipCard
                id={pokemon.id}
                name={pokemon.name}
                type={pokemon.type}
                image={pokemon.image}
                stats={pokemon.stats}
              />
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
        />
      </ContentBox>
    </ThemeProvider>
  );
};

export default Content;
