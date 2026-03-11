import React, { useMemo } from 'react';
import { Box, Grid, Paper, Typography, Divider, CircularProgress, Container } from '@mui/material';
import { History as HistoryIcon, Link as LinkIcon, ChevronRight } from '@mui/icons-material';
import { useGetRecentThreeProjectsQuery, useGetSupportAnalystsQuery } from '../../features/userApi';
import { useNavigate } from 'react-router-dom';

// --- Helper: Date Formatter ---
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  
};


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
          '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }, // Slightly darker hover
          
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


// --- Main Component ---

const WidgetCard = ({ title, icon: Icon, data, isLoading, error, isAnalystWidget }) => {
  // Logic to determine if we have any valid analyst connections
  const hasAnalystConnections = useMemo(() => {
    if (!data || data.length === 0) return false;
    // Check if at least one project has a message from an analyst
    return data.some(item => item.analyst_record?.message);
  }, [data]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '5px',
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

      {/* Logic for Empty States */}
      {!isLoading && !error && (
        <Box>
          {/* CASE 1: It's the Analyst Widget but NO records have a message 
          */}
          {isAnalystWidget && !hasAnalystConnections ? (
            <Typography variant="body2" sx={{ mt: 2, color: '#9CA3AF', fontStyle: 'italic' }}>
              You did not connect to any analytics yet!
            </Typography>
          ) : 
          
          /* CASE 2: General Empty State (No projects at all) 
          */
          (!data || data.length === 0) ? (
            <Typography variant="body2" sx={{ mt: 2, color: '#9CA3AF' }}>
              No records found.
            </Typography>
          ) : (
            
            /* CASE 3: Render the list 
            */
            <Box>
              {data.map((item, index) => {
                // If it's the analyst widget, we only want to show rows that actually have messages
                if (isAnalystWidget && !item.analyst_record?.message) {
                  return null;
                }

                return (
                  <ListItemRow 
                    key={item._id || item.id || index} 
                    item={item} 
                    isLastItem={index === data.length - 1} 
                    showAnalystMessage={isAnalystWidget} 
                  />
                );
              })}
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

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
    <Container maxWidth="xl" >
       <Grid
          container
          columns={{ xs: 4, sm: 6, md: 12 }}
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'stretch', // Ensures both cards have equal height if content differs
            pb: 4, // Adds some vertical padding
            px: { xs: 2, md: 0 }, // Padding on mobile, none on desktop
          }}
        >
          {/* SEARCH HISTORY WIDGET */}
          <Grid
            item
            size={{ xs: 12, md: 6 }}
          >
            <WidgetCard title="Search History" icon={HistoryIcon} data={projects} isLoading={loadingProjects} isAnalystWidget={false}  />
          </Grid>

          {/* ANALYST CONNECTIONS WIDGET */}
          <Grid item size={{ xs: 12, md: 6 }} >
            
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


   
  );
};

export default DashboardWidgets;