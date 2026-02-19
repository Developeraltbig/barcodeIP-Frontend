import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  CssBaseline,
  GlobalStyles,
  Alert,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Circle } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link as RouterLink } from 'react-router-dom'; // Assumes you use react-router
import { useRegisterMutation } from './path/to/authApi'; // UPDATE THIS PATH

// Reuse your theme
const theme = createTheme({
  palette: {
    primary: { main: '#E94E34' },
    text: { primary: '#1A1A1A', secondary: '#666666' }
  },
  typography: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: '6px', textTransform: 'none', fontSize: '1rem', fontWeight: 600, padding: '12px 0' }
      }
    },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: '6px' } } }
  }
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [validationError, setValidationError] = useState('');

  // API Hook
  const [register, { isLoading, error: apiError }] = useRegisterMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user types
    if (validationError) setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Basic Client-side Validation
    if (!agreedToTerms) {
      setValidationError('You must agree to the Privacy Policy and Terms.');
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setValidationError('Please fill in all fields.');
      return;
    }

    try {
      // Execute the mutation
      // The payload structure depends on what your backend expects. 
      // Adjusting object keys to match standard conventions.
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      };

      const result = await register(payload).unwrap();
      console.log('Registration success:', result);
      
      // Navigate to login on success
      navigate('/login'); 
    } catch (err) {
      console.error('Registration failed:', err);
      // RTK Query error handling is done via the 'apiError' object below or the catch block
    }
  };

  // Extract error message from API response safely
  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (apiError) {
      if ('data' in apiError) return apiError.data?.message || JSON.stringify(apiError.data);
      return 'An unexpected error occurred.';
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
        {/* LEFT SIDE - IMAGE */}
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
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
          <Box
            sx={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 2, color: '#fff', maxWidth: '480px' }}>
            <Circle sx={{ color: '#E94E34', fontSize: 64, mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Start your journey
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, lineHeight: 1.6 }}>
              Join thousands of users managing their IP efficiently. Create your account today.
            </Typography>
          </Box>
        </Grid>

        {/* RIGHT SIDE - FORM */}
        <Grid
          item xs={12} sm={8} md={6}
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#fff' }}
        >
          <Box
            sx={{
              width: '100%', maxWidth: '500px', px: { xs: 3, sm: 6 },
              display: 'flex', flexDirection: 'column'
            }}
          >
            {/* Logo Header */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#222' }}>barcode</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>IP</Typography>
              <Box component="span" sx={{ width: 6, height: 6, bgcolor: 'primary.main', borderRadius: '50%', ml: 0.5 }} />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#111' }}>Sign up</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Let's get you all set up so you can verify your personal account.
            </Typography>

            {/* Error Alert */}
            {getErrorMessage() && (
              <Alert severity="error" sx={{ mb: 3 }}>{getErrorMessage()}</Alert>
            )}

            <Box component="form" noValidate onSubmit={handleSubmit}>
              
              {/* Name Fields Row */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>First Name</Typography>
                  <TextField
                    required fullWidth id="firstName" placeholder="First Name" name="firstName"
                    value={formData.firstName} onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Last Name</Typography>
                  <TextField
                    required fullWidth id="lastName" placeholder="Last Name" name="lastName"
                    value={formData.lastName} onChange={handleChange}
                  />
                </Grid>
              </Grid>

              {/* Email */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Email</Typography>
              <TextField
                required fullWidth id="email" placeholder="Enter Email" name="email" autoComplete="email"
                sx={{ mb: 3 }} value={formData.email} onChange={handleChange}
              />

              {/* Password */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Password</Typography>
              <TextField
                required fullWidth name="password" placeholder="Create a password"
                type={showPassword ? 'text' : 'password'}
                id="password" autoComplete="new-password"
                sx={{ mb: 3 }}
                value={formData.password} onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {/* Terms Checkbox */}
              <FormControlLabel
                sx={{ mb: 3, alignItems: 'flex-start', mx: 0 }}
                control={
                  <Checkbox 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    sx={{ color: '#D0D5DD', p: 0, mr: 1, mt: 0.3, '&.Mui-checked': { color: 'primary.main' } }} 
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.3 }}>
                    I Agree with <Link href="#" sx={{ fontWeight: 600, textDecoration: 'none', color: 'primary.main' }}>Privacy Policy</Link> and <Link href="#" sx={{ fontWeight: 600, textDecoration: 'none', color: 'primary.main' }}>Terms & Conditions</Link>
                  </Typography>
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{ mb: 4, bgcolor: 'primary.main', '&:hover': { bgcolor: '#c93e26' }, height: '48px' }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" sx={{ fontWeight: 700, textDecoration: 'none', color: 'primary.main' }}>
                    Log in
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

export default RegisterPage;