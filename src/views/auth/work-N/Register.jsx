import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  CssBaseline,
  GlobalStyles,
  Alert,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useRegisterMutation } from '../../../features/slice/auth/authApi';

// assets
import Logo from 'assets/images/login-background.png';

const theme = createTheme({
  palette: {
    primary: { main: '#d94231' },
    text: {
      primary: '#080808',
      secondary: '#6f6f6f'
    }
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif'
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          height: '64px',
          backgroundColor: '#fff',
          fontSize: '16px',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.06)',

          '& fieldset': {
            borderColor: '#d7d7d7'
          },

          '&:hover fieldset': {
            borderColor: '#bdbdbd'
          },

          '&.Mui-focused fieldset': {
            borderColor: '#d94231',
            borderWidth: '1.5px'
          }
        },

        input: {
          padding: '18px 16px'
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          fontSize: '13px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '18px',
          height: '64px',
          boxShadow: 'none'
        }
      }
    }
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const REGEX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  };

  const validate = () => {
    const tempErrors = {};

    if (!REGEX.email.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!REGEX.password.test(formData.password)) {
      tempErrors.password = 'Password must be 8+ chars with 1 uppercase, 1 lowercase, and 1 number.';
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
    }

    setValidationErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await register({
        email: formData.email,
        password: formData.password
      }).unwrap();

      toast.success('Successfully Registered!');
      navigate('/auth/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const getApiErrorMessage = () => {
    if (!apiError) return null;
    if ('data' in apiError) return apiError.data?.message || JSON.stringify(apiError.data);
    if ('error' in apiError) return apiError.error;
    return 'An unexpected error occurred.';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <GlobalStyles
        styles={{
          'html, body, #root': {
            width: '100%',
            minHeight: '100%',
            margin: 0,
            padding: 0,
            backgroundColor: '#ffffff'
          },

          '*': {
            boxSizing: 'border-box'
          }
        }}
      />

      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          backgroundColor: '#ffffff',
          p: { xs: 0, md: '28px 34px' }
        }}
      >
        {/* LEFT PANEL */}
        <Box
          sx={{
            width: '56%',
            minHeight: 'calc(100vh - 56px)',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '20px',
            overflow: 'hidden',
            p: { md: '58px 92px 82px' },
            background: `url(${Logo})`,
            position: 'relative'
          }}
        >
          {/* <Box>
            <Box
              component="img"
              src={Logo}
              alt="logo"
              sx={{
                width: '108px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0)',
                display: 'block'
              }}
            />
          </Box> */}

          {/* <Box sx={{ maxWidth: 600 }}>
            <Typography
              sx={{
                fontSize: '32px',
                fontWeight: 400,
                color: '#1d3340',
                mb: 3,
                lineHeight: 1.2
              }}
            >
              You can easily
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: { md: '46px', lg: '52px' },
                fontWeight: 800,
                color: '#000000',
                lineHeight: 1.18,
                letterSpacing: '-1.5px'
              }}
            >
              Get access your personal
              <br />
              hub for clarity and
              <br />
              productivity.
            </Typography>
          </Box> */}
        </Box>

        {/* RIGHT PANEL */}
        <Box
          sx={{
            flex: 1,
            minHeight: { xs: '100vh', md: 'calc(100vh - 56px)' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 3, sm: 5, md: 8 },
            py: { xs: 5, md: 3 }
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '590px'
            }}
          >
            {/* <Box
              component="img"
              src={Logo}
              alt="logo"
              sx={{
                width: '82px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0)',
                display: 'block',
                mb: 2
              }}
            /> */}

            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '49px', sm: '49px' },
                color: '#050505',
                lineHeight: 1,
                fontWeight: 600,
                letterSpacing: '-1.6px',
                mb: 1.5,
                fontFamily: 'Figtree',
              }}
            >
              Create an account
            </Typography>

            <Typography
              sx={{
                color: '#666666',
                fontSize: '18.6px',
                lineHeight: 1.25,
                maxWidth: '570px',
                mb: 6,
                fontWeight: "400",
                fontFamily: 'Figtree',
              }}
            >
              Enter your invention once. Oolto helps organize the idea, search relevant
              references, compare related products, and prepare reports and draft-ready
              sections.
            </Typography>

            {getApiErrorMessage() && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
                {getApiErrorMessage()}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Box sx={{ mb: 4 }}>
                <Typography
                  component="label"
                  sx={{
                    display: 'block',
                    fontSize: '22px',
                    fontWeight: 500,
                    color: '#3E3E3E',
                    mb: 1.3,
                    fontFamily: "Figtree"
                  }}
                >
                  Your email
                </Typography>

                <TextField
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                />
              </Box>

              <Box sx={{ mb: 3.5 }}>
                <Typography
                  component="label"
                  sx={{
                    display: 'block',
                    fontSize: '22px',
                    fontWeight: 500,
                    color: '#3E3E3E',
                    mb: 1.3,
                    fontFamily: "Figtree"
                  }}
                >
                  Create Password
                </Typography>

                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>

              {/* Keep confirm password for validation but make it visually clean */}
              <Box sx={{ mb: 3.5 }}>
                <Typography
                  component="label"
                  sx={{
                    display: 'block',
                    fontSize: '22px',
                    fontWeight: 500,
                    color: '#3E3E3E',
                    mb: 1.3,
                    fontFamily: "Figtree"
                  }}
                >
                  Confirm Password
                </Typography>

                <TextField
                  fullWidth
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!validationErrors.confirmPassword}
                  helperText={validationErrors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 0.5,
                  background: 'linear-gradient(to right, #DF4833, #79271C);',
                  color: '#ffffff',

                  '&:hover': {
                    background: 'linear-gradient(90deg, #cf392b 0%, #742018 100%)',
                    boxShadow: 'none'
                  }
                }}
              >
                {isLoading ? <CircularProgress size={25} color="inherit" /> : 'Create account'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography sx={{ fontSize: '15px', color: '#777777' }}>
                  Already have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/auth/login"
                    underline="none"
                    sx={{
                      color: '#d94231',
                      fontWeight: 700
                    }}
                  >
                    Log In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Register;