
import React from 'react';
import { Box, Typography, Paper, Button, Container, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useNavigate } from 'react-router-dom';
import PatentMetadataDashboard from './PatentMetadataDashboard';
import PatentClaims from './PatentClaims';

const PatentDetail = () => {
     const navigate = useNavigate();

  // Mock image data based on your screenshot
  const figures = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    url: `https://patentimages.storage.googleapis.com/52/fd/ee/69542ab4de5c04/US3121601-drawings-page-3.png${i + 1}`,
  }));

  
  return (

   <Box sx={{background: "#ebebebff",}}>

      <Container maxWidth="xl" sx={{ py: 4, fontFamily: 'Roboto, sans-serif' , paddingTop:'90px' }}>
      
      {/* Navigation Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }} onClick={() => navigate(-1)}>
        <IconButton size="small" sx={{ mr: 1, color: 'text.secondary' }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          Back to results
        </Typography>
      </Box>

      {/* Patent Title */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#2c3e50' }}>
        Implantable pulse generators and methods for selective nerve stimulation
      </Typography>

      {/* Image Carousel Tray */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2.5, 
          bgcolor: '#f5f6f7', 
          borderRadius: '8px',
          border: '1px solid #eaebec'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            pb: 1, // Space for custom scrollbar
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#e4e4e4',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#bdc3c7',
              borderRadius: '10px',
              '&:hover': { backgroundColor: '#95a5a6' }
            },
          }}
        >
          {figures.map((fig) => (
            <Box
              key={fig.id}
              component="img"
              src={fig.url}
              alt={`Patent Figure ${fig.id + 1}`}
              sx={{
                height: { xs: 160, sm: 220 },
                width: 'auto',
                bgcolor: '#fff',
                p: 1.5,
                borderRadius: '4px',
                border: '1px solid #dcdde1',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'transform 0.1s ease',
                // '&:hover': { transform: 'scale(1.01)' }
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* Description Header and Action */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 1.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c2b2bff' }}>
          Description
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AccountTreeIcon />}
          sx={{ 
            bgcolor: '#e74c3c', 
            '&:hover': { bgcolor: '#c0392b' },
            textTransform: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            px: 3
          }}
        >
          Show Mapping
        </Button>
      </Box>

      {/* Technical Text */}
      <Typography 
        variant="body2" 
        sx={{ 
          lineHeight: 1.7, 
          color: '#4a4a4a', 
          textAlign: 'justify',
          fontSize: '0.95rem'
        }}
      >
        An <strong>Implantable Pulse Generator (IPG)</strong> includes a surgically implantable housing, 
        a battery, a first waveform generator, a second waveform generator, a modulator, 
        and electrodes. The IPG produces a pulse envelope, a carrier waveform, and a modulated waveform. 
        The pulse envelope is a low frequency waveform with specific pulse width, amplitude and shape 
        to selectively stimulate a target nerve or body part. The carrier waveform is a high frequency 
        waveform with properties such as amplitude, frequency and the like chosen so as to overcome 
        tissue impedance and the stimulation threshold of the target nerve. The modulated waveform is 
        the waveform obtained by modulating the carrier waveform by the pulse envelope.
      </Typography>
    </Container>
   


   <PatentMetadataDashboard/>
   <PatentClaims/>
   </Box>
  

  );
};

export default PatentDetail;



