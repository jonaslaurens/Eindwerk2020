module.exports = handleCall = (round, player, index) => {
  const { bigBlind, currentBet } = round;

  // bet array empty, no bets yet so call minbet
  if (!round.hasBets()) {
    player.credits -= bigBlind;
    round.playerBets[index] = bigBlind;
    round.addToPot(bigBlind);
    return;
  }

  // is player BB?
  const isBigBlind = round.isBigBlind(player.id);

  // highest bet in betArr
  const highestBet = round.getHighestBet();

  // calculate difference between highest and previous bet
  const difference = highestBet - round.playerBets[index];

  if (highestBet >= player.credits) {
    round.addToPot(player.credits);
    player.allIn = true;
    player.credits = 0;
    round.playerBets[index] = highestBet;
    return;
  }

  // check if player has made bet
  if (typeof round.playerBets[index] === 'undefined') {
    // check if current player is bigblind
    if (isBigBlind) {
      round.addToPot(highestBet - bigBlind);
      player.credits -= highestBet - bigBlind;
      round.playerBets[index] = highestBet;
      return;
    }

    // not big blind? then add difference to pot
    round.addToPot(highestBet);
    player.credits -= highestBet;
    round.playerBets[index] = highestBet;
    return;
  } else {
    // check if player is bigblind
    if (isBigBlind) {
      round.addToPot(difference - bigBlind);
      player.credits -= difference - bigBlind;
      round.playerBets[index] = highestBet;
      return;
    }

    // not big blind? then add difference to pot
    round.addToPot(difference);
    player.credits -= difference;
    round.playerBets[index] = highestBet;
    return;
  }
};
