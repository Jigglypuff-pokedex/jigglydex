import React, { useState, useEffect } from 'react';
import { Grid, LinearProgress, Button } from '@mui/material';
import Navbar from '../Library/navbar';
import FlipCard from '../Library/flipCard';
import { Box } from '@mui/system';
import forest from '../../assets/forest.jpg'

const Collections = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true); 
    const userId = '66a9828579bbf523a9b981b3';

    useEffect(() => {
        const fetchFavorites = async() => {
            try {
                const response = await fetch(`http://localhost:3000/api/favorites?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const favoriteId = await response.json();
                const favoriteDetails = await Promise.all(favoriteId.map(async(id) => {
                    const res = await fetch(`http://localhost:3000/api/dashboard/specific?pokemonId=${id}`);
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await res.json();
                    const { name, types, image, stats } = data;
                    return {
                        id,
                        name,
                        types,
                        image,
                        stats: Object.keys(stats).map(key => ({
                            name: key,
                            value: stats[key]
                        }))
                    };
                }));
                setFavorites(favoriteDetails);
            } catch(error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setLoading(false); 
            }
        };
        fetchFavorites();
    }, []);

    const handleRelease = async (pokemonId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/favorites?userId=${userId}&pokemonId=${pokemonId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setFavorites(favorites.filter(favorite => favorite.id !== pokemonId));
        } catch (error) {
            console.error('Error releasing pokemon:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', background: `url(${forest})`, backgroundSize: 'cover' }}>
          <Navbar />
          <Box>
            {loading ? (
              <LinearProgress variant="indeterminate" />
            ) : (
              <Grid container spacing={4}>
                {favorites.map((favorite) => (
                  <Grid item key={favorite.id} xs={12} sm={6} md={6} lg={4} xl={2.4}>
                    <FlipCard {...favorite} />
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleRelease(favorite.id)}
                        sx={{ 
                            ml: '20px',
                            background: 'linear-gradient(45deg, #ff6b6b, #ffcc5c, #88d8b0, #6b6bff)',
                            color: '#FFFFFF',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #ff6b6b, #ffcc5c, #88d8b0, #6b6bff)'
                            }
                        }}
                    >
                        Release
                    </Button>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </div>
    );
}

export default Collections;
