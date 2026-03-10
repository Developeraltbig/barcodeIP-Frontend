

// import React, { useState } from 'react';
// import { Card, Typography, Stack, Chip, Box, Button, Grid } from '@mui/material';
// import { motion } from 'framer-motion';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; // ADDED
// import JoinInnerIcon from '@mui/icons-material/JoinInner';
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
// import { BRAND_RED, outlineBtnStyle, filledBtnStyle } from '../constants';
// import { useNavigate } from 'react-router-dom';

// const NoDataFound = ({ tabName }) => (
//   <Box
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       py: 10,
//       width: '100%',
//       opacity: 0.6
//     }}
//   >
//     <Typography variant="h5" gutterBottom>
//       No {tabName} Found
//     </Typography>
//     <Typography variant="body2" color="text.secondary">
//       There is currently no data available for this section.
//     </Typography>
//   </Box>
// );

// const PatentCard = ({ data, wideMode }) => {
//   const navigate = useNavigate();
//   const [showImagesMap, setShowImagesMap] = useState({});

//   const truncateWords = (text, limit) => {
//     if (!text) return '';
//     const words = text.split(' ');
//     if (words.length <= limit) return text;
//     return words.slice(0, limit).join(' ') + '...';
//   };

//   const handlePatentRedirect = (rawId) => {
//     if (!rawId) return;
//     const cleanId = rawId.trim().replace(/\s/g, '');
//     const url = `https://patents.google.com/${cleanId}`;
//     window.open(url, '_blank', 'noopener,noreferrer');
//   };

//   const toggleImages = (index) => {
//     setShowImagesMap((prev) => ({
//       ...prev,
//       [index]: !prev[index]
//     }));
//   };

//   return (
//     <>
//       {data?.novelty_analysis?.comparisons?.length > 0 ? (
//         data.novelty_analysis.comparisons.map((item, index) => (
//           <Grid item size={{ md: wideMode ? 6 : 12 }} key={index}>
//             <Card
//               component={motion.div}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
//               sx={{
//                 p: 3,
//                 borderRadius: '5px',
//                 border: '1px solid #b1b9c0',
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 width: '100%',
//                 '&:hover': { border: '1px solid #b1b9c0' },
//                 '@media(min-width: 1410px)': {
//                   maxWidth: wideMode ? '750px' : '100%'
//                 }
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 800,
//                   color: '#1e293b',
//                   mb: 2,
//                   fontSize: '1.1rem',
//                   lineHeight: 1.3,
//                   display: '-webkit-box',
//                   WebkitLineClamp: 1,
//                   WebkitBoxOrient: 'vertical',
//                   overflow: 'hidden'
//                 }}
//               >
//                 {item?.details?.title || 'There is no description present here! '.repeat(50)}
//               </Typography>

//               <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
//                 <Chip
//                   onClick={() => handlePatentRedirect(item?.details?.patent_id)} 
//                   disabled={!item?.details?.patent_id}
//                   label={item?.details?.patent_id?.match(/(?<=\/)[A-Z0-9]+(?=\/)/) || item?.details?.patent_id}
//                   icon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
//                   sx={{ bgcolor: `${BRAND_RED}10`, color: BRAND_RED, fontWeight: 800, borderRadius: '8px', cursor: 'pointer' }}
//                 />
                
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
//                   <CalendarTodayIcon sx={{ fontSize: 16 }} />
//                   <Typography variant="caption" sx={{ fontWeight: 600 }}>
//                     {item?.details?.publication_date}
//                   </Typography>
//                 </Box>

//                 {/* ENHANCED: Toggle Button UI */}
//                 <Button
//                   variant="text"
//                   size="small"
//                   onClick={() => toggleImages(index)}
//                   startIcon={showImagesMap[index] ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
//                   sx={{
//                     ml: 1,
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     color: '#3b82f6',
//                     borderRadius: '20px',
//                     px: 1.5,
//                     '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.08)' }
//                   }}
//                 >
//                   {showImagesMap[index] ? 'Hide Images' : 'Show Images'}
//                 </Button>
//               </Stack>

//               {/* ENHANCED: Beautiful Horizontal Scroll Container */}
//               {showImagesMap[index] && (
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     overflowX: 'auto',
//                     gap: 2,
//                     mb: 3, // More breathing room
//                     py: 2, // Padding top and bottom for shadows
//                     px: 1, // Padding sides
//                     bgcolor: '#f8fafc', // Light slate background makes images pop
//                     borderRadius: '8px',
//                     border: '1px solid #e2e8f0',
                    
//                     // Custom scrollbar styling
//                     scrollbarWidth: 'thin', // For Firefox
//                     scrollbarColor: '#cbd5e1 transparent', // For Firefox
//                     '&::-webkit-scrollbar': { 
//                       height: '8px' 
//                     },
//                     '&::-webkit-scrollbar-track': { 
//                       background: 'transparent' 
//                     },
//                     '&::-webkit-scrollbar-thumb': {
//                       backgroundColor: '#cbd5e1',
//                       borderRadius: '10px',
//                       border: '2px solid #f8fafc', // Creates a padded look
//                       '&:hover': { backgroundColor: '#94a3b8' }
//                     }
//                   }}
//                 >
//                   {/* Image Mapping */}
//                   {(item?.details?.images || [1, 2, 3, 4, 5, 6, 7]).map((img, imgIdx) => (
//                     <Box
//                       key={imgIdx}
//                       sx={{
//                         flexShrink: 0,
//                         height: 180, // Taller size matching patent sketches
//                         width: 140, 
//                         backgroundColor: '#ffffff',
//                         borderRadius: '6px',
//                         border: '1px solid #e2e8f0',
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
//                         overflow: 'hidden',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         cursor: 'pointer',
//                         transition: 'all 0.2s ease',
//                         '&:hover': {
//                           boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
//                           borderColor: '#cbd5e1',
//                           transform: 'translateY(-4px)' // Slight lift effect
//                         }
//                       }}
//                     >
//                       <Box
//                         component="img"
//                         src={typeof img === 'string' ? img : `https://via.placeholder.com/140x180?text=Fig.+${imgIdx + 1}`}
//                         alt={`Drawing ${imgIdx + 1}`}
//                         sx={{
//                           maxHeight: '100%',
//                           maxWidth: '100%',
//                           objectFit: 'contain',
//                           p: 1 // Padding inside the image frame
//                         }}
//                       />
//                     </Box>
//                   ))}
//                 </Box>
//               )}

//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: '#475569',
//                   mb: 4,
//                   lineHeight: 1.6,
//                   flexGrow: 1,
//                   display: '-webkit-box',
//                   WebkitLineClamp: showImagesMap[index] ? 3 : 1, // Shows more text when expanded
//                   WebkitBoxOrient: 'vertical',
//                   overflow: 'hidden',
//                   transition: 'all 0.3s ease'
//                 }}
//               >
//                 {item?.details?.abstract || 'There is no description present here! '.repeat(50)}
//               </Typography>

//               <Box sx={{ mt: 'auto', display: 'flex', gap: '20px' }}>
//                 <Button
//                   variant="outlined"
//                   startIcon={<JoinInnerIcon />}
//                   sx={filledBtnStyle}
//                   onClick={() => navigate(`/overlap/${item?.metrics?._id}`, { state: { patentData: item } })}
//                 >
//                   View Overlap
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   startIcon={<ArticleOutlinedIcon />}
//                   sx={outlineBtnStyle}
//                   onClick={() => navigate(`/overlap/${item?.metrics?._id}`, { state: { patentData: item } })}
//                 >
//                   View More
//                 </Button>
//               </Box>
//             </Card>
//           </Grid>
//         ))
//       ) : (
//         <Box
//           sx={{
//             width: '100%',
//             p: 5,
//             textAlign: 'center',
//             border: '1px dashed #b1b9c0',
//             borderRadius: '8px',
//             bgcolor: 'rgba(0,0,0,0.02)'
//           }}
//         >
//           <Typography variant="h6" color="textSecondary">
//             No Patent Results Found
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             Try adjusting your search or checking back later.
//           </Typography>
//         </Box>
//       )}
//     </>
//   );
// };

// export default PatentCard;

































import React, { useState } from 'react';
import { Card, Typography, Stack, Chip, Box, Button, Grid, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; 
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { BRAND_RED, outlineBtnStyle, filledBtnStyle } from '../constants';
import { useNavigate } from 'react-router-dom';

const NoDataFound = ({ tabName }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 10,
      width: '100%',
      opacity: 0.6
    }}
  >
    <Typography variant="h5" gutterBottom>
      No {tabName} Found
    </Typography>
    <Typography variant="body2" color="text.secondary">
      There is currently no data available for this section.
    </Typography>
  </Box>
);

const PatentCard = ({ data, wideMode }) => {
  const navigate = useNavigate();
  const [showImagesMap, setShowImagesMap] = useState({});
  const [loadedImages, setLoadedImages] = useState({}); // ADDED: State to track loaded images

  const truncateWords = (text, limit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  const handlePatentRedirect = (rawId) => {
    if (!rawId) return;
    const cleanId = rawId.trim().replace(/\s/g, '');
    const url = `https://patents.google.com/${cleanId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleImages = (index) => {
    setShowImagesMap((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // ADDED: Handler to mark image as loaded (or failed to load, so the spinner stops)
  const handleImageLoad = (index, imgIdx) => {
    setLoadedImages((prev) => ({
      ...prev,
      [`${index}-${imgIdx}`]: true
    }));
  };

  return (
    <>
      {data?.novelty_analysis?.comparisons?.length > 0 ? (
        data.novelty_analysis.comparisons.map((item, index) => (
          <Grid item size={{ md: wideMode ? 6 : 12 }} key={index}>
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
                  maxWidth: wideMode ? '750px' : '100%'
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
                {item?.details?.title || 'There is no description present here! '.repeat(50)}
              </Typography>

              <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
                <Chip
                  onClick={() => handlePatentRedirect(item?.details?.patent_id)} 
                  disabled={!item?.details?.patent_id}
                  label={item?.details?.patent_id?.match(/(?<=\/)[A-Z0-9]+(?=\/)/) || item?.details?.patent_id}
                  icon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
                  sx={{ bgcolor: `${BRAND_RED}10`, color: BRAND_RED, fontWeight: 800, borderRadius: '8px', cursor: 'pointer' }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
                  <CalendarTodayIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {item?.details?.publication_date}
                  </Typography>
                </Box>

                {/* ENHANCED: Toggle Button UI */}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => toggleImages(index)}
                  startIcon={showImagesMap[index] ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    ml: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#3b82f6',
                    borderRadius: '20px',
                    px: 1.5,
                    '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.08)' }
                  }}
                >
                  {showImagesMap[index] ? 'Hide Images' : 'Show Images'}
                </Button>
              </Stack>

              {/* ENHANCED: Beautiful Horizontal Scroll Container */}
              {showImagesMap[index] && (
                <Box
                  sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: 2,
                    mb: 3, // More breathing room
                    py: 2, // Padding top and bottom for shadows
                    px: 1, // Padding sides
                    bgcolor: '#f8fafc', // Light slate background makes images pop
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    
                    // Custom scrollbar styling
                    scrollbarWidth: 'thin', // For Firefox
                    scrollbarColor: '#cbd5e1 transparent', // For Firefox
                    '&::-webkit-scrollbar': { 
                      height: '8px' 
                    },
                    '&::-webkit-scrollbar-track': { 
                      background: 'transparent' 
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#cbd5e1',
                      borderRadius: '10px',
                      border: '2px solid #f8fafc', // Creates a padded look
                      '&:hover': { backgroundColor: '#94a3b8' }
                    }
                  }}
                >
                  {/* Image Mapping */}
                  {(item?.details?.images || [1, 2, 3, 4, 5, 6, 7]).map((img, imgIdx) => (
                    <Box
                      key={imgIdx}
                      sx={{
                        flexShrink: 0,
                        height: 180, // Taller size matching patent sketches
                        width: 140, 
                        backgroundColor: '#ffffff',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                          borderColor: '#cbd5e1',
                          transform: 'translateY(-4px)' // Slight lift effect
                        }
                      }}
                    >
                      {/* ADDED: Loader showing until image fires onLoad */}
                      {!loadedImages[`${index}-${imgIdx}`] && (
                        <CircularProgress size={24} sx={{ color: '#cbd5e1' }} />
                      )}

                      <Box
                        component="img"
                        src={typeof img === 'string' ? img : `https://via.placeholder.com/140x180?text=Fig.+${imgIdx + 1}`}
                        alt={`Drawing ${imgIdx + 1}`}
                        onLoad={() => handleImageLoad(index, imgIdx)} // ADDED
                        onError={() => handleImageLoad(index, imgIdx)} // ADDED: Stop loader if image fails
                        sx={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain',
                          p: 1, // Padding inside the image frame
                          display: loadedImages[`${index}-${imgIdx}`] ? 'block' : 'none' // ADDED: Hides image while loading
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}

              <Typography
                variant="body2"
                sx={{
                  color: '#475569',
                  mb: 4,
                  lineHeight: 1.6,
                  flexGrow: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: showImagesMap[index] ? 3 : 1, // Shows more text when expanded
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                {item?.details?.abstract || 'There is no description present here! '.repeat(50)}
              </Typography>

              <Box sx={{ mt: 'auto', display: 'flex', gap: '20px' }}>
                <Button
                  variant="outlined"
                  startIcon={<JoinInnerIcon />}
                  sx={filledBtnStyle}
                  onClick={() => navigate(`/overlap/${item?.metrics?._id}`, { state: { patentData: item } })}
                >
                  View Overlap
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<ArticleOutlinedIcon />}
                  sx={outlineBtnStyle}
                  onClick={() => navigate(`/overlap/${item?.metrics?._id}`, { state: { patentData: item } })}
                >
                  View More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))
      ) : (
        <Box
          sx={{
            width: '100%',
            p: 5,
            textAlign: 'center',
            border: '1px dashed #b1b9c0',
            borderRadius: '8px',
            bgcolor: 'rgba(0,0,0,0.02)'
          }}
        >
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
};

export default PatentCard;