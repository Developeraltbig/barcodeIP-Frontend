
import React, { useState, useEffect, lazy } from 'react';
import Loadable from 'components/Loadable';
import { 
  Box, Container, Backdrop, Typography, Paper, InputBase, 
  IconButton, Grid, Checkbox, Button, FormControlLabel, Switch, Collapse 
} from '@mui/material';
import { Search as SearchIcon, CloudUploadOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCreateProjectMutation } from '../../features/userApi';
const AdvanceSearch = Loadable(lazy(() => import('./AdvanceSearch')));
const KeyFeatures = Loadable(lazy(() => import('./KeyFeatures')));

// Assuming these are imported correctly in your actual file:
// import { useCreateProjectMutation } from 'your-api-path';
// import AdvanceSearch from './AdvanceSearch';
// import KeyFeatures from './KeyFeatures';

// Mock array for loader (assuming you have this defined somewhere)
const LOADING_MESSAGES = ["Analyzing input...", "Extracting key features...", "Generating queries..."];

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
      // setAdvanceSearch(true);
    } catch (err) {
      console.error('Project Generation Failed:', err);
    }
  };

  // Upload file code
  const [isSearching, setIsSearching] = useState(false);

  // This function runs when the user selects a file
  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
    
  //   if (!file) return; // Exit if no file was selected

  //   console.log("File selected:", file.name);
  //   setIsSearching(true);

  //   try {
  //     const formData = new FormData();
  //     formData.append('file', file); // Append the file
      
  //     // Append the selected filters just like in the text search
  //     selectedFilters.forEach((item) => formData.append('checked', item));

  //     // Make the actual API call using your RTK Query mutation
  //     await createProject(formData).unwrap();
      
  //     setShowAdvanceOption(true);

  //   } catch (error) {
  //     console.error("Error searching with file:", error);
  //     alert('File upload failed. Please try again.');
  //   } finally {
  //     setIsSearching(false);
  //     // Reset the input value so the user can upload the exact same file again if needed
  //     event.target.value = null; 
  //   }
  // };

  const handleFileChange = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (!allowedTypes.includes(file.type)) {
    toast.error("Invalid file type. Only PDF, DOC, and DOCX are allowed");
    event.target.value = null;
    return;
  }

  console.log("File selected:", file.name);
  setIsSearching(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

    selectedFilters.forEach((item) =>
      formData.append("checked", item)
    );

    await createProject(formData).unwrap();

    setShowAdvanceOption(true);

  } catch (error) {
    console.error("Error searching with file:", error);
    toast.error("File upload failed. Please try again.");
  } finally {
    setIsSearching(false);
    event.target.value = null;
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

            <IconButton
              component="label" // <--- This is the key part
              disabled={isSearching || isLoading}
              sx={{
                color: '#E94E34',
                borderRadius: '5px',
                width: '80px',
                opacity: (isSearching || isLoading) ? 0.5 : 1 // Dim button while searching
              }}
            >
              <CloudUploadOutlined style={{ fontSize: '25px' }} />

              {/* Hidden file input */}
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
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
            disabled={isLoading || isSearching}
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