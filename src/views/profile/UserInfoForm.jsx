import React from 'react';
import { Grid, Stack, Typography, TextField } from '@mui/material';

const FormField = ({ label, name, value, onChange, placeholder }) => (
  <Stack spacing={1}>
    <Typography variant="caption" color="text.secondary">{label}</Typography>
    <TextField
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          bgcolor: 'white',
          '& fieldset': { borderColor: '#dcdee0ff' },
          '&:hover fieldset': { borderColor: '#D34335' },
        }
      }}
    />
  </Stack>
);

const UserInfoForm = ({ formData, handleChange }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <FormField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Tester" />
    </Grid>
    <Grid item xs={12} md={6}>
      <FormField label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" />
    </Grid>
    <Grid item xs={12} md={6}>
      <FormField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" />
    </Grid>
  </Grid>
);

export default UserInfoForm;