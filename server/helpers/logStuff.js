module.exports = logStuff = (T, R, G, W) => {
  console.log(`\nWe got a winner: ${W.name}!\nResults for game: ${G}`);
  spaceHere();

  console.log('pot :' + R.pot);
  console.log('min bet :' + R.minimumBet);
  console.log('currentbet :' + R.currentBet);
  console.log('player bets :' + R.playerBets);
  console.log('equal bets :' + R.equalBets());

  // show results from remaining players (round)
  // R.players.forEach((player) => {
  // console.log(player.name);
  // console.log(player.cards);
  // spaceHere();
  // });

  // show communityCards
  // console.log(R.getCommunityCards());
};

const spaceHere = () => {
  return console.log('\n');
};
