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

// --- MOCK DATA FOR THE LIST ---
const MOCK_TEXT_DATA = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries  Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",

  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled i",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
  'Another piece of dummy text. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
];

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
        PaperProps={{ sx: { borderRadius: '4px', p: { xs: 2, md: 4 } } }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#111827' }}>
            Date Range
          </Typography>

          <Grid container spacing={2}>
            {/* --- Date Range Section --- */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Select
                fullWidth
                displayEmpty
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                sx={customInputStyle}
              >
                <MenuItem value="" disabled>
                  Priority
                </MenuItem>
                <MenuItem value="Priority">Priority 1</MenuItem>
                <MenuItem value="Application">Application</MenuItem>
              </Select>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth placeholder="Start Date" sx={customInputStyle} />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField fullWidth placeholder="End Date" sx={customInputStyle} />
            </Grid>

            {/* First Divider */}
            <Grid item size={{ xs: 12 }}>
              <Divider sx={{ my: 2, borderColor: '#526283' }} />
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
                  '& .MuiOutlinedInput-root': { padding: '16px' },
                  '& .MuiOutlinedInput-input': { color: '#888', lineHeight: 1.5 }
                }}
              />
            </Grid>

            {/* Second Divider */}
            <Grid item size={{ xs: 12 }}>
              <Divider sx={{ my: 2, borderColor: '#3f64ad' }} />
            </Grid>

            {/* --- Inventor & Assignee & Patent Office --- */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                placeholder="Inventor"
                sx={customInputStyle}
                InputProps={{
                  sx: { pr: 0 }, // Remove padding to make button flush
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
                  sx: { pr: 0 }, // Remove padding to make button flush
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
              <Select fullWidth displayEmpty value={formData.patentOffice} sx={customInputStyle}>
                <MenuItem value="" disabled>
                  Patent Office
                </MenuItem>
                <MenuItem value="US">US</MenuItem>
                <MenuItem value="EP">EP</MenuItem>
              </Select>
            </Grid>

            {/* Third Divider */}
            <Grid item size={{ xs: 12 }}>
              <Divider sx={{ my: 2, borderColor: '#7c7f86' }} />
            </Grid>

            {/* --- Language, Status, Type, Litigation --- */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Select fullWidth displayEmpty value={formData.language} sx={customInputStyle}>
                <MenuItem value="" disabled>
                  Language
                </MenuItem>
                <MenuItem value="EN">English</MenuItem>
              </Select>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Select fullWidth displayEmpty value={formData.status} sx={customInputStyle}>
                <MenuItem value="" disabled>
                  Status
                </MenuItem>
                <MenuItem value="Active">Active</MenuItem>
              </Select>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Select fullWidth displayEmpty value={formData.type} sx={customInputStyle}>
                <MenuItem value="" disabled>
                  Type
                </MenuItem>
                <MenuItem value="Utility">Utility</MenuItem>
              </Select>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Select fullWidth displayEmpty value={formData.litigation} sx={customInputStyle}>
                <MenuItem value="" disabled>
                  Litigation
                </MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
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
                  px: 4,
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
