import { useEffect, useReducer, useState } from 'react';
import './index.css';
import Login from './Login';
import SignUp from './SignUp';
import AuthBanner from '../AuthBanner';
import { LOGIN_SCREEN_IMAGE_CREDITS_LINK } from '../../../constants/credits';
import { isTokenValid } from '../../../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

interface AuthComponentState {
  login: boolean;
  signup: boolean;
}

const AuthComponent = () => {
  const navigate = useNavigate();
  // ======== helper functions ========
  const hnadleSignupOrLoginToggle = (
    state: AuthComponentState,
    action: any
  ) => {
    switch (action.type) {
      case 'active-signup':
        return { ...state, login: false, signup: true };
      case 'active-login':
        return { ...state, login: true, signup: false };
      default:
        return state;
    }
  };

  // ======== hooks ========
  const [state, dispatch] = useReducer(hnadleSignupOrLoginToggle, {
    login: false,
    signup: false,
  });
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsCheckingAuth(true);
      const isAuthenticated = await isTokenValid();
      if (isAuthenticated) {
        navigate('/');
      }
      setIsCheckingAuth(false);
      dispatch({ type: 'active-login' }); // handle login form visibility only if the user is not authenticated
    };
    checkAuthentication();
  }, []);

  // ======== components ========
  const LoginButton = () => (
    <button
      className={`${state.login ? 'active-btn' : 'login-btn'}`}
      onClick={() => dispatch({ type: 'active-login' })}
    >
      Login
    </button>
  );

  const SignupButton = () => (
    <button
      className={`${state.signup ? 'active-btn' : 'signup-btn'}`}
      onClick={() => dispatch({ type: 'active-signup' })}
    >
      Sign Up
    </button>
  );

  const AuthButtonsWrapper = ({ children }: any) => (
    <div className="AuthButtonsWrapper">{children}</div>
  );

  // ======== Return of <AuthComponent /> ========
  return (
    <>
      {isCheckingAuth ? (
        <div style={{ position: 'relative', height: '100vh' }}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            margin="auto"
          />
        </div>
      ) : (
        <div className="auth-wrapper">
          <AuthBanner />
          <div className="img-form-wrapper">
            <div className="img-container">
              <img src="../../../assets/login-screen-image.jpg" alt="" />
            </div>
            <div className="form-container">
              <div className="auth-switcher-header">
                Let us get you through the app
              </div>
              <AuthButtonsWrapper>
                <LoginButton />
                <SignupButton />
              </AuthButtonsWrapper>
              {state.login && <Login />}
              {state.signup && <SignUp />}
            </div>
          </div>
          <div className="img-form-wrapper">
            <a
              href={LOGIN_SCREEN_IMAGE_CREDITS_LINK}
              className="text-gray-500 hover:text-gray-700 transition-colors hidden md:block"
            >
              <span className="inline-block mr-1">Image credits :</span>
              <span className="inline-block font-medium">Freepik</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthComponent;
