import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MainLayout from 'layouts/MainLayout';
import AuthGuard from './AuthGuard';

// pages
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/default')));
const UserReport = Loadable(lazy(() => import('views/userReport/index')));
const Specification = Loadable(lazy(() => import('views/specification/index')));

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
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    {
      path: '/user_report',
      element: <UserReport />
    },
    {
      path: '/specifications',
      element: <Specification />
    },
  ]
};

export default MainRoutes;
