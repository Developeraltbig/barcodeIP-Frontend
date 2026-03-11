
import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, CircularProgress, Stack, Container, Fade, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';

// ==========================================
// 1. MOCK API SERVICE
// ==========================================
const fetchPatentData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "The invention claimed is:",
        description: "This is the dynamically loaded description of the patent. It contains the background, summary, and detailed description of the invention.\n\nIn a real application, this text would be fetched from your backend API based on the selected patent ID.",
        claims: [
          "An implantable pulse generator for stimulating nerves comprising: a first waveform generator adapted to generate a first waveform...",
          "The implantable pulse generator as claimed in claim 1, wherein said lead is a flexible lead...",
          "The implantable pulse generator as claimed in claim 1, wherein said first waveform has a frequency substantially within the range of 10-40 Hz."
        ],
        // --- NEW DYNAMIC INFORMATION DATA ---
        information: {
          citationsCount: 136,
          citations: [
            { id: 1, pubNum: 'US3683915A', priDate: '1969-12-15', pubDate: '1972-08-15', assignee: 'Kimberly Clark Co', title: 'Catamenial devices and methods of making the same' },
            { id: 2, pubNum: 'US3902502A', priDate: '1974-09-13', pubDate: '1975-09-02', assignee: 'Saul Liss', title: 'Apparatus for temporarily arresting arthritic pain' },
            { id: 3, pubNum: 'US3933147A', priDate: '1970-04-02', pubDate: '1976-01-20', assignee: 'Vall Wilbur E Du', title: 'Apparatus and method for treating disorders in the region of the pubococcygeous muscle' },
            { id: 4, pubNum: 'US3941136A', priDate: '1973-11-21', pubDate: '1976-03-02', assignee: 'Neuronyx Corporation', title: 'Method for artificially inducing urination, defecation, or sexual excitation' },
            { id: 5, pubNum: 'US4406288A', priDate: '1981-04-06', pubDate: '1983-09-27', assignee: 'Hugh P. Cash', title: 'Bladder control device and method' },
            { id: 6, pubNum: 'US8352026B2', priDate: '-', pubDate: '2013-01-08', assignee: '-', title: 'Implantable pulse generators and methods for selective nerve stimulation' },
          ],
          parentCount: 0,
          parentApps: [], // Empty array to test the (0) state
          priorityCount: 8,
          priorityApps: [
            { id: 1, appNum: 'US11/866,588', priDate: '2007-10-03', filingDate: '2007-10-03', title: 'Implantable pulse generators and methods for selective nerve stimulation' },
            { id: 2, appNum: 'EP08834864A', priDate: '2007-10-03', filingDate: '2008-10-01', title: 'Implantable pulse generators and methods for selective nerve stimulation' },
          ]
        }
      });
    }, 800);
  });
};


// ==========================================
// 2. REUSABLE UI COMPONENTS
// ==========================================

// --- Navigation Tab ---
const CustomTab = ({ label, isActive, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      flex: 1, textAlign: 'center', py: { xs: 1.5, sm: 2 }, px: 1, cursor: 'pointer',
      bgcolor: isActive ? '#fff1f1' : '#f4f6f8', 
      color: isActive ? '#ef4444' : '#64748b',
      borderRadius: 1, border: '1px solid', borderColor: isActive ? '#fee2e2' : 'transparent',
      transition: 'all 0.2s ease-in-out', userSelect: 'none',
      '&:hover': { bgcolor: isActive ? '#ffe4e4' : '#e2e8f0' }
    }}
  >
    <Typography variant="body2" sx={{ fontWeight: isActive ? 600 : 500 }}>{label}</Typography>
  </Box>
);

// --- Custom Data Table ---
const CustomTable = ({ columns, data, maxHeight, blueLinks = false }) => (
  <TableContainer 
    component={Paper} 
    elevation={0} 
    sx={{ 
      maxHeight: maxHeight || 'auto', 
      borderRadius: 0, 
      border: '1px solid #e0e0e0',
      bgcolor: '#f2f0f2' // Matches the faint pinkish-gray row background from image
    }}
  >
    <Table stickyHeader size="small">
      <TableHead>
        <TableRow>
          {columns.map((col, idx) => (
            <TableCell 
              key={idx} 
              sx={{ 
                bgcolor: '#d1d5db', // Gray header
                color: '#4b5563', 
                fontWeight: 600, 
                borderBottom: '1px solid #c0c4cc',
                py: 1.5
              }}
            >
              {col.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} sx={{ py: 3, textAlign: 'center', color: '#6b7280' }}>
              No records found.
            </TableCell>
          </TableRow>
        ) : (
          data.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((col, colIdx) => {
                // Determine if this cell should have blue "link" text
                const isLinkCell = blueLinks && (col.key === 'appNum' || col.key === 'title' || col.key === 'pubNum');
                return (
                  <TableCell 
                    key={colIdx} 
                    sx={{ 
                      color: isLinkCell ? '#4f81bd' : '#424242', 
                      cursor: isLinkCell ? 'pointer' : 'default',
                      borderBottom: '1px solid #e0e0e0',
                      py: 1.5
                    }}
                  >
                    {row[col.key]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
);


// ==========================================
// 3. INFORMATION TAB LAYOUT COMPONENT
// ==========================================
const InformationView = ({ infoData }) => {
  // Column definitions for the tables
  const citationCols = [
    { label: 'Publication number', key: 'pubNum' },
    { label: 'Priority date', key: 'priDate' },
    { label: 'Publication date', key: 'pubDate' },
    { label: 'Assignee', key: 'assignee' },
    { label: 'Title', key: 'title' },
  ];

  const parentAppCols = [
    { label: 'Application', key: 'appNum' },
    { label: 'Priority date', key: 'priDate' },
    { label: 'Filing date', key: 'filingDate' },
    { label: 'Relation', key: 'relation' },
    { label: 'Title', key: 'title' },
  ];

  const priorityAppCols = [
    { label: 'Application', key: 'appNum' },
    { label: 'Priority date', key: 'priDate' },
    { label: 'Filing date', key: 'filingDate' },
    { label: 'Title', key: 'title' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      
      {/* Citations Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#111' }}>
          Patent Citations ({infoData.citationsCount})
        </Typography>
        {/* Set maxHeight to create the scrollbar seen in screenshot 1 */}
        <CustomTable columns={citationCols} data={infoData.citations} maxHeight={400} />
      </Box>

      {/* Priority & Related Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#111' }}>
          Priority And Related Applications
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>
            Parent Applications ({infoData.parentCount})
          </Typography>
          <CustomTable columns={parentAppCols} data={infoData.parentApps} />
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>
            Priority Applications ({infoData.priorityCount})
          </Typography>
          {/* blueLinks flag makes App Number and Title blue like screenshot 2 */}
          <CustomTable columns={priorityAppCols} data={infoData.priorityApps} blueLinks={true} />
        </Box>
      </Box>

    </Box>
  );
};


// ==========================================
// 4. MAIN PARENT COMPONENT
// ==========================================
export default function PatentClaims() {
  const [activeTab, setActiveTab] = useState('information'); // Defaulted to Information for testing
  const [patentData, setPatentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- API FETCH LOGIC ---
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchPatentData(); 
        setPatentData(data);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !patentData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#e5e5e5' }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 2, md: 5 } }}>
      <Container maxWidth="xl" sx={{ bgcolor: 'transparent' }}>
        
        {/* Navigation Tabs */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <CustomTab label="Description" isActive={activeTab === 'description'} onClick={() => setActiveTab('description')} />
          <CustomTab label={`Claims (${patentData.claims.length})`} isActive={activeTab === 'claims'} onClick={() => setActiveTab('claims')} />
          <CustomTab label="Information" isActive={activeTab === 'information'} onClick={() => setActiveTab('information')} />
        </Stack>

        {/* Dynamic Content Rendering Area */}
        <Box sx={{ px: { xs: 1, sm: 0 } }}>
          
          {activeTab === 'description' && (
            <Fade in={true} timeout={500}>
              <Typography variant="body1" sx={{ color: '#333', whiteSpace: 'pre-line' }}>{patentData.description}</Typography>
            </Fade>
          )}

          {activeTab === 'claims' && (
            <Fade in={true} timeout={500}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#111' }}>{patentData.title}</Typography>
                <Stack spacing={3}>
                  {patentData.claims.map((claimText, index) => (
                    <Typography key={index} variant="body1" sx={{ color: '#333' }}>{index + 1}. {claimText}</Typography>
                  ))}
                </Stack>
              </Box>
            </Fade>
          )}

          {/* NEW INFORMATION TAB RENDER */}
          {activeTab === 'information' && (
            <Fade in={true} timeout={500}>
              <Box>
                <InformationView infoData={patentData.information} />
              </Box>
            </Fade>
          )}

        </Box>
      </Container>
    </Box>
  );
}