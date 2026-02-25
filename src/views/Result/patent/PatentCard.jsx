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


const PatentCard = ({data ,  wideMode}) => {
  const navigate = useNavigate();
  // console.log('item===', data)
  // console.log('item===', data?.novelty_analysis?.comparisons)

  const truncateWords = (text, limit) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(' ') + '...';
};
  
  return (
    <>
    {data?.novelty_analysis?.comparisons?.map((data, index) => (
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
          {data?.details?.title}
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
          <Chip 
            label={data?.details?.patent_id} 
            icon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
            sx={{ bgcolor: `${BRAND_RED}10`, color: BRAND_RED, fontWeight: 800, borderRadius: '8px', cursor: 'pointer' }} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
            <CalendarTodayIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{data?.details?.publication_date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
            <PersonOutlineIcon sx={{ fontSize: 18 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{data?.details?.inventor}</Typography>
          </Box>
        </Stack>

        <Typography variant="body2" sx={{ color: '#475569', mb: 4, lineHeight: 1.6, flexGrow: 1 }}>
          {truncateWords(data?.details?.abstract, 20)}
        </Typography>

        <Grid container spacing={1.5}>
          <Grid item xs={4}>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<VisibilityIcon />} 
              sx={filledBtnStyle} 
              onClick={() => navigate(`/overlap/${data?.metrics?._id}`, { 
                state: { 
                  patentData: data, // Passing the entire comparison object
                  analysisReport: data?.novelty_analysis?.matrix_data // Assuming your API has this structure
                } 
              })}
            >
              Overlap
            </Button>
            </Grid>
        </Grid>
      </Card>

    ))}
    </>
  )
}

export default PatentCard
