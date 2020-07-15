import { createSlice } from '@reduxjs/toolkit';

export const alertName = 'alert';

export const alertSlice = createSlice({
  name: alertName,
  initialState: {
    error: '',
  },
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setError } = alertSlice.actions;

export const selectError = (state) => state.alert.error;

export default alertSlice.reducer;
