import React from 'react';
import { 
  Box, Typography, Button, Card, Chip, 
  Divider, useMediaQuery, useTheme 
} from '@mui/material';
import { ChevronRight, CalendarMonth, AssignmentOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MyProject = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Static data for UI development
  const projects = [
    {
      id: "abJmPYSKka0Ld1qQm6FC",
      name: "A Small Molecule Inhibitor of Estrogen Receptors for the treatment of Breast Cancer",
      created: "Feb 19, 2026",
      status: "In Progress",
    },
    {
      id: "cG-OfykMpuneZO48L_JO",
      name: "A Small Molecule Estrogen Receptor Antagonist for the prevention of metastasis",
      created: "Feb 17, 2026",
      status: "Review",
    },
    {
      id: "xZ-99ykMpuneZO12L_KL",
      name: "Novel CRISPR-based Gene Editing Tool for Agricultural Resilience",
      created: "Jan 12, 2026",
      status: "Completed",
    }
  ];

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
          {/* <Button 
            variant="contained" 
            disableElevation
            sx={{ 
              bgcolor: '#007095', 
              borderRadius: '8px', 
              textTransform: 'none', 
              px: 3, 
              fontWeight: 600,
              '&:hover': { bgcolor: '#005a78' } 
            }}
          >
            New Project
          </Button> */}
        </Box>

        {/* Projects List Card */}
        <Card sx={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
          
          {/* Table Header (Desktop Only) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', px: 4, py: 2, bgcolor: '#FDFDFD', borderBottom: '1px solid #F1F5F9' }}>
              <Typography sx={{ flex: 5, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.5px' }}>PROJECT NAME</Typography>
              <Typography sx={{ flex: 2, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textAlign: 'center' }}>CREATED</Typography>
              <Typography sx={{ flex: 2, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textAlign: 'center' }}>STATUS</Typography>
              <Typography sx={{ flex: 2, fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textAlign: 'right' }}>ACTION</Typography>
            </Box>
          )}

          {projects.map((project, index) => (
            <Box 
              key={project.id} 
              sx={{ 
                transition: '0.2s', 
                '&:hover': { bgcolor: '#F1F5F9' } 
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, px: 4, py: { xs: 3, md: 4 }, gap: { xs: 2, md: 0 } }}>
                
                {/* Project Info */}
                <Box sx={{ flex: 5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.4, mb: 0.5 }}>
                    {project.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AssignmentOutlined sx={{ fontSize: 14 }} /> ID: {project.id}
                  </Typography>
                </Box>

                {/* Created Date */}
                <Box sx={{ flex: 2, textAlign: { xs: 'left', md: 'center' }, width: { xs: '100%', md: 'auto' } }}>
                  {isMobile && <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 0.5 }}>CREATED</Typography>}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'center' }, gap: 1 }}>
                    <CalendarMonth sx={{ fontSize: 16, color: '#64748B' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                      {project.created}
                    </Typography>
                  </Box>
                </Box>

                {/* Status Badge */}
                <Box sx={{ flex: 2, textAlign: { xs: 'left', md: 'center' } }}>
                  {isMobile && <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 0.5 }}>STATUS</Typography>}
                  <Chip 
                    label={project.status} 
                    size="small" 
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: '11px', 
                      bgcolor: project.status === 'Completed' ? '#DCFCE7' : project.status === 'Review' ? '#FEF3C7' : '#DBEAFE', 
                      color: project.status === 'Completed' ? '#166534' : project.status === 'Review' ? '#92400E' : '#1E40AF',
                      borderRadius: '6px'
                    }} 
                  />
                </Box>

                {/* Main Action Button */}
                <Box sx={{ flex: 2, textAlign: 'right', width: { xs: '100%', md: 'auto' } }}>
                  <Button 
                    fullWidth={isMobile}
                    onClick={() => navigate(`/project-details/${project.id}`)}
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
                    Know More
                  </Button>
                </Box>
              </Box>
              {index !== projects.length - 1 && <Divider sx={{ mx: 4, opacity: 0.6 }} />}
            </Box>
          ))}
        </Card>
      </div>
    </Box>
  );
};

export default MyProject;