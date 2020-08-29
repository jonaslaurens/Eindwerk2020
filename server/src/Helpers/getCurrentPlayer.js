module.exports = getCurrentPlayer = (round, socket) => {
  const playerIndex = round.players.findIndex(
    (player) => player.socket.id === socket.id
  );
  return { player: round.players[playerIndex], index: playerIndex };
};
