import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// all the reduers
import authSlice from '../slice/authSlice';
import navbarSlice from '../slice/navbarSlice';
// all the sagas
import authSaga from '../saga/authSaga';
import navbarSaga from '../saga/navbarSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authReducer: authSlice,
    navbarReducer: navbarSlice,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(navbarSaga);

export default store;
