import React, { useState } from 'react';
import { Box, Typography, TextField, Grid, Button, MenuItem, Select, IconButton, InputAdornment, Divider} from '@mui/material';
import { CalendarToday, PersonOutlined, Add, PeopleAltOutlined, ClearAll } from '@mui/icons-material';

const AdvanceSearch = ({ onGenerate }) => {
  // --- LOGIC (Unchanged) ---
  const [formData, setFormData] = useState({
    datePriority: 'Priority',
    startDate: '',
    endDate: '',
    // Fixed: Initialized as string to prevent React render crash,
    // assuming specific text from image for visual matching
    queryText:
      "(TI=(Bioelectronic neural interface OR Endovascular implants OR Implantable pulse generator OR External blood pressure monitor) OR AB=(Bioelectronic neural interface OR Endovascular implants OR Implantable pulse generator OR External blood pressure monitor) OR DESC=(Bioelectronic neural interface OR Endovascular implants OR Implantable pulse generator OR External blood pressure monitor)) AND (CLMS=(Neuromodulation OR Treatment of autonomic disorders OR Chronic stimulation OR Blood pressure regulation)) AND (CLMS=(Stent-like device with stimulation sites OR Expandable structure with electrodes OR High currents with electrochemical stability OR External pulse generator control for open-loop or closed-loop operation)) AND (DESC=(Minimally invasive implantation OR Transvascular neuromodulation OR Device's ability to grow into the blood vessel wall OR Radial coverage of the stimulation sites)) AND (DESC=(Minimally thrombogenic cable OR Wired tracks OR Stimulation sites on stent crossings OR Wireless capability))",
    inventor: '',
    assignee: '',
    patentOffice: '',
    language: '',
    status: '',
    type: '',
    litigation: ''
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData({
      datePriority: '',
      startDate: '',
      endDate: '',
      queryText: '',
      inventor: '',
      assignee: '',
      patentOffice: '',
      language: '',
      status: '',
      type: '',
      litigation: ''
    });
  };
  // -------------------------

  // Custom Styles to match the image inputs exactly
  const inputStyles = {
    bgcolor: 'white',
    borderRadius: '4px',
    '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #e0e0e0' },
    '&:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid #bdbdbd' },
    '& .MuiOutlinedInput-input': { padding: '10px 14px', fontSize: '0.9rem', color: '#555' },
    '& .MuiInputAdornment-root': { color: '#9ca3af', marginRight: '8px' } // Gray icons
  };

  const selectStyles = {
    ...inputStyles,
    '& .MuiSelect-select': { padding: '10px 14px', fontSize: '0.9rem', color: '#555', display: 'flex', alignItems: 'center' }
  };

  // Helper for Dropdowns
  const CustomSelect = ({ value, onChange, placeholder, options = [] }) => (
    <Select
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      displayEmpty
      sx={selectStyles}
      IconComponent={() => (
        <Box
          sx={{
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #999',
            marginRight: '12px',
            pointerEvents: 'none'
          }}
        />
      )} // Custom triangle arrow
    >
      <MenuItem value="" disabled sx={{ display: 'none' }}>
        <Typography color="#9ca3af" fontSize="0.9rem">
          {placeholder}
        </Typography>
      </MenuItem>
      <MenuItem value="Priority">Priority</MenuItem> {/* Hardcoded for UI match */}
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0px auto', p: 2, fontFamily: 'sans-serif', }}>

      {/* 1. Header Title (Outside the container) */}
      <Box sx={{ bgcolor: '#F3F4F6', borderRadius: '12px', p: 3, mt: 2, marginBottom:'30px' }}>
        {/* Top Header Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#374151', letterSpacing: '-0.5px' }}>
            Advance Search
          </Typography>
          <Button
            onClick={handleClear}
            variant="contained"
            startIcon={<ClearAll />}
            sx={{ bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' }, textTransform: 'none', borderRadius: '6px', fontWeight: 700 }}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      {/* 2. Main Container Box */}
      <Box sx={{ bgcolor: '#EEEEEE', borderRadius: '8px', p: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {/* ROW 1: Date Range */}
        <Grid container spacing={{ xs: 2, md: 6}} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#777', textAlign: 'center' }}>
              Date Range
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} size={{ xs: 3, sm: 3, md: 3}}>
            <CustomSelect value={formData.datePriority} onChange={(val) => handleChange('datePriority', val)} placeholder="Priority" />
          </Grid>
          <Grid item xs={12} md={3.5} size={{ xs: 3, sm: 3, md: 3}}>
            <TextField
              fullWidth
              placeholder="Start Date"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={3.5} size={{ xs: 3, sm: 3, md: 3}}>
            <TextField
              fullWidth
              placeholder="End Date"
              value={formData.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, borderColor: '#d1d5db' }} />

        {/* ROW 2: Query Logic Text Area */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={formData.queryText}
            onChange={(e) => handleChange('queryText', e.target.value)}
            sx={{
              ...inputStyles,
              '& .MuiOutlinedInput-root': { padding: '12px' },
              '& .MuiOutlinedInput-input': {
                fontSize: '0.8rem',
                lineHeight: 1.5,
                color: '#1e3a8a', // The blue color from the image
                fontFamily: 'inherit'
              }
            }}
          />
        </Box>

        <Divider sx={{ my: 2, borderColor: '#d1d5db' }} />

        {/* ROW 3: Inventor / Assignee / Office */}
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ mb: 2 }} >
          {/* Inventor */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 1 }} size={{ xs: 4, sm: 4, md: 4}}>
            <TextField
              fullWidth
              placeholder="Inventor"
              value={formData.inventor}
              onChange={(e) => handleChange('inventor', e.target.value)}
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlined fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
            <Button
              sx={{ minWidth: '40px', bgcolor: 'white', border: '1px solid #e0e0e0', color: '#777', '&:hover': { bgcolor: '#f5f5f5' } }}
            >
              <Add fontSize="small" />
            </Button>
          </Grid>

          {/* Assignee */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 1 }} size={{ xs: 4, sm: 4, md: 4}}>
            <TextField
              fullWidth
              placeholder="Assignee"
              value={formData.assignee}
              onChange={(e) => handleChange('assignee', e.target.value)}
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleAltOutlined fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
            <Button
              sx={{ minWidth: '40px', bgcolor: 'white', border: '1px solid #e0e0e0', color: '#777', '&:hover': { bgcolor: '#f5f5f5' } }}
            >
              <Add fontSize="small" />
            </Button>
          </Grid>

          {/* Patent Office */}
          <Grid item xs={12} md={4} size={{ xs: 4, sm: 4, md: 4}}>
            <CustomSelect value={formData.patentOffice} onChange={(val) => handleChange('patentOffice', val)} placeholder="Patent Office" />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, borderColor: '#d1d5db' }} />

        {/* ROW 4: Bottom Dropdowns */}
        <Grid
          container
          spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            width: '100%',
            m: 0 // Prevents overflow issues
          }}
        >
          <Grid item xs={12} sm={6} md={3} size={{ xs: 3, sm: 3, md: 3 }}>
            <CustomSelect value={formData.language} onChange={(val) => handleChange('language', val)} placeholder="Language" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} size={{ xs: 3, sm: 3, md: 3}}>
            <CustomSelect value={formData.status} onChange={(val) => handleChange('status', val)} placeholder="Status" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} size={{ xs: 3, sm: 3, md: 3 }}>
            <CustomSelect value={formData.type} onChange={(val) => handleChange('type', val)} placeholder="Type" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} size={{ xs: 3, sm: 3, md: 3}}>
            <CustomSelect value={formData.litigation} onChange={(val) => handleChange('litigation', val)} placeholder="Litigation" />
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
};

export default AdvanceSearch;
