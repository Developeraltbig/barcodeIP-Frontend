
// import React, { useState, useEffect, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import { 
//   Box, Container, Typography, Button, Stack, Divider, 
//   ThemeProvider, CssBaseline, Paper, CircularProgress, Alert, Snackbar 
// } from '@mui/material';
// import { theme } from './theme';
// import ProfileHeader from './ProfileHeader';
// import UserInfoForm from './UserInfoForm';
// import AccountPage from '../account/AccountPage';
// import { 
//   useGetUserDetailsQuery, 
//   useUpdateImageMutation, 
//   useUpdateProfileMutation 
// } from '../../features/slice/auth/authApi';

// const UserProfile = () => {
//   // 1. Get User ID from Redux
//   const { user: reduxUser } = useSelector((state) => state.auth);
//   const userId = reduxUser?.id || reduxUser?._id;

//   // 2. API Hooks
//   const { 
//     data: apiUser, 
//     isLoading: isApiLoading, // Use isLoading instead of isFetchingUser to prevent UI flashing
//     refetch 
//   } = useGetUserDetailsQuery(userId, { skip: !userId });

//   const [updateProfile, { isLoading: isProfileUpdating }] = useUpdateProfileMutation();
//   const [updateImage, { isLoading: isImageUpdating }] = useUpdateImageMutation();
//     // const userId = reduxUser?.id || reduxUser?._id;

//     console.log("-----------api",apiUser.data.userDetails)
//     console.log("-----------new",reduxUser)
  
//   // 3. Local State
//   const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });

//   // 4. Helper Function to Safely Extract and Merge User Data
//   // This ensures that if the API response is weirdly shaped, it won't wipe out existing redux data.
//   const getMergedUserData = useCallback(() => {
//     let apiData = null;
    
//     // Safely hunt down the actual user object in the API response
//     if (apiUser) {
//       if (apiUser.userDetail) apiData = apiUser.userDetail;
//       else if (apiUser.data?.userDetail) apiData = apiUser.data.userDetail;
//       else if (apiUser.data && (apiUser.data.first_name || apiUser.data.email || apiUser.data.name)) apiData = apiUser.data;
//       else apiData = apiUser; 
//     }

//     // Merge Redux data with API data (API data overwrites Redux data only if it exists)
//     return {
//       ...reduxUser,
//       ...apiData
//     };
//   }, [apiUser, reduxUser]);

//   // 5. Sync API/Redux data to Local State on Load
//   useEffect(() => {
//     const mergedUser = getMergedUserData();

//     if (mergedUser) {
//       setFormData(prev => ({
//         // We use prev.name as a final fallback so typing isn't interrupted by background refetches
//         name: mergedUser.first_name || mergedUser.name || prev.name || '',
//         email: mergedUser.email || prev.email || '',
//         phone: mergedUser.phone_number || mergedUser.phone || prev.phone || ''
//       }));
//     }
//   }, [getMergedUserData]);

//   // 6. Input Change Handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 7. Reset Form (Cancel Button)
//   const handleReset = () => {
//     const mergedUser = getMergedUserData();
//     if (mergedUser) {
//       setFormData({
//         name: mergedUser.first_name || mergedUser.name || '',
//         email: mergedUser.email || '',
//         phone: mergedUser.phone_number || mergedUser.phone || ''
//       });
//     }
//   };

//   // 8. Save Logic
//   const handleSave = async () => {
//     try {
//       const payload = {
//         first_name: formData.name,
//         phone_number: formData.phone
//       };

//       await updateProfile(payload).unwrap();
//       await refetch(); 

//       setFeedback({ 
//         open: true, 
//         message: 'Profile updated successfully!', 
//         severity: 'success' 
//       });
//     } catch (err) {
//       setFeedback({ 
//         open: true, 
//         message: err?.data?.message || err?.message || 'Failed to update profile', 
//         severity: 'error' 
//       });
//     }
//   };

//   // 9. Image Upload Logic
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formDataToSend = new FormData();
//     formDataToSend.append('profile_image', file); 

//     try {
//       await updateImage(formDataToSend).unwrap();
//       await refetch(); 
//       setFeedback({ open: true, message: 'Profile image updated!', severity: 'success' });
//     } catch (err) {
//       setFeedback({ 
//         open: true, 
//         message: err?.data?.message || 'Failed to upload image', 
//         severity: 'error' 
//       });
//     }
//   };

//   // Only show full screen loader if we are loading the API for the first time AND we have absolutely no fallback Redux data
//   if (isApiLoading && !reduxUser) {
//     return (
//       <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Get current image safely from the merged data
//   const currentImage = getMergedUserData()?.profile_image;

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default', marginTop: '70px' }}>
//         <Container maxWidth="md">
//           <Typography variant="h5" sx={{ mb: 4, px: 1 }}>
//             User's Information
//           </Typography>

//           <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 2, border: '1px solid #dbdee2ff' }}>
            
//             <ProfileHeader
//               name={formData.name}
//               email={formData.email}
//               currentImage={currentImage} 
//               onImageChange={handleImageChange}
//               isUpdating={isImageUpdating}
//             />
//             <Divider sx={{ mb: 5 }} />

//             <UserInfoForm formData={formData} handleChange={handleChange} />

//             <Stack direction="row" spacing={2} sx={{ mt: 8 }}>
//               <Button
//                 variant="outlined"
//                 onClick={handleReset}
//                 disabled={isProfileUpdating}
//               >
//                 Cancel
//               </Button>

//               <Button 
//                 variant="contained" 
//                 disabled={isProfileUpdating} 
//                 onClick={handleSave} 
//                 sx={{ minWidth: '150px' }}
//               >
//                 {isProfileUpdating ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
//               </Button>
//             </Stack>
//           </Paper>
//         </Container>

//         <AccountPage />

//         <Snackbar 
//           open={feedback.open} 
//           autoHideDuration={4000} 
//           onClose={() => setFeedback({ ...feedback, open: false })}
//         >
//           <Alert severity={feedback.severity} variant="filled">
//             {feedback.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserProfile;








import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // 1. IMPORT useDispatch
import { 
  Box, Container, Typography, Button, Stack, Divider, 
  ThemeProvider, CssBaseline, Paper, CircularProgress, Alert, Snackbar 
} from '@mui/material';
import { theme } from './theme';
import ProfileHeader from './ProfileHeader';
import UserInfoForm from './UserInfoForm';
import AccountPage from '../account/AccountPage';
import { 
  useGetUserDetailsQuery, 
  useUpdateImageMutation, 
  useUpdateProfileMutation 
} from '../../features/slice/auth/authApi';

// 2. IMPORT YOUR REDUX ACTION (Change 'setUser' if your slice uses a different name like 'setCredentials')
import { setCredentials } from '../../features/slice/auth/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch(); // 3. INITIALIZE DISPATCH

  const { user: reduxUser } = useSelector((state) => state.auth);
  const userId = reduxUser?.id || reduxUser?._id;

  const { 
    data: apiUser, 
    isLoading: isApiLoading, 
    refetch 
  } = useGetUserDetailsQuery(userId, { skip: !userId });


  const [updateProfile, { isLoading: isProfileUpdating }] = useUpdateProfileMutation();
  const [updateImage, { isLoading: isImageUpdating }] = useUpdateImageMutation();
  
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  // Helper Function to Safely Extract and Merge User Data
  const getMergedUserData = useCallback(() => {
    let apiData = null;
    if (apiUser) {
      if (apiUser.userDetail) apiData = apiUser.userDetail;
      else if (apiUser.data?.userDetail) apiData = apiUser.data.userDetail;
      else if (apiUser.data && (apiUser.data.first_name || apiUser.data.email || apiUser.data.name)) apiData = apiUser.data;
      else apiData = apiUser; 
    }
    return { ...reduxUser, ...apiData };
  }, [apiUser, reduxUser]);

  // Sync API/Redux data to Local State on Load
  useEffect(() => {
    const mergedUser = getMergedUserData();
    if (mergedUser) {
      setFormData(prev => ({
        name: mergedUser.first_name || mergedUser.name || prev.name || '',
        email: mergedUser.email || prev.email || '',
        phone: mergedUser.phone_number || mergedUser.phone || prev.phone || ''
      }));
    }
  }, [getMergedUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    const mergedUser = getMergedUserData();
    if (mergedUser) {
      setFormData({
        name: mergedUser.first_name || mergedUser.name || '',
        email: mergedUser.email || '',
        phone: mergedUser.phone_number || mergedUser.phone || ''
      });
    }
  };

  // --- FIXED SAVE LOGIC ---
  const handleSave = async () => {
    try {
      const payload = {
        first_name: formData.name,
        phone_number: formData.phone
      };

      // 1. Update backend API
      await updateProfile(payload).unwrap();
      
      // 2. Fetch fresh data to ensure cache is clean
      await refetch(); 

      // 3. CRITICAL: UPDATE REDUX STATE! 
      // This immediately changes `state.auth.user` globally so your UI updates instantly!
      // dispatch(setUser({
      //   ...reduxUser,
      //   first_name: payload.first_name,
      //   phone_number: payload.phone_number
      // }));

      dispatch(setCredentials({ ...reduxUser, first_name: payload.first_name  , phone_number: payload.phone_number}));

      setFeedback({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      setFeedback({ open: true, message: err?.data?.message || err?.message || 'Failed to update profile', severity: 'error' });
    }
  };

  // --- FIXED IMAGE UPLOAD LOGIC ---
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create instant local URL so the UI doesn't have to wait for the API
    const localImageUrl = URL.createObjectURL(file);
    
    // Optimistically update Redux so the profile picture changes everywhere instantly
    // dispatch(setUser({
    //   ...reduxUser,
    //   profile_image: localImageUrl
    // }));

    dispatch(setCredentials({ ...reduxUser, first_name: payload.first_name  }));

    const formDataToSend = new FormData();
    formDataToSend.append('profile_image', file); 

    try {
      // Send image to backend
      const response = await updateImage(formDataToSend).unwrap();
      await refetch(); 

      // If backend returns the permanent S3/Cloud URL, update Redux one final time with the real URL
      const finalImageUrl = response?.data?.profile_image || response?.profile_image;
      if (finalImageUrl) {
        // Appending a timestamp forces the browser to ignore cache and show the new picture
        // dispatch(setUser({
        //   ...reduxUser,
        //   profile_image: `${finalImageUrl}?t=${Date.now()}` 
        // }));

      }

      setFeedback({ open: true, message: 'Profile image updated!', severity: 'success' });
    } catch (err) {
      // Revert Redux to original image if upload fails
      // dispatch(setUser({ ...reduxUser })); 
      dispatch(setCredentials({ ...reduxUser, first_name: payload.first_name }));
      
      setFeedback({ open: true, message: err?.data?.message || 'Failed to upload image', severity: 'error' });
    }
  };

  if (isApiLoading && !reduxUser) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const currentImage = getMergedUserData()?.profile_image;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default', marginTop: '70px' }}>
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ mb: 4, px: 1 }}>
            User's Information
          </Typography>

          <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 2, border: '1px solid #dbdee2ff' }}>
            
            <ProfileHeader
              name={formData.name}
              email={formData.email}
              currentImage={currentImage} 
              onImageChange={handleImageChange}
              isUpdating={isImageUpdating}
            />
            <Divider sx={{ mb: 5 }} />

            <UserInfoForm formData={formData} handleChange={handleChange} />

            <Stack direction="row" spacing={2} sx={{ mt: 8 }}>
              <Button variant="outlined" onClick={handleReset} disabled={isProfileUpdating}>
                Cancel
              </Button>

              <Button variant="contained" disabled={isProfileUpdating} onClick={handleSave} sx={{ minWidth: '150px' }}>
                {isProfileUpdating ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
              </Button>
            </Stack>
          </Paper>
        </Container>

        <AccountPage />

        <Snackbar open={feedback.open} autoHideDuration={4000} onClose={() => setFeedback({ ...feedback, open: false })}>
          <Alert severity={feedback.severity} variant="filled">{feedback.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;







































