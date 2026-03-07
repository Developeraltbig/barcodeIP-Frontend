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
                width: '100%',
                '&:hover': { border: '1px solid #b1b9c0' },
                '@media(min-width: 1410px)': {
                  maxWidth: wideMode ? '650px' : '100%'
                }
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: '#1e293b',
                  mb: 2,
                  fontSize: '1.1rem',
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {item?.details?.title || "There is no description present here! ".repeat(50)}
              </Typography>

              <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
                <Chip
                  label={item?.details?.patent_id.match(/(?<=\/)[A-Z0-9]+(?=\/)/)}
                  icon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
                  sx={{ bgcolor: `${BRAND_RED}10`, color: BRAND_RED, fontWeight: 800, borderRadius: '8px', cursor: 'pointer' }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
                  <CalendarTodayIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {item?.details?.publication_date}
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="body2" sx={{ color: '#475569', mb: 4, lineHeight: 1.6, flexGrow: 1,display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden' }}>
                {/* {truncateWords(item?.details?.abstract, 20)} */}
                {item?.details?.abstract || "There is no description present here! ".repeat(50)}
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
                No Patent Results Found
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Try adjusting your search or checking back later.
              </Typography>
            </Box>
      )}
    </>
  );
}

export default PatentCard
