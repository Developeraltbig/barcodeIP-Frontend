import React, { useMemo } from 'react';
import { 
  Box, Typography, Button, Card, Divider, 
  useMediaQuery, useTheme, CircularProgress 
} from '@mui/material';
import { ChevronRight, CalendarMonth, AssignmentOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedProject } from '../../features/slice/userSlice';
import { useFetchAllProjectsQuery } from '../../features/userApi';

// Import your API hooks and Slice actions


const MyProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // 1. Fetch all projects from API
  const { data: projectsData, isLoading, isError } = useFetchAllProjectsQuery();

  // 2. Safe Data Extraction: Prevents ".length of undefined" error
  const projects = useMemo(() => {
    if (!projectsData) return [];
    // Handles different API structures: { projects: [] } or { data: [] } or raw []
    return projectsData.projects || projectsData.data || (Array.isArray(projectsData) ? projectsData : []);
  }, [projectsData]);

  // 3. Navigation Logic with URL Params
  const handleViewMore = (project) => {
    const projectId = project._id ;
    
    // Store selected project info in Redux for global access
    dispatch(setSelectedProject(project));
    
    // Navigate to the result page with the ID in the URL
    navigate(`/result/${projectId}`);
  };

  // 4. Loading State
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: '#E94E34' }} />
      </Box>
    );
  }

  // 5. Error State
  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography color="error">Failed to load projects. Please refresh the page.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: 6 }}>
      <div className="container">
        {/* Header Section */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
          <Box>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 800, color: '#002B49', mb: 0.5 }}>
              My Projects
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Manage and track your invention disclosures
            </Typography>
          </Box>
        </Box>

        {/* Projects List Card */}
        <Card sx={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
          
          {/* Table Header (Desktop Only) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', px: 4, py: 2, bgcolor: '#FDFDFD', borderBottom: '1px solid #F1F5F9' }}>
              <Typography sx={{ flex: 5, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.5px' }}>PROJECT NAME</Typography>
              <Typography sx={{ flex: 2, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textAlign: 'center' }}>CREATED</Typography>
              <Typography sx={{ flex: 2, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textAlign: 'right' }}>ACTION</Typography>
            </Box>
          )}

          {/* Project Mapping with null check */}
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <Box key={project.project_id || project.id} sx={{ transition: '0.2s', '&:hover': { bgcolor: '#F1F5F9' } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, px: 4, py: { xs: 3, md: 4 }, gap: { xs: 2, md: 0 } }}>
                  
                  {/* Project Info */}
                  <Box sx={{ flex: 5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.4, mb: 0.5 }}>
                      {project.project_title|| project.projectName || "Untitled Project"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AssignmentOutlined sx={{ fontSize: 14 }} /> ID: {project.project_id || project.id}
                    </Typography>
                  </Box>

                  {/* Created Date */}
                  <Box sx={{ flex: 2, textAlign: { xs: 'left', md: 'center' }, width: { xs: '100%', md: 'auto' } }}>
                    {isMobile && <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 0.5 }}>CREATED</Typography>}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'center' }, gap: 1 }}>
                      <CalendarMonth sx={{ fontSize: 16, color: '#64748B' }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "N/A"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action Button */}
                  <Box sx={{ flex: 2, textAlign: 'right', width: { xs: '100%', md: 'auto' } }}>
                    <Button 
                      fullWidth={isMobile}
                      onClick={() => handleViewMore(project)}
                      variant="contained" 
                      disableElevation
                      endIcon={<ChevronRight />}
                      sx={{ 
                        bgcolor: '#E94E34', 
                        fontWeight: 700, 
                        textTransform: 'none',
                        borderRadius: '8px',
                        '&:hover': { bgcolor: '#d1432c' }
                      }}
                    >
                      View More
                    </Button>
                  </Box>
                </Box>
                {index !== projects.length - 1 && <Divider sx={{ mx: 4, opacity: 0.6 }} />}
              </Box>
            ))
          ) : (
            <Box sx={{ p: 10, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">No projects found.</Typography>
              <Typography variant="body2" color="text.disabled">Your invention disclosures will appear here.</Typography>
            </Box>
          )}
        </Card>
      </div>
    </Box>
  );
};

export default MyProject;