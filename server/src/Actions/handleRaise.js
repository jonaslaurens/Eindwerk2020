/**
 * Handle raise
 * @description Handles the raise action from a player
 * @param {object} round - Is the round model
 * @param {object} player - Is the player model
 * @param {number} index  - represents the index of the player
 * @param {number} raiseAmount - the amount the player wishes to raise with
 */
const handleRaise = (round, player, index, raiseAmount) => {
  round.currentBet += raiseAmount;

  // has player gone all in with the raise?
  if (round.currentBet > player.credits) {
    // highest bet in betArr
    const highestBet = round.getHighestBet();

    round.addToPot(player.credits);

    round.playerBets[index] = highestBet;

    // set player creds to 0
    player.credits = 0;

    // set player all in true, so we can check if anyone has gone allin (set betarr equal)
    player.allIn = true;

    return;
  }

  // add his raise to the pot
  round.addToPot(round.currentBet);

  // substract his raise and the difference from last raise from his creds
  player.credits -= round.currentBet;

  // add currentbet as the players bet in the bet array
  if (round.playerBets[index] > 0) {
    round.playerBets[index] += round.currentBet;
  } else {
    round.playerBets[index] = round.currentBet;
  }

  return;
};

module.exports = handleRaise;
