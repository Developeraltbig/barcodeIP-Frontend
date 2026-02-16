import React, { useState } from 'react';
import { 
  Box, Typography, IconButton, Button, Stack, Container, alpha, useTheme, useMediaQuery 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyFeaturesModal from './KeyFeaturesModal';

const BRAND_RED = "#E94E34";

const TopSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box sx={{ 
        bgcolor: '#fff', 
        borderBottom: '1px solid #e0e6ed', 
        pt: { xs: 2, sm: 3 }, 
        pb: { xs: 2, sm: 3 }, 
        marginTop: { xs: '60px', sm: '80px' } // Less margin on mobile
      }}>
        <Container maxWidth="xl">
          {/* Main Layout: Stacks on mobile, Side-by-side on tablet+ */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
            spacing={2}
          >
            
            {/* Left Side Info */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: { xs: 1, sm: 2 } }}>
                <IconButton size="small" sx={{ color: '#64748b' }}>
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Back to Dashboard
                </Typography>
              </Stack>

              <Box sx={{ pl: { xs: 1, sm: 1 } }}>
                <Typography 
                  variant={isMobile ? "h5" : "h4"} // Smaller font on mobile
                  sx={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1.5 }}
                >
                  Case ID : 
                  <Typography 
                    component="span" 
                    variant={isMobile ? "h5" : "h4"} 
                    sx={{ color: BRAND_RED, fontWeight: 900, fontFamily: 'Monospace' }}
                  >
                    003
                  </Typography>
                </Typography>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: BRAND_RED, 
                    fontWeight: 700, 
                    letterSpacing: 1, 
                    textTransform: 'uppercase', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mt: 0.5 
                  }}
                >
                  <Box component="span" sx={{ fontSize: '10px' }}>●</Box> Showing top 10 results
                </Typography>
              </Box>
            </Box>

            {/* Right Side Button: Full width on mobile */}
            <Button
              variant="outlined"
              onClick={() => setModalOpen(true)}
              startIcon={<AutoAwesomeIcon />}
              fullWidth={isMobile} // Button takes full width on mobile for better thumb reach
              sx={{
                mt: { xs: 1, sm: 1 },
                px: 3,
                py: 1.2,
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 700,
                color: BRAND_RED,
                borderColor: alpha(BRAND_RED, 0.4),
                '&:hover': {
                  borderColor: BRAND_RED,
                  bgcolor: alpha(BRAND_RED, 0.05),
                  transform: { sm: 'translateY(-2px)' } // Disable hover lift on mobile
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              View Key Features
            </Button>
          </Stack>
        </Container>
      </Box>

      <KeyFeaturesModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default TopSection;