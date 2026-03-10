import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  List, 
  ListItem, 
  ListItemText,
  Container 
} from '@mui/material';

const PatentMetadataDashboard = () => {
  const accentRed = "#d32f2f";
  const lightGreyBg = "#f9f9f9";

  // Reusable scrollbox style to match screenshot
  const scrollBoxStyle = {
    height: '300px',
    overflowY: 'auto',
    pr: 1,
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#9e9e9e',
      borderRadius: '10px',
    },
  };

  const cardStyle = {
    p: 3,
    bgcolor: lightGreyBg,
    borderRadius: '4px', // Slightly sharper corners to match original
    border: '1px solid #e0e0e0',
    height: '100%',
    boxShadow: 'none'
  };

  return (
    <Box sx={{ bgcolor: '#eee', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        
        {/* Top Patent ID Header */}
        <Box sx={{ 
          bgcolor: '#fff1f0', 
          border: '1px solid #ffcccb', 
          borderRadius: 1, 
          py: 1.5, 
          textAlign: 'center', 
          mb: 3 
        }}>
          <Typography variant="h6" sx={{ color: accentRed, fontWeight: 'bold' }}>
            US8352026B2
          </Typography>
        </Box>

        <Grid container spacing={2}>
          
          {/* Top Left: Inventor & Assignee */}
          <Grid item xs={12} md={6}>
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ color: accentRed, fontWeight: 'bold', mb: 0.5 }}>
                Inventor
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Anthony DiUbaldi,
              </Typography>
              
              <Typography variant="subtitle1" sx={{ color: accentRed, fontWeight: 'bold', mb: 0.5 }}>
                Current Assignee
              </Typography>
              <Typography variant="body2">
                Ethicon Inc
              </Typography>
            </Paper>
          </Grid>

          {/* Top Right: Worldwide Applications */}
          <Grid item xs={12} md={6}>
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ color: accentRed, fontWeight: 'bold', mb: 1 }}>
                Worldwide applications
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>2007 - US</Typography>
              <Typography variant="body2" color="text.secondary">
                2008 - JP CN EP CA WO AU BR
              </Typography>
            </Paper>
          </Grid>

          {/* Bottom Left: Application Events */}
          <Grid item xs={12} md={6}>
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ color: accentRed, fontWeight: 'bold', mb: 2 }}>
                Application events
              </Typography>
              <Box sx={scrollBoxStyle}>
                <List dense disablePadding>
                  {[
                    "2007/10/03 - Application filed by Ethicon Inc",
                    "2007/10/03 - Priority to US11/866,588",
                    "2008/03/17 - Assigned to ETHICON, INC.",
                    "2008/10/01 - Priority to AU2008308860A",
                    "2008/10/01 - Priority to JP2010528089A",
                    "2008/10/01 - Priority to CA2701359A",
                    "2008/10/01 - Priority to EP08834864A",
                    "2008/10/01 - Priority to BRPI0818694A"
                  ].map((text, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5, alignItems: 'flex-start' }}>
                      <Box sx={{ mr: 1, mt: 0.8, width: 4, height: 4, borderRadius: '50%', bgcolor: '#555', flexShrink: 0 }} />
                      <ListItemText 
                        primary={text} 
                        primaryTypographyProps={{ fontSize: '0.85rem', color: '#444' }} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>

          {/* Bottom Right: Classification */}
          <Grid item xs={12} md={6}>
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" sx={{ color: accentRed, fontWeight: 'bold', mb: 2 }}>
                Classification
              </Typography>
              <Box sx={scrollBoxStyle}>
                <List dense disablePadding>
                  {[
                    { code: "A61N1/0514", desc: "Electrodes for the urinary tract" },
                    { code: "A61N1/36007", desc: "Applying electric currents by contact electrodes alternating or intermittent currents for stimulation of urogenital or gastrointestinal organs, e.g. for incontinence control" },
                    { code: "A61N1/36017", desc: "External stimulators, e.g. with patch electrodes with leads or electrodes penetrating the skin" },
                    { code: "A61N1/36071", desc: "Pain" },
                    { code: "A61N1/36171", desc: "Frequency" },
                    { code: "A61N1/36196", desc: "Frequency modulation" }
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1, alignItems: 'flex-start' }}>
                      <Box sx={{ mr: 1, mt: 0.8, width: 4, height: 4, borderRadius: '50%', bgcolor: '#555', flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 600, mr: 1, display: 'inline' }}>
                        {item.code}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', display: 'inline' }}>
                        - {item.desc}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default PatentMetadataDashboard;