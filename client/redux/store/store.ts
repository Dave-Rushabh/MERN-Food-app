import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// all the reduers
import authSlice from '../slice/authSlice';
// all the sagas
import authSaga from '../saga/authSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authReducer: authSlice,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(authSaga);

export default store;
