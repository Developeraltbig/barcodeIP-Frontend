import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Container, Typography, Button, Stack, Divider, ThemeProvider, CssBaseline, Paper } from '@mui/material';
import { theme } from './theme';
import ProfileHeader from './ProfileHeader';
import UserInfoForm from './UserInfoForm';

const UserProfile = () => {
  const location = useLocation();
  
  // 1. Get user data from Redux as the primary source of truth
  const reduxUser = useSelector((state) => state.auth.user);
  // console.log("redux user ", reduxUser);
  
  // 2. Fallback to location state (if you passed it from the header)
  const initialUser = location.state?.userData || reduxUser;
  // console.log("initial user", initialUser)

  // 3. Initialize state with the dynamic user data
  const [formData, setFormData] = useState({
    name: initialUser?.name || 'User',
    email: initialUser?.email || '',
    phone: initialUser?.phone || '', // Ensure your login response includes phone if needed
  });

  // Update local state if Redux user changes (e.g., after a fresh login or sync)
  useEffect(() => {
    if (reduxUser) {
      setFormData({
        name: reduxUser.name || 'User',
        email: reduxUser.email || '',
        phone: reduxUser.phone || '',
      });
    }
  }, [reduxUser]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default', marginTop: '70px' }}>
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
            {/* Header now receives dynamic data */}
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
                onClick={() => setFormData({ ...initialUser })} // Reset logic
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                disableElevation 
                sx={{ px: 4, py: 1.2, bgcolor: 'primary.main', '&:hover': { bgcolor: '#B23327' } }}
                onClick={() => console.log("Save Data:", formData)}
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