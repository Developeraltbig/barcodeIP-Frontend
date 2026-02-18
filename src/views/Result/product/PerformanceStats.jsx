import React from 'react';
import { Box, Paper, Typography, LinearProgress, Stack } from '@mui/material';

// Helper component for individual metric rows
const MetricRow = ({ label, value, color, total = 11 }) => {
  const progress = (value / total) * 100;

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography 
          sx={{ 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            color: '#475569', 
            letterSpacing: '0.05em' 
          }}
        >
          {label}
        </Typography>
        <Typography 
          sx={{ 
            fontSize: '0.85rem', 
            fontWeight: 900, 
            color: color 
          }}
        >
          {value}/{total}
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          height: 8, 
          borderRadius: 4, 
          bgcolor: '#f1f5f9', // Light gray track
          '& .MuiLinearProgress-bar': {
            bgcolor: color, // Dynamic color for the bar
            borderRadius: 4
          }
        }} 
      />
    </Box>
  );
};

export default function PerformanceStats({ stats }) {
  // Destructure the dynamic stats passed from the parent
  const { found, partial, notFound } = stats;

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 4, 
        borderRadius: 6, 
        bgcolor: '#fff', 
        border: '1px solid #e2e8f0',
        minWidth: '320px'
      }}
    >
      {/* 1. Metric Sections */}
      <MetricRow 
        label="FULL ALIGNMENT" 
        value={found} 
        color="#10b981" // Green
      />
      <MetricRow 
        label="PARTIAL MATCH" 
        value={partial} 
        color="#a49b0e" // Gold/Mustard color from image
      />
      <MetricRow 
        label="TECHNOLOGY GAPS" 
        value={notFound} 
        color="#ef4444" // Your Red
      />

      {/* 2. Priority Footer Section */}
      <Box 
        sx={{ 
          mt: 4, 
          p: 1.8, 
          bgcolor: '#fef2f2', // Very light red
          borderRadius: 3, 
          textAlign: 'center',
          border: '1px solid #fecaca20'
        }}
      >
        <Typography 
          sx={{ 
            color: '#ef4444', 
            fontWeight: 800, 
            fontSize: '0.85rem',
            letterSpacing: '0.02em'
          }}
        >
          PRIORITY: Medium Risk Replacement
        </Typography>
      </Box>
    </Paper>
  );
}