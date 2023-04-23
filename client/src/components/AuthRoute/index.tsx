import { Navigate } from 'react-router-dom';
import { isTokenAvailable } from '../../../utils/authUtils';

const AuthRoute = ({ children }: any) => {
  return !isTokenAvailable() ? children : <Navigate to="/" replace />;
};

export default AuthRoute;
