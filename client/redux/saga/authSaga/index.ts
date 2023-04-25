import { call, put, takeLatest } from 'redux-saga/effects';
import {
  HANDLE_LOGIN_FAIL,
  HANDLE_LOGIN_SUCCESS,
  HANDLE_SIGN_UP_SUCCESS,
  HANDLE_SING_UP_FAIL,
} from '../../slice/authSlice';
import { handleLoginUtils, handleSignUpUtils } from '../../../utils/authUtils';

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
interface handleLoginSagaAction {
  type: string;
  payload: {
    email: string;
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

function* handleLoginSaga(action: handleLoginSagaAction) {
  try {
    const { payload } = action;
    const { message, user: userData } = yield call(handleLoginUtils, payload);
    yield put(HANDLE_LOGIN_SUCCESS({ userData, message }));
  } catch (error) {
    yield put(HANDLE_LOGIN_FAIL(error));
  }
}

function* authSaga() {
  // slice name / action name
  yield takeLatest('AUTH_SLICE/HANDLE_SIGN_UP', handleSignUpSaga);
  yield takeLatest('AUTH_SLICE/HANDLE_LOGIN', handleLoginSaga);
}

export default authSaga;
