import React from 'react';
import { Box, Typography, Container, Stack, Button } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import ExploreIcon from '@mui/icons-material/Explore';

const LandingHero = ({content}) => {
  // Motion values for mouse tracking
  // const mouseX = useMotionValue(0);
  // const mouseY = useMotionValue(0);

  // // Perspective transformations
  // const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  // const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  // const handleMouseMove = (e) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const x = e.clientX - (rect.left + rect.width / 2);
  //   const y = e.clientY - (rect.top + rect.height / 2);
  //   mouseX.set(x);
  //   mouseY.set(y);
  // };

  // const handleMouseLeave = () => {
  //   mouseX.set(0);
  //   mouseY.set(0);
  // };

  console.log(content.image)
  return (
    <Box
      // onMouseMove={handleMouseMove}
      // onMouseLeave={handleMouseLeave}
      component="img"
      src={ content.images|| "https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg" }
      sx={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#E5E7EB', // Matching the light grey from your image
        overflow: 'hidden',
        perspective: '1200px', // Creates the 3D space
      }}
    >
     

      {/* Decorative 3D Elements (Background Blur) */}
      {/* <Box
        sx={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(233, 78, 52, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '10%',
          left: '15%',
          zIndex: 0,
        }}
      /> */}
    </Box>
  );
};

export default LandingHero;


