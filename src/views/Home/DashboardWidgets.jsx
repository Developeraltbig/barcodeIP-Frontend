import React from 'react';
import { Box, Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { History as HistoryIcon, Link as LinkIcon, ChevronRight } from '@mui/icons-material';
// import { useConnectAnalystQuery, useGetRecentThreeProjectsQuery, useConnectAnalystQuery } from '../../features/userApi';

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
        gap: 2,
        py: 2.5,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
      }}
    >
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', mb: 0.5, lineHeight: 1.4 }}>
          {/* Fallback to 'Project Name' if title is missing */}
          {item.projectName || item.title || 'Untitled Project'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#E94E34', fontWeight: 500 }}>
          Case ID: {item.caseId || 'N/A'}
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
        bgcolor: '#fff',
        minHeight: '200px' // Ensure height for loader
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
              isLastItem={index === data.length - 1} 
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};

// --- Main Component ---
const DashboardWidgets = () => {
  // 1. Fetch "Search History" using Recent Projects API
  // const { 
  //   data: recentProjects, 
  //   isLoading: loadingProjects, 
  //   error: errorProjects 
  // } = useGetRecentThreeProjectsQuery();

  // // // 2. Fetch "Analyst Connections" 
  // // // (Using the new hook created in userApi, or reusing another if stricture allows)
  // const { 
  //   data: analystConnections, 
  //   isLoading: loadingAnalyst, 
  //   error: errorAnalyst 
  // } = useConnectAnalystQuery (); 

  // Note: If your API response is nested (e.g., response.data.projects), 
  // you might need to access `recentProjects?.data` below.

  console.log(data)

  return (
    <Box sx={{ bgcolor: '#F3F4F6', py: 5 }}>
      <Box>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          
          {/* SEARCH HISTORY WIDGET */}
          <Grid item xs={12} md={6}>
            <WidgetCard 
              title="Search History" 
              icon={HistoryIcon} 
              data={recentProjects} // Pass the API data directly
              isLoading={loadingProjects}
              error={errorProjects}
            />
          </Grid>

          {/* ANALYST CONNECTIONS WIDGET */}
          <Grid item xs={12} md={6}>
            <WidgetCard 
              title="Connected with an Analyst" 
              icon={LinkIcon} 
              data={analystConnections} 
              isLoading={loadingAnalyst}
              error={errorAnalyst}
            />
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardWidgets;