import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem, CssBaseline, GlobalStyles } from '@mui/material';
import { KeyboardArrowDown, Person } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 1. Theme Setup (Consistent with Login Page)
const theme = createTheme({
  palette: {
    primary: {
      main: '#E94E34' // Brand Red
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666'
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5' // Light grey for header
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#EAEAEA', // Specific light grey from screenshot
          color: '#333',
          boxShadow: 'none' // Flat design
        }
      }
    }
  }
});

const HeaderN = () => {
  // State for User Dropdown Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '#root': { width: '100%', height: '100%' },
          body: { margin: 0, width: '100%', height: '100%' }
        }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* --- HEADER SECTION --- */}
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px !important' }}>
            {/* Left Side: Logo & Nav Links */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', cursor: 'pointer' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#444' }}>
                  barcode
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                  IP
                </Typography>
                <Box component="span" sx={{ width: 5, height: 5, bgcolor: 'primary.main', borderRadius: '50%', ml: 0.5, mb: 1 }} />
              </Box>

              {/* Navigation Links (Hidden on small mobile) */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                <Button color="inherit" sx={{ fontSize: '0.95rem', color: '#555' }}>
                  Profile
                </Button>
                <Button color="inherit" sx={{ fontSize: '0.95rem', color: '#555' }}>
                  Recent Searches
                </Button>
              </Box>
            </Box>

            {/* Right Side: User Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={handleMenuClick}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  color: '#333',
                  '&:hover': { backgroundColor: 'transparent' }
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: '#FFDbd6', // Light pink/red bg
                    color: '#E94E34', // Brand red icon
                    mr: 1
                  }}
                >
                  <Person fontSize="small" />
                </Avatar>
                <Typography variant="body1" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                  Tester
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
                  sx: { mt: 1, minWidth: 150 }
                }}
              >
                <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: 'primary.main' }}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* --- HERO SECTION --- */}
        <Box
          sx={{
            flexGrow: 1,
            width: '100%',
            // Using a professional abstract tech image
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            px: 2
          }}
        >
          {/* Dark Overlay for Text Readability */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)', // 50% opacity black overlay
              zIndex: 1
            }}
          />

          {/* Hero Text Content */}
          <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2.5rem', md: '4rem' } // Responsive font size
              }}
            >
              Hi, Landing Page
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                opacity: 0.9,
                mb: 4,
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}
            >
              Browse & Discover - All in one place!
            </Typography>

            {/* Optional Call to Action Button */}
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: '8px',
                '&:hover': { bgcolor: '#c93e26' }
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HeaderN;
