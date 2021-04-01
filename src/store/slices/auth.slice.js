import { createSlice } from '@reduxjs/toolkit';

import { makeActionHook } from '../../utilities/recipies.util';

const INITIAL_STATE = {
    profile: null,
    emailUpdateStep: 0,
    users: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        reset: state => INITIAL_STATE,
        signupRequest: () => { },
        loginRequest: () => { },
        authSuccess: (state, action) => {
            state.profile = action.payload;
        },
        sendVerifyEmail: () => { },
        emailVerify: () => { },
        restoreAccessRequest: () => { },
        restoreAccess: () => { },
        resetPassword: () => { },
        setEmailUpdateStep: (state, action) => {
            state.emailUpdateStep = action.payload;
        },
        updateEmailRequest: () => { },
        updateEmail: () => { },
        updateProfile: () => { },
        uploadImage: () => { },
        removeImage: () => { },
        deleteAccount: () => { },
        logout: (state, action) => {
            state.profile = null;
        },
        getSuggestionUsers: () => { },
        updateUserList: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const useAuthAction = makeActionHook(authActions);
