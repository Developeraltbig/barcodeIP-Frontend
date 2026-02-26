import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, Typography, Box, 
  TextField, Button, IconButton, CircularProgress, Alert 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAnalystConnectionsMutation } from '../../features/userApi';


const AnalystModal = ({ open, onClose, caseData }) => {
  // 1. Initialize the Mutation

  // const [connectAnalyst, { isLoading, isSuccess, isError }] =  useAnalystConnectionsMutation() ;

  if (!caseData) return null;

  const handleSubmit = async () => {
    try {
      // 2. Call the API with ONLY the ID (No Body)
      await connectAnalyst(caseData._id).unwrap();
      
      // Close modal after showing success for 1.5 seconds
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '12px' } }}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogTitle sx={{ fontWeight: 800, color: '#1e293b', pt: 3 }}>
        Connect with an Analyst
      </DialogTitle>

      <DialogContent>
        {/* Success/Error Feedback */}
        {/* {isSuccess && <Alert severity="success" sx={{ mb: 2 }}>Request Sent Successfully!</Alert>}
        {isError && <Alert severity="error" sx={{ mb: 2 }}>Could not connect. Please try again.</Alert>} */}

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>
            Project Title
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600, color: '#1e293b' }}>
            {caseData.content || "Standard Patent Analysis"}
          </Typography>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Additional notes for the analyst (Optional)"
          sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: '#F9F9F9' } }}
        />

        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleSubmit}
          // disabled={isLoading || isSuccess} // Prevent double clicks
          sx={{ 
            py: 1.5, 
            bgcolor: '#ef4444', 
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': { bgcolor: '#dc2626' },
            // '&.Mui-disabled': { bgcolor: isSuccess ? '#4caf50' : '#ccc', color: '#fff' }
          }}
        >
          {/* {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : isSuccess ? (
            "Connected!"
          ) : (
            "Submit Connection Request"
          )} */}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AnalystModal;