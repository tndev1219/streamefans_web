import { all } from 'redux-saga/effects';
import authSagas from './auth';
import postSagas from './post';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    postSagas(),
  ]);
}