

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { 
//   Box, Container, Typography, Button, Stack, Divider, 
//   ThemeProvider, CssBaseline, Paper, CircularProgress, Alert, Snackbar 
// } from '@mui/material';
// import { theme } from './theme';
// import ProfileHeader from './ProfileHeader';
// import UserInfoForm from './UserInfoForm';
// import AccountPage from '../account/AccountPage';
// import { useGetUserDetailsQuery, useUpdateImageMutation, useUpdateProfileMutation } from '../../features/slice/auth/authApi';

// // 1. Import the mutation hook


// const UserProfile = () => {
//   const reduxUser = useSelector((state) => state.auth.user);
//   const [updateProfile, { isLoading }] = useUpdateProfileMutation();
//   const [updateImage, { isLoading: isImageUpdating }] = useUpdateImageMutation();
//    const [getUserDetails] = useGetUserDetailsQuery();
  
//   // State for success/error feedback
//   const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

//   const [formData, setFormData] = useState({
//     name: reduxUser?.first_name || '', // Use first_name from DB
//     email: reduxUser?.email || '',
//     phone: reduxUser?.phone_number || '', // Use phone_number from DB
//   });

//   // Sync state if Redux updates
//   useEffect(() => {
//   // Only update if reduxUser actually has data
//   if (reduxUser && Object.keys(reduxUser).length > 0) {
//     setFormData({
//       name: reduxUser.first_name || '', // Use the DB key
//       email: reduxUser.email || '',
//       phone: reduxUser.phone_number || '', // Use the DB key
//     });
//   }
// }, [reduxUser]); // This triggers as soon as Redux finishes loading from storage

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   // 2. The API Integration Logic
//   const handleSave = async () => {
//     try {
//       // Map local state to the Database format
//       const payload = {
//         first_name: formData.name,
//         phone_number: formData.phone
//       };

//       await updateProfile(payload).unwrap();
      
//       setFeedback({ open: true, message: 'Profile updated successfully!', severity: 'success' });
//     } catch (err) {
//       setFeedback({ 
//         open: true, 
//         message: err?.data?.message || 'Failed to update profile', 
//         severity: 'error' 
//       });
//     }
//   };

//   // Handle File Selection and Upload
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Create FormData to match your Postman setup
//     const formDataToSend = new FormData();
//     formDataToSend.append('profile_image', file); // 'profile_image' matches your API key

//     try {
//       await updateImage(formDataToSend).unwrap();
//       setFeedback({ open: true, message: 'Profile image updated!', severity: 'success' });
//     } catch (err) {
//       setFeedback({ 
//         open: true, 
//         message: err?.data?.message || 'Failed to upload image', 
//         severity: 'error' 
//       });
//     }
//   };

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
//              currentImage={reduxUser?.profile_image} // Pass the current image URL
//               onImageChange={handleImageChange}
//               isUpdating={isImageUpdating}
//             />
            

//             <Divider sx={{ mb: 5 }} />

//             {/* Ensure UserInfoForm uses the correct name attributes: "name" and "phone" */}
//             <UserInfoForm formData={formData} handleChange={handleChange} />

//             <Stack direction="row" spacing={2} sx={{ mt: 8 }}>
//               <Button
//                 variant="outlined"
//                 onClick={() =>
//                   setFormData({
//                     name: reduxUser?.first_name || '',
//                     phone: reduxUser?.phone_number || ''
//                   })
//                 }
//               >
//                 Cancel
//               </Button>

//               <Button variant="contained" disabled={isLoading} onClick={handleSave} sx={{ minWidth: '150px' }}>
//                 {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
//               </Button>
//             </Stack>
//           </Paper>
//         </Container>

//         <AccountPage />

//         {/* Feedback Toast */}
//         <Snackbar open={feedback.open} autoHideDuration={4000} onClose={() => setFeedback({ ...feedback, open: false })}>
//           <Alert severity={feedback.severity} variant="filled">
//             {feedback.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserProfile;






















// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { 
//   Box, Container, Typography, Button, Stack, Divider, 
//   ThemeProvider, CssBaseline, Paper, CircularProgress, Alert, Snackbar 
// } from '@mui/material';
// import { theme } from './theme';
// import ProfileHeader from './ProfileHeader';
// import UserInfoForm from './UserInfoForm';
// import AccountPage from '../account/AccountPage';
// import { useGetUserDetailsQuery, useUpdateImageMutation, useUpdateProfileMutation } from '../../features/slice/auth/authApi';

// const UserProfile = () => {
//   // We keep reduxUser as a backup, but we prioritize API data
//    const { user: reduxUser } = useSelector((state) => state.auth);
//    const userId = reduxUser?.id; // Access the ID
//     console.log("user data--- line 185",userId);

//   // 2. Initialize the Query to fetch data immediately on load
//   // const { data: apiUser, isLoading: isFetchingUser, refetch } = useGetUserDetailsQuery();
//   const { 
//     data: apiUser, 
//     isLoading: isFetchingUser, 
//     refetch 
//   } = useGetUserDetailsQuery(userId);

//   const [updateProfile, { isLoading }] = useUpdateProfileMutation();
//   const [updateImage, { isLoading: isImageUpdating }] = useUpdateImageMutation();
  
//   const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });


//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });

//    useEffect(() => {
//     // If apiUser exists, use it. If not, try reduxUser.
//     const currentUser = apiUser?.data || apiUser || reduxUser; 

//     console.log("current user line 212",currentUser);

//     if (currentUser) {
//       setFormData({
//         name: currentUser.first_name || '', 
//         email: currentUser.email || '',
//         phone: currentUser.phone_number || '', 
//       });
//     }
//   }, [apiUser, reduxUser]);


//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSave = async () => {
//     try {
//       const payload = {
//         first_name: formData.name,
//         phone_number: formData.phone
//       };

//       await updateProfile(payload).unwrap();
      
//       // Optional: Manually refresh data to ensure everything is in sync
//       refetch(); 

//       setFeedback({ open: true, message: 'Profile updated successfully!', severity: 'success' });
//     } catch (err) {
//       setFeedback({ 
//         open: true, 
//         message: err?.data?.message || 'Failed to update profile', 
//         severity: 'error' 
//       });
//     }
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formDataToSend = new FormData();
//     formDataToSend.append('profile_image', file); 

//     try {
//       await updateImage(formDataToSend).unwrap();
//       refetch(); // Refresh data to show new image immediately
//       setFeedback({ open: true, message: 'Profile image updated!', severity: 'success' });
//     } catch (err) {
//       setFeedback({ 
//         open: true, 
//         message: err?.data?.message || 'Failed to upload image', 
//         severity: 'error' 
//       });
//     }
//   };

//   // 4. (Optional) Show a loader while the initial user data is being fetched
//   if (isFetchingUser) {
//     return (
//       <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

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
//               name={apiUser.data.userDetail.first_name}
//               email={apiUser.data.userDetail.email}
//               // Prioritize API image, fallback to Redux, fallback to empty
//               currentImage={apiUser?.profile_image || reduxUser?.profile_image} 
//               onImageChange={handleImageChange}
//               isUpdating={isImageUpdating}
//             />
            
//             <Divider sx={{ mb: 5 }} />

//             <UserInfoForm formData={apiUser.data.userDetail} handleChange={handleChange} />
//            {console.log(apiUser.data.userDetail, "api user")}

//             <Stack direction="row" spacing={2} sx={{ mt: 8 }}>
//               <Button
//                 variant="outlined"
//                 onClick={() => {
//                    // Reset form to the latest API data
//                    if(apiUser) {
//                      setFormData({
//                         name: apiUser.first_name || '',
//                         email: apiUser.email || '',
//                         phone: apiUser.phone_number || ''
//                      })
//                    }
//                 }}
//               >
//                 Cancel
//               </Button>

//               <Button variant="contained" disabled={isLoading} onClick={handleSave} sx={{ minWidth: '150px' }}>
//                 {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
//               </Button>
//             </Stack>
//           </Paper>
//         </Container>

//         <AccountPage />

//         <Snackbar open={feedback.open} autoHideDuration={4000} onClose={() => setFeedback({ ...feedback, open: false })}>
//           <Alert severity={feedback.severity} variant="filled">
//             {feedback.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserProfile;




import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const UserProfile = () => {
  // 1. Get User ID from Redux
  const { user: reduxUser } = useSelector((state) => state.auth);
  const userId = reduxUser?.id;

  // 2. API Hooks
  const { 
    data: apiUser, 
    isLoading: isFetchingUser, 
    refetch 
  } = useGetUserDetailsQuery(userId);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [updateImage, { isLoading: isImageUpdating }] = useUpdateImageMutation();
  
  // 3. Local State for Form and Feedback
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // 4. Sync API data to Local State on Load
  useEffect(() => {
    // Navigate the nesting: apiUser?.data?.userDetail or apiUser?.data
    const userData = apiUser?.data?.userDetail || apiUser?.data || reduxUser; 

    if (userData) {
      setFormData({
        name: userData.first_name || '', 
        email: userData.email || '',
        phone: userData.phone_number || userData.phone || '',
      });
    }
  }, [apiUser, reduxUser]);

  useEffect(() => {
  if (apiUser) {
    console.log("Full API Response:", apiUser);
    console.log("Extracted Phone:", apiUser?.data?.userDetail?.phone_number);
  }
}, [apiUser]);

  // 5. Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 6. Save Logic
  const handleSave = async () => {
    try {
      // Ensure keys match exactly what your Backend expects
      const payload = {
        first_name: formData.name,
        phone_number: formData.phone
      };

      await updateProfile(payload).unwrap();
      
      // Refresh the query to get the latest data from server
      await refetch(); 

      setFeedback({ 
        open: true, 
        message: 'Profile updated successfully!', 
        severity: 'success' 
      });
    } catch (err) {
      setFeedback({ 
        open: true, 
        message: err?.data?.message || 'Failed to update profile', 
        severity: 'error' 
      });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataToSend = new FormData();
    formDataToSend.append('profile_image', file); 

    try {
      await updateImage(formDataToSend).unwrap();
      refetch(); 
      setFeedback({ open: true, message: 'Profile image updated!', severity: 'success' });
    } catch (err) {
      setFeedback({ 
        open: true, 
        message: err?.data?.message || 'Failed to upload image', 
        severity: 'error' 
      });
    }
  }

  if (isFetchingUser) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

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
              // Using formData for the name so it updates as the user types
              name={formData.name}
              email={formData.email}
              currentImage={apiUser?.data?.profile_image || reduxUser?.profile_image} 
              onImageChange={handleImageChange}
              isUpdating={isImageUpdating}
            />
            
            <Divider sx={{ mb: 5 }} />

            {/* CRITICAL CHANGE: Pass formData (local state) here, NOT apiUser */}
            <UserInfoForm formData={formData} handleChange={handleChange} />

            <Stack direction="row" spacing={2} sx={{ mt: 8 }}>
              <Button
                variant="outlined"
                onClick={() => {
                   // Reset local state to match the last successful API fetch
                   const userData = apiUser?.data?.userDetail || apiUser?.data;
                   if(userData) {
                     setFormData({
                        name: userData.first_name || '',
                        email: userData.email || '',
                        phone: userData.phone_number || ''
                     });
                   }
                }}
              >
                Cancel
              </Button>

              <Button 
                variant="contained" 
                disabled={isLoading} 
                onClick={handleSave} 
                sx={{ minWidth: '150px' }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
              </Button>
            </Stack>
          </Paper>
        </Container>

        <AccountPage />

        <Snackbar 
          open={feedback.open} 
          autoHideDuration={4000} 
          onClose={() => setFeedback({ ...feedback, open: false })}
        >
          <Alert severity={feedback.severity} variant="filled">
            {feedback.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;