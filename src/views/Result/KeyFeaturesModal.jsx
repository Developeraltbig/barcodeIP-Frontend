import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, IconButton, Typography, 
  List, ListItem, ListItemIcon, Divider, Box, Fade, useTheme, useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const BRAND_RED = "#E94E34";

const KeyFeaturesModal = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm')); // Fullscreen on mobile if desired

  const descriptions = [
    "Utilizes advanced bioelectronic synchronization to align with neural pathways in real-time.",
    "Specifically designed for minimally invasive endovascular deployment to ensure zero patient recovery time.",
    "Implements automated modulation parameters to adjust autonomic disorder treatments based on live feedback.",
    "Constructed using proprietary high-grade medical alloys to ensure long-term biocompatibility within the artery.",
    "Features encrypted wireless telemetry for seamless data streaming directly to secure clinical monitors.",
    "Supports next-generation inductive charging, providing device longevity of over 10 years.",
    "Integrated with global patient health portals for automatic, secure logging of all treatment milestones."
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen} // Optional: Make it full screen on mobile
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : '24px', // No radius if full screen
          p: { xs: 1, sm: 2 },
          margin: { xs: 0, sm: 2 } // Full bleed on mobile
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        bgcolor:'#f2f2f3ff',
        pt: { xs: 3, sm: 2 },
        px: { xs: 3, sm: 4 }
      }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Key Features
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ bgcolor: '#f1f5f9' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ 
        mt: 1,
        px: { xs: 3, sm: 4 },
        pb: 4,
        maxHeight: '70vh',
         maxWidth: '70vh',
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#e2e8f0', borderRadius: '10px' }
      }}>
        <List>
          {descriptions.map((text, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ py: 2, px: 0, alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 24, mt: 0.8 }}>
                  <FiberManualRecordIcon sx={{ color: BRAND_RED, fontSize: 8 }} />
                </ListItemIcon>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#475569', 
                    lineHeight: 1.6, 
                    fontWeight: 500,
                    fontSize: { xs: '0.875rem', sm: '0.95rem' },
                    // borderBottom:'1px solid #bec9d4ff'
                  }}
                >
                  {text}
                </Typography>
              </ListItem>
              {index < descriptions.length - 1 && (
                <Divider component="li" sx={{ opacity: 0.4 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default KeyFeaturesModal;