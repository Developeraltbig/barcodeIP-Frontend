import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To read the URL ID
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material';
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
import PatentCard from './PatentCard';
import TabComponent from '../TabComponent';
import TopSection from '../TopSection';

const PatentList = () => {
  const { id } = useParams(); // URL: /result/65d1... grab 'id'
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('patents');
  // Lazy Hooks
  const [getPatents, { isLoading: pLoad }] = useLazyGetPatentByProjectIdQuery();
  const [getProducts, { isLoading: prodLoad }] = useLazyGetProductByProjectIdQuery();
  const [getPubs, { isLoading: pubLoad }] = useLazyGetPublicationByProjectIdQuery();
  const [getProv, { isLoading: provLoad }] = useLazyGetProvisionalByProjectIdQuery();
  const [getNonProv, { isLoading: nonProvLoad }] = useLazyGetNonProvisionalByProjectIdQuery();

  // Selectors
  const dashboard = useSelector((state) => state.userDashboard || {});
  console.log('check --', dashboard);
  console.log('check --11', dashboard?.selectedProject?.project_id);
   

  // Mapping Tab ID to API Trigger and Redux Action
  const tabConfigs = {
    patents: { trigger: getPatents, action: setProjectPatent, stateKey: 'projectPatent' },
    publications: { trigger: getPubs, action: setProjectPublication, stateKey: 'projectPublication' },
    products: { trigger: getProducts, action: setProjectProduct, stateKey: 'projectProduct' },
    provisional: { trigger: getProv, action: setProjectProvisional, stateKey: 'projectProvisional' },
    nonProvisional: { trigger: getNonProv, action: setProjectNonProvisional, stateKey: 'projectNonProvisional' },
  };

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const config = tabConfigs[activeTab];
        if (config) {
          const response = await config.trigger(id).unwrap();
          dispatch(config.action(response));
        }
      } catch (err) {
        console.error(`Error fetching ${activeTab}:`, err);
      }
    };

    loadData();
  }, [id, activeTab]);

  const rawData = dashboard[tabConfigs[activeTab]?.stateKey] || [];
  const displayData = Array.isArray(rawData) ? rawData : [rawData];

  console.log('displayData --', displayData)
  const isLoading = pLoad || prodLoad || pubLoad || provLoad || nonProvLoad;

  return (
    <Box sx={{ bgcolor: '#F4F7F9', minHeight: '100vh', pb: 10 }}>

      <TopSection />

      <Container maxWidth="xl" sx={{ mt: 4 }}>

        <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
            ) : (
              <Grid container spacing={3}>
                <PatentCard data={displayData[0]?.data} />
                {/* {displayData.length > 0 && displayData[0] !== null ? (
                  displayData.map((item, index) => (
                    <Grid item xs={12} md={6} key={item._id || index}>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Box sx={{ py: 15, textAlign: 'center', bgcolor: '#fff', borderRadius: '20px', border: '2px dashed #cbd5e1' }}>
                      <Typography variant="h6" color="text.secondary">No content found for this category.</Typography>
                    </Box>
                  </Grid>
                )} */}
              </Grid>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default PatentList;