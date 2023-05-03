import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    data: null,
    isFetchingUserInfo: false,
    modal: {
      visibility: false,
    },
  },
};

const navbarSlice = createSlice({
  name: 'NAVBAR_SLICE',
  initialState: initialState,
  reducers: {
    // ========== get user info reducers ==========
    GET_USER_INFO: (state, _action) => {
      state.userInfo.isFetchingUserInfo = true;
    },
    GET_USER_INFO_SUCCESS: (state, action) => {
      const { data } = action.payload;
      state.userInfo.data = data;
      state.userInfo.isFetchingUserInfo = false;
    },
    GET_USER_INFO_FAIL: (state, _action) => {
      state.userInfo.isFetchingUserInfo = false;
    },

    //
    TOGGLE_USER_INFO_MODAL_VISIBILITY: state => {
      state.userInfo.modal.visibility = !state.userInfo.modal.visibility;
    },
  },
});

export default navbarSlice.reducer;
export const {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  TOGGLE_USER_INFO_MODAL_VISIBILITY,
} = navbarSlice.actions;
