import React, { useState } from 'react';
import { Box, Typography, Button, Stack, alpha, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { useDeleteAccountMutation, useLazyLogoutQuery } from '../../features/slice/auth/authApi';
import { logout } from '../../features/slice/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../app/store';

const AccountActions = () => {

  const dispatch = useDispatch();
  const [Logout] = useLazyLogoutQuery();

const handleLogout = async () => {
  try {
    // 1. Call your API logout endpoint
    await axios.get("/api/auth/logout");
  } catch (error) {
    console.error("Logout error", error);
  } finally {
    // 2. PURGE the persistent storage (Deletes stored data from browser)
    await persistor.purge();
    
    // 3. Optional: Clear specific keys just in case
    localStorage.removeItem('persist:auth');
    localStorage.removeItem('persist:userDashboard');
    
    // 4. Force a hard refresh to clear the Redux state in memory
    window.location.href = '/pages/auth/login'; 
  }
};

const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount().unwrap();
      // Clear local storage/session if your app doesn't do it automatically on logout
      navigate('/pages/auth/login'); 
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  };
  

  // Common style for the buttons with hover animation
  const actionButtonStyle = {
    justifyContent: 'flex-start', // Keep text/icon left-aligned
    color: '#334155',
    fontWeight: 700,
    textTransform: 'none',
    width: 'fit-content', 
    px: 2,
    py: 1,
    borderRadius: '4px',
    border: '1px solid #b9bec2ff',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth animation curve
    '&:hover': {
      bgcolor: alpha('#d1d2d3ff', 0.05),
      transform: 'translateX(10px)', // Slide to the right on hover
      color: 'primary.main',
      '& .MuiButton-startIcon': {
        transform: 'scale(1.2)', // Slightly enlarge icon on hover
      }
    },
    '& .MuiButton-startIcon': {
      transition: 'transform 0.2s ease',
    }
  };



  return (
    <Box sx={{ mt: 8, textAlign: 'left' }}>
      {/* Section Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: '#475569',
          mb: 2,
          fontSize: '1.1rem',
          ml: 1 // Slight margin to align with the box edge
        }}
      >
        Account Actions
      </Typography>

      {/* Action Container Box */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          maxWidth: '350px', // Restrict width so it stays on the left

          borderRadius: '16px',
          bgcolor: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}
      >
        <Stack spacing={1}>
          <Button
            startIcon={<LogoutIcon sx={{ color: '#F59E0B' }} />} // Orange Logout
            sx={actionButtonStyle}
            onClick={() => handleLogout()}
          >
            Log out
          </Button>

          <Button
            startIcon={<DeleteIcon sx={{ color: '#EF4444' }} />} // Red Delete
            sx={actionButtonStyle} onClick={() => setOpenDeleteModal(true)}
          >
            Delete Account
          </Button>
        </Stack>
      </Paper>

      {/* CONFIRMATION DIALOG */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Delete Account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action is permanent and will remove all your data from our servers.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDeleteModal(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error" disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountActions;