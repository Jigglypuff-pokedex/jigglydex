import React from 'react';
import { Grid, Box } from '@mui/material';
import Navbar from './navbar';
import Content from './content';
import Filter from './filter';

const Dashboard = () => {
    return (
        <>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
            <Navbar />
        </Box>
        <Grid container sx={{ height: 'calc(100vh - 80px)'}}>
            <Grid item xs={12} md={9} lg={9}>
                <Box sx={{ overflowY: 'auto', height: '100%' }}> 
                    <Content />
                </Box>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
                <Box sx={{ position: 'sticky', top: 80, height: '60%', mt: 5, md: 5, mr: 5 }}> 
                    <Filter />
                </Box>
            </Grid>
        </Grid>
        </>
    );
};

export default Dashboard;