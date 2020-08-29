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
  if (raiseAmount >= player.credits) {
    round.addToPot(player.credits);

    round.playerBets[index] += player.credits;

    // set player creds to 0
    player.credits = 0;

    // set player all in true, so we can check if anyone has gone allin (set betarr equal)
    player.allIn = true;

    return;
  }

  // add his raise to the pot
  round.addToPot(raiseAmount);

  // substract his raise from his creds
  player.credits -= raiseAmount;

  // add currentbet as the players bet in the bet array
  round.playerBets[index] = round.currentBet;

  return;
};

module.exports = handleRaise;
