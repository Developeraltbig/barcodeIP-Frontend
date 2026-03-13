import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  InputBase,
  IconButton,
  Grid,
  Checkbox,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  Container,
  Collapse,
  Backdrop
} from '@mui/material';
import { Search as SearchIcon, CloudUploadOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCreateProjectMutation } from '../../features/userApi';
import AdvanceSearch from './AdvanceSearch';
import KeyFeatures from './KeyFeatures';

const LOADING_MESSAGES = [
  '...Fetching Key Features...',
  '...Analyzing Patent Data...',
  '...Structuring Insights...',
  '...Finalizing Results...'
];

const InputSectionN = () => {
  const [searchValue, setSearchValue] = useState('');

  // FIX 1: Initialized with 'patent' instead of an empty string ''
  const [selectedFilters, setSelectedFilters] = useState(['patent']);
  const [showAdvanceOption, setShowAdvanceOption] = useState(false);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const navigate = useNavigate();
  const [createProject, { isLoading, isSuccess, data }] = useCreateProjectMutation();

  // --- CSS SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

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

  // Reset and hide Advance Search if "Patent" is unchecked
  useEffect(() => {
    if (!selectedFilters.includes('patent')) {
      setAdvanceSearch(false);
    } 
  }, [selectedFilters]);

  const handleGenerate = async () => {
    // FIX 2: Added an alert so you know if you forgot to type something
    if (!searchValue.trim()) {
      alert('Please describe your invention first!');
      return;
    }

    const formData = new FormData();
    formData.append('text', searchValue);
    selectedFilters.forEach((item) => formData.append('checked', item));

    try {
      await createProject(formData).unwrap();
      setShowAdvanceOption(true);
      setAdvanceSearch(true);
    } catch (err) {
      console.error('Project Generation Failed:', err);
    }
  };

  // FIX 3: Re-added the extraction of projectId from the response

  const projectId = data?.data?.project_id || data?.id || data?._id || data?.data?.id;
  // console.log(data?.data?.patent_details?.queries)

  const features = data?.data;
  // console.log(features)
  const queries = data?.data?.patent_details?.queries || [];

  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 2, position: 'relative', zIndex: 10 }}>
        {/* FULL PAGE LOADER */}
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.55)',
            flexDirection: 'column',
            backdropFilter: 'blur(4px)'
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
            sx={{
              display: 'flex',
              borderRadius: '5px',
              border: '1px solid #E5E7EB',
              mb: 3,
              height: '100px',
              width: '100%',
              padding: '5px'
            }}
          >
            <SearchIcon sx={{ color: '#9CA3AF', m: '0 10px', mt: '10px' }} />
            <Box sx={{ flex: 1, padding: '0 4px' }}>
              <InputBase
                sx={{ width: '100%' }}
                placeholder="Describe your Invention in plain English"
                value={searchValue}
                multiline
                rows={4.2}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Box>
            <IconButton sx={{ color: '#E94E34', borderRadius: '5px', width: '80px' }}>
              <CloudUploadOutlined style={{ fontSize: '25px' }} />
            </IconButton>
          </Paper>
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

          {selectedFilters.includes('patent') && showAdvanceOption && (
            <FormControlLabel
              control={
                <Switch
                  color="default"
                  checked={advanceSearch} // This is controlled by the state above
                  onChange={(e) => setAdvanceSearch(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#E94E34'
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#E94E34' // Optional: colors the track too
                    }
                  }}
                />
              }
              label="Advance Search"
              labelPlacement="start"
            />
          )}
        </Box>

        <Collapse in={advanceSearch} timeout="auto">
          <Box sx={{ mt: 3 }}>
            <AdvanceSearch onClear={() => console.log('Cleared')} query={queries} />
          </Box>
        </Collapse>
      </Container>

      {selectedFilters.includes('patent') && <Box>{isSuccess && <KeyFeatures propProjectId={projectId} featureData={features} />}</Box>}

      {/* FIX 4: UNCOMMENTED THE KEY FEATURES COMPONENT */}

      {/* <KeyFeatures propProjectId={projectId} featureData={features } /> */}
    </Box>
  );
};

export default InputSectionN;

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   InputBase,
//   IconButton,
//   Grid,
//   Checkbox,
//   Button,
//   FormControlLabel,
//   Switch,
//   Typography,
//   Container,
//   Collapse,
//   Backdrop
// } from '@mui/material';
// import { Search as SearchIcon, CloudUploadOutlined } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { useCreateProjectMutation } from '../../features/userApi';
// import AdvanceSearch from './AdvanceSearch';
// import KeyFeatures from './KeyFeatures';

// const LOADING_MESSAGES = [
//   '...Fetching Key Features...',
//   '...Analyzing Patent Data...',
//   '...Structuring Insights...',
//   '...Finalizing Results...'
// ];

// const InputSectionN = () => {
//   const [searchValue, setSearchValue] = useState('');

//   // Initialized with 'patent'
//   const [selectedFilters, setSelectedFilters] = useState(['patent']);
//   const [showAdvanceOption, setShowAdvanceOption] = useState(false);
//   const [advanceSearch, setAdvanceSearch] = useState(false);
//   const [messageIndex, setMessageIndex] = useState(0);

//   const navigate = useNavigate();
//   const [createProject, { isLoading, isSuccess, data }] = useCreateProjectMutation();

//   // --- CSS SCROLL LOCK LOGIC ---
//   useEffect(() => {
//     if (isLoading) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isLoading]);

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
//     { label: 'Provisional ', value: 'provisional' },
//     { label: 'Non-Provisional ', value: 'non-provisional' }
//   ];

//   // Reset and hide Advance Search if "Patent" is unchecked
//   useEffect(() => {
//     if (!selectedFilters.includes('patent')) {
//       setAdvanceSearch(false);
//     }
//   }, [selectedFilters]);

//   const handleGenerate = async () => {
//     if (!searchValue.trim()) {
//       alert('Please describe your invention first!');
//       return;
//     }

//     // NEW FIX: Prevent sending empty filters
//     if (selectedFilters.length === 0) {
//       alert('Please select at least one filter!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('text', searchValue);

//     // ==========================================
//     // FIX FOR THE 500 ERROR
//     // ==========================================
//     // Because the backend expects a single "checked" field (which works when 1 is selected),
//     // sending multiple fields with the same name crashes it.

//     // Approach 1 (Most likely to work): Send as a comma-separated string ("patent,publish,product")
//     // The backend can then split this string by commas.
//     // formData.append('checked', selectedFilters.join(','));

//     // NOTE: If your backend strictly requires an Array format for form data,
//     // comment out Approach 1 and uncomment Approach 2 below:
//     // selectedFilters.forEach((item) => formData.append('checked[]', item));
//     // ==========================================

//     try {
//       await createProject(formData).unwrap();
//       setShowAdvanceOption(true);
//     } catch (err) {
//       console.error('Project Generation Failed:', err);
//     }
//   };

//   const projectId = data?.data?.project_id || data?.id || data?._id || data?.data?.id;

//   const features = data?.data;
//   const queries = data?.data?.patent_details?.queries || [];

//   return (
//     <Box>
//       <Container maxWidth="xl" sx={{ mt: 4, mb: 2, position: 'relative', zIndex: 10 }}>
//         {/* FULL PAGE LOADER */}
//         <Backdrop
//           sx={{
//             color: '#fff',
//             zIndex: (theme) => theme.zIndex.drawer + 9999,
//             backgroundColor: 'rgba(255, 255, 255, 0.55)',
//             flexDirection: 'column',
//             backdropFilter: 'blur(4px)'
//           }}
//           open={isLoading}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 800,
//               color: '#4B5563',
//               fontStyle: 'italic',
//               animation: 'pulse 1.5s infinite ease-in-out',
//               '@keyframes pulse': {
//                 '0%': { opacity: 0.5, transform: 'scale(0.98)' },
//                 '50%': { opacity: 1, transform: 'scale(1)' },
//                 '100%': { opacity: 0.5, transform: 'scale(0.98)' }
//               }
//             }}
//           >
//             {LOADING_MESSAGES[messageIndex]}
//           </Typography>
//         </Backdrop>

//         {/* Main UI */}
//         <Box sx={{ display: 'flex', gap: '10px' }}>
//           <Paper
//             elevation={2}
//             sx={{
//               display: 'flex',
//               borderRadius: '5px',
//               border: '1px solid #E5E7EB',
//               mb: 3,
//               height: '100px',
//               width: '100%',
//               padding: '5px'
//             }}
//           >
//             <SearchIcon sx={{ color: '#9CA3AF', m: '0 10px', mt: '10px' }} />
//             <Box sx={{ flex: 1, padding: '0 4px' }}>
//               <InputBase
//                 sx={{ width: '100%' }}
//                 placeholder="Describe your Invention in plain English"
//                 value={searchValue}
//                 multiline
//                 rows={4.2}
//                 onChange={(e) => setSearchValue(e.target.value)}
//               />
//             </Box>
//             <IconButton sx={{ color: '#E94E34', borderRadius: '5px', width: '80px' }}>
//               <CloudUploadOutlined style={{ fontSize: '25px' }} />
//             </IconButton>
//           </Paper>
//         </Box>

//         <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }} sx={{ mb: '20px' }}>
//           {filters.map((f) => (
//             <Grid item xs={2} sm={2} md={4} size={{ xs: 2, sm: 2, md: 2 }} key={f.value}>
//               <Box
//                 onClick={() =>
//                   setSelectedFilters((prev) => (prev.includes(f.value) ? prev.filter((v) => v !== f.value) : [...prev, f.value]))
//                 }
//                 sx={{
//                   cursor: 'pointer',
//                   p: 1.2,
//                   border: '1px solid',
//                   borderColor: selectedFilters.includes(f.value) ? '#E94E34' : '#E5E7EB',
//                   borderRadius: 1,
//                   display: 'flex',
//                   alignItems: 'center',
//                   bgcolor: '#fff'
//                 }}
//               >
//                 <Checkbox checked={selectedFilters.includes(f.value)} sx={{ color: '#E94E34', '&.Mui-checked': { color: '#E94E34' } }} />
//                 <Typography variant="body2">{f.label}</Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>

//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//           <Button
//             variant="contained"
//             disabled={isLoading}
//             onClick={handleGenerate}
//             sx={{
//               bgcolor: '#E94E34',
//               '&:hover': { bgcolor: '#e06b56ff' },
//               px: 4,
//               py: 1.5,
//               textTransform: 'none',
//               fontWeight: 600,
//               borderRadius: '8px'
//             }}
//           >
//             Generate Key Strings
//           </Button>

//           {selectedFilters.includes('patent') && showAdvanceOption && (
//             <FormControlLabel
//               control={
//                 <Switch
//                   color="default"
//                   checked={advanceSearch}
//                   onChange={(e) => setAdvanceSearch(e.target.checked)}
//                   sx={{
//                     '& .MuiSwitch-switchBase.Mui-checked': {
//                       color: '#E94E34'
//                     }
//                   }}
//                 />
//               }
//               label="Advance Search"
//               labelPlacement="start"
//             />
//           )}
//         </Box>

//         <Collapse in={advanceSearch} timeout="auto">
//           <Box sx={{ mt: 3 }}>
//             <AdvanceSearch onClear={() => console.log('Cleared')} query={queries} />
//           </Box>
//         </Collapse>
//       </Container>

//       {selectedFilters.includes('patent') && <Box>{isSuccess && <KeyFeatures propProjectId={projectId} featureData={features} />}</Box>}

//     </Box>
//   );
// };

// export default InputSectionN;
