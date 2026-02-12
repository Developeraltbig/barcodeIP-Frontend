import React from 'react';
import { Box, Typography, Container, Stack, Button } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import ExploreIcon from '@mui/icons-material/Explore';

const LandingHero = () => {
  // Motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Perspective transformations
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Box
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <Stack 
          alignItems="center" 
          spacing={2}
          sx={{ 
            textAlign: 'center',
            transform: 'translateZ(50px)' // Pushes text forward in 3D
          }}
        >
          {/* Main Heading */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '3rem', md: '5.5rem' },
              color: '#E94E34',
              textShadow: '0 20px 40px rgba(0,0,0,0.15)',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            Hi, Landing Page
          </Typography>

          {/* Subtext */}
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(0,0,0,0.4)', // Subtle grey subtext
              fontWeight: 600,
              fontSize: { xs: '1rem', md: '1.5rem' },
              maxWidth: '600px',
              transform: 'translateZ(30px)', // Slightly behind the main heading
            }}
          >
            Browse & Discover - All in one place!
          </Typography>

          {/* Interactive Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="contained"
              startIcon={<ExploreIcon />}
              sx={{
                mt: 4,
                bgcolor: '#E94E34', // Signature Orange
                color: 'white',
                px: 5,
                py: 2,
                borderRadius: '50px',
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 15px 30px rgba(233, 78, 52, 0.3)',
                '&:hover': { bgcolor: '#D13D26' },
                transform: 'translateZ(80px)', // Closest element to the viewer
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Stack>
      </motion.div>

      {/* Decorative 3D Elements (Background Blur) */}
      <Box
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
      />
    </Box>
  );
};

export default LandingHero;