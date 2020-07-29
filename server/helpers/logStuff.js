module.exports = logStuff = (T, R, G) => {
  console.log(`\nWe got a winner!\nResults for game: ${G}`);
  spaceHere();

  // show results from remaining players (round)
  R.players.forEach((player) => {
    console.log(player.name);
    console.log(player.cards);
    spaceHere();
  });

  // show communityCards
  console.log(R.communityCards);
  spaceHere();
};

const spaceHere = () => {
  return console.log('\n');
};
