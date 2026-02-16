import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AnalystModal = ({ open, onClose, caseData }) => {
  if (!caseData) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '8px', p: 1 } }}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#444' }}>
        Connect with an Analyst
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ color: '#555', mb: 3, lineHeight: 1.6 }}>
          {caseData.content}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#666' }}>User Name - {caseData.user}</Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>Searched on {caseData.date}</Typography>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Type Message"
          sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: '#F9F9F9' } }}
        />

        <Button variant="contained" fullWidth onClick={onClose} sx={{ py: 1.5, fontSize: '1rem' }}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AnalystModal;