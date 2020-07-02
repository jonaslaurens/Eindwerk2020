import { createSlice } from '@reduxjs/toolkit';

export const tableName = 'table';

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tables: [],
  },
  reducers: {
    addTable: (state, { payload }) => {
      console.log(state.tables.find((table) => table.id === payload));

      if (
        !state.tables.find((table) => table.id !== payload) ||
        state.tables.length < 0
      ) {
        state.tables.push(payload);
      }
    },
    addPlayer: (state, { payload }) => {
      state.players.push(payload);
    },
  },
});

export const { addTable, addPlayer } = tableSlice.actions;

export const selectPlayers = (state) => state.table.players;

export default tableSlice.reducer;
