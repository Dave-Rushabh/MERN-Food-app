import { Navigate } from 'react-router-dom';
import { isTokenAvailable } from '../../../utils/authUtils';
import Layout from '../Layout';

const ProtectedRoute = ({ children }: any) => {
  return isTokenAvailable() ? (
    <>
      <Layout>{children}</Layout>
    </>
  ) : (
    <Navigate to="/auth" replace />
  );
};

export default ProtectedRoute;
