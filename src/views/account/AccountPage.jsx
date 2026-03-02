// import React, { useState } from 'react';
// import { Box, Container, Typography, Button, ThemeProvider, CssBaseline, Paper, Divider } from '@mui/material';
// import { theme } from './theme';
// import PasswordInput from './PasswordInput';
// import AccountActions from './AccountActions';
// import { useDeleteAccountMutation } from '../../features/slice/auth/authApi';
// import { useNavigate } from 'react-router-dom';

// const AccountPage = () => {
  
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default', marginTop:'70px' }}>
//         <Container maxWidth="md">
//           <Typography variant="h5" sx={{ mb: 5 }}>Account Settings</Typography>
          
//           <Paper 
//             elevation={0} 
//             sx={{ 
//               p: { xs: 3, md: 5 }, 
//               border: '1px solid #d6d8dbff',
//               boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)' 
//             }}
//           >
//             <Typography variant="h6" sx={{ mb: 4 }}>Change Password</Typography>
            
//             <Box sx={{ maxWidth: '100%' }}>
//               <PasswordInput label="Current Password" placeholder="••••••••" />
//               <PasswordInput label="New Password" placeholder="Enter new password" />
//               <PasswordInput label="Confirm New Password" placeholder="Repeat new password" />
              
//               <Button
//                 variant="contained"
//                 disableElevation
//                 sx={{
//                   mt: 3,
//                   bgcolor: 'primary.main',
//                   px: 5,
//                   py: 1.5,
//                   borderRadius: '10px',
//                   fontWeight: 700,
//                   boxShadow: '0 4px 14px 0 rgba(211, 67, 53, 0.3)',
//                   '&:hover': { bgcolor: '#B23327' }
//                 }}
//               >
//                 Save Changes
//               </Button>
//             </Box>
//           </Paper>

//           <AccountActions />
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AccountPage;






















import React, { useState } from 'react';
import { 
  Box, Container, Typography, Button, ThemeProvider, 
  CssBaseline, Paper, CircularProgress, Alert, Snackbar 
} from '@mui/material';
import { theme } from './theme';
import PasswordInput from './PasswordInput';
import AccountActions from './AccountActions';
import { useChangePasswordMutation } from '../../features/slice/auth/authApi';
// import { useChangePasswordMutation } from '../../features/slice/auth/authApi';

const AccountPage = () => {
  // 1. API Hook
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  // 2. Form State
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 3. Feedback State
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

  const handleInputChange = (prop) => (event) => {
    setPasswords({ ...passwords, [prop]: event.target.value });
  };

  // 4. Submit Handler
  const handleSave = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setFeedback({ open: true, message: 'Passwords do not match!', severity: 'error' });
      return;
    }

    try {
      await changePassword(passwords).unwrap();
      setFeedback({ open: true, message: 'Password changed successfully!', severity: 'success' });
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' }); // Reset form
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
      <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default', marginTop:'70px' }}>
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ mb: 5 }}>Account Settings</Typography>
          
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, border: '1px solid #d6d8dbff' }}>
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