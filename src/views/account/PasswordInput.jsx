import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, alpha } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// 1. Destructure 'value' from props here
const PasswordInput = ({ label, placeholder, onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="label" sx={{ mb: 1, display: 'block', ml: 0.5 }}>{label}</Typography>
      <TextField
        fullWidth
        // 2. Pass the value from the parent so the input is "Controlled"
        value={value} 
        // 3. Pass the onChange handler so the parent knows when typing happens
        onChange={onChange}
        
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