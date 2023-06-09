import React, {
  //useContext 
} from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Error from './pages/Error404.jsx'

import { AuthProvider } from './context/AuthContext.jsx'

import './global-style.css'

const router = createBrowserRouter([
  {
    path: "/pedro/",
    element: <Login />
  },
  {
    path: "/pedro/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <Error />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
