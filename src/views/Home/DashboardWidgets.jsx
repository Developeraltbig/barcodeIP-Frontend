// import React, { useMemo } from 'react';
// import { Box, Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
// import { History as HistoryIcon, Link as LinkIcon, ChevronRight } from '@mui/icons-material';
// import { useGetRecentThreeProjectsQuery, useGetSupportAnalystsQuery } from '../../features/userApi';
// import { Container } from 'react-bootstrap';

// // --- Helper: Date Formatter ---
// const formatDate = (dateString) => {
//   if (!dateString) return '';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
// };

// // --- Reusable Sub-Component: ListItemRow ---
// const ListItemRow = ({ item, isLastItem }) => (
//   <>

//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         gap: 15,
//         py: 2.5,
//         cursor: 'pointer',
//         transition: 'background-color 0.2s',
//         '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
//       }}

      
//     >
//         {console.log("item", item.analyst_record.message)}
//       <Box>
//         <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', mb: 0.5, lineHeight: 1.4 }}>
//           {/* Fallback to 'Project Name' if title is missing */}
//           {item.project_title || item.title || 'Untitled Project'}
//         </Typography>
//         <Typography variant="body2" sx={{ color: '#E94E34', fontWeight: 500 }}>
//           Case ID: {item.project_id || 'N/A'}
//         </Typography>
//         {item.analyst_record.message && (
//           <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5 }}>
//             {item.analyst_record.message}
//           </Typography>
//         )}
//       </Box>
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 0.5 }}>
//         <Typography variant="caption" sx={{ color: '#9CA3AF', whiteSpace: 'nowrap' }}>
//           {formatDate(item.createdAt || item.date)}
//         </Typography>
//         <ChevronRight sx={{ color: '#9CA3AF' }} />
//       </Box>
//     </Box>
//     {!isLastItem && <Divider />}
//   </>
// );

// // --- Reusable Sub-Component: WidgetCard ---
// const WidgetCard = ({ title, icon: Icon, data, isLoading, error }) => {

//   console.log(data)
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: 3,
//         borderRadius: '12px',
//         border: '1px solid #E5E7EB',
//         height: '100%',
//         minHeight: '200px', // Ensure height for loader
//       }}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
//         <Icon sx={{ color: '#E94E34' }} />
//         <Typography variant="h6" sx={{ fontWeight: 700, color: '#E94E34' }}>
//           {title}
//         </Typography>
//       </Box>

//       {/* Loading State */}
//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
//           <CircularProgress size={30} sx={{ color: '#E94E34' }} />
//         </Box>
//       )}

//       {/* Error State */}
//       {error && !isLoading && (
//         <Typography variant="body2" color="error" sx={{ mt: 2 }}>
//           Failed to load data.
//         </Typography>
//       )}

//       {/* Empty State */}
//       {!isLoading && !error && (!data || data.length === 0) && (
//         <Typography variant="body2" sx={{ mt: 2, color: '#9CA3AF' }}>
//           No records found.
//         </Typography>
//       )}

//       {/* Data List */}
//       {!isLoading && !error && data && (
//         <Box>
//           {data.map((item, index) => (
//             <ListItemRow 
//               key={item._id || item.id || index} 
//               item={item} 
//               isLastItem={index} 
//             />
//           ))}
//         </Box>
//       )}
//     </Paper>
//   );
// };

// // Inside your WidgetCard.js
// // const WidgetCard = ({ data, isLoading, title, icon: Icon }) => {
// //   return (
// //     <Paper sx={{ p: 3, borderRadius: 3 }}>
// //       <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
// //         <Icon sx={{ color: '#ef4444' }} />
// //         <Typography variant="h6">{title}</Typography>
// //       </Stack>

// //       {isLoading ? (
// //         <CircularProgress size={24} />
// //       ) : data && data.length > 0 ? (
// //         data.map((item) => (
// //           <Box key={item._id || item.id}>
// //              {/* Render your item content */}
// //              <Typography>{item.name || item.title}</Typography>
// //           </Box>
// //         ))
// //       ) : (
// //         <Box sx={{ py: 2, textAlign: 'center', opacity: 0.5 }}>
// //           <Typography variant="body2">No data found</Typography>
// //         </Box>
// //       )}
// //     </Paper>
// //   );
// // };

// // --- Main Component ---


// const DashboardWidgets = () => {
//   // 1. Hook Calls
//   const { data: getRecentThreeProjects, isLoading: loadingProjects } = useGetRecentThreeProjectsQuery();
  
//   // Notice the syntax -> { data: YOUR_ALIAS_NAME }
//   // CORRECT: Destructure 'data' and rename it to 'AnalystData'
//   // const { data: AnalystData, isLoading: loadingAnalysts, isError } = useGetSupportAnalystsQuery();


//   // 2. Memoized Project Data
//   const projects = useMemo(() => {
//     if (!getRecentThreeProjects) return [];
//     // Adjust based on your backend response key
//     return getRecentThreeProjects.projects || getRecentThreeProjects.data || (Array.isArray(getRecentThreeProjects) ? getRecentThreeProjects : []);
//   }, [getRecentThreeProjects]);



//   // 4. Debugging
//   console.log("Analyst API Response:", projects.analyst_record);
//   // console.log("Processed Analyst List:", latestAnalyst);

//   return (
//     <Box sx={{ bgcolor: '#F3F4F6', py: 5 }}>
//       <Container maxWidth="xl">
//         <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          
//           {/* SEARCH HISTORY WIDGET */}
//           <Grid item xs={12} md={6}>
//             <WidgetCard 
//               title="Search History" 
//               icon={HistoryIcon} 
//               data={projects} 
//               isLoading={loadingProjects}
//             />
//           </Grid>

//           {/* ANALYST CONNECTIONS WIDGET */}
//           <Grid item xs={12} md={6}>
//             <WidgetCard 
//               title="Connected with an Analyst" 
//               icon={LinkIcon} 
//               data={projects} 
//               // isLoading={loadingAnalysts}
//               // error={isError}
//             />
//           </Grid>

//         </Grid>
//       </Container>
//     </Box>
//   );
// };
// export default DashboardWidgets;










import React, { useMemo } from 'react';
import { Box, Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { History as HistoryIcon, Link as LinkIcon, ChevronRight } from '@mui/icons-material';
import { useGetRecentThreeProjectsQuery, useGetSupportAnalystsQuery } from '../../features/userApi';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// --- Helper: Date Formatter ---
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  
};

// const ListItemRow = ({ item, isLastItem, showAnalystMessage }) => (

//   <>
//     <Box
//       sx={{
//         display: 'flex',
//         // Sets column for mobile, row for tablet/desktop
//         flexDirection: { xs: 'column', sm: 'row' },
//         justifyContent: 'space-between',
//         // Aligns items to the start in column mode, or centers them in row mode if preferred
//         alignItems: { xs: 'flex-start', sm: 'center' },
//         gap: 2,
//         py: 2.5,
//         cursor: 'pointer',
//         transition: 'background-color 0.2s',
//         '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
//       }}
//     >
//       <Box>
//         <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', mb: 0.5, lineHeight: 1.4 }}>
//           {item.project_title || item.title || 'Untitled Project'}
//         </Typography>

//         <Typography variant="body2" sx={{ color: '#E94E34', fontWeight: 500 }}>
//           Case ID: {item.project_id || 'N/A'}
//           {/* {console.log("kgjhfj",item)} */}
//         </Typography>

//         {/* LOGIC: Only show message if:
//            1. This is an Analyst Widget (showAnalystMessage is true)
//            2. The analyst_record and message actually exist (using Optional Chaining ?.)
//         */}
//         {showAnalystMessage && item.analyst_record?.message && (
//           <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5 }}>
//             {item.analyst_record.message} 
            
//           </Typography>
//         )}
        
//       </Box>

//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 0.5 }} onClick={() =>  navigate(`/result/${projectId}`)}>
//         <Typography variant="caption" sx={{ color: '#9CA3AF', whiteSpace: 'nowrap' }}>
//           {formatDate(item.createdAt || item.date)}
//         </Typography>
//         <ChevronRight sx={{ color: '#9CA3AF' }} />
//       </Box>
//     </Box>
//     {!isLastItem && <Divider />}
//   </>
// );

// --- Reusable Sub-Component: WidgetCard ---

const ListItemRow = ({ item, isLastItem, showAnalystMessage }) => {
  const navigate = useNavigate();
  
  // Safely get the ID (check both _id and id depending on your API)
  const projectId = item._id || item.id;

  const handleRedirection = () => {
    if (projectId) {
      navigate(`/result/${projectId}`);
    } else {
      console.warn("Project ID not found for item:", item);
    }
  };

  return (
    <>
      <Box
        onClick={handleRedirection} // Entire row is now clickable for better UX
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          py: 2.5,
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } // Slightly darker hover
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', mb: 0.5, lineHeight: 1.4 }}>
            {item.project_title || item.title || 'Untitled Project'}
          </Typography>

          <Typography variant="body2" sx={{ color: '#E94E34', fontWeight: 500 }}>
            Case ID: {item.project_id || 'N/A'}
          </Typography>

          {showAnalystMessage && item.analyst_record?.message && (
            <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5 }}>
              {item.analyst_record.message} 
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 0.5 }}>
          <Typography variant="caption" sx={{ color: '#9CA3AF', whiteSpace: 'nowrap' }}>
            {formatDate(item.createdAt || item.date)}
          </Typography>
          <ChevronRight sx={{ color: '#9CA3AF' }} />
        </Box>
      </Box>
      {!isLastItem && <Divider />}
    </>
  );
};


const WidgetCard = ({ title, icon: Icon, data, isLoading, error, isAnalystWidget }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        height: '100%',
        minHeight: '200px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Icon sx={{ color: '#E94E34' }} />
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#E94E34' }}>
          {title}
        </Typography>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
          <CircularProgress size={30} sx={{ color: '#E94E34' }} />
        </Box>
      )}

      {error && !isLoading && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          Failed to load data.
        </Typography>
      )}

      {!isLoading && !error && (!data || data.length === 0) && (
        <Typography variant="body2" sx={{ mt: 2, color: '#9CA3AF' }}>
          No records found.
        </Typography>
      )}

      {!isLoading && !error && data && (
        <Box>
          {data.map((item, index) => (
            <ListItemRow 
              key={item._id || item.id || index} 
              item={item} 
              isLastItem={index === data.length - 1} 
              showAnalystMessage={isAnalystWidget} // Pass the flag down
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};

// --- Main Component ---
const DashboardWidgets = () => {
  // 1. Hook Calls
  const { data: getRecentThreeProjects, isLoading: loadingProjects } = useGetRecentThreeProjectsQuery();
  
  // NOTE: If you decide to use the actual Analyst API later, uncomment this:
  // const { data: AnalystData, isLoading: loadingAnalysts } = useGetSupportAnalystsQuery();

  // 2. Memoized Project Data
  const projects = useMemo(() => {
    if (!getRecentThreeProjects) return [];
    return getRecentThreeProjects.projects || getRecentThreeProjects.data || (Array.isArray(getRecentThreeProjects) ? getRecentThreeProjects : []);
  }, [getRecentThreeProjects]);

 

  return (
    <Box sx={{ bgcolor: '#F3F4F6', py: 5 }}>
      <Container maxWidth="xl">
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={4}
          sx={{
            justifyContent: 'center',
            alignItems: 'stretch', // Ensures both cards have equal height if content differs
            py: 4, // Adds some vertical padding
            px: { xs: 2, md: 0 }, // Padding on mobile, none on desktop
            flexWrap:'wrap'
          }}
        >
          {/* SEARCH HISTORY WIDGET */}
          <Grid
            item
            size={{ xs: 6, md: 6 }}
          >
            <WidgetCard title="Search History" icon={HistoryIcon} data={projects} isLoading={loadingProjects} isAnalystWidget={false}  />
          </Grid>

          {/* ANALYST CONNECTIONS WIDGET */}
          <Grid item size={{ xs: 6, md: 6 }} >
            
            <WidgetCard
              title="Connected with an Analyst"
              icon={LinkIcon}
              data={projects}
              isLoading={loadingProjects}
              isAnalystWidget={true}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardWidgets;