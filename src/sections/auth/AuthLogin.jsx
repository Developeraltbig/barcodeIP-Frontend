// import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// third party
import { useForm } from 'react-hook-form';

// project imports
import { emailSchema, passwordSchema } from 'utils/validationSchema';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useLoginMutation } from 'features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setAuth } from 'features/auth/authSlice';

// ==============================|| AUTH - LOGIN ||============================== //

export default function AuthLogin({ inputSx }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  // ✅ FIX: extract handleSubmit
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log('res.data.user', res.data.user);
      dispatch(
        setAuth({
          user: res.data.user,
          token: res.data.accessToken // optional if cookie-based
        })
      );

      navigate('/admin_user', { replace: true }); // dashboard
    } catch (err) {
      console.error(err?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 3 }}>
        <Box>
          <TextField
            variant="outlined"
            {...register('email', emailSchema)}
            placeholder="example@materially.com"
            fullWidth
            label="Email Address"
            error={Boolean(errors.email)}
            sx={inputSx}
          />
          {errors.email?.message && <FormHelperText error>{errors.email.message}</FormHelperText>}
        </Box>

        <Box>
          <FormControl fullWidth error={Boolean(errors.password)}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              {...register('password', passwordSchema)}
              type={isPasswordVisible ? 'text' : 'password'}
              label="Password"
              placeholder="Enter your password"
              endAdornment={
                <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                  {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              }
              sx={inputSx}
            />
          </FormControl>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 0.5 }}>
            <FormControlLabel control={<Checkbox {...register('rememberMe')} size="small" color="primary" />} label="Remember me" />

            <Link component={RouterLink} underline="hover" variant="subtitle2" to="#">
              Forgot Password?
            </Link>
          </Stack>
        </Box>
      </Stack>

      <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ mt: { xs: 2, sm: 3 } }}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
}
