import React from 'react';
import { Box, Paper, Typography, Container, List, ListItem, ListItemText } from '@mui/material';

// --- MOCK DATA (This would typically come from an API) ---
const primaryFeaturesData = [
  'Bioelectronic neural interface technology.',
  'Minimally invasive endovascular implants for neuromodulation.',
  'Treatment of autonomic disorders.',
  'Chronically implantable medical device.',
  'Stent-like device inserted via a catheter and released into a blood vessel.',
  'Device capable of sending electrical pulses that stimulate or inhibit the activity of nearby nerves.',
  'Implantable pulse generator (IPG) and an external blood pressure monitor.',
  'Tracks and stimulation sites on a stent-like metal structure.',
  'Structure capable of being compressed into a delivery catheter and expanded into an artery of variable diameter.',
  'Connection via a minimally thrombogenic cable to an IPG.',
  'High currents while maintaining electrochemical stability.',
  'Device controllable via an external pulse generator for open-loop or closed-loop operation.',
  'Expandable structure onto which there are electrodes to stimulate or inhibit the activity of nearby nerves.'
];

const secondaryFeaturesData = [
  'Transvascular neuromodulation.',
  'Long-term ("chronic") stimulation.',
  'Recruitment of a large portion of nearby nerves.'
];

// --- Reusable Sub-Component for Rendering a Feature List ---
const FeatureList = ({ title, items }) => (
  <Box sx={{ mb: 4 }}>
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        color: '#4B5563', // A softer black for subtitles
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
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            py: 0.5,
            gap: 2
          }}
        >
          <Typography sx={{ color: '#6B7280', fontWeight: 500 }}>{index + 1}.</Typography>
          <ListItemText
            primary={item}
            primaryTypographyProps={{
              sx: {
                color: '#374151',
                lineHeight: 1.6
              }
            }}
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

// --- Main Component ---
const KeyFeatures = () => {
  return (
    <Box sx={{ bgcolor: '#F3F4F6', py: 5 }}>
      {' '}
      {/* Consistent background color */}
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 }, // Responsive padding
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            bgcolor: '#fff'
          }}
        >
          {/* Main Title */}
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              color: '#111827'
            }}
          >
            Key Features
          </Typography>

          {/* Render the Primary Features List */}
          <FeatureList title="Primary Features:" items={primaryFeaturesData} />

          {/* Render the Secondary Features List */}
          <FeatureList title="Secondary Features:" items={secondaryFeaturesData} />
        </Paper>
      </Container>
    </Box>
  );
};

export default KeyFeatures;
