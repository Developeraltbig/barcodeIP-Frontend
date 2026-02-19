import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MinimalLayout from 'layouts/minimalLayout';
import LoginN from 'views/auth/work-N/LoginN';
import HomeN from '../views/auth/work-N/HomeN/HomeN';
import Footer from '../views/auth/work-N/Footer/Footer';
import ResultN from '../views/auth/work-N/ResultN/ResultN';
import Result_2 from '../views/auth/work-N/ResultN/Result_2';
import Register from 'views/auth/work-N/Register';

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
          path: 'register',
          element: <Register />
        },
        {
          path: 'HomeN',
          element: <HomeN />
        },
        {
          path: 'footer',
          element: <Footer/>
        },
        {
          path: 'result',
          element: <ResultN/>
        },
        {
          path: 'result2',
          element: <Result_2/>
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
