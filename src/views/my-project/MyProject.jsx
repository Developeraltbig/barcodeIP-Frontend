import React, { lazy, useMemo, useState } from 'react';
import Loadable from 'components/Loadable';
import {
  Box,
  Typography,
  Button,
  Card,
  Divider,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Stack,
  Chip,
  alpha,
  Container
} from '@mui/material';
import {
  ChevronRight,
  CalendarTodayOutlined,
  GridViewOutlined,
  PersonAddAltOutlined,
  AccessTime,
  CheckCircleOutline
} from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// --- API & Slice Imports (Unchanged) ---
import { useFetchAllProjectsQuery } from '../../features/userApi';
import { setSelectedProject } from '../../features/slice/userSlice';
const RequestReviewModal = Loadable(lazy(() => import('../components/RequestReviewModal')));

// ==========================================
// HELPER COMPONENTS & FORMATTERS
// ==========================================

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const AnalystReviewBadge = ({ index ,status, onActionClick }) => {
  let config;

  console.log("cnfig-->",config)
  console.log("status-->",status)

  switch (status) {
    case "notRequested":
      config = {
        mainColor: "#EF4444",
        bg: "#FEF2F2",
        icon: <PersonAddAltOutlined sx={{ fontSize: 18 }} />,
        text: "Request Review",
        isClickable: true
      };
      break;
    case "pending":
      config = {
        mainColor: "#F59E0B",
        bg: "#FFFBEB",
        icon: <AccessTime sx={{ fontSize: 18 }} />,
        text: "Review Pending",
        isClickable: false
      };
      break;
    case "inreview":
      config = {
        mainColor: "#3B82F6",
        bg: "#EFF6FF",
        icon: <AccessTime sx={{ fontSize: 18 }} />,
        text: "In Review",
        isClickable: false
      };
      break;
    case "completed":
      config = {
        mainColor: "#10B981",
        bg: "#ECFDF5",
        icon: <CheckCircleOutline sx={{ fontSize: 18 }} />,
        text: "Review Complete",
        isClickable: false
      };
      break;
    default:
      config = {
        mainColor: "#64748B",
        bg: "#F1F5F9",
        icon: null,
        text: "Unknown",
        isClickable: false
      };
  }

  const commonStyles = {
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    bgcolor: config.bg,
    color: config.mainColor,
    px: 2,
    py: 1,
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "0.85rem",
    border: `1px solid ${alpha(config.mainColor, 0.2)}`,
    width: { xs: "100%", md: "auto" },
    justifyContent: { xs: "center", md: "flex-start" }
  };

  if (config.isClickable) {
    return (
      <Button
        onClick={onActionClick}
        disableElevation
        sx={{
          ...commonStyles,
          textTransform: "none",
          "&:hover": {
            bgcolor: alpha(config.mainColor, 0.1),
            borderColor: alpha(config.mainColor, 0.4)
          }
        }}
      >
        {config.icon}
        {config.text}
      </Button>
    );
  }

  return (
    <Box sx={commonStyles}>
      {config.icon}
      {config.text}
    </Box>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const MyProject = () => {
  // --- NEW STATE FOR MODAL ---
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [projectToReview, setProjectToReview] = useState(null);

  // --- LOGIC (Untouched) ---
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data: projectsData, isLoading, isError, refetch } = useFetchAllProjectsQuery();

  const projects = useMemo(() => {
    if (!projectsData) return [];
    return projectsData.projects || projectsData.data || (Array.isArray(projectsData) ? projectsData : []);
  }, [projectsData]);

  console.log('my project-->', projects);

  const handleViewMore = (project) => {
    const projectId = project._id;
    dispatch(setSelectedProject(project));
    navigate(`/result/${projectId}`);
  };

  // Function to handle opening the modal for a specific project row
  const handleOpenReviewModal = (project) => {
    setProjectToReview(project);
    setReviewModalOpen(true);
  };

  const handleRequestReview = async (project) => {
  await sendReviewRequest(project.id); // API call
  refetch(); // re-fetch projects to get updated analyst_status
};

  // --- RENDERING ---
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: '#F8FAFC' }}>
        <CircularProgress sx={{ color: '#E94E34' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10, minHeight: '80vh', bgcolor: '#F8FAFC' }}>
        <Typography color="error" variant="h6">
          Failed to load projects. Please refresh the page.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#F8FAFC', pt: { xs: 4, md: 8 }, pb: 8, marginTop: '50px' }}>
      <Container maxWidth="xl" sx={{ mx: 'auto', px: { xs: 2, sm: 4, md: 6 } }}>
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
              mb: 3,
              display: 'inline-flex',
              cursor: 'pointer',
              color: '#64748B',
              transition: 'color 0.2s',
              '&:hover': { color: '#0F172A' }
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Back
            </Typography>
          </Stack>

          <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ fontWeight: 800, color: '#0F172A', mb: 1, letterSpacing: '-0.5px' }}>
            My Projects
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', fontWeight: 400, fontSize: '1.1rem' }}>
            Manage and track your invention disclosures
          </Typography>
        </Box>

        {/* Projects List Card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            overflow: 'hidden',
            bgcolor: '#FFFFFF'
          }}
        >
          {/* Table Header (Desktop Only) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', px: 4, py: 2.5, borderBottom: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
              <Typography sx={{ width: '38%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px' }}>
                PROJECT NAME
              </Typography>
              <Typography sx={{ width: '15%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px' }}>
                CREATED
              </Typography>
              <Typography sx={{ width: '22%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px' }}>
                MODULES
              </Typography>
              <Typography sx={{ width: '15%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px', pl: 1 }}>
                ANALYST REVIEW
              </Typography>
              <Typography
                sx={{ width: '10%', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', letterSpacing: '1px', textAlign: 'right' }}
              >
                ACTION
              </Typography>
            </Box>
          )}

          {/* Project Rows */}
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <Box key={project.project_id || project.id || index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    p: { xs: 3, md: 4 },
                    gap: { xs: 3, md: 0 },
                    transition: 'all 0.2s ease',
                    '&:hover': { bgcolor: '#F8FAFC', boxShadow: 'inset 4px 0 0 0 #E94E34' }
                  }}
                >
                  <Box sx={{ width: { xs: '100%', md: '38%' }, pr: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', lineHeight: 1.4, mb: 1, fontSize: '1.05rem' }}>
                      {project.project_title || project.projectName || 'Untitled Project'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <GridViewOutlined sx={{ fontSize: 16, color: '#94A3B8' }} />
                      <Typography
                        variant="caption"
                        sx={{ color: '#64748B', fontFamily: 'monospace', letterSpacing: '0.5px', fontSize: '0.85rem' }}
                      >
                        {project.project_id || project.id || 'SudYvi25rnx7_DOVEz8h'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: { xs: '100%', md: '15%' } }}>
                    {isMobile && (
                      <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 1 }}>
                        CREATED
                      </Typography>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayOutlined sx={{ fontSize: 18, color: '#94A3B8' }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                        {formatDate(project.createdAt)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: { xs: '100%', md: '22%' }, display: 'flex', flexWrap: 'wrap', gap: 1, pr: 2 }}>
                    {Array.isArray(project?.module) && project.module.length > 0 ? (
                      project.module.map((mod, i) => (
                        <Chip
                          key={i}
                          label={mod}
                          size="small"
                          sx={{
                            bgcolor: '#F1F5F9',
                            color: '#475569',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            borderRadius: '6px',
                            border: '1px solid #E2E8F0'
                          }}
                        />
                      ))
                    ) : (
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        No Module
                      </Typography>
                    )}
                    {console.log(project.project_title)}
                  </Box>

                  {/* Column 4: Analyst Review Status */}
                  <Box sx={{ width: { xs: '100%', md: '15%' }, display: 'flex', justifyContent: 'flex-start' }}>
                    {isMobile && (
                      <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, display: 'block', mb: 1, width: '100%' }}>
                        ANALYST REVIEW
                      </Typography>
                    )}

                    {/* ---> PASS ONCLICK EVENT HERE <--- */}
                    <AnalystReviewBadge status={project.analyst_status  || 'notRequested' } onActionClick={() => handleOpenReviewModal(project)} />

                  </Box>

                  <Box
                    sx={{
                      width: { xs: '100%', md: '10%' },
                      display: 'flex',
                      justifyContent: { xs: 'flex-start', md: 'flex-end' },
                      mt: { xs: 1, md: 0 }
                    }}
                  >
                    <Button
                      fullWidth={isMobile}
                      onClick={() => handleViewMore(project)}
                      variant="contained"
                      disableElevation
                      endIcon={<ChevronRight />}
                      sx={{
                        bgcolor: '#E94E34',
                        color: 'white',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '8px',
                        py: 1,
                        px: 2,
                        transition: 'all 0.2s',
                        '&:hover': { bgcolor: '#D1432C', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(233, 78, 52, 0.2)' }
                      }}
                    >
                      View More
                    </Button>
                  </Box>
                </Box>
                {index !== projects.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
              </Box>
            ))
          ) : (
            <Box sx={{ p: 10, textAlign: 'center', bgcolor: '#FFFFFF' }}>
              <Typography variant="h6" sx={{ color: '#0F172A', fontWeight: 600, mb: 1 }}>
                No projects found
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748B' }}>
                Your invention disclosures will appear here once you create them.
              </Typography>
            </Box>
          )}
        </Card>
      </Container>

      {/* ---> ATTACH THE NEW MODAL HERE <--- */}
      <RequestReviewModal open={reviewModalOpen} onClose={() => setReviewModalOpen(false)} project={projectToReview} />
    </Box>
  );
};

export default MyProject;




