// import React, { useState } from 'react';
// import {
//   Box, Container, Typography, TextField, InputAdornment, Paper, IconButton, 
//   Stack, Divider, ThemeProvider, createTheme, CssBaseline, Dialog, 
//   DialogTitle, DialogContent, Button
// } from '@mui/material';
// import {
//   Search as SearchIcon,
//   BookmarkBorder as BookmarkIcon,
//   FileDownloadOutlined as DownloadIcon,
//   MoreVert as MoreIcon,
//   Close as CloseIcon
// } from '@mui/icons-material';
// // import { jsPDF } from "jspdf";

import { ReplayCircleFilled } from "@mui/icons-material";

// // 1. Theme setup to match the image's specific colors
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#D34335', // The reddish-orange from the screenshot
//     },
//     background: {
//       default: '#F5F5F5',
//       paper: '#FFFFFF',
//     },
//     text: {
//       primary: '#333333',
//       secondary: '#666666',
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//   },
// });

// const RecentSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedCase, setSelectedCase] = useState(null);

//   const cases = [
//     {
//       id: '003',
//       content: '1. Field of Invention The invention falls within the field of bioelectronic neural interfaces, specifically focusing on minimally invasive endovascular implants for neuromodulation for autonomic disorder treatment. 2. Summarize the subject matter (product, system or process). The subject matter is a chronically implantable medical device, more specifically it is a stent-like device which is set to be...',
//       date: 'December 03 at 9:52 AM',
//       user: 'developeraltbig@gmail.com'
//     },
//     {
//       id: '002',
//       content: 'State machine methods and apparatus improve computer network functionality relating to natural language communication. In one example, a state machine implements an instance of a workflow to facilitate natural language communication with an entity, and comprises one or more transitions, wherein each transition is triggered by an event and advances the state machine to an outcome...',
//       date: 'November 28 at 9:51 AM',
//       user: 'developeraltbig@gmail.com'
//     }
//   ];

//   const handleDownload = (item) => {
//     const doc = new jsPDF();
//     doc.text(`Case ID: ${item.id}`, 10, 10);
//     doc.text(`Date: ${item.date}`, 10, 20);
//     const splitContent = doc.splitTextToSize(item.content, 180);
//     doc.text(splitContent, 10, 30);
//     doc.save(`Case_${item.id}.pdf`);
//   };

//   const handleOpenModal = (item) => {
//     setSelectedCase(item);
//     setOpenModal(true);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ minHeight: '100vh', pt: 4, pb: 8, bgcolor: '#F5F5F5' }}>
//         <Container maxWidth="lg">
          
//           <Typography variant="h5" sx={{ mb: 3, fontWeight: 500, color: '#444' }}>
//             Recent Search
//           </Typography>

//           <Paper elevation={0} sx={{ p: 4, borderRadius: '8px', border: '1px solid #E0E0E0' }}>
            
//             {/* Search Input */}
//             <TextField
//               placeholder="Search with Case ID"
//               size="small"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{
//                 mb: 4, width: '300px',
//                 '& .MuiOutlinedInput-root': { borderRadius: '4px' }
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon fontSize="small" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* List of Cases */}
//             <Stack spacing={3}>
//               {cases.filter(c => c.id.includes(searchTerm)).map((item) => (
//                 <Box key={item.id} sx={{ 
//                   border: '1px solid #E0E0E0', 
//                   borderRadius: '4px',
//                   position: 'relative'
//                 }}>
//                   <Box sx={{ p: 3 }}>
//                     <IconButton size="small" sx={{ position: 'absolute', top: 8, right: 8 }}>
//                       <MoreIcon fontSize="small" color="disabled" />
//                     </IconButton>

//                     <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1, fontWeight: 'bold' }}>
//                       Case ID : {item.id}
//                     </Typography>

//                     <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5, mb: 2 }}>
//                       {item.content}
//                     </Typography>
//                   </Box>

//                   <Divider />

//                   <Box sx={{ p: 2, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Typography variant="caption" sx={{ color: '#777' }}>
//                       Searched on <span style={{ color: '#D34335', fontWeight: 'bold' }}>{item.date}</span>
//                     </Typography>

//                     <Stack direction="row" spacing={1}>
//                       <IconButton 
//                         size="small" 
//                         onClick={() => handleOpenModal(item)}
//                         sx={{ border: '1px solid #D0D7DE', borderRadius: '4px', bgcolor: '#F6F8FA' }}
//                       >
//                         <BookmarkIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton 
//                         size="small" 
//                         onClick={() => handleDownload(item)}
//                         sx={{ border: '1px solid #D0D7DE', borderRadius: '4px', bgcolor: '#D0D7DE' }}
//                       >
//                         <DownloadIcon fontSize="small" />
//                       </IconButton>
//                     </Stack>
//                   </Box>
//                 </Box>
//               ))}
//             </Stack>
//           </Paper>
//         </Container>
//       </Box>

//       {/* MODAL: Connect with an Analyst */}
//       <Dialog 
//         open={openModal} 
//         onClose={() => setOpenModal(false)}
//         fullWidth
//         maxWidth="sm"
//         PaperProps={{ sx: { borderRadius: '8px', p: 1 } }}
//       >
//         <IconButton 
//           onClick={() => setOpenModal(false)}
//           sx={{ position: 'absolute', right: 16, top: 16 }}
//         >
//           <CloseIcon fontSize="small" />
//         </IconButton>

//         <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#444', pb: 1 }}>
//           Connect with an Analyst
//         </DialogTitle>

//         <DialogContent>
//           <Typography variant="body2" sx={{ color: '#555', mb: 3, lineHeight: 1.6 }}>
//             {selectedCase?.content}
//           </Typography>

//           <Box sx={{ mb: 3 }}>
//             <Typography variant="body2" sx={{ color: '#666' }}>
//               User Name - {selectedCase?.user}
//             </Typography>
//             <Typography variant="body2" sx={{ color: '#666' }}>
//               Searched on {selectedCase?.date}
//             </Typography>
//           </Box>

//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             placeholder="Type Message"
//             sx={{
//               mb: 3,
//               '& .MuiOutlinedInput-root': { bgcolor: '#F9F9F9' }
//             }}
//           />

//           <Button 
//             variant="contained" 
//             fullWidth
//             onClick={() => setOpenModal(false)}
//             sx={{ 
//               bgcolor: '#D34335', 
//               color: 'white',
//               textTransform: 'none',
//               py: 1.5,
//               fontSize: '1rem',
//               '&:hover': { bgcolor: '#B23327' }
//             }}
//           >
//             Submit
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </ThemeProvider>
//   );
// };

// export default RecentSearch;





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

function RecentSearch() {
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
      <Box sx={{ minHeight: '100vh', py: 6 , marginTop:'70px' }}>
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>Recent Search</Typography>

          <Paper elevation={0} sx={{ p: 4, borderRadius: '8px', border: '1px solid #dddbdbff' }}>
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
                    // onDownload={downloadCasePDF} 
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

export default RecentSearch;






