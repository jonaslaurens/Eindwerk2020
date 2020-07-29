const groupCards = require('../groupCards/groupCards');
const checkCombinations = require('../checkCombinations');

module.exports = decideWinner = (players, communityCards) => {
  const calculatedHands = [];
  let winner = {};

  players.forEach((player) => {
    const groupedCards = groupCards(player.cards, communityCards);
    const result = checkCombinations(groupedCards);

    calculatedHands.push({ ...player, result });
  });

  winner = calculatedHands[0];

  calculatedHands.forEach((player) =>
    player.result.value > winner.result.value ? (winner = player) : null
  );

  return winner;
};
