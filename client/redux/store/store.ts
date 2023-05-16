import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

// all the reduers
import authSlice from '../slice/authSlice';
import navbarSlice from '../slice/navbarSlice';
import homepageSlice from '../slice/homepageSlice';
import restaurantDetailsSlice from '../slice/restaurantDetailsSlice';
import cartDetailsSlice from '../slice/cartSlice';

// all the sagas
import authSaga from '../saga/authSaga';
import navbarSaga from '../saga/navbarSaga';
import homepageSaga from '../saga/homepageSaga';
import restaurantDetailsSaga from '../saga/restaurantDetailsSaga';

const sagaMiddleware = createSagaMiddleware();

// Root Saga
function* rootSaga() {
  yield all([
    authSaga(),
    navbarSaga(),
    homepageSaga(),
    restaurantDetailsSaga(),
  ]);
}

// Root Reducer
const rootReducer = combineReducers({
  authReducer: authSlice,
  navbarReducer: navbarSlice,
  homepageReducer: homepageSlice,
  restaurantDetailsReducer: restaurantDetailsSlice,
  cartDetailsReducer: cartDetailsSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
