import React, { useState, useEffect } from 'react';
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

const Content = ({ filters }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { type, generation } = filters;
        const response = await fetch(`http://localhost:3000/api/dashboard?type=${type}&generation=${generation}`);
        const result = await response.json();
        setData(result);
        setPage(1); // Reset page to 1 whenever filters change
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [filters]);

  const handleChange = (event, value) => {
    setPage(value);
  };

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
                types={pokemon.types}
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
