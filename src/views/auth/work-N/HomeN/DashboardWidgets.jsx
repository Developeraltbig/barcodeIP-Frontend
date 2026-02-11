import React from 'react';
import { Box, Grid, Paper, Typography, Divider, Container } from '@mui/material';
import { History as HistoryIcon, Link as LinkIcon, ChevronRight } from '@mui/icons-material';

// --- MOCK DATA ---
const searchHistoryData = [
  { id: 1, title: '1. Field of Invention The invention falls within the field o...', caseId: '003', date: '03 Dec 2025' },
  { id: 2, title: 'State machine methods and apparatus improve comput...', caseId: '002', date: '28 Nov 2025' },
  { id: 3, title: 'A security platform employs a variety techniques and ...', caseId: '001', date: '13 Nov 2025' }
];

const analystData = [
  { id: 1, title: 'State machine methods and apparatus improve comput...', caseId: '002', date: '28 Nov 2025', message: 'Hi' }
];

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
          {item.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#E94E34', fontWeight: 500 }}>
          Case ID: {item.caseId}
        </Typography>
        {item.message && (
          <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5 }}>
            {item.message}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 0.5 }}>
        <Typography variant="caption" sx={{ color: '#9CA3AF', whiteSpace: 'nowrap' }}>
          {item.date}
        </Typography>
        <ChevronRight sx={{ color: '#9CA3AF' }} />
      </Box>
    </Box>
    {!isLastItem && <Divider />}
  </>
);

// --- Reusable Sub-Component: WidgetCard ---
const WidgetCard = ({ title, icon: Icon, data }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      height: '100%',
      bgcolor: '#fff'
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
      <Icon sx={{ color: '#E94E34' }} />
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#E94E34' }}>
        {title}
      </Typography>
    </Box>
    <Box>
      {data.map((item, index) => (
        <ListItemRow key={item.id} item={item} isLastItem={index === data.length - 1} />
      ))}
    </Box>
  </Paper>
);

// --- Main Component ---
const DashboardWidgets = () => {
  return (
    <Box sx={{ bgcolor: '#F3F4F6', py: 5 }}>
      <Container maxWidth="lg">
        {/* THIS IS THE 'ONE ROW' CONTAINER */}
        <Grid container spacing={4}>
          {/* 
            COLUMN 1 (LEFT SIDE): 
            - It takes up 100% width on mobile (xs={12}).
            - It takes up 50% width on desktop (md={6}).
          */}
          <Grid item xs={12} md={6}>
            <WidgetCard title="Search History" icon={HistoryIcon} data={searchHistoryData} />
          </Grid>

          {/* 
            COLUMN 2 (RIGHT SIDE): 
            - It also takes up 50% width on desktop (md={6}).
            - Since the row is now full (50% + 50% = 100%), these two columns will sit side-by-side.
          */}
          <Grid item xs={12} md={6}>
            <WidgetCard title="Connected with an Analyst" icon={LinkIcon} data={analystData} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardWidgets;
