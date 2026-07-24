import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MinimalLayout from 'layouts/minimalLayout';
import LoginN from 'views/auth/work-N/LoginN';
import Register from 'views/auth/work-N/Register';
import ForgotPassword from '../views/auth/work-N/ForgotPassword';
import ResetPassword from '../views/auth/work-N/ResetPassword';
import LandingPage from '../views/LandingPage';

// const LoginPage = Loadable(lazy(() => import('views/auth/Login')));
const RegisterPage = Loadable(lazy(() => import('views/auth/Register')));

const PagesRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    // Default route => "/"
    {
      index: true,
      element: <LandingPage />
    },

    // Optional: "/landing"
    {
      path: 'landing',
      element: <LandingPage />
    },

    // Auth Routes
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <LoginN />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'forgot-password',
          element: <ForgotPassword />
        },
        {
          path: 'reset-password',
          element: <ResetPassword />
        },
      ]
    }
  ]
};

export default PagesRoutes;