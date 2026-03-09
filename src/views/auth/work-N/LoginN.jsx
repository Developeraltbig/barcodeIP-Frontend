import React, { useState } from 'react';
import {
  Grid, Box, Typography, TextField, Button, Checkbox,
  FormControlLabel, Link, InputAdornment, IconButton,
  CssBaseline, GlobalStyles, Alert, CircularProgress,
  CardMedia, Fade
} from '@mui/material';
import { Visibility, VisibilityOff, AutoAwesomeOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLoginMutation } from '../../../features/slice/auth/authApi';
import { setCredentials } from '../../../features/slice/auth/authSlice';
import { toast } from 'react-toastify';
import FullPageLoader from '../../../components/FullPageLoader';
import LeftSideImageSection from './LeftSideImageSection';
import Logo from 'assets/images/barcodeip-logo.png';
import ForgotPassword from './ForgotPassword';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#E94E34', contrastText: '#fff' },
    background: { default: '#FDFDFD', paper: '#ffffff' },
    text: { primary: '#111827', secondary: '#6B7280' }
  },
  typography: { 
    fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.02em' }
  },
  components: {
    MuiButton: { 
      styleOverrides: { 
        root: { 
          borderRadius: '10px', textTransform: 'none', fontWeight: 600, 
          padding: '12px 0', transition: 'all 0.2s ease-in-out',
          boxShadow: 'none', '&:hover': { boxShadow: '0 4px 12px rgba(233, 78, 52, 0.15)' }
        } 
      } 
    },
    MuiOutlinedInput: { 
      styleOverrides: { 
        root: { 
          borderRadius: '10px',
          backgroundColor: '#F9FAFB',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E94E34', borderWidth: '1px' }
        } 
      } 
    }
  }
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error: apiError }] = useLoginMutation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [view, setView] = useState('login');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setValidationError('Please enter both email and password.');
      return;
    }
    try {
      const userData = await login({ email: formData.email, password: formData.password }).unwrap();
      dispatch(setCredentials({...userData.data}));
      localStorage.setItem("rememberMe", rememberMe); 
      toast.success('Successfully logged in!'); 
      navigate('/'); 
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (apiError) {
      if ('data' in apiError) return apiError.data?.message || 'Invalid credentials.';
      return 'User not Register';
    }
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ 
        'html, body, #root': { width: '100%', height: '100%', margin: 0, padding: 0, backgroundColor: '#FDFDFD' } 
      }} />

      {isLoading && <FullPageLoader colors={['#E94E34', '#E94E34', '#E94E34']} label="Connecting to Dashboard..." />}

      <div className="container-fluid p-0 overflow-hidden">
        <div className="row g-0 min-vh-100">
          
          <LeftSideImageSection />

          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-white p-4">
            <Fade in={true} timeout={600}>
              <Box sx={{ width: '100%', maxWidth: '440px' }}>
                
                {view === 'login' ? (
                  <>
                    <Box className="mb-5">
                      <img src={Logo} alt="logo" style={{ width: '150px' }} />
                    </Box>

                    <Box className="mb-4">
                      <Typography variant="h4" color="text.primary" sx={{ mb: 1 }}>
                        Sign in 
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Welcome back! Please enter your details.
                      </Typography>
                    </Box>

                    {getErrorMessage() && (
                      <Alert severity="error" variant="outlined" sx={{ mb: 3, borderRadius: '10px', border: '1px solid #fee2e2', bgcolor: '#fef2f2' }}>
                        {getErrorMessage()}
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                      <Box className="mb-4">
                        <Typography variant="caption" sx={{ color: '#374151', fontWeight: 600, mb: 1, display: 'block' }}>
                          Email
                        </Typography>
                        <TextField
                          fullWidth
                          name="email"
                          placeholder="name@company.com"
                          variant="outlined"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Box>

                      <Box className="mb-3">
                        <Typography variant="caption" sx={{ color: '#374151', fontWeight: 600, mb: 1, display: 'block' }}>
                          Password
                        </Typography>
                        <TextField
                          fullWidth
                          name="password"
                          placeholder="••••••••"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                  {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Box>

                      <Box className="d-flex justify-content-between align-items-center mb-4">
                        <FormControlLabel
                          control={<Checkbox size="small" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{ '&.Mui-checked': { color: '#E94E34' } }} />}
                          label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>Remember me</Typography>}
                        />
                        <Link
                          component="button"
                          type="button"
                          onClick={() => setView('forgot')}
                          variant="body2"
                          sx={{ color: '#E94E34', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}
                        >
                          Forgot password?
                        </Link>
                      </Box>

                      <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        disabled={isLoading}
                        sx={{ py: 1.8, fontSize: '0.95rem' }}
                      >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                      </Button>

                      <Box className="text-center mt-4">
                        <Typography variant="body2" color="text.secondary">
                          Don't have an account?{' '}
                          <Link component={RouterLink} to="/pages/auth/register" sx={{ color: '#E94E34', textDecoration: 'none', fontWeight: 700 }}>
                            Sign up
                          </Link>
                        </Typography>
                      </Box>
                    </form>
                  </>
                ) : (
                  <ForgotPassword onBack={() => setView('login')} />
                )}
              </Box>
            </Fade>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;