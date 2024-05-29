import Root from './routes/root';
import './index.css';

// App
import App from './routes/app';

// Venues
import Venues from './routes/venues';
import VenuesSingle from './routes/venues/single';
import VenuesAll from './routes/venues/all';
import VenuesCreate from './routes/venues/create';

// Auth
import Auth from './routes/auth';
import AuthLogin from './routes/auth/login';
import AuthSignup from './routes/auth/signup';

// Profile
import Profile from './routes/profile';

// Error
import Error from './error';

// Router
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'venues',
        element: <Venues />,
        children: [
          {
            index: true,
            element: <VenuesAll />,
          },
          {
            path: ':venueId',
            element: <VenuesSingle />,
          },
          {
            path: 'create',
            element: <VenuesCreate />,
          },
        ],
      },
      {
        path: 'auth',
        element: <Auth />,
        children: [
          {
            index: true,
            element: <AuthLogin />,
          },
          {
            path: 'signup',
            element: <AuthSignup />,
          },
        ],
      },
      {
        path: 'profile/:name',
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
