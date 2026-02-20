import React, { useState } from 'react';
import {
  Grid, Box, Typography, TextField, Button, Checkbox,
  FormControlLabel, Link, InputAdornment, IconButton,
  CssBaseline, GlobalStyles, Alert, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Circle } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLoginMutation } from '../../../features/slice/auth/authApi';
import { setCredentials } from '../../../features/slice/auth/authSlice';
import { toast } from 'react-toastify';
import FullPageLoader from '../../../components/FullPageLoader';

const theme = createTheme({
  palette: {
    primary: { main: '#E94E34', contrastText: '#fff' },
    text: { primary: '#1A1A1A', secondary: '#666666' },
    background: { default: '#F9FAFB' }
  },
  typography: { 
    fontFamily: '"Inter", sans-serif',
    h3: { fontWeight: 800, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' }
  },
  components: {
    MuiButton: { 
      styleOverrides: { 
        root: { 
          borderRadius: '8px', textTransform: 'none', fontWeight: 600, 
          padding: '12px 0', boxShadow: 'none',
          '&:hover': { boxShadow: '0px 4px 12px rgba(233, 78, 52, 0.2)', bgcolor: '#d8432c' }
        } 
      } 
    },
    MuiOutlinedInput: { 
      styleOverrides: { 
        root: { borderRadius: '8px', '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#E94E34' } } 
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    try {
      const userData = await login({ email: formData.email, password: formData.password }).unwrap();
      dispatch(setCredentials(userData.data)); 
      toast.success('Successfully logged in!'); 
      navigate('/'); 
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (apiError) {
      if ('data' in apiError) return apiError.data?.message || 'Invalid credentials.';
      if ('error' in apiError) return apiError.error;
    }
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ 'html, body, #root': { width: '100%', height: '100%', margin: 0, padding: 0 } }} />

      {(isLoading || isSubmitting) && (
        <FullPageLoader colors={["#e06a50", "#33FF57", "#3357FF"]} label="Starting Dashboard..." />
      )}

      {/* Bootstrap 'container-fluid' for full width and 'row' for flex grid */}
      <div className="container-fluid p-0 overflow-hidden">
        <div className="row g-0 min-vh-100">
          
          {/* LEFT SIDE - Hidden on mobile, visible on small+ */}
          <div className="col-sm-5 col-md-5 d-none d-md-flex flex-column justify-content-center p-5 position-relative"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white'
            }}>
            <div className="position-relative z-2" style={{ maxWidth: '500px' }}>
              <div className="mb-4 d-inline-block p-3 rounded-4 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}>
                <Circle sx={{ color: '#E94E34', fontSize: 48 }} />
              </div>
              <h1 className="display-4 fw-bold mb-3">Experience smarter IP management.</h1>
              <p className="fs-5 fw-light opacity-75">Secure, fast, and reliable access to your data with barcodeIP.</p>
            </div>
          </div>

          {/* RIGHT SIDE - Full width on mobile */}
          <div className="col-12 col-md-7  d-flex flex-column justify-content-center   bg-light p-4">
            
            {/* Form Card with Bootstrap Shadow and Padding */}
            <div className="card border-0  p-4 p-md-5 w-100 rounded-5" style={{ maxWidth: '520px' }}>
              
              <div className=" mb-5">
                <small className="text-muted text-uppercase fw-semibold">Welcome to</small>
                <div className="d-flex mt-1">
                  <h2 className="fw-bolder mb-0" style={{ color: '#222' }}>barcode</h2>
                  <h2 className="fw-bolder mb-0 text-danger">IP</h2>
                </div>
              </div>

              <h3 className="fw-bold mb-1">Log in</h3>
              <p className="text-muted mb-4 small">Enter your credentials to access your account.</p>

              {getErrorMessage() && (
                <Alert severity="error" className="mb-4 rounded-3 animate__animated animate__shakeX">
                  {getErrorMessage()}
                </Alert>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted text-uppercase mb-2">Email Address</label>
                  <TextField 
                    required fullWidth name="email" 
                    placeholder="name@company.com" 
                    variant="outlined"
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase mb-2">Password</label>
                  <TextField
                    required fullWidth name="password" placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
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
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<span className="small text-muted">Remember for 30 days</span>}
                  />
                  <Link component={RouterLink} to="/pages/auth/forgot-password" variant="body2" className="fw-bold text-decoration-none">
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained" 
                  disabled={isLoading} 
                  className="py-3 fs-6"
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In to Dashboard'}
                </Button>

                <div className="text-center mt-4">
                  <p className="small text-muted">
                    Don't have an account?{' '}
                    <Link component={RouterLink} to="/pages/auth/register" className="fw-bold text-decoration-none">
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;