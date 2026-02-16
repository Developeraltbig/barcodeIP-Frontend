import React from 'react';
import { Box, Typography, Divider, Stack, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const CaseCard = ({ item, onSave, onDownload }) => {
  return (
    <Box sx={{ border: '1px solid #E0E0E0', borderRadius: '4px', bgcolor: 'white' }}>
      <Box sx={{ p: 3, position: 'relative' }}>
        <IconButton size="small" sx={{ position: 'absolute', top: 8, right: 8 }}>
          <MoreVertIcon fontSize="small" color="disabled" />
        </IconButton>

        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
          Case ID : {item.id}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          {item.content}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ p: 2, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ color: '#777' }}>
          Searched on <span style={{ color: '#D34335', fontWeight: 'bold' }}>{item.date}</span>
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton 
            size="small" 
            onClick={() => onSave(item)}
            sx={{ border: '1px solid #D0D7DE', borderRadius: '4px', bgcolor: '#F6F8FA' }}
          >
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onDownload(item)}
            sx={{ border: '1px solid #D0D7DE', borderRadius: '4px', bgcolor: '#D0D7DE' }}
          >
            <FileDownloadOutlinedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default CaseCard;