import React from 'react';
import { Box, Typography, Button, Stack, alpha, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { useLazyLogoutQuery } from '../../features/slice/auth/authApi';
import { logout } from '../../features/slice/auth/authSlice';

const AccountActions = () => {

  const dispatch = useDispatch();
  const [Logout] = useLazyLogoutQuery();

const handleLogout = async () => {
  await Logout();
  dispatch(logout());
};

// const handleDelete = async () => {
//   await Logout();
//   dispatch(logout());
// };

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
            startIcon={<LogoutIcon sx={{ color: '#F59E0B' ,  }} />} // Orange Logout
            sx={actionButtonStyle}
            onClick={() => handleLogout()}
          >
            Log out
          </Button>

          <Button
            startIcon={<DeleteIcon sx={{ color: '#EF4444' }} />} // Red Delete
            sx={actionButtonStyle}
          >
            Delete Account
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AccountActions;