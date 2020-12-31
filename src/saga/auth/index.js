import { all, takeEvery, fork, put } from 'redux-saga/effects';
import { getToken } from '../../utilities';

export function* checkAuthorization() {
    yield takeEvery("auth/checkAuthorization", function* () {
        const token = getToken();
        
        if (token) {
            yield put({
                type: "auth/checkAuthorizationSuccess",
                token,
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(checkAuthorization),
    ]);
}