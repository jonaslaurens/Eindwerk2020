module.exports = getCurrentPlayer = (table, socket) => {
  const playerIndex = table.players.findIndex(
    (player) => player.socket.id === socket.id
  );
  return { player: table.players[playerIndex], index: playerIndex };
};
