import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MainLayout from 'layouts/MainLayout';
import AuthGuard from './AuthGuard';
import RecentSearch from '../views/search/RecentSearch';
import UserProfile from '../views/profile/UserProfile';
import AccountPage from '../views/account/AccountPage';
import OverlapMatrix from '../views/components/OverlapMatrix';

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
    },
    {
      path: '/recent-search',
      element: <RecentSearch/>
    },
    {
      path: '/profile',
      element: <UserProfile/>
    },
    {
      path: '/account',
      element: <AccountPage/>
    },
    {
      path: '/overlap',
      element: <OverlapMatrix/>
    }
  ]
};

export default MainRoutes;
