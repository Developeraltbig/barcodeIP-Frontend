import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Grid, CircularProgress } from '@mui/material';
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

// Components
import PatentCard from './PatentCard';
import TabComponent from '../TabComponent';
import TopSection from '../TopSection';
import DraftMasterResult from '../non_provisional/DraftMasterResult';
import PublicationCard from '../publication/PublicationCard';
import ProvisionalDraftResult from '../provisional/ProvisionalDraftResult';
import Product from '../product';

const PatentList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('patents');

  // Lazy Hooks
  const [getPatents, { isLoading: pLoad }] = useLazyGetPatentByProjectIdQuery();
  const [getProducts, { isLoading: prodLoad }] = useLazyGetProductByProjectIdQuery();
  const [getPubs, { isLoading: pubLoad }] = useLazyGetPublicationByProjectIdQuery();
  const [getProv, { isLoading: provLoad }] = useLazyGetProvisionalByProjectIdQuery();
  const [getNonProv, { isLoading: nonProvLoad }] = useLazyGetNonProvisionalByProjectIdQuery();

  // 1. Memoized Configuration
  const tabConfigs = useMemo(() => ({
    patents: { trigger: getPatents, action: setProjectPatent, stateKey: 'projectPatent' },
    publications: { trigger: getPubs, action: setProjectPublication, stateKey: 'projectPublication' },
    products: { trigger: getProducts, action: setProjectProduct, stateKey: 'projectProduct' },
    provisional: { trigger: getProv, action: setProjectProvisional, stateKey: 'projectProvisional' },
    nonProvisional: { trigger: getNonProv, action: setProjectNonProvisional, stateKey: 'projectNonProvisional' },
  }), [getPatents, getPubs, getProducts, getProv, getNonProv]);

  // Selectors
  const dashboard = useSelector((state) => state.userDashboard || {});

  // 2. Memoized Data Selector
  const displayData = useMemo(() => {
    const rawData = dashboard[tabConfigs[activeTab]?.stateKey] || [];
    return Array.isArray(rawData) ? rawData : [rawData];
  }, [dashboard, activeTab, tabConfigs]);

  // 3. Optimized Data Fetching
  const loadTabData = useCallback(async () => {
    if (!id) return;
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

  // 4. Component Mapping Strategy
  const renderActiveComponent = () => {
    const data = displayData[0]?.data || displayData[0]; // Adjust based on your API structure

    switch (activeTab) {
      case 'patents': return <PatentCard data={data} />;
      case 'publications': return <PublicationCard data={data} />;
      case 'nonProvisional': return <DraftMasterResult data={data} />;
      case 'provisional': return <ProvisionalDraftResult data={data} />;
      case 'products': return <Product data={data} />;
      default: return null;
    }
  };

  const isLoading = pLoad || prodLoad || pubLoad || provLoad || nonProvLoad;

  return (
    <Box sx={{ bgcolor: '#F4F7F9', minHeight: '100vh', pb: 10 }}>
      <TopSection />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Grid container spacing={3}>
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