import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, useLocation, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Error from './pages/Error404.jsx'

import { AuthProvider } from './context/AuthContext.jsx'
import AuthContext from './context/AuthContext.jsx';

import './global-style.css'
import P from 'prop-types'


const ProtectedRouterProvider = ({ router }) => {
  const location = useLocation();
  console.log(location)
  const { isAuthenticated } = useContext(AuthContext);

  // Verificar se o usuário está autenticado
  const isUserAuthenticated = isAuthenticated();

  // Encontrar a rota correspondente com base no local atual
  const route = router.find((r) => r.path === location.pathname);

  // Verificar se a rota requer autenticação e se o usuário está autenticado
  const isRoutePrivate = route && route.private;
  const isAccessAllowed = !isRoutePrivate || (isRoutePrivate && isUserAuthenticated);

  return (
    <RouterProvider {...router}>
      {isAccessAllowed ? route.element : <Error />}
    </RouterProvider>
  );
};

ProtectedRouterProvider.propTypes = {
  router: P.object.isRequired,
}




const router = createBrowserRouter([
  {
    path: "/pedro/",
    element: <Login />
  },
  {
    path: "/pedro/home",
    element: <Home />,
    private: true,
  },
  {
    path: "*",
    element: <Error />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProtectedRouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
