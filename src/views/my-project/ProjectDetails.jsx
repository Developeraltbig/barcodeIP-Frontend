import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, Grid, Chip, Divider, IconButton, Paper } from '@mui/material';
import { ArrowBack, CalendarToday, FolderOutlined, PersonOutline, DescriptionOutlined } from '@mui/icons-material';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch data using this 'id'
  const project = {
    id: id,
    name: "A Small Molecule Inhibitor of Estrogen Receptors",
    description: "Research and development of specific inhibitors targeting estrogen receptors to mitigate advanced stage breast cancer progression. This disclosure covers the molecular structure and initial binding affinity results.",
    created: "Feb 19, 2026",
    status: "In Progress",
    owner: "Dr. Sarah Jenkins",
    type: "Biotechnology / Pharma",
    tags: ["Inhibitor", "Estrogen", "Oncology"]
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-5" style={{marginTop:'40px'}}>
      <div className="container">
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate(-1)}
          sx={{ mb: 4, color: '#666' }}
        >
          Back to Projects
        </Button>

        <Grid container spacing={4}>
          {/* Left Column: Info */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4, borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: 'none' }}>
              <Box className="d-flex justify-content-between align-items-start mb-3">
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#002B49' }}>{project.name}</Typography>
                <Chip label={project.status} color="primary" sx={{ fontWeight: 700, borderRadius: '8px' }} />
              </Box>
              
              <Box className="d-flex gap-2 mb-4">
                {project.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Project Overview</Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                {project.description}
              </Typography>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Technical Modules</Typography>
              <Grid container spacing={2}>
                {['InnoCheck', 'ProvisioDraft', 'DraftMaster'].map((mod) => (
                  <Grid item xs={12} sm={4} key={mod}>
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: '12px' }}>
                      <DescriptionOutlined sx={{ mb: 1, color: '#E94E34' }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{mod}</Typography>
                      <Typography variant="caption" color="success.main">Completed</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          {/* Right Column: Metadata */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, borderRadius: '20px', border: 'none', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Details</Typography>
              
              <Box className="d-flex align-items-center mb-4">
                <CalendarToday sx={{ mr: 2, color: '#7A8B94' }} />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary">DATE CREATED</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{project.created}</Typography>
                </Box>
              </Box>

              <Box className="d-flex align-items-center mb-4">
                <PersonOutline sx={{ mr: 2, color: '#7A8B94' }} />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary">PROJECT OWNER</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{project.owner}</Typography>
                </Box>
              </Box>

              <Box className="d-flex align-items-center mb-4">
                <FolderOutlined sx={{ mr: 2, color: '#7A8B94' }} />
                <Box>
                  <Typography variant="caption" display="block" color="text.secondary">CATEGORY</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{project.type}</Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 5 }}>
                <Button fullWidth variant="contained" sx={{ py: 1.5, mb: 2, borderRadius: '10px' }}>
                  Edit Project
                </Button>
                <Button fullWidth variant="outlined" color="error" sx={{ py: 1.5, borderRadius: '10px' }}>
                  Archive
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProjectDetails;