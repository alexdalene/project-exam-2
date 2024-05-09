import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './routes/App';
import Venues from './routes/Venues';
import Root from './routes/root';
import './index.css';
import ErrorPage from './ErrorPage';
import Venue from './routes/Venues/Venue';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/venues',
        element: <Venues />,
      },
      {
        path: '/venues/:id',
        element: <Venue />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
