import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../../../utils/authUtils';
import { useEffect, useReducer } from 'react';

interface AuthRouteState {
  isAuthenticated: boolean | null | undefined;
  isAnythingToBeRendered: boolean;
}

const AuthRoute = ({ children }: any) => {
  const handleTokenValidation = (state: AuthRouteState, action: any) => {
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
    <Navigate to="/" replace />
  ) : (
    children
  );
};

export default AuthRoute;
