module.exports = handleRaise = (round, player, index, raiseAmount) => {
  // set current bet to new bet
  round.currentBet += raiseAmount;

  // handle all in
  if (player.credits < round.currentBet) {
    round.pot += player.credits;
    round.currentBet += player.credits;

    round.playerBets[index] += player.credits;

    player.credits = 0;
    return;
  }

  // add currentbet to the pot
  round.pot += round.currentBet;

  // remove currentbet from the players credits
  player.credits -= round.currentBet;

  // add current player bet to the bet array
  if (round.playerBets[index] > 0) {
    round.playerBets[index] = round.currentBet;
  } else {
    round.playerBets[index] = round.currentBet;
  }

  return;
};
