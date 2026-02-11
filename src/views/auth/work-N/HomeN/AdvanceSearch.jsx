import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Switch,
  Button,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Divider
} from '@mui/material';
import { CalendarToday, PersonOutline, BusinessOutlined, Add } from '@mui/icons-material';

// --- Reusable Sub-Component for Select Inputs ---
const StyledSelect = ({ placeholder, options = [], ...props }) => (
  <Select
    displayEmpty
    fullWidth
    variant="outlined"
    sx={{
      bgcolor: '#fff',
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #E5E7EB'
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#B0B0B0'
      },
      '& .MuiSelect-select': {
        color: '#6B7280',
        py: 1.5,
        fontSize: '0.95rem'
      }
    }}
    {...props}
  >
    <MenuItem value="" disabled>
      <Typography variant="body2" color="textSecondary">
        {placeholder}
      </Typography>
    </MenuItem>
    {options.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </Select>
);

// --- Main Component ---
const AdvanceSearch = () => {
  // State for form controls
  const [isAdvanceSearch, setIsAdvanceSearch] = useState(true);
  const [dateRange, setDateRange] = useState('range');
  const [priority, setPriority] = useState('');

  const longQueryText = `(TI=(Bioelectronic neural interface OR Endovascular implants OR Implantable pulse generator OR External blood pressure monitor) OR DESC=(Bioelectronic neural interface OR Endovascular implants OR Implantable pulse generator OR External blood pressure monitor) OR DESC=(Bioelectronic neural interface OR Endovascular implants OR Implantable pulse generator OR External blood pressure monitor)) AND (CLMS=(Neuromodulation OR Treatment of autonomic disorders OR Chronic stimulation OR Blood pressure regulation)) AND (CLMS=(Stent-like device with stimulation sites OR Expandable structure with electrodes OR High currents with electrochemical stability OR External pulse generator control for open-loop or closed-loop operation)) AND (DESC=(Minimally invasive implantation OR Transvascular neuromodulation OR Device's ability to grow into the blood vessel wall OR Radial coverage of the stimulation sites)) AND (DESC=(Minimally thrombogenic cable OR Wired tracks OR Stimulation sites on stent crossings OR Wireless capability))`;

  return (
    <Box sx={{ bgcolor: '#F3F4F6', py: 5 }}>
      <Container maxWidth="lg">
        {/* 1. Top Header: Title and Clear Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isAdvanceSearch}
                onChange={(e) => setIsAdvanceSearch(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#E94E34' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#E94E34' }
                }}
              />
            }
            label={<Typography sx={{ fontWeight: 600, color: '#4B5563' }}>Advance Search</Typography>}
          />
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: '#E94E34',
              color: '#fff',
              '&:hover': { bgcolor: '#d65f50' },
              textTransform: 'none',
              fontSize: '0.9rem'
            }}
          >
            Clear All
          </Button>
        </Box>

        {/* 2. Main Search Panel */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            bgcolor: '#fff'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Advance Search
          </Typography>

          {/* Inner panel for form fields */}
          <Box sx={{ bgcolor: '#F9FAFB', p: 3, borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <Grid container spacing={2} alignItems="center">
              {/* Row 1: Date, Priority, and Dates */}
              <Grid item xs={12} md={2}>
                <ToggleButtonGroup value={dateRange} exclusive onChange={(e, val) => setDateRange(val)} aria-label="date range" fullWidth>
                  <ToggleButton value="range" aria-label="date range" sx={{ textTransform: 'none', fontWeight: 600 }}>
                    Date Range
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} md={3}>
                <StyledSelect placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={3.5}>
                <TextField
                  fullWidth
                  placeholder="Start Date"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  sx={{ bgcolor: '#fff' }}
                />
              </Grid>
              <Grid item xs={12} md={3.5}>
                <TextField
                  fullWidth
                  placeholder="End Date"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  sx={{ bgcolor: '#fff' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Row 2: Query Text */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue={longQueryText}
                  variant="outlined"
                  sx={{ bgcolor: '#fff', '.MuiOutlinedInput-root': { p: 1 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Row 3: Inventor, Assignee, Patent Office */}
              <Grid item xs={12} md={4.5}>
                <TextField
                  fullWidth
                  placeholder="Inventor"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline />
                      </InputAdornment>
                    )
                  }}
                  sx={{ bgcolor: '#fff' }}
                />
              </Grid>
              <Grid item xs={12} md={1} sx={{ textAlign: 'center' }}>
                <IconButton>
                  <Add />
                </IconButton>
              </Grid>
              <Grid item xs={12} md={4.5}>
                <TextField
                  fullWidth
                  placeholder="Assignee"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessOutlined />
                      </InputAdornment>
                    )
                  }}
                  sx={{ bgcolor: '#fff' }}
                />
              </Grid>
              <Grid item xs={12} md={1} sx={{ textAlign: 'center' }}>
                <IconButton>
                  <Add />
                </IconButton>
              </Grid>
              <Grid item xs={12} md={12}>
                <StyledSelect placeholder="Patent Office" />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Row 4: Dropdowns */}
              <Grid item xs={12} md={3}>
                <StyledSelect placeholder="Language" />
              </Grid>
              <Grid item xs={12} md={3}>
                <StyledSelect placeholder="Status" />
              </Grid>
              <Grid item xs={12} md={3}>
                <StyledSelect placeholder="Type" />
              </Grid>
              <Grid item xs={12} md={3}>
                <StyledSelect placeholder="Litigation" />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdvanceSearch;
