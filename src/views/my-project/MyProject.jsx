// import React, { lazy, useMemo } from 'react';
// import { Box, Typography, Button, Card, Divider, useMediaQuery, useTheme, CircularProgress, IconButton, Stack } from '@mui/material';
// import Loadable from 'components/Loadable';
// import { ChevronRight, CalendarMonth, AssignmentOutlined } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useFetchAllProjectsQuery } from '../../features/userApi';
// import { setSelectedProject } from '../../features/slice/userSlice';
// import { FaArrowLeft } from 'react-icons/fa6';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { RiContactsFill } from "react-icons/ri";

// // Import your API hooks and Slice actions

// const MyProject = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   // 1. Fetch all projects from API
//   const { data: projectsData, isLoading, isError } = useFetchAllProjectsQuery();

//   // 2. Safe Data Extraction: Prevents ".length of undefined" error
//   const projects = useMemo(() => {
//     if (!projectsData) return [];
//     // Handles different API structures: { projects: [] } or { data: [] } or raw []
//     return projectsData.projects || projectsData.data || (Array.isArray(projectsData) ? projectsData : []);
//   }, [projectsData]);

//   // 3. Navigation Logic with URL Params
//   const handleViewMore = (project) => {
//     const projectId = project._id;
//     const caseId = project.project_id;

//     // Store selected project info in Redux for global access
//     dispatch(setSelectedProject(project));

//     // Navigate to the result page with the ID in the URL
//     navigate(`/result/${projectId}`);
//   };

//   // 4. Loading State
//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
//         <CircularProgress sx={{ color: '#E94E34' }} />
//       </Box>
//     );
//   }

//   // 5. Error State
//   if (isError) {
//     return (
//       <Box sx={{ textAlign: 'center', mt: 10 }}>
//         <Typography color="error">Failed to load projects. Please refresh the page.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: 6 }}>
//       <div className="container">
//         {/* Header Section */}
//         <Box
//           sx={{
//             mb: 4,
//             display: 'flex',
//             flexDirection: { xs: 'column', md: 'row' },
//             justifyContent: 'space-between',
//             alignItems: { xs: 'flex-start', md: 'flex-end' },
//             gap: 2
//           }}
//         >
//           <Box>
//             <Stack
//               className='d-flex gap-2 mb-3 '
//               spacing={1}
//               sx={{ mb: { xs: 1, sm: 2 }, cursor: 'pointer' }}
//               onClick={() => navigate(-1)}
//             >
//               {/* <span style={{ color: '#64748b'}}>
                
//               </span> */}
//               <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 , marginBottom:'10px' }}>
//               <ArrowBackIcon fontSize="small" sx={{marginRight:'10px'}} /> Back 
//               </Typography>
//             </Stack>
//             <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 800, color: '#002B49', mb: 0.5 }}>
//               My Projects
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//               Manage and track your invention disclosures
//             </Typography>
//           </Box>
//         </Box>

//         {/* Projects List Card */}
//         <Card sx={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
//           {/* Table Header (Desktop Only) */}
//           {!isMobile && (
//             <Box sx={{ display: 'flex', px: 4, py: 2, bgcolor: '#FDFDFD', borderBottom: '1px solid #F1F5F9' }}>
//               <Typography sx={{ flex: 5, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.5px' }}>
//                 PROJECT NAME
//               </Typography>
//               <Typography sx={{ flex: 2, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textAlign: 'center' }}>CREATED</Typography>
//               <Typography sx={{ flex: 2, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textAlign: 'center' }}>ACTION</Typography>
//               <Typography sx={{ flex: 2, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textAlign: 'right'}}>CONNECT ANALYST</Typography>
//             </Box>
//           )}

//           {/* Project Mapping with null check */}
//           {projects && projects.length > 0 ? (
//             projects.map((project, index) => (
//               <Box key={project.project_id || project.id} sx={{ transition: '0.2s', '&:hover': { bgcolor: '#F1F5F9' } }}>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     flexDirection: { xs: 'column', md: 'row' },
//                     alignItems: { xs: 'flex-start', md: 'center' },
//                     px: 4,
//                     py: { xs: 3, md: 4 },
//                     gap: { xs: 2, md: 0 }
//                   }}
//                 >
//                   {/* Project Info */}
//                   <Box sx={{ flex: 5 }}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.4, mb: 0.5 }}>
//                       {project.project_title || project.projectName || 'Untitled Project'}
//                     </Typography>
//                     <Typography variant="caption" sx={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       <AssignmentOutlined sx={{ fontSize: 14 }} /> ID: {project.project_id || project.id}
//                     </Typography>
//                   </Box>

//                   {/* Created Date */}
//                   <Box sx={{ flex: 2, textAlign: { xs: 'left', md: 'center' }, width: { xs: '100%', md: 'auto' } }}>
//                     {isMobile && (
//                       <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 0.5 }}>
//                         CREATED
//                       </Typography>
//                     )}
//                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'center' }, gap: 1 }}>
//                       <CalendarMonth sx={{ fontSize: 16, color: '#64748B' }} />
//                       <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
//                         {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Action Button */}
//                   <Box sx={{ flex: 2.5, textAlign: 'center', width: { xs: '100%', md: 'auto' }}}>
//                     <Button
//                       fullWidth={isMobile}
//                       onClick={() => handleViewMore(project)}
//                       variant="contained"
//                       disableElevation
//                       endIcon={<ChevronRight />}
//                       sx={{
//                         bgcolor: '#E94E34',
//                         fontWeight: 700,
//                         textTransform: 'none',
//                         borderRadius: '8px',
//                         '&:hover': { bgcolor: '#d1432c' }
//                       }}
//                     >
//                       View More
//                     </Button>
//                   </Box>

//                   <Box sx={{ flex: 1.5, textAlign: 'right', width: { xs: '100%', md: 'auto' } }}>
//                     <Button
//                       fullWidth={isMobile}
//                       onClick={() => handleViewMore(project)}
//                       variant="contained"
//                       disableElevation
//                       // endIcon={<ChevronRight />}
//                       sx={{
//                         border:  '1px solid #E94E34',
//                         fontWeight: 700,
//                         textTransform: 'none',
//                         borderRadius: '8px',
//                         bgcolor:'transparent',
//                         color:'#E94E34',
//                         '&:hover': { bgcolor: '#d1432c' , color:'white'}
//                       }}
//                     >
//                       <RiContactsFill style={{marginRight:'10px'}} />  Connect
//                     </Button>

//                     {/* <IconButton >
//                       <GrContact />
//                     </IconButton> */}
//                   </Box>
//                 </Box>
//                 {index !== projects.length - 1 && <Divider sx={{ mx: 4, opacity: 0.6 }} />}
//               </Box>
//             ))
//           ) : (
//             <Box sx={{ p: 10, textAlign: 'center' }}>
//               <Typography variant="h6" color="text.secondary">
//                 No projects found.
//               </Typography>
//               <Typography variant="body2" color="text.disabled">
//                 Your invention disclosures will appear here.
//               </Typography>
//             </Box>
//           )}
//         </Card>
//       </div>
//     </Box>
//   );
// };

// export default MyProject;










// import React, { useMemo } from 'react';
// import { 
//   Box, Typography, Button, Card, Divider, useMediaQuery, useTheme, 
//   CircularProgress, Stack, Chip, alpha, Paper, 
//   Container
// } from '@mui/material';
// import { 
//   ChevronRight, 
//   CalendarTodayOutlined, 
//   GridViewOutlined,
//   PersonAddAltOutlined,
//   AccessTime,
//   CheckCircleOutline
// } from '@mui/icons-material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// // --- API & Slice Imports (Unchanged) ---
// import { useFetchAllProjectsQuery } from '../../features/userApi';
// import { setSelectedProject } from '../../features/slice/userSlice';

// // ==========================================
// // HELPER COMPONENTS & FORMATTERS
// // ==========================================

// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
// };

// const getMockModules = (index) => {
//   if (index === 0) return ['Patent', 'Publication', 'Products'];
//   if (index === 1) return ['Patent', 'Provisional'];
//   return ['Patent', 'Publication', 'Products', 'Provisional', 'Non-Prov'];
// };

// // ENHANCED: Modern "Soft" Status Badges
// const AnalystReviewBadge = ({ index }) => {
//   // Define styles for different states
//   let config = { 
//     mainColor: '#EF4444', // Red
//     bg: '#FEF2F2', 
//     icon: <PersonAddAltOutlined sx={{ fontSize: 18 }} />, 
//     text: 'Request Review' 
//   };
  
//   if (index === 1) {
//     config = { 
//       mainColor: '#F59E0B', // Amber
//       bg: '#FFFBEB', 
//       icon: <AccessTime sx={{ fontSize: 18 }} />, 
//       text: 'Review Pending' 
//     };
//   } else if (index === 2) {
//     config = { 
//       mainColor: '#10B981', // Emerald Green
//       bg: '#ECFDF5', 
//       icon: <CheckCircleOutline sx={{ fontSize: 18 }} />, 
//       text: 'Review Complete' 
//     };
//   }

//   return (
//     <Box
//       sx={{
//         display: 'inline-flex',
//         alignItems: 'center',
//         gap: 1,
//         bgcolor: config.bg,
//         color: config.mainColor,
//         px: 2,
//         py: 1,
//         borderRadius: '8px',
//         fontWeight: 600,
//         fontSize: '0.85rem',
//         border: `1px solid ${alpha(config.mainColor, 0.2)}`,
//         width: { xs: '100%', md: 'auto' }, // Full width on mobile, auto on desktop
//         justifyContent: { xs: 'center', md: 'flex-start' }
//       }}
//     >
//       {config.icon}
//       {config.text}
//     </Box>
//   );
// };

// // ==========================================
// // MAIN COMPONENT
// // ==========================================

// const MyProject = () => {
//   // --- LOGIC (Untouched) ---
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const { data: projectsData, isLoading, isError } = useFetchAllProjectsQuery();

//   const projects = useMemo(() => {
//     if (!projectsData) return [];
//     return projectsData.projects || projectsData.data || (Array.isArray(projectsData) ? projectsData : []);
//   }, [projectsData]);

//   const handleViewMore = (project) => {
//     const projectId = project._id;
//     dispatch(setSelectedProject(project));
//     navigate(`/result/${projectId}`);
//   };

//   // --- RENDERING ---
//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: '#F8FAFC' }}>
//         <CircularProgress sx={{ color: '#E94E34' }} />
//       </Box>
//     );
//   }

//   if (isError) {
//     return (
//       <Box sx={{ textAlign: 'center', mt: 10, minHeight: '80vh', bgcolor: '#F8FAFC' }}>
//         <Typography color="error" variant="h6">Failed to load projects. Please refresh the page.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ bgcolor: '#F8FAFC', pt: { xs: 4, md: 8 }, pb: 8 , marginTop:'50px' }}>
//       <Container  maxWidth="xl" sx={{ mx: 'auto', px: { xs: 2, sm: 4, md: 6 } }}>
        
//         {/* ENHANCED Header Section */}
//         <Box sx={{ mb: 6 }}>
//           <Stack
//             direction="row"
//             alignItems="center"
//             spacing={0.5}
//             sx={{ 
//               mb: 3, 
//               display: 'inline-flex', 
//               cursor: 'pointer',
//               color: '#64748B',
//               transition: 'color 0.2s',
//               '&:hover': { color: '#0F172A' }
//             }}
//             onClick={() => navigate(-1)}
//           >
//             <ArrowBackIcon fontSize="small" /> 
//             <Typography variant="body2" sx={{ fontWeight: 600 }}>Back</Typography>
//           </Stack>
          
//           <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ fontWeight: 800, color: '#0F172A', mb: 1, letterSpacing: '-0.5px' }}>
//             My Projects
//           </Typography>
//           <Typography variant="body1" sx={{ color: '#64748B', fontWeight: 400, fontSize: '1.1rem' }}>
//             Manage and track your invention disclosures
//           </Typography>
//         </Box>

//         {/* ENHANCED Projects List Card */}
//         <Card 
//           elevation={0}
//           sx={{ 
//             borderRadius: '16px', 
//             border: '1px solid #E2E8F0', 
//             boxShadow: '0 4px 20px rgba(0,0,0,0.03)', 
//             overflow: 'hidden',
//             bgcolor: '#FFFFFF'
//           }}
//         >
          
//           {/* Table Header (Desktop Only) */}
//           {!isMobile && (
//             <Box sx={{ 
//               display: 'flex', 
//               px: 4,
//               py: 2.5, 
//               borderBottom: '1px solid #E2E8F0',
//               bgcolor: '#F8FAFC' // Slight gray background for header
//             }}>
//               <Typography sx={{ width: '38%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px' }}>PROJECT NAME</Typography>
//               <Typography sx={{ width: '15%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px' }}>CREATED</Typography>
//               <Typography sx={{ width: '22%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px' }}>MODULES</Typography>
//               <Typography sx={{ width: '15%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px', pl: 1 }}>ANALYST REVIEW</Typography>
//               <Typography sx={{ width: '10%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px', textAlign: 'right' }}>ACTION</Typography>
//             </Box>
//           )}

//           {/* Project Rows */}
//           {projects && projects.length > 0 ? (
//             projects.map((project, index) => (
//               <Box key={project.project_id || project.id || index}>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     flexDirection: { xs: 'column', md: 'row' },
//                     alignItems: { xs: 'flex-start', md: 'center' },
//                     p: { xs: 3, md: 4 },
//                     gap: { xs: 3, md: 0 },
//                     transition: 'all 0.2s ease',
//                     // Hover effect: subtle background change and a sleek left border accent
//                     '&:hover': { 
//                       bgcolor: '#F8FAFC',
//                       boxShadow: 'inset 4px 0 0 0 #E94E34'
//                     }
//                   }}
//                 >
                  
//                   {/* Column 1: Project Name & ID */}
//                   <Box sx={{ width: { xs: '100%', md: '38%' }, pr: 3 }}>
//                     <Typography 
//                       variant="subtitle1" 
//                       sx={{ fontWeight: 700, color: '#1E293B', lineHeight: 1.4, mb: 1, fontSize: '1.05rem' }}
//                     >
//                       {project.project_title || project.projectName || 'Untitled Project'}
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
//                       <GridViewOutlined sx={{ fontSize: 16, color: '#94A3B8' }} />
//                       <Typography variant="caption" sx={{ color: '#64748B', fontFamily: 'monospace', letterSpacing: '0.5px', fontSize: '0.85rem' }}>
//                         {project.project_id || project.id || 'SudYvi25rnx7_DOVEz8h'}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Column 2: Created Date */}
//                   <Box sx={{ width: { xs: '100%', md: '15%' } }}>
//                     {isMobile && <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 1 }}>CREATED</Typography>}
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <CalendarTodayOutlined sx={{ fontSize: 18, color: '#94A3B8' }} />
//                       <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
//                         {formatDate(project.createdAt)}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Column 3: Modules (Chips) */}
//                   <Box sx={{ width: { xs: '100%', md: '22%' }, display: 'flex', flexWrap: 'wrap', gap: 1, pr: 2 }}>
//                     {isMobile && <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', width: '100%', mb: 0.5 }}>MODULES</Typography>}
//                     {getMockModules(index).map((mod, i) => (
//                       <Chip 
//                         key={i} 
//                         label={mod} 
//                         size="small" 
//                         sx={{ 
//                           bgcolor: '#F1F5F9', 
//                           color: '#475569', 
//                           fontWeight: 600, 
//                           fontSize: '0.75rem',
//                           borderRadius: '6px', // Slightly more square chips look modern
//                           border: '1px solid #E2E8F0'
//                         }} 
//                       />
//                     ))}
//                   </Box>

//                   {/* Column 4: Analyst Review Status */}
//                   <Box sx={{ width: { xs: '100%', md: '15%' }, display: 'flex', justifyContent: 'flex-start' }}>
//                      {isMobile && <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 1, width: '100%' }}>ANALYST REVIEW</Typography>}
//                      <AnalystReviewBadge index={index} />
//                   </Box>

//                   {/* Column 5: Action Button */}
//                   <Box sx={{ width: { xs: '100%', md: '10%' }, display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, mt: { xs: 1, md: 0 } }}>
//                     <Button
//                       fullWidth={isMobile}
//                       onClick={() => handleViewMore(project)}
//                       variant="contained"
//                       disableElevation
//                       endIcon={<ChevronRight />}
//                       sx={{
//                         bgcolor: '#E94E34',
//                         color: 'white',
//                         fontWeight: 600,
//                         textTransform: 'none',
//                         borderRadius: '8px',
//                         py: 1,
//                         px: 2,
//                         transition: 'all 0.2s',
//                         '&:hover': { 
//                           bgcolor: '#D1432C',
//                           transform: 'translateY(-1px)',
//                           boxShadow: '0 4px 12px rgba(233, 78, 52, 0.2)'
//                         }
//                       }}
//                     >
//                       View More
//                     </Button>
//                   </Box>

//                 </Box>
                
//                 {index !== projects.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
//               </Box>
//             ))
//           ) : (
//             <Box sx={{ p: 10, textAlign: 'center', bgcolor: '#FFFFFF' }}>
//               <Typography variant="h6" sx={{ color: '#0F172A', fontWeight: 600, mb: 1 }}>No projects found</Typography>
//               <Typography variant="body1" sx={{ color: '#64748B' }}>Your invention disclosures will appear here once you create them.</Typography>
//             </Box>
//           )}

//         </Card>
//       </Container>
//     </Box>
//   );
// };

// export default MyProject;
























import React, { useMemo, useState } from 'react';
import { 
  Box, Typography, Button, Card, Divider, useMediaQuery, useTheme, 
  CircularProgress, Stack, Chip, alpha, Container 
} from '@mui/material';
import { 
  ChevronRight, 
  CalendarTodayOutlined, 
  GridViewOutlined,
  PersonAddAltOutlined,
  AccessTime,
  CheckCircleOutline
} from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// --- API & Slice Imports (Unchanged) ---
import { useFetchAllProjectsQuery } from '../../features/userApi';
import { setSelectedProject } from '../../features/slice/userSlice';
import RequestReviewModal from '../components/RequestReviewModal';



// ==========================================
// HELPER COMPONENTS & FORMATTERS
// ==========================================

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getMockModules = (index) => {
  if (index === 0) return ['Patent', 'Publication', 'Products'];
  if (index === 1) return ['Patent', 'Provisional'];
  return ['Patent', 'Publication', 'Products', 'Provisional', 'Non-Prov'];
};

// ENHANCED: Modern "Soft" Status Badges (Updated to make 'Request' clickable)
const AnalystReviewBadge = ({ index, onActionClick }) => {
  let config = { 
    mainColor: '#EF4444', // Red
    bg: '#FEF2F2', 
    icon: <PersonAddAltOutlined sx={{ fontSize: 18 }} />, 
    text: 'Request Review',
    isClickable: true // Flag to render as a button
  };
  
  if (index === 1) {
    config = { mainColor: '#F59E0B', bg: '#FFFBEB', icon: <AccessTime sx={{ fontSize: 18 }} />, text: 'Review Pending', isClickable: false };
  } else if (index === 2) {
    config = { mainColor: '#10B981', bg: '#ECFDF5', icon: <CheckCircleOutline sx={{ fontSize: 18 }} />, text: 'Review Complete', isClickable: false };
  }

  const commonStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    bgcolor: config.bg,
    color: config.mainColor,
    px: 2,
    py: 1,
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.85rem',
    border: `1px solid ${alpha(config.mainColor, 0.2)}`,
    width: { xs: '100%', md: 'auto' },
    justifyContent: { xs: 'center', md: 'flex-start' }
  };

  // Render as a clickable Button if it's the "Request Review" state
  if (config.isClickable) {
    return (
      <Button 
        onClick={onActionClick}
        disableElevation
        sx={{
          ...commonStyles,
          textTransform: 'none',
          '&:hover': {
            bgcolor: alpha(config.mainColor, 0.1),
            borderColor: alpha(config.mainColor, 0.4)
          }
        }}
      >
        {config.icon}
        {config.text}
      </Button>
    );
  }

  // Render as a static Box for Pending/Complete states
  return (
    <Box sx={commonStyles}>
      {config.icon}
      {config.text}
    </Box>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const MyProject = () => {
  // --- NEW STATE FOR MODAL ---
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [projectToReview, setProjectToReview] = useState(null);

  // --- LOGIC (Untouched) ---
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data: projectsData, isLoading, isError } = useFetchAllProjectsQuery();

  const projects = useMemo(() => {
    if (!projectsData) return [];
    return projectsData.projects || projectsData.data || (Array.isArray(projectsData) ? projectsData : []);
  }, [projectsData]);

  const handleViewMore = (project) => {
    const projectId = project._id;
    dispatch(setSelectedProject(project));
    navigate(`/result/${projectId}`);
  };

  // Function to handle opening the modal for a specific project row
  const handleOpenReviewModal = (project) => {
    setProjectToReview(project);
    setReviewModalOpen(true);
  };

  // --- RENDERING ---
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: '#F8FAFC' }}>
        <CircularProgress sx={{ color: '#E94E34' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10, minHeight: '80vh', bgcolor: '#F8FAFC' }}>
        <Typography color="error" variant="h6">Failed to load projects. Please refresh the page.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#F8FAFC', pt: { xs: 4, md: 8 }, pb: 8, marginTop: '50px' }}>
      <Container maxWidth="xl" sx={{ mx: 'auto', px: { xs: 2, sm: 4, md: 6 } }}>
        
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ mb: 3, display: 'inline-flex', cursor: 'pointer', color: '#64748B', transition: 'color 0.2s', '&:hover': { color: '#0F172A' } }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon fontSize="small" /> 
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Back</Typography>
          </Stack>
          
          <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ fontWeight: 800, color: '#0F172A', mb: 1, letterSpacing: '-0.5px' }}>
            My Projects
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', fontWeight: 400, fontSize: '1.1rem' }}>
            Manage and track your invention disclosures
          </Typography>
        </Box>

        {/* Projects List Card */}
        <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', overflow: 'hidden', bgcolor: '#FFFFFF' }}>
          
          {/* Table Header (Desktop Only) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', px: 4, py: 2.5, borderBottom: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
              <Typography sx={{ width: '38%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px' }}>PROJECT NAME</Typography>
              <Typography sx={{ width: '15%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px' }}>CREATED</Typography>
              <Typography sx={{ width: '22%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px' }}>MODULES</Typography>
              <Typography sx={{ width: '15%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px', pl: 1 }}>ANALYST REVIEW</Typography>
              <Typography sx={{ width: '10%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px', textAlign: 'right' }}>ACTION</Typography>
            </Box>
          )}

          {/* Project Rows */}
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <Box key={project.project_id || project.id || index}>
                <Box
                  sx={{
                    display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' },
                    p: { xs: 3, md: 4 }, gap: { xs: 3, md: 0 }, transition: 'all 0.2s ease',
                    '&:hover': { bgcolor: '#F8FAFC', boxShadow: 'inset 4px 0 0 0 #E94E34' }
                  }}
                >
                  
                  <Box sx={{ width: { xs: '100%', md: '38%' }, pr: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', lineHeight: 1.4, mb: 1, fontSize: '1.05rem' }}>
                      {project.project_title || project.projectName || 'Untitled Project'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <GridViewOutlined sx={{ fontSize: 16, color: '#94A3B8' }} />
                      <Typography variant="caption" sx={{ color: '#64748B', fontFamily: 'monospace', letterSpacing: '0.5px', fontSize: '0.85rem' }}>
                        {project.project_id || project.id || 'SudYvi25rnx7_DOVEz8h'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: { xs: '100%', md: '15%' } }}>
                    {isMobile && <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 1 }}>CREATED</Typography>}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayOutlined sx={{ fontSize: 18, color: '#94A3B8' }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                        {formatDate(project.createdAt)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: { xs: '100%', md: '22%' }, display: 'flex', flexWrap: 'wrap', gap: 1, pr: 2 }}>
                    {isMobile && <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', width: '100%', mb: 0.5 }}>MODULES</Typography>}
                    {getMockModules(index).map((mod, i) => (
                      <Chip 
                        key={i} label={mod} size="small" 
                        sx={{ bgcolor: '#F1F5F9', color: '#475569', fontWeight: 600, fontSize: '0.75rem', borderRadius: '6px', border: '1px solid #E2E8F0' }} 
                      />
                    ))}
                  </Box>

                  {/* Column 4: Analyst Review Status */}
                  <Box sx={{ width: { xs: '100%', md: '15%' }, display: 'flex', justifyContent: 'flex-start' }}>
                     {isMobile && <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 1, width: '100%' }}>ANALYST REVIEW</Typography>}
                     
                     {/* ---> PASS ONCLICK EVENT HERE <--- */}
                     <AnalystReviewBadge index={index} onActionClick={() => handleOpenReviewModal(project)} />
                  </Box>

                  <Box sx={{ width: { xs: '100%', md: '10%' }, display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, mt: { xs: 1, md: 0 } }}>
                    <Button
                      fullWidth={isMobile}
                      onClick={() => handleViewMore(project)}
                      variant="contained" disableElevation endIcon={<ChevronRight />}
                      sx={{
                        bgcolor: '#E94E34', color: 'white', fontWeight: 600, textTransform: 'none', borderRadius: '8px', py: 1, px: 2,
                        transition: 'all 0.2s', '&:hover': { bgcolor: '#D1432C', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(233, 78, 52, 0.2)' }
                      }}
                    >
                      View More
                    </Button>
                  </Box>

                </Box>
                {index !== projects.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
              </Box>
            ))
          ) : (
            <Box sx={{ p: 10, textAlign: 'center', bgcolor: '#FFFFFF' }}>
              <Typography variant="h6" sx={{ color: '#0F172A', fontWeight: 600, mb: 1 }}>No projects found</Typography>
              <Typography variant="body1" sx={{ color: '#64748B' }}>Your invention disclosures will appear here once you create them.</Typography>
            </Box>
          )}

        </Card>
      </Container>

      {/* ---> ATTACH THE NEW MODAL HERE <--- */}
      <RequestReviewModal
        open={reviewModalOpen} 
        onClose={() => setReviewModalOpen(false)} 
        project={projectToReview} 
      />

    </Box>
  );
};

export default MyProject;