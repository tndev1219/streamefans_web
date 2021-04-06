import { all, takeEvery, call, fork, put, select } from 'redux-saga/effects';
import { apis } from '../../api';

const getPosts = (state) => state.post.posts;

const getSelectedUserData = (state) => state.post.selectedUserData;

const createNewObjectFromReadOnly = (posts, res, postId) => {
    const newPosts = posts.map(post => {
        if (post.id === postId) {
            const newObject = Object.create({});
            Object.keys(post).map(key => {
                if (key !== 'post_likes') {
                    newObject[key] = post[key];
                }
                return null;
            });
            newObject.post_likes = [...post.post_likes, res];
            return newObject;
        } else {
            return post;
        }
    });
    return newPosts;
};

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

export function* like() {
    yield takeEvery("post/like", function* (action) {
        try {
            const res = yield call(apis.POST, 'post/like/', action.payload.data, true);
            if (res.status === 200) {
                const posts = yield select(getPosts);
                const newPosts = createNewObjectFromReadOnly(posts, res.data.result, action.payload.data.post_id);

                yield put({
                    type: "post/updatePostList",
                    payload: newPosts,
                });

                const selectedUserData = yield select(getSelectedUserData);
                const newSelectedUserData = Object.create({});
                Object.keys(selectedUserData).map(key => {
                    if (key !== 'posts') {
                        newSelectedUserData[key] = selectedUserData[key];
                    } else {
                        const newPosts = createNewObjectFromReadOnly(selectedUserData[key], res.data.result, action.payload.data.post_id);
                        newSelectedUserData[key] = newPosts;
                    }
                    return null;
                });

                yield put({
                    type: "post/updateUserData",
                    payload: newSelectedUserData,
                });
            }
        } catch (err) { }
    });
}

export function* unlike() {
    yield takeEvery("post/unlike", function* (action) {
        try {
            const res = yield call(apis.POST, 'post/unlike/', action.payload.data, true);
            if (res.status === 200) {
                const posts = yield select(getPosts);

                const newPosts = posts.map(post => {
                    if (post.id === action.payload.data.post_id) {
                        const newObject = Object.create({});
                        Object.keys(post).map(key => {
                            if (key !== 'post_likes') {
                                newObject[key] = post[key];
                            }
                            return null;
                        });
                        newObject.post_likes = post.post_likes.filter(postLike => postLike.id !== res.data.result.id);
                        return newObject;
                    } else {
                        return post;
                    }
                });

                yield put({
                    type: "post/updatePostList",
                    payload: newPosts,
                });

                const selectedUserData = yield select(getSelectedUserData);
                const newSelectedUserData = Object.create({});
                Object.keys(selectedUserData).map(key => {
                    if (key !== 'posts') {
                        newSelectedUserData[key] = selectedUserData[key];
                    } else {
                        const newPosts = selectedUserData[key].map(post => {
                            if (post.id === action.payload.data.post_id) {
                                const newObject = Object.create({});
                                Object.keys(post).map(key => {
                                    if (key !== 'post_likes') {
                                        newObject[key] = post[key];
                                    }
                                    return null;
                                });
                                newObject.post_likes = post.post_likes.filter(postLike => postLike.id !== res.data.result.id);
                                return newObject;
                            } else {
                                return post;
                            }
                        });

                        newSelectedUserData[key] = newPosts;
                    }
                    return null;
                });

                yield put({
                    type: "post/updateUserData",
                    payload: newSelectedUserData,
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
        fork(like),
        fork(unlike),
    ]);
}