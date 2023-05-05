import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    data: null,
    isFetchingUserInfo: false,
    isUpdatingUserInfo: false,
    updateMessage: {
      success: '',
      failure: '',
    },
    isUpdated: false,
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

    // ========== update user info reducers ==========
    UPDATE_USER_INFO: (state, _action) => {
      state.userInfo.isUpdatingUserInfo = true;
    },
    UPDATE_USER_INFO_SUCCESS: (state, action) => {
      state.userInfo.data = action.payload.data;
      state.userInfo.updateMessage.success = action.payload.message;
      state.userInfo.isUpdatingUserInfo = false;
      state.userInfo.isUpdated = true;
    },
    UPDATE_USER_INFO_FAIL: (state, action) => {
      state.userInfo.isUpdatingUserInfo = false;
      state.userInfo.updateMessage.failure = action.payload.message;
      state.userInfo.isUpdated = true;
    },

    // ========== toggle modal visibility reducer ==========
    TOGGLE_USER_INFO_MODAL_VISIBILITY: state => {
      state.userInfo.modal.visibility = !state.userInfo.modal.visibility;
    },

    // ========== toggle this flag to show th toaster ==========
    TOGGLE_IS_UPDATED: (state, action) => {
      state.userInfo.isUpdated = action.payload;
    },
  },
});

export default navbarSlice.reducer;
export const {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  TOGGLE_USER_INFO_MODAL_VISIBILITY,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
  TOGGLE_IS_UPDATED,
} = navbarSlice.actions;
