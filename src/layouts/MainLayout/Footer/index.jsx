import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#222222', // Dark background from screenshot
        color: '#ffffff',
        pt: 6,
        pb: 3,
        mt: 'auto', // Pushes footer to bottom if content is short
      }}
    >
      <Container >
        <Grid container spacing={4} alignItems="flex-start" justifyContent={"space-between"}>
          
          {/* 1. Brand/Logo Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff', fontSize:"30px" }}>
                barcode
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#E94E34', fontSize:"30px" }}>
                IP
              </Typography>
              <Box 
                component="span" 
                sx={{ width: 6, height: 6, bgcolor: '#E94E34', borderRadius: '50%', ml: 0.5 }} 
              />
            </Box>
          </Grid>

          {/* 2. Contact Us Section */}
          <Grid item xs={12} sm={4} md={2.5}>
            <Typography variant="caption" sx={{ color: '#888', fontWeight: 700, letterSpacing: 1 }}>
              CONTACT US
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
              916389769482
            </Typography>
          </Grid>

          {/* 3. Email Section */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="caption" sx={{ color: '#888', fontWeight: 700, letterSpacing: 1 }}>
              EMAIL
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
              altbig@gmail.com
            </Typography>
          </Grid>

          {/* 4. Address Section */}
          <Grid item xs={12} sm={4} md={2.5}>
            <Typography variant="caption" sx={{ color: '#888', fontWeight: 700, letterSpacing: 1 }}>
              ADDRESS
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
              altBig
            </Typography>
          </Grid>
        </Grid>

        {/* Divider Line */}
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />

        {/* Bottom Bar: Copyright and Privacy */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="caption" sx={{ color: '#666' }}>
            © Terms and Conditions Applied
          </Typography>
          
          <Link 
            href="#" 
            underline="hover" 
            sx={{ 
              color: '#E94E34', 
              fontSize: '0.75rem', 
              fontWeight: 600 
            }}
          >
            Privacy
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;