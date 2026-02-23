import React, { useState } from 'react';
import { 
  Box, Typography, IconButton, Button, Stack, Container, alpha, useTheme, useMediaQuery 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyFeaturesModal from './KeyFeaturesModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BRAND_RED = "#E94E34";

const TopSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { project_id } = useParams();
  const navigate = useNavigate(); 
    // Selectors
    const dashboard = useSelector((state) => state.userDashboard || {});
    console.log('check --11', dashboard?.selectedProject?.project_id);
  // 1. Get the Project ID from the URL
  
  // Logic to determine which results are currently showing to get the length
  // This looks at patents, products, or publications based on what is active
  const resultCount = 
    (dashboard.projectPatent?.length) || 
    (dashboard.projectProduct?.length) || 
    (dashboard.projectPublication?.length) || 0;

  return (
    <>
      <Box sx={{ 
        bgcolor: '#fff', 
        borderBottom: '1px solid #e0e6ed', 
        pt: { xs: 2, sm: 3 }, 
        pb: { xs: 2, sm: 3 }, 
        marginTop: { xs: '60px', sm: '80px' } 
      }}>
        <Container maxWidth="xl">
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
            spacing={2}
          >
            {/* Left Side Info */}
            <Box>
              <Stack 
                direction="row" 
                alignItems="center" 
                spacing={1} 
                sx={{ mb: { xs: 1, sm: 2 }, cursor: 'pointer' }} 
                onClick={() => navigate('/project')}
              >
                <IconButton size="small" sx={{ color: '#64748b' }}>
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Back to Dashboard
                </Typography>
              </Stack>

              <Box sx={{ pl: { xs: 1, sm: 1 } }}>
                <Typography 
                  variant={isMobile ? "h5" : "h4"} 
                  sx={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1.5 }}
                >
                  Case ID : 
                  <Typography 
                    component="span" 
                    variant={isMobile ? "h5" : "h4"} 
                    sx={{ color: BRAND_RED, fontWeight: 900, fontFamily: 'Monospace' }}
                  >
                    {/* Display last 3 digits or full ID */}
                    {dashboard?.selectedProject?.project_id}
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
                  <Box component="span" sx={{ fontSize: '10px' }}>●</Box> 
                  Showing top {resultCount} results
                </Typography>
              </Box>
            </Box>

            {/* Right Side Button */}
            <Button
              variant="outlined"
              onClick={() => setModalOpen(true)}
              startIcon={<AutoAwesomeIcon />}
              fullWidth={isMobile}
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
                  transform: { sm: 'translateY(-2px)' }
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