import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { 
  ClickAwayListener, Fade, IconButton, List, ListItemButton, 
  ListItemIcon, ListItemText, Popper, Box, Typography, Divider 
} from '@mui/material';

// assets & components
import MainCard from 'components/cards/MainCard';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import LockOpenTwoTone from '@mui/icons-material/LockOpenTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

import { useLazyLogoutQuery } from '../../../features/slice/auth/authApi';
import { logout as logoutAction } from '../../../features/slice/auth/authSlice'; // Import your actual logout action

const menuItems = [
  { icon: <SettingsTwoToneIcon />, label: 'Settings', path: '/settings' },
  { icon: <PersonTwoToneIcon />, label: 'Profile', path: '/profile' },
  { icon: <DraftsTwoToneIcon />, label: 'My Messages', path: '/messages' },
  { icon: <LockOpenTwoTone />, label: 'Lock Screen', path: '/lock-screen' },
  { icon: <MeetingRoomTwoToneIcon />, label: 'Logout' }
];

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [triggerLogout] = useLazyLogoutQuery();

  // 1. Better approach: Pull from Redux as a fallback if location.state is lost on refresh
  const reduxUser = useSelector((state) => state.auth.user);
  const user = location.state?.userData || reduxUser;

  // 2. Fix Logout logic
  const handleLogout = async () => {
    try {
      await triggerLogout().unwrap();
      dispatch(logoutAction()); // Call the correct reducer action
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleMenuItemClick = (index, item) => {
    setSelectedIndex(index);
    setOpen(false); // Close popper on click
    
    if (item.label === 'Logout') {
      handleLogout();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => setOpen(false);

  // If user data is missing (e.g. direct URL access without state)
  if (!user) {
    return (
      <Typography variant="body2" sx={{ p: 2, color: 'error.main' }}>
        Session Expired. Please login.
      </Typography>
    );
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <IconButton size="small" onClick={handleClick}>
          <AccountCircleTwoToneIcon sx={{ fontSize: 24, color: 'grey.700' }} />
        </IconButton>

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end" // Usually profile menus look better aligned to the end
          transition
          disablePortal
          modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}
          sx={{ zIndex: 1202 }} // Ensure it stays above other elements
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={200}>
              <MainCard content={false} sx={{ width: 250, boxShadow: 3 }}>
                {/* 3. Add a User Header inside the Popper */}
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {user.name || 'User'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {user.email}
                  </Typography>
                </Box>
                <Divider />
                
                <List component="nav">
                  {menuItems.map((item, index) => (
                    <ListItemButton 
                      key={item.label} 
                      selected={selectedIndex === index} 
                      onClick={() => handleMenuItemClick(index, item)}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  ))}
                </List>
              </MainCard>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}