import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import AuthGuard from './AuthGuard';
import ForgotPassword from '../views/auth/work-N/ForgotPassword';
import ResetPassword from '../views/auth/work-N/ResetPassword';

// pages
const Home = Loadable(lazy(() => import('../views/Home/index')));
const Result = Loadable(lazy(() => import('../views/Result/index')));
const MainLayout = Loadable(lazy(() => import('layouts/MainLayout')));
const RecentSearch = Loadable(lazy(() => import('../views/search/RecentSearch')));
const UserProfile = Loadable(lazy(() => import('../views/profile/UserProfile')));
const AccountPage = Loadable(lazy(() => import('../views/account/AccountPage')));
const OverlapMatrix = Loadable(lazy(() => import('../views/components/OverlapMatrix')));
const DraftMasterResult = Loadable(lazy(() => import('../views/Result/non_provisional/DraftMasterResult')));
const ProvisionalDraftResult = Loadable(lazy(() => import('../views/Result/provisional/ProvisionalDraftResult')));
const Product = Loadable(lazy(() => import('../views/Result/product')));
const PatentDetail = Loadable(lazy(() => import('../views/Result/patent/PatentDetail')));
const NotFound  = Loadable(lazy(() => import('../components/NotFound')));
const MyProject = Loadable(lazy(() => import('../views/my-project/MyProject')));




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
      path: '/result/:id',
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
      path: '/overlap/:id',
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
    },
    {
      path: '/project',
      element: <MyProject />
    },
    {
      path: '/patent-detail',
      element: <PatentDetail />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]
};

export default MainRoutes;
