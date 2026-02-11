import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MainLayout from 'layouts/MainLayout';
import AuthGuard from './AuthGuard';

// pages
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/default')));
const UserReport = Loadable(lazy(() => import('views/userReport/index')));
const Specification = Loadable(lazy(() => import('views/specification/index')));
const Content = Loadable(lazy(() => import('views/content/index')));
const AdminUser = Loadable(lazy(() => import('views/adminUser/index')));
const UserRequest = Loadable(lazy(() => import('views/userRequest/index')));
const AboutUs = Loadable(lazy(() => import('views/aboutUs/index')));
const PrivactyPolicy = Loadable(lazy(() => import('views/privacyPolicy/index')));
const Article = Loadable(lazy(() => import('views/article/index')));
const TermCondition = Loadable(lazy(() => import('views/termCondition/index')));


const SamplePage = Loadable(lazy(() => import('views/pages/SamplePage')));

// utils
const UtilsTypography = Loadable(lazy(() => import('views/components/Typography')));

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
     {
      path: '/content',
      element: <Content />
    },
    {
      path: '/admin_user',
      element: <AdminUser />
    },
    {
      path: '/user_request',
      element: <UserRequest />
    },
    {
      path: '/about_us',
      element: <AboutUs />
    },
    {
      path: '/privacy_policies',
      element: <PrivactyPolicy />
    },
    {
      path: '/articles',
      element: <Article />
    },
    {
      path: '/term_condition',
      element: <TermCondition />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    },
    {
      path: 'components',
      children: [
        {
          path: 'typography',
          element: <UtilsTypography />
        }
      ]
    }
  ]
};

export default MainRoutes;
