const findMax = require('../findMax');

module.exports = isHighCard = countedCards => {
  return findMax(countedCards, true);
};
