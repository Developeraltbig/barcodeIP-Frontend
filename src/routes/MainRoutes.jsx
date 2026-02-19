import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import AuthGuard from './AuthGuard';

// pages
const Home = Loadable(lazy(() => import('../views/Home/index')));
const Result = Loadable(lazy(() => import('../views/Result/index')));
const MainLayout = Loadable(lazy(() => import('layouts/MainLayout')));
const RecentSearch = Loadable(lazy(() => import('../views/search/RecentSearch')));
const UserProfile = Loadable(lazy(() => import('../views/profile/UserProfile')));
const AccountPage = Loadable(lazy(() => import('../views/account/index')));
const OverlapMatrix = Loadable(lazy(() => import('../views/components/OverlapMatrix')));
const DraftMasterResult = Loadable(lazy(() => import('../views/Result/non_provisional/DraftMasterResult')));
const ProvisionalDraftResult = Loadable(lazy(() => import('../views/Result/provisional/ProvisionalDraftResult')));
const Product = Loadable(lazy(() => import('../views/Result/product')));



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
    },
    {
      path: '/non-provisional',
      element: <DraftMasterResult />
    },
    {
      path: '/provisional',
      element: <ProvisionalDraftResult />
    },
    {
      path: '/product',
      element: <Product />
    }
  ]
};

export default MainRoutes;
