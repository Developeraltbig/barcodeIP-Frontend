import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { DUMMY_PATENTS, TABS } from '../mockData';
import PatentCard from './PatentCard';
import TabComponent from '../TabComponent';
import { useNavigate } from 'react-router-dom';

const PatentList = () => {
  const [activeTab, setActiveTab] = useState('patents');
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#F4F7F9', minHeight: '100vh', pb: 10 }}>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        
        {/* Navigation Component */}
        <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Content Section */}
        <AnimatePresence mode="wait">
          <motion.div
            
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'patents' ? (
              <Grid container spacing={3}>
                {DUMMY_PATENTS.map((item) => (
                  <Grid item xs={12} md={6} key={item.id}>
                    <PatentCard data={item} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ py: 15, textAlign: 'center', bgcolor: '#fff', borderRadius: '20px', border: '2px dashed #cbd5e1' }}>
                <Typography variant="h6" color="text.secondary">
                  No files found for <b>{TABS.find(t => t.id === activeTab)?.label}</b>
                </Typography>
              </Box>
            )}
          </motion.div>
        </AnimatePresence>
        
      </Container>
    </Box>
  );
};

export default PatentList;