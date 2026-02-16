import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider
} from '@mui/material';

// Data based on your image
const data = [
  {
    keyFeature: "**Primary Features** A method for integrating neural and symbolic modules, comprising: Automatically extracting symbolic rules from the internal representations of said neural modules.",
    searchResult: "The US11232357B2 extensively describes a bidirectional conversion process between Explainable Neural Networks (XNNs) and a rule-based XAI model or expert system. Specifically, it discloses a step where an XNN is converted into a 'generalized rule format,' which is a form of symbolic representation...",
    overlap: "Considerable",
    overlapColor: "success"
  },
  {
    keyFeature: "Training said neural modules using constraints derived from symbolic logic, wherein the logic provides a framework for the training process.",
    searchResult: "The US11232357B2 discloses a method for training and refining XNN models while preserving human-injected knowledge. It describes a mechanism where human-defined rules, which are a form of symbolic logic, can be 'locked' or made static within the neural network...",
    overlap: "Considerable",
    overlapColor: "success"
  }
];

const OverlapMatrix = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Helper to format bold text from the raw data
  const renderFormattedText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => 
      part.startsWith('**') && part.endsWith('**') 
        ? <strong key={i}>{part.slice(2, -2)}</strong> 
        : part
    );
  };

  // Mobile View: Cards
  if (isMobile) {
    return (
      <Box sx={{ p: 2, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1a237e' }}>
          Feature Analysis
        </Typography>
        {data.map((item, index) => (
          <Card key={index} sx={{ mb: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="overline" color="text.secondary">Overlap Status</Typography>
                <Chip label={item.overlap} color={item.overlapColor} size="small" />
              </Box>
              
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#1976d2' }}>
                Key Feature
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {renderFormattedText(item.keyFeature)}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#2e7d32' }}>
                Search Result
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.searchResult}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  // Desktop View: Table
  return (
    <Box sx={{ p: 4, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1a237e' }}>
        Feature Analysis Comparison
      </Typography>
      
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#e3f2fd' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Key Feature</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '60%' }}>Search Result</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '15%', textAlign: 'center' }}>Overlap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow 
                key={index} 
                sx={{ '&:nth-of-type(even)': { bgcolor: '#fafafa' }, '&:hover': { bgcolor: '#f1f8ff' } }}
              >
                <TableCell sx={{ verticalAlign: 'top', py: 3 }}>
                  <Typography variant="body2">
                    {renderFormattedText(row.keyFeature)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ verticalAlign: 'top', py: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {row.searchResult}
                  </Typography>
                </TableCell>
                <TableCell sx={{ verticalAlign: 'top', textAlign: 'center', py: 3 }}>
                  <Chip 
                    label={row.overlap} 
                    color={row.overlapColor} 
                    variant="filled"
                    sx={{ fontWeight: 'bold', borderRadius: '4px' }} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OverlapMatrix;