import { createSlice } from '@reduxjs/toolkit';

import { makeActionHook } from '../../utilities/recipies.util';

const INITIAL_STATE = {
    posts: [],
};

const postSlice = createSlice({
    name: 'post',
    initialState: INITIAL_STATE,
    reducers: {
        createPost: () => { },
        getPosts: () => { },
        updatePostList: (state, action) => {
            state.posts = action.payload;
        },
    },
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
export const usePostAction = makeActionHook(postActions);
