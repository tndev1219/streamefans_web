import { all, takeEvery, call, fork, put } from 'redux-saga/effects';
import { apis } from '../../api';

export function* signupRequest() {
    yield takeEvery("auth/signupRequest", function* (action) {
        try {
            const res = yield call(apis.POST, 'auth/signup/', action.payload.data, false);
            if (res.status === 200) {
                yield put({
                    type: "auth/authSuccess",
                    payload: res.data.result,
                    meta: action.payload.meta,
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

export function* loginRequest() {
    yield takeEvery("auth/loginRequest", function* (action) {
        try {
            const res = yield call(apis.POST, 'auth/login/', action.payload.data, false);
            if (res.status === 200) {
                yield put({
                    type: "auth/authSuccess",
                    payload: res.data.result,
                    meta: action.payload.meta,
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

export function* authSuccess() {
    yield takeEvery("auth/authSuccess", function* (action) {
        if (action.meta) {
            yield call(action.meta.redirect, action.meta.path);
        }
    });
}

export function* sendVerifyEmail() {
    yield takeEvery("auth/sendVerifyEmail", function* (action) {
        try {
            yield call(apis.POST, `auth/send-verify-email/${action.payload.data.user_id}/`, {}, false);
        } catch (err) { }
    });
}

export function* emailVerify() {
    yield takeEvery("auth/emailVerify", function* (action) {
        try {
            const res = yield call(apis.POST, 'auth/email-verify/', action.payload.data, false);
            if (res.status === 200) {
                yield put({
                    type: "auth/authSuccess",
                    payload: res.data.result,
                    meta: action.payload.meta,
                });
            } else {
                yield put({
                    type: "global/setSnackBar",
                    payload: { snackBarState: true, snackBarVariant: 'warning', snackBarMessage: 'Error Occured! Please try again later.' },
                });
                yield call(action.payload.meta.redirect, action.payload.meta.path);
            }
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
            yield call(action.payload.meta.redirect, action.payload.meta.path);
        }
    });
}

export function* logout() {
    yield takeEvery("auth/logout", function* (action) {
        try {
            yield call(action.payload.meta.redirect, action.payload.meta.path);
        } catch (err) { }
    });
}

export function* restoreAccessRequest() {
    yield takeEvery("auth/restoreAccessRequest", function* (action) {
        try {
            yield call(apis.POST, `auth/forgot-password/`, action.payload.data, false);
        } catch (err) { }
    });
}

export function* restoreAccess() {
    yield takeEvery("auth/restoreAccess", function* (action) {
        try {
            const res = yield call(apis.POST, `auth/restore-access/${action.payload.data.password_reset_key}/`, {}, false);
            if (res.status === 200) {
                yield put({
                    type: "auth/authSuccess",
                    payload: res.data.result,
                    meta: action.payload.meta,
                });
            } else {
                yield put({
                    type: "global/setSnackBar",
                    payload: { snackBarState: true, snackBarVariant: 'warning', snackBarMessage: 'Error Occured! Please try again later.' },
                });
                yield call(action.payload.meta.redirect, action.payload.meta.path);
            }
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
            yield call(action.payload.meta.redirect, action.payload.meta.path);
        }
    });
}

export function* resetPassword() {
    yield takeEvery("auth/resetPassword", function* (action) {
        try {
            const res = yield call(apis.POST, `auth/reset-password/`, action.payload.data, true);
            if (res.status === 200) {
                yield put({
                    type: "auth/authSuccess",
                    payload: res.data.result,
                    meta: action.payload.meta,
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

export function* updateEmailRequest() {
    yield takeEvery("auth/updateEmailRequest", function* (action) {
        try {
            const res = yield call(apis.POST, 'auth/update-email-request/', action.payload.data, true);
            if (res.status === 200) {
                yield put({
                    type: "auth/setEmailUpdateStep",
                    payload: 2,
                });
            } else {
                yield put({
                    type: "global/setAlertDialog",
                    payload: { alertDialogState: true, alertDialogMessage: 'Error Occured! Please try again later.' },
                });
            }
            yield put({
                type: "global/setLoading",
                payload: false,
            });
        } catch (err) {
            if (err.response.status === 400) {
                yield put({
                    type: "global/setAlertDialog",
                    payload: { alertDialogState: true, alertDialogMessage: "This email is already connected to any account." },
                });
            } else {
                yield put({
                    type: "global/setAlertDialog",
                    payload: { alertDialogState: true, alertDialogMessage: 'Error Occured! Please try again later.' },
                });
            }
            yield put({
                type: "global/setLoading",
                payload: false,
            });
        }
    });
}

export function* updateEmail() {
    yield takeEvery("auth/updateEmail", function* (action) {
        try {
            const res = yield call(apis.POST, 'auth/update-email/', action.payload.data, true);
            if (res.status === 200) {
                yield put({
                    type: "auth/authSuccess",
                    payload: res.data.result,
                    meta: action.payload.meta,
                });
                yield put({
                    type: "auth/setEmailUpdateStep",
                    payload: 0,
                });
            } else {
                yield put({
                    type: "global/setAlertDialog",
                    payload: { alertDialogState: true, alertDialogMessage: 'Error Occured! Please try again later.' },
                });
            }
            yield put({
                type: "global/setLoading",
                payload: false,
            });
        } catch (err) {
            if (err.response.status === 400) {
                yield put({
                    type: "global/setAlertDialog",
                    payload: {
                        alertDialogState: true,
                        alertDialogMessage:
                            Object.values(err.response.data.message)[0][0] ?
                                Object.values(err.response.data.message)[0][0]
                                :
                                Object.values(err.response.data.message)[0],
                    },
                });
            } else {
                yield put({
                    type: "global/setAlertDialog",
                    payload: { alertDialogState: true, alertDialogMessage: 'Error Occured! Please try again later.' },
                });
            }
            yield put({
                type: "global/setLoading",
                payload: false,
            });
        }
    });
}

export function* updateProfile() {
    yield takeEvery("auth/updateProfile", function* (action) {
        try {
            const res = yield call(apis.PATCH, `auth/update-profile/${action.payload.data.id}/`, action.payload.data, true);
            if (res.status === 200) {
                yield put({
                    type: "auth/authSuccess",
                    payload: res.data.result,
                    meta: null,
                });
            } else {
                yield put({
                    type: "global/setAlertDialog",
                    payload: { alertDialogState: true, alertDialogMessage: 'Error Occured! Please try again later.' },
                });
            }
            yield put({
                type: "global/setLoading",
                payload: false,
            });
        } catch (err) {
            if (err.response.status === 400) {
                yield put({
                    type: "global/setAlertDialog",
                    payload: {
                        alertDialogState: true,
                        alertDialogMessage:
                            Object.values(err.response.data.message)[0][0] ?
                                Object.values(err.response.data.message)[0][0]
                                :
                                Object.values(err.response.data.message)[0],
                    },
                });
            } else {
                yield put({
                    type: "global/setAlertDialog",
                    payload: { alertDialogState: true, alertDialogMessage: 'Error Occured! Please try again later.' },
                });
            }
            yield put({
                type: "global/setLoading",
                payload: false,
            });
        }
    });
}

export function* deleteAccount() {
    yield takeEvery("auth/deleteAccount", function* (action) {
        try {
            const res = yield call(apis.POST, `auth/delete/${action.payload.data.id}/`, action.payload.data, true);
            if (res.status === 200) {
                yield put({ type: "global/reset" });
                yield put({ type: "auth/reset" });
                yield call(action.payload.meta.redirect, action.payload.meta.path);
            } else {
                yield put({
                    type: "global/setAlertDialog",
                    payload: { alertDialogState: true, alertDialogMessage: 'Error Occured! Please try again later.' },
                });
            }
            yield put({
                type: "global/setLoading",
                payload: false,
            });
        } catch (err) {
            if (err.response.status === 400) {
                yield put({
                    type: "global/setAlertDialog",
                    payload: {
                        alertDialogState: true,
                        alertDialogMessage:
                            Object.values(err.response.data.message)[0][0] ?
                                Object.values(err.response.data.message)[0][0]
                                :
                                Object.values(err.response.data.message)[0],
                    },
                });
            } else {
                yield put({
                    type: "global/setAlertDialog",
                    payload: { alertDialogState: true, alertDialogMessage: 'Error Occured! Please try again later.' },
                });
            }
            yield put({
                type: "global/setLoading",
                payload: false,
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(signupRequest),
        fork(loginRequest),
        fork(authSuccess),
        fork(sendVerifyEmail),
        fork(emailVerify),
        fork(logout),
        fork(restoreAccessRequest),
        fork(restoreAccess),
        fork(resetPassword),
        fork(updateEmailRequest),
        fork(updateEmail),
        fork(updateProfile),
        fork(deleteAccount),
    ]);
}