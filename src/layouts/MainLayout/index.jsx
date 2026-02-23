import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project imports
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from 'components/Breadcrumbs';

import { DRAWER_WIDTH } from 'config';
import { handlerDrawerOpen, useGetMenuMaster } from 'states/menu';

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout() {
  const upLG = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  useEffect(() => {
    handlerDrawerOpen(upLG);
  }, [upLG]);

  // drawer toggle handler on resize window
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const drawer = useMemo(() => <Drawer />, [drawerOpen]);

  return (
    <>
    <Header />
   
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '200vh', // Critical: ensures the page is at least screen-height
      }}
    >
      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* Footer stays at the bottom because of flex-grow above */}
      <Footer />
    </Box>
  
    </>



     
  );
}
