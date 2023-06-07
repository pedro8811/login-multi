// import { useContext } from 'react';
// import { RouterProvider, useLocation } from 'react-router-dom';
// import AuthContext from '../context/AuthContext'
// import P from 'prop-types'
// import Error from '../pages/Error404'

// const ProtectedRouterProvider = ({ router }) => {
//   const location = useLocation();
//   const { isAuthenticated } = useContext(AuthContext);

//   // Verificar se o usuário está autenticado
//   const isUserAuthenticated = isAuthenticated();

//   // Encontrar a rota correspondente com base no local atual
//   const route = router.find((r) => r.path === location.pathname);

//   // Verificar se a rota requer autenticação e se o usuário está autenticado
//   const isRoutePrivate = route && route.private;
//   const isAccessAllowed = !isRoutePrivate || (isRoutePrivate && isUserAuthenticated);

//   return (
//     <RouterProvider {...router}>
//       {isAccessAllowed ? route.element : <Error />}
//     </RouterProvider>
//   );
// };

// ProtectedRouterProvider.propTypes = {
//   router: P.object.isRequired,
// }

// export default ProtectedRouterProvider;
