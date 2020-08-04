const isStraightFlush = require('../isStraightFlush');
const isHighCard = require('../isHighCard');

module.exports = isRoyalFlush = (cards, countedCards, countedSuits) => {
  // check if we got a straightflush and if there is an ace
  if (isStraightFlush(cards, countedSuits) && isHighCard(countedCards) === 14) {
    // if we get here it means we have hit a straightflush after this we check if it's the highest straight we can have
    if (
      countedCards[13] > 0 &&
      countedCards[12] > 0 &&
      countedCards[11] > 0 &&
      countedCards[10] > 0 &&
      countedCards[9] > 0
    )
      return true;
  }

  return false;
};
