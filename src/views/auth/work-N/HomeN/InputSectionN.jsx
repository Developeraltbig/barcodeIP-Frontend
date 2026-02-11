import React, { useState } from 'react';
import { Box, Paper, InputBase, IconButton, Grid, Checkbox, Button, FormControlLabel, Switch, Typography, Container } from '@mui/material';
import { Search as SearchIcon, CloudUploadOutlined, CheckCircle } from '@mui/icons-material';

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
  const [selectedFilters, setSelectedFilters] = useState(['Patent']); // Default selection
  const [advanceSearch, setAdvanceSearch] = useState(false);

  // Filter Options List
  const filters = ['Patent', 'Publication', 'Products', 'Provisional Specification', 'Non-Provisional Specification'];

  // Toggle Logic
  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: -4, mb: 10, position: 'relative', zIndex: 10 }}>
      {/* 
         NOTE: mt: -4 pulls this section slightly up to overlap the hero 
         if you want that "floating card" effect. Remove it if you want standard spacing.
      */}

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
          inputProps={{ 'aria-label': 'search bar' }}
        />

        {/* Upload Icon Button */}
        <IconButton
          sx={{
            bgcolor: '#FEF2F2', // Very light red bg
            color: '#E94E34', // Brand red icon
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
        {filters.map((filter) => (
          <Grid item xs={12} sm={6} md={2.4} key={filter}>
            <FilterCard label={filter} checked={selectedFilters.includes(filter)} onChange={() => toggleFilter(filter)} />
          </Grid>
        ))}
      </Grid>

      {/* 3. Action Area (Button & Switch) */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
        {/* Generate Button */}
        <Button
          variant="contained"
          disableElevation
          sx={{
            bgcolor: '#E07B6F', // Muted Red from screenshot
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
          Generate Key Strings
        </Button>

        {/* Advance Search Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={advanceSearch}
              onChange={(e) => setAdvanceSearch(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#E94E34'
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#E94E34'
                }
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
