import { all, takeEvery, call, fork, put } from 'redux-saga/effects';
import { apis } from '../../api';

export function* createPost() {
    yield takeEvery("post/createPost", function* (action) {
        try {
            const res = yield call(apis.POST, 'post/', action.payload.data, true);
            if (res.status !== 200) {
                yield put({
                    type: "global/setSnackBar",
                    payload: { snackBarState: true, snackBarVariant: 'warning', snackBarMessage: 'Error Occured! Please try again later.' },
                });
            }
            yield put({
                type: "global/setLoading",
                payload: false,
            });
        } catch (err) {
            if (err.response.status === 400) {
                yield put({
                    type: "global/setSnackBar",
                    payload: {
                        snackBarState: true,
                        snackBarVariant: 'warning',
                        snackBarMessage:
                            Object.values(err.response.data.message)[0][0] ?
                                Object.values(err.response.data.message)[0][0]
                                :
                                Object.values(err.response.data.message)[0],
                    },
                });
            } else {
                yield put({
                    type: "global/setSnackBar",
                    payload: { snackBarState: true, snackBarVariant: 'warning', snackBarMessage: 'Error Occured! Please try again later.' },
                });
            }
            yield put({
                type: "global/setLoading",
                payload: false,
            });
        }
    });
}

export function* getAllPosts() {
    yield takeEvery("post/getAllPosts", function* (action) {
        try {
            const res = yield call(apis.GET, 'post/', {}, true);
            if (res.status === 200) {
                yield put({
                    type: "post/updatePostList",
                    payload: res.data.result,
                });
            }
        } catch (err) { }
    });
}

export function* getUserData() {
    yield takeEvery("post/getUserData", function* (action) {
        try {
            const res = yield call(apis.POST, 'post/get-user-data/', action.payload.data, true);
            if (res.status === 200) {
                yield put({
                    type: "post/updateUserData",
                    payload: res.data.result,
                });
            }
            yield put({
                type: "global/setUserDataLoading",
                payload: false,
            });
        } catch (err) {
            yield put({
                type: "global/setUserDataLoading",
                payload: false,
            });
        }
    });
}

export function* follow() {
    yield takeEvery("post/follow", function* (action) {
        try {
            const res = yield call(apis.POST, 'post/follow/', action.payload.data, true);
            if (res.status === 200) {
                yield put({
                    type: "post/updateUserData",
                    payload: res.data.result,
                });
            }
        } catch (err) { }
    });
}

export function* unfollow() {
    yield takeEvery("post/unfollow", function* (action) {
        try {
            const res = yield call(apis.POST, 'post/unfollow/', action.payload.data, true);
            if (res.status === 200) {
                yield put({
                    type: "post/updateUserData",
                    payload: res.data.result,
                });
            }
        } catch (err) { }
    });
}

export default function* rootSaga() {
    yield all([
        fork(createPost),
        fork(getAllPosts),
        fork(getUserData),
        fork(follow),
        fork(unfollow),
    ]);
}