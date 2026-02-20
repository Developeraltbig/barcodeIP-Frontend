import React, { useState } from 'react';
import {
  Grid, Box, Typography, TextField, Button, Link, 
  InputAdornment, IconButton, CssBaseline, GlobalStyles, 
  Alert, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Circle } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import the hook from your API slice
import { useRegisterMutation } from '../../../features/slice/auth/authApi';

const theme = createTheme({
  palette: {
    primary: { main: '#E94E34' },
    text: { primary: '#1A1A1A', secondary: '#666666' }
  },
  typography: { fontFamily: '"Inter", sans-serif' },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: '8px', textTransform: 'none', fontWeight: 600, padding: '12px 0' } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: '8px' } } }
  }
});

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, error: apiError }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const REGEX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ 
  };

  const validate = () => {
    let tempErrors = {};
    if (!REGEX.email.test(formData.email)) tempErrors.email = "Please enter a valid email address.";
    if (!REGEX.password.test(formData.password)) tempErrors.password = "Password must be 8+ chars (1 Upper, 1 Lower, 1 Num).";
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match.";
    setValidationErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) setValidationErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register({ email: formData.email, password: formData.password }).unwrap();
      toast.success('Successfully Registered!'); 
      navigate('/pages/auth/login'); 
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const getApiErrorMessage = () => {
    if (!apiError) return null;
    if ('data' in apiError) return apiError.data?.message || JSON.stringify(apiError.data);
    if ('error' in apiError) return apiError.error;
    return "An unexpected error occurred.";
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ 'html, body, #root': { width: '100%', height: '100%', margin: 0, padding: 0 } }} />

      <div className="container-fluid p-0 overflow-hidden">
        <div className="row g-0 min-vh-100">
          
          {/* LEFT PANEL - Hidden on mobile, visible on sm+ */}
          <div className="col-sm-5 col-md-5 d-none d-md-flex flex-column justify-content-center p-5 position-relative text-white"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            <div className="position-relative z-2" style={{ maxWidth: '500px' }}>
              <div className="mb-4 d-inline-block p-3 rounded-4 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}>
                <Circle sx={{ color: '#E94E34', fontSize: 48 }} />
              </div>
              <h1 className="display-4 fw-bold mb-3">Secure Access</h1>
              <p className="fs-5 fw-light opacity-75">Simplify your IP management with barcodeIP. Secure, fast, and reliable access to your data.</p>
            </div>
          </div>

          {/* RIGHT PANEL - Form */}
          <div className="col-12 col-md-7 d-flex flex-column justify-content-center bg-light p-4">
            
            {/* Card wrapper for a cleaner, modern look */}
            <div className="card border-0 p-4 p-md-5 w-100 rounded-5" style={{ maxWidth: '520px', backgroundColor: '#ffffff' }}>
              
              {/* Branding */}
              <div className="text-center mb-5">
                <div className="d-flex align-items-baseline ">
                  <h2 className="fw-bolder mb-0" style={{ color: '#222' }}>barcode</h2>
                  <h2 className="fw-bolder mb-0" style={{ color: '#E94E34' }}>IP</h2>
                </div>
              </div>

              <h3 className="fw-bold mb-1">Sign up</h3>
              <p className="text-muted mb-4 small">Enter your details to create an account.</p>

              {getApiErrorMessage() && (
                <Alert severity="error" className="mb-4 rounded-3 shadow-sm">
                  {getApiErrorMessage()}
                </Alert>
              )}

              <form onSubmit={handleSubmit} noValidate className="w-100">
                {/* Email Field */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase mb-1">Email</label>
                  <TextField
                    fullWidth name="email" placeholder="mail@example.com"
                    value={formData.email} onChange={handleChange}
                    error={!!validationErrors.email} helperText={validationErrors.email}
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase mb-1">Password</label>
                  <TextField
                    fullWidth name="password" placeholder="Min. 8 characters"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password} onChange={handleChange}
                    error={!!validationErrors.password} helperText={validationErrors.password}
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
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted text-uppercase mb-1">Confirm Password</label>
                  <TextField
                    fullWidth name="confirmPassword" placeholder="Repeat your password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword} onChange={handleChange}
                    error={!!validationErrors.confirmPassword} helperText={validationErrors.confirmPassword}
                  />
                </div>

                <Button
                  type="submit" fullWidth variant="contained" disabled={isLoading}
                  className="py-3 shadow-sm fw-bold"
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                </Button>

                <div className="text-center mt-4">
                  <p className="small text-muted">
                    Already have an account?{' '}
                    <Link 
                      component={RouterLink} 
                      to="/pages/auth/login" 
                      className="fw-bold text-decoration-none"
                      style={{ color: '#E94E34' }}
                    >
                      Log in
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

export default Register;