import { combineReducers } from 'redux';

import { globalReducer } from './slices/global.slice';
import { authReducer } from './slices/auth.slice';
import { postReducer } from './slices/post.slice';

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  post: postReducer,
});

export { rootReducer };
