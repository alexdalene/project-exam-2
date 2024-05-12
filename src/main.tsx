import Hero from './routes/Hero';
import Venues from './routes/Venues';
import Root from './routes/root';
import './index.css';
import ErrorPage from './ErrorPage';
import Venue from './routes/Venues/Venue';
import LoginPage from './routes/Auth/Login';
import SignupPage from './routes/Auth/Signup';
import AuthLayout from './routes/Auth';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Hero />,
      },
      {
        path: '/venues',
        element: <Venues />,
      },
      {
        path: '/venues/:id',
        element: <Venue />,
      },
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: 'signup',
            element: <SignupPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
