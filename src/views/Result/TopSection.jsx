// import React, { useState } from 'react';
// import { 
//   Box, Typography, IconButton, Button, Stack, Container, alpha, useTheme, useMediaQuery 
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import KeyFeaturesModal from './KeyFeaturesModal';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const BRAND_RED = "#E94E34";

// const TopSection = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const { project_id } = useParams();
//   const navigate = useNavigate(); 
//     // Selectors
//     const dashboard = useSelector((state) => state.userDashboard || {});
//     const features = dashboard?.projectPatent?.data?.key_features;

//   // 1. Get the Project ID from the URL
  
//   // Logic to determine which results are currently showing to get the length
//   // This looks at patents, products, or publications based on what is active
//   const resultCount = 
//     (dashboard?.projectPatent?.data?.novelty_analysis?.comparisons?.length) || 
//     (dashboard.projectProduct?.length) || 
//     (dashboard.projectPublication?.length) || 0;

//     // console.log("resultt count---" ,resultCount);
//     // console.log("resultt count---" , dashboard?.projectPatent?.data?.scholarResults)

//   return (
//     <>
//       <Box sx={{ 
//         bgcolor: '#fff', 
//         borderBottom: '1px solid #e0e6ed', 
//         pt: { xs: 2, sm: 3 }, 
//         pb: { xs: 2, sm: 3 }, 
//         marginTop: { xs: '60px', sm: '80px' } 
//       }}>
//         <Container maxWidth="xl">
//           <Stack 
//             direction={{ xs: 'column', sm: 'row' }} 
//             justifyContent="space-between" 
//             alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
//             spacing={2}
//           >
//             {/* Left Side Info */}
//             <Box>
//               <Stack 
//                 direction="row" 
//                 alignItems="center" 
//                 spacing={1} 
//                 sx={{ mb: { xs: 1, sm: 2 }, cursor: 'pointer' }} 
//                 onClick={() => navigate(-1)}
//               >
//                 <IconButton size="small" sx={{ color: '#64748b' }}>
//                   <ArrowBackIcon fontSize="small" />
//                 </IconButton>
//                 <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
//                   Back to Dashboard
//                 </Typography>
//               </Stack>

//               <Box sx={{ pl: { xs: 1, sm: 1 } }}>
//                 <Typography 
//                   variant={isMobile ? "h5" : "h4"} 
//                   sx={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1.5 }}
//                 >
//                   Case ID : 
//                   <Typography 
//                     component="span" 
//                     variant={isMobile ? "h5" : "h4"} 
//                     sx={{ color: BRAND_RED, fontWeight: 900, fontFamily: 'Monospace' }}
//                   >
//                     {/* Display last 3 digits or full ID */}
//                     {dashboard?.selectedProject?.project_id}
//                   </Typography>
//                 </Typography>
                
//                 <Typography 
//                   variant="caption" 
//                   sx={{ 
//                     color: BRAND_RED, 
//                     fontWeight: 700, 
//                     letterSpacing: 1, 
//                     textTransform: 'uppercase', 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 1, 
//                     mt: 0.5 
//                   }}
//                 >
//                   <Box component="span" sx={{ fontSize: '10px' }}>●</Box> 
//                   Showing top {resultCount} results
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Right Side Button */}
//             <Button
//               variant="outlined"
//               onClick={() => setModalOpen(true)}
//               // startIcon={<AutoAwesomeIcon />}
//               fullWidth={isMobile}
             

//               sx={{
//                 mt: { xs: 1, sm: 1 },
//                 px: 3,
//                 py: 1.2,
//                 borderRadius: '12px',
//                 textTransform: 'none',
//                 fontWeight: 700,
//                 color: BRAND_RED,
//                 borderColor: alpha(BRAND_RED, 0.4),
//                 '&:hover': {
//                   borderColor: BRAND_RED,
//                   bgcolor: alpha(BRAND_RED, 0.05),
//                   transform: { sm: 'translateY(-2px)' }
//                 },
//                 transition: 'all 0.2s ease-in-out'
//               }}
//             >
//               View Key Features
//             </Button>
//           </Stack>
//         </Container>
//       </Box>

//       <KeyFeaturesModal open={modalOpen} onClose={() => setModalOpen(false)}  feature={features} />
//     </>
//   );
// };

// export default TopSection;


























































// import React, { useState } from 'react';
// import { 
//   Box, Typography, IconButton, Button, Stack, Container, alpha, useTheme, useMediaQuery 
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import KeyFeaturesModal from './KeyFeaturesModal';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const BRAND_RED = "#E94E34";

// const TopSection = () => {
//   // --- LOGIC (Untouched) ---
//   const [modalOpen, setModalOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Changed to 'md' for better button stacking
//   const { project_id } = useParams();
//   const navigate = useNavigate(); 
  
//   const dashboard = useSelector((state) => state.userDashboard || {});
//   const features = dashboard?.projectPatent?.data?.key_features;

//   const resultCount = 
//     (dashboard?.projectPatent?.data?.novelty_analysis?.comparisons?.length) || 
//     (dashboard.projectProduct?.length) || 
//     (dashboard.projectPublication?.length) || 0;

//   // --- RENDERING ---
//   return (
//     <>
//       <Box sx={{ 
//         bgcolor: '#fff', 
//         borderBottom: '1px solid #F1F5F9', // Slightly softer border color
//         pt: { xs: 2, sm: 3 }, 
//         pb: { xs: 2, sm: 3 }, 
//         marginTop: { xs: '60px', sm: '80px' } 
//       }}>
//         <Container maxWidth="xl">
//           <Stack 
//             direction={{ xs: 'column', lg: 'row' }} 
//             justifyContent="space-between" 
//             alignItems={{ xs: 'flex-start', lg: 'center' }}
//             spacing={3}
//           >
//             {/* --- LEFT SIDE: Back Link & Case Info --- */}
//             <Box>
//               <Stack 
//                 direction="row" 
//                 alignItems="center" 
//                 spacing={1} 
//                 sx={{ mb: 2, cursor: 'pointer', display: 'inline-flex' }} 
//                 onClick={() => navigate(-1)}
//               >
//                 <ArrowBackIcon fontSize="small" sx={{ color: '#94A3B8' }} />
//                 <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
//                   Back to Dashboard
//                 </Typography>
//               </Stack>

//               <Box>
//                 <Typography 
//                   variant="h6" 
//                   sx={{ 
//                     fontWeight: 800, 
//                     color: '#1E293B', 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     flexWrap: 'wrap',
//                     gap: 1.5,
//                     fontSize: '1.1rem'
//                   }}
//                 >
//                   Case ID : 
//                   <Typography 
//                     component="span" 
//                     sx={{ 
//                       color: '#64748B', // Light gray/blue to match image
//                       fontWeight: 500, 
//                       fontFamily: 'monospace',
//                       fontSize: '1rem',
//                       letterSpacing: '0.5px'
//                     }}
//                   >
//                     {dashboard?.selectedProject?.project_id || 'KQ-y9SBkKXxKADmw2ZBP'}
//                   </Typography>
//                 </Typography>
                
//                 <Typography 
//                   variant="caption" 
//                   sx={{ 
//                     color: BRAND_RED, 
//                     fontWeight: 700, 
//                     letterSpacing: '0.5px', 
//                     textTransform: 'uppercase', 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 0.5, 
//                     mt: 1 
//                   }}
//                 >
//                   <Box component="span" sx={{ fontSize: '14px', lineHeight: 1 }}>•</Box> 
//                   SHOWING TOP {resultCount} RESULTS
//                 </Typography>
//               </Box>
//             </Box>

//             {/* --- RIGHT SIDE: Action Buttons --- */}
//             <Stack 
//               direction={{ xs: 'column', sm: 'row' }} 
//               spacing={2} 
//               sx={{ width: { xs: '100%', lg: 'auto' }, pt: { xs: 1, lg: 0 } }}
//             >
//               {/* Button 1: View Key Features */}
//               <Button
//                 variant="outlined"
//                 onClick={() => setModalOpen(true)}
//                 startIcon={<StarBorderIcon />}
//                 fullWidth={isMobile}
//                 sx={{
//                   px: 2.5,
//                   py: 1,
//                   borderRadius: '6px',
//                   textTransform: 'none',
//                   fontWeight: 600,
//                   fontSize: '0.85rem',
//                   color: '#475569',
//                   borderColor: '#CBD5E1',
//                   '&:hover': {
//                     borderColor: '#94A3B8',
//                     bgcolor: '#F8FAFC',
//                   }
//                 }}
//               >
//                 View Key Features
//               </Button>

//               {/* Button 2: Request Analyst Review */}
//               <Button
//                 variant="outlined"
//                 startIcon={<FactCheckOutlinedIcon />}
//                 fullWidth={isMobile}
//                 sx={{
//                   px: 2.5,
//                   py: 1,
//                   borderRadius: '6px',
//                   textTransform: 'none',
//                   fontWeight: 600,
//                   fontSize: '0.85rem',
//                   color: BRAND_RED,
//                   borderColor: BRAND_RED,
//                   '&:hover': {
//                     borderColor: '#d1432c',
//                     bgcolor: alpha(BRAND_RED, 0.04),
//                   }
//                 }}
//               >
//                 Request Analyst Review
//               </Button>

//               {/* Button 3: Download Report */}
//               {/* <Button
//                 variant="contained"
//                 disableElevation
//                 startIcon={<FileDownloadOutlinedIcon />}
//                 fullWidth={isMobile}
//                 sx={{
//                   px: 2.5,
//                   py: 1,
//                   borderRadius: '6px',
//                   textTransform: 'none',
//                   fontWeight: 600,
//                   fontSize: '0.85rem',
//                   bgcolor: BRAND_RED,
//                   color: '#fff',
//                   '&:hover': {
//                     bgcolor: '#d1432c',
//                   }
//                 }}
//               >
//                 Download Report
//               </Button> */}
//             </Stack>

//           </Stack>
//         </Container>
//       </Box>

//       {/* Modal is kept exactly the same */}
//       <KeyFeaturesModal open={modalOpen} onClose={() => setModalOpen(false)} feature={features} />
//     </>
//   );
// };

// export default TopSection;






















import React, { useState } from 'react';
import { 
  Box, Typography, IconButton, Button, Stack, Container, alpha, useTheme, useMediaQuery 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyFeaturesModal from './KeyFeaturesModal';



import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RequestReviewModal from '../components/RequestReviewModal';

const BRAND_RED = "#E94E34";

const TopSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  // ---> 2. ADD STATE FOR NEW MODAL
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  const { project_id } = useParams();
  const navigate = useNavigate(); 
  
  const dashboard = useSelector((state) => state.userDashboard || {});
  const features = dashboard?.projectPatent?.data?.key_features;

  const resultCount = 
    (dashboard?.projectPatent?.data?.novelty_analysis?.comparisons?.length) || 
    (dashboard.projectProduct?.length) || 
    (dashboard.projectPublication?.length) || 0;

  return (
    <>
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #F1F5F9', pt: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 }, marginTop: { xs: '60px', sm: '80px' } }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', lg: 'center' }} spacing={3}>
            
            {/* Left Side (Kept the same) */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, cursor: 'pointer', display: 'inline-flex' }} onClick={() => navigate(-1)}>
                <ArrowBackIcon fontSize="small" sx={{ color: '#94A3B8' }} />
                <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>Back to Dashboard</Typography>
              </Stack>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, fontSize: '1.1rem'}}>
                  Case ID : <Typography component="span" sx={{ color: '#64748B', fontWeight: 500, fontFamily: 'monospace', fontSize: '1rem', letterSpacing: '0.5px' }}>
                    {dashboard?.selectedProject?.project_id || 'KQ-y9SBkKXxKADmw2ZBP'}
                  </Typography>
                </Typography>
                <Typography variant="caption" sx={{ color: BRAND_RED, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                  <Box component="span" sx={{ fontSize: '14px', lineHeight: 1 }}>•</Box> SHOWING TOP {resultCount} RESULTS
                </Typography>
              </Box>
            </Box>

            {/* Right Side Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', lg: 'auto' }, pt: { xs: 1, lg: 0 } }}>
              <Button variant="outlined" onClick={() => setModalOpen(true)} startIcon={<StarBorderIcon />} fullWidth={isMobile} sx={{ px: 2.5, py: 1, borderRadius: '6px', textTransform: 'none', fontWeight: 600, fontSize: '0.85rem', color: '#475569', borderColor: '#CBD5E1', '&:hover': { borderColor: '#94A3B8', bgcolor: '#F8FAFC'} }}>
                View Key Features
              </Button>

              {/* ---> 3. ATTACH ONCLICK TO BUTTON <--- */}
              <Button
                variant="outlined"
                onClick={() => setReviewModalOpen(true)}
                startIcon={<FactCheckOutlinedIcon />}
                fullWidth={isMobile}
                sx={{ px: 2.5, py: 1, borderRadius: '6px', textTransform: 'none', fontWeight: 600, fontSize: '0.85rem', color: BRAND_RED, borderColor: BRAND_RED, '&:hover': { borderColor: '#d1432c', bgcolor: alpha(BRAND_RED, 0.04)} }}
              >
                Request Analyst Review
              </Button>

              {/* <Button variant="contained" disableElevation startIcon={<FileDownloadOutlinedIcon />} fullWidth={isMobile} sx={{ px: 2.5, py: 1, borderRadius: '6px', textTransform: 'none', fontWeight: 600, fontSize: '0.85rem', bgcolor: BRAND_RED, color: '#fff', '&:hover': { bgcolor: '#d1432c'} }}>
                Download Report
              </Button> */}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Existing Modal */}
      <KeyFeaturesModal open={modalOpen} onClose={() => setModalOpen(false)} feature={features} />

      {/* ---> 4. RENDER NEW MODAL <--- */}
      <RequestReviewModal 
        open={reviewModalOpen} 
        onClose={() => setReviewModalOpen(false)} 
        project={dashboard?.selectedProject} 
      />
    </>
  );
};

export default TopSection;