import { createSlice } from '@reduxjs/toolkit';

import { makeActionHook } from '../../utilities/recipies.util';

const INITIAL_STATE = {
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        checkAuthorization: () => {
        },
        checkAuthorizationSuccess: (state, action) => {
            state.token = action.payload.token;
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const useAuthAction = makeActionHook(authActions);
