

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, Container, Typography, Button, Stack, Divider, 
  ThemeProvider, CssBaseline, Paper, CircularProgress, Alert, Snackbar 
} from '@mui/material';
import { theme } from './theme';
import ProfileHeader from './ProfileHeader';
import UserInfoForm from './UserInfoForm';
import AccountPage from '../account/AccountPage';
import { useUpdateImageMutation, useUpdateProfileMutation } from '../../features/slice/auth/authApi';

// 1. Import the mutation hook


const UserProfile = () => {
  const reduxUser = useSelector((state) => state.auth.user);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [updateImage, { isLoading: isImageUpdating }] = useUpdateImageMutation();
  
  // State for success/error feedback
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

  const [formData, setFormData] = useState({
    name: reduxUser?.first_name || '', // Use first_name from DB
    email: reduxUser?.email || '',
    phone: reduxUser?.phone_number || '', // Use phone_number from DB
  });

  // Sync state if Redux updates
  useEffect(() => {
  // Only update if reduxUser actually has data
  if (reduxUser && Object.keys(reduxUser).length > 0) {
    setFormData({
      name: reduxUser.first_name || '', // Use the DB key
      email: reduxUser.email || '',
      phone: reduxUser.phone_number || '', // Use the DB key
    });
  }
}, [reduxUser]); // This triggers as soon as Redux finishes loading from storage

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // 2. The API Integration Logic
  const handleSave = async () => {
    try {
      // Map local state to the Database format
      const payload = {
        first_name: formData.name,
        phone_number: formData.phone
      };

      await updateProfile(payload).unwrap();
      
      setFeedback({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      setFeedback({ 
        open: true, 
        message: err?.data?.message || 'Failed to update profile', 
        severity: 'error' 
      });
    }
  };

  // Handle File Selection and Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create FormData to match your Postman setup
    const formDataToSend = new FormData();
    formDataToSend.append('profile_image', file); // 'profile_image' matches your API key

    try {
      await updateImage(formDataToSend).unwrap();
      setFeedback({ open: true, message: 'Profile image updated!', severity: 'success' });
    } catch (err) {
      setFeedback({ 
        open: true, 
        message: err?.data?.message || 'Failed to upload image', 
        severity: 'error' 
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default', marginTop: '70px' }}>
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ mb: 4, px: 1 }}>
            User's Information
          </Typography>

          <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 2, border: '1px solid #dbdee2ff' }}>
            <ProfileHeader
              name={formData.name}
              email={formData.email}
              avatar={reduxUser?.profile_image} // Pass the current image URL
              onImageChange={handleImageChange}
              isUpdating={isImageUpdating}
            />

            <Divider sx={{ mb: 5 }} />

            {/* Ensure UserInfoForm uses the correct name attributes: "name" and "phone" */}
            <UserInfoForm formData={formData} handleChange={handleChange} />

            <Stack direction="row" spacing={2} sx={{ mt: 8 }}>
              <Button
                variant="outlined"
                onClick={() =>
                  setFormData({
                    name: reduxUser?.first_name || '',
                    phone: reduxUser?.phone_number || ''
                  })
                }
              >
                Cancel
              </Button>

              <Button variant="contained" disabled={isLoading} onClick={handleSave} sx={{ minWidth: '150px' }}>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
              </Button>
            </Stack>
          </Paper>
        </Container>

        <AccountPage />

        {/* Feedback Toast */}
        <Snackbar open={feedback.open} autoHideDuration={4000} onClose={() => setFeedback({ ...feedback, open: false })}>
          <Alert severity={feedback.severity} variant="filled">
            {feedback.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;



















































