
import React, { useState, useEffect, lazy } from 'react';
import Loadable from 'components/Loadable';
import {
  Box, Container, Backdrop, Typography, Paper, InputBase,
  IconButton, Grid, Checkbox, Button, FormControlLabel, Switch, Collapse
} from '@mui/material';
import { Search as SearchIcon, CloudUploadOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// ---> ADDED REDUX IMPORTS <---
import { useDispatch } from 'react-redux';
import { setSelectedProject } from '../../features/slice/userSlice';
import { useCreateProjectMutation } from '../../features/userApi';

const AdvanceSearch = Loadable(lazy(() => import('./AdvanceSearch')));
const KeyFeatures = Loadable(lazy(() => import('./KeyFeatures')));

const LOADING_MESSAGES = ["Analyzing input...", "Extracting key features...", "Generating queries..."];

const InputSectionN = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['patent']);
  const [showAdvanceOption, setShowAdvanceOption] = useState(false);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [enableButton, setEnableButton] = useState(false);

  // ---> NEW STATE TO GUARANTEE FRESH DATA <---
  const [activeProject, setActiveProject] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createProject, { isLoading, isSuccess }] = useCreateProjectMutation();

  // --- CSS SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isLoading]);

  // --- Text Cycling Logic ---
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2000);
    } else {
      setMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const filters = [
    { label: 'Patent', value: 'patent' },
    { label: 'Publication', value: 'publish' },
    { label: 'Products', value: 'product' },
    { label: 'Provisional ', value: 'provisional' },
    { label: 'Non-Provisional ', value: 'nonProvisional' }
  ];

  // Reset and hide Advance Search if "Patent" is unchecked
  useEffect(() => {
    if (!selectedFilters.includes('patent')) {
      setAdvanceSearch(false);
    }
  }, [selectedFilters]);

  // --- HANDLE TEXT SUBMIT ---
  const handleGenerate = async () => {

    if (selectedFilters.length == 0) {
      alert('Please Select Service First');
      return;
    }
    if (!searchValue.trim()) {
      alert('Please describe your invention first!');
      return;
    }

    const formData = new FormData();
    formData.append('text', searchValue);
    selectedFilters.forEach((item) => formData.append('checked', item));

    try {
      const response = await createProject(formData).unwrap();

      const newProjectData = response?.data || response;
      const newProjectId = newProjectData?.project_id || newProjectData?.id || newProjectData?._id;

      // console.log("Newly Generated Project ID (Text):", newProjectId);
      setEnableButton(true)
      // SAVE DIRECTLY TO LOCAL STATE TO PREVENT CACHE ISSUES
      setActiveProject(newProjectData);

      // If patent is not checked, navigate directly to result page
      if (!selectedFilters.includes('patent') && newProjectId) {
        dispatch(setSelectedProject({
          ...newProjectData,
          _id: newProjectId,
          id: newProjectId
        }));
        navigate(`/result/${newProjectId}`);
      } else {
        setShowAdvanceOption(true);
      }
    } catch (err) {
      console.error('Project Generation Failed:', err);
      console.error('Project Generation Failed:11', err.status);
      if (err.status == 400) {
        alert(err.data.error);
      }

    }
  };

  const [isSearching, setIsSearching] = useState(false);

  // --- HANDLE FILE SUBMIT ---
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only PDF, DOC, and DOCX are allowed");
      event.target.value = null;
      return;
    }

    // console.log("File selected:", file.name);
    setIsSearching(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      selectedFilters.forEach((item) => formData.append("checked", item));

      const response = await createProject(formData).unwrap();

      const newProjectData = response?.data || response;
      const newProjectId = newProjectData?.project_id || newProjectData?.id || newProjectData?._id;

      // console.log("Newly Generated Project ID (File):", newProjectId);

      // SAVE DIRECTLY TO LOCAL STATE TO PREVENT CACHE ISSUES
      setActiveProject(newProjectData);

      // If patent is not checked, navigate directly to result page
      if (!selectedFilters.includes('patent') && newProjectId) {
        dispatch(setSelectedProject({
          ...newProjectData,
          _id: newProjectId,
          id: newProjectId
        }));
        navigate(`/result/${newProjectId}`);
      } else {
        setShowAdvanceOption(true);
      }

    } catch (error) {
      console.error("Error searching with file:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setIsSearching(false);
      event.target.value = null;
    }
  };

  // --- EXTRACT DATA FROM LOCAL STATE INSTEAD OF RTK QUERY `data` ---
  // This ensures we are always looking at the exact data that was just created.
  const projectId = activeProject?.project_id || activeProject?.id || activeProject?._id;
  const features = activeProject;
  const queries = activeProject?.patent_details?.queries || [];

  // ---> BULLETPROOF handleViewMore LOGIC <---
  const handleViewMore = () => {
    // console.log("Button Clicked! Navigating to ID:", projectId);

    if (projectId && activeProject) {
      // 1. Double check Redux is updated with the latest active project data
      dispatch(setSelectedProject({
        ...activeProject,
        _id: projectId,
        id: projectId
      }));

      // 2. Navigate to the correct result page
      navigate(`/result/${projectId}`);
    } else {
      console.error("No project ID found! activeProject state is null.");
      alert("Failed to find the new project ID. Please check the console.");
    }
  };

  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 2, position: 'relative', zIndex: 10 }}>
        {/* FULL PAGE LOADER */}
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.55)',
            flexDirection: 'column',
            backdropFilter: 'blur(4px)'
          }}
          open={isLoading}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#4B5563',
              fontStyle: 'italic',
              animation: 'pulse 1.5s infinite ease-in-out',
              '@keyframes pulse': {
                '0%': { opacity: 0.5, transform: 'scale(0.98)' },
                '50%': { opacity: 1, transform: 'scale(1)' },
                '100%': { opacity: 0.5, transform: 'scale(0.98)' }
              }
            }}
          >
            {LOADING_MESSAGES[messageIndex]}
          </Typography>
        </Backdrop>

        {/* Main UI */}
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Paper
            elevation={2}
            sx={{
              display: 'flex',
              borderRadius: '5px',
              border: '1px solid #E5E7EB',
              mb: 3,
              height: '100px',
              width: '100%',
              padding: '5px'
            }}
          >
            <SearchIcon sx={{ color: '#9CA3AF', m: '0 10px', mt: '10px' }} />
            <Box sx={{ flex: 1, padding: '0 4px' }}>
              <InputBase
                sx={{ width: '100%' }}
                placeholder="Describe your Invention in plain English"
                value={searchValue}
                multiline
                rows={4.2}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Box>

            <IconButton
              component="label"
              disabled={isSearching || isLoading}
              sx={{
                color: '#E94E34',
                borderRadius: '5px',
                width: '80px',
                opacity: (isSearching || isLoading) ? 0.5 : 1
              }}
            >
              <CloudUploadOutlined style={{ fontSize: '25px' }} />
              <input type="file" hidden onChange={handleFileChange} accept=".pdf,.doc,.docx" />
            </IconButton>
          </Paper>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }} sx={{ mb: '20px' }}>
          {filters.map((f) => (
            <Grid item xs={2} sm={2} md={4} size={{ xs: 2, sm: 2, md: 2 }} key={f.value}>
              <Box
                onClick={() =>
                  setSelectedFilters((prev) => (prev.includes(f.value) ? prev.filter((v) => v !== f.value) : [...prev, f.value]))
                }
                sx={{
                  cursor: 'pointer',
                  p: 1.2,
                  border: '1px solid',
                  borderColor: selectedFilters.includes(f.value) ? '#E94E34' : '#E5E7EB',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#fff'
                }}
              >
                <Checkbox checked={selectedFilters.includes(f.value)} sx={{ color: '#E94E34', '&.Mui-checked': { color: '#E94E34' } }} />
                <Typography variant="body2">{f.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button
            variant="contained"
            disabled={isLoading || isSearching || enableButton}
            onClick={handleGenerate}
            sx={{
              bgcolor: '#E94E34',
              '&:hover': { bgcolor: '#e06b56ff' },
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px'
            }}
          >
            Generate Key Strings
          </Button>

          {selectedFilters.includes('patent') && showAdvanceOption && (
            <FormControlLabel
              control={
                <Switch
                  color="default"
                  checked={advanceSearch}
                  onChange={(e) => setAdvanceSearch(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#E94E34' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#E94E34' }
                  }}
                />
              }
              label="Advance Search"
              labelPlacement="start"
            />
          )}
        </Box>

        <Collapse in={advanceSearch} timeout="auto">
          <Box sx={{ mt: 3 }}>
            <AdvanceSearch onClear={() => console.log('Cleared')} query={queries} />
          </Box>
        </Collapse>
      </Container>

      {/* Render Key Features ONLY if activeProject exists and was successful */}
      {selectedFilters.includes('patent') && activeProject && isSuccess && (
        <Box>
          <KeyFeatures propProjectId={projectId} featureData={features} />

          <Container maxWidth="xl" sx={{ pb: 6 }}>
            <Button
              variant="contained"
              onClick={handleViewMore}
              sx={{
                bgcolor: '#E94E34',
                '&:hover': { bgcolor: '#e06b56ff' },
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '5px',
                mt: 2,
              }}
            >
              View Result
            </Button>
          </Container>
        </Box>
      )}



    </Box>
  );
};

export default InputSectionN;