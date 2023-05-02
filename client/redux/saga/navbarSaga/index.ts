import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_USER_INFO_FAIL,
  GET_USER_INFO_SUCCESS,
} from '../../slice/navbarSlice';
import { getUserInfoByUserId } from '../../../utils/navbarUtils';

interface getUserInfoSagaAction {
  type: string;
  payload: {
    userId: string;
  };
}

function* getUserInfoSaga(action: getUserInfoSagaAction) {
  try {
    const { payload } = action;
    const { data } = yield call(getUserInfoByUserId, payload);
    yield put(GET_USER_INFO_SUCCESS({ data }));
  } catch (error) {
    yield put(GET_USER_INFO_FAIL(error));
  }
}

function* navbarSaga() {
  // slice name / action name
  yield takeLatest('NAVBAR_SLICE/GET_USER_INFO', getUserInfoSaga);
}

export default navbarSaga;
