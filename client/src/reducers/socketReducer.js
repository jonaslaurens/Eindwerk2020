import { createSlice } from '@reduxjs/toolkit';

export const socketName = 'socket';

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: '',
  },
  reducers: {
    setSocket: (state, { payload }) => {
      state.socket = payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export const selectSocket = (state) => state.socket.socket;

export default socketSlice.reducer;
