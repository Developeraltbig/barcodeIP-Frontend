import React, { useState } from 'react';
import {
  Grid, Box, Typography, TextField, Button, Checkbox, FormControlLabel,
  Link, InputAdornment, IconButton, CssBaseline, GlobalStyles, Alert, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Circle } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useLoginMutation } from '../../../features/slice/auth/authApi';

// Reuse theme configuration
const theme = createTheme({
  palette: {
    primary: { main: '#E94E34' },
    text: { primary: '#1A1A1A', secondary: '#666666' }
  },
  typography: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: '6px', textTransform: 'none', fontSize: '1rem', fontWeight: 600, padding: '12px 0' } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: '6px' } } }
  }
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // API Hook
  const [login, { isLoading, error: apiError }] = useLoginMutation();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Execute Mutation
      const result = await login({ email, password }).unwrap();
      
      // Usually, you save the token here if your Redux slice doesn't handle it automatically
      // localStorage.setItem('token', result.token);
      
      console.log('Login success', result);
      navigate('/'); // Redirect to dashboard
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const getErrorMessage = () => {
    if (apiError) {
      if ('data' in apiError) return apiError.data?.message || 'Invalid credentials';
      return 'Network error';
    }
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, width: '100%', height: '100%' },
          body: { margin: 0, padding: 0, width: '100%', height: '100%' },
          '#root': { width: '100%', height: '100%', maxWidth: '100% !important', margin: '0 !important', padding: '0 !important' }
        }}
      />

      <Grid container sx={{ height: '100vh', width: '100vw', m: 0 }}>
        {/* LEFT SIDE */}
        <Grid
          item xs={false} sm={4} md={6}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.grey[50],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            p: 8
          }}
        >
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }} />
          <Box sx={{ position: 'relative', zIndex: 2, color: '#fff', maxWidth: '480px' }}>
            <Circle sx={{ color: '#E94E34', fontSize: 64, mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>Grow with us</Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus nunc.
            </Typography>
          </Box>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid
          item xs={12} sm={8} md={6}
          sx={{ backgroundColor:'red', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#fff' }}
        >
          <Box sx={{ width: '100%', maxWidth: '450px', px: { xs: 3, sm: 6 }, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>Welcome to</Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#222' }}>barcode</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>IP</Typography>
              <Box component="span" sx={{ width: 6, height: 6, bgcolor: 'primary.main', borderRadius: '50%', ml: 0.5 }} />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#111' }}>Log in</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Welcome back! Please enter your details.</Typography>

            {/* Error Alert */}
            {getErrorMessage() && <Alert severity="error" sx={{ mb: 3 }}>{getErrorMessage()}</Alert>}

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Email</Typography>
              <TextField
                required fullWidth id="email" placeholder="Enter Email" name="email" autoComplete="email" sx={{ mb: 3 }}
                value={email} onChange={(e) => setEmail(e.target.value)}
              />

              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Password</Typography>
              <TextField
                required fullWidth name="password" placeholder="Enter password" type={showPassword ? 'text' : 'password'}
                id="password" autoComplete="current-password" sx={{ mb: 1 }}
                value={password} onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <FormControlLabel
                  control={<Checkbox value="remember" sx={{ color: '#D0D5DD', '&.Mui-checked': { color: 'primary.main' } }} />}
                  label={<Typography variant="body2" color="text.secondary">Remember Me</Typography>}
                />
                <Link href="#" variant="body2" sx={{ fontWeight: 600, textDecoration: 'none', color: 'primary.main' }}>Forgot password</Link>
              </Box>

              <Button
                type="submit" fullWidth variant="contained" disabled={isLoading}
                sx={{ mb: 4, bgcolor: 'primary.main', '&:hover': { bgcolor: '#c93e26' }, height: '48px' }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  New to BarcodeIP?{' '}
                  <Link component={RouterLink} to="/auth/register" sx={{ fontWeight: 700, textDecoration: 'none', color: 'primary.main' }}>
                    Create Account
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;