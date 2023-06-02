import { Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home'

const PrivateRoute = ({ component: Home, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
