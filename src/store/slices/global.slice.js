import { createSlice } from '@reduxjs/toolkit';

import { makeActionHook } from '../../utilities/recipies.util';

const INITIAL_STATE = {
  loading: false,
  userDataLoading: false,
  snackBarState: false,
  snackBarVariant: 'warning',
  snackBarMessage: '',
  alertDialogState: false,
  alertDialogMessage: '',
  language: true,
  languageModal: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: INITIAL_STATE,
  reducers: {
    reset: state => INITIAL_STATE,
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setUserDataLoading: (state, { payload }) => {
      state.userDataLoading = payload;
    },
    setSnackBar: (state, { payload }) => {
      state.snackBarState = payload.snackBarState;
      state.snackBarVariant = payload.snackBarVariant;
      state.snackBarMessage = payload.snackBarMessage;
    },
    setAlertDialog: (state, { payload }) => {
      state.alertDialogState = payload.alertDialogState;
      state.alertDialogMessage = payload.alertDialogMessage;
    },
    setLanguageModal: (state, { payload }) => {
      state.languageModal = payload;
    },
    changeLanguage: (state, { payload }) => {
      state.language = payload.value;
    },
  },
});

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
export const useGlobalAction = makeActionHook(globalActions);
