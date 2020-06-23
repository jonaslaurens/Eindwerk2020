module.exports = handleCall = (round, player, index) => {
  // if the currentbet is less than the minimum the currentbet becomes the minimum
  round.currentBet < round.minimumBet
    ? (round.currentBet = round.minimumBet)
    : null;

  // in case player calls a bet that's greater than his remaining credits
  if (round.currentBet > player.credits) {
    round.pot += player.credits;
    player.credits = 0;
  } else {
    round.pot += round.currentBet;
    player.credits -= round.currentBet;
    round.playerBets[index] = round.currentBet;
  }

  return;
};
