import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/sagas';

const createStoreWithMiddleware = (rootReducer) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat([sagaMiddleware]),
  });

  sagaMiddleware.run(rootSaga);

  return {
    store,
  };
};

export { createStoreWithMiddleware };
