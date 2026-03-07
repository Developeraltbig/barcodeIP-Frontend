// import React, { useState } from 'react';
// import { Box, Paper, InputBase, IconButton, Grid, Checkbox, Button, FormControlLabel, Switch, Typography, Container, Collapse, TextField } from '@mui/material';
// import { Search as SearchIcon, CloudUploadOutlined, CheckCircle } from '@mui/icons-material';
// import { useDispatch } from 'react-redux';
// import { useCreateProjectMutation, useLazyGetNonProvisionalByProjectIdQuery } from '../../features/userApi';
// import FullPageLoader from '../../components/FullPageLoader';
// import AdvanceSearch from './AdvanceSearch';

// // --- Sub-Component: Custom Filter Card ---
// const FilterCard = ({ label, checked, onChange }) => (
//   <Paper
//     elevation={0}
//     onClick={onChange}
//     sx={{
//       display: 'flex',
//       alignItems: 'center',
//       p: 1.5,
//       border: '1px solid',
//       borderColor: checked ? '#E94E34' : '#e9d2cfff', // Brand color border when checked
//       borderRadius: 0.8,
//       cursor: 'pointer',
//       transition: 'all 0.2s ease-in-out',
//       backgroundColor: '#fff',
//       boxShadow: '0px 2px 4px rgba(0,0,0,0.02)', // Very subtle shadow
//       '&:hover': {
//         borderColor: '#E94E34',
//         transform: 'translateY(-2px)'
//       }
//     }}
//   >
//     <Checkbox
//       checked={checked}
//       disableRipple
//       // Unchecked Icon (Grey Border Box)
//       icon={
//         <Box
//           sx={{
//             width: 20,
//             height: 20,
//             border: '2px solid #D1D5DB',
//             borderRadius: '4px',
//             bgcolor: 'white'
//           }}
//         />
//       }
//       // Checked Icon (Filled Red Box with Checkmark)
//       checkedIcon={
//         <Box
//           sx={{
//             width: 20,
//             height: 20,
//             bgcolor: '#E94E34',
//             borderRadius: '4px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             border: 'none'
//           }}
//         >
//           <CheckCircle sx={{ color: '#fff', fontSize: 16 }} />
//         </Box>
//       }
//       sx={{ p: 0, mr: 1.5 }}
//     />
//     <Typography variant="body2" sx={{ fontWeight: 500, color: '#4B5563' }}>
//       {label}
//     </Typography>
//   </Paper>
// );

// const InputSectionN = () => {
//   // --- State ---
//   const [searchValue, setSearchValue] = useState('');
//   const [selectedFilters, setSelectedFilters] = useState(['patent']); // Default selection in lowercase
//   const [advanceSearch, setAdvanceSearch] = useState(false);
//    const dispatch = useDispatch();
//    const [createProject, { isLoading, error: apiError }] = useCreateProjectMutation();


//   // Updated Filter List to match your required 5 keys exactly
//   const filters = [
//     { label: 'Patent', value: 'patent' },
//     { label: 'Publication', value: 'publish' },
//     { label: 'Provisional', value: 'provisional' },
//     { label: 'Non-Provisional', value: 'non-provisional' },
//     { label: 'Product', value: 'product' }
//   ];

//   // Toggle Logic
//   const toggleFilter = (value) => {
//     if (selectedFilters.includes(value)) {
//       setSelectedFilters(selectedFilters.filter((f) => f !== value));
//     } else {
//       setSelectedFilters([...selectedFilters, value]);
//     }
//   };

//   // --- Form Submission Handler ---
//   const handleGenerate = async () => {
//     const formData = new FormData();
//     console.log("text search", searchValue);
    
//     // 1. text key as string
//     formData.append('text', searchValue);
    
//     // 2. checked key as array 
//     // Note: FormData usually handles arrays by appending multiple times 
//     // or passing a stringified JSON. Here is the standard way:
//     selectedFilters.forEach(item => {
//       formData.append('checked', item); 
//     });
    
//     // Logging for verification
    
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }
//     console.log("Payload Prepared:", formData);
   
//       const result = await createProject(formData).unwrap();
//       // console.log('Create Project Success:', result);
 
//   };


//   return (
//     <Container maxWidth="lg" sx={{ mt: -4, mb: 10, position: 'relative', zIndex: 10 }}>
//       {/* 1. Main Search Bar */}
//       <Paper
//         elevation={2}
//         sx={{
//           p: '8px 16px',
//           display: 'flex',
//           borderRadius: '12px',
//           border: '1px solid #E5E7EB',
//           mb: 3,
//           height: '130px'
//         }}
//       >
//         <SearchIcon sx={{ color: '#9CA3AF', mr: 2 ,marginTop:'12px' }} />
//         <InputBase
//           sx={{ flex: 1 }}
//           placeholder="Search here"
//           value={searchValue}
//           multiline
//           rows={6}
//           onChange={(e) => setSearchValue(e.target.value)}
//         />    

//         {/* <TextField
//           fullWidth
//           multiline
//           rows={6}
//           placeholder="Search here"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           sx={{ flex: 1, border:'none' }}
          
//         /> */}
//         <IconButton sx={{ bgcolor: '#FEF2F2', color: '#E94E34', borderRadius: '8px' }}>
//           <CloudUploadOutlined />
//         </IconButton>
//       </Paper>

//       {/* 2. Filter Cards */}
//       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }} sx={{ mb: 4  }}>
//         {filters.map((f) => (
//           <Grid item size={{ xs: 2, sm: 2, md: 2}} key={f.value} >
//             <FilterCard label={f.label} checked={selectedFilters.includes(f.value)} onChange={() => toggleFilter(f.value)} />
//           </Grid>
//         ))}
//       </Grid>

//       {/* 3. Action Area */}
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//         <Button
//           variant="contained"
//           onClick={handleGenerate}
//           sx={{ bgcolor: '#E07B6F', px: 4, py: 1.5, textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}
//         >
//           Generate Key String
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
//           label={
//             <Typography variant="body2" sx={{ fontWeight: 600, color: '#6B7280' }}>
//               Advance Search
//             </Typography>
//           }
//           labelPlacement="start"
//         />
//       </Box>

//       {/* 4. Sliding Advance Search Section */}
//       <Collapse in={advanceSearch} timeout="auto">
//         <AdvanceSearch onClear={() => console.log('Clear fields')} />
//       </Collapse>
//     </Container>
//   );
// };

// export default InputSectionN;














// import React, { useState, useEffect } from 'react';
// import { 
//   Box, Paper, InputBase, IconButton, Grid, Checkbox, 
//   Button, FormControlLabel, Switch, Typography, Container, 
//   Collapse, Backdrop 
// } from '@mui/material';
// import { Search as SearchIcon, CloudUploadOutlined, CheckCircle } from '@mui/icons-material';
// import { useCreateProjectMutation } from '../../features/userApi';
// import AdvanceSearch from './AdvanceSearch';

// // --- Loading Messages from your image ---
// const LOADING_MESSAGES = [
//   "...Fetching Key Features...",
//   "...Analyzing Patent Data...",
//   "...Structuring Insights...",
//   "...Finalizing Results..."
// ];

// // --- Sub-Component: Custom Filter Card ---
// const FilterCard = ({ label, checked, onChange }) => (
//   <Paper
//     elevation={0}
//     onClick={onChange}
//     sx={{
//       display: 'flex',
//       alignItems: 'center',
//       p: 1.5,
//       border: '1px solid',
//       borderColor: checked ? '#E94E34' : '#e9d2cfff',
//       borderRadius: 0.8,
//       cursor: 'pointer',
//       transition: 'all 0.2s ease-in-out',
//       backgroundColor: '#fff',
//       '&:hover': {
//         borderColor: '#E94E34',
//         transform: 'translateY(-2px)'
//       }
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
//     <Typography variant="body2" sx={{ fontWeight: 500, color: '#4B5563' }}>
//       {label}
//     </Typography>
//   </Paper>
// );

// const InputSectionN = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [selectedFilters, setSelectedFilters] = useState(['patent']);
//   const [advanceSearch, setAdvanceSearch] = useState(false);
//   const [messageIndex, setMessageIndex] = useState(0);

//   // --- RTK Query Mutation ---
//   const [createProject, { isLoading }] = useCreateProjectMutation();

//   // --- Loader Text Cycling Logic ---
//   useEffect(() => {
//     let interval;
//     if (isLoading) {
//       interval = setInterval(() => {
//         setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
//       }, 2000); // Changes text every 2 seconds
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
//       console.error("Failed to generate project:", err);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: -4, mb: 10, position: 'relative', zIndex: 10 }}>
      
//       {/* 1. FULL PAGE LOADER OVERLAY */}
//       <Backdrop
//         sx={{ 
//           color: '#fff', 
//           zIndex: (theme) => theme.zIndex.drawer + 9999, // Ensure it's above everything
//           backgroundColor: 'rgba(255, 255, 255, 0.9)', // Blurred white background
//           flexDirection: 'column'
//         }}
//         open={isLoading}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 800,
//             color: '#4B5563',
//             fontStyle: 'italic',
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

//       {/* 2. Main Search Bar */}
//       <Paper
//         elevation={2}
//         sx={{
//           p: '8px 16px',
//           display: 'flex',
//           borderRadius: '12px',
//           border: '1px solid #E5E7EB',
//           mb: 3,
//           height: '130px'
//         }}
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

//       {/* 3. Filter Cards */}
//       <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 10 }} sx={{ mb: 4 }}>
//         {filters.map((f) => (
//           <Grid item xs={2} sm={2} md={2} key={f.value}>
//             <FilterCard 
//               label={f.label} 
//               checked={selectedFilters.includes(f.value)} 
//               onChange={() => toggleFilter(f.value)} 
//             />
//           </Grid>
//         ))}
//       </Grid>

//       {/* 4. Action Area */}
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//         <Button
//           variant="contained"
//           onClick={handleGenerate}
//           sx={{ 
//             bgcolor: '#A62A22', 
//             '&:hover': { bgcolor: '#8a221b' },
//             px: 4, py: 1.5, 
//             textTransform: 'none', 
//             fontWeight: 600, 
//             borderRadius: '8px' 
//           }}
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
//           label={
//             <Typography variant="body2" sx={{ fontWeight: 600, color: '#6B7280' }}>
//               Advance Search
//             </Typography>
//           }
//           labelPlacement="start"
//         />
//       </Box>

//       {/* 5. Sliding Advance Search Section */}
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

// Messages from your loading screen
const LOADING_MESSAGES = [
  "...Fetching Key Features...",
  "...Analyzing Patent Data...",
  "...Structuring Insights...",
  "...Finalizing Results..."
];

const FilterCard = ({ label, checked, onChange }) => (
  <Paper
    elevation={0}
    onClick={onChange}
    sx={{
      display: 'flex', alignItems: 'center', p: 1.5, border: '1px solid',
      borderColor: checked ? '#E94E34' : '#e9d2cfff', borderRadius: 0.8,
      cursor: 'pointer', transition: 'all 0.2s ease-in-out', backgroundColor: '#fff',
      '&:hover': { borderColor: '#E94E34', transform: 'translateY(-2px)' }
    }}
  >
    <Checkbox
      checked={checked}
      disableRipple
      icon={<Box sx={{ width: 20, height: 20, border: '2px solid #D1D5DB', borderRadius: '4px', bgcolor: 'white' }} />}
      checkedIcon={
        <Box sx={{ width: 20, height: 20, bgcolor: '#E94E34', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle sx={{ color: '#fff', fontSize: 16 }} />
        </Box>
      }
      sx={{ p: 0, mr: 1.5 }}
    />
    <Typography variant="body2" sx={{ fontWeight: 500, color: '#4B5563' }}>{label}</Typography>
  </Paper>
);

const InputSectionN = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['patent']);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  
  const navigate = useNavigate();
  const [createProject, { isLoading, isSuccess, data }] = useCreateProjectMutation();

  // --- 1. Navigation Logic ---
  useEffect(() => {
    if (isSuccess && data) {
      // Check your console to see if it is 'data.id', 'data._id', or 'data.projectId'
      console.log("API Response Data:", data);
      
      const id = data?.data?.project_id|| data.id || data._id || data.data?.id; 

      if (id) {
        navigate(`/result/${id}`);
      }
    }
  }, [isSuccess, data, navigate]);

  // --- 2. Text Cycling Logic ---
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 3000);
    } else {
      setMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const filters = [
    { label: 'Patent', value: 'patent' },
    { label: 'Publication', value: 'publish' },
    { label: 'Products', value: 'product' },
    { label: 'Provisional Specification', value: 'provisional' },
    { label: 'Non-Provisional Specification', value: 'non-provisional' }
  ];

  const toggleFilter = (value) => {
    setSelectedFilters(prev => 
      prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]
    );
  };

  const handleGenerate = async () => {
    if (!searchValue.trim()) return;
    const formData = new FormData();
    formData.append('text', searchValue);
    selectedFilters.forEach(item => formData.append('checked', item));
    
    try {
      await createProject(formData).unwrap();
    } catch (err) {
      console.error("Mutation Error:", err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: -4, mb: 10, position: 'relative', zIndex: 10 }}>
      
      {/* FULL PAGE LOADER */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 9999, 
          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
          flexDirection: 'column',

        }}
        open={isLoading}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800, color: '#4B5563', fontStyle: 'italic',
            animation: 'pulse 1.5s infinite ease-in-out',
            '@keyframes pulse': {
              '0%': { opacity: 0.5, transform: 'scale(0.98)' },
              '50%': { opacity: 1, transform: 'scale(1)' },
              '100%': { opacity: 0.5, transform: 'scale(0.98)' },
            },
          }}
        >
          {LOADING_MESSAGES[messageIndex]}
        </Typography>
      </Backdrop>

      <Paper
        elevation={2}
        sx={{ p: '8px 16px', display: 'flex', borderRadius: '12px', border: '1px solid #E5E7EB', mb: 3, height: '130px' }}
      >
        <SearchIcon sx={{ color: '#9CA3AF', mr: 2, mt: '12px' }} />
        <InputBase
          sx={{ flex: 1 }}
          placeholder="Search here"
          value={searchValue}
          multiline
          rows={5}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IconButton sx={{ bgcolor: '#FEF2F2', color: '#E94E34', borderRadius: '8px', height: 'fit-content' }}>
          <CloudUploadOutlined />
        </IconButton>
      </Paper>

      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 10 }} sx={{ mb: 4 }}>
        {filters.map((f) => (
          <Grid item xs={2} sm={2} md={2} key={f.value}>
            <FilterCard label={f.label} checked={selectedFilters.includes(f.value)} onChange={() => toggleFilter(f.value)} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={handleGenerate}
          sx={{ bgcolor: '#A62A22', '&:hover': { bgcolor: '#8a221b' }, px: 4, py: 1.5, textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}
        >
          Generate Key Strings
        </Button>

        <FormControlLabel
          control={
            <Switch
              checked={advanceSearch}
              onChange={(e) => setAdvanceSearch(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#E94E34' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#E94E34' }
              }}
            />
          }
          label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#6B7280' }}>Advance Search</Typography>}
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

// const LOADING_MESSAGES = [
//   "...Fetching Key Features...",
//   "...Analyzing Patent Data...",
//   "...Structuring Insights...",
//   "...Finalizing Results..."
// ];

// const InputSectionN = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [selectedFilters, setSelectedFilters] = useState(['patent']);
//   const [advanceSearch, setAdvanceSearch] = useState(false);
//   const [messageIndex, setMessageIndex] = useState(0);
  
//   const navigate = useNavigate();
//   const [createProject, { isLoading, isSuccess, data }] = useCreateProjectMutation();

//   // --- NEW: CSS SCROLL LOCK LOGIC ---
//   useEffect(() => {
//     if (isLoading) {
//       // Prevent scrolling
//       document.body.style.overflow = 'hidden';
//     } else {
//       // Re-enable scrolling
//       document.body.style.overflow = 'unset';
//     }

//     // Cleanup function to ensure scroll is re-enabled if component unmounts
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isLoading]);

//   // --- Navigation Logic ---
//   useEffect(() => {
//     if (isSuccess && data) {
//       const id = data?.data?.projectId || data.id || data._id || data.data?.id; 
//       if (id) {
//         navigate(`/result/${id}`);
//       }
//     }
//   }, [isSuccess, data, navigate]);

//   // --- Text Cycling Logic ---
//   useEffect(() => {
//     let interval;
//     if (isLoading) {
//       interval = setInterval(() => {
//         setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
//       }, 2000);
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

//   const handleGenerate = async () => {
//     if (!searchValue.trim()) return;
//     const formData = new FormData();
//     formData.append('text', searchValue);
//     selectedFilters.forEach(item => formData.append('checked', item));
//     try {
//       await createProject(formData).unwrap();
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: -4, mb: 10, position: 'relative', zIndex: 10 }}>
      
//       {/* FULL PAGE LOADER */}
//       <Backdrop
//         sx={{ 
//           color: '#fff', 
//           zIndex: (theme) => theme.zIndex.drawer + 9999, 
//           backgroundColor: 'rgba(255, 255, 255, 0.25)', // Increased opacity for "Static" look
//           flexDirection: 'column',
//           backdropFilter: 'blur(4px)' // Adds a nice blur to the static background
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

//       {/* Main UI */}
//       <Paper elevation={2} sx={{ p: '8px 16px', display: 'flex', borderRadius: '12px', border: '1px solid #E5E7EB', mb: 3, height: '130px' }}>
//         <SearchIcon sx={{ color: '#9CA3AF', mr: 2, mt: '12px' }} />
//         <InputBase sx={{ flex: 1 }} placeholder="Search here" value={searchValue} multiline rows={5} onChange={(e) => setSearchValue(e.target.value)} />
//         <IconButton sx={{ bgcolor: '#FEF2F2', color: '#E94E34', borderRadius: '8px', height: 'fit-content' }}>
//           <CloudUploadOutlined />
//         </IconButton>
//       </Paper>

//       <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 10 }} sx={{ mb: 4 }}>
//         {filters.map((f) => (
//           <Grid item xs={2} sm={2} md={2} key={f.value}>
//             <Box onClick={() => setSelectedFilters(prev => prev.includes(f.value) ? prev.filter(v => v !== f.value) : [...prev, f.value])} sx={{ cursor: 'pointer', p: 1.5, border: '1px solid', borderColor: selectedFilters.includes(f.value) ? '#E94E34' : '#E5E7EB', borderRadius: 1, display: 'flex', alignItems: 'center', bgcolor: '#fff' }}>
//                 <Checkbox checked={selectedFilters.includes(f.value)} sx={{ color: '#E94E34', '&.Mui-checked': { color: '#E94E34' } }} />
//                 <Typography variant="body2">{f.label}</Typography>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>

//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//         <Button variant="contained" disabled={isLoading} onClick={handleGenerate} sx={{ bgcolor: '#A62A22', '&:hover': { bgcolor: '#8a221b' }, px: 4, py: 1.5, textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}>
//           Generate Key Strings
//         </Button>
//         <FormControlLabel control={<Switch checked={advanceSearch} onChange={(e) => setAdvanceSearch(e.target.checked)} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#E94E34' } }} />} label="Advance Search" labelPlacement="start" />
//       </Box>

//       <Collapse in={advanceSearch} timeout="auto">
//         <Box sx={{ mt: 3 }}><AdvanceSearch onClear={() => console.log('Cleared')} /></Box>
//       </Collapse>
//     </Container>
//   );
// };

// export default InputSectionN;