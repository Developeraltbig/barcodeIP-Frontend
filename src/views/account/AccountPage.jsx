
import React, { useState } from 'react';
import { 
  Box, Container, Typography, Button, ThemeProvider, 
  CssBaseline, Paper, CircularProgress, Alert, Snackbar 
} from '@mui/material';
import { theme } from './theme';
import PasswordInput from './PasswordInput';
import AccountActions from './AccountActions';
import { useChangePasswordMutation } from '../../features/slice/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/slice/auth/authSlice';
// import { useChangePasswordMutation } from '../../features/slice/auth/authApi';

const AccountPage = () => {
  // 1. API Hook
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useDispatch(); 

  // 2. Form State
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 3. Feedback State
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

  const handleInputChange = (prop) => (event) => {
    // 1. Check if PasswordInput returns a standard Event object or just the value string
    // Some custom components return the string directly.
    const value = event && event.target ? event.target.value : event;

    // 2. Use the "Functional Update" pattern (prevPasswords)
    // This ensures you never overwrite state with old data.
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [prop]: value,
    }));
  };

  const handleSave = async () => {
    console.log('passwords --', passwords);
    
    // Validation
    if (passwords.newPassword !== passwords.confirmPassword) {
      setFeedback({ open: true, message: 'Passwords do not match!', severity: 'error' });
      return;
    }

    try {
      // 1. Call API
      await changePassword(passwords).unwrap();

      // 2. Show Success Message
      setFeedback({ open: true, message: 'Password changed successfully! Logging out...', severity: 'success' });
      
      // 3. Clear Form (Optional, since we are navigating away)
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });

      // 4. Logout Logic (Delayed slightly so user sees the success message)
      setTimeout(() => {
        // A. Remove token from storage
        localStorage.removeItem('token'); 
        localStorage.removeItem('user'); // or whatever keys you use
        
        // B. Dispatch logout action (If using Redux)
        dispatch(logout());

        // // C. Redirect to Login
        // navigate('/login'); 
      }, 1500); // 1.5 second delay

    } catch (err) {
      setFeedback({ 
        open: true, 
        message: err?.data?.message || 'Failed to change password', 
        severity: 'error' 
      });
    }
  };





  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default', marginTop:'70px'}}>
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ mb: 5 }} > Account Settings </Typography>
          
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, border: '1px solid #d6d8dbff'  , borderRadius:'5px'   }}>
            <Typography variant="h6" sx={{ mb: 4 }}>Change Password</Typography>
            
            <Box sx={{ maxWidth: '100%' }}>
              <PasswordInput 
                label="Current Password" 
                value={passwords.oldPassword}
                onChange={handleInputChange('oldPassword')}
              />
              <PasswordInput 
                label="New Password" 
                value={passwords.newPassword}
                onChange={handleInputChange('newPassword')}
              />
              <PasswordInput 
                label="Confirm New Password" 
                value={passwords.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
              />
              <Button
                variant="contained"
                disableElevation
                onClick={handleSave}
                disabled={isLoading}
                sx={{ mt: 3, bgcolor: 'primary.main', px: 5, py: 1.5, borderRadius: '10px' }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
              </Button>
            </Box>
          </Paper>

          <AccountActions />
        </Container>

        {/* Feedback Toast */}
        <Snackbar 
          open={feedback.open} 
          autoHideDuration={4000} 
          onClose={() => setFeedback({ ...feedback, open: false })}
        >
          <Alert severity={feedback.severity} variant="filled">
            {feedback.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default AccountPage;