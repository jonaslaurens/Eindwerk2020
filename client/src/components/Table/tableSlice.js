import { createSlice } from '@reduxjs/toolkit';

export const tableName = 'table';

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    table: {},
  },
  reducers: {
    addTable: (state, { payload }) => {
      state.table = payload;
    },
    updateTable: (state, { payload }) => {
      state.table.players = payload;
    },
    setCommunityCards: (state, { payload }) => {
      state.table.communityCards = payload;
    },
    updatePot: (state, { payload }) => {
      state.table.pot = payload;
    },
    updatePlayerCredits: (state, { payload }) => {
      state.table.players.forEach((tablePlayer) => {
        payload.forEach((player) => {
          if (tablePlayer.id === player.id) {
            tablePlayer.credits = player.credits;
          }
        });
      });
    },
  },
});

export const {
  addTable,
  updateTable,
  setCommunityCards,
  updatePot,
  updatePlayerCredits,
} = tableSlice.actions;

export const selectTable = (state) => state.table.table;

export const selectTableId = (state) => state.table.table.id;

export default tableSlice.reducer;
