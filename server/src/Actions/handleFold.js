/**
 * A fold means the currentplayer does not wish to continue.
 * We remove the player from our players array.
 * We remove his bet from the bet array
 */
module.exports = handleFold = (round, index) => {
  round.players.splice(index, 1);
  round.playerBets.splice(index, 1);
  round.currentDecider--;

  return;
};
