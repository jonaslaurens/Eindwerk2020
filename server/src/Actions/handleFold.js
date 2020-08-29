/**
 * A fold means the currentplayer does not wish to continue.
 * We remove the player from our players array.
 * We remove his bet from the bet array
 * set currentDecider one less cause the next player becomes the currentdecider
 */
module.exports = handleFold = (round, index) => {
  round.players.splice(index, 1);
  round.playerBets = round.playerBets.filter((player, i) => i !== index);

  console.log('player bets: ' + round.playerBets);

  round.currentDecider--;

  return;
};
