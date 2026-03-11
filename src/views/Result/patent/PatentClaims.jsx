import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Stack } from '@mui/material';

// --- MOCK DATA ---
// Replace this with your actual API endpoint later
const fetchPatentData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "The invention claimed is:",
        claimsCount: 26,
        description: "This is the placeholder for the dynamic description data...",
        information: "This is the placeholder for dynamic patent information...",
        claims: [
          {
            id: 1,
            text: "An implantable pulse generator for stimulating nerves comprising: a first waveform generator adapted to generate a first waveform having a first frequency; a second waveform generator adapted to generate a carrier waveform having a second frequency that is higher than said first frequency; a modulator electrically coupled to said first and second waveform generators and adapted to modulate said first waveform and said carrier waveform to generate a modulated waveform; a surgically implantable housing containing said first and second waveform generators and said modulator; a lead electrically coupled with said modulator and extending from said surgically implantable housing; and an electrode connected to a distal end of said lead and electrically coupled to said modulator for applying said modulated waveform transmitted through said lead."
          },
          {
            id: 2,
            text: "The implantable pulse generator as claimed in claim 1, wherein said lead is a flexible lead, and wherein said first waveform has a frequency adapted to stimulate a target nerve."
          },
          {
            id: 3,
            text: "The implantable pulse generator as claimed in claim 1, wherein said first waveform has a frequency substantially within the range of 10-40 Hz."
          },
          {
            id: 4,
            text: "The implantable pulse generator as claimed in claim 1, wherein said carrier waveform has a frequency substantially within the range of 10-400 KHz."
          },
          {
            id: 5,
            text: "The implantable pulse generator as claimed in claim 1, further comprising a microprocessor adapted to receive biofeedback data and control operation of said first and second waveform generators in response to said biofeedback data."
          },
          {
            id: 6,
            text: "The implantable pulse generator as claimed in claim 5, further comprising a receiving device adapted to receive said biofeedback data, said receiving device being in communication with said microprocessor for providing said biofeedback data thereto."
          }
        ]
      });
    }, 800); // Simulated network delay
  });
};

// --- COMPONENT ---
export default function PatentViewer() {
  const [activeTab, setActiveTab] = useState('claims');
  const [patentData, setPatentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- API INTEGRATION POINT ---
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // REPLACE WITH ACTUAL API CALL: 
        // const response = await fetch('YOUR_API_URL');
        // const data = await response.json();
        const data = await fetchPatentData(); 
        
        setPatentData(data);
      } catch (error) {
        console.error("Failed to fetch patent data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Custom Tab Component for matching the exact design
  const CustomTab = ({ label, value }) => {
    const isActive = activeTab === value;
    return (
      <Box
        onClick={() => setActiveTab(value)}
        sx={{
          flex: 1,
          textAlign: 'center',
          py: 2,
          px: 1,
          cursor: 'pointer',
          bgcolor: isActive ? '#fef2f2' : '#f8f9fa', // Light red if active, light gray if inactive
          color: isActive ? '#d32f2f' : '#757575',
          borderRadius: 1,
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: isActive ? '#fce8e8' : '#f0f0f0',
          }
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#e5e5e5' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#e5e5e5', // Main background color from screenshot
      p: { xs: 2, md: 4 } // Responsive padding
    }}>
      
      {/* Top Navigation Tabs */}
      <Stack 
        direction="row" 
        spacing={{ xs: 1, md: 2 }} 
        sx={{ mb: 4 }}
      >
        <CustomTab label="Description" value="description" />
        <CustomTab label={`Claims (${patentData?.claimsCount || 0})`} value="claims" />
        <CustomTab label="Information" value="information" />
      </Stack>

      {/* Content Area */}
      <Box sx={{ px: { xs: 1, md: 2 } }}>
        
        {/* Dynamic Title (Visible mostly on Claims tab based on image) */}
        {activeTab === 'claims' && (
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 'bold', mb: 2, color: '#1a1a1a' }}
          >
            {patentData.title}
          </Typography>
        )}

        {/* Tab Content Rendering */}
        {activeTab === 'description' && (
          <Typography variant="body1" color="text.secondary">
            {patentData.description}
          </Typography>
        )}

        {activeTab === 'information' && (
          <Typography variant="body1" color="text.secondary">
            {patentData.information}
          </Typography>
        )}

        {activeTab === 'claims' && (
          <Stack spacing={2.5}>
            {patentData.claims.map((claim) => (
              <Typography 
                key={claim.id} 
                variant="body1" 
                sx={{ 
                  color: '#424242', // Dark grey text
                  lineHeight: 1.6,
                  fontSize: '0.95rem'
                }}
              >
                {claim.id}. {claim.text}
              </Typography>
            ))}
          </Stack>
        )}
      </Box>

    </Box>
  );
}