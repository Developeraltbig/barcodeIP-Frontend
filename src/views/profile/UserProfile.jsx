import React, { useState } from 'react';
import { Box, Container, Typography, Button, Stack, Divider, ThemeProvider, CssBaseline, Paper } from '@mui/material';
import { theme } from './theme';
import ProfileHeader from './ProfileHeader';
import UserInfoForm from './UserInfoForm';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: 'Tester',
    email: 'developeraltbig@gmail.com',
    phone: '+91 99663 35879',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default', marginTop:'70px' }}>
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ mb: 4, px: 1 }}>User's Information</Typography>
          
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 6 }, 
              borderRadius: 2, 
              border: '1px solid #dbdee2ff',
              boxShadow: '0 10px 18px -1px rgba(0,0,0,0.09)' 
            }}
          >
            <ProfileHeader name={formData.name} email={formData.email} />
            <Divider sx={{ mb: 5 }} />
            <UserInfoForm formData={formData} handleChange={handleChange} />

            <Stack direction="row" spacing={2} sx={{ mt: 8 }}>
              <Button 
                variant="outlined" 
                sx={{ 
                  px: 4, py: 1.2, color: 'text.primary', borderColor: 'primary.main',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' }
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                disableElevation 
                sx={{ px: 4, py: 1.2, bgcolor: 'primary.main', '&:hover': { bgcolor: '#B23327' } }}
              >
                Save Changes
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;