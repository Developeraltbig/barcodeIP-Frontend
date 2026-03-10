import React from 'react';
import { Box, Typography, Container, Stack, Button } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import ExploreIcon from '@mui/icons-material/Explore';

const LandingHero = ({content}) => {


  return (
    <Box
    
      component="img"
      src={ content.image }
      sx={{
        width: '100%',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#E5E7EB', // Matching the light grey from your image
        overflow: 'hidden',
        perspective: '1200px', // Creates the 3D space
      }}
    >
     

    </Box>
  );
};

export default LandingHero;


