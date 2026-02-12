
import React, { useState } from 'react';
import { 
  Box, Typography, IconButton, Button, Stack, Container, 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// --- STYLING CONSTANTS ---
const BRAND_RED = "#E94E34";
const BRAND_AMBER = "#F5A623";


const TopSection = () => {
  

  return (
       
      <>
       {/* 1. TOP NAVIGATION HEADER */}

          <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e0e6ed', pt: 2, pb: 2 , marginTop:'80px' }}>
            <Container maxWidth="xl">
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                <IconButton size="small" sx={{ color: '#64748b' }}>
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, cursor: 'pointer', '&:hover': { color: BRAND_RED } }}>
                  View Key Features
                </Typography>
              </Stack>
    
              <Box sx={{ pl: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  Case ID : 
                  <Typography component="span" variant="h5" sx={{ color: BRAND_RED, fontWeight: 900, fontFamily: 'Monospace' }}>
                    003
                  </Typography>
                </Typography>
                <Typography variant="caption" sx={{ color: BRAND_RED, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                  ● Showing top 10 results
                </Typography>
              </Box>
            </Container>
          </Box>
      
      </>
  );
};



export default TopSection;