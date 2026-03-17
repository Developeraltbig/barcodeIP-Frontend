
import React from 'react';
import { Box, Paper, Typography, Container, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// --- MOCK DATA FALLBACKS ---
const fallbackPrimaryData = [
  'Bioelectronic neural interface technology.',
  'Minimally invasive endovascular implants for neuromodulation.',
  'Treatment of autonomic disorders.',
  'Chronically implantable medical device.',
  'Stent-like device inserted via a catheter and released into a blood vessel.',
  'Device capable of sending electrical pulses that stimulate or inhibit the activity of nearby nerves.'
];

const fallbackSecondaryData = [
  'Transvascular neuromodulation.',
  'Long-term ("chronic") stimulation.',
  'Recruitment of a large portion of nearby nerves.'
];

// --- Reusable Sub-Component for Rendering a Feature List ---
const FeatureList = ({ title, items }) => {
  if (!items || items.length === 0) return null; // Don't render empty lists

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#4B5563',
          mb: 2,
          fontSize: '1rem'
        }}
      >
        {title}
      </Typography>

      <List sx={{ p: 0 }}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            disableGutters
            sx={{ display: 'flex', alignItems: 'flex-start', py: 0.5, gap: 2 }}
          >
            <Typography sx={{ color: '#6B7280', fontWeight: 500 }}>{index + 1}.</Typography>
            <ListItemText
              primary={item}
              primaryTypographyProps={{ sx: { color: '#374151', lineHeight: 1.6 } }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

// --- Main Component ---
const KeyFeatures = ({ projectId , featureData}) => {
  const navigate = useNavigate();
  console.log("features jjkhfkhbfh", featureData)

 const project_Id = featureData?.project_id;
 console.log(project_Id);

  const features = featureData?.patent_details?.key_features;

  const handleNavigate = () => {
    if (project_Id) {
      navigate(`/result/${project_Id}`);
    } else {
      console.error("No project ID found to navigate to.");
    }
  };

  return (
    <Box sx={{ bgcolor: '#F3F4F6', py: 5 }}>
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 }, 
            borderRadius: '5px',
            border: '1px solid #E5E7EB',
            bgcolor: '#fff'
          }}
        >
          {/* Main Title */}
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 'bold', mb: 4, color: '#111827' }}
          >
            Key Features
          </Typography>

          {/* Render the Lists with the Dynamic Data */}
          {/* <FeatureList title="Primary Features:" items={primaryFeatures} />
          <FeatureList title="Secondary Features:" items={secondaryFeatures} /> */}

           <Typography 
                    variant="body1" 
                    component="div"
                    dangerouslySetInnerHTML={{ __html: features}} 
                  />
        </Paper>
      </Container> 
    </Box>
  );
};

export default KeyFeatures;





























