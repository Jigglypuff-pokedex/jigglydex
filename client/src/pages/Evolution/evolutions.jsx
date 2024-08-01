import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, CardMedia, styled } from '@mui/material';
import Navbar from '../Library/navbar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledBox = styled(Box)({
  padding: '16px',
  textAlign: 'center'
});

const SearchBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '16px'
});

const StyledTextField = styled(TextField)({
  marginRight: '16px',
  flex: 1
});

const StyledCard = styled(Card)({
  maxWidth: 200, 
  margin: 'auto',
});

const Evolutions = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [evolutionChain, setEvolutionChain] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      const data = await response.json();
      const evolutionResponse = await fetch(data.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();
      const chain = [];
      let current = evolutionData.chain;

      while (current) {
        chain.push({
          name: current.species.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(current.species.url)}.png`
        });
        current = current.evolves_to[0];
      }

      setEvolutionChain(chain);
    } catch (error) {
      console.error('Error fetching Pokémon evolution chain:', error);
      setEvolutionChain([]);
    }
  };

  const getPokemonId = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  return (
    <>
      <Navbar />
      <StyledBox>
        <Typography variant="h4" gutterBottom>Evolutions</Typography>
        <SearchBox>
          <StyledTextField
            placeholder="Search Pokémon to see their evolutions!"
            variant="outlined"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </SearchBox>
        {evolutionChain.length > 0 ? (
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            {evolutionChain.map((pokemon, index) => (
              <React.Fragment key={index}>
                <Grid item>
                  <StyledCard>
                    <CardMedia
                      component="img"
                      image={pokemon.image}
                      alt={pokemon.name}
                      height="200"
                    />
                    <CardContent>
                      <Typography variant="h6" align="center">{pokemon.name}</Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
                {index < evolutionChain.length - 1 && (
                  <Grid item>
                    <ArrowForwardIcon fontSize="large" />
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">Search Pokémon to see their evolutions!</Typography>
        )}
      </StyledBox>
    </>
  );
};

export default Evolutions;