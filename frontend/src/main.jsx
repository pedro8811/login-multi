import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Error from './pages/Error404.jsx'
import AuthError from './pages/AuthError.jsx'
import OrdemServico from './pages/OrdemServico.jsx'

import './global-style.css'

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
    path: '/:os',
    element: <OrdemServico />
  },
  {
    path: "*",
    element: <Error />
  },
  {
    path: "/auth-error",
    element: <AuthError />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
