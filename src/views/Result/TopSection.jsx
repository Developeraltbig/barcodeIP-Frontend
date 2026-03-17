

import React, { useState } from 'react';
import { 
  Box, Typography, IconButton, Button, Stack, Container, alpha, useTheme, useMediaQuery 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyFeaturesModal from './KeyFeaturesModal';

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RequestReviewModal from '../components/RequestReviewModal';
import { setSelectedProject } from '../../features/slice/userSlice';

const BRAND_RED = "#E94E34";

// Helper function to determine Analyst Button UI based on status
const getAnalystButtonConfig = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return {
        color: "#F59E0B", // Amber
        text: "Review Pending",
        icon: <AccessTimeIcon />,
        clickable: false
      };
    case "inreview":
    case "in review":
      return {
        color: "#3B82F6", // Blue
        text: "In Review",
        icon: <AccessTimeIcon />,
        clickable: false
      };
    case "completed":
      return {
        color: "#10B981", // Green
        text: "Review Complete",
        icon: <CheckCircleOutlineIcon />,
        clickable: false
      };
    case "notrequested":
    default:
      return {
        color: BRAND_RED,
        text: "Request Analyst Review",
        icon: <FactCheckOutlinedIcon />,
        clickable: true
      };
  }
};

const TopSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  const { project_id } = useParams();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  
  const dashboard = useSelector((state) => state.userDashboard || state.user || {});
  
  // Safely check if features exist and have content
  const features = dashboard?.projectPatent?.data?.key_features;
  const hasFeatures = features && (Array.isArray(features) ? features.length > 0 : Object.keys(features).length > 0);

  const resultCount = 
    (dashboard?.projectPatent?.data?.novelty_analysis?.comparisons?.length) || 
    (dashboard.projectProduct?.length) || 
    (dashboard.projectPublication?.length) || 0;

  // Get current Analyst Status
  const currentStatus = dashboard?.selectedProject?.analyst_status || dashboard?.selectedProject?.analystStatus || 'notRequested';
  const analystConfig = getAnalystButtonConfig(currentStatus);

  // Optimistic UI Update: Instantly change the button state to "Pending" after successful request
  const handleReviewSuccess = () => {
    dispatch(setSelectedProject({
      ...dashboard.selectedProject,
      analyst_status: 'pending'
    }));
    setReviewModalOpen(false);
  };

  return (
    <>
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #F1F5F9', pt: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 }, marginTop: { xs: '60px', sm: '80px' } }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', lg: 'center' }} spacing={3}>
            
            {/* Left Side */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, cursor: 'pointer', display: 'inline-flex' }} onClick={() => navigate(-1)}>
                <ArrowBackIcon fontSize="small" sx={{ color: '#94A3B8' }} />
                <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>Back to Dashboard</Typography>
              </Stack>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, fontSize: '1.1rem'}}>
                  Case ID : <Typography component="span" sx={{ color: '#64748B', fontWeight: 500, fontFamily: 'monospace', fontSize: '1rem', letterSpacing: '0.5px' }}>
                    {dashboard?.selectedProject?.case_id?.match(/-(\d+)$/)?.[1] || 'id not found'}
                  </Typography>
                </Typography>
                <Typography variant="caption" sx={{ color: BRAND_RED, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                  <Box component="span" sx={{ fontSize: '14px', lineHeight: 1 }}>•</Box> SHOWING TOP {resultCount} RESULTS
                </Typography>
              </Box>
            </Box>

            {/* Right Side Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', lg: 'auto' }, pt: { xs: 1, lg: 0 } }}>
              
              {/* Only show if features are actually available */}
              {hasFeatures && (
                <Button 
                  variant="outlined" 
                  onClick={() => setModalOpen(true)} 
                  startIcon={<StarBorderIcon />} 
                  fullWidth={isMobile} 
                  sx={{ 
                    px: 2.5, py: 1, borderRadius: '6px', textTransform: 'none', 
                    fontWeight: 600, fontSize: '0.85rem', color: '#475569', 
                    borderColor: '#CBD5E1', '&:hover': { borderColor: '#94A3B8', bgcolor: '#F8FAFC'} 
                  }}
                >
                  View Key Features
                </Button>
              )}

              {/* Dynamic Analyst Review Button */}
              <Button
                variant={analystConfig.clickable ? "outlined" : "text"}
                onClick={() => analystConfig.clickable && setReviewModalOpen(true)}
                startIcon={analystConfig.icon}
                fullWidth={isMobile}
                disableElevation={!analystConfig.clickable}
                disableRipple={!analystConfig.clickable}
                sx={{ 
                  px: 2.5, py: 1, borderRadius: '6px', textTransform: 'none', 
                  fontWeight: 600, fontSize: '0.85rem', 
                  color: analystConfig.color, 
                  borderColor: analystConfig.clickable ? analystConfig.color : 'transparent', 
                  bgcolor: analystConfig.clickable ? 'transparent' : alpha(analystConfig.color, 0.1),
                  cursor: analystConfig.clickable ? 'pointer' : 'default',
                  '&:hover': { 
                    borderColor: analystConfig.clickable ? '#d1432c' : 'transparent', 
                    bgcolor: analystConfig.clickable ? alpha(analystConfig.color, 0.04) : alpha(analystConfig.color, 0.1)
                  } 
                }}
              >
                {analystConfig.text}
              </Button>

            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Existing Key Features Modal */}
      {hasFeatures && (
        <KeyFeaturesModal open={modalOpen} onClose={() => setModalOpen(false)} feature={features} />
      )}
      
      {/* Request Analyst Review Modal */}
      <RequestReviewModal 
        open={reviewModalOpen} 
        onClose={() => setReviewModalOpen(false)} 
        project={dashboard?.selectedProject} 
        onSuccess={handleReviewSuccess}
      />
    </>
  );
};

export default TopSection;