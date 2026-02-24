import React from 'react';
import { Box, Typography, Stack, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import GetAppIcon from '@mui/icons-material/GetApp';
import MenuIcon from '@mui/icons-material/Menu';
import { BRAND_RED, BRAND_AMBER } from './constants';
import { TABS } from './mockData';
import DownloadButton from '../components/DownloadButton';

const TabComponent = ({ activeTab, setActiveTab ,onToggleLayout }) => {
  return (
    <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', lg: 'center' }} spacing={3} sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', width: { xs: '100%', lg: 'auto' }, py: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Box
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              component={motion.div}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              sx={{ position: 'relative', px: 3, py: 1.2, cursor: 'pointer', borderRadius: '12px', whiteSpace: 'nowrap', border: '1px solid', borderColor: isActive ? 'transparent' : '#d5dbe4', bgcolor: '#fff' }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700, color: isActive ? BRAND_RED : '#64748b', zIndex: 2, position: 'relative' }}>
                {tab.label}
              </Typography>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: `${BRAND_RED}08`, border: `2px solid ${BRAND_RED}`, borderRadius: '12px', zIndex: 1 }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      <Stack direction="row" spacing={2}>
         <DownloadButton/>
        <IconButton sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', p: 1.5 }} onClick={onToggleLayout}>
          <MenuIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default TabComponent;