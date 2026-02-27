import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, TextField, Button, IconButton, CircularProgress, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateAnalystConnectionsMutation } from '../../features/userApi';
import { useSelector } from 'react-redux';

const AnalystModal = ({ open, onClose, caseData }) => {

  const [message, setMessage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [connectAnalyst, { isLoading, isSuccess, isError }] =  useCreateAnalystConnectionsMutation() ;
  

  if (!caseData) return null;
  console.log('case data', caseData);


  // const handleSubmit = async () => {
  //   // 1. Prepare the payload exactly like your Postman data
  //   const payload = {
  //     projectId: caseData._id, // Used for the URL
  //     body: {
  //       email: user?.email || "unknown@mail.com", // Dynamic email
  //       project_title: caseData.project_title,
  //       message: message // From the TextField
  //     }
  //   };
    
  //   try {
  //     // 2. Trigger the mutation with the new object structure
  //     await connectAnalyst(payload).unwrap();

  //     setTimeout(() => {
  //       onClose();
  //       setMessage(''); 
  //     }, 1500);
  //   } catch (err) {
  //     console.error('Connection failed:', err);
  //   }
  // };

  const handleSubmit = async () => {
    // 1. Prepare the payload exactly like your Postman data
    const payload = {
      projectId: caseData._id, // Used for the URL
      body: {
        email: user?.email || "unknown@mail.com", // Dynamic email
        project_title: caseData.project_title,
        message: message 
      }
    };

    try {
      // 2. Trigger the mutation with the new object structure
      await connectAnalyst(payload).unwrap();

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

 
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* ... IconButton and DialogTitle code ... */}

        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
       <CloseIcon fontSize="small" />
        </IconButton>

    <DialogTitle sx={{ fontWeight: 800, color: '#1e293b', pt: 3 }}>Connect with an Analyst</DialogTitle>

      <DialogContent>
        {isSuccess && <Alert severity="success" sx={{ mb: 2 }}>Request Sent!</Alert>}
        {isError && <Alert severity="error" sx={{ mb: 2 }}>Error connecting.</Alert>}

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: '#777' }}>
            Case ID : <span style={{ color: '#D34335' }}> {caseData.project_id} </span>
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {caseData.project_title}
          </Typography>
        </Box>

        {/* 3. Bind the TextField to state */}
        <TextField
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Additional notes for the analyst (Optional)"
          sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: '#F9F9F9' } }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={isLoading || isSuccess}
          sx={{
             /* ... your existing styles ... */
             bgcolor: isSuccess ? '#4caf50' : '#ef4444' 
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : isSuccess ? "Connected!" : "Submit Connection Request"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AnalystModal;
