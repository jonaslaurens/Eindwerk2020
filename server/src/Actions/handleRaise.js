module.exports = handleRaise = (round, player, index, raiseAmount) => {
  // handle all in
  if (player.credits < raiseAmount) {
    round.addToPot(player.credits);

    round.playerBets[index] += player.credits;

    // set player creds to 0
    player.credits = 0;

    // set player all in true, so we can check if anyone has gone allin (set betarr equal)
    player.allIn = true;

    return;
  }

  // add currentbet to the pot
  round.pot += round.currentBet;

  // remove currentbet from the players credits
  player.credits -= round.currentBet;

  // add current player bet to the bet array
  if (round.playerBets[index] > 0) {
    round.playerBets[index] += round.currentBet;
  } else {
    round.playerBets[index] = round.currentBet;
  }

  return;
};
