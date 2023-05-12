import {
  GET_RESTAURANTS_FAIL,
  GET_RESTAURANTS_SUCCESS,
} from '../../slice/homepageSlice';
import { getRestaurantsUtilS } from './../../../utils/homepageUtils';
import { call, put, takeLatest } from 'redux-saga/effects';

function* getRestaurantsSaga(action: any): Generator<any, void, any> {
  try {
    const resp = yield call(getRestaurantsUtilS, action?.payload);
    yield put(GET_RESTAURANTS_SUCCESS(resp));
  } catch (error) {
    yield put(GET_RESTAURANTS_FAIL());
  }
}

function* homepageSaga() {
  yield takeLatest('HOMEPAGE_SLICE/GET_RESTAURANTS', getRestaurantsSaga);
}

export default homepageSaga;
