const isStraightFlush = require('../isStraightFlush');
const isHighCard = require('../isHighCard');
const isLowStraight = require('../isLowStraight');

module.exports = isRoyalFlush = (cards, countedCards, countedSuits) => {
  if (isStraightFlush(cards, countedSuits) && isHighCard(countedCards) === 14) {
    // if the straight is the lowest we can have we return false
    if (!isLowStraight(countedCards)) return true;
  }

  return false;
};
