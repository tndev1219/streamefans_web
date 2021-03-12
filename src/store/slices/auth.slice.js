import { createSlice } from '@reduxjs/toolkit';

import { makeActionHook } from '../../utilities/recipies.util';

const INITIAL_STATE = {
    profile: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        checkAuthorization: () => { },
        checkAuthorizationSuccess: (state, action) => {
            state.profile = action.payload;
        },
        signupRequest: () => { },
        authSuccess: (state, action) => {
            state.profile = action.payload;
        },
        emailVerify: () => { },
        sendVerifyEmail: () => { },
        logout: (state, action) => {
            state.profile = null;
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const useAuthAction = makeActionHook(authActions);
