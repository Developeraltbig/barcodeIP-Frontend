// material-ui
// import AppBar from '@mui/material/AppBar';
import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
// import Toolbar from '@mui/material/Toolbar';
// import Box from '@mui/material/Box';
import React, { useState, useCallback } from 'react';

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
import Topbar from "../../Topbar";

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
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("workerProgress_")) {
          // console.log('start with', key)
          localStorage.removeItem(key);
        }
      });
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

  const handleProfileClick = useCallback(() => {
    navigate("/project/profile");
  }, [navigate]);


  // Common header content
  return (
    <Topbar
      userName="Developeraltbig"
      onProfileClick={handleProfileClick}
      onLogoutConfirm={handleLogout}
    />
  );

}
