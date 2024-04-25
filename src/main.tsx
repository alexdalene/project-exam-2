import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './routes/App';
import Root from './routes/root';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
]);

ReactDOM.createRoot(
  document.getElementById('root')!,
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
