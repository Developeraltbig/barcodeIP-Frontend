import React, { useMemo } from 'react';
import { Box, Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { History as HistoryIcon, Link as LinkIcon, ChevronRight } from '@mui/icons-material';
import { useGetRecentThreeProjectsQuery, useGetSupportAnalystsQuery } from '../../features/userApi';
import { Container } from 'react-bootstrap';

// --- Helper: Date Formatter ---
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

// --- Reusable Sub-Component: ListItemRow ---
const ListItemRow = ({ item, isLastItem }) => (
  <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 15,
        py: 2.5,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
      }}
    >
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', mb: 0.5, lineHeight: 1.4 }}>
          {/* Fallback to 'Project Name' if title is missing */}
          {item.project_title || item.title || 'Untitled Project'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#E94E34', fontWeight: 500 }}>
          Case ID: {item.project_id || 'N/A'}
        </Typography>
        {item.message && (
          <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5 }}>
            {item.message}
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

// --- Reusable Sub-Component: WidgetCard ---
const WidgetCard = ({ title, icon: Icon, data, isLoading, error }) => {

  console.log(data)
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        height: '100%',
        minHeight: '200px', // Ensure height for loader
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Icon sx={{ color: '#E94E34' }} />
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#E94E34' }}>
          {title}
        </Typography>
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
          <CircularProgress size={30} sx={{ color: '#E94E34' }} />
        </Box>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          Failed to load data.
        </Typography>
      )}

      {/* Empty State */}
      {!isLoading && !error && (!data || data.length === 0) && (
        <Typography variant="body2" sx={{ mt: 2, color: '#9CA3AF' }}>
          No records found.
        </Typography>
      )}

      {/* Data List */}
      {!isLoading && !error && data && (
        <Box>
          {data.map((item, index) => (
            <ListItemRow 
              key={item._id || item.id || index} 
              item={item} 
              isLastItem={index} 
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};

// Inside your WidgetCard.js
// const WidgetCard = ({ data, isLoading, title, icon: Icon }) => {
//   return (
//     <Paper sx={{ p: 3, borderRadius: 3 }}>
//       <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
//         <Icon sx={{ color: '#ef4444' }} />
//         <Typography variant="h6">{title}</Typography>
//       </Stack>

//       {isLoading ? (
//         <CircularProgress size={24} />
//       ) : data && data.length > 0 ? (
//         data.map((item) => (
//           <Box key={item._id || item.id}>
//              {/* Render your item content */}
//              <Typography>{item.name || item.title}</Typography>
//           </Box>
//         ))
//       ) : (
//         <Box sx={{ py: 2, textAlign: 'center', opacity: 0.5 }}>
//           <Typography variant="body2">No data found</Typography>
//         </Box>
//       )}
//     </Paper>
//   );
// };

// --- Main Component ---


const DashboardWidgets = () => {
  // 1. Hook Calls
  const { data: getRecentThreeProjects, isLoading: loadingProjects } = useGetRecentThreeProjectsQuery();
  
  // Notice the syntax -> { data: YOUR_ALIAS_NAME }
  const { data: AnalystData, isLoading: loadingAnalysts, isError } = useGetSupportAnalystsQuery({ 
      page: 1, 
      limit: 10 
  });

  // 2. Memoized Project Data
  const projects = useMemo(() => {
    if (!getRecentThreeProjects) return [];
    // Adjust based on your backend response key
    return getRecentThreeProjects.projects || getRecentThreeProjects.data || (Array.isArray(getRecentThreeProjects) ? getRecentThreeProjects : []);
  }, [getRecentThreeProjects]);

  // 3. Memoized Analyst Data
  const latestAnalyst = useMemo(() => {
    if (!AnalystData) return [];
    return AnalystData.data || AnalystData.analysts || (Array.isArray(AnalystData) ? AnalystData : []);
  }, [AnalystData]);

  // 4. Debugging
  console.log("Analyst API Response:", AnalystData);
  // console.log("Processed Analyst List:", latestAnalyst);

  return (
    <Box sx={{ bgcolor: '#F3F4F6', py: 5 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          
          {/* SEARCH HISTORY WIDGET */}
          <Grid item xs={12} md={6}>
            <WidgetCard 
              title="Search History" 
              icon={HistoryIcon} 
              data={projects} 
              isLoading={loadingProjects}
            />
          </Grid>

          {/* ANALYST CONNECTIONS WIDGET */}
          <Grid item xs={12} md={6}>
            <WidgetCard 
              title="Connected with an Analyst" 
              icon={LinkIcon} 
              data={latestAnalyst} 
              isLoading={loadingAnalysts}
              error={isError}
            />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};
export default DashboardWidgets;