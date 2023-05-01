import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from '../../../utils/authUtils';
import Layout from '../Layout';
import { useEffect, useReducer } from 'react';

interface ProtectedRouteState {
  isAuthenticated: boolean | null | undefined;
  isAnythingToBeRendered: boolean;
}

const ProtectedRoute = () => {
  const handleTokenValidation = (state: ProtectedRouteState, action: any) => {
    switch (action?.type) {
      case 'SET_IS_AUTHENTICATED':
        return {
          ...state,
          isAuthenticated: action?.payload,
          isAnythingToBeRendered: true,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(handleTokenValidation, {
    isAuthenticated: null,
    isAnythingToBeRendered: false,
  });

  useEffect(() => {
    const handleTokenValidation = async () => {
      const isValid = await isTokenValid();
      dispatch({ type: 'SET_IS_AUTHENTICATED', payload: isValid });
    };
    handleTokenValidation();
  }, []);

  return !state.isAnythingToBeRendered ? (
    <></>
  ) : state.isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/auth" />
  );
};

export default ProtectedRoute;
