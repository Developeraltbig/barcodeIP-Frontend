import React, { useRef } from 'react';
import { Box, Paper, Avatar, Typography, ButtonBase, IconButton } from '@mui/material';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'; // Using React Icons

const TabComponent = ({ items, activeId, onSelect }) => {
  const scrollRef = useRef(null);

  // Carousel Scroll Logic
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
 
  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', mb: 4 }}>
      {/* Left Navigation Arrow */}
      <IconButton
        onClick={() => handleScroll('left')}
        sx={{
          position: 'absolute',
          left: -30,
          zIndex: 5,
          bgcolor: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': { bgcolor: '#f8fafc' }
        }}
      >
        <IoIosArrowBack size={20} />
      </IconButton>

      {/* The Scrollable Tab Container */}

      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          px: 1,
          py: 2,
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          // Center the "No Data" message if there are no items
          justifyContent: items.length === 0 ? 'center' : 'flex-start',
          minHeight: '80px'
        }}
      >
        {items.length > 0 ? (
          items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <ButtonBase key={item.id} onClick={() => onSelect(item)} sx={{ borderRadius: 3, flexShrink: 0 }}>
                <Paper
                  elevation={0}
                  sx={{
                    maxWidth: 230,
                    p: '12px 16px',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: isActive ? '#ef4444' : '#e2e8f0',
                    bgcolor: isActive ? '#fff' : '#fcfcfd',
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: isActive ? '0 10px 15px -3px rgba(239, 68, 68, 0.1)' : 'none',
                    '&:hover': {
                      borderColor: isActive ? '#ef4444' : '#cbd5e1',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 45,
                        height: 45,
                        bgcolor: '#dbd0cbff',
                        color: '#c53d13ff',
                        fontWeight: 800,
                        fontSize: '1rem',
                        borderRadius: '50%',
                        mr: 2
                      }}
                    >
                      {/* Fallback to first letter if icon is missing */}
                      {item.name?.charAt(0)}
                    </Avatar>

                    <Box sx={{ flexGrow: 1, textAlign: 'left', overflow: 'hidden' }}>
                      <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                        {item.company}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </ButtonBase>
            );
          })
        ) : (
          /* --- NO DATA FOUND COMPONENT --- */
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              color: '#94a3b8',
              fontStyle: 'italic',
              p: 2,
              borderRadius: 3,
              width: '100%'
            }}
          >
            <Typography variant="body2">No results available</Typography>
          </Box>
        )}
      </Box>
      {/* Right Navigation Arrow */}
      <IconButton
        onClick={() => handleScroll('right')}
        sx={{
          position: 'absolute',
          right: -40,
          zIndex: 5,
          bgcolor: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': { bgcolor: '#d0d7dfff' }
        }}
      >
        <IoIosArrowForward size={20} />
      </IconButton>
    </Box>
  );
};

export default TabComponent;










//perivous fetched box
  // <Box
  //       ref={scrollRef}
  //       sx={{
  //         display: 'flex',
  //         gap: 2,
  //         overflowX: 'auto',
  //         scrollBehavior: 'smooth',
  //         px: 1,
  //         py: 2,
  //         '&::-webkit-scrollbar': { display: 'none' },
  //         msOverflowStyle: 'none',
  //         scrollbarWidth: 'none',
  //       }}
  //     >
  //       {items.map((item) => {
  //         const isActive = item.id === activeId;
          
  //         return (
  //           <ButtonBase
  //             key={item.id}
  //             onClick={() => onSelect(item)}
  //             sx={{ borderRadius: 3, flexShrink: 0 }}
  //           >
  //             <Paper
  //               elevation={0}
  //               sx={{
  //                 maxWidth: 230,
  //                 p: '12px 16px',
  //                 borderRadius: 3,
  //                 border: '1px solid',
  //                 alignContent:'start',
  //                 // Using your #ef4444 color for the active state
  //                 borderColor: isActive ? '#ef4444' : '#e2e8f0',
  //                 bgcolor: isActive ? '#fff' : '#fcfcfd',
  //                 transition: 'all 0.2s ease-in-out',
  //                 boxShadow: isActive ? '0 10px 15px -3px rgba(239, 68, 68, 0.1)' : 'none',
  //                 '&:hover': {
  //                   borderColor: isActive ? '#ef4444' : '#cbd5e1',
  //                   transform: 'translateY(-2px)'
  //                 }
  //               }}
  //             >
               
  //              <Box
               
  //              sx={{
  //                 display: 'flex',
  //               }}
  //               >
  //                  {/* 1. Icon/Avatar (Matches Image) */}
  //               <Avatar
  //                 variant="rounded"
  //                 sx={{
  //                   width: 45,
  //                   height: 45,
  //                   bgcolor: '#dbd0cbff', // Light teal background
  //                   color: '#c53d13ff',    // Dark teal text
  //                   fontWeight: 800,
  //                   fontSize: '1rem',
  //                   borderRadius: '50%',
  //                   mr: 2
  //                 }}
  //               >
  //                 {/* {item.icon} */}
  //               </Avatar>

  //               {/* 2. Text Content (Matches Image Layout) */}
  //               <Box sx={{ flexGrow: 1, textAlign: 'left', overflow: 'hidden' }}>
  //                 <Typography 
  //                   variant="subtitle2" 
  //                   noWrap 
  //                   sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}
  //                 >
  //                   {item.name}
  //                 </Typography>
  //                 <Typography 
  //                   variant="caption" 
  //                   sx={{ color: '#94a3b8', fontWeight: 500 }}
  //                 >
  //                   {item.company}
  //                 </Typography>
  //               </Box>
  //              </Box>

  //               {/* 3. Stats Section (Found / Partial / Not Found) */}
  //               {/* <Box sx={{ ml: 2, whiteSpace: 'nowrap', textAlign:'end' }}>
  //                 <Typography 
  //                   variant="caption" 
  //                   sx={{ 
  //                     fontWeight: 700, 
  //                     color: isActive ? '#ef4444' : '#64748b', 
  //                     letterSpacing: 0.5 
  //                   }}
  //                 >
  //                   {item.stats.found}F / {item.stats.partial}P / {item.stats.notFound}N
  //                 </Typography>
  //               </Box> */}
  //             </Paper>
  //           </ButtonBase>
  //         );
  //       })}
  //     </Box>
