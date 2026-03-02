import React from 'react';
import { Box, Container, Typography, Button, ThemeProvider, CssBaseline, Paper, Divider } from '@mui/material';
import { theme } from './theme';
import PasswordInput from './PasswordInput';
import AccountActions from './AccountActions';

const AccountPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default', marginTop:'70px' }}>
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ mb: 5 }}>Account Settings</Typography>
          
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 5 }, 
              border: '1px solid #d6d8dbff',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)' 
            }}
          >
            <Typography variant="h6" sx={{ mb: 4 }}>Change Password</Typography>
            
            <Box sx={{ maxWidth: '100%' }}>
              <PasswordInput label="Current Password" placeholder="••••••••" />
              <PasswordInput label="New Password" placeholder="Enter new password" />
              <PasswordInput label="Confirm New Password" placeholder="Repeat new password" />
              
              <Button
                variant="contained"
                disableElevation
                sx={{
                  mt: 3,
                  bgcolor: 'primary.main',
                  px: 5,
                  py: 1.5,
                  borderRadius: '10px',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px 0 rgba(211, 67, 53, 0.3)',
                  '&:hover': { bgcolor: '#B23327' }
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>

          <AccountActions />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AccountPage;