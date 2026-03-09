import React from 'react';
import { Box, Typography, Avatar, Badge, Stack, IconButton, alpha, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

const ProfileHeader = ({ name, email, currentImage, onImageChange, isUpdating }) => (
  // <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 5 }}>
  //   <Badge
  //     overlap="circular"
  //     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  //     badgeContent={
  //       <IconButton
  //       component="label"
  //         sx={{
  //           width: 32,
  //           height: 32,
  //           bgcolor: 'white',
  //           border: '1px solid #E2E8F0',
  //           boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  //           '&:hover': { bgcolor: '#F8FAFC' }
  //         }}
  //       >
  //         <EditIcon sx={{ fontSize: 16, color: 'primary.main' }} />
  //       </IconButton>
  //     }
  //   >
  //     <Avatar
  //       sx={{
  //         width: 100,
  //         height: 100,
  //         bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
  //         color: 'primary.main',
  //       }}
  //     >
  //       <PersonIcon sx={{ fontSize: 50 }} />
  //     </Avatar>
  //   </Badge>
  //   <Box>
  //     <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>{name}</Typography>
  //     <Typography variant="body2" sx={{ color: 'text.secondary' }}>{email}</Typography>
  //   </Box>
  // </Stack>


     <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 4 }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <IconButton
            component="label" // Clicking this opens the file browser
            disabled={isUpdating}
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              '&:hover': { bgcolor: 'primary.dark' },
              width: 32, height: 32 
            }}
          >
       
            <input 
              hidden 
              accept="image/*" 
              type="file" 
              onChange={onImageChange} 
            />
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        }
      >
        <Box sx={{ position: 'relative' }}>
          <Avatar 
            src={currentImage} 
            sx={{ width: 100, height: 100, border: '1px solid #dbdee2' }} 
          />
          {isUpdating && (
            <CircularProgress
              size={100}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            />
          )}
        </Box>
      </Badge>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>{name}</Typography>
        {console.log(name)}
        <Typography variant="body2" color="text.secondary">{email}</Typography>
      </Box>
    </Stack>
);

export default ProfileHeader;







































