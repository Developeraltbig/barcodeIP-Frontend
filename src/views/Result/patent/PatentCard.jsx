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


const NoDataFound = ({ tabName }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    py: 10, 
    width: '100%',
    opacity: 0.6 
  }}>
    {/* <InboxIcon sx={{ fontSize: 60, mb: 2, color: 'text.secondary' }} /> */}
    <Typography variant="h5" gutterBottom>
      No {tabName} Found
    </Typography>
    <Typography variant="body2" color="text.secondary">
      There is currently no data available for this section.
    </Typography>
  </Box>
);



const PatentCard = ({data ,  wideMode}) => {
  const navigate = useNavigate();

  const truncateWords = (text, limit) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(' ') + '...';
};




  
  return (
    <>
    {/* {data?.novelty_analysis?.comparisons?.map((data, index) => (
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

    ))} */}


    {/* Check if the comparisons array exists and has items */}
{data?.novelty_analysis?.comparisons?.length > 0 ? (
  data.novelty_analysis.comparisons.map((item, index) => (
    <Grid item xs={12} md={wideMode ? 6 : 12} key={index}>
      <Card 
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
          width:'100%',
          '@media (min-width: 1410px)': {
            maxWidth: wideMode ? '650px' : '100%', 
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 2, fontSize: '1.1rem', lineHeight: 1.3 }}>
          {item?.details?.title}
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
          <Chip 
            label={item?.details?.patent_id.match(/(?<=\/)[A-Z0-9]+(?=\/)/)}
            icon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
            sx={{ bgcolor: `${BRAND_RED}10`, color: BRAND_RED, fontWeight: 800, borderRadius: '8px', cursor: 'pointer' }} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
            <CalendarTodayIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{item?.details?.publication_date}</Typography>
          </Box>
        </Stack>

        <Typography variant="body2" sx={{ color: '#475569', mb: 4, lineHeight: 1.6, flexGrow: 1 }}>
          {truncateWords(item?.details?.abstract, 20)}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
            <Button 
              variant="outlined" 
              startIcon={<VisibilityIcon />} 
              sx={filledBtnStyle} 
              onClick={() => navigate(`/overlap/${item?.metrics?._id}`, { state: { patentData: item } })}
            >
              Overlap
            </Button>
        </Box>
      </Card>
    </Grid>
  ))
) : (
  /* 2. FALLBACK UI: This shows if comparisons is empty or undefined */
  <Grid item xs={12}>
    <Box sx={{ 
      textAlign: 'center', 
      py: 8, 
      bgcolor: '#fff', 
      borderRadius: '8px', 
      // border: '1px dashed #b1b9c0' 
    }}>
      <Box 
        component="img" 
        src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" 
        sx={{ width: 80, mb: 2, opacity: 0.4, filter: 'grayscale(1)' }} 
      />
      <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 600 }}>
        No Records Found
      </Typography>
      <Typography variant="body2" color="textSecondary">
        We couldn't find any data matching this category.
      </Typography>
    </Box>
  </Grid>
)}
    </>
  )
}

export default PatentCard
