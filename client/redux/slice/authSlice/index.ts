import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  signUp: {
    signUpStatusMsg: '',
    isSignUpSuccess: false,
    isSigninUpLoading: false,
  },
  login: {
    signUpStatusMsg: '',
    isLoginSucess: false,
    isLoggingInLoading: false,
  },
};

const authSlice = createSlice({
  name: 'AUTH_SLICE',
  initialState: initialState,
  reducers: {
    // ========== sign up reducers ==========
    HANDLE_SIGN_UP: (state, _action) => {
      state.signUp.isSigninUpLoading = true;
    },
    HANDLE_SIGN_UP_SUCCESS: (state, action) => {
      const { userData, message } = action.payload;
      state.currentUser = userData;
      state.signUp = {
        signUpStatusMsg: message,
        isSignUpSuccess: true,
        isSigninUpLoading: false,
      };
    },
    HANDLE_SING_UP_FAIL: (state, action) => {
      const { message } = action.payload;
      state.signUp = {
        signUpStatusMsg: message,
        isSignUpSuccess: false,
        isSigninUpLoading: false,
      };
    },
  },
});

export default authSlice.reducer;
export const { HANDLE_SIGN_UP, HANDLE_SIGN_UP_SUCCESS, HANDLE_SING_UP_FAIL } =
  authSlice.actions;
