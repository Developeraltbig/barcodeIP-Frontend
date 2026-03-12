import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Select,
  IconButton,
  InputAdornment,
  Container,
  Paper,
  Dialog,
  DialogContent,
  Divider
} from '@mui/material';
import { ClearAll, Visibility, Add } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// --- MOCK DATA FOR THE LIST ---
const MOCK_TEXT_DATA = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries  Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",

  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled i",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
  'Another piece of dummy text. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
];

const PATENT_OFFICES = [
  { code: "US", label: "United States (USPTO)" },
  { code: "EP", label: "European Patent Office (EPO)" },
  { code: "JP", label: "Japan Patent Office (JPO)" },
  { code: "CN", label: "China National Intellectual Property Administration (CNIPA)" },
  { code: "KR", label: "Korean Intellectual Property Office (KIPO)" },
  { code: "IN", label: "India Patent Office" },
  { code: "CA", label: "Canadian Intellectual Property Office (CIPO)" },
  { code: "AU", label: "IP Australia" },
  { code: "RU", label: "Russian Patent Office" },
  { code: "BR", label: "Brazilian Patent and Trademark Office" },
  // Add more if needed
];

// Languages based on common patent languages globally (ISO 639-1 codes)
const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "FR", label: "French" },
  { code: "DE", label: "German" },
  { code: "JP", label: "Japanese" },
  { code: "ZH", label: "Chinese" },
  { code: "KR", label: "Korean" },
  { code: "ES", label: "Spanish" },
  { code: "RU", label: "Russian" },
  { code: "PT", label: "Portuguese" },
  { code: "IT", label: "Italian" },
  { code: "NL", label: "Dutch" },
  { code: "SE", label: "Swedish" },
  // Extend list if desired
];


  // --- STYLES ---
  // Style for flat, grey-background input fields
  const customInputStyle = {
    bgcolor: '#eeebeb',
    borderRadius: '2px',
    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '& .MuiOutlinedInput-input': {
      padding: '12px 16px',
      fontSize: '0.85rem',
      color: '#555'
    },
    '& .MuiSelect-select': {
      padding: '12px 16px',
      fontSize: '0.85rem',
      color: '#888' // Muted text for placeholders
    }
  };

  // Red Adornment Button Style (Flush to right)
  const redAdornmentStyle = {
    bgcolor: '#E4563C',
    color: 'white',
    minWidth: '45px',
    height: '45px',
    borderRadius: '0 2px 2px 0', // Sharp corners left, slight rounding right
    '&:hover': { bgcolor: '#D3452B' }
  };

const AdvanceSearch = ({ query }) => {
  // --- STATE ---
  const [openModal, setOpenModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  console.log('query', query);

  const [formData, setFormData] = useState({
    priority: '',
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

  // --- HANDLERS ---
  const handleClear = () => {
    setShowConfirmModal(true);
  };

  const handleOpenModal = (text) => {
    setSelectedText(text);
    setFormData((prev) => ({ ...prev, queryText: text }));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const confirmClear = () => {
    setFormData({
      priority: '',
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

    setShowConfirmModal(false);
  };

  const cancelClear = () => {
    setShowConfirmModal(false);
  };


    // Handlers for DatePickers with validation logic
  const handleStartDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      startDate: newDate,
      // Optional: Adjust endDate if before startDate
      endDate: prev.endDate && newDate && newDate > prev.endDate ? newDate : prev.endDate,
    }));
  };

  const handleEndDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      endDate: newDate,
      // Optional: Adjust startDate if after endDate
      startDate: prev.startDate && newDate && newDate < prev.startDate ? newDate : prev.startDate,
    }));
  };

  const menuProps = {
    PaperProps: {
      sx: { maxHeight: 250 }
    }
  };
  
  return (
    <Container maxWidth="xl" sx={{ fontFamily: 'sans-serif', bgcolor: '#fffdfdf3', py: '20px' }}>
      {/* 1. Header Title */}
      <Box sx={{ width: '100%', bgcolor: '#F3F4F6', borderRadius: '8px', p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#374151', letterSpacing: '-0.5px' }}>
            Advance Search
          </Typography>
          <Button
            onClick={handleClear}
            variant="contained"
            startIcon={<ClearAll />}
            sx={{ bgcolor: '#E4563C', '&:hover': { bgcolor: '#dc2626' }, textTransform: 'none', borderRadius: '6px', fontWeight: 700 }}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      {/* 2. Text List Section */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#111827' }}>
        Text
      </Typography>

      {/* Scrollable Container (Shows max 3 items) */}
      <Box
        sx={{
          maxHeight: '340px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pr: 1,
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' }
        }}
      >
        {Array.isArray(query) && query.length > 0 ? (
          query.map((text, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                bgcolor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '2px'
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#6B7280',
                  flex: 1,
                  pr: 3,
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {text}
              </Typography>

              <IconButton
                onClick={() => handleOpenModal(text)}
                sx={{
                  bgcolor: '#E4563C',
                  color: 'white',
                  borderRadius: '2px',
                  p: '10px',
                  '&:hover': { bgcolor: '#D3452B' }
                }}
              >
                <Visibility sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Paper>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', color: '#9CA3AF', py: 3 }}>No Queries Available</Typography>
        )}
      </Box>

      {/* 3. Modal Dialog */}
     <Dialog
      open={openModal}
      onClose={handleCloseModal}
      maxWidth="md"
      fullWidth
      scroll="paper" // Important: Makes the content scroll inside the paper
      PaperProps={{ 
        sx: { 
          borderRadius: '4px', 
          p: { xs: 2, md: 4 },
          maxHeight: '90vh' // Prevents the modal from exceeding screen height
        } 
      }}
    >
      <DialogContent 
        sx={{ 
          p: 0, 
          overflowY: 'auto', // Enables the vertical scroll
          overflowX: 'hidden' 
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#111827' }}>
          Date Range
        </Typography>

        <Grid container spacing={2}>
          {/* --- Date Range Section --- */}
          <Grid item size={{ xs: 12, sm: 6, md: 12 }}>
            <Select
              fullWidth
              displayEmpty
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              sx={customInputStyle}
              MenuProps={menuProps}
            >
              <MenuItem value="" disabled>Priority</MenuItem>
              <MenuItem value="Filing">Filing</MenuItem>
              <MenuItem value="Publication">Publication</MenuItem>
            </Select>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={handleStartDateChange}
                maxDate={formData.endDate || undefined}
                renderInput={(params) => <TextField fullWidth {...params} sx={customInputStyle} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={handleEndDateChange}
                minDate={formData.startDate || undefined}
                renderInput={(params) => <TextField fullWidth {...params} sx={customInputStyle} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Divider sx={{ my: 2, borderColor: '#eee' }} />
          </Grid>

          {/* --- Text Area Section --- */}
          <Grid item size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={formData.queryText}
              onChange={(e) => setFormData({ ...formData, queryText: e.target.value })}
              sx={{
                ...customInputStyle,
                '& .MuiOutlinedInput-root': { padding: '16px', backgroundColor: '#eee' },
                '& .MuiOutlinedInput-input': { color: '#666', lineHeight: 1.5 }
              }}
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Divider sx={{ my: 2, borderColor: '#eee' }} />
          </Grid>

          {/* --- Inventor & Assignee --- */}
          <Grid item size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              placeholder="Inventor"
              sx={customInputStyle}
              InputProps={{
                sx: { pr: 0 },
                endAdornment: (
                  <InputAdornment position="end">
                    <Button sx={redAdornmentStyle}>
                      <Add fontSize="small" />
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              placeholder="Assignee"
              sx={customInputStyle}
              InputProps={{
                sx: { pr: 0 },
                endAdornment: (
                  <InputAdornment position="end">
                    <Button sx={redAdornmentStyle}>
                      <Add fontSize="small" />
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Select
              fullWidth
              displayEmpty
              value={formData.patentOffice}
              onChange={(e) => setFormData({ ...formData, patentOffice: e.target.value })}
              sx={customInputStyle}
              MenuProps={menuProps}
            >
              <MenuItem value="" disabled>Patent Office</MenuItem>
              {PATENT_OFFICES.map((office) => (
                <MenuItem key={office.code} value={office.code}>{office.label}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Divider sx={{ my: 2, borderColor: '#eee' }} />
          </Grid>

          {/* --- Bottom Selects --- */}
          <Grid item size={{ xs: 12, sm: 6 }}>
            <Select
              fullWidth
              displayEmpty
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              sx={customInputStyle}
              MenuProps={menuProps}
            >
              <MenuItem value="" disabled>Language</MenuItem>
              {LANGUAGES.map((lang) => (
                <MenuItem key={lang} value={lang}>{lang}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <Select
              fullWidth
              displayEmpty
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              sx={customInputStyle}
              MenuProps={menuProps}
            >
              <MenuItem value="" disabled>Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <Select
              fullWidth
              displayEmpty
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              sx={customInputStyle}
              MenuProps={menuProps}
            >
              <MenuItem value="" disabled>Type</MenuItem>
              <MenuItem value="Utility">Utility</MenuItem>
            </Select>
          </Grid>

          <Grid item size={{ xs: 12, sm: 6 }}>
            <Select
              fullWidth
              displayEmpty
              value={formData.litigation}
              onChange={(e) => setFormData({ ...formData, litigation: e.target.value })}
              sx={customInputStyle}
              MenuProps={menuProps}
            >
              <MenuItem value="" disabled>Litigation</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </Grid>

          {/* --- Update Button --- */}
          <Grid item size={{ xs: 12, sm: 7, md: 12 }} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{
                bgcolor: '#E4563C',
                '&:hover': { bgcolor: '#D3452B' },
                textTransform: 'none',
                px: 6,
                py: 1.2,
                fontWeight: 'bold',
                borderRadius: '2px'
              }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
      

      <Dialog open={showConfirmModal} onClose={cancelClear} maxWidth="xs" fullWidth>
        <DialogContent sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Confirm Clear
          </Typography>

          <Typography sx={{ mb: 3, color: '#6B7280' }}>Are you sure you want to clear all fields?</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={confirmClear}
              sx={{
                bgcolor: '#E4563C',
                '&:hover': { bgcolor: '#D3452B' },
                textTransform: 'none'
              }}
            >
              Yes, Clear
            </Button>

            <Button variant="outlined" onClick={cancelClear} sx={{ textTransform: 'none' }}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdvanceSearch;




