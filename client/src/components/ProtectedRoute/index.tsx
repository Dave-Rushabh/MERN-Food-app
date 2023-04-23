import { Navigate } from 'react-router-dom';
import { isTokenAvailable } from '../../../utils/authUtils';

const ProtectedRoute = ({ children }: any) => {
  return isTokenAvailable() ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
