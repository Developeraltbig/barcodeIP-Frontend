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
import BorderColorIcon from '@mui/icons-material/BorderColor';

// --- MOCK DATA FOR THE LIST ---
const MOCK_TEXT_DATA = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries  Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",

  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled i",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
  'Another piece of dummy text. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
];

const PATENT_OFFICES = [
  { code: 'WO', label: 'World Intellectual Property Organization (WIPO)' },
  { code: 'US', label: 'United States (USPTO)' },
  { code: 'EP', label: 'European Patent Office (EPO)' },
  { code: 'JP', label: 'Japan Patent Office (JPO)' },
  { code: 'KR', label: 'Korean Intellectual Property Office (KIPO)' },
  { code: 'CN', label: 'China National Intellectual Property Administration (CNIPA)' },
  { code: 'AE', label: 'United Arab Emirates Patent Office' },
  { code: 'AG', label: 'Antigua and Barbuda Intellectual Property Office' },
  { code: 'AL', label: 'Albanian Patent Office' },
  { code: 'AM', label: 'Armenian Intellectual Property Office' },
  { code: 'AO', label: 'Angola Patent Office' },
  { code: 'AP', label: 'African Regional Intellectual Property Organization (ARIPO)' },
  { code: 'AR', label: 'Argentina National Institute of Industrial Property' },
  { code: 'AT', label: 'Austrian Patent Office' },
  { code: 'AU', label: 'IP Australia' },
  { code: 'AW', label: 'Aruba Intellectual Property Office' },
  { code: 'AZ', label: 'Azerbaijan Intellectual Property Agency' },
  { code: 'BA', label: 'Bosnia and Herzegovina Institute for Intellectual Property' },
  { code: 'BB', label: 'Barbados Corporate Affairs and Intellectual Property Office' },
  { code: 'BD', label: 'Bangladesh Department of Patents, Designs and Trademarks' },
  { code: 'BE', label: 'Belgian Intellectual Property Office' },
  { code: 'BF', label: 'Burkina Faso (OAPI)' },
  { code: 'BG', label: 'Patent Office of the Republic of Bulgaria' },
  { code: 'BH', label: 'Bahrain Directorate of Industrial Property' },
  { code: 'BJ', label: 'Benin (OAPI)' },
  { code: 'BN', label: 'Brunei Darussalam Intellectual Property Office' },
  { code: 'BO', label: 'Bolivian National Intellectual Property Service' },
  { code: 'BR', label: 'Brazilian National Institute of Industrial Property' },
  { code: 'BW', label: 'Botswana Companies and Intellectual Property Authority' },
  { code: 'BY', label: 'National Center of Intellectual Property (Belarus)' },
  { code: 'BZ', label: 'Belize Intellectual Property Office' },
  { code: 'CA', label: 'Canadian Intellectual Property Office' },
  { code: 'CF', label: 'Central African Republic (OAPI)' },
  { code: 'CG', label: 'Congo (OAPI)' },
  { code: 'CH', label: 'Swiss Federal Institute of Intellectual Property' },
  { code: 'CI', label: "Côte d'Ivoire (OAPI)" },
  { code: 'CL', label: 'National Institute of Industrial Property (Chile)' },
  { code: 'CM', label: 'Cameroon (OAPI)' },
  { code: 'CO', label: 'Superintendency of Industry and Commerce (Colombia)' },
  { code: 'CR', label: 'Costa Rica Registry of Industrial Property' },
  { code: 'CS', label: 'Serbia and Montenegro (Historical)' },
  { code: 'CU', label: 'Cuban Industrial Property Office' },
  { code: 'CY', label: 'Cyprus Department of Registrar of Companies and Intellectual Property' },
  { code: 'CZ', label: 'Industrial Property Office of the Czech Republic' },
  { code: 'DD', label: 'German Democratic Republic (Historical)' },
  { code: 'DE', label: 'German Patent and Trade Mark Office (DPMA)' },
  { code: 'DJ', label: 'Djibouti Office of Industrial and Commercial Property' },
  { code: 'DK', label: 'Danish Patent and Trademark Office' },
  { code: 'DM', label: 'Dominica Companies and Intellectual Property Office' },
  { code: 'DO', label: 'Dominican Republic' },
  { code: 'DZ', label: 'Algeria' },
  { code: 'EA', label: 'Eurasian Patent Organization (EAPO)' },
  { code: 'EC', label: 'Ecuador' },
  { code: 'EE', label: 'Estonia' },
  { code: 'EG', label: 'Egypt' },
  { code: 'EM', label: 'European Union Intellectual Property Office (EUIPO)' },
  { code: 'ES', label: 'Spain' },
  { code: 'FI', label: 'Finland' },
  { code: 'FR', label: 'France' },
  { code: 'GA', label: 'Gabon' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'GC', label: 'Patent Office of the Cooperation Council for the Arab States of the Gulf (GCC)' },
  { code: 'GD', label: 'Grenada' },
  { code: 'GE', label: 'Georgia' },
  { code: 'GH', label: 'Ghana' },
  { code: 'GM', label: 'Gambia' },
  { code: 'GN', label: 'Guinea' },
  { code: 'GQ', label: 'Equatorial Guinea' },
  { code: 'GR', label: 'Greece' },
  { code: 'GW', label: 'Guinea-Bissau' },
  { code: 'HK', label: 'Hong Kong' },
  { code: 'HN', label: 'Honduras' },
  { code: 'HR', label: 'Croatia' },
  { code: 'HU', label: 'Hungary' },
  { code: 'IB', label: 'International Bureau of WIPO' },
  { code: 'ID', label: 'Indonesia' },
  { code: 'IE', label: 'Ireland' },
  { code: 'IL', label: 'Israel' },
  { code: 'IN', label: 'India' },
  { code: 'IR', label: 'Iran' },
  { code: 'IS', label: 'Iceland' },
  { code: 'IT', label: 'Italy' },
  { code: 'JO', label: 'Jordan' },
  { code: 'KE', label: 'Kenya' },
  { code: 'KG', label: 'Kyrgyzstan' },
  { code: 'KH', label: 'Cambodia' },
  { code: 'KM', label: 'Comoros' },
  { code: 'KN', label: 'Saint Kitts and Nevis' },
  { code: 'KP', label: 'North Korea' },
  { code: 'KW', label: 'Kuwait' },
  { code: 'KZ', label: 'Kazakhstan' },
  { code: 'LA', label: 'Laos' },
  { code: 'LC', label: 'Saint Lucia' },
  { code: 'LI', label: 'Liechtenstein' },
  { code: 'LK', label: 'Sri Lanka' },
  { code: 'LR', label: 'Liberia' },
  { code: 'LS', label: 'Lesotho' },
  { code: 'LT', label: 'Lithuania' },
  { code: 'LU', label: 'Luxembourg' },
  { code: 'LV', label: 'Latvia' },
  { code: 'LY', label: 'Libya' },
  { code: 'MA', label: 'Morocco' },
  { code: 'MC', label: 'Monaco' },
  { code: 'MD', label: 'Moldova' },
  { code: 'ME', label: 'Montenegro' },
  { code: 'MG', label: 'Madagascar' },
  { code: 'MK', label: 'North Macedonia' },
  { code: 'ML', label: 'Mali' },
  { code: 'MN', label: 'Mongolia' },
  { code: 'MO', label: 'Macao' },
  { code: 'MR', label: 'Mauritania' },
  { code: 'MT', label: 'Malta' },
  { code: 'MW', label: 'Malawi' },
  { code: 'MX', label: 'Mexico' },
  { code: 'MY', label: 'Malaysia' },
  { code: 'MZ', label: 'Mozambique' },
  { code: 'NA', label: 'Namibia' },
  { code: 'NE', label: 'Niger' },
  { code: 'NG', label: 'Nigeria' },
  { code: 'NI', label: 'Nicaragua' },
  { code: 'NL', label: 'Netherlands' },
  { code: 'NO', label: 'Norway' },
  { code: 'NZ', label: 'New Zealand' },
  { code: 'OA', label: 'African Intellectual Property Organization (OAPI)' },
  { code: 'OM', label: 'Oman' },
  { code: 'PA', label: 'Panama' },
  { code: 'PE', label: 'Peru' },
  { code: 'PG', label: 'Papua New Guinea' },
  { code: 'PH', label: 'Philippines' },
  { code: 'PL', label: 'Poland' },
  { code: 'PT', label: 'Portugal' },
  { code: 'PY', label: 'Paraguay' },
  { code: 'QA', label: 'Qatar' },
  { code: 'RO', label: 'Romania' },
  { code: 'RS', label: 'Serbia' },
  { code: 'RU', label: 'Russian Federation' },
  { code: 'RW', label: 'Rwanda' },
  { code: 'SA', label: 'Saudi Arabia' },
  { code: 'SC', label: 'Seychelles' },
  { code: 'SD', label: 'Sudan' },
  { code: 'SE', label: 'Sweden' },
  { code: 'SG', label: 'Singapore' },
  { code: 'SI', label: 'Slovenia' },
  { code: 'SK', label: 'Slovakia' },
  { code: 'SL', label: 'Sierra Leone' },
  { code: 'SM', label: 'San Marino' },
  { code: 'SN', label: 'Senegal' },
  { code: 'ST', label: 'Sao Tome and Principe' },
  { code: 'SU', label: 'Soviet Union (formerly)' },
  { code: 'SV', label: 'El Salvador' },
  { code: 'SY', label: 'Syria' },
  { code: 'SZ', label: 'Eswatini' },
  { code: 'TD', label: 'Chad' },
  { code: 'TG', label: 'Togo' },
  { code: 'TH', label: 'Thailand' },
  { code: 'TJ', label: 'Tajikistan' },
  { code: 'TM', label: 'Turkmenistan' },
  { code: 'TN', label: 'Tunisia' },
  { code: 'TR', label: 'Türkiye' },
  { code: 'TT', label: 'Trinidad and Tobago' },
  { code: 'TW', label: 'Taiwan' },
  { code: 'TZ', label: 'Tanzania' },
  { code: 'UA', label: 'Ukraine' },
  { code: 'UG', label: 'Uganda' },
  { code: 'UY', label: 'Uruguay' },
  { code: 'UZ', label: 'Uzbekistan' },
  { code: 'VC', label: 'Saint Vincent and the Grenadines' },
  { code: 'VE', label: 'Venezuela' },
  { code: 'VN', label: 'Viet Nam' },
  { code: 'YU', label: 'Yugoslavia (formerly)' },
  { code: 'ZA', label: 'South Africa' },
  { code: 'ZM', label: 'Zambia' },
  { code: 'ZW', label: 'Zimbabwe' }
];

// Languages based on common patent languages globally (ISO 639-1 codes)
const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'German' },
  { code: 'ZH', label: 'Chinese' },
  { code: 'FR', label: 'French' },
  { code: 'ES', label: 'Spanish' },
  { code: 'AR', label: 'Arabic' },
  { code: 'JP', label: 'Japanese' },
  { code: 'KO', label: 'Korean' },
  { code: 'PT', label: 'Portuguese' },
  { code: 'RU', label: 'Russian' },
  { code: 'IT', label: 'Italian' },
  { code: 'NL', label: 'Dutch' },
  { code: 'SV', label: 'Swedish' },
  { code: 'FI', label: 'Finnish' },
  { code: 'NO', label: 'Norwegian' },
  { code: 'DA', label: 'Danish' }
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
      endDate: prev.endDate && newDate && newDate > prev.endDate ? newDate : prev.endDate
    }));
  };

  const handleEndDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      endDate: newDate,
      // Optional: Adjust startDate if after endDate
      startDate: prev.startDate && newDate && newDate < prev.startDate ? newDate : prev.startDate
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
                <BorderColorIcon sx={{ fontSize: '1.2rem' }} />
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
                <MenuItem value="">Priority</MenuItem>
                {/* <MenuItem value="Priority">Priority</MenuItem> */}
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
                  // slotProps is the standard for MUI x-date-pickers v6+
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        // 1. Background color (grey)
                        backgroundColor: '#f0f0f0',
                        // 2. Customizing the border
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'black' // Default border color
                          },
                          '&:hover fieldset': {
                            borderColor: 'black' // Border color on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'black' // Border color when clicked/focused
                          },
                          // Removes red border if there's a validation error
                          '&.Mui-error fieldset': {
                            borderColor: 'black'
                          }
                        },
                        // 3. Label color
                        '& .MuiInputLabel-root': {
                          color: 'black'
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: 'black'
                        },
                        // Apply your other custom styles
                        ...customInputStyle
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={handleStartDateChange}
                  maxDate={formData.endDate || undefined}
                  // slotProps is the standard for MUI x-date-pickers v6+
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        // 1. Background color (grey)
                        backgroundColor: '#f0f0f0',
                        // 2. Customizing the border
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'black' // Default border color
                          },
                          '&:hover fieldset': {
                            borderColor: 'black' // Border color on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'black' // Border color when clicked/focused
                          },
                          // Removes red border if there's a validation error
                          '&.Mui-error fieldset': {
                            borderColor: 'black'
                          }
                        },
                        // 3. Label color
                        '& .MuiInputLabel-root': {
                          color: 'black'
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: 'black'
                        },
                        // Apply your other custom styles
                        ...customInputStyle
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Divider sx={{ my: 2, borderColor: '#b8b6b6' }} />
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
              <Divider sx={{ my: 2, borderColor: '#c5c5c5' }} />
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
                <MenuItem value="" disabled>
                  Patent Office
                </MenuItem>
                {PATENT_OFFICES.map((office) => (
                  <MenuItem key={office.code} value={office.code}>
                    {office.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Divider sx={{ my: 2, borderColor: '#afadad' }} />
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
                {/* <MenuItem value=" " disabled>Language</MenuItem> */}
                <MenuItem value="" disabled>
                  Language
                </MenuItem>
                {LANGUAGES.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang.label}
                  </MenuItem>
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
                <MenuItem value="" disabled>
                  Status
                </MenuItem>
                <MenuItem value="Active">Grant</MenuItem>
                <MenuItem value="Inactive">Application</MenuItem>
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
                <MenuItem value="" disabled>
                  Type
                </MenuItem>
                <MenuItem value="Patent">Patent</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
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
                <MenuItem value="" disabled>
                  Litigation
                </MenuItem>
                <MenuItem value="Yes">Has Related Litigation</MenuItem>
                <MenuItem value="No">No Known Litigation</MenuItem>
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
