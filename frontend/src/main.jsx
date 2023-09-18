import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import OrdemServico from './pages/OrdemServico.jsx'
import ErrorPage from './pages/Error.jsx'

import './global-style.css'
import Admin from './pages/Admin.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/os/:os",
    element: <OrdemServico />
  },
  {
    path: "/*",
    element: <ErrorPage />
  },
  {
    path: "/os/*",
    element: <ErrorPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
