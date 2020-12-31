import { combineReducers } from 'redux';

import { globalReducer } from './slices/global.slice';
import { authReducer } from './slices/auth.slice';

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
});

export { rootReducer };
