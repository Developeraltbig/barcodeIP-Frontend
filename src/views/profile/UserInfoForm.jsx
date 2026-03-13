import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Avatar, Badge, IconButton, Divider,
  Grid, TextField, Button, Paper, styled, CircularProgress, Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { useGetUserDetailsQuery, useUpdateImageMutation, useUpdateProfileMutation } from '../../features/slice/auth/authApi';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    '& fieldset': { borderColor: '#e0e0e0' },
    '&:hover fieldset': { borderColor: '#bdbdbd' },
    '&.Mui-focused fieldset': { borderColor: '#1976d2', borderWidth: '1px' },
  },
  '& .MuiInputBase-input': { padding: '12px 14px', color: '#333' },
});

export default function UserInfoForm() {
  const fileInputRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id || user?.id;

  const { data, isLoading, isError , refetch } = useGetUserDetailsQuery(userId, {
    skip: !userId,
  });
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [updateImage, { isLoading: isUploadingImage }] = useUpdateImageMutation();

  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    phoneNumber: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [localImagePreview, setLocalImagePreview] = useState(null); //  CHANGED: track local preview

  useEffect(() => {
    if (data?.data) {
      const u = data?.data?.userDetails || data;
      setFormData({
        first_name: u?.first_name || u?.name || '',
        email: u?.email || '',
        phoneNumber: u?.phone_number || u?.phone || '',
      });
    }
  }, [data]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleCancel = () => {
    if (data?.data) {
      const u = data?.data?.userDetails || data;
      setFormData({
        first_name: u?.first_name || u?.name || '',
        email: u?.email || '',
        phoneNumber: u?.phone_number || u?.phone || '',
      });
    }
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        first_name: formData.first_name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      }).unwrap();
      setSuccessMsg('Profile updated successfully!');
      setErrorMsg('');
    } catch (err) {
      setErrorMsg(err?.data?.message || 'Failed to update profile.');
      setSuccessMsg('');
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

const handleImageChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExtensions = '.jpg, .jpeg, .png, .webp';

  if (!allowedTypes.includes(file.type)) {
    setErrorMsg(`Invalid file type. Only ${allowedExtensions} files are allowed.`);
    e.target.value = '';
    return;
  }

  const maxSizeMB = 5;
  if (file.size > maxSizeMB * 1024 * 1024) {
    setErrorMsg(`File size too large. Maximum allowed size is ${maxSizeMB}MB.`);
    e.target.value = '';
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  setLocalImagePreview(previewUrl);

  const formPayload = new FormData();
  formPayload.append('profile_image', file);

  try {
    await updateImage(formPayload).unwrap();
    setSuccessMsg('Profile image updated!');
    setErrorMsg('');
  } catch (err) {
    console.error('Image upload error:', err);
    setLocalImagePreview(null);
    setErrorMsg(err?.data?.message || 'Failed to update image.');
  }

  e.target.value = '';
};

  const profile = data?.data || data;
  const displayName = formData.first_name || 'User';
  const displayEmail = formData.email || '';
  // CHANGED: localImagePreview takes priority → then API image → then fallback
  const avatarSrc = localImagePreview || profile?.userDetails?.profile_image || profile?.avatar || '';

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress sx={{ color: '#E94E34' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ maxWidth: 'md', margin: 'auto', p: 3 }}>
        <Alert severity="error">Failed to load user details. Please try again.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 'md', margin: 'auto', p: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#0a192f' }}>
        User's Information
      </Typography>

      <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.default', borderRadius: 1, border: '1px solid #eaeaea' }}>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <IconButton
                onClick={handleImageClick}
                disabled={isUploadingImage}
                sx={{
                  backgroundColor: '#E94E34',
                  color: 'white',
                  width: 28,
                  height: 28,
                  border: '2px solid white',
                  '&:hover': { backgroundColor: '#b22a2a' },
                }}
              >
                {isUploadingImage
                  ? <CircularProgress size={12} sx={{ color: 'white' }} />
                  : <EditIcon sx={{ fontSize: 16 }} />
                }
              </IconButton>
            }
          >
            <Avatar
              accept=".jpg,.jpeg,.png,.webp" 
              alt={displayName}
              src={avatarSrc || 'https://cdn-icons-png.flaticon.com/512/6325/6325109.png'}
              sx={{ width: 80, height: 80 }}
            />
          </Badge>

          <Box sx={{ ml: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#0a192f' }}>
              {displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              {displayEmail}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4, borderColor: '#e0e0e0' }} />

        {successMsg && <Alert severity="success" sx={{ mb: 3 }}>{successMsg}</Alert>}
        {errorMsg   && <Alert severity="error"   sx={{ mb: 3 }}>{errorMsg}</Alert>}

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" fontWeight="bold" display="block"
              sx={{ mb: 1, color: '#6b7280', letterSpacing: 0.5 }}>
              FULL NAME
            </Typography>
            <StyledTextField fullWidth variant="outlined" value={formData.first_name} onChange={handleChange('first_name')} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="caption" fontWeight="bold" display="block"
              sx={{ mb: 1, color: '#6b7280', letterSpacing: 0.5 }}>
              EMAIL ADDRESS
            </Typography>
            <StyledTextField fullWidth variant="outlined" value={formData.email} onChange={handleChange('email')} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="caption" fontWeight="bold" display="block"
              sx={{ mb: 1, color: '#6b7280', letterSpacing: 0.5 }}>
              PHONE NUMBER
            </Typography>
            <StyledTextField fullWidth variant="outlined" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={isSaving}
            sx={{
              color: '#E94E34', borderColor: '#f5c2c7', backgroundColor: '#fdf7f7',
              textTransform: 'none', fontWeight: 500, px: 3, py: 1, borderRadius: 1,
              '&:hover': { borderColor: '#e66049', backgroundColor: '#fdebeb' },
            }}
          >
            CANCEL
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSaving}
            sx={{
              backgroundColor: '#E94E34', color: 'white', textTransform: 'none',
              fontWeight: 500, px: 3, py: 1, borderRadius: 1, boxShadow: 'none',
              '&:hover': { backgroundColor: '#c44934', boxShadow: 'none' },
            }}
          >
            {isSaving ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'SAVE CHANGES'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}