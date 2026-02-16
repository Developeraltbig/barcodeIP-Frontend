import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, alpha } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = ({ label, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="label" sx={{ mb: 1, display: 'block', ml: 0.5 }}>{label}</Typography>
      <TextField
        fullWidth
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'white',
            '& fieldset': { borderColor: '#d8d7d7ff' },
            '&:hover fieldset': { borderColor: '#D34335' },
            '&.Mui-focused': {
              boxShadow: (theme) => `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
            }
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default PasswordInput;