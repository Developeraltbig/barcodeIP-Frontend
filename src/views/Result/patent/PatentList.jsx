import React, { useState, useEffect, useMemo, useCallback, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Grid, CircularProgress, Typography, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import {
  useLazyGetProductByProjectIdQuery,
  useLazyGetPatentByProjectIdQuery,
  useLazyGetPublicationByProjectIdQuery,
  useLazyGetProvisionalByProjectIdQuery,
  useLazyGetNonProvisionalByProjectIdQuery
} from '../../../features/userApi';

import {
  setProjectProduct, setProjectPatent,
  setProjectPublication, setProjectProvisional,
  setProjectNonProvisional
} from '../../../features/slice/userSlice';

import Loadable from 'components/Loadable';
import { socket } from "../../../utils/socket";

// Components
const PatentCard = Loadable(lazy(() => import('./PatentCard')));
const TabComponent = Loadable(lazy(() => import('../TabComponent')));
const TopSection = Loadable(lazy(() => import('../TopSection')));
const DraftMasterResult = Loadable(lazy(() => import('../non_provisional/DraftMasterResult')));
const PublicationCard = Loadable(lazy(() => import('../publication/PublicationCard')));
const ProvisionalDraftResult = Loadable(lazy(() => import('../provisional/ProvisionalDraftResult')));
const Product = Loadable(lazy(() => import('../product/Product')));

const NoDataFound = ({ tabName }) => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: 10,
    width: '100%',
    opacity: 0.6
  }}>
    <Typography variant="h5" gutterBottom>
      No {tabName} Found
    </Typography>
    <Typography variant="body2" color="text.secondary">
      There is currently no data available for this section.
    </Typography>
  </Box>
);

const PatentList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isWideMode, setIsWideMode] = useState(true);

  // Lazy Hooks
  const [getPatents, { isLoading: pLoad }] = useLazyGetPatentByProjectIdQuery();
  const [getProducts, { isLoading: prodLoad }] = useLazyGetProductByProjectIdQuery();
  const [getPubs, { isLoading: pubLoad }] = useLazyGetPublicationByProjectIdQuery();
  const [getProv, { isLoading: provLoad }] = useLazyGetProvisionalByProjectIdQuery();
  const [getNonProv, { isLoading: nonProvLoad }] = useLazyGetNonProvisionalByProjectIdQuery();

  // Selectors
  const dashboard = useSelector((state) => state.userDashboard || state.user || {});
  const selectedProject = dashboard?.selectedProject;

  // Determine available tabs
  const availableTabs = useMemo(() => {
    if (
      (!selectedProject?.module || selectedProject.module.length === 0) &&
      (!selectedProject?.checked || selectedProject.checked.length === 0)
    ) {
      return ['patent', 'publications', 'products', 'provisional', 'nonProvisional'];
    }

    const moduleToTabMap = {
      patent: 'patent',
      publication: 'publications',
      publish: 'publications',
      product: 'products',
      provisional: 'provisional',
      nonprovisional: 'nonProvisional' // ✅ FIXED
    };

    const combined = [
      ...(selectedProject?.module || []),
      ...(selectedProject?.checked || [])
    ];

    return [...new Set(
      combined
        .map(m => moduleToTabMap[m.toLowerCase()])
        .filter(Boolean)
    )];

  }, [selectedProject]);

  console.log('availableTabs', availableTabs)
  const [activeTab, setActiveTab] = useState(availableTabs[0] || 'patent');

  useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]);
    }
  }, [availableTabs, activeTab]);

  // Tab configurations
  const tabConfigs = useMemo(() => ({
    patent: { trigger: getPatents, action: setProjectPatent, stateKey: 'projectPatent' },
    publications: { trigger: getPubs, action: setProjectPublication, stateKey: 'projectPublication' },
    products: { trigger: getProducts, action: setProjectProduct, stateKey: 'projectProduct' },
    provisional: { trigger: getProv, action: setProjectProvisional, stateKey: 'projectProvisional' },
    nonProvisional: { trigger: getNonProv, action: setProjectNonProvisional, stateKey: 'projectNonProvisional' },
  }), [getPatents, getPubs, getProducts, getProv, getNonProv]);

  // Worker progress state
  const [workerProgress, setWorkerProgress] = useState(() => {
    if (!id) return {
      provisional: 0,
      nonProvisional: 0,
      patent: 0,
      publish: 0,
      product: 0
    };

    try {
      const saved = localStorage.getItem(`workerProgress_${id}`);
      return saved
        ? JSON.parse(saved)
        : {
          provisional: 0,
          nonProvisional: 0,
          patent: 0,
          publish: 0,
          product: 0
        };
    } catch (e) {
      return {
        provisional: 0,
        nonProvisional: 0,
        patent: 0,
        publish: 0,
        product: 0
      };
    }
  });

  // Selector for display data
  const displayData = useMemo(() => {
    const rawData = dashboard[tabConfigs[activeTab]?.stateKey] || [];
    return Array.isArray(rawData) ? rawData : [rawData];
  }, [dashboard, activeTab, tabConfigs]);

  // Load data for active tab
  const loadTabData = useCallback(async () => {
    if (!id || !activeTab) return;
    try {
      const config = tabConfigs[activeTab];
      if (config) {
        const response = await config.trigger(id).unwrap();
        dispatch(config.action(response));
      }
    } catch (err) {
      console.error(`Error fetching ${activeTab}:`, err);
    }
  }, [id, activeTab, tabConfigs, dispatch]);

  useEffect(() => {
    loadTabData();
  }, [loadTabData]);

  useEffect(() => {
    if (!id) return;

    console.log('tabConfigs[activeTab]', tabConfigs[activeTab]?.stateKey)
    console.log('111', displayData[0]?.data?.status)
    console.log("💾 Saved progress to localStorage:", workerProgress);

    if (tabConfigs[activeTab]?.stateKey == "projectPatent") {
      if (displayData[0]?.data?.novelty_analysis_status == "generated") {
        workerProgress.patent = 0;
      }
    }
    localStorage.setItem(
      `workerProgress_${id}`,
      JSON.stringify(workerProgress)
    );

    console.log("💾 Saved progress to localStorage:", workerProgress);

  }, [workerProgress, id]);

  // Socket Logic
  useEffect(() => {
    if (!id) return;

    console.log("📡 Joining room:", id);

    socket.emit("joinProject", id);

    const handleJobUpdate = (event) => {
      console.log("🔥 Job update received:", event);

      if (event.projectId !== id) return;

      const normalizeType = (type) => {
        switch (type) {
          case 'nonProvisional':
          case 'non-provisional':
            return 'nonProvisional';
          case 'publish':
            return 'publish';
          case 'product':
            return 'product';
          case 'patent':
            return 'patent';
          case 'provisional':
            return 'provisional';
          default:
            return type;
        }
      };

      const key = normalizeType(event.type);

      // 🚀 STARTED
      if (event.event === "started") {
        setWorkerProgress((prev) => ({
          ...prev,
          [key]: 0
        }));
      }

      // 📊 PROGRESS
      if (event.event === "progress") {
        setWorkerProgress((prev) => ({
          ...prev,
          [key]: event.progress
        }));
      }

      // ✅ COMPLETED
      if (event.event === "completed") {
        setWorkerProgress((prev) => ({
          ...prev,
          [key]: 100
        }));
      }
    };

    socket.off("jobUpdate").on("jobUpdate", handleJobUpdate);

    return () => {
      socket.off("jobUpdate", handleJobUpdate);
    };
  }, [id]);

  useEffect(() => {
    if (!availableTabs || availableTabs.length === 0) return;

    const allDone = availableTabs.every(tab => {
      switch (tab) {
        case 'patent':
          return workerProgress.patent === 100;
        case 'publications':
          return workerProgress.publish === 100;
        case 'nonProvisional':
          return workerProgress.nonProvisional === 100;
        case 'provisional':
          return workerProgress.provisional === 100;
        case 'products':
          return workerProgress.product === 100;
        default:
          return true;
      }
    });

    if (allDone) {
      console.log("🧹 Clearing localStorage (all ACTIVE jobs done)");
      localStorage.removeItem(`workerProgress_${id}`);
    }
  }, [workerProgress, id, availableTabs]);


  // Generic getProgress for any tab
  const getProgress = (tab) => {
    switch (tab) {
      case 'patent': return workerProgress.patent || 0;
      case 'publications': return workerProgress.publish || 0;
      case 'nonProvisional': return workerProgress.nonProvisional || 0;
      case 'provisional': return workerProgress.provisional || 0;
      case 'products': return workerProgress.product || 0;
      default: return 0;
    }
  };

  const currentProgress = getProgress(activeTab);

  // Refetch when progress hits 100%
  useEffect(() => {
    if (currentProgress === 100) {
      const timer = setTimeout(() => {
        loadTabData();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentProgress, loadTabData]);

  const renderActiveComponent = () => {
    if (currentProgress > 0 && currentProgress < 100) {
      return (
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', py: 12, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#475569', fontWeight: 600 }}>
            Generating {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Data... {currentProgress}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={currentProgress}
            sx={{
              height: 12,
              borderRadius: 6,
              bgcolor: '#e2e8f0',
              '& .MuiLinearProgress-bar': { bgcolor: '#E94E34' }
            }}
          />
          <Typography variant="body2" sx={{ mt: 3, color: '#94a3b8' }}>
            Please wait while our AI extracts and processes your information. This may take a few moments.
          </Typography>
        </Box>
      );
    }

    const rawData = displayData[0];
    const data = rawData?.data;
    const hasNoData = !data || (Array.isArray(data) && data.length === 0);

    if (hasNoData) return <NoDataFound tabName={activeTab} />;

    switch (activeTab) {
      case 'patent': return <PatentCard data={data} wideMode={isWideMode} progress={workerProgress.patent} />;
      case 'publications': return <PublicationCard data={data} wideMode={isWideMode} progress={workerProgress.publish} />;
      case 'nonProvisional': return <DraftMasterResult data={data} progress={workerProgress.nonProvisional} />;
      case 'provisional': return <ProvisionalDraftResult data={data} progress={workerProgress.provisional} />;
      case 'products': return <Product data={data} progress={workerProgress.product} />;
      default: return null;
    }
  };

  const isLoading = pLoad || prodLoad || pubLoad || provLoad || nonProvLoad;

  return (
    <Box sx={{ bgcolor: '#F4F7F9', minHeight: '100vh', pb: 10 }}>
      <TopSection />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Tab Component with progress */}
        <TabComponent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onToggleLayout={() => setIsWideMode(!isWideMode)}
          availableTabs={availableTabs}
          getProgress={getProgress}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading && currentProgress === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress sx={{ color: '#E94E34' }} />
              </Box>
            ) : (
              <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                {renderActiveComponent()}
              </Grid>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default PatentList;