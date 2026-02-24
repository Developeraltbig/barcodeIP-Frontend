import React, { useState } from 'react';
import { Button, Menu, MenuItem, Fade } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';

const DownloadButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Open the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Logic to trigger downloads
  const handleDownload = (type) => {
    handleClose();
    
    // In a real app, 'data' would be your report content
    const data = "Your report content goes here";
    const blob = new Blob([data], { type: type === 'pdf' ? 'application/pdf' : 'application/msword' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `Report.${type === 'pdf' ? 'pdf' : 'docx'}`;
    link.click();
    
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Button
        id="download-button"
        aria-controls={open ? 'download-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        startIcon={<GetAppIcon />}
        onClick={handleClick}
        sx={{ 
          bgcolor: '#E94E34', 
          fontWeight: 700, 
          textTransform: 'none', 
          px: 4, 
          py: 1.2, 
          borderRadius: '12px', 
          boxShadow: '0 8px 20px -6px rgba(233, 78, 52, 0.4)', 
          '&:hover': { bgcolor: '#d8432c' } 
        }}
      >
        Download Report
      </Button>

      <Menu
        id="download-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        // This aligns the menu to the bottom of the button
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={() => handleDownload('pdf')} sx={{ gap: 1 }}>
          <PictureAsPdfIcon fontSize="small" color="error" />
          Download PDF
        </MenuItem>
        <MenuItem onClick={() => handleDownload('docx')} sx={{ gap: 1 }}>
          <DescriptionIcon fontSize="small" color="primary" />
          Download DOCX
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DownloadButton;