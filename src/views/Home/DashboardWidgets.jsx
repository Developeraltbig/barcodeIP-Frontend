import React, { useMemo, useState } from 'react';
import { Box, Grid, Paper, Typography, Divider, CircularProgress, Container } from '@mui/material';
import {
  History as HistoryIcon,
  Link as LinkIcon,
  ChevronRight,
  DescriptionOutlined as DescriptionOutlinedIcon
} from '@mui/icons-material';
import { useGetRecentThreeProjectsQuery, useGetSupportAnalystsQuery } from '../../features/userApi';
import { useNavigate } from 'react-router-dom';
import AnalystReviewModal from '../components/AnalystReviewModal';

// ==========================================
// FORMATTERS
// ==========================================

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatAnalystDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
};

// ==========================================
// ORIGINAL COMPONENTS (Search History - UNTOUCHED UI)
// ==========================================

const ListItemRow = ({ item, isLastItem, showAnalystMessage }) => {
  const navigate = useNavigate();
  const projectId = item._id || item.id;

  const handleRedirection = () => {
    if (projectId) {
      navigate(`/result/${projectId}`);
    } else {
      console.warn('Project ID not found for item:', item);
    }
  };

  return (
    <>
      <Box
        onClick={handleRedirection}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          py: 2.5,
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': { bgcolor: '#fdfdfd' }
        }}
      >
        {/* LEFT CONTENT */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            noWrap
            sx={{
              fontWeight: 600,
              color: '#374151',
              mb: 0.5,
              fontSize: '0.95rem'
            }}
          >
            {item.project_title || item.title || 'Untitled Project'}
          </Typography>

          <Typography
            variant="body2"
            noWrap
            sx={{
              color: '#9CA3AF',
              fontFamily: 'monospace',
              letterSpacing: '0.5px',
              fontSize: '0.85rem'
            }}
          >
            { `CASE ID - ${item.case_id || item._id ? (item.case_id || item._id).split('-').pop() : 'N/A'}`}
          </Typography>

          {showAnalystMessage && item.analyst_record?.message && (
            <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5, fontSize: '0.85rem' }}>
              {item.analyst_record.message}
            </Typography>
          )}
        </Box>

        {/* RIGHT CONTENT (DATE + ARROW) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              color: '#9ca3af',
              fontSize: '0.85rem',
              fontWeight: 500,
              whiteSpace: 'nowrap'
            }}
          >
            {formatDate(item.createdAt || item.date)}
          </Typography>

          <ChevronRight sx={{ color: '#d1d5db', fontSize: '1.2rem' }} />
        </Box>
      </Box>

      {!isLastItem && <Divider sx={{ borderColor: '#f8f9fa' }} />}
    </>
  );
};

const WidgetCard = ({ icon: Icon, data, isLoading, error, isAnalystWidget }) => {
  const hasAnalystConnections = useMemo(() => {
    if (!data || data.length === 0) return false;
    return data.some((item) => item.analyst_record?.message);
  }, [data]);

  const latestData = useMemo(() => {
    if (!data) return [];
    const filteredData = isAnalystWidget ? data.filter((item) => item.analyst_record?.message) : data;
    return filteredData.slice(-3).reverse();
  }, [data, isAnalystWidget]);

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '5px', border: '1px solid #E5E7EB', height: '100%', minHeight: '200px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <DescriptionOutlinedIcon sx={{ color: '#E94E34' }} />
        <Typography sx={{ fontWeight: 700, color: '#374151', fontSize: '1.05rem' }}>Search History</Typography>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
          <CircularProgress size={30} sx={{ color: '#E94E34' }} />
        </Box>
      )}

      <Divider sx={{ borderColor: '#b1bac7', pt: '20px' }} />

      {error && !isLoading && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          Failed to load data.
        </Typography>
      )}

      {!isLoading && !error && (
        <Box>
          {isAnalystWidget && !hasAnalystConnections ? (
            <Typography variant="body2" sx={{ mt: 2, color: '#9CA3AF', fontStyle: 'italic' }}>
              You did not connect to any analytics yet!
            </Typography>
          ) : latestData.length === 0 ? (
            <Typography variant="body2" sx={{ mt: 2, color: '#9CA3AF' }}>
              No records found.
            </Typography>
          ) : (
            <Box>
              {latestData.map((item, index) => (
                <ListItemRow
                  key={item._id || item.id || index}
                  item={item}
                  isLastItem={index === latestData.length - 1}
                  showAnalystMessage={isAnalystWidget}
                />
              ))}
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

// ==========================================
// NEW COMPONENTS (Analyst Reviews - Exact Match UI)
// ==========================================

const StatusBadge = ({ index, statusText }) => {
  let config = { bg: '#fef3c7', text: '#d97706', dot: '#f59e0b', label: 'Pending' }; // Yellow Default

  if (statusText.includes('inReview')) {
    config = { bg: '#e0f2fe', text: '#0284c7', dot: '#3b82f6', label: 'inReview' }; // Blue
  } else if (statusText.includes('completed')) {
    config = { bg: '#dcfce7', text: '#15803d', dot: '#22c55e', label: 'Completed' }; // Green
  } else if (statusText) {
    config.label = statusText;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, bgcolor: config.bg, px: 1.5, py: 0.5, borderRadius: '16px' }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: config.dot }} />
      <Typography sx={{ color: config.text, fontSize: '0.75rem', fontWeight: 600 }}>{config.label}</Typography>
    </Box>
  );
};

// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================
const DashboardWidgets = () => {
  // --- REAL DATA FOR SEARCH HISTORY ---
  const { data: getRecentThreeProjects, isLoading: loadingProjects } = useGetRecentThreeProjectsQuery();

  const projects = useMemo(() => {
    if (!getRecentThreeProjects) return [];
    return (
      getRecentThreeProjects.projects ||
      getRecentThreeProjects.data ||
      (Array.isArray(getRecentThreeProjects) ? getRecentThreeProjects : [])
    );
  }, [getRecentThreeProjects]);

  console.log('analyst--->', projects);

  // --- REAL DATA FOR ANALYST REVIEWS ---
  const { data: supportAnalystsData, isLoading: loadingAnalysts, error: errorAnalysts } = useGetSupportAnalystsQuery();

  const analystProjects = useMemo(() => {
    if (!supportAnalystsData) return [];
    const data =
      supportAnalystsData.projects || supportAnalystsData.data || (Array.isArray(supportAnalystsData) ? supportAnalystsData : []);

    // Filter out items where analystStatus is equal to 'notrequested'
    const filteredData = data.filter((item) => item.analystStatus?.toLowerCase() !== 'notrequested');

    // Limit to showing only 3 recent analysts
    return filteredData.slice(-3).reverse();
  }, [supportAnalystsData]);

  // Modal state
  const [selectedReview, setSelectedReview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (review) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReview(null);
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
      <Grid
        container
        columns={{ xs: 4, sm: 6, md: 12 }}
        spacing={3}
        sx={{
          justifyContent: 'center',
          alignItems: 'stretch',
          pb: 4,
          px: { xs: 2, md: 0 }
        }}
      >
        {/* Search History */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <WidgetCard icon={HistoryIcon} data={projects} isLoading={loadingProjects} isAnalystWidget={false} />
        </Grid>

        {/* Analyst Reviews with modal trigger */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ borderRadius: '5px', border: '1px solid #f0f0f0', height: '100%', minHeight: '200px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DescriptionOutlinedIcon sx={{ color: '#E94E34' }} />
                <Typography sx={{ fontWeight: 700, color: '#374151', fontSize: '1.05rem' }}>Analyst Reviews</Typography>
              </Box>
              {analystProjects.filter(
                (item) => item.status && (item.status.toLowerCase().includes('pending') || item.status.toLowerCase().includes('review'))
              ).length > 0 && (
                <Box
                  sx={{
                    bgcolor: '#fff0ed',
                    color: '#e94e34',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  {
                    analystProjects.filter(
                      (item) =>
                        item.status && (item.status.toLowerCase().includes('pending') || item.status.toLowerCase().includes('review'))
                    ).length
                  }{' '}
                  Active
                </Box>
              )}
            </Box>

            <Divider sx={{ borderColor: '#b1bac7' }} />

            <Box sx={{ px: 2.5, pb: 1 }}>
              {loadingAnalysts ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                  <CircularProgress size={30} sx={{ color: '#E94E34' }} />
                </Box>
              ) : errorAnalysts ? (
                <Typography variant="body2" color="error" sx={{ my: 4, textAlign: 'center' }}>
                  Failed to load data.
                </Typography>
              ) : analystProjects.length === 0 ? (
                <Typography variant="body2" sx={{ my: 4, color: '#9CA3AF', textAlign: 'center', fontStyle: 'italic' }}>
                  You have not connected to an analyst yet!
                </Typography>
              ) : (
                analystProjects.map((item, index) => (
                  <Box
                    key={item._id || item.id || index}
                    onClick={() => openModal(item)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                      py: 2.5,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: '#fdfdfd' },
                      borderBottom: index !== analystProjects.length - 1 ? '1px solid #f8f9fa' : 'none'
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body1" noWrap sx={{ fontWeight: 600, color: '#374151', mb: 0.5, fontSize: '0.95rem' }}>
                        {item.project_title || item.title || 'Untitled Project'}
                      </Typography>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{
                          color: '#9CA3AF',
                          fontFamily: 'monospace',
                          letterSpacing: '0.5px',
                          fontSize: '0.85rem'
                        }}
                      >
                        { `CASE ID - ${item.case_id || item._id ? (item.case_id || item._id).split('-').pop() : 'N/A'}`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 }, flexShrink: 0 }}>
                      <StatusBadge index={index} statusText={item.status || item.analystStatus} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
                          {formatAnalystDate(item.createdAt || item.date)}
                        </Typography>
                        <ChevronRight sx={{ color: '#d1d5db', fontSize: '1.2rem' }} />
                      </Box>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Analyst Review Modal */}
      <AnalystReviewModal open={modalOpen} onClose={closeModal} review={selectedReview} />
    </Container>
  );
};

export default DashboardWidgets;
