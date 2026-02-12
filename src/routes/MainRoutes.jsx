import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MainLayout from 'layouts/MainLayout';
import AuthGuard from './AuthGuard';

// pages
const Home = Loadable(lazy(() => import('../views/Home/index')));
const Result = Loadable(lazy(() => import('../views/Result/index')));



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
      element: <Home />
    },
    {
      path: '/result',
      element: <Result />
    }
  ]
};

export default MainRoutes;
