import { configureStore } from '@reduxjs/toolkit';

function createStoreWithMiddleware(rootReducer) {
  const store = configureStore({
    reducer: rootReducer,
  });

  return {
    store,
  };
}

export { createStoreWithMiddleware };
