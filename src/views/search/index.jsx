import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Container, Typography, Paper, TextField, InputAdornment, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { theme } from './theme';
// import { downloadCasePDF } from './pdfUtils';
import CaseCard from './CaseCard';
import AnalystModal from './AnalystModal';

const mockData = [
  {
    id: '003',
    content: '1. Field of Invention The invention falls within the field of bioelectronic neural interfaces, specifically focusing on minimally invasive endovascular implants for neuromodulation for autonomic disorder treatment...',
    date: 'December 03 at 9:52 AM',
    user: 'developeraltbig@gmail.com'
  },
  {
    id: '002',
    content: 'State machine methods and apparatus improve computer network functionality relating to natural language communication. In one example, a state machine implements an instance of a workflow...',
    date: 'November 28 at 9:51 AM',
    user: 'developeraltbig@gmail.com'
  }
];

function index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (item) => {
    setSelectedCase(item);
    setModalOpen(true);
    
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>Recent Search</Typography>

          <Paper elevation={0} sx={{ p: 4, borderRadius: '8px', border: '1px solid #E0E0E0' }}>
            <TextField
              placeholder="Search with Case ID"
              size="small"
              sx={{ mb: 4, width: '300px' }}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
                ),
              }}
            />

            <Stack spacing={3}>
              {mockData
                .filter(c => c.id.includes(searchTerm))
                .map((item) => (
                  <CaseCard 
                    key={item.id} 
                    item={item} 
                    onSave={handleOpenModal} 
                    onDownload={downloadCasePDF} 
                  />
                ))}
            </Stack>
          </Paper>
        </Container>
      </Box>

      <AnalystModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        caseData={selectedCase} 
      />
    </ThemeProvider>
  );
}

export default index;