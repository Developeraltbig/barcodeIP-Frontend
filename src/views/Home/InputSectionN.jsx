
// import React, { useState, useEffect } from 'react';
// import { 
//   Box, Paper, InputBase, IconButton, Grid, Checkbox, 
//   Button, FormControlLabel, Switch, Typography, Container, 
//   Collapse, Backdrop 
// } from '@mui/material';
// import { Search as SearchIcon, CloudUploadOutlined, CheckCircle } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom'; 
// import { useCreateProjectMutation } from '../../features/userApi';
// import AdvanceSearch from './AdvanceSearch';

// // Messages from your loading screen
// const LOADING_MESSAGES = [
//   "...Fetching Key Features...",
//   "...Analyzing Patent Data...",
//   "...Structuring Insights...",
//   "...Finalizing Results..."
// ];

// const FilterCard = ({ label, checked, onChange }) => (
//   <Paper
//     elevation={0}
//     onClick={onChange}
//     sx={{
//       display: 'flex', alignItems: 'center', p: 1.5, border: '1px solid',
//       borderColor: checked ? '#E94E34' : '#e9d2cfff', borderRadius: 0.8,
//       cursor: 'pointer', transition: 'all 0.2s ease-in-out', backgroundColor: '#fff',
//       '&:hover': { borderColor: '#E94E34', transform: 'translateY(-2px)' }
//     }}
//   >
//     <Checkbox
//       checked={checked}
//       disableRipple
//       icon={<Box sx={{ width: 20, height: 20, border: '2px solid #D1D5DB', borderRadius: '4px', bgcolor: 'white' }} />}
//       checkedIcon={
//         <Box sx={{ width: 20, height: 20, bgcolor: '#E94E34', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <CheckCircle sx={{ color: '#fff', fontSize: 16 }} />
//         </Box>
//       }
//       sx={{ p: 0, mr: 1.5 }}
//     />
//     <Typography variant="body2" sx={{ fontWeight: 500, color: '#4B5563' }}>{label}</Typography>
//   </Paper>
// );

// const InputSectionN = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [selectedFilters, setSelectedFilters] = useState(['patent']);
//   const [advanceSearch, setAdvanceSearch] = useState(false);
//   const [messageIndex, setMessageIndex] = useState(0);
  
//   const navigate = useNavigate();
//   const [createProject, { isLoading, isSuccess, data }] = useCreateProjectMutation();

//   // --- 1. Navigation Logic ---
//   useEffect(() => {
//     if (isSuccess && data) {
//       // Check your console to see if it is 'data.id', 'data._id', or 'data.projectId'
//       // console.log("API Response Data:", data);
      
//       const id = data?.data?.project_id|| data.id || data._id || data.data?.id; 

//       if (id) {
//         navigate(`/result/${id}`);
//       }
//     }
//   }, [isSuccess, data, navigate]);

//   // --- 2. Text Cycling Logic ---
//   useEffect(() => {
//     let interval;
//     if (isLoading) {
//       interval = setInterval(() => {
//         setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
//       }, 3000);
//     } else {
//       setMessageIndex(0);
//     }
//     return () => clearInterval(interval);
//   }, [isLoading]);

//   const filters = [
//     { label: 'Patent', value: 'patent' },
//     { label: 'Publication', value: 'publish' },
//     { label: 'Products', value: 'product' },
//     { label: 'Provisional Specification', value: 'provisional' },
//     { label: 'Non-Provisional Specification', value: 'non-provisional' }
//   ];

//   const toggleFilter = (value) => {
//     setSelectedFilters(prev => 
//       prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]
//     );
//   };

//   const handleGenerate = async () => {
//     if (!searchValue.trim()) return;
//     const formData = new FormData();
//     formData.append('text', searchValue);
//     selectedFilters.forEach(item => formData.append('checked', item));
    
//     try {
//       await createProject(formData).unwrap();
//     } catch (err) {
//       console.error("Mutation Error:", err);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: -4, mb: 10, position: 'relative', zIndex: 10 }}>
      
//       {/* FULL PAGE LOADER */}
//       <Backdrop
//         sx={{ 
//           color: '#fff', 
//           zIndex: (theme) => theme.zIndex.drawer + 9999, 
//           backgroundColor: 'rgba(255, 255, 255, 0.9)', 
//           flexDirection: 'column',

//         }}
//         open={isLoading}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 800, color: '#4B5563', fontStyle: 'italic',
//             animation: 'pulse 1.5s infinite ease-in-out',
//             '@keyframes pulse': {
//               '0%': { opacity: 0.5, transform: 'scale(0.98)' },
//               '50%': { opacity: 1, transform: 'scale(1)' },
//               '100%': { opacity: 0.5, transform: 'scale(0.98)' },
//             },
//           }}
//         >
//           {LOADING_MESSAGES[messageIndex]}
//         </Typography>
//       </Backdrop>

//       <Paper
//         elevation={2}
//         sx={{ p: '8px 16px', display: 'flex', borderRadius: '12px', border: '1px solid #E5E7EB', mb: 3, height: '130px' }}
//       >
//         <SearchIcon sx={{ color: '#9CA3AF', mr: 2, mt: '12px' }} />
//         <InputBase
//           sx={{ flex: 1 }}
//           placeholder="Search here"
//           value={searchValue}
//           multiline
//           rows={5}
//           onChange={(e) => setSearchValue(e.target.value)}
//         />
//         <IconButton sx={{ bgcolor: '#FEF2F2', color: '#E94E34', borderRadius: '8px', height: 'fit-content' }}>
//           <CloudUploadOutlined />
//         </IconButton>
//       </Paper>

//       <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 10 }} sx={{ mb: 4 }}>
//         {filters.map((f) => (
//           <Grid item xs={2} sm={2} md={2} size={2} key={f.value}>
//             <FilterCard label={f.label} checked={selectedFilters.includes(f.value)} onChange={() => toggleFilter(f.value)} />
//           </Grid>
//         ))}
//       </Grid>

//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//         <Button
//           variant="contained"
//           disabled={isLoading}
//           onClick={handleGenerate}
//           sx={{ bgcolor: '#A62A22', '&:hover': { bgcolor: '#8a221b' }, px: 4, py: 1.5, textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}
//         >
//           Generate Key Strings
//         </Button>

//         <FormControlLabel
//           control={
//             <Switch
//               checked={advanceSearch}
//               onChange={(e) => setAdvanceSearch(e.target.checked)}
//               sx={{
//                 '& .MuiSwitch-switchBase.Mui-checked': { color: '#E94E34' },
//                 '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#E94E34' }
//               }}
//             />
//           }
//           label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#6B7280' }}>Advance Search</Typography>}
//           labelPlacement="start"
//         />
//       </Box>

//       <Collapse in={advanceSearch} timeout="auto">
//         <Box sx={{ mt: 3 }}>
//           <AdvanceSearch onClear={() => console.log('Cleared')} />
//         </Box>
//       </Collapse>
//     </Container>
//   );
// };

// export default InputSectionN;














import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, InputBase, IconButton, Grid, Checkbox, 
  Button, FormControlLabel, Switch, Typography, Container, 
  Collapse, Backdrop 
} from '@mui/material';
import { Search as SearchIcon, CloudUploadOutlined, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; 
import { useCreateProjectMutation } from '../../features/userApi';
import AdvanceSearch from './AdvanceSearch';

const LOADING_MESSAGES = [
  "...Fetching Key Features...",
  "...Analyzing Patent Data...",
  "...Structuring Insights...",
  "...Finalizing Results..."
];

const InputSectionN = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['patent']);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  
  const navigate = useNavigate();
  const [createProject, { isLoading, isSuccess, data }] = useCreateProjectMutation();

  // --- NEW: CSS SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (isLoading) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scroll is re-enabled if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  // --- Navigation Logic ---
  useEffect(() => {
    if (isSuccess && data) {
      const id = data?.data?.project_id || data.id || data._id || data.data?.id; 

      if (id) {
        navigate(`/result/${id}`);
      }
    }
  }, [isSuccess, data, navigate]);

  // --- Text Cycling Logic ---
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2000);
    } else {
      setMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const filters = [
    { label: 'Patent', value: 'patent' },
    { label: 'Publication', value: 'publish' },
    { label: 'Products', value: 'product' },
    { label: 'Provisional ', value: 'provisional' },
    { label: 'Non-Provisional ', value: 'non-provisional' }
  ];

  const handleGenerate = async () => {
    if (!searchValue.trim()) return;
    const formData = new FormData();
    formData.append('text', searchValue);
    selectedFilters.forEach(item => formData.append('checked', item));
    try {
      await createProject(formData).unwrap();
    } catch (err) { console.error(err); }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: -4, mb: 10, position: 'relative', zIndex: 10 }}>
      {/* FULL PAGE LOADER */}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 9999,
          backgroundColor: 'rgba(255, 255, 255, 0.55)', // Increased opacity for "Static" look
          flexDirection: 'column',
          backdropFilter: 'blur(4px)' // Adds a nice blur to the static background
        }}
        open={isLoading}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: '#4B5563',
            fontStyle: 'italic',
            animation: 'pulse 1.5s infinite ease-in-out',
            '@keyframes pulse': {
              '0%': { opacity: 0.5, transform: 'scale(0.98)' },
              '50%': { opacity: 1, transform: 'scale(1)' },
              '100%': { opacity: 0.5, transform: 'scale(0.98)' }
            }
          }}
        >
          {LOADING_MESSAGES[messageIndex]}
        </Typography>
      </Backdrop>

      {/* Main UI */}
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Paper
          elevation={2}
          sx={{ p: '8px 16px', display: 'flex', borderRadius: '12px', border: '1px solid #E5E7EB', mb: 3, height: '130px', width: '100%' }}
        >
          <SearchIcon sx={{ color: '#9CA3AF', mr: 2, mt: '12px' }} />
          <InputBase
            sx={{ flex: 1 }}
            placeholder="Describe your Invention in plain English"
            value={searchValue}
            multiline
            rows={5}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Paper>
        <IconButton
          sx={{
            bgcolor: '#FEF2F2',
            color: '#E94E34',
            borderRadius: '8px',
            height: '130px',
            width: '10%',
            border: '1px solid #E5E7EB',
            // ADDED SHADOWS BELOW
            boxShadow: '0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            '&:hover': {
              bgcolor: '#eee8e7ff',
              boxShadow: 4 // Makes the shadow deeper on hover for a "lifted" effect
            }
          }}
        >
          <CloudUploadOutlined style={{ fontSize: '40px' }} />
        </IconButton>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }} sx={{ mb: '20px' }}>
        {filters.map((f) => (
          <Grid item xs={2} sm={2} md={4} size={{ xs: 2, sm: 2, md: 2 }} key={f.value}>
            <Box
              onClick={() =>
                setSelectedFilters((prev) => (prev.includes(f.value) ? prev.filter((v) => v !== f.value) : [...prev, f.value]))
              }
              sx={{
                cursor: 'pointer',
                p: 1.2,
                border: '1px solid',
                borderColor: selectedFilters.includes(f.value) ? '#E94E34' : '#E5E7EB',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#fff'
              }}
            >
              <Checkbox checked={selectedFilters.includes(f.value)} sx={{ color: '#E94E34', '&.Mui-checked': { color: '#E94E34' } }} />
              <Typography variant="body2">{f.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={handleGenerate}
          sx={{
            bgcolor: '#E94E34',
            '&:hover': { bgcolor: '#e06b56ff' },
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px'
          }}
        >
          Generate Key Strings
        </Button>
        <FormControlLabel
          control={
            <Switch
              checked={advanceSearch}
              onChange={(e) => setAdvanceSearch(e.target.checked)}
              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#E94E34' } }}
            />
          }
          label="Advance Search"
          labelPlacement="start"
        />
      </Box>

      <Collapse in={advanceSearch} timeout="auto">
        <Box sx={{ mt: 3 }}>
          <AdvanceSearch onClear={() => console.log('Cleared')} />
        </Box>
      </Collapse>
    </Container>
  );
};

export default InputSectionN;




















