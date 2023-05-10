import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

// all the reduers
import authSlice from '../slice/authSlice';
import navbarSlice from '../slice/navbarSlice';
import homepageSlice from '../slice/homepageSlice';

// all the sagas
import authSaga from '../saga/authSaga';
import navbarSaga from '../saga/navbarSaga';
import homepageSaga from '../saga/homepageSaga';

const sagaMiddleware = createSagaMiddleware();

// Root Saga
function* rootSaga() {
  yield all([authSaga(), navbarSaga(), homepageSaga()]);
}

const store = configureStore({
  reducer: {
    authReducer: authSlice,
    navbarReducer: navbarSlice,
    homepageReducer: homepageSlice,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
