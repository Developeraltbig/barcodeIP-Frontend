import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress, Link } from '@mui/material';
import { useForgotPasswordMutation } from '../../../features/slice/auth/authApi';
import { toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading, error: apiError }] = useForgotPasswordMutation();
  const [isSent, setIsSent] = useState(false);

  // Improved Error Handling Logic
  const getErrorMessage = () => {
    if (!apiError) return null;

    // 1. Check if it's a 500 or generic server error
    if (apiError.status === 500 || apiError.status === 'FETCH_ERROR') {
      return "This email is not registered with us, or the server is unavailable.";
    }

    // 2. Check for specific backend message (e.g., 404 or 400)
    if ('data' in apiError) {
      return apiError.data?.message || "Something went wrong. Please try again.";
    }

    return "An unexpected error occurred.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Client-side check
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Reset link sent!");
      setIsSent(true);
    } catch (err) {
      // We don't need to set state here because RTK Query 
      // updates the 'apiError' object automatically.
      console.error("Backend Error Object:", err);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center p-3">
      <Box 
        className="card border-0 shadow-lg p-4 p-md-5 rounded-5 w-100"
        sx={{ maxWidth: '500px', bgcolor: '#fff' }}
      >
        <div className="text-center mb-4">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Forgot Password?</Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your email to receive a password reset link.
          </Typography>
        </div>

        {/* This will show your custom "not registered" message even on 500 errors */}
        {getErrorMessage() && (
          <Alert severity="error" variant="outlined" className="mb-4 rounded-3">
            {getErrorMessage()}
          </Alert>
        )}

        {isSent ? (
          <div className="text-center">
            <Alert severity="success" className="mb-4">
              Reset link send to <b>{email}</b>, you will receive an email shortly.
            </Alert>
            <Button component={RouterLink} to="/pages/auth/login" fullWidth variant="outlined" className="py-2">
              Back to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase mb-2">Email Address</label>
              <TextField
                fullWidth
                placeholder="name@company.com"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!apiError}
              />
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              className="py-3 fw-bold"
              sx={{ height: '52px' }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
            </Button>

            <div className="text-center mt-4">
              <Link 
                component={RouterLink} 
                to="/pages/auth/login" 
                className="text-decoration-none fw-bold small"
                sx={{ color: 'primary.main' }}
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        )}
      </Box>
    </div>
  );
};

export default ForgotPassword;