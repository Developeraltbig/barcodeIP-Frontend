import React, { useState } from 'react';
import { Box, Paper, InputBase, IconButton, Grid, Checkbox, Button, FormControlLabel, Switch, Typography, Container } from '@mui/material';
import { Search as SearchIcon, CloudUploadOutlined, CheckCircle } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useCreateProjectMutation, useLazyGetNonProvisionalByProjectIdQuery } from '../../features/userApi';
import FullPageLoader from '../../components/FullPageLoader';

// --- Sub-Component: Custom Filter Card ---
const FilterCard = ({ label, checked, onChange }) => (
  <Paper
    elevation={0}
    onClick={onChange}
    sx={{
      display: 'flex',
      alignItems: 'center',
      p: 1.5,
      border: '1px solid',
      borderColor: checked ? '#E94E34' : 'transparent', // Brand color border when checked
      borderRadius: 2,
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      backgroundColor: '#fff',
      boxShadow: '0px 2px 4px rgba(0,0,0,0.02)', // Very subtle shadow
      '&:hover': {
        borderColor: '#E94E34',
        transform: 'translateY(-2px)'
      }
    }}
  >
    <Checkbox
      checked={checked}
      disableRipple
      // Unchecked Icon (Grey Border Box)
      icon={
        <Box
          sx={{
            width: 20,
            height: 20,
            border: '2px solid #D1D5DB',
            borderRadius: '4px',
            bgcolor: 'white'
          }}
        />
      }
      // Checked Icon (Filled Red Box with Checkmark)
      checkedIcon={
        <Box
          sx={{
            width: 20,
            height: 20,
            bgcolor: '#E94E34',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none'
          }}
        >
          <CheckCircle sx={{ color: '#fff', fontSize: 16 }} />
        </Box>
      }
      sx={{ p: 0, mr: 1.5 }}
    />
    <Typography variant="body2" sx={{ fontWeight: 500, color: '#4B5563' }}>
      {label}
    </Typography>
  </Paper>
);

const InputSectionN = () => {
  // --- State ---
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['patent']); // Default selection in lowercase
  const [advanceSearch, setAdvanceSearch] = useState(false);
   const dispatch = useDispatch();
   const [createProject, { isLoading, error: apiError }] = useCreateProjectMutation();

  // Updated Filter List to match your required 5 keys exactly
  const filters = [
    { label: 'Patent', value: 'patent' },
    { label: 'Publication', value: 'publish' },
    { label: 'Provisional', value: 'provisional' },
    { label: 'Non-Provisional', value: 'non-provisional' },
    { label: 'Product', value: 'product' }
  ];

  // Toggle Logic
  const toggleFilter = (value) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  // --- Form Submission Handler ---
  // const handleGenerate = async () => {
  //   const formData = new FormData();
  //   console.log("text search", searchValue);
    
  //   // 1. text key as string
  //   formData.append('text', searchValue);
    
  //   // 2. checked key as array 
  //   // Note: FormData usually handles arrays by appending multiple times 
  //   // or passing a stringified JSON. Here is the standard way:
  //   selectedFilters.forEach(item => {
  //     formData.append('checked', item); 
  //   });
    
  //   // Logging for verification
    
  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}: ${value}`);
  //   }
  //   console.log("Payload Prepared:", formData);
   
  //     // const result = await createProject(formData).unwrap();
  //     console.log('Create Project Success:', result);
 
  // };


  const handleGenerate = async () => {
      
      setIsSubmitting(true);

      // try {
        const formData = new FormData();
     console.log("text search", searchValue);
    
    // 1. text key as string
    formData.append('text', searchValue);
    
    // 2. checked key as array 
    // Note: FormData usually handles arrays by appending multiple times 
    // or passing a stringified JSON. Here is the standard way:
    selectedFilters.forEach(item => {
      formData.append('checked', item); 
    });
    
    // Logging for verification
    
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log("Payload Prepared:", formData);
   
      const result = await createProject(formData).unwrap();
      console.log('Create Project Success:', result);
        // navigate('/result'); 
      // } catch (err) {
      //   console.error('fetch failed', err);
      // } finally {
      //   setIsSubmitting(false);
      // }
    };
  
    // const getErrorMessage = () => {
    //   if (validationError) return validationError;
    //   if (apiError) {
    //     if ('error' in apiError) return apiError.error;
    //   }
    //   return null;
    // };


  return (
    <Container maxWidth="lg" sx={{ mt: -4, mb: 10, position: 'relative', zIndex: 10 }}>

       {(isLoading ) && (
              <FullPageLoader colors={["#e06a50", "#33FF57", "#3357FF"]} label="Starting Dashboard..." />
            )}
      
      
      {/* 1. Main Search Bar */}
      <Paper
        elevation={2}
        sx={{
          p: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          mb: 3,
          height: '60px'
        }}
      >
        <SearchIcon sx={{ color: '#9CA3AF', mr: 2, fontSize: '1.5rem' }} />

        <InputBase
          sx={{ flex: 1, fontSize: '1rem', color: '#374151' }}
          placeholder="Search here"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          inputProps={{ 'aria-label': 'search bar' }}
        />

        <IconButton
          sx={{
            bgcolor: '#FEF2F2',
            color: '#E94E34',
            borderRadius: '8px',
            p: 1,
            '&:hover': { bgcolor: '#FEE2E2' }
          }}
          aria-label="upload"
        >
          <CloudUploadOutlined fontSize="small" />
        </IconButton>
      </Paper>

      {/* 2. Filter Cards Row */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {filters.map((f) => (
          <Grid item xs={12} sm={6} md={2.4} key={f.value}>
            {/* Assuming FilterCard is a custom component you have */}
            <FilterCard 
              label={f.label} 
              checked={selectedFilters.includes(f.value)} 
              onChange={() => toggleFilter(f.value)} 
            />
          </Grid>
        ))}
      </Grid>

      {/* 3. Action Area */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
        <Button
          variant="contained"
          onClick={handleGenerate}
          disableElevation
          sx={{
            bgcolor: '#E07B6F',
            color: '#fff',
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '8px',
            '&:hover': { bgcolor: '#d65f50' }
          }}
        >
          Generate
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
          label={
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#6B7280' }}>
              Advance Search
            </Typography>
          }
          labelPlacement="start"
          sx={{ ml: 0 }}
        />
      </Box>
    </Container>
  );
};

export default InputSectionN;
