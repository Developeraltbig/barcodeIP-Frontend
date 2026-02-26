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


const PatentCard = ({data, wideMode }) => {
  const navigate = useNavigate();
  // console.log('item===', data)
  // console.log('item===', data.scholarResults)

  const truncateWords = (text, limit) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(' ') + '...';
};
  
  return (
    <>
    {/* {data.scholarResults?.map((data, index) => (
     <Card 
             component={motion.div}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             lg={{maxWidth:'100%',}}  
             whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
             sx={{ p: 3, borderRadius: '5px', border: '1px solid #b1b9c0', height: '100%', display: 'flex', flexDirection: 'column', width:'100%', '&:hover': { border: '1px solid #b1b9c0'  } ,
             '@media (min-width: 1410px)': {
               maxWidth: wideMode ? '650px' : '100%', 
             },  }}
           >

        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 2, fontSize: '1.1rem', lineHeight: 1.3 }}>
          {data?.snippet}
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
          <Chip 
            onClick={() => window.open(`${data?.scholar_link}`, '_blank', 'noopener,noreferrer')}
            label= "View more" 
            icon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
            sx={{ bgcolor: `${BRAND_RED}10`, color: BRAND_RED, fontWeight: 800, borderRadius: '8px', cursor: 'pointer' }} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
            <CalendarTodayIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{data?.publication_date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
            <PersonOutlineIcon sx={{ fontSize: 18 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{data?.author}</Typography>
          </Box>
        </Stack>

        <Typography variant="body2" sx={{ color: '#475569', mb: 4, lineHeight: 1.6, flexGrow: 1 }}>
          {truncateWords(data?.title, 20)}
        </Typography>
      </Card>

    ))} */}



    <>
  {/* 1. Check if scholarResults exists and has items */}
  {data?.scholarResults && data.scholarResults.length > 0 ? (
    data.scholarResults.map((scholar, index) => (
      <Card
        key={index} // Always include a unique key
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
        sx={{
          p: 3,
          borderRadius: '5px',
          border: '1px solid #b1b9c0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          '&:hover': { border: '1px solid #b1b9c0' },
          '@media (min-width: 1410px)': {
            maxWidth: wideMode ? '650px' : '100%',
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 2, fontSize: '1.1rem', lineHeight: 1.3 }}>
          {scholar?.snippet}
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
          <Chip
            onClick={() => window.open(`${scholar?.scholar_link}`, '_blank', 'noopener,noreferrer')}
            label="View more"
            icon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
            sx={{ bgcolor: `${BRAND_RED}10`, color: BRAND_RED, fontWeight: 800, borderRadius: '8px', cursor: 'pointer' }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
            <CalendarTodayIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{scholar?.publication_date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
            <PersonOutlineIcon sx={{ fontSize: 18 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{scholar?.author}</Typography>
          </Box>
        </Stack>

        <Typography variant="body2" sx={{ color: '#475569', mb: 4, lineHeight: 1.6, flexGrow: 1 }}>
          {truncateWords(scholar?.title, 20)}
        </Typography>
      </Card>
    ))
  ) : (
    /* 2. Fallback UI when no scholar results are found */
    <Box sx={{ 
      width: '100%', 
      p: 5, 
      textAlign: 'center', 
      border: '1px dashed #b1b9c0', 
      borderRadius: '8px',
      bgcolor: 'rgba(0,0,0,0.02)'
    }}>
      <Typography variant="h6" color="textSecondary">
        No Publication Results Found
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Try adjusting your search or checking back later.
      </Typography>
    </Box>
  )}
</>
    </>
  )
}

export default PatentCard
