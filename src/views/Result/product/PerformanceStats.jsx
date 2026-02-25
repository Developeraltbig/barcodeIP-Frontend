import React from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';

const MetricRow = ({ label, value, color, total }) => {
  // Avoid division by zero
  const progress = total > 0 ? (value / total) * 100 : 0;

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography 
          sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', letterSpacing: '0.05em' }}
        >
          {label}
        </Typography>
        <Typography 
          sx={{ fontSize: '0.85rem', fontWeight: 900, color: color }}
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
          bgcolor: '#f1f5f9',
          '& .MuiLinearProgress-bar': {
            bgcolor: color,
            borderRadius: 4
          },
        }} 
      />
    </Box>
  );
};

export default function PerformanceStats({ stats }) {
  const { found, partial, notFound, total } = stats;

  // Logic to determine priority text color/label based on gaps
  const isHighRisk = notFound > (total / 3);

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 4, 
        borderRadius: 5, 
        bgcolor: '#fff', 
        height: '100%',
        border:'none'
      }}
    >
      <MetricRow label="FULL ALIGNMENT" value={found} total={total} color="#10b981" />
      <MetricRow label="PARTIAL MATCH" value={partial} total={total} color="#a49b0e" />
      <MetricRow label="TECHNOLOGY GAPS" value={notFound} total={total} color="#ef4444" />

      <Box 
        sx={{ 
          mt: 4, 
          p: 1.8, 
          bgcolor: '#fef2f2', 
          borderRadius: 3, 
          textAlign: 'center',
          border: '1px solid #fecaca'
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
          PRIORITY: {isHighRisk ? 'High Risk Replacement' : 'Medium Risk Replacement'}
        </Typography>
      </Box>
    </Paper>
  );
}