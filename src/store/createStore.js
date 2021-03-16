import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from '../store/RootReducer';
import rootSaga from '../saga/sagas';

const persistConfig = {
  key: 'streamefans_root_persistor',
  version: 1,
  storage,
  blacklist: ['global'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStoreWithMiddleware = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([sagaMiddleware]),
  });

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return {
    persistor,
    store,
  };
};

export { createStoreWithMiddleware };
