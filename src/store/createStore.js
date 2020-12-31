import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { history } from '../utilities/history.util';
import rootSaga from '../saga/sagas';

function createStoreWithMiddleware(rootReducer) {
  const sagaMiddleware = createSagaMiddleware();
  const routersMiddleware = routerMiddleware(history);

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware, routersMiddleware]),
  });

  sagaMiddleware.run(rootSaga);

  return {
    store,
  };
}

export { createStoreWithMiddleware };
