module.exports = handleCall = (round, player, index) => {
  const { minimumBet } = round;

  // bet array empty, no bets yet so call minbet
  if (!round.hasBets()) {
    player.credits -= minimumBet;
    round.playerBets[index] = minimumBet;
    round.addToPot(minimumBet);
    return;
  }

  // we have bets so find highest we need to equalize that bet
  const highestBet = round.getHighestBet();

  // calculate difference between highest and previous bet
  const difference = highestBet - round.playerBets[index];

  // has player gone allin?
  if (difference > player.credits) {
    // add remaining player creds to pot
    round.addToPot(player.credits);

    // set player creds to 0
    player.credits = 0;

    // set player all in true, so we can check if anyone has gone allin (set betarr equal)
    player.allIn = true;
  }

  // if difference is not a number we havnt got a bet from this player
  if (isNaN(difference)) {
    // player is big blind and called? he already put creds in pot so we set his bet to minbet
    if (player.id === round.bigBlind) {
      round.playerBets[index] = minimumBet;
      return;
    }

    // player is not bigblind we substract minbet from his creds, add it to the pot and set his bet as the min bet
    round.playerBets[index] = minimumBet;
    player.credits -= minimumBet;
    round.addToPot(minimumBet);
    return;
  }

  // player has already made a bet and calls a previous raise
  // we set the player's bet to the highest bet (raised by other player)
  // remove diff from his credits and add it to the pot
  round.playerBets[index] += difference;
  player.credits -= difference;
  round.addToPot(difference);
};
