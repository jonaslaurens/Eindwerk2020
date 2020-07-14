import { createSlice } from '@reduxjs/toolkit';

export const alerterName = 'alerter';

export const alerterSlice = createSlice({
  name: 'alerter',
  initialState: {
    error: '',
  },
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setError } = alerterSlice.actions;

export const selectError = (state) => state.alerter.error;

export default alerterSlice.reducer;
