import { createSlice } from '@reduxjs/toolkit';

import { makeActionHook } from '../../utilities/recipies.util';

const INITIAL_STATE = {
    posts: [],
    selectedUserData: null,
};

const postSlice = createSlice({
    name: 'post',
    initialState: INITIAL_STATE,
    reducers: {
        createPost: () => { },
        getAllPosts: () => { },
        updatePostList: (state, action) => {
            state.posts = action.payload;
        },
        getUserData: () => { },
        updateUserData: (state, action) => {
            state.selectedUserData = action.payload;
        },
        follow: () => { },
        unfollow: () => { },
    },
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
export const usePostAction = makeActionHook(postActions);
