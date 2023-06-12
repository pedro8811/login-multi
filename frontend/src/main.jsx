import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Error from './pages/Error404.jsx'
import AuthError from './pages/AuthError.jsx'
// import PrivateRoute from './components/PrivateRoute.jsx'

import './global-style.css'

const router = createBrowserRouter([
  {
    path: "/pedro/",
    element: <Login />,
  },
  {
    path: "/pedro/home",
    //element: <PrivateRoute element={<Home />} />,
    element: <Home />,
  },
  {
    path: "*",
    element: <Error />
  },
  {
    path: "/pedro/auth-error",
    element: <AuthError />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
