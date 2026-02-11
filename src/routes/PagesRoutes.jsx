import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MinimalLayout from 'layouts/minimalLayout';
import LoginN from 'views/auth/work-N/LoginN';
import HomeN from '../views/auth/work-N/HomeN/HomeN';

// pages
// const LoginPage = Loadable(lazy(() => import('views/auth/Login')));
const RegisterPage = Loadable(lazy(() => import('views/auth/Register')));

// ==============================|| PAGES ROUTES ||============================== //

const PagesRoutes = {
  path: 'pages',
  element: <MinimalLayout />,
  children: [
    {
      path: 'auth',
      children: [
        // {
        //   path: 'login',
        //   element: <LoginPage />
        // },
        {
          path: 'login',
          element: <LoginN />
        },
        {
          path: 'HomeN',
          element: <HomeN />
        }

        // {
        //   path: 'register',
        //   element: <RegisterPage />
        // }
      ]
    }
  ]
};

export default PagesRoutes;
