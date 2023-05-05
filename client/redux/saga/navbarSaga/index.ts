import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_USER_INFO_FAIL,
  GET_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
  UPDATE_USER_INFO_SUCCESS,
} from '../../slice/navbarSlice';
import {
  getUserInfoByUserIdUtils,
  updateUserInfoByUserIdUtils,
} from '../../../utils/navbarUtils';

interface getUserInfoSagaAction {
  type: string;
  payload: {
    userId: string;
  };
}

function* getUserInfoSaga(action: getUserInfoSagaAction) {
  try {
    const { payload } = action;
    const { data } = yield call(getUserInfoByUserIdUtils, payload);
    yield put(GET_USER_INFO_SUCCESS({ data }));
  } catch (error) {
    yield put(GET_USER_INFO_FAIL(error));
  }
}

function* updateUserInfoSaga(action: any) {
  try {
    const { payload } = action;
    const { data, message } = yield call(updateUserInfoByUserIdUtils, payload);
    yield put(UPDATE_USER_INFO_SUCCESS({ data, message }));
  } catch (error) {
    yield put(UPDATE_USER_INFO_FAIL(error));
  }
}

function* navbarSaga() {
  // slice name / action name
  yield takeLatest('NAVBAR_SLICE/GET_USER_INFO', getUserInfoSaga);
  yield takeLatest('NAVBAR_SLICE/UPDATE_USER_INFO', updateUserInfoSaga);
}

export default navbarSaga;
