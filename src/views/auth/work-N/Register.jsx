import React, { useState } from 'react';
import {
  Grid, Box, Typography, TextField, Button, Link, 
  InputAdornment, IconButton, CssBaseline, GlobalStyles, 
  Alert, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Circle } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useRegisterMutation } from '../../../features/slice/auth/authApi';

const theme = createTheme({
  palette: {
    primary: { main: '#E94E34' },
    text: { primary: '#1A1A1A', secondary: '#666666' }
  },
  typography: { fontFamily: '"Inter", sans-serif' },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: '6px', textTransform: 'none', fontWeight: 600, padding: '12px 0' } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: '6px' } } }
  }
});

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, error: apiError }] = useRegisterMutation();

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // UI/Error State
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Regex Patterns
  const REGEX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ // 8+ chars, 1 Upper, 1 Lower, 1 Num
  };

  const validate = () => {
    let tempErrors = {};
    
    if (!REGEX.email.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!REGEX.password.test(formData.password)) {
      tempErrors.password = "Password must be 8+ characters with an uppercase letter and a number.";
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Send only email and password to the API
      await register({ 
        email: formData.email, 
        password: formData.password 
      }).unwrap();
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const getApiErrorMessage = () => {
    if (apiError && 'data' in apiError) return apiError.data?.message || "Registration failed.";
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ '#root': { width: '100vw', height: '100vh' } }} />

      <Grid container sx={{ height: '100vh' }}>
        {/* LEFT PANEL */}
        <Grid item xs={false} sm={4} md={6} sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          display: { xs: 'none', sm: 'flex' }, p: 8, position: 'relative', alignItems: 'center'
        }}>
          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', zIndex: 1 }} />
          <Box sx={{ position: 'relative', zIndex: 2, color: '#fff' }}>
            <Circle sx={{ color: 'primary.main', fontSize: 64, mb: 2 }} />
            <Typography variant="h3" fontWeight={700}>Secure Access</Typography>
            <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>Simplify your IP management with barcodeIP.</Typography>
          </Box>
        </Grid>

        {/* RIGHT PANEL */}
        <Grid item xs={12} sm={8} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#fff' }}>
          <Box sx={{ width: '100%', maxWidth: 450, px: { xs: 3, sm: 6 } }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 4 }}>
              <Typography variant="h4" fontWeight={800}>barcode</Typography>
              <Typography variant="h4" fontWeight={800} color="primary.main">IP</Typography>
            </Box>

            <Typography variant="h4" fontWeight={700} gutterBottom>Sign up</Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>Enter your details to create an account.</Typography>

            {getApiErrorMessage() && <Alert severity="error" sx={{ mb: 3 }}>{getApiErrorMessage()}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Email</Typography>
              <TextField
                fullWidth name="email" placeholder="mail@example.com" sx={{ mb: 2 }}
                value={formData.email} onChange={handleChange}
                error={!!errors.email} helperText={errors.email}
              />

              {/* Password */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Password</Typography>
              <TextField
                fullWidth name="password" placeholder="Min. 8 characters" sx={{ mb: 2 }}
                type={showPassword ? 'text' : 'password'}
                value={formData.password} onChange={handleChange}
                error={!!errors.password} helperText={errors.password}
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

              {/* Confirm Password */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Confirm Password</Typography>
              <TextField
                fullWidth name="confirmPassword" placeholder="Repeat your password" sx={{ mb: 3 }}
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword} onChange={handleChange}
                error={!!errors.confirmPassword} helperText={errors.confirmPassword}
              />

              <Button
                type="submit" fullWidth variant="contained" disabled={isLoading}
                sx={{ mb: 3, py: 1.5 }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </Button>

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Already have an account? <Link component={RouterLink} to="page/auth/login" sx={{ fontWeight: 700, textDecoration: 'none', color: 'primary.main' }}>Log in</Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;