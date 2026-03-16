
import { Alert, Box, CssBaseline, Snackbar, ThemeProvider } from '@mui/material'
import React, { lazy } from 'react'
import Loadable from 'components/Loadable';
import { theme } from './theme';

const UserInfoForm = Loadable(lazy(() => import('./UserInfoForm')));
const AccountPage  = Loadable(lazy(() => import('../account/AccountPage')));

const UserProfile = () => {
  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default', marginTop: '70px' }}>
        
        <UserInfoForm />
     
        <AccountPage />

        {/* <Snackbar 
          // open={feedback.open} 
          autoHideDuration={4000} 
          // onClose={() => setFeedback({ ...feedback, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning added here
        >
          <Alert severity={feedback.severity} variant="filled">{feedback.message}</Alert>
        </Snackbar> */}
    </Box>
     </ThemeProvider>
  )
}

export default UserProfile

