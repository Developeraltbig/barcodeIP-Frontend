import React, { useState } from 'react';
import { 
  Box, Typography, Button, Grid, Checkbox, Link, Stack, 
  IconButton, Container, Paper, ToggleButton, ToggleButtonGroup, Divider 
} from '@mui/material';
import { 
  ArrowBack, FileDownload, MoreVert, CompareArrows, 
  AdsClick, Article, Collections, GridView, ViewList, ChevronRight
} from '@mui/icons-material';
import { keyframes, styled } from '@mui/material/styles';

// --- Theme & Animations ---
const COLORS = {
  primary: '#E94E34',
  primaryHover: '#D13D26',
  surface: '#FFFFFF',
  bg: '#F3F5F7',
  text: '#1A202C',
  textLight: '#718096',
  border: '#E2E8F0',
};

const beamAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// --- Styled Components ---
const Workspace = styled(Paper)(({ theme }) => ({
  borderRadius: '24px',
  padding: theme.spacing(4),
  backgroundColor: COLORS.surface,
  boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
  border: `1px solid ${COLORS.border}`,
}));

const IDBadge = styled(Box)({
  background: 'rgba(233, 78, 52, 0.08)',
  color: COLORS.primary,
  padding: '6px 14px',
  borderRadius: '12px',
  fontWeight: 800,
  fontSize: '0.75rem',
  display: 'inline-flex',
  alignItems: 'center',
  border: '1px solid rgba(233, 78, 52, 0.15)',
});

const InteractiveCard = styled(Paper, { shouldForwardProp: (prop) => prop !== 'active' })(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  border: `1px solid ${COLORS.border}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  padding: theme.spacing(3),
  height: '100%',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 20px 30px rgba(0,0,0,0.06)',
    borderColor: 'transparent',
    '&::after': { opacity: 1 }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -1,
    padding: '2px',
    borderRadius: '21px',
    background: `linear-gradient(90deg, ${COLORS.primary}, #FFB347, ${COLORS.primary})`,
    backgroundSize: '200% auto',
    animation: `${beamAnim} 4s linear infinite`,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  }
}));

// --- Card Component ---
const PatentCard = ({ data, viewMode }) => {
  const isList = viewMode === 'list';

  return (
    <InteractiveCard elevation={0}>
      <Box sx={{ display: 'flex', flexDirection: isList ? 'row' : 'column', gap: 3 }}>
        
        {/* Content Section */}
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
            <Checkbox sx={{ p: 0, mt: 0.5, '&.Mui-checked': { color: COLORS.primary } }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.text, fontSize: isList ? '1.15rem' : '1rem' }}>
              {data.title}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <IDBadge>{data.id}</IDBadge>
            <Typography variant="caption" sx={{ color: COLORS.textLight, fontWeight: 700 }}>{data.date}</Typography>
            <Typography variant="caption" sx={{ color: COLORS.textLight, fontWeight: 700 }}>{data.author}</Typography>
            {isList && (
               <Link href="#" sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#4A5568', ml: 2, textDecoration: 'none' }}>
                Show Images
             </Link>
            )}
          </Stack>

          <Typography variant="body2" sx={{ color: COLORS.textLight, mb: 3, lineHeight: 1.7 }}>
            ... This waveform is able to <span style={{ color: COLORS.primary, fontWeight: 800 }}>penetrate efficiently</span> through the tissue to reach the target nerve with minimal loss...
          </Typography>
        </Box>

        {/* Improved Action Buttons */}
        <Box sx={{ minWidth: isList ? '320px' : '100%', display: 'flex', alignItems: 'center' }}>
          <Stack direction={isList ? 'row' : 'row'} spacing={1} sx={{ width: '100%' }}>
            <Button variant="outlined" sx={actionStyle} startIcon={<CompareArrows fontSize="small"/>}>
              {isList ? "Overlap" : "Overlapping"}
            </Button>
            
            <Button 
              variant="contained" 
              sx={{ ...actionStyle, bgcolor: COLORS.primary, color: '#fff', border: 'none', '&:hover': { bgcolor: COLORS.primaryHover } }}
              endIcon={<ChevronRight />}
            >
              View More
            </Button>

            <Button variant="outlined" sx={actionStyle} startIcon={<Article fontSize="small"/>}>
              {isList ? "Similar" : "Similar Doc"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </InteractiveCard>
  );
};

const actionStyle = {
  flex: 1,
  textTransform: 'none',
  fontSize: '0.75rem',
  fontWeight: 800,
  borderRadius: '12px',
  py: 1.2,
  borderColor: COLORS.border,
  color: COLORS.text,
  transition: '0.2s',
  '&:hover': { borderColor: COLORS.primary, bgcolor: 'rgba(233, 78, 52, 0.04)' }
};

// --- Main App ---
const DashboardUI = () => {
  const [viewMode, setViewMode] = useState('grid');
  const tabs = ["Patent", "Publication", "Products", "Provisional", "Non-Provisional"];

  const patents = [
    { id: "US8352026B2", title: "Implantable pulse generators and methods for selective nerve stimulation...", date: "2013-01-08", author: "Anthony DiUbaldi" },
    { id: "US9283394B2", title: "Implantable microstimulators and methods for unidirectional pulse...", date: "2016-03-15", author: "Todd K. Whitehurst" },
  ];

  return (
    <Box sx={{ bgcolor: COLORS.bg, minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        
        {/* Top Title Bar */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: COLORS.textLight, mb: 1, cursor: 'pointer' }}>
              <ArrowBack fontSize="small" />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>Back to Analysis</Typography>
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 900, color: COLORS.text }}>
              Case ID : <span style={{ color: COLORS.primary }}>003</span>
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" startIcon={<FileDownload />}
              sx={{ bgcolor: '#FFB347', fontWeight: 800, borderRadius: '14px', px: 4, textTransform: 'none', '&:hover': { bgcolor: '#F6993F' } }}
            >
              Download Report
            </Button>
            <IconButton sx={{ border: `1px solid ${COLORS.border}`, borderRadius: '14px', bgcolor: '#fff' }}><MoreVert /></IconButton>
          </Stack>
        </Stack>

        {/* Centralized Workspace Container */}
        <Workspace>
          {/* Header of Workspace: Tabs + Toggle */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
              {tabs.map((t, i) => (
                <Button 
                  key={t}
                  sx={{ 
                    borderRadius: '12px', px: 3, fontWeight: 800, textTransform: 'none',
                    color: i === 0 ? COLORS.primary : COLORS.textLight,
                    bgcolor: i === 0 ? 'rgba(233, 78, 52, 0.08)' : 'transparent',
                  }}
                >
                  {t}
                </Button>
              ))}
            </Stack>

            <ToggleButtonGroup value={viewMode} exclusive onChange={(e, v) => v && setViewMode(v)} size="small">
              <ToggleButton value="grid" sx={{ borderRadius: '10px 0 0 10px' }}><GridView fontSize="small" /></ToggleButton>
              <ToggleButton value="list" sx={{ borderRadius: '0 10px 10px 0' }}><ViewList fontSize="small" /></ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Divider sx={{ mb: 4, opacity: 0.6 }} />

          {/* Results Grid */}
          <Grid container spacing={3}>
            {patents.map((p, idx) => (
              <Grid item xs={12} md={viewMode === 'grid' ? 6 : 12} key={idx}>
                <PatentCard data={p} viewMode={viewMode} />
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
             <Typography variant="caption" sx={{ color: COLORS.primary, fontWeight: 800, letterSpacing: 1 }}>
               SHOWING TOP 10 RESULTS • SYNCED WITH DATABASE
             </Typography>
          </Box>
        </Workspace>

      </Container>
    </Box>
  );
};

export default DashboardUI;