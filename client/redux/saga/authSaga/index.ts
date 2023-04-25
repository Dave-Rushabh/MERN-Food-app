import { call, put, takeLatest } from 'redux-saga/effects';
import {
  HANDLE_SIGN_UP_SUCCESS,
  HANDLE_SING_UP_FAIL,
} from '../../slice/authSlice';
import { handleSignUpUtils } from '../../../utils/authUtils';

interface handleSignUpSagaAction {
  type: string;
  payload: {
    username: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    countryCode: string;
    password: string;
  };
}

function* handleSignUpSaga(action: handleSignUpSagaAction) {
  try {
    const { payload } = action;
    const { message, user: userData } = yield call(handleSignUpUtils, payload);
    yield put(HANDLE_SIGN_UP_SUCCESS({ userData, message }));
  } catch (error) {
    yield put(HANDLE_SING_UP_FAIL(error));
  }
}

function* authSaga() {
  // slice name / action name
  yield takeLatest('AUTH_SLICE/HANDLE_SIGN_UP', handleSignUpSaga);
}

export default authSaga;
