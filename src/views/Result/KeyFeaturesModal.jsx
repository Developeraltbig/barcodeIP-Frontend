import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, IconButton, Typography, 
  Divider, Box, Fade, useTheme, useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const KeyFeaturesModal = ({ open, onClose, feature }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md" // Increased to 'md' to accommodate nested list widths
      fullScreen={fullScreen}
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : '24px',
          p: { xs: 1, sm: 2 },
          margin: { xs: 0, sm: 2 }
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        bgcolor: '#f2f2f3ff',
        pt: { xs: 3, sm: 2 },
        px: { xs: 3, sm: 4 }
      }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>
          Key Features
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ bgcolor: '#f1f5f9' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ 
        mt: 2,
        px: { xs: 3, sm: 4 },
        pb: 4,
        maxHeight: '70vh',
        // Styling for the dynamic HTML content
        '& ul, & ol': {
          paddingLeft: '20px',
          color: '#475569',
          lineHeight: 1.8,
        },
        '& li': {
          marginBottom: '8px',
          fontSize: { xs: '0.875rem', sm: '0.95rem' },
        },
        '& li::marker': {
          color: '#E94E34', // Using your BRAND_RED for bullets/numbers
          fontWeight: 'bold',
        }
      }}>
        {/* Renders the 'feature' string as HTML. 
            'component="div"' is used to allow nested lists inside.
        */}
        <Typography 
          variant="body1" 
          component="div"
          dangerouslySetInnerHTML={{ __html: feature }} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default KeyFeaturesModal;