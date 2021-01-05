import { createSlice } from '@reduxjs/toolkit';

import { makeActionHook } from '../../utilities/recipies.util';

const INITIAL_STATE = {
  loading: false,
  showSnackBar: false,
  loggedIn: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: INITIAL_STATE,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setShowSnackBar: (state, { payload }) => {
      state.showSnackBar = payload;
    },
    setLoggedIn: (state, {payload}) => {
      state.loggedIn = payload;
    },
  },
});

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
export const useGlobalAction = makeActionHook(globalActions);
