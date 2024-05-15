import Root from './routes/root';
import './index.css';

// App
import App from './routes/app';

// Venues
import Venues from './routes/venues';
import VenuesSingle from './routes/venues/single';
import VenuesAll from './routes/venues/all';
import { getAllVenues, getSingleVenue } from './loaders/venues';

// Auth
import Auth from './routes/auth';
import AuthLogin from './routes/auth/login';
import AuthSignup from './routes/auth/signup';

// Account
import Account from './routes/account';
import AccountVenues from './routes/account/venues';
import AccountBookings from './routes/account/bookings';

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
            loader: ({ request }) => getAllVenues(request),
          },
          {
            path: ':venueId',
            element: <VenuesSingle />,
            loader: ({ params }) => getSingleVenue(params.venueId || ''),
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
        path: 'account',
        element: <Account />,
        children: [
          {
            element: <AccountVenues />,
          },
          {
            element: <AccountBookings />,
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
