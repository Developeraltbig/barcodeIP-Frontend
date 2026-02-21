import React from 'react';
import { Card, Typography, Stack, Chip, Box, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CollectionsIcon from '@mui/icons-material/Collections';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import { BRAND_RED, outlineBtnStyle, filledBtnStyle } from '../constants';
import { useNavigate } from 'react-router-dom';


const PatentCard = ({item}) => {
  const navigate = useNavigate();
  
  return (
  
  <Card 
    component={motion.div}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
    sx={{ p: 3, borderRadius: '16px', border: '1px solid #b1b9c0', height: '100%', display: 'flex', flexDirection: 'column', maxWidth:'500px', '&:hover': { border: '1px solid #b1b9c0'  }  }}
  >
    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 2, fontSize: '1.1rem', lineHeight: 1.3 }}>
      {item.title}
    </Typography>

    <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
      <Chip 
        label={item.id} 
        icon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
        sx={{ bgcolor: `${BRAND_RED}10`, color: BRAND_RED, fontWeight: 800, borderRadius: '8px', cursor: 'pointer' }} 
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
        <CalendarTodayIcon sx={{ fontSize: 16 }} />
        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.date}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
        <PersonOutlineIcon sx={{ fontSize: 18 }} />
        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.author}</Typography>
      </Box>
    </Stack>

    <Typography variant="body2" sx={{ color: '#475569', mb: 4, lineHeight: 1.6, flexGrow: 1 }}>
      {item.desc}
    </Typography>

    <Grid container spacing={1.5}>
      <Grid item xs={4}><Button  fullWidth variant="outlined" startIcon={<VisibilityIcon />} sx={filledBtnStyle} onClick={() => navigate(`/overlap`)}>Overlap</Button></Grid>
    </Grid>
  </Card>
  )
}

export default PatentCard
