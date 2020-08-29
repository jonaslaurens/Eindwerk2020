/**
 * @description counts the amount of cards
 * @param {object} cards contains all cards
 * @returns array which contains the total of each card occuring in the cards param
 */
module.exports = cardCounts = (cards) => {
  const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  cards.forEach((card) => {
    if (card.value === 1) {
      return counts[13]++;
    }
    counts[card.value - 1]++;
  });

  return counts;
};
