// material-ui
// import AppBar from '@mui/material/AppBar';
import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
// import Toolbar from '@mui/material/Toolbar';
// import Box from '@mui/material/Box';
import React, { useState } from 'react';

// project imports
import Notification from './Notification';
import Profile from './Profile';
import Search from './Search';

import { DRAWER_WIDTH } from 'config';
import { handlerDrawerOpen, useGetMenuMaster } from 'states/menu';

// assets
import logo from 'assets/images/barcodeip-logo.png';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem, CssBaseline, GlobalStyles } from '@mui/material';
import { KeyboardArrowDown, Person } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyLogoutQuery } from '../../../features/slice/auth/authApi';
import { logout, setCredentials } from '../../../features/slice/auth/authSlice';
import { persistor } from '../../../app/store';

// AppBar props, including styles that vary based on drawer state and screen size
const appBar = { position: 'fixed', sx: { width: 1, zIndex: { xs: 1100, lg: 1201 } } };

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

export default function Header() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  // State for User Dropdown Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [Logout] = useLazyLogoutQuery();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //     const handleLogout = async () => {
  //      await Logout();
  //     dispatch(logout());
  // };

  const handleLogout = async () => {
    try {
      // 1. Call your API logout endpoint
      await axios.get('/api/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
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

  // Common header content
  const mainHeader = (
    <AppBar sx={{ backgroundColor: '#fffafa' }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px !important' }}>
        {/* Left Side: Logo & Nav Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', cursor: 'pointer' }} onClick={() => navigate(`/`)}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#444' }}>
              barcode
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#E94E34' }}>
              IP
            </Typography>
            <Box component="span" sx={{ width: 5, height: 5, bgcolor: '#E94E34', borderRadius: '50%', ml: 0.5, mb: 1 }} />
          </Box>

          {/* Navigation Links (Hidden on small mobile) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {/* <Button color="inherit" sx={{ fontSize: '0.95rem', color: '#555' }} onClick={() => navigate(`/profile`)}>
              Profile
            </Button> */}
            {/* <Button color="inherit" sx={{ fontSize: '0.95rem', color: '#555' }} onClick={() => navigate(`/recent-search`)}>
              Recent Searches
            </Button> */}
            <Button color="inherit" sx={{ fontSize: '0.95rem', color: '#555' }} onClick={() => navigate(`/project`)}>
              My Projects
            </Button>
          </Box>
        </Box>

        {/* Right Side: User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={handleMenuClick} endIcon={<KeyboardArrowDown />} >
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#FFDbd6', color: '#E94E34', mr: 1 , }}>
              <Person fontSize="small" />
            </Avatar>

            {/* 3. Make the text dynamic */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                display: { xs: 'none', sm: 'block' },
                textTransform: 'capitalize',
                // Prevent layout breaking for massive emails
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {user?.email ? user.email.split('@')[0].replace(/[._]/g, ' ') : 'Guest'}
            </Typography>
          </Button>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1,
                // This logic ensures the menu is at least as wide as the button
                minWidth: anchorEl ? anchorEl.clientWidth : 0,
                borderRadius: '5px',
                justifyItems:'center'
              }
            }}
          >
            {/* <MenuItem onClick={handleMenuClose}>Settings</MenuItem> */}
            {/* <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate(`/recent-search`);
              }}
              sx={{ display: { xs: 'flex', md: 'none' }, gap: 2 }}
            >
              Recent Search
            </MenuItem> */}
            <MenuItem
              onClick={() => {
                handleMenuClose();
                // Pass the user object as 'state'
                navigate(`/profile`, { state: { userData: user } });
              }}
              
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate(`/project`);
              }}
              sx={{ display: { xs: 'flex', md: 'none' }, gap: 2  }}
            >
              My Project
            </MenuItem>
            <MenuItem onClick={() => handleLogout()} sx={{ color: 'primary.main' ,  }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );

  return <AppBar {...appBar}>{mainHeader}</AppBar>;
}
