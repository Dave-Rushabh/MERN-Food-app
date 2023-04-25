import { useReducer } from 'react';
import './index.css';
import Login from './Login';
import SignUp from './SignUp';
import AuthBanner from '../AuthBanner';

interface AuthComponentState {
  login: boolean;
  signup: boolean;
}

const AuthComponent = () => {
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
    login: true,
    signup: false,
  });

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
    <div className="auth-wrapper">
      <AuthBanner />
      <div className="img-form-wrapper">
        <div className="img-container">
          <img src="../../../assets/login-screen-image.jpg" alt="" />
        </div>
        <div className="form-container">
          <div className="text-2xl text-app_primary_dark font-semibold">
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
    </div>
  );
};

export default AuthComponent;
