import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MainLayout from 'layouts/MainLayout';
import AuthGuard from './AuthGuard';
import HomeN from '../views/auth/work-N/HomeN/HomeN';
// pages
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/index')));



// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <HomeN />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    }
  ]
};

export default MainRoutes;
