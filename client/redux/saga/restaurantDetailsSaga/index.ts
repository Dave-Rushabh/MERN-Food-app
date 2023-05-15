import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRestaurantDetailsByIdUtils } from '../../../utils/restaurantUtils';
import {
  FETCH_RESTAURANT_DETAILS_SUCCESS,
  FETCH_RESTAURANT_DETAILS_FAIL,
} from '../../slice/restaurantDetailsSlice';

export function* fetchRestaurantDetailsSaga(
  action: any
): Generator<any, void, any> {
  try {
    const resp = yield call(fetchRestaurantDetailsByIdUtils, action.payload);
    yield put(FETCH_RESTAURANT_DETAILS_SUCCESS(resp));
  } catch (error) {
    yield put(FETCH_RESTAURANT_DETAILS_FAIL());
  }
}

export default function* restaurantDetailsSaga() {
  yield takeLatest(
    'RESTAURANT_DETAILS_SLICE/FETCH_RESTAURANT_DETAILS',
    fetchRestaurantDetailsSaga
  );
}
