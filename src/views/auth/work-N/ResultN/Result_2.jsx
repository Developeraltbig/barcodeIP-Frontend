import React, { useState } from 'react';
import {
  Box, Typography, Button, Card, Grid, Checkbox, Link, Stack, 
  IconButton, Container, Chip, Tooltip, Divider
} from '@mui/material';
import {
  ArrowBackIosNew,
  FileDownloadOutlined,
  MenuOutlined,
  DifferenceOutlined,
  AdsClickOutlined,
  ContentCopyOutlined,
  OpenInNew
} from '@mui/icons-material';

// Custom Theme Colors
const COLORS = {
  brand: '#E94E34',
  brandLight: 'rgba(233, 78, 52, 0.08)',
  textPrimary: '#1A1C1E',
  textSecondary: '#5E636E',
  border: '#E0E2E6',
  surface: '#F8F9FB',
  highlightBlue: '#0061A6'
};

const PatentCard = ({ id, title, date, author, snippet }) => (
  <Card 
    elevation={0} 
    sx={{ 
      p: 3, 
      borderRadius: 4, 
      border: `1px solid ${COLORS.border}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: COLORS.brand,
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
      }
    }}
  >
    {/* Title Section */}
    <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2 }}>
      <Checkbox sx={{ p: 0, mt: 0.5, '&.Mui-checked': { color: COLORS.brand } }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.4 }}>
        {title}
      </Typography>
    </Stack>

    {/* Metadata Chips */}
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
      <Chip 
        label={id} 
        size="small" 
        sx={{ bgcolor: COLORS.brandLight, color: COLORS.brand, fontWeight: 700, borderRadius: 1.5 }} 
      />
      <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontWeight: 500 }}>
        {date}
      </Typography>
      <Divider orientation="vertical" flexItem sx={{ height: 12, my: 'auto' }} />
      <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontWeight: 500 }}>
        {author}
      </Typography>
      <Link href="#" sx={{ fontSize: '0.75rem', fontWeight: 700, ml: 'auto', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 0.5 }}>
        Show Images <OpenInNew sx={{ fontSize: 12 }} />
      </Link>
    </Stack>

    {/* Description Snippet */}
    <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 3, lineHeight: 1.6, minHeight: '80px' }}>
      ... This waveform is able to <Box component="span" sx={{ color: COLORS.brand, fontWeight: 600 }}>penetrate efficiently</Box> through the tissue to reach the target nerve with <Box component="span" sx={{ color: COLORS.highlightBlue, fontWeight: 600 }}>minimal loss</Box> in the strength of the electrical signal...
    </Typography>

    {/* Action Footer */}
    <Grid container spacing={1.5}>
      <Grid item xs={12} sm={4}>
        <Button 
          fullWidth variant="outlined" startIcon={<DifferenceOutlined sx={{ fontSize: 18 }}/>}
          sx={{ borderColor: COLORS.border, color: COLORS.textSecondary, textTransform: 'none', borderRadius: 2 }}
        >
          Overlapping
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button 
          fullWidth variant="contained" startIcon={<AdsClickOutlined sx={{ fontSize: 18 }}/>}
          sx={{ bgcolor: COLORS.brand, '&:hover': { bgcolor: '#D13D26' }, textTransform: 'none', borderRadius: 2, boxShadow: 'none' }}
        >
          View More
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button 
          fullWidth variant="outlined" startIcon={<ContentCopyOutlined sx={{ fontSize: 18 }}/>}
          sx={{ borderColor: COLORS.border, color: COLORS.textSecondary, textTransform: 'none', borderRadius: 2 }}
        >
          Similar
        </Button>
      </Grid>
    </Grid>
  </Card>
);

const Result_2 = () => {
  const [activeTab, setActiveTab] = useState('Patent');
  const tabs = ["Patent", "Publication", "Products", "Provisional Specification", "Non-Provisional Specification"];

  return (
    <Box sx={{ bgcolor: COLORS.surface, minHeight: '100vh', py: 5 , marginTop:'50px' }}>
      <Container maxWidth="lg">
        
        {/* Top Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1, cursor: 'pointer', color: COLORS.textSecondary }}>
              <ArrowBackIosNew sx={{ fontSize: 14 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Back to Dashboard</Typography>
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 800, color: COLORS.textPrimary, mb: 0.5 }}>
              Key Features
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6" sx={{ color: COLORS.brand, fontWeight: 700 }}>Case ID: 003</Typography>
              <Chip label="Top 10 Results" size="small" variant="outlined" sx={{ color: COLORS.brand, borderColor: COLORS.brand, fontWeight: 600 }} />
            </Stack>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Button 
              variant="contained" 
              startIcon={<FileDownloadOutlined />} 
              sx={{ bgcolor: '#FFA726', '&:hover': { bgcolor: '#FB8C00' }, borderRadius: 2.5, px: 3, textTransform: 'none', fontWeight: 700, boxShadow: '0 4px 12px rgba(255, 167, 38, 0.3)' }}
            >
              Download Report
            </Button>
            <IconButton sx={{ border: `1px solid ${COLORS.border}`, borderRadius: 2.5 }}>
              <MenuOutlined />
            </IconButton>
          </Stack>
        </Box>

        {/* Tab Filters */}
        <Box sx={{ mb: 4, display: 'flex', gap: 1, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 } }}>
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                px: 3, py: 1, borderRadius: 3, textTransform: 'none', fontWeight: 700, whiteSpace: 'nowrap',
                bgcolor: activeTab === tab ? COLORS.brand : 'transparent',
                color: activeTab === tab ? '#fff' : COLORS.textSecondary,
                '&:hover': { bgcolor: activeTab === tab ? COLORS.brand : COLORS.brandLight }
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>

        {/* Content Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PatentCard 
              id="US8352026B2"
              title="Implantable pulse generators and methods for selective nerve stimulation..."
              date="Jan 08, 2013"
              author="Anthony DiUbaldi"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PatentCard 
              id="US9283394B2"
              title="Implantable microstimulators and methods for unidirectional pulse..."
              date="Mar 15, 2016"
              author="Todd K. Whitehurst"
            />
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};

export default Result_2;













// import React from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Checkbox,
//   Link,
//   Stack,
//   IconButton,
//   Container
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import MenuIcon from '@mui/icons-material/Menu';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import ArticleIcon from '@mui/icons-material/Article';

// // Color Constants based on your screenshot
// const COLORS = {
//   primaryOrange: '#E94E34',
//   lightOrange: '#FFF0ED',
//   textSecondary: '#666666',
//   bgLight: '#F5F5F5',
//   cardBorder: '#E0E0E0'
// };

// const PatentCard = ({ id, title, date, author, description }) => {
//   return (
//     <Card variant="outlined" sx={{ borderRadius: 2, height: '100%', borderColor: COLORS.cardBorder }}>
//       <CardContent sx={{ p: 3 }}>
//         {/* Header: Checkbox + Title */}
//         <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
//           <Checkbox sx={{ p: 0, mr: 1.5, mt: 0.5 }} />
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
//             {title}
//           </Typography>
//         </Box>

//         {/* Metadata Row */}
//         <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
//           <Box sx={{ bgcolor: COLORS.lightOrange, px: 1, py: 0.5, borderRadius: 1 }}>
//             <Typography variant="body2" sx={{ color: COLORS.primaryOrange, fontWeight: 700 }}>
//               {id}
//             </Typography>
//           </Box>
//           <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>{date}</Typography>
//           <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>{author}</Typography>
//           <Link href="#" sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#5C6BC0', textDecoration: 'none' }}>
//             Show Images
//           </Link>
//         </Stack>

//         {/* Description with highlights */}
//         <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 3, lineHeight: 1.6 }}>
//           ... This waveform is able to <span style={{ color: COLORS.primaryOrange }}>penetrate efficiently</span> through the tissue to reach the target nerve with <span style={{ color: '#1976D2' }}>minimal loss</span> in the strength of the electrical signal, thereby saving battery power...
//         </Typography>

//         {/* Action Buttons */}
//         <Grid container spacing={1}>
//           <Grid item xs={4}>
//             <Button 
//               fullWidth 
//               variant="outlined" 
//               startIcon={<VisibilityIcon fontSize="small" />}
//               sx={{ textTransform: 'none', fontSize: '0.7rem', color: '#555', borderColor: '#CCC' }}
//             >
//               View Overlapping
//             </Button>
//           </Grid>
//           <Grid item xs={4}>
//             <Button 
//               fullWidth 
//               variant="contained" 
//               startIcon={<CalendarMonthIcon fontSize="small" />}
//               sx={{ 
//                 textTransform: 'none', 
//                 fontSize: '0.7rem', 
//                 bgcolor: COLORS.primaryOrange, 
//                 '&:hover': { bgcolor: '#D84315' } 
//               }}
//             >
//               View More
//             </Button>
//           </Grid>
//           <Grid item xs={4}>
//             <Button 
//               fullWidth 
//               variant="outlined" 
//               startIcon={<ArticleIcon fontSize="small" />}
//               sx={{ textTransform: 'none', fontSize: '0.7rem', color: '#555', borderColor: '#CCC' }}
//             >
//               Similar Document
//             </Button>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// const ResultN = () => {
//   const categories = ["Patent", "Publication", "Products", "Provisional Specification", "Non-Provisional Specification"];

//   return (
//     <Box sx={{ bgcolor: COLORS.bgLight, minHeight: '100vh', py: 4 }}>
//       <Container maxWidth="xl">
        
//         {/* Top Navigation Bar */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//           <Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//               <IconButton size="small" sx={{ mr: 1 }}><ArrowBackIcon fontSize="small" /></IconButton>
//               <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>View Key Features</Typography>
//             </Box>
//             <Typography variant="h5" sx={{ fontWeight: 800, color: COLORS.primaryOrange }}>
//               Case ID : 003
//             </Typography>
//             <Typography variant="caption" sx={{ color: COLORS.primaryOrange }}>
//               Showing top 10 results
//             </Typography>
//           </Box>

//           <Stack direction="row" spacing={2}>
//             <Button
//               variant="contained"
//               startIcon={<FileDownloadIcon />}
//               sx={{ 
//                 bgcolor: '#FFB74D', 
//                 color: 'white', 
//                 textTransform: 'none', 
//                 fontWeight: 600,
//                 px: 3,
//                 '&:hover': { bgcolor: '#FFA726' }
//               }}
//             >
//               Download Report
//             </Button>
//             <IconButton sx={{ border: '1px solid #CCC', borderRadius: 1 }}>
//               <MenuIcon />
//             </IconButton>
//           </Stack>
//         </Box>

//         {/* Tab Filters */}
//         <Stack direction="row" spacing={1} sx={{ mb: 4, overflowX: 'auto', pb: 1 }}>
//           {categories.map((cat, index) => (
//             <Button
//               key={cat}
//               variant={index === 0 ? "contained" : "text"}
//               sx={{
//                 borderRadius: '8px',
//                 px: 3,
//                 textTransform: 'none',
//                 whiteSpace: 'nowrap',
//                 bgcolor: index === 0 ? COLORS.lightOrange : 'white',
//                 color: index === 0 ? COLORS.primaryOrange : COLORS.textSecondary,
//                 boxShadow: index === 0 ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
//                 '&:hover': { bgcolor: index === 0 ? COLORS.lightOrange : '#fff' }
//               }}
//             >
//               {cat}
//             </Button>
//           ))}
//         </Stack>

//         {/* Grid of Results */}
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <PatentCard 
//               id="US8352026B2"
//               title="Implantable pulse generators and methods for selective nerve..."
//               date="2013-01-08"
//               author="Anthony DiUbaldi"
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <PatentCard 
//               id="US9283394B2"
//               title="Implantable microstimulators and methods for unidirectional p..."
//               date="2016-03-15"
//               author="Todd K. Whitehurst"
//             />
//           </Grid>
//         </Grid>

//       </Container>
//     </Box>
//   );
// };

// export default ResultN;