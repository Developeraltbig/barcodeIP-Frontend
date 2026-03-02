import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../../features/slice/auth/authApi';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token'); // Gets token from URL
  
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (passwords.password !== passwords.confirmPassword) {
  //     return toast.error("Passwords do not match");
  //   }

  //   try {
  //     await resetPassword({ 
  //       token, 
  //       newPassword: passwords.password,
  //       confirmPassword: passwords.confirmPassword 
  //     }).unwrap();
      
  //     toast.success("Password reset successfully!");
  //     navigate('/pages/auth/login');
  //   } catch (err) {
  //     toast.error(err?.data?.message || "Link expired or invalid");
  //   }
  // };

console.log("hello")
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Client-side Validation
  if (!token) {
    return toast.error("Reset token is missing. Please click the link from your email again.");
  }

  if (passwords.password !== passwords.confirmPassword) {
    return toast.error("Passwords do not match");
  }

  if (passwords.password.length < 6) {
    return toast.error("Password must be at least 6 characters");
  }

 try {
    // We pass ONE object containing all three keys
    await resetPassword({ 
      token: token, 
      newPassword: passwords.password, 
      confirmPassword: passwords.confirmPassword 
    }).unwrap();

    
    
    toast.success("Password reset successfully!");
    navigate('/pages/auth/login');
  } catch (err) {
    toast.error(err?.data?.message || "Reset failed");
  }

   console.log("token--", token)
    console.log("pass--", newPassword);
    console.log("pass--", confirmPassword)
};
  


  return (
    <Box sx={{ maxWidth: '450px', mx: 'auto', mt: 10, p: 4, bgcolor: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Set New Password</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Please enter a strong password you haven't used before.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>New Password</Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPasswords({...passwords, password: e.target.value})}
          sx={{ mb: 3 }}
        />

        <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>Confirm Password</Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{ height: '48px', bgcolor: '#E94E34' }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;