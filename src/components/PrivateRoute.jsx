import { Navigate } from "react-router-dom";
import P from 'prop-types'

const PrivateRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  return isAuthenticated === 'true' ? (
    element
  ) : (
    <Navigate to="/pedro/auth-error" replace />
  );
};

PrivateRoute.propTypes = {
  element: P.element.isRequired
};

export default PrivateRoute;